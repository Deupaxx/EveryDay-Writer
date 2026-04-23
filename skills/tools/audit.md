# EW Skill — Before/After Audit

**Dependency:** Read `core/anti-ai-rules.md` (all 8 sections including Section 0) and `core/voice-profile.md` before auditing anything.

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

### Step 3: Rewrite

Rewrite the piece:
- Apply all rules from `core/anti-ai-rules.md`
- Match the voice profile in `core/voice-profile.md`
- Preserve the writer's argument and intent — do not change what they're saying, change how they're saying it
- Enter late, leave early (if it's a scene or narrative)
- Kill every throat-clearing sentence

The rewrite should feel like the same writer on a better day — not a different writer.

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
