# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

**Everyday Writer (EW)** is a Claude Code skill plugin for professional writers. It has one root dispatcher, 13 writing sub-skills, and one voice management skill, all constrained by a voice fingerprint and anti-AI writing rules. Invoked via `/ew:ew` or any of the sub-skill commands.

The system holds any number of voices — the writer's own, plus one per ghostwriting client — with one active at a time.

Plugin identity is defined in `.claude-plugin/plugin.json` (name: `ew`).

## Hard Requirements for Plugin Discovery

These are not style preferences. Getting any of them wrong makes skills silently fail to register, with no error message anywhere:

1. **Every skill file needs YAML frontmatter with `name` and `description`.** This applies to root `SKILL.md` and all `skills/*/SKILL.md`. A file without it is invisible to the loader.
2. **The manifest lives at `.claude-plugin/plugin.json`.** A root-level `plugin.json` is ignored.
3. **There is no `entry` field in the manifest schema.** Skills are discovered by directory convention: root `SKILL.md` plus each `skills/<name>/SKILL.md`.
4. **Skill names must be lowercase kebab-case** and should match their directory name.

Run `npm run check` before any commit that touches manifests, skill frontmatter, dependency chains, reference loading, or package contents. It validates discovery rules plus version parity, runtime/core dependencies, per-voice references, and resource packaging guards.

## Entry Points

- `SKILL.md` — master dispatcher, registered as skill `ew`
- `onboarding/ONBOARDING.md` — environment router (Claude Code vs Claude.ai Cowork), then voice router (own voice vs subject)
- `.claude-plugin/plugin.json` — plugin manifest
- `.claude-plugin/marketplace.json` — marketplace manifest

## Architecture: 4-Step Dispatch Flow

Every `/ew` invocation in `SKILL.md` follows this sequence:

1. **Profile Check** — look for `Completed: Yes` in `core/voice-profile.md`. If absent, trigger onboarding.
2. **Onboarding** — route through `onboarding/ONBOARDING.md` → either `claude-code-mode.md` (7-step, file-based) or `claude-ai-cowork-mode.md` (memory-based).
3. **References Check** — scan the active voice's references folder, as resolved by `core/voice-profile.md`. These override sub-skill defaults.
4. **Dispatch** — route to the sub-skill. Every sub-skill reads in this order: `core/runtime-contract.md` → `core/anti-ai-rules.md` → `core/ai_slop_commandments.md` → `core/voice-profile.md` → active voice reference files → sub-skill file → write.

Direct invocation (`/ew:linkedin`) bypasses step 4's routing but not steps 1–3 or the read order.

## Core Constraints (read before every write)

| File | Purpose |
|---|---|
| `core/runtime-contract.md` | Short operating contract: read order, precedence, fabrication rule, two-pass loop, final checklist. |
| `core/anti-ai-rules.md` | The primary standard. Sections 0–10. |
| `core/ai_slop_commandments.md` | Technical companion: mechanism behind each failure pattern, era-indexed slop vocabulary, diagnostic checklist. |
| `core/voice-profile.md` | **The resolver, not a profile.** Points at the active voice. |
| `core/voice-profile-template.md` | Blank fingerprint each new voice is stamped from. |

Key sections of `anti-ai-rules.md`:

- **§0** — the operating contract (A-Player standard)
- **§0.1** — precedence. Voice profile outranks style rules; a pasted sample outranks the profile. Nothing overrides §0 or §0.2.
- **§0.2** — the fabrication rule. Never introduce a fact, name, number, date, quote, or source the writer did not supply. Use visible `[brackets]` to mark gaps.
- **§1–5** — banned words, sentence patterns, tone patterns, structural patterns, formatting tells
- **§6** — craft rules (King, Lamott, Brande)
- **§7.1** — the two-pass loop. Never present a first draft.
- **§7.2** — pre-publish checklist
- **§8** — pointer to the voice profile
- **§9** — what NOT to flag. False positives; count clusters, not instances.
- **§10** — signs of human writing to preserve.

§9 and §10 are load-bearing. Without them the banlist over-corrects and strips whatever made the prose a person's.

## Skills Directory

```
skills/
  newsletter-creative/SKILL.md   # 5-beat Hero's Journey structure
  newsletter-technical/SKILL.md  # Tutorial/analysis format
  linkedin/SKILL.md              # Posts and articles
  tweets/SKILL.md                # Twitter/X posts and threads
  substack-notes/SKILL.md        # Substack Notes format
  web-copy/SKILL.md              # Landing pages
  sales-copy/SKILL.md            # Direct response, sales pages
  scene-structure/SKILL.md       # Scene construction
  script-writing/SKILL.md        # Screenplays
  world-builder/SKILL.md         # Multi-file world-building subsystem
  audit/SKILL.md                 # Before/after rewrite comparison
  outline/SKILL.md               # Idea-to-outline engine
  failure-library/SKILL.md       # Annotated AI-slop failure patterns
  voice/SKILL.md                 # Voice management: list, switch, new, import, edit, delete
```

## Developing Skills

- Skills are markdown instruction files, not code. No build, no tests, no linting. `npm run check` is the only validation.
- Every skill must open with YAML frontmatter, then an H1, then its dependency chain block naming `runtime-contract.md` and the three full core files. This is non-negotiable — direct invocation bypasses the dispatcher, so a skill that omits a core file simply never reads it.
- The root `references/` folder is deprecated and must not be scanned. User reference files live per voice at `~/.everyday-writer/voices/<slug>/references/`, resolved by `core/voice-profile.md`; only `references/DROP-MD-FILES-HERE.md` belongs in the root folder by default.
- `resources/` holds background reference material (writing commandments, rules rundowns), not part of the dispatch system.
- When adding a section to `anti-ai-rules.md`, check whether the skills' dependency-chain blocks or `SKILL.md`'s standards section reference section numbers that need updating.

## The Cowork Port

`cowork/` is a parallel packaging of the same system for Claude.ai Projects, which cannot load file-based plugins. Files there are self-contained and carry their own frontmatter.

When a core rule changes, it must be updated in **both** `core/anti-ai-rules.md` and `cowork/ew-master.md`. The cowork files are copies, not references. Nothing keeps them in sync automatically.

## Multi-Voice Architecture

**`core/voice-profile.md` is a resolver, not a profile.** Anyone opening it expecting a fingerprint will be confused, so this is the most important non-obvious fact in the repo.

All 13 writing sub-skills and the voice management skill hardcode `core/voice-profile.md` in their dependency chains, and `check.js` hard-errors when that filename is missing from any of them. Redirecting at that single file adds multi-voice without editing every skill path. Do not "fix" this by rewriting the sub-skills to point at a new path.

Voices live outside the plugin:

```
~/.everyday-writer/
  active-voice                  one line: the active slug
  voices/<slug>/
    voice-profile.md            the actual fingerprint
    references/                 per-voice drop-zone
    drafts/                     file-mode output
    samples/                    provenance
```

Two reasons they cannot live in `core/`: the plugin directory is a cache that updates replace wholesale, and this repo is public. A client profile in `core/` would be destroyed on upgrade and one commit from publication. `check.js` fails the build if a completed profile appears there.

**Resolution rules, every failure case, and the inline-override behavior are in `core/voice-profile.md` itself.** The governing principle is: stop and ask, never guess. Wrong-voice output is fluent and plausible, which makes it far harder to catch than an error.

**The plugin's `references/` folder is no longer scanned.** Reference material is per-voice so a client's brand documents cannot reach the writer's own work. `references/DROP-MD-FILES-HERE.md` is kept only as a redirect note for upgraders.

**Two onboarding flows.** `onboarding/claude-code-mode.md` builds the user's own voice, freewrite included. `onboarding/subject-mode.md` builds someone else's from samples alone — no freewrite is obtainable, confirmation is second-hand, and §0.2 governs every field. Subject profiles record `Confirmed by: ghostwriter, not subject`.

Per §0.1, a voice profile outranks the style rules in `anti-ai-rules.md`. If a confirmed voice uses a pattern the rules discourage, the voice wins. Stored `samples/` are the exception — they are provenance, not a live override, because §0.1's precedence belongs to a sample pasted in the current conversation.

## Versioning

Three files carry a version number and must stay in lockstep:

- `package.json`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

`npm version` bumps only the first. Update the other two in the same commit. `npm run check` fails on drift and runs automatically on `npm publish`.
