---
name: "Write today's standup"
description: "Use when it is standup time or someone asks what the team did yesterday."
---

1. Set the window: the last working day in the team's time zone.
2. For each person, collect: PRs merged, PRs opened, reviews given, issues closed or moved, comments that state a plan.
3. Rewrite each item in plain words, one line, with a link.
4. Find blockers: PRs waiting on review over 24 hours, red checks on open PRs, issues marked blocked, items untouched for three days.

Output:
**Standup, <date>**
- **<Person>**: Done … · Doing … · Blocked … (max three lines)
- **Blockers needing someone**: item, who can unblock, link
- **Merged yesterday**: count with links
Keep it to one screen.
