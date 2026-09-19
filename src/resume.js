'use strict';
// portfolio JSON -> a clean, single-column, ATS-friendly resume (HTML sized for A4).
// Opens with a toolbar whose "Save as PDF" button calls print(); the toolbar is hidden when printing.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const has = (a) => Array.isArray(a) && a.length > 0;
const bold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const short = (u) => String(u).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const safe = (u) => (/^https?:\/\//i.test(u) ? u : '#');

function when(d, verb) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return [verb, m ? `${MONTHS[+m - 1]} ${day ? +day + ', ' : ''}${y}` : y].filter(Boolean).join(' ');
}

/** "Sentence one. Sentence two." -> up to `max` bullet points. */
function bullets(text, max = 3) {
  if (!text) return [];
  return text.split(/(?<=[.!?])\s+(?=[A-Z])/).map((t) => t.trim()).filter(Boolean).slice(0, max);
}

function resume(data) {
  const b = data.basics || {};
  const c = data.contact || {};
  const edu = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const certs = data.certifications || [];
  const wins = data.achievements || [];

  const contact = [
    c.email && `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`,
    c.phone && esc(c.phone),
    b.location && esc(b.location),
    c.linkedin && `<a href="${esc(safe(c.linkedin))}">${esc(short(c.linkedin))}</a>`,
    c.github && `<a href="${esc(safe(c.github))}">${esc(short(c.github))}</a>`,
  ].filter(Boolean);

  const section = (title, body) => `<section><h2>${title}</h2>${body}</section>`;
  const out = [];
  const summary = (data.about && data.about.body) || b.summary;
  if (summary) out.push(section('Professional Summary', `<p>${esc(summary)}</p>`));
  if (has(skills) || has(data.strengths)) {
    out.push(section('Skills', `${has(skills) ? `<p><b>Technical:</b> ${skills.map((s) => esc(s.name)).join(' · ')}</p>` : ''}${has(data.strengths) ? `<p><b>Strengths:</b> ${data.strengths.map(esc).join(' · ')}</p>` : ''}`));
  }
  if (has(projects)) {
    out.push(section('Projects', projects.map((p) => `
      <div class="item"><div class="row"><h3>${esc(p.title)}${p.subtitle ? `<span class="sub"> — ${esc(p.subtitle)}</span>` : ''}</h3>${p.link ? `<a class="r" href="${esc(safe(p.link.url))}">${esc(p.link.label || short(p.link.url))}</a>` : ''}</div>
      ${bullets(p.description).length ? `<ul>${bullets(p.description).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      ${has(p.tags) ? `<p class="tags">${p.tags.map(esc).join(' · ')}</p>` : ''}</div>`).join('')));
  }
  if (has(edu)) {
    out.push(section('Education', edu.map((e) => `
      <div class="item"><div class="row"><h3>${esc(e.institution)}</h3><span class="r">${esc([e.start, e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="row"><span>${esc(e.degree || '')}</span><span class="r">${esc(e.score || '')}</span></div></div>`).join('')));
  }
  if (has(certs)) {
    out.push(section('Certifications', `<ul>${certs.map((x) => `<li>${esc(x.title)}${x.date ? ` <span class="muted">(${esc(when(x.date, x.verb))})</span>` : ''}</li>`).join('')}</ul>`));
  }
  if (has(wins)) out.push(section('Achievements', `<ul>${wins.map((w) => `<li>${bold(w.text)}</li>`).join('')}</ul>`));

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(b.name)} — Resume</title>
<style>
@page{size:A4;margin:14mm 15mm}
*{box-sizing:border-box}
body{margin:0;background:#e9edf3;color:#1a1f2b;font:10.5pt/1.45 "Helvetica Neue",Helvetica,Arial,sans-serif}
.bar{position:sticky;top:0;display:flex;gap:10px;align-items:center;justify-content:center;padding:10px;background:#101728;color:#fff;font-size:13px}
.bar button{font:inherit;font-weight:700;padding:8px 16px;border:0;border-radius:8px;background:#4560FF;color:#fff;cursor:pointer}
.page{width:210mm;min-height:297mm;margin:16px auto;background:#fff;padding:14mm 15mm;box-shadow:0 8px 30px rgba(0,0,0,.15)}
header{border-bottom:2px solid #1a1f2b;padding-bottom:8px;margin-bottom:4px}
h1{margin:0;font:700 24pt/1.1 Georgia,"Times New Roman",serif;letter-spacing:-.01em}
.role{margin:3px 0 0;font-size:12pt;color:#3b4560}
.contact{margin:6px 0 0;font-size:9.5pt;color:#3b4560}
.contact span+span::before,.contact a+a::before{content:""}
a{color:inherit;text-decoration:none}
h2{margin:14px 0 6px;font:700 10.5pt/1 "Helvetica Neue",Helvetica,Arial,sans-serif;text-transform:uppercase;letter-spacing:.12em;border-bottom:1px solid #b9c1d3;padding-bottom:4px}
h3{margin:0;font-size:10.8pt}
.sub{font-weight:400;color:#3b4560}
p{margin:2px 0}
ul{margin:3px 0 0;padding-left:17px}
li{margin:1px 0}
.item{margin:7px 0;break-inside:avoid}
.row{display:flex;justify-content:space-between;gap:12px}
.r{white-space:nowrap;color:#3b4560}
.muted,.tags{color:#59637e}
section{break-inside:avoid-page}
@media print{body{background:#fff}.bar{display:none}.page{margin:0;width:auto;min-height:0;padding:0;box-shadow:none}}
@media (max-width:820px){.page{width:auto;margin:0;padding:18px}}
</style></head><body>
<div class="bar"><span>Your resume is ready.</span><button onclick="print()">Save as PDF / Print</button></div>
<div class="page">
<header><h1>${esc(b.name)}</h1>${b.role ? `<p class="role">${esc(b.role)}</p>` : ''}<p class="contact">${contact.join(' &nbsp;|&nbsp; ')}</p></header>
${out.join('\n')}
</div></body></html>`;
}

module.exports = { resume };
