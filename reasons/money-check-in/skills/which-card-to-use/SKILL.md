---
name: "Which card to use"
description: "Use when the person asks which of their cards to use for a purchase or category."
---

1. Load the person's cards and reward rules from memory; look up the current published terms on the issuer's site if missing or stale, and note the date.
2. Identify the purchase category (groceries, travel, dining, online) and any caps or rotating categories.
3. Compute the effective return per card for this purchase, using the person's preference (points value they set, or cash back).
4. Mention fees or foreign transaction charges that change the answer.

Output: "Use <card>" in one line, then a small table Card | Rate here | Why, and the source links. Not financial advice.
