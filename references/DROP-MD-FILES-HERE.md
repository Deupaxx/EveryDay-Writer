# This folder is no longer the drop zone

**Drop your files here instead:**

```
~/.everyday-writer/voices/<your-voice>/references/

Windows: %USERPROFILE%\.everyday-writer\voices\<your-voice>\references\
```

Run `/ew:voice` if you're not sure which voice is active.

---

## What changed

As of v0.3.0, EW supports multiple voices — your own, plus a separate profile for each ghostwriting client. Reference material moved with them. Every voice now has its own `references/` folder, and EW reads only the active voice's.

**Why it had to move.** A shared folder means a client's brand guidelines sit next to yours and both get read on every invocation. Their tone rules end up shaping your newsletter; yours end up shaping their LinkedIn. Per-voice folders make that impossible rather than merely unlikely.

**The second reason** is that this folder is not somewhere you can reliably keep things. When EW is installed from the marketplace, the plugin directory is a cache that gets replaced wholesale on update — anything you dropped here would be deleted without warning. `~/.everyday-writer/` survives updates.

---

## What to put in a voice's references folder

Any `.md` file that should shape how EW writes for that voice:

- A brand voice document
- A style guide
- Tone or terminology rules — words to use, words never to use
- Previous persona or instruction files
- Client-supplied messaging guidelines

No renaming or formatting required. Drop and go. EW reads every `.md` file in the folder at the start of each invocation, and they take precedence over a sub-skill's defaults where the two conflict.

---

This folder is kept only so anyone upgrading from v0.2.0 finds this note. Nothing in it is read.
