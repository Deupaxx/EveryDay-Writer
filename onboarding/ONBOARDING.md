# EW Onboarding — Master Router

---

## PURPOSE

This file runs whenever a voice needs building: the first time a user invokes `/ew` with no voices at all, and every time they add one with `/ew:voice new`.

Its output is a completed voice fingerprint written under the data root resolved by `core/obsidian-workspace.md` (local filesystem mode) or stored as a named Claude.ai memory (Cowork mode).

EW supports any number of voices — the user's own, plus one per ghostwriting client. This file routes to the right flow for the voice being built.

---

## ENVIRONMENT DETECTION

Determine which environment you are running in before proceeding.

**Claude Code indicators:**
- The user invoked `/ew` via the Skill tool in a terminal or IDE session
- File system access is available (you can read and write files)
- There is no persistent memory system active between sessions

**Claude.ai Cowork indicators:**
- The user is in a Claude.ai conversation with memory enabled
- Prior conversation context and stored memories may be available
- No file system access

**If Claude Code → go to WHOSE VOICE below.**
**If Claude.ai Cowork → read `onboarding/claude-ai-cowork-mode.md` and follow it.**

**If unclear:** Stop and ask whether this environment has local filesystem access or Claude.ai persistent memory. Do not default to local mode, do not prompt for a vault, and do not create filesystem or memory state until the environment is unambiguous.

---

## OPTIONAL LOCAL STORAGE - FIRST RUN ONLY

In Claude Code or another local filesystem environment, read `core/obsidian-workspace.md` before creating any voice files.

When there are no voices and `~/.everyday-writer/config.json` is absent, ask this **before requesting writing samples**:

> "Would you like EW to keep your voice profile and writing projects in an existing Obsidian vault? Paste the vault's absolute folder path, or say `no` to use EW's default private folder."

- If the user says no, use the default data root and continue.
- If the user supplies a path, route through `/ew:workspace connect <vault>`. It must be an existing directory containing `.obsidian/`; validate it before writing anything.
- If the path is invalid or ambiguous, stop and ask for a corrected path. Do not search for a vault, assume the current directory, or create `.obsidian/`.

Do not ask this question when adding another voice, when valid storage configuration already exists, or in memory-only Cowork mode.

After the choice, resolve the data root and run `core/voice-profile.md` again from the newly resolved storage. Connecting an existing EW workspace may reveal voices that were not visible before connection. If a complete profile resolves, onboarding is already satisfied: skip WHOSE VOICE and every new-profile question, report the resolved active voice, and return to the requested EW work. If only an incomplete profile resolves, resume that profile's onboarding; if no profile resolves, continue to WHOSE VOICE. Never retain the pre-connect "no voices" result across this boundary.

---

## WHOSE VOICE

Ask before running any flow. The answer changes which questions are askable at all.

> "Whose voice is this?
>
> 1. **Mine** — your own writing voice.
> 2. **Someone else's** — a ghostwriting client, or any voice that isn't yours."

**If Mine → read `onboarding/claude-code-mode.md` and follow it.** Seven steps, freewrite included.

**If Someone else's → read `onboarding/subject-mode.md` and follow it.** Sample analysis only. The freewrite is skipped because it cannot be obtained, and confirmation is recorded as second-hand.

**On the very first run**, when no voices exist at all, skip the question and run `claude-code-mode.md`. The first voice someone sets up is their own. They can add clients afterwards with `/ew:voice new`.

---

## WHAT A COMPLETE VOICE PROFILE CONTAINS

Onboarding is complete only when all of the following fields are populated **and the stored profile says `Completed: Yes`**. A partial profile never unlocks writing sub-skills; keep it incomplete and resume onboarding.

**Required fields:**
- [ ] 3–5 voice adjectives the user confirmed (not suggested by Claude without confirmation)
- [ ] Primary platforms the user publishes on
- [ ] Writing goals (what they want to improve, build, or achieve)
- [ ] Tone position: warm ↔ clinical
- [ ] Tone position: confident ↔ hedged
- [ ] Tone position: serious ↔ playful
- [ ] Vocabulary the user favors or actively avoids
- [ ] At least one rhythm pattern observed (long/complex sentences, punchy short forms, mixed)

**Optional but high-value:**
- Signature structural patterns unique to this writer
- Topics or angles the writer returns to repeatedly
- The one type of writing they hate producing (this shapes what EW avoids pushing them toward)

---

## PROFILE STORAGE

**Claude Code:** Resolve `<data-root>` through `core/obsidian-workspace.md`. A new voice is published as one transaction, never assembled at its final path. Create a uniquely named sibling staging directory beneath the validated `voices/` parent (for example `.ew-stage-<slug>-<nonce>`), exclusively. Build the complete tree there: populated `voice-profile.md`, `references/`, `drafts/`, `samples/`, and every sample file. Verify expected types, profile identity/slug, `Completed: Yes`, sample count/content, redirect rejection, and containment. Recheck that no case-insensitive final slug exists, then publish with a single atomic no-replace directory rename to `voices/<slug>/`. If the platform cannot guarantee no-replace publication, use an exclusive destination-claim primitive and stop rather than replacing anything. A `.ew-stage-*` directory is temporary state, is ignored by voice enumeration and migration as a recognized temporary entry, and is never a voice.

If a final voice directory already exists, do not deadlock onboarding by treating every incomplete tree as a completed voice. A valid regular profile whose `Completed:` is not `Yes` is a resumable legacy profile only after its stored slug/type/identity match the requested voice; snapshot/hash every existing file, write missing samples or directories exclusively, and update the profile with compare-and-swap. Any ambiguous identity, wrong type, redirect, unexpected file, or changed snapshot requires an explicit `/ew:voice repair <slug>` flow and a fresh inventory. Repair may fill missing canonical components and finish a verified incomplete profile; it never overwrites conflicting content. Subject mode follows this identical staging, resume, and repair rule.

Publishing the voice, selecting it, and adding its home-note link are separate recoverable transactions. After voice publication, mutate `active-voice` and the connected home note using the compare-and-swap rules in `skills/voice/SKILL.md`. If either later step fails, keep the verified published voice, report the exact pending pointer/index repair, and let a retry idempotently add only the missing state. Never claim onboarding is fully indexed or active until re-resolution verifies both requested outcomes.

Never write a profile into `core/`. That directory is a cache the plugin replaces on update, and it is tracked by a public git repository. `core/voice-profile.md` is the resolver that finds voices — not a place to store one.

At minimum, populate these fields:

- Voice name, slug, and type (Self or Subject)
- `Confirmed by`
- Confirmed voice adjectives
- Primary platforms
- Writing goals
- Tone axes
- Vocabulary favored and avoided
- Rhythm patterns
- Signature patterns, if identified
- Avoid pushing toward
- Profile status, with `Completed: Yes`

**Claude.ai Cowork:** Store as a named memory titled "EW Voice Profile — [Name]" containing the same fields, plus a separate "EW Active Voice" memory holding the active name. Tag both for retrieval on EW skill invocation.

---

## ONBOARDING TONE

The onboarding conversation is direct, not bureaucratic. Tell the user what you're doing and why, then do it. No lengthy explanations. No "this will only take a moment!" warmth padding.

The user chose a writing system built on the A-Player standard. Match that energy from the first exchange.
