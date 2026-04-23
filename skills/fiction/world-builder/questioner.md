# EW World Builder — Phase 1: Questioner

**Dependency:** This file is invoked from `WORLD-BUILDER.md`. Do not run it standalone without reading that file first.

---

## HOW THIS WORKS

Claude conducts a structured dialogue with the writer. Questions move from large to specific — world concept first, granular details last. The goal is to extract the minimum set of decisions that will make the story possible.

**Rules for Claude during questioning:**
- Ask one question at a time. Never cluster questions.
- If the writer's answer raises a contradiction, flag it immediately before moving on.
- If the writer says "I don't know yet," mark it as an open question and continue — do not push for a decision they haven't made.
- Adapt the sequence to the genre. A hard sci-fi novel needs different questions than a contemporary thriller. Skip sections that don't apply; add questions that the genre requires.
- When the writer's answer reveals a story-breaking problem (a world rule that eliminates all conflict, a protagonist with no opposition), name the problem and ask how they want to address it.

---

## THE QUESTION SEQUENCE

### LEVEL 1: WORLD CONCEPT

These questions establish the foundation. Every other decision rests on these answers.

1. What is the genre and tone? (Fantasy, sci-fi, thriller, literary fiction, horror — and where on the spectrum of dark to light does this story sit?)

2. What is the central premise in one sentence? (Not the plot — the world condition that makes the plot possible. "A city where memories can be bought and sold." "Earth after all governments have collapsed." "A family carrying a generational curse they don't know about.")

3. What is the story's time period? (Historical, contemporary, future, alternate history, atemporal?)

4. What is the primary setting — the place where most of the story happens?

5. What is the emotional core of this story — the feeling you want the reader to leave with?

---

### LEVEL 2: THE PROTAGONIST

6. Who is the protagonist? Name, approximate age, and one-sentence description of their situation at the story's start.

7. What does the protagonist want — their specific, concrete goal? (Not a vague desire like "peace" — a specific thing they are actively pursuing.)

8. What does the protagonist need — the internal truth they must confront to become whole? (This is usually different from what they want, and often in conflict with it.)

9. What is the protagonist's Ghost — the past event or wound that defines how they move through the world? (They may not consciously know about it. The reader will feel it.)

10. What is the protagonist's fatal flaw — the thing about them that will cause their biggest problems?

---

### LEVEL 3: CONFLICT AND OPPOSITION

11. Who or what is the primary antagonist? (A person, a force, a system, an internal demon — or some combination.)

12. How does the antagonist specifically attack the protagonist's weakness? (The best antagonists are not simply powerful — they are targeted. They expose exactly what the protagonist can't face.)

13. What are the stakes? What does the protagonist lose if they fail — and is it personal enough to matter?

14. What does the protagonist's ordinary world look like before the story's inciting incident? What is normal for them?

15. What is the inciting incident — the specific event that makes the status quo impossible?

---

### LEVEL 4: WORLD RULES

*Adapt these questions to genre. Skip or replace sections that don't apply.*

**If the world has magic or supernatural elements:**
16. What is the source of magical/supernatural power in this world?
17. What are the limits and costs? (A magic system with no limits has no tension.)
18. Who has access to it — and who is denied access, and why?
19. What happens to those who use too much of it, or use it wrongly?

**If the world has advanced or alternate technology:**
20. What is the central technology that defines this world differently from ours?
21. Who controls it, and what does that control mean for everyone else?
22. What has this technology made possible that wasn't before — and what has it made impossible or obsolete?

**If the world is contemporary or historical:**
23. What is different about this version of the world from the world as it is/was?
24. What real-world tensions or dynamics does this story engage with?

---

### LEVEL 5: SOCIETY AND STRUCTURE

25. What is the dominant social/political structure? (Who holds power, and how do they hold it?)
26. What is the primary division in this society — class, faction, belief, geography, biology? How does this division affect your protagonist directly?
27. What do ordinary people in this world believe about how the world works — and what is the truth that contradicts that belief?
28. What does the protagonist's world smell like, sound like, and feel like on a normal day? (Sensory grounding for the writer — not the reader.)

---

### LEVEL 6: HISTORY AND MYTHOLOGY

29. What happened in this world's past that still shapes the present? (The wound in the world's history, equivalent to the Ghost in a character's past.)
30. What do the people of this world believe about their origins or their purpose?
31. What event, person, or object is considered sacred or untouchable — and why?
32. What secret does this world's history contain that, if known, would change everything?

---

### LEVEL 7: SUPPORTING CHARACTERS

33. Who are the two or three most important supporting characters? For each: name, relationship to protagonist, and what they want from the protagonist.
34. Who is the character most likely to betray the protagonist — and what would drive them to it?
35. Who does the protagonist trust most — and is that trust fully warranted?

---

### LEVEL 8: OPEN QUESTIONS

At the end of the questioning phase, compile a list of every decision the writer has not yet made. These go into the world bible as explicit open questions — not blanks, but named uncertainties the writer will need to resolve before or during drafting.

**Format for open questions in the bible:**
> **[Open: Magic cost mechanism]** — Writer has not yet decided what the physical cost of using the Binding is. This needs to be resolved before writing any scene where a character uses it. Options discussed: physical aging, memory loss, emotional numbness. No decision made.

Open questions are not failures. They are creative work deferred to the right moment. The failure is not knowing they're open.

---

## AFTER QUESTIONING

When the sequence is complete (or the writer has answered enough to begin), summarize the answers back to the writer before generating the bible. Confirm:
- The premise is internally consistent
- The protagonist has a clear want and need that are in tension
- The antagonist is specifically targeting the protagonist's weakness
- The world's rules have consequences
- All open questions are named

Then invoke `skeleton-template.md` to produce the world bible.
