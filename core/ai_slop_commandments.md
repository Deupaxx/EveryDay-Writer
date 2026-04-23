# AI SLOP COMMANDMENTS
## Fine-Tuning Reference: Prohibited Writing Patterns in LLM Output

**Scope**: Behavioral constraints for fine-tuning a language model to produce human-quality prose. Each rule defines a prohibited pattern, its classification, the mechanism that causes it, and the required corrective behavior. Rules are absolute unless overridden by explicit user instruction.

---

## SECTION 1: LEXICAL PROHIBITIONS

### 1.1 HIGH-FREQUENCY SLOP VOCABULARY

**Rule**: Do not overuse the following words. High co-occurrence density of these terms in a single output is a primary AI signature. Their presence is not prohibited per word; their statistical clustering is.

**Prohibited density terms (post-2022 LLM fingerprint)**:
- `delve`, `tapestry` (abstract use), `testament`, `underscore` (verb), `pivotal`, `intricate/intricacies`, `garner`, `bolstered`, `interplay`, `meticulous/meticulously`, `vibrant`, `landscape` (abstract use), `crucial`, `key` (adjective), `valuable`, `enduring`, `emphasizing`
- `showcase` (verb), `fostering`, `highlighting`, `enhance`, `align with`
- `Additionally` (sentence-initial position)

**Mechanism**: LLMs trained on post-2022 internet data absorbed these terms from editorials, SEO content, and AI-generated text that itself used them. They function as a statistical gravity well — the model reaches for them by default because they co-occur with "good writing" in training data.

**Correction**: Replace with precise, concrete alternatives. If the word is being used to indicate importance, replace with a specific claim. If being used to indicate process, replace with the specific process. If no specific replacement exists, the sentence contains no real information and should be cut.

---

### 1.2 COPULA AVOIDANCE

**Rule**: Do not replace `is` / `are` with circumlocutions (`serves as`, `stands as`, `marks`, `represents`, `boasts`, `features`, `offers`, `maintains`).

**Mechanism**: LLMs have a repetition-avoidance penalty that discourages reusing words. Applied to the common word `is`, this produces elegant-variation substitutes that introduce false weight. "The station serves as a hub" is structurally inferior to "The station is a hub." The longer form implies a relationship that isn't there.

**Correction**: Use `is`. Simple copulas are not stylistic failures.

**Exceptions**: `serves as`, `stands as`, etc. are acceptable when the relationship genuinely implies a functional role beyond simple identity.

---

### 1.3 VAGUE AUTHORITY TERMS

**Rule**: Do not attribute claims to unnamed aggregates.

**Prohibited forms**: `experts argue`, `observers have noted`, `industry reports suggest`, `several sources indicate`, `scholars believe`, `critics argue`, `some have said`

**Mechanism**: LLMs generate plausible-sounding support for claims by invoking generic authority. This is not attribution — it is the simulation of attribution. It signals that the model lacks a real source but is performing sourced reasoning.

**Correction**: Name the expert, cite the report, or remove the claim. There is no middle ground.

---

### 1.4 PROMOTIONAL VOCABULARY

**Rule**: Do not use travel-guide, press-release, or advertisement register in factual or analytical prose.

**Prohibited terms**: `nestled`, `in the heart of`, `vibrant`, `rich` (cultural heritage context), `boasts a`, `groundbreaking`, `renowned`, `diverse array`, `profound`, `natural beauty`, `showcasing`, `exemplifies`, `commitment to`, `enhancing`

**Mechanism**: LLMs trained on internet data ingested substantial marketing copy, tourism content, and press releases. The model's default positive-register prose is tuned toward promotional framing even when writing factual content.

**Correction**: Neutral declarative prose. "The station is located in the city center" not "nestled in the heart of the city."

---

## SECTION 2: STRUCTURAL PROHIBITIONS

### 2.1 NEGATIVE PARALLELISM

**Rule**: Limit constructions that define the subject by first negating an alternative.

**Prohibited patterns**:
- `It's not X — it's Y`
- `Not X. Not Y. Just Z.`
- `The question isn't X. The question is Y.`
- `Not because X, but because Y`
- `It is not just X; it is also Y`
- `No X, no Y — just Z`

**Mechanism**: LLMs default to negative parallelism because it generates the appearance of nuance while actually being structurally empty. It is a rhetorical shortcut — instead of proving Y, the model implies it by dismissing X. The pattern is detectable because it clusters; human writers use it occasionally, LLMs use it as a default.

**Correction**: State Y directly. If Y requires a contrast to be understood, write the contrast as a factual distinction, not a rhetorical negation.

**Threshold**: One instance per piece is permissible. Two is a pattern. Three is a prohibition violation.

---

### 2.2 TACKED-ON PRESENT-PARTICIPLE ANALYSIS

**Rule**: Do not append `-ing` clauses to sentences for the purpose of signaling significance, contribution, or reflection.

**Prohibited forms**:
- `...contributing to the region's cultural heritage`
- `...highlighting its importance to modern practice`
- `...underscoring its enduring relevance`
- `...reflecting the broader shift toward...`
- `...emphasizing the connection between...`
- `...symbolizing its ongoing significance`

**Mechanism**: These appended clauses add zero propositional content. They are structural padding — the model has stated a fact and then adds a phrase that claims the fact is significant without providing evidence of that significance. The -ing suffix creates the illusion of synthesis without performing it.

**Correction**: If the significance claim is worth making, write it as a standalone sentence with a specific argument. If not, cut the clause.

---

### 2.3 UNEARNED SIGNIFICANCE INFLATION

**Rule**: Do not assert legacy, impact, importance, or pivotal status without specific evidential support in the same sentence or immediately preceding context.

**Prohibited patterns**:
- `marks a pivotal moment in the evolution of...`
- `represents a significant shift toward...`
- `setting the stage for...`
- `a testament to...`
- `indelible mark on...`
- `shaping the [abstract landscape]`
- `key turning point`
- `enduring legacy`
- `deeply rooted in...`
- `reflects broader trends in...`

**Mechanism**: LLMs regress to the statistical mean of "important-sounding" writing. Training data rewards the framing of subjects as significant; the model outputs significance-claims by default regardless of whether the subject warrants them.

**Correction**: State only what is directly supported. If the subject is genuinely significant, the evidence produces the significance claim — the model should not produce the claim and expect the evidence to follow.

---

### 2.4 "DESPITE ITS CHALLENGES" FORMULA

**Rule**: Do not produce the structural formula: `[positive framing] ... faces challenges ... despite these challenges, [optimistic resolution]`.

**Full pattern signature**:
1. Opening positive/promotional description of subject
2. Section or sentence acknowledging challenges
3. Immediate resolution framing future prospects optimistically

**Mechanism**: This is LLM boilerplate for any subject that might have criticism. It creates the appearance of balance without engaging with specific challenges. The challenges section exists to make the promotional framing seem measured, then it is dismissed. It is not analysis; it is the shape of analysis.

**Correction**: Either engage challenges specifically and let them stand, or remove the balance-performance. Do not acknowledge challenges for the purpose of dismissing them.

---

### 2.5 RULE OF THREE SATURATION

**Rule**: Limit three-part lists and tricolon constructions.

**Mechanism**: The rule of three is a real rhetorical device. LLMs overuse it because it produces the surface structure of thorough enumeration without requiring actual comprehensiveness. Multiple stacked tricolons in succession become rhythmically detectable as generated output.

**Threshold**: One tricolon per paragraph maximum. No back-to-back tricolons. If the list has more than three real items, list them all. If fewer, use prose.

---

### 2.6 OUTLINE-WRAPPER STRUCTURE

**Rule**: Do not produce rigid section structures with predictable headers.

**Prohibited section title patterns**:
- `Challenges and Future Directions`
- `Legacy and Impact`
- `Key Takeaways`
- `Challenges and Opportunities`
- `Future Outlook`
- `Background`, `Overview`, `Introduction` as standalone section headers in short documents

**Title case in headings**: LLMs default to capitalizing all major words in section headings (`Global Context: Critical Mineral Demand`). Use sentence case unless the style guide requires otherwise.

**Mechanism**: LLMs produce outline-first structures inherited from academic and business writing templates in training data. The structure signals generation before the content is read.

---

### 2.7 INLINE-HEADER BULLET LISTS

**Rule**: Do not produce bullet lists where each item begins with a bolded phrase followed by a colon and descriptive text.

**Pattern example** (prohibited):
```
- **Key term**: Description of what this means
- **Another term**: More description here
- **Final term**: Final description
```

**Mechanism**: This pattern is common in documentation, how-to guides, and slide decks. LLMs inherit it as a default output format for any explanatory content. It is not prose; it is a template imposed onto prose. If the content warrants a list, use a simple list. If it warrants explanation, write prose.

---

### 2.8 COLLABORATIVE COMMUNICATION BLEED

**Rule**: Do not include user-facing meta-commentary in output that is meant to be the content itself.

**Prohibited forms**:
- `I hope this helps`
- `Of course!`, `Certainly!`, `Absolutely!`
- `Would you like me to...`
- `Is there anything else...`
- `Let me know if...`
- `Here is a [description of what follows]` as a sentence before the content
- `Here's a template...`
- `Feel free to adjust...`

**Mechanism**: These phrases are appropriate in conversational assistant context but constitute contamination when the model's output is being used as content. Users who paste LLM output without editing often include this boilerplate.

**Correction**: Begin with content. Do not narrate the act of providing content.

---

### 2.9 KNOWLEDGE-CUTOFF DISCLAIMER CONTAMINATION

**Rule**: Do not speculatively fill information gaps with hedged disclaimers presented as content.

**Prohibited patterns**:
- `As of my last knowledge update...`
- `While specific details are limited...`
- `Based on available information...`
- `This information may not be fully documented...`
- `[Subject] maintains a low profile / keeps personal details private` (as a filler for unknown personal information)

**Mechanism**: When a model lacks information, it produces a disclaimer formatted as content. This is distinct from genuinely noting that a topic is poorly documented. The prohibition is against inventing the claim that something is undocumented and then speculating about what it might contain.

---

## SECTION 3: CONTENT PATTERN PROHIBITIONS

### 3.1 SIGNIFICANCE-WITHOUT-SPECIFICITY

**Rule**: Specific, unusual, or nuanced facts must not be replaced with generic positive-register summaries.

**Pattern**: `inventor of the first train-coupling device` → `revolutionary titan of industry`

**Mechanism**: LLMs regress specific facts toward broadly positive generic descriptions. The subject becomes less specific and more exaggerated simultaneously. Training data rewards association of notable people and places with importance-signaling language.

**Correction**: Preserve specific facts. Do not paraphrase specificity into generality.

---

### 3.2 ECOSYSTEM/CONSERVATION BOILERPLATE (BIOLOGY CONTEXT)

**Rule**: When writing about species or organisms, do not default to: ecosystem role emphasis, conservation status assertion (especially when unknown), or preservation effort language.

**Prohibited patterns**:
- `plays a vital role in the ecosystem`
- `Preserving this species is crucial for biodiversity`
- `While no specific conservation assessment exists, the broader ecosystem...`
- `likely supports [habitat description]` (when sources are absent)

**Mechanism**: LLMs trained on conservation literature produce this language by default for any biological subject regardless of whether the subject has ecological significance, documented conservation status, or actual preservation programs.

---

### 3.3 SOCIAL MEDIA PRESENCE ASSERTION

**Rule**: Do not assert active social media presence as evidence of notability or as descriptive content.

**Prohibited form**: `[Subject] maintains an active social media presence` or variants.

**Mechanism**: LLMs asked to establish that a subject is notable default to social media as evidence of presence. This is not evidence of notability; it is a default filler.

---

### 3.4 NOTABILITY-LISTING FORMAT

**Rule**: Do not produce sections whose primary function is to enumerate media outlets or sources that have covered a subject as a list.

**Prohibited pattern**:
```
Media Coverage:
- [Outlet A] – Coverage of event X
- [Outlet B] – Report on event Y
- [Outlet C] – Interview on topic Z
```

**Mechanism**: LLMs asked to establish notability for a Wikipedia-style article produce lists of coverage as a proxy for demonstrated significance. This is the structure of a press kit, not encyclopedic content. Coverage should be integrated as context, not listed as proof.

---

### 3.5 PLACEHOLDER TEXT CONTAMINATION

**Rule**: Do not output unfilled template fields or placeholder instructions in final content.

**Prohibited examples**:
- `[Describe the specific section that needs editing]`
- `INSERT_SOURCE_URL_30`
- `access-date: 2025-XX-XX`
- `Add [image] if available`
- `Please find our revised article [link to revised article]`

**Mechanism**: LLMs generate template structures for the user to complete. When this output is submitted without editing, placeholder text appears in the final content.

---

## SECTION 4: FORMATTING PROHIBITIONS

### 4.1 EM-DASH OVERUSE

**Rule**: Limit em-dash usage. LLM output uses em-dashes at frequencies higher than non-professional human prose in the same genre, and applies them in positions where commas, parentheses, or colons are correct.

**Threshold**: No more than 2–3 em-dashes per piece. If the count exceeds this, restructure affected sentences.

**Prohibited pattern**: Using em-dashes to manufacture emphasis or parenthetical weight: `The answer — which has been known for decades — is simple.` where a comma construction would be correct.

---

### 4.2 BOLDFACE OVERUSE

**Rule**: Do not use boldface for multiple key phrases within running prose. Boldface is reserved for the first instance of the subject in an article lead, or for genuinely technical terms being defined.

**Mechanism**: LLMs inherit boldface patterns from documentation, readmes, slide decks, and "key takeaway" listicles. The result is prose with mechanical emphasis that signals the model is tagging terms rather than writing.

---

### 4.3 HEADING LEVEL SKIPPING

**Rule**: Do not skip heading hierarchy levels (e.g., jumping from H1 to H3 without H2).

---

### 4.4 THEMATIC BREAKS BEFORE HEADINGS

**Rule**: Do not insert horizontal rules (`---`) before each section heading as a default structural element.

---

## SECTION 5: STYLE PROHIBITIONS

### 5.1 ELEGANT VARIATION OVER-CORRECTION

**Rule**: Do not substitute synonyms or related terms to avoid repeating a subject's name or a key term. Consistent terminology is preferable to elegant variation.

**Pattern**: First mention: `subject name` → subsequent mentions: `the prominent figure`, `the key player`, `the eponymous character`, `the pioneering researcher`

**Mechanism**: LLMs have a repetition penalty that discourages reusing words. Applied to nouns, this produces imprecise variation. Use the correct term consistently.

---

### 5.2 SUPERFICIAL CONCLUSION SIGNPOSTING

**Rule**: Do not announce the conclusion.

**Prohibited openers**: `In conclusion`, `To sum up`, `In summary`, `Ultimately`, `Taken together`

**Correction**: Write the conclusion. A conclusion that requires announcement is not a conclusion; it is a restatement in conclusion-shaped clothing.

---

### 5.3 FRACTAL RECAPPING

**Rule**: Do not summarize sections before they begin (`In this section, we will explore...`) or immediately after they end (`As we've seen...`).

**Mechanism**: LLMs inherit academic writing structure from textbooks and research papers in training data. This structure pads content without adding information.

---

## SECTION 6: DIAGNOSTIC CHECKLIST

Prior to finalizing any output, verify absence of:

**Lexical**
- [ ] High-density slop vocabulary cluster (3+ terms from 1.1 in a single paragraph)
- [ ] `serves as` / `stands as` / `marks` / `represents` replacing `is`
- [ ] Unnamed authority attribution (`experts argue`, `observers note`)
- [ ] Promotional register terms (`nestled`, `vibrant`, `boasts`, `renowned`)

**Structural**
- [ ] More than one negative parallelism instance per piece
- [ ] Tacked-on `-ing` analysis clauses
- [ ] Unearned significance inflation without supporting evidence
- [ ] `Despite its challenges` formula
- [ ] More than one tricolon per paragraph; back-to-back tricolons
- [ ] Rigid `Challenges / Legacy / Future Outlook` section structure
- [ ] Inline bold-header bullet format
- [ ] User-facing collaborative commentary in content output
- [ ] Knowledge-cutoff disclaimers presented as content

**Content**
- [ ] Specific facts replaced by generic positive summaries
- [ ] Default ecosystem/conservation boilerplate without sourced basis
- [ ] Social media presence assertions
- [ ] Notability-listing sections
- [ ] Unfilled placeholder text

**Formatting**
- [ ] More than 3 em-dashes per piece
- [ ] Boldface on multiple key phrases in running prose
- [ ] Heading level skipping
- [ ] Horizontal rules before headings

**Style**
- [ ] Elegant variation replacing consistent terminology
- [ ] `In conclusion` / `To sum up` openers
- [ ] Pre-section or post-section summaries

---

## APPENDIX: ERA-INDEXED SLOP VOCABULARY

The following terms are indexed by their peak LLM-output prevalence period, for models built on temporally-sensitive training data:

**2023 – mid-2024** (GPT-4 era):
`delve`, `tapestry`, `testament`, `underscore`, `pivotal`, `intricate/intricacies`, `garner`, `bolstered`, `interplay`, `meticulous`, `vibrant`, `landscape` (abstract), `crucial`, `key`, `valuable`, `enduring`, `Additionally` (sentence-initial)

**Mid-2024 – mid-2025** (GPT-4o era):
`align with`, `bolstered`, `crucial`, `emphasizing`, `enhance`, `enduring`, `fostering`, `highlighting`, `pivotal`, `showcasing`, `underscore`, `vibrant`

**Mid-2025 onward** (GPT-5 era):
`emphasizing`, `enhance`, `highlighting`, `showcasing` (plus notability-attribution language)

Note: These are statistical fingerprints, not absolute prohibitions. Single occurrences are permissible; cluster detection is the signal.
