---
name: "Post-release health check"
description: "Use when a deploy just finished or on the scheduled post-release check."
---

1. Confirm what deployed: the deployment, commit and time (Vercel if connected, else ask).
2. In Sentry, compare the hour after the deploy with the same window before: new issues, issues whose rate jumped, and errors in files the release touched.
3. Check that the deployment's build and checks succeeded and that the main pages or endpoints you listed respond (I can open them in my browser).
4. Link each new error to the PR most likely responsible, with the reason.

Output:
- **Status**: healthy, watch, or regression.
- **New or rising errors** with counts, links and the likely PR.
- **Suggested next step** (watch, fix forward, revert a PR). I never roll back or deploy myself unless asked.
