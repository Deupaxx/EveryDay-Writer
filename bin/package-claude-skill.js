#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const STAGING_ROOT = path.join(DIST, 'claude-skill');
const PACKAGE_NAME = 'everyday-writer';
const PACKAGE_ROOT = path.join(STAGING_ROOT, PACKAGE_NAME);
const ZIP_PATH = path.join(DIST, 'everyday-writer-claude-skill.zip');
const CHECK_ONLY = process.argv.includes('--check');
const CRC_TABLE = makeCrcTable();

const REQUIRED_FILES = [
  'skill.md',
  'README.md',
  'core/anti-ai-rules.md',
  'core/voice-profile.md',
  'skills/linkedin/SKILL.md',
  'references/DROP-MD-FILES-HERE.md',
];

main();

function main() {
  preparePackageSource();
  verifyPackageSource();
  writeZip(PACKAGE_ROOT, ZIP_PATH);

  if (CHECK_ONLY) {
    console.log('Claude skill package check passed.');
  } else {
    console.log('');
    console.log('Claude custom-skill ZIP created:');
    console.log('  ' + path.relative(ROOT, ZIP_PATH).split(path.sep).join('/'));
    console.log('');
    console.log('Upload it in Claude: Customize > Skills > Upload, then enable Everyday Writer.');
    console.log('');
  }
}

function preparePackageSource() {
  resetDir(PACKAGE_ROOT);

  copyFile('SKILL.md', path.join(PACKAGE_ROOT, 'skill.md'));
  copyDir('core', path.join(PACKAGE_ROOT, 'core'));
  copyDir('onboarding', path.join(PACKAGE_ROOT, 'onboarding'));
  copyDir('skills', path.join(PACKAGE_ROOT, 'skills'));
  copyFile(
    'references/DROP-MD-FILES-HERE.md',
    path.join(PACKAGE_ROOT, 'references', 'DROP-MD-FILES-HERE.md')
  );
  copyDir('assets', path.join(PACKAGE_ROOT, 'assets'));
  fs.writeFileSync(path.join(PACKAGE_ROOT, 'README.md'), packageReadme(), 'utf8');
}

function verifyPackageSource() {
  for (const rel of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(PACKAGE_ROOT, rel))) {
      fail('Missing required packaged file: ' + rel);
    }
  }

  const skillText = fs.readFileSync(path.join(PACKAGE_ROOT, 'skill.md'), 'utf8');
  if (!skillText.startsWith('---\n') && !skillText.startsWith('---\r\n')) {
    fail('skill.md is missing YAML frontmatter.');
  }

  const end = skillText.indexOf('\n---', 4);
  if (end === -1) fail('skill.md frontmatter is not closed.');

  const frontmatter = skillText.slice(4, end);
  if (!/^name:\s*\S+/m.test(frontmatter)) fail('skill.md frontmatter is missing name.');
  if (!/^description:/m.test(frontmatter)) fail('skill.md frontmatter is missing description.');

  const forbidden = collectFiles(PACKAGE_ROOT).filter((file) => {
    const rel = path.relative(PACKAGE_ROOT, file).split(path.sep).join('/');
    return (
      rel === '.git' ||
      rel.startsWith('.git/') ||
      rel === 'node_modules' ||
      rel.startsWith('node_modules/') ||
      rel === 'dist' ||
      rel.startsWith('dist/') ||
      /^resources\/Untitled document.*\.md$/i.test(rel)
    );
  });

  if (forbidden.length > 0) {
    fail(
      'Claude package contains forbidden file(s): ' +
        forbidden.map((file) => path.relative(PACKAGE_ROOT, file)).join(', ')
    );
  }
}

function copyDir(srcRel, destAbs) {
  const srcAbs = path.join(ROOT, srcRel);
  if (!fs.existsSync(srcAbs)) return;

  for (const entry of fs.readdirSync(srcAbs, { withFileTypes: true })) {
    const childSrc = path.join(srcAbs, entry.name);
    const childDest = path.join(destAbs, entry.name);
    if (shouldSkip(childSrc)) continue;

    if (entry.isDirectory()) {
      copyDir(path.relative(ROOT, childSrc), childDest);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(childDest), { recursive: true });
      fs.copyFileSync(childSrc, childDest);
    }
  }
}

function copyFile(srcRel, destAbs) {
  const srcAbs = path.join(ROOT, srcRel);
  fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  fs.copyFileSync(srcAbs, destAbs);
}

function shouldSkip(absPath) {
  const rel = path.relative(ROOT, absPath).split(path.sep).join('/');
  const base = path.basename(absPath);
  return (
    rel === '.git' ||
    rel.startsWith('.git/') ||
    rel === 'node_modules' ||
    rel.startsWith('node_modules/') ||
    rel === 'dist' ||
    rel.startsWith('dist/') ||
    rel === '.everyday-writer' ||
    rel.startsWith('.everyday-writer/') ||
    rel === 'voices' ||
    rel.startsWith('voices/') ||
    /^Untitled document.*\.md$/i.test(base)
  );
}

function resetDir(absDir) {
  const resolved = path.resolve(absDir);
  const allowed = path.resolve(STAGING_ROOT);
  if (!resolved.startsWith(allowed + path.sep)) {
    fail('Refusing to reset unexpected path: ' + resolved);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
  fs.mkdirSync(resolved, { recursive: true });
}

function collectFiles(absDir) {
  const out = [];
  if (!fs.existsSync(absDir)) return out;

  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const child = path.join(absDir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(child));
    else if (entry.isFile()) out.push(child);
  }

  return out;
}

function writeZip(sourceDir, zipPath) {
  const files = collectFiles(sourceDir).sort();
  const records = [];
  const chunks = [];
  let offset = 0;

  for (const file of files) {
    const rel = PACKAGE_NAME + '/' + path.relative(sourceDir, file).split(path.sep).join('/');
    const name = Buffer.from(rel, 'utf8');
    const data = fs.readFileSync(file);
    const stat = fs.statSync(file);
    const { dosTime, dosDate } = dosDateTime(stat.mtime);
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);

    chunks.push(local, name, data);
    records.push({ name, crc, size: data.length, offset, dosTime, dosDate });
    offset += local.length + name.length + data.length;
  }

  const centralStart = offset;

  for (const record of records) {
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(record.dosTime, 12);
    central.writeUInt16LE(record.dosDate, 14);
    central.writeUInt32LE(record.crc, 16);
    central.writeUInt32LE(record.size, 20);
    central.writeUInt32LE(record.size, 24);
    central.writeUInt16LE(record.name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(record.offset, 42);
    chunks.push(central, record.name);
    offset += central.length + record.name.length;
  }

  const centralSize = offset - centralStart;
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(records.length, 8);
  end.writeUInt16LE(records.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(centralStart, 16);
  end.writeUInt16LE(0, 20);
  chunks.push(end);

  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  fs.writeFileSync(zipPath, Buffer.concat(chunks));
}

function dosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function packageReadme() {
  return `# Everyday Writer for Claude

This ZIP installs Everyday Writer as a Claude custom skill.

## Install

1. Open Claude.
2. Go to Customize > Skills.
3. Upload this ZIP.
4. Enable Everyday Writer.
5. Start with /ew, or ask naturally for writing help.

## What is included

- skill.md: the Everyday Writer dispatcher
- core/: writing rules, runtime contract, and voice resolver
- onboarding/: first-run voice setup
- skills/: the writing sub-skills and voice management skill
- references/DROP-MD-FILES-HERE.md: redirect note for per-voice references

Everyday Writer stores voice profiles outside the skill when the environment provides file access. Do not put client voice profiles inside this package.
`;
}

function fail(message) {
  console.error('ERROR: ' + message);
  process.exit(1);
}
