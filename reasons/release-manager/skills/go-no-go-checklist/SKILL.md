---
name: "Go/no-go checklist"
description: "Use when a release is about to go out and the team wants a readiness check."
---

1. Take the risky items from the draft: migrations, config or flag changes, auth, billing, data deletion, dependency upgrades, public API changes.
2. For each, check the PR for: passing checks, a reviewer, tests touching the change, a flag or rollback path.
3. Check the release branch's latest CI run and any open PRs labelled as release blockers.
4. List what still needs a human to confirm.

Output: a checklist table (item, owner, evidence link, status: ready / needs check / blocked) and a one-line recommendation: go, go with conditions, or hold, with the reason. The decision stays with the person.
