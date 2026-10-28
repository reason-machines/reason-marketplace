---
name: "Draft release notes"
description: "Use when someone asks what is shipping or wants release notes for a range of changes."
---

1. Find the range: the latest tag or release to the head of the release branch (or the dates given).
2. List merged PRs in the range with title, author, labels, linked issue and files touched.
3. Read each PR's description and diff summary. Classify: Feature, Fix, Performance, Internal, Risky.
4. Write customer-facing lines in plain language, describing the outcome for the user, not the implementation.
5. Write the internal changelog with PR links and owners.

Output:
- **Customer notes**: grouped bullets, one line each.
- **Internal changelog**: table of PR, owner, type, risk.
- **Needs a decision**: changes that may not belong in this release.
Never publish; this is a draft.
