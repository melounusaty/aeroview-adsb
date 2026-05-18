console.log("plane_list_card.js LOADED");

class PlaneListCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    this._config = config;
  }

  getCardSize() {
    return 4;
  }

  set hass(hass) {
    const entity = hass.states[this._config.entity];
    const aircraft = entity?.attributes?.aircraft || [];
    const minAlt = this._config.min_altitude || 0;
    const maxDist = this._config.max_distance_km || 1000;
    const minGS = this._config.min_gs ?? 0;

    const filtered = aircraft.filter((a) => {
      const altOk = Number.isFinite(a.alt_baro) && a.alt_baro >= minAlt;
      const distOk = !a.distance_km || a.distance_km <= maxDist;
      const gsOk = a.gs == null || a.gs >= minGS;
      return altOk && distOk && gsOk;
    });

    this.innerHTML = `
      <ha-card header="Aircraft (${filtered.length})">
        <div style="padding:0.5em 0.75em 1em; overflow-x:auto;">
          <style>
            .plane-row {
              display: grid;
              grid-template-columns: 34px 1.1fr 0.9fr 0.9fr 0.9fr 0.8fr 0.8fr 0.7fr 0.7fr 0.7fr 0.7fr;
              gap: 0.35em;
              align-items: center;
              font-size: 0.86em;
              margin-bottom: 0.2em;
              white-space: nowrap;
            }
            .plane-row.header {
              font-weight: 700;
              margin-bottom: 0.4em;
            }
            .plane-flag {
              width: 28px;
              height: 16px;
              object-fit: contain;
            }
            .plane-col {
              overflow: hidden;
              text-overflow: ellipsis;
            }
          </style>

          <div class="plane-row header">
            <span class="plane-col">Flag</span>
            <span class="plane-col">Callsign / Hex</span>
            <span class="plane-col">Reg</span>
            <span class="plane-col">Type</span>
            <span class="plane-col">Long type</span>
            <span class="plane-col">Alt</span>
            <span class="plane-col">GS</span>
            <span class="plane-col">Dist</span>
            <span class="plane-col">Squawk</span>
            <span class="plane-col">Track</span>
            <span class="plane-col">RSSI</span>
          </div>

          ${filtered.map((a) => `
            <div class="plane-row">
              <span class="plane-col">
                ${a.flag_image ? `<img class="plane-flag" src="/local/lovelace-card/flags/${a.flag_image}" alt="${a.country || 'flag'}">` : ""}
              </span>
              <span class="plane-col" title="${a.hex || ''}">${(a.flight || a.hex || "Unknown").trim()}</span>
              <span class="plane-col">${a.reg || ""}</span>
              <span class="plane-col" title="${a.desc || a.t || ''}">${a.t || ""}</span>
              <span class="plane-col" title="${a.desc || ''}">${a.desc || ""}</span>
              <span class="plane-col">${a.alt_baro ?? ""}</span>
              <span class="plane-col">${a.gs != null ? Math.round(a.gs) : ""}</span>
              <span class="plane-col">${a.distance_km != null ? a.distance_km.toFixed(1) : ""}</span>
              <span class="plane-col">${a.squawk || ""}</span>
              <span class="plane-col">${a.track != null ? a.track.toFixed(1) : ""}</span>
              <span class="plane-col">${a.rssi != null ? a.rssi.toFixed(1) : ""}</span>
            </div>
          `).join("")}
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