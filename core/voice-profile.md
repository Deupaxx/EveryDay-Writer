# EW — Voice Resolver

> **This file is not a voice profile.** It is the pointer that finds one.
>
> Every sub-skill's dependency chain names `core/voice-profile.md`. That name is kept so the
> chain stays intact, but the profile itself lives outside the plugin directory, one per voice.
> Resolve the active voice here, then read that voice's profile and treat it as the fingerprint.

---

## WHY THE PROFILE IS NOT IN THIS DIRECTORY

The plugin directory is a cache. When EW is installed from the marketplace, an update replaces it wholesale — anything written here is destroyed. This repository is also public and published to npm, so a client's voice profile stored here would be one commit away from publication.

Voices live under the resolved external data root instead. Plugin updates cannot touch them and the plugin repository cannot see them.

---

## RESOLVE THE DATA ROOT FIRST

Read `core/obsidian-workspace.md` and resolve the data root before touching a profile, reference, sample, draft, or `active-voice` pointer.

- With no `~/.everyday-writer/config.json`, the data root is `~/.everyday-writer/`.
- Only with a schema-valid locator, resolved vault locator, and fully resolved workspace is the data root `<canonical vault>/<workspaceFolder>`.
- If any layer fails, stop and ask the user to repair with the workspace skill. Do not fall back to legacy storage, search for another vault, or rewrite configuration. The workspace lifecycle commands distinguish locator validity from full workspace resolution so they can repair missing structure without running this voice resolver.

All paths below are relative to `<data-root>`:

```text
<data-root>/
  active-voice                      one line: the active voice slug
  voices/
    <slug>/
      voice-profile.md              the fingerprint — this is what you read
      references/                   this voice's drop-zone
      drafts/                       file-mode output for this voice
      samples/                      writing the profile was built from
```

Slugs are lowercase kebab-case, match exactly `[a-z0-9]+(?:-[a-z0-9]+)*`, and match their directory name.

---

## RESOLUTION — RUN THIS EVERY INVOCATION

**Step 1 — Check for an inline override.**

If the user's request names a voice for this piece of writing — "as writer-main", "in client-acme's voice", "write this one as <name>" — that voice wins **for this invocation only**.

Do not write `active-voice`. Do not treat the override as a switch. The next invocation goes back to the active voice.

Before using an inline-override slug in any path, validate it against exactly `[a-z0-9]+(?:-[a-z0-9]+)*`. An invalid value is not a near-match: stop before path access.

Only after validation, safely test whether the named voice exists. If it does not, **stop**. List the safely enumerated voices that do exist and ask which was meant. Never guess at a near-match and never proceed in a voice you invented — writing under a fabricated identity is Section 0.2 of `core/anti-ai-rules.md` applied to the voice itself.

**Step 2 — Otherwise, read the active voice.**

Read `<data-root>/active-voice` only after applying the managed-root path safety procedure. Trim whitespace, then validate the entire value against exactly `[a-z0-9]+(?:-[a-z0-9]+)*` **before constructing or probing any descendant path from it**. Reject embedded separators, `.`, `..`, absolute paths, controls, mixed case, and every other invalid value; report a broken pointer and stop.

**Step 3 — Read the profile.**

Resolve `<data-root>/voices/<slug>/voice-profile.md` only after the slug passes validation. Apply canonical containment, `lstat`/reparse-point checks to every existing component, and regular-file/directory type checks from `voices/` through the profile. Reject symlinks and junctions even when their canonical destination remains inside the data root. **This file is the voice fingerprint.** Everything downstream in the dependency chain treats it exactly as it would have treated a profile stored here.

If its `Completed:` field is not `Yes`, stop and run onboarding for that voice before writing.

**Step 4 — Load that voice's references.**

Read every regular `.md` file in `<data-root>/voices/<slug>/references/` only after the same component-by-component redirect rejection and canonical containment proof. Never follow a linked reference file or directory.

These are that voice's reference material and no other voice's. The plugin's own `references/` folder is **not** scanned — see the clean-room rule below.

---

## EDGE CASES

| Condition | What to do |
|---|---|
| No configuration and the default data root does not exist | First run. Route to `onboarding/ONBOARDING.md`, which offers optional Obsidian storage before creating the tree. |
| Configuration schema is invalid, its vault is unavailable, or its workspace is not fully resolved | Stop before profile resolution. Report the exact layer that failed and offer `/ew:workspace connect <vault>`, `/ew:workspace migrate <vault>`, or `/ew:workspace disconnect`. |
| `voices/` exists but is empty | Route to onboarding. |
| Exactly one voice, no `active-voice` file | After validating the enumerated directory slug, profile type, redirects, and canonical containment, create `active-voice` exclusively (`wx`/`O_EXCL`) and continue. If it appears concurrently, re-read and validate it: continue only when it contains the same slug; otherwise stop. Never replace a pointer based on an earlier absence scan. |
| Two or more voices, no `active-voice` file | Stop. List them and ask which to activate. |
| `active-voice` names a voice that does not exist | Stop. Report the broken pointer, list what exists, ask. Do not silently pick one. |
| Resolved profile's `Completed:` field is missing or not exactly `Yes` | Run onboarding for that voice first. |
| Inline override names an unknown voice | Stop and ask. See Step 1. |

The pattern in every failing case is the same: **stop and ask, never guess.** Wrong-voice output is fluent and plausible, which makes it far harder to catch than an error message.

---

## THE CLEAN-ROOM RULE

A voice's `references/` folder is read only when that voice is active or named in an override.

The plugin's own `references/` directory is no longer a drop-zone and is not scanned. This is deliberate: a ghostwriting client's brand guidelines must not be able to reach the user's own writing, and the user's material must not leak into a client's. A single shared folder cannot give that guarantee.

---

## STORED SAMPLES DO NOT OVERRIDE THE PROFILE

Section 0.1 of `core/anti-ai-rules.md` gives precedence to a sample **pasted in the current conversation**. That is a live signal about what the writer wants right now.

Files sitting in a voice's `samples/` folder are not that signal. They are provenance — the evidence the profile was built from, kept for recalibration. Do not load them into the dependency chain, and do not treat them as a standing override. Extending §0.1 to disk would mean every invocation quietly overrides the fingerprint onboarding worked to establish.

---

## WHERE DRAFTS GO

When default-mode EW writes a draft to disk and the user has not given a path, write it to `<data-root>/voices/<slug>/drafts/` for the voice in effect.

In connected mode, completed interactive writing follows the topic workspace and persistence rules in `core/obsidian-workspace.md`. The per-voice `drafts/` directory remains only as a legacy-compatible fallback; do not use it to bypass topic routing.

The `drafts/` folder inside the plugin directory is not used by this flow.

---

## THE VOICE TAG

In **interactive mode**, print the voice on one line above the draft:

```
Voice: client-acme

[draft follows]
```

Not a prompt and not a gate — do not wait for confirmation. It is a label.

**Suppress it in embedded mode**, where another skill or agent is calling EW for prose and wants no ceremony.

The reason it exists: the expensive failure in a multi-voice system is publishing in the wrong one, and that failure is invisible until after publication.

---

## MANAGING VOICES

Creating, switching, importing, editing, and deleting voices is handled by `skills/voice/SKILL.md` (`/ew:voice`). Do not edit `active-voice` or the voice tree by hand from inside another skill — route the user there.

---

## THE BLANK TEMPLATE

The empty fingerprint every new voice is stamped from lives at `core/voice-profile-template.md`. Onboarding copies it into the voice directory and fills it in. It is never filled in place.
