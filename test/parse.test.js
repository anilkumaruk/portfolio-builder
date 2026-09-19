'use strict';
// Regression tests for resume parsing. Run: npm test
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { parseResume } = require('../src/parse');
const { validate } = require('../src/validate');
const schema = require('../schema/portfolio.schema.json');

const load = async (f) => (await parseResume({ pdf: fs.readFileSync(path.join(__dirname, 'fixtures', f)) })).data;

test('two-column resume with header/footer (grade-style education, numbered lists)', async () => {
  const d = await load('sidebar-two-column.pdf');
  assert.deepEqual(validate(d, schema), []);
  assert.equal(d.basics.name, 'Anilkumar U K');
  assert.deepEqual(d.basics.languages, ['English', 'Kannada']);
  assert.deepEqual(d.education.map((e) => e.institution), ['Alliance University', 'Banasiri Lions PU college', 'Vybhava Vidyaniketan School']);
  assert.equal(d.education[1].score, '77.5%');
  assert.deepEqual(d.skills.map((s) => s.name), ['Java', 'Database', 'Python', 'HTML', 'CSS', 'JavaScript', 'C', 'C++']);
  assert.deepEqual(d.projects.map((p) => p.title), ['iBuddie', 'Movie Ticket Booking System']);
  assert.equal(d.certifications.length, 5);
  assert.equal(d.certifications[2].date, '2026-03-06'); // "Mar 6, 2026"
  assert.equal(d.achievements.length, 3);
  assert.equal(d.contact.email, 'anilkumaruk51@gmail.com');
});

test('conventional single-column resume (jobs with bullets, tech "Languages:" line)', async () => {
  const d = await load('single-column.pdf');
  assert.deepEqual(validate(d, schema), []);
  assert.equal(d.basics.name, 'Priya Sharma');
  assert.equal(d.basics.location, 'Bengaluru, India');
  assert.equal(d.basics.languages, undefined); // Python/Java/SQL are not spoken languages
  assert.ok(d.skills.some((s) => s.name === 'Python'));
  assert.deepEqual(d.education.map((e) => e.institution), ['RV College of Engineering', 'Delhi Public School']);
  assert.deepEqual(d.projects.map((p) => p.title), ['Chat App', 'Expense Tracker', 'Software Engineer', 'Intern']);
  assert.equal(d.certifications.length, 2);
});

test('designer resume with letter-spaced headings', async () => {
  const d = await load('designer-sidebar.pdf');
  assert.deepEqual(validate(d, schema), []);
  assert.equal(d.education.length, 3);
  assert.equal(d.education[0].end, '2028');
  assert.equal(d.certifications.length, 5);
  assert.deepEqual(d.projects.map((p) => p.title), ['iBuddie', 'Movie Ticket Booking System']);
});

test('scanned/empty PDFs give a clear error', async () => {
  await assert.rejects(parseResume({ text: 'hi' }), /No readable text/);
});
