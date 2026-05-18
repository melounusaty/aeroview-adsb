"""Helper functions for AeroViewADSB."""

import csv
import gzip
import logging
import os
import re

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)


def load_aircraft_db(hass: HomeAssistant):
    path = os.path.join(
        hass.config.config_dir,
        "custom_components",
        "aero_view_adsb",
        "data",
        "aircraft.csv.gz",
    )

    if not os.path.exists(path):
        _LOGGER.warning("aircraft.csv.gz not found; skipping aircraft database lookup")
        return {}

    db = {}
    try:
        with gzip.open(path, "rt", encoding="utf-8", newline="") as f:
            first_data = ""
            for line in f:
                if line.strip():
                    first_data = line
                    break
            f.seek(0)

            if "icao24" in first_data.lower():
                reader = csv.DictReader(f)
                for row in reader:
                    icao24 = (row.get("icao24") or "").strip().lower().strip("'")
                    reg = (row.get("r") or "").strip()
                    t = (row.get("t") or "").strip()
                    desc = (row.get("desc") or "").strip()
                    if icao24:
                        db[icao24] = {"reg": reg, "t": t, "desc": desc}
            else:
                reader = csv.reader(f, delimiter=";")
                for row in reader:
                    if len(row) < 2:
                        continue
                    icao24 = (row[0] or "").strip().lower().strip("'")
                    reg = (row[1] or "").strip()
                    t = (row[2] or "").strip() if len(row) > 2 else ""
                    desc = (row[4] or "").strip() if len(row) > 4 else ""
                    if icao24:
                        db[icao24] = {"reg": reg, "t": t, "desc": desc}
    except Exception as e:
        _LOGGER.warning("Failed to read aircraft database: %s", e)

    return db


def load_icao_ranges_from_js(hass: HomeAssistant):
    path = os.path.join(
        hass.config.config_dir,
        "custom_components",
        "aero_view_adsb",
        "data",
        "flags.js",
    )
    if not os.path.exists(path):
        _LOGGER.warning("flags.js not found; skipping flags")
        return []

    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        _LOGGER.warning("Failed to read flags.js: %s", e)
        return []

    pattern = re.compile(
        r"\{\s*start\s*:\s*0x([0-9a-fA-F]+)\s*,\s*end\s*:\s*0x([0-9a-fA-F]+)\s*,\s*country\s*:\s*\"([^\"]+)\"\s*,\s*flag_image\s*:\s*\"([^\"]+)\"\s*\}",
        re.DOTALL,
    )

    ranges = []
    for match in pattern.finditer(content):
        try:
            start_hex, end_hex, country, flag_image = match.groups()
            ranges.append(
                {
                    "start": int(start_hex, 16),
                    "end": int(end_hex, 16),
                    "country": country,
                    "flag_image": flag_image,
                }
            )
        except Exception as e:
            _LOGGER.debug("Skipping malformed flags.js entry: %s", e)

    _LOGGER.debug("AeroViewADSB parsed %d ICAO ranges from flags.js", len(ranges))
    return ranges


async def async_load_aircraft_db(hass: HomeAssistant):
    return await hass.async_add_executor_job(load_aircraft_db, hass)


async def async_load_icao_ranges_from_js(hass: HomeAssistant):
    return await hass.async_add_executor_job(load_icao_ranges_from_js, hass)