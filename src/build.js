#!/usr/bin/env node
'use strict';
// CLI: node src/build.js <portfolio.json> [outDir]
// Validates the data, renders index.html and copies the photo/resume it references.

const fs = require('fs');
const path = require('path');
const { validate } = require('./validate');
const { render } = require('./render');

const schema = require('../schema/portfolio.schema.json');

function check(data) {
  return validate(data, schema);
}

function build(dataPath, outDir) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const errors = check(data);
  if (errors.length) throw Object.assign(new Error('Invalid portfolio data:\n  ' + errors.join('\n  ')), { errors });
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), render(data));
  const base = path.dirname(dataPath);
  for (const rel of [data.basics.photo, data.basics.resume]) {
    if (!rel || /^(data:|https?:)/.test(rel)) continue;
    const src = path.join(base, rel);
    if (!fs.existsSync(src)) { console.warn(`warning: ${rel} not found next to the data file`); continue; }
    fs.mkdirSync(path.dirname(path.join(outDir, rel)), { recursive: true });
    fs.copyFileSync(src, path.join(outDir, rel));
  }
  return path.join(outDir, 'index.html');
}

if (require.main === module) {
  const [, , input, out = 'dist'] = process.argv;
  if (!input) { console.error('usage: node src/build.js <portfolio.json> [outDir]'); process.exit(1); }
  try { console.log('built', build(input, out)); } catch (e) { console.error(e.message); process.exit(1); }
}

module.exports = { build, check };
