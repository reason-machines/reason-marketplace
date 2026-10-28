# Contributing

Thanks for helping improve the Reason marketplace.

## Improve a Reason

1. Edit its folder under `reasons/<name>/`: `INSTRUCTIONS.md` for how it works,
   `skills/<skill>/SKILL.md` for a playbook, `reason.json` for its card, categories,
   face, plugins and skill order.
2. Run `npm install` and `npm test` (Node 22.18 or later). Fix anything it reports.
   If you change `scripts/validate.ts`, also run `npm run typecheck`.
3. Open a pull request saying what the Reason did before, what it does now, and why
   that is better for the person using it.

The Reason team reviews it and ports accepted changes into the product, where the
marketplace is built from the same files. This repository is then regenerated from
the product, so your change appears here once it ships.

## Propose a new Reason

Copy an existing folder, give it a new kebab-case `name` that matches the folder,
add `"./<name>"` to `reasons/marketplace.json`, and open a pull request. A good Reason:

- does one job well and says in `description` what it works from;
- starts with a "Getting started" skill that asks its setup questions in one message;
- asks before sending, posting, publishing, scheduling or spending anything;
- uses only plugins in `plugins/`.

## Keep it public

Everything here is published. Never include credentials, private hostnames or IP
addresses, internal links, customer names or any personal data. `npm test` refuses
the common cases; reviewers check the rest.

## Plugins

`plugins/` and `.reason-plugin/marketplace.json` are generated from the product's
connector catalog. To request a plugin, open an issue with the provider's name and its
MCP server URL.
