---
name: audit
description: |
  Rewrite existing text under the EW anti-AI rules and the writer's voice profile, then show a
  structured before/after with specific failure analysis. Use when the user pastes a draft and
  asks to fix, tighten, de-slop, humanize, critique, or improve it.
license: MIT
metadata:
  version: "0.3.0"
---

# EW Skill — Before/After Audit

**Dependency chain. Read these in order before writing anything:**

1. `core/runtime-contract.md` (short operating contract; does not replace the full rules)
2. `core/anti-ai-rules.md` (full standard)
3. `core/ai_slop_commandments.md` (mechanism reference and diagnostic checklist)
4. `core/voice-profile.md` (voice resolver; if the resolved profile has `Completed: No`, stop and run onboarding)
5. Any `.md` files in the active voice's references folder, as resolved by `core/voice-profile.md`

This chain applies on direct invocation (`/ew:audit`) exactly as it does on dispatch through `/ew`. Direct invocation skips routing, not constraints.

---

## WHAT THIS SKILL IS FOR

The audit mode takes a piece of writing the user has already written and rewrites it under EW rules and the user's voice profile. The output is a structured before/after comparison. The goal is not to show off — it is to make the specific failures visible so the writer can see exactly what changed and why.

This is a teaching tool as much as a rewriting tool. If the writer can't see what was wrong, they'll produce the same failures next time.

---

## THE AUDIT PROCESS

### Step 1: Read the original

When the user pastes text, read it fully before doing anything. Do not start annotating or rewriting immediately. Read it the way a skilled editor reads — looking for the pattern of the piece, not just surface errors.

Ask one question if the format is unclear: "What was this written for — platform, audience, goal?" Do not ask this if the context is obvious from the text.

### Step 2: Identify the failures

Before rewriting, identify exactly what is wrong. Categorize failures from `core/anti-ai-rules.md`:

**Section 1 failures (banned words/phrases):** List every instance. No exceptions.

**Section 2 failures (sentence-level patterns):** Identify AI-patterned constructions — trailing -ing analysis phrases, stacked adjectives, passive significance statements.

**Section 3 failures (tone patterns):** False urgency, performed vulnerability, breathless enthusiasm, hedging where confidence is warranted.

**Section 4 failures (structural patterns):** Warm-up paragraphs that delay the point, conclusions that restate rather than land, throat-clearing.

**Section 5 failures (format-specific patterns):** Check against the relevant sub-skill's rules if the format is identifiable.

**Voice profile failures:** Things that contradict the user's confirmed voice fingerprint — wrong sentence length, wrong emotional temperature, wrong register.

Do not share this full failure list with the user yet. Use it to guide the rewrite.

### Step 2b: Identify what must survive

This step is not optional, and skipping it is the most common way an audit makes a piece worse.

Before you change a word, mark two things:

**What is protected under Section 10.** Specific hard-to-invent detail, mixed feelings, era-bound references, genuine asides, uneven rhythm, deliberate quirks. These are the parts a machine could not have produced. They come through the rewrite intact or the audit has failed, regardless of how much slop you removed.

**What is a false positive under Section 9.** Run the flagged list from Step 2 against Section 9 and strike anything that is not actually a tell: a single em-dash, one *however*, formal vocabulary that is simply the right word, curly quotes, a clipped sentence used deliberately, a watched phrase appearing inside a quotation. An isolated instance is not a pattern. If the only evidence against a sentence is one item from Section 9, leave the sentence alone.

Section 0.1 breaks ties. Where the writer's confirmed voice conflicts with a style rule, the voice wins.

### Step 3: Rewrite

Rewrite the piece:
- Apply the rules from `core/anti-ai-rules.md`, filtered through Step 2b
- Match the voice profile in `core/voice-profile.md`
- Preserve the writer's argument and intent — do not change what they're saying, change how they're saying it
- Enter late, leave early (if it's a scene or narrative)
- Kill every throat-clearing sentence

The rewrite should feel like the same writer on a better day — not a different writer.

**The fabrication limit (Section 0.2).** The single largest risk in this skill: the fix for a vague sentence looks like a specific one, and the specifics are not yours to supply. Do not add a name, number, date, statistic, quotation, source, or event the writer did not provide. When a sentence needs a real detail to land, mark the gap in visible brackets and keep writing:

> They grew fast in the first year. → They went from [starting number] to [ending number] customers in [timeframe].

Brackets are the correct output here. They are visible, so they cannot ship by accident, and they show the writer precisely where their own material is needed. An invented specific that reads well is a worse defect than the vague sentence it replaced.

Every claim in the original survives into the rewrite. The shape does not have to: compress the dull stretches, dwell where a person would, merge or split paragraphs freely. When preserving the information and mirroring the original structure pull against each other, the information wins.

### Step 3b: Interrogate before presenting

Run the two-pass loop from Section 7.1 of `core/anti-ai-rules.md`. Answer the three questions for yourself, revise, then move to Step 4. In this skill, question 2 is the one that catches real defects:

> Does this rewrite state any fact, name, number, date, quote, or source that was not in the original?

Any yes is a defect. Fix it before the writer sees the draft.

### Step 4: Present the comparison

Present in this exact format:

---

**BEFORE**

[Original text, unchanged]

---

**AFTER**

[Rewritten text]

---

**WHAT CHANGED AND WHY**

List only the substantive changes — not line edits, the pattern changes. Aim for 4–7 bullets. Each bullet names the failure category, quotes the original phrase, and states what it was replaced with and why.

Format:
- **[Failure category]:** "[original phrase]" → "[replacement]" — [one sentence on why this matters]

Example:
- **Banned phrase (Section 1):** "in today's fast-paced world" → removed entirely — setup phrase that announces nothing, delays the point
- **Trailing -ing analysis (Section 2):** "creating a sense of urgency for the reader" → cut — the urgency should exist in the writing, not be announced
- **Warm-up paragraph (Section 4):** First paragraph deleted — the argument started in paragraph 2; paragraph 1 was throat-clearing

---

**VOICE MATCH**

One sentence: how well the rewrite matches the voice profile, and what the dominant adjustment was.

Example: "Rewrite tightened sentence length and removed first-person hedging — matches your 'direct, no-hedging' axis."

---

## WHAT THIS SKILL DOES NOT DO

- Does not rewrite to a different voice than the user's profile
- Does not change the writer's argument, only the execution
- Does not manufacture improvements — if the original is mostly clean, the before/after will show that
- Does not add content that wasn't there — the audit rewrites, it doesn't expand

---

## POST-GENERATION REVIEW

After producing the before/after, stop. Re-read `core/anti-ai-rules.md` Sections 1–7 with the AFTER draft in front of you. The rewrite must not introduce new failures while fixing old ones. Fix any failures before presenting.

The audit is only credible if the AFTER version is clean. A rewrite that fixes passive significance statements while introducing em-dash abuse is not a credible demonstration. Check the AFTER version with the same rigor you applied to the BEFORE.

## PRE-AUDIT CHECKLIST

- [ ] Have you read the original fully before identifying failures?
- [ ] Have you checked against all relevant failure categories in `core/anti-ai-rules.md`?
- [ ] Does the rewrite preserve the writer's argument and intent?
- [ ] Does the rewrite match the voice profile — sentence length, register, emotional temperature?
- [ ] Is the WHAT CHANGED AND WHY section specific enough to teach, not just list?
- [ ] Have you run the AFTER version through `core/anti-ai-rules.md` Sections 1–7?
