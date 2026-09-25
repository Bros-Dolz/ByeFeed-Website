// ByeFeed website: prices in the visitor's own currency.
//
// ByeFeed is sold in three income tiers, so one US price on the page is the
// wrong number for most of the countries it ships to. DATA below is generated
// by tools/build_local_prices.mjs from play-console-prices.csv (Play Console's
// own regional price export), play-pricing-tiers.csv (the tiers behind it) and
// a day's exchange rates. Run that script again to refresh it; never edit DATA
// by hand.
//
// Which figures are exact:
//   * The CURRENCY and the LIFETIME price are Play Console's own, for every
//     market.
//   * MONTHLY and YEARLY are converted from the tier's dollar price, except
//     where Play bills in dollars with no VAT and the dollar figure is itself
//     the shop price. The page says so under the plans.
//
// Detection is entirely local, in this order: a country the visitor picked
// before, then the device timezone, then the browser locale's region, then
// the United States. Nothing is sent anywhere; the picker exists because each
// of those signals can be wrong. With JavaScript off, the page shows the US
// prices already written into the HTML.
(function () {
  "use strict";

  // code | name | tier | currency | monthly | yearly | lifetime
  var DATA = "AE|United Arab Emirates|1|AED|26.99|230.99|689.99;AT|Austria|1|EUR|6.99|62.99|189.99;AU|Australia|1|AUD|10.99|92.99|279.99;AW|Aruba|1|USD|6.99|59.99|179.99;BE|Belgium|1|EUR|6.99|62.99|189.99;BH|Bahrain|1|USD|7.99|65.99|199.99;BM|Bermuda|1|USD|6.99|59.99|179.99;BS|Bahamas|1|USD|6.99|59.99|179.99;CA|Canada|1|CAD|9.99|83.99|249.99;CH|Switzerland|1|CHF|5.99|48.99|150;CY|Cyprus|1|EUR|6.99|61.99|189.99;CZ|Czechia|1|CZK|178.99|1537.99|4599.99;DE|Germany|1|EUR|6.99|61.99|184.99;DK|Denmark|1|DKK|56.99|487.99|1449;EE|Estonia|1|EUR|7.99|64.99|194.99;ES|Spain|1|EUR|6.99|62.99|189.99;FI|Finland|1|EUR|7.99|65.99|194.99;FR|France|1|EUR|6.99|62.99|189.99;GB|United Kingdom|1|GBP|5.99|53.99|159.99;GI|Gibraltar|1|GBP|4.99|44.99|134.99;GR|Greece|1|EUR|7.99|64.99|194.99;HK|Hong Kong|1|HKD|54.99|470.99|1409;IE|Ireland|1|EUR|6.99|63.99|194.99;IL|Israel|1|ILS|20.99|181.99|549.9;IS|Iceland|1|EUR|7.99|64.99|194.46;IT|Italy|1|EUR|6.99|63.99|189.99;JP|Japan|1|JPY|1200|10000|30900;KR|South Korea|1|KRW|11000|91000|270000;KW|Kuwait|1|USD|6.99|59.99|179.99;KY|Cayman Islands|1|USD|6.99|59.99|179.99;LI|Liechtenstein|1|CHF|5.99|52.99|160;LT|Lithuania|1|EUR|6.99|62.99|189.99;LU|Luxembourg|1|EUR|6.99|60.99|184.99;LV|Latvia|1|EUR|6.99|62.99|189.99;MC|Monaco|1|EUR|6.99|62.99|189.99;MO|Macao|1|MOP|55.99|484.99|1480;MT|Malta|1|EUR|6.99|61.99|185.05;NL|Netherlands|1|EUR|6.99|62.99|189.99;NO|Norway|1|NOK|81.99|705.99|2099;NZ|New Zealand|1|NZD|13.99|119.99|359.99;OM|Oman|1|USD|6.99|62.99|189.99;PT|Portugal|1|EUR|6.99|63.99|194.99;QA|Qatar|1|QAR|24.99|217.99|655;SA|Saudi Arabia|1|SAR|29.99|258.99|779.99;SE|Sweden|1|SEK|85.99|735.99|2199;SG|Singapore|1|SGD|9.99|82.99|249.99;SI|Slovenia|1|EUR|6.99|63.99|189.99;SK|Slovakia|1|EUR|6.99|63.99|194.99;SM|San Marino|1|EUR|5.99|51.99|154.99;TC|Turks & Caicos Islands|1|USD|6.99|59.99|179.99;TW|Taiwan|1|TWD|233.99|2006.99|6030;US|United States|1|USD|6.99|59.99|179.99;VA|Vatican City|1|EUR|5.99|51.99|154.99;VG|British Virgin Islands|1|USD|6.99|59.99|179.99;AG|Antigua & Barbuda|2|USD|3.49|29.99|89.99;AL|Albania|2|USD|4.2|35.99|107.99;AM|Armenia|2|USD|3.49|29.99|89.99;AR|Argentina|2|USD|3.49|29.99|89.99;AZ|Azerbaijan|2|USD|3.49|29.99|89.99;BA|Bosnia & Herzegovina|2|USD|3.49|29.99|89.99;BG|Bulgaria|2|EUR|3.65|30.99|94.99;BR|Brazil|2|BRL|17.99|153.99|459.99;BW|Botswana|2|USD|3.49|29.99|89.99;BY|Belarus|2|USD|4.2|35.99|107.99;BZ|Belize|2|USD|3.49|29.99|89.99;CL|Chile|2|CLP|4000|34000|103000;CO|Colombia|2|COP|10919.99|93832.99|285000;CR|Costa Rica|2|CRC|1564.99|13450.99|40200;DM|Dominica|2|USD|3.49|29.99|89.99;DO|Dominican Republic|2|USD|3.49|29.99|89.99;DZ|Algeria|2|DZD|466.99|4012.99|12000;EC|Ecuador|2|USD|3.49|29.99|89.99;FJ|Fiji|2|USD|3.49|29.99|89.99;GA|Gabon|2|EUR|3.05|25.99|78.4;GD|Grenada|2|USD|3.49|29.99|89.99;GE|Georgia|2|GEL|10.99|91.99|274;GT|Guatemala|2|USD|3.49|29.99|89.99;HR|Croatia|2|EUR|3.8|32.99|99.99;HU|Hungary|2|HUF|1401.99|12043.99|35999;ID|Indonesia|2|IDR|61914.99|532039.99|1590000;IQ|Iraq|2|IQD|4600|39000|118000;JM|Jamaica|2|USD|3.49|29.99|89.99;KN|St. Kitts & Nevis|2|USD|3.49|29.99|89.99;KZ|Kazakhstan|2|KZT|1803.99|15500.99|46990;LC|St. Lucia|2|USD|3.49|29.99|89.99;LY|Libya|2|USD|3.49|29.99|89.99;MD|Moldova|2|USD|4.2|35.99|107.99;MK|North Macedonia|2|USD|4.1|34.99|106.19;MN|Mongolia|2|MNT|12661.99|108804.99|323400;MU|Mauritius|2|USD|3.49|29.99|89.99;MV|Maldives|2|USD|3.49|29.99|89.99;MX|Mexico|2|MXN|69.99|597.99|1799;MY|Malaysia|2|MYR|14.99|132.99|399.99;NA|Namibia|2|USD|3.49|29.99|89.99;PA|Panama|2|USD|3.49|29.99|89.99;PE|Peru|2|PEN|11.99|100.99|299.99;PL|Poland|2|PLN|15.99|139.99|419.99;PY|Paraguay|2|PYG|21000|180000|550000;RO|Romania|2|RON|18.99|165.99|499.99;RS|Serbia|2|RSD|450|3700|10999;RU|Russia|2|RUB|294.99|2532.99|7599;SC|Seychelles|2|USD|3.49|29.99|89.99;SR|Suriname|2|USD|3.49|29.99|89.99;TH|Thailand|2|THB|123.99|1067.99|3200;TM|Turkmenistan|2|USD|3.49|29.99|89.99;TO|Tonga|2|USD|3.49|29.99|89.99;TR|T\u00fcrkiye|2|TRY|203.99|1753.99|5269.99;TT|Trinidad & Tobago|2|USD|3.49|29.99|89.99;UY|Uruguay|2|USD|3.49|29.99|89.99;ZA|South Africa|2|ZAR|64.99|560.99|1699.99;AO|Angola|3|USD|1.99|16.99|49.99;BD|Bangladesh|3|BDT|281.99|2403.99|7100;BF|Burkina Faso|3|EUR|1.75|14.99|43.55;BJ|Benin|3|EUR|1.75|14.99|43.55;BO|Bolivia|3|BOB|21.99|188.99|489.99;CD|Congo - Kinshasa|3|USD|1.99|16.99|49.99;CF|Central African Republic|3|EUR|1.75|14.99|43.55;CG|Congo - Brazzaville|3|USD|1.99|16.99|49.99;CI|C\u00f4te d\u2019Ivoire|3|XOF|1300|11000|33700;CM|Cameroon|3|XAF|1400|12000|34100;CV|Cape Verde|3|USD|1.99|16.99|49.99;DJ|Djibouti|3|USD|1.99|16.99|49.99;EG|Egypt|3|EGP|117.99|1009.99|2949.99;ER|Eritrea|3|USD|1.99|16.99|49.99;FM|Micronesia|3|USD|1.99|16.99|49.99;GH|Ghana|3|GHS|26.99|232.99|690;GM|Gambia|3|USD|1.99|16.99|49.99;GN|Guinea|3|USD|1.99|16.99|49.99;GW|Guinea-Bissau|3|EUR|1.75|14.99|43.55;HN|Honduras|3|USD|1.99|16.99|49.99;HT|Haiti|3|USD|1.99|16.99|49.99;IN|India|3|INR|224.99|1923.99|5700;JO|Jordan|3|JOD|1.4|11.99|35.4;KE|Kenya|3|KES|298.99|2552.99|7500;KG|Kyrgyzstan|3|USD|1.99|16.99|49.99;KH|Cambodia|3|USD|1.99|16.99|49.99;KM|Comoros|3|USD|1.99|16.99|49.99;LA|Laos|3|USD|1.99|16.99|49.99;LB|Lebanon|3|USD|1.99|16.99|49.99;LK|Sri Lanka|3|LKR|659.99|5638.99|16500;LR|Liberia|3|USD|1.99|16.99|49.99;MA|Morocco|3|MAD|22.99|192.99|569.99;ML|Mali|3|EUR|1.75|14.99|43.55;MM|Myanmar (Burma)|3|MMK|4200|36000|105000;MZ|Mozambique|3|USD|1.99|16.99|49.99;NE|Niger|3|EUR|1.75|14.99|43.55;NG|Nigeria|3|NGN|2845.99|24295.99|71500;NI|Nicaragua|3|USD|1.99|16.99|49.99;NP|Nepal|3|USD|2.25|18.99|56.49;PG|Papua New Guinea|3|USD|1.99|16.99|49.99;PH|Philippines|3|PHP|139.99|1194.99|3500;PK|Pakistan|3|PKR|551.99|4710.99|13900;RW|Rwanda|3|USD|1.99|16.99|49.99;SB|Solomon Islands|3|USD|1.99|16.99|49.99;SL|Sierra Leone|3|USD|1.99|16.99|49.99;SN|Senegal|3|XOF|1300|11000|33700;SO|Somalia|3|USD|1.99|16.99|49.99;SV|El Salvador|3|USD|1.99|16.99|49.99;TD|Chad|3|USD|1.99|16.99|49.99;TG|Togo|3|EUR|1.75|14.99|43.55;TJ|Tajikistan|3|USD|1.99|16.99|49.99;TN|Tunisia|3|USD|1.99|16.99|49.99;TZ|Tanzania|3|TZS|5262.99|44932.99|132000;UA|Ukraine|3|UAH|106.99|910.99|2699.99;UG|Uganda|3|USD|2.35|19.99|58.99;UZ|Uzbekistan|3|USD|2.25|18.99|55.99;VE|Venezuela|3|USD|1.99|16.99|49.99;VN|Vietnam|3|VND|52000|440000|1300000;VU|Vanuatu|3|USD|1.99|16.99|49.99;WS|Samoa|3|USD|1.99|16.99|49.99;YE|Yemen|3|USD|1.99|16.99|49.99;ZM|Zambia|3|USD|1.99|16.99|49.99;ZW|Zimbabwe|3|USD|1.99|16.99|49.99";

  var ZONES = {
    "America/Sao_Paulo":"BR","America/Bahia":"BR","America/Fortaleza":"BR",
    "America/Recife":"BR","America/Manaus":"BR","America/Belem":"BR","America/Cuiaba":"BR",
    "America/Campo_Grande":"BR","America/Maceio":"BR","America/Porto_Velho":"BR",
    "America/Boa_Vista":"BR","America/Rio_Branco":"BR","America/Araguaina":"BR",
    "America/Santarem":"BR","America/Noronha":"BR","America/Mexico_City":"MX",
    "America/Monterrey":"MX","America/Tijuana":"MX","America/Cancun":"MX",
    "America/Merida":"MX","America/Chihuahua":"MX","America/Hermosillo":"MX",
    "America/Mazatlan":"MX","America/Matamoros":"MX","America/Santiago":"CL",
    "Pacific/Easter":"CL","America/Bogota":"CO","America/Lima":"PE","America/Guayaquil":"EC",
    "America/Montevideo":"UY","America/Asuncion":"PY","America/Panama":"PA",
    "America/Costa_Rica":"CR","America/Santo_Domingo":"DO","America/Jamaica":"JM",
    "America/Belize":"BZ","America/Paramaribo":"SR","America/Port_of_Spain":"TT",
    "Europe/Warsaw":"PL","Europe/Bucharest":"RO","Europe/Budapest":"HU","Europe/Zagreb":"HR",
    "Europe/Belgrade":"RS","Europe/Sofia":"BG","Europe/Chisinau":"MD","Europe/Skopje":"MK",
    "Europe/Sarajevo":"BA","Europe/Tirane":"AL","Europe/Minsk":"BY","Europe/Moscow":"RU",
    "Europe/Kaliningrad":"RU","Europe/Samara":"RU","Asia/Yekaterinburg":"RU","Asia/Omsk":"RU",
    "Asia/Novosibirsk":"RU","Asia/Krasnoyarsk":"RU","Asia/Irkutsk":"RU","Asia/Yakutsk":"RU",
    "Asia/Vladivostok":"RU","Asia/Magadan":"RU","Asia/Kamchatka":"RU","Europe/Istanbul":"TR",
    "Asia/Istanbul":"TR","Asia/Almaty":"KZ","Asia/Aqtobe":"KZ","Asia/Atyrau":"KZ",
    "Asia/Oral":"KZ","Asia/Qostanay":"KZ","Asia/Aqtau":"KZ","Asia/Baku":"AZ",
    "Asia/Yerevan":"AM","Asia/Tbilisi":"GE","Asia/Ashgabat":"TM","Asia/Ulaanbaatar":"MN",
    "Asia/Bangkok":"TH","Asia/Kuala_Lumpur":"MY","Asia/Kuching":"MY","Asia/Jakarta":"ID",
    "Asia/Pontianak":"ID","Asia/Makassar":"ID","Asia/Jayapura":"ID","Asia/Baghdad":"IQ",
    "Africa/Tripoli":"LY","Africa/Algiers":"DZ","Africa/Johannesburg":"ZA",
    "Africa/Gaborone":"BW","Africa/Windhoek":"NA","Africa/Libreville":"GA",
    "Indian/Mauritius":"MU","Indian/Mahe":"SC","Indian/Maldives":"MV","Pacific/Fiji":"FJ",
    "Pacific/Tongatapu":"TO","Asia/Kolkata":"IN","Asia/Calcutta":"IN","Asia/Manila":"PH",
    "Asia/Karachi":"PK","Asia/Dhaka":"BD","Asia/Kathmandu":"NP","Asia/Colombo":"LK",
    "Asia/Yangon":"MM","Asia/Rangoon":"MM","Asia/Phnom_Penh":"KH","Asia/Vientiane":"LA",
    "Asia/Ho_Chi_Minh":"VN","Asia/Saigon":"VN","Asia/Bishkek":"KG","Asia/Dushanbe":"TJ",
    "Asia/Tashkent":"UZ","Asia/Samarkand":"UZ","Asia/Amman":"JO","Asia/Beirut":"LB",
    "Asia/Aden":"YE","Europe/Kyiv":"UA","Europe/Kiev":"UA","Europe/Uzhgorod":"UA",
    "Europe/Zaporozhye":"UA","Africa/Cairo":"EG","Africa/Lagos":"NG","Africa/Nairobi":"KE",
    "Africa/Accra":"GH","Africa/Casablanca":"MA","Africa/Tunis":"TN",
    "Africa/Dar_es_Salaam":"TZ","Africa/Kampala":"UG","Africa/Kigali":"RW",
    "Africa/Lusaka":"ZM","Africa/Harare":"ZW","Africa/Maputo":"MZ","Africa/Luanda":"AO",
    "Africa/Kinshasa":"CD","Africa/Lubumbashi":"CD","Africa/Brazzaville":"CG",
    "Africa/Douala":"CM","Africa/Abidjan":"CI","Africa/Dakar":"SN","Africa/Bamako":"ML",
    "Africa/Ouagadougou":"BF","Africa/Niamey":"NE","Africa/Porto-Novo":"BJ",
    "Africa/Lome":"TG","Africa/Conakry":"GN","Africa/Bissau":"GW","Africa/Freetown":"SL",
    "Africa/Monrovia":"LR","Africa/Banjul":"GM","Africa/Ndjamena":"TD","Africa/Bangui":"CF",
    "Africa/Mogadishu":"SO","Africa/Asmara":"ER","Africa/Djibouti":"DJ",
    "Atlantic/Cape_Verde":"CV","Indian/Comoro":"KM","America/Tegucigalpa":"HN",
    "America/Managua":"NI","America/El_Salvador":"SV","America/Port-au-Prince":"HT",
    "America/La_Paz":"BO","America/Caracas":"VE","Pacific/Port_Moresby":"PG",
    "Pacific/Guadalcanal":"SB","Pacific/Efate":"VU","Pacific/Apia":"WS",
    "Pacific/Pohnpei":"FM","Pacific/Chuuk":"FM","Pacific/Kosrae":"FM"
  };

  // The map above covers the tier-2 and tier-3 markets. Without the tier-1
  // zones below, a timezone it does not know falls through to the browser's
  // language, so someone in London with a phone set to English (India) would be
  // quoted India's price, and someone in Tokyo browsing in English, America's.
  var TIER1_ZONES = {
    "America/New_York":"US","America/Chicago":"US","America/Denver":"US",
    "America/Los_Angeles":"US","America/Phoenix":"US","America/Anchorage":"US",
    "America/Juneau":"US","America/Boise":"US","America/Detroit":"US","America/Adak":"US",
    "America/Indiana/Indianapolis":"US","America/Kentucky/Louisville":"US","Pacific/Honolulu":"US",
    "America/Toronto":"CA","America/Montreal":"CA","America/Vancouver":"CA","America/Edmonton":"CA",
    "America/Winnipeg":"CA","America/Halifax":"CA","America/St_Johns":"CA","America/Regina":"CA",
    "Europe/London":"GB","Europe/Dublin":"IE","Europe/Paris":"FR","Europe/Berlin":"DE",
    "Europe/Madrid":"ES","Atlantic/Canary":"ES","Europe/Rome":"IT","Europe/Amsterdam":"NL",
    "Europe/Brussels":"BE","Europe/Vienna":"AT","Europe/Zurich":"CH","Europe/Stockholm":"SE",
    "Europe/Oslo":"NO","Europe/Copenhagen":"DK","Europe/Helsinki":"FI","Europe/Lisbon":"PT",
    "Atlantic/Madeira":"PT","Atlantic/Azores":"PT","Europe/Athens":"GR","Europe/Prague":"CZ",
    "Europe/Bratislava":"SK","Europe/Ljubljana":"SI","Europe/Tallinn":"EE","Europe/Riga":"LV",
    "Europe/Vilnius":"LT","Europe/Luxembourg":"LU","Europe/Malta":"MT","Asia/Nicosia":"CY",
    "Europe/Nicosia":"CY","Europe/Monaco":"MC","Atlantic/Reykjavik":"IS","Europe/Vaduz":"LI",
    "Europe/San_Marino":"SM","Europe/Vatican":"VA","Europe/Gibraltar":"GI",
    "Asia/Tokyo":"JP","Asia/Seoul":"KR","Asia/Hong_Kong":"HK","Asia/Macau":"MO","Asia/Taipei":"TW",
    "Asia/Singapore":"SG","Asia/Dubai":"AE","Asia/Qatar":"QA","Asia/Riyadh":"SA","Asia/Kuwait":"KW",
    "Asia/Bahrain":"BH","Asia/Muscat":"OM","Asia/Jerusalem":"IL","Asia/Tel_Aviv":"IL",
    "Australia/Sydney":"AU","Australia/Melbourne":"AU","Australia/Brisbane":"AU","Australia/Perth":"AU",
    "Australia/Adelaide":"AU","Australia/Hobart":"AU","Australia/Darwin":"AU","Pacific/Auckland":"NZ",
    "America/Nassau":"BS","Atlantic/Bermuda":"BM","America/Cayman":"KY","America/Aruba":"AW",
    "America/Tortola":"VG","America/Grand_Turk":"TC",
    "America/Antigua":"AG","America/Dominica":"DM","America/Grenada":"GD","America/St_Kitts":"KN",
    "America/St_Lucia":"LC","America/Guatemala":"GT"
  };
  for (var tz in TIER1_ZONES) {
    if (!ZONES[tz]) ZONES[tz] = TIER1_ZONES[tz];
  }

  var KEY = "bf-country";

  var market = {}, name = {}, sorted = [];
  DATA.split(";").forEach(function (row) {
    var p = row.split("|");
    market[p[0]] = {
      currency: p[3],
      monthly: Number(p[4]),
      yearly: Number(p[5]),
      lifetime: Number(p[6])
    };
    name[p[0]] = p[1];
    sorted.push(p[0]);
  });
  sorted.sort(function (a, b) { return name[a].localeCompare(name[b]); });

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(code) {
    try { localStorage.setItem(KEY, code); } catch (e) {}
  }

  function detect() {
    var s = saved();
    if (s && market[s]) return s;
    try {
      var z = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (z) {
        if (ZONES[z]) return ZONES[z];
        if (z.indexOf("America/Argentina/") === 0) return "AR";
      }
    } catch (e) {}
    try {
      var tags = (navigator.languages && navigator.languages.length)
        ? navigator.languages : [navigator.language];
      for (var i = 0; i < tags.length; i++) {
        var r = null;
        if (window.Intl && Intl.Locale) {
          try { r = new Intl.Locale(tags[i]).region; } catch (e) {}
        }
        if (!r) {
          var m = /[-_]([A-Za-z]{2})(?:[-_]|$)/.exec(tags[i] || "");
          r = m && m[1];
        }
        if (r && market[r.toUpperCase()]) return r.toUpperCase();
      }
    } catch (e) {}
    return "US";
  }

  // Minor units from ICU rather than a hand-kept list, so yen and dinars are
  // both right without this file knowing anything about either.
  function decimals(currency) {
    try {
      return new Intl.NumberFormat("en", { style: "currency", currency: currency })
        .resolvedOptions().maximumFractionDigits;
    } catch (e) {
      return 2;
    }
  }

  function money(amount, currency) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
        // A whole number stays whole: 1,200 yen, not 1,200.00.
        minimumFractionDigits: amount % 1 === 0 ? 0 : undefined
      }).format(amount);
    } catch (e) {
      return currency + " " + amount;
    }
  }

  function put(attr, text) {
    var nodes = document.querySelectorAll("[" + attr + "]");
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = text;
  }

  function render(code) {
    var m = market[code] || market.US;
    var d = decimals(m.currency);
    var perMonth = d === 0
      ? Math.round(m.yearly / 12)
      : Math.round(m.yearly / 12 * Math.pow(10, d)) / Math.pow(10, d);

    put("data-price-monthly", money(m.monthly, m.currency));
    put("data-price-yearly", money(m.yearly, m.currency));
    put("data-price-effective", money(perMonth, m.currency));
    put("data-price-lifetime", money(m.lifetime, m.currency));
    put("data-price-zero", money(0, m.currency));
    put("data-price-country", name[code] || name.US);

    // The saving is worked out from the two prices shown, and rounded down, as
    // the app does - never a hardcoded figure that is wrong in half the world.
    var save = Math.floor((1 - m.yearly / (m.monthly * 12)) * 100);
    var badges = document.querySelectorAll("[data-price-save]");
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = "Save " + save + "%";
      badges[i].hidden = !(save >= 1);
    }
  }

  var code = detect();
  render(code);

  // The picker is built here rather than in the markup, so a visitor without
  // JavaScript sees a working page with US prices instead of a dead dropdown.
  var host = document.querySelector("[data-price-picker]");
  if (host) {
    // With the picker in place, the static "Prices shown for ..." sentence
    // would name the country twice; the picker's own label replaces it.
    var label = document.createElement("label");
    label.setAttribute("for", "price-country");
    label.textContent = "Showing prices for";

    var sel = document.createElement("select");
    sel.id = "price-country";
    sorted.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c;
      o.textContent = name[c];
      if (c === code) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () {
      code = sel.value;
      remember(code);
      render(code);
    });

    host.appendChild(label);
    host.appendChild(sel);
    host.hidden = false;
    var fixed = document.querySelector("[data-price-static]");
    if (fixed) fixed.hidden = true;
  }
})();
