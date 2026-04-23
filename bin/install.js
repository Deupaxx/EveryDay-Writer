#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'install') {
  install();
} else if (command === 'uninstall') {
  uninstall();
} else {
  console.log('Usage: everyday-writer [install|uninstall]');
  process.exit(1);
}

function install() {
  const src = path.join(__dirname, '..');
  const dest = path.join(os.homedir(), '.claude', 'plugins', 'ew');

  const filesToCopy = [
    'SKILL.md',
    'plugin.json',
    'core',
    'onboarding',
    'skills',
    'references',
    'resources',
    'assets',
  ];

  fs.mkdirSync(dest, { recursive: true });

  for (const item of filesToCopy) {
    copyRecursive(path.join(src, item), path.join(dest, item));
  }

  console.log('');
  console.log('Everyday Writer installed.');
  console.log('Plugin location: ' + dest);
  console.log('');
  console.log('Open Claude Code and type /ew to get started.');
  console.log('');
}

function uninstall() {
  const dest = path.join(os.homedir(), '.claude', 'plugins', 'ew');

  if (!fs.existsSync(dest)) {
    console.log('Everyday Writer is not installed.');
    return;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  console.log('Everyday Writer uninstalled.');
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
