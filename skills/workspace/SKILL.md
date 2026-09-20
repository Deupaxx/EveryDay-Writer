---
name: workspace
description: |
  Manage EW local storage and Obsidian writing workspaces. Use when the user wants to connect or
  disconnect an Obsidian vault, inspect storage status, migrate complete managed workspaces, or create and
  list topic projects for their writing second brain.
license: MIT
metadata:
  version: "0.3.0"
---

# EW Skill - Workspace

This skill is for local filesystem environments only. In memory-only Cowork mode, explain that vault storage is unavailable and do not simulate filesystem changes in memory.

**Dependency chain. Read these in order before doing anything:**

1. `core/runtime-contract.md`
2. `core/obsidian-workspace.md` (storage resolution, containment, layout, persistence, and conflict rules)
3. `core/anti-ai-rules.md`
4. `core/ai_slop_commandments.md`
5. For `topic new` or `topic list`: `core/voice-profile.md`. Migration validates any inventoried pointer locally under the Migrate procedure and never invokes the normal resolver.
6. Any `.md` files in the active voice's references folder only when the requested operation actually needs a resolved voice

`status`, `connect`, `disconnect`, `migrate`, and `topic repair` are storage repair/lifecycle commands. Dispatch them after steps 1-4 and **do not resolve a voice through the normal data-root resolver**, even when configuration or `active-voice` is valid. They must remain usable when configuration, the connected workspace, a topic tree, or the voice pointer is broken. Each command performs command-local safe validation only. Read bootstrap `config.json` and inventory the bootstrap root when the procedure below requires it; inspect any other source only as needed to diagnose, repair, migrate, replace, or remove the locator.

---

## Commands

| Invocation | Command |
|---|---|
| `/ew:workspace` or `/ew:workspace status` | Show resolved storage status |
| `/ew:workspace connect <vault>` | Connect an existing Obsidian vault |
| `/ew:workspace disconnect` | Return to default storage |
| `/ew:workspace migrate <vault>` | Copy legacy EW data into a vault, verify it, then switch |
| `/ew:workspace topic new <name>` | Create a topic project in the connected workspace |
| `/ew:workspace topic list` | List connected-workspace topics |
| `/ew:workspace topic repair <name>` | Safely finish a verified incomplete topic and its home index |

Match equivalent plain-language requests by intent. A missing required path or topic name gets one direct question; never infer it from the current directory.

---

## Shared path and write rules

Use Node 16-compatible filesystem concepts only: canonical paths, `lstat` plus Windows reparse-point-aware checks, filesystem stat checks, path-aware relative containment, and sibling temporary files renamed into place. Apply the managed-root path safety procedure in `core/obsidian-workspace.md` to bootstrap sources and default-mode operations as strictly as to vault workspaces.

For a candidate vault:

1. Require an explicit path from the user.
2. Resolve it to an absolute path and require that it already exists as a directory.
3. Canonicalize it with `realpath`.
4. Require an existing `.obsidian/` directory directly inside it. Never create `.obsidian/`.
5. Resolve the fixed direct child `Everyday Writer` beneath the canonical vault and prove containment with `path.relative` semantics: reject an absolute result, `..`, or any result beginning with `..` as a complete path segment. If the lexical workspace child exists, inspect it before canonicalization and unconditionally reject any symlink, junction, mount point, or other reparse redirect, even if its target remains inside the vault. Otherwise require a real directory, canonicalize it, and repeat the containment check. Apply this exact lexical-root rule during resolution, connect, and migration destination preflight. Never use string-prefix containment.
6. Before any descendant read or write, reject existing symlinks/junctions below the workspace, canonicalize the nearest existing parent, and prove it remains within the canonical workspace. Repeat for an existing target and for the sibling temporary file location.
7. Inspect existing workspace files before creating or changing anything. Surface type conflicts such as a file named `Everyday Writer` or an incompatible existing note.

Treat three states separately throughout this skill:

- **schema-valid locator:** the JSON fields and fixed `workspaceFolder` value are valid, even if the target is unavailable;
- **resolved locator:** the vault exists, canonicalizes, and contains `.obsidian/`;
- **fully resolved workspace:** the canonical `Everyday Writer` directory exists safely and the requested operation's required paths have compatible types.

Normal writing requires the third state. Lifecycle commands may use the first or second state to report or repair the third. Never label a schema-valid locator as a fully valid workspace.

Write `~/.everyday-writer/config.json` atomically: create the bootstrap directory if needed, write complete JSON to a uniquely named sibling temporary file created exclusively, close it, then rename it to `config.json`. When replacing an existing config, retain its bytes or content hash and re-read it immediately before rename; stop if it changed concurrently. Do not write configuration before all vault validation and command-specific verification succeeds. Clean up only the temporary file if the write fails.

All new files and directories use exclusive/no-replace creation. For a home note, topic hub, or other existing note updated by read-modify-write, retain the exact bytes or a cryptographic hash from the read, re-read immediately before atomic replacement, and stop on any concurrent change. Never let a prior existence scan authorize replacement.

The configuration is:

```json
{
  "version": 1,
  "storage": {
    "mode": "obsidian",
    "vaultPath": "<canonical absolute vault path>",
    "workspaceFolder": "Everyday Writer"
  }
}
```

Never overwrite user note content, silently merge different workspaces, delete legacy data, or rename notes.

---

## Status

Report:

- mode: `default` or `obsidian` when the locator schema says so, otherwise `invalid configuration`;
- locator schema status, vault-locator resolution status, and full-workspace resolution status as three separate results—never call a missing workspace a malformed configuration;
- bootstrap directory;
- resolved data root only when the full workspace is valid;
- configured vault and workspace folder when present;
- whether the vault, `.obsidian/`, workspace, voice tree, active voice, and writing tree exist;
- count of voices and topic hubs that can be read safely;
- any exact validation failure and the applicable recovery commands.

Status is read-only. Do not create missing folders as a side effect.

---

## Connect

`connect <vault>` is for a new or already prepared vault workspace. It must not make existing bootstrap voices disappear from EW's resolved data root.

Before creating, copying, or switching anything, disclose: "Files stored in an Obsidian vault may be synchronized, backed up, or shared by Obsidian or third-party services configured for that vault." If connect routes to migration, also say that migration can copy voice profiles, client profiles, references, writing samples, drafts, topic projects, and other writing files. Obtain explicit confirmation after this disclosure; a previously supplied path is not privacy consent.

1. Validate and canonicalize the vault using the shared rules.
2. Only **report already connected** when valid configuration resolves to the same canonical vault and lexical `Everyday Writer` child **and the workspace fully resolves for all canonical required paths**. A schema-valid or locator-valid config that names this same vault while its `Everyday Writer` workspace is missing is repairable, not already connected. First disclose that a missing workspace may mean managed data was moved or lost; do not describe it as proof of a fresh install. Then safely inventory the bootstrap root in full using the Migrate rules, even when the caller did not mention bootstrap. If any bootstrap managed data exists, require the user to select `bootstrap` explicitly and route through Migrate; empty repair is forbidden. If bootstrap has no managed data, require explicit confirmation to create an empty replacement, create only missing canonical empty structure exclusively, validate it fully, and retain the identical config bytes. Existing wrong-type or redirected paths remain hard stops. A valid configuration naming a different unavailable workspace is not same-vault repair: require the explicit broken-source/source-choice flow rather than guessing a source or reconstructing content.
3. If `config.json` is malformed or unsupported, fail closed. Show the exact parse/schema problem and do not infer either its target or source. A user may choose an explicit `replace broken configuration` flow only after the privacy disclosure, confirmation that the broken config bytes/hash have been snapshotted, and an explicit source choice (`bootstrap`, a safely identified workspace, or `none`). Re-read and require the broken config hash to be unchanged immediately before atomic replacement. Never treat malformed configuration as absence.
4. Inspect `<vault>/Everyday Writer/`. A missing canonical item is repairable below; a wrong-type path, conflicting file, lexical-root reparse redirect, escaping link, or ambiguous duplicate is incompatible, so stop and explain the files involved. Do not merge by guesswork.
5. Inspect managed-data presence using the definition in Migrate; do not equate “has data” with “has a completed profile.” Always inventory bootstrap during same-vault missing-workspace repair. If there is no `config.json` and bootstrap contains any managed user data, **route this connect operation through the Migrate procedure with bootstrap mode explicitly selected**. If valid configuration points at a different canonical vault/workspace and that current workspace or bootstrap contains any managed user data, route through Migrate with the source selected by its deterministic policy, or stop for the required source choice. Never switch the locator directly. A direct switch to a different vault is permitted only when neither current connected storage nor bootstrap contains managed user data.
6. If no source managed data exists, a missing workspace directory or missing canonical empty component is repairable only after the missing/lost/moved-data disclosure and a separate explicit confirmation to create an empty workspace. Create only `Everyday Writer/`, `voices/`, `writing/`, and `00 - Everyday Writer Home.md`, after validating every existing ancestor and type. Report that missing historical content was not recoverable and was not reconstructed. Never overwrite a surviving file or infer lost voice/topic content.
7. Create only missing canonical workspace folders and starter notes with exclusive/no-replace creation. Preserve every existing file. The home note uses canonical vault-root-prefixed links to existing voice profiles and topic hubs; add missing links without rewriting user prose and with the concurrent-change guard.
8. Validate the resulting workspace as fully resolved, including canonical containment and expected path types.
9. Atomically write `config.json` only after workspace creation and validation complete successfully, using exclusive create when absent or the required snapshot/re-read/hash compare-and-swap when replacing a confirmed broken/different locator.
10. Resolve the new data root again from the written configuration and report it. When this connect was invoked by first-run onboarding and an existing EW workspace was found, return to onboarding, resolve storage and voice state again, and skip new onboarding when a complete profile now resolves.

---

## Disconnect

Disconnect changes only the bootstrap pointer. It never deletes or moves the vault workspace.

1. Show the connected vault/data root and the default data root that will become active.
2. Ask for explicit confirmation because the visible active voice and topics may change.
3. Snapshot the exact config bytes/hash and validated file identity/type. Immediately before deletion, repeat bootstrap containment and redirect checks, re-open the same regular file, and compare identity plus bytes/hash. Delete only if all still match; otherwise stop on the concurrent change. After deletion, verify the path is absent. If it reappears, report the new observed configuration and do not claim disconnection.
4. Resolve default storage and report whether legacy voices are available.

Do not copy vault content back automatically. Do not delete any vault file, voice, topic, sample, reference, or draft.

---

## Migrate

Migration is **copy -> verify -> switch**. The source remains untouched.

Before inventory or copy, disclose that the destination vault may be synchronized, backed up, or shared, and that migration includes profiles (including client profiles), references, samples, drafts, writing projects, and every other managed user file. Obtain explicit confirmation for this destination and scope.

**Managed user data exists** when any non-temporary entry other than `config.json` exists beneath a candidate source: an `active-voice` file; any voice directory, profile, sample, reference, or draft (including partial/incomplete trees); the home note; any `writing/` topic, core note, artifact, or other preserved user file. An empty canonical starter directory alone may be treated as structure, but any file or nonempty directory counts. Never require `voice-profile.md` as the evidence threshold.

1. Select the source with this deterministic policy, without invoking the normal voice resolver:
   - If `config.json` schema and locator fully resolve to a current canonical workspace, that workspace is the source for ordinary `/ew:workspace migrate <vault>`. Copy its **entire managed workspace**, including `active-voice`, `voices/`, `writing/`, `00 - Everyday Writer Home.md`, and every other safe non-temporary descendant.
   - The bootstrap directory is a source only when no `config.json` exists, when `connect` routed here from default mode, or when the user explicitly selects **bootstrap mode**. The presence of bootstrap files must never override an existing connected source implicitly.
   - If both a connected workspace and bootstrap contain managed user data, stop and ask the user to choose `connected` or `bootstrap`; do not merge or choose by recency. This explicit choice is required even when one side contains only partial data.
   - If configuration exists but is malformed, partial, unavailable, or not fully resolved, do not infer its source. Inventory and report bootstrap separately. A same-vault missing-workspace repair with bootstrap managed data requires the explicit source choice `bootstrap` and then this Migrate procedure. Otherwise require an explicit source choice after the unsafe/broken source is repaired or explicitly identified. Never silently select bootstrap.
   - Refuse when source and destination canonical workspaces are the same.
2. Validate the source root before inventory. Reject a source root that is a symlink, junction, or other reparse redirect. Canonicalize it, prove the selected lexical root equals the expected bootstrap root or current configured workspace, and establish it as the containment boundary.
3. Recursively inventory **all managed user data** from that source with relative paths, expected types, file sizes, and file contents. For every entry, use `lstat`/reparse-aware checks; reject symlinks, junctions, special files, and any canonical path outside the canonical source. Reject `.`/`..`, absolute, separator-injected, or otherwise escaping relative paths. In either mode, exclude from the copy set and report only strictly recognized EW sibling temporary entries such as `.ew-stage-<validated-slug-or-topic>-<nonce>` and atomic-write temp files; they are interrupted transaction state, never user voices/topics. Still record their paths/types/hashes in the full source-stability snapshot, so a temporary entry appearing, disappearing, or changing before the switch aborts migration. Do not recursively trust an arbitrary dot-prefixed name as temporary. Bootstrap mode also excludes `config.json` from copying; it copies all other safe bootstrap user data. Connected mode copies the complete non-temporary workspace tree, not merely voices. Do not copy anything until the full source scan passes.
4. Resolve source voice state from the safe inventory before destination preflight. Validate every voice directory slug against exactly `[a-z0-9]+(?:-[a-z0-9]+)*`. If `active-voice` exists, validate its entire trimmed value before constructing a voice path and require a matching inventoried regular `voices/<slug>/voice-profile.md`. If no pointer exists and exactly one source voice profile exists, deterministically stage that slug as the destination `active-voice` during copy without modifying the source. If multiple voice profiles exist and no pointer exists, stop and ask which voice should be active. Zero voices is allowed when other partial/user data is being migrated; do not invent a pointer.
5. Validate and canonicalize the explicit destination vault.
6. Inspect destination `<vault>/Everyday Writer/` before copying. A missing workspace is a supported fresh destination, not an invalid configuration:
   - validate the canonical vault and the lexical workspace child before creation;
   - reject a wrong-type `Everyday Writer` path and unconditionally reject a lexical `Everyday Writer` symlink/junction/mount/reparse redirect even when its target stays inside the vault;
   - do not create a starter home during destination preflight. Record whether the safe source inventory contains `00 - Everyday Writer Home.md`; create the missing `Everyday Writer/`, `voices/`, and `writing/` only after the complete source inventory and destination conflict preflight succeed;
   - validate the newly created workspace's canonical containment and expected path types before copying any source file.

   For an existing destination workspace, accept it only when it is empty or an exact byte-identical subset of the selected source inventory. Every destination file must have the same relative path, type, size, and bytes in the source. A destination-only entry, a different file, a wrong type, or an unexpected canonical directory is a conflict: stop and list it. **No silent union is allowed.** Merge is unsupported and requires a separate future merge flow; do not overwrite, auto-rename, retain destination-only managed data, or choose by recency.
7. Before copying, freeze the source snapshot and construct the exact expected destination manifest. It consists only of: (a) every copy-eligible path from the stable source snapshot with its type, size, and byte hash (recognized transaction temporaries remain stability-only observations and are not destination entries); plus (b) an enumerated generated-delta list limited to a missing `00 - Everyday Writer Home.md`, a defined one-voice `active-voice` repair from step 4, and missing canonical `voices/` or `writing/` directories. Record each delta's exact path, type, and final bytes/hash where applicable. The active pointer must come from the selected source; only the defined exactly-one-source-voice repair may generate it. Do not take a pointer from pre-existing destination state.
8. Copy every inventoried source directory/file to its same relative path under the destination. Create each missing directory and file exclusively/no-replace only within the validated workspace; if any destination appears after preflight, stop and treat it as a conflict. Create only the enumerated generated deltas. Apply managed filename/link normalization only inside a generated home-note delta; never rename or rewrite a source file during migration.
9. Preserve all source prose byte-for-byte. If the source has a home note, it is source data and must remain byte-identical; migration does not add links to it. If the source lacks a home note, create the exact pre-enumerated starter-home delta. Validate only the pre-enumerated missing canonical directories and never synthesize any other file or metadata.
10. Immediately before switching configuration, re-enumerate the entire source with the same redirect/type/containment rules and recompute every relative-path/type/size/content hash. Stop if any entry was added, removed, changed, or changed type since the original snapshot. Then recursively enumerate the destination and require exact equality with the expected destination manifest: every expected path has the expected type and hash, and there are no unexpected extras. Re-run redirect rejection and canonical containment. Only then atomically write `config.json` with the existing-config compare-and-swap guard and resolve the new data root from it; the switch is forbidden if destination workspace validation is incomplete, the exact manifest differs, or source stability was not proved.
11. Report the copied and retained counts, conflicts (if any), any staged active pointer, new data root, and that the source remains in place for manual removal if the user later chooses.

On any copy or verification failure, do not switch configuration. Leave copied destination files in place, report them, and require the user to resolve the partial copy before retrying. Never delete either side as rollback.

---

## Topic new

Available only after a valid connected workspace resolves.

1. Normalize the user-supplied readable name using the complete control-character, Obsidian-metacharacter (`# ^ [ ] |`), unsafe-character, reserved-device-name, trimming, and collision rules in `core/obsidian-workspace.md`. Derive display aliases separately with the link-safe alias rules; raw topic text is never a filename, link target, alias, tag, or YAML value.
2. Scan `writing/` folders and topic hub names/aliases. Reuse only when the user clearly requested the existing topic. If the normalized name collides or two topics could match, stop and ask.
3. Create a unique sibling staging directory beneath the validated `writing/` parent, not the final topic path. Build the complete topic folder, its four artifact subfolders, and five stable core notes there, all with exclusive/no-replace semantics. Verify every expected type, note body, frontmatter, link, redirect rule, and containment boundary. Re-scan case-insensitively, then publish the whole staged tree to the final topic name with one atomic exclusive/no-replace directory operation. `.ew-stage-*` directories are temporary and never listed as topics. If the platform cannot guarantee no-replace publication, stop rather than exposing a partial tree.
4. Give every new note useful frontmatter. Double-quote and escape every generated user-derived YAML string under the core YAML rules. The hub uses:

```yaml
---
type: writing-topic
status: active
tags:
  - ew/topic
  - ew/topic/<lower-kebab-topic> # omit this line when no non-empty ASCII component can be derived
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

5. Link the hub to the four core notes and create empty index headings for Drafts, Notes, Sources, and Published. Every link uses the vault-root-relative canonical target beginning `Everyday Writer/writing/<Topic Name>/`; link each core note back to the hub with that same full hub target.
6. Treat staged topic publication plus the home link as a recoverable multi-file transaction. Snapshot the home note and candidate link before publishing the tree. After the atomic topic publish, add one missing canonical aliased topic link with compare-and-swap and verify both sides. If indexing fails, remove the topic only when its complete tree still matches the just-published verified snapshot and no external links were added; otherwise leave it intact and report `home index repair pending`. A retry recognizes the exact complete topic and adds only the missing link. Never claim the home index is clean until re-read verification succeeds.

If the final topic path already contains a partial tree, do not treat it as a normal topic or overwrite it. An explicit `topic repair <name>` may inventory it, require the hub identity/name to match, show missing canonical components, create only those missing pieces exclusively, and repair the home link by compare-and-swap. Any conflicting content, wrong type, redirect, or ambiguous identity is a hard stop.

If a Unicode-only topic name produces an empty ASCII lower-kebab component, keep the base `ew/topic` tag and omit the derived subtag; never emit an empty `ew/topic/` tag.

Unknown brief details remain `[OPEN: ...]`. Do not fabricate a purpose, audience, or success criterion from the topic name.

---

## Topic list

Available only after a valid connected workspace resolves. Read topic directories and their `00 - <Topic> Hub.md` notes. Show each readable topic name, status when present, artifact counts by folder, and the hub's relative path. Flag incomplete layouts; do not repair them unless the user asks.

---

## Hard stops

Stop and ask rather than writing when:

- a vault path was not explicit;
- the path is missing, is a file, or lacks `.obsidian/`;
- canonical containment fails;
- configuration is unsupported or malformed;
- an existing file would be overwritten;
- source and destination migration files conflict;
- two topics or artifacts could be the intended target;
- a requested merge, rename, or deletion is not explicit.

Never search for a vault, assume the current directory is one, create `.obsidian/`, delete legacy data, or hide a collision behind an automatic rename.
