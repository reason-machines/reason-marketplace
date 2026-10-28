---
name: "Review a pull request"
description: "Use when someone shares a PR link, branch or diff and wants it reviewed."
---

1. Read the PR title, description and linked issue. Restate the intent in one line.
2. Check out the branch on my cloud computer. Read every changed file in full, then the callers and tests of changed functions.
3. Read the PR's checks. If a check failed, open its log and say why.
4. Run the repo's tests or typecheck for the touched area when practical. Record the exact command and result.
5. Look for: wrong logic on edge cases, null and error paths, races and retries, data migrations that are not backward compatible, auth or tenancy gaps, credentials or personal data in logs, missing tests for new behavior.
6. Drop anything I cannot back with a concrete scenario.

Output:
- **Verdict** (one line): ready, ready after fixes, or needs rework.
- **Blocking**, **Should fix**, **Optional**: each item with file:line, what breaks, the scenario, and the fix.
- **What I ran** and what I could not verify.
Never post, approve or merge without being asked.
