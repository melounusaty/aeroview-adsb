
class CountryLookup {
  constructor() {
    this.ranges = [
      { start: 0x700000, end: 0x700fff, country: "Afghanistan", iso_3166_1: "AF" },
      { start: 0x501000, end: 0x5013ff, country: "Albania", iso_3166_1: "AL" },
      { start: 0x0a0000, end: 0x0a7fff, country: "Algeria", iso_3166_1: "DZ" },
      { start: 0x090000, end: 0x090fff, country: "Angola", iso_3166_1: "AO" },
      { start: 0x0ca000, end: 0x0ca3ff, country: "Antigua and Barbuda", iso_3166_1: "AG" },
      { start: 0xe00000, end: 0xe3ffff, country: "Argentina", iso_3166_1: "AR" },
      { start: 0x600000, end: 0x6003ff, country: "Armenia", iso_3166_1: "AM" },
      { start: 0x7c0000, end: 0x7fffff, country: "Australia", iso_3166_1: "AU" },
      { start: 0x440000, end: 0x447fff, country: "Austria", iso_3166_1: "AT" },
      { start: 0x600800, end: 0x600bff, country: "Azerbaijan", iso_3166_1: "AZ" },
      { start: 0x0a8000, end: 0x0a8fff, country: "Bahamas", iso_3166_1: "BS" },
      { start: 0x894000, end: 0x894fff, country: "Bahrain", iso_3166_1: "BH" },
      { start: 0x702000, end: 0x702fff, country: "Bangladesh", iso_3166_1: "BD" },
      { start: 0x0aa000, end: 0x0aa3ff, country: "Barbados", iso_3166_1: "BB" },
      { start: 0x510000, end: 0x5103ff, country: "Belarus", iso_3166_1: "BY" },
      { start: 0x448000, end: 0x44ffff, country: "Belgium", iso_3166_1: "BE" },
      { start: 0x0ab000, end: 0x0ab3ff, country: "Belize", iso_3166_1: "BZ" },
      { start: 0x094000, end: 0x0943ff, country: "Benin", iso_3166_1: "BJ" },
      { start: 0x680000, end: 0x6803ff, country: "Bhutan", iso_3166_1: "BT" },
      { start: 0xe94000, end: 0xe94fff, country: "Bolivia", iso_3166_1: "BO" },
      { start: 0x513000, end: 0x5133ff, country: "Bosnia and Herzegovina", iso_3166_1: "BA" },
      { start: 0x030000, end: 0x0303ff, country: "Botswana", iso_3166_1: "BW" },
      { start: 0xe40000, end: 0xe7ffff, country: "Brazil", iso_3166_1: "BR" },
      { start: 0x895000, end: 0x8953ff, country: "Brunei Darussalam", iso_3166_1: "BN" },
      { start: 0x450000, end: 0x457fff, country: "Bulgaria", iso_3166_1: "BG" },
      { start: 0x09c000, end: 0x09cfff, country: "Burkina Faso", iso_3166_1: "BF" },
      { start: 0x032000, end: 0x032fff, country: "Burundi", iso_3166_1: "BI" },
      { start: 0x70e000, end: 0x70efff, country: "Cambodia", iso_3166_1: "KH" },
      { start: 0x034000, end: 0x034fff, country: "Cameroon", iso_3166_1: "CM" },
      { start: 0xc00000, end: 0xc3ffff, country: "Canada", iso_3166_1: "CA" },
      { start: 0x096000, end: 0x0963ff, country: "Cape Verde", iso_3166_1: "CV" },
      { start: 0x06c000, end: 0x06cfff, country: "Central African Republic", iso_3166_1: "CF" },
      { start: 0x084000, end: 0x084fff, country: "Chad", iso_3166_1: "TD" },
      { start: 0xe80000, end: 0xe80fff, country: "Chile", iso_3166_1: "CL" },
      { start: 0x780000, end: 0x7bffff, country: "China", iso_3166_1: "CN" },
      { start: 0x0ac000, end: 0x0acfff, country: "Colombia", iso_3166_1: "CO" },
      { start: 0x035000, end: 0x0353ff, country: "Comoros", iso_3166_1: "KM" },
      { start: 0x036000, end: 0x036fff, country: "Congo", iso_3166_1: "CG" },
      { start: 0x901000, end: 0x9013ff, country: "Cook Islands", iso_3166_1: "CK" },
      { start: 0x0ae000, end: 0x0aefff, country: "Costa Rica", iso_3166_1: "CR" },
      { start: 0x038000, end: 0x038fff, country: "Cote d'Ivoire", iso_3166_1: "CI" },
      { start: 0x501c00, end: 0x501fff, country: "Croatia", iso_3166_1: "HR" },
      { start: 0x0b0000, end: 0x0b0fff, country: "Cuba", iso_3166_1: "CU" },
      { start: 0x4c8000, end: 0x4c83ff, country: "Cyprus", iso_3166_1: "CY" },
      { start: 0x498000, end: 0x49ffff, country: "Czech Republic", iso_3166_1: "CZ" },
      { start: 0x720000, end: 0x727fff, country: "Democratic People's Republic of Korea", iso_3166_1: "KP" },
      { start: 0x08c000, end: 0x08cfff, country: "Democratic Republic of the Congo", iso_3166_1: "CD" },
      { start: 0x458000, end: 0x45ffff, country: "Denmark", iso_3166_1: "DK" },
      { start: 0x098000, end: 0x0983ff, country: "Djibouti", iso_3166_1: "DJ" },
      { start: 0x0c4000, end: 0x0c4fff, country: "Dominican Republic", iso_3166_1: "DO" },
      { start: 0xe84000, end: 0xe84fff, country: "Ecuador", iso_3166_1: "EC" },
      { start: 0x010000, end: 0x017fff, country: "Egypt", iso_3166_1: "EG" },
      { start: 0x0b2000, end: 0x0b2fff, country: "El Salvador", iso_3166_1: "SV" },
      { start: 0x042000, end: 0x042fff, country: "Equatorial Guinea", iso_3166_1: "GQ" },
      { start: 0x202000, end: 0x2023ff, country: "Eritrea", iso_3166_1: "ER" },
      { start: 0x511000, end: 0x5113ff, country: "Estonia", iso_3166_1: "EE" },
      { start: 0x040000, end: 0x040fff, country: "Ethiopia", iso_3166_1: "ET" },
      { start: 0xc88000, end: 0xc88fff, country: "Fiji", iso_3166_1: "FJ" },
      { start: 0x460000, end: 0x467fff, country: "Finland", iso_3166_1: "FI" },
      { start: 0x380000, end: 0x3bffff, country: "France", iso_3166_1: "FR" },
      { start: 0x03e000, end: 0x03efff, country: "Gabon", iso_3166_1: "GA" },
      { start: 0x09a000, end: 0x09afff, country: "Gambia", iso_3166_1: "GM" },
      { start: 0x514000, end: 0x5143ff, country: "Georgia", iso_3166_1: "GE" },
      { start: 0x3c0000, end: 0x3fffff, country: "Germany", iso_3166_1: "DE" },
      { start: 0x044000, end: 0x044fff, country: "Ghana", iso_3166_1: "GH" },
      { start: 0x468000, end: 0x46ffff, country: "Greece", iso_3166_1: "GR" },
      { start: 0x0cc000, end: 0x0cc3ff, country: "Grenada", iso_3166_1: "GD" },
      { start: 0x0b4000, end: 0x0b4fff, country: "Guatemala", iso_3166_1: "GT" },
      { start: 0x046000, end: 0x046fff, country: "Guinea", iso_3166_1: "GN" },
      { start: 0x048000, end: 0x0483ff, country: "Guinea-Bissau", iso_3166_1: "GW" },
      { start: 0x0b6000, end: 0x0b6fff, country: "Guyana", iso_3166_1: "GY" },
      { start: 0x0b8000, end: 0x0b8fff, country: "Haiti", iso_3166_1: "HT" },
      { start: 0x0ba000, end: 0x0bafff, country: "Honduras", iso_3166_1: "HN" },
      { start: 0x470000, end: 0x477fff, country: "Hungary", iso_3166_1: "HU" },
      { start: 0x4cc000, end: 0x4ccfff, country: "Iceland", iso_3166_1: "IS" },
      { start: 0x800000, end: 0x83ffff, country: "India", iso_3166_1: "IN" },
      { start: 0x8a0000, end: 0x8a7fff, country: "Indonesia", iso_3166_1: "ID" },
      { start: 0x730000, end: 0x737fff, country: "Iran, Islamic Republic of", iso_3166_1: "IR" },
      { start: 0x728000, end: 0x72ffff, country: "Iraq", iso_3166_1: "IQ" },
      { start: 0x4ca000, end: 0x4cafff, country: "Ireland", iso_3166_1: "IE" },
      { start: 0x738000, end: 0x73ffff, country: "Israel", iso_3166_1: "IL" },
      { start: 0x300000, end: 0x33ffff, country: "Italy", iso_3166_1: "IT" },
      { start: 0x0be000, end: 0x0befff, country: "Jamaica", iso_3166_1: "JM" },
      { start: 0x840000, end: 0x87ffff, country: "Japan", iso_3166_1: "JP" },
      { start: 0x740000, end: 0x747fff, country: "Jordan", iso_3166_1: "JO" },
      { start: 0x683000, end: 0x6833ff, country: "Kazakhstan", iso_3166_1: "KZ" },
      { start: 0x04c000, end: 0x04cfff, country: "Kenya", iso_3166_1: "KE" },
      { start: 0xc8e000, end: 0xc8e3ff, country: "Kiribati", iso_3166_1: "KI" },
      { start: 0x706000, end: 0x706fff, country: "Kuwait", iso_3166_1: "KW" },
      { start: 0x601000, end: 0x6013ff, country: "Kyrgyzstan", iso_3166_1: "KG" },
      { start: 0x708000, end: 0x708fff, country: "Lao People's Democratic Republic", iso_3166_1: "LA" },
      { start: 0x502c00, end: 0x502fff, country: "Latvia", iso_3166_1: "LV" },
      { start: 0x748000, end: 0x74ffff, country: "Lebanon", iso_3166_1: "LB" },
      { start: 0x04a000, end: 0x04a3ff, country: "Lesotho", iso_3166_1: "LS" },
      { start: 0x050000, end: 0x050fff, country: "Liberia", iso_3166_1: "LR" },
      { start: 0x018000, end: 0x01ffff, country: "Libyan Arab Jamahiriya", iso_3166_1: "LY" },
      { start: 0x503c00, end: 0x503fff, country: "Lithuania", iso_3166_1: "LT" },
      { start: 0x4d0000, end: 0x4d03ff, country: "Luxembourg", iso_3166_1: "LU" },
      { start: 0x054000, end: 0x054fff, country: "Madagascar", iso_3166_1: "MG" },
      { start: 0x058000, end: 0x058fff, country: "Malawi", iso_3166_1: "MW" },
      { start: 0x750000, end: 0x757fff, country: "Malaysia", iso_3166_1: "MY" },
      { start: 0x05a000, end: 0x05a3ff, country: "Maldives", iso_3166_1: "MV" },
      { start: 0x05c000, end: 0x05cfff, country: "Mali", iso_3166_1: "ML" },
      { start: 0x4d2000, end: 0x4d23ff, country: "Malta", iso_3166_1: "MT" },
      { start: 0x900000, end: 0x9003ff, country: "Marshall Islands", iso_3166_1: "MH" },
      { start: 0x05e000, end: 0x05e3ff, country: "Mauritania", iso_3166_1: "MR" },
      { start: 0x060000, end: 0x0603ff, country: "Mauritius", iso_3166_1: "MU" },
      { start: 0x0d0000, end: 0x0d7fff, country: "Mexico", iso_3166_1: "MX" },
      { start: 0x681000, end: 0x6813ff, country: "Micronesia, Federated States of", iso_3166_1: "FM" },
      { start: 0x4d4000, end: 0x4d43ff, country: "Monaco", iso_3166_1: "MC" },
      { start: 0x682000, end: 0x6823ff, country: "Mongolia", iso_3166_1: "MN" },
      { start: 0x516000, end: 0x5163ff, country: "Montenegro", iso_3166_1: "ME" },
      { start: 0x020000, end: 0x027fff, country: "Morocco", iso_3166_1: "MA" },
      { start: 0x006000, end: 0x006fff, country: "Mozambique", iso_3166_1: "MZ" },
      { start: 0x704000, end: 0x704fff, country: "Myanmar", iso_3166_1: "MM" },
      { start: 0x201000, end: 0x2013ff, country: "Namibia", iso_3166_1: "NA" },
      { start: 0xc8a000, end: 0xc8a3ff, country: "Nauru", iso_3166_1: "NR" },
      { start: 0x70a000, end: 0x70afff, country: "Nepal", iso_3166_1: "NP" },
      { start: 0x480000, end: 0x487fff, country: "Netherlands, Kingdom of the", iso_3166_1: "NL" },
      { start: 0xc80000, end: 0xc87fff, country: "New Zealand", iso_3166_1: "NZ" },
      { start: 0x0c0000, end: 0x0c0fff, country: "Nicaragua", iso_3166_1: "NI" },
      { start: 0x062000, end: 0x062fff, country: "Niger", iso_3166_1: "NE" },
      { start: 0x064000, end: 0x064fff, country: "Nigeria", iso_3166_1: "NG" },
      { start: 0x478000, end: 0x47ffff, country: "Norway", iso_3166_1: "NO" },
      { start: 0x70c000, end: 0x70c3ff, country: "Oman", iso_3166_1: "OM" },
      { start: 0x760000, end: 0x767fff, country: "Pakistan", iso_3166_1: "PK" },
      { start: 0x684000, end: 0x6843ff, country: "Palau", iso_3166_1: "PW" },
      { start: 0x0c2000, end: 0x0c2fff, country: "Panama", iso_3166_1: "PA" },
      { start: 0x898000, end: 0x898fff, country: "Papua New Guinea", iso_3166_1: "PG" },
      { start: 0xe88000, end: 0xe88fff, country: "Paraguay", iso_3166_1: "PY" },
      { start: 0xe8c000, end: 0xe8cfff, country: "Peru", iso_3166_1: "PE" },
      { start: 0x758000, end: 0x75ffff, country: "Philippines", iso_3166_1: "PH" },
      { start: 0x488000, end: 0x48ffff, country: "Poland", iso_3166_1: "PL" },
      { start: 0x490000, end: 0x497fff, country: "Portugal", iso_3166_1: "PT" },
      { start: 0x06a000, end: 0x06a3ff, country: "Qatar", iso_3166_1: "QA" },
      { start: 0x718000, end: 0x71ffff, country: "Republic of Korea", iso_3166_1: "KR" },
      { start: 0x504c00, end: 0x504fff, country: "Republic of Moldova", iso_3166_1: "MD" },
      { start: 0x4a0000, end: 0x4a7fff, country: "Romania", iso_3166_1: "RO" },
      { start: 0x100000, end: 0x1fffff, country: "Russian Federation", iso_3166_1: "RU" },
      { start: 0x06e000, end: 0x06efff, country: "Rwanda", iso_3166_1: "RW" },
      { start: 0xc8c000, end: 0xc8c3ff, country: "Saint Lucia", iso_3166_1: "LC" },
      { start: 0x0bc000, end: 0x0bc3ff, country: "Saint Vincent and the Grenadines", iso_3166_1: "VC" },
      { start: 0x902000, end: 0x9023ff, country: "Samoa", iso_3166_1: "WS" },
      { start: 0x500000, end: 0x5003ff, country: "San Marino", iso_3166_1: "SM" },
      { start: 0x09e000, end: 0x09e3ff, country: "Sao Tome and Principe", iso_3166_1: "ST" },
      { start: 0x710000, end: 0x717fff, country: "Saudi Arabia", iso_3166_1: "SA" },
      { start: 0x070000, end: 0x070fff, country: "Senegal", iso_3166_1: "SN" },
      { start: 0x4c0000, end: 0x4c7fff, country: "Serbia", iso_3166_1: "RS" },
      { start: 0x074000, end: 0x0743ff, country: "Seychelles", iso_3166_1: "SC" },
      { start: 0x076000, end: 0x0763ff, country: "Sierra Leone", iso_3166_1: "SL" },
      { start: 0x768000, end: 0x76ffff, country: "Singapore", iso_3166_1: "SG" },
      { start: 0x505c00, end: 0x505fff, country: "Slovakia", iso_3166_1: "SK" },
      { start: 0x506c00, end: 0x506fff, country: "Slovenia", iso_3166_1: "SI" },
      { start: 0x897000, end: 0x8973ff, country: "Solomon Islands", iso_3166_1: "SB" },
      { start: 0x078000, end: 0x078fff, country: "Somalia", iso_3166_1: "SO" },
      { start: 0x008000, end: 0x00ffff, country: "South Africa", iso_3166_1: "ZA" },
      { start: 0x340000, end: 0x37ffff, country: "Spain", iso_3166_1: "ES" },
      { start: 0x770000, end: 0x777fff, country: "Sri Lanka", iso_3166_1: "LK" },
      { start: 0x07c000, end: 0x07cfff, country: "Sudan", iso_3166_1: "SD" },
      { start: 0x0c8000, end: 0x0c8fff, country: "Suriname", iso_3166_1: "SR" },
      { start: 0x07a000, end: 0x07a3ff, country: "Swaziland", iso_3166_1: "SZ" },
      { start: 0x4a8000, end: 0x4affff, country: "Sweden", iso_3166_1: "SE" },
      { start: 0x4b0000, end: 0x4b7fff, country: "Switzerland", iso_3166_1: "CH" },
      { start: 0x778000, end: 0x77ffff, country: "Syrian Arab Republic", iso_3166_1: "SY" },
      { start: 0x515000, end: 0x5153ff, country: "Tajikistan", iso_3166_1: "TJ" },
      { start: 0x880000, end: 0x887fff, country: "Thailand", iso_3166_1: "TH" },
      { start: 0x512000, end: 0x5123ff, country: "North Macedonia", iso_3166_1: "MK" },
      { start: 0x088000, end: 0x088fff, country: "Togo", iso_3166_1: "TG" },
      { start: 0xc8d000, end: 0xc8d3ff, country: "Tonga", iso_3166_1: "TO" },
      { start: 0x0c6000, end: 0x0c6fff, country: "Trinidad and Tobago", iso_3166_1: "TT" },
      { start: 0x028000, end: 0x02ffff, country: "Tunisia", iso_3166_1: "TN" },
      { start: 0x4b8000, end: 0x4bffff, country: "Turkey", iso_3166_1: "TR" },
      { start: 0x601800, end: 0x601bff, country: "Turkmenistan", iso_3166_1: "TM" },
      { start: 0x068000, end: 0x068fff, country: "Uganda", iso_3166_1: "UG" },
      { start: 0x508000, end: 0x50ffff, country: "Ukraine", iso_3166_1: "UA" },
      { start: 0x896000, end: 0x896fff, country: "United Arab Emirates", iso_3166_1: "AE" },
      { start: 0x400000, end: 0x43ffff, country: "United Kingdom", iso_3166_1: "GB" },
      { start: 0x080000, end: 0x080fff, country: "United Republic of Tanzania", iso_3166_1: "TZ" },
      { start: 0xa00000, end: 0xafffff, country: "United States", iso_3166_1: "US" },
      { start: 0xe90000, end: 0xe90fff, country: "Uruguay", iso_3166_1: "UY" },
      { start: 0x507c00, end: 0x507fff, country: "Uzbekistan", iso_3166_1: "UZ" },
      { start: 0xc90000, end: 0xc903ff, country: "Vanuatu", iso_3166_1: "VU" },
      { start: 0x0d8000, end: 0x0dffff, country: "Venezuela", iso_3166_1: "VE" },
      { start: 0x888000, end: 0x88ffff, country: "Viet Nam", iso_3166_1: "VN" },
      { start: 0x890000, end: 0x890fff, country: "Yemen", iso_3166_1: "YE" },
      { start: 0x08a000, end: 0x08afff, country: "Zambia", iso_3166_1: "ZM" },
      { start: 0x004000, end: 0x0043ff, country: "Zimbabwe", iso_3166_1: "ZW" },
    ];
  }
  find(icao) {
    const hexa = +('0x' + icao);
    for (let i = 0; i < this.ranges.length; ++i) {
      if (hexa >= this.ranges[i].start && hexa <= this.ranges[i].end) return this.ranges[i];
    }
    return null;
  }
}

class RegistrationLookup {
  constructor() {
    this.limitedAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    this.fullAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.strideMappings = [
      { start: 0x008011, s1: 26 * 26, s2: 26, prefix: 'ZS-' },
      { start: 0x390000, s1: 1024, s2: 32, prefix: 'F-G' },
      { start: 0x398000, s1: 1024, s2: 32, prefix: 'F-H' },
      { start: 0x3c4421, s1: 1024, s2: 32, prefix: 'D-A', first: 'AAA', last: 'OZZ' },
      { start: 0x3c0001, s1: 26 * 26, s2: 26, prefix: 'D-A', first: 'PAA', last: 'ZZZ' },
      { start: 0x3c8421, s1: 1024, s2: 32, prefix: 'D-B', first: 'AAA', last: 'OZZ' },
      { start: 0x3c2001, s1: 26 * 26, s2: 26, prefix: 'D-B', first: 'PAA', last: 'ZZZ' },
      { start: 0x3cc000, s1: 26 * 26, s2: 26, prefix: 'D-C' },
      { start: 0x3d04a8, s1: 26 * 26, s2: 26, prefix: 'D-E' },
      { start: 0x3d4950, s1: 26 * 26, s2: 26, prefix: 'D-F' },
      { start: 0x3d8df8, s1: 26 * 26, s2: 26, prefix: 'D-G' },
      { start: 0x3dd2a0, s1: 26 * 26, s2: 26, prefix: 'D-H' },
      { start: 0x3e1748, s1: 26 * 26, s2: 26, prefix: 'D-I' },
      { start: 0x448421, s1: 1024, s2: 32, prefix: 'OO-' },
      { start: 0x458421, s1: 1024, s2: 32, prefix: 'OY-' },
      { start: 0x460000, s1: 26 * 26, s2: 26, prefix: 'OH-' },
      { start: 0x468421, s1: 1024, s2: 32, prefix: 'SX-' },
      { start: 0x490421, s1: 1024, s2: 32, prefix: 'CS-' },
      { start: 0x4a0421, s1: 1024, s2: 32, prefix: 'YR-' },
      { start: 0x4b8421, s1: 1024, s2: 32, prefix: 'TC-' },
      { start: 0x740421, s1: 1024, s2: 32, prefix: 'JY-' },
      { start: 0x760421, s1: 1024, s2: 32, prefix: 'AP-' },
      { start: 0x768421, s1: 1024, s2: 32, prefix: '9V-' },
      { start: 0x778421, s1: 1024, s2: 32, prefix: 'YK-' },
      { start: 0x7c0000, s1: 36 * 36, s2: 36, prefix: 'VH-' },
      { start: 0xc00001, s1: 26 * 26, s2: 26, prefix: 'C-F' },
      { start: 0xc044a9, s1: 26 * 26, s2: 26, prefix: 'C-G' },
      { start: 0xe01041, s1: 4096, s2: 64, prefix: 'LV-' },
    ];
    this.numericMappings = [
      { start: 0x140000, first: 0, count: 100000, template: 'RA-00000' },
      { start: 0x0b03e8, first: 1000, count: 1000, template: 'CU-T0000' },
    ];
    for (let i = 0; i < this.strideMappings.length; ++i) {
      let m = this.strideMappings[i];
      if (!m.alphabet) m.alphabet = this.fullAlphabet;
      if (m.first) {
        let c1 = m.alphabet.indexOf(m.first.charAt(0));
        let c2 = m.alphabet.indexOf(m.first.charAt(1));
        let c3 = m.alphabet.indexOf(m.first.charAt(2));
        m.offset = c1 * m.s1 + c2 * m.s2 + c3;
      } else m.offset = 0;
      if (m.last) {
        let c1 = m.alphabet.indexOf(m.last.charAt(0));
        let c2 = m.alphabet.indexOf(m.last.charAt(1));
        let c3 = m.alphabet.indexOf(m.last.charAt(2));
        m.end = m.start - m.offset + c1 * m.s1 + c2 * m.s2 + c3;
      } else {
        m.end = m.start - m.offset + (m.alphabet.length - 1) * m.s1 + (m.alphabet.length - 1) * m.s2 + (m.alphabet.length - 1);
      }
    }
    for (let i = 0; i < this.numericMappings.length; ++i) this.numericMappings[i].end = this.numericMappings[i].start + this.numericMappings[i].count - 1;
  }
  lookup(hexId) {
    let reg = this.databaseReg(hexId);
    if (reg) return reg;
    hexId = +('0x' + hexId);
    if (isNaN(hexId)) return null;
    reg = this.nReg(hexId) || this.jaReg(hexId) || this.hlReg(hexId) || this.numericReg(hexId) || this.strideReg(hexId);
    return reg || null;
  }
  databaseReg(hexId) { return (window.fr24db && window.fr24db[hexId]) || ''; }
  strideReg(hexId) {
    for (let i = 0; i < this.strideMappings.length; ++i) {
      let m = this.strideMappings[i];
      if (hexId < m.start || hexId > m.end) continue;
      let offset = hexId - m.start + m.offset;
      let i1 = Math.floor(offset / m.s1); offset = offset % m.s1;
      let i2 = Math.floor(offset / m.s2); offset = offset % m.s2;
      let i3 = offset;
      if (i1 < 0 || i1 >= m.alphabet.length || i2 < 0 || i2 >= m.alphabet.length || i3 < 0 || i3 >= m.alphabet.length) continue;
      return m.prefix + m.alphabet.charAt(i1) + m.alphabet.charAt(i2) + m.alphabet.charAt(i3);
    }
    return null;
  }
  numericReg(hexId) {
    for (let i = 0; i < this.numericMappings.length; ++i) {
      let m = this.numericMappings[i];
      if (hexId < m.start || hexId > m.end) continue;
      let reg = hexId - m.start + m.first + '';
      return m.template.substring(0, m.template.length - reg.length) + reg;
    }
    return null;
  }
  nLetters(rem) { if (rem == 0) return ''; --rem; return this.limitedAlphabet.charAt(Math.floor(rem / 25)) + this.nLetter(rem % 25); }
  nLetter(rem) { if (rem == 0) return ''; --rem; return this.limitedAlphabet.charAt(rem); }
  nReg(hexId) {
    let offset = hexId - 0xa00001;
    if (offset < 0 || offset >= 915399) return null;
    let digit1 = Math.floor(offset / 101711) + 1;
    let reg = 'N' + digit1;
    offset = offset % 101711;
    if (offset <= 600) return reg + this.nLetters(offset);
    offset -= 601;
    let digit2 = Math.floor(offset / 10111); reg += digit2; offset = offset % 10111;
    if (offset <= 600) return reg + this.nLetters(offset);
    offset -= 601;
    let digit3 = Math.floor(offset / 951); reg += digit3; offset = offset % 951;
    if (offset <= 600) return reg + this.nLetters(offset);
    offset -= 601;
    let digit4 = Math.floor(offset / 35); reg += digit4.toFixed(0); offset = offset % 35;
    if (offset <= 24) return reg + this.nLetter(offset);
    offset -= 25; return reg + offset.toFixed(0);
  }
  hlReg(hexId) {
    if (hexId >= 0x71ba00 && hexId <= 0x71bf99) return 'HL' + (hexId - 0x71ba00 + 0x7200).toString(16);
    if (hexId >= 0x71c000 && hexId <= 0x71c099) return 'HL' + (hexId - 0x71c000 + 0x8000).toString(16);
    if (hexId >= 0x71c200 && hexId <= 0x71c299) return 'HL' + (hexId - 0x71c200 + 0x8200).toString(16);
    return null;
  }
  jaReg(hexId) {
    let offset = hexId - 0x840000; if (offset < 0 || offset >= 229840) return null;
    let reg = 'JA';
    let digit1 = Math.floor(offset / 22984); if (digit1 < 0 || digit1 > 9) return null; reg += digit1; offset = offset % 22984;
    let digit2 = Math.floor(offset / 916); if (digit2 < 0 || digit2 > 9) return null; reg += digit2; offset = offset % 916;
    if (offset < 340) {
      let digit3 = Math.floor(offset / 34); reg += digit3; offset = offset % 34;
      if (offset < 10) return reg + offset;
      offset -= 10; return reg + this.limitedAlphabet.charAt(offset);
    }
    offset -= 340; let letter3 = Math.floor(offset / 24);
    return reg + this.limitedAlphabet.charAt(letter3) + this.limitedAlphabet.charAt(offset % 24);
  }
}

function isoToFlag(iso) {
  if (!iso || iso.length !== 2) return '—';
  const cc = iso.toUpperCase();
  return String.fromCodePoint(...[...cc].map(c => 127397 + c.charCodeAt(0)));
}

const __countryLookup = new CountryLookup();
const __registrationLookup = new RegistrationLookup();

class ADSBAircraftCardV11 extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'ADS-B Aircraft',
      max_rows: 15,
      distance_unit: 'km',
      columns: ['flag','flight','registration','type','altitude','speed','distance','track','messages','links','squawk'],
      ...config,
    };
  }

  getCardSize() { return 6; }
  _unit() { return String(this.config.distance_unit || 'km').toLowerCase() === 'nm' ? 'nm' : 'km'; }
  _headers(unit) {
    return { flag:'', flight:'Flight', registration:'Reg', icao:'ICAO', type:'Type', description:'Aircraft', altitude:'Alt', speed:'Speed', distance: unit === 'nm' ? 'NM' : 'KM', track:'Track', messages:'Msgs', squawk:'Squawk', links:'Links' };
  }
  _links(a) {
    const out = [];
    if (a.flightaware_url) out.push(`<a href="${a.flightaware_url}" target="_blank" rel="noopener noreferrer">FA</a>`);
    if (a.fr24_url) out.push(`<a href="${a.fr24_url}" target="_blank" rel="noopener noreferrer">FR24</a>`);
    return out.length ? out.join(' <span class="sep">·</span> ') : '—';
  }
  _cell(col, a, unit) {
    switch (col) {
      case 'flag': { const reg = String(a.registration || '').toUpperCase(); const map = [['OK-','CZ'],['SP-','PL'],['D-','DE'],['OE-','AT'],['PH-','NL'],['TC-','TR'],['9H-','MT'],['G-','GB'],['SX-','GR'],['EI-','IE'],['OO-','BE'],['OY-','DK'],['OH-','FI'],['YR-','RO'],['A6-','AE'],['N','US']]; let cc = a.countryCode || a.country_code || a.iso_3166_1 || null; if (!cc && reg) { for (const [p,c] of map) { if (reg.startsWith(p)) { cc = c; break; } } } return cc && String(cc).length === 2 ? isoToFlag(String(cc)) : '—'; }
      case 'flight': return a.flight || '—';
      case 'registration': return a.registration || (a.hex ? (__registrationLookup.lookup(String(a.hex).toUpperCase()) || '—') : '—');
      case 'icao': return a.hex || '—';
      case 'type': return a.type || '—';
      case 'description': return a.description || '—';
      case 'altitude': return a.alt_baro ?? '—';
      case 'speed': return a.gs ?? '—';
      case 'distance': return unit === 'nm' ? (a.distance_nm ?? '—') : (a.distance_km ?? '—');
      case 'track': return a.track ?? '—';
      case 'messages': return a.messages ?? '—';
      case 'squawk': return a.squawk || '—';
      case 'links': return this._links(a);
      default: return a[col] ?? '—';
    }
  }
  set hass(hass) {
    const entityId = this.config.entity;
    const stateObj = hass.states[entityId];
    if (!this._root) {
      const card = document.createElement('ha-card');
      this._root = document.createElement('div');
      card.appendChild(this._root);
      this.appendChild(card);
    }
    if (!stateObj) {
      this._root.innerHTML = `<div style="padding:16px;">Entity not found: ${entityId}</div>`;
      return;
    }
    const attrs = stateObj.attributes || {};
    const unit = this._unit();
    const headers = this._headers(unit);
    const columns = Array.isArray(this.config.columns) ? this.config.columns : ['flag','flight','registration','type','altitude','speed','distance','track','messages','links','squawk'];
    const trackedItems = Array.isArray(attrs.aircraft) ? attrs.aircraft.filter(a => a.lat != null && a.lon != null) : [];
    const items = trackedItems.slice(0, this.config.max_rows);
    const furthestText = unit === 'nm'
      ? `${attrs.furthest_aircraft ?? '—'} · ${attrs.furthest_distance_nm ?? '—'} NM`
      : `${attrs.furthest_aircraft ?? '—'} · ${attrs.furthest_distance_km ?? '—'} KM`;
    this._root.innerHTML = `
      <style>
        .head { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; padding:16px 16px 10px; font-weight:600; }
        .title { font-size: 1rem; }
        .meta { color: var(--secondary-text-color); font-size: 12px; text-align:right; line-height:1.45; }
        .scroll { overflow-x:auto; }
        table { width:100%; border-collapse:collapse; font-size:14px; }
        th, td { padding:8px 10px; border-top:1px solid var(--divider-color); text-align:left; white-space:nowrap; vertical-align:top; }
        th { color:var(--secondary-text-color); font-weight:600; }
        tbody tr:hover { background: rgba(127,127,127,0.08); }
        td.col-flag { font-size:16px; }
        a { color: var(--primary-color); text-decoration:none; }
        .sep { color: var(--secondary-text-color); }
      </style>
      <div class="head">
        <div class="title">${this.config.title || 'ADS-B Aircraft'}</div>
        <div class="meta">
          <div>${stateObj.state} aircraft · ${attrs.messages ?? 'n/a'} messages</div>
          <div>Tracked: ${attrs.tracked_aircraft ?? 0}</div>
          <div>Furthest: ${furthestText}</div>
        </div>
      </div>
      <div class="scroll">
        <table>
          <thead><tr>${columns.map(col => `<th>${headers[col] ?? col}</th>`).join('')}</tr></thead>
          <tbody>${items.map(a => `<tr>${columns.map(col => `<td class="col-${col}">${this._cell(col, a, unit)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  }
}
customElements.define('adsb-aircraft-card-v14', ADSBAircraftCardV11);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'adsb-aircraft-card-v14', name: 'ADSB Aircraft Card v14', description: 'ADS-B aircraft card with strict source-only flags and tracked-aircraft filtering.' });
