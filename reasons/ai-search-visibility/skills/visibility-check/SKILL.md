---
name: "Visibility check"
description: "Use when the person wants to know how they show up in AI answers for their tracked questions."
---

1. Load the saved question set. Prefer data from Profound or Peec AI when connected; otherwise run each question through web search and read the answer pages and cited sources reachable from the browser.
2. For each question record: mentioned (yes/no), position, how the brand is described, competitors named, cited URLs, date.
3. Compute share of mentions per brand overall and per topic cluster.
4. Compare with the saved baseline and flag changes.

Output:
- Summary: three bullets on what changed
- Table: question | you mentioned? | position | competitors named | top cited sources
- Share of mentions by brand
- Wrong or outdated descriptions of the brand, with where they come from

Never present a single run as a trend. Note engines or questions that could not be checked.
