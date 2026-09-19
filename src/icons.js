'use strict';
// Built-in icon set. All paths are authored on a 24x24 grid and drawn as strokes
// unless listed in FILLED. Users choose from the named content icons in the schema;
// UI icons are used by the template only.

const PATHS = {
  // content icons (selectable in the schema)
  graduation: '<path d="M12 3 2.5 8 12 13l9.5-5z"/><path d="M6.5 10.5V16c0 1.5 2.7 3 5.5 3s5.5-1.5 5.5-3v-5.5"/>',
  code: '<path d="m9 8-5 4 5 4M15 8l5 4-5 4"/>',
  medal: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5"/>',
  book: '<path d="M4 19V5.5A1.5 1.5 0 0 1 5.5 4H19v15"/><path d="M4 19a2 2 0 0 0 2 2h13"/><path d="M8 8h7M8 12h7"/>',
  ticket: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M2.5 10.5h19M8 6v12M16 6v12"/>',
  trophy: '<path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M9.5 20h5M12 15v5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  'chart-alt': '<path d="M4 20V13M10 20V6M16 20v-9M22 20H2"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
  rocket: '<path d="M14 4c3.5 0 6 2.5 6 6-3 3-5 4.5-8 5l-3-3c.5-3 2-5 5-8z"/><circle cx="14.5" cy="9.5" r="1.5"/><path d="M8 15c-2 .5-3 2-3.5 4.5C7 19 8.5 18 9 16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c4 4.5 4 13.5 0 18-4-4.5-4-13.5 0-18"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',

  // ui icons
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/>',
  folder: '<path d="M3 7.5h6l2 2.5h10V19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19z"/>',
  'folder-tab': '<path d="M3 7.5h6l2 2.5h10V19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19z"/><path d="M3 7.5V5.5A1.5 1.5 0 0 1 4.5 4h4"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  'trophy-nav': '<path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 5H4v2a4 4 0 0 0 3 3.9M17 5h3v2a4 4 0 0 1-3 3.9"/><path d="M9.5 20h5M12 15v5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.6 6.8 8.4 6 8.4-6"/>',
  download: '<path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4.5 20h15"/>',
  arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5.5A1.5 1.5 0 0 1 16.5 21h-11A1.5 1.5 0 0 1 4 19.5v-11A1.5 1.5 0 0 1 5.5 7H11"/>',
  phone: '<path d="M5 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7 2 2 0 0 1 5 3.5"/>',
  pin: '<path d="M12 21s-7-4.4-7-9.8A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 3.2C19 16.6 12 21 12 21z"/>',
  moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7"/>',
};

const FILLED = {
  linkedin: '<path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5M3 9.5h4V21H3zM9.5 9.5h3.8v1.6c.6-1 1.8-1.9 3.7-1.9 3 0 4 1.9 4 4.9V21h-4v-6.1c0-1.5-.5-2.4-1.8-2.4-1.1 0-1.7.7-2 1.5-.1.3-.1.7-.1 1V21h-4z"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2"/>',
};

const ICON_NAMES = ['graduation', 'code', 'medal', 'book', 'ticket', 'trophy', 'chart', 'chart-alt', 'star', 'rocket', 'globe', 'briefcase', 'bolt'];

/** Stroke icon. `cls` adds a class on the <svg>; `sw` is the stroke width. */
function icon(name, sw = 2, cls = '') {
  const body = PATHS[name] || PATHS.code;
  const c = cls ? ` class="${cls}"` : '';
  return `<svg${c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

/** Filled brand glyph (linkedin, github). */
function glyph(name) {
  return `<svg viewBox="0 0 24 24" fill="currentColor">${FILLED[name]}</svg>`;
}

module.exports = { icon, glyph, ICON_NAMES };
