"use strict";

console.log("plane_list_card.js LOADED");

class PlaneListCard extends HTMLElement {
  constructor() {
    super();
    this._history = {};
    this._vrMap = {};
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity is required");
    this._config = {
      column_span: 1,
      min_altitude: 0,
      max_distance_km: 1000,
      min_gs: 0,
      stale_timeout: 15,
      table_font_size: "1rem",
      columns: [],
      flight_entity: null,
      ...config,
    };
    this.style.setProperty("--plane-font-size", this._config.table_font_size || "1rem");
  }

  getCardSize() {
    return 4;
  }

  _fmt(v, decimals = 1) {
    if (v === null || v === undefined || v === "") return "";
    if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toFixed(decimals);
    if (Array.isArray(v)) return v.join(", ");
    return String(v);
  }

  _flagPath(flag) {
    return flag ? `/local/aero_view_adsb/flags/${flag}` : "";
  }

  _flightAwareUrl(flight) {
    const s = String(flight || "").trim().replace(/\s+/g, "");
    return s ? `https://www.flightaware.com/live/flight/${encodeURIComponent(s)}` : "";
  }

  _flightradarUrl(reg) {
    const s = String(reg || "").trim();
    return s ? `https://www.flightradar24.com/data/aircraft/${encodeURIComponent(s.toLowerCase())}` : "";
  }

  _link(text, url) {
    if (text === null || text === undefined || String(text).trim() === "") return "";
    if (!url) return this._fmt(text);
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${this._fmt(text)}</a>`;
  }

  _pair(left, right, sep = " > ") {
    const a = String(left || "").trim();
    const b = String(right || "").trim();
    if (a && b) return `${a}${sep}${b}`;
    return a || b || "";
  }

  _fmtAirportCity(city, countryCode, fallbackName) {
    const c = String(city || "").trim();
    const cc = String(countryCode || "").trim().toUpperCase();
    if (c && cc) return `${c}, ${cc}`;
    if (c) return c;
    return String(fallbackName || "").trim();
  }

  _makeFlightLookup(flights) {
    const map = new Map();
    for (const f of flights || []) {
      const keys = [f.flight_number, f.callsign, f.aircraft_registration]
        .filter(Boolean)
        .map(s => String(s).trim().toUpperCase());
      for (const k of keys) if (!map.has(k)) map.set(k, f);
    }
    return map;
  }

  _enrichFromFlightSensor(a, lookup) {
    const m =
      lookup.get(String(a.flight || "").trim().toUpperCase()) ||
      lookup.get(String(a.reg || "").trim().toUpperCase());
    if (!m) return a;

    return {
      ...a,
      fr_from_to: this._pair(m.airport_origin_code_iata, m.airport_destination_code_iata, " > "),
      fr_from_to_icao: this._pair(m.airport_origin_code_icao, m.airport_destination_code_icao, " > "),
      fr_from_to_description: this._pair(m.airport_origin_name, m.airport_destination_name, " > "),
      fr_from_to_city: this._pair(
        this._fmtAirportCity(m.airport_origin_city, m.airport_origin_country_code, m.airport_origin_name),
        this._fmtAirportCity(m.airport_destination_city, m.airport_destination_country_code, m.airport_destination_name),
        " > "
      ),
      fr_airline: m.airline_short || m.airline || "",
      fr_origin: m.airport_origin_code_iata || "",
      fr_destination: m.airport_destination_code_iata || "",
      fr_photo: m.aircraft_photo_medium || m.aircraft_photo_small || m.aircraft_photo_large || "",
      fr_sched_dep: m.time_scheduled_departure ?? null,
      fr_sched_arr: m.time_scheduled_arrival ?? null,
      fr_est_arr: m.time_estimated_arrival ?? null,
    };
  }

  _columnDefs() {
    return {
      flag: {
        label: "",
        className: "flag",
        value: a => (a.flag_image ? `<img class="plane-flag" src="${this._flagPath(a.flag_image)}" alt="${a.country || "flag"}">` : ""),
      },
      flight: {
        label: "Flight",
        className: "text",
        value: a => this._link((a.flight || "").trim(), this._flightAwareUrl(a.flight)),
      },
      hex: {
        label: "Hex",
        className: "tight",
        value: a => a.hex,
      },
      reg: {
        label: "Reg",
        className: "text",
        value: a => this._link(a.reg, this._flightradarUrl(a.reg)),
      },
      type: {
        label: "Type",
        className: "tight",
        value: a => a.t,
      },
      long_type: {
        label: "Long type",
        className: "text",
        value: a => a.desc,
      },
      alt_baro: {
        label: "Alt",
        className: "tight num",
        value: a => a.alt_baro,
      },
      alt_geom: {
        label: "AltG",
        className: "tight num",
        value: a => a.alt_geom,
      },
      gs: {
        label: "GS",
        className: "tight num",
        value: a => a.gs,
      },
      ias: {
        label: "IAS",
        className: "tight num",
        value: a => a.ias,
      },
      tas: {
        label: "TAS",
        className: "tight num",
        value: a => a.tas,
      },
      mach: {
        label: "Mach",
        className: "tight num",
        value: a => a.mach,
      },
      squawk: {
        label: "Squawk",
        className: "tight",
        value: a => a.squawk,
      },
      track: {
        label: "Track",
        className: "tight num",
        value: a => a.track,
      },
      track_rate: {
        label: "TrkR",
        className: "tight num",
        value: a => a.track_rate,
      },
      roll: {
        label: "Roll",
        className: "tight num",
        value: a => a.roll,
      },
      mag_heading: {
        label: "HDG",
        className: "tight num",
        value: a => a.mag_heading,
      },
      baro_rate: {
        label: "BaroR",
        className: "tight num",
        value: a => a.baro_rate,
      },
      geom_rate: {
        label: "GeomR",
        className: "tight num",
        value: a => a.geom_rate,
      },
      category: {
        label: "Cat",
        className: "tight",
        value: a => a.category || a.category_desc,
      },
      nav_altitude_mcp: {
        label: "MCP",
        className: "tight num",
        value: a => a.nav_altitude_mcp,
      },
      nav_altitude_fms: {
        label: "FMS",
        className: "tight num",
        value: a => a.nav_altitude_fms,
      },
      nav_heading: {
        label: "NavH",
        className: "tight num",
        value: a => a.nav_heading,
      },
      nav_modes: {
        label: "Modes",
        className: "text",
        value: a => a.nav_modes,
      },
      lat: {
        label: "Lat",
        className: "tight num",
        value: a => a.lat,
      },
      lon: {
        label: "Lon",
        className: "tight num",
        value: a => a.lon,
      },
      nav_qnh: {
        label: "QNH",
        className: "tight num",
        value: a => a.nav_qnh,
      },
      rssi: {
        label: "RSSI",
        className: "tight num",
        value: a => a.rssi,
      },
      emergency: {
        label: "Emerg",
        className: "tight",
        value: a => a.emergency,
      },
      messages: {
        label: "Msg",
        className: "tight num",
        value: a => a.messages,
      },
      seen: {
        label: "Seen",
        className: "tight num",
        value: a => a.seen,
      },
      seen_pos: {
        label: "SeenPos",
        className: "tight num",
        value: a => a.seen_pos,
      },
      wind_direction: {
        label: "WindDir",
        className: "tight num",
        value: a => a.wind_direction,
      },
      wind_speed: {
        label: "WindSpd",
        className: "tight num",
        value: a => a.wind_speed,
      },
      wind_turbulence: {
        label: "WindTurb",
        className: "tight",
        value: a => a.wind_turbulence,
      },
      temperature: {
        label: "Temp",
        className: "tight num",
        value: a => a.temperature,
      },
      pressure: {
        label: "Press",
        className: "tight num",
        value: a => a.pressure,
      },
      humidity: {
        label: "Hum",
        className: "tight num",
        value: a => a.humidity,
      },
      version: {
        label: "Ver",
        className: "tight",
        value: a => a.version,
      },
      country: {
        label: "Country",
        className: "text",
        value: a => a.country,
      },
      flag_image: {
        label: "Flag",
        className: "flag",
        value: a => (a.flag_image ? `<img class="plane-flag" src="${this._flagPath(a.flag_image)}" alt="${a.country || "flag"}">` : ""),
      },
      distance_km: {
        label: "Dist",
        className: "tight num",
        value: a => {
          const n = Number(a.distance_km);
          return Number.isFinite(n) ? `${n.toFixed(1)}km` : "";
        },
      },
      vr: {
        label: "VR",
        className: "tight num vr",
        value: a => {
          const raw = Number.isFinite(Number(a.baro_rate)) ? Number(a.baro_rate) : Number(a.geom_rate);
          if (!Number.isFinite(raw)) return "";
          if (Math.abs(raw) < 50) return "";
          const v = Math.round(raw / 10) * 10;
          return `${v > 0 ? "↑" : "↓"} ${Math.abs(v)}`;
        },
      },
      flightaware: {
        label: "FA",
        className: "text",
        value: a => this._link(a.flight, this._flightAwareUrl(a.flight)),
      },
      flightradar24: {
        label: "FR24",
        className: "text",
        value: a => this._link(a.reg, this._flightradarUrl(a.reg)),
      },

      // ── Flight sensor enrichment ──────────────────────────────────
      from_to: {
        label: "From/To",
        className: "text",
        value: a => a.fr_from_to || "",
      },
      from_to_icao: {
        label: "ICAO",
        className: "text",
        value: a => a.fr_from_to_icao || "",
      },
      from_to_description: {
        label: "Route",
        className: "text",
        value: a => a.fr_from_to_description || "",
      },
      from_to_city: {
        label: "From/To",
        className: "text",
        value: a => a.fr_from_to_city || "",
      },
      airline: {
        label: "Airline",
        className: "text",
        value: a => a.fr_airline || "",
      },
      origin: {
        label: "From",
        className: "tight",
        value: a => a.fr_origin || "",
      },
      destination: {
        label: "To",
        className: "tight",
        value: a => a.fr_destination || "",
      },
      photo: {
        label: "Photo",
        className: "text",
        value: a => a.fr_photo ? `<a href="${a.fr_photo}" target="_blank" rel="noopener noreferrer">Photo</a>` : "",
      },
      sched_dep: {
        label: "Sched D",
        className: "tight",
        value: a => a.fr_sched_dep ? new Date(a.fr_sched_dep * 1000).toLocaleTimeString() : "",
      },
      sched_arr: {
        label: "Sched A",
        className: "tight",
        value: a => a.fr_sched_arr ? new Date(a.fr_sched_arr * 1000).toLocaleTimeString() : "",
      },
      est_arr: {
        label: "Est A",
        className: "tight",
        value: a => a.fr_est_arr ? new Date(a.fr_est_arr * 1000).toLocaleTimeString() : "",
      },
    };
  }

  _enabledColumns() {
    const defs = this._columnDefs();
    return (this._config.columns || [])
      .map(key => ({ key, ...defs[key] }))
      .filter(c => c.label !== undefined);
  }

  _isFresh(a) {
    const timeout = Number(this._config.stale_timeout);
    if (!Number.isFinite(timeout) || timeout < 0) return true;
    const hasPos = a.lat != null && a.lon != null;
    const sp = Number(a.seen_pos);
    const s = Number(a.seen);
    return (hasPos && Number.isFinite(sp) && sp <= timeout) ||
           (!hasPos && Number.isFinite(s) && s <= timeout);
  }

  _buildVrMap(aircraft, snapshotTs) {
    const nextHistory = {};
    const vrMap = {};
    for (const a of aircraft) {
      const hex = a.hex;
      if (!hex) continue;
      const alt = a.alt_baro != null ? Number(a.alt_baro) : Number(a.alt_geom);
      if (!Number.isFinite(alt)) continue;
      const prev = this._history[hex];
      if (prev && Number.isFinite(prev.alt) && Number.isFinite(prev.ts) && snapshotTs > prev.ts) {
        const dt = snapshotTs - prev.ts;
        if (dt >= 5) {
          const fpm = ((alt - prev.alt) / dt) * 60;
          if (Number.isFinite(fpm) && Math.abs(fpm) >= 50) vrMap[hex] = Math.round(fpm / 10) * 10;
        }
      }
      nextHistory[hex] = { alt, ts: snapshotTs };
    }
    this._history = nextHistory;
    this._vrMap = vrMap;
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this._hass || !this._config) return;

    const entity = this._hass.states[this._config.entity];
    const flightEntity = this._config.flight_entity
      ? this._hass.states[this._config.flight_entity]
      : null;

    const aircraft = entity?.attributes?.aircraft || [];
    const flights = flightEntity?.attributes?.flights || [];
    const snapshotTs = Number(entity?.attributes?.timestamp) || Date.now() / 1000;

    this._buildVrMap(aircraft, snapshotTs);

    const lookup = this._makeFlightLookup(flights);
    const enriched = aircraft.map(a => this._enrichFromFlightSensor(a, lookup));

    const minAlt = this._config.min_altitude || 0;
    const maxDist = this._config.max_distance_km || 1000;
    const minGS = this._config.min_gs ?? 0;

    const filtered = enriched.filter(
      a =>
        this._isFresh(a) &&
        (a.alt_baro == null || a.alt_baro >= minAlt) &&
        (a.distance_km == null || a.distance_km <= maxDist) &&
        (a.gs == null || a.gs >= minGS)
    );

    const withPos = filtered.filter(a => a.lat != null && a.lon != null).length;
    const noPos = filtered.length - withPos;

    const cols = this._enabledColumns();

    if (!cols.length) {
      this.innerHTML = `<ha-card><div style="padding: 0.5rem 0.6rem;">No columns selected.</div></ha-card>`;
      return;
    }

    const headerCells = cols.map(c => `<th class="${c.className}">${c.label}</th>`).join("");
    const rows = filtered
      .map(
        (a, idx) => `
        <tr class="${idx % 2 === 0 ? "even" : "odd"} ${a.lat != null && a.lon != null ? "tracked" : "no-pos"}">
          ${cols.map(c => `<td class="${c.className}">${c.value(a) ?? ""}</td>`).join("")}
        </tr>`
      )
      .join("");

    this.innerHTML = `
      <ha-card>
        <div class="plane-wrap">
          <style>
            .plane-wrap {
              padding: 0.25rem 0.35rem 0.4rem;
              overflow-x: auto;
              width: 100%;
              box-sizing: border-box;
            }
            .summary {
              font-size: 0.78rem;
              line-height: 1.1;
              opacity: 0.8;
              margin: 0.35rem 0 0 0;
            }
            table.plane-table {
              border-collapse: collapse;
              width: 100%;
              table-layout: auto;
              white-space: nowrap;
              font-size: var(--plane-font-size, 1rem);
              line-height: 1.1;
            }
            .plane-table thead tr {
              background: rgba(3, 169, 244, 0.12);
            }
            .plane-table th,
            .plane-table td {
              padding: 0.08rem 0.5rem 0.08rem 0;
              text-align: left;
              vertical-align: middle;
            }
            .plane-table th {
              font-weight: 700;
              padding-bottom: 0.2rem;
              border-bottom: 1px solid rgba(255, 255, 255, 0.16);
            }
            .plane-table tbody tr.even {
              background: rgba(255, 255, 255, 0.025);
            }
            .plane-table tbody tr.odd {
              background: rgba(255, 255, 255, 0.055);
            }
            .plane-table tbody tr:hover {
              background: rgba(3, 169, 244, 0.12);
            }
            .plane-table th:last-child,
            .plane-table td:last-child {
              padding-right: 0;
            }
            .flag {
              width: 22px;
              padding-right: 0.25rem;
            }
            .text {
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .tight {
              padding-right: 0.5rem;
            }
            .num {
              text-align: right;
            }
            .vr {
              min-width: 6.5ch;
              width: 6.5ch;
              max-width: 6.5ch;
            }
            .plane-flag {
              width: 21px;
              height: 12px;
              max-width: 21px;
              max-height: 12px;
              object-fit: contain;
              object-position: center;
              vertical-align: middle;
              display: block;
            }
            a {
              color: var(--primary-color);
              text-decoration: none;
            }
          </style>

          <table class="plane-table">
            <thead>
              <tr>${headerCells}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="summary">
            Total: ${filtered.length} · With position: ${withPos} · No position: ${noPos}
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("plane-list-card", PlaneListCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "plane-list-card",
  name: "AeroViewADSB Plane List",
  description: "Displays aircraft from AeroViewADSB sensor",
});