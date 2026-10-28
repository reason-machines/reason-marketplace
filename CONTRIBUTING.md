# Contributing

Thanks for helping improve the Reason marketplace. This repository is the source of
truth for its Reasons and third-party plugins: what merges here is what Reason lists.

## How a change reaches Reason

1. You open a pull request here. CI runs `npm test` and `npm run readme -- --check`.
2. The Reason team reviews and merges it.
3. A bot opens a pull request in Reason's product that moves its pinned commit of this
   repository forward, showing exactly what changed. It is reviewed like any code change.
4. Once that merges, the next deploy updates the marketplace.

## Improve a Reason

1. Edit its folder under `reasons/<name>/`: `INSTRUCTIONS.md` for how it works,
   `skills/<skill>/SKILL.md` for a playbook, `.reason-plugin/reason.json` for its card,
   categories, face, plugins and skill order.
2. Run `npm install` and `npm test` (Node 22.18 or later). Fix anything it reports.
   If you change a script, also run `npm run typecheck`.
3. Open a pull request saying what the Reason did before, what it does now, and why
   that is better for the person using it.

## Propose a new Reason

Copy an existing folder, give it a new kebab-case `name` that matches the folder, add
`"./reasons/<name>"` to `reasons` in `.reason-plugin/marketplace.json`, run
`npm run readme`, and open a pull request. Or keep it in your own public repository in
the same layout and list it pinned to a commit (see the README). A good Reason:

- does one job well and says in `description` what it works from;
- starts with a "Getting started" skill that asks its setup questions in one message;
- asks before sending, posting, publishing, scheduling or spending anything;
- uses only listed plugins.

## Add a third-party plugin

Add `external_plugins/<slug>/.reason-plugin/plugin.json` (or pin one in your own
repository), list it under `externalPlugins`, run `npm run readme`, and open a pull
request. It must be a hosted HTTPS MCP server that signs in with OAuth or is public.

## Keep it public

Everything here is published. Never include credentials, private hostnames or IP
addresses, internal links, customer names or any personal data. `npm test` refuses
the common cases; reviewers check the rest.

## Reason's own plugins

`plugins/`, the `plugins` list in the index and the "All plugins" table are generated
from Reason's connector catalog, which holds their sign-in configuration, so edits to
them here are overwritten. Open an issue to change one or to request a plugin.
