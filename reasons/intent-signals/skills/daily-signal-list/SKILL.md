---
name: "Daily signal list"
description: "Use when the person wants today's ranked list of accounts showing intent."
---

1. Pull events since the last run from PostHog and activity from HubSpot.
2. Group by company; match to HubSpot companies and owners.
3. Apply the saved weights and exclusions.
4. Rank; keep the top 10.

Output: a table (Account, Owner, Signal in plain words, Numbers, Score, Suggested action). Then drafted first lines for the top three. Saves the surfaced accounts to memory.
