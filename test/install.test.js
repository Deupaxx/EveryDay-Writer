#!/usr/bin/env node

'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const INSTALLER = path.join(ROOT, 'bin', 'install.js');
const PACKAGER = require(path.join(ROOT, 'bin', 'package-claude-skill.js'));
const temporaryRoots = [];
let passed = 0;

function fixture(label) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ew-' + label + '-'));
  temporaryRoots.push(root);
  const home = path.join(root, 'home');
  fs.mkdirSync(home);
  return { root, home };
}

function vaultAt(parent, name) {
  const vault = path.join(parent, name);
  fs.mkdirSync(path.join(vault, '.obsidian'), { recursive: true });
  return vault;
}

function run(home, args, timeout, extraEnv) {
  return spawnSync(process.execPath, [INSTALLER].concat(args || []), {
    cwd: ROOT,
    env: Object.assign({}, process.env, {
      HOME: home,
      USERPROFILE: home,
      HOMEDRIVE: path.parse(home).root,
      HOMEPATH: home.slice(path.parse(home).root.length),
    }, extraEnv || {}),
    encoding: 'utf8',
    input: '',
    timeout: timeout || 15000,
  });
}

function assertSpawned(result) {
  assert.strictEqual(result.error, undefined, result.error && result.error.message);
}

function configAt(home) {
  return path.join(home, '.everyday-writer', 'config.json');
}

function codexInstallAt(home) {
  return path.join(home, '.codex', 'skills', 'everyday-writer');
}

function claudeInstallAt(home) {
  return path.join(home, '.claude', 'plugins', 'ew');
}

function makeLegacyInstall(home, target) {
  const dest = target === 'claude' ? claudeInstallAt(home) : codexInstallAt(home);
  for (const rel of ['SKILL.md', 'core/anti-ai-rules.md', 'skills/voice/SKILL.md']) {
    const output = path.join(dest, rel);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.copyFileSync(path.join(ROOT, rel), output);
  }
  fs.mkdirSync(path.join(dest, 'onboarding'));
  if (target === 'claude') {
    fs.mkdirSync(path.join(dest, '.claude-plugin'));
    fs.copyFileSync(path.join(ROOT, '.claude-plugin', 'plugin.json'), path.join(dest, '.claude-plugin', 'plugin.json'));
  } else {
    fs.mkdirSync(path.join(dest, 'agents'));
    fs.copyFileSync(path.join(ROOT, 'agents', 'openai.yaml'), path.join(dest, 'agents', 'openai.yaml'));
  }
  fs.mkdirSync(path.join(dest, 'private', 'voices'), { recursive: true });
  fs.writeFileSync(path.join(dest, 'private', 'voices', 'my-profile.md'), 'private legacy voice\n');
  return dest;
}

function siblingWithPrefix(dest, prefix) {
  const matches = fs.readdirSync(path.dirname(dest)).filter((name) => name.startsWith(prefix));
  assert.strictEqual(matches.length, 1, 'expected exactly one ' + prefix + ' sibling, got ' + matches.join(', '));
  return path.join(path.dirname(dest), matches[0]);
}

function copyTree(source, destination) {
  const stat = fs.lstatSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination);
    for (const name of fs.readdirSync(source)) copyTree(path.join(source, name), path.join(destination, name));
  } else fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
}

function lockPayload(target, operation, pid) {
  return JSON.stringify({
    version: 1,
    token: 'a'.repeat(48),
    pid: pid,
    createdAt: new Date().toISOString(),
    target: target,
    operation: operation,
  }) + '\n';
}

function runConfigRace(home) {
  const worker = [
    "const installer=require(" + JSON.stringify(INSTALLER) + ");",
    "try { installer.writeConfigAtomic({winner:process.argv[1]}); process.exit(0); }",
    "catch (error) { console.error(error.message); process.exit(1); }",
  ].join('');
  const coordinator = [
    "const {spawn}=require('child_process');",
    "const worker=process.argv[1];",
    "const results=[];",
    "for(const name of ['alpha','beta']){",
    " const child=spawn(process.execPath,['-e',worker,name],{env:process.env,stdio:['ignore','pipe','pipe']});",
    " let stderr=''; child.stderr.on('data',d=>stderr+=d);",
    " child.on('error',e=>{results.push({code:null,error:e.message,stderr});done();});",
    " child.on('exit',code=>{results.push({code,error:null,stderr});done();});",
    "}",
    "function done(){if(results.length===2)process.stdout.write(JSON.stringify(results));}",
  ].join('');
  return spawnSync(process.execPath, ['-e', coordinator, worker], {
    cwd: ROOT,
    env: Object.assign({}, process.env, { HOME: home, USERPROFILE: home }),
    encoding: 'utf8',
    timeout: 15000,
  });
}

function test(name, body) {
  try {
    body();
    passed += 1;
    console.log('ok ' + passed + ' - ' + name);
  } catch (error) {
    console.error('not ok - ' + name);
    throw error;
  }
}

try {
  test('connects a vault whose path contains spaces and Unicode', () => {
    const item = fixture('unicode');
    const vault = vaultAt(item.root, 'My Writing Vault — 文');
    const result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const canonicalVault = fs.realpathSync(vault);
    const dataRoot = path.join(canonicalVault, 'Everyday Writer');
    const config = JSON.parse(fs.readFileSync(path.join(item.home, '.everyday-writer', 'config.json'), 'utf8'));
    assert.strictEqual(config.storage.vaultPath, canonicalVault);
    assert.strictEqual(config.storage.workspaceFolder, 'Everyday Writer');
    assert.ok(fs.statSync(path.join(dataRoot, 'voices')).isDirectory());
    assert.ok(fs.statSync(path.join(dataRoot, 'writing')).isDirectory());
    assert.ok(result.stdout.includes('Resolved data root: ' + fs.realpathSync(dataRoot)));
    assert.match(result.stdout, /Created storage configuration:/);
  });

  test('rejects nonexistent, file, and non-vault paths before writing config', () => {
    for (const kind of ['missing', 'file', 'directory']) {
      const item = fixture('invalid-' + kind);
      let candidate = path.join(item.root, 'missing');
      if (kind === 'file') fs.writeFileSync(candidate, 'not a directory', 'utf8');
      if (kind === 'directory') fs.mkdirSync(candidate);
      const result = run(item.home, ['install', '--vault', candidate]);
      assertSpawned(result);
      assert.strictEqual(result.status, 1, kind + ' unexpectedly succeeded');
      assert.ok(!fs.existsSync(path.join(item.home, '.everyday-writer', 'config.json')));
      assert.ok(fs.existsSync(path.join(codexInstallAt(item.home), '.everyday-writer-install.json')), 'package publication must finish before storage setup fails');
    }
  });

  test('plain install warns and succeeds with malformed config while explicit --vault hard-stops', () => {
    const item = fixture('malformed');
    const vault = vaultAt(item.root, 'Vault');
    const configDir = path.join(item.home, '.everyday-writer');
    fs.mkdirSync(configDir);
    const configPath = path.join(configDir, 'config.json');
    const malformed = '{ definitely not json\n';
    fs.writeFileSync(configPath, malformed, 'utf8');
    let result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.stderr, /STORAGE WARNING:.*malformed/is);
    assert.match(result.stderr, /\$ew:workspace status/);
    assert.strictEqual(fs.readFileSync(configPath, 'utf8'), malformed);
    assert.ok(fs.existsSync(path.join(codexInstallAt(item.home), '.everyday-writer-install.json')));
    result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /malformed.*Explicit --vault/is);
    assert.strictEqual(fs.readFileSync(configPath, 'utf8'), malformed);
    assert.ok(!fs.existsSync(path.join(vault, 'Everyday Writer')));
  });

  test('plain install warns and succeeds with unsupported config without changing its bytes', () => {
    const item = fixture('unsupported');
    const dir = path.join(item.home, '.everyday-writer');
    fs.mkdirSync(dir);
    const target = path.join(dir, 'config.json');
    const unsupported = '{"version":999,"storage":{"mode":"obsidian"}}\n';
    fs.writeFileSync(target, unsupported, 'utf8');
    const result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.stderr, /unsupported schema/i);
    assert.strictEqual(fs.readFileSync(target, 'utf8'), unsupported);
  });

  test('plain install warns and succeeds when a valid configured vault is disconnected', () => {
    const item = fixture('disconnected');
    const dir = path.join(item.home, '.everyday-writer');
    fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify({
      version: 1,
      storage: { mode: 'obsidian', vaultPath: path.join(item.root, 'gone'), workspaceFolder: 'Everyday Writer' },
    }) + '\n');
    const result = run(item.home, ['install:claude']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.stderr, /STORAGE WARNING/);
    assert.match(result.stderr, /\/ew:workspace status/);
  });

  test('plain install warns and succeeds without probing a redirected bootstrap root', () => {
    const item = fixture('bootstrap-link');
    const external = path.join(item.root, 'external-bootstrap');
    fs.mkdirSync(external);
    const sentinel = path.join(external, 'config.json');
    fs.writeFileSync(sentinel, 'do not read or change\n');
    fs.symlinkSync(external, path.join(item.home, '.everyday-writer'), process.platform === 'win32' ? 'junction' : 'dir');
    const result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.stderr, /STORAGE WARNING:.*bootstrap.*(?:redirect|safe ordinary)/is);
    assert.strictEqual(fs.readFileSync(sentinel, 'utf8'), 'do not read or change\n');
  });

  test('non-TTY install completes without reading stdin and uses legacy fallback', () => {
    const item = fixture('non-tty');
    const result = run(item.home, ['install'], 5000);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const fallback = path.join(item.home, '.everyday-writer');
    assert.ok(result.stdout.includes('Resolved data root: ' + fallback));
    assert.ok(!fs.existsSync(path.join(fallback, 'config.json')));
  });

  test('refuses to hide existing bootstrap data and directs the user to migration', () => {
    const item = fixture('bootstrap');
    const vault = vaultAt(item.root, 'Vault');
    const voice = path.join(item.home, '.everyday-writer', 'voices', 'writer-main');
    fs.mkdirSync(voice, { recursive: true });
    fs.writeFileSync(path.join(voice, 'voice-profile.md'), 'Completed: Yes\n', 'utf8');
    const result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /workspace migrate/i);
    assert.ok(!fs.existsSync(path.join(item.home, '.everyday-writer', 'config.json')));
    assert.ok(!fs.existsSync(path.join(vault, 'Everyday Writer')));
  });

  test('uninstall preserves config, legacy data, and vault content', () => {
    const item = fixture('uninstall');
    const vault = vaultAt(item.root, 'Vault');
    let result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const workspace = path.join(vault, 'Everyday Writer');
    const note = path.join(workspace, 'writing', 'keep-me.md');
    fs.writeFileSync(note, 'user knowledge\n', 'utf8');
    const legacy = path.join(item.home, '.everyday-writer', 'legacy-note.md');
    fs.writeFileSync(legacy, 'legacy data\n', 'utf8');
    const configPath = path.join(item.home, '.everyday-writer', 'config.json');
    const before = fs.readFileSync(configPath, 'utf8');
    result = run(item.home, ['uninstall']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(fs.readFileSync(configPath, 'utf8'), before);
    assert.strictEqual(fs.readFileSync(legacy, 'utf8'), 'legacy data\n');
    assert.strictEqual(fs.readFileSync(note, 'utf8'), 'user knowledge\n');
    assert.ok(!fs.existsSync(path.join(item.home, '.codex', 'skills', 'everyday-writer')));
    const preserved = siblingWithPrefix(codexInstallAt(item.home), '.ew-uninstall-codex-');
    assert.ok(fs.existsSync(path.join(preserved, '.everyday-writer-install.json')));
    assert.ok(result.stdout.includes('Recoverable copy: ' + preserved));
  });

  for (const target of ['codex', 'claude']) {
    test('updates a verified ' + target + ' pre-receipt install and preserves private files in quarantine', () => {
      const item = fixture('legacy-update-' + target);
      const dest = makeLegacyInstall(item.home, target);
      const result = run(item.home, [target === 'claude' ? 'install:claude' : 'install:codex']);
      assertSpawned(result);
      assert.strictEqual(result.status, 0, result.stderr);
      assert.ok(fs.existsSync(path.join(dest, '.everyday-writer-install.json')));
      const quarantine = siblingWithPrefix(dest, '.ew-legacy-' + target + '-');
      assert.strictEqual(fs.readFileSync(path.join(quarantine, 'private', 'voices', 'my-profile.md'), 'utf8'), 'private legacy voice\n');
      assert.match(result.stdout, /preserved at:/i);
      assert.match(result.stdout, /import/i);
    });

    test('uninstalls a verified ' + target + ' pre-receipt install by recoverable quarantine', () => {
      const item = fixture('legacy-uninstall-' + target);
      const dest = makeLegacyInstall(item.home, target);
      const result = run(item.home, [target === 'claude' ? 'uninstall:claude' : 'uninstall:codex']);
      assertSpawned(result);
      assert.strictEqual(result.status, 0, result.stderr);
      assert.ok(!fs.existsSync(dest));
      const quarantine = siblingWithPrefix(dest, '.ew-legacy-uninstall-' + target + '-');
      assert.strictEqual(fs.readFileSync(path.join(quarantine, 'private', 'voices', 'my-profile.md'), 'utf8'), 'private legacy voice\n');
      assert.match(result.stdout, /manually removing/i);
    });
  }

  test('lock cleanup never removes a replacement lock owned by another process', () => {
    const item = fixture('lock-owner');
    const parent = path.join(item.home, '.codex', 'skills');
    fs.mkdirSync(parent, { recursive: true });
    const worker = [
      'const fs=require("fs");',
      'const path=require("path");',
      'const i=require(' + JSON.stringify(INSTALLER) + ');',
      'const parent=process.argv[1];',
      // withInstallLock closes its original handle before invoking this body.
      // That permits the pathname replacement on Node 16 Windows while still
      // proving cleanup checks identity/token and leaves a foreign lock alone.
      'i.withInstallLock(parent,"codex",()=>{',
      ' const lock=path.join(parent,".everyday-writer-codex.lock");',
      ' fs.unlinkSync(lock); fs.writeFileSync(lock,"foreign-owner\\n",{flag:"wx"});',
      '});',
    ].join('');
    const result = spawnSync(process.execPath, ['-e', worker, parent], { encoding: 'utf8' });
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(fs.readFileSync(path.join(parent, '.everyday-writer-codex.lock'), 'utf8'), 'foreign-owner\n');
  });

  test('demonstrably dead package and bootstrap locks are quarantined and recovered', () => {
    const item = fixture('dead-locks');
    const parent = path.join(item.home, '.codex', 'skills');
    fs.mkdirSync(parent, { recursive: true });
    const packageLock = path.join(parent, '.everyday-writer-codex.lock');
    fs.writeFileSync(packageLock, lockPayload('codex', 'install/update', 2147483647));
    let result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.ok(!fs.existsSync(packageLock));
    siblingWithPrefix(packageLock, '.ew-dead-lock-codex-');

    const bootstrap = path.join(item.home, '.everyday-writer');
    fs.mkdirSync(bootstrap, { recursive: true });
    const bootstrapLock = path.join(bootstrap, '.everyday-writer-bootstrap.lock');
    fs.writeFileSync(bootstrapLock, lockPayload('bootstrap', 'bootstrap configuration', 2147483647));
    const vault = vaultAt(item.root, 'Vault');
    result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.ok(!fs.existsSync(bootstrapLock));
    siblingWithPrefix(bootstrapLock, '.ew-dead-lock-bootstrap-');
  });

  test('live, malformed, and dangling locks fail closed and remain untouched', () => {
    for (const kind of ['live', 'malformed', 'dangling']) {
      const item = fixture('unsafe-lock-' + kind);
      const parent = path.join(item.home, '.codex', 'skills');
      fs.mkdirSync(parent, { recursive: true });
      const lock = path.join(parent, '.everyday-writer-codex.lock');
      if (kind === 'live') fs.writeFileSync(lock, lockPayload('codex', 'install/update', process.pid));
      else if (kind === 'malformed') fs.writeFileSync(lock, '{broken\n');
      else fs.symlinkSync(path.join(item.root, 'missing-lock-target'), lock, 'file');
      const result = run(item.home, ['install']);
      assertSpawned(result);
      assert.strictEqual(result.status, 1);
      assert.ok(fs.lstatSync(lock));
      assert.match(result.stderr, kind === 'live' ? /may be running.*PID.*lock was preserved/i : /lock.*(?:manual|remove only|inspect)/i);
    }
  });

  test('receipt-last partial publication restores one verified prior backup', () => {
    const item = fixture('partial-recovery');
    let result = run(item.home, ['install']);
    assert.strictEqual(result.status, 0, result.stderr);
    const dest = codexInstallAt(item.home);
    fs.writeFileSync(path.join(dest, 'prior-version.txt'), 'prior\n');
    const backup = path.join(path.dirname(dest), '.ew-install-backup-codex-crashed');
    fs.renameSync(dest, backup);
    fs.mkdirSync(dest);
    fs.writeFileSync(path.join(dest, 'SKILL.md'), 'partial without receipt\n');
    result = run(item.home, ['install'], undefined, { EW_INSTALL_TEST_FAULT: 'publication-rename' });
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.strictEqual(fs.readFileSync(path.join(dest, 'prior-version.txt'), 'utf8'), 'prior\n');
    siblingWithPrefix(dest, '.ew-install-interrupted-codex-');
  });

  test('ambiguous backups and receipt-last partials without a prior fail closed', () => {
    const multi = fixture('ambiguous-recovery');
    let result = run(multi.home, ['install']);
    assert.strictEqual(result.status, 0, result.stderr);
    const dest = codexInstallAt(multi.home);
    const first = path.join(path.dirname(dest), '.ew-install-backup-codex-one');
    const second = path.join(path.dirname(dest), '.ew-install-backup-codex-two');
    fs.renameSync(dest, first);
    copyTree(first, second);
    result = run(multi.home, ['install']);
    assert.strictEqual(result.status, 1);
    assert.ok(result.stderr.includes(first) && result.stderr.includes(second));
    assert.ok(fs.existsSync(first) && fs.existsSync(second));

    const partial = fixture('partial-no-prior');
    const partialDest = codexInstallAt(partial.home);
    fs.mkdirSync(partialDest, { recursive: true });
    fs.writeFileSync(path.join(partialDest, 'SKILL.md'), 'no receipt\n');
    result = run(partial.home, ['install']);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /partial install was preserved/i);
    assert.strictEqual(fs.readFileSync(path.join(partialDest, 'SKILL.md'), 'utf8'), 'no receipt\n');
  });

  test('exclusive destination claim preserves an adversarial concurrent destination', () => {
    const item = fixture('destination-race');
    const dest = codexInstallAt(item.home);
    const result = run(item.home, ['install'], undefined, { EW_INSTALL_TEST_DEST_RACE: 'directory' });
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.strictEqual(fs.readFileSync(path.join(dest, 'concurrent-owner.txt'), 'utf8'), 'foreign\n');
    assert.ok(!fs.existsSync(path.join(dest, '.everyday-writer-install.json')));
    assert.match(result.stderr, /concurrent destination was preserved/i);
  });

  test('Claude package reset refuses redirected dist and target components', () => {
    for (const redirected of ['dist', 'target']) {
      const item = fixture('package-redirect-' + redirected);
      const repo = path.join(item.root, 'repo');
      const dist = path.join(repo, 'dist');
      const staging = path.join(dist, 'claude-skill');
      const target = path.join(staging, 'everyday-writer');
      const external = path.join(item.root, 'external');
      fs.mkdirSync(repo);
      fs.mkdirSync(external);
      const sentinel = path.join(external, 'keep.txt');
      fs.writeFileSync(sentinel, 'keep\n');
      if (redirected === 'dist') {
        fs.symlinkSync(external, dist, process.platform === 'win32' ? 'junction' : 'dir');
      } else {
        fs.mkdirSync(staging, { recursive: true });
        fs.symlinkSync(external, target, process.platform === 'win32' ? 'junction' : 'dir');
      }
      assert.throws(() => PACKAGER.resetDir(target, repo, staging), /redirected|ordinary directory/i);
      assert.strictEqual(fs.readFileSync(sentinel, 'utf8'), 'keep\n');
    }
  });

  for (const fault of ['revalidation-read', 'publication-rename']) {
    test('install restores prior package after ' + fault + ' failure', () => {
      const item = fixture('swap-' + fault);
      let result = run(item.home, ['install']);
      assertSpawned(result);
      assert.strictEqual(result.status, 0, result.stderr);
      const dest = codexInstallAt(item.home);
      const sentinel = path.join(dest, 'prior-version.txt');
      fs.writeFileSync(sentinel, 'prior\n');
      result = run(item.home, ['install'], undefined, { EW_INSTALL_TEST_FAULT: fault });
      assertSpawned(result);
      assert.strictEqual(result.status, 1, result.stderr);
      assert.strictEqual(fs.readFileSync(sentinel, 'utf8'), 'prior\n');
      assert.match(result.stderr, /Package state:.*prior install was restored to:/is);
      assert.ok(siblingWithPrefix(dest, '.ew-install-stage-codex-'));
    });
  }

  test('rollback rename failure preserves and reports prior package and stage', () => {
    const item = fixture('swap-rollback');
    let result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const dest = codexInstallAt(item.home);
    fs.writeFileSync(path.join(dest, 'prior-version.txt'), 'prior\n');
    result = run(item.home, ['install'], undefined, { EW_INSTALL_TEST_FAULT: 'publication-rename,rollback-rename' });
    assertSpawned(result);
    assert.strictEqual(result.status, 1, result.stderr);
    assert.ok(!fs.existsSync(dest));
    const backup = siblingWithPrefix(dest, '.ew-install-backup-codex-');
    const stage = siblingWithPrefix(dest, '.ew-install-stage-codex-');
    assert.strictEqual(fs.readFileSync(path.join(backup, 'prior-version.txt'), 'utf8'), 'prior\n');
    assert.ok(fs.existsSync(path.join(stage, 'SKILL.md')));
    assert.ok(result.stderr.includes('prior install is recoverable at: ' + backup));
    assert.ok(result.stderr.includes('staged candidate is preserved at: ' + stage));
  });

  test('two different-vault bootstrap attempts serialize and loser leaves no orphan workspace', () => {
    const item = fixture('bootstrap-race');
    const alpha = vaultAt(item.root, 'Alpha');
    const beta = vaultAt(item.root, 'Beta');
    const worker = [
      'const i=require(' + JSON.stringify(INSTALLER) + ');',
      'try{i.configureFreshVault(process.argv[1]);process.exit(0)}catch(e){console.error(e.message);process.exit(1)}',
    ].join('');
    const coordinator = [
      "const {spawn}=require('child_process'); const worker=process.argv[1]; const vaults=process.argv.slice(2); const out=[];",
      "for(const vault of vaults){const c=spawn(process.execPath,['-e',worker,vault],{env:process.env,stdio:['ignore','pipe','pipe']});let e='';c.stderr.on('data',d=>e+=d);c.on('exit',code=>{out.push({vault,code,e});if(out.length===2)process.stdout.write(JSON.stringify(out))})}",
    ].join('');
    const result = spawnSync(process.execPath, ['-e', coordinator, worker, alpha, beta], { env: Object.assign({}, process.env, { HOME: item.home, USERPROFILE: item.home }), encoding: 'utf8', timeout: 15000 });
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const outcomes = JSON.parse(result.stdout);
    assert.deepStrictEqual(outcomes.map((entry) => entry.code).sort(), [0, 1]);
    const config = JSON.parse(fs.readFileSync(configAt(item.home), 'utf8'));
    const winner = config.storage.vaultPath;
    const loser = winner === fs.realpathSync(alpha) ? beta : alpha;
    assert.ok(fs.existsSync(path.join(winner, 'Everyday Writer')));
    assert.ok(!fs.existsSync(path.join(loser, 'Everyday Writer')));
  });

  test('owned replacement removes stale package files instead of overlaying', () => {
    const item = fixture('replace');
    let result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const stale = path.join(codexInstallAt(item.home), 'stale-from-old-version.txt');
    fs.writeFileSync(stale, 'stale\n');
    result = run(item.home, ['install:codex']);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.ok(!fs.existsSync(stale));
    assert.ok(fs.existsSync(path.join(codexInstallAt(item.home), '.everyday-writer-install.json')));
  });

  test('install refuses a file or unowned populated destination', () => {
    for (const kind of ['file', 'directory']) {
      const item = fixture('dest-' + kind);
      const dest = codexInstallAt(item.home);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (kind === 'file') fs.writeFileSync(dest, 'mine\n');
      else { fs.mkdirSync(dest); fs.writeFileSync(path.join(dest, 'mine.txt'), 'mine\n'); }
      const result = run(item.home, ['install']);
      assertSpawned(result);
      assert.strictEqual(result.status, 1);
      assert.match(result.stderr, kind === 'file' ? /not a safe ordinary directory/i : /unowned install directory/i);
      assert.strictEqual(fs.readFileSync(kind === 'file' ? dest : path.join(dest, 'mine.txt'), 'utf8'), 'mine\n');
    }
  });

  test('install refuses a redirected destination', () => {
    const item = fixture('dest-link');
    const external = path.join(item.root, 'external');
    fs.mkdirSync(external);
    const dest = codexInstallAt(item.home);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.symlinkSync(external, dest, process.platform === 'win32' ? 'junction' : 'dir');
    const result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /safe ordinary directory|redirect/i);
    assert.ok(fs.existsSync(external));
  });

  test('install refuses a redirected install parent before writing through it', () => {
    const item = fixture('parent-link');
    const external = path.join(item.root, 'external-codex');
    fs.mkdirSync(external);
    fs.symlinkSync(external, path.join(item.home, '.codex'), process.platform === 'win32' ? 'junction' : 'dir');
    const result = run(item.home, ['install']);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /Install parent component.*(?:redirect|safe ordinary)/i);
    assert.deepStrictEqual(fs.readdirSync(external), []);
  });

  test('explicit vault setup rejects redirected marker and workspace paths', () => {
    for (const kind of ['marker', 'workspace']) {
      const item = fixture('vault-link-' + kind);
      const vault = path.join(item.root, 'Vault');
      const external = path.join(item.root, 'external');
      fs.mkdirSync(vault);
      fs.mkdirSync(external);
      if (kind === 'marker') {
        fs.symlinkSync(external, path.join(vault, '.obsidian'), process.platform === 'win32' ? 'junction' : 'dir');
      } else {
        fs.mkdirSync(path.join(vault, '.obsidian'));
        fs.symlinkSync(external, path.join(vault, 'Everyday Writer'), process.platform === 'win32' ? 'junction' : 'dir');
      }
      const result = run(item.home, ['install', '--vault', vault]);
      assertSpawned(result);
      assert.strictEqual(result.status, 1);
      assert.match(result.stderr, /redirect|safe ordinary directory/i);
      assert.ok(!fs.existsSync(configAt(item.home)));
      assert.deepStrictEqual(fs.readdirSync(external), []);
    }
  });

  test('uninstall refuses unowned content and preserves it', () => {
    const item = fixture('unowned-uninstall');
    const dest = codexInstallAt(item.home);
    fs.mkdirSync(dest, { recursive: true });
    const mine = path.join(dest, 'mine.txt');
    fs.writeFileSync(mine, 'keep\n');
    const result = run(item.home, ['uninstall:codex']);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /unowned install directory/i);
    assert.strictEqual(fs.readFileSync(mine, 'utf8'), 'keep\n');
  });

  test('existing config is never clobbered by a second explicit connection', () => {
    const item = fixture('config-no-clobber');
    const firstVault = vaultAt(item.root, 'First Vault');
    const secondVault = vaultAt(item.root, 'Second Vault');
    let result = run(item.home, ['install', '--vault', firstVault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const before = fs.readFileSync(configAt(item.home));
    result = run(item.home, ['install', '--vault', secondVault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /another vault/i);
    assert.deepStrictEqual(fs.readFileSync(configAt(item.home)), before);
    assert.ok(!fs.existsSync(path.join(secondVault, 'Everyday Writer')));
  });

  test('concurrent first config publications use atomic no-clobber semantics', () => {
    const item = fixture('config-race');
    const result = runConfigRace(item.home);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    const outcomes = JSON.parse(result.stdout);
    assert.deepStrictEqual(outcomes.map((entry) => entry.code).sort(), [0, 1]);
    assert.ok(outcomes.find((entry) => entry.code === 1).stderr.includes('appeared concurrently'));
    const stored = JSON.parse(fs.readFileSync(configAt(item.home), 'utf8'));
    assert.ok(stored.winner === 'alpha' || stored.winner === 'beta');
  });

  test('same configured vault is accepted and populated destination is rejected', () => {
    const item = fixture('same-vault');
    const vault = vaultAt(item.root, 'Vault');
    let result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);
    result = run(item.home, ['install', '--vault', vault]);
    assertSpawned(result);
    assert.strictEqual(result.status, 0, result.stderr);

    const other = fixture('populated-vault');
    const populated = vaultAt(other.root, 'Vault');
    fs.mkdirSync(path.join(populated, 'Everyday Writer'), { recursive: true });
    fs.writeFileSync(path.join(populated, 'Everyday Writer', 'existing.md'), 'user data\n');
    result = run(other.home, ['install', '--vault', populated]);
    assertSpawned(result);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /already contains EW-managed data/i);
    assert.strictEqual(fs.readFileSync(path.join(populated, 'Everyday Writer', 'existing.md'), 'utf8'), 'user data\n');
  });

  test('help documents --vault and unknown options fail', () => {
    const item = fixture('help');
    const help = run(item.home, ['--help']);
    assertSpawned(help);
    assert.strictEqual(help.status, 0, help.stderr);
    assert.match(help.stdout, /--vault <path>/);
    assert.match(help.stdout, /uninstall:codex/);
    assert.match(help.stdout, /uninstall:claude/);
    const unknown = run(item.home, ['install', '--surprise']);
    assertSpawned(unknown);
    assert.strictEqual(unknown.status, 1);
    assert.match(unknown.stderr, /Unknown option/);
  });
} finally {
  for (const root of temporaryRoots) fs.rmSync(root, { recursive: true, force: true });
}

console.log('');
console.log(passed + ' installer tests passed.');
