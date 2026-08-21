# Everyday Writer Distribution

Everyday Writer is a skill system, not an app. Distribution should make the existing skill easier to install without changing the core shape: root dispatcher, core rules, onboarding, voice resolver, sub-skills, cowork files, and npm installer.

## A. Developer Install

Use this if you are comfortable with a terminal, VS Code, Codex local skills, Claude Code, or npm.

```bash
npx everyday-writer install
```

This installs EW into:

```text
~/.codex/skills/everyday-writer/
```

Your voice profiles live separately in:

```text
~/.everyday-writer/
```

Reinstalling or updating EW should not overwrite your voices. This path stays unchanged and remains the best path for developers, Codex/local skill users, and Claude Code power users.

## B. Claude App Custom Skill Install

This is the no-code path for people who do not want to use a terminal.

First, someone technical generates the ZIP:

```bash
npm run package:claude-skill
```

That creates:

```text
dist/everyday-writer-claude-skill.zip
```

Then the beginner install flow is:

1. Download or receive `everyday-writer-claude-skill.zip`.
2. Open Claude.
3. Go to **Customize > Skills**.
4. Upload the ZIP.
5. Enable **Everyday Writer**.
6. Start with `/ew`, or just ask Claude for writing help.

The ZIP contains the same EW instructions: the root dispatcher as `skill.md`, core rules, onboarding, voice resolver, sub-skills, the reference-folder redirect note, and supporting assets. It does not contain local voice profiles, development files, private resources, `node_modules`, `.git`, or `dist`.

## C. OpenAI/Codex Install

Current repo support is local-skill based:

- Root `SKILL.md` is the EW dispatcher.
- `agents/openai.yaml` provides Codex UI metadata.
- `npx everyday-writer install` copies EW into `~/.codex/skills/everyday-writer/`.
- Codex users invoke EW with `$ew` or a direct sub-skill like `$ew:linkedin`.

OpenAI/Codex native skill or plugin installation may vary by environment. Where an app supports uploading or installing skills directly, the target user experience should be app-native: pick Everyday Writer, install or upload it, enable it, then start writing. Until that path is officially available in the user's environment, the supported route remains the local npm install above.

Do not describe an app-store or one-click OpenAI install as available unless the target environment actually supports it.
