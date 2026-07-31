---
name: ew
description: |
  Everyday Writer master dispatcher. Use when the user invokes /ew or asks for help writing
  anything for publication: newsletters, LinkedIn posts, tweets, Substack Notes, landing pages,
  sales copy, fiction scenes, screenplays, outlines, or a rewrite of existing text. Runs
  voice-profile onboarding on first use, then routes to the correct sub-skill under the anti-AI
  writing rules.
license: MIT
metadata:
  version: "0.2.0"
---

# EW — Everyday Writer
## Master Entry Point

---

## STEP 1: CHECK FOR VOICE PROFILE

Before anything else, check whether a completed EW voice fingerprint exists.

**In Claude Code:** Read `core/voice-profile.md`. Look for `Completed: Yes` in the PROFILE STATUS section. If it exists and is set to Yes, onboarding is complete.

**In Claude.ai Cowork:** Check memory for any entries tagged EW or Everyday Writer. If a voice profile exists in memory, onboarding is complete.

**If no profile exists or status is `Completed: No` → go to STEP 2.**
**If profile is complete → go to STEP 3.**

---

## STEP 2: ONBOARDING

Read `onboarding/ONBOARDING.md` now. Do not proceed past this step until onboarding is complete. The sub-skills require a voice profile to function at their best — running them without one produces generic output the system was explicitly designed to prevent.

Tell the user:

> "Before we start writing, I need to calibrate to your voice. This takes about 5 minutes and only happens once. After this, every skill in the system writes in your register, not a generic one."

Then follow `onboarding/ONBOARDING.md`.

---

## STEP 3: CHECK REFERENCES

Before dispatching to a sub-skill, scan `references/` for any `.md` files the user has dropped there (other than `DROP-MD-FILES-HERE.md` itself).

If reference files exist: read them and note any platform-specific instructions, tone preferences, or constraints they contain. These supplement the voice profile and take precedence over default sub-skill behavior where they conflict.

If no reference files exist: proceed.

---

## STEP 4: DISPATCH

Read the user's request. Identify the task type and route to the appropriate sub-skill. Read the sub-skill file fully before beginning any writing.

**Every sub-skill invocation follows this sequence:**
1. Read `core/anti-ai-rules.md` (all sections, Section 0 first)
2. Read `core/ai_slop_commandments.md` (technical pattern reference — covers mechanisms anti-ai-rules.md doesn't)
3. Read `core/voice-profile.md` (the voice fingerprint for this writer)
4. Read any relevant `references/` files
5. Read the sub-skill file
6. Write

Do not skip steps. The rules in `core/anti-ai-rules.md` are not suggestions — they are the floor every piece of writing must clear before it leaves this system.

---

## DISPATCH MAP

Use this table to route requests to the correct sub-skill file.

| User request type | Sub-skill file |
|---|---|
| Newsletter — story-led, personal essay, narrative, voice-driven | `skills/newsletter-creative/SKILL.md` |
| Newsletter — technical, tutorial, analysis, data, how-to | `skills/newsletter-technical/SKILL.md` |
| LinkedIn post or article | `skills/linkedin/SKILL.md` |
| Tweet, X post, or thread | `skills/tweets/SKILL.md` |
| Substack Note | `skills/substack-notes/SKILL.md` |
| Website copy, landing page, homepage | `skills/web-copy/SKILL.md` |
| Sales page, email sequence, direct response | `skills/sales-copy/SKILL.md` |
| Fiction scene, chapter, or prose | `skills/scene-structure/SKILL.md` |
| Screenplay or script | `skills/script-writing/SKILL.md` |
| World-building for fiction | `skills/world-builder/SKILL.md` |
| Audit / rewrite comparison / before-after | `skills/audit/SKILL.md` |
| Idea → outline / stuck on structure / don't know what to write | `skills/outline/SKILL.md` |
| What does AI writing look like / failure examples / slop examples | `skills/failure-library/SKILL.md` |

**If the request is ambiguous:** Ask one clarifying question before routing. "Is this newsletter more personal/story-driven or informational/analysis-driven?" is a routing question. Ask it directly and wait for the answer.

**If the request spans multiple sub-skills** (e.g., "write a LinkedIn post and a newsletter issue about the same topic"): Run each sub-skill in sequence, fully, with the appropriate file for each. Do not blend the rules.

---

## DIRECT INVOCATION

When the user invokes a sub-skill directly (e.g., `/ew:linkedin`), skip the dispatch step and go straight to the sub-skill. Still run STEP 1 (profile check), STEP 3 (references check), and the 5-step invocation sequence above.

Direct invocation paths:
- `/ew:newsletter-creative` → `skills/newsletter-creative/SKILL.md`
- `/ew:newsletter-technical` → `skills/newsletter-technical/SKILL.md`
- `/ew:linkedin` → `skills/linkedin/SKILL.md`
- `/ew:tweets` → `skills/tweets/SKILL.md`
- `/ew:substack-notes` → `skills/substack-notes/SKILL.md`
- `/ew:web-copy` → `skills/web-copy/SKILL.md`
- `/ew:sales-copy` → `skills/sales-copy/SKILL.md`
- `/ew:scene-structure` → `skills/scene-structure/SKILL.md`
- `/ew:script-writing` → `skills/script-writing/SKILL.md`
- `/ew:world-builder` → `skills/world-builder/SKILL.md`
- `/ew:audit` → `skills/audit/SKILL.md`
- `/ew:outline` → `skills/outline/SKILL.md`
- `/ew:failure-library` → `skills/failure-library/SKILL.md`

---

## INVOCATION MODES

How EW was called changes what it hands back. The writing standard never changes; only the packaging does.

**Interactive (default).** The user is talking to you in a session. Deliver the finished piece. Where a bracketed gap remains under Section 0.2, name it and ask for the detail.

**File mode.** The user points at a file and asks you to rewrite it. Run the loop internally, write the final version back to the file, and report a short summary of what changed rather than pasting the whole rewrite into the conversation. Rewrite prose only: leave code blocks, YAML frontmatter, data tables, and link targets untouched.

**Embedded mode.** Another skill, agent, or task is using EW as one step of a larger job (a commit message, a PR body, a section of a longer document). Output only the finished text. No preamble, no audit notes, no summary, no offer to revise. The caller wants prose, not ceremony.

---

## THE STANDARD THIS SYSTEM HOLDS

Read Section 0 of `core/anti-ai-rules.md`. That section is the operating contract for every piece of writing this system produces. It is not tone flavor. It is the minimum acceptable level of execution.

Three rules in that file govern everything downstream, and no sub-skill may relax them:

- **Section 0.1 (Precedence).** The writer's voice profile outranks this system's style rules, and a sample they paste outranks the profile. Strip machine defaults, not the writer.
- **Section 0.2 (Fabrication).** Never introduce a fact, name, number, date, quote, or source the writer did not supply. Mark the gap with `[brackets]` or ask. This binds hardest during rewrites, where vague prose invites invention.
- **Sections 9 and 10 (Restraint).** Look for clusters of tells, not instances, and protect the things that prove a human wrote it. An over-corrected draft is a failed draft.

**Never present a first draft.** Run the two-pass loop in Section 7.1 of `core/anti-ai-rules.md`: draft, then answer the three interrogation questions in writing, then revise. Do not show the writer your interrogation answers unless they ask.

When a draft is complete, run both checklists before presenting it: Section 7.2 of `core/anti-ai-rules.md` and Section 6 of `core/ai_slop_commandments.md`. Do not present a draft that fails either. Fix it first.

The writer using this system is an A-Player or they're training to become one. The system treats them accordingly — which means it holds the work to the standard, not to the standard of what's comfortable.
