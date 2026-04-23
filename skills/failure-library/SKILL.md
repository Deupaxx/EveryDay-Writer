# EW Skill — Failure Library

**No dependency on `core/anti-ai-rules.md` for reading this file. This is a reference document, not a generation tool.**

**When used as a teaching tool during generation:** Read `core/anti-ai-rules.md` before pointing to examples from this library.

---

## WHAT THIS IS

A library of real AI writing failures — not invented examples, documented patterns from actual AI-generated text found in the wild. Each entry shows the original text, names the failure pattern, and dissects exactly what went wrong.

Use this when:
- A writer wants to understand what AI writing actually looks like so they can avoid it
- You need to explain why a specific phrase in a draft is a failure
- The writer asks "what does AI slop actually sound like?"

This is not a checklist. It is evidence. The patterns here are what `core/anti-ai-rules.md` was written to prevent.

---

## HOW TO USE THIS LIBRARY

**As a teaching reference:** When a writer produces a failure pattern, point to the relevant entry: "What you wrote matches the [Pattern Name] failure — here's what it looks like at its worst and why it breaks the reader."

**As a study tool:** Walk through the entries with the writer. The goal is not just recognition — it's internalization. A writer who can name the pattern when they read it can catch it when they write it.

**As a diagnostic:** When auditing a piece, use the failure categories here to identify what type of failure is present before naming it in the WHAT CHANGED AND WHY section.

---

## FAILURE CATEGORY 1: SIGNIFICANCE INFLATION

**The pattern:** The writing announces that something is important, significant, or part of a broader trend — instead of showing the thing and letting the reader draw that conclusion.

**Why it fails:** It tells the reader what to feel before they've felt it. It replaces specific information with a generic significance claim. The reader hasn't been shown anything; they've been instructed to be impressed.

**The tell:** Phrases like "marking a pivotal moment," "represents a significant shift," "contributing to the broader," "reflecting its continued relevance," "underscoring its importance."

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

**Why this is broken:** The placement in the National Museum of Education already implies historical and pedagogical significance. The trailing phrase is redundant at best; at worst, it makes the reader feel managed.

**Another real example:**
> "It holds a pivotal place in the East Central Railway Zone, serving as a major railway hub with historical significance. [...] contributing to the socio-economic development of the region."

**Why this is broken:** "Contributing to the socio-economic development of the region" is attached to a description of train service. It adds no information. It is the AI performing significance because it was trained to perform significance after stating facts.

**The fix:** End the sentence before the trailing phrase. Trust the fact.

---

## FAILURE CATEGORY 3: ECOSYSTEM BOILERPLATE

**The pattern:** Writing about any subject — especially biological, ecological, or community-related — includes language about its importance to the broader ecosystem, broader community, or broader trend, even when that importance is tenuous or entirely generic.

**Why it fails:** It's filler that sounds authoritative. The phrase "plays a vital role in the ecosystem" applied to a random endemic plant species is meaningless — every organism plays some role in its ecosystem by definition. The specificity is zero. The word count increases. The reader learns nothing.

**The tell:** "plays a role in the ecosystem," "contributes to the broader," "vital for ecological diversity," "preserving this species is important for," "maintaining the health of."

**Real example:**
> "It plays a role in the ecosystem and contributes to Hawaii's rich cultural heritage. Preserving this endemic species is vital not only for ecological diversity but also for sustaining the cultural traditions connected to Hawaii's native flora."

**Why this is broken:** This was written about a plant called *Nototrichium divaricatum*. The ecological role is stated with zero specificity. "Vital for ecological diversity" is a content-free phrase — it could be written about any species on any island. The cultural heritage connection is invented from whole cloth.

**The fix:** Either state the specific ecological role (what this organism eats, what eats it, what depends on it) or say nothing about its ecosystem role. Generic ecological boilerplate is worse than silence.

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

**Why it fails:** It mimics the structure of argument without the substance. The reader follows the logical connectives ("thus," "therefore," "this demonstrates") expecting a conclusion that earns those words — and finds a statement of the obvious or a restatement of the premise.

**The tell:** "This demonstrates the ongoing relevance of," "thus proving that," "these citations illustrate [X]'s lasting influence," "thereby establishing," "this initiative was part of a broader movement."

**Real example:**
> "These citations, spanning more than six decades and appearing in recognized academic publications, illustrate Blois' lasting influence in computational linguistics, grammar, and neology."

**Why this is broken:** "Illustrate lasting influence" is the conclusion of an argument that wasn't made. The citations were listed; no argument was built from them. The phrase performs analysis without performing it.

**The fix:** Either make the actual argument (here is why this specific pattern of citations indicates influence of a specific kind) or remove the analytical framing and state only the facts.

---

## FAILURE CATEGORY 6: SIGNIFICANCE BY ASSERTION

**The pattern:** The writing asserts that something is important, groundbreaking, or significant — directly, without demonstration. It does not show why the thing is significant; it announces the significance as a fact.

**Why it fails:** Significance claims without evidence are the weakest form of persuasion. Any writer can call anything important. The claim is only worth the demonstration behind it — and when there is no demonstration, the claim becomes a negative signal: the writer couldn't demonstrate significance, so they asserted it.

**The tell:** "groundbreaking," "revolutionary," "landmark," "unprecedented," "transformative," "a vital contribution to," "a significant achievement in the field of."

**Real example:**
> "Her insights have also been featured in *Wired*, *Refinery29*, and other prominent media outlets."

**Why this is broken:** Media placements are listed as a substitute for demonstrating why the subject's work is significant. The list is the argument. But a list of outlet names is not an argument — it's the structure of an argument with no content inside it.

**The fix:** If the work is significant, state one specific reason it is significant — one thing it changed, one specific contribution, one concrete effect. If you can't, the significance claim should be removed.

---

## HOW TO ADD ENTRIES

When new failure patterns are identified in user output or in the wild, add them here using this format:

```
## FAILURE CATEGORY [N]: [NAME IN CAPS]

**The pattern:** [One sentence describing the pattern]

**Why it fails:** [2–3 sentences explaining the mechanism of failure — not just that it's bad, but why it breaks]

**The tell:** [The phrases or structural signals that mark this pattern]

**Real example:**
> "[Quote the actual text]"

**Why this is broken:** [Specific analysis of this example — what's missing, what's performed, what collapses]

**The fix:** [One sentence on what to do instead]
```

Real examples only. No invented examples. If you have a real example from user output (anonymized), it can be added here. If you only have a pattern description with no real example, add it to `core/anti-ai-rules.md` instead.
