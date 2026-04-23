# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

**Everyday Writer (EW)** is a Claude Code skill plugin for professional writers. It provides 13 specialized writing sub-skills constrained by a voice fingerprint and anti-AI writing rules. Installed at `~/.claude/plugins/ew/`; invoked via `/ew`.

Plugin identity is defined in `plugin.json` (name: `ew`, version: 0.1.0).

## Entry Points

- `SKILL.md` — master entry point and dispatcher for all `/ew` requests
- `ONBOARDING.md` — master router (detects Claude Code vs Claude.ai Cowork mode)
- `plugin.json` — plugin manifest

## Architecture: 4-Step Dispatch Flow

Every `/ew` invocation in `SKILL.md` follows this mandatory sequence:

1. **Profile Check** — look for `Completed: Yes` in `core/voice-profile.md`. If absent, trigger onboarding.
2. **Onboarding** — route through `onboarding/ONBOARDING.md` → either `claude-code-mode.md` (file-based profile) or `claude-ai-cowork-mode.md` (memory-based). Extracts 5 voice adjectives from user samples.
3. **References Check** — scan `references/` for user-dropped `.md` files. These override defaults.
4. **Dispatch** — route to the correct sub-skill. Every sub-skill reads in this order: `core/anti-ai-rules.md` → `core/voice-profile.md` → `references/` files → sub-skill file → write.

## Core Constraints (read before every write)

| File | Purpose |
|---|---|
| `core/anti-ai-rules.md` | 8-section writing standard: banned words, banned sentence patterns, pre-publish checklist. Mandatory for all sub-skills. |
| `core/ai_slop_commandments.md` | Technical companion: explains the mechanism behind each failure pattern, era-indexed slop vocabulary, and a diagnostic checklist covering patterns anti-ai-rules.md doesn't (copula avoidance, placeholder contamination, knowledge-cutoff bleed, etc.). Mandatory for all sub-skills. |
| `core/voice-profile.md` | Writer's voice fingerprint. Set during onboarding; gates all output. |

Section 0 of `anti-ai-rules.md` is the operating contract (A-Player standard). Section 7 is the pre-publish checklist every draft must pass before it ships.

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
```

Direct invocation paths bypass routing (e.g., `/ew:newsletter-creative`, `/ew:audit`). Full list in `SKILL.md`.

## Developing Skills

When writing or editing skill files:
- Every skill must read `core/anti-ai-rules.md`, then `core/ai_slop_commandments.md`, then `core/voice-profile.md` before generating output — this is non-negotiable.
- Skills are markdown instruction files, not code. There are no build steps, tests, or linting commands.
- The `references/` folder is a user drop-zone — never add instructions there; only `DROP-MD-FILES-HERE.md` belongs there by default.
- Root-level `.md` files (e.g., `ai slop writing.md`, `General Writing Commandments.md`) are reference material, not part of the skill dispatch system.

## Voice Profile

`core/voice-profile.md` contains 9 sections: sentence patterns, voice register, structural habits, tone axes, 5 confirmed voice adjectives, platforms, goals, and what NOT to write. When `Completed: Yes` is present, the profile is active and gates all skill output.
