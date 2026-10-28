---
name: "Re-review after fixes"
description: "Use when the author pushed changes and wants to know if earlier findings are resolved."
---

1. Load my earlier findings for this PR from the conversation or the PR's review threads.
2. Diff the new commits against the head I reviewed last.
3. For each earlier finding mark it Resolved, Partly resolved or Open, quoting the new code that settles it.
4. Review only the new changes for fresh problems, with the same bar as the first review.
5. Reply in the open review threads when asked, and resolve threads only if the person wants that.

Output: a table of earlier findings with status and evidence, then any new findings, then the updated verdict.
