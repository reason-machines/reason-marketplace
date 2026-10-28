---
name: "Daily spend check"
description: "Use when the person wants today's or yesterday's ad spend checked for problems."
---

1. Pull yesterday's results per campaign (plugin or latest export) plus the trailing 7 and 28 days.
2. For each campaign compute spend, conversions, cost per conversion, click-through rate and pacing (spend to date ÷ expected spend to date).
3. Apply the saved thresholds and flag breaches. Also flag: spend with zero conversions for 2+ days, disapproved ads, budgets exhausted before evening, sudden conversion drops across all campaigns (tracking).
4. Rank by money at risk per day.

Output:
- One line: all clear, or N issues with total daily spend at risk
- Table: campaign | issue | yesterday vs 7-day | money at risk/day | likely cause | proposed fix
- Data source and date range

Do not make any change. Proposals only.
