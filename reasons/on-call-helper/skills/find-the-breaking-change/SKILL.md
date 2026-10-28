---
name: "Find the breaking change"
description: "Use when a problem started at a known time and the team suspects a deploy or merge."
---

1. List deploys and merged PRs in a window around the start time (default: four hours before to one hour after).
2. For each PR, read the diff summary and check whether it touches the failing path (files in the stack trace, the endpoint, the queue, the query).
3. Score each candidate: timing match, code-path match, error-signature match.
4. For the top candidate, point to the lines most likely at fault and explain the mechanism.

Output: a ranked table (PR, time, why it fits, confidence), then the top suspect's explanation and the safest way to undo it. I never revert without the person's OK.
