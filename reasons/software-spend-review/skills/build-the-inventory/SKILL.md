---
name: "Build the inventory"
description: "Use when someone wants a list of every software subscription and its cost."
---

1. Pull 12 months of transactions; filter to software and cloud vendors.
2. Merge vendor name variants; detect billing cadence and annualize.
3. Fill owner, purpose and renewal date from bills or by asking.
4. Save the inventory as a CSV and in memory.

Output: a table sorted by annual cost (vendor, owner, plan, cadence, annual cost, renewal, notes), totals, and a list of vendors I couldn't identify.
