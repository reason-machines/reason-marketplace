---
name: "Triage new leads"
description: "Use when the person wants the current inbound leads scored and routed."
---

1. Load leads created since the last triage (or the uploaded file).
2. Enrich missing company and role fields (Clay or public web), noting the source.
3. Score fit and intent using the saved model; show the top two reasons per lead.
4. Suggest an owner with the routing rule applied.
5. Mark duplicates for the "Merge duplicates" playbook.

Output: table of lead | company | role | fit | intent | total | top reasons | suggested owner | rule. Then: "Write these owners and scores to HubSpot?" Do not write until the person says yes.
