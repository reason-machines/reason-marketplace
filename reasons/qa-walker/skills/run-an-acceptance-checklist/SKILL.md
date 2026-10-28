---
name: "Run an acceptance checklist"
description: "Use when a change needs QA before or after it ships."
---

1. Load the checklist (from the PR, the issue, the message or memory). Each step needs an expected result.
2. Open the URL in my browser. Walk each step exactly as written.
3. For each step record pass or fail. On failure, take a screenshot, note the console errors and failed requests, and retry once.
4. Check phone width too if the change touches layout.

Output:
- **Verdict**: ship, ship with known issues, or do not ship.
- A table: step, expected, actual, pass/fail, evidence link.
- **Could not test**: steps blocked and why.
