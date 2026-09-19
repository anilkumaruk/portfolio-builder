'use strict';
// portfolio JSON -> one self-contained HTML string. Every section is optional and is dropped when empty.
// Asset fields (photo, resume) may be relative paths (CLI build) or data: URIs (web app).

const { icon, glyph } = require('./icons');
const { skillBadge, certBadge, gradientFor, initials } = require('./catalog');
const { dashboard, cards } = require('./mockups');

// Templates: bundled into globalThis.__TEMPLATES__ for the browser build, read from disk under Node.
function loadTemplate(name) {
  const bundled = globalThis.__TEMPLATES__ && globalThis.__TEMPLATES__[name];
  if (bundled) return bundled;
  const fs = require('fs');
  const path = require('path');
  const dir = path.join(__dirname, '..', 'templates', name);
  const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
  return { css: read('style.css') + '\n' + read('extras.css'), js: read('client.js') };
}
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const has = (a) => Array.isArray(a) && a.length > 0;
const safeUrl = (u) => (/^(https?:\/\/|mailto:|tel:)/i.test(u) ? u : '#');
const safeAsset = (u) => (/^(data:(image|application)\/|[\w./~-]+$|https?:\/\/)/i.test(u) ? u : '');

/** **bold** -> <b>, everything else escaped. */
const richText = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

function fmtDate(d, verb) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  let out = y;
  if (m) out = `${MONTHS[+m - 1]} ${day ? +day + ', ' : ''}${y}`;
  return `${verb || 'Completed'} ${out}`;
}

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; } };
const handleOf = (u) => { try { return new URL(u).pathname.split('/').filter(Boolean).pop() || hostOf(u); } catch { return u; } };

function markHtml(b, extra = '') {
  const style = `background:${b.bg}${b.fg ? `;color:${b.fg}` : ''}`;
  return `<span class="mark"${extra} style="${esc(style)}">${esc(b.mark)}</span>`;
}

function render(data, opts = {}) {
  const b = data.basics || {};
  const c = data.contact || {};
  const about = data.about || {};
  const av = b.availability || {};
  const edu = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const certs = data.certifications || [];
  const wins = data.achievements || [];
  const tplName = (data.theme && data.theme.template) || 'default';
  const tpl = loadTemplate(tplName);
  const css = tpl.css;
  const themeKey = 'pf-theme-' + (b.name || 'site').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const resume = b.resume ? safeAsset(b.resume) : '';
  const js = tpl.js
    .replace(/__THEME_KEY__/g, esc(themeKey))
    .replace('__CV_PATH__', resume.replace(/\\/g, '\\\\').replace(/'/g, "\\'"));

  const nameWords = b.name.split(/\s+/).filter(Boolean);
  const mono = (nameWords.length > 1 ? nameWords[0][0] + nameWords[nameWords.length - 1][0] : initials(b.name, 2)).toUpperCase();
  const brand = `${esc(mono)}<span>.</span>`;
  const title = (data.seo && data.seo.title) || b.name;
  const desc = (data.seo && data.seo.description) || [b.name, b.role].filter(Boolean).join(' — ');

  // ---- stats (explicit, else auto from counts) ----
  let stats = data.stats;
  if (!has(stats)) {
    stats = [];
    if (projects.length) stats.push({ value: String(projects.length), label: projects.length === 1 ? 'Project' : 'Projects', icon: 'code' });
    if (certs.length) stats.push({ value: String(certs.length), label: certs.length === 1 ? 'Certification' : 'Certifications', icon: 'medal' });
    if (skills.length) stats.push({ value: String(skills.length), label: 'Languages & tools', icon: 'book' });
  }

  // ---- facts ----
  const facts = [];
  if (b.location) facts.push(['pin', b.location]);
  if (has(b.languages)) facts.push(['globe', b.languages.join(' · ')]);
  if (edu[0]) facts.push(['graduation', [edu[0].institution, [edu[0].start, edu[0].end].filter(Boolean).join('–')].filter(Boolean).join(', ')]);

  const showAbout = Boolean(about.body || has(stats) || facts.length);
  const showTri = has(edu) || has(certs) || has(wins);
  const triCols = [has(edu), has(certs), has(wins)].filter(Boolean).length;
  const triId = has(certs) ? 'certificates' : has(edu) ? 'education' : 'achievements';

  // ---- nav ----
  const nav = [['home', 'Home', 'home']];
  if (showAbout) nav.push(['about', 'About', 'user']);
  if (has(skills)) nav.push(['skills', 'Skills', 'grid']);
  if (has(projects)) nav.push(['projects', 'Projects', 'folder-tab']);
  if (has(certs) || has(edu)) nav.push([triId, has(certs) ? 'Certificates' : 'Education', 'medal']);
  if (has(wins) && (has(certs) || has(edu))) nav.push(['achievements', 'Achievements', 'trophy-nav']);
  const hasContact = Boolean(c.email || c.phone || c.linkedin || c.github);
  if (hasContact) nav.push(['contact', 'Contact', 'mail']);

  const out = [];
  out.push(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${esc(desc)}">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@600&display=swap">
<style>
${css}
</style>
</head>
<body>

<aside class="rail">
  <div class="brand">${brand}</div>
  <nav class="nav" id="nav" aria-label="Sections">
${nav.map(([id, label, ic], i) => `    <a href="#${id}"${i === 0 ? ' aria-current="true"' : ''}>${icon(ic, 1.9)}${esc(label)}</a>`).join('\n')}
  </nav>
  ${b.location || av.note ? `<div class="rail-foot">${b.location ? `<b>${esc(b.location)}</b>` : ''}${esc(av.note || '')}</div>` : ''}
  <div class="topbar">
    <button class="icon-btn" id="theme" type="button" aria-label="Switch theme" title="Switch theme">${icon('moon', 1.9).replace('<svg', '<svg id="theme-icon"')}</button>
    <button class="cv-btn" id="cv" type="button">${icon('download', 1.9)}<span>${resume || opts.resumeHtml ? 'Download CV' : 'Save as PDF'}</span></button>
  </div>
</aside>

<div class="shell">

  <header class="hero" id="home">
    <div class="wrap hero-grid">
      <div>
        <p class="hello">Hello, I'm</p>
        <h1>${esc(b.name)}<span class="dot">.</span></h1>
        ${b.role ? `<p class="role">${esc(b.role)}</p>` : ''}
        ${b.summary ? `<p class="lede">${esc(b.summary)}</p>` : ''}
        <div class="cta-row">
          ${has(projects) ? `<a class="btn btn-primary" href="#projects">${icon('folder', 1.9)}View my work${icon('arrow', 2.1, 'arrow')}</a>` : ''}
          ${c.email ? `<a class="btn ${has(projects) ? 'btn-ghost' : 'btn-primary'}" href="mailto:${esc(c.email)}">${icon('mail', 1.9)}Contact me</a>` : ''}
        </div>
        <div class="socials">
          ${c.linkedin ? `<a href="${esc(safeUrl(c.linkedin))}" target="_blank" rel="noopener" aria-label="LinkedIn">${glyph('linkedin')}</a>` : ''}
          ${c.github ? `<a href="${esc(safeUrl(c.github))}" target="_blank" rel="noopener" aria-label="GitHub">${glyph('github')}</a>` : ''}
          ${c.email ? `<a href="mailto:${esc(c.email)}" aria-label="Email">${icon('mail', 1.9)}</a>` : ''}
          ${c.phone ? `<a href="tel:${esc(c.phone.replace(/[^\d+]/g, ''))}" aria-label="Phone">${icon('phone', 1.9)}</a>` : ''}
        </div>
      </div>

      <div class="portrait-col">
        <div class="portrait">
          <div class="portrait-inner">
            <div class="monogram">${esc(mono)}<small>${esc(b.name.toUpperCase())}</small></div>
            ${b.photo && safeAsset(b.photo) ? `<img src="${esc(safeAsset(b.photo))}" alt="${esc(b.name)}" onerror="this.remove()">` : ''}
          </div>
          ${has(b.motto) ? `<div class="script">${b.motto.map(esc).join('<br>')}
            <svg viewBox="0 0 74 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 8c14-6 42-8 70-4"/></svg>
          </div>` : ''}
          ${av.badge ? `<div class="status"><span class="pulse"></span>${esc(av.badge)}</div>` : ''}
        </div>
      </div>
    </div>
  </header>

  <main class="sheet">
`);

  // ---- about ----
  if (showAbout) {
    const heading = about.heading ? `${esc(about.heading)}${about.headingAccent ? ' <em style="font-style:normal;background:linear-gradient(92deg,var(--accent),var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent">' + esc(about.headingAccent) + '</em>' : ''}` : 'A little about me';
    out.push(`    <section class="section" id="about">
      <div class="wrap about-grid${has(stats) ? '' : ' solo'}">
        <div>
          <p class="eyebrow">About me</p>
          <h2 style="font-size:clamp(25px,3.2vw,34px);font-weight:700;margin-top:12px">${heading}</h2>
          ${about.body ? `<p class="about-body">${esc(about.body)}</p>` : ''}
          ${facts.length ? `<div class="facts">${facts.map(([ic, t]) => `<span class="fact">${icon(ic, 2)}${esc(t)}</span>`).join('')}</div>` : ''}
        </div>
        ${has(stats) ? `<div class="stats">${stats.map((s) => `
          <div class="stat rv"><div class="ic">${icon(s.icon || 'star', 2)}</div><div class="num">${esc(s.value)}</div><div class="lbl">${esc(s.label)}</div></div>`).join('')}
        </div>` : ''}
      </div>
    </section>
`);
  }

  // ---- skills ----
  if (has(skills) || has(data.strengths)) {
    out.push(`    <section class="section" id="skills">
      <div class="wrap">
        <div class="section-head"><div><p class="eyebrow">Skills</p><h2>Tools &amp; technologies</h2></div></div>
        ${has(skills) ? `<div class="chips">${skills.map((s) => `
          <div class="chip rv">${markHtml(skillBadge(s))}${esc(s.name)}</div>`).join('')}
        </div>` : ''}
        ${has(data.strengths) ? `<div class="core"><span class="label">Also strong at</span>${data.strengths.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
    </section>
`);
  }

  // ---- projects ----
  if (has(projects)) {
    out.push(`    <section class="section" id="projects">
      <div class="wrap">
        <div class="section-head">
          <div><p class="eyebrow">Projects</p><h2>Things I've <em>built</em></h2></div>
          ${c.github ? `<a class="link-more" href="${esc(safeUrl(c.github))}" target="_blank" rel="noopener">All repositories ${icon('arrow', 2.2)}</a>` : ''}
        </div>
        <div class="projects" data-count="${projects.length}">
${projects.map((p) => {
      const [g1, g2] = p.gradient || gradientFor(p.title);
      const mock = p.mockup || 'dashboard';
      const art = mock === 'cards' ? cards(g1, g2) : mock === 'none' ? '' : dashboard(g1, g2);
      const live = p.link && p.link.kind === 'live';
      return `          <article class="project rv${art ? '' : ' no-mock'}">
            <div>
              <div class="p-head">
                <span class="p-ic" style="background:linear-gradient(135deg,${esc(g1)},${esc(g2)})">${icon(p.icon || 'code', 2)}</span>
                <div>
                  <h3>${esc(p.title)}${live ? ' ' + icon('external', 2) : ''}</h3>
                  ${p.subtitle ? `<p class="p-meta">${esc(p.subtitle)}</p>` : ''}
                </div>
              </div>
              ${p.description ? `<p>${esc(p.description)}</p>` : ''}
              ${has(p.tags) ? `<div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
              ${p.link ? `<a class="p-link" href="${esc(safeUrl(p.link.url))}" target="_blank" rel="noopener">${esc(p.link.label || hostOf(p.link.url))} ${icon('arrow', 2.2)}</a>` : ''}
            </div>
            ${art ? `<div class="mock" aria-hidden="true">${art}</div>` : ''}
          </article>`;
    }).join('\n\n')}
        </div>
      </div>
    </section>
`);
  }

  // ---- education / certs / achievements ----
  if (showTri) {
    out.push(`    <section class="section" id="${triId}">
      <div class="wrap tri" data-cols="${triCols}">
`);
    if (has(edu)) {
      out.push(`        <div>
          <div class="col-head"><div><p class="eyebrow">Education</p><h2 style="margin-top:10px">Where I studied</h2></div></div>
          <div class="timeline">${edu.map((e) => {
        const when = [[e.start, e.end].filter(Boolean).join(' — '), e.score].filter(Boolean).join(' · ');
        return `
            <div class="tl-item"><h4>${esc(e.institution)}</h4>${e.degree ? `<p class="sub">${esc(e.degree)}</p>` : ''}${when ? `<p class="when">${esc(when)}</p>` : ''}</div>`;
      }).join('')}
          </div>
        </div>
`);
    }
    if (has(certs)) {
      out.push(`        <div>
          <div class="col-head"><div><p class="eyebrow">Certifications</p><h2 style="margin-top:10px">Verified learning</h2></div></div>
          <ul class="certs">${certs.map((x) => `
            <li>${markHtml(certBadge(x))}<div><h4>${esc(x.title)}</h4>${x.date ? `<p class="when">${esc(fmtDate(x.date, x.verb))}</p>` : ''}</div></li>`).join('')}
          </ul>
        </div>
`);
    }
    if (has(wins)) {
      out.push(`        <div id="achievements">
          <div class="col-head"><div><p class="eyebrow">Achievements</p><h2 style="margin-top:10px">Milestones</h2></div></div>
          <ul class="wins">${wins.map((w) => `
            <li><span class="ic">${icon(w.icon || 'star', 2)}</span><p>${richText(w.text)}</p></li>`).join('')}
          </ul>
        </div>
`);
    }
    out.push(`      </div>
    </section>
`);
  }

  out.push(`  </main>
`);

  // ---- contact ----
  if (hasContact) {
    const reach = [];
    if (c.email) reach.push(['mail', 'Email', c.email, `mailto:${c.email}`, false]);
    if (c.phone) reach.push(['phone', 'Phone', c.phone, `tel:${c.phone.replace(/[^\d+]/g, '')}`, false]);
    if (c.linkedin) reach.push(['linkedin', 'LinkedIn', handleOf(c.linkedin), c.linkedin, true]);
    if (c.github) reach.push(['github', 'GitHub', hostOf(c.github) + '/' + handleOf(c.github), c.github, true]);
    out.push(`  <section class="contact" id="contact">
    <div class="wrap contact-grid">
      <div>
        <p class="eyebrow" style="color:#A78BFA">Let's connect</p>
        <h2>${esc(c.heading || 'Interested in working together?')}</h2>
        ${c.body ? `<p>${esc(c.body)}</p>` : ''}
        ${c.email ? `<div class="cta-row"><a class="btn btn-primary" href="mailto:${esc(c.email)}">${esc(c.cta || 'Get in touch')}${icon('arrow', 2.1, 'arrow')}</a></div>` : ''}
      </div>
      <div class="contact-actions"><div class="reach">${reach.map(([ic, k, v, href, ext]) => `
        <a href="${esc(safeUrl(href))}"${ext ? ' target="_blank" rel="noopener"' : ''}>${ic === 'linkedin' || ic === 'github' ? glyph(ic) : icon(ic, 1.9)}<span><span class="k">${k}</span><br><span class="v">${esc(v)}</span></span></a>`).join('')}
      </div></div>
    </div>
  </section>
`);
  }

  out.push(`  <footer class="base">
    <div class="wrap base-in">
      <span class="brand" style="font-size:17px;padding:0">${brand}</span>
      <span>© ${new Date().getFullYear()} ${esc(b.name)}</span>
      <nav>${nav.filter(([id]) => ['home', 'about', 'projects', 'contact'].includes(id)).map(([id, l]) => `<a href="#${id}">${esc(l)}</a>`).join('')}</nav>
    </div>
  </footer>

</div>

${opts.resumeHtml ? `<script type="text/plain" id="resume-src">${opts.resumeHtml.replace(/<\/script/gi, '<\\/script')}</script>\n` : ''}<script>
${js}
</script>
</body>
</html>
`);
  return out.join('');
}

module.exports = { render };
