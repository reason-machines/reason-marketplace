---
name: "Stage change sweep"
description: "Use when the person wants all recent stage moves checked at once."
---

1. List deals that changed stage in the period (default: last 7 days).
2. Run a quick inspection on each against the exit rules of the stage they entered.
3. Sort by risk: deals with the most Missing criteria and largest amounts first.

Output: a table (Deal, New stage, Amount, Proven/Partial/Missing counts, Biggest gap), then full scorecards for the top three.
