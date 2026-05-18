"""AeroViewADSB integration."""

import logging
from datetime import timedelta

import aiohttp
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers.typing import ConfigType

from .const import (
    DOMAIN,
    CONF_HOST,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
    CONF_LATITUDE,
    CONF_LONGITUDE,
    CONF_HOME_LATITUDE,
    CONF_HOME_LONGITUDE,
)
from .helpers import async_load_aircraft_db, async_load_icao_ranges_from_js

_LOGGER = logging.getLogger(__name__)

_PLATFORMS = ["sensor"]


async def async_setup(hass: HomeAssistant, config: ConfigType):
    """Legacy YAML setup (none required for now)."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry):
    """Set up AeroViewADSB from a config entry."""

    host = entry.data[CONF_HOST]
    port = entry.data[CONF_PORT]
    interval = entry.data.get(CONF_SCAN_INTERVAL, 10)
    url = f"http://{host}:{port}/data/aircraft.json"

    async def _async_fetch_data():
        """Fetch aircraft data from the MultiADSB Feeder."""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    return await resp.json(content_type=None)
        except Exception as err:
            _LOGGER.warning("Error fetching ADSB data: %s", str(err))
            return {"now": 0, "messages": 0, "aircraft": []}

    coordinator = DataUpdateCoordinator(
        hass,
        _LOGGER,
        name="AeroViewADSB Feeder",
        update_method=_async_fetch_data,
        update_interval=timedelta(seconds=interval),
    )

    await coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {
        "coordinator": coordinator,
        CONF_LATITUDE: entry.data.get(CONF_HOME_LATITUDE),
        CONF_LONGITUDE: entry.data.get(CONF_HOME_LONGITUDE),
    }

    hass.data[DOMAIN]["aircraft_db"] = await async_load_aircraft_db(hass)
    hass.data[DOMAIN]["icao_ranges"] = await async_load_icao_ranges_from_js(hass)

    await hass.config_entries.async_forward_entry_setups(entry, _PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry):
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, _PLATFORMS)
    hass.data[DOMAIN].pop(entry.entry_id)
    return unload_ok