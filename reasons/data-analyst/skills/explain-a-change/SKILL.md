---
name: "Explain a change"
description: "Use when a metric went up or down and someone wants to know why."
---

1. Confirm the change is real: compare against the normal week-to-week range and check for tracking breaks (event volume drops to zero, new event names, releases that touched tracking).
2. Break the change down by the dimensions that usually explain it: platform, country, plan, acquisition channel, new vs returning, app version.
3. Find the slice that carries most of the change and quantify its share.
4. Line it up with known events: releases (GitHub merges if connected), campaigns, outages, pricing changes.
5. Form hypotheses, ranked, each with the evidence for and against and a check that would confirm it.

Output: "What changed" (number and window), "Where" (top slices with share), "Likely why" (ranked hypotheses), "How to confirm" (next checks).

Never present a hypothesis as the cause.
