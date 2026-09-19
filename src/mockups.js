'use strict';
// Decorative "app screenshot" art for project cards. Each takes the project's two gradient colours
// so the preview matches its icon tile. Purely presentational (aria-hidden in the template).

function dashboard(c1, c2) {
  return `<svg viewBox="0 0 168 190" preserveAspectRatio="xMidYMid slice">
                <rect width="168" height="190" fill="#0B1226"/>
                <rect x="0" y="0" width="168" height="16" fill="#111A38"/>
                <circle cx="10" cy="8" r="2.4" fill="#F87171"/><circle cx="19" cy="8" r="2.4" fill="#FBBF24"/><circle cx="28" cy="8" r="2.4" fill="#34D399"/>
                <rect x="8" y="24" width="44" height="158" rx="6" fill="#141E44"/>
                <rect x="14" y="32" width="32" height="5" rx="2.5" fill="#3B4A80"/>
                <rect x="14" y="44" width="32" height="7" rx="3.5" fill="${c1}"/>
                <rect x="14" y="56" width="26" height="5" rx="2.5" fill="#2C3868"/>
                <rect x="14" y="66" width="30" height="5" rx="2.5" fill="#2C3868"/>
                <rect x="14" y="76" width="22" height="5" rx="2.5" fill="#2C3868"/>
                <rect x="60" y="24" width="100" height="40" rx="7" fill="#16225A"/>
                <rect x="68" y="34" width="52" height="7" rx="3.5" fill="#8FA3FF"/>
                <rect x="68" y="46" width="76" height="5" rx="2.5" fill="#3B4A80"/>
                <rect x="60" y="72" width="47" height="46" rx="7" fill="#141E44"/>
                <rect x="113" y="72" width="47" height="46" rx="7" fill="#141E44"/>
                <circle cx="76" cy="88" r="7" fill="${c2}"/><circle cx="129" cy="88" r="7" fill="#38BDF8"/>
                <rect x="68" y="102" width="30" height="4" rx="2" fill="#2C3868"/>
                <rect x="121" y="102" width="30" height="4" rx="2" fill="#2C3868"/>
                <rect x="60" y="126" width="100" height="56" rx="7" fill="#141E44"/>
                <rect x="68" y="136" width="60" height="5" rx="2.5" fill="#3B4A80"/>
                <rect x="68" y="148" width="84" height="4" rx="2" fill="#26315E"/>
                <rect x="68" y="157" width="70" height="4" rx="2" fill="#26315E"/>
                <rect x="68" y="166" width="40" height="8" rx="4" fill="${c1}"/>
              </svg>`;
}

function cards(c1, c2) {
  return `<svg viewBox="0 0 168 190" preserveAspectRatio="xMidYMid slice">
                <rect width="168" height="190" fill="#0B1226"/>
                <rect x="0" y="0" width="168" height="16" fill="#111A38"/>
                <circle cx="10" cy="8" r="2.4" fill="#F87171"/><circle cx="19" cy="8" r="2.4" fill="#FBBF24"/><circle cx="28" cy="8" r="2.4" fill="#34D399"/>
                <rect x="12" y="26" width="64" height="6" rx="3" fill="#8FA3FF"/>
                <rect x="12" y="38" width="96" height="8" rx="4" fill="${c1}"/>
                <rect x="12" y="56" width="42" height="58" rx="6" fill="#1C2550"/>
                <rect x="63" y="56" width="42" height="58" rx="6" fill="#1C2550"/>
                <rect x="114" y="56" width="42" height="58" rx="6" fill="#1C2550"/>
                <rect x="12" y="56" width="42" height="34" rx="6" fill="${c2}" opacity=".55"/>
                <rect x="63" y="56" width="42" height="34" rx="6" fill="#7B5CF0" opacity=".6"/>
                <rect x="114" y="56" width="42" height="34" rx="6" fill="#38BDF8" opacity=".5"/>
                <rect x="18" y="96" width="28" height="4" rx="2" fill="#3B4A80"/>
                <rect x="69" y="96" width="28" height="4" rx="2" fill="#3B4A80"/>
                <rect x="120" y="96" width="28" height="4" rx="2" fill="#3B4A80"/>
                <rect x="18" y="104" width="18" height="4" rx="2" fill="#26315E"/>
                <rect x="69" y="104" width="18" height="4" rx="2" fill="#26315E"/>
                <rect x="120" y="104" width="18" height="4" rx="2" fill="#26315E"/>
                <path d="M20 132h128" stroke="#3B4A80" stroke-width="3" stroke-linecap="round"/>
                <g fill="#2C3868">
                  <rect x="26" y="144" width="10" height="9" rx="2.5"/><rect x="42" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="58" y="144" width="10" height="9" rx="2.5"/><rect x="74" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="90" y="144" width="10" height="9" rx="2.5"/><rect x="106" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="122" y="144" width="10" height="9" rx="2.5"/>
                  <rect x="26" y="158" width="10" height="9" rx="2.5"/><rect x="42" y="158" width="10" height="9" rx="2.5"/>
                  <rect x="90" y="158" width="10" height="9" rx="2.5"/><rect x="106" y="158" width="10" height="9" rx="2.5"/>
                  <rect x="122" y="158" width="10" height="9" rx="2.5"/>
                </g>
                <g fill="#34D399"><rect x="58" y="158" width="10" height="9" rx="2.5"/><rect x="74" y="158" width="10" height="9" rx="2.5"/></g>
                <rect x="26" y="174" width="106" height="9" rx="4.5" fill="${c1}"/>
              </svg>`;
}

module.exports = { dashboard, cards };
