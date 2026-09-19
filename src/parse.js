'use strict';
// Resume (PDF bytes or plain text) -> portfolio JSON. Runs entirely offline / in the browser.
// The result is pruned to the schema so a slightly-off parse still yields a usable draft.

const schema = require('../schema/portfolio.schema.json');
const { pdfLines } = require('./pdftext');
const { parseLocal } = require('./localparse');

function prune(value, s, root = schema) {
  if (s && s.$ref) s = s.$ref.replace(/^#\//, '').split('/').reduce((o, k) => o[k], root);
  if (!s) return value;
  if (s.type === 'string') {
    if (typeof value !== 'string') return undefined;
    let v = value.trim();
    if (s.maxLength && v.length > s.maxLength) v = v.slice(0, s.maxLength);
    if (s.pattern && !new RegExp(s.pattern).test(v)) return undefined;
    if (s.enum && !s.enum.includes(v)) return undefined;
    if (s.format === 'email' && !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v)) return undefined;
    return v || undefined;
  }
  if (s.type === 'integer' || s.type === 'number') return typeof value === 'number' ? value : undefined;
  if (s.type === 'array') {
    if (!Array.isArray(value)) return undefined;
    let arr = value.map((v) => prune(v, s.items, root)).filter((v) => v !== undefined);
    if (s.maxItems) arr = arr.slice(0, s.maxItems);
    if (s.minItems && arr.length < s.minItems) return undefined;
    return arr.length ? arr : undefined;
  }
  if (s.type === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
    const out = {};
    for (const [k, ps] of Object.entries(s.properties || {})) {
      if (value[k] === undefined) continue;
      const v = prune(value[k], ps, root);
      if (v !== undefined) out[k] = v;
    }
    for (const k of s.required || []) if (out[k] === undefined) return undefined;
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

/** parseResume({ pdf: ArrayBuffer|Buffer }) or parseResume({ text }) -> { data } */
async function parseResume({ pdf, text }) {
  if (!pdf && !text) throw new Error('Nothing to parse.');
  const lines = pdf ? await pdfLines(pdf) : text.split(/\r?\n/);
  if (lines.join('').trim().length < 30) throw new Error('No readable text found. This looks like a scanned/image PDF. Please fill the form by hand or upload a text-based PDF.');
  const data = prune(parseLocal(lines), schema);
  if (!data || !data.basics) throw new Error('Could not read this resume. Please fill the form by hand.');
  data.version = 1;
  return { data };
}

module.exports = { parseResume, prune };
