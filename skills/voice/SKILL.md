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
2. `core/anti-ai-rules.md` (full standard; Section 0.2 governs every profile field this skill writes)
3. `core/ai_slop_commandments.md` (mechanism reference and diagnostic checklist)
4. `core/voice-profile.md` (the resolver — how the active voice is found)
5. Any `.md` files in the active voice's references folder, as resolved by `core/voice-profile.md`

This chain applies on direct invocation (`/ew:voice`) exactly as it does on dispatch through `/ew`.

**Why a management skill reads the anti-AI rules.** This skill writes prose: voice adjectives, structural observations, "what not to write" lists. Building a profile for a person who is not in the conversation is the single highest-risk surface in EW for invention — of a subject's goals, opinions, history, and motives. Section 0.2 binds hardest here.

---

## THE VOICE HOME

```
~/.everyday-writer/                 Windows: %USERPROFILE%\.everyday-writer\
  active-voice                      one line: the active voice slug
  voices/
    <slug>/
      voice-profile.md
      references/
      drafts/
      samples/
```

Create any part of this tree that is missing, whenever a command needs it.

**Slug rules:** lowercase, kebab-case, `[a-z0-9-]+` only, and identical to the directory name. If the user gives a name that is not a valid slug ("Client Acme", "Writer Main Voice"), derive one, show it, and confirm before creating:

> "I'll store this as `client-acme`. Good, or would you rather call it something else?"

---

## COMMANDS

| Invocation | Command |
|---|---|
| `/ew:voice` | List |
| `/ew:voice <name>` | Switch |
| `/ew:voice new` | Create |
| `/ew:voice import <path>` | Import |
| `/ew:voice edit` | Recalibrate |
| `/ew:voice delete <name>` | Delete |

Requests arriving in plain language route the same way — "switch to my client voice", "add a new client", "who am I writing as?" — match on intent, not on syntax.

---

## LIST — `/ew:voice`

Read `active-voice` and every directory under `voices/`. For each, read its profile's IDENTITY and PROFILE STATUS sections.

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

1. Confirm `voices/<slug>/` exists. If not, **stop**: list the voices that do exist and ask. Never create a voice as a side effect of a switch, and never resolve to a near-match without asking.
2. Write the slug to `~/.everyday-writer/active-voice`.
3. Confirm in one line:

> `Active voice: client-acme (subject). Everything writes in this voice until you switch.`

If the target profile is incomplete, say so and offer to finish onboarding.

---

## CREATE — `/ew:voice new`

**Ask whose voice this is first.** Everything downstream depends on the answer.

> "Whose voice is this?
>
> 1. **Mine** — your own writing voice.
> 2. **Someone else's** — a ghostwriting client, or any voice that isn't yours."

**If Mine** → ask for a name, derive the slug, create the directory tree, then run `onboarding/claude-code-mode.md` in full. All seven steps, freewrite included. The only change is the destination: write the finished profile to `voices/<slug>/voice-profile.md`, not to `core/`.

**If Someone else's** → ask for a name, derive the slug, create the directory tree, then run `onboarding/subject-mode.md`.

Set `Voice type`, `Confirmed by`, and `Freewrite basis` in the profile according to which flow ran.

**After creating**, ask before switching rather than assuming:

> "Created `client-acme`. Switch to it now, or stay on `writer-main`?"

A ghostwriter setting up a client at the start of a week is not necessarily about to write for them.

---

## IMPORT — `/ew:voice import <path>`

The upgrade path from EW 0.2.0, where a single profile lived at `core/voice-profile.md`.

1. Read the file at `<path>`. If it is missing or is not a voice profile, say so and stop.
2. Ask what to call it and derive the slug.
3. Create `voices/<slug>/` with `references/`, `drafts/`, and `samples/`.
4. Copy the profile in verbatim.
5. Add any fields the 0.2.0 template lacked — `Voice slug`, `Voice type`, `Confirmed by`, `Freewrite basis`. Ask for `Voice type`; do not assume `Self`. Do not fill the others by inference: if the imported profile does not record whether a freewrite was included, write `[unknown — imported from 0.2.0]` rather than guessing.
6. Report what was imported and what was left bracketed.

**Do not rewrite, improve, or "clean up" the imported profile.** It is the user's calibration. Carry it across unchanged and let them edit it with `/ew:voice edit`.

---

## RECALIBRATE — `/ew:voice edit`

Operates on the active voice unless the user names another.

1. Ask what is wrong. "EW isn't sounding like me" needs a specific: which piece, which line, what it should have sounded like.
2. Change only the fields that answer to the complaint. Do not re-run onboarding and do not rewrite untouched fields.
3. Append one row to that profile's RECALIBRATION LOG for every field changed — date, field, old value, new value, reason.
4. Update `Last updated`. Reset `Sessions run since last update` to 0.
5. Report the diff in plain language: what changed, from what, to what.

The log is the point. A profile that drifts without a record is a profile nobody can debug when the output goes wrong.

---

## DELETE — `/ew:voice delete <name>`

1. **Refuse if it is the active voice.** Say so and tell the user to switch away first. Deleting what is currently in effect leaves the system pointing at nothing.
2. Show what will be lost — profile, and the file counts in `references/`, `drafts/`, and `samples/`.
3. Require confirmation that names the voice. "Yes" is not enough; the user types the slug.
4. Delete the directory. Confirm what was removed.

This is the only destructive command in EW. Treat it that way.

---

## FABRICATION DISCIPLINE

Section 0.2 of `core/anti-ai-rules.md` binds every field this skill writes.

**What the samples support, you may state.** How someone builds a sentence, where they land a paragraph, what they reach for when they open a piece — that is all on the page.

**What the samples do not support stays bracketed.** A subject's goals, their opinions about their own writing, why they write, what they want to improve, their biography, their job. Prose shows how a person writes. It does not show what they want.

The tell that this rule is being broken is a profile that reads like a character study. If a `Subject` profile contains a sentence you could not point to a specific passage to justify, it is invention — cut it or bracket it.

Never record `Confirmed by: the writer` on a profile the subject did not personally confirm.
