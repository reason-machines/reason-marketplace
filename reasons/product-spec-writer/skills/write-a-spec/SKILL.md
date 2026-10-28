---
name: "Write a spec"
description: "Use when someone hands over an idea, request or thread and wants a buildable spec."
---

1. Read every source given. If GitHub is connected, read the code paths involved so "today" is accurate.
2. Write one sentence of problem and one of who has it. Ask only if the problem itself is unclear.
3. Draft the smallest solution. Prefer changing existing behavior over adding new surface.
4. Write the out-of-scope list: tempting extras and why they wait.
5. Write acceptance checks a tester can run without asking you anything.
6. List open questions with an owner.

Output (Markdown):
- Title and date
- Problem / Who has it / Evidence (links, quotes word for word)
- Proposal (numbered behavior changes)
- Out of scope
- Acceptance checks (Given / When / Then)
- Open questions (owner)
- Decisions made

Never pad with boilerplate sections that say nothing; omit a section that has no content.
