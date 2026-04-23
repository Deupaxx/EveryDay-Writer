# EW Sub-System — World Builder

**Dependency:** Read `core/anti-ai-rules.md` (Section 0 especially) before starting. This sub-system serves the fiction skills — it does not write prose directly. It builds the scaffold the prose will hang on.

---

## WHAT THIS SUB-SYSTEM IS FOR

World-building for fiction: novels, short stories, screenplays, games, and serialized narratives. The world builder extracts a complete, internally consistent world from the writer's ideas and produces a usable world bible — a reference document that makes every writing session faster and every creative decision easier.

The world exists to serve the story. Not the reverse. Every world-building decision made here must answer one question: **does this make the story more possible, or does it just make the world more elaborate?**

Elaborate is not the goal. Usable is the goal.

---

## THE TWO-PHASE PROCESS

**Phase 1 — Questioning (`questioner.md`):**
Claude conducts a structured, layered dialogue with the writer to extract the world's essential elements. The questions move from the large (what kind of world is this?) to the specific (what does someone eat for breakfast in the capital city?). Not every question applies to every project — the sequence adapts to genre and scope.

**Phase 2 — Skeleton Generation (`skeleton-template.md`):**
Claude takes the answers from Phase 1 and produces a formatted world bible. Every section of the bible is populated from the questioning. Open questions — things the writer hasn't decided yet — are captured as explicit blanks, not left as gaps that will surprise the writer mid-draft.

---

## WHEN TO USE WORLD BUILDER

Use it before writing the first scene. Not after. The single most expensive mistake in fiction is building a world as you write — which means making contradictory decisions in different scenes, then spending revision fixing the inconsistencies instead of improving the prose.

The world bible is a living document. It starts minimal and grows. But it must exist before the writing begins.

**Minimum viable world bible:** You do not need to answer every question before you start. You need to answer the questions whose answers will affect the first chapter. Everything else can be developed as you go — but it must be recorded in the bible when it's decided, not trusted to memory.

---

## HOW THE WORLD SERVES THE STORY

The world is not the point. The characters are the point. World-building earns its place when it does one of these things:

1. **Creates conflict** — the world's rules, politics, geography, or history creates a problem the character must navigate
2. **Reveals character** — the world's pressures expose who the character is under stress
3. **Raises stakes** — the world makes winning more meaningful and losing more costly
4. **Creates specificity** — a detailed world makes vague emotional events feel real

World-building that exists only to be admired is a procrastination strategy. If the writer can explain how the magic system works in great detail but cannot answer "what does my protagonist want in chapter one," the world is being used as an escape from the harder problem.

The hard problem is character. The world exists to make the character's problem worse.

---

## THE INTERNAL CONSISTENCY REQUIREMENT

A world only needs to follow its own rules. But it must follow them without exception. The moment the world breaks its own rules for the sake of plot convenience, the reader's trust is broken — and trust, once broken in fiction, is almost impossible to rebuild.

**The rule-to-consequence test:**
Every rule in your world must have a consequence if broken or avoided. A world where magic exists but nothing stops everyone from using it all the time is not a world — it's a decoration. What does magic cost? Who controls it? What happens to people who use too much of it? The constraint is more interesting than the capability.

---

## HOW THE BIBLE INTEGRATES WITH WRITING SESSIONS

When using `scene-structure.md` or `script-writing.md`, the world bible is the reference document. Before writing any scene set in a new location, check the bible. Before introducing a new faction, character, or rule — check whether it contradicts anything already established.

The bible is not a creative constraint. It is the creative foundation that makes freedom possible. You can only improvise well when you know the rules deeply.

---

## STARTING THE PROCESS

To begin, invoke `questioner.md`. Claude will run Phase 1 — the layered question sequence. Bring whatever you have: a premise, an image, a character name, a conflict you know you want to explore. The questioner works with fragments. You do not need a complete vision to begin.

When Phase 1 is complete, invoke `skeleton-template.md` to generate the bible.
