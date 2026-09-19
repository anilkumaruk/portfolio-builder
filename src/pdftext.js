'use strict';
// PDF -> array of text lines in reading order, without a worker or native tools.
// Handles two-column layouts by splitting page items at the widest vertical gutter.

async function loadPdfjs() {
  if (typeof window !== 'undefined') { // browser build: vendored next to the page
    await import(new URL('vendor/polyfill.mjs', document.baseURI).href);
    const pdfjs = await import(new URL('vendor/pdf.min.mjs', document.baseURI).href);
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('vendor/worker-shim.mjs', document.baseURI).href;
    return pdfjs;
  }
  return import('pdfjs-dist/legacy/build/pdf.mjs');
}

async function pdfLines(buffer) {
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer), useSystemFonts: true, isEvalSupported: false }).promise;
  const lines = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const width = page.view[2] - page.view[0];
    const items = (await page.getTextContent()).items
      .filter((i) => i.str && i.str.trim())
      .map((i) => ({ s: i.str, x: i.transform[4], y: i.transform[5], w: i.width, h: Math.abs(i.transform[3]) || 10 }));
    if (!items.length) continue;

    for (const block of splitPage(items, width)) lines.push(...toLines(block));
  }
  return lines;
}

/**
 * Reading order for one page. If a vertical gutter exists the page becomes
 * [spanning-above, left column, right column, spanning-below]. A few items may cross the gutter
 * (centred footers, full-width banners); they are set aside instead of hiding the columns.
 */
function splitPage(items, width) {
  const gutter = findGutter(items, width);
  if (gutter === null) return [items];
  const crosses = (i) => i.x < gutter && i.x + i.w > gutter;
  const spanning = items.filter(crosses);
  const body = items.filter((i) => !crosses(i));
  const top = Math.max(...body.map((i) => i.y));
  return [
    spanning.filter((i) => i.y > top),
    body.filter((i) => i.x < gutter),
    body.filter((i) => i.x >= gutter),
    spanning.filter((i) => i.y <= top),
  ];
}

/** x of a vertical gutter (at most a few items cross it) with real prose on both sides; else null. */
function findGutter(items, width) {
  if (items.length < 8) return null;
  const maxCross = Math.max(3, Math.floor(items.length * 0.08));
  const need = width * 0.015;
  let best = null;
  let run = null;
  for (let x = width * 0.25; x <= width * 0.75; x += 1) {
    const cross = items.reduce((n, i) => n + (i.x < x && i.x + i.w > x ? 1 : 0), 0);
    if (cross <= maxCross) {
      run = run ? { ...run, end: x } : { start: x, end: x };
      if (!best || run.end - run.start > best.end - best.start) best = { ...run };
    } else run = null;
  }
  if (!best || best.end - best.start < need) return null;
  const g = (best.start + best.end) / 2;
  const body = items.filter((i) => !(i.x < g && i.x + i.w > g));
  const side = (list) => ({ n: list.length, avg: list.reduce((t, i) => t + i.s.trim().length, 0) / (list.length || 1) });
  const l = side(body.filter((i) => i.x < g));
  const r = side(body.filter((i) => i.x >= g));
  const ok = (v) => v.n >= body.length * 0.2 && v.avg >= 8;
  return ok(l) && ok(r) ? g : null;
}

function toLines(items) {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows = [];
  for (const it of sorted) {
    const row = rows.find((r) => Math.abs(r.y - it.y) < it.h * 0.45);
    row ? row.items.push(it) : rows.push({ y: it.y, items: [it] });
  }
  return rows
    .sort((a, b) => b.y - a.y)
    .map((r) => {
      r.items.sort((a, b) => a.x - b.x);
      let out = '';
      let end = null;
      for (const it of r.items) {
        if (end !== null && it.x - end > it.h * 0.15 && !out.endsWith(' ')) out += ' ';
        out += it.s;
        end = it.x + it.w;
      }
      return out.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean);
}

module.exports = { pdfLines };
