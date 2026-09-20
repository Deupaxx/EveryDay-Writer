# EW Core - Obsidian Workspace

This contract governs local filesystem storage for EW. Read it before resolving a voice or writing any file. It does not apply to memory-only Cowork mode.

EW uses ordinary folders, Markdown, YAML frontmatter, and Obsidian wiki links. It does not require an Obsidian plugin or API.

---

## Resolve storage before any filesystem operation

The bootstrap directory is always:

```text
~/.everyday-writer/                 Windows: %USERPROFILE%\.everyday-writer\
```

Its optional `config.json` is the only vault locator. Never search a drive for a vault, infer one from the current working directory, inspect the registry, or create `.obsidian/`.

Resolve the EW data root once per invocation. **Before even probing or reading `config.json`,** validate the bootstrap path with `lstat`/Windows reparse-point-aware checks: an existing bootstrap root must be a real directory, not a symlink or junction, and an existing `config.json` must be a contained regular file, not a redirect. Canonicalize the bootstrap root (or the nearest existing parent when it is absent) and prove path-aware containment for the config candidate. If this preflight fails, stop; do not follow the path and do not fall back.

Then:

1. If `~/.everyday-writer/config.json` is absent, the data root is `~/.everyday-writer/` (legacy/default mode).
2. If the file exists, read and parse it. Its **locator schema is valid** only when:
   - `version` is exactly `1`;
   - `storage.mode` is exactly `obsidian`;
   - `storage.vaultPath` is an absolute path;
   - `storage.workspaceFolder` is exactly `Everyday Writer`. It is a fixed direct child, not a configurable nested path.
3. **Resolve the locator separately from resolving the workspace.** A schema-valid locator resolves only when `storage.vaultPath` exists as a directory, canonicalizes successfully, and contains an existing `.obsidian/` directory. Resolve the workspace as the lexical direct child `<canonical-vault>/Everyday Writer` and verify it with a path-aware relative check. If that lexical child exists, inspect it with `lstat` and Windows reparse-point-aware checks **before canonicalizing it**. Unconditionally reject it when it is a symbolic link, junction, mount point, or any other reparse redirect, even when its target remains inside the same vault. Otherwise require a real directory, canonicalize it, and repeat the containment check against the canonical vault. A valid child has a non-empty relative path that is not absolute and does not begin with `..` as a complete path segment. Never use a string-prefix check. This lexical-root rejection applies identically during ordinary resolution, `connect`, and migration destination preflight.
4. **Full workspace resolution is a third, stricter state.** It succeeds only when the locator resolves and the `Everyday Writer` directory exists, is safely contained, and has no wrong-type canonical paths needed by the requested operation. Normal voice and writing work requires full workspace resolution. `status`, `connect`, `disconnect`, and `migrate` may inspect a schema-valid or locator-valid configuration without pretending the workspace is fully resolved; this is what authorizes repair of a missing workspace.
5. For every later read or write, apply the managed-root safety procedure below. It applies equally to the bootstrap root in default mode and the vault workspace in connected mode; default storage is not a relaxed trust boundary.
6. Only after full workspace resolution succeeds is the data root `<canonical vault>/Everyday Writer`.

If the locator schema is malformed or unsupported, or locator/workspace resolution fails because the vault is missing, lacks `.obsidian/`, escapes containment, has a wrong-type path, or lacks the `Everyday Writer` directory, **stop before normal voice or writing work**. Explain the exact state and list the applicable recovery commands: `/ew:workspace connect <configured-vault>` for confirmed same-vault repair, `/ew:workspace migrate <vault>` to copy an explicitly selected managed data source, or `/ew:workspace disconnect`. A same-vault missing-workspace repair must disclose that data may have been lost or moved, safely inventory bootstrap every time, route any bootstrap managed data through explicit bootstrap-source migration, and create empty structure only after confirmation when bootstrap is empty. Workspace management commands remain available without voice resolution. Never silently fall back, rewrite the configuration, guess another path, or reconstruct missing user content.

The terms used below are:

- **Bootstrap directory:** `~/.everyday-writer/`, which may contain `config.json` and legacy data.
- **Data root:** the resolved canonical home for `active-voice`, `voices/`, and, in connected mode, the writing workspace.
- **Connected mode:** locator schema, vault locator, and full workspace resolution all succeeded.
- **Default mode:** no `config.json`; existing EW behavior under the bootstrap directory.

## Managed-root path safety (both storage modes)

Before **any** managed read, enumeration, creation, update, copy, rename, or deletion beneath the resolved data root:

1. Establish the canonical managed root. In connected mode this is the already validated canonical workspace. In default mode, require `~/.everyday-writer/` to be a real directory rather than a symbolic link or Windows junction/reparse point, canonicalize it, and use that canonical path as the data root. A missing bootstrap root may be created only by first-run onboarding or an explicit lifecycle command, after canonicalizing its nearest existing parent and proving the lexical child is directly beneath that parent.
2. Build candidate paths only from validated components. Use `lstat`/reparse-point-aware checks on every existing component from the managed root to the target and reject symbolic links, junctions, and other filesystem redirects. Do not follow a redirect and then decide it happened to land inside the root.
3. Prove containment with path-aware relative semantics. For an existing target, canonicalize it and require a non-absolute relative path that is neither `..` nor begins with `..` as a complete segment. For a missing target, canonicalize its nearest existing parent, prove that parent is contained, and validate every still-missing lexical component before creation. Repeat the check for sibling temporary files and immediately before a destructive action.
4. Require expected types before opening anything: managed roots and collection/voice/topic/artifact directories are directories; `active-voice`, profiles, notes, samples, references, drafts, configuration, and temporary payloads are regular files. Reject special files and wrong-type paths.
5. Never accept a user-derived component containing a path separator or traversal segment. Filename normalization is not a substitute for containment.

These checks cover bootstrap and connected `active-voice`, `voices/`, every voice directory and child, the connected home note and `writing/` tree, migration sources and destinations, and voice deletion. The full component-by-component no-link law applies to every path inside an EW-managed workspace. An explicit path outside the managed workspace still requires ordinary safe-path validation, but it is not silently promoted into an EW/Obsidian graph root. A safe top-level root does not make an unchecked descendant safe.

---

## Canonical connected layout

```text
<Obsidian Vault>/
`-- Everyday Writer/
    |-- 00 - Everyday Writer Home.md
    |-- active-voice
    |-- voices/
    |   `-- <voice-slug>/
    |       |-- voice-profile.md
    |       |-- references/
    |       |-- samples/
    |       `-- drafts/              legacy-compatible fallback only
    `-- writing/
        `-- <Readable Topic Name>/
            |-- 00 - <Topic Name> Hub.md
            |-- 01 - Project Brief.md
            |-- 02 - Decision Log.md
            |-- 03 - Open Questions.md
            |-- 04 - Idea Box.md
            |-- Drafts/
            |-- Notes/
            |-- Sources/
            `-- Published/
```

Use existing folders and notes. Never replace an existing workspace wholesale.

### Canonical wiki-link targets

All EW-managed wiki links are **vault-root-relative** and include the fixed workspace prefix. Never emit a basename-only or note-relative EW link: duplicate filenames elsewhere in a vault make those targets ambiguous. Omit only the final `.md` extension.

- Voice profile: `[[Everyday Writer/voices/<voice-slug>/voice-profile|<Link-Safe Voice Alias> Voice Profile]]`
- Topic hub: `[[Everyday Writer/writing/<Normalized Topic Name>/00 - <Normalized Topic Name> Hub|<Link-Safe Topic Alias>]]`
- Artifact: `[[Everyday Writer/writing/<Topic Name>/<Artifact Folder>/YYYY-MM-DD - Descriptive Title|YYYY-MM-DD - Descriptive Title]]`
- Stable topic note: `[[Everyday Writer/writing/<Topic Name>/01 - Project Brief|Project Brief]]` (and the equivalent full path for the other stable notes)

Use the same canonical target everywhere: home indexes, YAML string values, visible body links, artifact-to-hub links, hub-to-artifact links, and core-note backlinks. Aliases may differ for readability; the target may not.

`00 - Everyday Writer Home.md` is the human-readable entrance. It links to every topic hub and voice profile using the canonical aliases above. Maintain this index after onboarding and after every voice create, import, or delete operation: add a missing exact canonical link after creation/import and remove only the exact canonical link for a confirmed deletion. Add the canonical topic-hub link when a topic is created. Preserve the user's prose, ordering, metadata, and unrelated sections; never rebuild the file wholesale. Because a directory plus an index is a multi-file publication, snapshot and preflight both sides, publish with the transaction/compensation rules below, and verify the final pair. A surviving object with a missing link is reported as `home index repair pending` and is repaired idempotently on retry; never claim the index is clean merely because the object mutation succeeded.

---

## Topic selection

Voice identity and writing topic are separate. A voice controls how EW writes. A topic project controls where related thinking and output live.

Before creating or saving writing in connected mode:

1. Use a topic the user explicitly names.
2. Otherwise scan existing directories under `writing/` and the topic hubs. Reuse one only when the request clearly matches it.
3. If two projects plausibly match, or no topic is clear, ask one short question and stop before writing files.
4. Do not invent a taxonomy or present an inferred topic as fact.

An explicitly named **new** topic may be created automatically before saving only when the user's request clearly says it is new or asks EW to create/use that named project (for example, "start a new topic called Attention"). Merely mentioning a subject is not permission to create a project. Scan existing folders and hubs first; if there is one exact normalized match, reuse it, and if there is any collision or plausible near-match, stop and ask. Automatic creation uses the same full canonical structure and no-overwrite rules as `/ew:workspace topic new <name>`.

Topic folder names are readable title-style names, not opaque slugs. Apply the filename normalization rules below. If a different existing folder or hub has the same case-insensitive normalized name, surface the conflict; do not auto-rename or merge it.

`/ew:workspace topic new <name>` creates the canonical topic structure only after scanning for same-name folders and hubs. `/ew:workspace topic list` reads existing hubs; it does not infer projects from loose files.

## Filename normalization

Apply these rules to topic names, generated artifact title components, readable voice-derived labels, and **every other user-derived managed filename or wiki-link target component** before adding EW's fixed prefixes or `.md` extension:

1. Remove ASCII control characters `U+0000`-`U+001F` and `U+007F`.
2. Replace `/` and `\` with `-`; remove `< > : " | ? * # ^ [ ]`. The last five are Obsidian link/tag/block syntax and may never survive in a managed filename or link target. A literal `|` is also forbidden because it changes the wiki-link alias boundary.
3. Collapse repeated whitespace, trim whitespace, and trim trailing periods and spaces.
4. Reject an empty result, `.` or `..`.
5. Reject Windows device basenames, case-insensitively, even when followed by an extension: `CON`, `PRN`, `AUX`, `NUL`, `COM1`-`COM9`, and `LPT1`-`LPT9`. Ask the user for another name; do not disguise a reserved name with punctuation.
6. Compare candidate names case-insensitively with existing siblings before writing. A stable note, voice, or topic collision is a hard stop. Only genuine new dated artifacts use the documented numeric suffix.

User-derived voice directory names are stricter: validate the final slug against exactly `[a-z0-9]+(?:-[a-z0-9]+)*` before using it as a path component or link target. Do not merely sanitize an `active-voice` pointer; an invalid stored pointer is corruption and is a hard stop.

## Link aliases and YAML string safety

Link targets use only fixed EW components plus normalized managed filename components. Display aliases are a separate, link-safe value: start from the readable label, remove ASCII controls and `# ^ [ ] |`, collapse whitespace, and trim it. If that becomes empty, use the already normalized filename component. Never place raw user text inside `[[target|alias]]`.

When a generated YAML value contains user-derived text or a wiki link, emit it as a double-quoted YAML scalar. Escape `\` as `\\`, `"` as `\"`, and line breaks as `\n`; remove all remaining control characters. Tags are generated only from normalized lower-kebab ASCII components. Never interpolate raw user text into YAML keys, unquoted scalars, tags, or link targets. Apply the same escaping when adding frontmatter to hubs, core notes, artifacts, voice indexes, and home-note entries.

---

## Core topic notes

Create stable notes once and preserve them thereafter:

- `00 - <Topic Name> Hub.md` - project entrance, current focus, and indexes of Drafts, Notes, Sources, and Published work.
- `01 - Project Brief.md` - purpose, audience, scope, and success criteria supplied by the user. Unknowns stay `[OPEN: ...]`.
- `02 - Decision Log.md` - dated decisions that materially affect the project.
- `03 - Open Questions.md` - unresolved questions and what each blocks.
- `04 - Idea Box.md` - low-friction captures linked to the note or artifact they created.

Do not fabricate brief fields merely to make the notes look complete.

---

## Saving finished writing

In connected mode, automatically save a **completed interactive writing artifact** after EW has run its final revision/checklist pass.

- Draft or in-progress piece -> `Drafts/`
- Working observation, outline, or durable thinking note -> `Notes/`
- Source material supplied or summarized by the user -> `Sources/`
- User-confirmed published/final piece -> `Published/`

Use:

```text
YYYY-MM-DD - Descriptive Title.md
YYYY-MM-DD - Descriptive Title - 2.md
YYYY-MM-DD - Descriptive Title - 3.md
```

Use the real local date. Derive a short readable title from a user-supplied title or the piece's actual subject, then sanitize that title with the filename normalization rules above before composing the filename. Never overwrite a same-named file. Scan siblings and choose the next numeric suffix for a genuine new artifact, then create the chosen file with an exclusive/no-replace primitive (`O_CREAT|O_EXCL`, `wx`, or the platform equivalent). If creation reports that the name appeared after the scan, rescan and choose the next genuine suffix; never replace the raced-in file. If a same-named file appears to be the same artifact with conflicting content, stop and ask instead of creating a disguised duplicate.

Treat artifact plus hub-link publication as one recoverable transaction. Before creating the artifact, snapshot/hash the hub and build its candidate index update. Create the complete artifact exclusively, verify its bytes and canonical backlink, then compare-and-swap the hub and verify the forward link. If hub publication fails, remove the just-created artifact only when it still has the exact verified bytes and no other note points to it; otherwise leave it intact and report `topic index repair pending`. A retry must recognize that exact orphan and add only its missing canonical link, not create a numbered duplicate. Never report a fully indexed artifact until both links are re-read and verified.

An explicit user path always wins. Write only to that path, after normal path-safety and conflict checks, and do not also auto-save a vault copy.

Default mode keeps existing behavior: interactive output is returned in chat, and a requested file with no path uses the resolved voice's `drafts/` fallback.

**Embedded mode never persists output automatically**, even when a vault is connected. Return only the text requested by the caller. Persist only when the caller explicitly supplies a path and asks for a file write.

---

## Artifact frontmatter and links

Every connected-mode artifact gets YAML frontmatter:

```yaml
---
type: draft
status: in-progress
topic: "[[Everyday Writer/writing/<Normalized Topic Name>/00 - <Normalized Topic Name> Hub|<Link-Safe Topic Alias>]]"
voice: "[[Everyday Writer/voices/<voice-slug>/voice-profile|<Link-Safe Voice Alias> Voice Profile]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - ew/writing
  - ew/topic
  - ew/topic/<lower-kebab-topic> # include only when the derived component is non-empty ASCII
---
```

Set `type` to `draft`, `note`, `source`, or `published` and choose the matching status honestly. Preserve existing frontmatter when updating; add only missing EW fields unless the user asks for a metadata change.

The artifact body must contain a visible canonical link such as `Topic: [[Everyday Writer/writing/<Normalized Topic Name>/00 - <Normalized Topic Name> Hub|<Link-Safe Topic Alias>]]`. The hub must index the artifact under its matching section with the canonical target, for example `[[Everyday Writer/writing/<Normalized Topic Name>/Drafts/2026-09-20 - Descriptive Title|2026-09-20 - Descriptive Title]]`. These two real, vault-root-correct links create useful Obsidian backlinks without basename ambiguity. Do not add fake backlink fields, link every noun, or require manually mirrored links for unrelated graph edges.

Use lower-kebab hierarchical tags such as `ew/writing`, `ew/topic/critical-thinking`, and `ew/type/draft`. If an all-Unicode topic name yields no non-empty ASCII lower-kebab component, omit only the derived `ew/topic/<component>` subtag and retain the base `ew/topic` tag; never emit `ew/topic/`. Tags group notes; wiki links express relationships.

---

## Safe update behavior

Before writing into an existing workspace, scan relevant filenames, frontmatter, headings, and current hub links.

- Preserve user-written prose, metadata, links, and note names.
- Append or merge only under the relevant heading.
- Add missing index links; do not duplicate existing ones.
- Never delete, rename, merge, or overwrite notes automatically.
- If new content contradicts an existing note or two notes could be the same project/artifact, stop and surface the file names and conflict.
- Keep stable note names stable. Ask before a rename because it changes graph history.
- Never write outside the canonical vault/workspace or an explicit user-selected path. Validate containment with path-aware relative checks and reject nested symlink/junction traversal as defined in storage resolution.
- Create every new managed file and directory with exclusive/no-replace semantics after the collision scan. A successful earlier scan is not permission to overwrite a path created concurrently.
- For every read-modify-write of an existing hub, home note, index, log, or entity note, retain the exact bytes or a cryptographic content hash from the read. Immediately before the atomic replacement, re-open the validated regular file and compare it with that snapshot/hash. If it changed, stop and report a concurrent edit; do not merge from stale content or replace it. Write the proposed complete content to a uniquely named, exclusively created sibling temporary file, close it, perform the final comparison, then atomically replace only the unchanged target.

Migration is not an update. It is governed by `skills/workspace/SKILL.md` and must use copy -> verify -> switch while leaving the source intact.
