---
name: Everyday Writer — Outline Engine Skill
description: Turn a vague idea into a tight, format-specific outline through structured interrogation. Works for newsletters, sales pages, LinkedIn posts, tweets, fiction scenes, and screenplays.
version: 0.1.0
---

# EVERYDAY WRITER — OUTLINE ENGINE SKILL

**Part of the Everyday Writer system. Upload this file to a Claude.ai Project alongside `ew-master.md`, or use standalone.**

**To activate:** Tell Claude "use the outline skill" or "help me outline [idea] using Everyday Writer."

---

## WHAT THIS SKILL IS FOR

A structured interrogation that takes a vague idea and produces a tight outline before a single word of prose is written. Writers don't just struggle with writing — they struggle with starting, because they don't know what they're actually trying to say.

This skill fixes that. The interrogation is short. The outline is specific. When the outline is done, the writer knows what every section is for and what it must accomplish.

A newsletter outline looks nothing like a sales page outline. This skill generates format-specific outlines.

---

## VOICE PROFILE CHECK

Before starting, check memory for "EW Voice Profile." If found: the outline will be shaped to this writer's structural habits, opening style, and closing preferences. Note any confirmed patterns.

If no profile exists: proceed. The interrogation will surface enough voice information to produce a useful outline.

---

## THE INTERROGATION PROCESS

### Phase 1: Identify the Format

If the user hasn't specified a format, ask:

> "What format is this — newsletter, sales page, LinkedIn post, tweet thread, short story, screenplay, or something else?"

Wait for the answer before proceeding. Do not guess the format from the idea.

### Phase 2: Identify the Core Claim

Ask this question, one question only:

> "What's the one thing you want the reader to walk away knowing or feeling? Not the topic — the point."

This is the hardest question in writing. If the user can't answer it, the idea isn't ready to outline. If they give a vague answer ("I want them to feel inspired"), press once: "Inspired to do what, specifically?"

The answer to this question is the spine of the outline. Every section must serve it.

### Phase 3: Format-Specific Interrogation

Run the question set for the identified format. **Ask one question at a time.** Do not ask all questions at once. Skip any question the user has already answered.

---

#### NEWSLETTER (creative / story-led)

1. "What's the ordinary world — what's the situation before the thing you're about to describe happened?"
2. "What's the inciting incident — the specific event or moment that made the ordinary world impossible to go back to?"
3. "What did you try that didn't work, or what's the conventional wisdom that gets this wrong?"
4. "What's the key insight — the thing you now know that you didn't know before, stated in one sentence?"
5. "What does the new equilibrium look like — what's true now that wasn't true before?"

---

#### NEWSLETTER (technical / analytical)

1. "What's the problem — stated as specifically as possible, not as a category but as a concrete instance?"
2. "What's the key insight that most people get wrong or don't know?"
3. "What's the evidence or mechanism that proves the insight — data, example, analogy?"
4. "What should the reader do or think differently after reading this?"

---

#### SALES PAGE

1. "Who is this for — describe the specific person, not a demographic. What are they doing right now that this product replaces or improves?"
2. "What have they already tried that didn't work? What makes those attempts fail?"
3. "What is the mechanism — why does this work where other solutions don't? One sentence."
4. "What does life look like after — specific outcome, not transformation language."
5. "What's the main objection the buyer will have at the moment they're about to click buy?"

---

#### LINKEDIN POST

1. "What's the hook — the one observation, counterintuitive claim, or specific scene that makes someone stop scrolling?"
2. "What's the turn — where does the post change direction or reveal the point?"
3. "What do you want the reader to take from this — an action, a reframe, a question?"

---

#### TWEET / X THREAD

Single tweet:
1. "State the idea in one sentence. Don't explain it — state it."
2. "What's the sharpest version of that sentence — fewer words, stronger verb?"

Thread:
1. "What's the full claim — what are you arguing across the whole thread?"
2. "What are the 3–5 distinct points that build the argument? Each one should advance, not restate."
3. "What's the last tweet — the sharpest thing you have, the thing the reader should screenshot?"

---

#### SHORT STORY / FICTION SCENE

1. "What does the POV character want in this scene — the surface want, stated as an action they take?"
2. "What force opposes that want — a person, a circumstance, or an internal conflict?"
3. "What changes between the opening and the closing of the scene — knowledge, position, relationship, or understanding?"
4. "What's the last beat — the image or line the scene ends on?"

---

#### SCREENPLAY / SCRIPT

1. "What is the protagonist's external goal — what are they actively pursuing?"
2. "What is their internal need — what do they actually require that they can't name yet?"
3. "What is the inciting incident — the specific event that makes the ordinary world impossible to continue?"
4. "What is the protagonist's darkest moment — the point where they have lost or believe they have?"
5. "How does the protagonist resolve the story — through an active choice, not a rescue?"

---

### Phase 4: Generate the Outline

Once all relevant questions are answered, produce the outline in this format:

---

**[TITLE PLACEHOLDER — working title or description of what it's about]**

**Core claim:** [The one-sentence answer from Phase 2]

**Format:** [Newsletter / Sales page / LinkedIn / etc.]

**Outline:**

[Section name — what this section accomplishes in the piece]
- [Specific content: what goes here, stated as precisely as possible]
- [Key line or image if identified during the interrogation]

[Section name]
- [Specific content]
- [Key line or image]

[Continue for each section]

**The stakes:** [One sentence on what the reader gains if they read to the end]

**What to write first:** [The single hardest or most important section — start here, not at the beginning]

---

## WHAT THIS SKILL DOES NOT DO

- Does not write the piece — the outline is the output
- Does not ask more questions than necessary — if the user's idea already answers a question, skip it
- Does not produce generic outlines that could apply to any piece on this topic — the outline must be specific to this writer's idea

---

## POST-OUTLINE CHECK

Before presenting the outline, verify:

- [ ] The core claim is specific enough that only this piece could fulfill it
- [ ] Every section serves the core claim — no section exists just because this format "usually has" that section
- [ ] The "What to write first" recommendation is genuinely the hardest or most generative section, not just section 1
- [ ] The outline is tight enough that the writer can start immediately — no more interrogation needed
