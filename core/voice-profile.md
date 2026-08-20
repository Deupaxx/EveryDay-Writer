# EW — Voice Resolver

> **This file is not a voice profile.** It is the pointer that finds one.
>
> Every sub-skill's dependency chain names `core/voice-profile.md`. That name is kept so the
> chain stays intact, but the profile itself lives outside the plugin directory, one per voice.
> Resolve the active voice here, then read that voice's profile and treat it as the fingerprint.

---

## WHY THE PROFILE IS NOT IN THIS DIRECTORY

The plugin directory is a cache. When EW is installed from the marketplace, an update replaces it wholesale — anything written here is destroyed. This repository is also public and published to npm, so a client's voice profile stored here would be one commit away from publication.

Voices live under the user's home directory instead. Plugin updates cannot touch them and git cannot see them.

---

## THE VOICE HOME

```
~/.everyday-writer/                 Windows: %USERPROFILE%\.everyday-writer\
  active-voice                      one line: the active voice slug
  voices/
    <slug>/
      voice-profile.md              the fingerprint — this is what you read
      references/                   this voice's drop-zone
      drafts/                       file-mode output for this voice
      samples/                      writing the profile was built from
```

Slugs are lowercase kebab-case and match their directory name.

---

## RESOLUTION — RUN THIS EVERY INVOCATION

**Step 1 — Check for an inline override.**

If the user's request names a voice for this piece of writing — "as writer-main", "in client-acme's voice", "write this one as <name>" — that voice wins **for this invocation only**.

Do not write `active-voice`. Do not treat the override as a switch. The next invocation goes back to the active voice.

If the named voice does not exist, **stop**. List the voices that do exist and ask which was meant. Never guess at a near-match and never proceed in a voice you invented — writing under a fabricated identity is Section 0.2 of `core/anti-ai-rules.md` applied to the voice itself.

**Step 2 — Otherwise, read the active voice.**

Read `~/.everyday-writer/active-voice` and trim whitespace. That string is the slug.

**Step 3 — Read the profile.**

Read `~/.everyday-writer/voices/<slug>/voice-profile.md`. **This file is the voice fingerprint.** Everything downstream in the dependency chain treats it exactly as it would have treated a profile stored here.

If its `Completed:` field is not `Yes`, stop and run onboarding for that voice before writing.

**Step 4 — Load that voice's references.**

Read every `.md` file in `~/.everyday-writer/voices/<slug>/references/`.

These are that voice's reference material and no other voice's. The plugin's own `references/` folder is **not** scanned — see the clean-room rule below.

---

## EDGE CASES

| Condition | What to do |
|---|---|
| `~/.everyday-writer/` does not exist | First run. Route to `onboarding/ONBOARDING.md`, which creates the tree. |
| `voices/` exists but is empty | Route to onboarding. |
| Exactly one voice, no `active-voice` file | Set `active-voice` to that voice and continue. Do not prompt. |
| Two or more voices, no `active-voice` file | Stop. List them and ask which to activate. |
| `active-voice` names a voice that does not exist | Stop. Report the broken pointer, list what exists, ask. Do not silently pick one. |
| Resolved profile has `Completed: No` | Run onboarding for that voice first. |
| Inline override names an unknown voice | Stop and ask. See Step 1. |

The pattern in every failing case is the same: **stop and ask, never guess.** Wrong-voice output is fluent and plausible, which makes it far harder to catch than an error message.

---

## THE CLEAN-ROOM RULE

A voice's `references/` folder is read only when that voice is active or named in an override.

The plugin's own `references/` directory is no longer a drop-zone and is not scanned. This is deliberate: a ghostwriting client's brand guidelines must not be able to reach the user's own writing, and the user's material must not leak into a client's. A single shared folder cannot give that guarantee.

---

## STORED SAMPLES DO NOT OVERRIDE THE PROFILE

Section 0.1 of `core/anti-ai-rules.md` gives precedence to a sample **pasted in the current conversation**. That is a live signal about what the writer wants right now.

Files sitting in a voice's `samples/` folder are not that signal. They are provenance — the evidence the profile was built from, kept for recalibration. Do not load them into the dependency chain, and do not treat them as a standing override. Extending §0.1 to disk would mean every invocation quietly overrides the fingerprint onboarding worked to establish.

---

## WHERE DRAFTS GO

When EW writes a draft to disk and the user has not given a path, write it to `~/.everyday-writer/voices/<slug>/drafts/` for the voice in effect.

The `drafts/` folder inside the plugin directory is not used by this flow.

---

## THE VOICE TAG

In **interactive mode**, print the voice on one line above the draft:

```
Voice: client-acme

[draft follows]
```

Not a prompt and not a gate — do not wait for confirmation. It is a label.

**Suppress it in embedded mode**, where another skill or agent is calling EW for prose and wants no ceremony.

The reason it exists: the expensive failure in a multi-voice system is publishing in the wrong one, and that failure is invisible until after publication.

---

## MANAGING VOICES

Creating, switching, importing, editing, and deleting voices is handled by `skills/voice/SKILL.md` (`/ew:voice`). Do not edit `active-voice` or the voice tree by hand from inside another skill — route the user there.

---

## THE BLANK TEMPLATE

The empty fingerprint every new voice is stamped from lives at `core/voice-profile-template.md`. Onboarding copies it into the voice directory and fills it in. It is never filled in place.
