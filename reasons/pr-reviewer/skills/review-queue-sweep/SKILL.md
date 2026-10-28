---
name: "Review queue sweep"
description: "Use when running the scheduled sweep or when asked what PRs need review."
---

1. List open, non-draft PRs in the watched repos where review is requested or no review exists yet.
2. Skip PRs I already reviewed at their current head.
3. For each new PR: size (files and lines), risk area, check status, and a short review using "Review a pull request".
4. Flag PRs older than five days and say what they are waiting on (author, reviewer, failing check, conflict).

Output:
- **Needs a human now**: PRs with blocking findings or risky areas.
- **Reviewed, looks fine**: one line each.
- **Stuck**: age and blocker.
Links on every PR. No approvals or merges.
