"use strict";

console.log("plane_list_card.js LOADED");

class PlaneListCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) throw new Error("Entity is required");
    this._config = {
      column_span: 1,
      min_altitude: 0,
      max_distance_km: 1000,
      min_gs: 0,
      show_flag: false,
      show_hex: false,
      show_flight: false,
      show_reg: true,
      show_type: false,
      show_long_type: false,
      show_alt_baro: false,
      show_alt_geom: false,
      show_gs: false,
      show_ias: false,
      show_tas: false,
      show_mach: false,
      show_squawk: false,
      show_track: false,
      show_track_rate: false,
      show_roll: false,
      show_mag_heading: false,
      show_baro_rate: false,
      show_geom_rate: false,
      show_category: false,
      show_nav_altitude_mcp: false,
      show_nav_altitude_fms: false,
      show_nav_heading: false,
      show_nav_modes: false,
      show_lat: false,
      show_lon: false,
      show_nav_qnh: false,
      show_rssi: false,
      show_emergency: false,
      show_messages: false,
      show_seen: false,
      show_seen_pos: false,
      show_wind_direction: false,
      show_wind_speed: false,
      show_wind_turbulence: false,
      show_temperature: false,
      show_pressure: false,
      show_humidity: false,
      show_version: false,
      show_country: false,
      show_flag_image: false,
      show_distance_km: true,
      show_vr: true,
      show_flightaware: false,
      show_flightradar24: false,
      ...config,
    };
  }

  getCardSize() { return 4; }

  _fmt(v, decimals = 1) {
    if (v === null || v === undefined || v === "") return "";
    if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toFixed(decimals);
    if (Array.isArray(v)) return v.join(", ");
    return String(v);
  }

  _flagPath(flag) { return flag ? `/local/lovelace-card/flags/${flag}` : ""; }

  _flightAwareUrl(flight) {
    const s = String(flight || "").trim().replace(/\s+/g, "");
    return s ? `https://www.flightaware.com/live/flight/${encodeURIComponent(s)}` : "";
  }

  _flightradarUrl(reg) {
    const s = String(reg || "").trim();
    return s ? `https://www.flightradar24.com/data/aircraft/${encodeURIComponent(s.toLowerCase())}` : "";
  }

  _link(text, url) {
    if (!text) return "";
    if (!url) return this._fmt(text);
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${this._fmt(text)}</a>`;
  }

  _enabledColumns() {
    return [
      { key: "show_flag", label: "Flag", value: a => a.flag_image ? `<img class="plane-flag" src="${this._flagPath(a.flag_image)}" alt="${a.country || "flag"}">` : "" },
      { key: "show_flight", label: "Flight", value: a => this._link((a.flight || "").trim(), this._flightAwareUrl(a.flight)) },
      { key: "show_hex", label: "Hex", value: a => a.hex },
      { key: "show_reg", label: "Reg", value: a => this._link(a.reg, this._flightradarUrl(a.reg)) },
      { key: "show_type", label: "Type", value: a => a.t },
      { key: "show_long_type", label: "Long type", value: a => a.desc },
      { key: "show_alt_baro", label: "Alt", value: a => a.alt_baro },
      { key: "show_alt_geom", label: "Alt geom", value: a => a.alt_geom },
      { key: "show_gs", label: "GS", value: a => a.gs },
      { key: "show_ias", label: "IAS", value: a => a.ias },
      { key: "show_tas", label: "TAS", value: a => a.tas },
      { key: "show_mach", label: "Mach", value: a => a.mach },
      { key: "show_squawk", label: "Squawk", value: a => a.squawk },
      { key: "show_track", label: "Track", value: a => a.track },
      { key: "show_track_rate", label: "Track rate", value: a => a.track_rate },
      { key: "show_roll", label: "Roll", value: a => a.roll },
      { key: "show_mag_heading", label: "Mag hdg", value: a => a.mag_heading },
      { key: "show_baro_rate", label: "Baro rate", value: a => a.baro_rate },
      { key: "show_geom_rate", label: "Geom rate", value: a => a.geom_rate },
      { key: "show_category", label: "Category", value: a => a.category },
      { key: "show_nav_altitude_mcp", label: "Nav MCP", value: a => a.nav_altitude_mcp },
      { key: "show_nav_altitude_fms", label: "Nav FMS", value: a => a.nav_altitude_fms },
      { key: "show_nav_heading", label: "Nav hdg", value: a => a.nav_heading },
      { key: "show_nav_modes", label: "Nav modes", value: a => a.nav_modes },
      { key: "show_lat", label: "Lat", value: a => a.lat },
      { key: "show_lon", label: "Lon", value: a => a.lon },
      { key: "show_nav_qnh", label: "QNH", value: a => a.nav_qnh },
      { key: "show_rssi", label: "RSSI", value: a => a.rssi },
      { key: "show_emergency", label: "Emergency", value: a => a.emergency },
      { key: "show_messages", label: "Messages", value: a => a.messages },
      { key: "show_seen", label: "Seen", value: a => a.seen },
      { key: "show_seen_pos", label: "Seen pos", value: a => a.seen_pos },
      { key: "show_wind_direction", label: "Wind dir", value: a => a.wind_direction },
      { key: "show_wind_speed", label: "Wind spd", value: a => a.wind_speed },
      { key: "show_wind_turbulence", label: "Wind turb", value: a => a.wind_turbulence },
      { key: "show_temperature", label: "Temp", value: a => a.temperature },
      { key: "show_pressure", label: "Press", value: a => a.pressure },
      { key: "show_humidity", label: "Humidity", value: a => a.humidity },
      { key: "show_version", label: "Version", value: a => a.version },
      { key: "show_country", label: "Country", value: a => a.country },
      { key: "show_flag_image", label: "Flag image", value: a => a.flag_image },
      { key: "show_distance_km", label: "Dist", value: a => a.distance_km },
      { key: "show_flightaware", label: "FlightAware", value: a => this._flightAwareUrl(a.flight) },
      { key: "show_flightradar24", label: "FR24", value: a => this._flightradarUrl(a.reg) },
    ].filter(c => this._config[c.key]);
  }

  set hass(hass) { this._hass = hass; this.render(); }

  render() {
    if (!this._hass || !this._config) return;
    const entity = this._hass.states[this._config.entity];
    const aircraft = entity?.attributes?.aircraft || [];
    const minAlt = this._config.min_altitude || 0;
    const maxDist = this._config.max_distance_km || 1000;
    const minGS = this._config.min_gs ?? 0;
    const filtered = aircraft.filter(a => (a.alt_baro == null || a.alt_baro >= minAlt) && (a.distance_km == null || a.distance_km <= maxDist) && (a.gs == null || a.gs >= minGS));
    const cols = this._enabledColumns();
    if (!cols.length) {
      this.innerHTML = `<ha-card header="Aircraft (${filtered.length})"><div style="padding: 1em;">No columns enabled.</div></ha-card>`;
      return;
    }
    const headerCols = cols.map(c => `<span class="plane-col">${c.label}</span>`).join("");
    const rows = filtered.map(a => `<div class="plane-row">${cols.map(c => `<span class="plane-col">${c.value(a) || ""}</span>`).join("")}</div>`).join("");
    this.innerHTML = `
      <ha-card header="Aircraft (${filtered.length})">
        <div style="padding:0.5em 0.75em 1em; overflow-x:auto;">
          <style>
            .plane-row { display: grid; grid-template-columns: repeat(${cols.length}, minmax(80px, auto)); gap: 0.35em; align-items: center; font-size: 0.86em; margin-bottom: 0.2em; white-space: nowrap; }
            .plane-row.header { font-weight: 700; margin-bottom: 0.4em; }
            .plane-flag { width: 28px; height: 16px; object-fit: contain; vertical-align: middle; }
            .plane-col { overflow: hidden; text-overflow: ellipsis; }
            a { color: var(--primary-color); text-decoration: none; }
          </style>
          <div class="plane-row header">${headerCols}</div>
          ${rows}
        </div>
      </ha-card>
    `;
  }
}

customElements.define("plane-list-card", PlaneListCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "plane-list-card", name: "AeroViewADSB Plane List", description: "Displays aircraft from AeroViewADSB sensor" });