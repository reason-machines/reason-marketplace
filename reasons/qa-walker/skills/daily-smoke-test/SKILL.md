---
name: "Daily smoke test"
description: "Use when running the scheduled smoke test or when asked if production is healthy."
---

1. Load the saved core flows for production.
2. Walk each quickly; time page loads that feel slow and note them.
3. Compare with the last run saved in memory.
4. Only report in detail what changed: new failures, recovered steps, slower pages.

Output: one line "All core flows passed" or a short list of failures with screenshots, plus anything that recovered since yesterday.
