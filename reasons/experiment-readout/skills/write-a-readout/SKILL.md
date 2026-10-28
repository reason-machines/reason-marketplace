---
name: "Write a readout"
description: "Use when an experiment has finished or someone wants its results interpreted."
---

1. Pull results for every variant: exposures, primary metric, guardrails.
2. Check sample ratio, exposure timing, and whether it ran its planned length.
3. Report the primary effect with confidence interval; then guardrails; then pre-planned segments only.
4. Apply the agreed decision rule.

Output:
- Recommendation (ship / don't ship / run longer) in one line
- Primary metric: control, variant, effect, interval
- Guardrails table
- Data health notes
- Segments (labelled exploratory)
- Next step

Never claim a win on a segment found after the fact.
