# EW World Builder - Obsidian Graph Output

Use this reference only when the writer asks for Obsidian graph integration and provides an explicit existing Obsidian vault plus an explicit contained story folder. It is not the template for plain-folder output.

The integration is filesystem-based. Do not require an Obsidian plugin or API. Obsidian reads ordinary Markdown files and builds the graph from links between them.

This reference also powers fast capture: the writer can drop a rough idea in one sentence and the AI companion should turn it into the smallest useful linked note set.

---

## Output modes and required input

Obsidian graph mode must require both an explicit Obsidian vault root and an explicit story-folder path (or a story title from which to propose the direct contained folder). Require the vault root to be an existing real directory with a direct `.obsidian/` directory. Resolve the story folder as a lexical descendant of that vault; reject an equal/outside path with path-aware relative semantics. Starting at the lexical vault root and continuing component by component through the story folder and every target, use `lstat` plus Windows reparse-point-aware checks and reject every symlink, junction, mount point, or other redirect before canonicalizing it, even when the redirect lands inside the same vault. Canonicalize existing real components, prove containment again, validate missing components from their nearest existing real parent, and create only with exclusive/no-replace semantics.

For every **existing** story-path component, preserve its exact actual vault-relative name and casing in the computed story prefix; do not normalize or reconstruct that prefix from user text. Reject any existing component containing ASCII controls or wiki metacharacters `# ^ [ ] |`, because such a component cannot be represented safely in an EW wiki target. For each component, inspect the lexical entry for a symlink, junction, mount point, or reparse redirect before canonicalizing that component; this componentwise redirect rejection is mandatory. Normalize only genuinely new components before exclusive creation.

If the user supplies only a non-vault/plain folder, this reference does not apply. State that portable output cannot promise Obsidian graph or backlink behavior, then create one `World Bible.md` with ordinary Markdown headings and no frontmatter, wiki links, relative-link graph, entity-note tree, or graph templates. Do not use the folder layout below or `manuscript-ingest.md`'s graph sections. If the requested vault root or story folder is missing or ambiguous, ask for it and stop before making graph files. Never infer a vault root from the current directory, a story folder basename, or a configured EW vault.

Never create files outside the folder the user selected for the story. New notes and directories use exclusive/no-replace creation after collision checks. For every existing hub, log, index, or entity note updated by read-modify-write, retain the bytes/hash read, re-read immediately before atomic replacement, and stop if it changed concurrently.

In Obsidian graph mode compute one vault-root-relative story prefix, for example `Fiction/The Glass City`: preserve exact names/casing for existing path components and use normalized names only for newly created ones. Every wiki-link target must begin with that complete folder prefix and include the entity subfolder when applicable. Omit only `.md`: `[[Fiction/The Glass City/Characters/Maren Vale|Maren]]`. Never use basename-only, note-relative, or story-folder-relative wiki targets. Derive aliases separately. This makes duplicate entity names elsewhere in the vault unambiguous.

## Recoverable multi-note transaction protocol

Every operation that may create or update more than one note—including fast capture, draft cartography publication, story-folder setup, and scene-to-continuity write-back—uses this protocol. A sequence of independent best-effort writes is forbidden.

1. Generate a unique opaque operation ID before any mutation. Under the validated story folder, reserve `.ew-operations/<operation-id>.md` exclusively; an existing ID is never reused for a new intent. The journal is a managed regular file, must pass the same componentwise redirect and containment checks, and records `state: prepared|applying|verifying|complete|repair-required`.
2. Preflight the **full write set**. Record every target relative path, intended action, exact proposed final-byte hash, and its preimage: `absent` or the existing regular file's exact bytes/hash and file identity. Include the story hub, Idea Box, continuity log, report, every entity/stub note, and any index touched. Resolve all contradictions and filename collisions before publishing the journal. If the complete set is not known, do not write.
3. Give each planned mutation an idempotent marker derived from the operation ID. Generated append blocks use `<!-- ew-operation:<operation-id>:<target-role> -->`; frontmatter/index mutations record the same ID in the journal without inserting invalid metadata. On retry, a matching marker plus matching final hash means that step already succeeded. A matching marker with different bytes, or the same raw capture already indexed under another operation, is a conflict. Never append a duplicate Idea Box entry or duplicate graph-index link.
4. Publish the prepared journal exclusively, re-read it, then change it to `applying` only with compare-and-swap. For each target, revalidate type, containment, redirects, identity, and the recorded preimage immediately before writing. Create absent targets exclusively. Update existing targets through an exclusively created sibling temporary file and atomic replace only when the preimage still matches. After each target, re-read and record its verified final hash in the journal with compare-and-swap.
5. If interrupted or any compare-and-swap fails, leave the journal and verified writes in place, set `repair-required` when that CAS is still safe, and report the operation ID. Do not roll back user-visible files by guesswork and do not start a replacement operation for the same capture.
6. `/ew:world-builder repair <operation-id>` (or `resume`) bypasses ordinary generation, validates the story root and journal locally, rebuilds no intent, and resumes only missing planned steps whose current state is either the recorded preimage or already the exact planned final hash. Any unplanned file, changed preimage, mismatched marker, or ambiguous duplicate stops for user review.
7. After all writes, set `verifying`, re-read the full write set, and verify exact final hashes, unique operation markers, no duplicate Idea Box entry, all planned vault-root-qualified links, reciprocal hub/index links, and every expected graph target. Mark `complete` only after this graph/index verification passes. A completed journal is immutable evidence; later changes require a new operation.

Do not claim a capture, graph update, or import is complete merely because its entity note exists. Report `repair-required` plus the operation ID until the complete-state verification succeeds.

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

Use vault-root folder-qualified Obsidian wiki links (where `<story>` is the validated exact path from vault root to the story folder):

- `[[<story>/Characters/Character Name|Character Name]]`
- `[[<story>/Places/Place Name|Place Name]]`
- `[[<story>/Factions/Faction Name|Faction Name]]`
- `[[<story>/Rules/Rule Name|Rule Name]]`
- `[[<story>/Timeline/Event Name|Event Name]]`
- `[[<story>/Cultures/Culture Name|Culture Name]]`
- `[[<story>/Religions/Religion Name|Religion Name]]`

Use aliases only when needed for readability:

- `[[<story>/Characters/Maren Vale|Maren]]`
- `[[<story>/Places/The Glass Market|market]]`

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
**Created/updated:** [[<story>/<Entity Folder>/Entity Note|Entity Note]]
**Connected to:** [[<story>/<Entity Folder>/Relevant Entity|Relevant Entity]], [[<story>/Places/Relevant Region|Relevant Region]], [[<story>/Factions/Relevant Faction|Relevant Faction]]
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

Remove ASCII controls and characters that are unsafe in filenames or Obsidian targets: `< > : " / \ | ? * # ^ [ ]`. Replace `/` and `\` with `-`, collapse whitespace, trim trailing periods/spaces, and reject empty, traversal, or Windows device names. Apply this to every user-derived note filename and every generated wiki-link target component before adding `.md`. Keep apostrophes only when the operating system allows them.

Derive display aliases separately: remove controls plus `# ^ [ ] |`, collapse whitespace, trim, and fall back to the normalized filename when empty. Never interpolate a raw entity name into `[[target|alias]]`. Double-quote user-derived YAML strings and escape backslashes, double quotes, and line breaks; never place raw user text in YAML keys, tags, or unquoted scalars.

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
world: "[[<story>/01 - World Bible|World Bible]]"
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
- Links to `[[<story>/01 - World Bible|World Bible]]`, `[[<story>/02 - Continuity Log|Continuity Log]]`, `[[<story>/03 - Open Questions|Open Questions]]`, and `[[<story>/04 - Idea Box|Idea Box]]`
- A short "Current Draft Focus" section
- A "Graph Index" section grouped by Characters, Places, Factions, Rules, Cultures, Religions, Timeline, Objects

### `01 - World Bible.md`

Use `skeleton-template.md` as the source structure. Link the first mention of each entity to its note. Keep this as the canonical readable bible.

### `02 - Continuity Log.md`

Record durable facts established during drafting.

Use:

```markdown
- [Scene/Chapter] - Fact established. Links: [[<story>/<Entity Folder>/Relevant Entity|Relevant Entity]], [[<story>/Rules/Relevant Rule|Relevant Rule]]
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

- [[<story>/Characters/Other Character|Other Character]] - relationship and tension
- [[<story>/<Entity Folder>/Faction or Place|Faction or Place]] - connection

## Arc

[Where they begin, what pressure changes them, where they end.]

## Continuity Facts

- [OPEN: facts established in draft]

## Source Captures

- [[<story>/04 - Idea Box|Idea Box]] - [date/short label]

## Draft Evidence

- [Source] Confirmed: [fact]. Evidence: "short phrase"
- [Source] Inferred: [inference]. Evidence: "short phrase"

## Graph Edges

- [[<story>/<Entity Folder>/Other Entity|Other Entity]] - [relationship type and certainty]. Source: [source].

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

- [[<story>/Characters/Character|Character]]
- [[<story>/Factions/Faction|Faction]]
- [[<story>/Rules/Rule|Rule]]
- [[<story>/Religions/Religion|Religion]]
- [[<story>/Cultures/Culture|Culture]]

## Continuity Facts

- [OPEN: facts established in draft]

## Source Captures

- [[<story>/04 - Idea Box|Idea Box]] - [date/short label]
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

- [[<story>/Characters/Character|Character]]

## Territory / Influence

- [[<story>/Places/Place|Place]]

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

- [[<story>/Places/Place|Place]]
- [[<story>/Factions/Faction|Faction]]
- [[<story>/Religions/Religion|Religion]]

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

- [[<story>/Places/Place|Place]]
- [[<story>/Cultures/Culture|Culture]]
- [[<story>/Factions/Faction|Faction]]
- [[<story>/Rules/Rule|Rule]]

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

- [[<story>/Characters/Character|Character]]
- [[<story>/Places/Place|Place]]
- [[<story>/Factions/Faction|Faction]]

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

- [[<story>/Characters/Character|Character]]
- [[<story>/Places/Place|Place]]
- [[<story>/Factions/Faction|Faction]]

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
- Link the body to `[[Fiction/Example Story/Places/The North|The North]]`, `[[Fiction/Example Story/Factions/House Stark|House Stark]]`, and the relevant old religion note, such as `[[Fiction/Example Story/Religions/Old Gods|Old Gods]]`.
- If `[[Fiction/Example Story/Cultures/Andals|Andals]]` already exists and the old religion/culture contrast is relevant in this project, link it under "Related Tensions" or create an open question rather than inventing a fact.
- Create stubs for missing important notes, such as `Places/The North.md`, `Factions/House Stark.md`, or `Religions/Old Gods.md`.
- Add tags like `ew/place`, `ew/place/town`, `ew/region/north`, `ew/faction/house-stark`, and `ew/religion/old-gods`.
- Append the raw fragment to `[[Fiction/Example Story/04 - Idea Box|Idea Box]]`.

The key is that clicking `[[Fiction/Example Story/Places/The North|The North]]` in Obsidian should reveal a graph line to `[[Fiction/Example Story/Places/Trojan Scape|Trojan Scape]]`, because `Trojan Scape.md` explicitly links to the full vault-root-qualified target for The North.
