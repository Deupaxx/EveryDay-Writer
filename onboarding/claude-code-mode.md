# EW Onboarding — Claude Code Mode (Active)

**When to use this:** Claude Code environment, file system available, no persistent memory between sessions.

---

## THE PROCESS

Six steps. Done in one conversation. The user pastes samples; Claude reads them, extracts what it can, confirms with the user, and writes the profile.

---

## STEP 1: OPEN

Say this, nothing else:

> "I'm going to calibrate EW to your voice before we do anything else. This happens once.
>
> Paste 2–3 pieces of writing you're proud of — or at least pieces that feel like *you*. Blog posts, newsletter issues, LinkedIn posts, whatever. Length doesn't matter. Just make them representative.
>
> If you don't have samples right now, tell me — we'll build the profile through questions instead."

Wait for the response. Do not ask any other questions yet.

---

## STEP 2: ANALYSE THE SAMPLES

When samples arrive, read them fully before forming any assessment. Extract:

**Voice markers to look for:**
- Average sentence length and variance (long and winding vs. short and punchy vs. mixed)
- Paragraph length patterns
- How the writer opens pieces — do they start with a scene, a claim, a question, a personal moment?
- How the writer closes pieces — do they land on a lesson, a challenge, an image, a punchline?
- Vocabulary register (conversational, formal, technical, colloquial)
- Use of the first person — heavy, light, or absent?
- Specificity level — do they write in specifics and examples, or in abstractions?
- Rhythm patterns — do they use short fragments for emphasis? Parallel structures? Long subordinate clauses?
- Emotional temperature — clinical and dry, warm and personal, intense, measured?
- What the writing is noticeably good at
- What the writing noticeably avoids or struggles with

Do not share the full analysis with the user. Use it to inform the questions in Step 3.

---

## STEP 3: ASK ABOUT GOALS AND PLATFORMS

After reading the samples, ask:

> "Two quick questions before I lock in the profile:
>
> 1. What platforms are you primarily writing for right now? (newsletter, LinkedIn, X, long-form, fiction — pick the ones that matter)
> 2. What do you want to be better at — or what do you want EW to push you toward?"

Wait for the answer. One exchange, both questions together, because they're fast.

---

## STEP 4: FREEWRITE SAMPLE

After the goals/platforms answer, ask for a short freewrite. This is the most reliable voice signal because it's unguarded — the user isn't trying to impress anyone, just writing about something they care about.

Say:

> "One more thing before I lock in your profile — write me 2–5 paragraphs (around 200 words) about anything you actually like. A hobby, a habit, something you've been thinking about lately. Doesn't have to be writing-related. Just write like you'd explain it to a friend.
>
> This gives me a cleaner read on your natural voice than published samples alone."

Wait for the response. When it arrives, add it to your analysis from Step 2. Look specifically for:
- How they write when there's no audience pressure — does the register shift from their published samples?
- Natural sentence rhythm and paragraph length under zero constraint
- What they reach for first when explaining something they care about (story, fact, feeling, observation)
- Whether their specificity level holds or drops when writing informally

If the user pushes back or says they don't want to, accept the profile without it and note: `**Freewrite basis:** None — profile built from published samples only.`

---

## STEP 5: CONFIRM VOICE ADJECTIVES

Based on what you observed in the samples and heard in their goals, propose 5 voice adjectives. These are not compliments — they are precise descriptions of how this writer sounds and what makes their writing distinctly theirs.

Say:

> "Based on your writing, here are 5 words I'd use to describe your voice:
>
> [adjective 1] — [one sentence explaining what in the sample led to this]
> [adjective 2] — [one sentence]
> [adjective 3] — [one sentence]
> [adjective 4] — [one sentence]
> [adjective 5] — [one sentence]
>
> Which of these feel right? Which are wrong? And is there anything missing — a word that describes how you *want* to write that isn't showing up yet?"

Do not accept "yes, those are all right" without pressing once: "Any of these feel like a stretch, or too close to how you'd describe someone else's writing?" The voice adjectives must be confirmed, not just accepted. They anchor every sub-skill's output.

---

## STEP 6: FILL THE TONE AXES

If the samples made the tone axes clear, state them directly and ask for confirmation rather than asking cold:

> "From your writing I'd place you:
> - Warm ↔ Clinical: closer to warm — your writing has personal stakes in it even when the topic is technical
> - Confident ↔ Hedged: confident, but you occasionally hedge on strong claims (I noticed 'I think' and 'perhaps' more in [sample X])
> - Serious ↔ Playful: mostly serious with occasional dry humor
>
> Right? Anything to adjust?"

If the samples weren't clear on one axis, ask about that axis specifically. Don't ask all three as open questions if the samples already answered two of them.

---

## STEP 7: WRITE AND SAVE THE PROFILE

Compile everything into the voice fingerprint format from `core/voice-profile.md` and write it to that file — filling every field with the values derived from the samples and confirmed by the user.

Set `Completed: Yes` and `Last updated: [today's date]` in the PROFILE STATUS section.

After writing, confirm with the user:

> "Profile saved to `core/voice-profile.md`. Every sub-skill will now use it.
>
> One thing worth knowing: if you feel like EW isn't sounding like you at any point, tell me — I'll re-read the profile and recalibrate. The profile gets better over time as we work together.
>
> What are we writing?"

That last line is not pleasantry. It is the signal that onboarding is complete and the system is operational. Get to work.

---

## IF NO SAMPLES ARE PROVIDED

If the user doesn't have samples, run a condensed question sequence instead:

1. "Describe your writing voice in your own words — not how you want to sound, how you actually sound when you're writing well."
2. "Give me a sentence or two you've written recently that felt like you. Doesn't have to be published."
3. "What kind of writing do you admire — whose voice do you read and think 'I want that'? And what specifically do you want from it?"
4. Then proceed to Step 3 (goals and platforms), Step 4 (freewrite — still ask for it even without prior samples), Step 5 (confirm voice adjectives built from the freewrite and their descriptions), and Step 6 (tone axes).

The profile built without samples is less precise. Note this in the profile: `**Profile basis:** Questions only — no writing samples reviewed. Recalibrate after first session with sample output.`

---

## WHAT NOT TO DO DURING ONBOARDING

- Do not compliment the samples ("this is really good writing!"). Read them and work.
- Do not ask more than two questions in a single message.
- Do not propose voice adjectives that are just generic praise (passionate, authentic, engaging). These describe nobody and therefore calibrate nothing.
- Do not rush to write the profile before the voice adjectives are confirmed by the user.
- Do not skip Step 7 — the profile must be written to file before the first sub-skill is invoked.
