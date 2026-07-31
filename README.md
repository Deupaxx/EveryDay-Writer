# EW — Everyday Writer

![Everyday Writer](assets/typing%20anime.gif)

A Claude Code / Claude Cowork skill system for professional writers.
Built on an A-Player standard: results over hours, own the outcome, no coinflipping critical components.

13 specialized writing sub-skills, all constrained by a voice fingerprint taken from your own writing and a set of anti-AI rules that get applied before anything ships.

---

## Installation

### Claude Code

Claude Code installs plugins from a marketplace. Two commands, run inside any session:

```
/plugin marketplace add Deupaxx/EveryDay-Writer
/plugin install ew@everyday-writer
```

Restart Claude Code (or run `/plugin` and reload) and the skills appear in the `/` menu as `/ew:linkedin`, `/ew:audit`, and so on.

To browse before installing, run `/plugin` and pick the marketplace from the menu.

---

### Claude.ai Cowork Mode

Cowork does not support file-based plugins. Use the pre-packaged files in [`cowork/`](cowork/) instead. They carry the YAML frontmatter Claude.ai expects.

1. Open the [`cowork/`](cowork/) folder in this repo
2. Upload `cowork/ew-master.md` to your Claude.ai Project (Settings → Project knowledge). That single file contains the full system: all rules, voice profiling, and all 13 sub-skills.
3. Optionally add the individual `ew-*.md` files for the skills you use most. Each is self-contained.
4. Type `/ew [your request]` in the chat, or name the skill directly.

See [`cowork/README.md`](cowork/README.md) for the full file list.

Cowork stores your voice profile in Claude.ai memory rather than on disk.

---

### npm (manual fallback)

For installs outside Claude Code's plugin system:

```bash
npx everyday-writer install
```

Or globally:

```bash
npm install -g everyday-writer
everyday-writer install
```

This copies the plugin into `~/.claude/plugins/ew/`. Note that a manual copy is not registered with the plugin system, so use the marketplace method above unless you have a reason not to.

**Uninstall:** `everyday-writer uninstall`

---

### Updating an existing install

The plugin is copied to your machine at install time and does not auto-update.

**Marketplace install:**
```
/plugin marketplace update everyday-writer
/plugin update ew@everyday-writer
```

**npm install:**
```bash
npm install -g everyday-writer@latest && everyday-writer install
```

Check your installed version with `everyday-writer --version`.

---

## Invocation

| Command | Purpose |
|---|---|
| `/ew:ew` | Master entry point. Runs onboarding on first use, then dispatches to the right sub-skill. |
| `/ew:newsletter-creative` | Story-led newsletters, personal essays, narrative issues |
| `/ew:newsletter-technical` | Tutorials, analysis, industry breakdowns, data-led explainers |
| `/ew:linkedin` | LinkedIn posts and articles |
| `/ew:tweets` | Tweets and X threads |
| `/ew:substack-notes` | Substack Notes |
| `/ew:web-copy` | Landing pages, homepages, product marketing |
| `/ew:sales-copy` | Sales pages, email sequences, direct response |
| `/ew:scene-structure` | Fiction scenes, chapters, prose |
| `/ew:script-writing` | Screenplays and scripts |
| `/ew:world-builder` | World bible questioner and generator |
| `/ew:audit` | Before/after rewrite with failure analysis |
| `/ew:outline` | Idea to outline, for any format |
| `/ew:failure-library` | Annotated AI-slop failure patterns |

You do not have to use the slash commands. Each skill carries a description, so asking for "a LinkedIn post about X" routes to the right one on its own.

Direct invocation skips routing, not constraints. Every sub-skill still reads the full core chain before writing.

---

## How it works

Every invocation runs the same sequence:

1. **Profile check.** Looks for `Completed: Yes` in `core/voice-profile.md`. If it's missing, onboarding runs first.
2. **Onboarding** (first run only). Seven steps, about five minutes. You paste samples, answer questions about goals and platforms, do one timed freewrite, and confirm five voice adjectives. The result is written to `core/voice-profile.md`.
3. **References check.** Any `.md` file you drop in `references/` is read and takes precedence over sub-skill defaults.
4. **Dispatch.** The sub-skill reads `core/anti-ai-rules.md`, then `core/ai_slop_commandments.md`, then `core/voice-profile.md`, then your reference files, then its own instructions, and only then writes.
5. **Two-pass loop.** No first draft is ever presented. The draft gets interrogated against three questions, revised, and run through two checklists before you see it.

### Three rules that govern everything

- **Precedence** (`anti-ai-rules.md` §0.1). Your voice profile outranks the system's style rules, and a sample you paste outranks the profile. The rules strip machine defaults, not you.
- **No fabrication** (§0.2). Nothing gets a name, number, date, quote, or source you didn't supply. Missing details come back as visible `[brackets]`, never as invented specifics.
- **Restraint** (§9 and §10). Tells are counted in clusters, not instances, and the things that prove a human wrote something are protected from the edit.

---

## System Map

```
EW/
├── README.md
├── CLAUDE.md                          ← Guidance for Claude Code when editing this repo
├── SKILL.md                           ← Master dispatcher (skill name: ew)
│
├── .claude-plugin/
│   ├── plugin.json                    ← Plugin manifest
│   └── marketplace.json               ← Marketplace manifest
│
├── bin/
│   ├── install.js                     ← npm install/uninstall CLI
│   └── check.js                       ← Package validator (npm run check)
│
├── core/
│   ├── anti-ai-rules.md               ← The operating standard, precedence, fabrication
│   │                                    rule, banned patterns, checklists, restraint
│   ├── ai_slop_commandments.md        ← Mechanism reference + era-indexed slop vocabulary
│   └── voice-profile.md               ← Your voice fingerprint (written during onboarding)
│
├── onboarding/
│   ├── ONBOARDING.md                  ← Environment detection and routing
│   ├── claude-code-mode.md            ← 7-step active onboarding (file-based)
│   └── claude-ai-cowork-mode.md       ← Memory-based onboarding (Claude.ai)
│
├── skills/
│   ├── newsletter-creative/SKILL.md
│   ├── newsletter-technical/SKILL.md
│   ├── linkedin/SKILL.md
│   ├── tweets/SKILL.md
│   ├── substack-notes/SKILL.md
│   ├── web-copy/SKILL.md
│   ├── sales-copy/SKILL.md
│   ├── scene-structure/SKILL.md
│   ├── script-writing/SKILL.md
│   ├── world-builder/
│   │   ├── SKILL.md
│   │   ├── questioner.md              ← Layered question sequence
│   │   └── skeleton-template.md       ← World bible output template
│   ├── audit/SKILL.md
│   ├── outline/SKILL.md
│   └── failure-library/SKILL.md
│
├── cowork/                            ← Claude.ai Cowork port (15 files, YAML frontmatter)
│   ├── README.md
│   ├── ew-master.md                   ← Whole system in one file
│   └── ew-*.md                        ← One file per sub-skill
│
├── references/                        ← Drop your own .md instruction files here
│   └── DROP-MD-FILES-HERE.md
│
└── resources/                         ← Background reference material, not part of dispatch
```

---

## Developing

There is no build step. Skills are markdown instruction files.

Before publishing, run the validator:

```bash
npm run check
```

It catches the failure modes that silently break plugin discovery: a skill file missing YAML frontmatter, a manifest in the wrong place, version drift between `package.json` / `plugin.json` / `marketplace.json`, and any sub-skill that has dropped one of the three core dependencies. It also runs automatically on `npm publish`.

**Releasing:**

```bash
npm version patch        # or minor / major
git push --follow-tags
```

Pushing a version tag publishes to npm. Bump the version in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` in the same commit; `npm run check` fails the publish if they drift.

---

## Design decisions

- **Plugin name is `ew`**, not `everyday-writer`, for a shorter invocation path.
- **The manifest lives in `.claude-plugin/`**, which is where Claude Code looks. A root-level `plugin.json` is ignored.
- **Every skill file carries YAML frontmatter.** Without `name` and `description`, Claude Code does not register the skill at all.
- **`core/` files are dependencies, not skills.** Every sub-skill reads all three; none of them is invoked directly.
- **`references/` is a user drop zone.** Never put system instructions there.
- **Onboarding splits by environment** — active and file-based in Claude Code, memory-based in Claude.ai.
- **The anti-AI rules include a restraint half.** A banlist applied without judgment produces prose stripped of whatever made it a person's. Sections 9 and 10 exist to stop that.

---

## License

MIT
