---
name: "Rollout watch"
description: "Use when a feature is being rolled out gradually and someone wants to know if it's safe to widen."
---

1. Read the flag's current rollout and its history.
2. Compare on and off groups on error rates, latency (if available) and the key product metrics.
3. Look for problems concentrated in one platform, version or region.
4. Recommend: widen to the next step, hold, or roll back, with reasons.
5. Change the rollout only after an explicit OK, and confirm the new state afterwards.

Output: a short table (metric, on, off, difference), a recommendation, and the proposed next percentage.
