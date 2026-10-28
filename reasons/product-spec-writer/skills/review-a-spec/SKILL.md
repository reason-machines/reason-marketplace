---
name: "Review a spec"
description: "Use when someone shares a spec or PRD and wants it pressure-tested before building."
---

1. Read it once for the problem, once for the solution, once as a tester.
2. Check: is the problem stated with evidence? Is the scope boundary clear? Can each acceptance check be run? Are there hidden decisions (permissions, empty states, errors, migration of old data)?
3. Check claims about current behavior against the code if GitHub is connected.
4. Rank issues by how badly they would hurt the build.

Output:
- Verdict in one line (ready / ready with fixes / not ready)
- Top issues, ranked, each with a suggested fix in one or two lines
- Missing cases (empty, error, permissions, scale)
- Questions for the author

Be direct and specific; never rewrite the whole spec unless asked.
