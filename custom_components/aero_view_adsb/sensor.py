"""Sensor for AeroViewADSB."""

import logging

from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


def hex_to_int(h):
    if h and isinstance(h, str):
        return int(h, 16)
    return 0


def find_country_and_flag(hex_str, ranges):
    if not hex_str:
        return None, None
    try:
        val = hex_to_int(hex_str.lower().strip("'"))
    except (ValueError, TypeError):
        return None, None

    for r in ranges:
        if r["start"] <= val <= r["end"]:
            return r["country"], r["flag_image"]
    return None, None


class AeroViewADSBMasterSensor(CoordinatorEntity, SensorEntity):
    _attr_translation_key = "current_aircraft"

    def __init__(self, coordinator, entry_id):
        super().__init__(coordinator)
        self._entry_id = entry_id
        self._attr_unique_id = f"{entry_id}_master_aircraft"

    @property
    def native_value(self):
        data = self.coordinator.data
        return len(data.get("aircraft", []))

    @property
    def extra_state_attributes(self):
        data = self.coordinator.data
        aircraft = data.get("aircraft", [])
        hass_data = self.coordinator.hass.data[DOMAIN][self._entry_id]
        aircraft_db = self.coordinator.hass.data[DOMAIN].get("aircraft_db", {})
        icao_ranges = self.coordinator.hass.data[DOMAIN].get("icao_ranges", [])
        home_lat = hass_data.get(CONF_LATITUDE)
        home_lon = hass_data.get(CONF_LONGITUDE)

        result = {
            "timestamp": data.get("now"),
            "messages": data.get("messages"),
            "aircraft": [],
        }

        matched = 0

        fields = (
            "hex",
            "flight",
            "alt_baro",
            "alt_geom",
            "gs",
            "ias",
            "tas",
            "mach",
            "squawk",
            "track",
            "track_rate",
            "roll",
            "mag_heading",
            "true_heading",
            "baro_rate",
            "geom_rate",
            "category",
            "category_desc",
            "nav_altitude_mcp",
            "nav_altitude_fms",
            "nav_heading",
            "nav_modes",
            "lat",
            "lon",
            "nav_qnh",
            "rssi",
            "emergency",
            "nav_altitude_src",
            "mlat",
            "tisb",
            "messages",
            "seen",
            "seen_pos",
            "vert_rate",
            "wind_direction",
            "wind_speed",
            "wind_turbulence",
            "temperature",
            "pressure",
            "humidity",
            "notes",
            "seen_clock",
            "version",
        )

        for a in aircraft:
            hex_str = a.get("hex")
            if not hex_str:
                continue

            row = {k: a.get(k) for k in fields}

            db_entry = aircraft_db.get(hex_str.lower().strip("'"), {})
            if db_entry:
                row["reg"] = db_entry.get("reg")
                row["t"] = db_entry.get("t")
                row["desc"] = db_entry.get("desc")

            country, flag_image = find_country_and_flag(hex_str, icao_ranges)
            if country:
                row["country"] = country
            if flag_image:
                row["flag_image"] = flag_image
                matched += 1

            if (
                home_lat is not None
                and home_lon is not None
                and row["lat"] is not None
                and row["lon"] is not None
            ):
                try:
                    from homeassistant.util.location import distance

                    dist = distance(home_lat, home_lon, row["lat"], row["lon"])
                    row["distance_km"] = dist / 1000.0
                except Exception:
                    pass

            result["aircraft"].append(row)

        _LOGGER.warning(
            "AeroViewADSB flag matches this refresh: %d of %d aircraft",
            matched,
            len(result["aircraft"]),
        )
        return result


async def async_setup_entry(hass, config_entry, async_add_entities):
    coordinator = hass.data[DOMAIN][config_entry.entry_id]["coordinator"]
    async_add_entities([AeroViewADSBMasterSensor(coordinator, config_entry.entry_id)])