#!/usr/bin/env node
'use strict';
// Tiny static file server for local development: serves docs/ (run `npm run build` first).

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const PORT = process.env.PORT || 3000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css; charset=utf-8' };

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const full = path.join(ROOT, path.normalize(p === '/' ? 'index.html' : p));
  if (full.startsWith(ROOT + path.sep) && fs.existsSync(full) && fs.statSync(full).isFile()) {
    res.writeHead(200, { 'content-type': TYPES[path.extname(full)] || 'application/octet-stream', 'cache-control': 'no-store' });
    return res.end(fs.readFileSync(full));
  }
  res.writeHead(404).end('Not found');
});
server.on('error', (e) => {
  console.error(e.code === 'EADDRINUSE' ? `Port ${PORT} is busy. Try: PORT=4000 npm start` : e.message);
  process.exit(1);
});
server.listen(PORT, () => console.log(`Portfolio Builder running at http://localhost:${PORT}`));
