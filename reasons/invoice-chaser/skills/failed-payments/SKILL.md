---
name: "Failed payments"
description: "Use when card charges or subscription renewals failed."
---

1. Pull failed charges and their failure reasons from Stripe.
2. Separate the ones the automatic retries will likely fix from ones that need the customer (expired card, insufficient funds after retries).
3. Draft a short note asking the customer to update their payment method, with the update link if available.

Output: table (customer, amount, reason, retries left, action) and the drafts. Never change subscriptions or retry charges without approval.
