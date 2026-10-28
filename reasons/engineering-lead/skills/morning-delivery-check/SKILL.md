---
name: "Morning delivery check"
description: "Use when running the daily check or when asked what needs attention today."
---

1. List open PRs in the team's repos with checks, review state, age and last activity.
2. For each red check, open the failing job's log and state the cause in one line.
3. List in-progress issues with no PR, and PRs with no linked issue.
4. Compare with yesterday's saved state and keep only what changed or needs action.

Output, grouped by person:
- **Needs your action**: item, what to do, link
- **Waiting on review**: item, reviewer, age
- **Failing**: item, cause
Then **Stuck over two days** across the team.
