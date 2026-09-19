'use strict';
// Offline, best-effort resume text -> portfolio JSON. No API key, runs in the browser.
// It reads section headings plus patterns (emails, dates, "A | B" project meta lines, numbered lists...).
// It will not be perfect on every layout: the web app lets the user fix anything afterwards.

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_RE = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';

// Exact headings (any case) -> section.
const HEADINGS = {
  about: ['about', 'aboutme', 'summary', 'professionalsummary', 'profile', 'objective', 'careerobjective', 'introduction'],
  education: ['education', 'academics', 'academicbackground', 'qualifications', 'educationalqualification'],
  skills: ['skills', 'technicalskills', 'skill', 'techstack', 'technologies', 'keyskills', 'coreskills'],
  projects: ['projects', 'project', 'academicprojects', 'personalprojects', 'keyprojects'],
  experience: ['experience', 'workexperience', 'internships', 'internship', 'employment', 'professionalexperience', 'workhistory'],
  certs: ['certifications', 'certification', 'certificates', 'licenses', 'courses', 'licensesandcertifications'],
  achievements: ['achievements', 'awards', 'accomplishments', 'honors', 'honours', 'awardsandachievements'],
  languages: ['languages', 'language', 'languagesknown'],
  contact: ['contact', 'contactme', 'contactinfo', 'contactdetails', 'links'],
  ignore: ['interests', 'hobbies', 'references', 'declaration', 'personaldetails'],
};
const HEADING_LOOKUP = Object.fromEntries(Object.entries(HEADINGS).flatMap(([k, v]) => v.map((h) => [h, k])));
// ALL-CAPS / letter-spaced headings we have not listed exactly ("ACHIEVEMENTS & PARTICIPATIONS") match by keyword.
const FUZZY = [
  ['ignore', /portfolio|videoresume|hobbies|interests|references|declaration|personaldetail/],
  ['contact', /contact/],
  ['projects', /project/],
  ['experience', /experience|internship|employment|workhistory/],
  ['education', /education|academic|qualification/],
  ['skills', /skill|technolog/],
  ['certs', /certif|licen[cs]e|courses/],
  ['achievements', /achiev|award|honou?r|participation|accomplish/],
  ['languages', /language/],
  ['about', /aboutme|summary|objective|profile/],
];

const SKILL_CASE = { javascript: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS', sql: 'SQL', mysql: 'MySQL', 'c++': 'C++', c: 'C', git: 'Git', github: 'GitHub', nodejs: 'Node.js', 'node.js': 'Node.js', reactjs: 'React', aws: 'AWS', php: 'PHP', jsx: 'JSX', mongodb: 'MongoDB', ai: 'AI', ml: 'ML' };
const SOFT = /^(problem[- ]solving|communication|teamwork|team (work|player|collaboration)|leadership|critical thinking|creativity|adaptability|time management|collaboration|analytical( thinking)?|logical thinking|data structures?( and algorithms)?)$/i;
const SPOKEN = /^(english|hindi|kannada|tamil|telugu|malayalam|marathi|bengali|gujarati|punjabi|urdu|odia|oriya|french|german|spanish|arabic|chinese|mandarin|japanese|korean|russian|portuguese|italian|dutch|sanskrit|assamese|nepali|konkani|tulu)$/i;
const ISSUERS = /^(Microsoft|Google|IBM|Amazon|AWS|Coursera|Udemy|NPTEL|Meta|Oracle|Cisco|Infosys|Wipro|TCS|HackerRank|LinkedIn|Salesforce|Red Hat|Adobe|Nvidia|Stanford|MIT|Harvard|University of [A-Z][A-Za-z]+(?:,? [A-Z][A-Za-z]+)*?)(?=\b|\()/;
const ORG_WORDS = /universit|college|school|institute|academy|naac|faculty|resume|curriculum|vitae|\bcv\b|profile|portfolio|computing|engineering|technology|department|project|education|skill|contact|experience|achievement|certif/i;
const MARKER = /^\s*(?:[•●▪◦·*\-–]|\d{1,2}[.)](?=\s|[A-Za-z]))\s*/;

const clean = (s) => s.replace(/\s+/g, ' ').trim();
const cap = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const isSpaced = (l) => /^(\S ){2,}\S$/.test(l);
const despace = (l) => (isSpaced(l) ? l.replace(/ /g, '') : l);
const key = (l) => despace(l).toLowerCase().replace(/[^a-z]/g, '');
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
const unmark = (l) => l.replace(MARKER, '');
const hasMarker = (l) => MARKER.test(l);
const asUrl = (u) => (/^https?:\/\//i.test(u) ? u : 'https://' + u).replace(/[.,;)]+$/, '');

function joinWrapped(lines) {
  return lines.reduce((out, l) => (out.endsWith('-') && /^[a-z]/.test(l) ? out + l : out ? `${out} ${l}` : l), '');
}

function isoDate(text) {
  const m = text.match(new RegExp(`\\b(?:(${MONTH_RE})\\s+(?:(\\d{1,2}),?\\s*)?)?((?:19|20)\\d{2})\\b`, 'i'));
  if (!m) return undefined;
  if (!m[1]) return m[3];
  const mm = String(MONTHS.indexOf(m[1].slice(0, 3).toLowerCase()) + 1).padStart(2, '0');
  return m[2] ? `${m[3]}-${mm}-${String(m[2]).padStart(2, '0')}` : `${m[3]}-${mm}`;
}

function headingOf(raw) {
  const t = despace(raw);
  if (t.length > 45 || /[:.@]$/.test(t)) return null;
  const k = key(raw);
  const upper = t === t.toUpperCase() && /[A-Z]/.test(t);
  if (HEADING_LOOKUP[k] && (isSpaced(raw) || upper || /^[A-Z][a-z]+( [A-Za-z&]+){0,3}$/.test(t))) return HEADING_LOOKUP[k];
  if ((isSpaced(raw) || upper) && !/\d/.test(t) && t.split(/\s+/).length <= 6) {
    const hit = FUZZY.find(([, re]) => re.test(k));
    if (hit) return hit[0];
  }
  return null;
}

// contact-details lines (email, phone, bare links) that sit under no heading must not leak into the previous section
const isContactLine = (l) =>
  /@/.test(l) || (/^\+?[\d\s()-]{10,}$/.test(l) && l.replace(/\D/g, '').length >= 10) || /^(?:https?:\/\/)?(?:www\.)?[\w-]+(?:\.[\w-]+)+(?:\/\S*)?$/.test(l);

function splitSections(lines) {
  const sections = {};
  let cur = null;
  for (const raw of lines) {
    const h = headingOf(raw);
    if (h) { cur = h; (sections[cur] ||= []); continue; }
    if (!cur) continue;
    if (cur !== 'projects' && cur !== 'experience' && cur !== 'contact' && isContactLine(raw)) continue;
    sections[cur].push(raw);
  }
  return sections;
}

// ---------- name ----------
const HONORIFIC = /^(?:mr|mrs|ms|miss|dr|prof|shri|smt|sri)\.?\s+/i;
function nameFrom(line) {
  const t = line.replace(HONORIFIC, '').trim();
  if (t.length < 3 || t.length > 50 || /\d|@|[|:/]/.test(t) || ORG_WORDS.test(t)) return null;
  const words = t.split(/\s+/);
  if (words.length < 2 || words.length > 5) return null;
  if (!words.every((w) => /^\p{Lu}[\p{L}'.-]*$/u.test(w))) return null;
  return t === t.toUpperCase() ? titleCase(t) : t;
}

function findName(lines, banner, email) {
  if (banner[0]) return titleCase(despace(banner[0]));
  const firstHeading = lines.findIndex((l) => headingOf(l));
  const pool = firstHeading > 0 ? lines.slice(0, firstHeading) : lines;
  for (const l of [...pool, ...lines]) { const n = nameFrom(l); if (n) return n; }
  if (email) return titleCase(email.split('@')[0].replace(/[\d._-]+/g, ' ').trim());
  return '';
}

// ---------- education ----------
const INST = /universit|college|school|institute|academy|vidyal|polytechnic|\bpu\b|campus/i;
const DEGREE = /^(bachelor|master|b\.?\s?tech|m\.?\s?tech|b\.?e\b|m\.?e\b|b\.?sc|m\.?sc|b\.?com|mba|bca|mca|diploma|ph\.?d|\d{1,2}(st|nd|rd|th)\s+(grade|std|standard)|class\s+(x|xii|10|12)|sslc|puc|hsc|ssc|intermediate|secondary|higher secondary|grade)/i;

function parseEducation(lines, fallbackInst) {
  const out = [];
  let cur = {};
  const done = () => cur.end || cur.score;
  const push = () => { if (cur.institution || cur.degree) out.push(cur); cur = {}; };

  for (const raw of lines) {
    const line = unmark(raw);
    let segs = line.split(/\s\|\s/).map(clean).filter(Boolean);
    if (INST.test(line)) segs = segs.flatMap((x) => x.split(/\s[—–-]\s/)); // "Degree — Institution 2018 – 2022"
    const bare = (x) => clean(x.replace(/\b(?:19|20)\d{2}\s*(?:[-–—]|to)\s*(?:(?:19|20)\d{2}|present|ongoing|current)\b/gi, '').replace(/\b(?:19|20)\d{2}\b/g, '').replace(/(?:cgpa|gpa)[:\s]*[\d.]+|\d{2,3}(?:\.\d+)?\s*%/gi, '').replace(/[()]/g, ''));
    const instRaw = segs.find((x) => INST.test(x) && x.length < 90 && !/^year\b/i.test(x));
    const instSeg = instRaw && bare(instRaw);
    const degSeg = !instRaw ? segs.find((x, i) => i === 0 && DEGREE.test(x)) : segs.find((x) => DEGREE.test(x) && !INST.test(x));
    const range = line.match(/\b((?:19|20)\d{2})\s*(?:[-–—]|to)\s*((?:19|20)\d{2}|present|ongoing|current)\b/i);
    const single = line.match(/\b((?:19|20)\d{2})\b/);
    const sc = line.match(/(?:cgpa|gpa)[:\s]*([\d.]+)|(\d{2,3}(?:\.\d+)?)\s*%/i);

    if ((instSeg || degSeg) && done()) push();
    if (instSeg) { if (cur.institution) push(); cur.institution = cap(instSeg, 100); }
    if (degSeg) { if (cur.degree) push(); cur.degree = cap(degSeg, 100); }
    if (!instSeg && !degSeg && !range && !single && !sc) {
      if (cur.degree && !done() && /^[a-z]/.test(line)) cur.degree = cap(`${cur.degree} ${line}`, 100); // wrapped degree
      else if (cur.institution && !cur.degree) cur.degree = cap(line, 100);
    }
    if (range) { cur.start = range[1]; cur.end = /\d/.test(range[2]) ? range[2] : 'Present'; }
    else if (single && !cur.end) cur.end = single[1];
    if (sc) cur.score = sc[1] ? `CGPA ${sc[1]}` : `${sc[2]}%`;
  }
  push();
  return out
    .map((e) => (e.institution ? e : { ...e, institution: fallbackInst || e.degree }))
    .filter((e) => e.institution);
}

// ---------- skills ----------
function parseSkills(lines) {
  const skills = [];
  const strengths = [];
  const spoken = [];
  const seen = new Set();
  for (const raw of lines) {
    let l = clean(unmark(raw));
    const lab = l.match(/^([A-Za-z &/]{2,40}):\s*(.*)$/);
    let target = 'skills';
    if (lab) {
      const items = lab[2].split(/[,|•;·]/).map(clean).filter(Boolean);
      if (/spoken|human|known|native/i.test(lab[1]) || (/^languages?$/i.test(lab[1].trim()) && items.length && items.every((i) => SPOKEN.test(i)))) target = 'spoken';
      l = lab[2];
    }
    for (let part of l.split(/[,|•;·●▪]/)) {
      part = clean(part);
      if (!part) continue;
      if (target === 'spoken') { if (/^[A-Za-z ]{2,20}$/.test(part)) spoken.push(part); continue; }
      if (SOFT.test(part)) { strengths.push(cap(part[0].toUpperCase() + part.slice(1), 40)); continue; }
      const pieces = /^[\w+#.]+\/[\w+#.]+$/.test(part) ? part.split('/') : [part];
      for (let p of pieces) {
        p = p.replace(/\s+(programming|development|language|basics?|fundamentals)$/i, '').replace(/^basic\s+/i, '').replace(/^(programming|development)\s+/i, '').trim();
        if (!p || p.length > 30 || p.split(/\s+/).length > 3 || /[.!?]$/.test(p) || /^\d+$/.test(p) || /^(fresher|none|n\/?a)$/i.test(p)) continue;
        const name = SKILL_CASE[p.toLowerCase()] || (/[A-Z]/.test(p) ? p : p[0].toUpperCase() + p.slice(1));
        if (!seen.has(name.toLowerCase())) { seen.add(name.toLowerCase()); skills.push({ name }); }
      }
    }
  }
  return { skills: skills.slice(0, 30), strengths: [...new Set(strengths)].slice(0, 10), spoken: [...new Set(spoken)].slice(0, 8) };
}

// ---------- projects / experience ----------
const BULLET = /^\s*[•●▪◦·*\-–]/;
function parseProjects(rawLines) {
  const lines = rawLines.filter((l) => !/^(fresher|none|nil|n\/?a|no experience)\.?$/i.test(clean(unmark(l))));
  const isMeta = (l) => l && /\s\|\s/.test(l) && l.length < 130 && !BULLET.test(l);
  // a title is a short capitalised non-bullet line without a full stop, followed by a "A | B" meta line or by bullets
  const isTitle = (l, next) => l && !BULLET.test(l) && l.length < 100 && !/[.!?]$/.test(l) && next && (isMeta(next) || (BULLET.test(next) && /^[A-Z0-9(]/.test(l)));
  const projects = [];
  let cur = null;
  const push = () => { if (cur) projects.push(cur); cur = null; };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const next = lines[i + 1];
    if (isTitle(l, next)) {
      push();
      const title = l.replace(/^\s*\d{1,2}[.)]\s*/, '');
      const [t1, ...pipe] = title.split(/\s\|\s/);
      const [head, ...tail] = t1.split(/\s[—–-]\s/);
      cur = { title: cap(clean(head), 80), desc: [], tags: [] };
      const sub = [tail.join(' — ')];
      if (isMeta(next)) { sub.push(next.replace(/\s\|\s/g, ' · ')); i++; }
      else if (pipe.length) cur.tags = pipe.join(',').split(/[,·/]/).map(clean).filter((x) => x && x.length <= 24).slice(0, 6);
      cur.meta = sub.filter(Boolean).join(' · ');
      continue;
    }
    if (!cur) cur = { title: cap(clean(unmark(l)), 80), desc: [], tags: [] };
    else cur.desc.push(unmark(l));
  }
  push();
  return projects.map((p) => {
    const rest = [];
    let link;
    for (const d of p.desc) {
      const m = d.match(/(https?:\/\/\S+|(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/\S*)?)/i);
      if (m && /^(website|link|url|live|demo|github|code|repo)?:?\s*\S+$/i.test(d.trim())) { link ||= { url: asUrl(m[1]), kind: /github/i.test(m[1]) ? 'code' : 'live' }; continue; }
      rest.push(d);
    }
    const out = { title: p.title };
    if (p.meta) out.subtitle = cap(p.meta, 100);
    if (rest.length) out.description = cap(joinWrapped(rest), 600);
    if (p.tags && p.tags.length) out.tags = p.tags;
    if (link) out.link = { ...link, label: link.url.replace(/^https?:\/\//, '') };
    return out;
  });
}

// ---------- certifications ----------
function parseCerts(lines) {
  const out = [];
  let buf = [];
  const dateRe = new RegExp(`[\\s—–,(-]*\\b(?:(Issued|Earned|Completed)\\s+)?((?:${MONTH_RE}\\s+)?(?:\\d{1,2},?\\s*)?(?:19|20)\\d{2})\\)?\\s*$`, 'i');
  const build = (text, m) => {
    const title = clean(text.slice(0, m ? m.index : undefined).replace(/[\s—–,-]+$/, '').replace(/(\w)\(/g, '$1 ('));
    const dashed = title.split(/\s[—–-]\s/);
    const known = title.match(ISSUERS);
    const c = { title: cap(title, 140) };
    if (m) { if (m[1]) c.verb = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase(); c.date = isoDate(m[2]); }
    const issuerLike = /coursera|udemy|edx|academy|institute|universit|foundation|linkedin|nptel|services|google|microsoft|amazon|ibm/i;
    const words = (x) => x.split(/\s+/).length;
    const last = dashed[dashed.length - 1];
    if (dashed.length > 1 && issuerLike.test(last) && words(last) <= 4 && words(dashed[0]) > 2) c.issuer = last; // "Title — Issuer"
    else if (dashed.length > 1 && dashed[0].length <= 60) c.issuer = dashed[0];
    else if (known) c.issuer = known[0].trim();
    return c;
  };
  for (const raw of lines) {
    buf.push(clean(unmark(raw)));
    const text = joinWrapped(buf);
    const m = text.match(dateRe);
    if (m && m.index > 3) { out.push(build(text, m)); buf = []; }
  }
  for (const l of buf) if (l) out.push(build(l, null)); // undated leftovers: one certification per line
  return out;
}

// ---------- achievements ----------
function parseAchievements(lines) {
  const items = [];
  const anyMarker = lines.some(hasMarker);
  for (const l of lines) {
    const line = clean(unmark(l));
    const prev = items[items.length - 1];
    const continues = anyMarker ? !hasMarker(l) : prev && (/[,\-–&]$/.test(prev) || /^[a-z]/.test(line));
    if (prev && continues) items[items.length - 1] = `${prev}${prev.endsWith('-') ? '' : ' '}${line}`;
    else items.push(line);
  }
  return items.filter(Boolean).slice(0, 10).map((t) => {
    const text = cap(t.replace(/((?:cgpa|gpa)[:\s]*\d+(?:\.\d+)?|\b\d+(?:\.\d+)?\s*%)/gi, '**$1**'), 240);
    const icon = /cgpa|gpa|rank|topper|first|winner|won\b/i.test(t) ? 'trophy' : /scored|%|percent/i.test(t) ? 'chart' : /certif|course/i.test(t) ? 'medal' : /develop|built|project/i.test(t) ? 'code' : 'star';
    return { text, icon };
  });
}

// ---------- main ----------
function parseLocal(rawLines) {
  const lines = rawLines.map(clean).filter(Boolean);
  const all = lines.join('\n');

  // letter-spaced lines that are not section headings are usually the name / role banner
  const banner = lines.filter((l) => isSpaced(l) && !headingOf(l));
  const sections = splitSections(lines.filter((l) => !banner.includes(l)));

  const email = (all.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/) || [])[0];
  const phone = (all.match(/(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?){2,4}\d{2,5}/g) || []).map(clean).find((p) => p.replace(/\D/g, '').length >= 10 && p.replace(/\D/g, '').length <= 13 && !/^(19|20)\d{2}\b/.test(p));
  const linkedin = (all.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s|,;]+/i) || [])[0];
  const github = (all.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s|,;]+/i) || [])[0];

  const name = findName(lines, banner, email) || 'Your Name';

  // the university is often only in the page header/footer, not next to the degree
  const uni = (all.match(/([A-Z][A-Za-z&.'-]+(?: [A-Z][A-Za-z&.'-]+){0,4} (?:University|Institute of Technology|Institute|College))/) || [])[1];
  const education = parseEducation(sections.education || [], uni);
  let role = banner[1] ? despace(banner[1]) : '';
  if (role && !/\s/.test(role) && education[0] && education[0].degree) role = `${education[0].degree} ${role}`;
  role = role ? role.replace(/(^|\s)(\p{L})/gu, (_, a, b) => a + b.toUpperCase()) : '';

  const { skills, strengths, spoken } = parseSkills(sections.skills || []);
  const aboutText = joinWrapped(sections.about || []);
  const langs = [...spoken, ...(sections.languages || []).flatMap((l) => unmark(l).split(/[,|•;·]/)).map(clean).filter((l) => /^[A-Za-z ]{2,20}$/.test(l))];

  const data = { version: 1, basics: { name: cap(name, 80) }, contact: {} };
  if (role) data.basics.role = cap(role, 120);
  if (aboutText) { data.basics.summary = cap(aboutText.split(/(?<=[.!?])\s/)[0], 500); data.about = { body: cap(aboutText, 1500) }; }
  if (langs.length) data.basics.languages = [...new Set(langs)].slice(0, 8);
  const loc = all.match(/(?:location|address|city)\s*[:\-]\s*([^\n]+)/i);
  const headLine = lines.slice(0, 10).find((l) => email && l.includes(email) && /[|•·]/.test(l));
  const place = headLine && headLine.split(/[|•·]/).map(clean).find((x) => /^[A-Za-z .]+,\s*[A-Za-z .]+$/.test(x));
  if (loc) data.basics.location = cap(clean(loc[1]), 80);
  else if (place) data.basics.location = cap(place, 80);
  if (email) data.contact.email = email;
  if (phone) data.contact.phone = phone;
  if (linkedin) data.contact.linkedin = asUrl(linkedin);
  if (github) data.contact.github = asUrl(github);
  if (education.length) data.education = education.slice(0, 6);
  if (skills.length) data.skills = skills;
  if (strengths.length) data.strengths = strengths;
  const jobs = parseProjects(sections.experience || []);
  if (!data.basics.role && jobs[0] && /engineer|developer|analyst|designer|manager|scientist|consultant|architect|intern/i.test(jobs[0].title)) data.basics.role = cap(jobs[0].title, 120);
  const projects = [...parseProjects(sections.projects || []), ...jobs];
  if (projects.length) data.projects = projects.slice(0, 12);
  const certs = parseCerts(sections.certs || []);
  if (certs.length) data.certifications = certs.slice(0, 12);
  const wins = parseAchievements(sections.achievements || []);
  if (wins.length) data.achievements = wins;
  if (!Object.keys(data.contact).length) delete data.contact;
  return data;
}

module.exports = { parseLocal };
