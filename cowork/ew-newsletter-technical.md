---
name: Everyday Writer — Newsletter Technical Skill
description: Write insight-driven technical newsletters — tutorials, analysis, industry breakdowns, how-tos, data-led explainers. Enforces anti-AI rules, specificity standards, and voice profile.
version: 0.1.0
---

# EVERYDAY WRITER — NEWSLETTER TECHNICAL SKILL

**Part of the Everyday Writer system. Upload this file to a Claude.ai Project alongside `ew-master.md`, or use standalone.**

**To activate:** Tell Claude "use the technical newsletter skill" or "write me a technical newsletter using Everyday Writer."

---

## WHAT THIS SKILL IS FOR

Insight-driven newsletters. Industry analysis, tutorials, how-tos, tool breakdowns, and data-led explainers. The technical newsletter's job is to make the reader measurably smarter — fast. No fluff. No filler. No padding a thin insight to hit a word count.

The A-Player standard applies here too. Clarity is not an absence of depth — it's the hardest discipline in writing. The goal is to make a complex thing simple without making it wrong.

---

## BEFORE WRITING: APPLY THE ANTI-AI RULES

These rules are mandatory. Run the checklist before presenting any draft.

### Banned Words — Delete on Sight

delve, utilize, leverage, robust, streamline, harness, certainly, notably, importantly, fundamentally, remarkably, deeply, foster, empower, showcase, underscore, highlight, tapestry, landscape, paradigm, synergy, ecosystem, framework, cornerstone, stands as, serves as, marks a pivotal moment, represents a significant shift, It's worth noting, Importantly, Notably, experts agree, studies suggest, research shows, observers have noted

### Sentence Patterns to Kill

**Passive Voice as Escape Hatch:** "The data is processed by..." → Who processes it? How? Name the agent. Passive voice hides the mechanism.

**Vague Authority Gestures:** "Experts suggest..." is not a source. "According to Ethan Mollick's research on AI adoption" is a source. Name the expert. Link the study. If you can't, you don't have it.

**Tacked-on -ing Analysis:** "...contributing to the broader trend of..." — cut the trailing clause. Trust the fact.

**Throat-clearing Openings:** No "In the world of X, things are changing." The first sentence states the specific problem or insight.

### Pre-Send Checklist

- [ ] Any banned words?
- [ ] Any vague authority gestures without a named source?
- [ ] Any passive voice where an active subject exists?
- [ ] Any trailing -ing analysis phrases?
- [ ] Any filler transitions? (It's worth noting / Importantly / Notably)
- [ ] Does every claim have a specific fact, number, or named source?
- [ ] Does the piece end having proved something?
- [ ] Is there a specific action the reader can take?

---

## VOICE PROFILE CHECK

Before writing, check memory for "EW Voice Profile." If found: apply the confirmed voice adjectives, tone positions, vocabulary preferences, and rhythm patterns.

If no profile exists: ask "What's the primary topic area of this newsletter and who's the target reader?" Then proceed.

---

## THE STRUCTURAL CONTRACT

Technical newsletter readers are not here for a journey — they're here to extract value efficiently. Every structural decision must serve that extraction.

### The 4-Part Technical Structure

**1. The Problem (Why This Matters)**
State the specific problem, gap, or question this issue addresses. Not "AI is changing things" — "Most teams are using GPT for copywriting but missing the three use cases with 10x better ROI." Specificity earns attention. The reader must know within 2 sentences whether this issue is for them.

**2. The Key Insight (What You Found)**
The single most important thing this issue delivers. State it early — within the first third. Technical readers are busy. If they have to hunt for the point, they'll stop looking. This is not a tease; it's the thesis. Everything else is support.

**3. The Evidence and Mechanics (How It Works)**
Walk through the specifics. Data, examples, step-by-step logic, comparisons. This is where depth lives. Each point must connect to the key insight — if it doesn't, it doesn't belong here.

**4. The Action (What To Do With It)**
What specifically should the reader do next? Not "consider trying this" — the exact action, tool, query, decision, or change. If there's no action, state why not and what to watch instead. Never end on a passive observation.

---

## CLARITY RULES

**Specificity is proof.**
Every claim must be grounded in a specific fact, number, example, or source.
❌ "This framework is faster."
✅ "This framework cuts cold-start time from 8 seconds to 340ms."

If you can't make it specific, you haven't done enough research to write the piece yet.

**One concept at a time.**
Each section covers one thing completely before moving to the next. If you're explaining how a system works while simultaneously arguing why it matters, you're doing two things at once and doing both worse.

**Name the expert. Link the study.**
"Experts suggest" is not a source. "According to Ethan Mollick's research on AI adoption in knowledge work" is a source. If you can't name it, you don't have it — you have an impression of something you half-remember. Check before you publish.

**Active constructions only.**
"The data is processed" — by what? How? "The model processes each token sequentially against the full context window" is the sentence.

---

## STRUCTURE AND SCANNABILITY

Technical readers scan before they read. Structure must support scanning without gutting depth.

**Headers are signposts, not titles.**
❌ "Why This Matters"
✅ "Why Teams Underestimate Context Window Size"

If the reader can scan your headers and understand the full argument, your structure is working.

**Lead with the finding, not the methodology.**
❌ "To understand why this works, we first need to look at how X operates under Y conditions, which was first described by..."
✅ "The reason X outperforms Y in low-latency scenarios comes down to how it handles memory allocation. Here's the mechanism:"

**Lists only for genuinely parallel items.**
A list of 7 things that aren't truly parallel is not a list — it's a paragraph avoiding its own logic. If your bullets keep needing sub-explanations, collapse them into prose.

**Code and data get their own block.**
Never bury a command, query, or formula in running prose. If someone needs to use it, they need to be able to copy it cleanly.

---

## THE INSIGHT STANDARD

The difference between a good technical newsletter and a great one: did the writer have an insight, or just information? Information is cheap. Insight is the writer's interpretation, synthesis, or prediction layered on top.

**Ask yourself before writing:**
- What does this data actually mean for how someone does their job?
- What would a smart person get wrong about this topic, and why?
- What's the non-obvious implication of this development?
- What does this tell us about where things are going in 6–18 months?

If you can't answer at least one of those, you have a summary, not a newsletter.

**The "so what" test:** After every major claim, ask: "so what?" If the answer is obvious or trivial, the claim isn't doing enough work. If the answer is non-obvious and specific to your reader's situation, you have something worth sending.

---

## CREDIBILITY SIGNALS

Technical readers are skeptical by default.

**What builds credibility:**
- Specific numbers with sources named
- Honest acknowledgment of limitations ("This only applies when X condition holds")
- Your actual experience or test results, stated plainly
- Counterarguments acknowledged and addressed

**What destroys credibility:**
- Vague attributions ("studies show," "experts agree")
- Overclaiming ("this will transform your entire workflow")
- Getting a technical detail wrong anywhere — if one thing is wrong, readers question everything
- Hedging everything to the point of saying nothing

---

## PRE-SEND CHECKLIST

- [ ] Is the key insight stated in the first third of the issue?
- [ ] Does every claim have a specific fact, number, or named source?
- [ ] Does every section connect back to the key insight?
- [ ] Are headers scannable — do they tell the argument, not just the topic?
- [ ] Is there a specific action the reader can take?
- [ ] Have you run the anti-AI rules checklist?
- [ ] Have you answered "so what?" for every major claim?
- [ ] Is passive voice eliminated from technical descriptions?
- [ ] Are lists only used for genuinely parallel items?
- [ ] Would a busy expert stop and read this, or skip it?
