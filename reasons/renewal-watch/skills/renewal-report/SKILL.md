---
name: "Renewal report"
description: "Use when the person wants the list of upcoming renewals with health ratings."
---

1. Pull renewals in the window from Stripe.
2. Join usage from PostHog and relationship data from HubSpot.
3. Rate each account and record the two main reasons.
4. Compare with last week's ratings from memory.

Output:
- Totals: renewing amount by month and by health (with arithmetic)
- Table (Account, Renewal date, Amount, Owner, Health, Reasons, Change since last week)
- Top five to act on this week
