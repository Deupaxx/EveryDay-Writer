# EW Core - Runtime Contract

This is the short operating contract every EW skill reads before doing work. It does not replace `core/anti-ai-rules.md`; that file remains the full authority.

## Required read order

1. Read `core/runtime-contract.md`.
2. Read `core/obsidian-workspace.md` and, in local filesystem mode, resolve storage before any profile or file operation.
3. Read `core/anti-ai-rules.md` fully before drafting, rewriting, auditing, or judging prose.
4. Read `core/ai_slop_commandments.md` for mechanism-level failure patterns and its diagnostic checklist.
5. Resolve the active voice through `core/voice-profile.md`.
6. Read any `.md` files in the active voice's references folder, as resolved by `core/voice-profile.md`.
7. Read the invoked sub-skill file fully, then do the work.

**Lifecycle-command exception:** workspace `status`, `connect`, `disconnect`, `migrate`, and `topic repair`, plus voice `list`, `switch`, `new`, `import`, `delete`, and `repair`, must run without normal active-voice resolution or reference loading. World-builder `repair <operation-id>`/`resume` has the same exception and may act only on the recorded operation journal. Stop the normal read sequence after the applicable workspace/voice/world-builder and anti-AI contracts, then let that command perform command-local safe validation. These commands are recovery surfaces and must work when configuration, the voice tree, a topic tree, a world-builder operation, or `active-voice` is broken. Voice `edit` also bypasses normal resolution, but it must safely resolve the explicitly named target, or the active pointer when no target was named, inside the command before opening a profile.

Do not scan the plugin-level `references/` folder. It is deprecated and kept only as a redirect note for upgraders.

Memory-only Cowork mode does not use filesystem configuration or vault behavior.

## Workspace persistence

In a connected Obsidian vault, completed interactive writing is saved through the topic workspace rules in `core/obsidian-workspace.md`. Resolve or ask for the topic; when the user explicitly requests a named new topic, safely create its canonical structure first. Create a sanitized date-prefixed artifact without overwriting, add its frontmatter and hub link, and index it from the topic hub.

An explicit path wins and suppresses the automatic vault copy. Embedded mode explicitly suppresses automatic persistence. Default storage mode retains the existing per-voice draft fallback for requested file output with no path.

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
