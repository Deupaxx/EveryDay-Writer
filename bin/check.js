#!/usr/bin/env node

// Package validator. Catches the failure modes that silently break plugin
// discovery: missing skill frontmatter, a misplaced manifest, and version
// drift between the three files that each carry a version number.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const warnings = [];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

// --- Manifest location and shape -------------------------------------------

if (exists('plugin.json')) {
  errors.push(
    'plugin.json is at the repo root. Claude Code reads .claude-plugin/plugin.json; a root copy is ignored.'
  );
}

for (const rel of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  if (!exists(rel)) errors.push('Missing ' + rel);
}

let pluginManifest = {};
if (exists('.claude-plugin/plugin.json')) {
  pluginManifest = JSON.parse(read('.claude-plugin/plugin.json'));
  if ('entry' in pluginManifest) {
    errors.push(
      '.claude-plugin/plugin.json has an "entry" field. It is not part of the manifest schema and is ignored; skills are discovered by directory convention.'
    );
  }
  for (const field of ['name', 'description', 'version']) {
    if (!pluginManifest[field]) errors.push('.claude-plugin/plugin.json is missing "' + field + '"');
  }
}

// --- Version parity ---------------------------------------------------------

const versions = {
  'package.json': JSON.parse(read('package.json')).version,
  '.claude-plugin/plugin.json': pluginManifest.version,
};

if (exists('.claude-plugin/marketplace.json')) {
  const mkt = JSON.parse(read('.claude-plugin/marketplace.json'));
  const entry = (mkt.plugins || []).find((p) => p.name === pluginManifest.name);
  if (!entry) {
    errors.push(
      '.claude-plugin/marketplace.json has no plugin entry named "' + pluginManifest.name + '"'
    );
  } else {
    versions['.claude-plugin/marketplace.json'] = entry.version;
  }
}

const distinct = [...new Set(Object.values(versions).filter(Boolean))];
if (distinct.length > 1) {
  errors.push(
    'Version drift across manifests: ' +
      Object.entries(versions)
        .map(([f, v]) => f + '=' + v)
        .join(', ')
  );
}
const VERSION = distinct[0];

// --- Skill frontmatter ------------------------------------------------------

function skillFiles() {
  const out = [];
  if (exists('SKILL.md')) out.push('SKILL.md');
  const skillsDir = path.join(ROOT, 'skills');
  if (fs.existsSync(skillsDir)) {
    for (const name of fs.readdirSync(skillsDir).sort()) {
      const rel = path.join('skills', name, 'SKILL.md');
      if (exists(rel)) out.push(rel.split(path.sep).join('/'));
    }
  }
  return out;
}

const seenNames = new Map();
const files = skillFiles();

for (const rel of files) {
  const text = read(rel);

  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) {
    errors.push(rel + ': no YAML frontmatter. Claude Code will not register this skill.');
    continue;
  }

  const end = text.indexOf('\n---', 4);
  if (end === -1) {
    errors.push(rel + ': frontmatter block is not closed.');
    continue;
  }

  const block = text.slice(4, end);
  const name = (block.match(/^name:\s*(.+)$/m) || [])[1];
  const hasDescription = /^description:/m.test(block);

  if (!name) errors.push(rel + ': frontmatter is missing "name".');
  if (!hasDescription) errors.push(rel + ': frontmatter is missing "description".');

  if (name) {
    const slug = name.trim();
    if (!/^[a-z0-9-]+$/.test(slug)) {
      errors.push(rel + ': skill name "' + slug + '" should be lowercase kebab-case.');
    }
    if (seenNames.has(slug)) {
      errors.push(rel + ': duplicate skill name "' + slug + '" (also in ' + seenNames.get(slug) + ')');
    }
    seenNames.set(slug, rel);

    const dir = rel.split('/')[1];
    if (rel !== 'SKILL.md' && dir && dir !== slug) {
      warnings.push(rel + ': directory "' + dir + '" does not match skill name "' + slug + '".');
    }
  }

  const fmVersion = (block.match(/version:\s*"?([\d.]+)"?/) || [])[1];
  if (VERSION && fmVersion && fmVersion !== VERSION) {
    warnings.push(rel + ': frontmatter version ' + fmVersion + ' does not match ' + VERSION + '.');
  }
}

// --- Core dependency chain --------------------------------------------------

const CORE = ['core/anti-ai-rules.md', 'core/ai_slop_commandments.md', 'core/voice-profile.md'];
for (const rel of CORE) {
  if (!exists(rel)) errors.push('Missing core file: ' + rel);
}

for (const rel of files.filter((f) => f !== 'SKILL.md')) {
  const text = read(rel);
  for (const core of CORE) {
    const base = path.basename(core);
    if (!text.includes(base)) {
      errors.push(rel + ': does not reference ' + base + ' in its dependency chain.');
    }
  }
}

// --- Report -----------------------------------------------------------------

console.log('');
console.log('Everyday Writer package check');
console.log('  version:      ' + (VERSION || 'UNKNOWN'));
console.log('  skills found: ' + files.length);
console.log('');

for (const w of warnings) console.log('  warn:  ' + w);
for (const e of errors) console.log('  ERROR: ' + e);

if (errors.length === 0) {
  console.log('  ' + files.length + ' skills valid, manifests consistent, dependency chain intact.');
  console.log('');
  process.exit(0);
}

console.log('');
console.log(errors.length + ' error(s). Package would not load correctly.');
console.log('');
process.exit(1);
