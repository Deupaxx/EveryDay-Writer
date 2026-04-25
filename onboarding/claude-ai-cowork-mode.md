# EW Onboarding — Claude.ai Cowork Mode (Passive / Memory-First)

**When to use this:** Claude.ai environment with memory enabled. Persistent context available across sessions.

---

## THE PROCESS

Three phases: infer from memory, gap-fill with targeted questions, confirm and store. The goal is the same profile as Claude Code mode — but most of it is derived from what Claude already knows rather than extracted through a sample review.

---

## PHASE 1: INFER FROM MEMORY

Before asking the user anything, search available memory for signals about their writing voice, platforms, and goals.

**Look for:**
- Any previous writing assistance conversations — what platforms were involved? What tone feedback was given or implied?
- Topics the user writes or talks about repeatedly — these indicate their domain and likely platform
- Any explicit statements about how they want to communicate or be perceived professionally
- Writing samples shared in previous conversations
- Feedback the user gave on previous writing assistance ("more direct," "less formal," "this sounds like me," "this doesn't sound like me")
- Any stated goals around content, audience-building, or platform presence

**Inference rules:**
- Do not state that you "found" something in memory unless you're confident the inference is accurate. Fuzzy inferences cause false profiles.
- Inferences from a single data point are weak — note them as provisional.
- Inferences confirmed by two or more independent signals are reliable — use them with confidence.
- If memory contains a prior explicit profile (from a past EW onboarding or similar), load it directly and go to Phase 3 to confirm it's still current.

---

## PHASE 2: GAP-FILL QUESTIONS

After inference, you should have a partial picture. Identify which required profile fields are still empty or uncertain. Ask only about those gaps — do not re-ask about anything you already know.

**Required fields to confirm if not inferable:**
- Voice adjectives (always confirm even if inferred — these must be user-validated)
- Primary platforms not evident from memory
- Current writing goals (these change — always ask even if you have prior context)
- Any tone axis that isn't clearly established
- Freewrite sample (ask for this if no writing samples exist in memory — see freewrite prompt below)

**How to open the gap-fill:**

> "Before we start, I want to set up your writing profile so everything I produce is calibrated to your voice.
>
> Based on what I know about your work, I think [brief summary of what you inferred — 2–3 sentences max]. Does that sound right?
>
> [Then ask the first gap-fill question — just one.]"

Do not dump all the gap-fill questions at once. One at a time. If the user confirms an inference, move to the next gap. If they correct it, update the working profile and continue.

**If memory is completely empty (new user, no prior context):**

> "I don't have much context on your writing yet — let's build a quick profile so I can calibrate to your voice. This takes 5 minutes and only happens once.
>
> What platforms are you primarily writing for right now?"

Then proceed through the required fields one at a time, in this order:
1. Platforms
2. Goals
3. Freewrite — ask:

> "Before I lock in your profile, write me 2–5 paragraphs (around 200 words) about anything you actually like. A hobby, something you've been thinking about, something you do. Doesn't have to be about writing. Just write like you'd explain it to a friend.
>
> This gives me a clean read on your natural voice."

4. Voice adjectives (derived from the freewrite — propose 5 and confirm with the user)
5. Tone axes (propose based on what you observed in the freewrite and ask for confirmation)

---

## PHASE 3: CONFIRM AND STORE

When all required fields are filled, confirm the complete profile before storing it:

> "Here's your EW profile:
>
> **Voice:** [adjectives]
> **Platforms:** [list]
> **Goals:** [brief statement]
> **Tone:** [warm/clinical, confident/hedged, serious/playful — with position for each]
> **Vocabulary:** [anything noted]
> **Rhythm:** [anything observed or stated]
>
> Anything to adjust before I lock this in?"

After confirmation, store as a named memory: **"EW Voice Profile — [first name or identifier]"** with all fields populated.

Then say:

> "Profile saved. Every EW skill will use it going forward.
>
> What are we writing?"

---

## PROFILE MAINTENANCE

The Cowork mode profile lives in memory and degrades when the memory is modified, cleared, or superseded by newer context that conflicts with it.

**When to recalibrate:**
- The user says "this doesn't sound like me" during a writing session
- 3+ months have passed since the profile was last updated
- The user has significantly shifted platforms, tone, or goals
- The user explicitly requests a recalibration

**How to recalibrate:**
Ask: "Do you want a full recalibration (new samples, fresh profile) or a quick update (adjust specific fields)?"

Full recalibration: re-run Phase 1 through Phase 3 from scratch.
Quick update: ask about the specific field that changed and update the memory entry.

---

## INFERENCE PRIORITY ORDER

When building the profile from memory, use sources in this order:

1. **Explicit past EW profile** — if one exists in memory, load it first
2. **Direct user statements** about voice, tone, or writing style
3. **Feedback given on past writing assistance** — corrections and confirmations
4. **Writing samples** shared in previous conversations
5. **Platform and topic patterns** inferred from conversation history
6. **Professional context** (role, industry, audience) that implies voice register

Lower-order sources inform; higher-order sources decide. If a low-order inference conflicts with a high-order statement, the statement wins.

---

## WHAT NOT TO DO IN COWORK MODE

- Do not ask questions whose answers are already in memory. The user gave that information once — using it is the point of memory.
- Do not tell the user what you found in memory in a way that feels like surveillance ("I noticed you mentioned in March that..."). Use what you know; don't narrate how you know it.
- Do not present the profile as complete until voice adjectives are user-confirmed. Everything else can be inferred. Adjectives must be validated.
- Do not store a partial profile as if it were complete. Mark incomplete profiles clearly: `**Status:** Partial — [missing fields listed]`.
