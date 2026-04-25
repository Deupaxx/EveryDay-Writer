---
name: Everyday Writer — Master Skill
description: Complete Everyday Writer writing system. Anti-AI rules, voice profiling, and all 13 sub-skills in one file. Upload this to Claude.ai Cowork to activate the full EW system.
version: 0.1.0
---

# EVERYDAY WRITER — MASTER SKILL
## The Complete Writing System for Claude.ai Cowork

This file is the entire Everyday Writer (EW) system in one document. It contains:
- The A-Player operating standard
- The full anti-AI writing rules engine (banned words, sentence patterns, tone patterns, structural patterns, checklist)
- The AI Slop Commandments (fine-tuning reference — mechanisms, era-indexed vocabulary, diagnostic checklist)
- Voice profile onboarding
- All 13 sub-skills: newsletter (creative + technical), LinkedIn, tweets/X, Substack Notes, web copy, sales copy, scene structure, script writing, world builder, audit, outline, failure library

**How to use:** Upload this file to a Claude.ai Project. Then type `/ew` followed by your request, or name the sub-skill directly (e.g., "use the LinkedIn skill", "run the audit skill on this text").

---

# PART 1: HOW TO INVOKE THIS SYSTEM

## Activation

When the user types `/ew`, starts a message with "ew:", or asks you to use "the writing skill" or "Everyday Writer":

1. **Check for voice profile** — search memory for any entry tagged "EW Voice Profile". If found and complete, proceed to step 3.
2. **Run onboarding** — if no profile exists, run the onboarding process in Part 3 before doing anything else.
3. **Check for references** — if the user has uploaded any additional `.md` reference files to this Project, read them for platform-specific instructions or tone preferences.
4. **Dispatch** — identify the task type and apply the appropriate sub-skill from Part 5.

## Dispatch Map

| User request | Sub-skill to use |
|---|---|
| Newsletter — story-led, personal essay, narrative | Newsletter Creative (Part 5.1) |
| Newsletter — technical, tutorial, analysis, how-to | Newsletter Technical (Part 5.2) |
| LinkedIn post or article | LinkedIn (Part 5.3) |
| Tweet, X post, or thread | Tweets/X (Part 5.4) |
| Substack Note | Substack Notes (Part 5.5) |
| Website copy, landing page, homepage | Web Copy (Part 5.6) |
| Sales page, email sequence, direct response | Sales Copy (Part 5.7) |
| Fiction scene, chapter, prose | Scene Structure (Part 5.8) |
| Screenplay or script | Script Writing (Part 5.9) |
| World-building for fiction | World Builder (Part 5.10) |
| Audit / rewrite / before-after comparison | Audit (Part 5.11) |
| Idea → outline / stuck on structure | Outline Engine (Part 5.12) |
| What does AI writing look like / failure examples | Failure Library (Part 5.13) |

**Every sub-skill invocation follows this mandatory sequence:**
1. Apply all rules from Part 2 (Anti-AI Rules)
2. Apply all rules from Part 2B (AI Slop Commandments)
3. Apply the voice profile from memory (Part 3)
4. Apply any uploaded reference files
5. Execute the sub-skill
6. Run both checklists (Part 2 Section 7 and Part 2B Section 6) before presenting the draft

Do not skip steps. Do not present a draft that fails either checklist. Fix it first.

---

# PART 2: ANTI-AI WRITING RULES

*Every sub-skill reads this in full before writing anything. These rules are not optional.*

## Section 0 — The Operating Standard

This skill is not for writers who want encouragement. It is for writers who want results.

There are A-Players and there are C-Players. A-Players are obsessive. They study what works, learn from every piece that fails, ship without waiting for perfect conditions, and treat the reader's attention as a critical component that cannot be wasted. They do not dump a draft and walk away. They re-read it, cut it, tighten it, and ask whether every sentence earns its place before anything goes out.

C-Players produce content that is technically present and completely forgettable. They optimize for the feeling of having written something rather than the result of having written something worth reading. This skill was not built for them.

**The operating rules:**

Results, not hours. Nobody cares how long the draft took. The piece either works or it doesn't.

Own the outcome, not the process. If the piece isn't landing, that is your problem, not the audience's. The reader owes you nothing.

Identify your bottleneck and attack it. Weak opening? That's your bottleneck — it kills everything after it. Vague argument? That's your bottleneck — fix it before you touch the prose. Never dress a wound that should be amputated.

Never coinflip a critical component. The opening line, the core argument, the one example that carries the whole piece — these are critical components. They do not get rushed, guessed at, or left as placeholders.

Check in on your own work. Most writers dump a draft and declare it done. A-Players come back. They read it cold, cut 10%, find the part that isn't working, and fix it before it ships.

No dull moments. Every sentence either moves the reader forward or loses them. There is no neutral.

Push until it's the best it can be. Not the best you felt like doing. The best possible. If you're not there yet, you're not done.

---

## Section 1 — The Banned Word List

These words went from rare to ubiquitous the moment LLMs went mainstream. Their presence is a tell. Delete them every time.

**The LLM Core Vocab:**
delve, utilize, leverage, robust, streamline, harness, certainly, notably, importantly, fundamentally, remarkably, deeply, foster, empower, showcase, underscore, highlight

**The Grandiose Noun Cluster:**
tapestry, landscape, paradigm, synergy, ecosystem, framework, realm, sphere, nexus, cornerstone, linchpin, bedrock

**The Significance Inflation Set:**
stands as, serves as, marks a pivotal moment, represents a significant shift, reflects broader, symbolizing its enduring, setting the stage for, shaping the trajectory, evolving landscape, indelible mark, deeply rooted, key turning point

**Filler Transitions (delete the phrase, keep the sentence):**
It's worth noting, It bears mentioning, Importantly, Notably, Interestingly, It goes without saying, Needless to say, It should be noted

**Vague Authority Gestures:**
experts agree, studies suggest, research shows, observers have noted, many believe — *Name the expert. Link the study. If you can't, you don't have a source.*

---

## Section 2 — Sentence-Level Patterns to Kill

### Negative Parallelism
The single most common AI tell. One is acceptable. Two is a pattern. Three is a confession.

❌ "It's not about working harder — it's about working smarter. It's not about doing more — it's about doing less, better."
✅ "The leverage is in what you cut, not what you add."

### Dramatic Countdown
Nobody speaks this way outside a TED talk from a template.

❌ "Not luck. Not connections. Just relentless execution."
✅ "Relentless execution is what separated them."

### Rhetorical Self-Q&A
The writer asks a question nobody asked, then answers it.

❌ "The result? A company worth $10 billion. The lesson? Never ignore the fundamentals."
✅ "They built a $10 billion company by doing the boring thing everyone else skipped."

### Tacked-On "-ing" Analysis
A participial phrase bolted to the end of a sentence to simulate depth.

❌ "He left the company in 2019, marking a significant shift in leadership."
✅ "He left the company in 2019. The board replaced him within a month."

### False Range Construction
❌ "From innovation to cultural transformation, AI is changing everything."
✅ "AI is changing hiring, writing, and drug discovery — at the same time."

### "Serves As" Dodge
❌ "This moment serves as a turning point."
✅ "This is a turning point."

### Passive Voice as Escape Hatch
❌ "The decision was made by the committee."
✅ "The committee decided."

### Adverbs Propping Up Weak Verbs
❌ "He ran very quickly to the door."
✅ "He sprinted to the door."

---

## Section 3 — Tone Patterns to Kill

### False Suspense Setup
❌ "Here's the thing — most writers don't actually read."
✅ "Most writers don't actually read."

### Futurism Invitation
❌ "Imagine a world where every writer had a personal editor available 24/7."
✅ "Claude is a 24/7 editor. Most writers still don't use it properly."

### False Vulnerability
Real vulnerability is specific and uncomfortable. Scheduled self-awareness is neither.

❌ "And yes, I'll admit — I've struggled with this too."
✅ "I spent six months writing essays nobody read because I was optimizing for length, not argument."

### Stakes Inflation
❌ "This will fundamentally reshape the future of human creativity."
✅ "This makes certain creative jobs cheaper to do badly and harder to do well."

### Pedagogical Condescension
❌ "Let's unpack why this matters. Let's break this down. Let's dive in."
✅ Start the argument. The reader will follow.

### False Balance
❌ "Despite its challenges, AI represents an enormous opportunity."
✅ Either engage the challenges or remove the pretense of balance.

---

## Section 4 — Structural Patterns to Kill

### Throat-Clearing Openings
The first sentence must do real work. No preamble, no "In today's world", no definition of the topic.

❌ "In today's fast-paced digital landscape, writing has never been more important."
✅ Start with the sharpest thing you have to say.

### Fractal Summaries
❌ "In this section we'll cover... As we've seen..."
✅ Write forward. Don't recap.

### One-Point Dilution
The same argument restated 10 times across 4,000 words. If the thesis is sound, say it once. Then add evidence, counterargument, implication.

### Signposted Conclusion
❌ "In conclusion / To sum up / In summary..."
✅ Write the conclusion. The reader can feel it arriving.

### Symmetrical Conclusion
Ending by restating the opening is a reflex, not writing. End with the sharpest point.

### Listicle in a Trench Coat
❌ "The first reason is cost. The second is time. The third is talent."
✅ "It costs too much, takes too long, and requires skills most teams don't have."

---

## Section 5 — Formatting Tells to Fix

### Em-Dash Addiction
2–3 per piece is fine. 10+ is a tell. Restructure the sentence or use a comma.

### Bold-First Bullets
Every bullet starting with a **bolded phrase** is a documentation-template tic. If bullets need hierarchy, restructure the content.

### Short Punchy Fragments as Constant Drumbeat
One-sentence paragraphs earn their weight when rare. Used constantly, they lose all force.

❌ "The market shifted. Nobody saw it coming. Everything changed overnight."
✅ Weave it into a paragraph. Rhythm earns its emphasis when it isn't constant.

---

## Section 6 — Craft Rules (from King, Lamott, Brande)

1. **The second draft is the first draft minus 10%.** Every sentence either earns its place or it goes.
2. **Show, don't announce.** "She was furious" tells the reader what to feel. Write the thing that makes them feel it.
3. **R.U.E. — Resist the Urge to Explain.** If you've shown it, don't state it. Trust the reader.
4. **Use the paragraph as the unit of thought**, not the sentence.
5. **Specificity is proof.** "Hedge funds are losing ground to retail platforms" beats "the financial landscape is shifting."
6. **First word that fits, if it's colorful and precise.** Never dress up vocabulary to sound intelligent.
7. **Plot emerges from character needs**, not external mandates.

---

## Section 7 — Pre-Publish Checklist

Run this before anything goes out:

- [ ] Any magic adverbs? (quietly, deeply, fundamentally, remarkably, importantly)
- [ ] Any delve / utilize / leverage / robust / harness / showcase / foster?
- [ ] More than one "It's not X — it's Y" construction?
- [ ] Any "Not X. Not Y. Just Z." countdown?
- [ ] Any rhetorical self-Q&A ("The result? The lesson?")?
- [ ] Any tacked-on "-ing" analysis phrase at sentence end?
- [ ] Any filler transitions? (It's worth noting / Importantly / Notably)
- [ ] Any "Here's the kicker / thing / deal" false suspense?
- [ ] Any "Imagine a world where..." opener?
- [ ] More than 3 em-dashes per piece?
- [ ] Bold-first bullet points throughout?
- [ ] Conclusion starting with "In conclusion" or "To sum up"?
- [ ] Any vague authority gestures without a named source?
- [ ] Does the piece end having *proved* something, or just *restated* it?
- [ ] Does the opening sentence do real work, or is it throat-clearing?
- [ ] Is there passive voice where an active subject exists?

---

# PART 2B: AI SLOP COMMANDMENTS
## Fine-Tuning Reference: Prohibited Writing Patterns

*Technical companion to Part 2. Explains the mechanism behind each failure pattern, adds patterns Part 2 doesn't cover, and provides the diagnostic checklist.*

---

## Section 1 — Lexical Prohibitions

### 1.1 High-Frequency Slop Vocabulary

Do not overuse: `delve`, `tapestry` (abstract), `testament`, `underscore` (verb), `pivotal`, `intricate/intricacies`, `garner`, `bolstered`, `interplay`, `meticulous/meticulously`, `vibrant`, `landscape` (abstract), `crucial`, `key` (adjective), `valuable`, `enduring`, `emphasizing`, `showcase` (verb), `fostering`, `highlighting`, `enhance`, `align with`, `Additionally` (sentence-initial).

**Mechanism:** LLMs trained on post-2022 internet data absorbed these terms from editorials, SEO content, and AI-generated text. They function as a statistical gravity well — the model reaches for them by default.

**Correction:** Replace with precise, concrete alternatives. If no specific replacement exists, the sentence contains no real information and should be cut.

### 1.2 Copula Avoidance

Do not replace `is` / `are` with: `serves as`, `stands as`, `marks`, `represents`, `boasts`, `features`, `offers`, `maintains`.

**Mechanism:** LLMs have a repetition-avoidance penalty that discourages reusing words. Applied to `is`, this produces elegant-variation substitutes that introduce false weight.

**Correction:** Use `is`. Simple copulas are not stylistic failures.

### 1.3 Vague Authority Terms

Do not attribute claims to unnamed aggregates: `experts argue`, `observers have noted`, `industry reports suggest`, `several sources indicate`, `scholars believe`, `critics argue`.

**Correction:** Name the expert, cite the report, or remove the claim.

### 1.4 Promotional Vocabulary

Do not use travel-guide or press-release register in factual prose: `nestled`, `in the heart of`, `vibrant`, `rich` (cultural heritage context), `boasts a`, `groundbreaking`, `renowned`, `diverse array`, `profound`, `natural beauty`, `showcasing`, `exemplifies`, `commitment to`.

---

## Section 2 — Structural Prohibitions

### 2.1 Negative Parallelism
Limit `It's not X — it's Y` constructions. One per piece is permissible. Two is a pattern. Three is a prohibition violation.

### 2.2 Tacked-On Present-Participle Analysis
Do not append `-ing` clauses to signal significance: `...contributing to the region's cultural heritage`, `...highlighting its importance`, `...underscoring its enduring relevance`, `...reflecting the broader shift toward`.

**Mechanism:** These clauses add zero propositional content. They are structural padding.

### 2.3 Unearned Significance Inflation
Do not assert legacy, impact, or importance without specific evidential support: `marks a pivotal moment`, `represents a significant shift`, `setting the stage for`, `a testament to`, `indelible mark on`, `enduring legacy`.

### 2.4 "Despite Its Challenges" Formula
Do not produce: [positive framing] → [acknowledges challenges] → [immediate optimistic resolution]. Acknowledge challenges specifically and let them stand, or remove the balance-performance.

### 2.5 Rule of Three Saturation
One tricolon per paragraph maximum. No back-to-back tricolons.

### 2.6 Outline-Wrapper Structure
Do not produce rigid section structures with predictable headers: `Challenges and Future Directions`, `Legacy and Impact`, `Key Takeaways`, `Future Outlook`.

### 2.7 Inline-Header Bullet Lists
Do not produce bullet lists where each item begins with a **bolded phrase** followed by a colon. Write prose or use a simple list.

### 2.8 Collaborative Communication Bleed
Do not include assistant meta-commentary in content output: `I hope this helps`, `Of course!`, `Certainly!`, `Would you like me to`, `Feel free to adjust`, `Here is a [description of what follows]`.

### 2.9 Knowledge-Cutoff Disclaimer Contamination
Do not speculatively fill information gaps with hedged disclaimers presented as content: `As of my last knowledge update`, `While specific details are limited`, `[Subject] maintains a low profile`.

---

## Section 3 — Content Pattern Prohibitions

- Do not replace specific facts with generic positive summaries: `inventor of the first train-coupling device` → `revolutionary titan of industry`
- Do not default to ecosystem/conservation boilerplate without sourced basis: `plays a vital role in the ecosystem`, `Preserving this species is crucial for biodiversity`
- Do not assert social media presence as evidence of notability
- Do not produce notability-listing sections (lists of media outlets as proof of significance)
- Do not output unfilled template fields or placeholder instructions in final content

---

## Section 4 — Formatting Prohibitions

- Em-dashes: no more than 2–3 per piece
- Boldface: reserved for first instance of subject or technical terms being defined; not for multiple key phrases in running prose
- Do not skip heading hierarchy levels
- Do not insert horizontal rules before every section heading as default structure

---

## Section 5 — Style Prohibitions

- Do not substitute synonyms to avoid repeating a subject's name (elegant variation). Use the correct term consistently.
- Do not announce the conclusion: `In conclusion`, `To sum up`, `In summary`, `Ultimately`, `Taken together`
- Do not summarize sections before they begin or immediately after they end

---

## Section 6 — Diagnostic Checklist (run before finalizing any output)

**Lexical**
- [ ] High-density slop vocabulary cluster (3+ terms from Section 1.1 in a single paragraph)
- [ ] `serves as` / `stands as` / `marks` / `represents` replacing `is`
- [ ] Unnamed authority attribution
- [ ] Promotional register terms

**Structural**
- [ ] More than one negative parallelism instance per piece
- [ ] Tacked-on `-ing` analysis clauses
- [ ] Unearned significance inflation without supporting evidence
- [ ] `Despite its challenges` formula
- [ ] More than one tricolon per paragraph; back-to-back tricolons
- [ ] Rigid section structure headers
- [ ] Inline bold-header bullet format
- [ ] User-facing collaborative commentary in content output
- [ ] Knowledge-cutoff disclaimers presented as content

**Content**
- [ ] Specific facts replaced by generic positive summaries
- [ ] Default ecosystem/conservation boilerplate
- [ ] Social media presence assertions
- [ ] Notability-listing sections
- [ ] Unfilled placeholder text

**Formatting**
- [ ] More than 3 em-dashes per piece
- [ ] Boldface on multiple key phrases in running prose
- [ ] Heading level skipping
- [ ] Horizontal rules before headings as default

**Style**
- [ ] Elegant variation replacing consistent terminology
- [ ] `In conclusion` / `To sum up` openers
- [ ] Pre-section or post-section summaries

---

## Appendix: Era-Indexed Slop Vocabulary

**2023–mid-2024 (GPT-4 era):** `delve`, `tapestry`, `testament`, `underscore`, `pivotal`, `intricate`, `garner`, `bolstered`, `interplay`, `meticulous`, `vibrant`, `landscape` (abstract), `crucial`, `key`, `valuable`, `enduring`, `Additionally` (sentence-initial)

**Mid-2024–mid-2025 (GPT-4o era):** `align with`, `bolstered`, `crucial`, `emphasizing`, `enhance`, `enduring`, `fostering`, `highlighting`, `pivotal`, `showcasing`, `underscore`, `vibrant`

**Mid-2025 onward (GPT-5 era):** `emphasizing`, `enhance`, `highlighting`, `showcasing` (plus notability-attribution language)

*These are statistical fingerprints, not absolute prohibitions. Single occurrences are permissible; cluster detection is the signal.*

---

# PART 3: VOICE PROFILE ONBOARDING

*Run this the first time `/ew` is invoked without an existing voice profile in memory.*

## How Onboarding Works in Claude.ai Cowork

Three phases: infer from memory, gap-fill with targeted questions, confirm and store.

**Phase 1 — Infer from memory:**
Before asking the user anything, search available memory for signals: platforms they write for, tone feedback from past sessions, writing samples, stated goals. Inferences from two or more independent signals are reliable. Single data points are provisional.

If a prior EW profile exists in memory, load it and jump to Phase 3 to confirm it's still current.

**Phase 2 — Gap-fill questions:**
Ask only about fields not already inferable. One question at a time. Open with a brief summary of what you already know, then ask the first gap.

If memory is completely empty, say:
> "I don't have much context on your writing yet — let's build a quick profile so I can calibrate to your voice. This takes 5 minutes and only happens once. What platforms are you primarily writing for right now?"

Then proceed through required fields one at a time:
1. Platforms
2. Goals
3. Voice adjectives (ask them to describe their voice, or share a sentence they've written recently that felt like them — voice adjectives must always be user-confirmed, never assumed)
4. Tone axes (propose based on what you've learned, ask for confirmation)

**Phase 3 — Confirm and store:**
When all required fields are filled, present the complete profile for confirmation, then store as a named memory: **"EW Voice Profile — [name/identifier]"**

Then say: "Profile saved. Every EW skill will use it going forward. What are we writing?"

## Required Profile Fields

- 3–5 voice adjectives (user-confirmed, not assumed)
- Primary platforms
- Writing goals
- Tone positions: warm ↔ clinical, confident ↔ hedged, serious ↔ playful
- Vocabulary favored or actively avoided
- At least one rhythm pattern (long/complex, punchy/short, mixed)

## Voice Profile Template (for memory storage)

```
EW Voice Profile — [Name]
Voice adjectives: [list — confirmed by user]
Platforms: [list]
Goals: [brief statement]
Tone — Warm↔Clinical: [position + note]
Tone — Confident↔Hedged: [position + note]
Tone — Serious↔Playful: [position + note]
Vocabulary favored: [list or notes]
Vocabulary avoided: [list or notes]
Rhythm: [observed patterns]
What NOT to write for this voice: [3 patterns to avoid]
Status: Complete
Last updated: [date]
```

---

# PART 4: THE STANDARD THIS SYSTEM HOLDS

Read Section 0 of Part 2. That section is the operating contract for every piece of writing this system produces. It is not tone flavor. It is the minimum acceptable level of execution.

When a draft is complete, run both checklists before presenting it: Section 7 of Part 2 and Section 6 of Part 2B. Do not present a draft that fails either. Fix it first.

The writer using this system is an A-Player or they're training to become one. The system treats them accordingly — which means it holds the work to the standard, not to the standard of what's comfortable.

---

# PART 5: THE 13 SUB-SKILLS

*Every sub-skill below inherits all rules from Part 2 and Part 2B. Those rules are the floor. The sub-skill rules are the ceiling.*

---

## 5.1 — Newsletter Creative

**For:** Story-driven newsletters. Personal essays. Narrative-first issues where the writing itself is the product.

The creative newsletter lives or dies on one thing: does the reader feel something? Information can be found anywhere. A story that moves someone cannot.

### The 5-Beat Structure

**1. Ordinary World (Opening)**
Start in the reader's life, not yours. Their problem, their frustration, their version of the situation. The reader must see themselves within the first 3 sentences.

❌ "Last week I was thinking about productivity..."
✅ "You've read every morning routine article. You've tried the 5am wake-up. The cold shower. The journaling. And you still feel behind."

**2. Inciting Incident (The Disruption)**
Something broke, changed, or revealed itself. Must arrive within the first 200 words.

**3. The Woods (Complication and Stakes)**
Where most newsletters fail. Writers get to the insight and immediately explain it. Resist. Make the reader earn it. Present the complication: the counterargument, the thing you tried that didn't work.

**4. Key Knowledge (The Turn)**
The specific thing that changed everything. Not a vague lesson — a specific moment, decision, reframe, or fact.

**5. New Equilibrium (The Payoff)**
The reader's life after they take what you gave them. End on the sharpest point, not a mirror of where you started.

### Hook Architecture

**Hook types that work:**
- **The Contradiction:** "The most-read writers I know are the worst at reading their own work."
- **The Specific Scene:** "It was 2am. The draft was 4,000 words. None of it was usable."
- **The Uncomfortable Truth:** "Most newsletters are published to feel productive, not because the writer had something to say."
- **The Inversion:** "Stop trying to find your voice. You already have one. It's the one you're suppressing."

**What kills the hook:** Starting with "I" + time reference. Starting with a definition. Starting with a self-answered question. Any sentence that could open a thousand other newsletters.

### Narrative Mechanics

Show, don't announce. "She was devastated" tells the reader what to feel. Write the thing that makes them feel it.

Character-centric structure. Even in non-fiction, you are a character. Give your past self specific needs, flaws, and turning points.

Causality, not chronology. Write: "This happened, *therefore* this happened. This happened, *but* this was wrong, *so* this changed." Every beat follows from the previous by consequence, not just time.

The Ghost. The most resonant newsletters have a ghost behind them — a past failure, wound, or wrong belief the writer is still working through. Without it, you're just clever. With it, you're human.

### Pre-Send Checklist

- [ ] Does the opening sentence do real work?
- [ ] Is the reader present in the opening?
- [ ] Does the inciting incident arrive in the first 200 words?
- [ ] Is there a genuine complication before the answer?
- [ ] Is the key knowledge specific — a moment, decision, fact — not a vague lesson?
- [ ] Does the ending arrive somewhere new?
- [ ] Have you run Section 7 of Part 2?
- [ ] Does every paragraph go somewhere?
- [ ] What is the one-sentence takeaway?

---

## 5.2 — Newsletter Technical

**For:** Insight-driven newsletters. Industry analysis, tutorials, how-tos, tool breakdowns, data-led explainers.

The technical newsletter's job: make the reader measurably smarter — fast. No fluff. No filler. No padding a thin insight to hit a word count.

### The 4-Part Structure

**1. The Problem**
State the specific problem this issue addresses. "Most teams are using GPT for copywriting but missing the three use cases with 10x better ROI." Specificity earns attention.

**2. The Key Insight**
State it early — within the first third. Technical readers are busy. This is not a tease; it's the thesis.

**3. The Evidence and Mechanics**
Walk through specifics. Data, examples, step-by-step logic. Each point must connect to the key insight.

**4. The Action**
What specifically should the reader do next? Not "consider trying this" — the exact action, tool, query, or decision.

### Clarity Rules

Specificity is proof. "This framework cuts cold-start time from 8 seconds to 340ms" means something. "This framework is faster" means nothing.

Name the expert. Link the study. "According to Ethan Mollick's research on AI adoption in knowledge work" is a source. "Experts suggest" is not.

Lead with the finding, not the methodology.
❌ "To understand why this works, we first need to look at how X operates..."
✅ "The reason X outperforms Y comes down to how it handles memory allocation. Here's the mechanism:"

### The Insight Standard

The difference between a good technical newsletter and a great one: did the writer have an insight, or just information?

Ask before writing:
- What does this data actually mean for how someone does their job?
- What would a smart person get wrong about this topic, and why?
- What's the non-obvious implication of this development?

**The "so what" test:** After every major claim, ask: "so what?" If the answer is obvious, the claim isn't doing enough work.

### Pre-Send Checklist

- [ ] Is the key insight stated in the first third?
- [ ] Does every claim have a specific fact, number, or named source?
- [ ] Does every section connect back to the key insight?
- [ ] Are headers scannable — do they tell the argument, not just the topic?
- [ ] Is there a specific action the reader can take?
- [ ] Have you run Section 7 of Part 2?
- [ ] Have you answered "so what?" for every major claim?

---

## 5.3 — LinkedIn

**For:** Posts and articles that earn attention without performing for it.

LinkedIn is the most AI-contaminated writing surface on the internet. The bar for standing out is not high — it's just not zero.

### Hook Architecture

The first 2–3 lines are what show before the "see more" cutoff. If the hook doesn't earn the click, nothing below it matters.

**Hook formulas that work:**
- **The Counterintuitive:** "The best managers I've worked with were the ones who seemed least busy."
- **The Specific Observation:** "I've read 40+ cold emails this month. Exactly 3 opened with something other than a compliment."
- **The Uncomfortable Admission:** "I spent 6 months optimizing a product feature nobody wanted. Here's what I missed."
- **The Pattern Interrupt:** "Everyone says to post consistently. Nobody talks about the 18 months before anyone notices."

**What kills the hook:**
- Starting with "I'm excited to share..."
- Starting with a compliment to someone else
- Starting with "As a [title], I've learned that..."

### Post Structure

LinkedIn prose needs white space to be readable on mobile.

- **Line 1–2:** Hook (before the "see more" cutoff)
- **Line 3–4:** Setup — the situation you're building from
- **Body:** Core idea, broken into 1–2 sentence paragraphs with line breaks
- **Final line:** The sharpest point, a specific takeaway, or a genuine question

Line break rules: one idea per paragraph, max 2–3 sentences before a break, no bullet walls, em-dashes sparingly (1 per post max).

### Tone: Professional Authenticity

**Corporate stiffness:** "Leveraging synergistic frameworks to drive stakeholder alignment..." — delete it.

**Performed vulnerability:** "And yes, I'll admit — I've struggled with this too. We're all in this together." — false vulnerability pattern. Don't do it.

**Professional authenticity:** A specific thing you observed, learned, or got wrong, stated plainly, with enough detail that it's clearly real.

The test: could this sentence have been written by a thousand different people on LinkedIn? If yes, rewrite it until it couldn't.

### The Insight Requirement

Every LinkedIn post must have a point non-obvious enough to be worth the reader's 45 seconds.

❌ "Leadership is about showing up for your team."
✅ "The best thing I did for my team last quarter was cancel the weekly status meeting and replace it with a shared async doc. Morale went up. I heard more, not less."

### Pre-Post Checklist

- [ ] Does the hook work as a standalone?
- [ ] Is there white space — readable on mobile?
- [ ] Is there a specific insight, not just a topic?
- [ ] Is the tone authentic — not corporate or performed?
- [ ] Does the post end on the sharpest point?
- [ ] Have you run Section 7 of Part 2?
- [ ] Is there any "I'm excited/humbled/grateful" opening? Delete it.
- [ ] Could this sentence have been written by anyone? Rewrite it.

---

## 5.4 — Tweets / X

**For:** Standalone tweets and threads that carry actual ideas in minimal space.

X rewards one thing: ideas that feel both new and obviously true once stated. Not motivational. Not clever for the sake of clever.

### The Unit of Currency: The Idea

Before writing a single word, answer: what is the actual idea? Not the topic — the specific, arguable, non-obvious claim. If you can't state it in one sentence before you write the tweet, you don't have a tweet.

### Standalone Tweet Formats

**The Inversion:** "Stop trying to be consistent. Try being honest. Consistency will follow."

**The Specific Observation:** "The writers who complain most about not having time to write are usually the ones with the most to say. That's not a coincidence."

**The Compression:** "Most first drafts aren't bad writing. They're correct writing about the wrong thing."

**What doesn't work:**
- Inspirational statements with no claim
- "Unpopular opinion:" followed by a very popular opinion
- Thread bait that buries the idea ("A thread on why most writers fail: 🧵")

### Thread Architecture

**Tweet 1 is everything.** State the full claim — not a tease, the actual point. "X happens because Y, and most people have the fix backwards" is a claim.

**Each tweet advances the argument.** Not restates it. Not transitions to it. Advances it.

**No tweet is a filler.** "This is why it matters" is not a tweet — cut it.

**Last tweet:** The sharpest single insight from the whole thread, standalone.

**Ideal length:** 5–8 tweets for most arguments. A 15-tweet thread usually contains a 5-tweet thread and 10 tweets of self-indulgence.

### Compression Mechanics

Kill the setup. Most tweets spend 60% of their character count getting to the idea. Start with the idea.
❌ "I've been thinking a lot about productivity lately, and I've come to realize something important:"
✅ "Most productivity advice is designed for people who aren't actually avoiding the work."

**The word "just" test:** Delete "just," "really," "very," "quite," "actually," "basically" from every tweet.

### Pre-Post Checklist

- [ ] What is the single specific idea? State it before writing.
- [ ] Is every word load-bearing?
- [ ] For threads: does tweet 1 state the full claim?
- [ ] For threads: does each tweet advance the argument?
- [ ] Does the last tweet contain the sharpest point?
- [ ] Have you run Section 7 of Part 2?
- [ ] Is this trying to be clever, or does it have a real idea?

---

## 5.5 — Substack Notes

**For:** Fragments with actual ideas inside them. A thought that didn't make the newsletter but is too good to waste.

Notes that work are not newsletters cut into smaller pieces. A Note is a fragment, opinion, question, or observation — valuable precisely because it's incomplete enough to invite a response.

### What Notes Are For

**Thinking out loud on something unresolved.** Not a conclusion — a genuine question you're working through.

**Link commentary with actual perspective.** Not "Great piece by [Name]." "This essay by [Name] is right about X but completely misses Y, which is the part that actually matters for [specific reason]."

**An observation that doesn't need development.** Sharp, specific, standalone. If it needs more than 3 paragraphs, it's a newsletter issue in disguise.

**A question that invites actual conversation.** "What's the one use of AI that's actually improved your writing process, not just your output?" Not "What do you think about AI?"

### Format and Length

Open with the idea, not the context.
❌ "I was reading something earlier this week that got me thinking about how we approach..."
✅ "The most-retweeted writing advice I've seen this year is also the most useless."

Length: 100–400 words. Shorter is better if the idea is complete. Never pad a Note to look substantive.

No bold-first bullets. No "subscribe to my newsletter" CTA dressed as a thought.

### Pre-Post Checklist

- [ ] Is this a genuine fragment of thought or a newsletter issue squeezed small?
- [ ] Does it open with the idea, not the context?
- [ ] Is it short enough?
- [ ] If it links to something: is there an actual perspective, not just a pointer?
- [ ] Have you run the relevant items from Section 7 of Part 2?

---

## 5.6 — Web Copy

**For:** Website copy, landing pages, homepage writing that converts visitors without lying.

Web copy has one job: get the right person to take the right action. Everything else is decoration.

### The Page Hierarchy

**1. Headline:** The single most important sentence. State the specific benefit in plain language.
❌ "Redefining the future of content creation."
✅ "Newsletter templates that don't sound like every other newsletter."

**2. Subheadline:** Adds one layer of specificity — what exactly does it do, for whom?

**3. Above-the-fold body:** 2–3 sentences max. Confirms the reader is in the right place.

**4. Social proof:** Specific, named, placed near the claim it supports.

**5. CTA:** One action per section.

### Headline Rules

Test every headline: could it appear on a competitor's site without being wrong? If yes, it's too generic.

Lead with the benefit, not the feature.
- Feature: "AI-powered grammar check"
- Benefit: "Write without stopping to fix every sentence"

### Specificity and Proof

❌ "Thousands of writers use this every day."
✅ "Used by 4,200 independent newsletter writers, including [Name] ([Newsletter])."

Named testimonials only. "John D., Entrepreneur" is not a testimonial. "Maya Rodriguez, who writes [Newsletter Name] for 12,000 subscribers" is.

### CTA Architecture

Every CTA must answer: what am I doing, what do I get, and what does it cost me?

❌ "Learn more" / "Get started" / "Join the community"
✅ "Start your free 14-day trial — no credit card required"
✅ "Subscribe — one email per week, unsubscribe anytime"

### Pre-Launch Checklist

- [ ] Does the headline state a specific benefit?
- [ ] Is the reader's primary question answered above the fold?
- [ ] Does every benefit claim have specific proof?
- [ ] Are all testimonials named and specific?
- [ ] Is each CTA clear about action, outcome, and cost?
- [ ] Have you run Section 7 of Part 2?

---

## 5.7 — Sales Copy

**For:** Sales pages, email sequences, direct response copy.

Manipulation is not this skill's tool. Clarity, specificity, and legitimate persuasion are. If the offer requires manipulation to convert, the offer is the problem — not the copy.

### The Customer as Protagonist

The customer is the protagonist, not the product. The product is the key knowledge found at the midpoint of their journey.

**The hero's journey applied to sales:**

**Ordinary World:** The customer's life before. State the problem more specifically than they've heard it before.

**Inciting Incident:** The moment their ordinary world became unacceptable. What made the pain acute enough to act?

**The Woods:** What they've already tried. What failed. Why the usual solutions don't work.

**Key Knowledge:** The mechanism. Why this works where others didn't. Not a feature list — the one insight that makes the solution make sense.

**New Equilibrium:** Life after. Specific. Not "transform your business" — "you stop writing from scratch every time."

### The Opening

The sole purpose of the first sentence is to get the reader to read the second sentence.

**What works:**
- The problem, stated precisely: "You've bought three copywriting courses. Your conversion rate is the same as when you started."
- The specific outcome: "A sales page that converts at 8% when your current one converts at 1.2%."
- The challenge: "Most sales pages fail before the reader reaches the first CTA — and it's not the CTA that's broken."

**What doesn't work:**
- "Are you tired of...?"
- "Imagine a world where..."
- "I used to struggle with this too..."

### Specificity as Proof

❌ "This program has helped hundreds of businesses grow."
✅ "47 solo consultants used this to book their first $5,000 client within 90 days."

Name the mechanism. Don't just say the product works — explain briefly *why* it works.

### Objection Architecture

Address the main objections before the reader has to ask:
1. Is this for someone like me?
2. Will this actually work?
3. Can I trust you?
4. Is it worth the cost?
5. Is now the right time?

Address each with specifics, not reassurance. Reassurance papers over objections. The reader can feel the difference.

### Pre-Launch Checklist

- [ ] Does the opening name the reader's specific problem in the first 3 sentences?
- [ ] Is the customer the protagonist?
- [ ] Is every claim backed by a specific number, name, or mechanism?
- [ ] Are the top 5 objections addressed with specifics?
- [ ] Is the mechanism explained?
- [ ] Have you run Section 7 of Part 2?
- [ ] Is all urgency or scarcity real — not manufactured?

---

## 5.8 — Scene Structure

**For:** Fiction scenes, chapters, and prose passages.

A scene is the basic unit of fiction. Get the scene right and the rest follows.

### The Scene Contract

Every scene must earn its existence. If you removed this scene, would the story change? Not just lose color — actually change? If no, cut it or rebuild it.

**Every scene must contain:**
1. **Event** — something happens
2. **Change** — the situation is different at the end than at the start
3. **Conflict** — a force opposing the character's goal, external or internal

### Entry and Exit

**Enter late. Leave early.**

Enter at the last possible moment before the conflict begins.
❌ "Sarah arrived at the coffee shop at 2pm. She found a table near the window and ordered a latte."
✅ "Marcus sat down without taking off his coat. Sarah knew then that this was going to be short."

Exit the moment the scene's work is done. Do not explain what it means. Cut immediately after the beat that pays off the conflict.

### Show Don't Tell — The Actual Mechanics

**Telling** announces the conclusion: "She was furious."
**Showing** gives the reader the sensory data that produces the conclusion in their own mind.

❌ "He was nervous before the meeting."
✅ "He checked his phone twice in the elevator. When the doors opened he was still looking at the screen."

R.U.E. — Resist the Urge to Explain. If you've shown it, do not then state it.

### Dialogue

Characters almost never say exactly what they mean in high-stakes scenes. The gap between what is said and what is meant is where the tension lives.

❌ "I don't trust you anymore," she said.
✅ "I saw you at the restaurant." A pause. "Which restaurant?" "You know which one."

**The "said" rule:** "Said" is invisible. It doesn't need replacing with "remarked," "stated," "declared." Use "said." When action makes attribution clear, skip the tag.

### Pre-Draft Checklist

- [ ] Does the scene open at the last possible moment before conflict?
- [ ] Does something change?
- [ ] Are emotions shown through specific physical detail, not announced?
- [ ] Have you cut every explanation that follows a moment of showing?
- [ ] Is dialogue carrying subtext?
- [ ] Does the scene exit the moment its work is done?
- [ ] Does the last beat leave a question open?
- [ ] Have you run Section 7 of Part 2?

---

## 5.9 — Script Writing

**For:** Screenplays and scripts for film, television, and short-form video.

Your job is not to write the movie. Your job is to make the movie inevitable on the page.

### The Fundamental Difference from Prose

In a script, you control only what can be seen and heard on screen. No internal monologue. No backstory in narration unless spoken aloud.

**The screen test:** Can this be filmed? Can a camera capture it? Can an actor perform it?
❌ "She remembered the last time she'd been here, three years ago, before everything changed."
✅ "She stops at the doorway. Looks at the space where the couch used to be. Doesn't move."

### Format Rules

**Slug lines:**
```
INT. KITCHEN - NIGHT
EXT. ABANDONED WAREHOUSE - DAY
```

**Action lines:** Present tense. Active voice. Only what can be seen or heard. 4 lines maximum per block. Characters ALL CAPS on first appearance.

**Parentheticals:** Only when the reading is genuinely ambiguous without direction. If the actor can figure it out from context, no parenthetical.

**Page count:** 1 page ≈ 1 minute. Feature = 90–120 pages. Half-hour TV = 25–35 pages.

### Visual Writing

**The visual verb:** "Crosses," "drifts," "tears through," "freezes mid-step" — these are visuals. "Walks" is not.

**What NOT to write:** Camera directions (CUT TO, CLOSE ON) unless you're also the director. "We see" — redundant. Music cues in the script body.

### Subtext in Dialogue

```
MARCUS
I saw you.

A beat. SARAH doesn't move.

MARCUS (CONT'D)
At the restaurant.

SARAH
Which restaurant.
```

The beat is a line of action. It is dialogue.

### Three-Act Structure

**Act One (pages 1–25):** Establish protagonist in ordinary world. Inciting incident by page 12–15. By act break, protagonist committed to a path they can't easily undo.

**Act Two (pages 25–85):** Protagonist pursues goal against escalating opposition. Midpoint (page 55–60) is false peak. Low point (page 75–85) is darkest moment.

**Act Three (pages 85–110):** Resolution earned from character's internal transformation, not external rescue.

### Pre-Draft Checklist

- [ ] Is every action filmable?
- [ ] Do slug lines follow the format?
- [ ] Are action blocks 4 lines or fewer?
- [ ] Are parentheticals used only where genuinely necessary?
- [ ] Does every scene enter late and exit early?
- [ ] Does the protagonist make an active choice at each act break?
- [ ] Have you run Section 7 of Part 2?
- [ ] Read every dialogue exchange aloud — does it move at speed?

---

## 5.10 — World Builder

**For:** Building the world bible for fiction — novels, short stories, screenplays, games, serialized narratives.

The world exists to serve the story. Not the reverse. Every world-building decision must answer: does this make the story more possible, or does it just make the world more elaborate?

Elaborate is not the goal. Usable is the goal.

### The Two-Phase Process

**Phase 1 — Questioning:** Conduct a structured, layered dialogue to extract the world's essential elements. Move from large (what kind of world?) to specific (what does someone eat for breakfast in the capital?).

**Phase 2 — Bible Generation:** Take the answers and produce a formatted world bible. Open questions — things the writer hasn't decided — are captured as explicit blanks, not left as gaps that will surprise them mid-draft.

### When to Use World Builder

Use it before writing the first scene. The single most expensive mistake in fiction is building a world as you write — making contradictory decisions, then spending revision fixing inconsistencies instead of improving prose.

### The Questioning Sequence

Ask one question at a time. Adapt to genre and scope. Core questions:

**World Foundation**
1. What kind of world is this — realistic contemporary, historical, speculative, fantasy, science fiction, or something in between?
2. What are the rules that govern this world that don't exist in our world (magic, technology, social structures)?
3. What is the single most important constraint or cost in this world — the thing that makes living here hard?

**Story Stakes**
4. Who is the protagonist and what do they want in the first scene?
5. What force in this world directly opposes that want?
6. What would be the worst thing that could happen to the protagonist given the world's rules?

**Specific Texture**
7. Describe one ordinary morning for an ordinary person in this world.
8. What does power look like in this world — who has it, how do they keep it, what do they fear?
9. What do the people in this world believe that is wrong — the lie the society lives by?

**Open Questions**
10. What are the three biggest things you haven't decided yet?

### The World Bible Template

After questioning, produce the bible in this format:

```
WORLD BIBLE — [Project Title]

PREMISE: [One sentence — what kind of story is this world built for?]

THE RULES: [What is different about this world vs. ours? List only rules that create story consequences.]

THE CONSTRAINT: [The one rule whose violation costs the most. This is where your plot lives.]

THE PROTAGONIST: [Name, want, need, flaw]

THE OPPOSITION: [What force in the world blocks the protagonist?]

WORLD TEXTURE:
- Power structure: [who has it, how they keep it]
- The lie the society believes: [the wrong belief characters operate under]
- One ordinary morning: [sensory specifics of daily life]

OPEN QUESTIONS: [Everything the writer hasn't decided yet — captured explicitly]

MINIMUM VIABLE ANSWERS FOR CHAPTER ONE:
[The decisions that must be made before scene 1 can be written]
```

### The Internal Consistency Requirement

Every rule in your world must have a consequence if broken or avoided. A world where magic exists but nothing stops everyone from using it is not a world — it's a decoration. The constraint is more interesting than the capability.

---

## 5.11 — Audit (Before/After Rewrite)

**For:** Taking a piece of writing the user has already written and rewriting it under EW rules and the user's voice profile. Output is a structured before/after comparison.

This is a teaching tool as much as a rewriting tool. If the writer can't see what was wrong, they'll produce the same failures next time.

### The Audit Process

**Step 1 — Read the original.** Read it fully before doing anything. Ask one question if the format is unclear: "What was this written for — platform, audience, goal?"

**Step 2 — Identify the failures.** Before rewriting, categorize failures from Part 2:
- Section 1 failures (banned words/phrases): list every instance
- Section 2 failures (sentence-level patterns)
- Section 3 failures (tone patterns)
- Section 4 failures (structural patterns)
- Voice profile failures: things that contradict the user's confirmed voice fingerprint

Do not share this failure list with the user yet. Use it to guide the rewrite.

**Step 3 — Rewrite.** Apply all rules from Part 2. Match the voice profile. Preserve the writer's argument and intent — do not change what they're saying, change how they're saying it. The rewrite should feel like the same writer on a better day — not a different writer.

**Step 4 — Present the comparison.**

---

**BEFORE**

[Original text, unchanged]

---

**AFTER**

[Rewritten text]

---

**WHAT CHANGED AND WHY**

4–7 bullets. Each names the failure category, quotes the original phrase, states what it was replaced with and why.

Format:
- **[Failure category]:** "[original phrase]" → "[replacement]" — [one sentence on why this matters]

---

**VOICE MATCH**

One sentence: how well the rewrite matches the voice profile and what the dominant adjustment was.

---

### What This Skill Does Not Do

- Does not rewrite to a different voice than the user's profile
- Does not change the writer's argument, only the execution
- Does not add content that wasn't there

### Pre-Audit Checklist

- [ ] Have you read the original fully before identifying failures?
- [ ] Does the rewrite preserve the writer's argument and intent?
- [ ] Does the rewrite match the voice profile?
- [ ] Is the WHAT CHANGED AND WHY section specific enough to teach?
- [ ] Have you run the AFTER version through Section 7 of Part 2?

---

## 5.12 — Outline Engine

**For:** Taking a vague idea and producing a tight outline before a single word of prose is written.

### The Interrogation Process

**Phase 1 — Identify the format.** If unspecified, ask: "What format is this — newsletter, sales page, LinkedIn post, tweet thread, short story, screenplay, or something else?"

**Phase 2 — Identify the core claim.** Ask one question only: "What's the one thing you want the reader to walk away knowing or feeling? Not the topic — the point."

If the answer is vague, press once: "Inspired to do what, specifically?" The answer is the spine of the outline.

**Phase 3 — Format-specific interrogation.** Ask one question at a time. Skip questions the user has already answered.

**Newsletter (creative):** Ordinary world → Inciting incident → What didn't work / conventional wisdom → Key insight (one sentence) → New equilibrium

**Newsletter (technical):** Specific problem → Key insight most people get wrong → Evidence/mechanism → What reader should do differently

**Sales page:** Who is this for specifically → What have they already tried → The mechanism → Life after (specific outcome) → Main objection at the buy moment

**LinkedIn post:** The hook → The turn → What reader takes away

**Tweet/thread:** State the idea in one sentence → What's the sharpest version → (for threads) 3–5 distinct points that build the argument → What's the last tweet

**Fiction scene:** POV character's surface want → Opposing force → What changes between open and close → The last beat/image

**Screenplay:** External goal → Internal need → Inciting incident → Darkest moment → How protagonist resolves through active choice

**Phase 4 — Generate the outline.**

---

**[TITLE PLACEHOLDER]**

**Core claim:** [The one-sentence answer from Phase 2]

**Format:** [Newsletter / Sales page / LinkedIn / etc.]

**Outline:**

[Section name — what this section accomplishes]
- [Specific content: what goes here]
- [Key line or image if identified]

[Continue for each section]

**The stakes:** [What the reader gains if they read to the end]

**What to write first:** [The single hardest or most important section — start here, not at the beginning]

---

### What This Skill Does Not Do

- Does not write the piece — the outline is the output
- Does not ask more questions than necessary
- Does not produce generic outlines that could apply to any piece on this topic

---

## 5.13 — Failure Library

**For:** Showing writers what AI writing actually looks like so they can avoid it. A library of real failure patterns with dissection.

*This is a reference and teaching tool, not a generation tool.*

### How to Use This Library

**As a teaching reference:** When a writer produces a failure pattern, point to the relevant entry: "What you wrote matches the [Pattern Name] failure — here's what it looks like at its worst and why it breaks the reader."

**As a diagnostic:** When auditing a piece, use the failure categories to identify what type of failure is present before naming it in the WHAT CHANGED AND WHY section.

---

### Failure Category 1: Significance Inflation

**The pattern:** The writing announces that something is important instead of showing the thing and letting the reader draw that conclusion.

**The tell:** "marking a pivotal moment," "represents a significant shift," "contributing to the broader," "reflecting its continued relevance."

**Real example:**
> "The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. The founding of Idescat represented a significant shift toward regional statistical independence."

**Why broken:** "Marking a pivotal moment" and "represented a significant shift" are empty. Remove them and the sentence loses nothing — which is how you know they were never doing work.

**The fix:** State what actually happened. Let significance emerge from the specifics.

---

### Failure Category 2: Trailing -ing Analysis

**The pattern:** A sentence ends with a present-participle phrase explaining the significance of what was just said.

**The tell:** "...highlighting its importance," "...underscoring its significance," "...reflecting the broader," "...demonstrating its lasting influence."

**Real example:**
> "These works are now part of the Collections of the National Museum of Education, highlighting their historical and pedagogical significance."

**Why broken:** Placement in the National Museum already implies historical significance. The trailing phrase is redundant. It makes the reader feel managed.

**The fix:** End the sentence before the trailing phrase. Trust the fact.

---

### Failure Category 3: Ecosystem Boilerplate

**The pattern:** Writing about any subject includes language about its importance to the broader ecosystem or community, even when tenuous or entirely generic.

**The tell:** "plays a role in the ecosystem," "vital for ecological diversity," "preserving this species is important."

**Real example:**
> "It plays a role in the ecosystem and contributes to Hawaii's rich cultural heritage. Preserving this endemic species is vital not only for ecological diversity but also for sustaining the cultural traditions connected to Hawaii's native flora."

**Why broken:** "Vital for ecological diversity" could be written about any species on any island. Zero specificity.

**The fix:** State the specific ecological role or say nothing about it.

---

### Failure Category 4: Promotional Language in Neutral Contexts

**The pattern:** Writing adopts travel brochure register when describing a neutral subject.

**The tell:** "nestled," "vibrant," "rich cultural heritage," "breathtaking," "offers visitors a fascinating glimpse," "diverse tapestry."

**Real example:**
> "Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage..."

**Why broken:** Six promotional phrases in two sentences. None contain information. All signal that the writer is performing enthusiasm.

**The fix:** State what is true about the place. Specific, named facts.

---

### Failure Category 5: Superficial Analysis

**The pattern:** The writing makes an analytical-sounding claim that contains no actual analysis.

**The tell:** "This demonstrates the ongoing relevance of," "thus proving that," "these citations illustrate lasting influence."

**Real example:**
> "These citations, spanning more than six decades and appearing in recognized academic publications, illustrate Blois' lasting influence in computational linguistics."

**Why broken:** "Illustrate lasting influence" is the conclusion of an argument that wasn't made. The citations were listed; no argument was built from them.

**The fix:** Either make the actual argument or remove the analytical framing.

---

### Failure Category 6: Significance by Assertion

**The pattern:** The writing asserts that something is important without demonstration.

**The tell:** "groundbreaking," "revolutionary," "landmark," "unprecedented," "transformative."

**Real example:**
> "Her insights have also been featured in *Wired*, *Refinery29*, and other prominent media outlets."

**Why broken:** A list of outlet names is not an argument. It is the structure of an argument with no content inside it.

**The fix:** State one specific reason the work is significant — one thing it changed, one concrete effect.

---

# PART 6: HOW TO ADD TO THIS SYSTEM

## Adding Failure Library Entries

When new failure patterns are identified, add them using this format:

```
### Failure Category [N]: [NAME]

**The pattern:** [one sentence]
**Why it fails:** [2–3 sentences — the mechanism of failure]
**The tell:** [phrases or structural signals]
**Real example:** > "[quote]"
**Why broken:** [specific analysis]
**The fix:** [one sentence]
```

Real examples only. No invented examples.

## Updating the Voice Profile

When the writer asks to update the profile, locate the "EW Voice Profile" memory and update the relevant fields. Log the change with the date and reason.

Recalibrate when:
- The user says "this doesn't sound like me"
- 3+ months since last update
- The user has significantly shifted platforms, tone, or goals

---

*End of Everyday Writer Master Skill. Version 0.1.0.*
