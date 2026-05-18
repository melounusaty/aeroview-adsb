"""Config flow for AeroViewADSB."""

import ipaddress
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.const import (
    CONF_HOST,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
    CONF_LATITUDE,
    CONF_LONGITUDE,
)

from .const import (
    DOMAIN,
    DEFAULT_HOST,
    DEFAULT_PORT,
    DEFAULT_SCAN_INTERVAL,
    CONF_HOME_LATITUDE,
    CONF_HOME_LONGITUDE,
)


DATA_SCHEMA_USER = vol.Schema(
    {
        vol.Required(CONF_HOST, default=DEFAULT_HOST): str,
        vol.Required(CONF_PORT, default=DEFAULT_PORT): int,
        vol.Optional(CONF_HOME_LATITUDE): float,
        vol.Optional(CONF_HOME_LONGITUDE): float,
    }
)


DATA_SCHEMA_OPTIONS = vol.Schema(
    {vol.Required(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): int}
)


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle config flow for AeroViewADSB."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial setup step."""
        errors = {}

        if user_input is not None:
            host = user_input[CONF_HOST]
            try:
                ipaddress.ip_address(host)
            except ValueError:
                errors[CONF_HOST] = "invalid_ip_address"

            if not errors:
                await self.async_set_unique_id(host)
                self._abort_if_unique_id_configured()

                scan_interval = user_input.get(
                    CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL
                )

                return self.async_create_entry(
                    title="AeroViewADSB",
                    data={
                        CONF_HOST: host,
                        CONF_PORT: user_input[CONF_PORT],
                        CONF_SCAN_INTERVAL: scan_interval,
                        CONF_HOME_LATITUDE: user_input.get(CONF_HOME_LATITUDE),
                        CONF_HOME_LONGITUDE: user_input.get(CONF_HOME_LONGITUDE),
                    },
                )

        return self.async_show_form(
            step_id="user",
            data_schema=DATA_SCHEMA_USER,
            errors=errors,
        )

    @staticmethod
    def async_get_options_flow(config_entry):
        """Get the options flow for this handler."""
        return OptionsFlowHandler(config_entry)


class OptionsFlowHandler(config_entries.OptionsFlow):
    """AeroViewADSB options flow."""

    def __init__(self, config_entry: config_entries.ConfigEntry):
        self.config_entry = config_entry

    async def async_step_init(self, user_input=None):
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=DATA_SCHEMA_OPTIONS,
            defaults={
                CONF_SCAN_INTERVAL: self.config_entry.data.get(
                    CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL
                ),
            },
        )