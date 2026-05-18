"""Config flow for AeroViewADSB."""

import ipaddress
from typing import Any

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.const import (
    CONF_HOST,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
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
        vol.Optional(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): int,
        vol.Optional(CONF_HOME_LATITUDE): vol.Coerce(float),
        vol.Optional(CONF_HOME_LONGITUDE): vol.Coerce(float),
    }
)


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle config flow for AeroViewADSB."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
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

                return self.async_create_entry(
                    title="AeroViewADSB",
                    data={
                        CONF_HOST: host,
                        CONF_PORT: user_input[CONF_PORT],
                        CONF_SCAN_INTERVAL: user_input.get(
                            CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL
                        ),
                        CONF_HOME_LATITUDE: user_input.get(CONF_HOME_LATITUDE),
                        CONF_HOME_LONGITUDE: user_input.get(CONF_HOME_LONGITUDE),
                    },
                )

        return self.async_show_form(
            step_id="user",
            data_schema=self.add_suggested_values_to_schema(
                DATA_SCHEMA_USER,
                user_input or {},
            ),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get the options flow for this handler."""
        return OptionsFlowHandler()


class OptionsFlowHandler(config_entries.OptionsFlow):
    """AeroViewADSB options flow."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        """Manage the options."""
        current = {**self.config_entry.data, **self.config_entry.options}

        if user_input is not None:
            new_data = dict(self.config_entry.data)
            new_data[CONF_HOST] = user_input[CONF_HOST]
            new_data[CONF_PORT] = user_input[CONF_PORT]
            new_data[CONF_SCAN_INTERVAL] = user_input[CONF_SCAN_INTERVAL]
            new_data[CONF_HOME_LATITUDE] = user_input.get(CONF_HOME_LATITUDE)
            new_data[CONF_HOME_LONGITUDE] = user_input.get(CONF_HOME_LONGITUDE)

            self.hass.config_entries.async_update_entry(
                self.config_entry,
                data=new_data,
            )
            return self.async_create_entry(title="", data={})

        options_schema = vol.Schema(
            {
                vol.Required(
                    CONF_HOST,
                    default=current.get(CONF_HOST, DEFAULT_HOST),
                ): str,
                vol.Required(
                    CONF_PORT,
                    default=current.get(CONF_PORT, DEFAULT_PORT),
                ): int,
                vol.Required(
                    CONF_SCAN_INTERVAL,
                    default=current.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
                ): int,
                vol.Optional(
                    CONF_HOME_LATITUDE,
                    default=current.get(CONF_HOME_LATITUDE),
                ): vol.Coerce(float),
                vol.Optional(
                    CONF_HOME_LONGITUDE,
                    default=current.get(CONF_HOME_LONGITUDE),
                ): vol.Coerce(float),
            }
        )

        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(
                options_schema,
                current,
            ),
        )