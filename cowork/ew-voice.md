---
name: Everyday Writer — Voice Skill
description: Manage EW voice profiles in Claude.ai Cowork. Switch between voices, add a ghostwriting client, list voices, import an existing profile, recalibrate, or delete one. Handles both the writer's own voice and subject voices built for someone else.
version: 0.3.0
---

# EVERYDAY WRITER — VOICE SKILL

**For:** managing which voice EW writes in. Your own, plus a separate profile for each ghostwriting client.

**Use this when the user says:** "switch to my client voice", "add a new client", "who am I writing as?", "list my voices", "this doesn't sound like me", "delete that voice".

---

## THE STANDARD THIS SKILL IS HELD TO

This skill writes prose — voice adjectives, structural observations, "what not to write" lists. Building a profile for a person who is not in the conversation is the single highest-risk surface in EW for invention: of a subject's goals, opinions, history, and motives.

**Section 0.2 of the anti-AI rules governs every field written here.** Never introduce a fact, name, motive, or preference the samples did not supply. Mark gaps with visible `[brackets]`.

---

## MEMORY LAYOUT

Claude.ai has no filesystem, so voices live in memory:

| Memory | Holds |
|---|---|
| `EW Active Voice` | The name of the voice currently in effect |
| `EW Voice Profile — [Name]` | One per voice |

One voice is active at a time, and it persists until changed.

---

## RESOLVING THE ACTIVE VOICE

Run this before any EW writing task.

1. **Check for an inline override.** If the request names a voice for this piece — "as kaguura", "in client-acme's voice" — use that one **for this invocation only**. Do not update `EW Active Voice`.
2. **Otherwise read `EW Active Voice`** and load `EW Voice Profile — [that name]`.

**When resolution fails, stop and ask.** Never guess:

| Condition | What to do |
|---|---|
| No voice profiles at all | Run onboarding |
| Exactly one voice, no `EW Active Voice` | Set it to that voice and continue, no prompt |
| Two or more voices, none active | Stop. List them and ask which to activate |
| `EW Active Voice` names a profile that doesn't exist | Stop. Report the broken pointer, list what exists, ask |
| Override names an unknown voice | Stop and ask. Never resolve to a near-match |

The pattern is the same in every failing case, and the reason is worth stating: wrong-voice output is fluent and plausible, which makes it far harder to catch than an error message.

---

## COMMANDS

### List — "list my voices", "who am I writing as?"

Read every `EW Voice Profile` memory. Show name, type, and last-updated. Mark the active one and anything incomplete.

```
Voices

  * kaguura        self      updated 2026-07-14
    client-acme    subject   updated 2026-08-02
    client-bolt    subject   updated 2026-06-30   INCOMPLETE

  * = active
```

If no voices exist, say so and offer to build one. Do not invent a listing.

### Switch — "switch to [name]"

Confirm the profile exists. If it doesn't, **stop** and list what does — never create a voice as a side effect of a switch, and never resolve a near-match without asking.

Update `EW Active Voice`. Confirm in one line:

> `Active voice: client-acme (subject). Everything writes in this voice until you switch.`

### New — "new voice", "add a client"

**Ask whose voice it is first.** Everything downstream depends on the answer.

> "Whose voice is this?
>
> 1. **Mine** — your own writing voice.
> 2. **Someone else's** — a ghostwriting client, or any voice that isn't yours."

**Mine** → run the standard three-phase onboarding from Part 3 of `ew-master.md`, in full.

**Someone else's** → run Subject Mode below.

After creating, ask before switching rather than assuming:

> "Created `client-acme`. Switch to it now, or stay on `kaguura`?"

A ghostwriter setting up a client at the start of a week is not necessarily about to write for them.

### Import — "import this profile"

For a profile the user already has written down.

Store it verbatim as `EW Voice Profile — [Name]`. Ask for `Voice type`; do not assume `Self`. Where the source doesn't record a field, write `[unknown — imported]` rather than guessing.

**Do not rewrite, improve, or "clean up" an imported profile.** It is the user's calibration. Carry it across unchanged and let them edit it afterwards.

### Recalibrate — "this doesn't sound like me"

Operates on the active voice unless another is named.

1. Ask what is wrong. The complaint needs a specific: which piece, which line, what it should have sounded like.
2. Change only the fields that answer to it. Do not re-run onboarding and do not rewrite untouched fields.
3. Log every change — date, field, old value, new value, reason.
4. Report the diff in plain language.

The log is the point. A profile that drifts without a record is one nobody can debug when the output goes wrong.

### Delete — "delete [name]"

1. **Refuse if it is the active voice.** Say so and tell the user to switch away first. Deleting what is currently in effect leaves the system pointing at nothing.
2. Show what will be lost.
3. Require confirmation that names the voice. "Yes" is not enough.

This is the only destructive command in EW. Treat it that way.

---

## SUBJECT MODE — BUILDING SOMEONE ELSE'S VOICE

For a person who is **not** in the conversation.

**What's different.** In self-mode the writer is present: you can ask what they want, hear them hedge, request a freewrite, check every adjective against the person who owns the voice. Here you have prose and a proxy. That changes three things:

1. **No freewrite.** It cannot be obtained. Published work is the only evidence.
2. **Confirmation is second-hand.** The ghostwriter confirms as proxy, and the profile records it.
3. **The fabrication rule does the heavy lifting.** Everything a model invents about an absent person sounds plausible.

### The flow

**1. Open.** Ask for 3–5 pieces of the subject's published writing, more if available. Different formats if possible — a long piece and a short one read differently. Without a freewrite, sample volume is the only thing standing in for range.

Say up front:

> "One thing you should know: I can only profile what's on the page. How they build a sentence, where they land a paragraph, what they open with. I can't tell you what they want to be better at or why they write. Those fields will come to you."

**2. Analyse.** Same markers as self-mode: sentence length and variance, paragraph patterns, how they open and close, vocabulary register, first-person use, specificity, rhythm, emotional temperature, what the writing is good at and what it avoids.

Two cautions specific to this mode:

- *Edited copy is not voice.* A ghostwritten or heavily edited piece shows a house style, not a person. If one sample reads noticeably flatter than the others, ask whether it went through an editor before weighting it.
- *If the samples disagree, say so.* Do not average them into a voice that matches none of them: "These read like two different registers — the newsletter is loose and first-person, the LinkedIn posts are formal. Is that deliberate, or should I profile one of them?"

**3. Context from the ghostwriter.** Ask which platforms they're writing on and what they're being asked to achieve. If the ghostwriter is relaying what the client told them, that goes in as-is. If they're guessing, mark it `[assumed]`.

**4. Confirm adjectives.** Propose 5 with evidence, then press once:

> "Any of these feel like a stretch — or like something you'd say about their category rather than about them specifically?"

The failure mode here is profiling a genre instead of a person. "Authoritative, insightful, strategic" describes every B2B executive on LinkedIn. If the adjectives would fit any of the client's competitors, they calibrate nothing. Start over.

**5. Tone axes.** State the positions the samples support and ask for correction. If the samples don't support a position on one axis, say so and ask rather than inventing one.

**6. Store** with:

```
Voice type: Subject
Confirmed by: ghostwriter, not subject
Freewrite basis: None — subject not present
Profile basis: Subject samples reviewed — [n] pieces
```

---

## WHAT NOT TO DO

- Do not infer goals, opinions, motives, or biography from prose. Prose shows how someone writes, not what they want.
- Do not write a profile that reads like a character study. If you cannot point to a passage that justifies a sentence, cut it or bracket it.
- Do not record `Confirmed by: the writer` on a profile the subject did not personally confirm.
- Do not propose adjectives that describe the client's category rather than the client.
- Do not average contradictory samples into a voice that matches none of them.
- Do not treat one sample as representative. Ask for more.
- Do not let reference material from one voice reach another.
