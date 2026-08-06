# EW — Voice Fingerprint Template

This is the blank template. Onboarding copies it to `~/.everyday-writer/voices/<slug>/voice-profile.md` and fills it in. Do not fill in this file — it is the source every new voice is stamped from.

A filled copy of this template is the voice fingerprint for one identity. It is read at the start of every sub-skill invocation, after `core/anti-ai-rules.md`. It is not a form — it is a reference document that tells Claude how this specific voice sounds and what it is optimizing for.

---

## HOW TO READ A FILLED COPY

Every field below is a constraint. "Sentence length: short and punchy" means: generate no long compound sentences unless the content requires it. "Emotional temperature: dry" means: no warmth-signaling phrases, no exclamation points, no "I'm excited to share." Read these as hard constraints on output, not soft preferences.

If a constraint conflicts with what the user just asked for, surface the conflict. Don't silently override the profile.

---

## IDENTITY

**Voice name:** [Display name — how the user refers to this voice]

**Voice slug:** [lowercase-kebab-case — must match the directory name]

**Voice type:** [Self / Subject]

- **Self** — the user's own voice.
- **Subject** — someone else's voice, built for ghostwriting.

**Confirmed by:** [the writer / ghostwriter, not subject]

This field is load-bearing. A Subject profile built from a ghostwriter's reading of someone's published work is not the same as one that person validated themselves. Never record `the writer` on a profile the subject did not personally confirm.

**Profile basis:** [Writing samples reviewed / Questions only — recalibrate after first output session]

**Freewrite basis:** [Included / None — subject not present / None — declined]

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

**How this voice opens pieces:** [Scene / Claim / Question / Statistic / Personal moment / Other]

**How this voice closes pieces:** [Lesson / Challenge / Image / Punchline / Open question / Other]

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

**What this voice should be pushed toward:** [Free text from onboarding]

On a Subject profile, these are second-hand unless the subject supplied them directly. Mark anything inferred with `[assumed]` rather than stating it flat.

---

### Voice adjectives (confirmed)

These 5 words describe how this voice sounds. They were proposed and confirmed during onboarding — not assumed.

1. [Adjective] — [one sentence of evidence from the samples]
2. [Adjective] — [one sentence of evidence]
3. [Adjective] — [one sentence of evidence]
4. [Adjective] — [one sentence of evidence]
5. [Adjective] — [one sentence of evidence]

---

### What NOT to write for this voice

Derived from the samples and confirmed during onboarding. These are patterns that appear in AI-generated text but also in writing that sounds like someone else, not this voice.

- [Pattern 1 to avoid]
- [Pattern 2 to avoid]
- [Pattern 3 to avoid]

---

## STORED SAMPLES

Samples this profile was built from live in `samples/` alongside this file.

**They do not outrank this profile.** Section 0.1 of `core/anti-ai-rules.md` gives precedence to a sample pasted in the current conversation. Stored samples are for recalibration and for the writer to re-read. Do not load them into the dependency chain and do not treat them as a live override.

---

## RECALIBRATION LOG

When the voice is updated, log the change here:

| Date | Field changed | Old value | New value | Reason |
|---|---|---|---|---|
| [Date] | [Field] | [Old] | [New] | [Why] |

---

## PROFILE STATUS

**Completed:** [Yes / No — if No, onboarding must run before this voice is used]

**Last updated:** [Date]

**Sessions run since last update:** [Number — recalibrate if >20 without update]
