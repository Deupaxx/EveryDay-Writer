# EW — Voice Fingerprint

This file is the writer's voice fingerprint. It is read at the start of every sub-skill invocation, after `core/anti-ai-rules.md`. It is not a form — it is a reference document that tells Claude how this specific writer sounds and what they are optimizing for.

---

## HOW TO READ THIS FILE

Every field below is a constraint. "Sentence length: short and punchy" means: generate no long compound sentences unless the content requires it. "Emotional temperature: dry" means: no warmth-signaling phrases, no exclamation points, no "I'm excited to share." Read these as hard constraints on output, not soft preferences.

If a constraint conflicts with what the user just asked for, surface the conflict. Don't silently override the profile.

---

## VOICE FINGERPRINT

**Writer name:** [Populated during onboarding]

**Profile basis:** [Writing samples reviewed / Questions only — recalibrate after first output session]

---

### Sentence-level patterns

**Average sentence length:** [Short / Medium / Long / Mixed — with note on variance]

**Paragraph length:** [1–2 sentences / 3–5 sentences / Long blocks / Mixed]

**Rhythm patterns:** [Short fragments for emphasis / Parallel structures / Long subordinate clauses / None dominant]

**Punctuation tendencies:** [Em-dashes frequent / Oxford comma always/never / Ellipses / None noted]

---

### Voice register

**Vocabulary level:** [Conversational / Technical / Formal / Colloquial / Mixed]

**First-person use:** [Heavy — self at the center / Light — voice present but not intrusive / Absent]

**Specificity level:** [High — writes in specifics and named examples / Medium / Abstract — tendency to generalize]

**Emotional temperature:** [Clinical and dry / Warm and personal / Intense / Measured and contained]

---

### Structural habits

**How this writer opens pieces:** [Scene / Claim / Question / Statistic / Personal moment / Other]

**How this writer closes pieces:** [Lesson / Challenge / Image / Punchline / Open question / Other]

**What this writing is noticeably good at:** [Free text — 1–2 sentences from sample analysis]

**What this writing noticeably avoids or struggles with:** [Free text — 1–2 sentences]

---

### Tone axes

**Warm ↔ Clinical:** [Position on the axis + one-sentence explanation]

**Confident ↔ Hedged:** [Position on the axis + one-sentence explanation]

**Serious ↔ Playful:** [Position on the axis + one-sentence explanation]

---

### Goals and platforms

**Primary platforms:** [Newsletter / LinkedIn / X / Long-form / Fiction / Other — list what matters]

**What the writer wants EW to push them toward:** [Free text from onboarding Step 3]

---

### Voice adjectives (confirmed)

These 5 words describe how this writer sounds. They were proposed and confirmed during onboarding — not assumed.

1. [Adjective] — [one sentence of evidence from the samples]
2. [Adjective] — [one sentence of evidence]
3. [Adjective] — [one sentence of evidence]
4. [Adjective] — [one sentence of evidence]
5. [Adjective] — [one sentence of evidence]

---

### What NOT to write for this voice

Derived from the samples and confirmed by the writer. These are patterns that appear in AI-generated text but also in writing that sounds like someone else, not this writer.

- [Pattern 1 to avoid]
- [Pattern 2 to avoid]
- [Pattern 3 to avoid]

---

## RECALIBRATION LOG

When the writer asks to update the profile, log the change here:

| Date | Field changed | Old value | New value | Reason |
|---|---|---|---|---|
| [Date] | [Field] | [Old] | [New] | [Why] |

---

## PROFILE STATUS

**Completed:** [Yes / No — if No, onboarding must run before this system is used]

**Last updated:** [Date]

**Sessions run since last update:** [Number — recalibrate if >20 without update]
