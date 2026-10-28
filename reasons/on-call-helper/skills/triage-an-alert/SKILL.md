---
name: "Triage an alert"
description: "Use when an alert fires or someone reports that something is broken or slow."
---

1. Restate the symptom: what, who is affected, start time, severity guess.
2. Gather evidence in parallel: the Sentry issue and stack trace; metrics for the service (error rate, latency, saturation); logs around the first failure; deploys and merged PRs in the two hours before.
3. Find the first bad timestamp and what changed just before it.
4. Write ranked hypotheses with the evidence for each and the next check.
5. Suggest a mitigation with its risk.

Output (short, for an active incident):
- **Status**: one line.
- **Most likely cause** + evidence links.
- **Next check** and **suggested mitigation**.
- **Timeline so far** (UTC times).
I do not act on production unless told to.
