# EW — Everyday Writer

![Everyday Writer](assets/typing%20anime.gif)

A Claude Code / Claude Cowork skill system for professional writers.
Built on an A-Player standard: results over hours, own the outcome, no coinflipping critical components.
Install target: `~/.claude/plugins/ew/` (drop the full folder as-is).

---

## Installation

### Claude Code

Run this inside any Claude Code session:
```
/install-plugin https://github.com/Deupaxx/EveryDay-Writer
```
Claude Code fetches the repo, registers the plugin, and makes `/ew` available immediately. All 13 sub-skills appear in the `/` command menu as `/ew:newsletter-creative`, `/ew:audit`, etc.

---

### Claude.ai Cowork Mode

Cowork mode doesn't support file-based plugins. Instead, paste the contents of `SKILL.md` directly into your Project Instructions (Settings → Project → Instructions). The skill will activate on every conversation in that project.

1. Open the [Everyday Writer GitHub repo](https://github.com/Deupaxx/EveryDay-Writer)
2. Open `SKILL.md` and copy the raw contents
3. In Claude.ai, go to your Project → Settings → Instructions
4. Paste the contents and save

Cowork mode uses memory-based voice profiles — onboarding will infer your voice from samples you paste rather than writing to a file.

---

### npm (manual fallback)

For manual installs outside Claude Code's plugin system:
```bash
npx everyday-writer install
```

Or install globally:
```bash
npm install -g everyday-writer
everyday-writer install
```

Copies plugin files directly to `~/.claude/plugins/ew/`.

**Uninstall:**
```bash
everyday-writer uninstall
```

**Updating to a new version:**
```bash
npm version patch   # 0.1.0 → 0.1.1 (bug fixes)
npm version minor   # 0.1.0 → 0.2.0 (new features)
npm version major   # 0.1.0 → 1.0.0 (breaking changes)
git push --follow-tags
```
Pushing a version tag automatically publishes to npm.

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
│   ├── newsletter-creative/SKILL.md  ← Creative/narrative newsletter writing
│   ├── newsletter-technical/SKILL.md ← Technical/informational newsletter writing
│   ├── linkedin/SKILL.md             ← LinkedIn post and article writing
│   ├── tweets/SKILL.md               ← X/Twitter post writing
│   ├── substack-notes/SKILL.md       ← Substack Notes writing
│   ├── web-copy/SKILL.md             ← Website and landing page copy
│   ├── sales-copy/SKILL.md           ← Sales pages, emails, direct response
│   ├── scene-structure/SKILL.md      ← Scene construction and pacing
│   ├── script-writing/SKILL.md       ← Screenplay and script format
│   ├── world-builder/
│   │   ├── SKILL.md                  ← Master file: questioner + skeleton generator overview
│   │   ├── questioner.md             ← Layered question system for extracting world context
│   │   └── skeleton-template.md      ← Structured markdown world bible output template
│   ├── audit/SKILL.md                ← Before/after rewrite comparison
│   ├── outline/SKILL.md              ← Idea-to-outline engine
│   └── failure-library/SKILL.md      ← Annotated AI-slop failure patterns
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
