'use strict';
// Brand lookups so a skill or issuer typed as plain text still renders with the right badge.
// Anything not listed falls back to initials + a colour derived from the text (stable across builds).

const SKILLS = [
  { aliases: ['java'], mark: 'J', bg: '#E76F00' },
  { aliases: ['python'], mark: 'Py', bg: 'linear-gradient(135deg,#3776AB,#FFD43B)' },
  { aliases: ['c / c++', 'c/c++', 'c++', 'c', 'cpp'], mark: 'C++', bg: '#00599C' },
  { aliases: ['html', 'html5'], mark: '<>', bg: '#E34F26' },
  { aliases: ['css', 'css3'], mark: '#', bg: '#1572B6' },
  { aliases: ['javascript', 'js', 'es6'], mark: 'JS', bg: '#F7DF1E', fg: '#20201A' },
  { aliases: ['react / jsx', 'react', 'react.js', 'reactjs', 'jsx'], mark: 'JSX', bg: '#61DAFB', fg: '#0B2230' },
  { aliases: ['firebase'], mark: 'Fb', bg: '#FFA000' },
  { aliases: ['databases & sql', 'sql', 'mysql', 'postgresql', 'databases'], mark: 'DB', bg: '#00758F' },
  { aliases: ['google cloud', 'gcp', 'google cloud platform'], mark: 'GC', bg: '#4285F4' },
  { aliases: ['azure fundamentals', 'azure', 'microsoft azure'], mark: 'Az', bg: '#0078D4' },
  { aliases: ['git & github', 'git', 'github'], mark: 'Git', bg: '#171515' },
  { aliases: ['typescript', 'ts'], mark: 'TS', bg: '#3178C6' },
  { aliases: ['node.js', 'node', 'nodejs'], mark: 'N', bg: '#339933' },
  { aliases: ['mongodb'], mark: 'M', bg: '#47A248' },
  { aliases: ['docker'], mark: 'Dk', bg: '#2496ED' },
  { aliases: ['aws', 'amazon web services'], mark: 'AWS', bg: '#232F3E' },
  { aliases: ['figma'], mark: 'Fg', bg: '#A259FF' },
  { aliases: ['tailwind', 'tailwind css', 'tailwindcss'], mark: 'Tw', bg: '#06B6D4' },
  { aliases: ['next.js', 'nextjs', 'next'], mark: 'Nx', bg: '#000000' },
  { aliases: ['flutter'], mark: 'Fl', bg: '#02569B' },
  { aliases: ['kotlin'], mark: 'Kt', bg: '#7F52FF' },
  { aliases: ['go', 'golang'], mark: 'Go', bg: '#00ADD8' },
  { aliases: ['rust'], mark: 'Rs', bg: '#B7410E' },
];

const ISSUERS = [
  { aliases: ['microsoft'], mark: 'MS', bg: '#0078D4' },
  { aliases: ['google'], mark: 'G', bg: '#4285F4' },
  { aliases: ['ibm'], mark: 'IBM', bg: '#1F70C1' },
  { aliases: ['uc santa cruz', 'ucsc', 'university of california, santa cruz', 'university of california santa cruz'], mark: 'UC', bg: '#003C6C' },
  { aliases: ['amazon', 'aws'], mark: 'AWS', bg: '#232F3E' },
  { aliases: ['meta'], mark: 'M', bg: '#0866FF' },
  { aliases: ['coursera'], mark: 'Co', bg: '#0056D2' },
  { aliases: ['udemy'], mark: 'Ud', bg: '#A435F0' },
  { aliases: ['nptel'], mark: 'NP', bg: '#C0392B' },
];

const FALLBACK_BG = ['#4560FF', '#7B5CF0', '#0EA5E9', '#10B981', '#F97316', '#F43F5E', '#0F766E', '#B45309'];

const norm = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');

/** Small stable string hash → non-negative int. */
function hash(s) {
  let h = 5381;
  for (const ch of String(s)) h = ((h << 5) + h + ch.codePointAt(0)) | 0;
  return Math.abs(h);
}

function find(list, text) {
  const t = norm(text);
  return list.find((e) => e.aliases.includes(t));
}

/** Pick readable foreground for a #RRGGBB background. */
function fgFor(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return undefined;
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.72 ? '#20201A' : undefined;
}

function initials(text, max = 2) {
  const words = String(text).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  if (words.length === 1) return words[0].slice(0, max);
  return words.slice(0, max).map((w) => w[0]).join('').toUpperCase();
}

function fallback(text, max) {
  const bg = FALLBACK_BG[hash(norm(text)) % FALLBACK_BG.length];
  return { mark: initials(text, max), bg, fg: fgFor(bg) };
}

function skillBadge(skill) {
  const hit = find(SKILLS, skill.name) || fallback(skill.name, 2);
  const bg = skill.color || hit.bg;
  return { mark: skill.mark || hit.mark, bg, fg: skill.color ? fgFor(skill.color) : hit.fg };
}

/** Issuer lookup that also accepts "Microsoft Certified", "Google Cloud" etc. (alias as a leading word). */
function findIssuer(text) {
  const t = norm(text);
  return find(ISSUERS, text) || ISSUERS.find((e) => e.aliases.some((a) => t.startsWith(a + ' ')));
}

function certBadge(cert) {
  if (cert.mark && (cert.mark.text || cert.mark.color)) {
    const base = findIssuer(cert.issuer) || fallback(cert.issuer || cert.title, 2);
    const bg = cert.mark.color || base.bg;
    return { mark: cert.mark.text || base.mark, bg, fg: cert.mark.color ? fgFor(bg) : base.fg };
  }
  return findIssuer(cert.issuer) || fallback(cert.issuer || cert.title, 2);
}

// Stable gradient pairs for project icon tiles when none is given.
const GRADIENTS = [
  ['#4560FF', '#7B5CF0'], ['#F43F5E', '#F97316'], ['#0EA5E9', '#10B981'], ['#7B5CF0', '#F43F5E'],
  ['#F59E0B', '#F43F5E'], ['#10B981', '#0EA5E9'],
];
const gradientFor = (title) => GRADIENTS[hash(norm(title)) % GRADIENTS.length];

module.exports = { skillBadge, certBadge, gradientFor, initials, hash };
