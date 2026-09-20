---
name: world-builder
description: |
  Build the world a story hangs on: characters, locations, factions, rules, and history. Use
  before or alongside fiction and screenwriting work when the setting needs to be consistent. Runs
  a layered questioner, generates a structured world bible, and can reverse-map existing drafts
  into characters, places, factions, rules, timelines, continuity facts, and graph links.
  Includes Obsidian-ready story folders, character/place notes, fast idea capture, draft
  cartography, and graph links when the user wants vault integration.
license: MIT
metadata:
  version: "0.3.0"
---

# EW Sub-System — World Builder

**Dependency chain. Read these in order before starting:**

1. `core/runtime-contract.md` (short operating contract; does not replace the full rules)
2. `core/obsidian-workspace.md` (resolve storage and persistence rules)
3. `core/anti-ai-rules.md` (full standard)
4. `core/ai_slop_commandments.md` (mechanism reference and diagnostic checklist)
5. `core/voice-profile.md` (voice resolver; require the resolved profile's `Completed:` field to be exactly `Yes`, otherwise stop and run onboarding)
6. Any `.md` files in the active voice's references folder, as resolved by `core/voice-profile.md`

**Recovery exception:** For `/ew:world-builder repair <operation-id>` or `resume`, stop this chain after step 4, read `obsidian-output.md`, and perform only its command-local journal validation/recovery. Do not resolve a voice, load references, ask creative questions, or generate new content.

This sub-system serves the fiction skills. It does not write prose directly. It builds the scaffold the prose will hang on.

---

## WHAT THIS SUB-SYSTEM IS FOR

World-building for fiction: novels, short stories, screenplays, games, and serialized narratives. The world builder extracts a complete, internally consistent world from the writer's ideas and produces a usable world bible — a reference document that makes every writing session faster and every creative decision easier.

The world exists to serve the story. Not the reverse. Every world-building decision made here must answer one question: **does this make the story more possible, or does it just make the world more elaborate?**

Elaborate is not the goal. Usable is the goal.

---

## THE CORE PROCESSES

**Phase 1 — Questioning (`questioner.md`):**
The AI companion conducts a structured, layered dialogue with the writer to extract the world's essential elements. The questions move from the large (what kind of world is this?) to the specific (what does someone eat for breakfast in the capital city?). Not every question applies to every project — the sequence adapts to genre and scope.

**Phase 2 — Skeleton Generation (`skeleton-template.md`):**
The AI companion takes the answers from Phase 1 and produces a formatted world bible. Every section of the bible is populated from the questioning. Open questions — things the writer hasn't decided yet — are captured as explicit blanks, not left as gaps that will surprise the writer mid-draft.

**Phase 3 — File output:**
Read `obsidian-output.md` only when the user explicitly requests Obsidian graph output and supplies an existing vault root plus a contained story folder. Resolve both component by component, reject symlinks/junctions/reparse redirects, and use vault-root folder-qualified wiki links. A plain or non-vault folder is not graph mode: create at most one portable `World Bible.md` using ordinary headings, with no frontmatter, wiki links, backlink promises, entity folders, graph indexes, or `obsidian-output.md`/`manuscript-ingest.md` graph templates. If the user wants multi-file linked output, ask for an explicit existing Obsidian vault and contained story folder before writing.

**Fast Capture Mode — Idea Box to Graph (`obsidian-output.md`):**
When the user gives a small worldbuilding fragment and asks to add, store, capture, remember, or note it, do not run the full questioner. In explicit Obsidian graph mode, read `obsidian-output.md`, identify the entity and its implied connections, and run its recoverable multi-note transaction protocol across the entity note, `04 - Idea Box.md`, hub/index, and all stubs or links. Outside a verified vault, add the fragment under the appropriate ordinary heading in the single portable `World Bible.md`; do not create entity notes or graph metadata. Ask when the target is unknown or a collision would update the wrong file.

**Operation recovery (`/ew:world-builder repair <operation-id>` or `resume`):**
Dispatch directly to `obsidian-output.md`'s journal recovery procedure. Do not begin the questioner, generate new lore, or run ordinary profile/reference resolution. Perform command-local validation of the explicit vault, story folder, operation ID, journal, and planned paths; resume only the recorded intent. Never create a new operation ID to hide or duplicate an incomplete one.

**Draft Cartography Mode - Existing Work to Graph (`manuscript-ingest.md`):**
When the user has already written chapters, scenes, scripts, notes, or a full manuscript and wants the world mapped from the draft, do not start with the questioner. Read `manuscript-ingest.md`; read `obsidian-output.md` only for an explicit verified-vault request. Extract entities and relationships from evidence, separate confirmed facts from inferences and open questions, and capture continuity risks. Outside Obsidian graph mode, put the result in the single portable `World Bible.md` or return it in chat; do not create graph notes.

---

## WHEN TO USE WORLD BUILDER

Use it before writing the first scene whenever possible. Also use it after drafting has already begun. Many writers discover the world by writing into it first; when that happens, the world builder reverse-maps what the draft already implies, then turns those discoveries into a usable bible and graph.

The single most expensive mistake in fiction is leaving the world only inside scattered pages and memory, which means making contradictory decisions in different scenes, then spending revision fixing the inconsistencies instead of improving the prose.

The world bible is a living document. It starts minimal and grows. Ideally it exists before the writing begins. If the writer already has pages, build the first bible from those pages and keep going.

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

When an Obsidian story folder exists, the graph notes are also reference documents. Character, place, faction, object, rule, and timeline notes must be checked before drafting scenes that touch them. If the draft establishes a durable fact, add it to the relevant note and to the continuity log.

Fast capture should feel nearly frictionless. The writer should be able to toss in a niche idea mid-flow and get a linked note back without having to fill out a form.

Draft cartography should feel like switching on the lights inside a manuscript. The writer gives the pages they already have; the world builder returns the characters, places, factions, rules, timeline events, objects, relationships, confirmed continuity facts, contradictions, and open threads that are already present. It must cite where facts came from and avoid inventing missing lore.

The bible is not a creative constraint. It is the creative foundation that makes freedom possible. You can only improvise well when you know the rules deeply.

---

## STARTING THE PROCESS

To begin a new world from fragments, invoke `questioner.md`. The AI companion will run Phase 1 — the layered question sequence. Bring whatever you have: a premise, an image, a character name, a conflict you know you want to explore. The questioner works with fragments. You do not need a complete vision to begin.

When Phase 1 is complete, invoke `skeleton-template.md` to generate the bible.

To map an existing draft, invoke `manuscript-ingest.md` first. Use the draft as the source of truth, then generate a report, update the world bible, or create Obsidian graph files depending on what the user asked for.

For every Obsidian operation whose write set contains multiple notes, preflight and journal the whole set before the first mutation. Mark the operation complete only after re-reading and verifying the graph and indexes.
