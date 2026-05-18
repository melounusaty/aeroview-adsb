# AeroViewADSB

AeroViewADSB is a Home Assistant custom integration for displaying live aircraft data from a local ADS-B feeder. It enriches aircraft with a local aircraft database for registration, short type code, and long type description, plus ICAO-range country and flag mapping.

It consists of:

- A Home Assistant custom integration (`custom_components/aero_view_adsb/`).
- A Lovelace custom card (`plane_list_card.js`) for rendering aircraft in a compact table.
- A local aircraft database file (`aircraft.csv.gz`) for registration/type enrichment.
- A local ICAO range file (`flags.js`) for country/flag enrichment.

---

## Features

- Polls a local ADS-B feeder endpoint.
- Exposes a Home Assistant sensor with aircraft data as attributes.
- Enriches aircraft with:
  - registration (`reg`)
  - short type code (`t`)
  - long type description (`desc`)
  - country
  - flag image
  - distance from home
- Provides a custom Lovelace card for viewing aircraft in a table.
- Supports filtering by altitude, distance, and ground speed.

---

## Project structure

```text
custom_components/
  aero_view_adsb/
    __init__.py          # Integration setup, data coordinator, data loading
    const.py             # Domain and config constants
    config_flow.py       # Config and options flow
    helpers.py           # aircraft DB + ICAO range loading
    sensor.py            # Main sensor entity and aircraft attribute enrichment
    manifest.json        # Home Assistant integration metadata
    brand/
      icon.png           # Brand icon used by HACS / Home Assistant branding
      logo.png           # Optional brand logo

www/
  lovelace-card/
    plane_list_card.js   # Custom Lovelace card

custom_components/aero_view_adsb/data/
  aircraft.csv.gz        # Local aircraft DB from tar1090-db / Mictronics
  flags.js               # ICAO range to country/flag mapping
```

---

## How it works

1. Home Assistant polls the feeder JSON endpoint, for example:
   - `http://HOST:PORT/data/aircraft.json`

2. The integration loads the local aircraft database from:
   - `custom_components/aero_view_adsb/data/aircraft.csv.gz`

3. The integration loads ICAO ranges and flag metadata from:
   - `custom_components/aero_view_adsb/data/flags.js`

4. The sensor exposes the aircraft list as a single attribute:
   - `aircraft`

5. The Lovelace card reads the sensor attributes and renders the aircraft list.

---

## Aircraft database format

The local aircraft database is expected to be a gzipped semicolon-separated file.

Example row:

```text
004002;Z-WPA;B732;00;BOEING 737-200;;;
```

Parsed fields:

- `hex` / ICAO24: `004002`
- `reg`: `Z-WPA`
- `t`: `B732`
- `desc`: `BOEING 737-200`

The loader uses the ICAO hex as the key and stores:

```python
{
  "reg": "...",
  "t": "...",
  "desc": "..."
}
```

---

## Installation

### 1. Copy the integration
Place the integration folder here:

```text
config/custom_components/aero_view_adsb/
```

### 2. Copy the Lovelace card
Place the JavaScript file here:

```text
config/www/lovelace-card/plane_list_card.js
```

### 3. Add the Lovelace resource
Add the card as a resource in Home Assistant:

```yaml
resources:
  - url: /local/lovelace-card/plane_list_card.js?v=1
    type: module
```

If you use YAML mode dashboards, you can add it in `ui-lovelace.yaml`. If you use the UI, add it under Dashboards → Resources.

### 4. Restart Home Assistant
Restart Home Assistant after copying the files and adding the resource.

### 5. Add the integration
Add the AeroViewADSB integration from the Home Assistant UI and configure the feeder host, port, and optional home location.

---

## HACS installation

AeroViewADSB can also be installed through HACS as a custom repository.

### Add the repository
1. Open **HACS** in Home Assistant.
2. Go to **Integrations**.
3. Click the **three dots** in the top right corner.
4. Select **Custom repositories**.
5. Paste the repository URL.
6. Select **Integration** as the type.
7. Click **ADD**.

If the repository is listed in HACS, it will then appear in the integrations store and can be installed from there.

---

## Configuration

The integration uses a config entry. The following fields are configurable:

### Required
- `host`: Feeder host or IP address.
- `port`: Feeder port.

### Optional
- `scan_interval`: Poll interval in seconds. Default is `10`.
- `latitude`: Home latitude used to calculate `distance_km`.
- `longitude`: Home longitude used to calculate `distance_km`.

### Internal/local files
These are loaded from the integration’s `data/` folder:

- `aircraft.csv.gz`
- `flags.js`

---

## Sensor output

The main sensor exposes:

- `timestamp`
- `messages`
- `aircraft`

Each aircraft item can include:

- `hex`
- `flight`
- `reg`
- `t`
- `desc`
- `alt_baro`
- `alt_geom`
- `gs`
- `ias`
- `tas`
- `mach`
- `squawk`
- `track`
- `track_rate`
- `roll`
- `mag_heading`
- `true_heading`
- `baro_rate`
- `geom_rate`
- `category`
- `category_desc`
- `nav_altitude_mcp`
- `nav_altitude_fms`
- `nav_heading`
- `nav_modes`
- `lat`
- `lon`
- `nav_qnh`
- `rssi`
- `emergency`
- `nav_altitude_src`
- `messages`
- `seen`
- `seen_pos`
- `vert_rate`
- `wind_direction`
- `wind_speed`
- `wind_turbulence`
- `temperature`
- `pressure`
- `humidity`
- `notes`
- `seen_clock`
- `version`
- `country`
- `flag_image`
- `distance_km`

Some fields may be missing depending on the aircraft and feeder output.

---

## Lovelace card usage

Example:

```yaml
type: custom:plane-list-card
entity: sensor.aero_view_adsb_01krvzy4z9ajt094cgfy558x6s_master_aircraft
min_altitude: 0
max_distance_km: 1000
min_gs: 0
```

### Card options

- `entity`: Required. The AeroViewADSB sensor entity.
- `min_altitude`: Minimum barometric altitude to show. Default `0`.
- `max_distance_km`: Maximum distance in kilometers. Default `1000`.
- `min_gs`: Minimum ground speed. Default `0`.

---

## Displayed fields in the card

The card can display:

- Flag
- Callsign / hex
- Registration
- Type
- Long type
- Altitude
- Ground speed
- Distance
- Squawk
- Track
- RSSI
- Country

---

## Troubleshooting

### `t` and `desc` are empty
This usually means the aircraft database was loaded, but the row did not contain a matching entry, or the file format is wrong.

### `distance_km` is empty
This usually means:
- home latitude/longitude are not configured, or
- the aircraft has no valid `lat/lon`, or
- distance could not be computed for that aircraft.

### `Unknown type: markdown`
This usually means the markdown card was placed in the wrong part of Lovelace. It must be a top-level card inside a view.

### Card does not load
Check that:
- `plane_list_card.js` is under `/config/www/`
- the resource URL uses `/local/...`
- the version parameter is updated after changes

---

## Data sources

- Aircraft DB: tar1090-db / Mictronics aircraft database.
- Country/flag mapping: `flags.js`.
- Live aircraft feed: local ADS-B feeder JSON.

---

## Notes

- This integration is focused on local/offline enrichment.
- The sensor keeps aircraft data in one entity attribute list, which makes it simple to display in custom Lovelace cards or debug views.
- You can extend the sensor and card later with more fields such as `seen`, `mlat`, `tisb`, `nav_modes`, `vert_rate`, or `baro_rate`.