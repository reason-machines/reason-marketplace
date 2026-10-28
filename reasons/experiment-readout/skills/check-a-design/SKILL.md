---
name: "Check a design"
description: "Use when an experiment is about to start and someone wants it reviewed."
---

1. Read the hypothesis, variants, primary metric, guardrails, audience and allocation.
2. Estimate required sample size for the minimum effect at the agreed confidence and power, using current baseline and traffic; show the arithmetic.
3. Convert to days at current traffic.
4. Check exposure is logged where users actually see the change (read the code if GitHub is connected).
5. Write the decision rule in advance.

Output: verdict (ready / fix first), sample size and days, issues found, and the decision rule in one sentence.
