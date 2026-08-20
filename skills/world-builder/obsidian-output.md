# EW World Builder - Obsidian Graph Output

Use this reference when the writer asks for Obsidian integration, a vault, a story graph, Markdown entity notes, character files, place files, faction files, or a world bible that lives inside a story folder.

The integration is filesystem-based. Do not require an Obsidian plugin or API. Obsidian reads ordinary Markdown files and builds the graph from links between them.

This reference also powers fast capture: the writer can drop a rough idea in one sentence and the AI companion should turn it into the smallest useful linked note set.

---

## Required Input

Before writing files, resolve the story folder:

- If the user gives an Obsidian vault path and a story title, create or update a folder inside that vault named after the story.
- If the user gives a main story folder path, use it directly.
- If no path is given, ask for the target story folder path before making files.

Never create files outside the folder the user selected for the story. If the requested path is ambiguous, ask.

---

## Folder Layout

Create this structure inside the main story folder. Use existing folders if they already exist.

```text
<Story Folder>/
|-- 00 - Story Hub.md
|-- 01 - World Bible.md
|-- 02 - Continuity Log.md
|-- 03 - Open Questions.md
|-- 04 - Idea Box.md
|-- 05 - Draft Map Report.md   Optional, created when mapping existing written work
|-- Characters/
|-- Places/
|-- Factions/
|-- Rules/
|-- Timeline/
|-- Cultures/
|-- Religions/
|-- Objects/                 Optional, for important story objects
`-- Drafts/
```

Only create `Objects/` when the project has important artifacts, weapons, technologies, texts, relics, or other story objects. The other folders are part of the core Obsidian layout.

Only create `05 - Draft Map Report.md` when using Draft Cartography Mode from `manuscript-ingest.md`, or when the user explicitly asks to map an existing draft.

---

## Graph Rules

The graph works because notes link to each other. Every entity note should have at least two meaningful links unless the project truly has too little information yet.

Use wiki links for graph edges. Use tags and YAML properties for filtering and grouping. Tags alone are not enough because the standard Obsidian graph shows the clearest relationship lines between linked notes.

Use Obsidian wiki links:

- `[[Character Name]]`
- `[[Place Name]]`
- `[[Faction Name]]`
- `[[Rule Name]]`
- `[[Timeline/Event Name]]`
- `[[Culture Name]]`
- `[[Religion Name]]`

Use aliases only when needed for readability:

- `[[Maren Vale|Maren]]`
- `[[The Glass Market|market]]`

Do not turn every noun into a link. Link durable story entities: characters, places, factions, rules, events, objects, mysteries, and major conflicts.

When a note mentions an entity that should exist but has not been defined, create a stub note with `[OPEN: what needs to be decided]`.

For every new entity, infer likely connections from the writer's phrasing and existing notes:

- Geography: "in the north", "near the capital", "beyond the river" -> link the region/place note.
- Allegiance or control: "under the Starks", "ruled by the guild" -> link the faction/house/government note.
- Religion and belief: "old religion", "temple town", "sacred to..." -> link or create the religion/rule notes.
- Culture and ancestry: "Andal", "First Men", "desert-born" -> link or create culture/people notes.
- History: "where the rebellion began" -> link or create a timeline event note.
- System rules: "magic fails there", "iron cannot cross it" -> link or create a rule note.

Prefer existing note names when a close match exists. Add aliases in frontmatter when the writer uses a shorthand name.

---

## Fast Capture Mode

Use this mode when the writer says things like "add this", "store this", "quick note", "remember this", "new town", "new character", "put this in the box", or gives a small worldbuilding fragment while drafting.

Do the capture in one pass:

1. Resolve the story folder. If it is unknown, ask for that path and stop.
2. Scan the story folder's existing `.md` notes by filename and headings so links point at the right canonical notes.
3. Classify the fragment: character, place, faction, rule, timeline event, culture, religion, object, open question, or raw idea.
4. Extract durable facts exactly as supplied. Do not invent missing lore.
5. Infer graph connections from explicit wording and obvious project vocabulary.
6. Create missing connected notes as stubs when the connection is important to the graph.
7. Create or update the main entity note with wiki links, frontmatter properties, tags, and the raw source line.
8. Append the raw fragment to `04 - Idea Box.md` with links to every note created or touched.
9. Update `00 - Story Hub.md` Graph Index if this is a new durable entity.
10. Report briefly: created/updated note, links added, open questions.

Avoid interrogation during fast capture. Ask only when:

- The target story folder is unknown.
- Two existing notes could both be the intended entity.
- A new fact contradicts an existing note.
- The fragment cannot be classified enough to choose a file.

### `04 - Idea Box.md`

The idea box is the writer's low-friction drop zone. It preserves the messy input while the entity notes hold cleaned continuity.

Each capture entry uses:

```markdown
## YYYY-MM-DD HH:mm - [Short label]

**Raw:** [writer's exact fragment]
**Type:** [place/character/faction/rule/timeline/culture/religion/object/raw]
**Created/updated:** [[Entity Note]]
**Connected to:** [[Relevant Entity]], [[Relevant Region]], [[Relevant Faction]]
**Open:** [OPEN: unresolved decision, or "None"]
```

Do not make the writer choose tags manually. Generate them from the entity type and links.

---

## File Naming

Use readable note names, not slugs, because Obsidian links are for humans:

- `Characters/Maren Vale.md`
- `Places/The Glass Market.md`
- `Factions/Memory Brokers.md`
- `Rules/Memory Transfer.md`
- `Timeline/The Burning of North Gate.md`

Remove characters that are unsafe in filenames: `< > : " / \ | ? *`. Replace `/` with `-`. Keep apostrophes only when the operating system allows them.

If two entities share a name, disambiguate in parentheses:

- `Characters/Aster (Protagonist).md`
- `Places/Aster (City).md`

---

## YAML Frontmatter

Every note gets frontmatter so Obsidian properties and graph filtering work.

Tags use lower-kebab names. Keep them broad enough to stay useful:

- `ew/place`
- `ew/place/town`
- `ew/region/north`
- `ew/faction/starks`
- `ew/religion/old-gods`
- `ew/culture/andals`

Story hub:

```yaml
---
type: story
status: in-progress
tags:
  - ew/story
genre: "[OPEN: genre]"
world: "[[01 - World Bible]]"
updated: YYYY-MM-DD
---
```

Character:

```yaml
---
type: character
status: active
role: "[OPEN: protagonist/supporting/antagonist]"
aliases: []
tags:
  - ew/character
appears_in: []
connections: []
updated: YYYY-MM-DD
---
```

Place:

```yaml
---
type: place
status: active
subtype: "[OPEN: town/city/region/building/wilderness]"
region: "[OPEN: region]"
controlled_by: "[OPEN]"
religions: []
cultures: []
tags:
  - ew/place
appears_in: []
connections: []
updated: YYYY-MM-DD
---
```

Faction:

```yaml
---
type: faction
status: active
power_base: "[OPEN: source of power]"
tags:
  - ew/faction
appears_in: []
connections: []
updated: YYYY-MM-DD
---
```

World rule:

```yaml
---
type: rule
status: active
system: "[OPEN: magic/technology/social/geography/history]"
tags:
  - ew/rule
connections: []
updated: YYYY-MM-DD
---
```

Timeline event:

```yaml
---
type: timeline-event
status: active
date: "[OPEN: in-world date]"
tags:
  - ew/timeline
connections: []
updated: YYYY-MM-DD
---
```

Culture:

```yaml
---
type: culture
status: active
aliases: []
tags:
  - ew/culture
connections: []
updated: YYYY-MM-DD
---
```

Religion:

```yaml
---
type: religion
status: active
aliases: []
tags:
  - ew/religion
connections: []
updated: YYYY-MM-DD
---
```

Use the real current date for `updated`. If exact in-world dates are unknown, leave them open.

---

## Core Notes

### `00 - Story Hub.md`

The hub is the entrance to the project.

Include:

- One-sentence premise
- Links to the central protagonist, antagonist, primary place, primary faction, and core world rule
- Links to `[[01 - World Bible]]`, `[[02 - Continuity Log]]`, `[[03 - Open Questions]]`, and `[[04 - Idea Box]]`
- A short "Current Draft Focus" section
- A "Graph Index" section grouped by Characters, Places, Factions, Rules, Cultures, Religions, Timeline, Objects

### `01 - World Bible.md`

Use `skeleton-template.md` as the source structure. Link the first mention of each entity to its note. Keep this as the canonical readable bible.

### `02 - Continuity Log.md`

Record durable facts established during drafting.

Use:

```markdown
- [Scene/Chapter] - Fact established. Links: [[Relevant Entity]], [[Relevant Rule]]
```

### `03 - Open Questions.md`

Collect unresolved decisions that could affect continuity.

Use:

```markdown
## [Topic]

**Question:** [OPEN: the unresolved decision]
**Blocks:** [Which scene/chapter/character/rule this affects]
**Options:** [Known options, if any]
**Resolution:** [OPEN]
```

When a question is answered, move the answer into the relevant note and keep a short resolved entry here only if the decision history matters.

### `04 - Idea Box.md`

Create this as a capture log, not a junk drawer. Every entry should point to the note it created or updated. If an idea is too raw to classify, keep it here with `Type: raw` and add one open question that would let it become a note later.

### `05 - Draft Map Report.md`

Create this when importing or mapping existing written work. It is the top-level report for what the draft already contains.

Include:

- Source coverage: files, chapters, scenes, or sections read
- Character map
- Place map
- Faction / group map
- Rule / system map
- Object map
- Timeline event map
- Relationship edges
- Confirmed continuity facts
- Strong inferences
- Contradictions and open threads
- Recommended next questions

Every entity name in the report should link to its note. Confirmed facts, inferences, and questions must stay separated.

---

## Entity Note Templates

### Character Note

```markdown
# Character Name

## Snapshot

- Role:
- Want:
- Need:
- Ghost:
- Fatal flaw:
- First appears:

## Relationships

- [[Other Character]] - relationship and tension
- [[Faction or Place]] - connection

## Arc

[Where they begin, what pressure changes them, where they end.]

## Continuity Facts

- [OPEN: facts established in draft]

## Source Captures

- [[04 - Idea Box]] - [date/short label]

## Draft Evidence

- [Source] Confirmed: [fact]. Evidence: "short phrase"
- [Source] Inferred: [inference]. Evidence: "short phrase"

## Graph Edges

- [[Other Entity]] - [relationship type and certainty]. Source: [source].

## Open Questions

- [OPEN: unresolved character decisions]
```

### Place Note

```markdown
# Place Name

## Snapshot

- Type:
- Region:
- Controlled by:
- First appears:

## Sensory Grounding

- Looks:
- Sounds:
- Smells:
- Feels:

## Story Function

[How this place creates pressure, reveals character, raises stakes, or makes conflict possible.]

## Connected Entities

- [[Character]]
- [[Faction]]
- [[Rule]]
- [[Religion]]
- [[Culture]]

## Continuity Facts

- [OPEN: facts established in draft]

## Source Captures

- [[04 - Idea Box]] - [date/short label]
```

### Faction Note

```markdown
# Faction Name

## Snapshot

- Power base:
- Public face:
- Private agenda:
- Opposes:
- Depends on:

## Members

- [[Character]]

## Territory / Influence

- [[Place]]

## Methods

[How they act in the world.]

## Open Questions

- [OPEN: unresolved faction decisions]
```

### Culture Note

```markdown
# Culture Name

## Snapshot

- Also known as:
- Homeland / origin:
- Associated places:
- Associated factions:
- Associated religions:

## Practices and Markers

[Visible customs, language, names, dress, taboos, or daily-life details.]

## Connected Entities

- [[Place]]
- [[Faction]]
- [[Religion]]

## Open Questions

- [OPEN: unresolved culture decisions]
```

### Religion Note

```markdown
# Religion Name

## Snapshot

- Worshipped by:
- Sacred places:
- Opposed by:
- Oldest known practice:

## Beliefs and Rituals

[What followers believe and what they do because of it.]

## Connected Entities

- [[Place]]
- [[Culture]]
- [[Faction]]
- [[Rule]]

## Open Questions

- [OPEN: unresolved religion decisions]
```

### Rule Note

```markdown
# Rule Name

## The Rule

[Clear statement of how this world rule works.]

## Limits and Costs

[What cannot happen, what it costs, and who pays.]

## Consequences

[What breaks if the rule is ignored or violated.]

## Affects

- [[Character]]
- [[Place]]
- [[Faction]]

## Open Questions

- [OPEN: unresolved rule decisions]
```

### Timeline Event Note

```markdown
# Event Name

## What Happened

[The event in plain terms.]

## Why It Matters Now

[Current consequences.]

## Involved

- [[Character]]
- [[Place]]
- [[Faction]]

## Open Questions

- [OPEN: unresolved timeline decisions]
```

---

## Update Behavior

When updating an existing story folder:

- Preserve user-written prose and notes.
- Append or merge new facts under the relevant headings.
- Do not delete notes unless the user explicitly asks.
- If a file already exists and the new information conflicts, stop and surface the contradiction with file names.
- Keep links stable. Renaming notes breaks graph history; ask before renaming.

When writing a scene after the graph exists:

- Read the story hub, world bible, relevant entity notes, open questions, and continuity log before drafting.
- After drafting, update affected entity notes and the continuity log with any durable world facts established by the scene.

---

## Fast Capture Example

Writer fragment:

> Add a town called Trojan Scape. It is in the North, under the Starks, and it is where one of the old religions was mainly practiced.

Expected graph behavior:

- Create or update `Places/Trojan Scape.md`.
- Link the body to `[[The North]]`, `[[House Stark]]`, and the relevant old religion note, such as `[[Old Gods]]`.
- If `[[Andals]]` already exists and the old religion/culture contrast is relevant in this project, link it under "Related Tensions" or create an open question rather than inventing a fact.
- Create stubs for missing important notes, such as `Places/The North.md`, `Factions/House Stark.md`, or `Religions/Old Gods.md`.
- Add tags like `ew/place`, `ew/place/town`, `ew/region/north`, `ew/faction/house-stark`, and `ew/religion/old-gods`.
- Append the raw fragment to `[[04 - Idea Box]]`.

The key is that clicking `[[The North]]` in Obsidian should reveal a graph line to `[[Trojan Scape]]`, because `Trojan Scape.md` explicitly links to `[[The North]]`.
