# EW Onboarding — Subject Mode (Ghostwriting)

**When to use this:** building a voice profile for someone who is **not** in the conversation. A ghostwriting client, an executive whose LinkedIn you run, a founder whose newsletter you draft.

**When not to use this:** the voice is the user's own. That is `onboarding/claude-code-mode.md`.

---

## WHAT MAKES THIS DIFFERENT

In self-mode the writer is present. You can ask what they want, hear them hedge, request a freewrite, and check every adjective against the person who owns the voice.

Here you have prose and a proxy. That changes three things:

1. **No freewrite.** It cannot be obtained. Published work is the only evidence.
2. **Confirmation is second-hand.** The ghostwriter confirms as proxy. The profile records that.
3. **The fabrication rule does the heavy lifting.** Section 0.2 of `core/anti-ai-rules.md` is not background here. Writing about an absent person is where a model invents biography, motive, and opinion, and everything it invents sounds plausible. Read that section before starting.

Ask for more samples than self-mode does. Without a freewrite, sample volume is the only thing standing in for range.

---

## STEP 1: OPEN

Say this, nothing else:

> "I'll build a voice profile for [name] from their writing.
>
> Paste 3–5 pieces of their published work — more if you have it. Different formats if possible: a long piece and a short one read differently.
>
> One thing I need you to know up front: I can only profile what's on the page. How they build a sentence, where they land a paragraph, what they open with. I can't tell you what they want to be better at or why they write. Those fields will come to you."

Wait. Do not ask anything else yet.

---

## STEP 2: ANALYSE THE SAMPLES

Read every sample fully before forming any assessment. Extract the same markers as self-mode:

- Average sentence length and variance
- Paragraph length patterns
- How they open pieces — scene, claim, question, statistic, personal moment
- How they close — lesson, challenge, image, punchline, open question
- Vocabulary register
- First-person use — heavy, light, absent
- Specificity level — named examples or abstractions
- Rhythm patterns — fragments, parallel structures, long subordinate clauses
- Emotional temperature
- What the writing is noticeably good at
- What it noticeably avoids or struggles with

**Two cautions specific to this mode.**

*Edited copy is not voice.* A ghostwritten or heavily edited piece shows a house style, not a person. If a sample reads noticeably flatter or more uniform than the others, ask whether it went through an editor before weighting it.

*Consistency across samples is a finding, not an assumption.* If the samples disagree with each other, say so rather than averaging them into a voice that matches none of them:

> "These read like two different registers — the newsletter is loose and first-person, the LinkedIn posts are formal and third-person. Is that deliberate, or should I profile one of them?"

Do not share the full analysis. Use it for Step 4.

---

## STEP 3: CONTEXT FROM THE GHOSTWRITER

Ask:

> "Two things the samples can't tell me:
>
> 1. Which platforms are you writing for them on?
> 2. What are you being asked to do — grow an audience, sell something, establish a position on something?"

If the ghostwriter is relaying what the client told them, that goes in as-is. If they are guessing, it goes in marked `[assumed]`. Ask which it is when the answer sounds inferred.

---

## STEP 4: CONFIRM VOICE ADJECTIVES

Propose 5 adjectives. Same standard as self-mode: precise descriptions, not compliments, each tied to specific evidence.

> "Based on their writing, here are 5 words for this voice:
>
> [adjective 1] — [what in the samples led to this]
> [adjective 2] — [evidence]
> [adjective 3] — [evidence]
> [adjective 4] — [evidence]
> [adjective 5] — [evidence]
>
> You know this client and their work better than these samples do. Which of these are wrong?"

Press once, as self-mode does:

> "Any of these feel like a stretch — or like something you'd say about their category rather than about them specifically?"

The failure mode here is profiling a genre instead of a person. "Authoritative, insightful, strategic" describes every B2B executive on LinkedIn. If the adjectives would fit any of the client's competitors, they calibrate nothing. Start over.

---

## STEP 5: TONE AXES

State the positions the samples support and ask for correction:

> "From the samples I'd place them:
> - Warm ↔ Clinical: [position] — [evidence]
> - Confident ↔ Hedged: [position] — [evidence]
> - Serious ↔ Playful: [position] — [evidence]
>
> Right, or does that miss how they actually come across?"

If a sample set does not support a position on one axis, say so and ask directly rather than inventing one.

---

## STEP 6: SAVE THE SAMPLES

Write each sample verbatim to `~/.everyday-writer/voices/<slug>/samples/`, one file per sample, with a one-line provenance header naming what it is and where it came from.

Tell the user this happened. Do not ask permission and do not do it silently:

> "Saved 4 samples to the voice folder for recalibration."

**These do not become a live override.** See the stored-samples rule in `core/voice-profile.md`.

---

## STEP 7: WRITE THE PROFILE

Copy `core/voice-profile-template.md` to `~/.everyday-writer/voices/<slug>/voice-profile.md` and fill it in.

Set these exactly:

```
Voice type:       Subject
Confirmed by:     ghostwriter, not subject
Freewrite basis:  None — subject not present
Profile basis:    Subject samples reviewed — [n] pieces
Completed:        Yes
Last updated:     [today]
```

**Every field the samples do not support stays in visible `[brackets]`.** That is Section 0.2, and it is not optional because a bracket looks unfinished. A bracket is a known gap. An invented sentence is a lie the user cannot see.

Then confirm:

> "Profile saved for `client-acme`.
>
> Built from 4 samples. What's bracketed is what the samples couldn't tell me — fill any of it in with `/ew:voice edit` whenever the client tells you.
>
> `/ew:voice client-acme` to start writing as them."

---

## WHAT NOT TO DO

- Do not infer goals, opinions, motives, or biography from prose. Prose shows how someone writes, not what they want.
- Do not write a profile that reads like a character study. If you cannot point to a passage that justifies a sentence, cut it or bracket it.
- Do not record `Confirmed by: the writer`. The subject did not confirm this.
- Do not propose adjectives that describe the client's category rather than the client.
- Do not average contradictory samples into a voice that matches none of them.
- Do not treat one sample as representative. Ask for more.
