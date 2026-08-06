# EW Onboarding — Master Router

---

## PURPOSE

This file runs whenever a voice needs building: the first time a user invokes `/ew` with no voices at all, and every time they add one with `/ew:voice new`.

Its output is a completed voice fingerprint written to `~/.everyday-writer/voices/<slug>/voice-profile.md` (Claude Code) or stored as a named Claude.ai memory (Cowork mode).

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

**If unclear:** Default to Claude Code mode. The active onboarding process works in both environments; the passive (memory inference) mode only works in Claude.ai with memory enabled. Defaulting to active is always safe.

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

Onboarding is complete when all of the following fields are populated. Partial profiles unlock the sub-skills but produce less calibrated output.

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

**Claude Code:** Copy `core/voice-profile-template.md` to `~/.everyday-writer/voices/<slug>/voice-profile.md` and fill it in there. Create the voice directory with its `references/`, `drafts/`, and `samples/` subfolders first.

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
