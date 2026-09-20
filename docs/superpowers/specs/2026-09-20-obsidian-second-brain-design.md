# Obsidian-Connected Second Brain for Everyday Writer

**Date:** 2026-09-20
**Status:** Implemented Phase 1 contract; this specification supersedes earlier storage/resolver sections where they conflict
**Branch:** `feat/obsidian-second-brain`

## Outcome

This document is the current storage and Obsidian design authority. The older multi-voice design remains historical context only; its bootstrap-only storage examples and resolver behavior are superseded by this contract and the implemented core files.

Everyday Writer can optionally connect to an existing Obsidian vault. When connected, the vault becomes the canonical home for EW voice profiles and writing projects. Finished interactive writing is saved into topic-based project folders with readable date-prefixed filenames, YAML metadata, topic-hub links, and hub indexes. Users who do not connect Obsidian retain the existing `~/.everyday-writer/` behavior unchanged.

The integration uses plain files only. It does not require an Obsidian plugin, API, registry lookup, or drive scan.

## Product decisions

1. **Optional, not mandatory.** A missing configuration means legacy storage under `~/.everyday-writer/`.
2. **One canonical copy.** In Obsidian mode, the vault copy is authoritative; EW does not maintain a shadow profile that can drift.
3. **Stable bootstrap locator.** `~/.everyday-writer/config.json` records the absolute vault path and workspace folder because EW cannot discover a pointer stored only inside the vault.
4. **First-run and installer entry points.** The npm installer can configure a vault through `--vault <path>` or an interactive TTY prompt. First-run onboarding asks again when no configuration exists, which covers marketplace and app installs that never execute the npm installer.
5. **Existing data is never stranded, silently moved, or deleted.** Migration uses copy → verify → switch and copies the complete selected managed tree. The current connected canonical workspace is the ordinary source; bootstrap is the source only without configuration or after an explicit bootstrap choice. If both contain any user data, including partial trees, EW stops for an explicit source choice. The old data remains until the user explicitly removes it.
6. **Voice identity and writing topics remain separate.** Voices calibrate how EW writes; topic projects organize what the user is thinking and producing.
7. **Interactive writing is persisted in vault mode.** Finished interactive artifacts are saved automatically. Embedded-mode output is never auto-saved. Explicit file paths still win.
8. **Topic selection is conservative.** Use a topic the user names. Reuse a clearly matching project. Ask one short question when the target is ambiguous; do not invent a taxonomy.
9. **Backlinks come from real links.** Every artifact links to its topic hub, and the hub indexes the artifact. Obsidian derives backlinks from these `[[wiki links]]`; EW does not add fake backlink fields or link every noun.
10. **Stable semantic notes, dated artifacts.** Hubs and durable notes keep stable readable names. Drafts, Notes, Sources, and Published artifacts use `YYYY-MM-DD - Descriptive Title.md`, with ` - 2`, ` - 3`, etc. for collisions.
11. **Fixed workspace boundary.** `Everyday Writer` is a fixed direct child of the canonical vault. Existing nested symlinks/junctions are rejected before any descendant write.
12. **Indexes stay true.** Onboarding and voice create/import/delete operations add or remove only their exact home-note links while preserving user prose.
13. **Explicit new topics may be automatic.** A clearly requested named new topic gets the canonical structure before its first artifact; a merely mentioned subject never creates taxonomy by implication.
14. **EW links are vault-root-canonical.** Home, frontmatter, artifacts, hubs, and core notes use targets beginning `Everyday Writer/`; aliases stay readable while full targets prevent basename ambiguity.

## Canonical layout

```text
<Obsidian Vault>/
└── Everyday Writer/
    ├── 00 - Everyday Writer Home.md
    ├── active-voice
    ├── voices/
    │   └── <voice-slug>/
    │       ├── voice-profile.md
    │       ├── references/
    │       ├── samples/
    │       └── drafts/              Legacy-compatible fallback only
    └── writing/
        └── <Readable Topic Name>/
            ├── 00 - <Topic Name> Hub.md
            ├── 01 - Project Brief.md
            ├── 02 - Decision Log.md
            ├── 03 - Open Questions.md
            ├── 04 - Idea Box.md
            ├── Drafts/
            ├── Notes/
            ├── Sources/
            └── Published/
```

The lower-case voice tree deliberately preserves the existing resolver contract. The home note makes profiles discoverable with an unambiguous vault-root-relative link such as `[[Everyday Writer/voices/writer-main/voice-profile|Writer Main Voice Profile]]`.

## Configuration schema

`~/.everyday-writer/config.json`:

```json
{
  "version": 1,
  "storage": {
    "mode": "obsidian",
    "vaultPath": "C:\\Path\\To\\Vault",
    "workspaceFolder": "Everyday Writer"
  }
}
```

Resolution:

1. If the file is absent, use `~/.everyday-writer/`.
2. Validate the JSON locator schema separately from filesystem resolution. A schema-valid locator has version `1`, mode `obsidian`, an absolute `vaultPath`, and the exact fixed `workspaceFolder` value; it does not by itself prove that the vault or workspace exists.
3. Resolve the vault locator, then fully resolve the canonical EW data root as the fixed direct child `<vaultPath>/Everyday Writer`. Reject an escaping top-level or nested symlink/junction before reads or writes. Normal writing requires full workspace resolution.
4. If any layer is malformed, unavailable, or incomplete, stop normal writing. Keep workspace lifecycle commands usable without voice resolution; reconnecting may create only safe missing canonical structure after conflict checks, and migration may create and validate a fresh destination workspace before copy.
5. Never scan disks, infer a vault from the current working directory, create `.obsidian/`, or silently rewrite configuration.

## Phase 0 — Documentation discovery

### Sources and patterns

- Voice resolution/storage: `core/voice-profile.md`, `onboarding/ONBOARDING.md`, `onboarding/claude-code-mode.md`, `onboarding/subject-mode.md`, `skills/voice/SKILL.md`.
- Invocation/read order: `SKILL.md`, `core/runtime-contract.md`.
- Existing Obsidian safety and graph patterns: `skills/world-builder/obsidian-output.md` and `skills/world-builder/manuscript-ingest.md`.
- Distribution/runtime: `bin/install.js`, `bin/check.js`, `bin/package-claude-skill.js`, `package.json`, `docs/distribution.md`.
- Public architecture: `README.md`, `CLAUDE.md`.

### Allowed APIs and mechanisms

- Node 16 built-ins only: `fs`, `path`, `os`, classic `readline`, `process.stdin/stdout.isTTY`, `assert`, and `child_process.spawnSync` in tests.
- Filesystem-only Obsidian integration.
- `path.resolve`, `fs.realpathSync`, `fs.statSync`, and `path.relative` for canonical validation and containment.
- Atomic configuration writes using a sibling temporary file plus `fs.renameSync`.
- Plain Markdown, YAML frontmatter, `[[wiki links]]`, aliases, and lower-kebab hierarchical tags.
- Existing scan-before-create, preserve-user-content, conflict-stop, and no-auto-rename patterns from world-builder.

### Anti-pattern guards

- No profile in the plugin/cache directory.
- No unconditional install prompt in non-TTY contexts.
- No auto-discovery of vaults or creation of `.obsidian/`.
- No string-prefix containment checks.
- No silent migration, overwrite, deletion, rename, or duplicate merge.
- No timestamp-only canonical hubs or opaque slugs in user-facing topic names.
- No graph-density theater: link only meaningful relationships.
- No filesystem-vault behavior in memory-only Cowork mode.

## Phase 1 — Runtime storage and writing-workspace contract

### What to implement

1. Add `core/obsidian-workspace.md`, adapting—not copying the story taxonomy from—these documented patterns:
   - containment and ambiguity handling from `skills/world-builder/obsidian-output.md` “REQUIRED INPUT”;
   - hub/index structure from “FOLDER LAYOUT” and “CORE NOTES”;
   - link/frontmatter rules from “GRAPH RULES” and “YAML FRONTMATTER”;
   - naming/collision rules from “FILE NAMING”;
   - safe merge/conflict behavior from “UPDATE BEHAVIOR” and `manuscript-ingest.md` “MERGE BEHAVIOR.”
2. Update `core/voice-profile.md` to resolve the EW data root through `config.json`, with legacy fallback and explicit invalid-config failure behavior.
3. Update `core/runtime-contract.md` and every direct writing sub-skill dependency chain so vault/workspace behavior cannot be bypassed.
4. Update `SKILL.md` to:
   - resolve the workspace;
   - route workspace operations;
   - auto-save completed interactive writing in connected-vault mode;
   - preserve embedded mode and explicit file paths.
5. Add a local-filesystem `skills/workspace/SKILL.md` command surface:
   - `status`, `connect <vault>`, `disconnect`, `migrate`, `topic new`, `topic list`;
   - validate before writing;
   - copy → verify → switch for migration;
   - preserve old data and surface conflicts.
6. Add the optional storage question to local first-run onboarding before samples, and change all local profile/sample operations to use the resolved data root. Keep Cowork memory behavior unchanged.
7. Update `skills/voice/SKILL.md`, the profile template, reference redirect, and stale `core/anti-ai-rules.md` wording.
8. Extend `bin/check.js` so every relevant skill includes the new core contract and stale literal-path instructions are rejected.
9. Sanitize every user-derived managed filename and wiki-link target component by removing controls, filesystem-unsafe characters, and Obsidian metacharacters `# ^ [ ] |`; trim Windows-unsafe endings, reject empty/dot names and Windows device basenames, and check sibling collisions case-insensitively. Derive link-safe display aliases separately and YAML-escape generated user-derived strings.
10. Treat voice creation/import destinations as no-overwrite boundaries, and keep the connected home index synchronized after onboarding and voice create/import/delete.
11. Validate active slugs before path construction, reject symlinks/junctions through bootstrap and connected managed trees, and make migration inventory prove canonical source containment before copying.
12. Publish new voice and topic trees transactionally from verified sibling staging directories; temporary staging entries are never voices/topics, while validated incomplete legacy trees have explicit resumable repair paths.
13. Protect pointer, profile, config, home, and hub mutations with exclusive create or snapshot/re-read/hash compare-and-swap. Treat voice/topic plus home and artifact plus hub as recoverable multi-file publications with verified compensation and explicit pending-index states.
14. Let workspace lifecycle and voice-management commands bypass normal voice resolution and perform command-local validation so broken pointers remain repairable.
15. Require an existing explicit Obsidian vault and contained story folder for linked multi-file world graphs. Plain-folder output is a single portable `World Bible.md` without graph metadata or link promises.
16. Disclose vault sync/share risk and the full migration scope before confirmation, and re-inventory/re-hash the source immediately before switching configuration.
17. For same-vault missing-workspace repair, warn that data may have been moved or lost and always inventory bootstrap. Bootstrap managed data requires explicit bootstrap-source migration; only a confirmed empty-bootstrap case may create an empty replacement.
18. Migration never unions workspaces. The destination must be empty or an exact byte-identical subset of the stable selected source. Its final manifest must equal the frozen source snapshot plus only enumerated generated deltas (starter home, defined one-voice pointer repair, and missing canonical directories), with no unexpected extras before the locator switch.
19. World-builder multi-note operations use an exclusive operation journal, full write-set/preimage hashes, compare-and-swap publication, idempotent markers, duplicate-Idea-Box prevention, and a repair/resume command. Completion requires final graph/index verification.
20. Voice switching requires `Completed: Yes`; incomplete profiles remain inactive and route to onboarding resume or `/ew:voice repair`. Voice import copies into staging, preserves prose, records only explicit migration metadata/placeholders, validates the staged final tree, and publishes exclusively.
21. `/ew:voice repair` and `/ew:workspace topic repair` are registered command-local recovery surfaces in the runtime and direct dispatcher. Cowork world-builder returns only a portable world bible or clearly labeled in-chat export bundle and never claims filesystem or Obsidian persistence.

### Verification checklist

- `npm run check` passes.
- Repository search shows no operational hardcoding of `~/.everyday-writer/voices` outside the resolver, migration docs, or legacy examples.
- Every direct writing skill reads `core/obsidian-workspace.md`.
- Onboarding asks no vault questions in Cowork mode.
- Connected-vault file rules specify topic hub, frontmatter, date-prefixed artifact name, collision handling, and two-way hub/artifact links.
- Embedded mode explicitly suppresses persistence.
- Migration destination enumeration exactly matches the stable-source-plus-enumerated-deltas manifest.
- World-builder interrupted operations can resume by operation ID without duplicate capture entries.
- Switching to an incomplete voice is refused without mutating `active-voice`.

### Anti-pattern checks

- No instructions to search for a vault, assume CWD, create `.obsidian`, or overwrite same-named files.
- No automatic deletion of legacy data.
- No requirement to manually create reciprocal links for every graph edge.
- No topic inference presented as fact when ambiguous.
- No destination-only managed file is silently retained during migration.
- No Cowork instruction claims that a vault, note, graph, or index was written or updated.

## Phase 2 — Installer, tests, packaging, and public documentation

### What to implement

1. Refactor `bin/install.js` around documented Node 16 APIs:
   - parse `--vault <path>` and reject malformed/unknown options;
   - validate an existing directory containing `.obsidian/`;
   - canonicalize with `realpathSync`;
   - write `config.json` atomically;
   - ask only when stdin/stdout are TTY;
   - never hang or prompt in non-TTY mode;
   - preserve configuration and vault content on uninstall.
2. Add a dependency-free executable test harness under `test/` using `assert`, temporary directories, and `spawnSync`. Cover:
   - valid vault, spaces/Unicode;
   - nonexistent path, file path, and non-vault directory;
   - malformed existing config;
   - non-TTY install does not hang;
   - legacy fallback;
   - install/uninstall preserve user vault content;
   - output reports the resolved data root.
3. Add `npm test` and run it from `prepublishOnly` alongside `npm run check`.
4. Ensure Codex/Claude copy and Claude ZIP packaging include `core/obsidian-workspace.md` and `skills/workspace/SKILL.md` where applicable, without applying local filesystem semantics to Cowork.
5. Update `README.md`, `docs/distribution.md`, `CLAUDE.md`, package/help output, and architecture diagrams with:
   - optional Obsidian onboarding;
   - configuration and fallback;
   - second-brain layout;
   - naming, links, privacy, migration, and disconnected-vault behavior.

### Verification checklist

- `npm test` passes in isolated temporary homes.
- `npm run check` passes.
- `npm pack --dry-run` contains the new core/skill files and excludes tests/user data.
- Installer help documents `--vault`.
- Non-TTY install completes without reading stdin.
- Uninstall leaves config, legacy voices, and vault workspace untouched.
- Distribution docs make first-run onboarding the portable path and describe installer prompting only where executable.

### Anti-pattern checks

- No `readline/promises`, `node:test`, third-party package, top-level await, or raised runtime assumption beyond Node 16.
- No `startsWith` path-containment validation.
- No config write before vault validation.
- No destructive migration or uninstall cleanup of user knowledge.

## Final verification

1. Run `npm test`, `npm run check`, and `npm pack --dry-run`.
2. Inspect the complete diff for accidental user data, absolute local paths, generated archives, or unrelated edits.
3. Exercise a manual fixture flow in a temporary fake vault:
   - connect;
   - resolve profile root;
   - create a topic and artifact;
   - confirm hub/artifact links and collision behavior;
   - simulate missing vault and verify stop/ask behavior.
4. Confirm the real user vault and existing profiles were not changed by repository tests.
5. Commit only after all checks pass. Do not push without explicit user authorization.
