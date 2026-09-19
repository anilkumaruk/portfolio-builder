'use strict';
// Form state lives in `data` (portfolio JSON shape). Photo / resume PDF are kept separately as data URIs.
let data = { basics: { name: '' } };
const assets = { photo: '', resume: '' };
let lastHtml = '';
let timer;

const $ = (s) => document.querySelector(s);
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) k.startsWith('on') ? e.addEventListener(k.slice(2), v) : e.setAttribute(k, v);
  kids.flat().forEach((c) => e.append(c));
  return e;
};

const getAt = (o, p) => p.reduce((a, k) => (a == null ? a : a[k]), o);
function setAt(o, p, v) {
  let cur = o;
  for (let i = 0; i < p.length - 1; i++) { if (cur[p[i]] == null) cur[p[i]] = typeof p[i + 1] === 'number' ? [] : {}; cur = cur[p[i]]; }
  cur[p[p.length - 1]] = v;
}

function changed() { clearTimeout(timer); timer = setTimeout(refresh, 450); }

// ---- field builders ----
function field(label, path, { area, placeholder, list, hint } = {}) {
  const val = getAt(data, path);
  const shown = list ? (val || []).map((x) => (typeof x === 'object' ? x.name : x)).join(', ') : val || '';
  const input = area ? el('textarea', { placeholder: placeholder || '' }) : el('input', { placeholder: placeholder || '' });
  input.value = shown;
  input.addEventListener('input', () => {
    if (list === 'names') setAt(data, path, input.value.split(',').map((s) => s.trim()).filter(Boolean).map((name) => ({ name })));
    else if (list) setAt(data, path, input.value.split(',').map((s) => s.trim()).filter(Boolean));
    else setAt(data, path, input.value);
    changed();
  });
  return el('label', {}, label, input, hint ? el('span', { class: 'hint' }, hint) : '');
}

function repeater(path, blank, fieldsFor, itemLabel) {
  const wrap = el('div', { class: 'body', style: 'padding:0' });
  const draw = () => {
    wrap.textContent = '';
    (getAt(data, path) || []).forEach((_, i) => {
      const item = el('div', { class: 'item' },
        el('button', { class: 'rm', type: 'button', title: 'Remove', onclick: () => { getAt(data, path).splice(i, 1); draw(); changed(); } }, '✕'),
        fieldsFor([...path, i]));
      wrap.append(item);
    });
    wrap.append(el('button', { type: 'button', onclick: () => { const a = getAt(data, path) || []; a.push(structuredClone(blank)); setAt(data, path, a); draw(); changed(); } }, `+ Add ${itemLabel}`));
  };
  draw();
  return wrap;
}

const row = (...c) => el('div', { class: 'row' }, c);
const section = (title, open, ...kids) => el('details', open ? { open: '' } : {}, el('summary', {}, title), el('div', { class: 'body' }, kids));

function upload(label, kind, accept) {
  const status = el('span', { class: 'hint' }, assets[kind] ? 'File attached' : 'None');
  const input = el('input', { type: 'file', accept });
  input.addEventListener('change', async () => {
    const f = input.files[0];
    if (!f) return;
    assets[kind] = await toDataUri(f);
    status.textContent = f.name;
    changed();
  });
  return el('label', {}, label, input, status);
}

function build() {
  const root = $('#sections');
  root.textContent = '';
  data.basics ||= { name: '' };
  root.append(
    section('Basics', true,
      field('Full name *', ['basics', 'name']),
      field('Title / role', ['basics', 'role'], { placeholder: 'Full-stack developer' }),
      field('Short intro', ['basics', 'summary'], { area: true }),
      row(field('Location', ['basics', 'location']), field('Languages spoken', ['basics', 'languages'], { list: true, placeholder: 'English, Hindi' })),
      row(field('Availability badge', ['basics', 'availability', 'badge'], { placeholder: 'Open to opportunities' }), field('Sidebar note', ['basics', 'availability', 'note'])),
      field('Photo note words (up to 4)', ['basics', 'motto'], { list: true, placeholder: 'Build, Learn, Grow' }),
      upload('Profile photo', 'photo', 'image/*'),
      upload('Resume PDF (for the Download CV button)', 'resume', 'application/pdf')),
    section('About', false,
      row(field('Heading', ['about', 'heading'], { placeholder: 'Turning ideas into' }), field('Highlighted part', ['about', 'headingAccent'], { placeholder: 'useful products.' })),
      field('About text', ['about', 'body'], { area: true }),
      el('p', { class: 'hint' }, 'Stat cards (projects / certifications / skills counts) are generated automatically.')),
    section('Skills', false,
      field('Skills', ['skills'], { list: 'names', area: true, placeholder: 'Python, React, Git & GitHub', hint: 'Comma separated. Known technologies get their brand colour automatically.' }),
      field('Strengths', ['strengths'], { list: true, placeholder: 'Problem solving, Teamwork' })),
    section('Projects', false, repeater(['projects'], { title: '' }, (p) => el('div', { class: 'body', style: 'padding:0' },
      field('Title', [...p, 'title']),
      field('Subtitle', [...p, 'subtitle'], { placeholder: 'Web app · personal' }),
      field('Description', [...p, 'description'], { area: true }),
      field('Tags', [...p, 'tags'], { list: true, placeholder: 'React, Node' }),
      row(field('Link URL', [...p, 'link', 'url'], { placeholder: 'https://…' }), field('Link label', [...p, 'link', 'label'])),
    ), 'project')),
    section('Education', false, repeater(['education'], { institution: '' }, (p) => el('div', { class: 'body', style: 'padding:0' },
      field('Institution', [...p, 'institution']),
      field('Degree', [...p, 'degree']),
      row(field('Start', [...p, 'start'], { placeholder: '2020' }), field('End', [...p, 'end'], { placeholder: '2024 or Present' })),
      field('Score', [...p, 'score'], { placeholder: 'CGPA 8.2' }),
    ), 'education')),
    section('Certifications', false, repeater(['certifications'], { title: '' }, (p) => el('div', { class: 'body', style: 'padding:0' },
      field('Title', [...p, 'title']),
      row(field('Issuer', [...p, 'issuer'], { placeholder: 'Google' }), field('Date', [...p, 'date'], { placeholder: '2025-06-15 or 2025' })),
    ), 'certification')),
    section('Achievements', false, repeater(['achievements'], { text: '' }, (p) => field('Achievement', [...p, 'text'], { area: true, hint: 'Wrap key words in **double asterisks** to bold.' }), 'achievement')),
    section('Contact', false,
      row(field('Email', ['contact', 'email']), field('Phone', ['contact', 'phone'])),
      row(field('LinkedIn URL', ['contact', 'linkedin'], { placeholder: 'https://linkedin.com/in/…' }), field('GitHub URL', ['contact', 'github'], { placeholder: 'https://github.com/…' })),
      field('Contact heading', ['contact', 'heading'], { placeholder: 'Interested in working together?' }),
      field('Contact text', ['contact', 'body'], { area: true }))
  );
}

// ---- data helpers ----
/** Drop empty strings/arrays/objects the form leaves behind, and half-filled rows. */
function clean(v) {
  if (Array.isArray(v)) { const a = v.map(clean).filter((x) => x !== undefined); return a.length ? a : undefined; }
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, x] of Object.entries(v)) { const c = clean(x); if (c !== undefined) o[k] = c; }
    return Object.keys(o).length ? o : undefined;
  }
  if (typeof v === 'string') return v.trim() === '' ? undefined : v.trim();
  return v;
}

function payload() {
  const d = clean(data) || {};
  d.version = 1;
  for (const pr of d.projects || []) if (pr.link && !pr.link.url) delete pr.link;
  for (const [k, req] of [['projects', 'title'], ['education', 'institution'], ['certifications', 'title'], ['achievements', 'text']]) {
    if (d[k]) { d[k] = d[k].filter((x) => x[req]); if (!d[k].length) delete d[k]; }
  }
  if (assets.photo) d.basics = { ...d.basics, photo: assets.photo };
  if (assets.resume) d.basics = { ...d.basics, resume: assets.resume };
  return d;
}

// ---- preview / actions ----
let view = 'site';
let lastResume = '';

function say(text, kind) {
  const m = $('#msg');
  m.textContent = text;
  m.className = kind || '';
  m.style.display = text ? 'block' : 'none';
}

function build2() {
  if (!data.basics || !String(data.basics.name || '').trim()) return { error: 'Enter your name (or upload a resume) to see the preview.' };
  const d = payload();
  const errors = Portfolio.validate(d);
  if (errors.length) return { error: errors.join('\n') };
  lastResume = Portfolio.resume(d);
  const embed = $('#use-gen').checked && !assets.resume;
  lastHtml = Portfolio.render(d, embed ? { resumeHtml: lastResume } : {});
  return { d };
}

function refresh() {
  const r = build2();
  if (r.error) return say(r.error, /^Enter your name/.test(r.error) ? '' : 'bad'), false;
  $('#preview').srcdoc = view === 'resume' ? lastResume : lastHtml;
  say('');
  return true;
}

function setView(v) {
  view = v;
  $('#tab-site').classList.toggle('on', v === 'site');
  $('#tab-resume').classList.toggle('on', v === 'resume');
  refresh();
}
$('#tab-site').onclick = () => setView('site');
$('#tab-resume').onclick = () => setView('resume');

function toDataUri(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
}

function download(name, text, type) {
  const a = el('a', { href: URL.createObjectURL(new Blob([text], { type })), download: name });
  document.body.append(a); a.click(); a.remove();
}
const slug = () => (data.basics.name || 'portfolio').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function handleResume(file) {
  say(`Reading ${file.name}…`);
  try {
    let body;
    if (/pdf$/i.test(file.type) || /\.pdf$/i.test(file.name)) {
      const buf = await file.arrayBuffer();
      assets.resume = await toDataUri(file);
      body = { pdf: buf };
    } else body = { text: await file.text() };
    data = (await Portfolio.parseResume(body)).data;
    build();
    refresh();
    say('Resume read. Please review each section on the left (names, dates and wording may need a fix), then download or publish.', 'ok');
  } catch (e) {
    say(e.message + '\n\nYou can still fill the form by hand.', 'bad');
  }
}

$('#btn-resume').onclick = () => $('#f-resume').click();
$('#f-resume').onchange = (e) => e.target.files[0] && handleResume(e.target.files[0]);
const drop = $('#drop');
['dragover', 'dragenter'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('over'); }));
['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
drop.addEventListener('drop', (e) => e.dataTransfer.files[0] && handleResume(e.dataTransfer.files[0]));
$('#use-gen').onchange = () => refresh();

$('#btn-dl').onclick = () => {
  if (!refresh()) return;
  download(`${slug()}-portfolio.html`, lastHtml, 'text/html');
  say('Downloaded: one self-contained file you can open locally or upload to any static host. Or use "Publish to GitHub" for a free link.', 'ok');
};
$('#btn-resume-pdf').onclick = () => {
  if (!refresh()) return;
  window.open(URL.createObjectURL(new Blob([lastResume], { type: 'text/html' })), '_blank');
  say('Resume opened in a new tab. Click "Save as PDF / Print" there and choose "Save as PDF".', 'ok');
};
$('#btn-json').onclick = () => download('portfolio.json', JSON.stringify(payload(), null, 2), 'application/json');
$('#btn-import').onclick = () => $('#f-json').click();
$('#f-json').onchange = async (e) => {
  try { data = JSON.parse(await e.target.files[0].text()); build(); refresh(); } catch { say('That file is not valid JSON.', 'bad'); }
};
$('#btn-example').onclick = async () => {
  const r = await fetch('examples/sample.json');
  if (!r.ok) return say('Example not available.', 'bad');
  data = await r.json();
  delete data.basics.photo; delete data.basics.resume; // example assets are not bundled
  build(); refresh();
};

// ---- publish to GitHub Pages (runs in the browser; token goes only to api.github.com) ----
const b64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};

async function gh(token, method, path, body) {
  const r = await fetch('https://api.github.com' + path, {
    method,
    headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28', ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, json };
}

async function publish() {
  const log = $('#pub-log');
  const say2 = (t) => { log.textContent += t + '\n'; };
  log.textContent = '';
  if (!refresh()) { say2('Fix the preview errors first (see the message over the preview).'); return; }
  const token = $('#pub-token').value.trim();
  if (!token) { say2('Paste your GitHub token first.'); return; }
  $('#pub-go').disabled = true;
  try {
    const me = await gh(token, 'GET', '/user');
    if (!me.ok) throw new Error(me.status === 401 ? 'GitHub rejected that token.' : `GitHub error ${me.status}`);
    const login = me.json.login;
    const repo = $('#pub-repo').value.trim() || `${login}.github.io`;
    say2(`Signed in as ${login}.`);

    let info = await gh(token, 'GET', `/repos/${login}/${repo}`);
    if (info.status === 404) {
      say2(`Creating repository ${repo}…`);
      info = await gh(token, 'POST', '/user/repos', { name: repo, description: 'My portfolio (made with Portfolio Builder)', auto_init: true, homepage: `https://${login}.github.io${repo === `${login}.github.io` ? '' : '/' + repo}/` });
      if (!info.ok) throw new Error(`Could not create the repository: ${info.json.message || info.status}. Does the token have the public_repo scope?`);
    } else if (!info.ok) throw new Error(`GitHub error ${info.status}`);
    const branch = info.json.default_branch || 'main';

    const existing = await gh(token, 'GET', `/repos/${login}/${repo}/contents/index.html?ref=${branch}`);
    if (existing.ok && !confirm(`${repo} already has an index.html. Replace it with this portfolio?`)) { say2('Cancelled. Nothing was changed.'); return; }
    say2('Uploading your portfolio…');
    const put = await gh(token, 'PUT', `/repos/${login}/${repo}/contents/index.html`, { message: 'Update portfolio', content: b64(lastHtml), branch, ...(existing.ok ? { sha: existing.json.sha } : {}) });
    if (!put.ok) throw new Error(`Upload failed: ${put.json.message || put.status}`);

    say2('Turning on GitHub Pages…');
    const pages = await gh(token, 'POST', `/repos/${login}/${repo}/pages`, { source: { branch, path: '/' } });
    if (!pages.ok && ![409, 422].includes(pages.status)) say2(`(Could not enable Pages automatically: ${pages.json.message || pages.status}. Enable it in the repo's Settings → Pages.)`);

    const url = `https://${login}.github.io${repo === `${login}.github.io` ? '' : '/' + repo}/`;
    say2(`\nDone! Your portfolio will be live in a minute or two at:\n${url}`);
    log.append(el('a', { href: url, target: '_blank', rel: 'noopener' }, 'Open ' + url));
  } catch (e) {
    say2('Error: ' + e.message);
  } finally {
    $('#pub-go').disabled = false;
    $('#pub-token').value = '';
  }
}
$('#btn-publish').onclick = () => { $('#pub-log').textContent = ''; $('#pub').showModal(); };
$('#pub-close').onclick = () => $('#pub').close();
$('#pub-go').onclick = publish;

build();
refresh();
