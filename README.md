# EW — Everyday Writer

![Everyday Writer](assets/typing%20anime.gif)

A writing skill system for professional writers, compatible with Codex, Claude Code, and Claude.ai Cowork.
Built on an A-Player standard: results over hours, own the outcome, no coinflipping critical components.

13 specialized writing sub-skills, all constrained by a voice fingerprint taken from your own writing and a set of anti-AI rules that get applied before anything ships.

Hold as many voices as you need — your own, plus a separate profile for every ghostwriting client. Switching is one command, and nothing bleeds between them.

---

## Creative writing and storytelling

Everyday Writer is also a **Claude creative writing skill**, **Claude script writing skill**, and **Claude storytelling skill** for people who want more than a prompt that says "write better." It gives Claude Code, Codex, or Claude.ai Cowork a full fiction workflow:

- **Storytelling:** turn a premise into an outline, pressure-test the conflict, and keep the character want/need visible
- **Creative writing:** draft fiction scenes and chapters with scene mechanics, point of view discipline, sensory grounding, and subtext
- **Creative newsletters:** write internet essays like silent scripts, with hooks, scene pressure, rehooks, spoken cadence, and payoff
- **Script writing:** write screenplay, TV, short film, YouTube, documentary, video essay, sketch, and short-form scripts with format rules, filmable action, hooks, dialogue, pacing, and viewer retention
- **World-building:** build a world bible, then capture new towns, factions, religions, rules, and lore into Obsidian-ready Markdown notes
- **Revision:** audit a draft against the voice profile and anti-AI writing rules before showing the final version

Searchers looking for a "creative writing skills Claude" setup usually want one of three things: a repeatable storytelling process, a script-writing skill with real screenplay constraints, or a worldbuilding memory that does not lose niche lore. EW now routes those requests directly instead of treating creative writing as one generic writing mode.

---

## Installation

Everyday Writer supports three environments:

- **Codex:** install as a local skill and invoke with `$ew`
- **Claude Code:** install through Claude's plugin marketplace or npm and invoke with `/ew`
- **Claude.ai Cowork:** upload the packaged cowork Markdown files to Project knowledge

The npm default install targets Codex. The Claude Code install path is still supported through `install:claude` and the `.claude-plugin/` marketplace manifests remain in the package.

### Codex

Install the skill into your local Codex skills folder:

```bash
npx everyday-writer install
```

Or globally:

```bash
npm install -g everyday-writer
everyday-writer install
```

This copies the skill into `~/.codex/skills/everyday-writer/`. Voice profiles still live in `~/.everyday-writer/`, so reinstalling the skill never overwrites your writing calibration.

Use `$ew` to start, or call a sub-skill directly with `$ew:world-builder`, `$ew:scene-structure`, `$ew:linkedin`, and so on.

---

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

Cowork stores your voice profiles in Claude.ai memory rather than on disk — one `EW Voice Profile — [Name]` memory per voice, plus an `EW Active Voice` memory holding the one in effect. Add `cowork/ew-voice.md` if you want the full voice-management flow.

---

### Claude Code npm install

For installs outside Claude Code's marketplace system, but still targeting Claude's plugin folder:

```bash
npx everyday-writer install:claude
```

Or globally:

```bash
npm install -g everyday-writer
everyday-writer install:claude
```

This copies the plugin into `~/.claude/plugins/ew/`. Note that a manual copy is not registered with the marketplace update flow, so use the marketplace method above unless you have a reason not to.

**Uninstall from Codex:** `everyday-writer uninstall`

**Uninstall from Claude Code:** `everyday-writer uninstall:claude`

---

### Updating an existing install

The plugin is copied to your machine at install time and does not auto-update.

**Marketplace install:**
```
/plugin marketplace update everyday-writer
/plugin update ew@everyday-writer
```

**Codex npm install:**
```bash
npm install -g everyday-writer@latest && everyday-writer install
```

**Claude npm install:**
```bash
npm install -g everyday-writer@latest && everyday-writer install:claude
```

Check your installed version with `everyday-writer --version`.

**Upgrading from 0.2.0 →** your voice profile used to live at `core/voice-profile.md` inside the plugin. Updating replaces that directory, so copy the file somewhere safe first, then bring it across:

```
/ew:voice import <path-to-your-old-voice-profile.md>
```

If you've already updated and lost it, onboarding rebuilds it in about five minutes. Profiles now live in `~/.everyday-writer/`, which updates cannot touch.

---

## Multi-voice

One voice is active at a time and persists across sessions.

```
/ew:voice                     List voices, show which is active
/ew:voice writer-main         Switch — everything writes in this voice until changed
/ew:voice new                 Add a voice (yours, or a ghostwriting client's)
/ew:voice edit                Recalibrate the active voice
/ew:voice import <path>       Bring in a profile you already have
/ew:voice delete <name>       Remove one
```

**Write a single piece in another voice without switching:**

```
/ew:linkedin as client-acme
```

That applies to one invocation. The active voice is untouched.

**Adding a client.** `/ew:voice new` asks whose voice it is. Your own runs the standard seven-step onboarding, freewrite included. Someone else's runs a sample-analysis flow instead — you paste their published writing and confirm the read as their ghostwriter. There's no freewrite, because you can't ask an absent person for one, and the profile records `Confirmed by: ghostwriter, not subject` so that distinction survives.

Anything their samples don't support stays visibly `[bracketed]` rather than being filled in with a plausible guess. Prose shows how someone writes; it doesn't show what they want.

**Nothing bleeds.** Each voice owns its `references/`, `drafts/`, and `samples/`. A client's brand guidelines are read when their voice is active and at no other time.

**Drafts are tagged** with the voice they were written in — one line, no prompt:

```
Voice: client-acme

[draft follows]
```

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
| `/ew:outline` | Premise, idea, or story concept to usable structure |
| `/ew:scene-structure` | Fiction scenes, chapters, prose |
| `/ew:script-writing` | Screenplays, TV, YouTube, documentary, video essay, sketch, and short-form scripts |
| `/ew:world-builder` | World bible questioner, generator, and Obsidian graph notes |
| `/ew:audit` | Before/after rewrite with failure analysis |
| `/ew:voice` | List, switch, add, import, recalibrate, or delete voices |
| `/ew:failure-library` | Annotated AI-slop failure patterns |

You do not have to use the slash commands. Each skill carries a description, so asking for "a LinkedIn post about X" routes to the right one on its own.

In Codex, use the same names with `$` instead of `/`, for example `$ew` or `$ew:world-builder`.

Direct invocation skips routing, not constraints. Every sub-skill still reads the full core chain before writing.

### Storytelling workflow

For broad creative writing requests, EW routes across the fiction tools instead of guessing:

1. `outline` shapes the premise and story structure.
2. `world-builder` captures setting, factions, places, rules, religions, cultures, and lore.
3. `scene-structure` writes prose fiction scenes and chapters.
4. `script-writing` writes screenplays, TV scripts, YouTube scripts, video essays, documentaries, sketches, and short-form video.
5. `audit` revises existing drafts before final output.

---

## How it works

Every invocation runs the same sequence:

1. **Voice resolution.** `core/voice-profile.md` is a resolver, not a profile — it points at the active voice under `~/.everyday-writer/`. If no voices exist, onboarding runs first. If resolution is ambiguous, EW stops and asks rather than guessing.
2. **Onboarding** (first run, and whenever you add a voice). Seven steps, about five minutes. You paste samples, answer questions about goals and platforms, do one freewrite, and confirm five voice adjectives. The result is written to `~/.everyday-writer/voices/<name>/voice-profile.md`.
3. **References check.** Any `.md` file you drop in that voice's `references/` folder is read and takes precedence over sub-skill defaults.
4. **Dispatch.** The sub-skill reads `core/anti-ai-rules.md`, then `core/ai_slop_commandments.md`, then the resolved voice profile, then that voice's reference files, then its own instructions, and only then writes.
5. **Two-pass loop.** No first draft is ever presented. The draft gets interrogated against three questions, revised, and run through two checklists before you see it.

### Obsidian story folders

`$ew:world-builder` can create Obsidian-ready Markdown inside a story folder or vault. When you give it a target folder, it writes a story hub, world bible, continuity log, open questions note, idea box, and linked entity notes for characters, places, factions, cultures, religions, rules, timeline events, and important objects.

The graph is plain Markdown: notes use Obsidian wiki links like `[[Maren Vale]]`, frontmatter properties and tags for filtering, and backlinks between people, places, factions, cultures, religions, rules, and events. No Obsidian plugin is required.

Fast capture is built for mid-draft ideas. Drop a fragment like "add a town called Trojan Scape in the North, under the Starks, where the old religion was practiced" and world-builder will create or update the town note, preserve the raw thought in `04 - Idea Box.md`, link it to notes like `[[The North]]`, `[[House Stark]]`, and `[[Old Gods]]`, and add useful tags such as `ew/place/town` and `ew/region/north`. In Obsidian graph view, those wiki links create the visible lines.

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
├── agents/
│   └── openai.yaml                    ← Codex UI metadata and invocation policy
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
│   ├── voice-profile.md               ← RESOLVER. Not a profile — points at the active
│   │                                    voice under ~/.everyday-writer/
│   └── voice-profile-template.md      ← Blank fingerprint each new voice is stamped from
│
├── onboarding/
│   ├── ONBOARDING.md                  ← Environment detection and voice routing
│   ├── claude-code-mode.md            ← 7-step active onboarding, your own voice
│   ├── subject-mode.md                ← Sample-only onboarding, someone else's voice
│   └── claude-ai-cowork-mode.md       ← Memory-based onboarding (Claude.ai)
│
├── skills/
│   ├── newsletter-creative/SKILL.md
│   ├── newsletter-creative/scripted-essay-reference.md
│   ├── newsletter-technical/SKILL.md
│   ├── linkedin/SKILL.md
│   ├── tweets/SKILL.md
│   ├── substack-notes/SKILL.md
│   ├── web-copy/SKILL.md
│   ├── sales-copy/SKILL.md
│   ├── scene-structure/SKILL.md
│   ├── script-writing/
│   │   ├── SKILL.md
│   │   └── craft-reference.md         ← Feature, TV, YouTube, video essay,
│   │                                    documentary, sketch, short-form rules
│   ├── world-builder/
│   │   ├── SKILL.md
│   │   ├── questioner.md              ← Layered question sequence
│   │   ├── skeleton-template.md       ← World bible output template
│   │   └── obsidian-output.md         ← Obsidian folder, note, and graph rules
│   ├── audit/SKILL.md
│   ├── outline/SKILL.md
│   ├── failure-library/SKILL.md
│   └── voice/SKILL.md                 ← Voice management (/ew:voice)
│
├── cowork/                            ← Claude.ai Cowork port (16 files, YAML frontmatter)
│   ├── README.md
│   ├── ew-master.md                   ← Whole system in one file
│   └── ew-*.md                        ← One file per sub-skill
│
├── references/                        ← Deprecated drop zone. Redirect note only —
│   └── DROP-MD-FILES-HERE.md            reference files now live per-voice
│
└── resources/                         ← Background reference material, not part of dispatch
```

Your voices live outside the repo, so plugin updates can't wipe them and git never sees them:

```
~/.everyday-writer/                    Windows: %USERPROFILE%\.everyday-writer\
├── active-voice                       One line: the voice currently in effect
└── voices/
    ├── writer-main/
    │   ├── voice-profile.md           The fingerprint
    │   ├── references/                Brand docs, style guides for this voice
    │   ├── drafts/                    File-mode output
    │   └── samples/                   Writing the profile was built from
    └── client-acme/
        └── ...
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

- **Skill name is `ew`**, not `everyday-writer`, for a shorter invocation path.
- **Codex installs to `~/.codex/skills/everyday-writer/`** and reads `agents/openai.yaml` for UI metadata.
- **The manifest lives in `.claude-plugin/`**, which is where Claude Code looks. A root-level `plugin.json` is ignored.
- **Every skill file carries YAML frontmatter.** Without `name` and `description`, Claude Code does not register the skill at all.
- **`core/` files are dependencies, not skills.** Every sub-skill reads all three; none of them is invoked directly.
- **`core/voice-profile.md` is a resolver, not a profile.** All 13 sub-skills hardcode that path and the validator errors when it's missing from any of them, so redirecting at that one file adds multi-voice without touching a single sub-skill.
- **Voices live in `~/.everyday-writer/`, not in the plugin.** The plugin directory is a cache that updates replace wholesale, and this repo is public. A client profile stored in `core/` would be destroyed on upgrade and one commit from publication.
- **Reference material is per-voice.** A shared folder means a client's brand guidelines and yours get read together on every invocation. Per-voice folders make that impossible rather than merely unlikely.
- **Onboarding splits twice** — by environment (file-based in Claude Code, memory-based in Claude.ai) and by subject (your own voice gets a freewrite; someone else's can't have one).
- **The anti-AI rules include a restraint half.** A banlist applied without judgment produces prose stripped of whatever made it a person's. Sections 9 and 10 exist to stop that.

---

## License

MIT
