#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const command = args[0];
const pkg = require('../package.json');

if (!command || command === 'install' || command === 'install:codex') {
  installCodex();
} else if (command === 'install:claude') {
  installClaude();
} else if (command === 'uninstall' || command === 'uninstall:codex') {
  uninstallCodex();
} else if (command === 'uninstall:claude') {
  uninstallClaude();
} else if (command === '--version' || command === '-v' || command === 'version') {
  console.log(pkg.version);
} else {
  console.log('Usage: everyday-writer [install|install:codex|install:claude|uninstall|uninstall:codex|uninstall:claude|--version]');
  process.exit(1);
}

function installCodex() {
  const src = path.join(__dirname, '..');
  const dest = path.join(os.homedir(), '.codex', 'skills', 'everyday-writer');

  const filesToCopy = [
    'SKILL.md',
    'agents',
    'core',
    'onboarding',
    'skills',
    'references',
    'resources',
    'cowork',
    'assets',
  ];

  fs.mkdirSync(dest, { recursive: true });

  for (const item of filesToCopy) {
    copyRecursive(path.join(src, item), path.join(dest, item));
  }

  console.log('');
  console.log('Everyday Writer installed.');
  console.log('Codex skill location: ' + dest);
  console.log('Voice profiles:  ' + path.join(os.homedir(), '.everyday-writer'));
  console.log('');
  console.log('Installing overwrites the skill directory but never touches your voices.');
  console.log('');
  console.log('Open Codex and use $ew to get started.');
  console.log('');
}

function installClaude() {
  const src = path.join(__dirname, '..');
  const dest = path.join(os.homedir(), '.claude', 'plugins', 'ew');

  const filesToCopy = [
    'SKILL.md',
    '.claude-plugin',
    'core',
    'onboarding',
    'skills',
    'references',
    'resources',
    'cowork',
    'assets',
  ];

  fs.mkdirSync(dest, { recursive: true });

  for (const item of filesToCopy) {
    copyRecursive(path.join(src, item), path.join(dest, item));
  }

  console.log('');
  console.log('Everyday Writer installed for Claude Code.');
  console.log('Plugin location: ' + dest);
  console.log('Voice profiles:  ' + path.join(os.homedir(), '.everyday-writer'));
  console.log('');
  console.log('Installing overwrites the plugin directory but never touches your voices.');
  console.log('');
}

function uninstallCodex() {
  const dest = path.join(os.homedir(), '.codex', 'skills', 'everyday-writer');

  if (!fs.existsSync(dest)) {
    console.log('Everyday Writer is not installed for Codex.');
    return;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  console.log('Everyday Writer uninstalled from Codex.');

  // Voices are the user's own writing calibration, not package data. Leave them.
  const voices = path.join(os.homedir(), '.everyday-writer');
  if (fs.existsSync(voices)) {
    console.log('');
    console.log('Your voice profiles were left in place at ' + voices);
    console.log('Delete that folder yourself if you want them gone.');
  }
}

function uninstallClaude() {
  const dest = path.join(os.homedir(), '.claude', 'plugins', 'ew');

  if (!fs.existsSync(dest)) {
    console.log('Everyday Writer is not installed for Claude Code.');
    return;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  console.log('Everyday Writer uninstalled from Claude Code.');

  // Voices are the user's own writing calibration, not package data. Leave them.
  const voices = path.join(os.homedir(), '.everyday-writer');
  if (fs.existsSync(voices)) {
    console.log('');
    console.log('Your voice profiles were left in place at ' + voices);
    console.log('Delete that folder yourself if you want them gone.');
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}
