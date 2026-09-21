# Everyday Writer Distribution

Everyday Writer is a skill system, not an app. Distribution should make the existing skill easier to install without changing the core shape: root dispatcher, core rules, onboarding, voice resolver, sub-skills, cowork files, and npm installer.

## A. Developer Install

Use this if you are comfortable with a terminal, VS Code, Codex local skills, Claude Code, or npm.

```bash
npx everyday-writer install
```

Optionally connect a new or empty EW workspace in an existing Obsidian vault:

```bash
npx everyday-writer install --vault "/absolute/path/to/My Vault"
```

The installer validates and canonicalizes the path, rejects redirected vault, `.obsidian`, bootstrap, and workspace paths, requires an existing ordinary `.obsidian/` directory, fixes the workspace at the direct child `Everyday Writer/`, then publishes `~/.everyday-writer/config.json` with an exclusive same-directory no-clobber operation. It asks about this only when stdin and stdout are interactive terminals and bootstrap storage is safe and empty. Choosing yes requires a non-blank path and re-prompts on blank input. CI, pipes, package managers, broken configuration, and bootstrap data never prompt or read stdin.

```json
{
  "version": 1,
  "storage": {
    "mode": "obsidian",
    "vaultPath": "/canonical/absolute/path/to/My Vault",
    "workspaceFolder": "Everyday Writer"
  }
}
```

This installs EW into:

```text
~/.codex/skills/everyday-writer/
```

Without a connected vault, your voice profiles live separately in:

```text
~/.everyday-writer/
```

With a connection, the canonical data root is `<vault>/Everyday Writer/`; the bootstrap directory keeps only its locator. The installer creates only a new or empty workspace. Existing bootstrap voices, a populated destination, malformed configuration, or a different configured vault are hard stops only for explicit `--vault` storage mutation. A plain install/update still transactionally installs the package, preserves the exact configuration and user data bytes, emits a storage warning, and lists `$ew:workspace ...` recovery commands for Codex or `/ew:workspace ...` for Claude. Migration discloses sync/share risk, copies the complete selected managed tree, verifies it, and never silently unions or deletes either side.

Reinstalling or updating EW does not overwrite user storage. Package updates build and validate a complete sibling staging tree, serialize publication with a token/PID/creation-time/target/operation lock, and publish the package before any vault/configuration mutation. Publication is transactional and recoverable rather than whole-tree atomic: EW claims an absent destination directory exclusively, copies staged contents, and writes the ownership receipt last. A failed partial claim is quarantined and a single verified prior backup is restored; ambiguous backups, redirects, malformed locks, and uncertain owner state stop with exact manual recovery paths. Locks are never broken merely because they are old. A demonstrably dead owner's lock is identity-and-byte rechecked and quarantined no-replace before package recovery continues.

A strongly verified pre-receipt EW tree is moved to a uniquely named sibling quarantine and kept so old in-plugin profiles or private files can be reviewed and imported manually; uncertain trees are refused. Every verified uninstall likewise disables the install by atomically moving it to a unique quarantine and keeps that recoverable tree. The command prints the exact recovery and manual-deletion path. Configuration, external voices, and vault content remain outside the package transaction. For an npx install, uninstall with `npx everyday-writer uninstall` (Codex) or `npx everyday-writer uninstall:claude` (Claude Code); use the bare commands only after a global npm install.

Fresh vault setup is serialized by a separate bootstrap lock across revalidation, workspace creation, and no-clobber config publication. If setup fails, EW removes only files it created whose bytes are still unchanged and directories it created that remain empty. Output distinguishes package success from storage connection and lists workspace paths created by that run.

## B. Claude App Custom Skill Install

This is the no-code path for people who do not want to use a terminal.

First, someone technical generates the ZIP:

```bash
npm run package:claude-skill
```

That creates:

```text
dist/everyday-writer-claude-skill.zip
```

Then the beginner install flow is:

1. Download or receive `everyday-writer-claude-skill.zip`.
2. Open Claude.
3. Go to **Customize > Skills**.
4. Upload the ZIP.
5. Enable **Everyday Writer**.
6. Start with `/ew`, or just ask Claude for writing help.

The ZIP contains the same EW instructions: the root dispatcher as `skill.md`, core rules including `core/obsidian-workspace.md`, onboarding, voice resolver, sub-skills including `skills/workspace/SKILL.md`, the reference-folder redirect note, and supporting assets. It does not contain local voice profiles, tests, development files, private resources, `node_modules`, `.git`, or `dist`. Filesystem workspace behavior applies only where the runtime provides local file access; Claude.ai Cowork remains memory-based and never claims to have written an Obsidian vault.

## Storage and second-brain behavior

The optional connected layout is `<vault>/Everyday Writer/`, containing a home note, active voice pointer, Markdown voice trees, and `writing/<Readable Topic Name>/` projects. Each topic has a stable hub, project brief, decision log, open questions, idea box, and `Drafts`, `Notes`, `Sources`, and `Published` folders. Artifacts use `YYYY-MM-DD - Descriptive Title.md` names with numbered collision suffixes. Full vault-root wiki links connect artifacts and hubs so Obsidian derives genuine backlinks.

The locator is intentionally outside the vault because EW must resolve it before it knows where the vault is. If the configured vault is disconnected, missing, malformed, or unsafe, normal writing stops and points to workspace status/recovery. It does not fall back to a second shadow profile. Because vaults may be synchronized or shared, connection and migration are explicit privacy choices.

Portable first-run onboarding remains the universal connection path for marketplace and uploaded installs that never execute the npm installer. Cowork skips all filesystem questions.

## C. OpenAI/Codex Install

Current repo support is local-skill based:

- Root `SKILL.md` is the EW dispatcher.
- `agents/openai.yaml` provides Codex UI metadata.
- `npx everyday-writer install` copies EW into `~/.codex/skills/everyday-writer/`.
- Codex users invoke EW with `$ew` or a direct sub-skill like `$ew:linkedin`.

OpenAI/Codex native skill or plugin installation may vary by environment. Where an app supports uploading or installing skills directly, the target user experience should be app-native: pick Everyday Writer, install or upload it, enable it, then start writing. Until that path is officially available in the user's environment, the supported route remains the local npm install above.

Do not describe an app-store or one-click OpenAI install as available unless the target environment actually supports it.
