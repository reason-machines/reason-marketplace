---
name: "Post inline comments"
description: "Use when the person approves the findings and wants them posted on the PR."
---

1. Confirm which findings to post (default: Blocking and Should fix).
2. Re-read the PR head; if new commits landed since my review, re-check each finding against the latest code and drop the ones already fixed.
3. Post one inline comment per finding on the exact line, written as: the problem in one sentence, the scenario, and a suggested change (a code suggestion when it is small).
4. Post one summary comment with the verdict and the list of findings, linking each.
5. Do not submit an approval or request changes unless explicitly asked.

Output: a list of the comments posted with links, and anything skipped and why.
