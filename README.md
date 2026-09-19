# Portfolio Builder

Turn a resume — or just a form — into a portfolio website **and** a professional resume. Everything runs in the browser, so nothing you enter is uploaded anywhere.

## Use it
1. **Have a resume?** Upload the PDF/.txt and the form fills itself (best effort, text-based PDFs; review the result).
   **No resume?** Fill in the form. A resume is generated from what you enter (**Get resume (PDF)** → "Save as PDF").
2. Watch the live preview (Website / Resume tabs).
3. **Download website** (one self-contained `.html`) or **Publish to GitHub** to get a free `username.github.io` link.

## Develop
```
npm install
npm start          # builds docs/ and serves it on http://localhost:3000
npm run build      # rebuild docs/ (commit it: GitHub Pages serves main:/docs)
node src/build.js path/to/portfolio.json [outDir]   # CLI: JSON -> site
```

## Layout
- `schema/` data model · `src/render.js` JSON → site · `src/resume.js` JSON → resume
- `src/localparse.js` + `src/pdftext.js` resume → JSON · `src/validate.js`, `catalog.js`, `icons.js`, `mockups.js`
- `templates/default/` styles + client script · `web/` the builder UI · `scripts/build-web.js` bundles everything into `docs/`
