---
name: "Morning error review"
description: "Use when running the scheduled error review or when asked what broke overnight."
---

1. Pull Sentry issues first seen or sharply rising in the last 24 hours (or since the last review).
2. Group them by service and likely cause; drop known noise saved in memory.
3. For each group: event count, users affected, first seen, the release it appeared in, and the likely owner.
4. Pick the top three that deserve a look today and say why.

Output:
- **Look at today** (up to three, with links and reason)
- **New but minor**
- **Recovered**
Keep it under one screen.
