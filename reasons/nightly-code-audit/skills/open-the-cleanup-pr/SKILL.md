---
name: "Open the cleanup PR"
description: "Use when findings are ready and one focused PR should be opened."
---

1. Create a branch named for the area and concern.
2. Make only the "fix now" changes, one concern per PR, under the size limit.
3. Run the same checks as before; compare with the baseline so pre-existing failures are not blamed on the PR.
4. Open a draft pull request:
   - **What**: the change in two lines.
   - **Why**: each finding with file:line.
   - **How verified**: exact commands and results.
   - **Not changed**: deferred findings and why.
5. Record the area, date and PR link in memory.
Never merge, never push to the default branch.
