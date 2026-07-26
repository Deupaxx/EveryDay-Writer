# EW Skill — Academic Writing

**Dependency:** Read `core/anti-ai-rules.md` (all 8 sections including Section 0) and `core/ai_slop_commandments.md` before writing anything.

---

## WHAT THIS SKILL IS FOR

Academic and research writing: essays, dissertation chapters, journal articles, general research/analytical reports, and explainer pieces that translate dense academic material for a wider audience.

This is the one EW skill where the register is formal by convention, not by AI-slop default. The job is not to sound casual and punchy — it's to sound like a rigorous, precise scholar who respects the reader's time and the discipline's norms. A-Player standard still applies: no padding, no filler, no claim without support.

---

## STEP 0: IDENTIFY THE MODE

Before writing, confirm which of the five modes applies. If ambiguous, ask directly — the structural contract is different for each.

| Mode | Audience | Primary contract |
|---|---|---|
| **Essay** | Instructor, general academic reader | Thesis-driven argument, sustained through evidence |
| **Dissertation chapter** | Committee, defense | Positions work within the field, exhaustive on its specific claim, methodologically airtight |
| **Journal article** | Peer reviewers, field specialists | Novel contribution, tightly scoped, defensible against the harshest reader in the field |
| **General report** | Non-specialist stakeholders (business, policy, client) | Findings and implications first, methodology in service of credibility, not the point |
| **Explainer piece** | Educated non-specialist | Faithfully translates the source research without dumbing down the actual finding |

Ask the discipline too if it isn't obvious — conventions differ (a lit review in sociology reads nothing like one in computer science), and the citation style may follow discipline norms rather than the default below.

---

## CITATION STYLE

**Default: APA (7th edition).** Use this unless the user specifies otherwise or the discipline has an obvious convention (e.g., IEEE for CS/engineering, Chicago for history/humanities, Bluebook for law). Ask once if the mode is dissertation chapter or journal article and the field isn't already established in the conversation — getting this wrong late costs a full reformatting pass.

**Citation integrity is non-negotiable.** Never invent a source, a page number, a study, or an author to fill a gap in the argument. If a claim needs a citation and none has been provided or found, do one of two things:
- Flag it directly: "This claim needs a source — do you have one, or should I flag it for you to find?"
- Mark it inline as `[CITATION NEEDED]` and tell the user explicitly in your response, not just in the document.

A fabricated citation in academic work is not a style failure — it's the piece of writing that gets a dissertation rejected or a career investigated. Treat it as a hard boundary, not a quality nice-to-have.

---

## RECONCILING WITH ANTI-AI-RULES

Some of `core/anti-ai-rules.md` needs adjustment for this register. Apply judgment, not a blanket override:

**Still fully enforced:**
- Banned vocabulary (Section 1) — "delve," "underscore," "showcase," "leverage," and the rest are AI tells in academic writing too, not just marketing copy.
- Vague authority gestures ("studies show," "experts agree") — worse here than anywhere else. Name the study. Cite the expert.
- Filler transitions, throat-clearing openings, signposted conclusions, fractal summaries — academic writing has its own version of these tics (see below) and they're just as fatal to a strong piece.
- Specificity is proof. A claim without a citation or a data point is an opinion wearing a lab coat.

**Adjusted for register:**
- **Passive voice:** Not banned outright. Methods sections in the sciences conventionally use passive ("Participants were recruited via...") because the actor is genuinely irrelevant to the claim. Use active voice as the default; drop to passive only when the discipline convention calls for it or the actor truly doesn't matter.
- **Hedging:** Academic claims are hedged deliberately, not as a confidence failure. "The data suggest" instead of "the data prove" is often the accurate claim, not a weak one. The difference between AI hedge-slop and real academic hedging: real hedging is calibrated to actual uncertainty in the evidence, not reflexive throat-clearing. If you're hedging every sentence regardless of how strong the evidence is, that's the AI tell — fix it.
- **Formal register:** Contractions, sentence fragments, and direct-address ("you") are generally out for dissertation/journal modes. They're fine for explainer pieces and acceptable in general reports depending on audience.

**Academic-specific slop to kill (not covered elsewhere in core files):**
- **Literature review as list.** "Smith (2019) found X. Jones (2020) found Y. Chen (2021) found Z." with no synthesis between them. A lit review argues a position about the state of the field — it doesn't recite it.
- **"Little research has been done on..." as a justification crutch.** A gap in the literature is not automatically a reason the gap matters. State why the gap matters, not just that it exists.
- **Over-qualified thesis statements.** "This paper will attempt to explore some possible ways in which X might potentially relate to Y" is five hedges protecting a claim that hasn't been made yet. State the actual claim.
- **Résumé-of-findings conclusions that add nothing.** A conclusion that only restates the abstract is dead weight. It should synthesize, state implications, and (where the mode calls for it) name limitations and future work specifically — not generically.

---

## STRUCTURAL CONTRACTS BY MODE

**Essay:** Thesis in the introduction, not buried. Each body paragraph carries one claim in service of the thesis, supported by evidence, closed by explaining what the evidence proves — not what it "shows" vaguely. Conclusion synthesizes, doesn't summarize.

**Dissertation chapter:** Opens by stating what this chapter does and how it fits the dissertation's overall argument (one paragraph, not a page). Situates within existing literature specifically enough that a committee member can see exactly what's new. Methodology must be reproducible from the description alone. Findings and interpretation are kept distinct — report what was found before arguing what it means.

**Journal article:** Abstract states the contribution in one or two sentences before any throat-clearing. Introduction moves fast to the gap and the paper's specific contribution — reviewers are impatient. Related work is argumentative (positions this paper against the field), not a list. Results and discussion sections stay disciplined about not overclaiming beyond what the data support — reviewers will find every overclaim.

**General report:** Findings and recommendation up front (executive-summary logic even without a literal exec summary header). Methodology is present but compressed — enough to establish credibility, not a full academic treatment. Written for a reader who will act on this, not grade it.

**Explainer piece:** Opens with why the finding matters to this reader specifically, not with the paper's own abstract. Simplifies vocabulary without simplifying the actual claim — if the explainer implies a stronger or different result than the source supports, it has failed regardless of how readable it is. Links back to the source.

---

## POST-GENERATION REVIEW

After producing any draft, stop. Re-read `core/anti-ai-rules.md` Sections 1–7 and `core/ai_slop_commandments.md` Section 6, applying the register adjustments above, then go through the checklist below.

## PRE-SUBMIT CHECKLIST

- [ ] Is every citation real, checkable, and correctly attributed — none invented or half-remembered?
- [ ] Does the thesis/contribution appear early, stated plainly, not buried in hedges?
- [ ] Is the lit review (if present) synthesizing a position, not listing findings?
- [ ] Is passive voice used only where the actor is genuinely irrelevant or discipline convention requires it?
- [ ] Is hedging calibrated to actual evidence strength, not applied reflexively to every sentence?
- [ ] Does the conclusion synthesize and state implications, or does it just restate the abstract?
- [ ] Any banned vocabulary from `core/anti-ai-rules.md` Section 1?
- [ ] Any vague authority gestures without a named, checkable source?
- [ ] Does the citation style match what was confirmed with the user (APA default)?
- [ ] Would a hostile peer reviewer / committee member find an unsupported claim?
