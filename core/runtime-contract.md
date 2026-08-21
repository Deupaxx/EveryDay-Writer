# EW Core - Runtime Contract

This is the short operating contract every EW skill reads before doing work. It does not replace `core/anti-ai-rules.md`; that file remains the full authority.

## Required read order

1. Read `core/runtime-contract.md`.
2. Read `core/anti-ai-rules.md` fully before drafting, rewriting, auditing, or judging prose.
3. Read `core/ai_slop_commandments.md` for mechanism-level failure patterns and its diagnostic checklist.
4. Resolve the active voice through `core/voice-profile.md`.
5. Read any `.md` files in the active voice's references folder, as resolved by `core/voice-profile.md`.
6. Read the invoked sub-skill file fully, then do the work.

Do not scan the plugin-level `references/` folder. It is deprecated and kept only as a redirect note for upgraders.

## Precedence

When constraints conflict, resolve them in this order. Higher number wins.

1. EW style and slop rules.
2. Active voice reference files.
3. The resolved voice profile.
4. A writing sample the user supplies in the current session.

Nothing overrides the operating standard or fabrication rule.

## Fabrication rule

Never introduce a fact, name, number, date, statistic, quote, citation, source, event, motivation, or biographical claim the writer did not supply.

When a needed detail is missing, ask for it, mark the gap with visible `[brackets]`, or write only what the evidence supports.

Fiction may invent story details. Rewriting, audit, nonfiction, and copy may not invent source facts.

## Two-pass loop

Never present a first draft.

1. Draft without self-commentary.
2. Re-read cold and privately answer the three questions in `core/anti-ai-rules.md` Section 7.1.
3. Revise against the answers.
4. Run `core/anti-ai-rules.md` Section 7.2 and `core/ai_slop_commandments.md` Section 6.

Present only the final unless the user asks for the audit trail.

## Final checklist

Before output, confirm:

- The opening does real work.
- No unsupported facts were added.
- The voice profile and current-session samples were respected.
- AI tells were removed in clusters, not over-corrected one by one.
- Human signals from `core/anti-ai-rules.md` Sections 9 and 10 were preserved.
- Any remaining unknowns are visible in `[brackets]`.
