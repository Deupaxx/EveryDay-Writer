# EW Onboarding — Master Router

---

## PURPOSE

This file runs once, the first time a user invokes `/ew` without an existing voice profile. Its output is a completed `## [User] Voice Profile` section appended to `core/anti-ai-rules.md` (Claude Code) or stored in Claude.ai memory (Cowork mode).

After onboarding, this file is never read again unless the user explicitly requests a voice profile reset.

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

**If Claude Code → read `onboarding/claude-code-mode.md` and follow it.**
**If Claude.ai Cowork → read `onboarding/claude-ai-cowork-mode.md` and follow it.**

**If unclear:** Default to Claude Code mode. The active onboarding process works in both environments; the passive (memory inference) mode only works in Claude.ai with memory enabled. Defaulting to active is always safe.

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

**Claude Code:** Append the completed profile to `core/anti-ai-rules.md` under `## 8. VOICE PROFILE` using this format:

```markdown
## 8. VOICE PROFILE

**Confirmed voice adjectives:** [list]
**Primary platforms:** [list]
**Writing goals:** [brief statement]
**Tone axes:**
- Warm ↔ Clinical: [position and notes]
- Confident ↔ Hedged: [position and notes]
- Serious ↔ Playful: [position and notes]
**Vocabulary favored:** [list or notes]
**Vocabulary avoided:** [list or notes]
**Rhythm patterns:** [observed patterns from samples or stated preferences]
**Signature patterns:** [if identified]
**Avoid pushing toward:** [types of writing the user dislikes or produces poorly]
```

**Claude.ai Cowork:** Store as a named memory with title "EW Voice Profile — [User]" containing the same fields. Tag it for retrieval on EW skill invocation.

---

## ONBOARDING TONE

The onboarding conversation is direct, not bureaucratic. Tell the user what you're doing and why, then do it. No lengthy explanations. No "this will only take a moment!" warmth padding.

The user chose a writing system built on the A-Player standard. Match that energy from the first exchange.
