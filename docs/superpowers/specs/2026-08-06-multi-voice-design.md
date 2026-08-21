# Multi-Voice Profiles — Design

**Date:** 2026-08-06
**Status:** Implemented in v0.3.0; kept as historical design context
**Target version:** 0.3.0

---

## Problem

Before v0.3.0, Everyday Writer supported exactly one voice. `core/voice-profile.md` held a single writer's fingerprint, and all 13 writing sub-skills read it unconditionally.

The writer needs more than one identity. Writing as themselves is one voice. Ghostwriting for a client is another, with its own fingerprint, its own brand documents, and its own output. Today the only way to switch is to overwrite the profile and lose the previous one.

Two failure modes make this worse than a missing feature:

1. **Contamination.** Before v0.3.0, the root `references/` folder behaved like a single global drop-zone. A client's brand guidelines could sit in the same folder as the writer's own, and both were read on every invocation.
2. **Data loss and exposure.** `core/` lives inside the plugin directory. When EW is installed from the marketplace, that directory is a cache that is replaced on update. Profiles written there are destroyed on upgrade. In this repo, which is public and published to npm, a client profile written to `core/` is also a commit away from being published.

## Goal

Any number of named voices. Each is a self-contained workspace. Switching is one command and persists. Creating a voice for someone else is a first-class flow, not a workaround.

## Non-goals

- Merging or blending two voices into one piece of writing.
- Per-platform voice variants within a single identity (the profile's platform fields already cover this).
- Syncing voices between machines.
- Migrating the plugin off its file-based skill architecture.

---

## Storage

Voices live outside the plugin directory, under the user's home:

```
~/.everyday-writer/                 Windows: %USERPROFILE%\.everyday-writer\
  active-voice                      one line: the active voice slug
  voices/
    writer-main/
      voice-profile.md
      references/                   brand docs, style guides, constraints
      drafts/                       file-mode output
      samples/                      writing the profile was built from
    client-acme/
      voice-profile.md
      references/
      drafts/
      samples/
```

This location is the only one that satisfies both constraints: it survives plugin updates, and client material never enters a public repository.

**Slugs** are lowercase kebab-case and match their directory name, consistent with the skill naming rule the repo already enforces. Anything else is rejected at creation with the reason stated.

### Precedence of stored samples

Stored `samples/` **do not** outrank the voice profile.

Anti-AI Rules §0.1 gives precedence to a sample pasted in the current conversation. Extending that to samples sitting on disk would mean every invocation silently overrides the fingerprint that onboarding worked to establish. Stored samples exist for recalibration and for the writer to re-read. They are not loaded into the dependency chain.

This must be stated in the resolver and in §0.1's surrounding text so the distinction is not lost.

---

## Resolution: how the 13 writing sub-skills and voice management skill find the active voice

This is the load-bearing decision.

Every writing sub-skill and the voice management skill hardcode `core/voice-profile.md` in their dependency-chain blocks, and `bin/check.js` raises a hard error if any `skills/*/SKILL.md` fails to mention that filename. Changing the resolved voice path in every skill would create many chances to introduce the silent-failure class of bug that CLAUDE.md exists to prevent.

Instead, **`core/voice-profile.md` stops being a profile and becomes a resolver.** Its content is replaced with a short instruction file that redirects to the active voice. The template it currently holds moves to `core/voice-profile-template.md`.

Consequences:

- Sub-skill files keep the shared resolver path.
- Voice-selection logic exists in exactly one place.
- The inline override works on every sub-skill for free, because every sub-skill already reads the resolver.

### Resolution algorithm

The resolver instructs the reader to, in order:

1. **Check for an inline override in the user's request** — "as writer-main", "in client-acme's voice", "write this as <name>". If present, use that voice for this invocation only. Do not modify `active-voice`.
2. Otherwise read `~/.everyday-writer/active-voice` and trim it to get the slug.
3. Read `~/.everyday-writer/voices/<slug>/voice-profile.md`. That file is the voice profile, and everything downstream treats it as `core/voice-profile.md` was previously treated.
4. Load `~/.everyday-writer/voices/<slug>/references/` as the active voice references folder.

### Edge cases

| Condition | Behavior |
|---|---|
| `~/.everyday-writer/` does not exist | First run. Route to onboarding, which creates the tree. |
| `voices/` empty | Route to onboarding. |
| Exactly one voice, no `active-voice` file | Set it to that voice and continue. Do not prompt. |
| Multiple voices, no `active-voice` | Stop. List the voices and ask which to activate. |
| `active-voice` names a nonexistent voice | Stop. Report the broken pointer, list what exists, ask. |
| Named override matches no voice | **Stop. List available voices and ask.** Never guess and never invent a voice — writing in a fabricated identity is the §0.2 failure mode applied to voice. |
| Resolved profile has `Completed: No` | Run onboarding for that voice before writing. |

---

## The `/ew:voice` skill

New file: `skills/voice/SKILL.md`, frontmatter `name: voice`.

| Command | Behavior |
|---|---|
| `/ew:voice` | List all voices. Mark the active one. Show each voice's type (self/subject) and last-updated date. |
| `/ew:voice <name>` | Switch the active voice. Writes `active-voice`. Confirms in one line. |
| `/ew:voice new` | Create a voice. Asks whose voice it is, then runs the matching onboarding flow. |
| `/ew:voice import <path>` | Install an existing filled-in `voice-profile.md` as a named voice. The upgrade path from 0.2.0. |
| `/ew:voice edit` | Recalibrate the active profile. Appends to its RECALIBRATION LOG table. |
| `/ew:voice delete <name>` | Delete a voice. Requires explicit confirmation naming the voice. Refuses to delete the currently active voice — the user must switch away first. |

The skill carries the full three-file dependency chain. This is not there to satisfy `check.js`. Building a profile for another person from their samples is precisely where a model invents biography, opinions, and motivations that were never in evidence. **§0.2 is the governing rule for the subject-voice flow**, and the skill must read it.

---

## Creating a voice: two modes

`/ew:voice new` asks whose voice this is before doing anything else.

### Mode A — "Mine"

Runs the existing `onboarding/claude-code-mode.md` flow unchanged, all seven steps including the freewrite. The only difference is the destination: the profile is written to `voices/<slug>/voice-profile.md` rather than `core/voice-profile.md`.

### Mode B — "Someone else's"

A new flow, `onboarding/subject-mode.md`, for building a profile from a person who is not in the conversation.

1. Ask for the voice name and derive a slug.
2. Ask for 3–5 pieces of the subject's published writing. More is better here than in self-mode, because there is no freewrite to fall back on.
3. Run the same sample analysis as Step 2 of the self flow.
4. **Skip the freewrite.** It is not obtainable. Record `Freewrite basis: None — subject not present.`
5. Propose voice adjectives with evidence, and press once, exactly as self-mode does. The ghostwriter confirms them as a proxy.
6. Ask the ghostwriter for the subject's platforms and goals, flagged as second-hand.
7. Save the supplied samples verbatim to `voices/<slug>/samples/` with a one-line provenance header. Tell the user this happened; do not prompt for permission, and do not do it silently.
8. Write the profile with the subject fields set.

**Fabrication discipline for Mode B.** Any field the samples do not support is left as a visible `[bracket]`, per §0.2. The flow must not infer a subject's goals, opinions, or biography from their prose. What the samples show is how they write, not what they want.

### New profile fields

Added to `core/voice-profile-template.md`:

```
**Voice slug:** <slug>
**Voice type:** Self | Subject
**Confirmed by:** the writer | ghostwriter, not subject
**Freewrite basis:** Included | None — subject not present | None — declined
```

`Confirmed by` matters. Without it, a profile built from a ghostwriter's reading of someone's work is indistinguishable from one that person validated themselves.

---

## Changes to existing files

### `SKILL.md`

- **STEP 1** checks the resolved active voice's profile for `Completed: Yes`, not `core/voice-profile.md` directly.
- **STEP 3** scans the active voice's `references/`.
- **STEP 4** dependency sequence keeps its current wording. Item 3 still reads `core/voice-profile.md`; it now resolves.
- **Dispatch map** gains a row for voice management requests ("switch voice", "write as X", "add a client").
- **Direct invocation list** gains `/ew:voice`.
- New short **MULTI-VOICE** section documenting the active voice, the inline override, and the voice tag.

### `references/DROP-MD-FILES-HERE.md`

Rewritten to redirect users to `~/.everyday-writer/voices/<active>/references/`.

The plugin's `references/` directory is **no longer scanned**. This is the clean-room property: a client's brand documents cannot reach the writer's own work, and vice versa. It also reflects reality — when EW is installed from the marketplace, that folder lives in a cache directory users cannot reliably drop files into.

### `drafts/`

File-mode output with no explicit path goes to the active voice's `drafts/`. The repo's existing `drafts/` folder is untracked and gitignored; it stays as-is and is not used by the new flow.

### `bin/check.js`

One added assertion: `core/voice-profile-template.md` must exist. Everything else passes unchanged, which is the point of the resolver approach.

### Cowork port

`cowork/` targets Claude.ai Projects, which has memory and no filesystem. The same model maps onto memories:

- Each voice is a memory titled `EW Voice Profile — <name>`.
- One memory titled `EW Active Voice` holds the active name.
- New file `cowork/ew-voice.md` mirroring the `/ew:voice` skill.
- `cowork/ew-master.md` updated in lockstep, per the CLAUDE.md rule that cowork files are copies and nothing syncs them automatically.
- `onboarding/claude-ai-cowork-mode.md` updated for named voices.

### Versioning

0.2.0 → 0.3.0 in `package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and the `metadata.version` field of every skill's frontmatter — `check.js` warns on drift.

### Documentation

README gains a multi-voice section and a 0.2.0 → 0.3.0 upgrade note pointing at `/ew:voice import`. CLAUDE.md gains the resolver architecture, since "voice-profile.md is not a profile" is exactly the kind of non-obvious fact that file exists to record.

---

## Migration from 0.2.0

**No automatic migration.** An installed plugin's `core/` is replaced on update, so any profile living there is already gone by the time new code could run. Pretending to migrate it would be theater.

The honest path is `/ew:voice import <path>`, which takes any existing filled-in `voice-profile.md` and installs it under a chosen name. Documented in the README upgrade note.

First run with no `~/.everyday-writer/` routes to onboarding, which is the correct behavior for a genuinely new user and an acceptable one for an upgrader who did not keep a copy.

---

## The voice tag

Interactive-mode drafts are preceded by a single line naming the voice:

```
Voice: client-acme

[draft follows]
```

Not a prompt and not a gate — the user explicitly rejected per-write confirmation. It is a label. Suppressed in embedded mode, where the caller wants prose and nothing else.

Rationale: the expensive failure in a multi-voice system is publishing in the wrong one. A client post in the writer's voice damages the client relationship; the reverse damages the writer's own brand. One line of output is cheap insurance against a mistake that is otherwise invisible until after publication.

**This decision was made without explicit approval and is the one item in this spec open to veto.** Removing it is a one-line change to `SKILL.md`.

---

## Risks

**Indirection cost.** Every invocation now reads two files to get a profile instead of one. Acceptable — it is a single extra read, and it buys a single point of change.

**Silent misdirection.** If `active-voice` is stale or wrong, output is fluent and wrong-voiced, which is harder to notice than an error. Mitigated by the voice tag and by the resolver stopping rather than guessing on any unresolvable pointer.

**Cowork drift.** Nothing keeps `cowork/` in sync with `core/`. This change touches both. The CLAUDE.md rule is the only guard, and it depends on the author remembering.

**Subject-profile fabrication.** The highest-risk new surface. Mitigated by the §0.2 dependency in the voice skill, the bracket discipline in Mode B, and the `Confirmed by` field.

---

## Acceptance criteria

1. `npm run check` passes with zero errors and zero warnings.
2. No existing `skills/*/SKILL.md` file is modified except by the version bump. `skills/voice/SKILL.md` is the only addition.
3. Two voices can coexist; switching between them changes which profile a sub-skill reads.
4. `/ew:linkedin as <other>` writes in the named voice and leaves `active-voice` unchanged.
5. An override naming an unknown voice stops and lists options rather than guessing.
6. A voice's `references/` is read when that voice is active and not when it is not.
7. The plugin's own `references/` folder is not scanned.
8. A subject profile records `Confirmed by: ghostwriter, not subject` and `Freewrite basis: None — subject not present.`
9. `/ew:voice delete` refuses to delete the active voice.
10. Nothing under `~/.everyday-writer/` is ever written into the repository, and `git status` stays clean through a full create/switch/write cycle.
