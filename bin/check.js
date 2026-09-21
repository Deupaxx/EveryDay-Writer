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

function walkMarkdown(relDir, out = []) {
  const abs = path.join(ROOT, relDir);
  if (!fs.existsSync(abs)) return out;

  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(relDir, entry.name).split(path.sep).join('/');
    if (entry.isDirectory()) {
      if (!['.git', 'node_modules'].includes(entry.name)) walkMarkdown(rel, out);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(rel);
    }
  }

  return out;
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

const CORE = [
  'core/runtime-contract.md',
  'core/obsidian-workspace.md',
  'core/anti-ai-rules.md',
  'core/ai_slop_commandments.md',
  'core/voice-profile.md',
];
for (const rel of CORE) {
  if (!exists(rel)) errors.push('Missing core file: ' + rel);
}

// core/voice-profile.md is the resolver, not a profile. The blank fingerprint it
// stamps new voices from must ship alongside it, or onboarding has nothing to copy.
if (!exists('core/voice-profile-template.md')) {
  errors.push(
    'Missing core/voice-profile-template.md. Onboarding copies it into each voice directory; without it no voice can be created.'
  );
}

// A filled-in profile in core/ means someone wrote a voice into the plugin directory.
// That directory is a cache the plugin replaces on update, and it is tracked by a
// public repository — so this is both data loss waiting to happen and a privacy leak.
if (exists('core/voice-profile.md') && /^\s*\*\*Completed:\*\*\s*Yes/m.test(read('core/voice-profile.md'))) {
  errors.push(
    'core/voice-profile.md contains a completed voice profile. It must stay a resolver; voices belong under the data root resolved by core/obsidian-workspace.md. Move it out before committing.'
  );
}

// Operational instructions must resolve the data root rather than bypassing it with
// the pre-Obsidian literal voice path. The resolver itself may mention the legacy
// location while explaining fallback behavior; migration/public docs are checked
// separately because historical examples there can be legitimate.
const storageInstructionFiles = [
  'SKILL.md',
  'README.md',
  'CLAUDE.md',
  ...walkMarkdown('skills'),
  ...walkMarkdown('onboarding'),
  ...walkMarkdown('core'),
  ...walkMarkdown('cowork'),
  ...walkMarkdown('references'),
].filter((rel) => rel !== 'core/voice-profile.md');

const staleStoragePatterns = [
  /~\/\.everyday-writer\/voices(?:\/|`)/i,
  /~\/\.everyday-writer\/active-voice\b/i,
  /%USERPROFILE%\\\.everyday-writer\\voices\\/i,
  /%USERPROFILE%\\\.everyday-writer\\active-voice\b/i,
];

for (const rel of [...new Set(storageInstructionFiles)]) {
  if (!exists(rel)) continue;
  const lines = read(rel).split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (staleStoragePatterns.some((re) => re.test(line))) {
      errors.push(
        rel +
          ':' +
          (idx + 1) +
          ': stale literal voice path bypasses core/obsidian-workspace.md; use <data-root>/voices/... or <data-root>/active-voice.'
      );
    }
  });
}

// Workspace safety rules are an instruction-level API. These assertions catch a
// future edit that leaves every file syntactically valid while silently removing a
// recovery, containment, naming, or index-maintenance guarantee.
const requiredWorkspaceRules = [
  {
    rel: 'skills/workspace/SKILL.md',
    fragments: [
      'do not resolve a voice through the normal data-root resolver',
      'never invokes the normal resolver',
      'fixed direct child `Everyday Writer`',
      'reject existing symlinks/junctions below the workspace',
      'schema-valid locator',
      'route this connect operation through the Migrate procedure',
      'missing workspace is a supported fresh destination',
      'switch is forbidden if destination workspace validation is incomplete',
      'entire managed workspace',
      'bootstrap directory is a source only',
      'both a connected workspace and bootstrap contain managed user data',
      'exactly one source voice profile exists',
      'multiple voice profiles exist and no pointer exists',
      'reject symlinks, junctions, special files',
      '**report already connected**',
      'Never switch the locator directly',
      'do not create a starter home during destination preflight',
      'exclusive/no-replace',
      'stop on any concurrent change',
      'even if its target remains inside the vault',
      'Files stored in an Obsidian vault may be synchronized, backed up, or shared',
      'Only **report already connected** when',
      'replace broken configuration',
      'identity plus bytes/hash',
      're-enumerate the entire source',
      'added, removed, changed, or changed type',
      'interrupted transaction state, never user voices/topics',
      'unique sibling staging directory',
      'home index repair pending',
      'Unicode-only topic name',
      'Always inventory bootstrap during same-vault missing-workspace repair',
      'missing workspace may mean managed data was moved or lost',
      'exact byte-identical subset of the selected source inventory',
      'No silent union is allowed',
      'exact expected destination manifest',
      'there are no unexpected extras',
      'The active pointer must come from the selected source',
      '`/ew:workspace topic repair <name>`',
      'applicable recovery commands',
    ],
  },
  {
    rel: 'core/runtime-contract.md',
    fragments: [
      'Lifecycle-command exception',
      '`status`, `connect`, `disconnect`, `migrate`, and `topic repair`',
      'without normal active-voice resolution',
      'voice `list`, `switch`, `new`, `import`, `delete`, and `repair`',
      'command-local safe validation',
      'World-builder `repair <operation-id>`/`resume`',
    ],
  },
  {
    rel: 'core/obsidian-workspace.md',
    fragments: [
      'workspaceFolder` is exactly `Everyday Writer`',
      'ASCII control characters',
      'Windows device basenames',
      'An explicitly named **new** topic may be created automatically',
      'Maintain this index after onboarding',
      'Resolve the locator separately from resolving the workspace',
      'All EW-managed wiki links are **vault-root-relative**',
      '[[Everyday Writer/voices/<voice-slug>/voice-profile|<Link-Safe Voice Alias> Voice Profile]]',
      '[[Everyday Writer/writing/<Normalized Topic Name>/Drafts/2026-09-20 - Descriptive Title|2026-09-20 - Descriptive Title]]',
      'Before even probing or reading `config.json`',
      'Managed-root path safety (both storage modes)',
      '# ^ [ ] |',
      'Link aliases and YAML string safety',
      'validate the final slug against exactly `[a-z0-9]+(?:-[a-z0-9]+)*`',
      'even when its target remains inside the same vault',
      'exclusive/no-replace primitive',
      'Immediately before the atomic replacement',
      'artifact plus hub-link publication as one recoverable transaction',
      'topic index repair pending',
      'retain the base `ew/topic` tag',
    ],
  },
  {
    rel: 'skills/voice/SKILL.md',
    fragments: [
      'scan `voices/` case-insensitively',
      'component-by-component `lstat`/Windows-reparse checks',
      'Voice-management commands deliberately bypass the normal resolver',
      'home index repair pending',
      'compare-and-swap update',
      '**refuse to switch**',
      '`Completed:` field to be exactly `Yes`',
      'Copy the source profile bytes into staging first',
      'minimum explicit migration-metadata changes',
      'preserved source-prose hash',
      'Validate the complete staged final tree',
      'Disclose the complete frozen manifest before asking for confirmation',
      'every regular file also records byte size and SHA-256 content hash',
      'confirmation never transfers to a changed manifest',
      'configuration identity/bytes/hash and canonical resolved data root',
      'pointer identity/bytes/hash to equal its snapshot',
      'exclusive/no-replace destination semantics',
      'Require it to match the confirmed manifest exactly',
      'leave the quarantine untouched',
      'Quarantine-first ordering is the compensation strategy',
      'recursively delete **only that exact quarantine path**',
      'partially removed',
      'offer explicit inspect/resume recovery',
      'report it separately as interrupted deletion state',
      'must not restore, complete, or delete it implicitly',
    ],
  },
  {
    rel: 'onboarding/claude-code-mode.md',
    fragments: [
      'does not already exist',
      '00 - Everyday Writer Home.md',
      'exclusive/no-replace operations',
      'If this was an additional voice and it was **not** activated',
    ],
  },
  {
    rel: 'onboarding/subject-mode.md',
    fragments: ['does not already exist', '00 - Everyday Writer Home.md', 'Interrupted staging directories are temporary entries, not voices'],
  },
];

requiredWorkspaceRules.push(
  {
    rel: 'core/voice-profile.md',
    fragments: [
      'before constructing or probing any descendant path from it',
      'Reject symlinks and junctions even when their canonical destination remains inside the data root',
      'create `active-voice` exclusively',
      'Never replace a pointer based on an earlier absence scan',
    ],
  },
  {
    rel: 'onboarding/ONBOARDING.md',
    fragments: [
      'Stop and ask whether this environment has local filesystem access or Claude.ai persistent memory',
      'A partial profile never unlocks writing sub-skills',
      'run `core/voice-profile.md` again',
      'skip WHOSE VOICE and every new-profile question',
      'published as one transaction',
      'A `.ew-stage-*` directory is temporary state',
      'resumable legacy profile',
    ],
  },
  {
    rel: 'SKILL.md',
    fragments: [
      '`status`, `connect`, `disconnect`, `migrate`, and `/ew:workspace topic repair <name>`',
      'dispatch `/ew:voice` list, switch, new, import, delete, edit, and `/ew:voice repair <name>` directly',
      '`/ew:world-builder repair <operation-id>`',
      'command-local safe validation',
    ],
  },
  {
    rel: 'README.md',
    fragments: [
      'one workspace management skill',
      '| `/ew:workspace` |',
      'Migration copies the complete selected managed workspace',
    ],
  },
  {
    rel: 'skills/world-builder/obsidian-output.md',
    fragments: [
      '# ^ [ ] |',
      'Derive display aliases separately',
      'Double-quote user-derived YAML strings',
      'require both an explicit Obsidian vault root and an explicit story-folder path',
      'cannot promise Obsidian graph or backlink behavior',
      'Every wiki-link target must begin with that complete folder prefix',
      'reject every symlink, junction, mount point, or other redirect before canonicalizing it',
      'exclusive/no-replace creation',
      're-read immediately before atomic replacement',
      'preserve its exact actual vault-relative name and casing',
      'componentwise redirect rejection',
      'one `World Bible.md`',
      'no frontmatter, wiki links, relative-link graph',
      'Recoverable multi-note transaction protocol',
      'Preflight the **full write set**',
      'idempotent marker derived from the operation ID',
      'Never append a duplicate Idea Box entry',
      '`/ew:world-builder repair <operation-id>`',
      'Mark `complete` only after this graph/index verification passes',
    ],
  }
);

requiredWorkspaceRules.push(
  {
    rel: 'skills/world-builder/SKILL.md',
    fragments: [
      'recoverable multi-note transaction protocol',
      '`/ew:world-builder repair <operation-id>`',
      'command-local validation',
      '**Recovery exception:**',
      'Mark the operation complete only after re-reading and verifying the graph and indexes',
    ],
  },
  {
    rel: 'cowork/ew-world-builder.md',
    fragments: [
      'This skill has no filesystem or Obsidian write capability',
      'portable export bundle in chat',
      'nothing was written to or updated in Obsidian',
      'Never claim persistence',
    ],
  }
);

const forbiddenInstructionDrift = [
  {
    rel: 'onboarding/ONBOARDING.md',
    re: /Default to Claude Code mode/i,
    label: 'unclear environment must stop instead of defaulting to local mode',
  },
  {
    rel: 'onboarding/ONBOARDING.md',
    re: /Partial profiles unlock the sub-skills/i,
    label: 'partial profiles must not unlock writing skills',
  },
  {
    rel: 'skills/workspace/SKILL.md',
    re: /inspect the bootstrap directory directly first[\s\S]{0,300}use it/i,
    label: 'migration must not prefer bootstrap over a connected canonical source',
  },
  {
    rel: 'skills/workspace/SKILL.md',
    re: /destination-only user file is preserved/i,
    label: 'migration must reject destination-only managed data instead of silently unioning workspaces',
  },
  {
    rel: 'cowork/ew-world-builder.md',
    re: /create linked Markdown notes rather than only a report/i,
    label: 'Cowork world-builder must return an in-chat export, not claim filesystem writes',
  },
];

for (const rule of forbiddenInstructionDrift) {
  if (exists(rule.rel) && rule.re.test(read(rule.rel))) {
    errors.push(rule.rel + ': stale hardening rule: ' + rule.label + '.');
  }
}

for (const rule of requiredWorkspaceRules) {
  if (!exists(rule.rel)) continue;
  const body = read(rule.rel);
  for (const fragment of rule.fragments) {
    if (!body.includes(fragment)) {
      errors.push(rule.rel + ': missing required workspace safety rule: ' + fragment);
    }
  }
}

// Generating skills must positively require a completed profile. Checking only
// for the literal value "No" lets missing fields and template placeholders pass.
const writingSkills = files.filter(
  (rel) =>
    rel.startsWith('skills/') &&
    !['skills/voice/SKILL.md', 'skills/workspace/SKILL.md'].includes(rel)
);
for (const rel of writingSkills) {
  const body = read(rel);
  if (!body.includes("require the resolved profile's `Completed:` field to be exactly `Yes`")) {
    errors.push(rel + ': generation dependency must require Completed: Yes exactly.');
  }
}

for (const rel of files.filter((f) => f !== 'SKILL.md')) {
  const text = read(rel);
  for (const core of CORE) {
    const base = path.basename(core);
    if (!text.includes(base)) {
      errors.push(rel + ': does not reference ' + base + ' in its dependency chain.');
    }
  }

  if (
    !/(active voice's references folder|active voice reference files|voice references|voice's references folder|per-voice reference)/i.test(
      text
    )
  ) {
    errors.push(
      rel +
        ': dependency chain must mention active voice references or voice references resolved by core/voice-profile.md.'
    );
  }
}

// --- Reference-folder drift -------------------------------------------------

const referenceScanFiles = [
  'SKILL.md',
  'README.md',
  'CLAUDE.md',
  ...walkMarkdown('skills'),
  ...walkMarkdown('core'),
  ...walkMarkdown('cowork'),
  ...walkMarkdown('onboarding'),
  ...walkMarkdown('docs'),
].filter((rel) => rel !== 'references/DROP-MD-FILES-HERE.md');

const deprecatedReferencePatterns = [
  { label: 'deprecated phrase "dropped in `references/`"', re: /dropped in\s+`references\/`/i },
  { label: 'deprecated phrase "plugin\'s references"', re: /plugin['\u2019]s references/i },
  {
    label: 'root references scan/load wording',
    re: /\b(scan|read|load|loads|loaded|loading|apply|applies|applied)\b[^.\n]*`?references\/`?/i,
  },
  {
    label: 'root references drop-zone wording',
    re: /`?references\/`?[^.\n]*(drop-?zone|single global)/i,
  },
];

function explicitlyDeprecatedReferenceLine(line) {
  return /\b(deprecated|no longer|not scanned|must not|do not|redirect|upgrader|kept only|not a drop-zone|before v0\.3\.0|used to|historical|cannot)\b/i.test(
    line
  );
}

function canonicalVoiceReferenceLine(line) {
  return /(active voice's references folder|active voice reference files|voice references|voice's references folder|per-voice reference|per-voice drop-zone|this voice's drop-zone|~\/\.everyday-writer\/voices\/<slug>\/references\/)/i.test(
    line
  );
}

for (const rel of [...new Set(referenceScanFiles)]) {
  if (!exists(rel)) continue;
  const lines = read(rel).split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const { label, re } of deprecatedReferencePatterns) {
      if (
        re.test(line) &&
        !explicitlyDeprecatedReferenceLine(line) &&
        !canonicalVoiceReferenceLine(line)
      ) {
        errors.push(
          rel +
            ':' +
            (idx + 1) +
            ': ' +
            label +
            '. User references must be active-voice files resolved by core/voice-profile.md; root references/ is deprecated.'
        );
      }
    }
  });
}

// --- Resource package boundary ---------------------------------------------

const packageFiles = JSON.parse(read('package.json')).files || [];
const publicResources = [
  'resources/Everyday Writer — Anti-AI Rules Rundown.md',
  'resources/General Writing Commandments_ The Foundation of Clarity.md',
  'resources/General Writing Directives_ The Laws of Construction.md',
];
for (const entry of packageFiles) {
  const normalized = entry.replace(/\\/g, '/');
  if (
    normalized === 'resources/' ||
    /^resources\/Untitled document/i.test(normalized) ||
    /^resources\/.*\*/.test(normalized)
  ) {
    errors.push(
      'package.json files includes "' +
        entry +
        '". Private resources/Untitled document*.md files must never ship.'
    );
  }
}

const localUntitledResources = fs
  .readdirSync(path.join(ROOT, 'resources'), { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^Untitled document.*\.md$/i.test(entry.name));
if (localUntitledResources.length > 0) {
  warnings.push(
    'resources/ has ' +
      localUntitledResources.length +
      ' private Untitled document*.md file(s); validator confirms package.json does not ship them.'
  );
}
for (const resource of publicResources) {
  if (!packageFiles.includes(resource)) errors.push('package.json files must explicitly include public resource: ' + resource);
}
if (!packageFiles.includes('!resources/README.md')) errors.push('package.json files must explicitly exclude resources/README.md from the packed artifact.');

// --- Installer transaction boundary ----------------------------------------

const installerSource = read('bin/install.js');
const requiredInstallerGuards = [
  ['exclusive randomized temporary files', "fs.openSync(temp, 'wx'"],
  ['atomic no-clobber config publication', 'fs.linkSync(temp, target)'],
  ['configuration file durability', 'fs.fsyncSync(fd)'],
  ['install ownership receipt', "const INSTALL_RECEIPT = '.everyday-writer-install.json'"],
  ['exclusive install/uninstall lock', "fs.openSync(lock, 'wx'"],
  ['structured crash-recoverable lock', 'createdAt: new Date().toISOString()'],
  ['ENOENT-aware lstat boundary checks', 'function lstatIfExists(target)'],
  ['exclusive destination directory claim', 'fs.mkdirSync(dest); // Exclusive destination claim'],
  ['receipt-last package publication', "fs.writeFileSync(path.join(dest, INSTALL_RECEIPT)"],
  ['dead-lock no-replace quarantine', 'fs.linkSync(lock, quarantine)'],
  ['sibling staged package tree', "'.ew-install-stage-'"],
  ['quarantined prior package tree', "'.ew-install-backup-'"],
  ['quarantined uninstall tree', "'.ew-uninstall-'"],
  ['Codex recovery command syntax', "'$ew:workspace'"],
  ['Claude recovery command syntax', "'/ew:workspace'"],
  ['plain-install storage warning', "'STORAGE WARNING: '"],
  ['redirect-aware canonical directory validation', 'assertOrdinaryCanonicalDirectory'],
];
for (const [label, fragment] of requiredInstallerGuards) {
  if (!installerSource.includes(fragment)) errors.push('bin/install.js: missing installer safety guard: ' + label + '.');
}

const packageScripts = JSON.parse(read('package.json')).scripts || {};
if (packageScripts.test !== 'node test/install.test.js') {
  errors.push('package.json: test script must run the isolated installer regression suite.');
}
if (!/npm test/.test(packageScripts.prepublishOnly || '')) {
  errors.push('package.json: prepublishOnly must run installer tests before packaging.');
}

// --- Report -----------------------------------------------------------------

console.log('');
console.log('Everyday Writer package check');
console.log('  version:      ' + (VERSION || 'UNKNOWN'));
console.log('  skills found: ' + files.length + ' registered skill files');
console.log('');

for (const w of warnings) console.log('  warn:  ' + w);
for (const e of errors) console.log('  ERROR: ' + e);

if (errors.length === 0) {
  console.log(
    '  all registered skills valid; manifests consistent; runtime and workspace chains intact.'
  );
  console.log('');
  process.exit(0);
}

console.log('');
console.log(errors.length + ' error(s). Package would not load correctly.');
console.log('');
process.exit(1);
