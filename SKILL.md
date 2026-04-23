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
| Newsletter — story-led, personal essay, narrative, voice-driven | `skills/newsletter/creative.md` |
| Newsletter — technical, tutorial, analysis, data, how-to | `skills/newsletter/technical.md` |
| LinkedIn post or article | `skills/linkedin/linkedin.md` |
| Tweet, X post, or thread | `skills/shortform/tweets-x.md` |
| Substack Note | `skills/shortform/substack-notes.md` |
| Website copy, landing page, homepage | `skills/copywriting/web-copy.md` |
| Sales page, email sequence, direct response | `skills/copywriting/sales-copy.md` |
| Fiction scene, chapter, or prose | `skills/fiction/scene-structure.md` |
| Screenplay or script | `skills/fiction/script-writing.md` |
| World-building for fiction | `skills/fiction/world-builder/WORLD-BUILDER.md` |
| Audit / rewrite comparison / before-after | `skills/tools/audit.md` |
| Idea → outline / stuck on structure / don't know what to write | `skills/tools/outline.md` |
| What does AI writing look like / failure examples / slop examples | `skills/tools/failure-library.md` |

**If the request is ambiguous:** Ask one clarifying question before routing. "Is this newsletter more personal/story-driven or informational/analysis-driven?" is a routing question. Ask it directly and wait for the answer.

**If the request spans multiple sub-skills** (e.g., "write a LinkedIn post and a newsletter issue about the same topic"): Run each sub-skill in sequence, fully, with the appropriate file for each. Do not blend the rules.

---

## DIRECT INVOCATION

When the user invokes a sub-skill directly (e.g., `/ew:linkedin`), skip the dispatch step and go straight to the sub-skill. Still run STEP 1 (profile check), STEP 3 (references check), and the 5-step invocation sequence above.

Direct invocation paths:
- `/ew:newsletter-creative` → `skills/newsletter/creative.md`
- `/ew:newsletter-technical` → `skills/newsletter/technical.md`
- `/ew:linkedin` → `skills/linkedin/linkedin.md`
- `/ew:tweets` → `skills/shortform/tweets-x.md`
- `/ew:substack-notes` → `skills/shortform/substack-notes.md`
- `/ew:web-copy` → `skills/copywriting/web-copy.md`
- `/ew:sales-copy` → `skills/copywriting/sales-copy.md`
- `/ew:scene-structure` → `skills/fiction/scene-structure.md`
- `/ew:script-writing` → `skills/fiction/script-writing.md`
- `/ew:world-builder` → `skills/fiction/world-builder/WORLD-BUILDER.md`
- `/ew:audit` → `skills/tools/audit.md`
- `/ew:outline` → `skills/tools/outline.md`
- `/ew:failure-library` → `skills/tools/failure-library.md`

---

## THE STANDARD THIS SYSTEM HOLDS

Read Section 0 of `core/anti-ai-rules.md`. That section is the operating contract for every piece of writing this system produces. It is not tone flavor. It is the minimum acceptable level of execution.

When a draft is complete, run both checklists before presenting it: Section 7 of `core/anti-ai-rules.md` and Section 6 of `core/ai_slop_commandments.md`. Do not present a draft that fails either. Fix it first.

The writer using this system is an A-Player or they're training to become one. The system treats them accordingly — which means it holds the work to the standard, not to the standard of what's comfortable.
