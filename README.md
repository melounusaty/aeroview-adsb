# AeroViewADSB

A local Home Assistant integration for receiving live aircraft data from an ADS-B feeder and exposing it as a sensor entity, along with a Lovelace table card for viewing and enriching the aircraft list.

## Overview

AeroViewADSB connects Home Assistant to a local ADS-B data source and creates a master sensor that contains the current aircraft list as attributes.
The integration also enriches aircraft entries with aircraft database information and country/flag metadata when available.
The included Lovelace card displays aircraft in a table and lets you control the visible columns and their order entirely through the `columns:` list.

## Features

- Local polling integration for aircraft data.
- Config flow support for easy setup in Home Assistant.
- Optional home latitude and longitude to calculate distance from home.
- Aircraft database lookup for registration, type, and description.
- Country and flag detection from ICAO range data.
- Custom Lovelace table card with configurable column order.
- Optional enrichment with origin, destination, airline, photo, ... from a separate Flightradar24 `sensor.flightradar24_current_in_area` exposed by [Flightradar24 integration ](https://github.com/AlexandrErohin/home-assistant-flightradar24)by @AlexandrErohin

## Installation

Copy the integration files into your Home Assistant `config/custom_components/aero_view_adsb/` directory and restart Home Assistant.
After restart, add the integration through the Home Assistant UI using the config flow.
The card JavaScript should be added to your Lovelace resources as a custom card.

## Configuration

During setup, the integration asks for:

- Host.
- Port.
- Update interval in seconds.
- Optional home latitude.
- Optional home longitude.

The integration stores the connection settings in the config entry and uses them to poll the local ADS-B feeder.

## Created entities

The integration creates a master sensor `sensor.aeroview_adsb_master_aircraft` that exposes the current aircraft list as attributes.
The sensor entity uses the translation key `current_aircraft` and its state represents the number of aircraft currently received.
The aircraft list is stored in the `aircraft` attribute, and each item contains raw ADS-B values plus enrichment data such as registration, type, description, country, flag image, and distance when available.

## Aircraft attributes

Each aircraft row may include these fields from the ADS-B source:

- `hex`
- `flight`
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
- `mlat`
- `tisb`
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
- `version` [file:3]

When available, the integration also adds:

- `reg`
- `t`
- `desc`
- `country`
- `flag_image`
- `distance_km` [file:3][file:7]

## Aircraft database

If `aircraft.csv.gz` is present in the integration data directory, AeroViewADSB loads it and uses it to enrich aircraft rows with registration, type, and description.
The lookup uses the ICAO24 identifier and supports either CSV header-based or semicolon-separated formats.
If the file is missing, the integration continues to work without the aircraft database.

The Aircraft database is maintained by Mictronics (https://www.mictronics.de/aircraft-database/) and downloaded from the [tar1090-db repo](https://github.com/wiedehopf/tar1090-db/tree/master) by @wiedehopf

### download link for the current aircraft.csv.gz

<https://github.com/wiedehopf/tar1090-db/raw/refs/heads/csv/aircraft.csv.gz>

## Flags and country lookup

If [flightaware dump1090](https://github.com/flightaware/dump1090/tree/master) [`flags.js`](https://github.com/flightaware/dump1090/blob/master/public_html/flags.js) is present in the integration data directory, AeroViewADSB parses ICAO ranges from it and uses those ranges to assign country and flag image values.  
If the file is missing, the integration continues to work without flag enrichment.



## Lovelace card

The `plane-list-card` shows the aircraft list in a table layout.
The card uses `columns:` as the only source of truth for both visibility and order, so adding, removing, or reordering items in the list changes the table directly .
The card can display the core ADS-B aircraft fields and the additional route/schedule fields derived from a separate Flightradar24 sensor.
### Supported column keys

Core columns:

- `flag`
- `flight`
- `hex`
- `reg`
- `type`
- `long_type`
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
- `baro_rate`
- `geom_rate`
- `category`
- `nav_altitude_mcp`
- `nav_altitude_fms`
- `nav_heading`
- `nav_modes`
- `lat`
- `lon`
- `nav_qnh`
- `rssi`
- `emergency`
- `messages`
- `seen`
- `seen_pos`
- `wind_direction`
- `wind_speed`
- `wind_turbulence`
- `temperature`
- `pressure`
- `humidity`
- `version`
- `country`
- `flag_image`
- `distance_km`
- `vr`
- `flightaware`
- `flightradar24`

Enrichment columns:

- `from_to`
- `from_to_icao`
- `from_to_description`
- `from_to_city`
- `airline`
- `origin`
- `destination`
- `photo`
- `sched_dep`
- `sched_arr`
- `est_arr`

origin, destination, airline, photo, ...

## Card configuration

Use the main AeroViewADSB sensor as `entity`, and optionally provide the Flightradar24 current-in-area sensor as `flight_entity` for route enrichment.  
Only the columns listed in `columns:` are rendered, and the order in that list is the order in the table.
The filtering options still apply to the aircraft list before rendering.

### Example

```yaml
type: custom:plane-list-card
entity: sensor.aero_view_adsb_master_aircraft
flight_entity: sensor.flightradar24_current_in_area
table_font_size: 1.3rem
min_altitude: 0
max_distance_km: 1000
min_gs: 30
stale_timeout: 60
columns:
  - flag
  - flight
  - reg
  - airline
  - long_type
  - from_to_city
  - alt_baro
  - vr
  - ias
  - gs
  - mag_heading
  - nav_heading
  - distance_km
  - squawk