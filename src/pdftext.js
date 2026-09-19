'use strict';
// PDF -> array of text lines in reading order, without a worker or native tools.
// Handles two-column layouts by splitting page items at the widest vertical gutter.

async function loadPdfjs() {
  if (typeof window !== 'undefined') { // browser build: vendored next to the page
    const pdfjs = await import(new URL('vendor/pdf.min.mjs', document.baseURI).href);
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('vendor/pdf.worker.min.mjs', document.baseURI).href;
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

    for (const col of splitColumns(items, width)) lines.push(...toLines(col));
  }
  return lines;
}

/** Find a gutter: an x-range no item crosses, wide enough and with real content on both sides. */
function splitColumns(items, width) {
  const edges = [...items].sort((a, b) => a.x - b.x);
  let best = null;
  let reach = edges[0].x + edges[0].w;
  for (let i = 1; i < edges.length; i++) {
    const gap = edges[i].x - reach;
    if (gap > width * 0.04 && edges[i].x > width * 0.2 && edges[i].x < width * 0.8 && (!best || gap > best.gap)) best = { gap, at: edges[i].x };
    reach = Math.max(reach, edges[i].x + edges[i].w);
  }
  if (!best) return [items];
  const left = items.filter((i) => i.x < best.at - 1);
  const right = items.filter((i) => i.x >= best.at - 1);
  return left.length >= items.length * 0.15 && right.length >= items.length * 0.15 ? [left, right] : [items];
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
