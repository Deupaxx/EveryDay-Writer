---
name: Everyday Writer — Cowork Folder Guide
description: Instructions for uploading Everyday Writer skills to Claude.ai Cowork (Projects). Lists all available files and explains how to use them.
version: 0.1.0
---

# EVERYDAY WRITER — CLAUDE.AI COWORK FOLDER

This folder contains the entire Everyday Writer system packaged for **Claude.ai Projects (Cowork mode)**.

All files have YAML frontmatter so Claude.ai accepts them without errors.

---

## HOW TO USE

### Option A: Upload Everything (Recommended)

Upload **all `.md` files** from this folder to a single Claude.ai Project. You get:
- The full anti-AI rules engine
- Voice profile onboarding and memory
- All 13 sub-skills available in one project
- The failure library for teaching and diagnosis

Then type `/ew [your request]` in the chat, or ask Claude to use a specific skill by name.

**Example prompts:**
- `/ew write me a LinkedIn post about why consistency matters more than creativity`
- `use the newsletter creative skill to help me write about my career change`
- `audit this paragraph using Everyday Writer`
- `use the outline engine to help me structure this newsletter idea`

---

### Option B: Upload Only What You Need

Upload `ew-master.md` plus any specific skill files you want. Each micro-skill file is self-contained — it includes a condensed version of the anti-AI rules so it works standalone.

---

## FILE REFERENCE

| File | What it does |
|---|---|
| `ew-master.md` | **The one-above-all file.** Contains the complete system: all anti-AI rules, voice profiling, all 13 sub-skills, and both diagnostic checklists. Upload this if you only upload one file. |
| `ew-linkedin.md` | LinkedIn posts and articles |
| `ew-newsletter-creative.md` | Story-driven newsletters, personal essays, narrative-first issues |
| `ew-newsletter-technical.md` | Technical newsletters, tutorials, analysis, how-tos |
| `ew-tweets.md` | Standalone tweets and X threads |
| `ew-substack-notes.md` | Substack Notes |
| `ew-web-copy.md` | Landing pages, website copy, homepage writing |
| `ew-sales-copy.md` | Sales pages, email sequences, direct response |
| `ew-scene-structure.md` | Fiction scenes and prose passages |
| `ew-script-writing.md` | Screenplays and scripts |
| `ew-audit.md` | Before/after rewrite with failure analysis |
| `ew-outline.md` | Idea-to-outline engine for any format |
| `ew-failure-library.md` | Real AI writing failure patterns with dissection |

---

## WHAT THESE FILES DON'T DO

These files **do not** replace the Claude Code version of Everyday Writer (`/ew` via the plugin). The Claude Code version has:
- File system access (reads and writes voice profiles to disk)
- Full skill dispatch via `SKILL.md`
- World builder subsystem with multi-file questioner and bible generator

The Cowork files replicate the rules and sub-skills as faithfully as possible in a single-session context. Voice profiles are stored in Claude.ai memory between sessions rather than on disk.

---

## VOICE PROFILE

The first time you use any EW skill, Claude will run a short onboarding to build your voice profile. This takes about 5 minutes. After that, the profile is stored in Claude.ai memory and applied to all future sessions automatically.

If the profile ever feels off, say "recalibrate my EW voice profile" and Claude will update it.

---

## THE STANDARD

Every file in this folder enforces the same operating standard: **A-Player or training to become one.** The system holds the work to the standard of what's possible, not the standard of what's comfortable.

If a draft fails the checklist, it gets fixed before it's presented. Not noted. Fixed.
