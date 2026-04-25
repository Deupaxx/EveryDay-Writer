---
name: Everyday Writer — Audit Skill
description: Rewrite existing text under EW anti-AI rules and the user's voice profile. Produces a structured before/after comparison with specific failure analysis. A teaching tool as much as a rewriting tool.
version: 0.1.0
---

# EVERYDAY WRITER — AUDIT SKILL

**Part of the Everyday Writer system. Upload this file to a Claude.ai Project alongside `ew-master.md`, or use standalone.**

**To activate:** Paste the text you want audited and tell Claude "audit this using Everyday Writer" or "run the EW audit on this."

---

## WHAT THIS SKILL IS FOR

The audit takes a piece of writing the user has already written and rewrites it under EW rules and the user's voice profile. The output is a structured before/after comparison. The goal is not to show off — it is to make the specific failures visible so the writer can see exactly what changed and why.

This is a teaching tool as much as a rewriting tool. If the writer can't see what was wrong, they'll produce the same failures next time.

---

## THE ANTI-AI RULES ENGINE

The audit applies these rules. Know them before auditing anything.

### Banned Words (Section 1 failures)

delve, utilize, leverage, robust, streamline, harness, certainly, notably, importantly, fundamentally, remarkably, deeply, foster, empower, showcase, underscore, highlight, tapestry, landscape, paradigm, synergy, ecosystem, framework, cornerstone, stands as, serves as, marks a pivotal moment, represents a significant shift, reflects broader, symbolizing its enduring, setting the stage for, It's worth noting, Importantly, Notably, Interestingly, It goes without saying, experts agree, studies suggest, research shows, observers have noted

### Section 2 Failures (Sentence-Level)

- **Negative Parallelism:** "It's not X — it's Y" — more than once per piece is a pattern
- **Dramatic Countdown:** "Not luck. Not connections. Just relentless execution."
- **Rhetorical Self-Q&A:** "The result? A company worth $10 billion."
- **Tacked-on -ing Analysis:** "...marking a significant shift in leadership."
- **"Serves As" Dodge:** "This moment serves as a turning point." → "This is a turning point."
- **Passive Voice as Escape:** "The decision was made by the committee." → "The committee decided."
- **Adverbs Propping Up Weak Verbs:** "He ran very quickly" → "He sprinted"

### Section 3 Failures (Tone)

- **False Suspense:** "Here's the thing — most writers don't actually read." → Drop "Here's the thing"
- **Futurism Invitation:** "Imagine a world where..." → State the thesis
- **False Vulnerability:** "And yes, I'll admit — I've struggled with this too." → Make it specific or cut it
- **Stakes Inflation:** "This will fundamentally reshape the future of..." → Say what it actually does
- **Pedagogical Condescension:** "Let's unpack why this matters. Let's dive in." → Start the argument

### Section 4 Failures (Structural)

- **Throat-Clearing Opening:** First sentence doesn't do real work
- **Fractal Summaries:** "In this section we'll cover..." / "As we've seen..."
- **Signposted Conclusion:** "In conclusion / To sum up / In summary..."
- **Symmetrical Conclusion:** Ending restates the opening instead of landing somewhere new
- **Listicle in a Trench Coat:** "The first reason is... The second reason is..."

### Section 5 Failures (Format)

- **Em-Dash Addiction:** More than 3 em-dashes per piece
- **Bold-First Bullets:** Every bullet starting with **bolded phrase:**
- **Short Punchy Fragments as Constant Drumbeat:** Used every third line

---

## THE AUDIT PROCESS

### Step 1 — Read the Original

Read it fully before doing anything. Do not start annotating or rewriting immediately. Read it the way a skilled editor reads — looking for the pattern of the piece, not just surface errors.

Ask one question if the format is unclear: "What was this written for — platform, audience, goal?"

Do not ask this if the context is obvious from the text.

### Step 2 — Identify the Failures

Before rewriting, identify exactly what is wrong. Categorize using the sections above.

List every banned word instance. Identify every sentence-level pattern. Note tone and structural failures. Check against the voice profile if one exists.

Do not share this failure list with the user yet. Use it to guide the rewrite.

### Step 3 — Rewrite

- Apply all rules from the anti-AI rules engine above
- Match the voice profile from memory (check for "EW Voice Profile")
- Preserve the writer's argument and intent — do not change what they're saying, change how they're saying it
- The rewrite should feel like the same writer on a better day — not a different writer

### Step 4 — Present the Comparison

Present in this exact format:

---

**BEFORE**

[Original text, unchanged]

---

**AFTER**

[Rewritten text]

---

**WHAT CHANGED AND WHY**

4–7 bullets. Each names the failure category, quotes the original phrase, states what it was replaced with and why.

Format per bullet:
**[Failure category]:** "[original phrase]" → "[replacement]" — [one sentence on why this matters]

Examples:
- **Banned phrase (Section 1):** "in today's fast-paced world" → removed entirely — setup phrase that announces nothing, delays the point
- **Trailing -ing analysis (Section 2):** "creating a sense of urgency for the reader" → cut — urgency should exist in the writing, not be announced
- **Warm-up paragraph (Section 4):** First paragraph deleted — the argument started in paragraph 2; paragraph 1 was throat-clearing

---

**VOICE MATCH**

One sentence: how well the rewrite matches the voice profile, and what the dominant adjustment was.

Example: "Rewrite tightened sentence length and removed first-person hedging — matches your 'direct, no-hedging' tone axis."

---

## WHAT THIS SKILL DOES NOT DO

- Does not rewrite to a different voice than the user's profile
- Does not change the writer's argument, only the execution
- Does not manufacture improvements — if the original is mostly clean, the before/after will show that
- Does not add content that wasn't there — the audit rewrites, it doesn't expand

---

## POST-GENERATION REVIEW

After producing the before/after, stop. Run the anti-AI rules checklist on the AFTER version. The rewrite must not introduce new failures while fixing old ones.

The audit is only credible if the AFTER version is clean. A rewrite that fixes passive significance statements while introducing em-dash abuse is not a credible demonstration.

---

## PRE-AUDIT CHECKLIST

- [ ] Have you read the original fully before identifying failures?
- [ ] Have you checked against all failure categories?
- [ ] Does the rewrite preserve the writer's argument and intent?
- [ ] Does the rewrite match the voice profile — sentence length, register, emotional temperature?
- [ ] Is the WHAT CHANGED AND WHY section specific enough to teach, not just list?
- [ ] Have you run the AFTER version through the anti-AI rules checklist?
