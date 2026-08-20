# EW World Builder - Draft Cartography Mode

Use this reference when the writer has already drafted chapters, scenes, a screenplay, notes, or a full manuscript and wants the world builder to map what is already on the page.

Draft Cartography Mode turns existing written work into a world map: characters, places, factions, objects, rules, timeline events, mysteries, continuity facts, and the relationships between them. It can produce an ordinary report, an Obsidian story graph, or both.

This mode is for writers who discovered the world by writing it first. Do not scold them for not building a bible earlier. The job is to recover the implied world and make the next drafting session easier.

---

## What This Mode Does

Draft Cartography Mode reads an existing written work and extracts:

- Characters: names, aliases, titles, roles, relationships, loyalties, goals, secrets, first appearances
- Places: locations, regions, buildings, routes, borders, recurring settings, controlling powers
- Factions: houses, governments, companies, crews, cults, families, armies, guilds, movements
- Rules: magic, technology, law, taboo, social codes, geography constraints, supernatural limits
- Objects: weapons, relics, documents, devices, symbols, heirlooms, currencies, medicines
- Timeline events: backstory events, scene events, promises, betrayals, deaths, discoveries, reveals
- Cultures and religions: beliefs, rituals, ancestry, customs, taboos, conflicts
- Mysteries and open threads: unanswered questions the draft creates
- Continuity risks: contradictions, renamed entities, timeline confusion, impossible geography, unstable rules

The output must separate what the draft confirms from what the AI companion is inferring.

---

## Trigger Phrases

Use this mode when the user says things like:

- "feed the world builder my draft"
- "map this manuscript"
- "extract characters from these chapters"
- "turn my existing story into a graph"
- "I already wrote some chapters; build the world bible from them"
- "find all the people, places, and factions in this draft"
- "reverse worldbuild this"
- "import this story into Obsidian"
- "make a character/place graph from my script"

Do not run the questioner first. The draft is the first source of truth.

---

## Required Input

At minimum, the AI companion needs the manuscript text or a readable file path.

If the user wants Obsidian graph files, also resolve the story folder using `obsidian-output.md`:

- If they give a vault path and a story title, create or update a folder inside that vault.
- If they give a main story folder path, use it directly.
- If no path is given, ask for the target story folder before writing files.

If the user only wants a report in chat, no folder is required.

For large manuscripts, process in chunks by natural boundaries:

1. Part
2. Chapter
3. Scene
4. Section break
5. Fixed-size chunk only when no better boundary exists

Preserve source labels such as `Chapter 4`, `Scene 12`, page numbers, act numbers, timestamps, or file names whenever available.

---

## Extraction Standard

The manuscript is evidence. Do not invent missing lore.

Every extracted fact must be classified as one of:

- **Confirmed:** directly stated or unambiguously shown in the text.
- **Strong inference:** not stated, but strongly implied by repeated context.
- **Question:** possible, ambiguous, contradictory, or under-supported.

Use short source references:

```markdown
Source: Ch. 3 / Scene 2
Evidence: "short phrase only"
```

Keep evidence excerpts brief. A phrase is enough. The source location matters more than a long quote.

Do not treat a name mention as proof of character importance. Importance comes from action, relationship density, point-of-view presence, recurrence, or structural weight.

Do not treat narrator speculation as fact unless the narration is reliable within the project.

---

## The Mapping Passes

Run these passes in order.

### Pass 1: Source Inventory

Create a simple source map:

```markdown
| Source | Scope | POV / focal character | Major entities introduced | Major events |
|---|---|---|---|---|
| Ch. 1 | opening chapter | Mara | Mara, The South Gate | Mara steals the ledger |
```

If the work is a screenplay or script, use acts, scenes, sluglines, locations, and character cues.

### Pass 2: Entity Extraction

List every durable story entity by type.

For each candidate, capture:

- Canonical name
- Aliases, nicknames, titles, alternate spellings
- Entity type
- First appearance
- Source locations
- Confirmed facts
- Strong inferences
- Open questions

Prefer canonical names already used by the writer. If the draft uses several names for what appears to be one entity, choose the most complete or formal name and list the others as aliases.

If two names might be the same entity but the evidence is not strong, do not merge them. Mark a question.

### Pass 3: Relationship Extraction

Extract graph edges, not just nodes.

Common relationship types:

- Family: parent of, child of, sibling of, spouse of, ancestor of
- Affiliation: member of, works for, sworn to, expelled from, hunted by
- Power: rules, controls, funds, protects, imprisons, blackmails
- Place: lives in, born in, travels to, banned from, hidden beneath
- Conflict: opposes, betrayed, killed, threatens, competes with
- Dependency: needs, owes, carries, protects, fears, worships
- Knowledge: knows secret about, hides truth from, discovered, witnessed
- Causality: caused, enabled, prevented, punished, revealed

Each edge should include a status:

- `confirmed`
- `inferred`
- `question`

Use relationship phrasing that can become readable Obsidian prose:

```markdown
- [[Mara Venn]] is hunted by [[The Ash Court]] after stealing [[The Salt Ledger]]. Source: Ch. 1.
```

### Pass 4: Continuity Extraction

Extract durable facts that future writing must respect:

- Dates, ages, seasons, distances, travel time
- Who knows what, and when they learn it
- Who has met whom
- Injuries, deaths, promises, debts, inheritances
- Rule limits, costs, exceptions, and consequences
- Geography facts and travel constraints
- Object possession and transfers

Write continuity facts in checkable language:

```markdown
- [Ch. 4] [[Jonas Reed]] has never been inside [[The Bone Library]] before this scene.
```

Avoid vague facts like "Mara is sad." Capture world and story-state facts that can break continuity later.

### Pass 5: Conflict and Gap Audit

Flag anything that could cause revision trouble:

- Same entity with conflicting names or titles
- Relationship status changes without an event explaining the change
- Travel that seems too fast for the established geography
- A rule that works differently in different scenes
- A dead, absent, injured, imprisoned, or ignorant character acting as if that state is not true
- Timeline order that cannot be reconciled
- An important entity introduced without enough context

Each issue uses:

```markdown
## [Issue Title]

**Type:** contradiction / timeline / geography / rule / identity / open thread
**Sources:** Ch. 2; Ch. 7
**Problem:** [plain statement]
**Possible resolutions:** [options that do not invent a final answer]
**Blocks:** [what future writing this affects]
```

---

## Report-Only Output

When the user does not request files, produce a concise draft map:

```markdown
# Draft Cartography Report: [Story Title]

## Source Coverage
[What was read, what was not read, and any limits.]

## Character Map
| Character | Role | First seen | Key links | Open questions |

## Place Map
| Place | Type | First seen | Connected entities | Open questions |

## Faction / Group Map
| Faction | Function | Members | Territory / influence | Open questions |

## Rule / System Map
| Rule | What is confirmed | Cost / limit | Contradictions |

## Object Map
| Object | Owner / location | Story function | Transfers |

## Timeline
| Order | Event | Source | Involved |

## Relationship Edges
- [[Entity A]] -> relationship -> [[Entity B]] (confirmed/inferred/question; source)

## Continuity Facts
- [Source] Fact.

## Contradictions and Open Threads
- [Issue] Sources, problem, possible resolution.

## Recommended Next Questions
1. [The highest-leverage question to answer before drafting further.]
```

Keep the report useful rather than exhaustive when the manuscript is large. Prioritize entities that recur, drive plot, create rules, or affect continuity.

---

## Obsidian Graph Output

When the user wants graph files, read `obsidian-output.md` before writing. Use its folder layout, filename rules, YAML frontmatter, graph rules, and update behavior.

Draft Cartography Mode adds these conventions.

### Additional Core Note

Create or update:

```text
05 - Draft Map Report.md
```

This note summarizes the mapping run and links to every entity created or updated.

### Draft Source Notes

If the source is long or split into many files, create:

```text
Drafts/
|-- Source Index.md
|-- Chapter 01.md            Optional summary note, not a copy of the chapter
|-- Scene 01.md              Optional summary note for scripts or scene-based work
```

Do not duplicate the manuscript into Obsidian unless the user explicitly asks. Source notes summarize coverage and link to extracted entities.

### Entity Note Updates

Add these sections to entity notes created or updated from a draft:

```markdown
## Draft Evidence

- [Ch. 2 / Scene 1] Confirmed: [fact]. Evidence: "short phrase"
- [Ch. 5] Inferred: [inference]. Evidence: "short phrase"

## Graph Edges

- [[Other Entity]] - [relationship type and status]. Source: [source].
```

If a note already has `Continuity Facts`, append confirmed facts there. Keep speculative items in `Open Questions`, not `Continuity Facts`.

### Frontmatter Additions

When updating frontmatter, preserve existing fields and add only missing ones:

```yaml
first_seen: "[OPEN: source]"
last_seen: "[OPEN: source]"
source_refs: []
certainty: confirmed
```

Use `certainty: mixed` when a note has both confirmed facts and unresolved identity or relationship questions.

### Story Hub Updates

Update `00 - Story Hub.md`:

- Add or refresh a `Draft Map` link to `[[05 - Draft Map Report]]`
- Add newly discovered entities to the Graph Index
- Add top continuity risks under `Current Draft Focus` only if they affect near-term writing

### Continuity Log Updates

Append confirmed continuity facts to `02 - Continuity Log.md`:

```markdown
- [Ch. 3] [[Entity]] fact. Links: [[Related Entity]], [[Rule]]
```

Do not add inferred facts to the continuity log. Put them in `03 - Open Questions.md`.

### Open Questions Updates

For every uncertain merge, missing motivation, unexplained rule, or possible contradiction, create or update a question in `03 - Open Questions.md`.

Use the format from `obsidian-output.md`, with source references added:

```markdown
## Possible duplicate: Mara / Maren

**Question:** [OPEN: Are Mara and Maren the same character, or two people with similar names?]
**Sources:** Ch. 1, Ch. 4
**Blocks:** Character graph, relationship map, continuity around the South Gate scene.
**Options:** Same person / separate characters / typo in Ch. 4
**Resolution:** [OPEN]
```

---

## Merge Behavior

When a story folder already exists:

- Preserve all user-written notes.
- Read existing note names, aliases, headings, and graph links before creating new notes.
- Merge new confirmed facts under the relevant headings.
- Keep old facts unless directly contradicted.
- If a new fact contradicts an existing fact, stop before writing that conflicting update and report the conflict.
- Do not rename notes automatically. Add aliases and ask before renaming.
- Do not collapse two entities into one note unless the evidence is strong or the user confirms.

The draft may disagree with the old bible. Treat that as useful signal, not an error. The writer decides whether the draft revises the bible or the bible corrects the draft.

---

## Anti-Fabrication Rules

This mode is especially vulnerable to plausible invention. Guard against it.

Do not invent:

- Surnames
- Ages
- Species
- Powers
- Geography
- Faction hierarchy
- Backstory causes
- Romantic relationships
- Object origins
- Dates
- Motivations

If the draft implies something but does not confirm it, mark it as a strong inference or question.

Use `[OPEN: ...]` rather than filling in attractive blanks.

---

## Completion Criteria

A Draft Cartography run is complete when:

- The source coverage is stated.
- Major characters, places, factions, rules, objects, and events have been extracted or explicitly marked absent.
- Every important entity has at least one source reference.
- Confirmed facts are separated from inferences and questions.
- Relationship edges are captured.
- Continuity risks and open threads are named.
- If Obsidian output was requested, the graph files are linked and the hub points to the draft map report.

The user should leave with the feeling: "I can now see the world I already wrote."
