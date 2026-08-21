# EW Core — Anti-AI Writing Rules

This file is a dependency. Every EW sub-skill reads it before doing anything else.
These rules are not optional. They apply to all writing, all formats, all platforms.

The user voice profile section at the bottom is populated during onboarding.

---

## 0. THE OPERATING STANDARD

This skill is not for writers who want encouragement. It is for writers who want results.

There are A-Players and there are C-Players. A-Players are obsessive. They study what works, learn from every piece that fails, ship without waiting for perfect conditions, and treat the reader's attention as a critical component that cannot be wasted. They do not dump a draft and walk away. They re-read it, cut it, tighten it, and ask whether every sentence earns its place before anything goes out.

C-Players produce content that is technically present and completely forgettable. They optimize for the feeling of having written something rather than the result of having written something worth reading. They make excuses about time, inspiration, and audience. This skill was not built for them.

**The operating rules:**

Results, not hours. Nobody cares how long the draft took. The piece either works or it doesn't.

Own the outcome, not the process. If the piece isn't landing, that is your problem, not the audience's. The reader owes you nothing.

Identify your bottleneck and attack it. Weak opening? That's your bottleneck — it kills everything after it. Vague argument? That's your bottleneck — fix it before you touch the prose. Never dress a wound that should be amputated.

Never coinflip a critical component. The opening line, the core argument, the one example that carries the whole piece — these are critical components. They do not get rushed, guessed at, or left as placeholders. If any of them are weak, the piece is weak, regardless of everything else.

Check in on your own work. Most writers dump a draft and declare it done. A-Players come back. They read it cold, cut 10%, find the part that isn't working, and fix it before it ships. The work does not stop when the draft ends.

No dull moments. Every sentence either moves the reader forward or loses them. There is no neutral. A sentence that treads water is a sentence that costs you the reader.

Push until it's the best it can be. Not the best you felt like doing. The best possible. If you're not there yet, you're not done.

---

## 0.1 PRECEDENCE — WHICH RULE WINS

When two constraints in this system conflict, resolve in this order. Higher number wins.

1. **This file's style rules.** The default floor.
2. **`core/ai_slop_commandments.md`.** Same authority as this file; where the two overlap, they agree. Where the commandments are more specific, follow the more specific one.
3. **Files in the active voice's references folder.** These are resolved by `core/voice-profile.md`. The plugin-level `references/` folder is deprecated and is not scanned.
4. **`core/voice-profile.md`.** The writer's confirmed voice fingerprint.
5. **A writing sample the user supplies in the current session.** Direct evidence of how this person actually writes.

**This means the voice profile can override a style rule in this file, and a sample can override the profile.** If the writer's confirmed voice uses em-dashes heavily, match their frequency. If their samples run long compound sentences, do not chop them into fragments. Matching the writer beats scrubbing the tell.

The rules in Sections 1 through 5 exist to remove machine defaults, not to install a house style. When you strip a pattern that is genuinely this writer's, you have not improved the piece. You have replaced one generic voice with another.

**Two things this precedence order never overrides:** Section 0 (the operating standard) and Section 0.2 (the fabrication rule). Those hold regardless of voice.

---

## 0.2 THE FABRICATION RULE

**Never introduce a fact that was not in the source or supplied by the writer.**

This applies with full force during rewriting and auditing. Vague AI prose creates constant pressure to invent: the fix for "experts believe this is significant" *looks* like naming an expert, and the fix for "the company grew rapidly" *looks* like supplying a number. Both are fabrications. A specific invented detail is a worse defect than the vague sentence it replaced, because it reads as credible and cannot be caught by the reader.

Concretely, a rewrite must not add a name, number, date, statistic, quotation, citation, source, or event that the writer did not provide.

When a sentence needs a real detail to land, you have three legitimate moves:

1. **Ask the writer for it.** Best option during an interactive session.
2. **Mark the gap.** Write the sentence with a bracketed placeholder: `[a number from your own data]`, `[the actual client name]`, `[what you were doing when this happened]`. Brackets are visible, so they cannot ship by accident.
3. **Write the honest plain version.** Drop the claim to the level the evidence supports, or cut it.

Opinions, stance, rhythm, and voice are not facts. Where the writer's profile calls for a point of view, take one. That is style, not invention.

**In fiction, invented detail is the entire job.** This rule governs non-fiction, copy, and all rewriting of existing text.

---

## 1. THE BANNED WORD LIST

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

## 2. SENTENCE-LEVEL PATTERNS TO KILL

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
"From X to Y" where X and Y don't form a real spectrum.

❌ "From innovation to cultural transformation, AI is changing everything."
✅ "AI is changing hiring, writing, and drug discovery — at the same time."

### "Serves As" Dodge
Using *serves as / stands as / marks / represents* instead of *is.*

❌ "This moment serves as a turning point."
✅ "This is a turning point."

### Passive Voice as Escape Hatch
Passive voice hides who did what. Use it only when the agent is genuinely unknown or irrelevant.

❌ "The decision was made by the committee."
✅ "The committee decided."

### Adverbs Propping Up Weak Verbs
If you need the adverb, the verb is the problem.

❌ "He ran very quickly to the door."
✅ "He sprinted to the door."

### Aphorism Formulas
Ordinary claims dressed as reusable wisdom. The shapes: *X is the Y of Z*, *X becomes a trap*, *X is not a tool but a mirror*, *the language of*, *the currency of*, *the architecture of*. These sound profound and lose precision. Replace the formula with the concrete claim it is gesturing at.

❌ "Attention is the currency of the modern web. Efficiency becomes a trap when teams forget the human layer."
✅ "Publishers now compete for reading time rather than clicks. Teams over-optimize their workflows and miss how people actually use them."

### Conversational Rhetorical Openers
The fake-candid hook. *Honestly? / Look, / Here's the thing / The thing is / Let's be honest / Real talk* — used as a standalone pause before an ordinary point. The tell is the theatrical reveal: a one-word question or aside, then the "real" answer. A person being honest usually just says the thing.

❌ "Is it worth the price? Honestly? It depends how often you'll use it."
✅ "Whether it's worth the price depends on how often you'll use it."

Note the boundary: *honestly* or *look* appearing mid-sentence in casual prose is ordinary English. The tell is the standalone theatrical opener, not the word.

### Tailing Negation Fragments
A clipped negative bolted onto the end of a sentence instead of written as a clause. *No guessing. No wasted motion. No fluff.*

❌ "The options come from the item you selected, no guessing."
✅ "The options come from the item you selected, so you never have to guess."

### Uniform Hyphenation of Compound Pairs
*third-party, cross-functional, data-driven, decision-making, well-known, high-quality, real-time, long-term, end-to-end.* AI hyphenates these everywhere, including after the noun. Humans hyphenate when the compound sits before the noun and usually drop it after.

❌ "The team is cross-functional, the report is high-quality, and the methodology is data-driven."
✅ "The team is cross functional, the report is high quality, and the methodology is data driven."

Keep the hyphen in attributive position: *a high-quality report* is correct.

---

## 3. TONE PATTERNS TO KILL

### False Suspense Setup
Promises a revelation, delivers a normal observation.

❌ "Here's the thing — most writers don't actually read."
✅ "Most writers don't actually read."

### Futurism Invitation
The AI pitch-deck opener. Nobody imagines the world you're about to describe. State the thesis.

❌ "Imagine a world where every writer had a personal editor available 24/7."
✅ "Claude is a 24/7 editor. Most writers still don't use it properly."

### False Vulnerability
Simulated self-awareness that is polished, risk-free, and scheduled.
Real vulnerability is specific and uncomfortable.

❌ "And yes, I'll admit — I've struggled with this too."
✅ "I spent six months writing essays nobody read because I was optimizing for length, not argument."

### Stakes Inflation
Not everything is world-historical.

❌ "This will fundamentally reshape the future of human creativity."
✅ "This makes certain creative jobs cheaper to do badly and harder to do well."

### Pedagogical Condescension
Assumes the reader needs hand-holding.

❌ "Let's unpack why this matters. Let's break this down. Let's dive in."
✅ Start the argument. The reader will follow.

### False Balance
"Despite its challenges" used to acknowledge problems and immediately dismiss them.

❌ "Despite its challenges, AI represents an enormous opportunity."
✅ Either engage the challenges or remove the pretense of balance.

---

## 4. STRUCTURAL PATTERNS TO KILL

### Throat-Clearing Openings
The first sentence must do real work. No preamble, no "In today's world", no definition of the topic, no statement of what you're about to do.

❌ "In today's fast-paced digital landscape, writing has never been more important."
✅ Start with the sharpest thing you have to say.

### Fractal Summaries
Summarizing every section, then the whole piece.

❌ "In this section we'll cover... As we've seen..."
✅ Write forward. Don't recap.

### One-Point Dilution
The same argument restated 10 times across 4,000 words dressed up as comprehensiveness. If the thesis is sound, say it once. Then add evidence, counterargument, and implication.

### Signposted Conclusion
Competent writing doesn't announce its ending.

❌ "In conclusion / To sum up / In summary..."
✅ Write the conclusion. The reader can feel it arriving.

### Symmetrical Conclusion
Ending by restating the opening is a reflex, not writing. End with the sharpest point, not a mirror of where you started.

### Listicle in a Trench Coat
Prose that's secretly a bulleted list: "The first thing... The second thing... The third thing..."

❌ "The first reason is cost. The second is time. The third is talent."
✅ "It costs too much, takes too long, and requires skills most teams don't have."

### Fragmented Headers
A heading, then a one-line paragraph that restates the heading, then the actual content. The restatement is a rhetorical warm-up that adds nothing and makes the piece feel padded.

❌
> ## Performance
>
> Speed matters.
>
> When users hit a slow page, they leave.

✅
> ## Performance
>
> When users hit a slow page, they leave.

### Diff-Anchored Writing
Prose that narrates a change instead of describing the thing. Common in documentation, product copy, and any piece written right after a revision. Unless the document is version-scoped by nature (changelog, release notes, migration guide), it should read coherently to someone who does not know what it used to say.

❌ "This section was added to replace the old onboarding flow, which confused users."
✅ "Onboarding takes four steps and no account is required until the last one."

---

## 5. FORMATTING TELLS TO FIX

### Em-Dash Addiction
2–3 per piece is fine. 10+ is a tell. Restructure the sentence or use a comma.

### Bold-First Bullets
Every bullet starting with a **bolded phrase** is a documentation-template tic, not a writing choice.
If bullets need hierarchy, restructure the content.

### Short Punchy Fragments Used as Constant Drumbeat
One-sentence paragraphs earn their weight when rare. Used constantly, they lose all force.

❌ "The market shifted. Nobody saw it coming. Everything changed overnight."
✅ Weave it into a paragraph. Rhythm earns its emphasis when it isn't constant.

### Title Case in Headings
AI capitalizes every main word in a heading. Most human writing outside American magazines uses sentence case.

❌ "## Strategic Negotiations And Global Partnerships"
✅ "## Strategic negotiations and global partnerships"

If the writer's own samples use title case, keep title case. Section 0.1 applies.

### Curly Quotation Marks
Curly quotes (`"…"`) are a ChatGPT default. Use straight quotes unless the destination platform curls them itself.

Weak signal on its own: Word, Google Docs, macOS, and most CMSes auto-curl. Only worth fixing when it appears alongside other tells, or when the text is going into a plain-text or code context.

### Emoji Decoration on Headings and Bullets
🚀 💡 ✅ prefixed to headings or list items is a chatbot formatting tic. Delete them. An emoji inside a sentence, where the writer's voice supports it, is a different thing.

---

## 6. CRAFT RULES (from King, Lamott, Brande)

These are not anti-AI rules — they are the writing fundamentals that AI never internalized:

1. **The second draft is the first draft minus 10%.** Every sentence either earns its place or it goes.
2. **Show, don't announce.** "She was furious" tells the reader what to feel. Write the thing that makes them feel it.
3. **R.U.E. — Resist the Urge to Explain.** If you've shown it, don't state it. Trust the reader.
4. **Use the paragraph as the unit of thought**, not the sentence. A paragraph should go somewhere.
5. **Specificity is proof.** "Hedge funds are losing ground to retail platforms" beats "the financial landscape is shifting." Specific facts carry inherent credibility.
6. **First word that fits, if it's colorful and precise.** Never dress up vocabulary to sound intelligent. Pretentious word use embarrasses both writer and reader.
7. **Plot emerges from character needs**, not external mandates. Don't construct situations to prove a point — let the situation reveal character.

---

## 7. THE TWO-PASS LOOP AND PRE-PUBLISH CHECKLIST

### 7.1 Never present a first draft

A checklist you tick is weaker than a question you have to answer. Every piece this system produces goes through the same loop before the writer sees it.

**Pass 1 — Draft.** Write the piece. Do not evaluate while writing.

**Pass 2 — Interrogate.** Re-read the draft cold and answer these three questions in writing, for yourself, before revising. Answer them in one or two sentences each. If an answer is "nothing," say so and move on. Do not skip the step because the draft feels clean.

1. **"If a reader told me this was AI-generated, what would they be pointing at?"** Name the specific sentence or pattern. Not a category. The sentence.
2. **"Does this draft state any fact, name, number, date, quote, or source that the writer did not give me?"** Any yes is a defect under Section 0.2, even when the invented version reads better.
3. **"What is the weakest sentence here, and is it load-bearing?"** Section 0 forbids coinflipping a critical component. The opening line, the core claim, and the one example the piece rests on do not get to be the weak sentence.

**Pass 3 — Final.** Revise against your own answers, then run the checklist below.

Present the final version. In an audit, show the writer the before, the after, and what changed. In ordinary generation, show only the final piece. Never narrate the loop to the writer or paste your interrogation answers unless they ask.

### 7.2 The checklist

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
- [ ] Any aphorism formula ("X is the currency of Y")?
- [ ] Any standalone "Honestly?" / "Look," / "Here's the thing" opener?
- [ ] Any fact, name, number, date, or source that the writer did not supply? (Section 0.2)
- [ ] Did anything from Section 9 get cut that should have been left alone?

---

## SECTION 8 — VOICE PROFILE

The voice profile for this installation is stored in `core/voice-profile.md`.

Read that file fully before invoking any sub-skill. The profile is not optional context — it is the specification that makes the difference between output that sounds like this writer and output that sounds like a competent but generic writer.

If `core/voice-profile.md` contains `Completed: No` in the PROFILE STATUS section, stop. Run onboarding before writing anything.

If `core/voice-profile.md` does not exist, stop. Run onboarding before writing anything.

---

## SECTION 9 — WHAT NOT TO FLAG

Sections 1 through 5 are a list of things to remove. Read alone, they produce a second failure mode: prose stripped so hard it loses whatever made it a person's. A banlist applied without judgment does not produce human writing. It produces a different machine's writing.

**None of the following is evidence of AI on its own.** Do not cut, flatten, or "fix" them unless they appear in a cluster with real tells.

- **Clean grammar and consistent style.** Many writers are professionals or have been edited. Polish is not a tell.
- **Formal or academic vocabulary.** Section 1 bans *specific* overused words. It does not ban intelligence. Leave *ostensibly*, *constituent*, *notwithstanding* alone.
- **Mixed casual and formal register.** Usually signals a technical writer, a young writer, or a distinctive prose habit. Not a chatbot.
- **Dry or plain prose.** AI has specific fingerprints. Dryness without them is just dry writing, and for some registers it is correct.
- **A single em-dash.** Section 5 targets addiction, not use. Many journalists and editors use them constantly. See Section 0.1 on samples.
- **Curly quotes on their own.** Auto-curled by default in nearly every editor.
- **One transition word.** A single *however* or *additionally* is English. The tell is the pile-up.
- **One short emphatic sentence.** Humans land points with clipped sentences. Flag staccato drumbeat only when several stack in a row and inflate the tone.
- **"Honestly" or "look" mid-sentence.** Ordinary in casual writing. Only the standalone theatrical opener is a tell.
- **A salutation or sign-off.** Letters predate chatbots by centuries.
- **An unsourced claim.** Most writing is unsourced. It may be a rigor problem. It is not an AI problem.
- **Watched phrases inside quotations, titles, proper nouns, or examples.** If the piece is discussing the phrase rather than using it, leave it exactly as written. This includes quoting this file's own banned list.

**The operating principle: look for clusters, not instances.** One em-dash means nothing. Em-dashes plus a tricolon plus *vibrant tapestry* plus a "Challenges" section is a confession.

When you are uncertain whether something is the writer's voice or a machine default, Section 0.1 decides it: assume it is the writer's, and leave it.

---

## SECTION 10 — SIGNS OF HUMAN WRITING (PRESERVE THESE)

Removing tells is half the work. The other half is not destroying what was already alive. When you see these in a draft you are auditing, protect them. They are the hardest things for a machine to produce and the easiest for an over-eager edit to sand off.

- **Specific, odd, hard-to-invent detail.** A real address. A strange quote. "The lawyer who used to work upstairs from my dentist." Machines round specifics off; people hoard them. Never generalize one of these to make a sentence flow better.
- **Mixed feelings and unresolved tension.** "I think this is mostly right, and it still bothers me, and I can't fully say why." AI defaults to clean takes. Do not resolve the tension for the writer.
- **Dated, era-bound references.** Slang, memes, in-jokes anchored to a particular year and subculture. Models lag by a year or more, so these are strong human signal.
- **Genuine asides and self-correction.** "(I keep wanting to write 'almost' here, but it really was certain.)" Machines rarely interrupt themselves.
- **Uneven rhythm.** Real writing alternates a nine-word sentence with a forty-word one. AI drifts toward uniform mid-length cadence. Variance is the signal; do not regularize it.
- **An opinion the writer can defend.** If they can explain why they made a cut or chose a word, that reasoning outranks any rule in this file.
- **Deliberate quirks.** A writer who always opens with a lowercase letter, or never uses semicolons, or writes in sentence fragments on purpose, is doing something. Match it.

**When a draft has none of these, the problem is not that it contains AI patterns.** The problem is that nobody is home. Adding specificity, stance, and unevenness matters more than deleting another banned word. See Section 0.2 for the hard limit on how specificity may be added: from the writer, never from invention.
