---
name: voice
description: |
  Manage EW voice profiles. Use when the user wants to switch voices, add a new voice, write as
  someone else, set up a ghostwriting client, list or rename their voices, import an existing
  profile, recalibrate how a voice sounds, or delete one. Handles both the user's own voice and
  subject voices built for ghostwriting.
license: MIT
metadata:
  version: "0.3.0"
---

# EW Skill — Voice

**Dependency chain. Read these in order before doing anything:**

1. `core/runtime-contract.md` (short operating contract; does not replace the full rules)
2. `core/obsidian-workspace.md` (resolve the data root before any profile operation)
3. `core/anti-ai-rules.md` (full standard; Section 0.2 governs every profile field this skill writes)
4. `core/ai_slop_commandments.md` (mechanism reference and diagnostic checklist)
5. For writing work only, `core/voice-profile.md` (the normal resolver) and the resolved voice references

This chain applies on direct invocation (`/ew:voice`) exactly as it does on dispatch through `/ew`. Voice-management commands deliberately bypass the normal resolver. List, switch, new, import, delete, and repair safely validate only the state each command needs, so they can repair a missing or corrupt pointer. Edit resolves an explicitly named target safely; with no target, it validates the active pointer locally before opening that profile. Never load unrelated voice references for management.

**Why a management skill reads the anti-AI rules.** This skill writes prose: voice adjectives, structural observations, "what not to write" lists. Building a profile for a person who is not in the conversation is the single highest-risk surface in EW for invention — of a subject's goals, opinions, history, and motives. Section 0.2 binds hardest here.

---

## THE VOICE HOME

Resolve `<data-root>` through `core/obsidian-workspace.md` first. In default mode it is the bootstrap directory; in connected mode it is the canonical vault workspace.

```
<data-root>/
  active-voice                      one line: the active voice slug
  voices/
    <slug>/
      voice-profile.md
      references/
      drafts/
      samples/
```

Within an already valid resolved data root, create only the missing voice-tree components a command explicitly needs. A voice command must not create or repair the connected workspace root; route missing-workspace recovery to `/ew:workspace connect <configured-vault>`.

**Slug rules:** validate the entire value against exactly `[a-z0-9]+(?:-[a-z0-9]+)*` and require it to be identical to the directory name. Before any read, listing-derived operation, switch, edit, import destination, or delete uses a slug as a path component, validate it first and apply the default-or-connected managed-root containment and symlink/junction rejection rules in `core/obsidian-workspace.md`. If the user gives a name that is not a valid slug ("Client Acme", "Writer Main Voice"), derive one, show it, and confirm before creating:

> "I'll store this as `client-acme`. Good, or would you rather call it something else?"

---

## COMMANDS

| Invocation | Command |
|---|---|
| `/ew:voice` | List |
| `/ew:voice <name>` | Switch |
| `/ew:voice new` | Create |
| `/ew:voice import <path>` | Import |
| `/ew:voice edit [name]` | Recalibrate |
| `/ew:voice delete <name>` | Delete |
| `/ew:voice repair <name>` | Repair a verified incomplete legacy voice |

Requests arriving in plain language route the same way — "switch to my client voice", "add a new client", "who am I writing as?" — match on intent, not on syntax.

---

## LIST — `/ew:voice`

Read `active-voice` and every real directory under `voices/` only through the managed-root safety procedure. Validate the active value and every directory name against the exact slug grammar before constructing descendant paths; reject linked/junction directories and malformed names. A missing, invalid, wrong-type, or dangling active pointer is reported as broken state, but does not suppress enumeration of independently safe voice directories. Ignore recognized `.ew-stage-*` entries as unpublished creation state. A recognized `.ew-delete-<validated-slug>-<nonce>` entry is not a voice: report it separately as interrupted deletion state with its exact path and offer inspect/resume recovery; never silently omit it. For each safe voice, read its regular contained profile's IDENTITY and PROFILE STATUS sections. This makes list useful before switch repairs the pointer.

```
Voices

  * writer-main    self      updated 2026-07-14
    client-acme    subject   updated 2026-08-02
    client-bolt    subject   updated 2026-06-30   INCOMPLETE

  * = active

  /ew:voice <name> to switch
```

Mark any voice whose `Completed:` is not `Yes` as `INCOMPLETE`.

If no voices exist, say so and offer `/ew:voice new`. Do not invent a listing.

---

## SWITCH — `/ew:voice <name>`

1. Validate the entire slug before constructing or probing `voices/<slug>/`, then prove the voice directory/profile are canonically contained regular managed paths with no symlink/junction component. Only then confirm the voice exists and require its `Completed:` field to be exactly `Yes`. If it is missing, not `Yes`, or the profile is otherwise incomplete, **refuse to switch**, leave `active-voice` unchanged, and direct the user to resume onboarding or run `/ew:voice repair <slug>` first. If the voice does not exist, **stop**: list the safely enumerated voices that do exist and ask. Never create a voice as a side effect of a switch, and never resolve to a near-match without asking.
2. Prove the `active-voice` target and sibling temporary path are safe contained regular managed paths. If the pointer is absent, create it exclusively and stop on a race. If it exists, snapshot its exact bytes/hash, write the proposed complete value to an exclusively created sibling temporary file, re-open and revalidate the pointer immediately before publication, compare it to the snapshot, and atomically replace only when unchanged. Re-read the published pointer and require the exact slug before reporting success.
3. Confirm in one line:

> `Active voice: client-acme (subject). Everything writes in this voice until you switch.`

This confirmation is reachable only for a verified `Completed: Yes` profile.

---

## CREATE — `/ew:voice new`

**Ask whose voice this is first.** Everything downstream depends on the answer.

> "Whose voice is this?
>
> 1. **Mine** — your own writing voice.
> 2. **Someone else's** — a ghostwriting client, or any voice that isn't yours."

**If Mine** → ask for a name, derive and validate the unused slug, then run `onboarding/claude-code-mode.md` in full. All seven steps, freewrite included. The only change is the destination: write the finished profile to `voices/<slug>/voice-profile.md`, not to `core/`.

**If Someone else's** → ask for a name, derive and validate the unused slug, then run `onboarding/subject-mode.md`.

Set `Voice type`, `Confirmed by`, and `Freewrite basis` in the profile according to which flow ran.

Before either flow creates a directory, scan `voices/` case-insensitively through the managed-root safety procedure. If the slug directory exists, use only the validated incomplete-profile resume or explicit repair procedure in `onboarding/ONBOARDING.md`; otherwise offer switch/edit or a different slug. Build and verify the full new tree in a sibling `.ew-stage-*` directory and publish it in one atomic exclusive/no-replace operation. Never expose a partially built final voice. In connected mode, then add the new profile's missing exact canonical link `[[Everyday Writer/voices/<slug>/voice-profile|<link-safe voice alias> Voice Profile]]` to `00 - Everyday Writer Home.md`. Derive the alias separately under `core/obsidian-workspace.md`; never place the raw voice name inside wiki-link or YAML syntax. Retain the home note bytes/hash and re-read immediately before atomic replacement; stop on concurrent change. If indexing fails after voice publication, keep the verified voice, report `home index repair pending`, and make retry idempotently add the missing exact link; do not claim the index is clean until re-read verification succeeds.

**After creating**, ask before switching rather than assuming:

> "Created `client-acme`. Switch to it now, or stay on `writer-main`?"

A ghostwriter setting up a client at the start of a week is not necessarily about to write for them.

---

## IMPORT — `/ew:voice import <path>`

The upgrade path from EW 0.2.0, where a single profile lived at `core/voice-profile.md`.

1. Read the file at `<path>`. If it is missing or is not a voice profile, say so and stop.
2. Ask what to call it, derive the slug, and validate the entire result against exactly `[a-z0-9]+(?:-[a-z0-9]+)*` before constructing or probing a destination path.
3. Before creating anything, scan `voices/` case-insensitively. If `voices/<slug>/` or any destination path already exists, stop and ask for a different slug or offer edit/explicit repair; do not overwrite, merge, or auto-rename.
4. Create a unique sibling `.ew-stage-*` directory exclusively. Copy the source profile bytes into staging first, record their hash, then create the missing `references/`, `drafts/`, and `samples/` directories exclusively. Never edit the source file.
5. Make only the minimum explicit migration-metadata changes in the staged profile: add missing `Voice slug`, `Voice type`, `Confirmed by`, and `Freewrite basis` fields. Ask for `Voice type`; do not assume `Self`. Use explicit imported placeholders such as `[unknown — imported from 0.2.0]` when the source lacks evidence. Do not rewrite, normalize, reorder, or improve preserved prose. Record the exact added fields and distinguish the preserved source-prose hash from the staged final-profile hash.
6. Validate the complete staged final tree—not the unmodified source—as a publishable voice: identity, exact slug, requested type, expected directories, regular-file types, containment, no redirects, required placeholders/metadata, and `Completed: Yes`. If the legacy profile cannot satisfy completion without inventing or rewriting calibration content, stop and route to explicit repair/onboarding. Re-scan the destination case-insensitively, then publish the full tree to `voices/<slug>/` with one atomic exclusive/no-replace directory operation. If no-replace publication cannot be guaranteed, stop.
7. In connected mode, add the imported profile's missing exact canonical vault-root-prefixed link with a separately derived link-safe voice alias to `00 - Everyday Writer Home.md`, preserving all other content. YAML-escape any generated metadata and never interpolate a raw imported name into link syntax. Re-read the validated home note immediately before atomic replacement and stop if its bytes/hash changed. If the profile published but index publication failed, retain the verified import, report `home index repair pending`, and make retry add only the missing exact link; verify before calling the index clean.
8. Report what was imported and what was left bracketed.

**Do not rewrite, improve, or "clean up" the imported profile.** It is the user's calibration. Carry it across unchanged and let them edit it with `/ew:voice edit`.

---

## RECALIBRATE — `/ew:voice edit`

Operates on the active voice unless the user names another. This command does not invoke the normal resolver first. Validate a named slug directly; otherwise validate and read `active-voice` locally. In either case require a contained real voice directory and regular profile, and do not load references.

1. Ask what is wrong. "EW isn't sounding like me" needs a specific: which piece, which line, what it should have sounded like.
2. Change only the fields that answer to the complaint. Do not re-run onboarding and do not rewrite untouched fields.
3. Append one row to that profile's RECALIBRATION LOG for every field changed — date, field, old value, new value, reason.
4. Update `Last updated`. Reset `Sessions run since last update` to 0.
5. Treat the profile as a compare-and-swap update: retain exact bytes/hash, write the full candidate to an exclusively created sibling temporary file, revalidate and re-read the profile immediately before publication, stop if it changed, atomically replace only the unchanged file, and re-read the result.
6. Report the diff in plain language: what changed, from what, to what.

The log is the point. A profile that drifts without a record is a profile nobody can debug when the output goes wrong.

---

## DELETE — `/ew:voice delete <name>`

1. Validate the requested slug and the stored active slug against exactly `[a-z0-9]+(?:-[a-z0-9]+)*` before constructing or probing either path. Apply component-by-component `lstat`/Windows-reparse checks and canonical containment from the resolved managed root through `voices/<slug>` and every descendant. Require the voice root and every directory below it to be real directories and every non-directory descendant to be a regular file. Reject any symlink, junction, mount point, other reparse redirect, socket, device, FIFO, special file, or containment failure and do not mutate anything.
2. **Refuse if it is the active voice.** Say so and tell the user to switch away first. Snapshot the `active-voice` regular file's identity, exact bytes, and SHA-256 hash; deletion must later prove that this pointer is unchanged and still names another valid slug. This prevents a concurrent switch from making the target active after the initial check.
3. Recursively inventory the complete voice tree, including unrecognized folders and files rather than only `voice-profile.md`, `references/`, `drafts/`, and `samples/`. The frozen manifest contains `.` plus every descendant, sorted by bytewise relative path. Each row records the exact slash-normalized relative path and type; every regular file also records byte size and SHA-256 content hash (directories use `—` for size/hash). Obtain file identity before reading, hash the bytes without following redirects, then re-check identity/type/size after reading. Reject duplicate/case-colliding relative paths and descendant paths with a component equal to `.` or `..`, absolute roots, injected separators, or escapes. Do not exclude or silently discard transaction-looking entries inside the voice.
4. **Disclose the complete frozen manifest before asking for confirmation.** Show every row's relative path, type, size, and SHA-256 hash; counts or a summary of the standard folders are not sufficient. Explain that every listed file, including drafts, samples, references, and any unrecognized content, will be deleted. Then require confirmation that names the exact validated slug. "Yes" is not enough; the user types the slug. Any rescan difference after this confirmation invalidates it and requires a new complete disclosure and confirmation; confirmation never transfers to a changed manifest.
5. Preflight the whole transaction before mutation. In connected mode snapshot `~/.everyday-writer/config.json` by validated regular-file identity, exact bytes, and SHA-256 hash, and snapshot the resolved home note the same way. Construct candidate home bytes that remove only the target's one exact canonical `[[Everyday Writer/voices/<slug>/voice-profile|<link-safe voice alias> Voice Profile]]` link; zero matches or multiple matches is a hard stop. In default mode record that there is no home-index mutation. In both modes retain the pointer snapshot from step 2. Generate and validate a unique sibling quarantine basename `.ew-delete-<slug>-<nonce>` under the same canonical `voices/` parent. It must be absent and must never be treated as a voice by list, switch, repair, onboarding, or normal resolution.
6. Immediately before the first mutation, re-resolve storage without accepting a different locator and revalidate all boundaries and identities. In connected mode require the configuration identity/bytes/hash and canonical resolved data root to equal the snapshot. Require the pointer identity/bytes/hash to equal its snapshot and still name a different valid voice. Re-enumerate the entire target with the same rules and require exact manifest equality: no added, removed, renamed, retyped, resized, or rehashed entry. Re-read the home note and require its identity/bytes/hash to match its snapshot. If anything differs, stop before mutation, disclose the new state, and require a fresh inventory and confirmation.
7. Atomically rename the verified `voices/<slug>/` directory to the prepared quarantine path **within that same canonical `voices/` parent**, using a filesystem operation with exclusive/no-replace destination semantics. An absence check followed by an ordinary replacing rename is not sufficient; if this platform cannot guarantee no-replace directory rename, stop without deleting. Revalidate the quarantined root and recursively inventory it without following redirects. Require it to match the confirmed manifest exactly, including every relative path, type, size, and hash. Also require the original voice path to be absent. On collision, race, rename ambiguity, or verification failure, stop; do not rename back, delete, or otherwise clean up a quarantine that exists. Report the exact original path, quarantine path, and both observed states. Never describe an attempted rename as a rollback.
8. Only after quarantine verification, publish the connected-mode home candidate with compare-and-swap against the unchanged home snapshot and verify that the one exact link is absent while all other bytes match the candidate. Revalidate the configuration and inactive pointer snapshots again before publication. If the home update, configuration check, or pointer check fails, leave the quarantine untouched and report `home index repair pending`, the exact quarantine recovery path, whether the original path exists, and the observed home/config/pointer state. Quarantine-first ordering is the compensation strategy: do not compensate by restoring the live directory, re-adding or inventing a link, or claiming rollback; preserve the verified quarantine as the recoverable source of truth.
9. Immediately before final removal, revalidate the config/pointer/home postconditions and re-inventory the quarantine, requiring exact equality with the user-confirmed manifest. Then recursively delete **only that exact quarantine path**. Never run recursive removal against the original slug path, a glob, the `voices/` parent, or a re-resolved/substituted path. If any pre-delete check changes, stop and leave quarantine intact. If recursive removal itself reports an error, do not retry or pretend rollback: stop, inventory whatever safely remains, and report the exact quarantine path as `complete` or `partially removed` with its current manifest and the exact home/config/pointer states.
10. Confirm deletion only after proving the original voice path and quarantine path are both absent, the active pointer is unchanged and names another voice, the connected configuration still resolves to the same workspace, and the connected home note exactly equals the verified candidate with the canonical link absent. A retry must detect a recognized `.ew-delete-<slug>-<nonce>` quarantine and offer explicit inspect/resume recovery; it must never silently hide, restore, delete, or treat that quarantine as a normal voice.

This is the only destructive command in EW. Treat it that way.

## REPAIR — `/ew:voice repair <name>`

Repair exists for a pre-existing incomplete legacy tree or a prior interrupted index/pointer step; `.ew-stage-*` directories and `.ew-delete-<validated-slug>-<nonce>` quarantines are not voices. Voice repair must stop and route a recognized deletion quarantine to the delete inspect/resume recovery flow; it must not restore, complete, or delete it implicitly. Validate the exact slug and inventory the final tree without following redirects. Continue only when the stored identity/slug/type unambiguously match and every existing file is a regular contained file. Show the missing canonical components and require explicit confirmation. Create missing directories/files exclusively and update an incomplete profile only with compare-and-swap; never replace conflicting samples or profile fields. Repair `active-voice` and the home index as separate idempotent CAS operations, then re-resolve and verify before saying the voice is repaired.

---

## FABRICATION DISCIPLINE

Section 0.2 of `core/anti-ai-rules.md` binds every field this skill writes.

**What the samples support, you may state.** How someone builds a sentence, where they land a paragraph, what they reach for when they open a piece — that is all on the page.

**What the samples do not support stays bracketed.** A subject's goals, their opinions about their own writing, why they write, what they want to improve, their biography, their job. Prose shows how a person writes. It does not show what they want.

The tell that this rule is being broken is a profile that reads like a character study. If a `Subject` profile contains a sentence you could not point to a specific passage to justify, it is invention — cut it or bracket it.

Never record `Confirmed by: the writer` on a profile the subject did not personally confirm.
