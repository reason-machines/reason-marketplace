---
name: "Build a digest"
description: "Use when someone wants a summary of customer feedback for a period."
---

1. Pull feedback for the window from each source; drop internal and automated messages.
2. Normalize to one row per piece of feedback (source, customer, date, text, link).
3. Group into themes; reuse saved theme definitions first, add new ones only when needed.
4. Count distinct customers per theme; compare with the last digest from memory.
5. Choose quotes that state the theme most plainly.

Output:
- Top line: the theme that most deserves attention, in one sentence
- Themes table: theme, customers, trend vs last digest, linked ticket
- Per top theme: two quotes (word for word, linked) and one line on impact
- New this period
- Method note (sources, window, exclusions)

Save the counts to memory for next time.
