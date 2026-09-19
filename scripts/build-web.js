#!/usr/bin/env node
'use strict';
// Builds the static site into docs/ (served by GitHub Pages straight from the main branch).
// Bundles the CommonJS modules in src/ + the schema + the template files into one browser script.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'docs');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');

const MODULES = ['icons', 'mockups', 'catalog', 'validate', 'render', 'resume', 'localparse', 'pdftext', 'parse'];
const tplDir = path.join('templates', 'default');
const templates = {
  default: {
    css: read(tplDir, 'style.css') + '\n' + read(tplDir, 'extras.css'),
    js: read(tplDir, 'client.js'),
  },
};

let bundle = `'use strict';
globalThis.__TEMPLATES__ = ${JSON.stringify(templates)};
(function () {
  var defs = {}, cache = {};
  function key(n) { return n.replace(/^.*\\//, '').replace(/\\.(js|json)$/, ''); }
  function req(n) {
    var k = key(n);
    if (cache[k]) return cache[k].exports;
    if (!defs[k]) throw new Error('module not available in browser: ' + n);
    var m = cache[k] = { exports: {} };
    defs[k](m, m.exports, req);
    return m.exports;
  }
  function def(k, fn) { defs[k] = fn; }
`;
bundle += `  def('portfolio.schema', function (module) { module.exports = ${read('schema', 'portfolio.schema.json').trim()}; });\n`;
for (const m of MODULES) bundle += `  def('${m}', function (module, exports, require) {\n${read('src', m + '.js')}\n  });\n`;
bundle += `  globalThis.Portfolio = {
    render: req('render').render,
    resume: req('resume').resume,
    validate: function (d) { return req('validate').validate(d, req('portfolio.schema')); },
    parseResume: req('parse').parseResume,
  };
})();
`;

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'vendor'), { recursive: true });
fs.mkdirSync(path.join(out, 'examples'), { recursive: true });
fs.writeFileSync(path.join(out, 'portfolio-lib.js'), bundle);
for (const f of ['index.html', 'app.js']) fs.copyFileSync(path.join(root, 'web', f), path.join(out, f));
// legacy build: works in Safari / older browsers (modern build needs ReadableStream async iteration)
for (const f of ['pdf.min.mjs', 'pdf.worker.min.mjs']) fs.copyFileSync(path.join(root, 'node_modules', 'pdfjs-dist', 'legacy', 'build', f), path.join(out, 'vendor', f));
for (const f of ['polyfill.mjs', 'worker-shim.mjs']) fs.copyFileSync(path.join(root, 'web', f), path.join(out, 'vendor', f));
fs.copyFileSync(path.join(root, 'examples', 'anilkumar', 'portfolio.json'), path.join(out, 'examples', 'sample.json'));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('built docs/ (' + Math.round(bundle.length / 1024) + ' KB bundle)');
