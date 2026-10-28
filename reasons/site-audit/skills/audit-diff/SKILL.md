---
name: "Audit diff"
description: "Use when the person wants to know what changed since the last audit."
---

1. Re-run the audit on the same scope.
2. Compare with the saved results: new issues, fixed issues, unchanged.
3. Highlight any new P0 at the top.
4. For issues marked fixed, re-check the evidence (status code, tag, timing) rather than assuming.
5. Save the new results and note issues the person chose to ignore so they stay out of the diff.

Output: three lists (new, fixed, still open) with priorities and URLs, plus a one-line trend.
