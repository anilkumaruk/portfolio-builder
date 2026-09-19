'use strict';
// Offline, best-effort resume text -> portfolio JSON. No API key needed.
// Works from section headings + patterns (emails, dates, "Issued June 2026", "A | B" project meta lines).
// It will not be perfect on every layout: the web app lets the user fix anything afterwards.

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const HEADINGS = {
  about: ['about', 'aboutme', 'summary', 'professionalsummary', 'profile', 'objective', 'careerobjective', 'introduction'],
  education: ['education', 'academics', 'academicbackground', 'qualifications'],
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

const SKILL_CASE = { javascript: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS', sql: 'SQL', mysql: 'MySQL', 'c++': 'C++', c: 'C', git: 'Git', github: 'GitHub', nodejs: 'Node.js', 'node.js': 'Node.js', reactjs: 'React', aws: 'AWS', php: 'PHP', jsx: 'JSX', mongodb: 'MongoDB', ai: 'AI', ml: 'ML' };
const SOFT = /^(problem[- ]solving|communication|teamwork|team (work|player|collaboration)|leadership|critical thinking|creativity|adaptability|time management|collaboration|analytical( thinking)?|logical thinking|data structures?( and algorithms)?)$/i;

const despace = (l) => (/^(\S ){2,}\S$/.test(l) ? l.replace(/ /g, '') : l);
const key = (l) => despace(l).toLowerCase().replace(/[^a-z]/g, '');
const isSpaced = (l) => /^(\S ){2,}\S$/.test(l);
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
const clean = (s) => s.replace(/\s+/g, ' ').trim();
const cap = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

function joinWrapped(lines) {
  return lines.reduce((out, l) => (out.endsWith('-') && /^[a-z]/.test(l) ? out + l : out ? `${out} ${l}` : l), '');
}

function isoDate(text) {
  const m = text.match(/\b(?:(January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:(\d{1,2}),?\s+)?)?(\d{4})\b/i);
  if (!m) return undefined;
  if (!m[1]) return m[3];
  const mm = String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, '0');
  return m[2] ? `${m[3]}-${mm}-${String(m[2]).padStart(2, '0')}` : `${m[3]}-${mm}`;
}

const asUrl = (u) => (/^https?:\/\//i.test(u) ? u : 'https://' + u).replace(/[.,;)]+$/, '');

function splitSections(lines) {
  const sections = {};
  let cur = null;
  for (const raw of lines) {
    const k = HEADING_LOOKUP[key(raw)];
    const looksLikeHeading = k && raw.length < 45 && (isSpaced(raw) || raw === raw.toUpperCase() || /^[A-Z][a-z]+( [A-Za-z&]+){0,3}:?$/.test(raw));
    if (looksLikeHeading) { cur = k; (sections[cur] ||= []); continue; }
    if (cur) sections[cur].push(raw);
  }
  return sections;
}

function parseEducation(lines) {
  const out = [];
  let buf = [];
  const flush = (yearLine) => {
    const text = [...buf, yearLine].filter(Boolean);
    buf = [];
    if (!text.length) return;
    const years = (yearLine || '').match(/(\d{4})\s*(?:[-–—to]+\s*(\d{4}|present|ongoing|current))?/i);
    const score = text.join(' ').match(/(?:cgpa|gpa)[:\s]*([\d.]+)|(\d{2,3}(?:\.\d+)?)\s*%/i);
    const rest = text.filter((t) => t !== yearLine);
    const inst = rest.find((t) => /universit|college|school|institute|academy|vidyal|polytechnic|iit|nit\b/i.test(t)) || rest[0];
    const degree = rest.find((t) => t !== inst);
    if (!inst) return;
    const e = { institution: cap(clean(inst), 100) };
    if (degree) e.degree = cap(clean(degree), 100);
    if (years && years[2]) { e.start = years[1]; e.end = /\d/.test(years[2]) ? years[2] : 'Present'; }
    else if (years) e.end = years[1];
    if (score) e.score = score[1] ? `CGPA ${score[1]}` : `${score[2]}%`;
    out.push(e);
  };
  for (const l of lines) {
    if (/\b(19|20)\d{2}\b/.test(l) && l.length < 40 && !/universit|college|school/i.test(l)) flush(l);
    else buf.push(l);
  }
  flush(null);
  return out;
}

function parseSkills(lines) {
  const skills = [];
  const strengths = [];
  const seen = new Set();
  for (const l of lines) {
    for (let part of l.split(/[,|•;·●▪]|\s{2,}/)) {
      part = clean(part.replace(/^[-–*]\s*/, ''));
      if (!part) continue;
      if (SOFT.test(part)) { strengths.push(cap(part[0].toUpperCase() + part.slice(1), 40)); continue; }
      const pieces = /^[\w+#.]+\/[\w+#.]+$/.test(part) ? part.split('/') : [part];
      for (let p of pieces) {
        p = p.replace(/\s+(programming|development|language|basics?|fundamentals)$/i, '').replace(/^basic\s+/i, '').replace(/^(programming|development)\s+/i, '').trim();
        if (!p) continue;
        const name = SKILL_CASE[p.toLowerCase()] || (/[A-Z]/.test(p) ? p : p[0].toUpperCase() + p.slice(1));
        if (!seen.has(name.toLowerCase())) { seen.add(name.toLowerCase()); skills.push({ name: cap(name, 40) }); }
      }
    }
  }
  return { skills: skills.slice(0, 30), strengths: [...new Set(strengths)].slice(0, 10) };
}

function parseProjects(lines) {
  const isMeta = (l) => l && /\s\|\s/.test(l) && l.length < 130;
  const projects = [];
  let cur = null;
  const push = () => { if (cur) projects.push(cur); cur = null; };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (isMeta(lines[i + 1]) && !isMeta(l)) {
      push();
      const [head, ...tail] = l.split(/\s[—–]\s/);
      cur = { title: cap(clean(head), 80), meta: [tail.join(' — '), lines[i + 1]].filter(Boolean).join(' · ').replace(/\s\|\s/g, ' · '), desc: [] };
      i++;
      continue;
    }
    if (!cur) cur = { title: cap(clean(l), 80), desc: [] };
    else cur.desc.push(l);
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
    if (link) { out.link = { ...link, label: link.url.replace(/^https?:\/\//, '') }; }
    return out;
  });
}

function parseCerts(lines) {
  const out = [];
  let buf = [];
  const dateRe = /[\s—–-]*\b(Issued|Earned|Completed)\b\s+((?:[A-Z][a-z]+ )?(?:\d{1,2},? )?\d{4})\s*$/;
  for (const l of lines) {
    buf.push(l);
    const text = joinWrapped(buf);
    const m = text.match(dateRe);
    if (m) {
      const title = text.slice(0, m.index).replace(/[\s—–-]+$/, '');
      const issuer = title.split(/\s[—–-]\s/)[0];
      const c = { title: cap(title, 140), verb: m[1], date: isoDate(m[2]) };
      if (issuer && issuer !== title) c.issuer = cap(issuer, 60);
      out.push(c);
      buf = [];
    }
  }
  if (buf.length) { // undated leftovers: one certification per line
    for (const l of buf) { const iss = l.split(/\s[—–-]\s/); out.push({ title: cap(l, 140), ...(iss.length > 1 ? { issuer: cap(iss[0], 60) } : {}) }); }
  }
  return out;
}

function parseAchievements(lines) {
  const items = [];
  for (const l of lines) {
    const prev = items[items.length - 1];
    const line = l.replace(/^[-–•*●▪]\s*/, '');
    if (prev && !/^[•\-*●▪]/.test(l) && (/[,\-–&]$/.test(prev) || /^[a-z]/.test(line))) items[items.length - 1] = `${prev}${prev.endsWith('-') ? '' : ' '}${line}`;
    else items.push(line);
  }
  return items.slice(0, 10).map((t) => {
    const text = cap(t.replace(/((?:cgpa|gpa)[:\s]*\d+(?:\.\d+)?|\b\d+(?:\.\d+)?\s*%)/gi, '**$1**'), 240);
    const icon = /cgpa|gpa|rank|topper|first/i.test(t) ? 'trophy' : /scored|%|percent/i.test(t) ? 'chart' : /certif|course/i.test(t) ? 'medal' : /develop|built|project/i.test(t) ? 'code' : 'star';
    return { text, icon };
  });
}

function parseLocal(rawLines) {
  const lines = rawLines.map(clean).filter(Boolean);
  const all = lines.join('\n');

  // letter-spaced lines that are not section headings are usually the name / role banner
  const banner = lines.filter((l) => isSpaced(l) && !HEADING_LOOKUP[key(l)]);
  const sections = splitSections(lines.filter((l) => !banner.includes(l)));

  const email = (all.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/) || [])[0];
  const phone = (all.match(/(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?){2,4}\d{2,5}/g) || []).map(clean).find((p) => p.replace(/\D/g, '').length >= 10 && p.replace(/\D/g, '').length <= 13 && !/^(19|20)\d{2}/.test(p));
  const linkedin = (all.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s|,;]+/i) || [])[0];
  const github = (all.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s|,;]+/i) || [])[0];

  let name = banner[0] ? titleCase(despace(banner[0])) : '';
  if (!name) {
    const first = lines.find((l) => !HEADING_LOOKUP[key(l)] && !/@|\d{5}/.test(l) && /^[\p{L} .'-]{3,50}$/u.test(l));
    name = first ? (first === first.toUpperCase() ? titleCase(first) : first) : '';
  }
  if (!name && email) name = titleCase(email.split('@')[0].replace(/[\d._-]+/g, ' ').trim());
  name = name || 'Your Name';

  const education = parseEducation(sections.education || []);
  let role = banner[1] ? despace(banner[1]) : '';
  if (role && !/\s/.test(role) && education[0] && education[0].degree) role = `${education[0].degree} ${role}`;
  role = role ? role.replace(/(^|\s)(\p{L})/gu, (_, a, b) => a + b.toUpperCase()) : '';

  const { skills, strengths } = parseSkills(sections.skills || []);
  const projectLines = [...(sections.projects || []), ...(sections.experience || [])];
  const aboutText = joinWrapped(sections.about || []);
  const langs = (sections.languages || []).flatMap((l) => l.split(/[,|•;·]/)).map(clean).filter((l) => /^[A-Za-z ]{2,20}$/.test(l)).slice(0, 8);

  const data = {
    version: 1,
    basics: { name: cap(name, 80) },
    contact: {},
  };
  if (role) data.basics.role = cap(role, 120);
  if (aboutText) { data.basics.summary = cap(aboutText.split(/(?<=[.!?])\s/)[0], 500); data.about = { body: cap(aboutText, 1500) }; }
  if (langs.length) data.basics.languages = langs;
  const loc = all.match(/(?:location|address|city)\s*[:\-]\s*([^\n]+)/i);
  if (loc) data.basics.location = cap(clean(loc[1]), 80);
  if (email) data.contact.email = email;
  if (phone) data.contact.phone = phone;
  if (linkedin) data.contact.linkedin = asUrl(linkedin);
  if (github) data.contact.github = asUrl(github);
  if (education.length) data.education = education.slice(0, 6);
  if (skills.length) data.skills = skills;
  if (strengths.length) data.strengths = strengths;
  const projects = parseProjects(projectLines);
  if (projects.length) data.projects = projects.slice(0, 12);
  const certs = parseCerts(sections.certs || []);
  if (certs.length) data.certifications = certs.slice(0, 12);
  const wins = parseAchievements(sections.achievements || []);
  if (wins.length) data.achievements = wins;
  if (!Object.keys(data.contact).length) delete data.contact;
  return data;
}

module.exports = { parseLocal };
