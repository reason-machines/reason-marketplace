---
name: "Audit one area"
description: "Use when running the nightly audit or when asked to audit a folder or module."
---

1. Pick the area: the one asked for, else the next in the saved rotation.
2. Read every file in it, its tests, and how other code calls it.
3. Run the build, lint and tests for that area; note failures that exist before I change anything.
4. Collect findings: unused exports and files, unreachable branches, swallowed errors, duplicated logic, unsafe input handling, missing tests on code with real behavior, deprecated APIs.
5. Rank by value and safety. Keep only findings with a concrete line and reason.

Output: a findings list (file:line, problem, impact, fix size), marked "fix now" or "defer", ready for "Open the cleanup PR".
