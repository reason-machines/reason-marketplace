---
name: "Price watch check"
description: "Use when the price watch routine runs."
---

1. For each watchlist item, check the retailers that previously had the best prices plus the manufacturer.
2. Update the lowest price seen in memory.
3. Only report items that hit the target or dropped meaningfully; remove expired items and say so.
4. If nothing changed, reply with one line.

Output: for each hit: item, new total, where, link, time seen, and how it compares with the target. Never buy.
