#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const pkg = require('../package.json');

const PACKAGE_ROOT = path.join(__dirname, '..');
const WORKSPACE_FOLDER = 'Everyday Writer';
const CONFIG_VERSION = 1;
const HOME_NOTE = '# Everyday Writer\n\nYour voices and writing projects are indexed here.\n';
const INSTALL_RECEIPT = '.everyday-writer-install.json';
const INSTALL_RECEIPT_VERSION = 1;
const INSTALL_COMMANDS = new Set(['install', 'install:codex', 'install:claude']);
const UNINSTALL_COMMANDS = new Set(['uninstall', 'uninstall:codex', 'uninstall:claude']);

if (require.main === module) {
  main(process.argv.slice(2)).catch((error) => {
    console.error('ERROR: ' + error.message);
    process.exitCode = 1;
  });
}

async function main(argv) {
  const options = parseArgs(argv);
  if (options.help) return printHelp();
  if (options.version) return console.log(pkg.version);
  const target = options.command.endsWith(':claude') ? 'claude' : 'codex';
  if (UNINSTALL_COMMANDS.has(options.command)) return uninstall(target);

  const configState = inspectConfigState();
  let requestedVault = options.vault;
  if (requestedVault && ['unsafe', 'invalid'].includes(configState.kind)) throw new Error(configState.message + ' Explicit --vault setup stopped without changing storage. ' + recoveryText(target));
  if (!requestedVault && configState.kind === 'absent' && configState.bootstrapSuitable && process.stdin.isTTY && process.stdout.isTTY) {
    requestedVault = await askForVault();
  }

  // Package publication is deliberately complete before any vault, workspace, or
  // config mutation. A storage failure therefore never leaves a half-installed
  // package or makes package state ambiguous.
  const packageState = install(target);
  let dataRoot = defaultDataRoot();
  let storageResult = { created: [] };
  let storageWarning = null;
  if (requestedVault) {
    try {
      storageResult = configureFreshVault(requestedVault);
      dataRoot = storageResult.dataRoot;
    } catch (error) {
      throw new Error(error.message + ' Package state: installed at ' + packageState.destination + '; storage was not connected.');
    }
  }
  else if (configState.kind === 'valid') {
    try { dataRoot = resolveConfiguredDataRoot(configState.config); }
    catch (error) { storageWarning = error.message; }
  } else if (configState.kind === 'invalid' || configState.kind === 'unsafe') storageWarning = configState.message;

  if (storageWarning) printStorageWarning(storageWarning, target);
  printInstallSuccess(packageState, storageWarning ? null : dataRoot, storageResult);
}

function parseArgs(argv) {
  let command = 'install';
  let commandSeen = false;
  let vault = null;
  let help = false;
  let version = false;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') help = true;
    else if (arg === '--version' || arg === '-v' || arg === 'version') {
      if (argv.length !== 1) throw new Error('--version cannot be combined with other options.');
      version = true;
    } else if (arg === '--vault') {
      if (vault !== null) throw new Error('--vault may be supplied only once.');
      if (index + 1 >= argv.length || !argv[index + 1].trim() || argv[index + 1].startsWith('-')) throw new Error('--vault requires an existing Obsidian vault path.');
      vault = argv[++index];
    } else if (arg.startsWith('-')) throw new Error('Unknown option: ' + arg + '. Use --help for usage.');
    else if (!commandSeen && (INSTALL_COMMANDS.has(arg) || UNINSTALL_COMMANDS.has(arg))) {
      command = arg;
      commandSeen = true;
    } else throw new Error('Unknown command or extra argument: ' + arg + '. Use --help for usage.');
  }
  if (vault && !INSTALL_COMMANDS.has(command)) throw new Error('--vault is available only with install commands.');
  return { command, vault, help, version };
}

function printHelp() {
  console.log('Usage: everyday-writer [command] [--vault <path>]');
  console.log('\nCommands:');
  console.log('  install, install:codex   Install the Codex skill (default)');
  console.log('  install:claude           Install the Claude Code plugin');
  console.log('  uninstall, uninstall:codex');
  console.log('                            Uninstall the Codex skill');
  console.log('  uninstall:claude         Uninstall the Claude Code plugin');
  console.log('  --version                Print the package version');
  console.log('\nOptions:');
  console.log('  --vault <path>           Connect a new or empty workspace in an existing Obsidian vault');
  console.log('  -h, --help               Show this help');
  console.log('\nA plain install/update continues when storage needs repair and prints recovery commands.');
  console.log('Use $ew:workspace on Codex and /ew:workspace on Claude.');
}

function askForVault() {
  console.log('\nOptional Obsidian setup');
  console.log('Files stored in an Obsidian vault may be synchronized, backed up, or shared by');
  console.log('Obsidian or third-party services configured for that vault.');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question('Connect an existing Obsidian vault now? [y/N] ', (answer) => {
      if (!/^y(?:es)?$/i.test(answer.trim())) {
        rl.close();
        return resolve(null);
      }
      const askPath = () => rl.question('Vault path: ', (vaultPath) => {
        const trimmed = vaultPath.trim();
        if (!trimmed) {
          console.log('A vault path is required after choosing yes. Please enter a path.');
          return askPath();
        }
        rl.close();
        resolve(trimmed);
      });
      askPath();
    });
  });
}

function defaultDataRoot() { return path.join(os.homedir(), '.everyday-writer'); }
function samePath(a, b) { return process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b; }
function isContained(parent, child, allowEqual) {
  const rel = path.relative(parent, child);
  return (allowEqual && rel === '') || (rel !== '' && !path.isAbsolute(rel) && rel !== '..' && !rel.startsWith('..' + path.sep));
}
function nonce() { return process.pid + '-' + Date.now() + '-' + crypto.randomBytes(8).toString('hex'); }

function lstatIfExists(target) {
  try { return fs.lstatSync(target); }
  catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function pathIdentity(stat) {
  return { dev: stat.dev, ino: stat.ino, size: stat.size, mtimeMs: stat.mtimeMs };
}

function sameIdentity(left, right) {
  return left && right && left.dev === right.dev && left.ino === right.ino && left.size === right.size && left.mtimeMs === right.mtimeMs;
}

function assertRegularUnredirectedFile(target, label) {
  const stat = lstatIfExists(target);
  if (!stat || !stat.isFile() || stat.isSymbolicLink() || !samePath(fs.realpathSync(target), path.resolve(target))) {
    throw new Error(label + ' is missing, redirected, or is not a regular file: ' + target);
  }
  return stat;
}

function assertOrdinaryCanonicalDirectory(target, label) {
  const absolute = path.resolve(target);
  const stat = fs.lstatSync(absolute);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(label + ' is not a safe ordinary directory: ' + absolute);
  const canonical = fs.realpathSync(absolute);
  if (!samePath(canonical, absolute)) throw new Error(label + ' is redirected by a symlink, junction, mount, or reparse path: ' + absolute);
  return canonical;
}

function validateBootstrapRoot() {
  const root = path.resolve(defaultDataRoot());
  if (lstatIfExists(root)) assertOrdinaryCanonicalDirectory(root, 'EW bootstrap storage');
  else {
    let ancestor = path.dirname(root);
    while (!lstatIfExists(ancestor)) ancestor = path.dirname(ancestor);
    const canonicalAncestor = assertOrdinaryCanonicalDirectory(ancestor, 'EW bootstrap parent');
    const expected = path.resolve(canonicalAncestor, path.relative(ancestor, root));
    if (!samePath(expected, root) || !isContained(canonicalAncestor, expected, false)) throw new Error('EW bootstrap storage does not resolve beneath its ordinary parent: ' + root);
  }
  const config = path.join(root, 'config.json');
  if (lstatIfExists(config)) assertRegularUnredirectedFile(config, 'Existing configuration');
  return root;
}

function validateConfigSchema(config) {
  const valid = config && typeof config === 'object' && !Array.isArray(config) && config.version === CONFIG_VERSION &&
    config.storage && typeof config.storage === 'object' && !Array.isArray(config.storage) &&
    config.storage.mode === 'obsidian' && typeof config.storage.vaultPath === 'string' &&
    path.isAbsolute(config.storage.vaultPath) && config.storage.workspaceFolder === WORKSPACE_FOLDER;
  if (!valid) {
    const error = new Error('Unsupported EW configuration schema.');
    error.code = 'EW_CONFIG_SCHEMA';
    throw error;
  }
}

function inspectConfigState() {
  let root;
  try { root = validateBootstrapRoot(); }
  catch (error) { return { kind: 'unsafe', message: error.message, bootstrapSuitable: false }; }
  const target = path.join(root, 'config.json');
  if (!lstatIfExists(target)) return { kind: 'absent', bootstrapSuitable: !lstatIfExists(root) || fs.readdirSync(root).length === 0 };
  try {
    const config = JSON.parse(fs.readFileSync(target, 'utf8'));
    validateConfigSchema(config);
    return { kind: 'valid', config, bootstrapSuitable: false };
  } catch (error) {
    return {
      kind: 'invalid', bootstrapSuitable: false,
      message: error.code === 'EW_CONFIG_SCHEMA'
        ? 'Existing config.json has an unsupported schema. It was left unchanged.'
        : 'Existing config.json is malformed. It was left unchanged.',
    };
  }
}

function validateVault(vaultInput) {
  const absolute = path.resolve(vaultInput);
  if (!lstatIfExists(absolute)) throw new Error('Vault path does not exist: ' + absolute);
  const canonical = assertOrdinaryCanonicalDirectory(absolute, 'Vault path');
  const marker = path.join(canonical, '.obsidian');
  if (!lstatIfExists(marker)) throw new Error('Not an Obsidian vault (missing .obsidian directory): ' + canonical);
  const canonicalMarker = assertOrdinaryCanonicalDirectory(marker, 'Obsidian marker');
  if (!samePath(canonicalMarker, marker) || !isContained(canonical, canonicalMarker, false)) throw new Error('The .obsidian marker is redirected or escapes the vault: ' + marker);
  return canonical;
}

function workspacePathForVault(vault) {
  const workspace = path.join(vault, WORKSPACE_FOLDER);
  if (!samePath(path.dirname(workspace), vault) || !isContained(vault, workspace, false)) throw new Error('The Everyday Writer workspace is not the expected direct child of the vault.');
  if (lstatIfExists(workspace)) {
    const canonical = assertOrdinaryCanonicalDirectory(workspace, 'Everyday Writer workspace');
    if (!samePath(canonical, workspace) || !isContained(vault, canonical, false)) throw new Error('The Everyday Writer workspace is redirected or escapes the vault: ' + workspace);
  }
  return workspace;
}

function inspectFreshWorkspace(workspace) {
  if (!lstatIfExists(workspace)) return { exists: false };
  assertOrdinaryCanonicalDirectory(workspace, 'Everyday Writer workspace');
  const allowed = new Set(['voices', 'writing', '00 - Everyday Writer Home.md']);
  for (const name of fs.readdirSync(workspace)) {
    if (!allowed.has(name)) throw new Error('The vault already contains EW-managed data. Use a workspace connect or migrate command instead: ' + path.join(workspace, name));
    const child = path.join(workspace, name);
    const stat = fs.lstatSync(child);
    if (stat.isSymbolicLink() || !samePath(fs.realpathSync(child), child)) throw new Error('Workspace redirects are not allowed: ' + child);
    if (name === '00 - Everyday Writer Home.md') {
      if (!stat.isFile() || fs.readFileSync(child, 'utf8') !== HOME_NOTE) throw new Error('The existing EW home note is not an empty installer starter note.');
    } else if (!stat.isDirectory() || fs.readdirSync(child).length !== 0) throw new Error('The existing EW workspace is not empty. Use a workspace migrate command instead: ' + child);
  }
  return { exists: true };
}

function assertNoBootstrapData() {
  const root = validateBootstrapRoot();
  if (lstatIfExists(root) && fs.readdirSync(root).some((name) => name !== 'config.json' && name !== '.everyday-writer-bootstrap.lock' && !name.startsWith('.ew-dead-lock-bootstrap-'))) throw new Error('Existing EW data was found in ' + root + '. Nothing was moved; run a workspace migrate command after installation.');
}

function createFreshWorkspace(workspace) {
  const created = [];
  if (!lstatIfExists(workspace)) { fs.mkdirSync(workspace); created.push({ type: 'dir', path: workspace }); }
  assertOrdinaryCanonicalDirectory(workspace, 'Everyday Writer workspace');
  for (const name of ['voices', 'writing']) {
    const target = path.join(workspace, name);
    if (!lstatIfExists(target)) { fs.mkdirSync(target); created.push({ type: 'dir', path: target }); }
  }
  const home = path.join(workspace, '00 - Everyday Writer Home.md');
  if (!lstatIfExists(home)) { fs.writeFileSync(home, HOME_NOTE, { encoding: 'utf8', flag: 'wx' }); created.push({ type: 'file', path: home, bytes: HOME_NOTE }); }
  return created;
}

function rollbackCreated(created) {
  for (let index = created.length - 1; index >= 0; index -= 1) {
    const item = created[index];
    try {
      if (!lstatIfExists(item.path)) continue;
      const stat = fs.lstatSync(item.path);
      if (item.type === 'file' && stat.isFile() && !stat.isSymbolicLink() && fs.readFileSync(item.path, 'utf8') === item.bytes) fs.unlinkSync(item.path);
      else if (item.type === 'dir' && stat.isDirectory() && !stat.isSymbolicLink() && fs.readdirSync(item.path).length === 0) fs.rmdirSync(item.path);
    } catch (_) { /* Preserve anything changed concurrently. */ }
  }
}

function configureFreshVault(vaultInput) {
  console.log('Files stored in an Obsidian vault may be synchronized, backed up, or shared by');
  console.log('Obsidian or third-party services configured for that vault.');
  return withBootstrapLock(() => {
    // Re-read all shared state under the bootstrap lock. The earlier inspection
    // was only for prompting and must not authorize a mutation.
    const state = inspectConfigState();
    if (state.kind === 'unsafe' || state.kind === 'invalid') throw new Error(state.message + ' Explicit --vault setup stopped without changing storage.');
    const vault = validateVault(vaultInput);
    const workspace = workspacePathForVault(vault);
    if (state.kind === 'valid') {
      const configuredVault = validateVault(state.config.storage.vaultPath);
      if (!samePath(configuredVault, vault)) throw new Error('EW is already configured for another vault. Nothing was changed; use a workspace migrate command.');
      const root = resolveConfiguredDataRoot(state.config);
      console.log('Everyday Writer is already connected to this vault.');
      return { dataRoot: root, created: [] };
    }
    assertNoBootstrapData();
    inspectFreshWorkspace(workspace);
    const created = [];
    try {
      created.push.apply(created, createFreshWorkspace(workspace));
      inspectFreshWorkspace(workspace);
      writeConfigAtomic({ version: CONFIG_VERSION, storage: { mode: 'obsidian', vaultPath: vault, workspaceFolder: WORKSPACE_FOLDER } });
      return { dataRoot: fs.realpathSync(workspace), created: created.map((entry) => entry.path), configCreated: true };
    } catch (error) {
      rollbackCreated(created);
      throw error;
    }
  });
}

function resolveConfiguredDataRoot(config) {
  validateConfigSchema(config);
  const vault = validateVault(config.storage.vaultPath);
  const workspace = workspacePathForVault(vault);
  if (!lstatIfExists(workspace)) throw new Error('The configured Everyday Writer workspace is missing; the installer did not reconstruct possibly lost data.');
  inspectWorkspaceTreeSafety(workspace);
  return fs.realpathSync(workspace);
}

function inspectWorkspaceTreeSafety(workspace) {
  const root = assertOrdinaryCanonicalDirectory(workspace, 'Configured workspace');
  const pending = [workspace];
  while (pending.length) {
    const current = pending.pop();
    for (const name of fs.readdirSync(current)) {
      const child = path.join(current, name);
      const stat = fs.lstatSync(child);
      if (stat.isSymbolicLink() || (!stat.isDirectory() && !stat.isFile())) throw new Error('Configured workspace contains a redirect or special file: ' + child);
      const canonical = fs.realpathSync(child);
      if (!samePath(canonical, child) || !isContained(root, canonical, false)) throw new Error('Configured workspace entry redirects or escapes its data root: ' + child);
      if (stat.isDirectory()) pending.push(child);
    }
  }
}

function fsyncDirectory(directory) {
  let fd;
  try { fd = fs.openSync(directory, 'r'); fs.fsyncSync(fd); }
  catch (error) { if (!['EINVAL', 'EISDIR', 'EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) throw error; }
  finally { if (fd !== undefined) fs.closeSync(fd); }
}

function writeConfigAtomic(config) {
  const root = validateBootstrapRoot();
  if (!lstatIfExists(root)) fs.mkdirSync(root);
  assertOrdinaryCanonicalDirectory(root, 'EW bootstrap storage');
  const target = path.join(root, 'config.json');
  const temp = path.join(root, '.config-' + nonce() + '.tmp');
  let fd;
  try {
    fd = fs.openSync(temp, 'wx', 0o600);
    fs.writeFileSync(fd, JSON.stringify(config, null, 2) + '\n', 'utf8');
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
    fs.linkSync(temp, target);
    fsyncDirectory(root);
  } catch (error) {
    if (error.code === 'EEXIST') throw new Error('Configuration appeared concurrently; its exact bytes were preserved and nothing was overwritten.');
    throw error;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
    if (lstatIfExists(temp)) fs.unlinkSync(temp);
  }
}

function installPaths(target) {
  const claude = target === 'claude';
  const home = path.resolve(os.homedir());
  const components = claude ? ['.claude', 'plugins'] : ['.codex', 'skills'];
  const parent = path.join(home, ...components);
  return { claude, home, components, parent, dest: path.join(parent, claude ? 'ew' : 'everyday-writer') };
}
function receiptFor(target, dest) { return { receiptVersion: INSTALL_RECEIPT_VERSION, package: pkg.name, target, destination: path.resolve(dest) }; }

function validateReceipt(root, target, expectedDestination) {
  const receiptPath = path.join(root, INSTALL_RECEIPT);
  if (!lstatIfExists(receiptPath)) throw new Error('Refusing to modify an unowned install directory (ownership receipt missing): ' + root);
  try { assertRegularUnredirectedFile(receiptPath, 'Ownership receipt'); }
  catch (_) { throw new Error('Refusing to modify an install with an unsafe ownership receipt: ' + root); }
  let receipt;
  try { receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8')); }
  catch (_) { throw new Error('Refusing to modify an install with a malformed ownership receipt: ' + root); }
  const expected = receiptFor(target, expectedDestination || root);
  if (receipt.receiptVersion !== expected.receiptVersion || receipt.package !== expected.package || receipt.target !== expected.target || !samePath(receipt.destination, expected.destination)) throw new Error('Refusing to modify an install whose ownership receipt does not match its destination: ' + root);
}

function inspectInstallDestination(dest, target) {
  if (!lstatIfExists(dest)) return false;
  assertOrdinaryCanonicalDirectory(dest, 'Install destination');
  if (lstatIfExists(path.join(dest, INSTALL_RECEIPT))) {
    validateReceipt(dest, target);
    return 'owned';
  }
  if (isVerifiedLegacyInstall(dest, target)) return 'legacy';
  throw new Error('Refusing to modify an unowned install directory (ownership receipt missing and legacy EW markers were not conclusive): ' + dest);
}

function ensureInstallParent(paths) {
  let current = assertOrdinaryCanonicalDirectory(paths.home, 'User home');
  for (const component of paths.components) {
    const child = path.join(current, component);
    if (!lstatIfExists(child)) fs.mkdirSync(child);
    current = assertOrdinaryCanonicalDirectory(child, 'Install parent component');
  }
  if (!samePath(current, paths.parent) || !isContained(paths.home, current, false)) throw new Error('Install parent escapes or redirects outside the user home: ' + paths.parent);
  return current;
}

function lockRecoveryGuidance(lock) {
  return 'Inspect this lock and the sibling .ew-install-* recovery paths, then remove only the exact lock after verifying its owner is not running: ' + lock;
}

function processState(pid) {
  try { process.kill(pid, 0); return 'alive'; }
  catch (error) {
    if (error.code === 'ESRCH') return 'dead';
    if (error.code === 'EPERM') return 'alive';
    return 'ambiguous';
  }
}

function readLockSnapshot(lock) {
  const stat = lstatIfExists(lock);
  if (!stat) return null;
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Unsafe install lock (redirect or special file). ' + lockRecoveryGuidance(lock));
  if (!samePath(fs.realpathSync(lock), path.resolve(lock))) throw new Error('Unsafe redirected install lock. ' + lockRecoveryGuidance(lock));
  const bytes = fs.readFileSync(lock);
  let payload;
  try { payload = JSON.parse(bytes.toString('utf8')); }
  catch (_) { throw new Error('Malformed install lock. ' + lockRecoveryGuidance(lock)); }
  if (!payload || payload.version !== 1 || !Number.isSafeInteger(payload.pid) || payload.pid <= 0 ||
      typeof payload.token !== 'string' || !/^[a-f0-9]{48}$/.test(payload.token) ||
      typeof payload.createdAt !== 'string' || !Number.isFinite(Date.parse(payload.createdAt)) ||
      typeof payload.target !== 'string' || typeof payload.operation !== 'string') {
    throw new Error('Invalid or ambiguous install lock. ' + lockRecoveryGuidance(lock));
  }
  return { stat, identity: pathIdentity(stat), bytes, payload };
}

function quarantineDeadLock(parent, lock, target) {
  const first = readLockSnapshot(lock);
  if (!first) return false;
  if (first.payload.target !== target) throw new Error('Install lock target is ambiguous. ' + lockRecoveryGuidance(lock));
  const state = processState(first.payload.pid);
  if (state === 'alive') throw new Error('Another Everyday Writer ' + first.payload.operation + ' may be running for ' + target + ' (PID ' + first.payload.pid + '); PID reuse cannot be excluded, so the lock was preserved. ' + lockRecoveryGuidance(lock));
  if (state !== 'dead') throw new Error('The lock owner state is ambiguous. ' + lockRecoveryGuidance(lock));
  const second = readLockSnapshot(lock);
  if (!second || !sameIdentity(first.identity, second.identity) || !first.bytes.equals(second.bytes)) {
    throw new Error('The install lock changed during recovery. ' + lockRecoveryGuidance(lock));
  }
  const quarantine = path.join(parent, '.ew-dead-lock-' + target + '-' + nonce() + '.json');
  try { fs.linkSync(lock, quarantine); }
  catch (error) { throw new Error('Could not quarantine the dead-owner lock without replacement at ' + quarantine + ' (' + error.message + '). ' + lockRecoveryGuidance(lock)); }
  const third = readLockSnapshot(lock);
  if (!third || !sameIdentity(second.identity, third.identity) || !second.bytes.equals(third.bytes)) {
    throw new Error('The install lock changed while it was being quarantined. Preserved snapshot: ' + quarantine + '. ' + lockRecoveryGuidance(lock));
  }
  fs.unlinkSync(lock);
  fsyncDirectory(parent);
  return quarantine;
}

function withInstallLock(parent, target, body, operation) {
  assertOrdinaryCanonicalDirectory(parent, 'Install parent');
  const lock = path.join(parent, '.everyday-writer-' + target + '.lock');
  let fd;
  let acquired = false;
  const token = crypto.randomBytes(24).toString('hex');
  const payload = JSON.stringify({ version: 1, token, pid: process.pid, createdAt: new Date().toISOString(), target, operation: operation || 'install/update' }) + '\n';
  let identity;
  try {
    if (lstatIfExists(lock)) {
      quarantineDeadLock(parent, lock, target);
    }
    try { fd = fs.openSync(lock, 'wx', 0o600); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      quarantineDeadLock(parent, lock, target);
      fd = fs.openSync(lock, 'wx', 0o600);
    }
    acquired = true;
    fs.writeFileSync(fd, payload, 'utf8');
    fs.fsyncSync(fd);
    identity = fs.fstatSync(fd);
    // The lock is represented by its exclusive pathname and random token, not
    // by an open handle. Closing here also makes replacement-race behavior
    // portable to Windows, where open files cannot normally be unlinked.
    fs.closeSync(fd);
    fd = undefined;
    return body();
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
    if (acquired && lstatIfExists(lock)) {
      try {
        const stat = fs.lstatSync(lock);
        const sameIdentity = (!identity || !identity.ino || !stat.ino) || (identity.dev === stat.dev && identity.ino === stat.ino);
        if (stat.isFile() && !stat.isSymbolicLink() && sameIdentity && fs.readFileSync(lock, 'utf8') === payload) fs.unlinkSync(lock);
      } catch (_) { /* Never remove a lock whose ownership cannot be proved. */ }
    }
  }
}

function withBootstrapLock(body) {
  const root = path.resolve(defaultDataRoot());
  let madeRoot = false;
  validateBootstrapRoot();
  if (!lstatIfExists(root)) {
    try { fs.mkdirSync(root); madeRoot = true; }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
  }
  assertOrdinaryCanonicalDirectory(root, 'EW bootstrap storage');
  try { return withInstallLock(root, 'bootstrap', body, 'bootstrap configuration'); }
  catch (error) {
    if (madeRoot) {
      try { if (lstatIfExists(root) && fs.readdirSync(root).length === 0) fs.rmdirSync(root); } catch (_) {}
    }
    throw error;
  }
}

function inspectOrdinaryTree(root) {
  const canonicalRoot = assertOrdinaryCanonicalDirectory(root, 'Legacy install destination');
  const pending = [root];
  while (pending.length) {
    const current = pending.pop();
    for (const name of fs.readdirSync(current)) {
      const child = path.join(current, name);
      const stat = fs.lstatSync(child);
      if (stat.isSymbolicLink() || (!stat.isDirectory() && !stat.isFile())) throw new Error('Legacy install contains a redirect or special entry: ' + child);
      const canonical = fs.realpathSync(child);
      if (!samePath(canonical, child) || !isContained(canonicalRoot, canonical, false)) throw new Error('Legacy install entry escapes or redirects outside its root: ' + child);
      if (stat.isDirectory()) pending.push(child);
    }
  }
}

function isVerifiedLegacyInstall(dest, target) {
  inspectOrdinaryTree(dest);
  const skill = path.join(dest, 'SKILL.md');
  const antiAi = path.join(dest, 'core', 'anti-ai-rules.md');
  const voice = path.join(dest, 'skills', 'voice', 'SKILL.md');
  const onboarding = path.join(dest, 'onboarding');
  if (![skill, antiAi, voice].every((entry) => lstatIfExists(entry) && fs.lstatSync(entry).isFile()) || !lstatIfExists(onboarding) || !fs.lstatSync(onboarding).isDirectory()) return false;
  const rootText = fs.readFileSync(skill, 'utf8').slice(0, 2048);
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(rootText);
  if (!frontmatter || !/^name:\s*ew\s*$/mi.test(frontmatter[1])) return false;
  if (!/^# EW Core — Anti-AI Writing Rules\s*$/m.test(fs.readFileSync(antiAi, 'utf8').slice(0, 512))) return false;
  if (!/^name:\s*voice\s*$/mi.test(fs.readFileSync(voice, 'utf8').slice(0, 512))) return false;
  if (target === 'claude') {
    const marker = path.join(dest, '.claude-plugin', 'plugin.json');
    try { return !!lstatIfExists(marker) && fs.lstatSync(marker).isFile() && JSON.parse(fs.readFileSync(marker, 'utf8')).name === 'ew'; } catch (_) { return false; }
  }
  const marker = path.join(dest, 'agents', 'openai.yaml');
  return !!lstatIfExists(marker) && fs.lstatSync(marker).isFile() && /display_name:\s*["']?Everyday Writer["']?/i.test(fs.readFileSync(marker, 'utf8'));
}

function copyRecursive(src, dest) {
  if (!lstatIfExists(src) || path.basename(src).toLowerCase().startsWith('untitled document')) return;
  const stat = fs.lstatSync(src);
  if (stat.isSymbolicLink() || (!stat.isDirectory() && !stat.isFile())) throw new Error('Package source contains a redirect or unsupported file: ' + src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest);
    for (const child of fs.readdirSync(src)) copyRecursive(path.join(src, child), path.join(dest, child));
  } else fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

function buildStagedInstall(parent, target, files, dest) {
  const stage = path.join(parent, '.ew-install-stage-' + target + '-' + nonce());
  fs.mkdirSync(stage);
  try {
    for (const item of files) copyRecursive(path.join(PACKAGE_ROOT, item), path.join(stage, item));
    fs.writeFileSync(path.join(stage, INSTALL_RECEIPT), JSON.stringify(receiptFor(target, dest), null, 2) + '\n', { encoding: 'utf8', flag: 'wx', mode: 0o600 });
    validateReceipt(stage, target, dest);
    if (!lstatIfExists(path.join(stage, 'SKILL.md'))) throw new Error('Staged install is incomplete: SKILL.md is missing.');
    return stage;
  } catch (error) {
    fs.rmSync(stage, { recursive: true, force: true });
    throw error;
  }
}

function publishTreeReceiptLast(source, dest, target) {
  fs.mkdirSync(dest); // Exclusive destination claim: EEXIST never overwrites any entry.
  try {
    for (const name of fs.readdirSync(source)) {
      if (name === INSTALL_RECEIPT) continue;
      copyRecursive(path.join(source, name), path.join(dest, name));
      injectInstallFault('publication-copy');
    }
    if (!lstatIfExists(path.join(dest, 'SKILL.md'))) throw new Error('Published install is incomplete: SKILL.md is missing.');
    injectInstallFault('publication-receipt');
    fs.writeFileSync(path.join(dest, INSTALL_RECEIPT), JSON.stringify(receiptFor(target, dest), null, 2) + '\n', { encoding: 'utf8', flag: 'wx', mode: 0o600 });
    validateReceipt(dest, target);
    fsyncDirectory(dest);
    fsyncDirectory(path.dirname(dest));
  } catch (error) {
    error.ewDestinationClaimed = true;
    throw error;
  }
}

function injectDestinationRace(dest) {
  if (process.env.EW_INSTALL_TEST_DEST_RACE === 'directory') {
    fs.mkdirSync(dest);
    fs.writeFileSync(path.join(dest, 'concurrent-owner.txt'), 'foreign\n', { flag: 'wx' });
  }
}

function matchingRecoveryPaths(paths, target) {
  const prefixes = ['.ew-install-backup-' + target + '-', '.ew-legacy-' + target + '-'];
  return fs.readdirSync(paths.parent)
    .filter((name) => prefixes.some((prefix) => name.startsWith(prefix)))
    .map((name) => ({ path: path.join(paths.parent, name), legacy: name.startsWith('.ew-legacy-' + target + '-') }));
}

function validateRecoveryCandidates(paths, target) {
  const candidates = matchingRecoveryPaths(paths, target);
  for (const candidate of candidates) {
    const stat = lstatIfExists(candidate.path);
    if (!stat || !stat.isDirectory() || stat.isSymbolicLink()) {
      throw new Error('Ambiguous interrupted install recovery path; inspect manually: ' + candidate.path);
    }
    assertOrdinaryCanonicalDirectory(candidate.path, 'Interrupted install recovery path');
    try {
      if (candidate.legacy) {
        if (!isVerifiedLegacyInstall(candidate.path, target)) throw new Error('legacy EW markers are incomplete');
      } else validateReceipt(candidate.path, target, paths.dest);
    }
    catch (error) { throw new Error('Ambiguous interrupted install recovery path: ' + candidate.path + ' (' + error.message + '). Preserve it and inspect manually.'); }
  }
  if (candidates.length > 1) throw new Error('Multiple prior installs make recovery ambiguous. Preserve and inspect these exact paths: ' + candidates.map((entry) => entry.path).join(', '));
  return candidates.map((entry) => entry.path);
}

function quarantinePartialDestination(paths, target) {
  const quarantine = path.join(paths.parent, '.ew-install-interrupted-' + target + '-' + nonce());
  fs.renameSync(paths.dest, quarantine);
  return quarantine;
}

function recoverInterruptedInstall(paths, target) {
  const live = lstatIfExists(paths.dest);
  const candidates = validateRecoveryCandidates(paths, target);
  if (live) {
    assertOrdinaryCanonicalDirectory(paths.dest, 'Install destination');
    try { validateReceipt(paths.dest, target); return null; }
    catch (error) {
      if (isVerifiedLegacyInstall(paths.dest, target)) return null;
      if (candidates.length !== 1) {
        throw new Error('Interrupted partial install was preserved at ' + paths.dest + '. No single verified prior install is available; inspect it manually. Cause: ' + error.message);
      }
    }
  } else if (candidates.length === 0) return null;

  const partial = live ? quarantinePartialDestination(paths, target) : null;
  const prior = candidates[0];
  try { publishTreeReceiptLast(prior, paths.dest, target); }
  catch (error) {
    throw new Error('Automatic interrupted-install recovery failed. Prior install remains at ' + prior +
      (partial ? '; partial install remains at ' + partial : '') + '; live path: ' + paths.dest + '. ' + error.message);
  }
  return { prior, partial };
}

function injectInstallFault(name) {
  const requested = (process.env.EW_INSTALL_TEST_FAULT || '').split(',').map((item) => item.trim());
  if (requested.includes(name)) {
    const error = new Error('Injected install fault: ' + name);
    error.code = 'EW_INSTALL_TEST_FAULT';
    throw error;
  }
}

function describeSwapRecovery(paths, prior, stage, failed, restored, recoveryErrors) {
  const liveExists = !!lstatIfExists(paths.dest);
  const priorExists = prior && !!lstatIfExists(prior.path);
  const stageExists = stage && !!lstatIfExists(stage);
  const failedExists = failed && !!lstatIfExists(failed);
  const parts = [];
  if (liveExists) parts.push('live install path: ' + paths.dest);
  else parts.push('live install path is empty: ' + paths.dest);
  if (restored) parts.push('prior install was restored to: ' + paths.dest);
  else if (priorExists) parts.push('prior install is recoverable at: ' + prior.path);
  else if (prior) parts.push('prior install is not present at its recovery path: ' + prior.path);
  if (stageExists) parts.push('staged candidate is preserved at: ' + stage);
  if (failedExists) parts.push('failed published candidate is preserved at: ' + failed);
  if (recoveryErrors.length) parts.push('recovery errors: ' + recoveryErrors.join(' | '));
  return 'Package state: ' + parts.join('; ') + '.';
}

function compensateInstallSwap(paths, prior, stage) {
  const recoveryErrors = [];
  let failed = null;
  let restored = false;

  // Isolate a candidate at the live path first, but do not let that failure
  // prevent the independent restore attempt below.
  if (lstatIfExists(paths.dest)) {
    failed = path.join(paths.parent, '.ew-install-failed-' + prior.target + '-' + nonce());
    try { fs.renameSync(paths.dest, failed); }
    catch (error) { recoveryErrors.push('could not quarantine live candidate (' + error.message + ')'); }
  }

  if (lstatIfExists(prior.path) && !lstatIfExists(paths.dest)) {
    try {
      injectInstallFault('rollback-rename');
      publishTreeReceiptLast(prior.path, paths.dest, prior.target);
      restored = true;
    } catch (error) {
      recoveryErrors.push('could not restore prior install (' + error.message + ')');
    }
  }

  return {
    recovered: restored,
    report: describeSwapRecovery(paths, prior, stage, failed, restored, recoveryErrors),
  };
}

function install(target) {
  const paths = installPaths(target);
  const files = paths.claude
    ? ['SKILL.md', '.claude-plugin', 'core', 'onboarding', 'skills', 'references', 'resources', 'cowork', 'assets']
    : ['SKILL.md', 'agents', 'core', 'onboarding', 'skills', 'references', 'resources', 'cowork', 'assets'];
  ensureInstallParent(paths);
  if (!samePath(path.dirname(paths.dest), paths.parent) || !isContained(paths.parent, paths.dest, false)) throw new Error('Install target is not the expected direct child of its parent: ' + paths.dest);
  const stage = buildStagedInstall(paths.parent, target, files, paths.dest);
  let backup = null;
  let legacyQuarantine = null;
  let preserveStage = false;
  try {
    withInstallLock(paths.parent, target, () => {
      recoverInterruptedInstall(paths, target);
      const existing = inspectInstallDestination(paths.dest, target);
      let prior = null;
      if (existing) {
        if (existing === 'legacy') {
          legacyQuarantine = path.join(paths.parent, '.ew-legacy-' + target + '-' + nonce());
          fs.renameSync(paths.dest, legacyQuarantine);
          prior = { path: legacyQuarantine, target, kind: 'legacy' };
          try {
            injectInstallFault('revalidation-read');
            if (!isVerifiedLegacyInstall(legacyQuarantine, target)) throw new Error('Legacy EW verification changed during quarantine.');
          } catch (error) {
            preserveStage = true;
            const recovery = compensateInstallSwap(paths, prior, stage);
            if (recovery.recovered) legacyQuarantine = null;
            throw new Error(error.message + ' ' + recovery.report);
          }
        } else {
          backup = path.join(paths.parent, '.ew-install-backup-' + target + '-' + nonce());
          fs.renameSync(paths.dest, backup);
          prior = { path: backup, target, kind: 'owned' };
          try {
            injectInstallFault('revalidation-read');
            validateReceipt(backup, target, paths.dest);
          } catch (error) {
            preserveStage = true;
            const recovery = compensateInstallSwap(paths, prior, stage);
            if (recovery.recovered) backup = null;
            throw new Error(error.message + ' ' + recovery.report);
          }
        }
      }
      try {
        if (lstatIfExists(paths.dest)) throw new Error('Install destination appeared concurrently: ' + paths.dest);
        injectInstallFault('publication-rename');
        injectDestinationRace(paths.dest);
        publishTreeReceiptLast(stage, paths.dest, target);
      } catch (error) {
        preserveStage = true;
        if (prior) {
          if (!error.ewDestinationClaimed && lstatIfExists(paths.dest)) {
            throw new Error(error.message + ' Package state: concurrent destination was preserved at ' + paths.dest + '; prior install is recoverable at: ' + prior.path + '; staged candidate is preserved at: ' + stage + '.');
          }
          const recovery = compensateInstallSwap(paths, prior, stage);
          if (recovery.recovered) {
            if (prior.kind === 'owned') backup = null;
            else legacyQuarantine = null;
          }
          throw new Error(error.message + ' ' + recovery.report);
        }
        let partial = null;
        if (error.ewDestinationClaimed && lstatIfExists(paths.dest)) {
          try { partial = quarantinePartialDestination(paths, target); }
          catch (_) { /* Report the still-live partial below. */ }
        }
        const packageState = !error.ewDestinationClaimed && lstatIfExists(paths.dest)
          ? 'concurrent destination was preserved at: ' + paths.dest
          : partial
          ? 'partial candidate is preserved at: ' + partial
          : (lstatIfExists(paths.dest) ? 'candidate remains at live install path: ' + paths.dest
            : (lstatIfExists(stage) ? 'staged candidate is preserved at: ' + stage : 'no package candidate remains at either ' + paths.dest + ' or ' + stage));
        throw new Error(error.message + ' Package state: no prior install existed; ' + packageState + '.');
      }
      if (backup) { fs.rmSync(backup, { recursive: true, force: false }); backup = null; }
    }, 'install/update');
  } finally {
    if (!preserveStage && lstatIfExists(stage)) fs.rmSync(stage, { recursive: true, force: true });
  }
  return { claude: paths.claude, destination: paths.dest, legacyQuarantine };
}

function printInstallSuccess(state, dataRoot, storageResult) {
  console.log('\n' + (state.claude ? 'Everyday Writer installed for Claude Code.' : 'Everyday Writer installed.'));
  console.log((state.claude ? 'Plugin location: ' : 'Codex skill location: ') + state.destination);
  console.log(dataRoot ? 'Resolved data root: ' + dataRoot : 'Resolved data root: unavailable until storage is repaired');
  if (storageResult && storageResult.created && storageResult.created.length) console.log('Created Obsidian workspace paths: ' + storageResult.created.join(', '));
  else console.log('No workspace or configuration paths were created by this run.');
  if (storageResult && storageResult.configCreated) console.log('Created storage configuration: ' + path.join(defaultDataRoot(), 'config.json'));
  console.log('\nThe package was published with an exclusive destination claim and receipt-last recoverable transaction.');
  if (state.legacyQuarantine) {
    console.log('A verified pre-receipt EW install was preserved at: ' + state.legacyQuarantine);
    console.log('Review/import any old in-plugin profiles or private files manually, then remove that quarantine only when you have confirmed they are no longer needed.');
  }
  if (!state.claude) console.log('Open Codex and use $ew to get started.');
}

function uninstall(target) {
  const paths = installPaths(target);
  ensureInstallParent(paths);
  if (!lstatIfExists(paths.dest)) return console.log('Everyday Writer is not installed for ' + (paths.claude ? 'Claude Code.' : 'Codex.'));
  if (!samePath(path.dirname(paths.dest), paths.parent) || !isContained(paths.parent, paths.dest, false)) throw new Error('Install target is not the expected direct child of its parent: ' + paths.dest);
  let preserved;
  withInstallLock(paths.parent, target, () => {
    recoverInterruptedInstall(paths, target);
    const kind = inspectInstallDestination(paths.dest, target);
    const quarantine = path.join(paths.parent, kind === 'legacy' ? '.ew-legacy-uninstall-' + target + '-' + nonce() : '.ew-uninstall-' + target + '-' + nonce());
    fs.renameSync(paths.dest, quarantine);
    preserved = quarantine;
    try {
      if (kind === 'legacy') {
        if (!isVerifiedLegacyInstall(quarantine, target)) throw new Error('Legacy EW verification changed during quarantine.');
      } else validateReceipt(quarantine, target, paths.dest);
      if (lstatIfExists(paths.dest)) throw new Error('Original install path still exists after quarantine.');
      fsyncDirectory(paths.parent);
      console.log('Everyday Writer was disabled and preserved at: ' + quarantine);
      console.log('Inspect/import anything needed before manually removing only that exact directory.');
    } catch (error) {
      throw new Error(error.message + ' The install was left recoverable at: ' + quarantine);
    }
  }, 'uninstall');
  console.log('Everyday Writer uninstalled (disabled) from ' + (paths.claude ? 'Claude Code.' : 'Codex.') + ' Recoverable copy: ' + preserved);
  console.log('Configuration, legacy voices, and vault workspace content were left in place.');
}

function recoveryText(target) {
  const prefix = target === 'claude' ? '/ew:workspace' : '$ew:workspace';
  return 'Recover with ' + prefix + ' status, ' + prefix + ' connect <vault>, ' + prefix + ' migrate <vault>, or ' + prefix + ' disconnect.';
}
function printStorageWarning(message, target) {
  console.error('STORAGE WARNING: ' + message);
  console.error('The package install/update will continue without changing configuration or user data.');
  console.error(recoveryText(target));
}

module.exports = { HOME_NOTE, WORKSPACE_FOLDER, configureFreshVault, inspectConfigState, inspectFreshWorkspace, parseArgs, validateVault, writeConfigAtomic, withInstallLock };
