# EW — Everyday Writer

![Everyday Writer](assets/typing%20anime.gif)

A Claude Code / Claude Cowork skill system for professional writers.
Built on an A-Player standard: results over hours, own the outcome, no coinflipping critical components.
Install target: `~/.claude/plugins/ew/` (drop the full folder as-is).

---

## Invocation Model

| Command | Purpose |
|---|---|
| `/ew` | Master entry point. Runs onboarding on first use; dispatches to sub-skills after profile is established. |
| `/ew:newsletter-creative` | Direct sub-skill invocation (post-onboarding) |
| `/ew:newsletter-technical` | Direct sub-skill invocation |
| `/ew:linkedin` | Direct sub-skill invocation |
| `/ew:tweets` | Direct sub-skill invocation |
| `/ew:substack-notes` | Direct sub-skill invocation |
| `/ew:web-copy` | Direct sub-skill invocation |
| `/ew:sales-copy` | Direct sub-skill invocation |
| `/ew:scene-structure` | Direct sub-skill invocation |
| `/ew:script-writing` | Direct sub-skill invocation |
| `/ew:world-builder` | Direct sub-skill invocation |

---

## System Map

```
EW/
├── README.md                         ← You are here
├── SKILL.md                          ← Master entry point for /ew
├── plugin.json                       ← Plugin manifest (name, version, entry point)
│
├── onboarding/
│   ├── ONBOARDING.md                 ← Master onboarding logic and routing
│   ├── claude-ai-cowork-mode.md      ← Memory inference + gap-fill questions (Claude.ai)
│   └── claude-code-mode.md           ← Active onboarding: samples, goals, platforms (Claude Code)
│
├── core/
│   └── anti-ai-rules.md              ← Global writing rules applied by every sub-skill
│
├── skills/
│   ├── newsletter/
│   │   ├── creative.md               ← Creative/narrative newsletter writing
│   │   └── technical.md              ← Technical/informational newsletter writing
│   ├── linkedin/
│   │   └── linkedin.md               ← LinkedIn post and article writing
│   ├── shortform/
│   │   ├── tweets-x.md               ← X/Twitter post writing
│   │   └── substack-notes.md         ← Substack Notes writing
│   ├── copywriting/
│   │   ├── web-copy.md               ← Website and landing page copy
│   │   └── sales-copy.md             ← Sales pages, emails, direct response
│   └── fiction/
│       ├── scene-structure.md        ← Scene construction and pacing
│       ├── script-writing.md         ← Screenplay and script format
│       └── world-builder/
│           ├── WORLD-BUILDER.md      ← Master file: questioner + skeleton generator overview
│           ├── questioner.md         ← Layered question system for extracting world context
│           └── skeleton-template.md  ← Structured markdown world bible output template
│
└── references/
    └── DROP-MD-FILES-HERE.md         ← Instructions for dropping existing .md files here
```

---

## Design Decisions

- **Plugin name is `ew`** not `everyday-writer` — shorter invocation path (`/ew` vs `/everyday-writer`)
- **`world-builder/` lives inside `fiction/`** — world building serves the writing, not the reverse
- **`core/anti-ai-rules.md` is a dependency**, not a skill — every sub-skill draws from it; it is never invoked directly
- **`references/` is a user-facing drop zone** — the user dumps their existing instruction files here; Claude reads them when populating skills
- **Onboarding splits by environment** — `claude-code-mode.md` (active, user pastes samples) vs `claude-ai-cowork-mode.md` (passive, memory inference)
