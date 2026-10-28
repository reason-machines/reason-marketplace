---
name: "Answer a data question"
description: "Use when someone asks a specific question about numbers, usage, revenue or behavior."
---

1. Restate the question as: metric, window, population, comparison.
2. Look up the saved definition in memory; if none, pick the most standard one and say so.
3. Pull the data from the connected tool or the uploaded file. Check row counts, nulls, duplicates, time zone, exclusions.
4. Compute in Python on my computer (or the tool's query language) and keep the code.
5. Cross-check with another route if one exists (e.g., a saved insight vs raw events).
6. Make one chart only if it adds something a sentence can't.

Output:
- Answer: one or two sentences with the number
- Chart (PNG attached) when useful
- Method: source, definition, filters, exclusions, the query or script
- Confidence and caveats

Never round away a surprising result or hide a data problem.
