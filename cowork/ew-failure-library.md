---
name: Everyday Writer — Failure Library
description: A library of real AI writing failure patterns with full dissection. Use to teach writers what AI slop actually looks like, diagnose failures in existing text, or understand why specific patterns break reader trust.
version: 0.1.0
---

# EVERYDAY WRITER — FAILURE LIBRARY

**Part of the Everyday Writer system. Upload this file to a Claude.ai Project alongside `ew-master.md`, or use standalone.**

**To activate:** Tell Claude "show me the failure library" or "what does AI slop actually look like?" or "use the failure library to analyze this text."

---

## WHAT THIS IS

A library of real AI writing failures — not invented examples, documented patterns from actual AI-generated text found in the wild. Each entry shows the original text, names the failure pattern, and dissects exactly what went wrong.

Use this when:
- A writer wants to understand what AI writing actually looks like so they can avoid it
- You need to explain why a specific phrase in a draft is a failure
- The writer asks "what does AI slop actually sound like?"

This is not a checklist. It is evidence. The patterns here are what the anti-AI rules were written to prevent.

---

## HOW TO USE THIS LIBRARY

**As a teaching reference:** When a writer produces a failure pattern, point to the relevant entry: "What you wrote matches the [Pattern Name] failure — here's what it looks like at its worst and why it breaks the reader."

**As a study tool:** Walk through the entries with the writer. The goal is not just recognition — it's internalization. A writer who can name the pattern when they read it can catch it when they write it.

**As a diagnostic:** When auditing a piece, use the failure categories here to identify what type of failure is present before naming it.

---

## FAILURE CATEGORY 1: SIGNIFICANCE INFLATION

**The pattern:** The writing announces that something is important, significant, or part of a broader trend — instead of showing the thing and letting the reader draw that conclusion.

**Why it fails:** It tells the reader what to feel before they've felt it. It replaces specific information with a generic significance claim. The reader hasn't been shown anything; they've been instructed to be impressed.

**The tell:** "marking a pivotal moment," "represents a significant shift," "contributing to the broader," "reflecting its continued relevance," "underscoring its importance."

**Real example:**
> "The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. The founding of Idescat represented a significant shift toward regional statistical independence."

**Why this is broken:** "Marking a pivotal moment" and "represented a significant shift" are empty phrases. They claim importance without demonstrating it. Remove them and the sentence loses nothing of substance — which is how you know they were never doing work.

**The fix:** State what actually happened. Let the significance emerge from the specifics. If the founding of a statistics institute was actually important, the importance is in what it did, not in calling it pivotal.

---

## FAILURE CATEGORY 2: TRAILING -ING ANALYSIS

**The pattern:** A sentence ends with a present-participle phrase that explains the significance of what was just said. The sentence states a fact; the trailing phrase announces what it means.

**Why it fails:** It's the writer doing the reader's job. If the fact is significant, a competent reader will draw the inference. Explaining the inference out loud collapses the gap between writer and reader, removes the reader's active participation, and signals that the writer doesn't trust their own material.

**The tell:** Sentences ending in "...highlighting its importance," "...underscoring its significance," "...reflecting the broader," "...demonstrating its lasting influence," "...emphasizing the need for."

**Real example:**
> "These works are now part of the Collections of the National Museum of Education, highlighting their historical and pedagogical significance."

**Why this is broken:** Placement in the National Museum of Education already implies historical and pedagogical significance. The trailing phrase is redundant at best; at worst, it makes the reader feel managed.

**Another real example:**
> "It holds a pivotal place in the East Central Railway Zone, serving as a major railway hub with historical significance. [...] contributing to the socio-economic development of the region."

**Why this is broken:** "Contributing to the socio-economic development of the region" is attached to a description of train service. It adds no information. It is the AI performing significance because it was trained to perform significance after stating facts.

**The fix:** End the sentence before the trailing phrase. Trust the fact.

---

## FAILURE CATEGORY 3: ECOSYSTEM BOILERPLATE

**The pattern:** Writing about any subject — especially biological, ecological, or community-related — includes language about its importance to the broader ecosystem or community, even when that importance is tenuous or entirely generic.

**Why it fails:** It's filler that sounds authoritative. "Plays a vital role in the ecosystem" applied to a random endemic plant species is meaningless — every organism plays some role in its ecosystem by definition. The specificity is zero. The word count increases. The reader learns nothing.

**The tell:** "plays a role in the ecosystem," "contributes to the broader," "vital for ecological diversity," "preserving this species is important for," "maintaining the health of."

**Real example:**
> "It plays a role in the ecosystem and contributes to Hawaii's rich cultural heritage. Preserving this endemic species is vital not only for ecological diversity but also for sustaining the cultural traditions connected to Hawaii's native flora."

**Why this is broken:** This was written about a plant called *Nototrichium divaricatum*. The ecological role is stated with zero specificity. "Vital for ecological diversity" is a content-free phrase — it could be written about any species on any island. The cultural heritage connection is invented from whole cloth.

**The fix:** Either state the specific ecological role (what this organism eats, what eats it, what depends on it) or say nothing about its ecosystem role.

---

## FAILURE CATEGORY 4: PROMOTIONAL LANGUAGE IN NEUTRAL CONTEXTS

**The pattern:** Writing adopts the register of a travel brochure or press release when describing a neutral subject — a town, a building, a company. Every detail is rendered in the most flattering possible light.

**Why it fails:** It's not credible. A reader encountering "nestled within the breathtaking region" in an otherwise neutral article immediately understands that they are reading generated content or promotional copy. Trust collapses.

**The tell:** "nestled," "vibrant," "rich cultural heritage," "breathtaking," "offers visitors a fascinating glimpse," "boasts," "commitment to excellence," "natural beauty," "diverse array."

**Real example:**
> "Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and a significant place within the Amhara region. From its scenic landscapes to its historical landmarks, Alamata Raya Kobo offers visitors a fascinating glimpse into the diverse tapestry of Ethiopia."

**Why this is broken:** "Nestled," "breathtaking," "vibrant," "rich cultural heritage," "fascinating glimpse," "diverse tapestry" — six promotional phrases in two sentences. None of them contain information. All of them signal that the writer is performing enthusiasm rather than conveying facts.

**The fix:** State what is true about the place. Specific details — population, what it's known for, one named feature — carry more credibility than any amount of "vibrant" and "breathtaking."

---

## FAILURE CATEGORY 5: SUPERFICIAL ANALYSIS

**The pattern:** The writing makes an analytical-sounding claim that contains no actual analysis. It connects two things with "thus," "therefore," or "demonstrating" in a way that sounds like reasoning but advances no argument.

**Why it fails:** It mimics the structure of argument without the substance. The reader follows the logical connectives expecting a conclusion that earns those words — and finds a statement of the obvious or a restatement of the premise.

**The tell:** "This demonstrates the ongoing relevance of," "thus proving that," "these citations illustrate lasting influence," "thereby establishing," "this initiative was part of a broader movement."

**Real example:**
> "These citations, spanning more than six decades and appearing in recognized academic publications, illustrate Blois' lasting influence in computational linguistics, grammar, and neology."

**Why this is broken:** "Illustrate lasting influence" is the conclusion of an argument that wasn't made. The citations were listed; no argument was built from them. The phrase performs analysis without performing it.

**The fix:** Either make the actual argument or remove the analytical framing and state only the facts.

---

## FAILURE CATEGORY 6: SIGNIFICANCE BY ASSERTION

**The pattern:** The writing asserts that something is important, groundbreaking, or significant — directly, without demonstration. It does not show why the thing is significant; it announces the significance as a fact.

**Why it fails:** Significance claims without evidence are the weakest form of persuasion. The claim is only worth the demonstration behind it — and when there is no demonstration, the claim becomes a negative signal: the writer couldn't demonstrate significance, so they asserted it.

**The tell:** "groundbreaking," "revolutionary," "landmark," "unprecedented," "transformative," "a vital contribution to," "a significant achievement in the field of."

**Real example:**
> "Her insights have also been featured in *Wired*, *Refinery29*, and other prominent media outlets."

**Why this is broken:** Media placements are listed as a substitute for demonstrating why the subject's work is significant. A list of outlet names is not an argument — it's the structure of an argument with no content inside it.

**The fix:** State one specific reason the work is significant — one thing it changed, one specific contribution, one concrete effect.

---

## FAILURE CATEGORY 7: FALSE VULNERABILITY

**The pattern:** The writer performs self-awareness in a way that is polished, risk-free, and scheduled — the opposite of actual vulnerability.

**Why it fails:** Real vulnerability is specific and uncomfortable. Simulated vulnerability is recognizable as a writing strategy. The reader knows the difference. When they detect the performance, they lose trust in everything else in the piece.

**The tell:** "And yes, I'll admit — I've struggled with this too." "I won't pretend this was easy." "Here's what I got wrong." (followed by nothing actually embarrassing)

**The AI version of this:** "I've faced my own challenges with [topic], and I know how difficult it can be." — mentions challenges without specifying any of them.

**The fix:** Either be specific about what you got wrong — specific enough to be uncomfortable — or don't perform vulnerability. Say the thing plainly without the self-disclosure wrapper.

---

## FAILURE CATEGORY 8: THE "IMAGINE A WORLD" OPENER

**The pattern:** The piece opens by inviting the reader to imagine a hypothetical future or alternate reality, then proceeds to make the actual argument.

**Why it fails:** It delays the thesis. It signals that the writer doesn't trust the thesis to be interesting enough to open with. It is the single most recognizable AI opener in business and tech writing.

**The tell:** "Imagine a world where..." / "Picture this:" / "What if I told you that..."

**Real example (composite):**
> "Imagine a world where every writer had access to a personal editor available 24/7. That world exists today, thanks to AI writing assistants."

**Why this is broken:** The thesis is that AI writing assistants are like having a 24/7 editor. That's the opening sentence. Everything before it is delay. The hypothetical "imagine" wrapper adds zero information and signals a template.

**The fix:** State the thesis: "Claude is a 24/7 editor. Most writers still don't use it properly."

---

## HOW TO ADD ENTRIES

When new failure patterns are identified, add them using this format:

```
## FAILURE CATEGORY [N]: [NAME IN CAPS]

**The pattern:** [One sentence describing the pattern]

**Why it fails:** [2–3 sentences explaining the mechanism of failure]

**The tell:** [The phrases or structural signals that mark this pattern]

**Real example:**
> "[Quote the actual text]"

**Why this is broken:** [Specific analysis of this example]

**The fix:** [One sentence on what to do instead]
```

Real examples only. No invented examples.
