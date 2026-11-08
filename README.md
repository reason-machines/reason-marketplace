# Reason Marketplace

The Reasons and plugins of [Reason](https://reasonmachines.com), the autonomous
software engineer, as open source.

- **Reasons** are ready-made agents: a job, instructions, playbooks (skills), a face
  and the plugins they work with. This repository holds 70 ready-made Reasons, every
  one the Reason team lists in the marketplace, defined as code.
- **Plugins** connect Reason to the tools you use. Each plugin gives Reason's agents the tools of a hosted MCP
server, such as Linear, Sentry, Notion, Stripe, or Supabase, so a session can read
issues, check logs, query a database, or update a ticket while it works.

This repository lists 5256 plugins. It is the public catalog of what Reason offers; it holds
no credentials and no code that runs in your workspace.

## Add a Reason

1. Open the **Marketplace** in Reason
   ([reasonmachines.com/marketplace](https://reasonmachines.com/marketplace)).
2. Pick a Reason and select **Add**. It arrives with its instructions and skills.
3. Sign in to the plugins it asks for.

Everything a Reason is lives in its folder under [`reasons/`](reasons), so you can
read exactly what it will do before you add it, fork it, or copy its skills into
any agent that reads `SKILL.md` files.

## Reasons as code

```
reasons/marketplace.json                 which Reasons the marketplace lists, in order, and the Featured row
reasons/schema/reason.schema.json        JSON Schema for reason.json
reasons/schema/marketplace.schema.json   JSON Schema for marketplace.json
reasons/<name>/reason.json               the manifest
reasons/<name>/INSTRUCTIONS.md           the Reason's instructions
reasons/<name>/skills/<skill>/SKILL.md   one playbook each
```

A manifest looks like this:

```json
{
  "$schema": "../schema/reason.schema.json",
  "name": "pr-reviewer",
  "displayName": "PR Reviewer",
  "description": "Reviews your pull requests for bugs, risky changes and missing tests…",
  "categories": ["engineering", "product"],
  "appearance": { "color": "blue", "eyes": "brows", "glasses": "square_shades", "accessory": "none" },
  "plugins": ["linear", "sentry"],
  "skills": ["getting-started", "review-a-pull-request", "post-inline-comments"]
}
```

- `name` is the Reason's stable id and equals its folder name.
- `displayName` is at most 40 characters; `description`, the marketplace card line,
  at most 220.
- `categories`: the first is its own category; the rest are where else it is listed.
- `appearance` is its bot face (add `"shape"` for something other than the hexagon).
- `plugins` are folder names under [`plugins/`](plugins); whoever adds the Reason
  signs in to each.
- `skills` are folder names under the Reason's `skills/`, in order; the first is
  always "Getting started". Each `SKILL.md` has `name` and `description`
  frontmatter, then the playbook in Markdown.
- `INSTRUCTIONS.md` is at most 16,000 characters.

Definitions are public, so they hold no credentials, private hostnames or customer
data. `npm test` checks every manifest against the schemas, every folder it names,
and that nothing private slipped in. See [CONTRIBUTING.md](CONTRIBUTING.md).

The checks are TypeScript in [`scripts/validate.ts`](scripts/validate.ts) and run on
Node 22.18 or later with no build step. `npm run typecheck` type-checks them.

## Where these files come from

Reason's own repository is the source of truth. The marketplace and the plugin list
in the product are built from the same definitions, and a sync job regenerates
`reasons/`, `plugins/` and `.reason-plugin/marketplace.json` here whenever they
change. A pull request here is reviewed by the Reason team and, once accepted, is
ported into the product; it reaches the marketplace with the next release and then
shows up here through the sync.

## All Reasons

| Reason | What it does | Category | Plugins |
| --- | --- | --- | --- |
| [PR Reviewer](reasons/pr-reviewer) (featured) | Reviews your pull requests for bugs, risky changes and missing tests, then leaves inline comments. Works from a PR link or your connected GitHub repos, and never approves or merges without you. | Engineering | [linear](plugins/linear), [sentry](plugins/sentry) |
| [Release Manager](reasons/release-manager) | Turns merged pull requests into release notes, a go/no-go checklist and a post-release health check. Works from your GitHub repos and deploys, and never tags, deploys or announces without you. | Engineering | [linear](plugins/linear), [sentry](plugins/sentry), [vercel](plugins/vercel) |
| [On-Call Helper](reasons/on-call-helper) | Helps whoever is on call find what broke, why and what to try first. Works from an alert, a Sentry issue or your logs and dashboards, and never restarts, deploys or rolls back without you. | Engineering | [sentry](plugins/sentry), [datadog](plugins/datadog), [axiom](plugins/axiom), [incident-io](plugins/incident-io) |
| [Standup Summarizer](reasons/standup-summarizer) | Turns your team's merged work, open PRs and issue updates into a short daily standup. Works from GitHub, Linear or Jira, or notes people paste, and never posts to a channel without you. | Engineering | [linear](plugins/linear), [jira](plugins/jira) |
| [Nightly Code Audit](reasons/nightly-code-audit) | Audits one area of your codebase each night for dead code, bugs and risky patterns, then opens one small cleanup PR. Works from your connected GitHub repos, and never merges without you. | Engineering | [sentry](plugins/sentry) |
| [Engineering Lead](reasons/engineering-lead) | Keeps your team's work moving: breaks goals into issues, starts agents on clear tasks, chases CI and reviews, and flags what is stuck. Works from GitHub and Linear, and never merges without you. | Engineering | [linear](plugins/linear), [sentry](plugins/sentry), circleci |
| [QA Walker](reasons/qa-walker) | Walks your app in a real browser like a user would, runs your acceptance checklist and reports pass or fail with screenshots. Works from a URL and your checklist, and never files bugs without you. | Engineering | [jam](plugins/jam), [linear](plugins/linear) |
| [Sales Prospecting](reasons/sales-prospecting) (featured) | Turns your ideal customer profile into a researched prospect list with a first message for each person. Works from Apollo, HubSpot or a pasted list, and never sends without you. | Sales | [apollo-io](plugins/apollo-io), [hubspot](plugins/hubspot), [hunter](plugins/hunter), [clay](plugins/clay) |
| [Account Research](reasons/account-research) | Researches one account before a meeting or deal review and writes a one-page brief and account plan. Works from the public web and your HubSpot history, and cites every fact. | Sales | [exa](plugins/exa), [hubspot](plugins/hubspot), [similarweb](plugins/similarweb) |
| [Sales Call Coach](reasons/sales-call-coach) | Scores your sales calls and tells you the two things to fix before the next one. Works from Gong, Fathom or a pasted transcript, and quotes the call word for word. | Sales | [gong](plugins/gong), [fathom](plugins/fathom) |
| [Pipeline Review](reasons/pipeline-review) | Scans your whole pipeline for what moved, what stalled and where the forecast is at risk. Works from HubSpot or Attio, or a pipeline export, and never edits a deal without you. | Sales | [hubspot](plugins/hubspot), [attio](plugins/attio) |
| [Deal Inspector](reasons/deal-inspector) | Checks every deal that moved stage against your qualification criteria using the actual call transcripts. Quotes the evidence, and never changes a deal without you. | Sales | [gong](plugins/gong), [hubspot](plugins/hubspot) |
| [Call Follow-Ups](reasons/call-follow-ups) | Turns each recorded call into a follow-up email in your voice, a next-steps note and the CRM updates. Works from Granola, Fireflies or a pasted transcript, and never sends without you. | Sales | [granola](plugins/granola), [fireflies](plugins/fireflies), [hubspot](plugins/hubspot), [microsoft-365-mail](plugins/microsoft-365-mail) |
| [Intent Signals](reasons/intent-signals) | Finds the accounts and people in your CRM and product data that just showed buying intent, ranks them and drafts the outreach. Works from PostHog, HubSpot and Clay, and never sends without you. | Sales | [posthog](plugins/posthog), [hubspot](plugins/hubspot), [clay](plugins/clay) |
| [Hiring Signals](reasons/hiring-signals) | Tracks job posts at the companies you sell to and tells you when a new role means they need what you sell. Works from a pasted account list or the public web, and links every post. | Sales | [exa](plugins/exa), [clay](plugins/clay) |
| [Warm Intro Finder](reasons/warm-intros) | Finds credible ways into a target account through people you already know: past conversations, shared history and mutual contacts. Works from Attio and your Outlook mail, and never asks for an intro without you. | Sales | [attio](plugins/attio), [microsoft-365-mail](plugins/microsoft-365-mail) |
| [QBR Deck Builder](reasons/qbr-deck-builder) | Builds a quarterly business review or value deck for a named account from your CRM, call history and billing. Works from HubSpot, Gong and Stripe, and shows the source of every number. | Sales | [hubspot](plugins/hubspot), [gong](plugins/gong), [stripe](plugins/stripe) |
| [Customer Proof Writer](reasons/customer-proof) | Turns call transcripts and notes into case studies, testimonials and proof points. Quotes stay word for word, and nothing is published until the customer approves it. | Sales | [gong](plugins/gong), [granola](plugins/granola) |
| [Renewal Watch](reasons/renewal-watch) | Watches upcoming renewals and flags accounts at risk of churning, with the reasons and a save plan. Works from Stripe, HubSpot and PostHog, and never contacts a customer without you. | Sales | [stripe](plugins/stripe), [hubspot](plugins/hubspot), [posthog](plugins/posthog) |
| [Battlecards](reasons/battlecards) | Keeps a battlecard for each competitor: how they pitch, where they win, where you win and what to say. Works from the public web and your Gong calls, and cites every claim. | Sales | [exa](plugins/exa), [gong](plugins/gong) |
| [Docs Q&A](reasons/docs-qa) | Answers product and how-to questions from your docs and knowledge base, and always cites the page. Works from Guru, Notion or your public docs, and says when it doesn't know. | Sales | [guru](plugins/guru), [notion](plugins/notion) |
| [Content Writer](reasons/content-writer) | Turns a topic, brief or rough notes into a researched draft in your voice: blog posts, guides and landing copy. Works from your past posts and sources, and never publishes without you. | Marketing | [notion](plugins/notion), [wordpress-com](plugins/wordpress-com), [webflow](plugins/webflow) |
| [AI Search Visibility](reasons/ai-search-visibility) (featured) | Checks whether AI assistants and answer engines recommend you, and who they name instead. Starts from a few buyer questions you care about, and every finding links to the answer it came from. | Marketing | [profound](plugins/profound), [peec-ai](plugins/peec-ai) |
| [SEO Brief Desk](reasons/seo-briefs) | Turns your keywords into content ideas and writer-ready briefs built for search and AI answers. Works from a pasted list or your Ahrefs or Semrush data, and cites every number. | Marketing | [ahrefs](plugins/ahrefs), [semrush-api-key](plugins/semrush-api-key) |
| [Ad Spend Watch](reasons/ad-spend-watch) | Watches your ad spend and results and flags what is breaking before it burns budget. Works from a pasted export or your connected ad accounts, and never changes a campaign without you. | Marketing | [adspirer](plugins/adspirer), [supermetrics](plugins/supermetrics) |
| [Paid Media Report](reasons/paid-media-report) | Turns your search, Meta, LinkedIn, X and TikTok ad results into one weekly report with plain commentary. Works from exports or connected accounts, and every number traces to its source. | Marketing | [supermetrics](plugins/supermetrics), [windsor-ai](plugins/windsor-ai), [x-ads](plugins/x-ads), [tiktok-for-business](plugins/tiktok-for-business) |
| [Competitor Watch](reasons/competitor-watch) | Tracks competitors' pricing, product, messaging and hiring pages and briefs you only on real changes. Starts from a list of names or URLs, and every change links to the before and after. | Marketing | [firecrawl](plugins/firecrawl), [similarweb](plugins/similarweb) |
| [Copy Editor](reasons/copy-editor) | Edits your drafts, emails and pages so they read like a person wrote them. Keeps your voice and facts, shows every change and why, and never adds a claim you did not make. | Marketing | None |
| [Clip Planner](reasons/clip-planner) | Finds the best moments in a long video or podcast and plans short clips with hooks, captions and timestamps. Works from an upload, a link or a transcript, and never posts for you. | Marketing | [opusclip](plugins/opusclip), [descript](plugins/descript) |
| [Social Post Planner](reasons/social-post-planner) | Turns your launches, posts and ideas into a week of social drafts in your voice for X, LinkedIn and more. Works from your notes and past posts, and nothing is scheduled until you approve it. | Marketing | [buffer](plugins/buffer), [x](plugins/x) |
| [Newsletter Editor](reasons/newsletter-editor) | Turns your week's links, notes and launches into a newsletter issue in your voice. Works from beehiiv or Kit and your notes, and saves it as a draft; it never sends to subscribers. | Marketing | [beehiiv](plugins/beehiiv), [kit](plugins/kit) |
| [Lead Router](reasons/lead-router) | Scores your inbound leads, merges duplicates, suggests an owner and flags what is stuck. Works from a CRM export or HubSpot, and never changes a record or emails a lead without your OK. | Marketing | [hubspot](plugins/hubspot), [clay](plugins/clay) |
| [Mention Watch](reasons/mention-watch) | Watches news, X, forums and blogs for mentions of your brand, people and URLs, then sends you the ones worth acting on. Works from your keywords and Meltwater or X, and never replies for you. | Marketing | [meltwater](plugins/meltwater), [x](plugins/x), [exa](plugins/exa) |
| [Site Audit](reasons/site-audit) | Audits your website for search, content, speed, accessibility and conversion issues, scored P0 to P2 with evidence URLs. Works from your domain, and can open fixes as PRs if your site repo is on GitHub. | Marketing | [ahrefs](plugins/ahrefs), [firecrawl](plugins/firecrawl) |
| [Event Producer](reasons/event-producer) | Turns your event details into a run of show, guest list, vendor tracker and day-of checklist. Works from Notion, Airtable or what you paste, and never contacts guests or vendors without you. | Marketing | [notion](plugins/notion), [airtable](plugins/airtable) |
| [Launch Planner](reasons/launch-planner) | Turns a feature or product launch into a positioning brief, launch plan and every asset draft, from announcement to FAQ. Works from your specs and Linear or Notion, and never publishes for you. | Marketing | [notion](plugins/notion), [linear](plugins/linear) |
| [Design Critique](reasons/design-critique) | Turns a screenshot, live page or design link into a ranked critique with concrete fixes for hierarchy, type, spacing, color and flow. Works from what you share and real product references. | Design | [mobbin](plugins/mobbin), [refero](plugins/refero) |
| [Design to Spec](reasons/design-to-spec) | Turns a design frame or screenshot into a build spec engineers can work from: layout, variables, states, behavior and open questions. Works from what you share, and files tickets only when you ask. | Design | [linear](plugins/linear) |
| [Alt Text Writer](reasons/alt-text-writer) | Writes short, useful alt text for your images, focused on what matters in context. Works from uploads, a page URL or a folder of images, and never changes your site without you. | Design | None |
| [Social Graphics](reasons/social-graphics) | Turns an announcement, quote or stat into on-brand social graphics in every size you need. Works in Canva from your brand kit and templates, and never posts anything for you. | Design | [canva](plugins/canva) |
| [Landing Page Builder](reasons/landing-page-builder) | Turns a brief into a working landing page: copy, structure and a live draft. Builds in Framer or Webflow, or as code in your repo, and never publishes without you. | Design | [framer](plugins/framer), [webflow](plugins/webflow) |
| [Inbox & Calendar Assistant](reasons/inbox-calendar-assistant) (featured) | Sorts your inbox into what needs you today, drafts the replies, and keeps your calendar honest. Works from Outlook or pasted threads, and never sends or books without your OK. | Personal | [microsoft-365-mail](plugins/microsoft-365-mail), [microsoft-365-calendar](plugins/microsoft-365-calendar), [calendly](plugins/calendly) |
| [Research Analyst](reasons/research-analyst) | Answers a hard question with a sourced report: what is known, what is disputed, and what it means for you. Works from the live web and files you share, and cites every claim. | Personal | [exa](plugins/exa), [you-com-research](plugins/you-com-research) |
| [Daily News Briefing](reasons/news-briefing) | Writes one short morning briefing on the topics, companies and people you follow, with a link for every story. Works from the web, X and your Readwise saves, and skips anything you've already seen. | Personal | [x](plugins/x), [readwise](plugins/readwise), [you-com](plugins/you-com) |
| [Writing Partner](reasons/writing-partner) | Helps you draft and revise essays, emails, posts and docs. Asks what the piece must do, works in passes, and shows every change, keeping your voice instead of replacing it. | Personal | None |
| [Travel Planner](reasons/travel-planner) | Plans trips end to end: options with real prices, a day-by-day itinerary, and a packing and booking checklist. Works from your dates and preferences, and never books or pays for anything. | Personal | None |
| [Family Logistics](reasons/family-logistics) | Keeps the family calendar, school forms, activities and errands in one place and tells you what's due this week. Works from Outlook, Todoist and pasted school emails, and never signs or pays for you. | Personal | [microsoft-365-calendar](plugins/microsoft-365-calendar), [todoist](plugins/todoist) |
| [Money Check-In](reasons/money-check-in) | Turns your statements into a clear monthly picture: where money went, subscriptions to cut, and which card to use for what. Works from CSVs or PDFs you upload, and never moves money. | Personal | None |
| [Training Coach](reasons/training-coach) | Plans your training week, checks in each day, and adjusts the plan when life gets in the way. Works from what you tell it and logs you share, and never gives medical advice. | Personal | None |
| [Deal Hunter](reasons/deal-hunter) | Finds the real lowest price for something you want, including shipping, tax and returns, and watches it if you like. Works from a product name or link, and never buys anything for you. | Personal | None |
| [Plant Care Log](reasons/plant-care-log) | Keeps a care journal for your houseplants and reminds you what needs water, light or repotting. Works from photos and notes you share, and tells you when to ask an expert. | Personal | None |
| [Library Scout](reasons/library-scout) | Picks one promising new library or tool each week from your X feed and saves, then builds a small working demo in a sandbox. Works from accounts and topics you choose, and asks before building. | Personal | [x](plugins/x), [readwise](plugins/readwise) |
| [Recruiting Screener](reasons/recruiting-screener) | Screens applicants against your role's must-haves and writes a short, evidence-backed note on each. Works from Ashby, Greenhouse, Workable or pasted resumes, and never rejects or contacts anyone without you. | Recruiting & People | [ashby](plugins/ashby), [greenhouse](plugins/greenhouse), [workable](plugins/workable) |
| [Interview Coordinator](reasons/interview-coordinator) | Schedules interview loops, briefs each interviewer, and chases missing feedback. Works from your Outlook calendar and Ashby or Greenhouse, and never sends an invite or email without your OK. | Recruiting & People | [microsoft-365-calendar](plugins/microsoft-365-calendar), [ashby](plugins/ashby), [greenhouse](plugins/greenhouse) |
| [Talent Sourcer](reasons/talent-sourcer) | Finds people who fit an open role and aren't already in your pipeline, and drafts a personal first note to each. Works from Juicebox and public profiles, and never messages anyone without you. | Recruiting & People | [juicebox](plugins/juicebox), [exa](plugins/exa) |
| [New Hire Onboarding](reasons/new-hire-onboarding) | Builds each new hire's first-30-days plan and checklist, and makes sure accounts, buddy and intro meetings are set before day one. Works from Notion, Gusto and your notes, and never changes payroll. | Recruiting & People | [notion](plugins/notion), [gusto](plugins/gusto) |
| [Product Spec Writer](reasons/product-spec-writer) | Turns a rough idea, a customer ask or a thread into a dated spec: what's in, what's out, and how you'll know it's done. Works from notes you paste or your Linear and Notion, and never files tickets without you. | Product | [linear](plugins/linear), [notion](plugins/notion), [chatprd](plugins/chatprd) |
| [Data Analyst](reasons/data-analyst) | Answers questions about your product and business with real numbers, charts and the query behind them. Works from a CSV you upload or your PostHog, Hex, Amplitude or Mixpanel, and never guesses a metric. | Product | [posthog](plugins/posthog), [hex](plugins/hex), [amplitude](plugins/amplitude), [mixpanel](plugins/mixpanel) |
| [Idea Stress Test](reasons/idea-stress-test) | Pressure-tests a product or startup idea: what has to be true, the evidence for and against, and the cheapest test to run next. Works from a one-line pitch or a doc, and cites every source. | Product | [exa](plugins/exa) |
| [Customer Feedback Digest](reasons/customer-feedback-digest) | Turns support threads, feedback and survey answers into themes ranked by how many customers raised them, with quotes word for word. Works from an export or your Enterpret, Intercom or Plain. | Product | [enterpret](plugins/enterpret), [intercom-api-key](plugins/intercom-api-key), [plain](plugins/plain) |
| [Prototype Builder](reasons/prototype-builder) | Turns an idea into a working prototype in your real app, opened as a draft pull request with a preview link and screenshots. Works on your connected GitHub repo, and never merges without you. | Product | [vercel](plugins/vercel), [linear](plugins/linear) |
| [Interview Synthesizer](reasons/interview-synthesizer) | Turns user interviews and usability sessions into findings with quotes, patterns across people, and what to do next. Works from transcripts you upload or your Granola and UserTesting, and quotes word for word. | Product | [granola](plugins/granola), [usertesting](plugins/usertesting) |
| [Experiment Readout](reasons/experiment-readout) | Reads your A/B tests and feature rollouts and says what won, by how much, and how sure we are. Works from Statsig, LaunchDarkly or PostHog, or an export, and never flips a flag without you. | Product | [statsig](plugins/statsig), [launchdarkly](plugins/launchdarkly), [posthog](plugins/posthog) |
| [Support Triage](reasons/support-triage) | Sorts incoming support by urgency and topic, drafts answers from your docs, and turns real bugs into tickets. Works from Plain, Intercom or Pylon, or pasted threads, and never replies to a customer without you. | Operations | [plain](plugins/plain), [intercom-api-key](plugins/intercom-api-key), [pylon](plugins/pylon), [linear](plugins/linear) |
| [Executive Assistant](reasons/executive-assistant) | Runs an executive's week: daily brief, meeting prep, scheduling drafts and follow-ups. Works from Outlook mail and calendar and your Notion, and never sends, accepts or books without you. | Operations | [microsoft-365-calendar](plugins/microsoft-365-calendar), [microsoft-365-mail](plugins/microsoft-365-mail), [notion](plugins/notion) |
| [Meeting Action Tracker](reasons/meeting-action-tracker) | Finds the promises, decisions and follow-ups left in meetings and makes sure they get done. Works from Granola or Fireflies notes or a pasted transcript, and never files tickets or messages anyone without you. | Operations | [granola](plugins/granola), [fireflies](plugins/fireflies), [linear](plugins/linear) |
| [Software Spend Review](reasons/software-spend-review) | Lists every software subscription you pay for and finds evidence-backed savings: unused seats, duplicates and renewals to renegotiate. Works from Ramp, Brex or Vantage, or a card export, and never cancels anything. | Operations | [ramp](plugins/ramp), [brex](plugins/brex), [vantage](plugins/vantage) |
| [Office Ops Desk](reasons/office-ops-desk) | Keeps the office running: visitors, deliveries, supplies, facilities issues and team dates, with a weekly digest. Works from Envoy and Notion or a pasted list, and never orders or books anything without you. | Operations | [envoy](plugins/envoy), [notion](plugins/notion) |
| [Event Request Desk](reasons/event-request-desk) | Scores every event, sponsorship and speaking invite against your goals and drafts your yes or no. Works from requests you forward or paste, and never accepts, declines or pays without you. | Operations | None |
| [Invoice Chaser](reasons/invoice-chaser) | Finds overdue invoices, drafts friendly reminders that get paid, and keeps a clean aging report. Works from Stripe or an invoice export, and never sends a reminder or changes an invoice without you. | Operations | [stripe](plugins/stripe) |

## Connect a plugin in Reason

1. Open **Customize → Plugins** in Reason
   ([reasonmachines.com/customize?tab=plugins](https://reasonmachines.com/customize?tab=plugins)).
2. Pick a plugin and select **Connect**.
3. Sign in with the provider (OAuth), or paste an API key for plugins that use one.

Reason checks the connection before agents use it. A plugin can be connected for
the whole workspace or just for you. Anything not listed here can be added as a
custom MCP server from the same page.

Built into Reason, and not listed here: **GitHub** (repositories and pull requests),
**Slack** (work with Reason in Slack), **Chrome**, and **Computer Use**.

## Plugin layout

```
.reason-plugin/marketplace.json     every plugin in this repository
plugins/<slug>/.reason-plugin/plugin.json
plugins/<slug>/logo.svg             brand mark, when the plugin has a local one
```

A plugin manifest looks like this:

```json
{
  "name": "sentry",
  "displayName": "Sentry",
  "description": "…",
  "homepage": "https://sentry.io",
  "docs": "https://docs.sentry.io/product/sentry-mcp/",
  "logo": "https://mcp.sentry.dev/favicon.ico",
  "auth": "oauth",
  "mcpServers": { "sentry": { "url": "https://mcp.sentry.dev/mcp" } }
}
```

`auth` is `oauth` (sign in with the provider), `api_key` (an `${API_KEY}`
placeholder you fill in when connecting), or `none` (a public server). `skills`,
when present, links agent skills Reason loads alongside the plugin.

The MCP URLs are the providers' own public endpoints, so they also work in any
MCP client that supports remote Streamable HTTP servers.

## Request a plugin

Open an issue with the provider's name and its MCP server URL.

## All plugins

| Plugin | What it does | Auth | MCP server |
| --- | --- | --- | --- |
| [@imqueue](plugins/imqueue) | Search docs, scaffold code. | None | `https://mcp.imqueue.org/mcp` |
| [#memory](plugins/memory) | Recall for you and your agent. | OAuth | `https://www.usememory.com/api/mcp` |
| [00Quiz: Your AI Quizmaster](plugins/dev-6ad3403f91508191984bb264a67f935a) | Your personal daily quiz host. | OAuth | `https://api.00quiz.com/mcp` |
| [00Widget](plugins/00widget) | Track work on iPhone widgets. | OAuth | `https://api.00widget.com/mcp` |
| [0xArchive](plugins/0xarchive) | Market data and webhooks. | OAuth | `https://mcp.0xarchive.io/mcp` |
| [1102tools for Federal Register](plugins/1102tools-federal-register) | Explore federal rulemaking. | None | `https://federal-register.1102tools.com/mcp` |
| [1102tools for Regulations.gov](plugins/1102tools-regulations-gov) | Search rulemaking dockets. | None | `https://regulations-gov.1102tools.com/mcp` |
| [1102tools for SAM.gov](plugins/1102tools-sam-gov) | Find contract opportunities. | None | `https://sam.1102tools.com/mcp` |
| [12andus Astrology](plugins/12andus-astrology) | Charts, future & compatibility. | OAuth | `https://mcp.12andus.com/mcp` |
| [12Go](plugins/12go) | Find buses, ferries and more. | None | `https://mcp.12go.asia/mcp` |
| [1barn](plugins/onebarn) | Run your barn from chat. | OAuth | `https://api.1barn.com/mcp` |
| [1club Admin](plugins/1club-admin) | Run your club from Reason. | OAuth | `https://mcp.1club.ai/` |
| [1F916](plugins/1f916) | Records what agents were told. | None | `https://1f916.ai/mcp` |
| [1inch](plugins/1inch) | Quote and execute intent-based (Fusion) and cross-chain token swaps, build and manage limit orders, and call any 1inch product endpoint — portfolio, spot prices, gas, Web3 RPC, and more. | None | `https://api.1inch.com/mcp/protocol` |
| [1Password](plugins/1password) | Let agents read the secrets you share from 1Password: API keys, passwords, database URLs and one-time codes. | API key | `https://mcp.reasonmachines.com/1password/mcp` |
| [1st Private Capital](plugins/1st-private-capital) | Price hard money & DSCR loans. | None | `https://apps.1stprivatecapital.com/mcp` |
| [1to1 Mate](plugins/1to1-mate) | AI context for every 1:1. | OAuth | `https://mcp.1to1mate.com/mcp` |
| [2048](plugins/2048) | Merge Tiles. Reach 2048. | None | `https://2048.ainativekit.com/mcp` |
| [21st.dev](plugins/21st) | Find UI components and themes, retrieve their code, and use hosted 21st AI when enabled. | OAuth | `https://21st.dev/api/mcp` |
| [22 Skills](plugins/22-skills) | Score resume against a job. | None | `https://22skills.com/api/mcp` |
| [2Mind](plugins/2mind) | Personal memory interface. | OAuth | `https://api.use2mind.com/mcp` |
| [3D Printer on Demand](plugins/3d-printer-on-demand) | 3D print cost and design help. | None | `https://3dprinterondemand.com/api/mcp` |
| [3DPACK.ING](plugins/3dpack-ing) | 3D container & truck loading. | OAuth | `https://3dpack.ing/mcp` |
| [3GPP Scout](plugins/3gpp-scout) | Search 3GPP specs and TDocs. | OAuth | `https://api.3gppscout.com/mcp` |
| [3RD](plugins/third-law-3rd) | Brand visibility in AI answers. | OAuth | `https://app.get3rd.com/api/mcp` |
| [402MCP](plugins/402mcp) | Decode HTTP 402 payments. | None | `https://402mcp.org/api/v1/mcp` |
| [4Dance](plugins/4dance) | Find your next dance event. | OAuth | `https://api.4dance.app/mcp` |
| [4dayweek.io Jobs](plugins/4dayweek) | Find 4-day-week jobs. | None | `https://4dayweek.io/api/mcp` |
| [4Degrees](plugins/4degrees) | Tap your network in Reason. | OAuth | `https://mcp.4degrees.ai/mcp` |
| [5×5](plugins/five-by-five) | Log and review your workouts. | OAuth | `https://5x5.erikedin.com/mcp` |
| [60fps](plugins/60fps) | Search real iOS interactions. | OAuth | `https://mcp.60fps.design/mcp` |
| [84asana](plugins/84asana) | Classical yoga for beginners. | None | `https://84asana.com/mcp` |
| [8digit Planner](plugins/8digit-planner) | Plan, approve, publish posts. | OAuth | `https://planner.8digitcreative.com/mcp` |
| [8ight SEO & GEO](plugins/8ight-seo-geo) | Your Google and AI visibility. | OAuth | `https://crm.8ight.ai/mcp` |
| [9Pic AI](plugins/9pic-ai) | Event photo workflows in chat. | OAuth | `https://mcp.9pic.ai/mcp` |
| [A Resplendent Tea Experience](plugins/resplendent-tea) | Tea catering and contact. | None | `https://resplendenttea.com/mcp` |
| [A Seat Awaits](plugins/a-seat-awaits) | Plan event seating. | OAuth | `https://aseatawaits.com/api/mcp` |
| [A-Max Auto Insurance](plugins/a-max-auto-insurance) | Compare Auto Insurance Rates. | None | `https://quote-mcp-app.amaxinsurance.com/amax/mcp` |
| [A4B CMMS](plugins/a4b-cmms) | Track assets and maintenance. | OAuth | `https://a4b.ai/mcp` |
| [Aave](plugins/aave) | Connects Reason to Aave's official MCP server for live V3 and V4 markets, wallet positions, governance, and non-custodial transaction preparation. | None | `https://mcp.aave.com` |
| [AB Projects](plugins/ab-projects) | AI Actions for MS Teams. | OAuth | `https://mcp.actionbridge.io/mcp` |
| [ABC Remonty Oleba](plugins/abc-remonty-oleba) | Renovation info and prices. | None | `https://oleba.pl/mcp` |
| [Able.Style](plugins/able-style) | Fashion ideas for any weather. | OAuth | `https://able.style/mcp` |
| [Abmahnexperte.de](plugins/abmahnexperte) | Abmahnung prüfen lassen. | None | `https://mein.abmahnexperte.de/mcp` |
| [ABMeter](plugins/abmeter) | A/B tests from your assistant. | OAuth | `https://mcp.abmeter.ai/` |
| [About My Sound](plugins/about-my-sound) | Music websites for artists. | None | `https://aboutmysound.com/mcp` |
| [ACA](plugins/aca) | Manage leads and outreach. | OAuth | `https://mcp.automatedclientacquisition.com/mcp` |
| [AcaTrove](plugins/acatrove) | Projects, papers and grants. | OAuth | `https://www.acatrove.com/api/mcp` |
| [Acceptance Criteria Extractor](plugins/acceptance-criteria-extractor) | Extract acceptance criteria. | None | `https://acceptance-criteria-extractor.sidcraigau.workers.dev/mcp` |
| [Access Yami](plugins/access-yami) | Shop all of Asia's best. | None | `https://mcp.yami.com/mcp` |
| [Accessibility Checks & Fixes](plugins/inkable-docs-accessibility) | PDF, Word & PowerPoint. | None | `https://inkabledocs.com/mcp` |
| [Accessibility Repair](plugins/accessibility-repair) | Find and fix WCAG failures. | None | `https://a11yrepair.com/mcp` |
| [AccessOwl](plugins/accessowl) | Find and get apps in your org. | OAuth | `https://mcp.accessowl.com/mcp` |
| [Account Executive Jobs](plugins/account-executive-jobs) | Sales jobs and hiring. | OAuth | `https://mcp.accountexecutivejobs.com/mcp` |
| [Accountable](plugins/accountable) | AI Bookkeeping for Startups. | OAuth | `https://accountable.im/mcp` |
| [AccountsOS](plugins/accountsos) | Finn, your AI accountant. | OAuth | `https://accounts-os.com/mcp` |
| [Accredited](plugins/accredited) | Find and buy a business. | OAuth | `https://joinaccredited.com/mcp` |
| [AccuQuote Life Insurance](plugins/accuquote-life-insurance) | Find life insurance options. | None | `https://fletch-mcp-server.fletch.co/mcp/accuquote` |
| [AccurateScribe.ai – Transcribe](plugins/accuratescribe-ai-transcribe) | Transcribe audio to text. | OAuth | `https://mcp.accuratescribe.ai/mcp` |
| [ACE Carousel Creator](plugins/carousel-creator) | Create carousels for ACE. | None | `https://mcp.quokka.software/mcp` |
| [AcesAPI](plugins/acesapi) | Tennis data and stats. | OAuth | `https://mcp.acesapi.com/mcp` |
| [Achriom](plugins/achriom) | Track books, movies, and shows. | OAuth | `https://mcp.achriom.com/mcp` |
| [AcikMutfak](plugins/acikmutfak) | Discover, save, share recipes. | None | `https://acikmutfak.vercel.app/api/mcp` |
| [aclipp](plugins/aclipp) | PR monitoring and analytics. | OAuth | `https://api.aclipp.com/mcp` |
| [Acoustic Index](plugins/acoustic-index) | Room acoustics and absorbers. | OAuth | `https://acousticindex.com/api/mcp/v1` |
| [Acquisition.gov by 1102tools](plugins/acquisition-gov-by-1102tools) | Explore FAR Overhaul guidance. | None | `https://acquisition-gov.1102tools.com/mcp` |
| [Acta Fit](plugins/acta-fit) | Ask about your training log. | OAuth | `https://mcp.actafitapp.com/mcp` |
| [ActiveCampaign](plugins/activecampaign) | Marketing automation and CRM: manage contacts, lists, tags, and custom fields, plan and report on email campaigns, build automations, and operate deal pipelines through natural language | OAuth | `https://mcp.app-us1.com/http` |
| [Activepieces](plugins/activepieces-cloud-plugin) | AI workflow automation. | OAuth | `https://mcp.activepieces.com/mcp` |
| [ActivityInfo.org](plugins/activityinfo-org) | Connect to your databases. | OAuth | `https://activityinfo.org/mcp` |
| [Actually Asked](plugins/actually-asked) | Manage your website's FAQ. | OAuth | `https://mcp.actuallyasked.com/mcp` |
| [Acumen by Talarion](plugins/acumen-by-talarion) | Keep your AI up to date. | OAuth | `https://mcp.talarion.com/mcp` |
| [AD Vantage](plugins/ad-vantage) | Research college athletics. | OAuth | `https://mcp.athleticdirectorvantage.com/mcp` |
| [AdAgnt](plugins/adagnt) | Run ads in plain English. | OAuth | `https://mcp.adagnt.com/mcp` |
| [Adalysis](plugins/adalysis) | Your PPC automation co-pilot. | OAuth | `https://mcp.adalysis.com/mcp` |
| [AdaptClose](plugins/adaptclose) | Sales call scores and coaching. | OAuth | `https://mcp.adaptclose.com/mcp` |
| [Adaption](plugins/adaption) | Datasets and fine-tuning workflows powered by Adaption. | OAuth | `https://api.prod.adaptionlabs.ai/api/v1/mcp` |
| [AdaptlyPost](plugins/adaptlypost) | Schedule social media posts. | OAuth | `https://mcp.adaptlypost.com/mcp` |
| [AdBase](plugins/adbase) | Track competitor ads & emails. | OAuth | `https://getadbase.com/mcp` |
| [Add to CRM](plugins/add-to-crm-connector) | Find contacts, add to your CRM. | OAuth | `https://mcp.addtocrm.com/mcp` |
| [AddSign](plugins/addsign) | Send documents for e-signature. | OAuth | `https://addsign.io/api/mcp` |
| [Addy AI](plugins/addy-ai) | Close mortgage loans in days. | OAuth | `https://chatgpt-mcp.addy.so/mcp` |
| [ADG Events](plugins/adg-events) | Manage events and send email. | OAuth | `https://mcp.adgevents.com/mcp` |
| [Adin Flights](plugins/adin-flights) | find & book flights in chats. | None | `https://api.moodtrip.ai/api/mcp-http` |
| [Adinand Apps](plugins/adinand-apps) | Gmail, PDF, YouTube, file help. | None | `https://adinand-mcp.jyotitech2025.workers.dev/mcp` |
| [AdKraft](plugins/adkraft) | Make video ads from photos. | OAuth | `https://adkraft.ai/mcp` |
| [Adlane](plugins/adlane) | Review ad campaign performance. | OAuth | `https://mcp.adlane.app/mcp` |
| [AdLiftr](plugins/adliftr) | Meta, TikTok, Google, Snapchat. | OAuth | `https://mcp.adliftr.com/mcp` |
| [Admit Coach University Finder](plugins/admit-coach-university-finder) | Find U.S. universities. | None | `https://admit-coach.com/api/mcp` |
| [AdNeuron Ads Manager](plugins/adneuron-meta-ads) | Your AI advertising copilot. | OAuth | `https://mcp.adneuron.ai/mcp` |
| [Adobe Workfront](plugins/adobe-workfront) | Manage work in Workfront. | OAuth | `https://mcp.workfront.adobe.com/mcp/v1/workfront` |
| [Adónde](plugins/adonde) | Plan and book real trips. | OAuth | `https://getadonde.com/mcp` |
| [ADoor](plugins/adoor) | Shared tables for your apps. | OAuth | `https://app.adoor.run/mcp` |
| [AdPage](plugins/adpage) | Marketing & Tracking Analytics. | OAuth | `https://mcp.adpage.io/mcp` |
| [adplane](plugins/adplane) | Manage Google Ads and Meta Ads. | OAuth | `https://mcp.adplane.ai/mcp` |
| [Adrihosan](plugins/adrihosan) | Find renovation materials. | None | `https://mcp.adrihosan.com/mcp` |
| [Adrio](plugins/adrio) | AI media buyer for Meta ads. | OAuth | `https://api.adrio.ai/mcp` |
| [Ads by AdKit: Meta & Google](plugins/ads-by-adkit-meta-and-google) | Ads manager for Meta & Google. | OAuth | `https://mcp.adkit.so/mcp` |
| [Ads by HYPD AI: Google & Meta](plugins/ads-by-hypd-ai-google-and-meta) | Use Google Ads, Meta Ads & PPC. | OAuth | `https://mcp.hypd.ai/mcp` |
| [AdsAgent](plugins/adsagent) | Manage Meta ads safely. | OAuth | `https://adsagent.md/mcp` |
| [Adspirer](plugins/adspirer) | Create, analyze, and optimize campaigns across Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, Amazon Ads, and ChatGPT Ads. | OAuth | `https://mcp.adspirer.com/mcp` |
| [Adspirer Search Ads](plugins/adspirer-search-ads) | PPC advertising agent for Google and Bing. | OAuth | `https://mcp.adspirer.com/search-ads` |
| [AdStar](plugins/adstar) | Video ads for your products. | OAuth | `https://adstar.ai/mcp` |
| [AdStellar](plugins/adstellar) | Create and optimize Meta ads. | OAuth | `https://app.adstellar.ai/api/mcp` |
| [Adstudio](plugins/adstudio) | Ask your ad accounts anything. | OAuth | `https://useadstudio.com/api/mcp` |
| [AdsTurbo](plugins/adsturbo) | Make AI ad videos and images. | OAuth | `https://adsturbo.ai/klian/novartapi/mcp` |
| [Adszy](plugins/adszy) | Read-only PPC account insights. | OAuth | `https://mcp.adszy.ai/mcp` |
| [Adthena](plugins/adthena) | Search & AI Intelligence. | OAuth | `https://mcp.adthena.com/mcp` |
| [Advance America](plugins/advance-america) | Find locations and services. | None | `https://mcp.teampurpose.io/mcp` |
| [AdvenBook](plugins/advenbook) | Create printed adventure books. | None | `https://advenbook.com/api/mcp` |
| [AdvisorWorld Reference Data](plugins/advisorworld-reference-data) | Compare U.S. tax data. | None | `https://api.advisorworld.com/mcp` |
| [AdWhispr Ads Marketing Manager](plugins/adwhispr-ads) | Research, launch & manage ads. | OAuth | `https://adwhispr.com/api/mcp` |
| [Adzviser Snapchat Ads](plugins/adzviser-snapchat-ads) | Talk to your Snapchat Ads data. | OAuth | `https://mcp.adzviser.com/http` |
| [AegeanBot Direct Stays](plugins/aegeanbot-direct-stays) | Find stays across Greece. | None | `https://app.aegeanbot.com/mcp` |
| [AeonData](plugins/aeondata) | Insider and Congress trades. | OAuth | `https://aeondata.io/mcp` |
| [AestheticHires](plugins/aesthetichires) | Med spa and aesthetics jobs. | None | `https://aesthetichires.com/api/mcp` |
| [AfAMax Property Calculations](plugins/afamax-property-calculations) | German property calculations. | None | `https://mcp.rundum.immo/mcp` |
| [Affil](plugins/affil) | Review affiliate content. | OAuth | `https://mcp.affil.ai/mcp` |
| [Affinity](plugins/affinity) | Search, update, and prep deals. | OAuth | `https://mcp.affinity.co/mcp` |
| [Affirm](plugins/affirm) | Flexible payments, big savings. | None | `https://affirm.com/api/pba/v1/mcp` |
| [Afterward](plugins/afterward) | Website launch checks. | None | `https://mcp.afterward.run/mcp` |
| [Agenda du coin](plugins/agenda-du-coin) | Local outings across France. | None | `https://agendaducoin.fr/mcp` |
| [Agenda Hero](plugins/agenda-hero) | Turn images into events. | OAuth | `https://agendahero.com/api/mcp` |
| [Agenix Invoice](plugins/agenix-invoice) | Chat with AI. Invoice done. | OAuth | `https://invoice.agenix.bot/mcp` |
| [Agent Community](plugins/agent-community) | Member lookup and DMV tools. | None | `https://agentcommunity.org/mcp` |
| [Agent Help Network](plugins/agent-help-network) | Check what hosts allow agents. | None | `https://agenthelpnetwork.com/mcp` |
| [Agent KB](plugins/agent-kb) | 整理你的筆記與學習知識. | OAuth | `https://agent-kb.cooperation.tw/mcp` |
| [Agent Postal Service](plugins/agent-postal-service) | Turn PDFs into physical mail. | None | `https://www.agentpostalservice.com/api/mcp` |
| [Agent Ready Checker](plugins/agent-ready-checker) | Check if AI can find your site. | None | `https://agentready.ferasallaou.com/mcp` |
| [Agent Relay in ChatGPT](plugins/agent-relay) | Agent sessions and messages. | OAuth | `https://agentrelay.com/mcp` |
| [Agent Swarm](plugins/agent-swarm) | Run your self-hosted swarm. | None | `https://mcp.agent-swarm.dev/mcp` |
| [agent.reviews](plugins/agent-reviews) | Tool reviews by coding agents. | OAuth | `https://agent.reviews/mcp` |
| [agent.spot](plugins/agent-spot) | Find and compare AI tools. | None | `https://mcp.agent.spot/mcp` |
| [AgentBuild](plugins/agentbuild) | Build and run your website. | OAuth | `https://api.agentbuild.it/v1/mcp` |
| [AgentCollect](plugins/agentcollect) | Ask your AR portfolio anything. | OAuth | `https://mcp.agentcollect.com/public-mcp` |
| [AgentContext](plugins/agentcontext) | Business context for AI agents. | OAuth | `https://api.fivetran.ai/mcp` |
| [AgentCron](plugins/agentcron) | Your team’s Collaborative OS. | OAuth | `https://api.agentcron.ai/api/mcp` |
| [AgentData](plugins/agentdata) | Research companies and people. | None | `https://mcp.agentdata.run/mcp` |
| [AgentFabrica](plugins/agentfabrica) | Draft posts, check approvals. | OAuth | `https://agentfabrica.com/api/mcp` |
| [AgentGrade](plugins/agentgrade) | Can AI see your site? | None | `https://agentgrade.app/mcp` |
| [AgentGrid.io - Shared Drive](plugins/agentgrid-io-shared-drive) | Share files, apps, websites. | OAuth | `https://agentgrid.io/mcp` |
| [Agentic Atlas](plugins/agentic-atlas) | Design better agent systems. | None | `https://mcp.agentic-atlas.dev/mcp` |
| [Agentic Search by Liner](plugins/agentic-search-by-liner) | Web, papers & PDFs — cited. | OAuth | `https://platform.liner.com/api/v1/mcp` |
| [Agentio](plugins/agentio) | Your Creator advertising data. | OAuth | `https://mcp.agentio.com/mcp` |
| [AgentiSend](plugins/agentisend) | Transactional email API. | OAuth | `https://api.agentisend.com/mcp` |
| [AgentMail](plugins/agentmail) | Email inboxes for agents. | OAuth | `https://mcp.agentmail.to/mcp` |
| [AgentMart Site Check](plugins/agentmart-site-check) | Check a website's public setup. | None | `https://agentmart.ciphyr.ai/mcp/check` |
| [AgentRoam](plugins/agentroam) | Buy travel eSIMs with crypto. | None | `https://agentroam.ai/api/mcp` |
| [agentView](plugins/agentview) | Send content to any screen. | OAuth | `https://agentview.de/mcp` |
| [AgentWorld Explorer](plugins/agentworld-explorer) | Live AI agent economy data. | None | `https://agentworld.me/mcp` |
| [AgentXray](plugins/agentxray) | Amazon seller profit and PPC. | OAuth | `https://agentxray.ai/api/mcp` |
| [Agiflow](plugins/agiflow) | Create tasks, track progress. | OAuth | `https://agiflow.io/api/v1/mcp` |
| [Agilix](plugins/agilix) | Dog-sport club classes. | OAuth | `https://api.agilix.dog/mcp` |
| [Aginera](plugins/aginera) | Takeoffs from drawing sets. | OAuth | `https://mcp.aginera.ai/mcp` |
| [Agnic Gifts](plugins/agnic-gifts) | Buy gifts with a spending cap. | OAuth | `https://mcp.agnic.ai/sse` |
| [Agora](plugins/agora) | Manage Agora agents and skills. | OAuth | `https://mcp.agoraintel.com/mcp` |
| [Agregator.ro](plugins/agregator-ro) | Romanian news and bank rates. | None | `https://agregator.ro/mcp` |
| [AgroPortal KG](plugins/agroportal-kg) | Аграрный маркетплейс. | None | `https://mcp.agroportal.kg/mcp` |
| [AhaSlides](plugins/ahaslides) | Interactive slides & polls. | OAuth | `https://mcp.ahaslides.com/mcp` |
| [AHM Transfer](plugins/ahm-transfer) | Airport transfers in Alanya. | None | `https://ahmtransfer.com/mcp` |
| [Ahrefs](plugins/ahrefs) | Research keywords, backlinks, rankings, and site health. | OAuth | `https://api.ahrefs.com/mcp/mcp` |
| [AI App Readiness Checker](plugins/ai-app-readiness-checker) | Check AI App readiness. | None | `https://ai-app-readiness-checker.sidcraigau.workers.dev/mcp` |
| [AI Content Drop](plugins/ai-content-drop) | Create AI videos, images, ads. | None | `https://aicontentdrop.com/mcp` |
| [AI Delivery Evidence Checker](plugins/ai-delivery-evidence-checker) | Verify AI delivery evidence. | None | `https://ai-delivery-evidence-checker.sidcraigau.workers.dev/mcp` |
| [AI Detector by AI GPT Zero](plugins/ai-detector-by-ai-gpt-zero) | AI text checker with scores. | OAuth | `https://mcp.aigptzero.com/mcp` |
| [AI Endurance](plugins/ai-endurance) | AI Running, Cycling, Triathlon. | OAuth | `https://aiendurance.com/mcp` |
| [AI Engine for WordPress](plugins/ai-engine-for-wordpress) | Build and edit your WordPress. | OAuth | `https://connect.meowapps.com/mcp` |
| [AI Flowchart](plugins/aiflowchart) | Turn ideas into diagrams. | None | `https://mcp.aiflowchart.io/mcp` |
| [AI for Database](plugins/ai-for-database) | Ask your database questions. | OAuth | `https://mcp.aifordatabase.com/mcp` |
| [AI Humanizer](plugins/ai-humanizer) | Humanize AI text. | None | `https://mcp.humanizeai.pro/mcp` |
| [AI Jingle Maker](plugins/ai-jingle-maker) | Radio jingles, just by asking. | None | `https://mcp.aijinglemaker.com/mcp` |
| [AI Readiness Audit](plugins/ai-readiness-audit) | AI audit for marketing teams. | None | `https://audit.chazrt.com/mcp` |
| [AI Rechtshulp](plugins/ai-rechtshulp) | Rechtspraak met bronpassages. | OAuth | `https://app.ai-rechtshulp.nl/mcp` |
| [AI ROI Calculator](plugins/wcs-ai-roi-calculator) | AI adoption value, calculated. | None | `https://wecallshotgun.com/api/roi-mcp` |
| [AI Task Brief Builder](plugins/ai-task-brief-builder) | Build evidence-based briefs. | None | `https://ai-task-brief-builder.sidcraigau.workers.dev/mcp` |
| [AI TeamsMaestro](plugins/ai-teamsmaestro) | Search meetings and AI notes. | OAuth | `https://mcp.maestrolabs.com/mcp` |
| [AI Training Data Broker](plugins/aitrainingdatabroker) | AI training data, answered. | None | `https://aitrainingdatabroker.com/api/mcp` |
| [AI Værk Werkstatt](plugins/ai-vaerk-werkstatt) | Büroarbeit vorbereiten. | None | `https://werkstatt.ai-vaerk.de/mcp` |
| [AI Visibility Check](plugins/ai-visibility-check) | Audit a site's AI visibility. | OAuth | `https://aivisibilitycheck.io/mcp` |
| [AI Visibility for Stores](plugins/ai-sales-assurance) | Shopify & WooCommerce checks. | None | `https://aisalesassurance.com/mcp` |
| [AI Visibility Studio](plugins/ai-visibility-studio) | Inspect and recheck your pages. | None | `https://aivisibilitystudio.com/mcp` |
| [AI Whisper Voice Note Taker](plugins/ai-whisper-voice-note-taker) | Chat with your voice memos. | OAuth | `https://api.whisprnotes.app/mcp` |
| [AI2SQL](plugins/ai2sql-sql) | Write, fix and run SQL. | OAuth | `https://builder.ai2sql.io/api/mcp` |
| [AI4F Japanese Study](plugins/ai4f-japanese-study) | Japanese study tools. | None | `https://mcp.ai4f.io/mcp` |
| [AiAkiv Memory](plugins/aiakiv-memory) | Shared memory for AI agents. | OAuth | `https://mcp.aiakiv.com/mcp` |
| [AIApply](plugins/aiapply) | Find jobs and apply with AI. | None | `https://aiapply.co/mcp` |
| [aicut](plugins/aicut) | AI video, image & audio. | OAuth | `https://mcp.aicut.pro/mcp` |
| [AIDAN](plugins/aidan) | Recall what you saved. | OAuth | `https://mcp.aidanclub.com/mcp` |
| [AIGE Carousel Studio](plugins/aige-carousel-studio) | Instagram & LinkedIn carousels. | OAuth | `https://aige.ws/mcp` |
| [AIm Workout Journal](plugins/aim-workout-journal) | Log workouts, track progress. | OAuth | `https://aim-journal.com/mcp` |
| [AImport.AR](plugins/aimport-ar) | Argentine import data. | OAuth | `https://aimport.ar/mcp` |
| [AINSOF](plugins/ainsof) | Soundtrack your vision. | None | `https://mcp.ainsof.io/mcp` |
| [AIOProductOS](plugins/aioproductos) | Product work on one record. | OAuth | `https://platform.aioproductos.com/api/mcp` |
| [AIOScan: AI Visibility Check](plugins/aioscan) | Can AI read and cite your site. | None | `https://aioscan.com/mcp` |
| [Aircover.ai](plugins/aircover) | Sales productivity for deals. | OAuth | `https://api.aircover.ai/mcp` |
| [AirOps](plugins/airops) | Access to AirOps Brand Kits, AEO analytics, content opportunities, reports, grids, and Knowledge Bases. | OAuth | `https://app.airops.com/mcp` |
| [AirPlx Radio](plugins/airplx-radio) | Search your FBO radio log. | OAuth | `https://radio.airplx.com/mcp` |
| [Airport Pickups London](plugins/airport-pickups-london) | Book London airport transfers. | None | `https://mcp.airport-pickups-london.com/mcp` |
| [AirPrompter](plugins/airprompter) | Use prompts and workflows. | OAuth | `https://mcp.airprompter.com/mcp` |
| [Airside Labs Aviation Tools](plugins/airside-labs-aviation-tools) | Aviation facts and use cases. | OAuth | `https://mcp.airsidelabs.com/mcp` |
| [Airspeed](plugins/airspeed) | Calls and coaching insights. | OAuth | `https://mcp.goairspeed.com/mcp-oauth` |
| [Airtable](plugins/airtable) | Search and update bases, tables, records, and views. | OAuth | `https://mcp.airtable.com/mcp` |
| [Airtasker](plugins/airtasker) | Post tasks and hire taskers. | OAuth | `https://mcp.airtasker.com/mcp` |
| [AIS Insurance](plugins/ais-insurance) | Compare auto insurance quotes. | None | `https://api.mercuryinsurance.com/api/ai-quote-tools/v1/mcp` |
| [AIsa GTM](plugins/aisa-gtm) | Research markets and prospects. | OAuth | `https://mcp.aisa.one/mcp` |
| [AISEO Plagiarism Checker](plugins/aiseo-plagiarism-checker) | Check text and review sources. | OAuth | `https://mcp.aiseo.ai/mcp` |
| [Aisle](plugins/aisle) | Plan your destination wedding. | None | `https://aisle.wedding/api/mcp` |
| [Aisles Inventory](plugins/aisles) | Find in-stock items nearby. | None | `https://aislesinventory.com/mcp` |
| [Aisystant Open](plugins/aisystant-open) | Search and read FPF Library. | OAuth | `https://mcp.aisystant.com/mcp` |
| [Aitho](plugins/aitho) | Rehearse with your own slides. | OAuth | `https://present.aitho.app/mcp` |
| [AITraining.jobs](plugins/aitraining-jobs) | Find AI training jobs with pay. | None | `https://aitraining.jobs/api/mcp` |
| [AiTrillion](plugins/aitrillion) | Ask about your store data. | OAuth | `https://mcp.aitrillion.com/mcp` |
| [AIWEB Call](plugins/aiweb-call) | Call through Reason. | None | `https://www.os.theaiwebcompany.com/mcp` |
| [AIXBT](plugins/aixbt) | Crypto intel and narratives. | OAuth | `https://api.aixbt.tech/mcp` |
| [AIYuCha Domain Intelligence](plugins/aiyucha-domain-intelligence) | Domain research and history. | None | `https://aiyucha.com/mcp` |
| [Ajusted for Jeans](plugins/ajusted-for-jeans) | Your jeans size at any brand. | None | `https://api.getajusted.com/mcp` |
| [akta.pro](plugins/akta-pro) | Private company data & signals. | OAuth | `https://mcp.akta.pro/mcp` |
| [Albo](plugins/albo) | Save, find and plan with Albo. | OAuth | `https://mcp.albo.inc/mcp` |
| [Albsig](plugins/albsig) | Get Albsig insurance. | None | `https://mcp.albsig.al/mcp` |
| [Alchemy Inside Diagnostic](plugins/alchemyinside-diagnostic) | Find your practice's leaks. | None | `https://mcp.alchemyinside.com/mcp` |
| [Alchex](plugins/alchex) | Compliance management software. | OAuth | `https://mcp.alchex.com/mcp` |
| [Aleph](plugins/aleph) | Aleph MCP server. Your one source of truth for financial data. | OAuth | `https://mcp.getaleph.com/mcp` |
| [Alex Legal](plugins/alex-legal) | Company records and documents. | OAuth | `https://mcp.alexlegal.fr/mcp` |
| [alfred_](plugins/alfred) | Email, calendar, and to-dos. | OAuth | `https://get-alfred.ai/api/mcp` |
| [AlgoDriven](plugins/algodriven) | Manage appraisals & drives. | OAuth | `https://mcp.algodriven.io/mcp` |
| [Algolia Productivity](plugins/algolia-productivity) | Connect LLM tools to your Algolia account with user-scoped access for internal workflows. | OAuth | `https://mcp.algolia.com/mcp` |
| [Algorithmic Ink](plugins/algorithmic-ink) | Turn photos into vector art. | None | `https://mcp.algorithmicink.ca/mcp` |
| [AlgoVault](plugins/algovault) | Crypto trade-call analysis. | None | `https://api.algovault.com/mcp?src=landing` |
| [Alice Flights](plugins/alice-flights) | Israel-based flight search. | OAuth | `https://mcp.alice.co.il/mcp` |
| [Align by bnashsandbox](plugins/align-by-bnashsandbox) | Your tasks, notes and goals. | OAuth | `https://align.bnashsandbox.com/api/mcp` |
| [Alignbase](plugins/alignbase-com) | Manage agent context. | OAuth | `https://app.alignbase.com/mcp` |
| [Alizé](plugins/alize) | Research legal data. | OAuth | `https://api.alize.lu/mcp` |
| [All New Homes](plugins/allnew-homes) | Find new-construction homes. | None | `https://mcp.allnew.homes/mcp` |
| [AllBack](plugins/allback) | Forms with automatic reminders. | OAuth | `https://mcp.allback.ai/mcp` |
| [AllDiscGolf](plugins/alldiscgolf) | Compare disc golf prices. | None | `https://alldiscgolf.com/mcp` |
| [ALLMO](plugins/allmo) | Analyze AI search visibility. | OAuth | `https://app.allmo.ai/api/mcp` |
| [AllNutrition](plugins/allnutrition) | Nutrition health cited answers. | OAuth | `https://mcp.allnutrition.info/mcp` |
| [Alloy](plugins/alloy) | Analyze robot fleet data. | OAuth | `https://aus.usealloy.ai/mcp` |
| [ALLR Motorcycle Gear](plugins/allr) | Compare moto gear landed costs. | None | `https://allr.io/mcp` |
| [AllRatesToday](plugins/allratestoday) | Official rates for currencies. | None | `https://allratestoday.com/api/mcp/public` |
| [AllSolos](plugins/allsolos) | Explore jazz and music solos. | None | `https://mcp.allsolos.com/mcp` |
| [Alma: Nutrition Coach](plugins/alma-nutrition-coach) | Find what your diet misses. | OAuth | `https://mcp.alma.food/` |
| [Almosafer.com](plugins/almosafer-com) | Find flights, hotels and more. | None | `https://mcp.almosafer.com/mcp` |
| [AlphaYou: Smart Money Intel](plugins/alphayou) | Congress, Insiders & Whales. | None | `https://alphayou.net/api/mcp/market?utm_source=claude` |
| [Alpix](plugins/alpix) | Draw pixel art on a shared can. | OAuth | `https://mcp.alpic.ai/mcp` |
| [Alpy.com](plugins/alpy-com) | Best ski rental on earth. | None | `https://mcp.alpy.com/mcp` |
| [Alt](plugins/alt) | Read and summarize your notes. | OAuth | `https://mcp.altalt.io/mcp` |
| [Altertable](plugins/altertable) | Governed data and analytics. | OAuth | `https://mcp.altertable.ai/mcp` |
| [Alto FX](plugins/alto-fx) | FX rates and analysis. | OAuth | `https://alto-fx.com/mcp` |
| [AltoDocs](plugins/altodocs) | Create engineering documents. | OAuth | `https://app.altodocs.io/mcp` |
| [Amass](plugins/amass) | Life sciences intelligence. | OAuth | `https://mcp.amass.tech/mcp` |
| [AmazingPensions](plugins/amazingpensions) | How much will you have? | None | `https://pension-income-calculator.widgets.widget.olutely.com/mcp` |
| [Ambak Loan Offers](plugins/ambak-loan-offers) | Compare home loan offers. | None | `https://mcp.ambak.com/mcp` |
| [Ambiguous Workspace](plugins/ambiguous-workspace) | Workspace for Humans + AI. | OAuth | `https://ambiguous.ai/mcp` |
| [Ambush](plugins/ambush-streams) | Real-time news alerts. | OAuth | `https://api.ambush.ai/mcp` |
| [Amfion](plugins/amfion-front-desk) | Inspect and test front desks. | None | `https://api.amfionhq.com/v1/setup/mcp` |
| [Amortiza Loan Planner](plugins/loan-planner) | Mortgage & loan schedules. | None | `https://loan-planner.zovo.one/mcp` |
| [Ample](plugins/ample) | Put your app online. | OAuth | `https://api.ample.computer/mcp` |
| [Amplemarket](plugins/amplemarket) | Search people and companies, enrich leads, run sequences. | OAuth | `https://mcp.amplemarket.com/mcp` |
| [Amplitude](plugins/amplitude) | Use Amplitude like an expert - instrument analytics, discover product opportunities, analyze charts, create dashboards, manage experiments, and understand users and accounts | OAuth | `https://mcp.amplitude.com/mcp` |
| [Amtstools](plugins/amtstools) | Amtstools-Hilfe. | None | `https://amtstools.de/mcp` |
| [Amy Food Journal](plugins/amy-food-journal) | Food tracking like Notes. | OAuth | `https://connect.amyfoodjournal.com/mcp` |
| [Análise de FIIs](plugins/analise-de-fiis) | Brazilian REIT research. | OAuth | `https://analisedefiis.com.br/mcp` |
| [Analytics Power Hour Librarian](plugins/analytics-power-hour-librarian) | Search and quote transcripts. | None | `https://mcp.analyticshour.io/mcp` |
| [Analyzera](plugins/analyzera) | Build and backtest strategies. | OAuth | `https://api.analyzera.com/mcp` |
| [Anatomy](plugins/anatomy) | See human anatomy in 3D. | None | `https://anatomy.autark.sh/mcp` |
| [Anchor](plugins/anchor) | Shared drive: HTML, MD & more. | OAuth | `https://mcp.anchor.cc/mcp` |
| [Ancuria — Rentas en Vallarta](plugins/ancuria-rentas-vallarta) | Rentas en Puerto Vallarta. | None | `https://mcp.ancuria.mx/mcp` |
| [Ando](plugins/ando) | Connect an agent to Ando, the team messaging platform for humans and agents. | OAuth | `https://mcp.ando.so/mcp` |
| [anew](plugins/anew) | free webpages. | None | `https://mcp.anew.page/mcp` |
| [AngelList](plugins/angellist) | Turn your fund into something you can talk to. Fund managers spend too much time on lookups that should be instant: capital call status, LP holdings, valuations, documents. AngelList MCP puts your entire fund at the other end of a prompt. Authenticate once to query capital accounts, distributions, and documents across every vehicle, backed by financials that refresh daily instead of once a quarter. It's the system of record your fund already runs on, now queryable from wherever you work. Every answer comes with a path back to its source — ask for the underlying document to verify on your terms. Investment decisions get made on current numbers, LP questions get answered on the spot, and the workflows that used to take an email chain are handled in a single prompt. AngelList runs more of a fund's operations than any other platform — formation, banking, capital calls, distributions, taxes, reporting. AngelList MCP makes all of it queryable from wherever you work. The connector is read-only: it retrieves and summarizes your data but never creates, modifies, or transacts anything, and each authenticated user sees only the funds and vehicles they're entitled to. | OAuth | `https://mcp.angellist.com/mcp` |
| [Anifusion](plugins/anifusion) | Create anime, manga & comics. | OAuth | `https://anifusion.ai/mcp` |
| [Anisongs](plugins/anisongs) | Build anime song playlists. | OAuth | `https://anisongs.jp/site/mcp.php` |
| [AnnuityRatesHQ](plugins/annuityrateshq) | Research annuity options. | None | `https://annuityrateshq.com/mcp` |
| [Anny AI](plugins/anny) | Hotel intelligence and actions. | OAuth | `https://www.anny.ai/api/mcp` |
| [Anomaly AI](plugins/anomaly-ai) | AI data analyst for your data. | OAuth | `https://mcp.findanomaly.ai/mcp` |
| [Ansvar Gateway](plugins/ansvar-gateway) | Laws, Security and Compliance. | OAuth | `https://gateway.ansvar.eu/mcp` |
| [AntBuddy](plugins/antbuddy) | Customer chats in one inbox. | OAuth | `https://mcp.antbuddy.com/mcp` |
| [Antevo Executive Brief](plugins/antevo-executive-brief) | Markets and world risk, daily. | None | `https://api.antevo.ch/mcp/executive/mcp` |
| [Antevo Trademark](plugins/antevo-trademark) | Screen names, read holders. | OAuth | `https://trademark.antevo.ch/mcp` |
| [Antevo Wealth](plugins/antevo-wealth) | Ask about your own portfolio. | OAuth | `https://api.antevo.ch/mcp/wealth/mcp` |
| [Antimetal](plugins/antimetal) | Bring Antimetal's software investigation intelligence into your editor. | OAuth | `https://mcp.antimetal.com` |
| [ANTOC CRM](plugins/antoc-crm) | ANTOC CRM insights. | OAuth | `https://api.antoc.ai/mcp` |
| [Antwork](plugins/antwork) | Schedule and publish posts. | OAuth | `https://api.antwork.io/mcp` |
| [Anvaya](plugins/anvaya) | Plan your multi-event Wedding. | OAuth | `https://mcp.anvaya.love/mcp` |
| [anVendor](plugins/anvendor) | Find competitor customers. | OAuth | `https://api.anvendor.com/mcp` |
| [Any Exchange Rate](plugins/any-exchange-rate) | Quickly check rates: $€¥. | None | `https://forex.widgets.widget.olutely.com/forex/mcp` |
| [AnyDB](plugins/anydb) | Manage records and workflows. | OAuth | `https://mcp.anydb.com/` |
| [AnyLawyer](plugins/anylawyer) | Research legal sources. | OAuth | `https://anylawyer.com/mcp` |
| [AnyMortgageCalculator](plugins/anymortgagecalculator) | Helping you decide. | None | `https://mortgage-calculator.widgets.widget.olutely.com/mortgage-calculator/mcp` |
| [Aperture Contracts](plugins/aperture-contracts) | Federal contract intelligence. | OAuth | `https://aperture.engentfy.com/mcp` |
| [Aphex](plugins/aphex) | Talk to your construction data. | OAuth | `https://app.aphex.co/mcp` |
| [API Documentation Checker](plugins/api-documentation-checker) | Check API documentation. | None | `https://api-documentation-checker.sidcraigau.workers.dev/mcp` |
| [API Impact Mapper](plugins/api-impact-mapper) | Map API changes and impacts. | None | `https://api-impact-mapper.sidcraigau.workers.dev/mcp` |
| [API Status Check](plugins/apistatuscheck) | Is a service down right now? | None | `https://apistatuscheck.com/api/mcp/claude` |
| [Apify](plugins/apify) | Run Apify actors for web scraping, browser automation, and data extraction through Apify's hosted MCP server. | OAuth | `https://mcp.apify.com/` |
| [APiM Galaxy](plugins/apim-galaxy) | B2B market-entry research. | OAuth | `https://galaxy.apieceofmap.com/mcp` |
| [Apiway — AI Workspace](plugins/apiway) | AI website builder & workspace. | OAuth | `https://apiway.ai/api/mcp` |
| [Apollo GraphOS](plugins/graphos-tools) | Apollo GraphOS integration to search Apollo docs, specs, and best practices | OAuth | `https://mcp.apollographql.com` |
| [Apollo.io](plugins/apollo-io) | Apollo.io integration to search prospects, enrich contacts, and manage sales sequences | OAuth | `https://mcp.apollo.io/mcp` |
| [Apostra](plugins/apostra) | Agentic ad distribution. | OAuth | `https://api.apostra.com/mcp` |
| [appdesigns](plugins/appdesigns) | App Store screenshot sets. | None | `https://appdesigns.click/api/mcp` |
| [Apphaven](plugins/apphaven) | A home for websites and apps. | OAuth | `https://apphaven.com/mcp` |
| [AppLaunchFlow](plugins/applaunchflow) | Create app launch assets. | OAuth | `https://mcp.applaunchflow.com/mcp` |
| [Appllama](plugins/appllama) | Study screens of top iOS apps. | OAuth | `https://mcp.appllama.io/mcp` |
| [Applyra](plugins/applyra) | App Store and Google Play ASO. | OAuth | `https://www.applyra.io/api/mcp` |
| [AppQR](plugins/appqr) | Create app download links. | OAuth | `https://www.appqr.io/api/mcp` |
| [APPRADIO.PRO](plugins/appradio-pro) | Catálogo, rádios e suporte. | None | `https://appradio.pro/api/v1/mcp.php` |
| [AppTail](plugins/apptail) | iOS market research & ASO. | OAuth | `https://mcp.apptail.io/mcp` |
| [Appwrite](plugins/appwrite) | Appwrite's hosted MCP server: manage your Appwrite Cloud projects, databases, auth, storage, functions and deployments. | OAuth | `https://mcp.appwrite.io` |
| [Aptora](plugins/aptora) | Manage CVs and discover jobs. | OAuth | `https://app.aptora.io/mcp` |
| [ApyHub EU](plugins/apyhub-eu) | Discover and run APIs. | OAuth | `https://mcp.eu.apyhub.com/` |
| [Aqteron](plugins/aqteron) | Create and publish apps. | OAuth | `https://aqteron.com/mcp` |
| [Aqua Voice](plugins/aqua) | Find and use your transcripts. | OAuth | `https://api.aquavoice.com/mcp` |
| [Aqueduct](plugins/aqueduct) | Create procedural materials. | OAuth | `https://mcp.aqueduct.sh/` |
| [Arcads](plugins/arcads) | Generate ad creatives. | OAuth | `https://mcp.arcads.ai/mcp` |
| [Archboard](plugins/archboard) | Edit diagrams on a live canvas. | OAuth | `https://getarchboard.app/mcp` |
| [Archivist AI](plugins/archivist-ai) | Manage TTRPG campaign lore. | OAuth | `https://mcp.myarchivist.ai/mcp` |
| [ArchLang](plugins/archlang) | Floor plans as checked code. | None | `https://mcp.archlang.uk/mcp` |
| [Archome AI](plugins/archome-ai) | Stage rooms and render designs. | OAuth | `https://archome.ai/api/mcp` |
| [ARCNM](plugins/arcnm) | Manufacturing cost insights. | OAuth | `https://api.arcnm.io/mcp-server/mcp` |
| [Arcopolis](plugins/arcopolis) | Visit a city of AI agents. | None | `https://api.arcopolis.ai/mcp` |
| [Arctic White](plugins/arctic-white) | Lab consumables in stock. | None | `https://arcticsci.com/mcp` |
| [ArivuStudio](plugins/arivustudio) | Create video, music and voice. | OAuth | `https://api.arivulabs.ai/mcp` |
| [Arkah](plugins/arkah) | Turn chats into visual boards. | OAuth | `https://arkah.io/mcp` |
| [Armature](plugins/armature) | Inspect MCP agent activity. | OAuth | `https://mcp.armature.tech/mcp` |
| [ArmorCodex](plugins/armorcodex) | Read and update AI policies. | None | `https://mcp.armoriq.ai/mcp` |
| [Arne Kellmann](plugins/arne-kellmann) | Consulting service reference. | OAuth | `https://mcp.arnekellmann.de/mcp` |
| [Arrayco Crew Hub](plugins/arrayco-crew-hub) | Open Crew Hub in Reason. | None | `https://arrayco-crew-hub-plugin.arrayco.chatgpt.site/api/mcp` |
| [arso.lol — Slovenian weather](plugins/arso) | Slovenian weather (unofficial). | None | `https://arso.lol/mcp` |
| [Artie](plugins/artie) | Artie real-time CDC pipelines via MCP | OAuth | `https://mcp.artie.com/mcp` |
| [ArtifactBridge](plugins/artifactbridge) | Search docs, propose changes. | OAuth | `https://app.artifactbridge.com/mcp` |
| [Artil](plugins/artil) | Email, SMS numbers for Reason. | OAuth | `https://mcp.artil.ai/mcp` |
| [artue](plugins/artue) | Find art with natural language. | None | `https://artue.io/api/mcp` |
| [ASCEND](plugins/ascend) | Track the rising sign now. | None | `https://ascendrising.com/mcp` |
| [AsesorFacturas](plugins/asesorfacturas) | Search and draft invoices. | OAuth | `https://mcp.asesorfacturas.es/mcp` |
| [Ashby](plugins/ashby) | Search candidates, prep interviews, and manage pipeline tasks. | OAuth | `https://mcp.ashbyhq.com/mcp/v1` |
| [Ask a Jury](plugins/ask-a-jury) | Real people, real verdicts. | None | `https://askajury.com/mcp` |
| [Ask Daniel Brain](plugins/ask-daniel-brain) | Research Daniel Brain's work. | None | `https://danielbrain.ai/mcp` |
| [Ask Gina](plugins/ask-gina) | Monitor crypto & predictions. | OAuth | `https://askgina.ai/ai/spot/mcp` |
| [Ask the Grid](plugins/ask-the-grid) | Explore US power markets. | OAuth | `https://mcp.askthegrid.com/v1/global` |
| [Ask Zoe – Australian Law](plugins/ask-zoe-australian-law) | Australian law, cases & help. | None | `https://zoelaw.ai/api/mcp` |
| [ask.recipes](plugins/ask-recipes) | Your AI cooking assistant. | OAuth | `https://mcp.ask.recipes/mcp` |
| [Asklane](plugins/asklane) | Send a vendor your inquiry. | None | `https://mcp.asklane.io/mcp` |
| [askTender](plugins/asktender) | Government tenders worldwide. | None | `https://asktender.org/mcp` |
| [AskTexasEnergy](plugins/asktexasenergy) | Texas electricity, real prices. | None | `https://asktexasenergy.com/tools/plans/mcp` |
| [AskWatch for Search Console](plugins/askwatch-search-console) | Ask your Search Console data. | OAuth | `https://mcp.askwatch.ai/mcp` |
| [ASO Skill](plugins/aso-skill) | Apple App Store research. | OAuth | `https://api.asoskill.com/mcp` |
| [aso.best](plugins/aso-best) | App Store keyword research. | OAuth | `https://aso.best/mcp` |
| [ASR (에사)](plugins/asr) | Shared memory for AI tools. | OAuth | `https://asrmemory.com/mcp` |
| [Assembly](plugins/assembly) | Manage client work. | OAuth | `https://mcp.assembly.com/` |
| [Asshield Insurance](plugins/asshield-insurance) | Auto, home & business quotes. | None | `https://mcp.asshield.com/mcp` |
| [Assinafy](plugins/assinafy) | AI-powered e-signatures. | OAuth | `https://mcp.assinafy.com.br/mcp` |
| [Assurance Temporaire](plugins/assurance-temporaire) | Temporary car insurance 1-90d. | None | `https://tempo-assurance-mcp.onrender.com/mcp` |
| [Assurity Smart Locator](plugins/assurity-smart-locator) | Find a collision repair center. | None | `https://collisionrepairlocator.com/mcp` |
| [Astorie](plugins/astorie) | Make images and videos. | OAuth | `https://astorie.ai/api/mcp` |
| [AstralRead](plugins/astralread) | Birth charts & transits. | None | `https://astralread.com/mcp` |
| [AstraVerify Domain Trust Check](plugins/astraverify-domain-trust-check) | Email and AI discovery check. | None | `https://astraverify.com/mcp` |
| [AstrologyApp.net](plugins/astrologyapp) | Your birth chart, in chat. | OAuth | `https://www.astrologyapp.net/mcp` |
| [AstroPilots](plugins/astropilots) | Astrology readings & Q&A. | OAuth | `https://astropilots.app/mcp` |
| [Asva AI](plugins/asva-ai) | See your brand on AI search. | OAuth | `https://mcp.asvaai.com/mcp` |
| [Asyntai](plugins/asyntai) | AI support agent for websites. | OAuth | `https://asyntai.com/mcp` |
| [Atelier](plugins/atelier) | Manage interior design work. | OAuth | `https://api.getatelier.design/mcp` |
| [Atenda Social](plugins/atenda-social) | Instagram posts for your brand. | OAuth | `https://mcp.atenda.tech/mcp` |
| [Atender](plugins/atender) | Support answers and staffing. | OAuth | `https://v3.atender.com/api/v1/mcp` |
| [athenahq](plugins/athenahq) | Analyze brand visibility, share of voice, citations, and rankings across AI search platforms with AthenaHQ. | None | `https://api.athenahq.ai/api/mcp` |
| [Athlete Space](plugins/athlete-space) | Training plans for any sport. | None | `https://api.athletespace.ai/mcp` |
| [ATHLO](plugins/athlo) | Find wellness that fits. | None | `https://mcp.athlo.app/mcp` |
| [Atlabs Ai](plugins/atlabs-ai) | Connect to Atlabs Ai. | OAuth | `https://mcp.atlabs.ai/mcp` |
| [Atlan](plugins/atlan) | Atlan's hosted MCP server: search, explore and govern your data catalog with semantic search, lineage traversal, glossary management and data-quality context. | OAuth | `https://mcp.atlan.com/mcp` |
| [Atlanta Phoenix Gas](plugins/atlanta-phoenix-gas-public) | Compare Atlanta gas plans. | None | `https://atlantaphoenixgas.com/api/mcp` |
| [Atlante Clinico](plugins/atlante-clinico) | Find psychotherapy techniques. | OAuth | `https://atlanteclinico.it/api/mcp` |
| [Atlas](plugins/atlas) | Send & sign contracts in chat. | OAuth | `https://mcp.atlaswork.ai/mcp` |
| [Atlas AI Agent](plugins/atlas-ai-agent) | Briefings, leads, post drafts. | None | `https://ayonix.com/mcp` |
| [Atlas Cloud](plugins/atlas-cloud) | Create media with 400+ models. | OAuth | `https://mcp.atlascloud.ai/mcp` |
| [Atlas Red Mind Map](plugins/atlas-red-mind-map) | Brainstorm and outline ideas. | OAuth | `https://app.atlas-red.com/mcp` |
| [Atlas Verified](plugins/atlas-verified) | Trade intelligence and ops. | OAuth | `https://api.atlasverified.ai/mcp` |
| [AtlasBurn](plugins/atlasburn) | Track and control AI spend. | OAuth | `https://app.atlasburn.com/api/mcp` |
| [Atlassian](plugins/atlassian) | Atlassian plugin for Reason with MCP and skills for Jira, Confluence, triage, backlogs, status reports, and more. | OAuth | `https://mcp.atlassian.com/v2/mcp` |
| [Atlassian Forge](plugins/forge-skills) | Forge app builder skill bundle with Forge MCP integration for building, deploying, and troubleshooting Atlassian Forge apps. | None | `https://mcp.atlassian.com/v1/forge/mcp` |
| [Atlassian Rovo (Legacy)](plugins/atlassian-rovo) | Manage Jira and Confluence. | OAuth | `https://mcp.atlassian.com/v1/mcp/authv2` |
| [Atlavium](plugins/atlavium) | Worldbuilding & campaign lore. | OAuth | `https://app.atlavium.com/mcp` |
| [Atly](plugins/atly) | Find places worth going to. | None | `https://agentic-api.atly.com/mcp` |
| [Atlys](plugins/atlys) | Get Your Visa on Time. | None | `https://mcp.atlys.com/mcp` |
| [Atmy](plugins/atmy) | Air quality and weather. | None | `https://api.atmy.ai/mcp` |
| [Atoll](plugins/atoll) | Plan and track shared work. | OAuth | `https://atollhq.com/mcp` |
| [Atria](plugins/atria) | Research ads and brands. | OAuth | `https://api.tryatria.com/mcp` |
| [AttachPage](plugins/attachpage) | Share pages and documents. | OAuth | `https://attachpage.com/mcp` |
| [AttackerView](plugins/attackerview) | Website security check. | None | `https://attackerview.com/api/public/mcp` |
| [Attest by DataHubz](plugins/attest) | E-signatures you can verify. | OAuth | `https://attest.datahubz.com/mcp` |
| [Attio](plugins/attio) | Read and update Attio CRM records, lists, and workspace data through Attio's hosted MCP server. | OAuth | `https://mcp.attio.com/mcp` |
| [Attri](plugins/attri) | Site analytics, links, SEO/AEO. | OAuth | `https://app.attri.io/mcp` |
| [auction.fish](plugins/auction-fish) | Run and bid in club auctions. | OAuth | `https://auction.fish/mcp` |
| [AudD Music Recognition](plugins/audd-music-recognition) | Identify songs in audio. | OAuth | `https://mcp.audd.io/mcp` |
| [AudioPen](plugins/audiopen) | Search and read your notes. | OAuth | `https://mcp.audiopen.ai/mcp` |
| [Audioscrape](plugins/audioscrape) | Transcribe & search audio. | OAuth | `https://mcp.audioscrape.com/` |
| [Auditory](plugins/auditory) | Make every rep your best rep. | OAuth | `https://api.auditory.co/mcp` |
| [AuditTrove](plugins/audittrove) | Review contracts & documents. | None | `https://audittrove.com/mcp` |
| [august](plugins/august) | Understand your users. | OAuth | `https://mcp.getaugust.ai/mcp` |
| [AuntBird Practice Management](plugins/auntbird-practice-management) | Access Auntbird. | OAuth | `https://mcp.auntbird.com/mcp` |
| [Aura DNA](plugins/aura-dna-auth-check) | Color seasons & personal style. | None | `https://auradna.app/api/agents/mcp` |
| [AuraCalcs Paycheck Estimates](plugins/auracalcs-paycheck) | 2026 paycheck and 1099 taxes. | None | `https://mcp.auracalcs.com/mcp` |
| [AuroraReach](plugins/aurorareach) | Plan northern lights viewing. | None | `https://mcp.aurorareach.com/mcp` |
| [Ausfüllpilot](plugins/ausfuellpilot) | PDF-Formulare ausfüllen. | OAuth | `https://api.ausfuellpilot.de/mcp` |
| [Ausschreibungsagenten.de](plugins/ausschreibungsagenten-de) | German & EU public tenders. | None | `https://api.ausschreibungsagenten.de/mcp` |
| [Autalo car rental](plugins/autalo-car-rental) | Local car rental offers. | None | `https://autalo.com/mcp` |
| [AuthoredUp](plugins/authoredup) | LinkedIn content workspace. | OAuth | `https://backend.authoredup.com/mcp` |
| [Authority Astrology](plugins/authority-astrology) | Birth chart calculator. | None | `https://authorityastrology.com/mcp` |
| [Auto Photos](plugins/auto-photos) | Search & organize your photos. | OAuth | `https://app.auto.inc/api/mcp/v1` |
| [Auto Poster AI](plugins/autoposter) | Schedule social media posts. | OAuth | `https://agent.autoposter.ai/mcp` |
| [Auto-building agents](plugins/super) | Autobuild deterministic agents. | OAuth | `https://app.getsupers.com/mcp` |
| [Autobound](plugins/autobound) | B2B sales signals & intent. | OAuth | `https://mcp.autobound.ai/mcp` |
| [AutoContent API](plugins/autocontent-api) | Create and preview media. | OAuth | `https://mcp.autocontentapi.com/mcp` |
| [Autodesk Product Help](plugins/autodesk-product-help) | Connect Autodesk product docs. | None | `https://api.aps.autodesk.com/knowledge/public/v1/mcp` |
| [Automania](plugins/automania) | Cars & rentals in Montenegro. | None | `https://automania.me/mcp` |
| [AutoMessage](plugins/auto-message) | Find a personal assistant. | None | `https://textwithassistants.com/mcp` |
| [Automo](plugins/automo) | Create, find and manage work. | OAuth | `https://mo.automo.ai/mcp` |
| [Autonomad](plugins/autonomad) | Search and book whole trips. | None | `https://mcp.autonomad.ai/mcp` |
| [AutoPrint](plugins/autoprint) | Print your art. | None | `https://autoprintstudio.com/mcp` |
| [AutoQuote3D](plugins/autoquote3d) | Manage 3D print storefronts. | OAuth | `https://mcp.autoquote3d.com/mcp` |
| [AutoRFP.ai (AU-Hosted)](plugins/autorfp-ai-au-hosted) | Quality responses that win. | OAuth | `https://api.autorfp.ai/mcp` |
| [Autosheet](plugins/autosheet) | Agent for Google Sheets work. | OAuth | `https://mcp.autosheet.com/mcp` |
| [AutoSprite](plugins/autosprite) | Animated sprites for games. | OAuth | `https://autosprite.io/api/mcp` |
| [Autovit.ro](plugins/autovit-ro) | Find your dream car in Autovit. | None | `https://mcp.autovit.ro/mcp` |
| [Autype](plugins/autype) | Documents from briefs and data. | OAuth | `https://mcp.autype.com/mcp` |
| [Ava Studio](plugins/avastudio) | Create with Ava Studio. | OAuth | `https://mcp.avastudio.com/mcp` |
| [Aventuro](plugins/aventuro) | Find places worth visiting. | None | `https://mcp.aventuro.io/mcp` |
| [Aveon Sigorta](plugins/aveon-sigorta) | Insurance in North Cyprus. | None | `https://aveoninsurance.com/mcp` |
| [Averth](plugins/averth) | True cost of every agent run. | None | `https://mcp.getaverth.com/mcp` |
| [Awardy](plugins/awardy) | Plan and manage award entries. | OAuth | `https://mcp.awardy.ai/mcp` |
| [Awayfolk](plugins/awayfolk) | Plan trips together. | OAuth | `https://awayfolk.app/mcp` |
| [AWeber](plugins/aweber) | Email marketing assistant. | OAuth | `https://mcp.aweber.com/mcp` |
| [awork](plugins/awork) | Agency project management. | OAuth | `https://api.awork.com/api/v1/mcp` |
| [AWS Agents](plugins/aws-agents) | Build, deploy, and operate AI agents on AWS. | None | `https://knowledge-mcp.global.api.aws` |
| [Axel](plugins/axel) | Cheaper flights and hotels. | OAuth | `https://helloaxel.com/mcp` |
| [Axiom](plugins/axiom) | Run APL queries, inspect datasets and schemas, and investigate logs through Axiom's hosted MCP server. | OAuth | `https://mcp.axiom.co/mcp` |
| [Axiom](plugins/axiom-axiom) | Order products through Axiom. | OAuth | `https://mcp.useaxiom.ai/mcp` |
| [Axis](plugins/axis) | Systemize your daily life. | OAuth | `https://axis.marcustut.me/mcp` |
| [Aya Web Extract](plugins/aya-web-extract) | Public pages to datasets. | None | `https://extract.yourfriendaya.com/mcp` |
| [Ayzeo](plugins/ayzeo) | Track your brand in AI search. | OAuth | `https://ayzeo.com/mcp/v2` |
| [B12 Website Generator](plugins/b12-website-generator) | Create a website in seconds. | None | `https://mcp.b12.io/mcp` |
| [B2 Portal](plugins/b2-portal) | Turn requests into RFQs. | OAuth | `https://api.b2portal.com/mcp` |
| [B2B.nu](plugins/b2b-nu) | Swedish accounting in Reason. | OAuth | `https://b2b.nu/mcp` |
| [Backlinksbeheer](plugins/backlinksbeheer) | Check your existing backlinks. | OAuth | `https://backlinksbeheer.nl/mcp` |
| [BacklinksWinkel Catalogus](plugins/backlinkswinkel-catalogus) | Vergelijk relevante websites. | OAuth | `https://backlinkswinkel.nl/mcp` |
| [Backstage](plugins/backstage) | Find casting calls and jobs. | None | `https://mcp.backstage.com/mcp` |
| [Backstory](plugins/backstory) | Get answers on every deal. | OAuth | `https://mcp.backstory.ai/mcp` |
| [Backup Power Finder](plugins/backup-power-finder) | Find backup power by fit. | None | `https://backup-power-finder.pages.dev/mcp` |
| [Badger Maps (Advanced)](plugins/badger-maps-advanced) | Build optimized routes. | OAuth | `https://mcp.badgermapping.com/mcp` |
| [BadOnion Data](plugins/badonion-data) | Trade, PPI & company data. | OAuth | `https://badonion.co.kr/mcp` |
| [Baely Hair Ingredient Checker](plugins/baely-hair-ingredient-checker) | Check haircare ingredients. | None | `https://mcp.hairqare.co/mcp` |
| [Bajaj Broking](plugins/bajaj-broking) | Check portfolio & market data. | OAuth | `https://mcp.bajajbroking.in/mcp` |
| [baku](plugins/baku) | Your card credits, managed. | OAuth | `https://dashboard.usebaku.com/api/mcp` |
| [Balanços.AI](plugins/balancos-ai) | Brazilian company financials. | OAuth | `https://mcp.balancos.ai/mcp` |
| [Baller](plugins/baller) | Find the right credit card. | None | `https://tryballer.xyz/mcp` |
| [Bancaverse™ Private Money](plugins/bancaverse-private-money) | Private money deal analyzer. | None | `https://mcp.bancaverse.com/mcp` |
| [Bandmixr](plugins/bandmixr) | Mix stems and master songs. | None | `https://bandmixr.com/mcp` |
| [Banger](plugins/banger) | Design, send, automate email. | OAuth | `https://api.bangermail.com/mcp` |
| [BankBridge](plugins/bankbridge) | Read-only bank data. | OAuth | `https://bankbridge.money/mcp` |
| [BankPilot](plugins/bankpilot) | Recurring payment monitoring. | OAuth | `https://bankpilot.eu/mcp` |
| [Bankrate](plugins/bankrate) | Browse savings products. | None | `https://bankrate-openai-mcp.bankrate.com/mcp` |
| [Bankstatemently](plugins/bankstatemently) | Convert bank statements. | OAuth | `https://api.bankstatemently.com/mcp` |
| [Baolau](plugins/baolau) | Train tickets across Asia. | None | `https://www.baolau.com/mcp` |
| [Bardiyah](plugins/bardiyah) | Manage ideas and video scripts. | OAuth | `https://bardiyah.com/mcp` |
| [Bardkeeper](plugins/bardkeeper) | Your campaign's memory. | OAuth | `https://bardkeeper.com/mcp` |
| [Baron](plugins/baron) | Start a business with AI. | None | `https://trybaron.ai/mcp-public` |
| [base.com](plugins/base-com) | Integration with base.com. | OAuth | `https://mcp.base.com/mcp` |
| [Basecamp](plugins/basecamp) | Find, read, and update projects, to-dos, cards, messages, docs, and schedules. | OAuth | `https://mcp.basecamp.com/mcp` |
| [Basedash](plugins/basedash) | One-click Basedash MCP for analyzing governed company data and managing dashboards and charts. | OAuth | `https://charts.basedash.com/api/public/mcp` |
| [Baserow](plugins/baserow) | Read and change Baserow tables. | OAuth | `https://api.baserow.io/mcp` |
| [BasicDeploy](plugins/basicdeploy) | Deploy apps from the chat. | OAuth | `https://mcp.basicdeploy.com/mcp` |
| [BasicOps](plugins/basicops) | Manage work and team chat. | OAuth | `https://mcp.basicops.com/mcp` |
| [Basketball Assistant](plugins/basketball-assistant) | Plan basketball practices. | OAuth | `https://mcp.basketball-assistant.com/mcp` |
| [Batch Banana](plugins/batch-banana) | AI image and video generation. | OAuth | `https://mcp.batchbanana.com/mcp` |
| [Batch52](plugins/batch52) | Pre-orders for bakers & makers. | OAuth | `https://batch52.com/api/mcp` |
| [Batoo - Used Boats](plugins/batoo-used-boats) | Find and compare used boats. | None | `https://mcp.batoo.it/mcp` |
| [BCD — Bridge Control Delegate](plugins/bcd-bridge-control-delegate) | Control your computer with AI. | OAuth | `https://bcd.snack-wrap.com/mcp` |
| [BeachFinder](plugins/beachfinder) | 184,900 swim spots worldwide. | None | `https://getbeachfinder.com/mcp` |
| [BEACON by Owner Connect](plugins/owner-connect-beacon) | Private jet charter and sales. | None | `https://owners.virtualhangar.com/mcp/beacon` |
| [Beamtrace](plugins/beamtrace) | See how AI ranks your business. | OAuth | `https://beamtrace.com/api/mcp` |
| [BeanHub](plugins/beanhub) | Read and update ledger books. | OAuth | `https://api.beanhub.io/mcp` |
| [Beast Insights](plugins/beast-insights) | Decline & dispute answers. | OAuth | `https://mcp.beastinsights.com/mcp` |
| [beatandraise](plugins/beatandraise) | Search SEC filings. | None | `https://mcp.beatandraise.com/mcp` |
| [Beatwise Metronome](plugins/metronome) | Keep time, find note durations. | None | `https://metronome.zovo.one/mcp` |
| [bedrijfscijfers](plugins/bedrijfscijfers) | Belgian company financials. | OAuth | `https://api.bedrijfscijfers.be/mcp` |
| [Bedrock Estimating](plugins/bedrock-estimating) | Plans, takeoff and estimates. | OAuth | `https://bedrockestimating.com/mcp` |
| [beehiiv](plugins/beehiiv) | Run your beehiiv newsletter from chat: draft and edit posts, organize subscribers with tags, custom fields, and segments, build automations, and review publication, post, and website performance. | OAuth | `https://mcp.beehiiv.com/mcp` |
| [Beeline Workspace](plugins/beeline-workspace) | Connect Reason to Beeline. | OAuth | `https://mcp.beeline.life/mcp` |
| [Beentry](plugins/beentry) | Manage your beehives. | OAuth | `https://mcp.beentry.com/mcp` |
| [Beevi](plugins/beevi) | AI social media manager. | OAuth | `https://beevi.ai/api/mcp/mcp` |
| [Beevvy](plugins/beevvy) | Loyalty, missions and rewards. | OAuth | `https://mcp.beevvy.com/mcp` |
| [BeigeCheck](plugins/beigecheck) | Your company's facts and voice. | OAuth | `https://mcp.beigecheck.com/mcp` |
| [BEKSAR](plugins/beksar) | Shop analytics for Kazakhstan. | None | `https://mcp.beksar.kz/mcp` |
| [Belcome](plugins/belcome) | Book salons, spas and med spas. | None | `https://belcome.app/mcp` |
| [Belgian Annual Accounts](plugins/belgian-annual-accounts) | Belgian Annual Accounts. | OAuth | `https://nbb-mcp.be/mcp` |
| [BeliefState](plugins/beliefstate) | Find and compare stock ideas. | OAuth | `https://beliefstate.ai/mcp` |
| [Bench Coach](plugins/bench-coach) | Plan practices and postgames. | None | `https://getbenchcoach.com/mcp` |
| [Bencher](plugins/bencher) | Continuous Benchmarking. | OAuth | `https://mcp.bencher.dev/mcp` |
| [BencinaMCP](plugins/bencinamcp) | Chile fuel monitor. | None | `https://bencinachilemcp.kemenylabs.com/mcp` |
| [Benefits Check](plugins/pair-team-benefits-check) | Find benefits and local help. | None | `https://mcp.pairteam.com/mcp` |
| [BenIkBij](plugins/benikbij) | Manage your volleyball team. | OAuth | `https://benikbij.vercel.app/mcp` |
| [BEON PASS](plugins/beonpass) | Access wallet for AI tools. | OAuth | `https://beonpass.com/mcp` |
| [Best Lawyers](plugins/best-lawyers) | Search peer-recognized lawyers. | None | `https://mcp.bestlawyers.com/` |
| [Best Of Motivation](plugins/best-of-motivation) | Leadership quizzes and advice. | None | `https://mcp.bestofmotivation.com/mcp` |
| [BestBus](plugins/bestbus) | Thailand bus times & tickets. | None | `https://bestbus.me/mcp` |
| [BestProp.ai](plugins/bestprop-ai) | Published property research. | None | `https://api.bestprop.ai/mcp` |
| [BestRemit](plugins/bestremit) | Compare money transfer apps. | None | `https://bestremit.app/api/mcp/mcp` |
| [BestSaaSWebDesigns](plugins/bestsaaswebdesigns) | Real SaaS website designs. | None | `https://mcp.bestsaaswebdesigns.com/mcp` |
| [Better Analyst PDF to Excel](plugins/better-analyst-pdf-to-excel) | Turn PDF tables into Excel. | OAuth | `https://app.betteranalyst.com/api/mcp/connector` |
| [Better Design](plugins/better-design) | A design harness for Reason. | OAuth | `https://better-design.com/api/mcp` |
| [Better Email](plugins/better-email) | Build on-brand email campaigns. | OAuth | `https://mcp.better.email/mcp` |
| [Better Stack](plugins/better-stack) | Observability for AI agents. | OAuth | `https://mcp.betterstack.com/` |
| [BetterOff](plugins/betteroff) | Your accounts and crypto. | OAuth | `https://api.betteroff.finance/mcp` |
| [Beveled](plugins/beveled-mockups) | Screenshots to mockups. | None | `https://mcp.beveled.app/mcp` |
| [Beyond Wine](plugins/beyond-wine) | Explore specialty beverages. | None | `https://beyond.wine/mcp` |
| [Bhasini Indic Scripts](plugins/bhasini) | Spell words in Indian scripts. | None | `https://mcp.bhasini.com/mcp` |
| [Bid Protest Nexus](plugins/bid-protest-nexus) | Search GAO bid protest rulings. | None | `https://mcp.acqagent.ai/mcp` |
| [BiddingSimple](plugins/biddingsimple) | Find U.S bids and tenders. | OAuth | `https://biddingsimple.com/mcp` |
| [Bidwell Health](plugins/bidwell-health) | Understand online care options. | None | `https://tools.bidwellhealth.com/mcp` |
| [BigGeo AI](plugins/biggeo-ai) | Spatial Intelligence for LLMs. | OAuth | `https://mcp.biggeo.com/mcp` |
| [Biggy](plugins/biggy) | AI SRE for Enterprise. | OAuth | `https://mcp.biggy.io/mcp` |
| [Bilance](plugins/bilance) | Your spending and net worth. | OAuth | `https://mcp.bilanceapp.com/mcp` |
| [Bildy](plugins/bildy-media) | Create images and videos. | OAuth | `https://bildy.ai/mcp` |
| [Bilköpskollen](plugins/bilkopskollen) | Vad bilen kostar att äga. | None | `https://bilkopskollen.se/mcp` |
| [Bill Splitter](plugins/bill-splitter) | Share the check. | None | `https://bill-splitter.widgets.widget.olutely.com/mcp` |
| [Billabex](plugins/billabex) | Automate payment follow-ups. | OAuth | `https://next.billabex.com/mcp` |
| [Billwise Invoice Maker](plugins/invoice-maker) | Invoices as polished PDFs. | None | `https://invoice-maker.zovo.one/mcp` |
| [Billy Grace Insights](plugins/billy-grace-insights) | Query your marketing data. | OAuth | `https://mcp.billygrace.com/mcp` |
| [Bilt](plugins/bilt) | Build mobile apps with AI. | OAuth | `https://mcp.bilt.me/mcp` |
| [BimWired Elektroplanung Revit](plugins/bimwired-elektroplanung) | Stromkreise, VDE, DIN 18015. | None | `https://mcp.bimwired.com/mcp` |
| [Binary ATS](plugins/binary) | Manage hiring workflows. | OAuth | `https://api.binary.so/mcp` |
| [Bingers](plugins/bingers) | Track shows and movies. | OAuth | `https://api.bingers.app/mcp` |
| [BingeTube](plugins/bingetube) | Find short dramas to watch. | None | `https://binge.tube/mcp` |
| [BioFlow](plugins/bioflow) | Manage your link-in-bio page. | OAuth | `https://app.getbioflow.com/api/mcp` |
| [Biohacking Kompakt](plugins/biohacking-kompakt) | Studienlage zu Supplements. | None | `https://mcp.biohackingkompakt.de/mcp` |
| [Biohub ESM](plugins/biohub-esm) | Understand proteins with ESM. | OAuth | `https://biohub.ai/mcp` |
| [BioStacks](plugins/biostacks) | Supplements review by evidence. | None | `https://biostacks.co/mcp` |
| [Birch](plugins/birch) | Research baby & kids products. | None | `https://mcp.birchstore.com/mcp` |
| [Bird](plugins/bird) | Drive Bird from your coding agent: operate the Bird API from the terminal with the `bird` CLI, send across email, SMS, and WhatsApp, and audit a domain's email authentication. | OAuth | `https://mcp.bird.com` |
| [Birdie](plugins/birdie) | Capture customer issue context. | OAuth | `https://mcp.birdie.so/mcp` |
| [BirdieAPI](plugins/birdieapi) | Golf data and stats. | OAuth | `https://mcp.birdieapi.com/mcp` |
| [Birthprint](plugins/birthprint) | Astrology, Numerology & BaZi. | None | `https://birthprint.ai/mcp` |
| [Bites](plugins/bites) | Discover and order food. | None | `https://mcp.withbites.com/mcp` |
| [Bitmovin](plugins/bitmovin) | Invoke Bitmovin with API tools. | OAuth | `https://mcp.bitmovin.com/mcp` |
| [Bitrise](plugins/bitrise) | Set up and manage mobile CI/CD on Bitrise: build, test, and distribute iOS, Android, Flutter, and React Native apps. | OAuth | `https://mcp.bitrise.io` |
| [Bitwarden](plugins/bitwarden) | Let agents read the secrets you share from Bitwarden Secrets Manager: API keys, tokens and database URLs. | API key | `https://mcp.reasonmachines.com/bitwarden/mcp` |
| [BizBlock](plugins/bizblock) | Book salons, spas and barbers. | OAuth | `https://mcp.bizblock.io/mcp` |
| [Bizdivers](plugins/bizdivers) | Books, bills, bank and close. | OAuth | `https://api.bizdivers.com/api/v1/mcp` |
| [Bizora Tax Research](plugins/bizora-tax-research) | Research tax questions. | OAuth | `https://mcp.api-bizora.ai/mcp` |
| [BizVizCards](plugins/bizvizcards) | Manage business leads. | OAuth | `https://bizvizcards.com/api/mcp` |
| [blablabla: Learn Lines & Tape](plugins/blablabla) | Scenes, monologues & routines. | None | `https://sayblablabla.com/mcp` |
| [Black Car Service](plugins/black-car-service) | SUV quotes and reservations. | None | `https://blackcarservice.co/api/mcp` |
| [Black SEO Analyzer](plugins/black-seo-analyzer) | Technical SEO audits. | OAuth | `https://mcp.blackseoanalyzer.com/mcp` |
| [Blackbird Concierge](plugins/blackbird-concierge) | Blackbird's MCP gets you access to book, reserve, and explore reservations via OpenTable, Resy, and SevenRooms. | OAuth | `https://concierge.api.blackbird.xyz/mcp` |
| [Blackout Audio](plugins/blackout-audio) | Gear setups for any budget. | None | `https://mcp.blackoutaudio.com/mcp` |
| [BlazeHive](plugins/blazehive) | Plan, write and publish SEO. | OAuth | `https://mcp.blazehive.io/mcp` |
| [BlazeSQL](plugins/blazesql) | Query your SQL Database. | OAuth | `https://mcp.blazesql.com/mcp` |
| [Blendstra](plugins/blendstra) | Create and edit 3D in chat. | OAuth | `https://blendstra.com/mcp` |
| [BlindOracle Agent Trust](plugins/blindoracle-agent-trust) | Check an AI agent's record. | None | `https://api.craigmbrown.com/v1/mcp` |
| [Blink](plugins/blink) | Build websites and mobile apps. | OAuth | `https://blink.new/mcp` |
| [Blinq](plugins/blinq) | Find contacts and search notes. | OAuth | `https://mcp.blinq.me/mcp` |
| [BlitzReels](plugins/blitzreels) | Turn recordings into clips. | OAuth | `https://blitzreels.com/api/mcp` |
| [Blockscout Blockchain Data](plugins/blockscout-blockchain-data) | Find & analyze blockchain data. | None | `https://mcp.blockscout.com/mcp` |
| [BlockSurvey](plugins/blocksurvey) | Create and manage surveys. | OAuth | `https://mcp.blocksurvey.io/mcp` |
| [Blockworks](plugins/blockworks) | Find crypto & blockchain data. | OAuth | `https://mcp.blockworks.com/mcp` |
| [Blog2Video](plugins/blog2video) | Convert link/doc to video. | OAuth | `https://api.blog2video.app/mcp/sse` |
| [Bloom](plugins/bloom) | Design in Bloom. | OAuth | `https://api.bloom.diy/mcp` |
| [Blotato](plugins/blotato) | Schedule social posts & DMs. | OAuth | `https://mcp.blotato.com/mcp` |
| [BLS OEWS by 1102tools](plugins/bls-oews-by-1102tools) | Explore occupational wages. | None | `https://bls-oews.1102tools.com/mcp` |
| [Bluedot](plugins/bluedot) | Search and review meetings. | OAuth | `https://app.bluedothq.com/api/v1/mcp` |
| [Blueprint Studio](plugins/blueprint-studio) | Images that match your brand. | OAuth | `https://tools.blueprintstudio.ai/api/mcp` |
| [BluTranslate](plugins/blutranslate) | Translate PDFs and documents. | OAuth | `https://mcp.bluente.com/mcp` |
| [BoardMark](plugins/boardmark) | Issues, sprints and team docs. | OAuth | `https://mcp.boardmark.ai/mcp` |
| [boardroomlist.com](plugins/boardroomlist) | Senior jobs at the Fortune 500. | None | `https://boardroomlist.com/api/mcp` |
| [BoardWise](plugins/boardwise) | Help with Board Matters. | None | `https://boardwise.online/mcp` |
| [BOIM 보임](plugins/boim-korea-businesses) | Find Korean businesses. | None | `https://boim.io/mcp` |
| [Bolter Connect](plugins/bolter-connect) | Chat with people and agents. | OAuth | `https://bolter.chat/mcp` |
| [BoltWright](plugins/boltwright) | Your commercial HVAC shop. | OAuth | `https://app.boltwright.com/mcp` |
| [Boluda](plugins/boluda) | Find courses and podcasts. | None | `https://mcp.boluda.com/mcp` |
| [Bonder](plugins/bonder) | Plan trips with your group. | OAuth | `https://mcp.bonder.us/mcp` |
| [Bonfire](plugins/bonfire) | Custom Apparel & Merch Tool. | None | `https://mcp.bonfire.com/mcp` |
| [Book Direct](plugins/book-direct) | No commission deals for hotels. | None | `https://app.book-direct.co/mcp` |
| [Book with Schedulo](plugins/book-with-schedulo) | Book and manage meetings. | None | `https://mcp.bookwithschedulo.com/mcp` |
| [BookBidder](plugins/bookbidder) | Amazon Ads and book profits. | OAuth | `https://mcp.bookbidder.ai/mcp` |
| [Booking Wolf](plugins/booking-wolf) | Hotels, tours and activities. | None | `https://mcp.bookingwolf.com/mcp` |
| [Bookipi](plugins/bookipi) | Invoicing & business admin. | OAuth | `https://mcp.bookipi.com/mcp` |
| [Booklee](plugins/booklee) | Bookings and business tools. | None | `https://booklee.app/api/mcp/chatgpt` |
| [BookYolo](plugins/bookyolo) | Sanity Check Your Next Stay. | OAuth | `https://mcp.bookyolo.com/mcp` |
| [Bool](plugins/bool) | Make your own apps and tools. | OAuth | `https://bool.com/api/mcp` |
| [Boopreel Pet Clips](plugins/boopreel) | Pet photo to fun video clip. | None | `https://routeframe.ambientapp.ai/mcp/claude` |
| [Booqer](plugins/booqer) | Book local home-service pros. | None | `https://booqer.ai/mcp` |
| [Boords](plugins/boords) | Script and storyboard videos. | OAuth | `https://mcp.boords.com/mcp` |
| [Boostermage](plugins/boostermage) | Compare UK MTG prices. | None | `https://mcp.boostermage.com/mcp` |
| [BoothIQ](plugins/boothiq) | Ask about your event leads. | OAuth | `https://getboothiq.com/mcp` |
| [Borderless Budget](plugins/borderless-budget) | Ask about your money. | OAuth | `https://app.borderlessbudget.com/mcp` |
| [Boring Data Platform](plugins/boring-data-platform) | Federal procurement research. | OAuth | `https://www.boringdataplatform.com/api/mcp` |
| [Born To Banger](plugins/born-to-banger) | Make your event unforgettable. | None | `https://borntobanger.in/api/mcp` |
| [BoslogShip](plugins/boslogship) | Compare US parcel rates. | None | `https://mcp.boslogship.com/mcp` |
| [Bota](plugins/bota) | Ask about your conversations. | OAuth | `https://mcp.getbota.com/mcp` |
| [Boulie](plugins/boulie) | Plan and review training. | OAuth | `https://mcp.boulie.ai/mcp` |
| [BouquetOS](plugins/bouquetos) | Run your flower shop's orders. | OAuth | `https://mcp.bouquetos.com/mcp` |
| [Bowtie One](plugins/bowtie-one) | Build and review bowtie risks. | OAuth | `https://app.bowtie.one/api/mcp` |
| [Boxerbook](plugins/boxerbook) | Boxing schedules and records. | None | `https://mcp.boxerbook.com/mcp` |
| [BoxItem](plugins/boxitem) | Your home inventory, by chat. | OAuth | `https://boxitem.app/mcp` |
| [BoxToPlay](plugins/boxtoplay) | Manage game servers and VPS. | OAuth | `https://api.boxtoplay.com/mcp` |
| [Boy or Girl Names](plugins/boy-or-girl-names) | Find baby names by letter. | None | `https://boyorgirlnames.com/mcp` |
| [Braintrust](plugins/braintrust) | Connect Reason to Braintrust MCP and trace agent sessions. | OAuth | `https://api.braintrust.dev/mcp` |
| [Brand24](plugins/brand24) | Analyze online discussions. | OAuth | `https://mcp.brand24.com/v1/mcp` |
| [Brandi AI](plugins/brandi-ai) | Analyze and refine your brand. | None | `https://mcp.meet-brandi.com/mcp` |
| [Brandwave](plugins/brandwave) | See what your marketing did. | OAuth | `https://mcp.gobrandwave.com/mcp` |
| [Brava](plugins/brava) | CRM, Analytics & Marketing. | OAuth | `https://mcp.brava.cards/mcp` |
| [Bravos AI](plugins/bravos-ai) | Train and manage your chatbot. | OAuth | `https://mcp.bravos-ai.com/mcp` |
| [Breakcold](plugins/breakcold) | Manage your Breakcold CRM. | OAuth | `https://mcp.breakcold.com/mcp/v1` |
| [Breakroom](plugins/break-room) | A daily question in links. | OAuth | `https://breakroom.si/mcp` |
| [BreckenWander Travel](plugins/breckenwander-travel) | Find flights, hotels & tours. | None | `https://mcp.breckenwander.com/mcp` |
| [Breeze](plugins/breeze) | Manage projects and tasks. | OAuth | `https://mcp.breeze.pm/mcp` |
| [Brek - Hotel Wholesale Booking](plugins/brek-hotel-wholesale-booking) | Find wholesale hotel rates. | None | `https://mcp.brek.com/mcp` |
| [Brevo (API key)](plugins/brevo-api-key) | Manage contacts, email and SMS campaigns, and CRM deals. | API key | `https://mcp.brevo.com/v1/brevo/mcp` |
| [Brex](plugins/brex) | Query expenses, receipts, bills, cards, and travel. | OAuth | `https://api.brex.com/mcp` |
| [BRF-Rapporten](plugins/brf-rapporten) | Sök BRF-nyckeltal. | None | `https://brfrapporten.se/mcp` |
| [Brick & Mortar Public Records](plugins/brick-and-mortar-public-records) | Public records and teardowns. | None | `https://brickandmortar.dev/mcp` |
| [Brick Budget](plugins/brickbudget) | Explore LEGO® sets and prices. | None | `https://mcp.brickbudget.com/api/mcp` |
| [Brickfact](plugins/brickfact) | Compare LEGO shopping offers. | None | `https://mcp.brickfact.com/mcp` |
| [Briefcase](plugins/briefcase) | AI-native bookkeeping & ledger. | OAuth | `https://api.briefcase.so/mcp` |
| [Bright](plugins/bright) | Evidence for AI progress. | None | `https://brightaifuture.com/api/mcp` |
| [BrightSite](plugins/brightsite) | Build and manage websites. | OAuth | `https://onbrightsite.com/api/mcp` |
| [BrinkerAdvisor Rates](plugins/brinkeradvisor-rates) | Compare current rates. | None | `https://mcp.brinkeradvisor.com/mcp` |
| [Brisk Teaching](plugins/brisk-teaching) | Create classroom activities. | OAuth | `https://mcp.briskteaching.com/mcp` |
| [Broker Genius](plugins/broker-genius) | Find HS codes for products. | OAuth | `https://brokergenius.ai/api/gpt/mcp.php` |
| [BROSH CRM](plugins/brosh-crm) | CRM with AI employees. | OAuth | `https://mcp.brosh.io/mcp` |
| [BTC DCA Engine](plugins/btc-dca-engine) | Historical DCA simulator. | None | `https://btcdcaengine.com/mcp` |
| [Btoo](plugins/btoo) | Manage business ops. | OAuth | `https://mcp.btoo.in/mcp` |
| [Bubble](plugins/bubble) | Build and edit Bubble apps. | OAuth | `https://mcp.bubble.io/mcp` |
| [buddydayplanner](plugins/buddydayplanner) | Send tasks to Buddy's Drafts. | OAuth | `https://buddydayplanner.com/mcp` |
| [Budget Tracker by Smart Money](plugins/smart-money-tracker) | Track expenses & budgets. | OAuth | `https://smart-money.ink/mcp` |
| [BugSmash](plugins/bugsmash) | Instant Feedback & Collab. | OAuth | `https://api.bugsmash.io/mcp` |
| [BuildCheap](plugins/buildcheap) | Publish sites to a live URL. | OAuth | `https://www.buildcheap.app/api/mcp/mcp` |
| [Builderii](plugins/builderii) | Design screens and diagrams. | OAuth | `https://app.builderii.com/mcp` |
| [Buildfire](plugins/buildfire) | Manage app operations. | OAuth | `https://mcp.buildfire.com/mcp` |
| [Buildkite](plugins/buildkite) | Buildkite's hosted MCP server: inspect pipelines, builds, jobs and logs, trigger and retry builds, and look up test analytics and cluster/agent status. | OAuth | `https://mcp.buildkite.com/mcp` |
| [Buildory](plugins/buildory) | Manage your maker projects. | OAuth | `https://buildory.app/mcp` |
| [Buildy Website & App Builder](plugins/buildy-website-app-builder) | Sites, stores, apps & funnels. | OAuth | `https://www.buildy.ai/api/mcp` |
| [BulkTranscripts](plugins/bulktranscripts) | YouTube video transcripts. | OAuth | `https://bulktranscripts.co/mcp` |
| [Bull AI](plugins/bull-ai) | Indian stock market documents. | OAuth | `https://mcp.bull-ai.in/mcp` |
| [Bullflow](plugins/bullflow) | Options flow and market data. | None | `https://api.bullflow.io/mcp` |
| [BULLS CRM](plugins/bulls-crm) | Your phone prospecting CRM. | OAuth | `https://bulls-crm.bullaria.com/mcp` |
| [Bulugo](plugins/bulugo) | Marine fuel marketplace. | None | `https://my.bulugo.com/v1/mcp` |
| [BunnyOwn](plugins/bunnyown) | Manage websites and bookings. | OAuth | `https://mcp.bunnyown.com/mcp` |
| [Burner Mail](plugins/burner-mail) | Create private email aliases. | OAuth | `https://burnermail.io/mcp` |
| [BurnWeek](plugins/burnweek) | AI calorie counter, food diary. | OAuth | `https://mcp.burnweek.fit/mcp` |
| [Buscalibre](plugins/buscalibre) | Find books with local prices. | None | `https://mcp.buscalibre.com/mcp` |
| [Butler by MyButlerDid.it](plugins/mybutlerdidit-openai-v2) | Household memory & follow-up. | OAuth | `https://mybutlerdid.it/mcp` |
| [Butter](plugins/butter) | Make editable videos. | None | `https://ai.butter.video/mcp` |
| [BUY HARD](plugins/buy-hard) | Your business buying desk. | OAuth | `https://reliable-albatross-463.convex.site/mcp` |
| [Buy Or Rent Simulator](plugins/buy-or-rent-simulator) | Compare buying vs renting home. | None | `https://acheter-ou-louer-mcp.petirico.workers.dev/mcp` |
| [BuyerTwin](plugins/buyertwin) | Buyer intelligence for GTM. | OAuth | `https://mcp.buyertwin.com/mcp` |
| [BuyRecord](plugins/buyrecord) | Return facts before you buy. | None | `https://api.buyrecord.app/mcp` |
| [BuySignal](plugins/buysignal) | Find live UK & CA deals. | None | `https://buysignal.deals/mcp` |
| [BuyWise](plugins/buywise) | Find best prices, real reviews. | None | `https://deeplumen.shop/mcp` |
| [Buzzedin](plugins/leaseswap) | Find your next NYC apartment. | None | `https://buzzedin.com/mcp` |
| [BuzzerAPI](plugins/buzzerapi) | Manage building access. | OAuth | `https://api.buzzerapi.com/mcp` |
| [Buzzfy](plugins/buzzfy) | Manage your Instagram in chat. | OAuth | `https://mcp.buzzfy.co/mcp` |
| [BuzzSearch](plugins/buzzsearch) | Search real customer comments. | OAuth | `https://buzzsearch.ai/api/mcp` |
| [Buzzterms](plugins/buzzterms) | Tech terms, explained simply. | None | `https://buzzterms.com/api/mcp` |
| [Buzzy](plugins/buzzy) | Create images, videos, and ads. | OAuth | `https://mcp.buzzy.now/mcp` |
| [Bybit](plugins/bybit) | Real-time crypto market data. | None | `https://agent.bybit.com/mcp/chatgpt` |
| [Bynn](plugins/bynn) | Detect Fraud in Images and PDF. | OAuth | `https://mcp.bynn.com/` |
| [Bytetravel](plugins/bytetravel) | Insurance, eSIM, Visas & VIP. | None | `https://mcp.bytetravel.com/mcp` |
| [Cabinet Project](plugins/cabinet-project) | Quotes, jobs, cabinet prices. | OAuth | `https://mcp.cabinetproject.app/mcp` |
| [Cadabra AI](plugins/cadabra) | Make films, videos and images. | OAuth | `https://mcp.livinginmovie.com/mcp` |
| [Cadencz](plugins/cadencz) | Plan and schedule social posts. | OAuth | `https://api.cadencz.com/mcp` |
| [Caipi](plugins/caipi) | The agent-native workspace. | OAuth | `https://caipi.ai/mcp` |
| [CAIRO Medicines](plugins/cairo-medicines) | Explore official drug labels. | None | `https://medicines.cairoplatform.com/mcp` |
| [Cal Plus](plugins/cal-plus) | Personal Nutrition Coach. | OAuth | `https://mcp.calplus.app/mcp` |
| [Cal.com](plugins/cal-com) | Schedule and manage meetings. | OAuth | `https://mcp.cal.com/mcp` |
| [CalcForms](plugins/calcforms) | Build and publish calculators. | OAuth | `https://badabingapp.cc/mcp` |
| [Calendesk](plugins/calendesk) | Your scheduling assistant. | OAuth | `https://mcp.calendesk.com/` |
| [Calendly](plugins/calendly) | Check availability and book, cancel, or reschedule. | OAuth | `https://mcp.calendly.com/` |
| [Call Trace](plugins/call-trace) | Review calls and transcripts. | OAuth | `https://call-trace.com/mcp` |
| [CALL-E](plugins/call-e) | Make phone calls for you. | OAuth | `https://seleven-mcp-sg.airudder.com/mcp` |
| [call4me](plugins/call4me) | Calls businesses for you. | OAuth | `https://call4.me/mcp` |
| [CallForMe](plugins/callforme) | Your agent calls businesses. | OAuth | `https://callforme.tel/mcp` |
| [Calligraphy Maker by Studio99](plugins/studio99-calligraphy-maker) | Create Indic calligraphy art. | OAuth | `https://mcp.studio99.app/api/mcp` |
| [Caly](plugins/caly) | Book and manage meetings. | OAuth | `https://mcp.trycaly.com/mcp` |
| [Camberstack: Google Ads](plugins/camberstack) | Google Ads you approve, undo. | OAuth | `https://camberstack.io/mcp` |
| [Cambridge China Bridge](plugins/cambridge-china-bridge) | UK import duty and sourcing. | None | `https://camchinabridge.co.uk/mcp` |
| [camelRun](plugins/camelrun) | Build and host AI agents. | OAuth | `https://run.camelai.com/mcp` |
| [Camper Champ](plugins/camper-champ) | Compare campervan hire. | None | `https://mcp.camperchamp.com/mcp` |
| [Campus OS](plugins/campus-os) | Classes, notes and due dates. | OAuth | `https://app.campus-os.net/mcp` |
| [Cancel My Sub](plugins/cancel-my-sub) | Cancel subscriptions. | None | `https://goodturn-mcp.pages.dev/cancelmysub/mcp` |
| [Când Reciclăm](plugins/cand-reciclam) | Bucharest recycling schedules. | None | `https://cand-reciclam.madeinro.eu/mcp` |
| [Candor Finance](plugins/candor-finance) | Your budget and money goals. | OAuth | `https://api.candor.money/mcp` |
| [Canonical Company Search](plugins/canonical-company-search) | Find and enrich companies. | OAuth | `https://trycanonical.ai/mcp` |
| [Canvora](plugins/canvora) | Create on-brand visuals. | OAuth | `https://api.canvora.ai/mcp` |
| [Capable Cap Table](plugins/capable-cap-table) | AI-native cap table platform. | OAuth | `https://capable.so/api/mcp` |
| [Capacities](plugins/capacities) | Access personal knowledge. | OAuth | `https://api.capacities.io/mcp` |
| [Cape Partners](plugins/cape-partners) | Find M&A targets and buyers. | None | `https://www.capepartners.fr/mcp` |
| [Capi Agent for Merchants](plugins/capi-agent-for-merchants) | Run your store from Reason. | OAuth | `https://capiagent.com/api/mcp/merchant` |
| [CapitalDart](plugins/capitaldart) | Find investors for your raise. | OAuth | `https://capitaldart.com/mcp` |
| [CapitalGainsTax.net](plugins/capital-gains-tax-calculator) | Rates, rules and the tax owed. | None | `https://capitalgainstax.net/mcp` |
| [Capycash](plugins/capycash) | Track spending and savings. | OAuth | `https://mcp-server.capycashapp.com/mcp` |
| [Car Dealer Tracker](plugins/car-dealer-tracker) | Review dealership records. | OAuth | `https://mcp.cardealertracker.app/mcp` |
| [Car Handshake](plugins/car-handshake) | Find and compare cars for sale. | None | `https://mcp.carhandshake.com/mcp` |
| [Car Image API](plugins/car-image-api) | Vehicle images in your chat. | OAuth | `https://carimage.dev/api/mcp` |
| [Car Tax Check](plugins/cartaxcheck) | Check vehicle tax, MOT & more. | OAuth | `https://mcp.cartaxcheck.co.uk/mcp` |
| [Carabela – Public tenders](plugins/carabela-licitaciones) | Find open public tenders. | None | `https://app.carabela.ai/api/mcp` |
| [Carat](plugins/carat) | Create AI images and videos. | OAuth | `https://mcp.carat.im/mcp` |
| [Card.ai](plugins/card-ai) | Create and study flashcards. | OAuth | `https://mcp.cardai.app/` |
| [Cardboard](plugins/cardboard) | Edit videos right in Reason. | OAuth | `https://mcp.cardboard.ai/mcp` |
| [Cardwell: Credit Card Picker](plugins/cardwell-credit-card-picker) | Find the right credit card. | None | `https://cardwell-card-match.cabaci.chatgpt.site/api/mcp` |
| [Career Adapter](plugins/career-adapter) | Tailor your resume to any job. | OAuth | `https://mcp.careeradapter.ai/mcp` |
| [Career Passport（キャリアパスポート）](plugins/career-passport) | 学びをキャリアにつなぐ. | OAuth | `https://mcp.careerpassport.id/mcp` |
| [Caretta](plugins/caretta) | Unlock your sales calls. | OAuth | `https://gateway.caretta.app/mcp` |
| [CarGene](plugins/cargene) | Look up Japanese car history. | None | `https://api.car-gene.com/mcp` |
| [Cargo](plugins/cargo) | Your GTM in Reason. | OAuth | `https://mcp.getcargo.ai/mcp` |
| [CarHauler247 - Car Shipping](plugins/carhauler247-car-shipping-quotes) | Car shipping & auto transport. | None | `https://carhauler247.com/mcp` |
| [Carhopp](plugins/carhopp) | Compare car rentals worldwide. | None | `https://mcp.carhopp.bot/mcp` |
| [Caribooks](plugins/caribooks) | Talk to your books. | OAuth | `https://caribooks.com/api/mcp` |
| [Carlos Rodriguez](plugins/carlos-rodriguez) | Tu asesor de autos. | None | `https://mcp.teamcarlosrodriguez.com/` |
| [Carly](plugins/carly) | Email, CRM, and workflows. | OAuth | `https://carlyassistant.com/mcp/` |
| [Carousel](plugins/carousel) | Screen and verify applicants. | OAuth | `https://mcp.oncarousel.com/mcp` |
| [Carryo website publisher](plugins/carryo-website-publisher) | Publish a website. | OAuth | `https://mcp.carryo.io/mcp` |
| [CARS24](plugins/cars24) | Find your dream car. | None | `https://mcp.cars24.com/` |
| [CarsLink.ai](plugins/carslink-ai) | Search UK cars, vans & bikes. | None | `https://mcp.carslink.ai/mcp` |
| [Cartão de Benefícios Brasil](plugins/cartao-de-beneficios-brasil) | Clube de benefícios próprio. | None | `https://mcp.cartaodebeneficios.com.br/mcp` |
| [Cartly+](plugins/cartly-plus) | Manage shared shopping lists. | OAuth | `https://mcp.cartly.plus/mcp` |
| [Cartographer](plugins/cartographer) | Story mapping tool. | OAuth | `https://cartographer.studio/mcp` |
| [Cartomante FC](plugins/cartomante-fc) | Análise e times do Cartola FC. | OAuth | `https://mcp.cartomantefc.com.br/mcp` |
| [CarWhere](plugins/carwhere) | VIN & window sticker lookup. | None | `https://carwhere.com/api/mcp` |
| [Cashback Hive: Deals & Coupons](plugins/cashback-hive-deals-and-coupons) | Save on every purchase. | OAuth | `https://mcp.cashbackhive.com/mcp` |
| [cast0](plugins/cast0) | Turn any text into a podcast. | OAuth | `https://api.cast0.ai/mcp` |
| [Castworth](plugins/castworth) | Your money, and what's coming. | OAuth | `https://mcp.castworth.com/mcp` |
| [Catchr](plugins/catchr) | Analyze your marketing data. | OAuth | `https://api.catchr.io/mcp` |
| [Catholic Index](plugins/catholic-index) | Find Mass times and churches. | None | `https://mcp.catholicindex.org/mcp` |
| [CazVid Job Search](plugins/cazvid-search) | Find jobs and view details. | API key | `https://mcp.cazvid.com/mcp` |
| [CB Insights](plugins/cb-insights) | Predictive intelligence. | OAuth | `https://mcp.cbinsights.com/` |
| [CBS SAP AI](plugins/cbs-sap-ai) | Manage SAP Business One. | None | `https://mcp.clockwork.in/mcp` |
| [CData Connect AI](plugins/cdata-connect-ai) | CData Connect AI integration for querying 350+ data sources through a managed MCP platform | OAuth | `https://mcp.cloud.cdata.com/mcp` |
| [CellCog](plugins/cellcog) | Briefs in, finished work out. | OAuth | `https://cellcog.ai/mcp` |
| [Cello](plugins/cello) | Query your Cello referral program: check integration health, inspect events, find top referrers, and review program performance | OAuth | `https://mcp.cello.so/mcp` |
| [Celpify](plugins/celpify) | CELPIP practice and scores. | None | `https://api.celpify.com/mcp` |
| [CenterPanel](plugins/centerpanel) | Manage assets, work and trips. | OAuth | `https://mcp.centerpanel.com/mcp` |
| [Central City](plugins/central-city) | Rooms where AIs work together. | OAuth | `https://centralcity.ai/mcp` |
| [Centre Biz Yourself™](plugins/centre-pilotage-biz-yourself) | Tes Coachs IA Biz Yourself. | None | `https://biz-yourself-zone-genie.round-base-41e7.workers.dev/mcp` |
| [Cerca.me](plugins/cerca-me) | Your places, in your AI. | OAuth | `https://cerca.me/mcp` |
| [CertArc](plugins/certarc) | CISSP, CISM, CISA, AAISM, AAIA. | OAuth | `https://certarc.com/mcp` |
| [CertScore.ai Privacy Scanner](plugins/certscore-ai-privacy-scanner) | GDPR, cookies & trackers. | OAuth | `https://mcp.certscore.ai/mcp` |
| [CFDB](plugins/cfdb) | Consulta el fútbol chileno. | OAuth | `https://mcp.cfdb.cl/` |
| [Cflow](plugins/cflow) | Manage Cflow workflows. | OAuth | `https://mcp.cflowapps.com/mcp` |
| [Chainels](plugins/chainels) | Manage your Chainels community. | OAuth | `https://mcp.chainels.com/mcp` |
| [Chaiz](plugins/chaiz) | Compare car warranty quotes. | None | `https://mcp.chaiz.com/mcp` |
| [Chalet](plugins/chalet) | Airbnb market data & estimates. | None | `https://mcp.getchalet.com/mcp` |
| [Champfy](plugins/champfy) | Find tennis/pickleball partner. | None | `https://champfy.com/api/mcp` |
| [Changelly](plugins/changelly) | Crypto swap rates & estimates. | None | `https://gpt-widget.changelly.com/mcp` |
| [Channel3 Shopping](plugins/channel3-shopping) | Shop products across the web. | None | `https://mcp.trychannel3.com/` |
| [ChannelzIQ](plugins/channelziq) | YouTube analytics and planning. | OAuth | `https://mcp.channelziq.com/mcp` |
| [Channlworks](plugins/channlworks) | Alliance Intelligence Platform. | OAuth | `https://mcp.channlworks.com/v2/mcp` |
| [Chapa](plugins/chapa) | Developer evidence and badges. | None | `https://chapa.thecreativetoken.com/api/mcp` |
| [Chaptershift](plugins/chaptershift) | Plan and write your novel. | OAuth | `https://api.chaptershift.com/mcp` |
| [Character App](plugins/charactr) | Create characters and stories. | OAuth | `https://mcp.character.app/mcp` |
| [CharGen](plugins/chargen) | RPG worlds, media, game assets. | OAuth | `https://api.char-gen.com/mcp` |
| [Charmshots](plugins/charmshots) | Browse saved photoshoots. | OAuth | `https://mcp.charmshots.com/mcp` |
| [Chartd](plugins/chartd) | Find local events. | None | `https://mcp.chartdapp.com/mcp` |
| [ChartMogul](plugins/chartmogul) | Revenue and growth insights. | OAuth | `https://mcp.chartmogul.com/` |
| [Charts by Szum](plugins/charts-by-szum) | Turn data into polished charts. | OAuth | `https://szum.io/mcp` |
| [Chaser](plugins/chaser) | Manage Slack tasks with AI. | OAuth | `https://api.trychaser.com/mcp` |
| [Chasync](plugins/chasync) | Manage sales workflows. | OAuth | `https://mcp.chasync.com/mcp` |
| [ChatAcademia](plugins/chatacademia-research) | Research papers and grants. | OAuth | `https://api.chatacademia.com/mcp` |
| [ChatARV](plugins/chatarv) | Real estate comps and ARV. | OAuth | `https://chatarv.ai/mcp` |
| [ChatbotGen](plugins/chatbotgen) | Build a website chatbot. | None | `https://www.chatbotgen.com/mcp` |
| [ChatData Sync](plugins/chatdata-sync) | Your records, across AI. | OAuth | `https://chatdatasync.com/api/mcp` |
| [Chatfuel](plugins/chatfuel) | AI agents for customer chats. | OAuth | `https://mcp.chatfuel.com/panel` |
| [ChatifyIT](plugins/chatifyit) | Save post & email drafts. | OAuth | `https://chatifyit.com/mcp` |
| [ChatPRD](plugins/chatprd) | Product requirements in your editor. | None | `https://app.chatprd.ai/mcp` |
| [Chauffeur Base](plugins/chauffeur-base) | Manage your VTC fleet. | OAuth | `https://app.chauffeur-base.com/mcp` |
| [ChauffeurFlow](plugins/chauffeurflow) | Find private chauffeurs. | None | `https://chauffeurflow.com/mcp` |
| [Cheap NY Publication](plugins/cheap-ny-publication) | NY LLC deadlines and prices. | None | `https://cheapnypublication.com/mcp` |
| [Cheapest Domains](plugins/cheapest-domains) | Compare domain renewal prices. | None | `https://cheapest.domains/mcp` |
| [CheckFitment](plugins/checkfitment) | Bolt pattern and wheel fitment. | None | `https://checkfitment.com/mcp` |
| [Checkin](plugins/checkin) | Analyze event performance. | OAuth | `https://mcp.checkinevent.com/mcp` |
| [Checkout Page](plugins/checkout-page) | Tickets, memberships & forms. | OAuth | `https://mcp.checkoutpage.com/` |
| [Cheerful](plugins/cheerful) | Find creators, send outreach. | OAuth | `https://mcp.cheerful.ai/mcp` |
| [Cherry Notes](plugins/cherry-notes) | A todo list AI can finish. | OAuth | `https://api.cherrynotes.app/mcp` |
| [CherryDrop](plugins/cherrydrop) | Save and share your drops. | OAuth | `https://cherry-drop.io/mcp` |
| [Chess by Max Health](plugins/chess-by-max-health) | Play and analyze chess games. | OAuth | `https://mcp.maxhealth.tech/mcp` |
| [Chess Goat](plugins/chess-goat) | Chess lessons from your games. | None | `https://trychessgoat.com/mcp` |
| [Chessigma](plugins/chessigma) | Openings, puzzles, game facts. | None | `https://chessigma.com/api/mcp` |
| [Chessy](plugins/chessy) | Play Chess Against Reason. | None | `https://chess.altmatter.com/mcp` |
| [Chiho AI](plugins/chiho-ai) | Unofficial Telegram CRM. | OAuth | `https://api.chiho.ai/mcp` |
| [China Footnotes](plugins/china-footnotes) | China travel facts & tips. | None | `https://chinafootnotes.com/mcp` |
| [Choice Mutual](plugins/choice-mutual) | Life & Final Expense Insurance. | None | `https://cm-gpt-app-main.up.railway.app/mcp` |
| [ChooseCruise](plugins/choosecruise) | Find and compare cruises. | None | `https://mcp.choose-cruise.com/mcp` |
| [Chowdeck](plugins/chowdeck) | Order food and track delivery. | OAuth | `https://mcp.chowdeck.com/mcp` |
| [Chronograph LP](plugins/chronograph) | Your trusted portfolio data. | OAuth | `https://ai.chronograph.pe/mcp` |
| [Chunkplay Stats](plugins/chunkplay-stats) | NFL stats with sources. | None | `https://chunkplaystats.com/mcp` |
| [Churn Solution](plugins/churn-solution) | Retain revenue and customers. | OAuth | `https://mcp.churnsolution.com/mcp` |
| [CI HUB](plugins/ci-hub) | Manage your DAM assets. | OAuth | `https://mcp.ci-hub.com/mcp` |
| [Ciarem AI](plugins/ciarem) | WhatsApp & Instagram AI agent. | OAuth | `https://api.ciarem.ai/mcp` |
| [Cimri](plugins/cimri) | Compare retail prices. | None | `https://mcp.cimri.com/mcp` |
| [Cinch](plugins/cinch) | Manage project work. | OAuth | `https://app.cinch.work/mcp` |
| [CineOS](plugins/cineos) | Find what's on at UK cinemas. | None | `https://app.cineos.co/api/mcp` |
| [CineSenseAI](plugins/cinesenseai) | Films by mood, age and content. | None | `https://api.cinesenseai.com/mcp` |
| [CipherForces Print](plugins/cipherforces-print) | Instant print prices. | None | `https://cipherforces.com/mcp` |
| [Circle](plugins/circle) | Circle's hosted developer MCP server: real-time guidance on Circle SDKs and documentation for USDC payments, cross-chain transfers, wallets and smart contracts. | None | `https://api.circle.com/v1/codegen/mcp` |
| [Circleback](plugins/circleback) | Search meetings, transcripts, action items, and emails. | OAuth | `https://circleback.ai/api/mcp` |
| [Circlemark](plugins/circlemark) | CRE maturities, who to reach. | OAuth | `https://circlemark.ai/api/mcp` |
| [Ciro](plugins/ciro) | Sell-out and stock analytics. | OAuth | `https://api.heyciro.com/mcp` |
| [Cirra AI](plugins/cirra-ai) | Administer your CRM. | OAuth | `https://mcp.cirra.ai/mcp` |
| [Cisco ThousandEyes](plugins/thousandeyes) | Connect Reason to ThousandEyes MCP endpoints for network intelligence workflows. | OAuth | `https://api.thousandeyes.com/mcp` |
| [CiteCheck](plugins/citecheck) | Check citation, find authority. | None | `https://objectionacademy.com/mcp` |
| [CitedEvidence](plugins/citedevidence) | Real papers, checked citations. | OAuth | `https://citedevidence.com/mcp` |
| [CiteLaw](plugins/citelaw) | Legal research & firm ops. | OAuth | `https://citelaw.org/api/mcp/protocol` |
| [CiteLLM](plugins/citellm) | Cited answers from your PDFs. | OAuth | `https://mcp.citellm.com/mcp` |
| [Citiwise](plugins/citiwise) | What UDCPR allows on your plot. | None | `https://citiwise.in/mcp` |
| [Citron](plugins/citron) | Save, find and plan recipes. | OAuth | `https://mcp.citronapp.co/mcp` |
| [Citya Immobilier](plugins/citya-immobilier) | Citya properties in Reason. | None | `https://mcp.citya.com/mcp` |
| [Clairwave](plugins/clairwave) | Ocean acoustics & live ships. | None | `https://www.clairwave.com/mcp` |
| [Clak](plugins/clak) | Read notes and meetings. | OAuth | `https://clak.ai/mcp` |
| [Clarifo](plugins/clarifo) | Company financial research. | OAuth | `https://mcp.clarifo.com/mcp` |
| [Clarify](plugins/clarify) | Search and update CRM records, lists, campaigns, and meetings in Clarify. | OAuth | `https://api.clarify.ai/mcp` |
| [Clariia AI Inbox](plugins/clariia-ai-inbox) | Review AI-created work. | OAuth | `https://clariia.com/mcp` |
| [ClarioMoney](plugins/clariomoney) | Invoices and bookkeeping. | OAuth | `https://clariov4.cloud/mcp` |
| [Clarity AI](plugins/clarity-ai) | Extra-financial risk analysis. | None | `https://clarity-sfdr20-mcp.pro.clarity.ai/mcp` |
| [Clarity Decision Matrix](plugins/decision-matrix) | Weighted choice sensitivity. | None | `https://decision-matrix.zovo.one/mcp` |
| [ClarityTrack](plugins/claritytrack) | See your plan in Reason. | OAuth | `https://claritytrack.ai/mcp` |
| [Clarmix](plugins/clarmix) | Google Ads & Shopping insights. | OAuth | `https://api.clarmix.com/mcp` |
| [Clasora Tutor Finder](plugins/clasora-tutor-finder) | Find a tutor for a lesson. | None | `https://mcp.clasora.com/mcp` |
| [Class Key](plugins/class-key) | 先生のプロンプトを、コードひとつで生徒へ. | None | `https://mcp.ai-eigo-lab.com/mcp` |
| [Classic Audioguide](plugins/classic-audioguide) | Museum exhibition guide. | None | `https://classicaudioguide.com/mcp` |
| [ClassWise School & District](plugins/classwise-school-and-district) | School & district insights. | OAuth | `https://mcp.class-wise.com/mcp` |
| [ClauseAI](plugins/clauseai) | Draft startup legal documents. | OAuth | `https://exe.xyz/mcp` |
| [ClawCall](plugins/clawcall) | Make and manage phone calls. | OAuth | `https://api.clawcall.dev/mcp` |
| [Clawfight](plugins/clawfight) | AI fighters battle live. | None | `https://clawfight.ai/mcp` |
| [Clay](plugins/clay) | Enrich people and companies, run AI research agents. | OAuth | `https://api.clay.com/v3/mcp` |
| [Clean Notes](plugins/clean-notes) | Manage projects and tasks. | OAuth | `https://cleannotes.app/mcp` |
| [CleanApp](plugins/cleanapp) | Find and report problems. | None | `https://live.cleanapp.io/openai/mcp` |
| [CleanMyList](plugins/cleanmylist) | Verify emails and clean lists. | OAuth | `https://cleanmylist.io/mcp` |
| [CleanWhale Booking](plugins/cleanwhale-booking) | Book cleanings worldwide. | None | `https://mcp.cleanwhale.pl/mcp` |
| [Clear Energy Facts](plugins/clear-energy-facts) | Compare electricity rates. | None | `https://mcp.clearenergyfacts.com/mcp` |
| [Clearance Critter](plugins/clearance-critter) | Find US clearance deals. | None | `https://clearancecritter.com/api/mcp` |
| [ClearBounce](plugins/clearbounce) | Verify & find email addresses. | OAuth | `https://clearbounce.net/mcp` |
| [Cleared Colorado Jobs](plugins/cleared-colorado-jobs) | Find cleared Colorado jobs. | None | `https://clearedcolorado.com/mcp` |
| [Clearfile Metadata Remover](plugins/clearfile-metadata-remover) | Remove AI & file metadata. | None | `https://clearfile-metadata.fly.dev/mcp` |
| [CLEATUS](plugins/cleatus) | AI for Government Contracting. | OAuth | `https://www.cleat.ai/api/mcp/mcp` |
| [Clera](plugins/clera) | Find talent and manage hiring. | OAuth | `https://mcp.getclera.com/mcp` |
| [Clerk](plugins/clerk) | Clerk integration to add authentication, organizations, and billing | OAuth | `https://mcp.clerk.com/mcp` |
| [Cleve](plugins/cleve) | Search and edit Cleve notes. | OAuth | `https://app.cleve.ai/mcp` |
| [CleverPrep Interview Research](plugins/cleverprep-interview-research) | Company interview research. | None | `https://mcp.cleverprep.com/mcp` |
| [Clevra](plugins/clevra) | Field service jobs & schedule. | OAuth | `https://app.clevra.ai/api/mcp` |
| [Click&Boat](plugins/clickandboat) | Find and book boat rentals. | None | `https://www.clickandboat.com/mcp` |
| [ClickFunnels](plugins/clickfunnels) | Build funnels, manage contacts, and run your store in ClickFunnels. | OAuth | `https://agents.myclickfunnels.com/mcp` |
| [ClickHouse](plugins/clickhouse) | ClickHouse Reason plugin: skills (ClickHouse best practices), rules and MCP. | OAuth | `https://mcp.clickhouse.cloud/mcp` |
| [ClickTimer](plugins/clicktimer) | Email countdown timers. | OAuth | `https://clicktimer.co/mcp` |
| [ClickUp](plugins/clickup) | Manage tasks, track time, and collaborate from your ClickUp workspace without switching context. | OAuth | `https://mcp.clickup.com/mcp` |
| [CliDeck Network Knowledge](plugins/clideck-network-knowledge) | Version-aware network guidance. | None | `https://mcp.clideck.com/mcp` |
| [ClinMatch](plugins/clinmatch) | Supervised dental cleanings. | None | `https://clinmatch.io/api/mcp` |
| [Clip Recipe](plugins/clip-recipe) | Recipes from cooking videos. | OAuth | `https://cliprecipe.com/mcp` |
| [Clipform](plugins/clipform) | Build interactive video forms. | OAuth | `https://mcp.clipform.io/mcp` |
| [Clipify](plugins/clipify) | Keep your stream alive. | OAuth | `https://clipify.us/mcp` |
| [Clipto](plugins/clipto-transcripts-ai-workflows) | Transcripts for AI workflows. | None | `https://mcp.clipto.com/mcp` |
| [Clockodo](plugins/clockodo-time) | Track time, view project hours. | OAuth | `https://mcp.clockodo.com/mcp` |
| [CloFin](plugins/clofin) | Organize your finances. | API key | `https://www.clofin.com.br/api/mcp` |
| [Clonerrr](plugins/clonerrr) | App ad research & ASO audits. | None | `https://clonerrr.com/mcp` |
| [Close](plugins/close) | Close CRM for Reason. | OAuth | `https://mcp.close.com/mcp` |
| [ClosedLoop AI](plugins/closedloop-ai) | Know what to build next. | OAuth | `https://mcp.closedloop.sh/` |
| [Cloudaware Service Graph](plugins/cloudaware-service-graph) | Live multi-cloud inventory. | OAuth | `https://inbound.prod.cloudaware.com/mcp` |
| [CloudConvert](plugins/cloudconvert) | Convert and process files. | OAuth | `https://mcp.cloudconvert.com/` |
| [Cloudflare](plugins/cloudflare) | Build, test, and deploy applications on Cloudflare with platform guidance Skills and the Cloudflare MCP server. | OAuth | `https://mcp.cloudflare.com/mcp` |
| [Cloudflare AI Gateway](plugins/cloudflare-ai-gateway) | Search your logs, get details about the prompts and responses | OAuth | `https://ai-gateway.mcp.cloudflare.com/mcp` |
| [Cloudflare Audit Logs](plugins/cloudflare-audit-logs) | Query audit logs and generate reports for review | OAuth | `https://auditlogs.mcp.cloudflare.com/mcp` |
| [Cloudflare AutoRAG](plugins/cloudflare-autorag) | List and search documents on your AutoRAGs | OAuth | `https://autorag.mcp.cloudflare.com/mcp` |
| [Cloudflare Browser Rendering](plugins/cloudflare-browser-rendering) | Fetch web pages, convert them to markdown and take screenshots | OAuth | `https://browser.mcp.cloudflare.com/mcp` |
| [Cloudflare Container](plugins/cloudflare-container) | Spin up a sandbox development environment | OAuth | `https://containers.mcp.cloudflare.com/mcp` |
| [Cloudflare Digital Experience Monitoring](plugins/cloudflare-dex) | Get quick insight on critical applications for your organization | OAuth | `https://dex.mcp.cloudflare.com/mcp` |
| [Cloudflare DNS Analytics](plugins/cloudflare-dns-analytics) | Optimize DNS performance and debug issues based on current set up | OAuth | `https://dns-analytics.mcp.cloudflare.com/mcp` |
| [Cloudflare Documentation](plugins/cloudflare-docs) | Access up-to-date Cloudflare reference information via MCP | None | `https://docs.mcp.cloudflare.com/mcp` |
| [Cloudflare GraphQL](plugins/cloudflare-graphql) | Get analytics data using Cloudflare's GraphQL API | OAuth | `https://graphql.mcp.cloudflare.com/mcp` |
| [Cloudflare Logpush](plugins/cloudflare-logpush) | Get quick summaries for Logpush job health | OAuth | `https://logs.mcp.cloudflare.com/mcp` |
| [Cloudflare Observability](plugins/cloudflare-observability) | Debug and get insights into application logs and analytics via Cloudflare MCP | OAuth | `https://observability.mcp.cloudflare.com/mcp` |
| [Cloudflare One CASB](plugins/cloudflare-casb) | Quickly identify any security misconfigurations for SaaS applications to safeguard users & data | OAuth | `https://casb.mcp.cloudflare.com/mcp` |
| [Cloudflare Radar](plugins/cloudflare-radar) | Get global Internet traffic insights, trends, URL scans, and other utilities via Cloudflare Radar MCP | OAuth | `https://radar.mcp.cloudflare.com/mcp` |
| [Cloudflare Workers Bindings](plugins/cloudflare-workers-bindings) | Build Workers applications with storage, AI, and compute primitives | OAuth | `https://bindings.mcp.cloudflare.com/mcp` |
| [Cloudflare Workers Builds](plugins/cloudflare-workers-builds) | Get insights and manage your Cloudflare Workers Builds | OAuth | `https://builds.mcp.cloudflare.com/mcp` |
| [Cloudinary](plugins/cloudinary) | Cloudinary integration to manage, transform, and deliver images and videos | OAuth | `https://asset-management.mcp.cloudinary.com/sse` |
| [CloudMindMaps](plugins/cloudmindmaps) | Create and share mind maps. | OAuth | `https://cloudmindmaps.app/mcp` |
| [CloudX](plugins/cloudx) | Manage mobile ad monetization. | OAuth | `https://provisioning.cloudx.io/mcp` |
| [Cloz](plugins/cloz-jobs) | Jobs across Uzbekistan. | None | `https://cloz.uz/mcp` |
| [Clozd](plugins/clozd) | Unlock decision intelligence. | OAuth | `https://mcp.clozd.com/mcp` |
| [CLSTR News Tracker](plugins/clstr-news-tracker) | News search and timelines. | None | `https://mcp.clstr.news/mcp` |
| [ClubMeister: Team Manager](plugins/clubmeister-team-manager) | Manage your sports team. | OAuth | `https://admin.clubmeister.app/mcp` |
| [Cluelabs Content Studio](plugins/cluelabs-content-studio) | Elearning course design tools. | OAuth | `https://cluelabs.com/api/cluelabs/content/mcp` |
| [Clutch.co](plugins/clutch-co) | Find the perfect B2B partner. | None | `https://bot.clutch.co/mcp` |
| [Clypmint](plugins/clypmint) | Edit videos in Reason. | OAuth | `https://clypmint.com/mcp` |
| [CMDPress](plugins/cmdpress) | Manage your WordPress sites. | OAuth | `https://app.cmdpress.com/api/ai/mcp` |
| [Coach to Wrist](plugins/coach-to-wrist) | Plan and analyse your workouts. | OAuth | `https://coachtowrist.com/mcp` |
| [CoachPilot](plugins/coachpilot) | Seus alunos e treinos no chat. | OAuth | `https://mcp.coachpilot.com.br/mcp` |
| [Cobalt Capture](plugins/cobalt-capture) | Screenshot reviews to share. | None | `https://cobaltcapture.com/mcp` |
| [CockroachDB](plugins/cockroachdb) | CockroachDB plugin for Reason — explore schemas, write optimized SQL, debug queries, and manage distributed database clusters directly from your AI coding agent. | OAuth | `https://cockroachlabs.cloud/mcp` |
| [CocoPoint](plugins/cocopoint) | Vos présentations, votre IA. | OAuth | `https://www.cocopoint.app/api/mcp` |
| [Coda](plugins/coda) | Search docs, read pages, and update tables. | OAuth | `https://docs.superhuman.com/apis/mcp` |
| [CodeBuddy – Field Compliance](plugins/codebuddy-field-compliance) | Electrical code calculators. | None | `https://mcp.codebuddy.chat/mcp` |
| [CodeQR - Link and QR Analytics](plugins/codeqr-link-and-qr-analytics) | Editable, trackable QR codes. | OAuth | `https://mcp.codeqr.io/mcp` |
| [CodeWords](plugins/codewords) | Build agents and automations. | OAuth | `https://runtime.codewords.ai/run/devx_mcp/mcp` |
| [CodexPluginStats](plugins/codex-plugin-stats) | Find plugins. Inspect changes. | OAuth | `https://codex-plugin-stats.com/mcp` |
| [Codon Valuation](plugins/codon-valuation) | 409A and EMI value estimates. | None | `https://mcp.codonvaluation.com/mcp` |
| [Coefficient AI](plugins/coefficient-ai) | The data agent for everyone. | OAuth | `https://superagent.app.coefficient.io/mcp` |
| [CoffeeDateNow](plugins/coffeedatenow) | Meet for coffee right now. | OAuth | `https://coffeedatenow.com/mcp` |
| [Coffeetable](plugins/coffeetable) | Find your next book. | OAuth | `https://coffeetable.kushalsm.com/mcp` |
| [Coglen](plugins/coglen-learner) | Know what to practise next. | OAuth | `https://mcp.coglen.ai/mcp` |
| [Cognee](plugins/cognee) | Long-term memory for Reason. | OAuth | `https://mcp.aws.cognee.ai/mcp` |
| [CoinGecko](plugins/coingecko) | Cryptocurrency prices & charts. | None | `https://mcp.coingecko.com/mcp` |
| [CoinMarketCap](plugins/coinmarketcap) | Real-time crypto market data. | OAuth | `https://mcp.coinmarketcap.com/mcp` |
| [CoinRebate](plugins/coinrebate) | Compare crypto exchange fees. | None | `https://www.coinrebate.vip/api/mcp` |
| [Coinversa Pulse](plugins/coinversa-pulse) | Hyperliquid crypto & stocks. | OAuth | `https://mcp.coinversa.ai/mcp` |
| [COLA Cloud](plugins/cola-cloud) | Enriched TTB COLA search. | OAuth | `https://mcp.colacloud.us/mcp` |
| [Coldlytics](plugins/coldlytics) | Search companies and contacts. | OAuth | `https://mcp.coldlytics.com/mcp` |
| [Coliving](plugins/coliving) | Find coliving spaces worldwide. | None | `https://mcp.coliving.com/mcp` |
| [Collage Easy](plugins/collage-easy) | Create photo collages. | None | `https://collageeasy.app/chatgpt/mcp` |
| [Collecte MTL](plugins/collecte-mtl) | Find Montréal collection days. | None | `https://collectemtl.ca/api/mcp` |
| [CollegeSeats](plugins/collegeseats) | College sports resale tickets. | None | `https://collegeseats.com/mcp` |
| [ColoringBookify](plugins/coloringbookify) | Make printable coloring books. | OAuth | `https://coloringbookify.com/mcp` |
| [CoMavenAI AEO](plugins/comavenai-aeo) | Evidence-backed website fixes. | None | `https://mcp.comavenai.com/mcp` |
| [comethru](plugins/comethru) | Create and run events. | OAuth | `https://www.comethru.app/api/mcp` |
| [ComingUp Today](plugins/comingup-today) | Shared household organizer. | OAuth | `https://api.comingup.today/mcp` |
| [Command Mail](plugins/command-mail) | Read, draft and act on email. | OAuth | `https://commandmail.app/mcp` |
| [Common Room](plugins/common-room) | Find contacts and accounts. | OAuth | `https://mcp.commonroom.io/mcp` |
| [Commonplace](plugins/commonplace) | Large used items, delivered. | OAuth | `https://mcp.trycommonplace.com/mcp` |
| [CommSync](plugins/commsync) | Read and send SMS and email. | OAuth | `https://server.commsync.ai/api/mcp` |
| [Compabase](plugins/compabase) | Polish company data and KYB. | None | `https://compabase.com/mcp` |
| [Company Brain](plugins/company-brain) | Your team's AI knowledge base. | OAuth | `https://www.aiknowledgebase.ai/mcp` |
| [Company Dossier](plugins/company-dossier) | Sourced company dossiers. | None | `https://mcp.companydossier.lol/mcp` |
| [Company Registry API](plugins/companyregistryapi) | Find Company Data. | None | `https://mcp.companyregistryapi.com/mcp` |
| [Comparador de seguros BuenaIA](plugins/comparador-de-seguros-buenaia) | Compara catálogo de seguros. | OAuth | `https://mcp.buenaia.ai/mcp` |
| [Comparatif Coworking](plugins/comparatif-coworking) | Trouvez votre coworking. | None | `https://comparatifcoworking.com/mcp` |
| [CompetitorFlow](plugins/competitorflow) | Explore competitor insights. | None | `https://mcp.competitorflow.com/mcp` |
| [Compi](plugins/compi) | Trip planner & packing lists. | OAuth | `https://heycompi.com/api/mcp` |
| [ComplyOnSite](plugins/complyonsite) | UK construction compliance. | None | `https://mcp.complyonsite.com/mcp` |
| [Compoid](plugins/compoid) | Shared repository for agents. | None | `https://mcpv.compoid.com/mcp` |
| [Componecat](plugins/componecat) | Explore your software catalog. | OAuth | `https://app.componecat.ai/api/mcp` |
| [Composio](plugins/composio) | Connect and operate 1000+ external apps from Reason via the Composio MCP server. | OAuth | `https://connect.composio.dev/mcp` |
| [CompSniper](plugins/compsniper) | Real eBay sold prices. | OAuth | `https://mcp.compsniper.com/mcp` |
| [ComputePrep](plugins/computeprep) | Verified bank quant, one daily. | None | `https://mcp.computeprep.com/mcp` |
| [Comscore](plugins/comscore) | Digital, TV and Social data. | OAuth | `https://mcp.comscore.com/mcp` |
| [Concept Workspace](plugins/concept-workspace) | Team context and tools. | OAuth | `https://api.concept.dev/api/v1/mcp` |
| [Concertje](plugins/concertje) | Find concerts and tickets. | OAuth | `https://ai.concertje.be/mcp` |
| [ConductScience](plugins/conductscience) | Research equipment & software. | None | `https://conductscience.com/api/mcp` |
| [Conduit](plugins/conduit) | Read customer operations. | OAuth | `https://api.conduit.ai/v1/mcp` |
| [ConfigQuote](plugins/configquote) | Create and send sales quotes. | OAuth | `https://mcp.configquote.com/mcp` |
| [Configure Memory](plugins/configure-memory) | Memory you own across AI apps. | OAuth | `https://mcp.configure.dev/mcp` |
| [Congrava](plugins/congrava) | Church management. | OAuth | `https://congrava.com/api/ai/mcp.php` |
| [Connectlinx](plugins/connectlinx) | Run your real estate business. | OAuth | `https://www.connectlinx.com/mcp/agent.php` |
| [ConnectMachine](plugins/connectmachine) | Contacts and digital cards. | OAuth | `https://mcp.connectmachine.ai/mcp` |
| [ConnectMeGuru eSIM](plugins/connectmeguru-esim) | Find global travel eSIM plans. | None | `https://connectmeguru.com/api/mcp` |
| [Connhex](plugins/connhex) | AI-native IoT infrastructure. | OAuth | `https://mcp.connhex.com/` |
| [Consensus](plugins/consensus) | Search peer-reviewed research. | OAuth | `https://mcp.consensus.app/mcp` |
| [Constructable](plugins/constructable) | Manage construction projects. | OAuth | `https://api.constructable.ai/mcp` |
| [Consult with Roy](plugins/consult-with-roy) | Talk to Roy's Concierge Agent. | OAuth | `https://mcp.consult-with-roy.com/mcp` |
| [Consultant.dev](plugins/consultant-dev) | Find consultant assignments. | OAuth | `https://mcp.consultant.dev/mcp` |
| [Contendoor](plugins/contendoor) | Organize your video workspace. | OAuth | `https://contendoor.com/mcp` |
| [Content Brief Extractor](plugins/content-brief-extractor) | Extract content brief fields. | None | `https://task-app-hub-content-chain.belong514829670.workers.dev/content-brief-extractor/mcp` |
| [Contentful](plugins/contentful) | Manage content and assets. | OAuth | `https://mcp.contentful.com/mcp` |
| [ContentPulse](plugins/contentpulse) | From idea to ranking article. | OAuth | `https://contentpulse.io/api/mcp` |
| [Contentsquare](plugins/contentsquare) | Contentsquare integration for digital experience analytics | OAuth | `https://api.contentsquare.com/mcp` |
| [Context — ctxt.io](plugins/ctxt) | Share links that expire. | None | `https://ctxt.io/mcp` |
| [Context Bridge](plugins/context-bridge) | Persistent project continuity. | None | `https://context-bridge.contextbridge.workers.dev/mcp` |
| [Context Link](plugins/context-link) | Talk to your business. | OAuth | `https://mcp.context-link.ai/mcp` |
| [Context.dev](plugins/context-dev) | Search, scrape, crawl, extract, parse, monitor, and process the live web with Context.dev. | OAuth | `https://mcp.context.dev/mcp` |
| [Context7](plugins/context7) | Up-to-date, version-specific library documentation and code examples, straight into the agent's context. | None | `https://mcp.context7.com/mcp` |
| [ContextBolt Bookmarks](plugins/contextbolt-bookmarks) | Find and save bookmarks. | OAuth | `https://api.contextbolt.app/mcp` |
| [ContextDB](plugins/contextdb) | Save facts, check them first. | OAuth | `https://api.contextdb.ai/mcp` |
| [Contexter](plugins/contexter) | Memory for any AI & Telegram. | OAuth | `https://contexterai.com/mcp` |
| [Contextflo](plugins/contextflo) | Ask your company data. | OAuth | `https://mcp.contextflo.com/mcp` |
| [Contextick](plugins/contextick) | Save once, recall in any AI. | OAuth | `https://contextick.ai/mcp` |
| [Contextli](plugins/contextli) | Search your dictation notes. | OAuth | `https://mcp.contextli.com/mcp` |
| [ContinueVault](plugins/continuevault) | Continue your past AI chats. | OAuth | `https://continuevault.com/mcp` |
| [Continuity](plugins/continuity) | Keep characters consistent. | OAuth | `https://continuitywriter.com/mcp` |
| [Continuum](plugins/continuum) | Manage your work in Continuum. | OAuth | `https://mcp.oncontinuum.com/mcp` |
| [Contracko](plugins/contracko) | AI contract review and analysis, data extraction and parsing, and automated reminders, renewal. | OAuth | `https://app.contracko.com/mcp` |
| [Contract Information Extractor](plugins/contract-information-extractor) | Extract contract information. | None | `https://contract-information-extractor.sidcraigau.workers.dev/mcp` |
| [Contreal](plugins/contreal) | Tasks, clients and projects. | OAuth | `https://api.contreal.io/mcp` |
| [Control Plane](plugins/control-plane) | Build and deploy apps. | OAuth | `https://mcp.cpln.io/mcp` |
| [Converge Bio](plugins/converge-bio) | Antibody leads and patent data. | OAuth | `https://mcp.converge-bio.com/mcp` |
| [Converly](plugins/converly) | Easy conversion tracking. | OAuth | `https://app.converly.io/mcp` |
| [Conversion](plugins/conversion) | Marketing automation platform. | OAuth | `https://mcp.conversion.ai/mcp` |
| [ConvertAPI](plugins/convertapi) | File conversion and PDF tools. | OAuth | `https://mcp.convertapi.io/` |
| [ConvertPDF](plugins/convertpdf) | Compress, merge, convert PDFs. | OAuth | `https://convertpdf.io/mcp` |
| [Convoke](plugins/convoke) | Explore biopharma intelligence. | OAuth | `https://mcp.convoke.bio/mcp` |
| [ConvRadar: CRO for GA4](plugins/convradar-cro-for-ga4) | Audit your GA4 conversion rate. | OAuth | `https://mcp.convradar.com/mcp` |
| [Cook and Scale](plugins/cook-and-scale) | Your recipes, saved and shared. | OAuth | `https://cookandscale.com/mcp` |
| [Cook County Tax Appeal](plugins/property-tax-appeal-comps) | Find appeal comps in minutes. | None | `https://taxcomps.eralpbayraktar.com/mcp` |
| [CookieYes](plugins/cookieyes) | Web privacy & cookie consent. | OAuth | `https://app.cookieyes.com/mcp` |
| [Cookmarks](plugins/cookmarks) | Recipes, meal plans, groceries. | OAuth | `https://www.cookmarks.app/api/mcp` |
| [COooL](plugins/coool) | Real-Time Public Transport. | None | `https://getcoool.app/mcp` |
| [Cooper Email](plugins/cooper-email) | Email inboxes for AI agents. | OAuth | `https://cooperemail.com/mcp` |
| [CopyCharm](plugins/copycharm) | Access your CopyCharm context. | OAuth | `https://copycharm.ai/api/mcp` |
| [COR](plugins/cor) | Manage COR work. | OAuth | `https://mcp.projectcor.com/mcp` |
| [Coram](plugins/coram) | Search and inspect CCTV. | OAuth | `https://mcp.coram.ai/mcp` |
| [Corezoid](plugins/corezoid) | Corezoid processes in your IDE. | OAuth | `https://mcp.corezoid.com/mcp` |
| [Coronet Arcade](plugins/coronet-arcade) | Thirteen daily puzzles. | None | `https://coronet.one/mcp` |
| [COROS](plugins/coros) | Know your training. Plan ahead. | OAuth | `https://mcp.coros.com/mcp` |
| [CorpusIQ](plugins/corpusiq) | All your business data in chat. | OAuth | `https://mcp2.corpusiq.io/mcp` |
| [Corridome](plugins/corridome) | Deal and firm register. | OAuth | `https://corridome.com/mcp` |
| [Corte](plugins/corte) | Create and publish brand media. | OAuth | `https://api.corte.so/mcp` |
| [CoSchedule](plugins/coschedule) | Your social media calendar. | OAuth | `https://platform.coschedule.com/mcp` |
| [Cosimo](plugins/cosimo) | Intelligent fashion discovery. | OAuth | `https://mcp.cosimo.shop/mcp` |
| [Cosmic Chemistry](plugins/cosmic-chemistry) | Vedic astrology, made fun. | None | `https://cosmicchemistry.co/mcp` |
| [Cosmic Rebellion](plugins/cosmic-rebellion) | Play a trading card game. | None | `https://cosmicrebellion.games/mcp` |
| [CostInflation](plugins/costinflation) | Explore and compare prices. | None | `https://mcp.costinflation.com/mcp` |
| [CostKits Procedure Costs](plugins/costkits-procedure-costs) | Typical US procedure prices. | None | `https://mcp.costkits.com/mcp` |
| [CostLiving](plugins/costliving) | Cost of living for US cities. | None | `https://mcp.costliving.net/mcp` |
| [Cote R (CRC) Québec](plugins/cote-r-crc-quebec) | Quebec college R-score (CRC). | None | `https://cote-r.mmcco.co/mcp` |
| [Cotokim](plugins/cotokim) | Baby layette by city climate. | None | `https://cotokim.com/mcp` |
| [countrymanager](plugins/countrymanager) | Mobile apps: reviews and text. | OAuth | `https://countrymanager.app/api/loc/mcp` |
| [CouponX](plugins/dev-d8412ffa687081918aec3acc5a9b6bf5) | Coupons with clear terms. | None | `https://couponx.coupons/mcp` |
| [Court Rules](plugins/court-rules) | Judge and court filing rules. | OAuth | `https://mcp.courtrules.app/mcp` |
| [CourtAPI](plugins/courtapi) | Search federal court records. | OAuth | `https://mcp.courtapi.com/mcp` |
| [Covenant](plugins/covenant) | Your fund terms, in Reason. | OAuth | `https://covenant.co/api/mcp` |
| [Coverage Cat Insurance](plugins/coverage-cat-umbrella) | Compare insurance. | None | `https://www.coveragecat.com/api/consumer/mcp` |
| [CoverForce](plugins/coverforce) | Compare insurance quotes. | OAuth | `https://mcp.api.coverforce.com/mcp` |
| [Coverlttr](plugins/coverlttr) | Write tailored cover letters. | OAuth | `https://mcp.coverlttr.com/mcp` |
| [cowork24](plugins/cowork24) | Discover and find workspaces. | OAuth | `https://mcp.cowork24.ch/mcp` |
| [CoworkingView](plugins/coworkingview) | Find offices and workspaces. | None | `https://mcp.coworkingview.com/mcp` |
| [Craft](plugins/craft) | Search, create, and update documents and daily notes. | OAuth | `https://mcp.craft.do/my/mcp` |
| [Craft Quantities](plugins/craft-quantities) | Construction quantities, cited. | None | `https://api.craftquantities.com/mcp` |
| [Cranes](plugins/cranes) | You are what you think. | OAuth | `https://usecranes.com/mcp` |
| [Cratio CRM](plugins/cratio-crm) | Leads, calls & reports in CRM. | OAuth | `https://mcp.cratio.com/mcp` |
| [Crayon](plugins/crayon) | Real-time competitive intel. | OAuth | `https://mcp.crayon.co/mcp` |
| [Crazy Tongits – Learn & Review](plugins/crazy-tongits-learn-and-review) | Learn Tongits, step by step. | None | `https://ct.crazylive.cc/mcp` |
| [Crbonfree](plugins/crbonfree) | Estimate and offset CO2. | OAuth | `https://api.crbonfree.com/mcp` |
| [Crealix](plugins/crealix) | Create finished videos in chat. | OAuth | `https://mcp.crealix.ai/mcp` |
| [Create Prints](plugins/create-prints) | Turn images into wall prints. | OAuth | `https://mcp.createprints.ai/mcp` |
| [Creatify Ad Agent](plugins/creatify-ad-agent) | Create and edit video ads. | OAuth | `https://api.creatify.ai/ad_agent/mcp` |
| [Creative Claw](plugins/creative-claw) | Create videos & voiceovers. | OAuth | `https://app.creativeclaw.co/mcp` |
| [CreativeSign](plugins/creativesign) | CreativeSign product search. | None | `https://creativesign.ro/mcp` |
| [Creatures Animal Marketplace](plugins/creatures-animal-marketplace) | Animals, breeders and services. | None | `https://creatures.com/mcp/v2` |
| [CreceRank](plugins/crecerank) | LATAM brand visibility in AI. | OAuth | `https://crecerank.onrender.com/mcp` |
| [CredCore - Tusk Liquid](plugins/credcore-tusk-liquid) | Query public credit agreements. | OAuth | `https://api.credcore.com/liquid-mcp/mcp` |
| [Creddy: Credit Card Rewards](plugins/creddy) | Card perks, credits and points. | None | `https://getcreddy.com/mcp` |
| [Creonda UGC Creator Search](plugins/creonda-ugc-creator-search) | Find vetted UGC creators. | None | `https://mcp.creonda.com/mcp` |
| [CREparser Deal Review](plugins/creparser-deals) | Rent rolls, T12s, OMs, loans. | OAuth | `https://mcp.creparser.com/leases/mcp` |
| [Cria.al](plugins/cria-car-rental) | Find rental cars in Albania. | None | `https://cria.al/mcp` |
| [Crisphive](plugins/crisphive) | Scheduling API for AI agents. | OAuth | `https://api.crisphive.com/mcp` |
| [Critical Thinker](plugins/critical-thinker) | Critica como você conduz a IA. | None | `https://criticalthinker.dev/api/mcp` |
| [CRM Connector](plugins/crm-connector) | Automate and sync your apps. | None | `https://platform-mcp.crm-connector.com/` |
| [CRM Consulting](plugins/crm-consulting) | Find Salesforce partners. | None | `https://crm.consulting/api/mcp` |
| [Croisa](plugins/croisa) | Hosted multilingual websites. | OAuth | `https://croisa.com/mcp` |
| [Crossbeam](plugins/crossbeam) | Explore partner insights. | OAuth | `https://mcp.crossbeam.com/mcp` |
| [CrossHero](plugins/crosshero) | Track your gym, plan workouts. | OAuth | `https://mcp.crosshero.com/mcp` |
| [crosswalk](plugins/crosswalk) | Message boards for agents. | OAuth | `https://mcp.crosswalk.to/` |
| [CrowdHum](plugins/crowdhum) | Cinematic live polling. | OAuth | `https://mcp.crowdhum.com/mcp` |
| [Crowdin](plugins/crowdin) | Localize products with Crowdin. | OAuth | `https://mcp.crowdin.com/mcp` |
| [Crown Quorum](plugins/crown-quorum) | Private collector archive. | None | `https://www.crownquorum.com/api/mcp/account` |
| [Crustdata](plugins/crustdata) | B2B data on people and companies: people search, company search and enrichment across 800M+ profiles and 200M+ companies. | OAuth | `https://install.crustdata.com/mcp` |
| [Cryotos](plugins/cryotos) | Cryotos CMMS SAAS application. | OAuth | `https://mcp.cryotos.com/mcp` |
| [CryptoSocials](plugins/cryptosocials) | Crypto X research for agents. | OAuth | `https://api.cryptosocials.net/mcp` |
| [CubbyEd Classical Curriculum](plugins/cubbyed-classical-curriculum) | Classical K-12 lesson planning. | None | `https://cubbyed.com/mcp` |
| [Cube](plugins/cube) | Analyze your financial data. | OAuth | `https://mcp.cubesoftware.com/` |
| [Cubi Estate](plugins/cubi-estate) | Find real estate with AI. | None | `https://mcp.cubi.estate/mcp` |
| [CueScout](plugins/cuescout) | Check if AI answers name you. | OAuth | `https://mcp.cuescout.com/mcp` |
| [CueStride Timer](plugins/cuestride) | Shared countdown timers. | None | `https://app.cuestride.com/mcp` |
| [Cupid](plugins/cupid-rom-com) | Play matchmaker in a rom-com. | None | `https://cupid-mcp.playfulscience.ai/mcp` |
| [Curaiz Remote Jobs](plugins/curaiz-remote-jobs) | Find relevant remote jobs. | None | `https://curaiz.com/mcp` |
| [Curve Ad Tracking Check](plugins/curve-compliance) | HIPAA-safe ad tracking checks. | OAuth | `https://mcp.curvecompliance.com/mcp` |
| [Customer Info Validator](plugins/customer-info-validator) | Check customer information. | None | `https://customer-info-validator.sidcraigau.workers.dev/mcp` |
| [Customer.io](plugins/customer-io) | Build campaigns, manage segments, and query people. | OAuth | `https://mcp.customer.io/mcp` |
| [Customer.io (EU)](plugins/customer-io-eu) | Customer.io for accounts in the EU data region: build campaigns, manage segments, and query people. | OAuth | `https://mcp-eu.customer.io/mcp` |
| [CutKit Teleprompter](plugins/cutkit-teleprompter) | Your teleprompter scripts. | OAuth | `https://getcutkit.com/mcp` |
| [CutPro](plugins/cutpro) | AI videos, clips, music & more. | OAuth | `https://mcp.cut.pro/` |
| [CVE Risk Check](plugins/cve) | CVE and dependency triage. | None | `https://cve.openkrill.app/mcp` |
| [CVpop - Resume & CV Builder](plugins/cvpop-resume-and-cv-builder) | Your next job starts here. | None | `https://mcp.cvpop.com/mcp` |
| [CXProWealth](plugins/cxprowealth) | Investment intelligence. | OAuth | `https://cxprowealth.com/api/mcp` |
| [Cyber Library](plugins/cyber-library) | Search cybersecurity knowledge. | None | `https://www.cyberlibrary.com/api/mcp` |
| [CyberLens AI](plugins/cyberlens-ai) | Review your security scans. | OAuth | `https://cyberlensai.com/mcp` |
| [cytado](plugins/cytado) | Citations with page numbers. | OAuth | `https://cytado.com/api/mcp` |
| [Dabble Me](plugins/dabble-me) | Your journal, remembered. | OAuth | `https://dabble.me/mcp` |
| [Dados B3](plugins/dados-b3) | Brazilian stock fundamentals. | None | `https://dadosb3.com/mcp` |
| [DAFi](plugins/dafi) | Study with your DAFi notes. | OAuth | `https://mcp.dafi-ai.com/mcp` |
| [Daily Horoscope](plugins/daily-horoscope) | Horoscopes, zodiac & tarot. | None | `https://mcp.todayhoroscopeapp.com/mcp` |
| [Daily Leveling](plugins/daily-leveling) | Turn tasks into quests and XP. | OAuth | `https://dailyleveling.app/mcp` |
| [Daily Social](plugins/daily-social) | Brand ideas and content drafts. | OAuth | `https://api.daily-social.app/mcp` |
| [DailyEd](plugins/dailyed) | Create classroom activities. | None | `https://dailyed.app/mcp` |
| [DailyHero](plugins/dailyhero) | Family tasks and rewards. | OAuth | `https://mcp.dailyhero.ink/mcp` |
| [Dakota Marketplace](plugins/dakota-marketplace) | Search allocators and funds. | OAuth | `https://marketplace-mcp.dakota.com/mcp` |
| [Daloopa](plugins/daloopa) | Pull source-linked fundamentals, KPIs, filings, and prices. | OAuth | `https://mcp.daloopa.com/server/mcp` |
| [Dalton](plugins/dalton) | A/B testing for online stores. | OAuth | `https://mcp.getdalton.com/` |
| [Dandelion](plugins/dandelion-estate-planning) | Estate planning, explained. | None | `https://mcp.joindandelion.com/mcp` |
| [Danu](plugins/danu) | Charts for you and your people. | OAuth | `https://danuastrology.com/mcp` |
| [Daoco](plugins/daoco) | Your brand's marketing team. | OAuth | `https://daoco.org/mcp` |
| [Dash Security](plugins/dash) | Discover your AI estate, assess supply-chain and shadow AI risk, investigate agent sessions, and track AI spend through the Dash MCP. | OAuth | `https://mcp.dash.security/mcp` |
| [Dash Social](plugins/dash-social) | Connect your brand insights. | OAuth | `https://mcp.dashsocial.com/mcp` |
| [Dasha.fm](plugins/dasha-fm) | Your Vedic chart in your AI. | None | `https://dasha.fm/mcp` |
| [Dashform](plugins/dashform) | Build and run AI forms. | OAuth | `https://getaiform.com/api/mcp` |
| [Dashly](plugins/dashly) | Track anything by telling AI. | OAuth | `https://dashly.si/mcp` |
| [DashThis](plugins/dashthis) | Client-ready marketing reports. | OAuth | `https://mcp.dashthis.com/mcp` |
| [Data Center Finder](plugins/data-center-finder) | Find U.S. data center space. | None | `https://mcp.colocationscout.com/mcp` |
| [Data Legion](plugins/datalegion) | B2B people and company data. | OAuth | `https://api.datalegion.ai/mcp` |
| [Data Market](plugins/data-market) | Consulte preços no varejo. | OAuth | `https://mcp.datamarket.cnovatech.com.br/mcp` |
| [Data247](plugins/data247) | Data append and validation. | OAuth | `https://mcp.data247.com/mcp` |
| [Data2Content](plugins/data2content) | Plan content and scripts. | OAuth | `https://data2content.ai/api/mcp` |
| [DataCamp](plugins/datacamp) | Learn AI and data skills. | None | `https://mcp.datacamp.com/mcp` |
| [DataCleanist](plugins/datacleanist) | EDA reports for your datasets. | None | `https://api.datacleanist.com/mcp` |
| [Datadog](plugins/datadog) | Query Datadog metrics, logs, traces, monitors, and incidents through Datadog's hosted MCP server. | OAuth | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| [DataFlowr](plugins/dataflowr) | Exact Online for Reason. | OAuth | `https://app.dataflowr.nl/mcp` |
| [DataFlows SMS](plugins/dataflows-sms) | SMS, campaigns and scheduling. | OAuth | `https://sms.dataflows.com.au/mcp` |
| [DataForB2B](plugins/dataforb2b) | People & company data. | OAuth | `https://mcp.dataforb2b.ai/mcp` |
| [DataForSEO](plugins/dataforseo) | Get SEO, GEO & marketing data. | OAuth | `https://mcp.dataforseo.com/mcp` |
| [DataGrout](plugins/datagrout) | Give Reason every tool you connect in DataGrout: discover, plan and run integrations through one MCP endpoint. | OAuth | `https://gateway.datagrout.ai/connect` |
| [DATAHILL](plugins/datahill) | Contexto, prioridade e direção. | OAuth | `https://mcp.datahill.ai/` |
| [DataHub](plugins/datahub) | DataHub integration to connect AI agents to enterprise data and context | OAuth | `https://mcp.datahub.com/mcp` |
| [Datalastic](plugins/datalastic) | Maritime Data. | OAuth | `https://mcp.datalastic.com/mcp` |
| [DataLayer](plugins/datalayer) | B2B company and contact data. | OAuth | `https://api.datalayer.sh/mcp` |
| [Datapublica](plugins/datapublica) | Analyze Danish companies. | OAuth | `https://mcp.datapublica.dk/mcp` |
| [Datarails FinanceOS](plugins/datarails-financeos) | AI-powered finance management. | OAuth | `https://mcp.datarails.com/mcp` |
| [Dataslayer](plugins/dataslayer) | Ask your marketing data. | API key | `https://mcp.dataslayer.ai/mcp` |
| [Datassist Net Brut Hesaplama](plugins/datassist-net-brut-hesaplama) | Net ve brüt maaş hesaplama. | None | `https://net-brut-mcp.datassist.com/mcp` |
| [Dativue](plugins/dativue) | Search and social research. | OAuth | `https://dativue.com/mcp` |
| [Dayalogs](plugins/dayalogs) | AI survey fieldwork control. | OAuth | `https://dayalogs.com/mcp` |
| [Dayfaro](plugins/dayfaro) | Turn your text into podcasts. | OAuth | `https://api.dayfaro.com/v1/mcp` |
| [DayOneLead](plugins/dayonelead) | Find leads & manage campaigns. | OAuth | `https://dayonelead.com/mcp` |
| [DayPass](plugins/daypass) | Hotel pools, spas, beach clubs. | None | `https://mcp.daypassapp.com/mcp` |
| [Daysync: Tour Manager](plugins/daysync) | Run your tour from chat. | OAuth | `https://mcp.daysync.com/mcp` |
| [Dayze](plugins/dayze) | Give AI your life context. | None | `https://dayze.com/api/mcp` |
| [DB Fiddle](plugins/db-fiddle) | Run SQL without leaving chat. | None | `https://mcp.db-fiddle.com/mcp` |
| [Dcipher Analytics](plugins/dcipher-analytics) | Generate business insights. | OAuth | `https://mcp.dcipheranalytics.com/mcp` |
| [De Belegger](plugins/de-belegger) | Understand your portfolio. | OAuth | `https://app.debelegger.nl/mcp` |
| [Deal Analyzer MCP](plugins/deal-analyzer) | Analyze rental deals. | OAuth | `https://deal-analyzer-mcp-production.up.railway.app/mcp` |
| [Dealboard](plugins/dealboard) | Track sales deals. | OAuth | `https://app.getdealboard.com/mcp` |
| [Dealish](plugins/dealish) | Toronto food & drink deals. | None | `https://mcp.dealish.io/mcp` |
| [DealMachine](plugins/dealmachine) | Find property and owner leads. | None | `https://mcp.dealmachine.com/mcp` |
| [DealWise AI](plugins/dealwise-ai) | CRE deals, NOI and rent rolls. | OAuth | `https://www.dealwiseai.com/api/mcp` |
| [DearFax](plugins/dearfax) | Fax tools for your assistant. | OAuth | `https://app.dearfax.com/api/mcp` |
| [debuff](plugins/debuff-app) | Make and play 2D web games. | None | `https://debuff.jp/mcp` |
| [DEBYKO](plugins/debyko) | Crypto derivatives market data. | OAuth | `https://mcp.debyko.com/mcp` |
| [DechoNet](plugins/dechonet) | Domain & phishing link checks. | None | `https://dechonet.com/mcp` |
| [decisionpoint.io](plugins/decisionpoint-io) | Structured decision making. | OAuth | `https://mcp.decisionpoint.io/v1/mcp` |
| [Deck.gallery](plugins/deck-gallery) | Presentation ideas & examples. | OAuth | `https://mcp.deck.gallery/mcp` |
| [Decktopus AI](plugins/decktopus-ai) | Make presentations, carousels. | OAuth | `https://apiv21.decktopus.com/mcp` |
| [DeducePuzzles](plugins/deducepuzzles) | Verified exam puzzle, 3 tries. | None | `https://mcp.deducepuzzles.com/mcp` |
| [DEEPBOM Artifact Evidence](plugins/deepbom-artifact-evidence) | Inspect AI model artifacts. | None | `https://deepbom.org/mcp` |
| [DeepL](plugins/deepl) | Translate text and documents. | OAuth | `https://mcp.deepl.com/v1/mcp` |
| [Deepmark](plugins/deepmark) | Search everything you saved. | OAuth | `https://usedeepmark.com/api/mcp` |
| [DeepMedChem](plugins/deepmedchem) | Molecular similarity search. | None | `https://mcp.deepmedchem.com/mcp` |
| [DeepStack](plugins/deepstack) | Where investors disagree. | None | `https://mcp.deepstack.ltd/mcp` |
| [DeepWiki](plugins/deepwiki) | Access comprehensive documentation for GitHub repositories with AI-powered insights | None | `https://mcp.deepwiki.com/mcp` |
| [DeerDawn](plugins/deerdawn) | AI project session memory. | OAuth | `https://api.deerdawn.com/mcp` |
| [DEF 14](plugins/def-14) | Shareholder activism data. | OAuth | `https://mcp.def14.co/` |
| [Deglaze](plugins/deglaze) | Chat with your recipe library. | OAuth | `https://mcp.deglaze.app/mcp` |
| [Deley](plugins/deley) | Leyes y juicios de Ecuador. | OAuth | `https://mcp.deley.io/mcp` |
| [Delivery Report Extractor](plugins/delivery-report-extractor) | Extract delivery reports. | None | `https://delivery-report-extractor.sidcraigau.workers.dev/mcp` |
| [Deloen](plugins/deloen) | Writing skills for AI models. | OAuth | `https://deloen.com/api/mcp` |
| [Delos](plugins/delos-production) | Explore and submit enquiries. | None | `https://api.delosintelligence.com/mcp` |
| [Demodesk](plugins/demodesk) | Demodesk sales data in Reason. | OAuth | `https://mcp.demodesk.com/mcp` |
| [DemoPage](plugins/demopage) | Build demos from your code. | OAuth | `https://demopage.io/mcp` |
| [Demovela](plugins/demovela) | Browse videos and save drafts. | OAuth | `https://mcp.demovela.com/mcp` |
| [Dentovio Exam Prep](plugins/dentovio-exam-prep) | Practice dental exams. | None | `https://dentovio.com/mcp` |
| [Dependency Upgrade Plan](plugins/dependency-upgrade-plan) | Plan dependency upgrades. | None | `https://dependency-upgrade-plan.sidcraigau.workers.dev/mcp` |
| [Der erste Notenpunkt](plugins/der-erste-notenpunkt) | Math coach for Bavaria 2027. | None | `https://mcp.der-erste-notenpunkt.de/mcp` |
| [Deriv](plugins/deriv) | Live Deriv API schemas, payload validation, and guides for authentication, subscriptions, trades, and errors. | None | `https://mcp-api-v2.deriv.com/mcp` |
| [Derive](plugins/derive) | Interact with your notes. | OAuth | `https://mcp.derivenotes.com/mcp` |
| [Descope](plugins/descope) | Add auth to your apps and MCPs. | OAuth | `https://mcp.descope.com/mcp` |
| [Descript](plugins/descript) | Edit video and audio by editing text. | OAuth | `https://api.descript.com/v2/mcp` |
| [Descry](plugins/descry) | Organize creative projects. | OAuth | `https://descry.studio/mcp` |
| [Descrybe Legal Engine](plugins/descrybe-legal-engine) | Primary law research toolkit. | OAuth | `https://mcp.descrybe.com/mcp` |
| [Designelier](plugins/designelier) | Generate icons & illustrations. | OAuth | `https://mcp.designelier.com/mcp` |
| [Designobo](plugins/designobo) | Design UI prototypes. | OAuth | `https://designobo.com/mcp` |
| [Déstaire](plugins/destaire) | Find luxury hotels and stays. | None | `https://destaire.com/mcp` |
| [Destiny Atlas](plugins/destiny-atlas) | Charts, cards and reflection. | None | `https://api.destiny-atlas.com/mcp` |
| [Details.so](plugins/details-so) | Build from website inspiration. | OAuth | `https://details.so/mcp` |
| [Detritus Rentals: Get a Quote](plugins/detritus-rentals-get-a-quote) | Quote jobsite services. | None | `https://mcp.detritus.us/mcp` |
| [Dev Facts Check](plugins/dev-facts) | EOL, licences, browsers, RFCs. | None | `https://devfacts.openkrill.app/mcp` |
| [Dex](plugins/dex) | Manage contacts and follow-ups. | OAuth | `https://mcp.getdex.com/mcp` |
| [Dhamma Data](plugins/dhamma-data) | Research Buddhist texts. | None | `https://dhamma.fly.dev/mcp` |
| [DharmikStudio](plugins/dharmikstudio) | Devotional audio and stories. | None | `https://studio.dharmikvibes.com/mcp` |
| [Diamond Painting Converter](plugins/diamond-painting-converter) | Download purchased patterns. | OAuth | `https://diamondpaintingconverter.com/mcp` |
| [Diarize](plugins/diarize) | Transcribe with speaker labels. | OAuth | `https://diarize.io/mcp` |
| [Dibatto](plugins/dibatto) | Prepare your next episode. | OAuth | `https://dibatto.com/mcp` |
| [dibsresearch](plugins/dibsresearch) | Company KPIs with sources. | OAuth | `https://mcp.dibsresearch.com/mcp` |
| [DidYouSEO](plugins/didyouseo) | SEO audits and Search Console. | OAuth | `https://didyouseo.com/mcp` |
| [Diet Mate - Nutritional Memory](plugins/diet-mate-nutritional-memory) | Analyze your meals and diet. | OAuth | `https://mcp.dietmate.app/mcp` |
| [diggercamp](plugins/diggercamp) | Find similar music tracks. | None | `https://mcp.diggercamp.com/mcp` |
| [Digip](plugins/digip) | Trademark conflict search. | OAuth | `https://mcp.digip.com/` |
| [Digital Compass](plugins/digital-compass) | Digital emergency playbooks. | None | `https://compass.madeinro.eu/mcp` |
| [Digital Jobs](plugins/digital-jobs-search) | Find and compare digital jobs. | OAuth | `https://digitaljobs.com/mcp` |
| [DigitalK2](plugins/digitalk2) | Swedish K2 annual reports. | OAuth | `https://mcp.digitalk2.se/mcp` |
| [DigitalOcean](plugins/digitalocean) | Provision a DigitalOcean VM. | OAuth | `https://mcp.digitalocean.com/mcp` |
| [DigiTrust Evidence Assistant](plugins/digitrust-evidence-assistant) | Procurement & vendor evidence. | None | `https://mcp.digitranshq.com/mcp` |
| [Digits](plugins/digits) | Track & analyze your finances. | OAuth | `https://api.digits.com/mcp` |
| [Dillr](plugins/dillr) | Save recipes, plan meals, cook. | OAuth | `https://mcp.dillr.ai/mcp` |
| [Dim Hour](plugins/dimhour) | Find restaurants and bars. | None | `https://mcp.dimhour.com/mcp` |
| [Dino Run+](plugins/dino-run-plus) | Play a dinosaur runner. | None | `https://dino-gpt.charandeep.net/mcp` |
| [Dinzo](plugins/dinzo) | Personal finance for Brazil. | OAuth | `https://api.dinzo.com.br/mcp` |
| [dip.rest](plugins/dip-rest) | Explore Georgia food. | None | `https://dip.rest/mcp` |
| [DirectCase Legal Research](plugins/directcase-legal-research) | Verified legal research. | OAuth | `https://mcp.directcase.ai/mcp` |
| [Directoryz](plugins/directoryz) | Browse directory listings. | OAuth | `https://mcp.directoryz.app/mcp` |
| [Direkto](plugins/direkto-app) | Find suppliers and get prices. | None | `https://mcp.direkto.org/mcp` |
| [Disclosed: Politician Trades](plugins/disclosed-politician-trades) | Congress stock trades. | None | `https://disclosedhq.com/mcp` |
| [DiscoverCars.com](plugins/discovercars-com) | Car rental comparison platform. | None | `https://mcp.discovercars.com/mcp` |
| [DiSCPROFiL](plugins/discprofil) | disc kişilik envanteri. | OAuth | `https://mcp.discprofil.com.tr/mcp` |
| [Discriminantly](plugins/discriminantly) | Keep interests, places & plans. | OAuth | `https://www.discriminantly.com/mcp` |
| [Dispatcher.City](plugins/dispatcher-city) | Search Berlin property. | None | `https://mcp.dispatcher.city/mcp` |
| [Dispensa: lista de compras](plugins/dispensa-lista-de-compras) | Marcas e o que falta em casa. | OAuth | `https://mcp-despensa-hub.onrender.com/mcp` |
| [Distill Markets](plugins/distill-markets) | Verified SEC filing data. | OAuth | `https://mcp.distillmarkets.com/mcp` |
| [Distilla Investment Research](plugins/distilla) | Financial and equity research. | OAuth | `https://api.distilla.ai/mcp` |
| [Distribute](plugins/distribute) | Sales pages from your calls. | OAuth | `https://api.distribute.so/mcp` |
| [Dive Kit](plugins/dive-kit) | Scuba dive planning tools. | None | `https://mcp.divekit.app/mcp` |
| [Diverge](plugins/diverge) | Build and update your persona. | OAuth | `https://green.diverge.one/mcp` |
| [DivineAI](plugins/divineai) | Panchang and festival dates. | None | `https://divineai-mcp.dharmikvibes.com/divineai` |
| [DJfindr](plugins/djfindr) | Find and book DJs near you. | None | `https://mcp.djfindr.com/mcp` |
| [DMAP AI](plugins/dmap-ai) | Drought analysis. | None | `https://droughtanalysis.com/mcp` |
| [DMARCwise](plugins/dmarcwise) | Monitor email authentication. | OAuth | `https://mcp.dmarcwise.io/mcp` |
| [DNAObs](plugins/dnaobs) | Guides and analysis status. | None | `https://dnaobs.com/mcp` |
| [DNS Doctor - DNS & DMARC Tools](plugins/dns-doctor-dns-and-dmarc-tools) | DNS checks & DMARC monitoring. | None | `https://dnsdoctor.dev/mcp` |
| [DNS Pilot](plugins/namecheap-dns) | Check DNS. Inspect samples. | OAuth | `https://dns-pilot.cuelayer.workers.dev/mcp` |
| [DocDiffAI](plugins/docdiffai) | Compare document versions. | OAuth | `https://docdiffai.com/mcp` |
| [dochost.io](plugins/dochost-io) | Publish shareable pages. | OAuth | `https://dochost.io/api/mcp` |
| [DocHub](plugins/dochub) | Edit and Send PDFs. | OAuth | `https://dochub.com/mcp` |
| [DocJig](plugins/docjig) | AI template prep and signing. | OAuth | `https://docjig.com/mcp` |
| [Docket](plugins/docket) | Your product knowledge expert. | OAuth | `https://demand-mcp.app.docketai.com/mcp` |
| [DocketDrafter](plugins/docketdrafter) | Draft and format legal docs. | OAuth | `https://api.docketdrafter.com/mcp` |
| [Dockflow](plugins/dockflow) | Search/track ocean containers. | OAuth | `https://mcp.dockflow.com/mcp` |
| [Docmino](plugins/docmino) | Create interactive guides. | OAuth | `https://mcp.docmino.com/mcp` |
| [DocRunic](plugins/docrunic) | Search, read, and manage docs. | OAuth | `https://mcp.docrunic.com/mcp` |
| [Docs AI](plugins/docs-ai) | Create, read, and edit docs. | OAuth | `https://api.gpt.space/servers/google-docs/mcp` |
| [DocsAutomator](plugins/docsautomator) | Quotes, contracts, invoices. | OAuth | `https://mcp.docsautomator.co/mcp` |
| [DocsBot](plugins/docsbot-administration) | AI agents for customer support. | OAuth | `https://mcp.docsbot.ai/mcp` |
| [DocStash](plugins/docstash) | Home for what your AI makes. | OAuth | `https://mcp.docstash.ai/mcp` |
| [Docteur Bet](plugins/docteur-bet) | Football match probabilities. | None | `https://mcp.docteurbet.fr/mcp` |
| [Document Change Checker](plugins/bidpatch) | Compare public document edits. | None | `https://bidpatch-mcp.sunrysetech.com/mcp` |
| [Document360](plugins/document360) | Manage knowledge base content. | OAuth | `https://mcp.document360.io/mcp` |
| [DocuSeal](plugins/docuseal) | Manage e-signatures. | None | `https://mcp.docuseal.com/` |
| [DocuSign](plugins/docusign) | Manage envelopes, templates, workflows, and agreements. | OAuth | `https://mcp.docusign.com/mcp` |
| [DocuWriter.ai](plugins/docuwriter-ai) | Generate and maintain docs. | OAuth | `https://app.docuwriter.ai/mcp` |
| [DocVision AI](plugins/docvision) | Read, compare & audit PDFs. | None | `https://connecteur-docvision.vercel.app/mcp` |
| [DoDo](plugins/dodo) | Todos that keep a record. | OAuth | `https://dodo.day/api/mcp` |
| [doDomain](plugins/dodomain) | Connect custom domains. | OAuth | `https://app.dodomain.io/api/mcp` |
| [Doitong](plugins/doitong) | Make AI videos and films. | OAuth | `https://mcp.doitong.com/mcp` |
| [Dolphin Fitness](plugins/dolphin-fitness) | Shop fitness & wellbeing. | None | `https://mcp.dolphinfitness.co.uk/mcp` |
| [Domainee](plugins/domainee) | Custom domains for your SaaS. | OAuth | `https://mcp.domainee.dev/mcp` |
| [DomainKits](plugins/domainkits) | Newly registered domain search. | None | `https://api.domainkits.com/v1/mcp` |
| [DomainROC Domain Advisor](plugins/domainroc-domain-advisor) | Compare Domain Prices. | None | `https://domainroc.com/mcp` |
| [DomainWisp](plugins/domainwisp) | Find available domain names. | None | `https://domainwisp.com/mcp` |
| [Dominio Tech Delivery](plugins/dominio-tech-delivery) | Build food orders. | OAuth | `https://mcp.dominio.tech/mcp` |
| [Domono](plugins/domono) | Play dominoes against Domo. | None | `https://domono.net/mcp` |
| [DomScan](plugins/domscan) | Domain intelligence. | OAuth | `https://domscan.net/mcp` |
| [Domus - Homeowners Ai](plugins/domus-homeowners-ai) | Track appliances & upkeep. | OAuth | `https://api.getdomus.app/mcp` |
| [Domus Aedes](plugins/domus-aedes) | Homes in Spain and Morocco. | None | `https://ai.domusaedes.com/mcp` |
| [Don Licitación](plugins/don-licitacion) | Find public tenders in Spain. | None | `https://donlicitacion.es/conector/chatgpt/mcp` |
| [DoneState](plugins/donestate) | Governed coding with proof. | OAuth | `https://donestate.proofandstate.com/mcp` |
| [doola](plugins/doola) | Form your US LLC in minutes. | OAuth | `https://mcp.doola.com/` |
| [doorledge](plugins/doorledge) | Send rental receipts to review. | OAuth | `https://www.doorledge.com/api/mcp` |
| [dopost](plugins/dopost-chatgpt-marketplace) | Plan and publish social posts. | OAuth | `https://mcp.dopost.co/mcp` |
| [Doppler](plugins/doppler-secrets) | Let agents read the secrets you share from Doppler projects and configs. | API key | `https://mcp.reasonmachines.com/doppler/mcp` |
| [Dorit](plugins/dorit) | Find apartments in Israel. | OAuth | `https://mcp.dorit.bot/mcp` |
| [Dorqa](plugins/dorqa) | Read your site's SEO data. | OAuth | `https://mcp.dorqa.io/mcp` |
| [dotcv](plugins/dotcv) | Read and edit your CV. | OAuth | `https://mcp.dotcv.gr/mcp` |
| [Dotfile](plugins/dotfile) | KYC and KYB compliance. | OAuth | `https://mcp.dotfile.com/mcp` |
| [dots brain](plugins/dots-brain) | Remember the people you know. | OAuth | `https://dots.toktokhan.dev/mcp` |
| [Double](plugins/double) | Automate the month-end close. | OAuth | `https://api.doublehq.com/mcp` |
| [Doublespeed](plugins/doublespeed) | Create slideshows and videos. | OAuth | `https://doublespeed.ai/api/mcp` |
| [Dove Living](plugins/dove-living) | Apartments in Schwandorf. | None | `https://buchen.dove-living.de/mcp` |
| [Dover](plugins/dover) | Manage hiring on Dover. | OAuth | `https://mcp.dover.com/mcp` |
| [DoveRunner Lab](plugins/doverunner-lab) | Secure content and mobile apps. | None | `https://lab.doverunner.com/mcp` |
| [Dovetail Regulatory](plugins/dovetail-regulatory) | Connect to your eQMS. | OAuth | `https://mcp.withdovetail.com/mcp` |
| [DoveVannoINostriSoldi](plugins/dovevannoinostrisoldi) | Explore Italian public data. | None | `https://mcp.dovevannoinostrisoldi.com/mcp` |
| [Dr Nutrition](plugins/dr-nutrition) | Shop nutrition products. | None | `https://mcp.drnutrition.com/mcp` |
| [Dr. Klein](plugins/dr-klein) | Calculate your Mortgage. | None | `https://www.drklein.de/app-services/mcp` |
| [Draft](plugins/draft-jobs) | Your in-house hiring assistant. | OAuth | `https://draft.jobs/api/mcp` |
| [Draftboard](plugins/draftboard) | Warm intros from your network. | OAuth | `https://mcp.draftboard.com/mcp` |
| [draftmend](plugins/draftmend) | Review and export documents. | None | `https://api.draftmend.com/mcp` |
| [Drag](plugins/drag) | Gmail shared inbox for teams. | OAuth | `https://app.dragapp.com/mcp` |
| [DRAIV](plugins/draiv) | Rent a car in Zurich. | None | `https://draiv.ch/mcp` |
| [Drata](plugins/dev-6ad6780989448191af8a01e34bd14734) | Manage compliance in Drata. | OAuth | `https://mcp.drata.com/mcp` |
| [draw.io](plugins/drawio) | Create editable diagrams. | None | `https://mcp.draw.io/mcp` |
| [Draw40](plugins/draw40) | Draw and edit saved diagrams. | OAuth | `https://draw.404040.net/mcp` |
| [DrawKind Secret Santa](plugins/gift-exchange) | Private Secret Santa draws. | None | `https://gift-exchange.zovo.one/mcp` |
| [Dream Life Blueprint](plugins/dream-life-blueprint) | Live your dream life. | OAuth | `https://thedlb.lovable.app/mcp` |
| [Dreambooth Studio](plugins/dreambooth-studio) | Start and run a photobooth. | None | `https://mcp.dreamboothstudio.com/mcp` |
| [DREAMHALL](plugins/dreamhall) | Private self-care workspace. | None | `https://dreamhall.app/mcp` |
| [Dreamwork](plugins/dreamwork) | Find jobs. Prepare to apply. | OAuth | `https://mcp.dreamworkhq.com/mcp` |
| [DREDGE Studio](plugins/dredge-studio) | Review your Studio research. | OAuth | `https://dredgeoriongateway.com/mcp` |
| [DrillSense](plugins/drillsense) | Your well, in context. | OAuth | `https://mcp.drillsense.com/mcp` |
| [Driversnote](plugins/driversnote) | Manage mileage and reports. | OAuth | `https://mcp.driversnote.com/` |
| [Drivethrough](plugins/drivethrough) | Build and publish websites. | OAuth | `https://mcp.drivethrough.dev/mcp` |
| [DrivexIQ One](plugins/dev-6ad16b799ca08191918b80e84330840a) | Read your fleet and work. | OAuth | `https://app.drivexiq.com/api/mcp` |
| [DRIVR](plugins/drivr) | Cars & rentals in Tunisia. | None | `https://mcp.drivr.tn/mcp` |
| [Droit du logement — Québec](plugins/droit-du-logement-quebec) | Info droit du logement — QC. | None | `https://connecteur-logement-qc.vercel.app/mcp` |
| [DroneClear Thailand](plugins/droneclear-thailand) | Thailand drone rules check. | None | `https://www.droneclearthailand.com/mcp` |
| [DropTrack](plugins/droptrack) | Analyze and promote music. | OAuth | `https://mcp.droptrack.com/mcp` |
| [DrugBank](plugins/drugbank) | Analyze drug intelligence. | OAuth | `https://mcp.drugbank.com/mcp` |
| [DrugFree](plugins/drugfree) | View days and savings. | None | `https://drugfree.app/chatgpt/mcp` |
| [DSAIL](plugins/dsail) | Check facts against your rules. | OAuth | `https://agents.jaxon.ai/mcp` |
| [DSCR Loan Calculator](plugins/dscr-loan-calculator) | by OneMoreDoor Capital. | None | `https://onemoredoor.com/api/mcp` |
| [Dubai Table](plugins/dubai-table) | Request tables at Dubai venues. | None | `https://dubaitable.com/mcp` |
| [Dubai Wealth Index Real Estate](plugins/dubai-wealth-index) | Property prices, rents, yields. | OAuth | `https://dubaiwealthindex.com/api/mcp` |
| [duckhunt](plugins/duckhunt) | Inbox, tasks, and work notes. | OAuth | `https://duckhunt.info/mcp` |
| [DUE Brand Deal Commercials](plugins/due-brand-deal-commercials) | Check brand deal terms. | OAuth | `https://brieftopaid.app/mcp` |
| [Dukkani](plugins/dukkani) | Explore your Dukkani store. | OAuth | `https://mcp.dukani.ai/mcp` |
| [DunkAPI](plugins/dunkapi) | NBA basketball data and stats. | OAuth | `https://mcp.dunkapi.com/mcp` |
| [DunSocial](plugins/dunsocial) | Schedule and publish posts. | OAuth | `https://api.dunsocial.com/api/mcp` |
| [Dunzo - Task Assistant](plugins/dunzo-task-assistant) | Capture and manage tasks. | OAuth | `https://api.itsdunzo.com/mcp` |
| [Dupe](plugins/dupe) | Find similar products for less. | None | `https://mcp.dupe.com/mcp` |
| [Durabull: BullMQ & Redis Admin](plugins/durabull) | Manage queues. Retry jobs. | OAuth | `https://app.durabull.io/mcp` |
| [dVeracity](plugins/dveracity) | Verify data against standards. | OAuth | `https://api.dveracity.com/mcp` |
| [Dwelln](plugins/dwelln) | Keep up with your home. | OAuth | `https://api.dwelln.app/mcp` |
| [Dynamoi](plugins/dynamoi) | Music promotion & distribution. | OAuth | `https://dynamoi.com/mcp` |
| [e-eSIM](plugins/e-esim) | Find travel eSIM plans. | None | `https://e-esim.com/wp-json/e-esim/mcp` |
| [e-invoices.it](plugins/e-invoices) | Understand Italian e-invoices. | None | `https://e-invoices.it/mcp` |
| [E&W Premises — RegEvidenceHub](plugins/e-and-w-premises-regevidencehub) | Premises licensing checks. | None | `https://premises.regevidencehub.com/mcp` |
| [EarlyBird](plugins/earlybird) | Find jobs and manage alerts. | OAuth | `https://mcp.earlybird.live/mcp` |
| [Earnings Feed](plugins/earningsfeed) | SEC filings and insider data. | OAuth | `https://earningsfeed.com/api/mcp` |
| [EarningsWatcher](plugins/earningswatcher-public) | Earnings & options research. | OAuth | `https://earnings-watcher-mcp-611514391657.us-central1.run.app/mcp` |
| [Earth Roulette](plugins/earth-roulette) | Random trips and cheap flights. | None | `https://earthroulette.com/mcp` |
| [Easen](plugins/easen) | Your meetings, inside Reason. | OAuth | `https://mcp.easen.ai/mcp` |
| [Easy Email Verification](plugins/easy-email-verification) | Verify emails, reduce bounces. | OAuth | `https://mcp.easyemailverification.com/mcp` |
| [Easy Trades](plugins/easy-trades) | Find local trades and jobs. | None | `https://easytrades.co.uk/mcp` |
| [EasyGerber](plugins/easygerber) | AI PCB design and layout. | OAuth | `https://www.easygerber.com/api/mcp` |
| [EasyPDF](plugins/easypdf) | Edit, compress and merge PDFs. | OAuth | `https://www.easypdf.fr/mcp/` |
| [easySales](plugins/easysales) | CRM and sales management. | OAuth | `https://app.easysales.work/mcp` |
| [Eat or Yeet](plugins/eat-or-yeet) | Check food warning coverage. | None | `https://eatoryeet.app/mcp` |
| [EatMePrint](plugins/eatmeprint) | Order photo-printed macarons. | None | `https://eatmeprint-mcp.eatmeprint.workers.dev/mcp` |
| [EbooksDepository](plugins/ebooksdepository) | Books, ebooks & audiobooks. | None | `https://ebooksdepository.com/mcp` |
| [ECDB](plugins/ecdb) | Use ECDB in Reason. | OAuth | `https://mcp.ecdb.com/mcp` |
| [eCFR by 1102tools](plugins/ecfr-by-1102tools) | Explore federal regulations. | None | `https://ecfr.1102tools.com/mcp` |
| [Echo UI](plugins/echo-ui) | Tactile components, your style. | None | `https://mcp.echo-ui.com/mcp` |
| [Eclat Institute](plugins/eclat-institute) | Singapore A-Level Guide. | None | `https://mcp.eclatinstitute.sg/mcp` |
| [ecoExperten Energieausweis](plugins/ecoexperten-energieausweis) | Energieausweis bestellen. | None | `https://mcp.ecoexperten.com/mcp` |
| [EcoGPT](plugins/ecogpt) | AI's footprint, with sources. | None | `https://ecogpt.com/mcp` |
| [Ecomhint](plugins/ecomhint) | Ecommerce conversion audits. | OAuth | `https://ecomhint.com/api/mcp` |
| [Ecommerce Leads](plugins/ecommerce-leads) | Ecommerce store metrics lookup. | OAuth | `https://getecommerceleads.com/api/mcp` |
| [Economic Mind](plugins/economic-mind) | Traceable market insights. | OAuth | `https://mcp.economicmind.com/mcp` |
| [EconomicsAPI](plugins/economicsapi) | Macro, trade, commodities & FX. | OAuth | `https://mcp.economicsapi.com/mcp` |
| [Economiza Alagoas](plugins/economiza-alagoas) | Compare preços em Alagoas. | None | `https://economiza-alagoas-actions.onrender.com/mcp` |
| [EconomyBookings](plugins/economybookings) | Find and compare rental cars. | None | `https://mcp.economybookings.com/mcp` |
| [Eddie](plugins/eddie) | Edit your footage by talking. | OAuth | `https://mcp.heyeddie.ai/api/mcp` |
| [Eden](plugins/eden) | Find content that's working. | OAuth | `https://mcp.eden.so/mcp` |
| [Edge Skills](plugins/edge) | Find and load the right skill. | None | `https://getedge.cc/mcp` |
| [EdgeBreak](plugins/edgebreak) | NASDAQ market intelligence. | OAuth | `https://edgebreak.ai/mcp` |
| [Edgemesh](plugins/edgemesh) | Interface with Edgemesh's MCP. | OAuth | `https://mcp.edgemesh.com/mcp` |
| [Edgio Signals](plugins/edgio-signals) | Aktien & Sektoren einordnen. | None | `https://plugin.edgio.at/mcp/chatgpt` |
| [EduInsights](plugins/eduinsights) | Research colleges and careers. | OAuth | `https://mcp.eduinsights.ai/mcp` |
| [EduJobs](plugins/edujobs) | Find teaching and school jobs. | None | `https://edujobs.org/api/mcp` |
| [eesel](plugins/eesel) | Customer support AI teammate. | None | `https://eesel.ai/mcp` |
| [EF Ultimate Break](plugins/ef-ultimate-break) | Find group travel for 18-35s. | None | `https://mcp.efultimatebreak.com/mcp` |
| [Egantic](plugins/egantic) | Bol-marktdata in je AI. | OAuth | `https://egantic.ai/mcp` |
| [EggVerse](plugins/eggverse) | play together anywhere. | None | `https://eggverse.co/mcp` |
| [Egleze](plugins/egleze) | Search verified podcast news. | None | `https://egleze-mcp-server.onrender.com/mcp` |
| [Egnyte](plugins/egnyte) | Find and manage Egnyte files. | OAuth | `https://mcp-server.egnyte.com/mcp` |
| [eHour](plugins/ehour) | Track time and project hours. | OAuth | `https://app.ehour.com/mcp` |
| [eIgreja](plugins/eigreja) | eIgreja Manual. | None | `https://mcp.eigreja.com/mcp` |
| [Ekklo](plugins/ekklo) | Coach workspace actions. | OAuth | `https://api.prod.ekklo.com/api/v1/mcp` |
| [Ekohesap](plugins/ekohesap) | Yapay Zekalı Ön Muhasebe. | OAuth | `https://mcp.ekohesap.com/mcp` |
| [eksis](plugins/eksis) | Schedule social media posts. | OAuth | `https://api.eksis.io/mcp` |
| [Elastic](plugins/elastic) | Elastic skills and documentation — Elasticsearch, Kibana, Observability, Security, Cloud, ES\|QL, OpenTelemetry, and MCP docs access | None | `https://www.elastic.co/docs/_mcp/` |
| [Electric State](plugins/electric-state) | Festival set times & bookings. | None | `https://api.electricstate.app/mcp` |
| [ElectricityFinder](plugins/electricityfinder) | Compare Texas power plans. | None | `https://electricityfinder.online/mcp` |
| [Elecz - Electricity Prices](plugins/elecz-electricity-prices) | Real-time Electricity Prices. | None | `https://elecz.com/mcp` |
| [ELEN Story AI](plugins/elen-story-ai) | Read and create family stories. | None | `https://elenstoryai.com/mcp` |
| [Elevate Invoices](plugins/elevate-invoices) | Create and manage invoices. | None | `https://invoice-mcp.elevate.ee/mcp` |
| [ElevenFlo](plugins/elevenflo) | Bankruptcy data & research. | OAuth | `https://elevenflo.com/mcp` |
| [ElevenLabs](plugins/elevenlabs) | ElevenLabs voice AI — text-to-speech, voice agents, and speech engine skills, agent management via the ElevenLabs hosted MCP server, plus Architect skills for building and iterating on ElevenLabs… | OAuth | `https://api.us.elevenlabs.io/v1/mcp` |
| [Eli](plugins/eli) | Test if AI can do business. | None | `https://hireeli.io/api/mcp-public/mcp` |
| [Elicit](plugins/elicit) | Search scientific literature. | OAuth | `https://elicit.com/api/mcp` |
| [Ellie](plugins/ellie) | Plan and manage your tasks. | OAuth | `https://mcp.ellieplanner.com/mcp` |
| [Ellora](plugins/ellora) | Brand voice QA for drafts. | OAuth | `https://api.getellora.com/v1/external/mcp` |
| [Email Spam Tester](plugins/email-spam-tester) | Check email before you send. | None | `https://email-spam-tester.com/mcp` |
| [Emailit](plugins/emailit) | Send email and run campaigns. | OAuth | `https://api.emailit.com/mcp` |
| [Emailr](plugins/emailr) | Review email workspace data. | OAuth | `https://mcp.emailr.dev/mcp` |
| [emaqi](plugins/emaqi) | Discover manga on emaqi. | None | `https://mcp.emaqi.com/mcp` |
| [Embarka](plugins/embarka) | Family trips paced for kids. | None | `https://embarka.ai/mcp` |
| [Embarko](plugins/embarko) | Deploy and manage Embarko apps. | OAuth | `https://mcp.embarko.ai/mcp` |
| [Embat](plugins/embat) | Chat with Embat. | OAuth | `https://tellme.embat.io/mcp` |
| [Embedr](plugins/embedr) | Design circuits and PCBs. | OAuth | `https://mcp.embedr.app/mcp` |
| [EmbedSocial](plugins/embedsocial) | Your UGC and widget analytics. | OAuth | `https://embedsocial.com/admin/mcp` |
| [Ember Websites](plugins/ember-websites) | Websites for small businesses. | OAuth | `https://embersites.app/mcp` |
| [Embrasure](plugins/embrasure) | Warehouse, analytics, charts. | OAuth | `https://embrasure.ai/api/mcp` |
| [emem](plugins/emem) | Signed facts about real places. | None | `https://emem.dev/mcp` |
| [Emisso Connect](plugins/emisso-connect) | Consulta SII y bancos de Chile. | OAuth | `https://connect.emisso.ai/mcp` |
| [Empirical Memory](plugins/empirical-memory) | Memory across your AI tools. | OAuth | `https://empirical.gauzza.com/mcp` |
| [empirio.ai](plugins/empirio-ai) | Create and analyze surveys. | OAuth | `https://platform.empirio.ai/mcp` |
| [EmpirioLabs AI](plugins/empiriolabs) | Run 180+ AI models as tools. | OAuth | `https://mcp.empiriolabs.ai/mcp` |
| [EmpleoVivo](plugins/empleovivo) | Open jobs in Chile. | None | `https://empleovivo.cl/mcp` |
| [Employed by Guaq AI](plugins/employed) | Live jobs from verified ATS. | OAuth | `https://jobs.guaqai.me/mcp` |
| [EMPLOYERS](plugins/employers) | Get a workers' comp quote. | None | `https://mcp.employers.com/direct/mcp` |
| [EN Training](plugins/en-training) | Practise English grammar. | None | `https://ruslan.pro/mcp` |
| [Encelade](plugins/encelade) | Create and manage decks. | OAuth | `https://www.encelade.ai/api/mcp` |
| [Endless U](plugins/endless-u) | Structured learning in Chat. | OAuth | `https://mcp.endlessu.ai/mcp` |
| [EndzoneAPI](plugins/endzoneapi) | NFL football data and stats. | OAuth | `https://mcp.endzoneapi.com/mcp` |
| [Energy Aspects](plugins/energy-aspects) | Commodities insights. | OAuth | `https://mcp.energyaspects.com/mcp` |
| [Energy Ogre](plugins/energy-ogre) | Estimate electricity savings. | None | `https://agent-app-mcp.aws.energyogre.com/mcp` |
| [EnergyBot](plugins/energybot) | Compare Electricity Rates. | None | `https://mcp.energybot.com/mcp` |
| [EnergyIA.AR](plugins/energyia-ar) | Argentine energy & mining data. | OAuth | `https://energyia.ar/mcp` |
| [Engage Media Suite](plugins/engage-media-suite) | Create Reels and carousels. | OAuth | `https://engagemediasuite.com/mcp` |
| [Enginy](plugins/enginy) | Find and reach B2B contacts. | OAuth | `https://openapi.enginy.ai/mcp` |
| [England CQC — RegEvidenceHub](plugins/england-cqc-regevidencehub) | CQC compliance workflows. | None | `https://cqc.regevidencehub.com/ai/mcp` |
| [Engram](plugins/engram) | Long-term memory for your AI. | OAuth | `https://mcp.getengram.app/mcp` |
| [Enjoyvent](plugins/enjoyvent) | Find concerts, shows & events. | None | `https://api.enjoyvent.com/mcp` |
| [Enlazá para WhatsApp Business](plugins/enlaza) | Your WhatsApp Business inbox. | OAuth | `https://enlaza.chat/mcp` |
| [Enoki](plugins/enoki) | Security testing for AI agents. | OAuth | `https://mcp.enokilabs.ai/mcp` |
| [Enterpret](plugins/enterpret) | Enterpret integration to get answers from unified customer feedback | OAuth | `https://wisdom-api.enterpret.com/server/mcp` |
| [Enzo Reader for RSS Feeds](plugins/enzo-reader-for-rss-feeds) | Read your feeds and news. | OAuth | `https://chatgpt.enzoreader.com/mcp` |
| [EosLog](plugins/eoslog) | Quotes, invoices and pricing. | None | `https://eoslog.com/mcp/free` |
| [EPK Properties](plugins/epk-properties) | Find homes and guides. | None | `https://mcp.epkproperties.com/mcp` |
| [Epsilo](plugins/epsilo) | Retail media ads, answered. | OAuth | `https://mcp.epsilo.ai/ads` |
| [EQ Funding](plugins/eq-funding) | Find business lenders. | None | `https://www.eqfunding.com/api/mcp` |
| [Eqolux](plugins/eqolux) | Analyze your purchasing data. | OAuth | `https://mcp.eqolux.com/mcp` |
| [Equation.io](plugins/equation-io) | Interactive 2D and 3D graphs. | None | `https://equation.io/mcp` |
| [Equibles](plugins/equibles) | Stock market data & options. | OAuth | `https://mcp.equibles.com/mcp` |
| [Eraser](plugins/eraser) | Eraser integration to generate, manage, and update diagrams and docs | OAuth | `https://app.eraser.io/api/mcp` |
| [EscapeStays by Luxury Lodging](plugins/escapestays-by-luxury-lodging) | Book vacation rentals direct. | None | `https://stay.luxurylodgingpm.com/mcp` |
| [esigna](plugins/esigna) | Design your email signature. | None | `https://esigna.app/mcp` |
| [eSignatures.com](plugins/esignatures-com) | Draft, send & manage contracts. | OAuth | `https://esignatures.com/mcp` |
| [eSIM Finder](plugins/esim-finder) | Find and compare travel eSIMs. | OAuth | `https://mcp.esimfinder.io/api/v1/mcp` |
| [eSIM For U](plugins/esim-for-u) | Mobile data for your trips. | None | `https://mcp.esimforu.app/mcp` |
| [eSIM-Global.VIP](plugins/esim-global-vip) | Travel eSIMs worldwide. | None | `https://esim-global.vip/esimshop/wp-json/esimglobal/mcp` |
| [esim.tc eSIM Paketleri](plugins/esimtc) | Yurt dışı eSIM paket bul. | None | `https://esim.tc/mcp` |
| [eSIMradar](plugins/esimradar) | Compare travel eSIM plans. | None | `https://esimradar.com/mcp` |
| [Esment](plugins/esment) | Private AI memory. | OAuth | `https://mcp.notas.ai/mcp` |
| [Espresso Dial-In Calculator](plugins/espresso-dial-in-calculator) | Fix your espresso shot. | None | `https://mcp.puckbean.com/mcp` |
| [ESQ CoPilot Matching Engine](plugins/esq-copilot-matching) | Find a licensed lawyer. | None | `https://mcp.esqcopilot.com/mcp` |
| [EstimateKit](plugins/estimatekit) | Quotes, jobs and invoices. | OAuth | `https://mcp.estimatekit.com/mcp` |
| [ETFtracker](plugins/etftracker) | Australian ETF research. | None | `https://mcp.etftracker.com.au/mcp` |
| [ether.fi](plugins/ether-fi) | Read your ether.fi account. | OAuth | `https://mcp.ether.fi/mcp` |
| [Etherscan](plugins/etherscan) | Explore live blockchain data. | None | `https://mcp-keyless.etherscan.io/mcp` |
| [Ethos](plugins/ethos) | Protect your family in minutes. | None | `https://eg.ethoslife.com/mcp` |
| [eToro Trading](plugins/etoro-trading) | View your eToro portfolio, balances, positions, and watchlists, research instruments and traders, and prepare and place trades. | OAuth | `https://mcp.public-api.etoro.com` |
| [Etropo](plugins/etropo) | Plan and track marketing spend. | OAuth | `https://app.etropo.com/api/mcp` |
| [EU Money](plugins/eu-money) | Find EU funding in Hungary. | None | `https://eumoney.hu/chatgpt/mcp` |
| [EULER for Partner Managers](plugins/euler-for-partner-managers) | Skills for partner-relationship managers (customer-admin scope) that orchestrate the EULER MCP: generate a Quarterly Business Review, pre-meeting partner briefings, a whole-portfolio pulse, and… | OAuth | `https://mcp.eulerapp.com/mcp` |
| [Europea Seguros](plugins/europea-seguros) | Insurance quotes. | None | `https://v1.europea-seguros.mcp.waniwani.run/mcp` |
| [Eve Cortex](plugins/eve-cortex) | Long-term memory you control. | OAuth | `https://eve-product.fly.dev/eve-mcp/mcp` |
| [Evelyn Tarot](plugins/evelyn-tarot) | Tarot you draw yourself. | None | `https://tarott.ai/mcp` |
| [Evenda](plugins/evenda) | Your organizer workspace. | OAuth | `https://evenda.io/mcp` |
| [EventMatch](plugins/eventmatch) | Prioritize event prospects. | OAuth | `https://eventmatch.ai/mcp` |
| [Events for Organisers](plugins/events-mt-organisers) | Manage events and invitations. | OAuth | `https://events.com.mt/mcp/organizer` |
| [Events.lc](plugins/events-mt) | Find events in Malta. | None | `https://events.lc/mcp` |
| [eventshub](plugins/eventshub) | What's on in Cyprus. | None | `https://eventshub.cy/mcp` |
| [Eventtia](plugins/eventtia) | Manage events and attendees. | OAuth | `https://connect-mcp.eventtia.com/mcp` |
| [Evercraft](plugins/evercraft) | Route into Evercraft. | None | `https://fabric.systemiacommandcenters.com/mcp` |
| [Everest Group AI](plugins/everest-group-ai) | Access Everest Group research. | OAuth | `https://mcp.everestgrp.com/mcp` |
| [Everloot](plugins/everloot) | WoW: Forever data with sources. | None | `https://everloot.app/mcp/public` |
| [evertrain](plugins/evertrain) | Plan and adjust your training. | OAuth | `https://mcp.evertrain.app/mcp` |
| [Every](plugins/every) | Invoice, track deals, get paid. | OAuth | `https://admin-mcp.every.ai/mcp` |
| [Everygen](plugins/everygen) | Create videos with AI. | OAuth | `https://everygen.ai/api/mcp` |
| [Everyn](plugins/everyn) | Enrich datasets. | OAuth | `https://mcp.everyn.ai/mcp` |
| [Everythings](plugins/everythings) | Review what your agents write. | OAuth | `https://www.everythings.app/api/mcp` |
| [Evidence Board](plugins/evidence-board) | Case boards for investigations. | OAuth | `https://evidence.mtgtechnical.com/api/mcp` |
| [Evidence Deflator](plugins/evidence-deflator) | Trader skill, or just luck? | None | `https://api.evidencedeflator.com/mcp` |
| [Evlek](plugins/evlek) | Northern Cyprus property data. | None | `https://evlek.app/api/mcp` |
| [Exa](plugins/exa) | Give agents live web search and page-fetch tools through Exa's hosted MCP server. | OAuth | `https://mcp.exa.ai/mcp` |
| [Examen Civique](plugins/examen-civique) | Practice the French civic exam. | None | `https://examen-civique-alice.fr/mcp` |
| [Exayard](plugins/exayard) | Takeoffs, pricing and bids. | OAuth | `https://api.exayard.com/mcp` |
| [Excalidraw](plugins/excalidraw) | Draw and export hand-drawn diagrams from chat. | None | `https://mcp.excalidraw.com/mcp` |
| [Executor](plugins/executor) | A universal tool gateway for AI agents. | OAuth | `https://executor.sh/mcp` |
| [Exomem](plugins/exomem-cloud) | Proactive, grounded AI memory. | OAuth | `https://exomem.substratesystems.io/mcp` |
| [Expat Savings Rates](plugins/expat-savings-rates) | Offshore savings rates. | None | `https://plugins.bratucapital.com/savings/mcp` |
| [Expense Tracker](plugins/expense-agent) | Track and export expenses. | OAuth | `https://expenseagent.reviewbit.app/mcp` |
| [ExpenseOS](plugins/expenseos) | File expense reports in chat. | None | `https://mcp.purafi.ai/mcp` |
| [ExplorationMaps](plugins/explorationmaps) | Map and search mineral claims. | None | `https://www.explorationmaps.com/mcp/server` |
| [Expo](plugins/expo) | Expo's hosted MCP server: query your Expo projects, EAS builds, updates and submissions, and get Expo/React Native guidance. | OAuth | `https://mcp.expo.dev/mcp` |
| [Exportlab](plugins/exportlab) | Manage creative workflows. | OAuth | `https://mcp.exportlab.io/mcp` |
| [Express Legal Funding](plugins/express-legal-funding) | Apply for legal funding. | None | `https://mcp.expresslegalfunding.com/mcp` |
| [Extend](plugins/extend) | Document processing for agents: parse, extract, classify, and split PDFs, images, Office docs, spreadsheets, and emails, plus PDF form filling. | OAuth | `https://mcp.extend.ai/mcp` |
| [Extole](plugins/extole) | Extole program insights. | OAuth | `https://mcp.extole.com/mcp` |
| [Extreme Wind](plugins/extreme-wind) | Wind & waves for beach days. | OAuth | `https://extremeapp.app/mcp` |
| [ExTweets](plugins/extweets) | Twitter accounts in one place. | OAuth | `https://extweets.com/mcp` |
| [Eyivo Sites](plugins/eyivo-sites) | Manage your Eyivo sites. | OAuth | `https://app.eyivo.com/mcp` |
| [EZFlow Pro](plugins/ezflow-pro) | Create estimates and invoices. | OAuth | `https://mcp.ezflowpro.com/mcp` |
| [Ezoic Setup](plugins/ezoic-setup) | Set up Ezoic ads on your site. | None | `https://setup-agent.ezoic.com/mcp` |
| [EzUGC](plugins/ezugc) | Generate AI ads and videos. | OAuth | `https://api.ezugc.ai/mcp` |
| [EzzyBills](plugins/ezzybills) | Build apps with EzzyBills APIs. | None | `https://mcp.ezzybills.com/mcp` |
| [Fablyn](plugins/fablyn) | Create videos and slides. | OAuth | `https://fablyn.app/mcp` |
| [Fabric](plugins/fabric) | Ask your knowledge base. | OAuth | `https://mcp.api.fabric.so/mcp` |
| [Faceless.video](plugins/faceless-video) | Create a Faceless Channel. | OAuth | `https://mcp.faceless.video/api/mcp` |
| [Faces](plugins/faces) | Build slide decks. | OAuth | `https://mcp.faces.app/mcp` |
| [FactIQ](plugins/factiq) | Investment and economic data. | OAuth | `https://api.factiq.com/mcp` |
| [FactoGraph](plugins/factograph) | Approved facts, cited answers. | None | `https://api.factograph.app/api/mcp` |
| [FactorWeave](plugins/factorweave) | Quant-factor data for tickers. | OAuth | `https://factorweave.com/api/mcp` |
| [FactoryFox](plugins/factoryfox) | Find industrial suppliers. | None | `https://getfactoryfox.com/api/mcp` |
| [FactSet AI-Ready Data](plugins/factset) | Seamless Financial Data. | OAuth | `https://mcp.factset.com/mcp` |
| [Fahali](plugins/fahali) | Market intel for AI agents. | OAuth | `https://mcp.fahaliai.com/mcp` |
| [fairw.ai](plugins/fairw-ai) | Your meetings in Reason. | OAuth | `https://app.fairw.ai/api/mcp` |
| [Fairwhen](plugins/fairwhen) | Best day for outdoor plans. | None | `https://fairwhen.com/mcp` |
| [Fakturoid](plugins/fakturoid) | Online invoicing. | OAuth | `https://app.fakturoid.cz/mcp/v1/` |
| [fal](plugins/fal-ai) | Create images, video, music, voice and 3D from a prompt. | OAuth | `https://mcp.fal.ai/mcp-relay` |
| [Falconer](plugins/falconer) | Read, search, and update Falconer documents from Reason through hosted HTTP MCP. | OAuth | `https://falconer.com/api/mcp` |
| [Family Trip Budget](plugins/family-trip-budget) | Family trip costs in seconds. | None | `https://www.endlesstravelplans.com/mcp` |
| [FamilyWall](plugins/familywall) | Family life, made simple. | OAuth | `https://mcp.familywall.com/mcp` |
| [FamyTree](plugins/famytree) | Save family research as a tree. | None | `https://famytree.net/mcp` |
| [Fareeqy \| فريقي](plugins/fareeqy) | Manage your team's tasks. | OAuth | `https://app.fareeqy.com/api/mcp` |
| [Farmbit](plugins/farmbit) | Plan your orchard scout. | None | `https://farmbit.ai/mcp` |
| [Farmooly](plugins/farmooly) | Find local food & markets. | None | `https://farmooly.com/mcp` |
| [FastballAPI](plugins/fastballapi) | MLB baseball data and stats. | OAuth | `https://mcp.fastballapi.com/mcp` |
| [Fastio](plugins/fast-io) | Fastio workspaces for agents and the people they work with: files, shares, comments, metadata and AI search through the Fastio MCP server, plus the agent guide as a skill. | OAuth | `https://mcp.fast.io/mcp/tools` |
| [FastQuotes](plugins/fastquotes) | Get freight shipping quotes. | OAuth | `https://fastquotes.io/mcp` |
| [Fathom](plugins/fathom) | Search meetings and pull transcripts and summaries. | OAuth | `https://api.fathom.ai/mcp` |
| [Fattura24](plugins/fattura24) | Accedi ai dati di Fattura24. | OAuth | `https://www.app.fattura24.com/mcp` |
| [Favicon Generator](plugins/favicon-generator) | Create a favicon for any site. | None | `https://mcp.tools.ciromaciel.click/` |
| [Fax Anything](plugins/fax-anything-connector) | Send faxes from the chat. | OAuth | `https://mcp.faxanything.com/mcp` |
| [Fax.live](plugins/fax-live) | Send PDFs by fax. | OAuth | `https://mcp.fax.live/mcp` |
| [FCData](plugins/fcdata) | FC cards, prices and upgrades. | None | `https://mcp.fcdata.io/mcp` |
| [FeatPaper](plugins/featpaper) | Make and share documents. | OAuth | `https://mcp.featpaper.com/mcp` |
| [FeedbackBasket](plugins/feedbackbasket) | Manage feedback and bugs. | OAuth | `https://feedbackbasket.com/.well-known/mcp` |
| [Feedbk.ai Survey Agent](plugins/feedbk-ai-survey-agent) | Create AI-powered surveys. | None | `https://mcp.feedbk.ai/mcp` |
| [FeedBoss](plugins/feedboss) | Draft and score LinkedIn posts. | OAuth | `https://server.feedboss.ai/api/v1/mcp` |
| [Feedspace](plugins/feedspace) | Manage testimonials. | OAuth | `https://mcp.feedspace.io/mcp` |
| [Feedster](plugins/feedster) | The best of the web, for you. | OAuth | `https://mcp.feedster.co/mcp` |
| [Fenestra](plugins/fenestra) | AI renders for architects. | OAuth | `https://mcp.fenestra.app/mcp` |
| [Ferb](plugins/ferb) | Ask about your studio's data. | OAuth | `https://mcp.ferb.co/mcp` |
| [Fernweh Charge](plugins/fernweh-charge) | Live EV charging in Germany. | None | `https://charge.fernweh.world/mcp` |
| [Ferryhopper](plugins/ferryhopper) | Search and compare ferries. | None | `https://mcp.ferryhopper.com/mcp` |
| [Fibery](plugins/fibery) | Build your modular workspace. | OAuth | `https://mcp.fibery.io/mcp` |
| [Fibre Compare](plugins/fibre-compare) | UK fibre broadband checker. | None | `https://fibrecompare.com/mcp` |
| [FICTURN](plugins/ficturn) | Short fiction inside Reason. | None | `https://ficturn.thomas-judes.workers.dev/mcp` |
| [FieldDraft](plugins/fielddraft) | Job notes to Jobber quotes. | OAuth | `https://fielddraftapp.com/mcp` |
| [Fieldproxy](plugins/fieldproxy) | Run field service operations. | OAuth | `https://api-india-1.fieldproxy.ai/mcp` |
| [FieldScore](plugins/fieldscore) | Spørg til danske marker. | OAuth | `https://fieldscore.dk/api/mcp` |
| [Fieldy](plugins/fieldy) | Recall Fieldy conversations. | OAuth | `https://api.fieldy.ai/mcp` |
| [Fielmo](plugins/fielmo) | Service biz, searchable by AI. | OAuth | `https://mcp.fielmo.com/mcp` |
| [Fiest Business](plugins/fiest) | Run your restaurant with Fiest. | OAuth | `https://mcp.fiest.io/mcp` |
| [FiestaDigital](plugins/fiestadigital) | Manage sites and content. | OAuth | `https://fiestadigital.es/mcp` |
| [Figaro Immobilier](plugins/figaro-immobilier) | Find the ideal property. | None | `https://immobilier.lefigaro.fr/mcp` |
| [FighterAPI](plugins/fighterapi) | MMA fight data and stats. | OAuth | `https://mcp.fighterapi.com/mcp` |
| [Figr](plugins/figr) | Design Agent for Product Teams. | OAuth | `https://mcp.figr.design/mcp` |
| [FigureLane](plugins/figurelane) | Records and accountant reports. | OAuth | `https://figurelane.com/mcp` |
| [FileFast](plugins/filefast) | Upload links that report back. | OAuth | `https://mcp.file.fast/mcp` |
| [FileIt](plugins/fileit) | Family document vault. | OAuth | `https://fileit.com/mcp` |
| [FilePost](plugins/filepost) | Upload files to public links. | OAuth | `https://filepost.dev/mcp` |
| [FilingSpy](plugins/filingspy) | SEC filings, funds & insiders. | None | `https://filingspy.com/api/mcp/demo` |
| [Fillo](plugins/fillo) | Build and publish forms. | OAuth | `https://fillo.so/mcp` |
| [Fin3000](plugins/fin3000) | Belege und Buchhaltung. | OAuth | `https://api.fin3000.com/mcp` |
| [FinalPeace](plugins/finalpeace) | Will rules and loss checklist. | None | `https://mcp.finalpeace.co/mcp` |
| [Financial Datasets](plugins/financial-datasets) | Access stock market data. | OAuth | `https://mcp.financialdatasets.ai/mcp` |
| [Financial Summarizer Pro](plugins/financial-summarizer-pro) | Get instant financial details. | None | `https://gpt.perceptive-analytics.com/financial-summarizer/mcp` |
| [FinancialFilings](plugins/financialfilings) | Company filings & financials. | OAuth | `https://mcp.financialfilings.com/mcp` |
| [Finara Personal Finance](plugins/finara-personal-finance) | Track balances and expenses. | OAuth | `https://mcp.finarasystem.com/mcp` |
| [Finary](plugins/finary) | Understand your finances. | OAuth | `https://public-api.finary.com/mcp` |
| [Find My Cruise](plugins/find-my-cruise) | Search cruises by port & date. | None | `https://thecruisinginsider.com/mcp` |
| [Find My Money](plugins/find-my-money) | Find unclaimed money. | None | `https://goodturn-mcp.pages.dev/findmymoney/mcp` |
| [Find Your Career](plugins/findyourcareer) | Find jobs matching your needs. | OAuth | `https://findyourcareer.io/mcp` |
| [Findable](plugins/findable) | Search and AI visibility. | None | `https://thefindable.co/mcp` |
| [FindBroadband](plugins/findbroadband) | Compare UK broadband deals. | None | `https://www.findbroadbanddeals.com/api/mcp` |
| [FindCamp](plugins/findcamp) | Does this campsite fit you? | None | `https://findcamp.cc/api/mcp` |
| [FindChildcare.ca](plugins/findchildcare) | Find childcare across Canada. | None | `https://findchildcare.ca/api/mcp/claude` |
| [FindEnergyRates](plugins/findenergyrates) | Compare electricity plans. | None | `https://findenergyrates.com/mcp/public` |
| [Finder: local tradespeople](plugins/finder-local-services) | Find local trades and services. | None | `https://mcp.finder-marketing.se/mcp` |
| [FindIp](plugins/findip) | Semantic patent search. | OAuth | `https://mcp.findip.ai/mcp` |
| [FindMyBids](plugins/findmybids) | Bids that fit your business. | None | `https://findmybids.com/mcp` |
| [FindTunes](plugins/findtunes) | Find songs from video links. | None | `https://findtunes.app/mcp` |
| [Fingerprint](plugins/fingerprint) | Query fraud & device signals. | OAuth | `https://mcp.fpjs.io/mcp` |
| [FinLens](plugins/finlens) | Vietnam finance data. | OAuth | `https://mcp.finlens.vn/mcp` |
| [Finmode](plugins/finmode) | Stock & ETF research. | None | `https://mcp.finmode.app/mcp` |
| [FINN](plugins/finn) | Just drive FINN. | None | `https://www.finn.com/api/mcp` |
| [Finology Software](plugins/finology-software) | Student loan repayment math. | OAuth | `https://mcp.finology.tech/mcp` |
| [Finometr](plugins/finometr) | Cash flow, forecast, budgets. | OAuth | `https://finometr.com/mcp` |
| [FinPilot](plugins/finpilot) | Controle financeiro pessoal. | OAuth | `https://mcp.finpilot.ia.br/mcp` |
| [FinRank Shiver](plugins/finrank-shiver) | Bank intelligence. | OAuth | `https://mcp.usefinrank.com/mcp` |
| [Finseo](plugins/finseo) | Track AI Visibility, AEO & GEO. | OAuth | `https://api.finseo.ai/v1/mcp` |
| [Fintable](plugins/fintable) | Keep track of your finances. | OAuth | `https://fintable.io/mcp` |
| [Fintoc](plugins/fintoc) | Access your financial data. | OAuth | `https://mcp.fintoc.com/mcp` |
| [FINTRX](plugins/fintrx) | FINTRX data at your fingertips. | OAuth | `https://aia.fintrx.com/mcp` |
| [FiraQuantumSafe](plugins/firaquantumsafe) | Website TLS and PQC checks. | None | `https://www.firaquantumsafe.com/mcp` |
| [Firecrawl](plugins/firecrawl) | Give agents crawling, scraping, search, and extraction tools through Firecrawl's hosted MCP server. | OAuth | `https://mcp.firecrawl.dev/v2/mcp-oauth` |
| [Fireflies](plugins/fireflies) | Search meeting transcripts, summaries, and action items. | OAuth | `https://api.fireflies.ai/mcp` |
| [Firepan Sentinel](plugins/firepan-sentinel) | Published token assessments. | None | `https://api.firepan.com/mcp` |
| [firestorage.ai](plugins/firestorage-ai) | Upload and send files. | None | `https://mcp.firestorage.ai/mcp` |
| [FIRMEN.directory](plugins/firmen-directory) | Swiss & Austrian company facts. | None | `https://mcp.firmen.directory/mcp` |
| [Firmenliste](plugins/firmenliste) | Find B2B company addresses. | None | `https://firmenliste-mcp.cf-firmenliste.workers.dev/` |
| [FirstTouch](plugins/firsttouch) | Run outreach flows and tasks. | OAuth | `https://mcp.firsttouch.com/mcp` |
| [Fiscal.ai](plugins/fiscal-ai) | Research public companies. | OAuth | `https://api.fiscal.ai/mcp` |
| [FishFriender](plugins/fishfriender) | Your fishing companion. | OAuth | `https://www.fishfriender.com/mcp` |
| [Fit File Forge](plugins/fit-file-forge) | Your training, analyzed. | OAuth | `https://mcp.fitfileforge.com/mcp` |
| [Fitbod](plugins/fitbod) | Get your next workout. | None | `https://mcp.fitbod.me/mcp` |
| [FitCard](plugins/fitcard) | Shirt sizes from your shirts. | None | `https://fitcard.ai/mcp` |
| [FiTin](plugins/fitin) | Ask AI about your FiTin logs. | OAuth | `https://fitin.co.jp/mcp` |
| [Fitralo](plugins/fitralo) | Find European road carriers. | None | `https://fitralo.com/mcp` |
| [Fitzap](plugins/fitzap) | Training and nutrition. | OAuth | `https://fitzapapps.com/mcp` |
| [Fiveable for AP Students](plugins/fiveable-for-ap-students) | Study for every AP class. | None | `https://fiveable.me/api/mcp` |
| [Fiverr](plugins/fiverr) | Find and hire freelancers. | None | `https://mcp.fiverr.com/mcp` |
| [Fix & Flip Term Sheet](plugins/instant-fix-and-flip-term-sheet) | Fix-and-flip loan term sheets. | None | `https://dominickprevete.com/api/mcp/fix-and-flip` |
| [fixRAgent](plugins/fixragent) | Maintenance photo triage. | None | `https://fixragent.com/mcp` |
| [Fixture and Finish](plugins/fixture-and-finish) | Selections for custom homes. | OAuth | `https://fixtureandfinish.com/mcp` |
| [Flash](plugins/flash) | Spaced-repetition flashcards. | OAuth | `https://flashmemorize.com/mcp` |
| [Flashloop](plugins/flashloop) | Create AI videos and images. | OAuth | `https://mcp.flashloop.ai/mcp` |
| [Flask](plugins/flask) | Video review & collaboration. | OAuth | `https://api.flask.do/api/mcp/mcp` |
| [Flat](plugins/flat) | Create and read sheet music. | OAuth | `https://mcp.flat.io/mcp` |
| [FlatHunt](plugins/flathunt) | Furnished housing in Berlin. | None | `https://mcp.flat-hunt.com/mcp` |
| [Flatovo](plugins/flatovo) | Find Belgrade rentals. | None | `https://flatovo.rodn.dev/api/mcp` |
| [Flaut.Travel](plugins/flaut-travel) | Find flights & explore fares. | None | `https://flaut.travel/mcp` |
| [FlawPilot](plugins/flawpilot) | Web Security & SEO Scanner. | OAuth | `https://mcp.flawpilot.com/mcp` |
| [Flexport](plugins/flexport) | Connect your Flexport account via the hosted MCP at mcp.flexport.com/mcp: look up shipments, check rates, search your network, and book freight using natural language. | OAuth | `https://mcp.flexport.com/mcp` |
| [FlexWaiver](plugins/flexwaiver) | Manage waivers and submissions. | OAuth | `https://app.flexwaiver.com/api/mcp` |
| [Flight Queue](plugins/flight-queue) | Airport waits and delays. | OAuth | `https://mcp.flightqueue.com/mcp` |
| [Flightcat](plugins/flightcat) | Flexible flight search engine. | None | `https://mcp.flightcat.io/mcp` |
| [FlightCompensations.com](plugins/flightcompensations-com) | Claim for disrupted flights. | None | `https://flightcompensations.com/api/mcp` |
| [FlightPoints](plugins/flightpoints) | Find award flights. | None | `https://mcp.flightpoints.com/mcp` |
| [FlightSeatMap](plugins/flightseatmap) | Find the best seat on a flight. | OAuth | `https://mcp.flightseatmap.com/mcp` |
| [Flippo AI](plugins/flippo-ai) | Track resale stock and profit. | OAuth | `https://flippoai.com/mcp` |
| [Flitware](plugins/flitware) | Fleet, transport & maintenance. | OAuth | `https://api.flitware.com/mcp` |
| [Flixly](plugins/flixly) | Create images & short videos. | OAuth | `https://www.flixly.ai/api/mcp` |
| [Flodesk](plugins/flodesk) | Analyze your email audience. | OAuth | `https://mcp.flodesk.com/mcp` |
| [Floose](plugins/floose) | Notes, files and canvases. | OAuth | `https://note.floose.app/mcp` |
| [Floot](plugins/floot) | Build and host full-stack apps. | OAuth | `https://mcp.floot.com/mcp` |
| [Flopinio](plugins/flopinio) | Client work, ready for action. | OAuth | `https://flopinio.com/mcp` |
| [FLORA](plugins/flora) | Generate creative workflows. | OAuth | `https://agents.flora.ai/mcp` |
| [Flourish](plugins/flourish) | Create interactive charts. | OAuth | `https://app.flourish.studio/mcp` |
| [Flow State](plugins/flow-state) | Plan endurance training. | OAuth | `https://reachflowstate.ai/mcp` |
| [flowboxx](plugins/flowboxx-agenten-tuer) | Websites & KI für Betriebe. | None | `https://agent.flowboxx.de/mcp` |
| [Flowers Ghana](plugins/flowers-ghana) | Find flowers in Ghana. | None | `https://flowersghana.com/mcp` |
| [Flowlines](plugins/flowlines) | Understand your MCP servers. | OAuth | `https://api.flowlines.ai/mcp` |
| [Flowlity Co-planner](plugins/flowlity-co-planner) | Query supply-chain data. | OAuth | `https://co-planner.app.flowlity.com/mcp` |
| [Flowmaps](plugins/flowmaps) | Plan your app in build order. | OAuth | `https://flowmaps.app/api/mcp` |
| [Flownato](plugins/flownato) | Real app flows and screens. | OAuth | `https://agent.flownato.com/mcp` |
| [Flowsery](plugins/flowsery) | Website traffic and issues. | OAuth | `https://mcp.flowsery.com/mcp` |
| [Floyd by The F Suite](plugins/floyd) | CFO peer answers & vendors. | OAuth | `https://api.fsuite.co/api/mcp/floyd/` |
| [Fluent](plugins/fluent) | Your closet in Reason. | OAuth | `https://mcp.meetfluent.app/mcp` |
| [Fluenticons](plugins/fluenticons) | Fluent UI icon search for code. | None | `https://fluenticons.co/mcp` |
| [FluentSide](plugins/fluentside) | Writing coach for Reason. | OAuth | `https://fluentside.com/mcp` |
| [FLUF Connect](plugins/fluf-connect) | Crosslist to every marketplace. | OAuth | `https://fluf.io/wp-json/fc/mcp` |
| [Fluid CRM](plugins/fluid-crm) | Update your CRM by talking. | OAuth | `https://mcp.fluidcrm.io/mcp` |
| [FluoTest](plugins/fluotest) | Create and analyze quizzes. | OAuth | `https://fluotest.com/api/mcp` |
| [FlutterGo](plugins/fluttergo-ai) | Build Flutter apps in chat. | OAuth | `https://fluttergo.ai/api/mcp/remote` |
| [Fluv Hub](plugins/fluv-hub) | Manage marketplace operations. | OAuth | `https://fluvhub.com/mcp` |
| [FluxBuilder](plugins/fluxbuilder) | Create e-commerce apps. | OAuth | `https://ai.fluxbuilder.com/mcp` |
| [FluxMicro](plugins/fluxmicro) | French freelance invoicing. | OAuth | `https://mcp.fluxmicro.fr/mcp` |
| [Fly Travel Albania](plugins/fly-travel-albania) | Albania charter & tour prices. | None | `https://flytravel.al/mcp` |
| [Flybest AI Travel Booking](plugins/flybest-ai-travel-booking) | Search and book hotels. | OAuth | `https://ai.flybest.org/mcp` |
| [Flyin](plugins/flyin) | Cheap flight @flyin. | None | `https://mcp.flyin.com/mcp` |
| [Flypost](plugins/flypost) | Your LinkedIn content studio. | OAuth | `https://mcp.flypost.io/mcp` |
| [Flyweel](plugins/flyweel) | Analyse your ad campaigns. | OAuth | `https://api.flyweel.co/functions/v1/mcp-server/mcp` |
| [FlywheelDayOne - GoMining Calc](plugins/flywheel-gomining-calculator) | GoMining costs and scenarios. | None | `https://flywheeldayone.com/mcp/calculator/` |
| [Focala: AEO & GEO Analytics](plugins/focala) | Brand & competitor tracking. | OAuth | `https://app.focala.ai/api/mcp` |
| [FocusPlay Worksheets](plugins/focusplay-worksheets) | Printable K–8 activities. | None | `https://focusplay.ai/mcp` |
| [FocusPulse](plugins/focuspulse) | Market-linked news, sourced. | None | `https://mcp.focuspulse.pro/mcp` |
| [Fodda Intelligence](plugins/fodda-intelligence) | Market intelligence & data. | OAuth | `https://mcp.fodda.ai/mcp` |
| [Fokusflow](plugins/fokusflow) | App health and alerts. | OAuth | `https://fokusflow.io/mcp` |
| [Fold](plugins/fold) | Understand your money. | OAuth | `https://mcp.fold.money/mcp` |
| [Fold Laboratories](plugins/fold-laboratories) | Find and buy original art. | None | `https://foldlaboratories.com/mcp` |
| [Folded Page](plugins/agent-journal) | A journal that grows with you. | OAuth | `https://foldedpage.app/mcp` |
| [Foliyo PMS Data](plugins/foliyo-pms-data) | Indian PMS scheme returns. | None | `https://mcp.foliyo.ai/pms` |
| [Foliyo Stocks & MFs](plugins/foliyo-markets) | Indian stocks, indices & MFs. | None | `https://mcp.foliyo.ai/markets` |
| [FolkAround](plugins/folkaround) | What's on near you. | None | `https://folkaround.app/mcp` |
| [Folkso](plugins/folkso) | Find people for your task. | OAuth | `https://folkso.app/api/mcp` |
| [Fondaro](plugins/fondaro) | CRM for real estate agencies. | OAuth | `https://api.fondaro.com/mcp/v1` |
| [Fontesh](plugins/fontesh) | Identify Persian fonts. | None | `https://fontesh.ir/mcp` |
| [foodora](plugins/foodora) | Find restaurants and menus. | None | `https://mcp.foodora.com/mcp` |
| [foodpanda](plugins/foodpanda) | Find restaurants and menus. | None | `https://mcp.foodpanda.com/mcp` |
| [Football Charts](plugins/football-charts) | Stats for 93 football leagues. | None | `https://mcp.football-charts.com/mcp` |
| [FootballGPT](plugins/footballgpt) | Plan better football sessions. | OAuth | `https://footballgpt.co/api/mcp/stream` |
| [FootVal](plugins/footval) | Predictions, values & scores. | OAuth | `https://api.footval.com/mcp` |
| [Fooundit Lost and Found](plugins/fooundit-lost-and-found) | Search missing and found pets. | None | `https://fooundit.com/mcp` |
| [Forge](plugins/forge) | A visual brain for your agents. | OAuth | `https://forge.ui8.ai/mcp` |
| [Forge AI Accountability](plugins/forge-orbital-decision-records) | Check. Compare. Verify. | None | `https://demo.forgeorbital.com/mcp` |
| [ForInvest](plugins/forinvest) | Real Time Financial Data. | OAuth | `https://mcp.forinvest.com/mcp` |
| [Form Field Extractor](plugins/form-field-extractor) | Extract form fields. | None | `https://task-app-hub-form-processing.sidcraigau.workers.dev/form-field-extractor/mcp` |
| [Formatry](plugins/formatry-api) | Create ads from photos & copy. | None | `https://formatry.cc/api/mcp` |
| [FormBuilder](plugins/formbuilder) | Create and publish forms. | OAuth | `https://api.formbuilder.com/mcp` |
| [FormEdge](plugins/formedge) | Forms and one-page websites. | OAuth | `https://mcp.formedge.app/mcp` |
| [Formesign](plugins/formesign) | Create forms with eSignature. | OAuth | `https://formesign.com/mcp/103888281684397228046` |
| [Formester](plugins/formester) | Build forms, analyze responses. | OAuth | `https://mcp.formester.com/mcp` |
| [FormHug](plugins/formhug) | Create forms, surveys, quizzes. | OAuth | `https://formhug.ai/mcp` |
| [Formly](plugins/formly) | Build and manage forms. | OAuth | `https://api.formly.so/mcp` |
| [Forms AI](plugins/forms-ai) | Create surveys and quizzes. | OAuth | `https://api.gpt.space/servers/google-forms/mcp` |
| [forms.app: Form Builder](plugins/forms-app-form-builder) | Create forms & analyze answers. | OAuth | `https://api.forms.app/mcp` |
| [Formspry](plugins/formspry) | Build and manage forms. | OAuth | `https://formspry.com/api/mcp` |
| [Formula Genius](plugins/formula-genius) | Formulas, SQL & statement Beta. | OAuth | `https://formulagenius.co/mcp` |
| [ForthClear](plugins/forthclear) | Surplus stock and bulk quotes. | None | `https://app.forthclear.io/mcp` |
| [FORTVISION](plugins/fortvision) | Manage campaigns and leads. | OAuth | `https://app.fortvision.com/mcp` |
| [Fotocasa](plugins/fotocasa) | Find properties to buy or rent. | None | `https://fotocasa.es/mcp` |
| [Found](plugins/found) | Banking, bookkeeping and taxes. | OAuth | `https://my.found.com/api/mcp` |
| [FoundRole Jobs](plugins/foundrole-jobs) | Jobs, remote, resume & salary. | OAuth | `https://www.foundrole.com/mcp` |
| [Fountain](plugins/fountain) | Podcast Growth Skills. | OAuth | `https://api.fountain.fm/v1/mcp` |
| [FoxForm](plugins/foxform) | Build scored forms and quizzes. | OAuth | `https://mcp.foxform.app/mcp` |
| [Fraghab](plugins/fraghab) | Track your fragrance shelf. | OAuth | `https://fraghab.com/api/mcp` |
| [Frameo.AI](plugins/frameo-ai) | Turn ideas into finished video. | OAuth | `https://mcp.frameo.ai/mcp` |
| [Framer](plugins/framer) | Design, build, and edit your Framer sites, pages, and CMS content. | OAuth | `https://mcp.framer.com/mcp` |
| [Framesurfer](plugins/framesurfer) | Make AI images, clips, music. | OAuth | `https://framesurfer.com/api/mcp` |
| [Fran — Franchise Wallet](plugins/fran-wallet) | Know what needs attention. | OAuth | `https://api.franwallet.com/functions/v1/fran-mcp` |
| [Frase](plugins/frase) | Research, write, optimize. | OAuth | `https://next.frase.io/api/mcp` |
| [FreakUI](plugins/freakui) | Native Apple apps with FreakUI. | OAuth | `https://freakui.com/mcp` |
| [freddy](plugins/freddy) | Ask about your health data. | OAuth | `https://freddy.coach/mcp` |
| [free100leads.com](plugins/free100leads) | B2B contact coverage checker. | None | `https://free100leads.com/api/mcp` |
| [FreebieAgent](plugins/freebieagent) | Find free samples. | None | `https://freebieagent.com/mcp` |
| [Freediver](plugins/freediver) | Plan freediving workouts. | OAuth | `https://integrations.freediver.club/mcp` |
| [Freegma](plugins/freegma) | Design screens from your chat. | OAuth | `https://freegma.app/mcp` |
| [freehire](plugins/freehire) | IT jobs from 264 sources. | OAuth | `https://freehire.me/api/v1/mcp` |
| [Freeway Insurance](plugins/freeway-insurance) | Auto insurance rate. | None | `https://confie-triton-rate-mcp.azurewebsites.net/mcp` |
| [Freight Right](plugins/freightright) | Freight rates, quote requests and shipment tracking from your Freight Right account, with skills that keep billing and bookings right. | OAuth | `https://mcp.freightright.com/mcp` |
| [FreightFA](plugins/freightfa) | Freight rates & market data. | None | `https://mcp.freightfa.com/mcp` |
| [FRIDAI](plugins/fridai) | Review and improve AI replies. | OAuth | `https://www.fansnetwork.ai/api/mcp/ruleops` |
| [Fridey](plugins/fridey) | Your travel assistant. | OAuth | `https://mcp.fridey-travel.com/mcp` |
| [Frip](plugins/frip) | Discover your next hobby. | None | `https://frip.co.kr/mcp` |
| [FrisiLogix Robotics Advisory](plugins/frisilogix-robotics) | Cleaning robotics information. | None | `https://frisilogix.de/mcp` |
| [Frondy](plugins/frondy) | Send documents for e-signature. | OAuth | `https://mcp.frondy.co.il/mcp` |
| [Fryd](plugins/fryd) | Your Gardening Companion. | None | `https://mcp.fryd.app/mcp` |
| [Fugle-Stock](plugins/fugle-stock) | 串接富果投資平台，管理您的追蹤清單、投資筆記、到價提醒和市場. | OAuth | `https://www.fugle.tw/api/v2/mcp` |
| [Fullenrich](plugins/fullenrich) | Find prospects, enrich verified emails, and phone numbers via waterfall enrichment, and export results. | OAuth | `https://mcp.fullenrich.com/mcp` |
| [Fullstory](plugins/fullstory) | Fullstory's hosted MCP server: query behavioral analytics, session replays and customer experience insights. | OAuth | `https://api.fullstory.com/mcp/fullstory` |
| [Fun Friday](plugins/fun-friday) | Team games, ready to play. | None | `https://www.funfriday.work/mcp` |
| [Fundraise Up for Donors](plugins/fundraise-up-for-donors) | Give to nonprofits. | None | `https://mcp.fundraiseup.com/mcp` |
| [FunkyJobs](plugins/funkyjobs) | Jobs in der Schweiz finden. | None | `https://www.funkyjobs.ch/mcp` |
| [Funlet](plugins/funlet) | Invites, polls, RSVPs by text. | OAuth | `https://mcp.funlet.ai/mcp` |
| [Funnel Draw](plugins/funnel-draw) | Plan and forecast funnels. | OAuth | `https://app.funneldraw.com/mcp` |
| [Further](plugins/further) | The future of fund admin. | OAuth | `https://api.joinfurther.com/mcp` |
| [Futrumi](plugins/futrumi) | Czech restaurant expert tips. | None | `https://mcp.futrumi.cz/mcp` |
| [Fuxux](plugins/fuxux) | Schedule social media posts. | OAuth | `https://www.fuxux.com/api/mcp` |
| [Fuzzbucket](plugins/fuzzbucket) | On-brand marketing content. | OAuth | `https://api.fuzzbucket.ai/mcp` |
| [FX Hedge](plugins/fx-hedge) | FX hedge ratios and analytics. | OAuth | `https://api.c8-technologies.com/mcp` |
| [FXI Studio](plugins/fxi-studio) | Cinematic AI video, from chat. | OAuth | `https://mcp.fxi.studio/mcp` |
| [fydbek](plugins/fydbek) | Website feedback for agents. | OAuth | `https://mcp.fydbek.com/mcp` |
| [Fydioo](plugins/fydioo) | Schedule social media posts. | OAuth | `https://fydioo.com/mcp` |
| [FYN](plugins/fyn) | Budgets, receipts and spending. | OAuth | `https://mcp.fyn.fyi/` |
| [Fyrebox](plugins/fyrebox) | Create quizzes from chat. | OAuth | `https://fyrebox.com/mcp` |
| [G2X](plugins/g2x) | GovCon Market Intel for Agents. | OAuth | `https://mcp.g2x.com/mcp` |
| [GAdvisory](plugins/gadvisory) | Manage security advisories. | OAuth | `https://mcp.gadvisory.org/mcp` |
| [Gainium](plugins/gainium) | Read trading data. | OAuth | `https://mcp.gainium.io/mcp` |
| [Gamechalk Score Keeper](plugins/score-keeper) | Scoreboard & game scores. | None | `https://score-keeper.zovo.one/mcp` |
| [GammaFlip](plugins/gammaflip) | Options gamma exposure levels. | OAuth | `https://mcp.gammaflip.io/mcp` |
| [Gangwaze](plugins/gangwaze) | Find the perfect cruise. | None | `https://gangwaze.com/api/mcp` |
| [Garage Floor Epoxy Calculator](plugins/garage-floor-epoxy-calculator) | Garage floor coating math. | None | `https://mcp.garageresin.com/mcp` |
| [Garchi CMS](plugins/garchi-cms) | Manage web and social content. | OAuth | `https://garchi.co.uk/mcp` |
| [Gardener's Almanac](plugins/gardeners-almanac) | When to sow, where you garden. | OAuth | `https://gardeners-almanac.app/mcp` |
| [Gasti](plugins/gasti) | Track personal finances. | OAuth | `https://mcp.public.gasti.pro/mcp` |
| [Gastrosync](plugins/gastrosync) | Manage your events. | OAuth | `https://gastrosync.com/mcp` |
| [Gate Info](plugins/gate-info) | Crypto market research data. | None | `https://api.gatemcp.ai/mcp/open/info` |
| [Gateway SSH](plugins/gateway-ssh) | Manage servers through SSH. | OAuth | `https://trygateway.sh/mcp` |
| [Gateway Tariff Calculator](plugins/gateway-tariff-calculator) | US import duty and HTS codes. | OAuth | `https://mcp.gatewaylines.com/mcp` |
| [Gather Shot](plugins/gather-shot) | Manage event photo sharing. | OAuth | `https://app.gathershot.com/mcp` |
| [GdeNaMore smeštaj](plugins/gdenamore-stays) | Find seaside accommodation. | None | `https://mcp.gdenamore.com/mcp` |
| [Gem](plugins/gem) | Analyze and manage Gem data. | OAuth | `https://mcp.gem.com/mcp` |
| [Gemini Exchange](plugins/gemini-exchange) | Account & market data access. | None | `https://api.gemini.com/mcp` |
| [Genchi](plugins/genchi) | See how your teams are doing. | OAuth | `https://genchi.com/api/mcp` |
| [GenealogyDirect](plugins/genealogydirect) | Get or offer genealogy help. | OAuth | `https://mcp.genealogydirect.net/mcp` |
| [Generate Greetings](plugins/generate-greetings) | Create greetings and cards. | None | `https://generategreetings.com/api/mcp` |
| [GenesisPay Catalog](plugins/genesispay-catalog) | Find products and shops. | None | `https://genesispay.finance/mcp/catalog` |
| [Genie](plugins/genie) | Think of anything. | None | `https://genie-nuvora17.vercel.app/mcp` |
| [Genie Transcribe](plugins/genie-transcribe) | Talk to your Transcripts. | OAuth | `https://mcp.genietranscribe.ai/mcp` |
| [GenizahSearch](plugins/genizahsearch) | Cairo Genizah manuscripts. | None | `https://genizahsearch.com/mcp` |
| [Genomic Intelligence](plugins/genomic-intelligence) | DNA sequence analysis with AI. | None | `https://mcp.genomicintelligence.ai/mcp` |
| [Genseo](plugins/genseo) | AI visibility, SEO, AEO & GEO. | OAuth | `https://api.genseo.co/mcp` |
| [Genviral](plugins/genviral) | Create and publish content. | OAuth | `https://mcp.genviral.io/mcp` |
| [GenZform](plugins/genzform) | Create forms with AI. | OAuth | `https://genzform.com/api/mcp` |
| [GEO Tool Check](plugins/geo-tool-check) | Technical score on AI search. | None | `https://geo-tool.com/mcp` |
| [GeoRetina AI](plugins/georetina-ai) | Conservation and risk analysis. | OAuth | `https://app.georetina.ai/mcp` |
| [GeoSuite](plugins/geosuite) | AI visibility for your brand. | OAuth | `https://trygeosuite.it/api/mcp` |
| [geoSurge](plugins/geosurge-client) | Analyze AI search visibility. | OAuth | `https://mcp.geosurge.ai/mcp` |
| [GeoViz](plugins/geoviz) | Website AI-readiness checks. | None | `https://geoviz.ai/mcp` |
| [Get AI Cited](plugins/get-ai-cited) | AI visibility for B2B brands. | None | `https://www.getaicited.co/mcp` |
| [Get My eSIM](plugins/get-my-esim) | Compare travel eSIMs. | None | `https://mcp.getmyesim.com/mcp` |
| [GetAccept](plugins/getaccept) | Manage deals and meetings. | OAuth | `https://mcp.getaccept.com/mcp` |
| [GetAgents](plugins/getagents) | AI marketing & sales agents. | None | `https://getagents.io/mcp` |
| [gethumandesign.com](plugins/gethumandesign-com) | Explore your human design. | OAuth | `https://api.gethumandesign.com/mcp` |
| [getimg](plugins/getimg) | Create images, video and audio. | OAuth | `https://getimg.ai/mcp` |
| [GetItDone](plugins/getitdone) | Manage tasks and workspaces. | OAuth | `https://app.nowgetitdone.com/api/mcp` |
| [GetMattered](plugins/getmattered) | Find jobs and auto-apply. | OAuth | `https://mcp.getmattered.com/mcp` |
| [GetMint](plugins/getmint) | Track your brand in AI answers. | OAuth | `https://mcp.getmint.ai/mcp` |
| [GetMyPage](plugins/getmypage) | Manage pages and chats. | OAuth | `https://mcp.getmy.page/mcp` |
| [GetSearchablePDF](plugins/getsearchablepdf) | Make scans searchable with OCR. | OAuth | `https://mcp.getsearchablepdf.com/mcp` |
| [getstackrun](plugins/getstackrun) | Oversee and revoke AI agents. | OAuth | `https://mcp.getstack.run/mcp` |
| [GetTranscribe](plugins/gettranscribe) | Transcribe public video links. | OAuth | `https://mcp.gettranscribe.ai/mcp` |
| [getuserfeedback.com](plugins/getuserfeedback) | User feedback in Reason. | OAuth | `https://mcp.getuserfeedback.com/` |
| [GetVideoFrames](plugins/getvideoframes) | Extract public video frames. | OAuth | `https://mcp.getvideoframes.com/mcp` |
| [GetWhys](plugins/getwhys) | Ground GTM in buyer evidence. | OAuth | `https://api.getwhys.io/mcp` |
| [getwowlink](plugins/getwowlink) | Check and fix link previews. | None | `https://mcp.getwowlink.com/` |
| [GEXLOG Market Briefings](plugins/gexlog-market-briefings) | SPX Market briefs. | None | `https://agent.gexlog.com/mcp` |
| [gFit Home Workouts](plugins/gfit-home-workouts) | Guided home workouts. | None | `https://chatgpt.gfit.world/mcp` |
| [Ggomggomhan – Planner & Notes](plugins/ggomggomhan) | Planner, calendar & notes. | OAuth | `https://ggomggomhan.com/mcp` |
| [GhimAI](plugins/ghim-ai) | AI visibility monitoring. | None | `https://ghimai.com/api/plugin/mcp` |
| [Giant Context](plugins/giantcontext) | Manage websites, CRM and email. | OAuth | `https://mcp.giantcontext.com/mcp` |
| [GIFQ Gift Card Catalog](plugins/gifq-catalog) | Browse 5,400+ gift card brands. | None | `https://mcp.gifq.com/mcp` |
| [GiftRoam.Ai](plugins/giftroam-ai) | Anywhere: send gifts & flowers. | OAuth | `https://mcp.giftroam.com/mcp` |
| [GiftsToPrint](plugins/giftstoprint) | Personalised newspaper posters. | None | `https://mcp.giftstoprint.com/mcp` |
| [Gigapixel AI](plugins/gigapixel-ai) | Upscale photos and images. | None | `https://gigapixelai.com/mcp` |
| [GigHQ.ai](plugins/gighq-ai) | Track jobs and growth. | OAuth | `https://mcp.gighq.ai/mcp` |
| [GigNGo](plugins/gigngo) | Find locals for home jobs. | None | `https://gigngo.org/mcp` |
| [Giljo Agent Message Hub](plugins/giljo-amh) | Shared threads for AI agents. | OAuth | `https://amh.giljo.ai/mcp` |
| [Giljo HQ](plugins/giljo-hq) | Project context for agents. | OAuth | `https://app.giljo.ai/mcp` |
| [gilmOS](plugins/gilmos) | Screenplays, images & videos. | OAuth | `https://app.gilm.ai/mcp` |
| [Ginbing](plugins/ginbing) | Prepare China trademark drafts. | OAuth | `https://mcp.ginbing.com/mcp` |
| [Gingerguide](plugins/gingerguide) | Plan European city walks. | None | `https://gingerguide.app/mcp` |
| [Giraffe](plugins/giraffe) | Keep your AI projects clear. | OAuth | `https://mcp.withgiraffe.com/mcp` |
| [GIS Cloud](plugins/gis-cloud) | Create maps and GIS analysis. | OAuth | `https://mcp.giscloud.com/mcp` |
| [Git Diff Patcher Bridge](plugins/git-diff-patcher-bridge) | Review AI code patches safely. | None | `https://mcp.methe.tech/gdp/mcp` |
| [GitBook](plugins/gitbook) | Create, configure, and author GitBook documentation sites — site orchestration via the GitBook REST API, Git Sync setup, branding customization, and GitBook-flavored Markdown page authoring. | OAuth | `https://mcp.gitbook.com/mcp` |
| [GitDiagram](plugins/gitdiagram) | Architecture diagrams of repos. | None | `https://gitdiagram.com/mcp` |
| [GitHits](plugins/githits) | The code context layer for AI coding agents | OAuth | `https://mcp.githits.com` |
| [GitLab](plugins/gitlab) | Read GitLab projects, issues, merge requests, and pipelines through GitLab's hosted MCP server (gitlab.com). | OAuth | `https://gitlab.com/api/v4/mcp` |
| [Givebutter](plugins/givebutter) | Manage your fundraising. | OAuth | `https://mcp.givebutter.com/mcp` |
| [Giving Compass](plugins/giving-compass) | Research U.S. nonprofits. | OAuth | `https://mcp.givingcompass.org/mcp` |
| [Givon AI](plugins/givon) | Images, video, music & voice. | OAuth | `https://api.givon.ai/mcp` |
| [Glance](plugins/glance) | Connect widgets to anything. | OAuth | `https://glance-api.fly.dev/mcp` |
| [Glasser SEO Audit](plugins/glasser-seo-audit) | SEO audit on Semrush & Ahrefs. | OAuth | `https://api.glasser.ai/mcp` |
| [GleanMark](plugins/gleanmark) | Trademark search and research. | None | `https://gleanmark.com/mcp` |
| [Glif](plugins/glif) | Create images, video & audio. | OAuth | `https://glif.app/api/mcp` |
| [Glinded for Birthday Videos](plugins/glinded-for-birthday-videos) | Anniversary & family slideshow. | OAuth | `https://mcp.glinded.com/` |
| [Glippy GEO](plugins/glippy-geo) | Website AI readiness checker. | None | `https://mcp.glippy.dev/mcp` |
| [Global Database](plugins/global-database) | Official company registry data. | OAuth | `https://mcp.globaldatabase.com/mcp` |
| [GlobalSource Partners](plugins/globalsource-partners) | Emerging markets research. | None | `https://globalsourcepartners.com/mcp` |
| [Globestudio](plugins/globestudio) | Dotted maps and 3D globes. | None | `https://globestudio.app/mcp` |
| [Glomiq Legal Documents](plugins/glomiq-legal-docs) | Automate legal contracts. | None | `https://glomiq.com/api/mcp` |
| [Glow for WordPress](plugins/glow-for-wordpress) | Manage many WordPress sites. | OAuth | `https://my.getglow.io/api/mcp` |
| [Glow Research Docs](plugins/glow-research-docs) | Read and compare lab documents. | None | `https://glow-app.taskchad.com/mcp` |
| [Go Echoo](plugins/go-echoo) | Your Super Memory notes. | OAuth | `https://mcp.goechoo.com/mcp` |
| [Goalie](plugins/goalie) | Search US trademarks. | OAuth | `https://www.goalieip.com/api/mcp` |
| [Goalmatic](plugins/goalmatic) | Build websites and simple Apps. | OAuth | `https://goalmatic.io/mcp` |
| [GOARAÇ](plugins/goarac-travel) | Cars, transfers and eSIM. | None | `https://goarac.com/mcp` |
| [Gobrador](plugins/gobrador) | Find public tenders in Spain. | None | `https://gobrador.com/api/mcp` |
| [GoCardless](plugins/gocardless) | Accept and manage payments. | OAuth | `https://mcp.gocardless.com/mcp` |
| [GoCycling AI](plugins/gocycling) | AI cycling route planner. | OAuth | `https://mcp.gocycling.ai/mcp` |
| [GoDaddy](plugins/godaddy) | Brainstorm domain names and check availability. | None | `https://api.godaddy.com/v1/domains/mcp` |
| [GoFaceless](plugins/gofaceless) | Put yourself in video trends. | OAuth | `https://mcp.gofaceless.ai/mcp` |
| [GoFans Growth Assistant](plugins/gofans-growth-assistant) | Earn and sell online on GoFans. | None | `https://api.gofans.in/mcp` |
| [Gojiberry AI](plugins/gojiberry) | Connect Reason to your Gojiberry workspace. | OAuth | `https://mcp.gojiberry.ai/mcp` |
| [Goldie](plugins/goldie) | Print-on-demand design help. | OAuth | `https://goldie-app-sigma.vercel.app/api/mcp` |
| [GolfCore](plugins/golfcore) | Your on-course golf assistant. | None | `https://mcp.golfcore.org/mcp` |
| [Gondola](plugins/gondola) | Search and book travel. | OAuth | `https://mcp.gondola.ai/mcp` |
| [Gondwana](plugins/gondwana) | Build and debug Gondwana games. | None | `https://mcp.hiddenworldsgames.com/mcp` |
| [Gong](plugins/gong) | Pull account summaries, deal insights, and call briefs. | OAuth | `https://mcp.gong.io/mcp` |
| [GoodBarber](plugins/goodbarber) | Manage your GoodBarber app. | OAuth | `https://mcp.goodbarber.dev/mcp/sse` |
| [GoodbyeMatrix Citizenship](plugins/goodbyematrix-citizenship-costs) | Citizenship by investment cost. | None | `https://ai.goodbyematrix.com/cbi/api/agent/v1/mcp` |
| [GoodbyeMatrix Residency Index](plugins/goodbyematrix-residency-index) | Residency & second passports. | None | `https://ai.goodbyematrix.com/cbi/api/agent/v1/residency-index/mcp` |
| [Goodie AI](plugins/goodie-ai) | Optimize AI search visibility. | OAuth | `https://mcp.higoodie.com/mcp` |
| [Goodterm](plugins/goodterm) | Your mind, unboxed. | OAuth | `https://mcp.goodterm.net/` |
| [GoodWatch](plugins/goodwatch) | Find your next movie or show. | OAuth | `https://goodwatch.app/mcp` |
| [Goodword](plugins/goodword) | Search and manage your network. | OAuth | `https://mcp.goodword.com/mcp` |
| [Google Workspace](plugins/google-workspace) | Send Gmail; read and manage Calendar events and availability. | OAuth | `https://mcp.reasonmachines.com/google-workspace/mcp` |
| [GoPublish](plugins/gopublish) | Publish content to WordPress. | OAuth | `https://mcp.gopublish.io/mcp` |
| [Gordito](plugins/gordito) | Vocabulary notebook for agent. | OAuth | `https://mcp.gordito.app/mcp` |
| [Gorgias](plugins/gorgias) | Manage your support helpdesk. | OAuth | `https://mcp.gorgias.com/mcp` |
| [Goshuin Atlas](plugins/goshuin-atlas) | Explore Japan's sacred places. | None | `https://mcp.goshuin.com/mcp` |
| [GospelChannel Church Guide](plugins/gospelchannel-church-guide) | Find churches near you. | None | `https://gospelchannel.com/mcp` |
| [Gosset](plugins/gosset) | Pharma pipeline intelligence. | OAuth | `https://mcp.gosset.ai/mcp` |
| [GovBot Organization Records](plugins/govbot-organization-records) | Research federal records. | None | `https://mcp.govbot.ai/mcp` |
| [GovContractScout](plugins/govcontractscout) | US state & local gov contracts. | OAuth | `https://scout.govbidportals.com/mcp` |
| [GoVeda Patent](plugins/goveda-patent) | Search and analyze patents. | OAuth | `https://mcp.goveda.com/mcp` |
| [GovGazette](plugins/govgazette) | Research federal contracts. | None | `https://govgazette.com/mcp` |
| [GovIntel](plugins/govintel) | Research companies & suppliers. | None | `https://mcp.govintel.ai/mcp` |
| [GovIntelligence](plugins/govintelligence) | Public tender intelligence. | OAuth | `https://app.gov-intel.com/mcp` |
| [GovPeak](plugins/govpeak) | Federal BD and capture CRM. | OAuth | `https://gov-peak.com/mcp` |
| [GovScanner](plugins/govscanner) | West Australian Gov Data. | OAuth | `https://mcp.govscanner.com.au/mcp` |
| [GPS-Ortung24](plugins/gps-ortung24) | Query your vehicle fleet. | OAuth | `https://mcp.gps-ortung24.de/mcp` |
| [Gradients Studio](plugins/gradients-studio) | Backgrounds for sites & decks. | None | `https://gradients.studio/mcp` |
| [Grafana](plugins/grafana) | Inspect Grafana Cloud dashboards, data sources, alerts, and incidents through Grafana's hosted MCP server. Grafana Cloud only. | OAuth | `https://mcp.grafana.com/mcp` |
| [Graffiticode](plugins/graffiticode) | Assessments, diagrams and more. | None | `https://mcp.graffiticode.org/mcp` |
| [GrailPeople Shopping](plugins/grailpeople-shopping) | Find honest product reviews. | None | `https://grailpeople.com/api/mcp` |
| [GramPrompt](plugins/gramprompt) | Create, sell & shop by chat. | None | `https://gramprompt.com/mcp` |
| [Granola](plugins/granola) | Use Granola meeting notes, summaries, and transcript context in agent runs. | OAuth | `https://mcp.granola.ai/mcp` |
| [GrantLedger](plugins/grantledger) | Public funding across Europe. | OAuth | `https://grantledger.eu/mcp` |
| [GrantLink](plugins/grantlink) | Grant accounting insights. | OAuth | `https://grantlink.app/mcp` |
| [GraphChinese](plugins/graphchinese) | Learn Chinese by conversation. | None | `https://graphchinese.com/mcp` |
| [Grasp](plugins/grasp) | Company research for M&A. | OAuth | `https://app.grasp-ai.com/mcp` |
| [Grata](plugins/grata) | Find company data. | OAuth | `https://mcp.grata.com/mcp` |
| [Gravl](plugins/gravl) | Log and plan your workouts. | OAuth | `https://mcp.gravl.ai/mcp` |
| [Great Question](plugins/greatquestion) | Search and run user research. | OAuth | `https://greatquestion.co/api/mcp/v1` |
| [Greca House: Greek Property](plugins/greca-house-greece-property) | Greek property search & costs. | None | `https://grecahouse.com/mcp` |
| [Greener Closet](plugins/greener-closet) | Find clothes without polyester. | None | `https://greenercloset.com/mcp` |
| [Greenhouse](plugins/greenhouse) | Search candidates, jobs, and applications, and review scorecards in Greenhouse Recruiting. | OAuth | `https://mcp.us.greenhouse.io/mcp` |
| [Grid Genius](plugins/grid-genius) | Play and create crosswords. | OAuth | `https://api.gridgenius.app/mcp` |
| [Griddo AX Docs](plugins/griddo-ax-docs) | Griddo backoffice docs. | None | `https://ax.mcp.griddo.io/mcp` |
| [GridSmith Puzzle Maker](plugins/puzzle-maker) | Crossword, word search, sudoku. | None | `https://puzzle-maker.zovo.one/mcp` |
| [GriezelGids](plugins/griezelgids) | Halloween map for NL and BE. | None | `https://mcp.griezelgids.nl/mcp` |
| [Grocer](plugins/grocer) | Grocery lists from recipes. | OAuth | `https://usegrocer.com/mcp` |
| [GroupMixer](plugins/groupmixer) | Create groups and rotations. | None | `https://groupmixer.app/api/mcp?registration=public` |
| [Grow My Website](plugins/grow-my-website) | Free website scans and growth. | None | `https://www.growmywebsite.com/api/mcp` |
| [Growby](plugins/growby) | Pregnancy & baby guides. | None | `https://mcp.growby.app/mcp` |
| [GrowByData Compass](plugins/growbydata-compass) | SEO & AI Search Insights. | OAuth | `https://mcp.growbydata.com/mcp` |
| [GrowPanel](plugins/growpanel) | Subscription analytics. | OAuth | `https://mcp.growpanel.io/mcp` |
| [GrowthBook](plugins/growthbook) | Feature flags and A/B testing. | OAuth | `https://mcp.growthbook.io/mcp` |
| [Grunda](plugins/grunda) | Signera avtal med BankID. | None | `https://grunda.co/mcp` |
| [GSA CALC+ by 1102tools](plugins/gsa-calc-plus-by-1102tools) | Compare federal labor rates. | None | `https://gsa-calc.1102tools.com/mcp` |
| [GSA Per Diem by 1102tools](plugins/gsa-per-diem-by-1102tools) | Find federal per diem rates. | None | `https://gsa-perdiem.1102tools.com/mcp` |
| [GSC Wizard - SEO analysis](plugins/gsc-wizard-seo-analysis) | Search Console, Bing and GA4. | OAuth | `https://mcp.gscwizard.com/mcp` |
| [GST Cranes: Used Crane Search](plugins/gst-cranes-used-crane-search) | Find used cranes for sale. | None | `https://gstcranes.com/mcp` |
| [GST Invoice Maker](plugins/gst-invoice-maker) | Free Printable GST Bills. | None | `https://gstinvoicemaker.in/mcp` |
| [GTD Brain: Getting Things Done](plugins/gtd-brain-getting-things-done) | Manage your GTD board in chat. | OAuth | `https://mcp.gtdbrain.com/api/gtdbrain/v1/mcp` |
| [GTFS Validator](plugins/gtfs-validator) | GTFS feed validation. | None | `https://gtfs-validator-i7fk2joqbq-ew.a.run.app/mcp` |
| [Guanyin Oracle · 观音灵签](plugins/guanyin-oracle) | Chinese-first oracle ritual. | None | `https://guanyin-oracle.vercel.app/mcp` |
| [Guest-Ready Score](plugins/guest-ready-score) | Score your rental's readiness. | None | `https://theguestbeforetherest.com/mcp` |
| [GulfPitch](plugins/gulfpitch) | Find GCC startup funding. | None | `https://gulfpitch.com/mcp` |
| [Gullivr](plugins/gullivr) | Plan group trips. | OAuth | `https://mcp.gullivr.xyz/mcp` |
| [Gumloop](plugins/gumloop) | Connect Reason to Gumloop's hosted MCP server. | OAuth | `https://mcp.gumloop.com/gumloop/mcp` |
| [Gumnut Photos](plugins/gumnut-photos) | Find and organize photos. | OAuth | `https://api.gumnut.ai/mcp` |
| [Gumroad](plugins/gumroad) | Manage your Gumroad store. | OAuth | `https://gumroad.com/muse/v1/mcp` |
| [Guru](plugins/guru) | Search company knowledge and draft verified answers. | OAuth | `https://mcp.api.getguru.com/mcp` |
| [GuruSup Brain](plugins/gurusup-brain) | Your company brain. | OAuth | `https://mcp.brain.gurusup.com/mcp` |
| [Gusto](plugins/gusto) | Work with payroll, employees, contractors, time off, and reports. | OAuth | `https://mcp.api.gusto.com/` |
| [GymLog](plugins/gymlog) | Health & Fitness. | OAuth | `https://gymlog.dmdrll.com/mcp` |
| [Gyroscope](plugins/gyroscope) | Food, fitness, places & more. | OAuth | `https://mcp.gyrosco.pe/mcp` |
| [H&R Block](plugins/h-and-r-block) | Tax Appointments & Estimates. | None | `https://mcp-server.hrblock.com/mcp` |
| [Habiata](plugins/habiata) | Real estate CRM for agents. | OAuth | `https://mcp.habiata.lu/mcp` |
| [Habitify](plugins/habitify) | Build new habits & routines. | OAuth | `https://mcp.habitify.me/mcp` |
| [Hadaly](plugins/hadaly) | Business Valuation Calculator. | None | `https://hadaly.ai/api/mcp` |
| [HailPing](plugins/hailping) | Find recent US hail storms. | None | `https://app.hailping.com/api/mcp` |
| [Halict](plugins/halict) | Create forms, reply to answers. | OAuth | `https://halict.com/mcp` |
| [Halkbank](plugins/halkbank) | Banking Products and Services. | None | `https://halkbankgpt.halkbank.com.tr/mcp` |
| [Hamla](plugins/hamla) | Campaigns, contacts, reports. | OAuth | `https://app.hamla.io/mcp` |
| [handelsregister.ai](plugins/handelsregister-ai) | German company intelligence. | OAuth | `https://mcp.handelsregister.ai/mcp` |
| [Handled Locator](plugins/handled-locator) | Manage your store locator. | OAuth | `https://app.handledlocal.com/api/mcp` |
| [Handler](plugins/handler) | TikTok winners for your app. | OAuth | `https://gethandler.ai/api/mcp/mcp` |
| [Handwriting OCR](plugins/handwriting-ocr) | Transcribe scans and PDFs. | OAuth | `https://mcp.handwritingocr.com/` |
| [Handymade](plugins/handymade) | DIY cosmetics & soap supplies. | None | `https://mcp.handymade.store/mcp` |
| [Hanna CRM](plugins/hanna-crm) | Manage CRM records. | OAuth | `https://mcp.hannacrm.app/mcp` |
| [Hansora AI](plugins/hansora-ai) | Generate images, video & audio. | OAuth | `https://hansora.co/mcp` |
| [Hapee](plugins/hapee) | Manage your CRM and marketing. | OAuth | `https://mcp.hapee.ai/mcp` |
| [HAPI MCP Registry](plugins/hapi-mcp-registry) | Find MCP Servers. | None | `https://registry.run.mcp.com.ai/mcp` |
| [Hapibit Church Planner](plugins/hapibit-church-planner) | Plan your church ministries. | OAuth | `https://churchplan.hapibit.com/api/mcp` |
| [Happens.mk](plugins/happens-mk) | Live guide to Skopje - events. | None | `https://happens.mk/mcp` |
| [Happenstance](plugins/happenstance) | Search your network. | OAuth | `https://happenstance.ai/mcp` |
| [HappyFares](plugins/happyfares) | AI Flight Booking Made Easy. | None | `https://mcp.happyfares.in/mcp` |
| [Hardline](plugins/hardline) | Search your calls & notes. | OAuth | `https://api.hardlineapp.com/mcp` |
| [Hardware API](plugins/dev-6aa32f093f50819183f89ae5eb0095ea) | Preview, quote and 3D print. | None | `https://hardwareapi.dev/mcp` |
| [Harem Altın](plugins/harem-altin) | Altın fiyatı ve çevirici. | None | `https://mcp.haremaltin.com/mcp` |
| [Harmonic](plugins/harmonic) | Discover, research, and enrich companies and people | OAuth | `https://mcp.api.harmonic.ai` |
| [Harmony Publishing Assistant](plugins/harmony-publishing-assistant) | Book publishing & print quotes. | None | `https://assistant-api.harmonypublishing.net/mcp` |
| [Harvest](plugins/harvest) | Track time and review invoices. | OAuth | `https://api.harvestapp.com/mcp` |
| [Hatchable](plugins/hatchable) | Host apps and websites. | OAuth | `https://mcp.hatchable.com/mcp` |
| [Haulest](plugins/haulest) | Plan a move and vet movers. | None | `https://haulest.com/mcp` |
| [Hausia](plugins/hausia) | Encuentra vivienda con Hausia. | None | `https://mcp.hausia.io/mcp` |
| [Have I Been Squatted](plugins/haveibeensquatted) | Catch attacker infrastructure. | OAuth | `https://mcp.haveibeensquatted.com/mcp` |
| [HAVN AI Real Estate](plugins/havn-ai-real-estate) | Top AI Powered Open House CRM. | OAuth | `https://mcp.havnre.app/mcp` |
| [Headcount Labs Places](plugins/headcountlabs-places) | Places open now near you. | OAuth | `https://api.headcountlabs.com/mcp` |
| [Health Memory](plugins/health-memory) | Manage your health memory. | OAuth | `https://app.trianglehealth.com/mcp` |
| [HealthCheckEmail](plugins/healthcheckemail) | Inspect email domain health. | OAuth | `https://mcp.healthcheckemail.com/mcp` |
| [Healthier](plugins/healthier) | Nutrition & everyday habits. | None | `https://mcp.gethealthier.ai/mcp` |
| [HealthMoney](plugins/healthmoney) | Personal investment advisor. | OAuth | `https://ai.healthmoney.com.br/mcp` |
| [Hedra](plugins/hedra) | Create images, video and audio. | OAuth | `https://mcp.hedra.com/` |
| [Helios](plugins/helios) | Workouts, meals, and progress. | OAuth | `https://api.getheliosapp.com/mcp` |
| [Helium - Student Planner](plugins/helium) | Your semester, from syllabi. | OAuth | `https://mcp.heliumedu.com/mcp` |
| [Helium 10](plugins/helium-10) | Access your Helium 10 data. | OAuth | `https://mcp.helium10.com/mcp` |
| [HelloGem](plugins/hellogem) | Ingredients explained, sourced. | None | `https://api.hellogem.ai/mcp` |
| [HelpCenter.io](plugins/helpcenter-io) | Build and manage a help center. | OAuth | `https://mcp.helpcenter.io/mcp` |
| [HelpDol](plugins/helpdol) | Track your business finances. | OAuth | `https://mcp.helpdol.com/mcp` |
| [HelpWell](plugins/helpwell) | Run your help desk from chat. | OAuth | `https://app.helpwell.ai/mcp` |
| [Hemelion](plugins/hemelion) | Map decisions and patterns. | None | `https://hemelion.com/mcp` |
| [HemmaBo](plugins/hemmabo) | Verified stay offers. | None | `https://hemmabo.com/mcp` |
| [Hemory](plugins/hemory) | Search your real memory. | OAuth | `https://mcp.hemory.com/mcp` |
| [Henneth](plugins/henneth) | Your brand’s LLM layer. | OAuth | `https://mcp.henneth.ai/mcp` |
| [HepaPal](plugins/hepapal) | Track drinking gently. | OAuth | `https://hepapal.net/mcp` |
| [Heptabase](plugins/heptabase) | Connect AI agents to Heptabase to search, read, create, and update knowledge through the hosted MCP server. | OAuth | `https://api.heptabase.com/mcp` |
| [Herculean](plugins/herculean) | Personal planning & execution. | OAuth | `https://mcp.herculean.chat/mcp` |
| [Hercules](plugins/hercules) | Build apps and websites. | OAuth | `https://hercules.app/mcp` |
| [Hercules Real Estate Data](plugins/hercules-real-estate) | Property owners & foreclosures. | None | `https://hercules.properties/mcp` |
| [Here Comes The Guide](plugins/here-comes-the-guide) | Find your dream wedding venue. | None | `https://mcp.herecomestheguide.com/mcp` |
| [Hermoso: AI Ad Generator](plugins/hermoso-ai-ad-generator) | Video ads, image ads & posts. | OAuth | `https://app.hermoso.ai/mcp` |
| [Heroes of AI League (HAIL)](plugins/hail) | Assess a team's AI Fluency. | None | `https://heroleague.ai/mcp` |
| [Hex](plugins/hex) | Hex integration to answer questions about your data with the Hex agent | OAuth | `https://app.hex.tech/mcp` |
| [HeyGen](plugins/heygen) | Create HeyGen avatar videos, personalized video messages, and translated / dubbed videos. | OAuth | `https://mcp.heygen.com/mcp/v1/` |
| [HeyMark](plugins/heymark) | Plan, schedule and reply. | OAuth | `https://mcp.heymark.ai/mcp` |
| [HeyRik](plugins/heyrik) | AI voice agents and calls. | OAuth | `https://mcp.heyrik.com/mcp` |
| [HeyYumi 한국 식당·카페 검색·예약](plugins/heyyumi) | Find & book Korean restaurants. | OAuth | `https://mcp.heyyumi.ai/mcp` |
| [Heyzine Flipbooks](plugins/heyzine-flipbooks) | Publish interactive flipbooks. | OAuth | `https://heyzine.com/mcp` |
| [HFS Research](plugins/hfs-research) | Search HFS Research Website. | OAuth | `https://mcp.hfsresearch.com/mcp` |
| [HG Insights - RGI](plugins/hg-insights) | Prospect intelligence for sale. | OAuth | `https://mcp.hginsights.com/mcp` |
| [Hidden Patterns](plugins/hidden-patterns) | Understand recurring patterns. | None | `https://mcp.hiddenpatterns.ai/mcp` |
| [Hig Media Bookings](plugins/hig-media-bookings) | Manage property photo shoots. | None | `https://hig.media/api/mcp` |
| [Higgs Hub](plugins/higgs-hub) | Gmail + Outlook for your agent. | OAuth | `https://higgshub.pro/api/mcp/mcp` |
| [Higgsfield](plugins/higgsfield) | Generate images, videos, and more using Higgsfield MCP from Reason. | OAuth | `https://mcp.higgsfield.ai/mcp` |
| [HiHello](plugins/hihello) | Business cards and insights. | OAuth | `https://mcp.hihello.com/mcp` |
| [Hiku](plugins/hiku) | Daily number puzzle. | None | `https://hikupuzzle.com/mcp` |
| [Hill Monitor](plugins/hill-monitor) | Search Parliament and alerts. | OAuth | `https://mcp.hillmonitor.ca/mcp` |
| [Hireinator](plugins/hireinator) | Technical hiring from chat. | OAuth | `https://hireinator.com/mcp` |
| [HireNimbus: Book Home Services](plugins/hirenimbus-book-home-services) | Book handyman, HVAC, plumber. | None | `https://mcp.hirenimbus.com/mcp` |
| [HireOtto Performance Ads](plugins/hireotto-performance-ads) | Analyze & Manage Google Ads. | OAuth | `https://googleads.hireotto.com/mcp` |
| [HireSeeker](plugins/hireseeker) | Вакансии для русскоязычных. | None | `https://hireseeker.ru/mcp` |
| [HireTalent.lat](plugins/hiretalent-lat) | Hire remote talent in LATAM. | None | `https://hiretalent.lat/mcp` |
| [Hirevire](plugins/hirevire) | Manage jobs and candidates. | OAuth | `https://app.hirevire.com/api/mcp` |
| [HiringMessage Job Match](plugins/hiringmessage-resume-review) | Match resume to one job. | None | `https://hiringmessage.com/mcp` |
| [Hirly](plugins/hirly) | Job matches and applications. | OAuth | `https://mcp.hirly.me/mcp` |
| [Hive Analytics](plugins/hive-analytics) | Hive video event analytics. | OAuth | `https://mcp.hivestreaming.com/mcp` |
| [Hjarni Notes & Memory](plugins/hjarni-notes-and-memory) | Your notes, your AI’s memory. | OAuth | `https://hjarni.com/mcp` |
| [HL Business Advisor](plugins/hl-business-advisor) | Research hub for entrepreneurs. | None | `https://hustlerslibrary.com/mcp` |
| [HMS Flow](plugins/hms-flow) | Hotel management assistant. | OAuth | `https://mcp.hmsflow.com/mcp` |
| [HMY Yacht Sales](plugins/hmy-yachts) | Research yachts for sale. | None | `https://mcp.hmy.com/mcp` |
| [Hoaster](plugins/hoaster) | Publish web content to a URL. | OAuth | `https://hoaster.app/api/mcp` |
| [Hobbes](plugins/hobbes) | Manage your product agents. | OAuth | `https://api.hihobbes.com/mcp` |
| [Hogmatix](plugins/hogmatix) | Social media scheduling. | OAuth | `https://hogmatix.com/mcp` |
| [HoldsUp](plugins/holdsup) | Podcast claims vs the research. | None | `https://holdsup.app/mcp` |
| [Hologrow](plugins/hologrow) | Analyze your e-commerce data. | OAuth | `https://mcp.hologrow.ai/mcp` |
| [Home](plugins/home-public) | UK homes for sale and to rent. | None | `https://mcp.home.co.uk/mcp` |
| [Home Holding](plugins/homeholding) | Cabinetry quotes & invoices. | OAuth | `https://homeholding.om/mcp` |
| [HomeBase Services](plugins/homebase-services) | New-hire apartment relocation. | None | `https://homebaseservices.com/mcp` |
| [HomeFit: Rent vs Buy](plugins/zimare-homefit) | Rent vs buy calculator. | None | `https://homefit.zimarelabs.com/api/mcp` |
| [HomeLantern](plugins/homelantern) | Review your rental portfolio. | OAuth | `https://mcp.homelantern.app/mcp` |
| [Homemove](plugins/homemove) | Your UK home move, priced. | None | `https://mcp.homemove.com/mcp` |
| [HomePins](plugins/homepins) | Search Bangalore apartments. | None | `https://propcontext-production.up.railway.app/mcp` |
| [Homesage.ai](plugins/homesage-ai) | Find and analyze US properties. | OAuth | `https://api.homesage.ai/mcp` |
| [Homeschool Fox](plugins/homeschool-fox) | Log homeschool hours by chat. | OAuth | `https://homeschoolfox.com/mcp` |
| [HonestDog](plugins/honestdog) | Vetted dog breeders & adoption. | None | `https://server.honestdog.de/api/v1/mcp` |
| [HoneyBook](plugins/honeybook) | Book clients, get paid. | OAuth | `https://mcp.api.honeybook.com/mcp` |
| [Honeycomb](plugins/honeycomb) | Honeycomb integration to query and explore observability data and SLOs | OAuth | `https://mcp.honeycomb.io/mcp` |
| [HookLayer](plugins/hooklayer) | Creator & commerce insights. | OAuth | `https://hooklayer.dev/api/mcp` |
| [HookRadar](plugins/hookradar) | Creative intelligence. | OAuth | `https://mcp.hookradar.net/mcp` |
| [Hoot Lens](plugins/hootlens) | Find snags in website visits. | OAuth | `https://mcp.hootlens.com/mcp` |
| [hoppa](plugins/hoppa) | Book airport transfers & taxis. | None | `https://mcp.hoppa.com/mcp` |
| [Hopper](plugins/hopper) | The latest open-source models. | None | `https://withhopper.com/mcp` |
| [HopToDesk](plugins/hoptodesk) | Fix the computers you manage. | OAuth | `https://dashboard.hoptodesk.com/mcp` |
| [Horizon Pet Waste Solutions](plugins/horizon-pet-waste-solutions) | Get a pet waste removal quote. | None | `https://www.horizonpetwastesolutions.com/mcp` |
| [HORIZON SHIELD](plugins/horizon-shield) | Check Japan reform estimates. | None | `https://mcp.horizonshield.dev/` |
| [HorizonX — Premium UI Library](plugins/horizonx) | Animated UI for your code. | OAuth | `https://horizonx.so/api/mcp` |
| [Hoseasons](plugins/hoseasons) | Explore UK holiday parks. | None | `https://mcp.hoseasons.co.uk/mcp` |
| [Hospitable](plugins/hospitable) | Manage short-term rentals. | OAuth | `https://mcp.hospitable.com/mcp` |
| [HospitalityLens](plugins/hospitalitylens) | Professional property photos. | None | `https://mcp.hospitalitylens.com/mcp` |
| [Host Helper](plugins/host-helper) | Manage vacation rentals. | OAuth | `https://hosthelperai.com/mcp` |
| [HostelHound](plugins/hostelhound) | Hostel trips and price alerts. | OAuth | `https://hostelhound.com/mcp` |
| [Hostinger Mail](plugins/hostinger-mail) | Use Hostinger Mail. | OAuth | `https://mcp.hostinger.com/` |
| [Hostizzy Villas & Farmstays](plugins/hostizzy-villas-and-farmstays) | Find villas and farmstays. | None | `https://book.hostizzy.com/api/mcp` |
| [Hot100.ai](plugins/hot100-ai) | The weekly AI project chart. | None | `https://www.hot100.ai/mcp` |
| [Hotel Please](plugins/hotel-please) | Boutique and design hotels. | None | `https://hotelplease.app/mcp` |
| [hoteldiscount24 Hotels](plugins/hoteldiscount24-hotels) | Hotels by amenity, worldwide. | None | `https://www.hoteldiscount24.com/mcp` |
| [Hotely](plugins/hotely) | Exclusive hotel deals. | OAuth | `https://mcp.hotely.travel/mcp` |
| [Hotelzify - Book Direct](plugins/hotelzify-book-direct) | Search hotels & book stays. | None | `https://mcp.hotelzify.com/mcp` |
| [Houfy](plugins/houfy) | Find direct vacation rentals. | None | `https://mcp.houfy.com/mcp` |
| [HoundTrust](plugins/houndtrust) | Pet-care quotes & invoices. | None | `https://houndtrust.com/api/plugin/mcp` |
| [HourProof](plugins/hourproof) | Log rental participation hours. | OAuth | `https://www.hourproof.app/api/mcp` |
| [Hoursmith](plugins/hoursmith) | Projects, tasks, and time. | OAuth | `https://hoursmith.app/mcp` |
| [HouseLoop](plugins/houseloop) | Kansas City home photo search. | None | `https://houseloop.ai/api/mcp` |
| [HoverBot](plugins/hoverbot) | See what your chatbot missed. | OAuth | `https://mcp.hoverbot.ai/mcp` |
| [How is my trip?](plugins/how-is-my-trip) | Live travel disruption radar. | None | `https://mmatinca.eu/mcp` |
| [How It Spread](plugins/howitspread) | Viral precedents, sourced. | None | `https://howitspread.com/api/mcp` |
| [How Walkable](plugins/how-walkable) | Walkability scores anywhere. | None | `https://howwalkable.com/mcp` |
| [Howdy Apartments](plugins/howdy-apartments) | Apartment guidance for Aggies. | None | `https://howdyapartments.com/mcp` |
| [HTML/CSS to Image](plugins/html-css-to-image) | Let AI agents capture live website screenshots, render HTML/CSS, and populate reusable templates as images or PDFs - without managing a browser. | OAuth | `https://mcp.hcti.io` |
| [Hubity](plugins/hubity) | Bill the month, draft invoices. | OAuth | `https://hubity.io/api/mcp` |
| [HubPost](plugins/hubpost) | Manage social media posts. | OAuth | `https://mcp.hubpost.co/mcp` |
| [HubSpot](plugins/hubspot) | Search and update contacts, companies, deals, and tickets. | OAuth | `https://mcp.hubspot.com` |
| [Hubstaff](plugins/hubstaff) | AI-ready workforce insights. | OAuth | `https://mcp.hubstaff.com/mcp` |
| [Huddo](plugins/huddo) | Group chat for people and AI. | OAuth | `https://mcp.huddo.ai/mcp` |
| [Hugeicons](plugins/hugeicons) | Beautiful icons for your UI. | None | `https://mcp.hugeicons.com/mcp` |
| [Hugging Face](plugins/hugging-face) | Hugging Face integration to access the Hub and thousands of Gradio apps | OAuth | `https://huggingface.co/mcp` |
| [Human Forward Findability](plugins/human-forward-findability) | How findable is your brand. | OAuth | `https://app.humanforward.io/mcp` |
| [HumanFn](plugins/humanfn) | Human sign-off for your AI. | None | `https://humanfn.com/mcp` |
| [Humanizar Texto BR](plugins/humanizar-texto) | Polish Brazilian Portuguese. | OAuth | `https://humanizartexto.com.br/mcp` |
| [Humanize AI](plugins/humanize-ai) | Make AI writing sound human. | OAuth | `https://mcp.humanizeaitext.ai/mcp` |
| [HUMANStoknow](plugins/humanstoknow) | Give your AI agents a playbook. | OAuth | `https://humanstoknow.com/api/mcp` |
| [Humantic AI](plugins/humantic-ai) | Profile buyers and accounts. | OAuth | `https://mcp.humantic.ai/mcp` |
| [Hunr](plugins/hunr) | Engineering take-homes. | OAuth | `https://mcp.hunr.ai/mcp` |
| [Huntay AzerTürk](plugins/huntay-azerturk) | Book calls, explore services. | None | `https://huntayazerturk.com/mcp` |
| [Hunter](plugins/hunter) | Find and verify emails, discover companies, and save leads. | OAuth | `https://mcp.hunter.io/mcp` |
| [Hushword Imposter](plugins/hushword) | Impostor party word game. | None | `https://hushword.ambientapp.ai/mcp/claude` |
| [Hustle Got Real](plugins/hustle-got-real) | Run your dropshipping store. | None | `https://mcp.hustlegotreal.com/mcp` |
| [Hydrafetch](plugins/hydrafetch) | Read the live web as markdown. | OAuth | `https://api.hydrafetch.com/mcp` |
| [Hydrant](plugins/hydrant) | Track issues with your agent. | OAuth | `https://hydrant.dev/api/mcp` |
| [HyNote](plugins/hynote) | Search, read, and create notes. | OAuth | `https://hynote.ai/mcp` |
| [Hypamoon](plugins/hypamoon) | Your app, live and connected. | OAuth | `https://api.hypamoon.com/api/v1/mcp` |
| [Hyperhuman Agent Workspace](plugins/hyperhuman-agent-workspace) | Operate fitness content. | None | `https://mcp.hyperhuman.cc/mcp` |
| [Hyperline](plugins/hyperline) | CPQ, billing, and revenue. | OAuth | `https://mcp.hyperline.co/mcp` |
| [Hypernatural](plugins/hypernatural) | Create and edit AI videos. | OAuth | `https://api.hypernatural.ai/mcp` |
| [Hyperspell](plugins/hyperspell) | Search company knowledge, ask questions with citations, and save memories. | API key | `https://api.hyperspell.com/mcp` |
| [Hyperus](plugins/hyperus) | Analyze your factory data. | OAuth | `https://mcp.hyperus.com.br/mcp` |
| [Hypothèques en ligne](plugins/hypotheques-en-ligne) | French land registry quotes. | OAuth | `https://www.hypotheques-en-ligne.fr/wp-json/easy-mcp-ai/v1/mcp` |
| [Hyros](plugins/hyros) | AI optimization for Ads. | OAuth | `https://mcp.hyros.com/mcp` |
| [i7OS](plugins/i7os) | Create and manage brand assets. | OAuth | `https://mcp.i7os.com/mcp` |
| [iArchi](plugins/iarchi) | Architecture for agents. | OAuth | `https://mcp.iarchi.cloud/mcp` |
| [Iceflower](plugins/iceflower) | Merchant & customer analytics. | OAuth | `https://iceflower.ai/mcp` |
| [IcePanel](plugins/icepanel) | Design your software architecture with IcePanel's MCP in Reason. | OAuth | `https://mcp.icepanel.io/mcp` |
| [Idea To Prototype Beta](plugins/idea-to-prototype-beta) | Plan prototypes from ideas. | None | `https://idea-to-prototype-app.vercel.app/mcp` |
| [Ideagents](plugins/ideagents-workbench) | Develop ideas into clear plans. | None | `https://ideagents.ai/mcp` |
| [IdeaKiller](plugins/ideakiller) | Validate startup ideas. | OAuth | `https://api.ideakiller.app/mcp` |
| [Identik](plugins/identik) | Documents and signatures. | API key | `https://firma.identik.me/api/mcp` |
| [idle.am](plugins/idle-am) | Play your idle MMO character. | OAuth | `https://api.idle.am/mcp` |
| [IDYORA](plugins/idyora) | Indian recipes and calories. | None | `https://idyora.com/mcp` |
| [ievent.ro](plugins/ievent) | Găsește locații și furnizori. | None | `https://ievent.ro/mcp` |
| [Ignition](plugins/ignition) | Manage client work. | OAuth | `https://mcp.ignitionapp.com/mcp` |
| [IIDX DP Coach](plugins/iidx-dp-coach) | IIDX DP 실력 분석·연습곡 추천. | None | `https://iidx.in/mcp` |
| [iitjobs](plugins/iitjobs) | Find IT jobs worldwide. | None | `https://www.iitjobs.com/mcp` |
| [ILEVIA](plugins/ilevia) | Control your ILEVIA smart home. | OAuth | `https://mcp.ilevia.com/mcp` |
| [iLoveAudioVideo](plugins/iloveaudiovideo) | Transcribe on your own device. | None | `https://iloveaudiovideo.com/mcp` |
| [iLovePDF](plugins/ilovepdf) | Manage, convert, optimize PDFs. | OAuth | `https://mcp.ilovepdf.com/mcp` |
| [Imagen for Real Estate](plugins/imagen-for-real-estate) | AI editing for listing photos. | None | `https://api-docs.imagen-ai.com/mcp` |
| [Imagina RPG](plugins/imagina-rpg) | Imagina RPG authoring helper. | OAuth | `https://playimagina.com/api/mcp` |
| [ImagineArt](plugins/imagineart) | Generate images, video, music. | OAuth | `https://mcp.imagine.art/mcp` |
| [IMEI Checker by Kelpom](plugins/imei-checker-by-kelpom) | Identify any phone by its IMEI. | None | `https://api.kelpom.fr/mcp` |
| [Immopix](plugins/immopix) | Enhance real estate photos. | OAuth | `https://immopix.ai/mcp` |
| [ImoVertical](plugins/imovertical) | Check a French property. | OAuth | `https://mcp.imovertical.com/mcp` |
| [Impala](plugins/impala) | Nonprofit & Foundation Data. | OAuth | `https://mcp.impala.digital/mcp` |
| [ImportYeti](plugins/importyeti) | Find importers and suppliers. | OAuth | `https://data.importyeti.com/mcp` |
| [Impreza Host](plugins/impreza-host) | Deploy apps, manage servers. | None | `https://mcp.imprezahost.com/mcp` |
| [In Practise](plugins/in-practise) | Primary research for investors. | OAuth | `https://inpractise.com/api/v1/mcp` |
| [inblog](plugins/inblog) | Write and publish blog posts. | OAuth | `https://inblog.ai/api/mcp` |
| [Inbox Monster](plugins/inbox-monster) | Monitor email deliverability. | OAuth | `https://mcp.inboxmonster.com/mcp` |
| [inboxmcp](plugins/inboxmcp) | Your email, your agent. | OAuth | `https://app.inboxmcp.ai/mcp` |
| [InboxTrue](plugins/inboxtrue) | Check if email addresses exist. | OAuth | `https://inboxtrue.com/mcp` |
| [Incarn](plugins/incarn) | Animate old family photos. | None | `https://api.incarn.co/mcp` |
| [Incarna](plugins/incarna) | Turn your plan into a workout. | OAuth | `https://api.incarna.app/mcp` |
| [incident.io](plugins/incident-io) | incident.io integration to see and manage everything in incident.io | OAuth | `https://mcp.incident.io/mcp` |
| [IndexGrid Commercial Intent](plugins/indexgrid-commercial-intent) | Enquire with cited businesses. | None | `https://mcp.indexgrid.io/mcp` |
| [IndicadoresChilenos](plugins/indicadoreschilenos) | Indicadores económicos CL. | None | `https://indicadores.amestica.tech/mcp` |
| [inDM](plugins/indm) | Instagram comment-to-DM. | None | `https://api.indm.social/mcp` |
| [InfiniteWatch](plugins/infinitewatch) | Operations observability. | OAuth | `https://mcp.infinitewatch.ai/mcp` |
| [Inflearn](plugins/inflearn) | Your lecture knowledge vault. | OAuth | `https://mcp.inflearn.com/mcp` |
| [Influee](plugins/influee) | Manage UGC creator campaigns. | OAuth | `https://mcp.influee.co/mcp` |
| [Influship](plugins/influship-creator-workspace) | Find creators & influencers. | None | `https://mcp.influship.com/mcp` |
| [Infobip](plugins/infobip) | Infobip MCP Servers let you build AI agents to interact with the Infobip platform through the Model Context Protocol (MCP). | OAuth | `https://mcp.infobip.com/sms` |
| [InfoFranquicias](plugins/infofranquicias) | Busca franquicias en Reason. | None | `https://mcp.infofranquicias.com/mcp` |
| [Infographic Artist](plugins/infographic-artist) | Principes et critique visuelle. | OAuth | `https://mcp.hatchable.site/` |
| [InfoGrunt](plugins/infogrunt) | Sprawdź działkę w Polsce. | None | `https://infogrunt.pl/mcp` |
| [Infoparcelle](plugins/infoparcelle) | French cadastre & sale prices. | OAuth | `https://mcp.infoparcelle.fr/mcp` |
| [Infrabase](plugins/infrabase) | AI infra directory and prices. | None | `https://infrabase.ai/mcp` |
| [InfyNote](plugins/infynote) | Your team's threads and tasks. | OAuth | `https://api.infynote.com/mcp` |
| [Inistate](plugins/inistate) | Make & run business workflows. | OAuth | `https://mcp.inistate.com/mcp` |
| [Inkbox](plugins/inkbox) | Give Reason an Inkbox identity for email, SMS, iMessage, voice calls, contacts, notes, and agent-to-agent tasks. | OAuth | `https://inkbox.ai/mcp/cursor` |
| [Inkdrop](plugins/inkdrop) | Turn artwork into products. | None | `https://mcp.inkdrop.fun/mcp` |
| [Inkle](plugins/inkle) | Access your Inkle finance data. | OAuth | `https://api.inkle.io/api/inkle/ai_agents/mcp` |
| [Inline](plugins/inline) | Work chats in Reason. | OAuth | `https://mcp.inline.chat/mcp` |
| [Inner Lens](plugins/inner-lens) | Bazi, Ziwei & Liuyao readings. | None | `https://inner.lens.io.vn/mcp` |
| [innernet](plugins/innernet) | one memory for every AI tool. | OAuth | `https://innernet.live/api/mcp` |
| [InsightfulPipe](plugins/insightfulpipe) | Use Google Ads, Meta, TikTok. | OAuth | `https://main.insightfulmcp.com/` |
| [inSitu Sales](plugins/insitu-sales) | Run wholesale sales operations. | OAuth | `https://api.insitusales.com/mcp` |
| [Inspiration by VASA](plugins/inspiration-by-vasa) | Find design inspiration. | OAuth | `https://mcp.vasa.works/mcp` |
| [Instagram & TikTok by 1Social](plugins/instagram-and-tiktok-by-1social) | Post to Facebook, LinkedIn, X. | OAuth | `https://mcp.1social.dev/mcp` |
| [Instant](plugins/instant) | Domain search and name ideas. | None | `https://mcp.instant.ai/mcp` |
| [Instant Books](plugins/instant-books) | Ask your AI Bookkeeper. | OAuth | `https://ui.instantbooks.ai/mcp` |
| [Instant DSCR Term Sheet](plugins/instant-dscr-term-sheet) | Term sheets for DSCR loans. | None | `https://dominickprevete.com/api/mcp/pricing` |
| [Instavar Video Templates](plugins/instavar-video-templates) | For use with Remotion. | None | `https://instavar.com/api/mcp/templates` |
| [Instinct MSP Intelligence](plugins/instinct-msp-intelligence) | MSP market intelligence. | OAuth | `https://mcp.mspmcp.com/mcp` |
| [instingo - Schritte Challenge](plugins/instingo-schritte-challenge) | Schritte Challenge für Teams. | None | `https://instingo.de/mcp` |
| [InsumerAPI](plugins/insumer) | Wallet auth for AI agents. | None | `https://api.insumermodel.com/mcp` |
| [Insurancemarket.ae](plugins/insurancemarket) | Car Insurance UAE. | None | `https://mcp.insurancemarket.ae/mcp` |
| [InsurConnect](plugins/insurconnect) | Find licensed insurance agents. | None | `https://mcp.insurconnect.ai/mcp` |
| [Insurify](plugins/insurify) | Compare car insurance quotes. | None | `https://mcp.insurify.com/mcp` |
| [Intake – Client Docs](plugins/intake) | Collect client docs and forms. | OAuth | `https://dointake.com/mcp` |
| [Intakra](plugins/intakra) | Find accounts worth a look. | OAuth | `https://mcp.intakra.com/mcp` |
| [InteliDress](plugins/intelidress) | Style outfits from your closet. | OAuth | `https://connect.intelidress.app/mcp` |
| [Intelli](plugins/dev-6abceb9234cc8191b8403f75f5940137) | Manage customer engagement. | OAuth | `https://mcp.intelliconcierge.com/mcp` |
| [IntelliGoal](plugins/intelligoal) | Match evidence, made clear. | None | `https://theintelligoal.com/mcp` |
| [Intellist](plugins/intellist) | Find anything in your home. | OAuth | `https://intellist.app/api/mcp` |
| [Intentwise](plugins/intentwise) | Analyze, manage ads and retail. | OAuth | `https://mcp.intentwise.com/mcp` |
| [Interactive Brokers](plugins/interactive-brokers) | Review positions, balances, P&L, and draft trade instructions. | OAuth | `https://api.ibkr.com/v1/api/mcp-public` |
| [Intercom (API key)](plugins/intercom-api-key) | Search conversations, contacts, and Help Center articles. | API key | `https://mcp.intercom.com/mcp` |
| [Interestnaut](plugins/interestnaut) | Find what to watch, read, play. | OAuth | `https://api.interestnaut.com` |
| [Intern](plugins/intern) | Build private team sites. | OAuth | `https://tryintern.dev/mcp` |
| [InternetData](plugins/internetdata) | IP and ASN databases. | OAuth | `https://mcp.internetdata.io/mcp` |
| [Intrasistema](plugins/intrasistema) | Gestión y Productividad ERP. | OAuth | `https://mcp.intrasistema.com/` |
| [Intropic](plugins/intropic) | Access Intropic products. | OAuth | `https://mcp.intropic.io/gateway/mcp` |
| [Investboard](plugins/investboard) | Second brain for investing. | OAuth | `https://investboard.com/mcp` |
| [invideo](plugins/invideo) | Make videos with invideo: generate media, edit timelines, and export. | OAuth | `https://mcp.invideo.io/mcp` |
| [invinoveritas](plugins/invinoveritas) | Second opinion before you act. | OAuth | `https://api.babyblueviper.com/mcp` |
| [InviteKit Calendar Files](plugins/calendar-invite) | .ics files & calendar links. | None | `https://calendar-invite.zovo.one/mcp` |
| [Invoa](plugins/invoa) | Invoicing & LHDN e-invoices. | OAuth | `https://invoa.io/mcp` |
| [Invoice Generator by FieldHive](plugins/invoice-generator) | Invoice template, tax and PDF. | None | `https://tools.fieldhive.com/invoice-generator/mcp` |
| [InvoiceCraft AI](plugins/invoicecraft-ai) | Create service invoices. | None | `https://invoicecraft-ai.vercel.app/mcp` |
| [InvoiceParser Pro](plugins/invoiceparser-pro) | Invoice to Excel, math checked. | None | `https://api.invoiceparserpro.com/mcp` |
| [invoiso](plugins/invoiso) | Invoicing and bookkeeping. | OAuth | `https://www.invoiso.com/api/mcp` |
| [Invoist](plugins/invoist) | Draft invoices from your work. | OAuth | `https://invoist.app/mcp` |
| [Invokary Platform Requirements](plugins/invokary-platform-requirements) | Connector listing requirements. | None | `https://mcp.invokary.com/mcp` |
| [IOL invertironline](plugins/iol-invertironline) | Trade Argentine investments. | OAuth | `https://mcp.invertironline.com/mcp` |
| [ioreum Saju](plugins/ioreum-saju) | Korean saju charts, computed. | None | `https://ioreum.com/api/mcp` |
| [IP Author](plugins/ip-author) | Patent search and analysis. | OAuth | `https://mcp.ipauthor.com/mcp` |
| [IPOInsider](plugins/ipoinsider) | IPO market data. | OAuth | `https://mcp.ipoinsider.com/mcp` |
| [IPRally](plugins/iprally) | Search and analyze patents. | OAuth | `https://mcp.iprally.com/mcp` |
| [IQ Sell My Car](plugins/iq-sell-my-car) | Value and sell your car. | None | `https://iqautodeals.com/api/mcp` |
| [IQLand](plugins/iqland) | Real-estate dev intelligence. | OAuth | `https://mcp.iqland.ai/mcp` |
| [IQRush](plugins/iqrush) | Measure AI search visibility. | OAuth | `https://api.prod.gso.iqrush.ai/api/mcp/mcp` |
| [iQuota](plugins/iquota) | Book independent hotels direct. | None | `https://iquota.io/mcp` |
| [IrisAgent](plugins/irisagent) | Ask about your support data. | OAuth | `https://mcp.irisagent.com/mcp` |
| [Irish Tax Hub](plugins/irish-tax-hub) | Irish tax tools and guidance. | None | `https://mcp-prod.aws.irishtaxhub.ie/mcp` |
| [is it DNS?](plugins/isitdns) | Live DNS checks, public seats. | None | `https://isitdns.net/mcp` |
| [Is It Safe To Travel?](plugins/is-it-safe-to-travel) | Check official travel advice. | None | `https://travelsafety-un15.onrender.com/mcp` |
| [Is This AI Agent Safe?](plugins/greenlit-books) | Safety verdicts on AI agents. | None | `https://greenlitbooks.com/api/mcp` |
| [isango!](plugins/isango) | Discover tours and activities. | None | `https://mcp.isango.com/mcp` |
| [iscabox](plugins/iscabox) | Pesca no Brasil: locais, marés. | None | `https://www.iscabox.com/mcp` |
| [isGenAI](plugins/isgenai) | Check content for AI evidence. | None | `https://isgenai.com/mcp` |
| [Isoligne](plugins/isoligne) | Verified company data. | None | `https://isoligne.com/mcp` |
| [IssueBadge](plugins/issuebadge) | Issue certificates by chat. | OAuth | `https://issuebadge-mcp.issuebadge.workers.dev/mcp` |
| [IsThisSpam](plugins/isthisspam) | Check scam signals. | None | `https://mcp.isthisspam.org/mcp` |
| [Italic](plugins/italic) | Your Italic library in Reason. | OAuth | `https://app.italic.com/api/v1/mcp` |
| [Itcons.app Work Reports](plugins/itcons-app-work-reports) | view your work reports. | OAuth | `https://mcp.itcons.app/mcp` |
| [item](plugins/item) | Search, analyze, manage CRM. | OAuth | `https://mcp.item.app/mcp` |
| [Iterate](plugins/iterate) | Explore customer feedback. | OAuth | `https://iteratehq.com/mcp` |
| [Itha](plugins/itha) | Industrial & robotics vendors. | None | `https://mcp.itha.ai/mcp` |
| [iubenda: Privacy compliance](plugins/iubenda-privacy-compliance) | Policies, terms, cookie banner. | OAuth | `https://mcp-server.iubenda.com/mcp` |
| [iusLink](plugins/iuslink) | Swiss statutes and case law. | OAuth | `https://iuslink.ch/mcp` |
| [iwantmyname Domain Search](plugins/iwantmyname) | Check domain name availability. | None | `https://mcp.iwantmyname.com/mcp` |
| [IXA.RO - Comparator de preturi](plugins/ixa-ro) | Compare prices in Romania. | None | `https://ixa.ro/mcp` |
| [İyi Gelir](plugins/iyigelir) | Turkish mutual fund data. | OAuth | `https://mcp.iyigelir.net/mcp` |
| [iZap](plugins/izap) | Manage your WhatsApp business. | OAuth | `https://izap.ai/mcp` |
| [IZeat](plugins/izeat) | Calorie tracker you talk to. | OAuth | `https://izeat.app/api/mcp` |
| [Izifete](plugins/izifete) | Find event vendors nearby. | None | `https://izifete.fr/mcp/mcp` |
| [JackHamr](plugins/jackhamr) | Hand work to your AI agents. | OAuth | `https://api.jackhamr.ai/mcp` |
| [Jade Email](plugins/jade-email) | Read, organize, and send mail. | OAuth | `https://jade.email/mcp` |
| [Jade Note](plugins/jade-note) | Editable memory layer. | OAuth | `https://api.jadenote.app/mcp` |
| [Jam](plugins/jam) | Access Jam bug reports, recordings, console/network context, and repro steps. | OAuth | `https://mcp.jam.dev/mcp` |
| [JamBase](plugins/jambase) | Go See Live Music! | OAuth | `https://mcp.jambase.com/mcp` |
| [James Villas](plugins/james-villas) | Handpicked Holiday Villas. | None | `https://mcp.jamesvillas.co.uk/mcp` |
| [Jamie](plugins/jamie) | Access your meeting history. | OAuth | `https://mcp.meetjamie.ai/mcp` |
| [JARS LT](plugins/jars-lt) | Lithuanian business data. | None | `https://api.jars.lt/mcp` |
| [JAWD](plugins/jawd) | Shop JAWD jaw trainers. | None | `https://mcp.jawd.in/mcp` |
| [Jawz](plugins/jawz) | Read markets, check portfolio. | None | `https://jawz.ai/api/mcp` |
| [Jaz Accounting](plugins/jaz-accounting) | Fastest ledger for agents. | OAuth | `https://mcp.jaz.ai/mcp` |
| [JCI SK Portal](plugins/jci-sk-portal) | Browse & search JCI SK docs. | OAuth | `https://jcisouthkey.aukaworks.com/mcp` |
| [Jemma](plugins/jemma) | Nurse pay and take-home math. | None | `https://nursejemma.com/api/v1/mcp` |
| [Jepto](plugins/jepto) | Digital Marketing Intelligence. | OAuth | `https://mcp.jepto.com/` |
| [Jessie Script Director](plugins/jessie-script-director) | Guided product-video scripts. | None | `https://jessie-public-chatgpt-app.vercel.app/mcp` |
| [Jetopia: Jeju Driver Tours](plugins/jetopia-jeju-driver-tours) | Private driver tours in Jeju. | None | `https://mcp.jetopia.kr/mcp` |
| [Jetpost](plugins/jetpost) | Message your team from Reason. | OAuth | `https://jetpost.com/mcp` |
| [Jiminny](plugins/jiminny) | Search calls, deals, customers. | OAuth | `https://mcp.jiminny.com/mcp` |
| [Jinko](plugins/jinko) | Book flights and hotels. | None | `https://mcp.gojinko.com/mcp` |
| [Jira](plugins/jira) | Read Jira issues, projects, statuses, users, and comments through Atlassian's hosted MCP server. | OAuth | `https://mcp.atlassian.com/v1/mcp` |
| [Jithox](plugins/jithox) | Invoice and IBAN checks. | None | `https://jithox.com/mcp` |
| [Job Listings](plugins/job-listings) | Find jobs by role and location. | None | `https://mcp.applygateway.com/mcp` |
| [Job Search by ApplyBolt](plugins/job-search-by-applybolt) | Search open jobs & internships. | None | `https://applybolt.app/mcp` |
| [Job Search by Jobtome](plugins/job-search-by-jobtome) | Find jobs in 30+ countries. | None | `https://mcp.jobtome.com/mcp` |
| [Job Status Checker](plugins/jobcheck) | Compare job status snapshots. | None | `https://jobcheck-mcp.sunrysetech.com/mcp` |
| [JobFinder](plugins/jobfinder) | Your job matches and outreach. | OAuth | `https://mcp.jobfinder-ai.com/mcp` |
| [JobHawk](plugins/jobhawk) | Track your job applications. | OAuth | `https://mcp.jobhawk.app/mcp` |
| [Jobicy](plugins/jobicy) | Find remote jobs and careers. | None | `https://jobicy.com/mcp` |
| [joblet.ai - AI Job Search](plugins/joblet-ai-ai-job-search) | Let AI find you the right job. | None | `https://mcp.joblet.ai/mcp` |
| [JobMojito](plugins/jobmojito) | AI interviews and role-play. | OAuth | `https://mcp.jobmojito.com/mcp` |
| [Joboostr](plugins/joboostr) | Find jobs with Joboostr. | OAuth | `https://mcp.joboostr.com/mcp` |
| [JobPhoning](plugins/jobphoning) | Vos chiffres clés JobPhoning. | OAuth | `https://mcp.jobphoning.com/` |
| [JobsDXB.com](plugins/jobsdxb-com) | Find UAE jobs. | None | `https://jobsdxb.com/api/mcp` |
| [JobSnap](plugins/jobsnap) | Jobs, crews, hours, invoices. | OAuth | `https://mcp.jobsnap.ca/mcp` |
| [JobSprout](plugins/jobsprout) | Score and build your resume. | None | `https://jobsprout.ai/mcp` |
| [JobStack](plugins/jobstack) | HVAC & field operations. | OAuth | `https://mcp.jobstackcrm.com/mcp` |
| [JoinLayer](plugins/joinlayer) | Build and run data pipelines. | OAuth | `https://mcp.joinlayer.app/mcp` |
| [Joinways](plugins/joinways) | CRM for event venues. | OAuth | `https://mcp.joinways.app/mcp` |
| [Jokerly American Mahjong](plugins/jokerly) | Mah jongg hands & Charleston. | None | `https://jokerly.ambientapp.ai/mcp/claude` |
| [JoomPulse](plugins/joompulse) | Brazil E-Commerce Data. | OAuth | `https://joompulse.com/mcp` |
| [Jotform](plugins/jotform) | Create and edit forms, then read submissions. | OAuth | `https://mcp.jotform.com` |
| [Joti](plugins/joti) | AI workout planning & tracking. | OAuth | `https://joti.kompetic.com/api/ai/mcp` |
| [Jotter](plugins/jotter) | Carry context between AI chats. | OAuth | `https://jotter.fyi/mcp` |
| [Jotterful](plugins/jotterful) | Capture and organize notes. | OAuth | `https://www.jotterful.com/mcp` |
| [Joules](plugins/joules) | Level up your AI cycling coach. | OAuth | `https://mcp.joules.cc/` |
| [Journeyed LA hotel facts](plugins/journeyed-la-hotels) | Sourced LA hotel facts. | None | `https://journeyed.org/mcp` |
| [Joy2Move Home Exercise Library](plugins/home-fitness-exercise-library) | Find and watch exercise demos. | None | `https://www.joy2move.net/api/exercises/mcp` |
| [Jsonify](plugins/jsonify) | Reliable web data, on repeat. | OAuth | `https://factory.jsonify.com/mcp` |
| [Judd](plugins/judd) | Your buyer's advocate. | OAuth | `https://judd.flowinfo.co/mcp` |
| [Juicebox](plugins/juicebox) | Query recruiting analytics, shortlists, and sourcing agents. | OAuth | `https://mcp.juicebox.ai/v1` |
| [Juicy Profit Analytics](plugins/juicy-profit-analytics) | Shopify profit & ad analytics. | OAuth | `https://juicy.easyapps.cloud/api/mcp` |
| [Julius: Excel & Data Analysis](plugins/julius) | Analyze data and build reports. | OAuth | `https://mcp.julius.ai/mcp` |
| [Jupiter Invoice](plugins/jupiter-invoice) | Create and send invoices. | OAuth | `https://jupiterinvoice.com/mcp` |
| [Jupiter Signup](plugins/jupiter-signup) | Sign-up forms with payments. | OAuth | `https://jupitersignup.com/mcp` |
| [Juridata](plugins/juridata) | Search Moroccan law & rulings. | OAuth | `https://api.juridata.ma/mcp` |
| [Jurisprudências.ai](plugins/jurisprudencias-research) | Brazilian case law research. | OAuth | `https://jurisprudencias.ai/mcp` |
| [Juriv'IA](plugins/juriv-ia) | Assistant juridique français. | OAuth | `https://jurivia.fr/mcp` |
| [Jurly](plugins/dev-6adae5e1f5988191861a8f4b5cb968f3) | LSAT prep inside Reason. | OAuth | `https://getjurly.com/mcp` |
| [Juscribe](plugins/jus) | Plan and track work in chat. | OAuth | `https://mcp.juscribe.ai/mcp` |
| [Jusratio](plugins/jusratio) | Brazilian legal research. | OAuth | `https://mcp.jusratio.com.br/mcp` |
| [Just Domain](plugins/just-domain) | Search and buy domain name. | None | `https://mcp.justdomain.ai/mcp` |
| [Just Flow It](plugins/just-flow-it) | Draw and edit BPMN diagrams. | OAuth | `https://justflow.it/api/mcp` |
| [Just Publish.](plugins/just-publish) | Publish websites to a live URL. | OAuth | `https://mcp.justpublish.ai/mcp` |
| [JustFill PDF Forms](plugins/justfill-pdf-forms) | Fill existing PDF forms. | OAuth | `https://justfill.app/api/mcp` |
| [JustTranscribe](plugins/justtranscribe) | Video and audio to text. | OAuth | `https://justtranscribe.ai/api/mcp` |
| [Justworks](plugins/justworks) | Get PEO information. | OAuth | `https://mcp.justworks.com/` |
| [juudd](plugins/juudd) | Put your AI project online. | OAuth | `https://mcp.juudd.com/mcp` |
| [K-Beauty, Spa & Hair Booking](plugins/k-beauty-spa-and-hair-booking) | Book K-Beauty in Korea. | None | `https://chat.timeplex.ai/mcp` |
| [K-Fortune 사주](plugins/k-fortune) | Saju-based self-reflection. | None | `https://kfortune.co/mcp` |
| [K3X](plugins/k3x) | Search and update your CRM. | OAuth | `https://mcp.k3x.ai/mcp` |
| [Kadenzo](plugins/kadenzo) | Schedule social media posts. | OAuth | `https://studio.kadenzo.app/api/mcp` |
| [Kaebox](plugins/kaebox) | Compare Live Shipping Rates. | None | `https://mcp.kaebox.com/mcp` |
| [KaiCalls](plugins/kaicalls) | AI answers your business calls. | OAuth | `https://kaicalls.com/mcp` |
| [Kairon](plugins/kairon) | Find, qualify, reach leads. | OAuth | `https://app.heykairon.com/mcp` |
| [Kalender Sync](plugins/kalender-sync) | Check and book your calendars. | OAuth | `https://app.kalender-sync.de/mcp` |
| [Kalenteri.online](plugins/kalenteri-online) | Finnish calendar data. | None | `https://api.kalenteri.online/v1/mcp` |
| [Kalkınma Yatırım Bankası](plugins/kalk-nma-yat-r-m-bankas) | Public TKYB Information. | None | `https://mcp.kalkinma.com.tr/mcp` |
| [Kallax.io](plugins/kallax-io) | Kallax.io board games & events. | None | `https://kallax.io/mcp` |
| [Kalori: Chat Nutrition Tracker](plugins/kalori) | Nutrition for 490+ JP chains. | OAuth | `https://mcp.kalori.jp/mcp` |
| [Kamai](plugins/kamai) | Construction Blueprint AI. | OAuth | `https://mcp.kamai.io/mcp` |
| [KamuiDash](plugins/kamuidash) | Manage apps on KamuiDash. | OAuth | `https://api.kamui-platform.com/mcp` |
| [Kanban Board](plugins/kanban) | Visual task workflow board. | None | `https://kanban.host.safrow.com/mcp` |
| [Kanonix](plugins/kanonix) | Algerian law, sourced. | None | `https://kanonix.app/mcp` |
| [Kapa](plugins/kapa) | Connect your docs, tickets, wikis and 20+ other sources. | OAuth | `https://mcp.kapa.ai/mcp` |
| [Kapwing](plugins/kapwing) | Caption, translate & dub video. | OAuth | `https://kapwing.com/mcp` |
| [KashLog](plugins/kashlog) | Multi-currency expense tracker. | OAuth | `https://kashlog.app/mcp` |
| [Kastra](plugins/kastra) | Inspect AI governance. | OAuth | `https://api.kastra.ai/mcp/account` |
| [Kasvu](plugins/kasvu) | Science-backed training plans. | OAuth | `https://mcp.kasvu.fit/mcp` |
| [Kazna](plugins/kazna) | Author cabinet analytics. | OAuth | `https://kazna.online/mcp` |
| [KDAN PDF](plugins/kdan-pdf) | Compare, Redact, Compress PDFs. | None | `https://mcp.kdandoc.com/mcp` |
| [KDP Coloring Book Studio](plugins/kdp-coloring-book) | Create coloring book interiors. | OAuth | `https://api.kdpcoloringbook.com/mcp/` |
| [Keel](plugins/keel) | Hyperliquid strategy builder. | OAuth | `https://mcp.usekeel.io/mcp` |
| [Keel Stats](plugins/keel-stats) | NBA & NFL advanced stats. | None | `https://api.keelstats.com/mcp` |
| [Keenable](plugins/keenable) | Search the web, read pages. | None | `https://api.keenable.ai/mcp` |
| [KEEP Highlights](plugins/keep-highlights) | Find key moments in any media. | None | `https://skeepit.co/mcp` |
| [Keeploop](plugins/keeploop) | All of your Mac, every chat. | OAuth | `https://mcp.keeploop.app/mcp` |
| [KenPunt](plugins/kenpunt) | Read college football ratings. | None | `https://kenpunt.com/mcp` |
| [Kenso](plugins/ken) | Run your cold email outreach. | OAuth | `https://mcp.ken.so/mcp` |
| [Kepler](plugins/kepler) | Save links, build AI memory. | OAuth | `https://app.keplerbrowser.com/mcp` |
| [Kernel](plugins/kernel) | Launch Chromium browsers, execute Playwright code, and automate web interactions through Kernel's hosted MCP server. | OAuth | `https://mcp.onkernel.com/mcp` |
| [kernelCAD](plugins/kernelcad) | Plain English to CAD models. | OAuth | `https://mcp.kernelcad.com/mcp` |
| [Key Carpool](plugins/keycarpool) | Your carpool, at a glance. | OAuth | `https://www.keycarpool.com/api/agents/mcp` |
| [KeyBid Puls](plugins/keybid-puls) | Evaluate Buy for STR Viability. | None | `https://keybid.eu/mcp` |
| [Keypup](plugins/keypup) | Engineering Analytics. | OAuth | `https://hq.keypup.io/mcp` |
| [Keys Locksmith](plugins/keys-locksmith) | Find and book local locksmiths. | None | `https://mcp.keys.app/mcp` |
| [Keyshift Chord Transposer](plugins/chord-transposer) | Change keys and capo shapes. | OAuth | `https://mcp.zovo.one/mcp/per-diem` |
| [Keyword Tool Pro](plugins/keyword-tool-pro) | Keyword research and SEO data. | OAuth | `https://mcp.keywordtool.io/` |
| [Keyword Tool: Free SEO Ideas](plugins/keyword-tool-free-seo-ideas) | Free keyword research. | None | `https://mcp.keywordtool.io/guest` |
| [Keyword.com](plugins/keyword-com) | Track SEO & AEO visibility. | OAuth | `https://app.keyword.com/mcp` |
| [Khattet](plugins/khattet) | University schedules and GPA. | OAuth | `https://mcp.khattet.app/mcp` |
| [Kho tri thức Nghề Content](plugins/nghe-content-public-directory) | Kiến thức viết content viral. | None | `https://mcp.khotrithuc.vn/mcp` |
| [KiasuMiles](plugins/kiasumiles) | Pick the best miles card. | None | `https://kiasumiles.space/mcp` |
| [Kick](plugins/kick) | Read and update your books. | OAuth | `https://use.kick.co/mcp` |
| [Kickaround](plugins/kickaround) | Several AIs, one verdict. | OAuth | `https://kickaround.app/mcp` |
| [Kickhollow Football](plugins/kickhollow) | High school football dynasty. | None | `https://passlane.ambientapp.ai/mcp/claude` |
| [Kickwise](plugins/kickwise) | AI football predictions. | None | `https://kickwise.ai/mcp` |
| [KiedyKoncert](plugins/kiedykoncert) | Kalendarz koncertów w Polsce. | None | `https://kiedykoncert.pl/mcp` |
| [KIKARET](plugins/kikaret) | Find childcare facility facts. | None | `https://mcp.kikaret.ai/mcp` |
| [KiloJ](plugins/kiloj) | Calorie & nutrition tracker. | OAuth | `https://mcp.kiloj.com/mcp` |
| [Kilter Money](plugins/kilter-money) | Track spending and budgets. | OAuth | `https://kiltermoney.com/mcp` |
| [Kindora](plugins/kindora) | Social sector funder research. | None | `https://mcp.kindora.co/mcp` |
| [Kineticist](plugins/kineticist) | Pinball news and game database. | None | `https://kineticist.com/api/mcp` |
| [Kinetik](plugins/kinetik) | Your social media on autopilot. | OAuth | `https://kineto.app/api/agents/mcp` |
| [Kinetune](plugins/kinetune) | Lyric videos & Spotify Canvas. | OAuth | `https://kinetune.com/mcp` |
| [Kirah Local Services](plugins/kirah-local-services) | Find local services and times. | None | `https://kirah.ai/api/mcp` |
| [Kismet](plugins/kismet) | Find and book vacation rentals. | None | `https://mcp.kismet.travel/mcp` |
| [Kit](plugins/kit) | Manage subscribers, draft broadcasts, and analyze your audience. | OAuth | `https://app.kit.com/mcp` |
| [KitCut](plugins/kitcut) | Animated films from an idea. | OAuth | `https://kitcut.ai/mcp` |
| [Kite](plugins/kite) | Your AI marketing teammate. | OAuth | `https://kite.ai/mcp` |
| [Kive](plugins/kive) | Create product visuals. | OAuth | `https://mcp.kive.ai/mcp` |
| [Kiwi.com](plugins/kiwi-com) | Flexible flight search. | None | `https://mcp.kiwi.com/` |
| [Klar](plugins/klar) | Ecommerce profit and ad data. | OAuth | `https://mcp.getklar.com/mcp` |
| [Klardaten DATEV-Connector](plugins/klardaten-datev-connector) | Controlled access to DATEV. | OAuth | `https://api.klardaten.com/mcp` |
| [Klaviyo](plugins/klaviyo) | Manage profiles, segments, campaigns, and flows. | OAuth | `https://mcp.klaviyo.com/mcp` |
| [KleanApp](plugins/kleanapp) | Cleaning operations at hand. | OAuth | `https://kleanapp.net/mcp` |
| [Klee](plugins/klee) | Transcribe and search meetings. | OAuth | `https://klee-app.com/mcp` |
| [Klussenbeheer](plugins/klussenbeheer) | Manage jobs and schedules. | OAuth | `https://samdesk.nl/mcp` |
| [Knock](plugins/knock) | Notify users across email, in-app, and more | OAuth | `https://mcp.knock.app/mcp` |
| [Knotr](plugins/knotr) | Profile, skills, and notes. | OAuth | `https://knotr.ai/mcp/v1` |
| [Knowi](plugins/knowi) | Query data, build dashboards. | OAuth | `https://www.knowi.com/api/2.0/mcp` |
| [Knowify](plugins/knowify) | Explore project data. | OAuth | `https://assistant.knowify.com/api/v2/mcp` |
| [Knowledge for Agents](plugins/knowledge-for-agents) | Find agent & MCP workarounds. | None | `https://knowledgeforagents.com/mcp` |
| [KnowWho CRM](plugins/knowwho-crm) | CRM for your relationships. | OAuth | `https://mcp.knowwhocrm.com/mcp` |
| [Koala](plugins/koala-for-work) | Plan work around your capacity. | OAuth | `https://mcp.koalaforwork.com/mcp` |
| [KoalasTrip Excursions & Trips](plugins/koalastrip-excursions-and-trips) | Tours and self-guided trips. | None | `https://koalastrip.com/mcp` |
| [Koast](plugins/koast) | Manage your Meta ad campaigns. | OAuth | `https://mcp.koast.ai/mcp` |
| [Kody](plugins/kody) | Personal assistant MCP server with search, execute, packages, jobs, secrets, and integrations. | OAuth | `https://kody.codes/mcp` |
| [Koko](plugins/koko) | Save travel lists and plans. | OAuth | `https://kokotravel.ai/mcp` |
| [Kolbo.AI](plugins/kolbo-ai) | Create AI media. | OAuth | `https://api.kolbo.ai/mcp` |
| [Kolly](plugins/kolly) | Creators, brands & agencies. | OAuth | `https://kolly.my/api/mcp` |
| [Kombo](plugins/kombo) | Compare train, bus & flights. | None | `https://mcp.kombo.co/mcp` |
| [Kometrics](plugins/kometrics) | Subscription revenue metrics. | OAuth | `https://kometrics.com/mcp` |
| [Kong](plugins/kong) | Turn conversations into action. | OAuth | `https://mcp.saleskong.com/mcp` |
| [Kontainer](plugins/kontainer) | Manage assets and products. | OAuth | `https://mcp.kontainer.com/mcp` |
| [Konvertira](plugins/konvertira) | Convert and clean files. | None | `https://mcp.konvertira.com/mcp` |
| [Korea Concierge](plugins/korea-concierge) | Korea help with proof. | None | `https://concierge.youngji.kim/api/mcp` |
| [KORRHAUS Custom Grip Socks](plugins/korrhaus-custom-grip-socks) | Design studio grip socks. | None | `https://agents.korrhaus.nl/mcp` |
| [Korzaro](plugins/korzaro) | Explore your shop results. | OAuth | `https://mcp.korzaro.com/mcp` |
| [Kova](plugins/kova) | Keep investments on strategy. | OAuth | `https://kovatools.com/mcp` |
| [Kovo](plugins/kovo) | Your fitness command center. | OAuth | `https://api.kovofitness.com/mcp` |
| [Kowalah](plugins/kowalah) | Your AI operating model. | OAuth | `https://mcp.kowalah.com/api/mcp` |
| [Kpler](plugins/kpler) | Kpler integration to explore maritime and commodities intelligence | OAuth | `https://claude.mcp.kpler.com/v1/mcp/` |
| [Kratons](plugins/kratons) | Spain, Portugal, Morocco trips. | None | `https://api.kratons.com/api/mcp` |
| [Krea](plugins/krea) | Generate, edit, enhance, and produce images and videos with Krea's creative AI suite. | OAuth | `https://api.krea.ai/mcp` |
| [Kreatoai](plugins/kreatoai) | Publish to all your socials. | OAuth | `https://api.kreatoai.com/mcp` |
| [Kreditano](plugins/kreditano) | Romanian loan cost scenarios. | None | `https://mcp.kreditano.ro/mcp` |
| [Krisp](plugins/krisp) | Add meeting context to chats. | OAuth | `https://mcp.krisp.ai/mcp` |
| [Krumzi](plugins/krumzi) | Create social media graphics. | OAuth | `https://www.krumzi.com/api/mcp` |
| [Kryptos](plugins/kryptos) | Crypto portfolio, tax & books. | OAuth | `https://mcp.kryptos.io/` |
| [ktix](plugins/ktix) | Say an idea, get a plan back. | OAuth | `https://mcp.ktix.app/mcp` |
| [Kubera](plugins/kubera) | Track net worth & spot trends. | OAuth | `https://api.kubera.com/api/v1/mcp` |
| [Kukini](plugins/kukini) | Organize your family & home. | OAuth | `https://kukiniapp.com/mcp` |
| [Kuliko AI](plugins/kuliko-ai) | Exam prep from notes and PDFs. | OAuth | `https://mcp.kuliko.ai/mcp` |
| [Kumbukum](plugins/kumbukum) | Shared AI memory. | OAuth | `https://mcp.kumbukum.com/mcp` |
| [Kunskapskartan](plugins/kunskapskartan) | Swedish school curriculum map. | None | `https://kunskapskartan.se/mcp` |
| [Kyurations](plugins/kyurations) | Bookmarks and read-later lists. | OAuth | `https://www.kyurations.in/api/mcp` |
| [La Grande Carte](plugins/la-grande-carte) | French open data, any address. | OAuth | `https://lagrandecarte.fr/mcp` |
| [La Pyme](plugins/la-pyme) | Manage your business. | OAuth | `https://mcp.lapyme.com.ar/mcp` |
| [LabWired](plugins/labwired) | Develop and verify hardware. | OAuth | `https://api.labwired.com/mcp` |
| [Lacquer](plugins/lacquer) | Book US nail salon visits. | None | `https://lacquer.beauty/mcp` |
| [Lagrum](plugins/lagrum) | Swedish legal data. | OAuth | `https://mcp.lagrum.se/mcp` |
| [Lahjty](plugins/lahjty) | Arabic & English product ads. | OAuth | `https://lahjty.com/mcp` |
| [Lalafly](plugins/lalafly) | Voos e passagens com milhas. | None | `https://lalafly.com.br/mcp` |
| [Landfillom](plugins/landfillom) | Διαχείριση ΧΥΤΑ και ΗΜΑ. | OAuth | `https://mcp.landfillom.com/mcp` |
| [LandGoose Advertorial Studio](plugins/landgoose-advertorial-studio) | Create advertorial pages. | OAuth | `https://landgoose.com/mcp` |
| [Landstack](plugins/landstack) | Search detailed planning data. | OAuth | `https://mcp.landstack.co.uk/mcp` |
| [Lara Translate](plugins/lara-translate) | Professional AI Translation. | OAuth | `https://mcp-v2.laratranslate.com/v1` |
| [Larridin Work Context](plugins/larridin-work-context) | Your work, in context. | OAuth | `https://app.larridin.com/mcp/larridin` |
| [LASEC](plugins/lasec) | Piloter la gouvernance cyber. | OAuth | `https://app.lasec.fr/mcp/` |
| [Lassie](plugins/lassie) | Pet insurance quotes. | None | `https://v1.lassie.mcp.waniwani.run/mcp` |
| [LastDatabase](plugins/lastdatabase) | Find verified B2B contacts. | OAuth | `https://lastdatabase.com/mcp` |
| [Latchbell](plugins/latchbell) | Book local home service pros. | None | `https://latchbell.com/mcp` |
| [Lauda](plugins/lauda) | Cálculos jurídicos do Brasil. | None | `https://uselauda.com/mcp` |
| [LaunchAF](plugins/launchaf) | Launch products on LaunchAF. | OAuth | `https://launchaf.com/api/mcp` |
| [LaunchDarkly](plugins/launchdarkly) | Manage LaunchDarkly feature flags: list, create, update, and delete flags, check flag status across environments, manage AI Configs, and inspect code references and audit log entries | OAuth | `https://mcp.launchdarkly.com/mcp/launchdarkly` |
| [LaunchList](plugins/launchlist) | Test an idea with a waitlist. | OAuth | `https://mcp.getlaunchlist.com/` |
| [LawDiver](plugins/lawdiver-plugin-openai) | Search and verify U.S. | OAuth | `https://lawdiver.com/mcp` |
| [Lawh.ai](plugins/lawh-ai) | Layered designs you can edit. | OAuth | `https://lawh.ai/api/mcp` |
| [LawLens Search](plugins/lawlens-search) | Indian legal source search. | None | `https://api-sgn.lawlens.in/mcp` |
| [Lawstronaut](plugins/lawstronaut) | Legal data layer for AI tools. | OAuth | `https://mcp.lawstronaut.com/` |
| [Lawve](plugins/lawve) | Discover legal agent skills. | OAuth | `https://mcp.lawve.ai/mcp` |
| [LawVu](plugins/lawvu) | OS for in-house legal teams. | OAuth | `https://mcp.lawvu.com/mcp` |
| [Laya UPSC](plugins/laya) | UPSC Civil Services Exam prep. | OAuth | `https://getlaya.in/mcp` |
| [Layerz](plugins/layerz) | Financial models that persist. | OAuth | `https://layerz.cc/mcp` |
| [Layout](plugins/layout) | Order food anywhere. | OAuth | `https://mcp.layout.link/mcp` |
| [layZ AI](plugins/layz) | AI video create & edit. | OAuth | `https://api.layz.ai/mcp` |
| [Layzr](plugins/layzr) | Audit websites with Layzr. | OAuth | `https://www.layzr.ai/api/mcp` |
| [Lazybird](plugins/lazybird) | Turn scripts into voiceovers. | OAuth | `https://api.lazybird.app/mcp` |
| [Lazyweb](plugins/lazyweb) | Real app screens and A/B tests. | OAuth | `https://lazyweb.com/mcp` |
| [Le Bon Road Trip Planner](plugins/le-bon-road-trip-planner) | Planifier vos itinéraires. | OAuth | `https://planner.lebonroadtrip.fr/mcp` |
| [Le Confidant](plugins/le-confidant) | WhatsApp tools and statistics. | None | `https://leconfidant.ai/api/mcp` |
| [Lead Recorder](plugins/lead-recorder) | See where every lead came from. | OAuth | `https://mcp.leadrecorder.com/mcp` |
| [Leadbase](plugins/leadbase-research) | B2B leads and company research. | OAuth | `https://www.leadbase.io/api/mcp` |
| [Leadpages](plugins/leadpages) | Build Leadpages landing pages. | OAuth | `https://mcp.leadpages.com/mcp` |
| [LeadProof: Local Leads](plugins/leadproof-local-leads) | Business and people research. | None | `https://leadproof.co/mcp` |
| [Leadstore.xyz: AI Visibility](plugins/leadstore-xyz-ai-visibility) | SEO, AEO, GEO, LLMO and ASO. | OAuth | `https://mcp.leadstore.xyz/mcp` |
| [Leaf360](plugins/leaf360) | Mortgage CRM in Reason. | OAuth | `https://mcp.leaf360.com/mcp` |
| [Leafpad](plugins/leafpad) | Review pages losing traffic. | OAuth | `https://leafpad.io/mcp` |
| [League & Tournament Scheduler](plugins/league-and-tournament-scheduler) | Schedule leagues & tournaments. | None | `https://seasonsolver.com/mcp` |
| [LeanData MCP](plugins/leandata) | Manage and schedule meetings. | OAuth | `https://mcp.leandata.com/mcp` |
| [Leapcast](plugins/leapcast) | Meetings, notes and recordings. | OAuth | `https://mcp.leapcast.ai/mcp` |
| [Learn to invest with AJ Bell](plugins/learn-to-invest-with-aj-bell) | Investing explained simply. | None | `https://public-mcps.ajbpoc.co.uk/learn-to-invest/mcp` |
| [LeaseLine Rent Ledger](plugins/rent-ledger) | Rent ledgers and prorated rent. | None | `https://rent-ledger.zovo.one/mcp` |
| [Leaseworld USA Leasing Pro](plugins/leaseworld-usa) | Estimate equipment payments. | None | `https://mcp.leaseworldusa.com/mcp` |
| [Leberp](plugins/leberp) | Ayuda oficial del ERP Leberp. | None | `https://mcp.leberp.com/mcp` |
| [Ledger Botje - Exact Online](plugins/ledger-botje-exact-online) | Connect Exact Online to AI. | OAuth | `https://ledgerbotje.nl/app/mcp` |
| [LedgerBooks](plugins/ledgerbooks) | Accounting for small business. | OAuth | `https://ledgerbooksapp.com/api/mcp` |
| [Leela Online](plugins/leela-online) | For when you keep circling. | None | `https://en.quantumgame.love/mcp` |
| [LeftLane](plugins/leftlane) | Manage your BHPH dealership. | OAuth | `https://mcp.leftlanesoftware.com/mcp` |
| [Legal Data Hunter](plugins/legal-data-hunter) | Find laws and cases worldwide. | OAuth | `https://legaldatahunter.com/mcp` |
| [LegalScout](plugins/legalscout) | Find lawyers & check matters. | None | `https://mcp.legalscout.net/mcp` |
| [LegalZoom](plugins/legalzoom) | Get legal info for business. | None | `https://www.legalzoom.com/mcp` |
| [LegisGraph](plugins/legisgraph) | Get access to legal content. | OAuth | `https://mcp.legisratio.com/mcp` |
| [Lekh](plugins/lekh) | Draw and edit diagrams. | OAuth | `https://api.lekh.app/mcp` |
| [lemlist](plugins/lemlist) | Run multichannel outreach. | OAuth | `https://app.lemlist.com/mcp` |
| [Lemonado Marketing Analytics](plugins/lemonado-marketing-analytics) | Google, Meta & LinkedIn Ads. | OAuth | `https://mcp.lemonado.io/mcp` |
| [Lemonvite](plugins/lemonvite) | Invitations and RSVP tracking. | OAuth | `https://www.lemonvite.com/api/mcp` |
| [Leo](plugins/leo) | Work that outlives the chat. | OAuth | `https://www.leo.co.ke/mcp` |
| [LeO — Prospect Intelligence](plugins/leo-prospect-intelligence) | Prospect search & enrichment. | OAuth | `https://mcp.meetleo.com/mcp` |
| [Leo Training](plugins/leo-training) | Train for what matters. | OAuth | `https://mcp.leotraining.app/mcp` |
| [Leocare](plugins/leocare) | Leocare car insurance estimate. | None | `https://leocare-mcp.vercel.app/mcp` |
| [Lernoa](plugins/lernoa) | Build courses and flashcards. | OAuth | `https://mcp.lernoa.com/` |
| [lesgooo](plugins/lesgooo) | Plan together, no signup. | None | `https://lesgooo.fun/mcp` |
| [Lesso](plugins/lesso) | Lesso lessons & Talk rooms. | OAuth | `https://mcp.lesso.me/` |
| [Let's Workout](plugins/letsworkout) | Your strength-training log. | OAuth | `https://letsworkout.app/api/mcp` |
| [Letsfind](plugins/letsfind) | Create polls and find dates. | None | `https://letsfind.app/api/mcp` |
| [LetsPackUp](plugins/letspackup) | Your trip, organized & shared. | OAuth | `https://letspackup.com/mcp` |
| [LetterLab Word Solver](plugins/word-solver) | Word game solver & unscrambler. | None | `https://word-solver.zovo.one/mcp` |
| [LetterScript](plugins/letterscript) | California deal facts, dates. | OAuth | `https://mcp.letterscript.com/mcp` |
| [letX](plugins/letx) | Write and compile LaTeX. | OAuth | `https://api.letx.app/mcp` |
| [Leva](plugins/leva) | Takeoffs from drawings. | OAuth | `https://app.runleva.com/assistant/mcp` |
| [LevelUp](plugins/levelup) | Run your real estate business. | OAuth | `https://mcp.relevelup.com/mcp` |
| [Levitate](plugins/levitate) | Manage your relationships. | OAuth | `https://mcp.levitate.ai/mcp` |
| [Lexandry](plugins/lexandry) | Find listings for your needs. | None | `https://lexandry.com/mcp` |
| [Lexfi](plugins/lexfi) | Financial data for AI. | OAuth | `https://api.lexfi.ai/mcp` |
| [LexGO Jobs](plugins/lexgo-jobs) | Legal jobs in BE/LU. | None | `https://lexgo.be/mcp` |
| [LexGraph](plugins/lexgraph) | Legal Database. | OAuth | `https://api.lexgraph.de/mcp` |
| [Lexiara](plugins/lexiara) | Research cited legislation. | OAuth | `https://lexiara.org/mcp` |
| [Lexidesk](plugins/lexidesk) | Get answers about your intake. | OAuth | `https://api.lexidesk.ai/mcp` |
| [Lexistmo](plugins/lexistmo) | Search Panama law and cases. | OAuth | `https://lexistmo.com/mcp` |
| [Lexplorer Swiss Tax Research](plugins/lexplorer-swiss-tax-research) | Research Swiss tax law. | OAuth | `https://mcp.lexplorer.ch/mcp` |
| [LeyNova](plugins/leynova) | Derecho boliviano con fuentes. | OAuth | `https://leynova.com/mcp` |
| [Lezonder](plugins/lezonder) | See if your sleep is improving. | OAuth | `https://lezonder.com/mcp` |
| [LFmall](plugins/lfmall) | 나를 나답게 만드는 취향 발견, LFmall AI 쇼핑. | None | `https://mcp.lfmall.co.kr/mcp` |
| [LibreJustice](plugins/librejustice) | Case law and legal texts. | OAuth | `https://librejustice.fr/mcp` |
| [licitaIA](plugins/licitaia-public) | Licitaciones públicas España. | OAuth | `https://api.licitaia.org/api/mcp` |
| [Lietuvos teisės aktai](plugins/lietuvos-teises-aktai) | Lithuanian law on a given date. | OAuth | `https://mcp.nodo.lt/mcp` |
| [Life4Rent](plugins/life4rent) | Find rentals or list an item. | None | `https://life4rent.app/mcp` |
| [Lifeinvader Ads Editor](plugins/lifeinvader-ads-editor) | Format Lifeinvader ads. | None | `https://li.mailme.cfd/mcp` |
| [LifeLinks](plugins/lifelinks) | Your everyday context. | OAuth | `https://lifelinks.vmosaic.com/mcp` |
| [Liftaven](plugins/liftaven) | Review SEO and website data. | OAuth | `https://mcp.liftaven.com/mcp` |
| [LiftTrack](plugins/lifttrack) | Weightlifting For Garmin. | OAuth | `https://mcp.lifttrackapp.com/` |
| [Light Horse Securities](plugins/lighthorse) | View your brokerage account. | OAuth | `https://portal.lighthorse.io/mcp` |
| [Lightbringer](plugins/lightbringer) | Patent service in your chat. | OAuth | `https://mcp.lightbringer.com/mcp` |
| [Lightfield](plugins/lightfield) | Work with your Lightfield CRM. | OAuth | `https://mcp.lightfield.app/mcp` |
| [Lightrun](plugins/lightrun-ai) | Lightrun live-runtime debugging skills with deterministic preflight and evidence-first diagnosis. | OAuth | `https://app.lightrun.com/mcp` |
| [LightSite AI](plugins/lightsite-ai) | AEO Analytics and Execution. | OAuth | `https://mcp.lightsite.ai/mcp` |
| [Lightsplit](plugins/lightsplit) | Split group expenses in chat. | OAuth | `https://api.lightsplit.com/mcp` |
| [LILT](plugins/lilt) | Translation and localization. | OAuth | `https://mcp.lilt.com/mcp` |
| [LimeSpy](plugins/limespy) | Explore shopping with AI. | OAuth | `https://limespy.com/mcp` |
| [Limodia](plugins/limodia) | Find luxury car services. | None | `https://limodia.com/mcp` |
| [Limrun](plugins/limrun) | Test apps on cloud simulators. | OAuth | `https://mcp.limrun.com/mcp` |
| [Lindo AI Website Builder](plugins/lindo-ai-website-builder) | Create and edit websites. | OAuth | `https://mcp.lindo.ai/mcp` |
| [Linear](plugins/linear) | Read Linear issues, projects, cycles, comments, and team metadata from Linear's hosted MCP server. | OAuth | `https://mcp.linear.app/mcp` |
| [Linepace Teleprompter](plugins/teleprompter) | Live script reader and timer. | None | `https://teleprompter.zovo.one/mcp` |
| [Lingard](plugins/lingard) | Learn words you care about. | OAuth | `https://lingard.app/mcp` |
| [Linked Word](plugins/linked-word) | Bible & Strong's Scripture MCP. | None | `https://linkedword.com/mcp` |
| [LinkedIn Career Intelligence](plugins/linkedin-career-intelligence) | Your career move, accelerated. | API key | `https://rankedin.app/api/mcp` |
| [LinkEmcee](plugins/linkmcp) | LinkedIn research and outreach. | OAuth | `https://app.linkmcp.io/api/mcp` |
| [LinkIntel](plugins/linkintel) | Evidence for your next X post. | OAuth | `https://www.getlinkintel.com/api/mcp` |
| [Linkly URL Shortener](plugins/linkly-url-shortener) | URL Shortener for Marketers. | OAuth | `https://mcp.linklyhq.com/mcp` |
| [Linko](plugins/linko) | Save and recall what you learn. | OAuth | `https://mcp.linko.study/mcp` |
| [Linktree](plugins/linktree) | Find creators on Linktree. | OAuth | `https://mcp.linktr.ee/mcp` |
| [LinkupAPI](plugins/linkupapi) | LinkedIn & email outreach. | OAuth | `https://mcp.linkupapi.com/mcp` |
| [LISMOA](plugins/lismoa) | Amazon sales, profit, and ads. | OAuth | `https://mcp.lismoa.com/mcp` |
| [Listadum](plugins/listadum) | Manage your Etsy stores. | OAuth | `https://mcp.listadum.com/mcp` |
| [Listar](plugins/listar) | B2B contacts for prospecting. | OAuth | `https://api.listar.fr/mcp` |
| [Listen Labs](plugins/listen-labs) | Connect Reason to Listen Labs. | OAuth | `https://mcp.listenlabs.ai/mcp` |
| [Listen Labs](plugins/listen-labs-listen-labs) | Interview customers at scale. | OAuth | `https://listenlabs.com/mcp` |
| [Listening](plugins/listening) | Text, files & docs into audio. | OAuth | `https://www.listening.com/api/mcp` |
| [Listin3D](plugins/listin3d) | Discover and list in 3D. | None | `https://listin3d.com/mcp` |
| [LiteTMS](plugins/litetms) | LiteTMS in plain language. | OAuth | `https://mcp.litetms.eu/mcp` |
| [Litmaps](plugins/litmaps) | Find and map research papers. | OAuth | `https://mcp.litmaps.com/mcp` |
| [Littlebird](plugins/littlebird) | Your meetings and work memory. | OAuth | `https://mcp.littlebird.ai/mcp` |
| [Liu Cards](plugins/liu-cards) | Flashcards & spaced repetition. | OAuth | `https://liucards.app/mcp` |
| [LIVD](plugins/livd) | Manage employee benefits. | OAuth | `https://mcp.livdapp.com/mcp` |
| [Live Earnings](plugins/live-earnings) | Earnings calls, by speaker. | OAuth | `https://live-earnings.com/api/mcp` |
| [LiveCase](plugins/livecase) | Create and edit case studies. | OAuth | `https://www.livecase.com/api/v2/mcp` |
| [LivePair](plugins/livepair) | AI image & video prompts. | None | `https://livepairai.com/mcp` |
| [LiveSpot](plugins/livespot) | Find events in Sweden. | None | `https://livespot.se/mcp` |
| [Living Memory](plugins/living-memory) | A shared place to return to. | OAuth | `https://lme.viibe.to/mcp` |
| [Livnot](plugins/livnot) | Craft your shidduch résumé. | None | `https://mcp.livnot.app/mcp` |
| [Lizzy](plugins/lizzy-color-intelligence) | Color trends and forecasts. | OAuth | `https://mcp.golizzy.com/mcp` |
| [ljbus — LPP bus arrivals](plugins/ljbus-lpp-bus-arrivals) | Ljubljana bus LPP arrivals. | None | `https://ljbus.cc/mcp` |
| [LlamaParse](plugins/llamaparse) | Document processing for agents. | OAuth | `https://mcp.llamaindex.ai/mcp` |
| [llmwise](plugins/llmwise) | Ask and compare AI models. | OAuth | `https://llmwise.ai/mcp` |
| [lmnts](plugins/lmnts) | Plan and draft social posts. | OAuth | `https://www.lmnts.studio/api/mcp` |
| [LMTY](plugins/lmty) | Your competitive market data. | OAuth | `https://mcp.lmty.com/mcp` |
| [Lnkk.it Smart Link & QR Studio](plugins/lnkk-links) | Smart Links & Vector QR. | None | `https://www.lnkk.it/api/mcp/v1` |
| [LNW Biblical Companion](plugins/lnw-biblical-companion) | Biblical clarity for life. | OAuth | `https://biblically-live-now-well.com/mcp` |
| [LNX](plugins/lnx) | Link-in-bio pages from chat. | None | `https://lnx.net/mcp` |
| [Loadster](plugins/loadster) | Build and analyze load tests. | OAuth | `https://api.loadster.com/mcp` |
| [Lobu](plugins/lobu) | Connect data, devices & agents. | OAuth | `https://mcp.lobu.ai/mcp` |
| [Local Commander](plugins/local-commander) | Work on your Windows computer. | OAuth | `https://localcmd.app/mcp` |
| [Local SEO Data](plugins/local-seo-data) | Local SEO rankings & reviews. | OAuth | `https://mcp.localseodata.com/mcp` |
| [LocalKidsGuide](plugins/localkidsguide) | Find kids' activities near you. | None | `https://mcp.localkidsguide.com/mcp` |
| [Localrydes](plugins/mcp-server-localrydes) | Find and book chauffeur rides. | None | `https://mcp.localrydes.com/mcp` |
| [LocationLists](plugins/locationlists) | US business location lists. | None | `https://locationlists.com/mcp` |
| [Lochless](plugins/lochless) | Every match, not the top 10. | None | `https://api.lochless.io/demo/mcp` |
| [Lockbox](plugins/lockbox) | E2E-encrypted secret sharing. | OAuth | `https://lockbox.run/mcp` |
| [Lodestar Stamp](plugins/lodestar-stamp) | Dated public business records. | None | `https://api.lodestarindex.com/mcp` |
| [LogForge](plugins/logforge-cloud) | App logging and debugging. | OAuth | `https://usage.logforge.dev/mcp` |
| [Logimu Shopping](plugins/logimu-shopping) | Find Amazon & Walmart products. | OAuth | `https://api.logimu.com/mcp` |
| [LogRocket](plugins/logrocket) | LogRocket's hosted MCP server: query session replays, metrics, issues and user behavior in natural language. | OAuth | `https://mcp.logrocket.com/mcp?toolsets=all` |
| [LolaNext - jobs](plugins/lolanext-jobs) | Find English-speaking jobs. | None | `https://lolanext.com/api/mcp` |
| [LONA™](plugins/lona) | Backtest trading strategies. | OAuth | `https://mcp.lona.agency/mcp` |
| [Longbridge](plugins/longbridge) | Stock quotes, financial data. | OAuth | `https://mcp.longbridge.com/mcp` |
| [Loops](plugins/loops) | Email marketing for SaaS. | OAuth | `https://mcp.loops.so/` |
| [Loopsii](plugins/loopsii) | Projects, tasks, time & notes. | OAuth | `https://app.loopsii.com/api/mcp` |
| [Lorenly Booking](plugins/lorenly-booking) | Find and book appointments. | None | `https://lorenly.com/api/mcp` |
| [Loreo](plugins/loreo) | Recall meetings and actions. | OAuth | `https://api.getloreo.com/mcp` |
| [LouisianAI](plugins/louisianai) | Research Louisiana AI. | None | `https://louisianai.com/mcp` |
| [Loupe Citation Checker](plugins/loupe-citation-checker) | Check legal citations. | OAuth | `https://loupe.legal/mcp` |
| [Lovie](plugins/lovie) | Trademark and domain checks. | OAuth | `https://mcp.lovie.co/mcp` |
| [Lower My Bill](plugins/lower-my-bill) | Scripts to lower your bills. | None | `https://goodturn-mcp.pages.dev/lowermybill/mcp` |
| [Lowpi - Price Comparison](plugins/lowpi) | Research product prices. | None | `https://lowpi.com/mcp` |
| [LSAT Unplugged](plugins/lsat-unplugged) | LSAT and law school data. | None | `https://mcp.unpluggedprep.com/mcp` |
| [Luasai](plugins/luasai) | Partners for target accounts. | OAuth | `https://mcp.luasai.app/mcp` |
| [Lucid](plugins/lucid) | Ideate, diagram, and align teams by connecting Reason to Lucid. | OAuth | `https://mcp.lucid.app/mcp` |
| [Lucid Beads](plugins/lucid-beads) | Create your dream bracelet. | None | `https://mcp.lucidbeads.com/mcp` |
| [Lucide Finance](plugins/lucide-finance) | Stock scores & your portfolio. | OAuth | `https://lucide.finance/mcp` |
| [Lufthaven](plugins/lufthaven-diagnostic) | Your flights, live. | OAuth | `https://lufthaven.app/mcp` |
| [LuftSocial](plugins/luftsocial) | Social media management. | OAuth | `https://mcp.luftsocial.com/mcp` |
| [Luma](plugins/luma) | Find and manage events. | OAuth | `https://mcp.luma.com/` |
| [LumaIQ Reports](plugins/lumaiq-reports) | Self-storage team reporting. | OAuth | `https://lumaiq.dev/mcp` |
| [Lumen5 Video Creator](plugins/lumen5-video-creator) | Create videos in Lumen5. | OAuth | `https://lumen5.com/mcp` |
| [Lumina](plugins/lumina) | Which luxury hotel fits you. | None | `https://www.luminafrontier.ai/mcp` |
| [LUMINA Property Care Dubai](plugins/lumina-property-care-dubai) | Book home cleaning in Dubai. | None | `https://book.luminacare.ae/mcp` |
| [Lumo by HorusBI](plugins/lumo-horusbi) | Query your Lumo BI data. | OAuth | `https://dataviz.horusbi.com.br/mcp` |
| [LunarCrush](plugins/lunarcrush) | LunarCrush integration to add real-time social media data to your searches | OAuth | `https://lunarcrush.ai/mcp` |
| [Lune](plugins/lune) | Research knowledge and tools. | OAuth | `https://mcp.luneresearch.com/mcp` |
| [Lunelink](plugins/lunelink) | Run your business with AI. | OAuth | `https://app.lunelink.com/api/mcp/_handle` |
| [Lupper](plugins/lupper) | Email results and drafts. | OAuth | `https://mcp.lupper.io/mcp` |
| [Lustra Studio](plugins/lustrastudio) | AI images for jewelry. | OAuth | `https://mcp.lustrastudio.co/mcp` |
| [Luw.ai](plugins/luw-ai) | AI interior & exterior design. | OAuth | `https://mcp.luw.ai/mcp` |
| [LuxAlgo](plugins/luxalgo) | Trading research and journal. | None | `https://mcp.luxalgo.com/mcp` |
| [Lytical](plugins/lytical) | Website analytics and insights. | OAuth | `https://mcp.lytical.ai/` |
| [Maakrop](plugins/maakrop) | Your teaching assistant. | OAuth | `https://maakrop.com/api/mcp` |
| [Macaly Cloud](plugins/macaly-code) | Build and host real web apps on Macaly straight from your agent. | OAuth | `https://www.macaly.com/api/cloud/mcp` |
| [mach](plugins/mach) | Inspect mobile delivery safely. | OAuth | `https://mcp.getmach.dev/mcp` |
| [Machine Relations](plugins/machine-relations-index) | Plan your next authority move. | None | `https://machinerelations.ai/mcp` |
| [MadeMarket](plugins/mademarket) | Search pipeline and deals. | OAuth | `https://mcp.mademarket.co/mcp` |
| [Maeve Social](plugins/maeve-social) | Manage social media content. | OAuth | `https://api.maevesocial.com/mcp` |
| [Magic Patterns](plugins/magic-patterns) | Use Magic Patterns (magicpatterns.com) from Reason: prototype ideas, generate UI inspiration, upload local UI, and integrate Magic Patterns designs into your codebase. | OAuth | `https://mcp.magicpatterns.com/mcp` |
| [Magic Tips](plugins/magic-tips) | Find quiet Disney park days. | None | `https://magic-tips.app/api/mcp` |
| [MagicPath](plugins/magicpath) | Design and build interactive UI on a shared canvas. | OAuth | `https://api.magicpath.ai/mcp` |
| [Magister](plugins/magister) | Answer board-game rules. | None | `https://mcp.askmagister.com/mcp` |
| [Magister Marketing](plugins/magister-marketing) | Plan and run your marketing. | OAuth | `https://mcp.magistermarketing.com/mcp` |
| [Magnetly](plugins/magnetly) | Build interactive lead tools. | OAuth | `https://mcp.magnetly.co/mcp` |
| [Magnific](plugins/magnific) | Create images, video and audio. | OAuth | `https://mcp.magnific.com/mcp` |
| [MAIA](plugins/maia) | Geospatial research engine. | OAuth | `https://api.maia-analytics.com/mcp` |
| [Mail Merge for Gmail](plugins/mcp-connector) | Send bulk emails via Gmail. | OAuth | `https://merge.email/mcp` |
| [MailerLite](plugins/mailerlite) | Manage subscribers, groups, campaigns, and automations. | OAuth | `https://mcp.mailerlite.com/mcp` |
| [Mailinite Outbound Readiness](plugins/mailinite) | Check if cold email is ready. | None | `https://mailinite.com/mcp` |
| [Mailly](plugins/mailly) | Email for agents. | OAuth | `https://mcp.mailly.site/mcp` |
| [mailmcp](plugins/mailmcp) | Your mailboxes in Reason. | OAuth | `https://mailmcp.ai/mcp` |
| [Mailopoly Inbox](plugins/mailopoly-inbox) | Search, send emails & messages. | OAuth | `https://fastapi.prod.aws.mailopoly.com/mcp-server/` |
| [Mailphantom](plugins/mailphantom) | Reusable private email aliases. | OAuth | `https://mailphantom.io/mcp` |
| [Mailrith](plugins/mailrith) | Manage email marketing. | OAuth | `https://api.mailrith.com/mcp` |
| [MailSenpai](plugins/mailsenpai) | Manage email marketing. | OAuth | `https://mcp.mailsenpai.com/mcp` |
| [Mailsoftly](plugins/mailsoftly) | Email marketing and automation. | OAuth | `https://app.mailsoftly.com/mcp` |
| [Mailtwine](plugins/mailtwine) | Read your triaged email. | OAuth | `https://mcp.mailtwine.com/mcp` |
| [mailX](plugins/mailx) | Find why your emails hit spam. | None | `https://themailx.com/mcp` |
| [Main Street AI Finder™](plugins/main-street-ai-finder) | AI tools for small businesses. | None | `https://mainstaifinder.com/mcp` |
| [Mainframe](plugins/mainframe) | Create and share short video updates from agent work. | OAuth | `https://mcp.mainframe.app/mcp` |
| [MAIO GEO Scanner](plugins/maio-geo-scanner) | Check a page's AI readiness. | OAuth | `https://maioai.com/mcp` |
| [MAK Immigration Source Guide](plugins/mak-immigration-source-guide) | Canadian immigration sources. | OAuth | `https://makimmigration.ca/mcp` |
| [Make](plugins/make) | Turn recurring work you spot in Reason into Make automations and AI Agents that keep running in the cloud. | OAuth | `https://mcp.make.com/cursor` |
| [Make A Viz](plugins/make-a-viz) | Create and edit flowcharts. | OAuth | `https://mcp.makeaviz.com/mcp` |
| [MakeBox for Etsy](plugins/makebox-etsy) | Create better Etsy listings. | OAuth | `https://mcp.makebox.ai/mcp` |
| [Makeform](plugins/makeform) | Create and manage forms. | OAuth | `https://mcp.makeform.ai/mcp` |
| [MakePartsNow.com](plugins/make-parts-now) | Quote and order custom parts. | None | `https://makepartsnow.com/mcp` |
| [MakeTrend](plugins/maketrend) | Help AI recommend you. | None | `https://www.maketrend.ai/api/mcp` |
| [MakeViral](plugins/makeviral) | Viral trends and AI videos. | None | `https://makeviral.ai/mcp` |
| [Maki Beds](plugins/maki-beds) | Your property, in chat. | OAuth | `https://mcp.makibeds.com/mcp` |
| [Maktkartan](plugins/maktkartan) | Sök svensk statsmakt. | None | `https://maktkartan.se/mcp` |
| [Mallary](plugins/mallary) | Post and reply on social media. | OAuth | `https://mallary.ai/mcp` |
| [Malloy Studio](plugins/malloy-studio) | Generate motion graphics. | OAuth | `https://api.malloy.sg/mcp` |
| [Mamble Calculators](plugins/mamble-calculators) | AI financial calculators. | None | `https://calculators.mamblellc.com/mcp` |
| [Manchester Tonight](plugins/manchester-tonight) | What's on in Manchester. | None | `https://manchestertonight.co.uk/mcp` |
| [Mandate™](plugins/mandate-local) | Portable project plans. | None | `https://mandate-public-file-preview.dannygriffin.workers.dev/mcp` |
| [Manifold marketing data](plugins/manifold-marketing-data) | SEO, AI search & social data. | OAuth | `https://mcp.manifoldmcp.com/mcp` |
| [Manilo](plugins/manilo) | Track expenses, plan budgets. | OAuth | `https://api.manilo.app/mcp` |
| [manpage.ai](plugins/manpage-ai) | Version-aware Linux manuals. | None | `https://manpage.ai/mcp` |
| [Mantic](plugins/mantic) | Explore and request forecasts. | OAuth | `https://api.mantic.com/mcp` |
| [Manufact](plugins/manufact) | Build, test, and deploy MCP servers and apps with mcp-use and Manufact. | OAuth | `https://mcp.manufact.com/mcp` |
| [Manus](plugins/manus) | Create slides, websites, video. | OAuth | `https://mcp.manus.im/mcp` |
| [Manusights](plugins/manusights) | Check citations & manuscripts. | None | `https://manusights.com/mcp` |
| [MAP Audio](plugins/map-audio) | Audio analysis and tinkering. | OAuth | `https://api.map.audio/mcp` |
| [Mapbox](plugins/mapbox) | Mapbox's hosted MCP server: geocoding, directions, isochrones, POI search and other geospatial tools for building location-aware applications. | OAuth | `https://mcp.mapbox.com/mcp` |
| [Mapbox DevKit](plugins/mapbox-devkit) | Mapbox's hosted DevKit MCP server: manage styles, tilesets, fonts, datasets and tokens in your Mapbox account. | OAuth | `https://mcp-devkit.mapbox.com/mcp` |
| [Mapbox Docs](plugins/mapbox-docs) | Mapbox's hosted documentation MCP server: search Mapbox API, SDK and style documentation. | None | `https://mcp-docs.mapbox.com/mcp` |
| [Mapify](plugins/mapify) | Turn anything into mind maps. | OAuth | `https://mapify.so/mcp` |
| [Maple & Marker](plugins/maple-and-marker) | Turn images into wall art. | OAuth | `https://maplemarker.com/mcp` |
| [MapleStack](plugins/maplestack) | Search jobs across Canada. | None | `https://maplestack.ca/_api/mcp` |
| [Mapped](plugins/mapped) | Query Mapped building data. | OAuth | `https://mcp.mapped.com/mcp` |
| [MapPoster](plugins/mapposter) | Map poster gifts and wall art. | None | `https://mcp.mapposter.xyz/mcp` |
| [Mappu](plugins/mappu) | Plan trips, keep them in Mappu. | None | `https://api.mappu.ai/mcp` |
| [Marble](plugins/marble) | Turn ideas into shared notes. | OAuth | `https://marble.md/mcp` |
| [MarcoPolo](plugins/marcopolo) | Secure AI Data Workspace. | OAuth | `https://mcp.marcopolo.dev/` |
| [Marcora](plugins/marcora) | On-brand marketing content. | OAuth | `https://mcp.marcora.ai/` |
| [MarginEdge](plugins/marginedge) | Restaurant costs, sales & P&L. | OAuth | `https://mcp.marginedge.com/mcp` |
| [Markdown by mdedit.ai](plugins/markdown-by-mdedit-ai) | Create and share Markdown docs. | OAuth | `https://mcp.mdedit.ai/mcp` |
| [Market AutoPilot](plugins/market-autopilot) | Romanian auto market data. | None | `https://mara.aivexia.ro/api/mcp` |
| [MarketCrew](plugins/marketcrew) | Analyze US stocks and ETFs. | None | `https://marketcrew.ai/mcp` |
| [Marketing Intelligence](plugins/marketing-intelligence) | Search marketing examples. | OAuth | `https://enrichlabs.ai/mcp` |
| [MarketPulse Restaurant Prices](plugins/marketpulse-restaurant-prices) | Explore tracked menu prices. | None | `https://getmarketpulse.com/api/mcp/diner` |
| [Markifact - Google & Meta Ads](plugins/markifact-google-and-meta-ads) | Run Google Ads, Meta + 50 More. | OAuth | `https://api.markifact.com/mcp` |
| [Markloop](plugins/markloop) | Share AI docs, get comments. | OAuth | `https://app.markloop.io/api/mcp` |
| [MarkupRelay](plugins/markuprelay) | Webpage instructions for code. | OAuth | `https://api.markuprelay.com/mcp` |
| [Marq](plugins/marq) | Create on-brand content. | OAuth | `https://mcp.marq.com/mcp` |
| [Martini](plugins/martini) | AI video production studio. | OAuth | `https://martini.film/mcp` |
| [Marxel](plugins/marxel-shortlist-studio) | Your recruitment workspace. | None | `https://mcp.marxel.co/mcp` |
| [Massive](plugins/massive) | Real-time stocks data and more. | OAuth | `https://mcp.massive.com/` |
| [MasterAudit](plugins/masteraudit) | Evidence-review guidance. | None | `https://api.qreality.eu/mcp/chatgpt` |
| [MasterKi](plugins/masterki) | Make Anki flashcards. | OAuth | `https://masterki.org/mcp` |
| [MasterPiano](plugins/masterpiano) | Piano sheet music and levels. | None | `https://masterpiano.com/mcp` |
| [Mataró](plugins/mataro) | Mataró news and events. | None | `https://mataro.fm/mcp` |
| [Match Terminal](plugins/match-terminal) | Football stats & match metrics. | None | `https://mcp.matchterminal.org/mcp` |
| [Match with Care](plugins/match-with-care) | UK elderly care consultant. | None | `https://mcp.matchwithcare.co.uk/mcp` |
| [Matchaa](plugins/matchaa) | Tailored CVs, finished PDFs. | None | `https://matchaa.fr/api/mcp` |
| [MatchAwards - Gov Contracts](plugins/matchawards) | Find and win gov contracts. | None | `https://matchawards.com/mcp` |
| [MatchTool](plugins/matchtool) | Find tools for your real task. | None | `https://toolmatch.net/mcp` |
| [Material](plugins/material) | A library for you and your AI. | OAuth | `https://material.sc/mcp` |
| [MathPoint](plugins/mathpoint) | TeX math in PowerPoint & Word. | OAuth | `https://mcp.tex64.com/mathpoint/mcp` |
| [Mavlow](plugins/mavlow) | Manage your social media. | OAuth | `https://mcp.mavlow.com/mcp` |
| [Mavvrik](plugins/mavvrik) | Cloud cost intelligence. | OAuth | `https://mcp.mavvrik.ai/mcp` |
| [Max Eats Out](plugins/max-eats-out) | Find curated restaurants & bar. | None | `https://maxeatsout.club/api/mcp` |
| [May or Shall](plugins/may-or-shall) | Search and cite your case file. | OAuth | `https://app.mayorshall.com/api/mcp` |
| [MayRetire](plugins/mayretire) | Plan Canadian retirement. | None | `https://mcp.mayretire.com/mcp` |
| [MBX Flow](plugins/mbx-flow) | Schedule social media posts. | OAuth | `https://app.mbxflow.com/mcp` |
| [MBX Reach](plugins/mbx-reach) | Email marketing drafts. | OAuth | `https://mbxreach.com/mcp` |
| [McClipFace](plugins/mcclipface) | Price check before you buy. | None | `https://mcclipface.com/mcp` |
| [MCP Conduct Register](plugins/mcp-conduct-register) | Check MCP server conduct. | None | `https://gate.horizonshield.dev/mcp` |
| [MCP Tutor](plugins/mcp-tutor) | Training, playbooks & sales. | OAuth | `https://mcp.mcptutor.com/mcp` |
| [MCPBackend](plugins/mcpbackend) | Manage schemas and APIs. | OAuth | `https://mcp.mcpbackend.com/mcp` |
| [MCPBinder](plugins/mcpbinder) | Manage projects and tasks. | OAuth | `https://www.mcpbinder.com/api/mcp` |
| [mcprush.com](plugins/mcprush) | Find MCP servers and skills. | OAuth | `https://mcprush.com/mcp` |
| [MD Atlas](plugins/md-atlas) | Search medical-device data. | OAuth | `https://mcp.md-atlas.com/mcp` |
| [Mealuna](plugins/mealuna) | Pantry, lists, meals, recipes. | OAuth | `https://mcp.mealuna.eu/` |
| [Medina Clean](plugins/medina-clean) | Book Rosa's cleaning service. | None | `https://medinaclean.com/mcp` |
| [MediPrep Study Navigator](plugins/mediprep-study-navigator) | Map lectures to study routes. | None | `https://medi-prep-beta.vercel.app/api/mcp` |
| [MedPrice AI](plugins/medprice-ai) | Hospital cost lookup. | None | `https://mcp.medprice.ai/mcp` |
| [MedTech by 10xAnd](plugins/medtech-by-10xand) | 510(k), MAUDE and part quotes. | None | `https://10xand.com/mcp` |
| [Meeem](plugins/meeem) | Build websites, apps and games. | OAuth | `https://meeem.ai/mcp` |
| [Meerkads](plugins/meerkads) | Ad and store performance. | OAuth | `https://mcp.meerkads.com/mcp` |
| [Meerlume](plugins/meerlume) | Chat bots for your business. | OAuth | `https://mcp.meerlume.com/mcp` |
| [Meeters](plugins/meeters) | Find group trips. | None | `https://meeters.org/mcp` |
| [MeetGeek](plugins/meetgeek) | Search meeting transcripts. | OAuth | `https://mcp.meetgeek.ai/mcp` |
| [Meeting.ai](plugins/meeting-ai) | Work Assistant. | OAuth | `https://mcp.meeting.ai/mcp` |
| [Meetly](plugins/meetly) | Meetings into useful work. | OAuth | `https://mcp.getmeetly.ai/mcp` |
| [MeetNotes](plugins/meetnotes) | Minutes from your meetings. | OAuth | `https://getmeetnotes.com/mcp` |
| [Meetup](plugins/meetup) | Find local social events. | OAuth | `https://mcp.meetup.com/mcp` |
| [Meiku Charts](plugins/meiku-charts) | Charts and tables to embed. | OAuth | `https://meikucharts.com/mcp` |
| [Meistron](plugins/meistron) | Aufträge & Rechnungen per KI. | OAuth | `https://meistron.app/api/mcp` |
| [Melius](plugins/melius) | Create images and videos. | OAuth | `https://mcp.melius.com/mcp` |
| [MeltFlex](plugins/meltflex) | AI Interior Design. | OAuth | `https://meltflexai.com/mcp` |
| [Meltwater](plugins/meltwater) | Search media and social mentions and pull analytics. | OAuth | `https://api.meltwater.com/v2/mcp` |
| [Mem](plugins/mem) | Capture, search, and organize notes and collections. | OAuth | `https://mcp.mem.ai/mcp` |
| [Mem0](plugins/mem0) | Mem0 memory layer for AI applications. | OAuth | `https://mcp.mem0.ai/mcp/` |
| [MemberSpace](plugins/memberspace) | Membership analytics. | OAuth | `https://mcp.memberspace.com/mcp` |
| [Memco Shared Memory](plugins/memco-shared-memory) | Shared memory for agents. | OAuth | `https://spark.memco.ai/mcp` |
| [Meminto – Write Your Book](plugins/meminto-stories) | From idea to printed book. | OAuth | `https://app.meminto.com/mcp/v1/mcp.php` |
| [Memocore](plugins/memocore) | Persistent shared AI memory. | OAuth | `https://memocore.ai/mcp` |
| [MemoryPlugin](plugins/memoryplugin) | Save and recall your memories. | OAuth | `https://www.memoryplugin.com/api/mcp/mcp` |
| [MemoStem](plugins/memostem) | Save knowledge that matters. | None | `https://www.memostem.com/api/mcp` |
| [Memova.ai](plugins/memova-ai) | Meeting and Spark knowledge. | OAuth | `https://api.memova.ai/mcp` |
| [Mempipe Notebook](plugins/mempipe) | Cited answers from your files. | OAuth | `https://api.mempipe.ai/v1/mcp` |
| [MemStore](plugins/memstore) | Save and recall memories. | OAuth | `https://mem.store/mcp` |
| [Menas](plugins/menas-cyprus-law) | Cyprus case law & legislation. | None | `https://mcp.menas.ai/mcp` |
| [MencionAI](plugins/mencionai) | Read your AI search visibility. | OAuth | `https://mcp.mencionai.com/mcp` |
| [Menlo](plugins/menlo-insurance) | Home and business insurance. | OAuth | `https://menloinsurance.com/mcp` |
| [Mention.ma](plugins/mention-ma) | Track brand visibility in AI. | OAuth | `https://mcp.mention.ma/mcp` |
| [MentionedOn](plugins/mentionedon) | Improve AI discovery. | OAuth | `https://mentioned-on.com/mcp` |
| [Mentionlytics](plugins/mentionlytics) | Analyze social listening data. | OAuth | `https://mcp.mentionlytics.com/mcp` |
| [MentorCruise](plugins/mentorcruise) | Find and apply to mentors. | OAuth | `https://mentorcruise.com/mcp` |
| [Menz Finance](plugins/menz-finance) | Finanças PF e PJ autorizadas. | OAuth | `https://mcp.menzinvest.com/mcp` |
| [MeranO](plugins/merano) | Hotels, hikes, events, food. | None | `https://app.merano.eu/mcp` |
| [Mercury](plugins/mercury) | Read balances, transactions, statements, and cards. | OAuth | `https://mcp.mercury.com/mcp` |
| [Mercury Jets](plugins/mercury-jets) | Find private jet charter quote. | OAuth | `https://mcp.mercuryjets.com/mcp` |
| [Mergado](plugins/mergado) | Manage ecommerce data. | OAuth | `https://mcp.mergado.com/mcp` |
| [Mergewell Mail Merge](plugins/mail-merge) | Personalized PDFs from a sheet. | None | `https://mail-merge.zovo.one/mcp` |
| [Mermaid Chart](plugins/mermaid-chart) | Create, edit, and fix diagrams. | OAuth | `https://mcp.mermaid.ai/mcp` |
| [Meshed Cover](plugins/meshed-cover) | Quote for business insurance. | None | `https://mcp.trymalcolm.com/mcp-aa3605b4-70cd-4274-aeea-79c5b9795ec7/v1` |
| [Metadata](plugins/metadata) | Manage B2B ad campaigns. | OAuth | `https://mcp.metadata.io/mcp` |
| [Metance](plugins/metance-workspace) | Use your org’s knowledge. | OAuth | `https://api.metance.com/mcp/content-buckets` |
| [Metaprona](plugins/metaprona) | Find property in Albania. | None | `https://metaprona.com/mcp` |
| [Metaventus](plugins/metaventus) | Your CRM and meetings. | OAuth | `https://mcp.metaventus.com/mcp` |
| [Metaview](plugins/metaview) | Analyze interview data. | OAuth | `https://mcp.metaview.ai/mcp` |
| [Meteomatics Weather](plugins/meteomatics-weather) | Entreprise-grade weather data. | OAuth | `https://mcp.meteomatics.com/mcp` |
| [Meticulous](plugins/meticulous) | Meticulous integration to inspect test runs, replay diffs, and coverage for frontend changes | OAuth | `https://app.meticulous.ai/api/mcp` |
| [MetLife Pet Insurance](plugins/metlife-pet-insurance) | Find insurance for pets. | None | `https://fletch-mcp-server.fletch.co/mcp/metlifeapp` |
| [MetricDuck](plugins/metricduck) | SEC filings and financial data. | OAuth | `https://mcp.metricduck.com/mcp` |
| [Metricool](plugins/metricool) | Analyze and schedule posts. | OAuth | `https://ai.metricool.com/mcp` |
| [Metry](plugins/metry) | Unlock Metry data in Reason. | OAuth | `https://mcp.metry.io/mcp` |
| [Mettlespark](plugins/mettlespark) | Tech job ads and skills. | None | `https://app.mettlespark.com/mcp` |
| [Mextic IoT](plugins/mextic-iot) | Ask about your vehicle fleet. | OAuth | `https://mcp.mextic.app/mcp` |
| [mfloow](plugins/mfloow) | mfloow: AI Workflow Platform. | OAuth | `https://mcp.mfloow.com/mcp` |
| [Mi Basket](plugins/mi-basket) | Uruguayan basketball stats. | OAuth | `https://mibasket.app/mcp` |
| [Microburbs](plugins/microburbs) | Australian Property Data. | None | `https://api.microburbs.com.au/mcp` |
| [Microsoft 365 Calendar](plugins/microsoft-365-calendar) | Outlook Calendar: list, read, create, update and delete Microsoft 365 calendar events and meetings. | OAuth | `https://microsoft-365-mcp.devin.ai/calendar/mcp` |
| [Microsoft 365 Directory (Entra ID)](plugins/microsoft-365-directory) | Search and read Microsoft Entra ID directory users, managers and your own Microsoft 365 profile. | OAuth | `https://microsoft-365-mcp.devin.ai/directory/mcp` |
| [Microsoft 365 Mail & Contacts](plugins/microsoft-365-mail) | Outlook mail: read, organize and send Microsoft 365 email and manage your contacts. | OAuth | `https://microsoft-365-mcp.devin.ai/mail/mcp` |
| [Microsoft 365 OneDrive & SharePoint](plugins/microsoft-365-files) | OneDrive and SharePoint: browse, read, upload and delete Microsoft 365 files and sites. | OAuth | `https://microsoft-365-mcp.devin.ai/files/mcp` |
| [Microsoft 365 Teams](plugins/microsoft-365-teams) | Microsoft Teams: list teams, channels and chats, read messages and send them. | OAuth | `https://microsoft-365-mcp.devin.ai/collaboration/mcp` |
| [Microsoft 365 To Do](plugins/microsoft-365-todo) | Microsoft To Do: list, create, update, complete and delete tasks. | OAuth | `https://microsoft-365-mcp.devin.ai/todo/mcp` |
| [Microsoft Learn](plugins/microsoft-learn) | Microsoft Learn integration to search trusted Microsoft documentation | None | `https://learn.microsoft.com/api/mcp` |
| [Microstat](plugins/microstat) | Social media stats and posts. | OAuth | `https://xn--e1afggmaggeil.xn--p1ai/mcp` |
| [Midlyr](plugins/midlyr) | Compliance workflows. | OAuth | `https://mcp.midlyr.com/mcp` |
| [Midpage Legal Research: US Law](plugins/midpage) | Case law, statutes, regulation. | OAuth | `https://app.midpage.ai/mcp` |
| [Midpoint Card Prices](plugins/midpoint-card-prices) | TCG & sports card prices & ROI. | None | `https://mcp.cardcenteringtool.com/mcp` |
| [Migma](plugins/migma) | Run your entire email marketing from Reason and Reason. | OAuth | `https://migma.ai/mcp` |
| [MillionSend](plugins/millionsend) | Send and track email. | OAuth | `https://api.millionsend.com/mcp` |
| [MindMap AI](plugins/mindmap-ai) | Mind maps, concept maps & more. | OAuth | `https://mindmapai.app/mcp` |
| [MindMap.Town](plugins/mindmap-town) | Turn ideas into mind maps. | None | `https://mindmap.town/mcp` |
| [MindMeal](plugins/mindmeal) | Restaurant menus, dish by dish. | None | `https://mindmeal.net/mcp` |
| [Mindomo](plugins/mindomo) | Create mind maps. | OAuth | `https://mcp.mindomo.com/mcp` |
| [Mini Course Generator](plugins/mini-course-generator) | Create and manage courses. | OAuth | `https://mcp.minicoursegenerator.com/mcp` |
| [MiningBridge Intelligence](plugins/miningbridge-intel) | Critical minerals intelligence. | OAuth | `https://intel.miningbridge.com/api/mcp` |
| [MiniUp](plugins/miniup) | Turn chat into live web apps. | None | `https://www.miniup.io/api/mcp` |
| [Minter.io](plugins/minter-io) | Social Media Analytics. | OAuth | `https://minter.io/mcp` |
| [Mintlify](plugins/mintlify) | Mintlify integration to search, read, and edit your documentation | OAuth | `https://mcp.mintlify.com` |
| [Mintlify Index](plugins/mintlify-index) | Mintlify Index integration to search publisher-maintained docs across all Mintlify sites | None | `https://index.mintlify.com` |
| [Mintwell](plugins/mintwell) | Your work-optional check. | None | `https://mintwell.ai/mcp` |
| [Minz](plugins/minz) | Look up CRM, work and expenses. | OAuth | `https://mcp.minz.ai/mcp` |
| [Mirabello Immigration](plugins/mirabello-immigration) | Citizenship and golden visas. | None | `https://mcp.mirabelloconsultancy.com/mcp` |
| [Mirelo](plugins/mirelo) | Generate sound effects. | OAuth | `https://mcp.mirelo.ai/mcp` |
| [Miro](plugins/miro) | Miro integration to build boards, visualize ideas, and act on feedback | OAuth | `https://mcp.miro.com/` |
| [MiroMiro](plugins/miromiro) | Extract any website's design. | OAuth | `https://miromiro.app/mcp` |
| [Misar.Blog](plugins/misar-blog) | Write and publish blog posts. | OAuth | `https://mcp.misar.blog/mcp` |
| [MisarMail](plugins/misarmail) | Email campaigns and contacts. | OAuth | `https://misarmail.com/mcp` |
| [Missive](plugins/missive) | Work with Missive messages. | OAuth | `https://mcp.missiveapp.com/` |
| [Mixmax](plugins/mixmax) | Sales engagement platform. | OAuth | `https://mcp.mixmax.com/mcp` |
| [Mixpanel](plugins/mixpanel) | Mixpanel integration to analyze, query, and manage your product analytics data | OAuth | `https://mcp.mixpanel.com/mcp` |
| [Mizan](plugins/mizan) | Shariah stock screening. | None | `https://goodturn-mcp.pages.dev/mizan/mcp` |
| [ML Referee](plugins/ml-referee) | Evaluate candidate features. | None | `https://api.mlreferee.com/mcp` |
| [MLS Colombia](plugins/mlscolombia) | Home value, listings, agencies. | None | `https://mlscolombia.co/mcp` |
| [MMM Labs](plugins/mmm-labs) | Marketing mix modeling & ROI. | OAuth | `https://mcp.mmmlabs.ai/mcp` |
| [MNTN](plugins/mntn) | Manage Performance TV. | OAuth | `https://mcp.ex.mountain.com/mcp` |
| [moa](plugins/moa) | Ask your meeting notes. | OAuth | `https://mcp.moa.codes/mcp` |
| [Mobbin](plugins/mobbin) | Reference real mobile and web app design patterns from Mobbin's screen library. Requires a paid Mobbin plan. | OAuth | `https://api.mobbin.com/mcp` |
| [Mobile Joe](plugins/mobile-joe) | Manage your mobile app content. | OAuth | `https://app.mobilejoe.dev/mcp` |
| [MobiMatter](plugins/mobimatter) | Travel eSIMs. Check usage. | None | `https://mobimatter.com/mcp` |
| [Mock Mentor](plugins/mock-mentor) | AI exam preparation coach. | OAuth | `https://mcp.mockmentor.ai/mcp` |
| [Moda - Slides & Designs](plugins/moda-slides-and-designs) | Editable slides and designs. | OAuth | `https://mcp.moda.app/mcp` |
| [Modebase - Your Wardrobe](plugins/modebase-your-wardrobe) | Outfits from your own clothes. | OAuth | `https://www.modebase.co/api/mcp` |
| [Modem](plugins/modem) | The developer CRM, connected to Reason. | OAuth | `https://mcp.modem.dev/mcp` |
| [Moderion](plugins/moderion) | Design your life intentionally. | OAuth | `https://mcp.moderion.ai/` |
| [Modern Collections](plugins/modern-collections) | Collect unpaid B2B invoices. | OAuth | `https://api.moderncollections.io/mcp` |
| [Moknah](plugins/moknah) | Make audiobooks from text. | OAuth | `https://moknah.io/mcp` |
| [MolChart](plugins/molchart) | Draw molecular structures. | None | `https://molchart.com/mcp` |
| [MolViewer](plugins/molviewer) | Interactive 3D molecules. | None | `https://mcp.molviewer.bio/mcp` |
| [Momentum](plugins/momentum) | Private equity data for Poland. | OAuth | `https://app.momentumterminal.pl/api/mcp` |
| [Monaco](plugins/agent-plugins) | Use Monaco through its hosted MCP server. | OAuth | `https://mcp.monaco.com/mcp` |
| [monday.com](plugins/monday) | monday.com integration to manage boards, items, and work-management workflows | OAuth | `https://mcp.monday.com/mcp` |
| [Mondoir.art](plugins/mondoir-art) | Find artworks for your space. | None | `https://mondoir.art/mcp` |
| [Mondovo](plugins/mondovo) | Design and publish websites. | OAuth | `https://app.mondovo.com/api/mcp/sites` |
| [Money You're Owed](plugins/money-youre-owed) | Find money you're owed. | None | `https://mcp.moneyyoureowed.com/mcp` |
| [MoneyDeals – US Tech Deals](plugins/moneydeals) | US tech deals & price history. | None | `https://go.moneydeals.com/mcp` |
| [MongoDB Atlas](plugins/mongodb-atlas) | Connect to MongoDB Atlas clusters via the Atlas Managed MCP Server to explore data, manage resources, and generate best-practice code | OAuth | `https://mcp.mongodb.com` |
| [Moniary](plugins/moniary) | Your accounting in Moniary. | OAuth | `https://moniary.com/api/mcp` |
| [Monid](plugins/monid) | Discover and run hundreds of data endpoints — web scraping, people/company enrichment, social media, and search — through one interface. | OAuth | `https://mcp.monid.ai/v1` |
| [Monitly](plugins/monitly) | Global official statistics. | None | `https://monit.ly/api/mcp/public` |
| [Monito](plugins/monito) | Compare global money transfers. | None | `https://ai.monito.com/mcp` |
| [MonitorBankRates](plugins/monitorbankrates) | Find the Best Rates. | None | `https://mcp.monitorbankrates.com/mcp` |
| [monity.ai](plugins/monity-ai) | Track website changes. | OAuth | `https://api.monity.ai/plugins/mcp` |
| [Monk.trade](plugins/monk-labstack-llc) | Stock research for your AI. | OAuth | `https://monk.trade/mcp` |
| [Monnier Paris](plugins/monnier-paris) | Luxury catalog in Reason. | None | `https://mcp.monnierparis.com/mcp` |
| [monPIF](plugins/monpif) | Support for Home Education. | None | `https://monpif.be/mcp` |
| [Montage](plugins/montage) | Import videos and cut clips. | OAuth | `https://mcp.montage.app/mcp` |
| [Monte Carlo](plugins/monte-carlo) | Monte Carlo integration for data and AI observability | OAuth | `https://integrations.getmontecarlo.com/mcp` |
| [Monthly](plugins/monthly-app) | Your monthly budget. | OAuth | `https://app.monthly.com.ar/api/mcp` |
| [Montra](plugins/montra) | Show your agent what to change. | OAuth | `https://montra.com/api/mcp` |
| [Montrose](plugins/montrose) | Your Montrose accounts in chat. | OAuth | `https://mcp.montrose.io/mcp` |
| [moody lenses](plugins/moody-lenses) | Buy colored contact lenses. | None | `https://mcp.moodylenses.com/mcp` |
| [Moon & Star Map](plugins/sky-keepsake) | Moon phases & star map posters. | None | `https://sky-keepsake.zovo.one/mcp` |
| [MoonPay](plugins/moonpay) | Buy crypto with a credit card. | None | `https://agents.moonpay.com/mcp` |
| [Moonwalk](plugins/moonwalk) | Write and publish live boards. | OAuth | `https://moonwalk.now/api/mcp` |
| [MOOSYC](plugins/moosyc) | Your streams & earnings. | OAuth | `https://api.moosyc.com/mcp` |
| [Mopingo](plugins/mopingo) | Plan your trips with Mopingo. | OAuth | `https://mopingo.com/mcp` |
| [MopMob](plugins/mopmob) | Manage premium cleans. | OAuth | `https://mcp.mopmob.co.uk/mcp` |
| [Moqup](plugins/moqup) | Schedule social posts with AI. | OAuth | `https://moqup.app/api/mcp` |
| [Mori](plugins/mori) | Search your conversations. | OAuth | `https://mcp.mori.to/` |
| [MorNatural](plugins/mornatural) | Shop MorNatural supplements. | None | `https://shop.mornatural.com/api/mcp` |
| [Morning Consult](plugins/morning-consult) | Global market intelligence. | OAuth | `https://api.morningconsult.com/mcp` |
| [Morningstar](plugins/morningstar) | Investment and market insights. | OAuth | `https://mcp.morningstar.com/mcp` |
| [MorphaReels](plugins/morpha) | Edit short videos by typing. | OAuth | `https://morphareels.ai/mcp` |
| [Morphed](plugins/morphed) | Create AI images and video. | OAuth | `https://api.morphed.app/mcp` |
| [Morphic](plugins/morphic) | Create and edit media. | OAuth | `https://mcp.morphic.com/mcp` |
| [Morphix](plugins/morphix) | Create image, video and audio. | OAuth | `https://mcp.morphix.pro/mcp` |
| [Morse](plugins/morse) | Find your meeting records. | None | `https://mcp.morsemoney.com/v1` |
| [Mortgage Industry Regulations](plugins/mortgage-industry-regulations) | FNMA + FHA + VA + Compliance. | None | `https://mcp.claudeforcompliance.com/mcp` |
| [MortgageCompare](plugins/mortgagecompare-public) | Compare Loan Estimates. | None | `https://mortgage-compare.rykorg.chatgpt.site/api/mcp` |
| [MORVS](plugins/morvs) | Source-linked public records. | None | `https://api.morvs.ai/mcp` |
| [MosoFin](plugins/mosofin) | Profit, cash & sales together. | OAuth | `https://mcp.mosofin.com/mcp` |
| [MOT Check](plugins/mot-check) | Check any UK vehicle's MOT. | None | `https://motcheck.io/mcp` |
| [MotherDuck](plugins/motherduck) | MotherDuck integration to get answers from your data with DuckDB | OAuth | `https://api.motherduck.com/mcp` |
| [Motion Creative Analytics](plugins/motion) | Motion integration to analyze ad creative and competitor ad libraries | OAuth | `https://projects.motionapp.com/mcp` |
| [Motion4rent](plugins/motion4rent) | Rent mobility equipment. | OAuth | `https://mcp.motion4rent.com/mcp` |
| [MotionSpec](plugins/motionspec) | Validate web animation specs. | None | `https://api.motionspec.dev/mcp` |
| [Motionvid](plugins/motionvid) | Motion graphics video maker. | OAuth | `https://motionvid.ai/mcp` |
| [Motley NYC](plugins/motley-nyc) | NYC schools + neighborhoods. | None | `https://mcp.motley.nyc/mcp` |
| [Motra](plugins/motra) | Your personal AI Trainer. | OAuth | `https://mcp.motra.com/mcp` |
| [Movably](plugins/movably) | London travel, clearer access. | None | `https://movably.io/mcp` |
| [MoveMate: Gym Workout Tracker](plugins/movemate-gym-workout-tracker) | Schedule workouts, track stats. | OAuth | `https://api.movemate.app/mcp` |
| [MoveSurge](plugins/movesurge) | What moved markets, and why. | None | `https://movesurge.com/mcp` |
| [Movie Pick](plugins/movie-pick) | Personal movie recommendations. | OAuth | `https://moviepick.app/mcp` |
| [moviegroupies](plugins/moviegroupies) | movie watchlists, with friends. | OAuth | `https://mcp.moviegroupies.app/mcp` |
| [Mozio](plugins/mozio) | Airport transfers worldwide. | None | `https://mcp.mozio.com/mcp` |
| [Mozonic](plugins/mozonic) | Analyze, fix & master mixes. | OAuth | `https://mcp.mozonic.com/mcp` |
| [MR. ALPS](plugins/mr-alps) | Where to ski or hike today. | None | `https://mralps.com/mcp` |
| [MR. WINDS](plugins/mr-winds) | Where to kite, surf or sail. | None | `https://mrwinds.com/mcp` |
| [MSDS Chain](plugins/msds-chain) | Chemical safety for lab work. | OAuth | `https://mcp.lagentbot.com/mcp` |
| [MszaAI](plugins/msza-ai) | Find and compare homilies. | None | `https://msza.ai/mcp` |
| [MTG Tools](plugins/mtg-tools) | Improve Commander decklists. | None | `https://landfiller.app/mcp` |
| [Muchita Shopping](plugins/muchita-shopping) | Desktop Chrome only. | None | `https://shopping-plugin.muchita.ai/mcp` |
| [Muffed](plugins/muffed) | Look up verified NFL stats. | None | `https://muffed.ai/api/mcp` |
| [Muju](plugins/muju) | Discover and order locally. | None | `https://mujucommunity.com/mcp` |
| [Mukscan Food Facts](plugins/mukscan-food-facts) | Korean packaged food nutrition. | None | `https://mcp.mukscan.com/mcp` |
| [Multiples.vc](plugins/multiples-vc) | Public comps, M&A and VC data. | OAuth | `https://multiples.vc/api/mcp-server/mcp` |
| [Mums!](plugins/mums) | Save and find your recipes. | OAuth | `https://recipe-memory.yaffazhang87.workers.dev/mcp` |
| [MuseRig](plugins/muserig) | Plan creative campaign assets. | OAuth | `https://muserig.com/mcp` |
| [Music Block](plugins/music-block) | Create sheet music & TAB. | None | `https://musicblock.app/mcp` |
| [Music Tutor](plugins/music-tutor) | Real music you can see & hear. | None | `https://musictutor.app/mcp` |
| [MusicAtlas](plugins/musicatlas) | Discover music by sound. | None | `https://mcp.musicatlas.ai/mcp` |
| [MusicBook Pro](plugins/musicbook-pro) | Write and plan your music. | OAuth | `https://mcp.musicbookpro.com/mcp` |
| [Musico](plugins/musico) | Hire live music. | None | `https://mcp.getmusico.com/mcp` |
| [MUSITU Axiom](plugins/musitu-axiom) | Quantitative analysis. | None | `https://mcp.mftintelligence.com/mcp` |
| [Muslim Prayer Reminder](plugins/muslim-prayer-reminder) | Accurate prayer times & alerts. | None | `https://muslim-prayer-mcp.najetareqz.workers.dev/mcp` |
| [Mütalaa: Hukuk, Vergi, İçtihat](plugins/mutalaa) | Turkish law, tax & case law. | OAuth | `https://mutalaa.tr/mcp` |
| [Mutally](plugins/mutally) | Mutual debt book. | OAuth | `https://mutally.rsteam.uz/mcp` |
| [MutuiSupermarket.it](plugins/comparatore-mutui-italia) | Compare. Choose. Save. | None | `https://mcp.mutuisupermarket.it/` |
| [Mux](plugins/mux) | Connect to Mux for video, livestreams, and Mux data. | OAuth | `https://mcp.mux.com` |
| [Muziek maken met AI](plugins/muziek-maken-met-ai) | Make original songs in chat. | OAuth | `https://muziekmakenmetai.nl/mcp` |
| [My AskAI](plugins/my-askai) | Search My AskAI help. | None | `https://mcp.myaskai.com/mcp` |
| [MY EPK](plugins/my-epk) | Build and share your press kit. | None | `https://my-epk.com/mcp` |
| [My Flohmarkt](plugins/my-flohmarkt) | Find flea markets in Germany. | None | `https://mcp.my-flohmarkt.de/mcp` |
| [My Post Factory](plugins/my-post-factory) | Prepare and schedule posts. | OAuth | `https://mypostfactory.com/mcp` |
| [My Reading Pace](plugins/my-reading-pace) | Reading speed & comprehension. | None | `https://mcp.myreadingpace.com/mcp` |
| [My wine](plugins/my-wine) | Compare wine prices near you. | OAuth | `https://mcp.mywine.dev/mcp` |
| [MyAreaReport](plugins/myareareport) | UK area intelligence. | None | `https://mcp.myareareport.com/mcp` |
| [MyBeatz](plugins/mybeatz) | AI beats and type beats. | None | `https://mybeatz.ai/mcp` |
| [MyBestAngle — Profile Photos](plugins/mybestangle-profile-photos) | Natural AI photos from selfies. | OAuth | `https://mcp.mybestangle.com/mcp` |
| [MyBestSim](plugins/mybestsim) | Compare eSIM travel plans. | None | `https://mcp.mybestsim.com/mcp` |
| [MyBoatGuru](plugins/myboatguru) | Find the right boat for you. | None | `https://myboatguru.com/mcp` |
| [MyCarTracks](plugins/mycartracks) | Track mileage and vehicles. | OAuth | `https://mycartracks.com/mcp` |
| [MyChatBot](plugins/mychatbot) | AI sales assistant for stores. | OAuth | `https://connector.mychatbot.app/mcp` |
| [MyChoice Insurance](plugins/mychoice-insurance) | Get Insurance Quotes in Canada. | None | `https://mcp-new.mychoice.ca/mcp` |
| [MyDramaDB](plugins/mydramadb) | Drama answers with sources. | None | `https://mydramadb.com/mcp` |
| [MyFitnessCoach](plugins/myfitnesscoach) | All in One Fitness Solution. | None | `https://mcp.myfitnesscoach.fit/mcp` |
| [Mygentic](plugins/mygentic) | Chat with your work apps. | OAuth | `https://mcp.mygentic.io/mcp` |
| [MyGymDesk](plugins/mygymdesk) | Gym members, classes and dues. | OAuth | `https://mcp.mygymdesk.com/mcp` |
| [MyInvestor](plugins/myinvestor) | Explore investments. | None | `https://mcp.myinvestor.es/mcp` |
| [myLebenslauf](plugins/mylebenslauf) | Edit your CV and export PDFs. | OAuth | `https://mylebenslauf.online/mcp` |
| [MyLens](plugins/mylens) | AI that presents your content. | OAuth | `https://mcp.mylens.ai/mcp` |
| [MyMealVault](plugins/mymealvault) | Plan meals from your vault. | OAuth | `https://api.mymealvault.com/mcp` |
| [MyRegistry.com](plugins/myregistry-com) | All Stores, One Registry®. | None | `https://mcp.myregistry.com/mcp` |
| [mysaas.lol](plugins/mysaas-lol) | Find relevant SaaS memes. | None | `https://mysaas.lol/mcp` |
| [MySkinRecipes](plugins/myskinrecipes-shop) | Ingredients and cart help. | None | `https://myskinrecipes.com/mcp` |
| [MySunbed](plugins/mysunbed) | Book your beach club. | None | `https://mcp.mysunbed.com/mcp` |
| [mytesla.io](plugins/mytesla-io) | Control your Tesla with AI. | OAuth | `https://mcp.mytesla.io/mcp` |
| [Mythsensus](plugins/mythsensus) | Compare 26 astrology systems. | None | `https://mythsensus.com/mcp` |
| [naia GEO](plugins/naia) | AI visibility for your brand. | OAuth | `https://naia.today/api/v1/mcp` |
| [Naksha Muhurat](plugins/naksha-muhurat) | Muhurat. | None | `https://mcp.naksha.social/mcp` |
| [Namaz: Prayer Times](plugins/namaz) | Daily Muslim prayer times. | None | `https://mcp.namaz.io/` |
| [nambli](plugins/tor-event-calendar-ai) | Manage your private calendar. | OAuth | `https://nambli.com/mcp` |
| [Namecheap](plugins/namecheap) | Search domains & pricing. | OAuth | `https://mcp.namecheap.com/mcp` |
| [NameSTL](plugins/namestl) | Design names for 3D printing. | OAuth | `https://namestl.com/mcp` |
| [NameWheel](plugins/namewheel) | Fair picks, teams and draws. | OAuth | `https://mcp.namewheel.org/mcp` |
| [Namp](plugins/namp) | Manage project data. | OAuth | `https://mcp.namp.me/mcp` |
| [Namsiang Thai Voice](plugins/namsiang-thai-voice) | Direct Thai voice performances. | OAuth | `https://tts.popnx.com/api/mcp` |
| [Nanga](plugins/nanga) | Your marketing data, read-only. | OAuth | `https://app.nanga.tech/api/mcp` |
| [Nannu's Kitchen](plugins/nannus-kitchen) | Order homestyle Indian meals. | None | `https://nannuskitchen.com/api/mcp` |
| [NannyFYI](plugins/nannyfyi) | Find and vet caregivers. | None | `https://nanny.fyi/api/mcp` |
| [Narrareach](plugins/narrareach) | Substack, Medium & social. | OAuth | `https://narrareach.com/mcp` |
| [Narron](plugins/narron-ai-visibility) | AI search visibility. | OAuth | `https://mcp.narron.io/mcp` |
| [Naru](plugins/naru) | Build your personal website. | OAuth | `https://naru.pub/mcp` |
| [Nas.com](plugins/nas-com) | Nas.com builds your storefront. | OAuth | `https://mcp.nas.com/mcp` |
| [Nash Agent](plugins/nash-agent) | AI-powered shopping agent. | None | `https://mcp.pier39.ai/mcp` |
| [Nashville Real Estate AI](plugins/nashville-real-estate-ai) | Saves Real Estate Agents Time. | None | `https://chatgptmcpzip.replit.app/mcp` |
| [Nation](plugins/nation) | Run your online store. | OAuth | `https://mcp.withnation.ai/mcp` |
| [Natural](plugins/natural) | Send and request money, manage agents, and check balances on Natural. | OAuth | `https://mcp.natural.com` |
| [Navan](plugins/navan) | Query expenses, travel bookings, policies, and cards. | OAuth | `https://mcp.navan.com/mcp` |
| [NavLog](plugins/navlog) | Your boat’s records in chat. | OAuth | `https://navlog.io/mcp` |
| [Navo24 Container Tracking](plugins/trackingmcp) | Track freight and routes. | OAuth | `https://mcp.trackingmcp.com/mcp` |
| [NC General Statutes](plugins/ncstatutes) | Search and read NC statutes. | None | `https://mcp.ncstatutes.com/mcp` |
| [nebty](plugins/nebty) | Stop brand impersonation. | OAuth | `https://mcp.nebty-id.com/mcp` |
| [Nectar](plugins/nectar) | Your social operating system. | OAuth | `https://mcp.nectarsocial.com/mcp` |
| [nefoliGIFT](plugins/nefoligift) | Wishlists & Gifts. | OAuth | `https://gift.nefoli.de/mcp` |
| [Nella Finance AI](plugins/nella-finance-ai) | Your finance team in chat. | OAuth | `https://mcp.nellafinance.co.uk/mcp` |
| [NEMOweby](plugins/nemoweby) | Properties, inquiries and AI. | OAuth | `https://www.nemoweby.cz/api/mcp` |
| [Neon](plugins/neon) | Inspect Neon projects, branches, databases, and run SQL through Neon's hosted MCP server. | OAuth | `https://mcp.neon.tech/mcp` |
| [NeoSapien](plugins/neosapien) | Your Personal AI Assistant. | OAuth | `https://api.neosapien.ai/mcp` |
| [Nepternship](plugins/nepternship) | Warm intros for internships. | None | `https://mcp.nepternship.com/mcp` |
| [Nero Labs](plugins/nero-labs) | Data, web and compliance tools. | None | `https://nero-labs-chatgpt.nerolabs.workers.dev/mcp` |
| [nerra](plugins/nerra) | Context for AI agents/teams. | OAuth | `https://control.nerra.ai/api/agent/mcp` |
| [NestPilot](plugins/nestpilot) | Retirement decision tools. | None | `https://mcp.nestpilot.org/mcp` |
| [NetAPI](plugins/netapi) | Registered domain lists. | OAuth | `https://mcp.netapi.com/mcp` |
| [Netlify](plugins/netlify) | Inspect Netlify sites, deploys, forms, and environment state through Netlify's hosted MCP server. | OAuth | `https://netlify-mcp.netlify.app/mcp` |
| [NetNest SEC Fundamentals](plugins/netnest-sec-fundamentals) | Company data from SEC filings. | OAuth | `https://api.netnestdesign.com/mcp` |
| [Netwise Paycheck Calculator](plugins/paycheck-calculator) | 2026 paycheck after taxes. | None | `https://paycheck-calculator.zovo.one/mcp` |
| [NetWorthTrackr](plugins/networthtrackr) | Your net worth, in plain words. | OAuth | `https://mcp.networthtrackr.com/mcp` |
| [Netzero for Powerwall](plugins/netzero) | Home energy management. | OAuth | `https://api.netzero.energy/mcp` |
| [Neume](plugins/neume) | Make songs and change lyrics. | OAuth | `https://api.neume.io/v1/mcp` |
| [Neural Analog](plugins/neural-analog) | Restore, split and edit audio. | OAuth | `https://api.neuralanalog.com/mcp` |
| [Neurnav](plugins/neurnav) | Write document with provenance. | OAuth | `https://neurnav.com/mcp` |
| [NeverApply](plugins/neverapply) | Job search and career drafts. | None | `https://neverapply.co/mcp` |
| [New CV Tool](plugins/new-cv-tool) | Tailor CVs without invention. | OAuth | `https://newcvtool.com/mcp` |
| [New Vintage](plugins/new-vintage) | Your winery data in one place. | OAuth | `https://mcp.newvintage.ai/mcp` |
| [New York LLC Publication](plugins/new-york-llc-publication) | Costs & newspapers by county. | None | `https://mcp.llcpublishers.com/mcp` |
| [Newsify](plugins/newsify) | Trending news, any country. | None | `https://mcp.newsify.today/mcp` |
| [Newsmind — RSS for your AI](plugins/newsmind-rss-for-your-ai) | Read and search your RSS feeds. | OAuth | `https://newsmind.app/mcp` |
| [NewTwos](plugins/newtwos) | Capture lists, to-dos & notes. | OAuth | `https://writethingsdown.com/mcp` |
| [Nexez Buyer](plugins/nexez-buyer) | Find and validate offers. | None | `https://nexez.ai/mcp` |
| [Nexoya](plugins/nexoya) | Marketing analytics. | OAuth | `https://mcp.nexoya.com/mcp` |
| [nextcard](plugins/nextcard) | Cards, credits, and rewards. | OAuth | `https://mcp.nextcard.com/mcp` |
| [NEXUS AI](plugins/nexus-ai) | Deploy and operate AI apps. | OAuth | `https://mcp.nexusai.run/mcp` |
| [Nexus: Calories & Workouts](plugins/nexus-calories-and-workouts) | Track macros, plan workouts. | OAuth | `https://mcp.nexus.kushalsm.com/mcp` |
| [Nexusplus](plugins/nexusplus) | Search and clean your contacts. | OAuth | `https://nexusplus.ai/api/mcp` |
| [Nibomo Flashcards](plugins/nibomo-flashcards) | Create and study flashcards. | OAuth | `https://mcp.nibomo.com/mcp` |
| [NiceBabyName — Nameology](plugins/nicebabyname-nameology) | Baby names with Nameology. | None | `https://www.nicebabyname.com/mcp` |
| [NiceHub Platform](plugins/nicehub-platform) | Brief de course B2B VTC. | None | `https://nicehub.app/api/mcp` |
| [NiceHub Services](plugins/nicehub-services) | Artisans BTP & Dépannage. | None | `https://services.nicehub.app/api/mcp` |
| [NIERU掲示板 設定アシスタント β](plugins/nieru-settings-assistant) | Board help and settings drafts. | None | `https://api.nieru.net/mcp` |
| [Nifty](plugins/nifty) | Manage your reselling business. | OAuth | `https://api.nifty.ai/api/mcp` |
| [Nimply](plugins/nimply) | Plan and publish social posts. | OAuth | `https://mcp.nimply.io/mcp` |
| [Nisaa](plugins/nisaa-app) | Period rulings by madhab. | None | `https://getnisaa.com/mcp` |
| [Nitrosend](plugins/nitrosend) | AI-native email. Compose newsletters, build automation flows, manage contacts, run agent inboxes, and send campaigns — all from Reason. | OAuth | `https://api.nitrosend.com/mcp` |
| [NLocale](plugins/nlocale) | Explore Aisne, France. | None | `https://nlocale.fr/mcp` |
| [No Bike No Life](plugins/no-bike-no-life) | Motorräder, Routen, Wetter. | None | `https://mcp.nbnl.de/mcp` |
| [Noah](plugins/noah) | Research risk and trends. | OAuth | `https://noahpredict.com/mcp` |
| [Nobl9](plugins/nobl9) | Service reliability, in chat. | OAuth | `https://app.nobl9.com/api/mcp` |
| [NoBrainner](plugins/nobrainner) | Smarter Flashcards. | OAuth | `https://app.nobrainner.xyz/api/chatgpt/mcp` |
| [Nobrainrot](plugins/nobrainrot) | Check your brain rot level. | None | `https://mcp.nobrainrot.com/mcp` |
| [NØDE Negocio](plugins/node-negocio-directorio) | Inventory, sales and balances. | OAuth | `https://app.allinnode.com/mcp` |
| [Noemi](plugins/noemi) | Your professional page. | OAuth | `https://www.noemi.cards/api/mcp` |
| [Nogogo AI](plugins/nogogo-ai) | Reliability. | None | `https://mcp-public.nogogo.fr/mcp` |
| [NOLGIA](plugins/nolgia) | Create images, video and audio. | OAuth | `https://mcp.nolgia.ai/mcp` |
| [Nolio](plugins/nolio) | Endurance, strength and Hyrox. | OAuth | `https://mcp.nolio.io/mcp` |
| [Nombrio](plugins/nombrio) | Check brand name availability. | None | `https://nombrio.com/api/mcp` |
| [Nonica](plugins/nonica) | Install NonicaTab Revit MCP. | None | `https://mcp.nonica.io/mcp` |
| [NordicContacts](plugins/nordiccontacts) | Find Nordic decision-makers. | OAuth | `https://nordiccontacts.eu/mcp` |
| [Norg.AI Retrievability AEO GEO](plugins/ai-retrievability-by-norg) | Make your website AI-readable. | None | `https://norg.ai/mcp` |
| [NormAPI – XRechnung & ZUGFeRD](plugins/normapi) | Check and create e-invoices. | None | `https://normapi.com/mcp` |
| [normchart](plugins/normchart) | Business charts for reports. | OAuth | `https://normchart.com/mcp` |
| [NORMS: Evidence & Scope](plugins/norms-evidence-and-scope) | Structured evidence checks. | None | `https://norms.beforebabel.org/mcp` |
| [NorScout](plugins/norscout) | Prospects in Norway and Sweden. | OAuth | `https://norscout.com/mcp` |
| [Northvalley Intelligence](plugins/northvalley-intelligence) | Website review or a consult. | None | `https://northvalleyintel.com/mcp` |
| [Not Just You](plugins/not-just-you) | AI status, source-separated. | None | `https://notjustyou.dev/mcp` |
| [Not So Boring News](plugins/not-so-boring-news) | Verify. Visualize. Understand. | None | `https://mcp.notsoboringnews.com/mcp` |
| [Not So Dumbbell](plugins/not-so-dumbbell) | Plan and adjust gym workouts. | None | `https://notsodumbbell.com/mcp` |
| [Notaio Chianese Calculators](plugins/notaio-chianese-calcoli) | Italy home & inheritance tax. | None | `https://mcp.notaiochianese.it/mcp` |
| [Notamify](plugins/notamify) | NOTAMs and flight briefings. | OAuth | `https://mcp.notamify.com/mcp` |
| [Notely Voice](plugins/notely-voice) | Search voice notes & summaries. | OAuth | `https://mcp.notelyvoice.ai/mcp` |
| [Notem](plugins/notem) | Save notes and use in any chat. | OAuth | `https://notemcp.com/mcp` |
| [Notesix](plugins/notesix) | Manage calls and integrations. | OAuth | `https://mcp.notesix.ai/mcp` |
| [NotFair Ads](plugins/notfair-ads) | Audit and improve ads. | OAuth | `https://notfair.co/api/mcp` |
| [NotForm](plugins/notform) | AI interviews, structured data. | OAuth | `https://mcp.notform.co/mcp` |
| [Notii](plugins/notii) | Your notes, tasks and calendar. | OAuth | `https://app.notii.io/mcp` |
| [Notion](plugins/notion) | Search, read, and update Notion pages and databases through Notion's hosted MCP server. | OAuth | `https://mcp.notion.com/mcp` |
| [Notit](plugins/notit) | Search your Notit study notes. | OAuth | `https://mcp.notit.ai/mcp` |
| [NotoScribe](plugins/notoscribe) | Search recordings and notes. | OAuth | `https://notoscribe.com/api/mcp` |
| [Notra](plugins/notra) | Show up in AI search. | OAuth | `https://mcp.usenotra.com/mcp` |
| [NovaBid](plugins/novabid) | Edinburgh hotels send offers. | None | `https://www.novabid.co.uk/api/mcp` |
| [NovaSupplier](plugins/novasupplier) | Portuguese clothing factories. | None | `https://novasupplier.com/mcp` |
| [Nowistay](plugins/nowistay) | Manage your short term rental. | OAuth | `https://api.nowistay.com/mcp` |
| [Nowrill](plugins/nowrill) | Your day, open to change. | OAuth | `https://nowrill.com/api/mcp` |
| [nowyourlink Developer Docs](plugins/nowyourlink-developer-docs) | Read API integration docs. | None | `https://nowyourlink.com/mcp` |
| [NP Ledger](plugins/np-ledger) | Nonprofit fund accounting. | OAuth | `https://mcp.npledger.com/v1/` |
| [NPMScan](plugins/npmscan) | npm package & vuln lookups. | None | `https://npmscan.com/api/mcp` |
| [NSP Club AI Sponsor](plugins/nsp-club-ai-sponsor) | Practical NSP partner coach. | OAuth | `https://ai-sponsor.nspclub.org/mcp` |
| [Nsure Insurance Quotes](plugins/nsure-insurance-quotes) | Find and buy home insurance. | None | `https://endpoint-app-frontend-mcp-prd-01-cda8erbuhfdfeqam.a01.azurefd.net/mcp` |
| [NTU Mods](plugins/ntu-mods) | NTU module and exam lookup. | None | `https://ntumods.com/mcp` |
| [Nudges](plugins/nudges) | Reminders delivered by email. | OAuth | `https://nudges.chat/api/mcp` |
| [Nuelink](plugins/nuelink) | Plan and schedule social posts. | OAuth | `https://mcp.nuelink.com/mcp` |
| [nunu.ai](plugins/nunu-ai) | AI-powered software testing. | OAuth | `https://nunu.ai/mcp` |
| [NutriPlant PRO](plugins/nutriplant-pro) | Nutrición vegetal + VPD. | None | `https://nutriplantpro.com/mcp` |
| [NutriSave](plugins/nutrisave) | Piani alimentari e ricette. | None | `https://nutri-save.vercel.app/mcp` |
| [Nuwa](plugins/nuwa) | Talk to your handwritten notes. | OAuth | `https://mcp.nuwapen.com/` |
| [NY Solar Incentives](plugins/ny-solar-incentives) | Home solar savings by county. | None | `https://nysolarincentives.org/mcp` |
| [Nyambot](plugins/nyambot) | Données officielles France. | OAuth | `https://mcp.nyambot.ai/mcp` |
| [NYC RSVPs](plugins/nyc-rsvps) | When NYC tables open. | None | `https://nyc-rsvps-mcp-app-v2-8003af7e.alpic.live/mcp` |
| [Nysa](plugins/nysa) | Search your company brain. | OAuth | `https://mcp.usenysa.com/mcp` |
| [OAK.memory](plugins/oak-memory) | Private memory for your AI. | OAuth | `https://www.openaikits.com/api/mcp` |
| [OakbrookOne](plugins/oakbrookone) | Explore debt consolidation. | None | `https://oakbrook-gpt-api-432296117705.europe-west2.run.app/mcp` |
| [Oasis Health](plugins/oasis-health-directory) | Packaged food health scores. | None | `https://oasishealth.app/mcp` |
| [OathMCP](plugins/oathmcp) | Run clinical calculators. | None | `https://mcp.oath.md/mcp` |
| [Obolus](plugins/obolus) | Compare global net income. | None | `https://www.obolusfinanz.de/api/mcp` |
| [Obratec](plugins/obratec) | Manage site reports. | OAuth | `https://mcp.obratec.app/mcp` |
| [Ocapi](plugins/ocapi) | Manage your online store. | OAuth | `https://dashboard.ocapi.shop/mcp` |
| [Occam Edge](plugins/occam-edge) | Project intelligence. | OAuth | `https://mcp.occam-edge.com/mcp` |
| [OCDBees](plugins/ocd-bees) | Clients, projects, and tasks. | OAuth | `https://app.ocdbees.com/mcp` |
| [OceanToken](plugins/oceantoken) | Create images, video, speech. | OAuth | `https://mcp.oceantoken.ai/mcp` |
| [Ocolta](plugins/ocolta) | Understand document signals. | OAuth | `https://app.ocolta.com/mcp` |
| [Ocoya](plugins/ocoya) | Social media management. | OAuth | `https://mcp.ocoya.com/` |
| [Octagon AI](plugins/octagon-ai) | Stock & prediction market data. | OAuth | `https://mcp.octagonai.co/mcp` |
| [Octen](plugins/octen) | Live web search & extraction. | OAuth | `https://mcp.octen.ai/mcp` |
| [OctoEverywhere](plugins/octoeverywhere) | Monitor & Control 3D Printers. | OAuth | `https://octoeverywhere.com//api/mcp` |
| [Octolane](plugins/octolane) | Revenue Superintelligence. | OAuth | `https://mcp.octolane.com/mcp` |
| [Octopart Component Finder](plugins/octopart-component-finder) | Find parts and prices. | None | `https://nbse-octopart.com/mcp` |
| [Octopus.do](plugins/octopus-do) | Build and edit sitemaps. | OAuth | `https://mcp.octopus.do/mcp` |
| [Odometry Mileage Log](plugins/mileage-log) | Mileage log and reimbursement. | None | `https://mileage-log.zovo.one/mcp` |
| [OEG AI Studio](plugins/oeg-ai-studio) | Create images with OEG. | OAuth | `https://app.oegaistudio.com/mcp` |
| [Off Plan AI](plugins/off-plan-ai) | Saudi off-plan projects. | None | `https://mcp.offplan.sa/mcp` |
| [OfferHunt](plugins/offerhunt) | Find and manage jobs. | OAuth | `https://offerhunt.ai/mcp` |
| [OfferUnderway](plugins/offerunderway) | Manage your job search. | OAuth | `https://api.offerunderway.com/mcp` |
| [offgen](plugins/offgen) | Branded PowerPoint decks. | OAuth | `https://offgen.ai/mcp` |
| [Offhand](plugins/offhand) | A to-do list your agents share. | OAuth | `https://offhandapp.com/mcp` |
| [OfficeHubb](plugins/officehubb) | Quotes from local agencies. | None | `https://www.officehubb.net/api/mcp` |
| [Offline Protocol](plugins/offline-protocol) | Build local device workflows. | None | `https://mcp.offlineprotocol.com/public/mcp` |
| [Offplan Insider](plugins/offplan-insider) | UAE off-plan property data. | None | `https://offplaninsider.com/mcp` |
| [OffStereo](plugins/offstereo) | Playable music stories & mixes. | OAuth | `https://www.offstereo.com/api/mcp` |
| [OGRECORDS](plugins/ogrecords) | Your music catalog in Reason. | OAuth | `https://www.og-records.com/api/agent/mcp` |
| [Oi](plugins/oi) | On. | OAuth | `https://api.oioioi.ai/mcp` |
| [Oira](plugins/oira) | Share work updates with Oira. | OAuth | `https://oira-oira.com/mcp` |
| [OKA Anywhere](plugins/oka-anywhere) | Cited answers from procedures. | OAuth | `https://console.forgeagentsai.com/mcp` |
| [OKX](plugins/okx) | Find crypto market data. | None | `https://www.okx.com/api/v1/mcp/chatgpt` |
| [OlaChill Travel](plugins/olachill) | Japan tours & transport. | None | `https://olachill.com/mcp` |
| [Oliver's mTOR Atlas](plugins/mtor-atlas) | mTOR research with evidence. | None | `https://mtor-atlas-mcp.mtor-atlas.workers.dev/mcp` |
| [OloLand DD](plugins/ololand-dd-openai) | Institutional due diligence. | OAuth | `https://api.ololand.ai/mcp` |
| [omg apps](plugins/omg-apps) | Build and share apps by link. | OAuth | `https://mcp.omg.dev/mcp` |
| [omgskills](plugins/omgskills) | Find trusted agent skills. | None | `https://omgskills.com/mcp` |
| [Omneky](plugins/omneky) | Paid-media MCP for Meta/Facebook, Google PMax/Demand Gen, TikTok, LinkedIn & Reddit — launch campaigns, generate creatives, manage brand catalogue, report ROAS/CTR. | OAuth | `https://mcp.omneky.com/grok` |
| [Omni Analytics](plugins/omni-analytics) | Omni integration to query your data using natural language | OAuth | `https://callbacks.omniapp.co/callback/mcp` |
| [Omnia](plugins/omnia) | Your GEO companion. | OAuth | `https://app.useomnia.com/mcp` |
| [OmniFlag](plugins/omniflag) | Income tax and country matches. | None | `https://omniflag.app/mcp` |
| [OmniSeal](plugins/omniseal) | Seal and verify files. | None | `https://api.purecipher.com/mcp` |
| [Omny](plugins/omny) | Trouve ton bien immobilier. | OAuth | `https://mcp.omny.fr/mcp` |
| [Oncallz](plugins/oncallz) | On-call, incidents and reviews. | OAuth | `https://oncallz.com/mcp` |
| [OnChainDiligence](plugins/onchaindiligence) | Inspect and verify payments. | None | `https://mcp.onchaindiligence.com/mcp` |
| [One Coworking](plugins/one-coworking) | Find coworking and offices. | None | `https://www.onecoworking.com/api/mcp` |
| [One Step Travel](plugins/one-step-travel) | Plan trips and estimate costs. | None | `https://onesteptravel.app/mcp` |
| [One U Education](plugins/one-u-education) | Australian courses & migration. | None | `https://mcp.oneuedu.com/mcp` |
| [One4Wall](plugins/one4wall) | Find and save phone wallpapers. | None | `https://mcp.one4wall.app/api/mcp` |
| [OneGoodArea](plugins/onegoodarea) | Neighbourhood facts and scores. | OAuth | `https://api.onegoodarea.com/mcp` |
| [OneLence](plugins/onelence) | Marketing and growth analytics. | OAuth | `https://mcp.onelence.com/mcp` |
| [OnePro AI](plugins/onepro-ai) | Análise de investimentos. | OAuth | `https://etf1.com.br/mcp` |
| [OneSignal](plugins/onesignal) | Connect Reason to OneSignal through the OneSignal MCP server. | OAuth | `https://api.onesignal.com/mcp/oauth` |
| [Ongage Airis](plugins/ongage-airis) | Email analytics and drafts. | OAuth | `https://api.ongage.com/mcp` |
| [Onlinecomponents Search](plugins/onlinecomponents-search) | OnlineComponents Live Search. | OAuth | `https://mcp.onlinecomponents.com/mcp` |
| [Onplana](plugins/onplana) | Plan projects and track work. | OAuth | `https://mcp.onplana.com/mcp` |
| [Onsa](plugins/onsa) | Find and qualify B2B leads. | OAuth | `https://api.onsa.ai/api/mcp` |
| [ontown](plugins/ontown) | What's on in your city. | OAuth | `https://ontown.app/mcp/` |
| [Onyx Coach](plugins/onyx-coach) | Coach clients and workouts. | OAuth | `https://api.onyxcoach.com/mcp` |
| [Opafex](plugins/opafex) | Where AI fits in your firm. | None | `https://opafex.com/api/mcp` |
| [OPEN - what is open right now](plugins/open-what-is-open-right-now) | See what's open right now. | None | `https://mcp.openow.app/mcp` |
| [Open Context](plugins/open-context) | Store and retrieve context. | OAuth | `https://mcp.opnctx.ai/mcp` |
| [Open Creator Graph](plugins/open-creator-graph) | Look up any digital Creator. | None | `https://creatorgraph.sparkonomy.com/mcp` |
| [Open Ephemeris](plugins/open-ephemeris) | Accurate charts & Human Design. | OAuth | `https://mcp.openephemeris.com/mcp` |
| [Open Medicine](plugins/open-medicine) | Search clinical algorithms. | None | `https://myopenmedicine.com/mcp` |
| [Open Natural Gas](plugins/open-natural-gas) | Compare Georgia gas costs. | None | `https://mcp.opennaturalgas.org/mcp` |
| [OpenArt](plugins/openart) | Create images and videos. | OAuth | `https://mcp.openart.ai/mcp` |
| [OpenDocs.cc](plugins/opendocs-cc) | Markdown to shareable docs. | OAuth | `https://mcp.opendocs.cc/mcp` |
| [Openhandle](plugins/openhandle) | Read public social media data. | OAuth | `https://openhandle.dev/mcp` |
| [Openlayer](plugins/openlayer) | Monitor and govern AI. | OAuth | `https://mcp.openlayer.com/mcp` |
| [OpenMail](plugins/openmail) | Email inboxes for AI agents. | OAuth | `https://mcp.openmail.sh/mcp` |
| [OpenPrefs](plugins/openprefs) | Your preferences in one place. | OAuth | `https://mcp.openprefs.ai/` |
| [OpenPublica](plugins/openpublica) | Cited civic meeting research. | None | `https://openpublica.com/mcp` |
| [OpenRegister](plugins/openregister) | Find German company data. | OAuth | `https://mcp.openregister.de/mcp` |
| [OpenRegs: Regulatory Research](plugins/openregs-regulatory-research) | Up-to-date laws, not the web. | OAuth | `https://mcp.openlaws.us/mcp` |
| [OpenRush](plugins/openrush) | SEO and competitor analysis. | OAuth | `https://api.openrush.com/mcp` |
| [OpenSEO](plugins/openseo) | SEO made simple. | OAuth | `https://app.openseo.so/mcp` |
| [OpenVan.camp Travel](plugins/openvan-camp-travel) | Road trips, visas & fuel. | None | `https://mcp.openvan.camp/mcp` |
| [OpenWhispr](plugins/openwhispr) | Notes, meetings and dictation. | OAuth | `https://mcp.openwhispr.com/mcp` |
| [Opplevagent](plugins/agentplatform-opplevagent) | Find Norwegian experiences. | None | `https://opplevagent.no/mcp` |
| [Opsera](plugins/opsera-devsecops) | Opsera DevSecOps Agent — AI-powered architecture analysis, security scanning, compliance auditing, and SQL security for your codebase. | OAuth | `https://agent.opsera.ai/mcp` |
| [OpsTruth Verification](plugins/opstruth-verification) | Verify coding work with proof. | None | `https://mcp.opstruth.io/mcp` |
| [Opteo](plugins/opteo) | Analyse and optimise your ads. | OAuth | `https://api.opteo.com/mcp` |
| [Optifeed](plugins/optifeed) | Catalog and feed autopilot. | OAuth | `https://mcp.optifeed.com/mcp` |
| [Optimal Beam](plugins/optimal-beam) | Beam analysis and steel shapes. | None | `https://mcp.optimalbeam.com/mcp` |
| [OptimalCover](plugins/optimalcover) | Independent Pricing Reference. | None | `https://optimal-cover-backend-prod-162746456842.us-west1.run.app/mcp` |
| [OptinMonster](plugins/optinmonster) | Popups and lead generation. | OAuth | `https://mcp.optinmonster.com/mcp` |
| [Option Desk (hosted)](plugins/option-desk-hosted) | Analyze option-chain data. | None | `https://optiondesk.avidquant.com/mcp` |
| [OptionClaws](plugins/optionclaws) | Scan for options trades. | OAuth | `https://api.optionclaws.com/optionclaws/mcp` |
| [OptionEdge AI](plugins/optionedge-ai) | AI stock research and screens. | None | `https://api.optionedge.ai/mcp` |
| [OptionsAhoy](plugins/optionsahoy) | Equity comp tax planning. | None | `https://optionsahoy.com/mcp` |
| [OptionsCalc](plugins/optionscalc) | Construct option strategies. | None | `https://api.optionscalc.app/mcp` |
| [Opus Growth](plugins/opus-growth) | Run your ad accounts from chat. | OAuth | `https://mcp.opus-growth.com/mcp` |
| [OpusClip](plugins/opusclip) | Turn long videos into AI-curated short clips: caption, reframe, thumbnail, schedule, and publish. | OAuth | `https://mcp.opus.pro/mcp` |
| [Orbbit Data](plugins/orbbit-data) | Trusted market data for AI. | OAuth | `https://data-api.orbbit.co/mcp` |
| [Orbit - People search](plugins/orbit-people-search) | People search and profiles. | OAuth | `https://api.orbitsearch.com/mcp` |
| [Orbit for Substack](plugins/orbit) | Know your people and writing. | OAuth | `https://seeyourorbit.com/api/mcp` |
| [OrbitPage](plugins/orbitpage) | Edit and publish web pages. | OAuth | `https://orbitpage.com/mcp` |
| [Orca Security](plugins/orca-security) | Fix code, cloud & AI risks. | OAuth | `https://mcp.orcasecurity.io/` |
| [Orchetta](plugins/orchetta) | Work on your customer journeys. | OAuth | `https://orchetta.com/mcp` |
| [Orderli](plugins/orderli) | QR ordering for restaurants. | OAuth | `https://mcp.orderli.com/mcp` |
| [OrdersApps](plugins/ordersapps-store) | Run your online store by chat. | OAuth | `https://mcp.ordersapps.com/mcp` |
| [Orendro](plugins/orendro) | Food, fitness and daily plans. | OAuth | `https://api.orendro.com/mcp` |
| [OrgX](plugins/orgx) | Continuity for AI agents. | OAuth | `https://mcp.useorgx.com/mcp` |
| [OriginalVoices](plugins/originalvoices) | Get human insight on any topic. | OAuth | `https://api.originalvoices.ai/mcp` |
| [Orion by Gravity](plugins/orion) | Orion by Gravity integration to get insights from an autonomous AI analyst | OAuth | `https://g.runorion.com/mcp` |
| [Orisu](plugins/orisu) | Product photos, ads and videos. | OAuth | `https://api.orisu.ai/mcp` |
| [Ornn Data](plugins/ornn-data) | AI compute market data. | OAuth | `https://mcp.ornn.com/mcp` |
| [ORS Clean](plugins/ors-clean) | Exterior cleaning quotes. | None | `https://mcp.orsclean.com/mcp` |
| [Orshot](plugins/orshot) | AI Videos & Social Posting. | OAuth | `https://mcp.orshot.com/mcp` |
| [Orthogonal](plugins/orthogonal) | Connect agents to 800+ tool and data endpoints from 50+ verified providers through Orthogonal's hosted MCP server. | OAuth | `https://mcp.orthogonal.com` |
| [Orvo](plugins/orvo) | Your relationships, connected. | OAuth | `https://www.getorvo.com/api/mcp` |
| [OSINT Navigator](plugins/osint-navigator) | Find OSINT tools for any task. | OAuth | `https://navigator.indicator.media/mcp` |
| [OtaKit](plugins/otakit) | OTA updates for Capacitor apps. | OAuth | `https://console.otakit.app/mcp` |
| [Otnox](plugins/otnox) | Search public tenders. | OAuth | `https://mcp.otnox.com/mcp` |
| [OTTASIA](plugins/ottasia) | Find where to stream. | None | `https://ottasia.com/api/mcp/sse` |
| [OTTEngine](plugins/ottengine) | For streaming app publishers. | OAuth | `https://mcp.ottengine.com/mcp` |
| [Otter](plugins/otter-tcsc) | Run and analyze A/B tests. | OAuth | `https://otterab.com/mcp` |
| [Otter.ai](plugins/otter) | Search meeting history and pull full transcripts. | OAuth | `https://mcp.otter.ai/mcp` |
| [Otto Roles](plugins/otto-roles) | Search jobs and auto-apply. | OAuth | `https://ottoroles.com/mcp` |
| [Otto Travel](plugins/otto-travel) | Plan, book, and manage travel. | OAuth | `https://api.ottotheagent.com/mcp` |
| [Ouigo France](plugins/ouigo-france) | Trouver billets OUIGO. | None | `https://mcp.ouigo.com/mcp` |
| [Outfit Preview: Virtual Try-On](plugins/outfit-preview) | Try clothes on your own photo. | OAuth | `https://mcp.firemoon.studio/mcp` |
| [Outplay](plugins/outplay) | Run your sales outreach. | OAuth | `https://mcp.outplay.ai/mcp` |
| [Outreach](plugins/outreach) | Search sequences, prospects, and Kaia meetings. | OAuth | `https://api.outreach.io/mcp` |
| [OutReserve](plugins/outreserve) | Find Campgrounds & RV Parks. | None | `https://outreserve.com/mcp` |
| [Outside Agent](plugins/outside-agent) | Build & publish AI agents. | OAuth | `https://mcp.outsideagent.ai/mcp` |
| [Outside Chair — Strategy](plugins/outside-chair) | Strategy into follow-through. | OAuth | `https://outsidechair.com/mcp` |
| [Outstand](plugins/outstand) | Manage your social media. | OAuth | `https://mcp.outstand.so/mcp` |
| [Overfit Datensatz](plugins/overfit) | Ausschreibungen & Firmendaten. | None | `https://www.overfit.de/mcp` |
| [OwlCAD](plugins/owlcad) | Parametric CAD for 3D printing. | OAuth | `https://mcp.owlcad.com/mcp` |
| [Owned Outright](plugins/owned-outright) | Mortgage payoff calculator. | None | `https://ownedoutright-mcp.winwithwebtechnologies.workers.dev/mcp` |
| [OwnerBox](plugins/ownerbox-reservations) | All-in-One Store Management. | None | `https://api.ownerbox.kr/mcp` |
| [OxbridgeAI TMUA and ESAT](plugins/oxbridgeai) | TMUA and ESAT practice. | None | `https://oxbridgeaitutor.com/mcp` |
| [OXYGEN](plugins/oxygen) | Research and manage B2B leads. | OAuth | `https://oxygen-agent.com/mcp` |
| [P.R.O.](plugins/pro) | Your fitness, in conversation. | OAuth | `https://mcp.proapp.uk/mcp` |
| [Pabbly Studio](plugins/pabbly-studio) | Build and host web apps. | OAuth | `https://studio.pabbly.com/mcp` |
| [Pablooo.club Benchmark library](plugins/pablooo-club-benchmark-library) | Benchmark 10k+ screenshots. | None | `https://mcp.pablooo.club/mcp` |
| [Pacelab Intervals](plugins/pacelab-intervals) | Create interval workouts. | OAuth | `https://pacelabintervals.com/mcp` |
| [Paceword Speed Reader](plugins/speed-reader) | Paced reading practice. | None | `https://speed-reader.zovo.one/mcp` |
| [PackIndex](plugins/packindex) | Packaging price benchmarks. | None | `https://opnplatform.com/api/mcp` |
| [Packing Optimizer](plugins/packing-optimizer) | Optimize box & pallet packing. | OAuth | `https://packing-optimizer.com/mcp` |
| [PackRat](plugins/packrat) | Plan trips and pack smarter. | OAuth | `https://mcp.packratai.com/mcp` |
| [Packrift Packaging](plugins/packrift-packaging) | Shipping boxes, mailers & tape. | None | `https://mcp.packrift.com/mcp` |
| [Packwise Checklist](plugins/packing-checklist) | Check, count & print packing. | None | `https://packing-checklist.zovo.one/mcp` |
| [PadConsole](plugins/padconsole) | Game night ideas for groups. | None | `https://padconsole.com/mcp` |
| [PadelTrue Racket Finder](plugins/padeltrue-racket-finder) | Sourced padel racket specs. | None | `https://padeltrue.com/mcp` |
| [Padlet](plugins/padlet) | Create and manage padlets. | OAuth | `https://mcp.padlet.com/` |
| [Page Pulse](plugins/page-pulse) | Track SEO and page changes. | OAuth | `https://app.pagepulse.dev/mcp` |
| [Page2AI](plugins/page2ai) | Public web page to Markdown. | None | `https://page2ai-mcp-remote.vercel.app/api/mcp` |
| [PageJoy](plugins/pagejoy) | Edit PDFs, invoices and photos. | OAuth | `https://pagejoy.app/mcp` |
| [pagent](plugins/pagent) | Optimize website experiments. | OAuth | `https://app.pagent.ai/api/mcp` |
| [PagerDuty (API key)](plugins/pagerduty-api-key) | PagerDuty MCP server for Reason - manage incidents, services, schedules, on-call, and more directly from your IDE. | API key | `https://mcp.pagerduty.com/mcp` |
| [PageShare](plugins/pageshare) | Share & Protect generated HTML. | OAuth | `https://mcp.pageshare.ai/mcp` |
| [PaidSync](plugins/paidsync) | Run Google Ads, Meta, LinkedIn. | OAuth | `https://mcp.paidsync.ai/mcp` |
| [Paint Power Project Planner](plugins/paint-power-project-planner) | Plan painting & remodeling. | None | `https://mcp.paintpower.net/mcp` |
| [Pairloop Doubles Mixer](plugins/doubles-mixer) | Rotate partners, print & score. | None | `https://doubles-mixer.zovo.one/mcp` |
| [PakBus](plugins/pakbus) | Pakistan bus routes and times. | None | `https://pakbus.app/mcp` |
| [Palisade](plugins/palisade) | Monitor email deliverability. | OAuth | `https://api.palisade.email/mcp` |
| [PampaIA.AR](plugins/pampaia-ar) | Official Argentine farm data. | OAuth | `https://pampaia.ar/mcp` |
| [PANDA Tierversicherung](plugins/panda-tierversicherung) | Non-binding quote estimator. | None | `https://panda-gpt-app-mcp-app-ghcwgtgth0bjh3bz.canadacentral-01.azurewebsites.net/mcp` |
| [PandaChef](plugins/pandachef) | Recipes, pantry & meal plans. | OAuth | `https://99pandas.de/mcp` |
| [PandaDoc](plugins/pandadoc) | Send documents for signature. | OAuth | `https://mcp.pandadoc.com/v1/mcp` |
| [Panderr](plugins/panderr) | Migrate and edit websites. | None | `https://panderr.com/mcp` |
| [Pandy Tickets](plugins/pandy-tickets) | Find and host Guatemala events. | None | `https://tickets.pandy.cloud/mcp` |
| [Pane](plugins/pane) | Chat with Your Finances. | OAuth | `https://mcp.pane.money/mcp` |
| [Pantry Persona](plugins/pantry-persona) | Meal plans, recipes, grocery. | OAuth | `https://pantrypersona.com/mcp` |
| [Pantryfy](plugins/pantryfy) | Plan meals and shopping. | OAuth | `https://api.pantryfy.ai/mcp/` |
| [Papely](plugins/papely) | Generate PDFs from templates. | OAuth | `https://api.papely.app/api/integrations/mcp/v1` |
| [PaperAgent](plugins/paperagent) | Send real letters by USPS. | None | `https://paperagent.dev/mcp` |
| [PaperClerk](plugins/paperclerk) | Generate PDFs from templates. | OAuth | `https://usepaperclerk.com/api/mcp` |
| [PaperDock](plugins/paperdock) | Use your Reason for LaTeX. | OAuth | `https://app.paperdock.dev/api/mcp` |
| [Paperguide](plugins/paperguide) | Find, read & synthesize papers. | OAuth | `https://mcp.paperguide.ai/mcp` |
| [PaperOffice AI](plugins/paperoffice-ai) | The headless DMS for Reason. | OAuth | `https://mcp.paperoffice.ai/mcp` |
| [ParadeDB](plugins/paradedb) | ParadeDB adds Elastic-quality full-text search, vector retrieval, and aggregations to Postgres, with no second system to deploy and nothing to sync. | None | `https://docs.paradedb.com/mcp` |
| [Paragrafiq](plugins/paragrafiq) | Czech law, cases, sources. | OAuth | `https://www.paragrafiq.cz/api/mcp` |
| [Parallel](plugins/parallel) | Access Parallel financial data. | OAuth | `https://api.getparallel.com/mcp` |
| [Parallel Search](plugins/parallel-search) | Web search for AI. | None | `https://mcp.parallel.ai/mcp` |
| [Parcel](plugins/parcel) | Organize your job search. | OAuth | `https://workinparcel.com/mcp` |
| [Paribu](plugins/paribu) | Live crypto prices on Paribu. | None | `https://gpt-app.paribu.com/mcp` |
| [Parkinson's Pathways](plugins/parkinsons-pathways) | Find Parkinson's trials. | None | `https://parkinsonspathways.com/mcp?profile=chatgpt` |
| [Parks n Paws](plugins/parks-n-paws) | Find dog-friendly park stays. | None | `https://mcp.parksnpaws.com/mcp` |
| [Parks Open](plugins/parks-open) | Find campsites & day passes. | None | `https://parksopen.ca/api/mcp` |
| [Parky](plugins/parky) | Check park waits and hours. | None | `https://mcp.parkypass.com/mcp` |
| [Parliament Connect](plugins/parliament-connect) | Search UK Parliament clips. | OAuth | `https://parliamentconnect.com/api/mcp` |
| [Parra-Glideator](plugins/parra-glideator) | Plan your next flight. | None | `https://parra-glideator.com/mcp` |
| [ParrotNotes](plugins/parrotnotes) | Act on in-person notes. | OAuth | `https://mcp.parrotnotes.app/mcp` |
| [Parse](plugins/parse) | Free AI visibility lookups. | OAuth | `https://mcp.parse.gl/mcp` |
| [Parse.ly](plugins/parse-ly) | Query your content analytics. | OAuth | `https://dash.parsely.com/mcp` |
| [PartFinder](plugins/partfinder) | Industrial parts intelligence. | OAuth | `https://api.partfinder.dev/mcp` |
| [PartForge](plugins/partforge) | Design 3D models to print. | OAuth | `https://partforge.ai/mcp` |
| [Particl Market Research](plugins/particl-market-research) | Ecommerce market intelligence. | OAuth | `https://mcp.particl.com/mcp` |
| [Particle Pro](plugins/particle-pro-submission) | Podcast & company intelligence. | OAuth | `https://mcp.particle.pro/mcp` |
| [Partner.io](plugins/partner-io) | Run your partner program. | OAuth | `https://api.partner.io/mcp/partner` |
| [PartnerTap](plugins/partnertap) | Unlock agentic co-selling. | OAuth | `https://mcp.partnertap.com/mcp` |
| [PartsPerk](plugins/partsperk) | Aviation parts & RFQs. | None | `https://partsperk.com/mcp` |
| [Partwright](plugins/partwright) | Replacement & custom 3D parts. | OAuth | `https://partwright.app/mcp` |
| [PartyFun](plugins/partyfun) | Your team's live whiteboard. | OAuth | `https://partyfun.space/api/mcp` |
| [Partynado](plugins/partynado) | Find your next party. | None | `https://partynado.com/api/mcp` |
| [PartyPass](plugins/party-pass) | Host and share invitations. | None | `https://mcp.partypass.mx/mcp` |
| [Parvel](plugins/parvel) | Legislative monitoring data. | OAuth | `https://parvel.com/mcp` |
| [Passim AI](plugins/passim-ai) | U.S. immigration law research. | OAuth | `https://mcp.biaedge.com/mcp` |
| [Passito](plugins/passito) | Loyalty cards for businesses. | OAuth | `https://passito.app/mcp` |
| [PasskeyBridge](plugins/passkeybridge) | Identity alerts and audit logs. | OAuth | `https://mcp.passkeybridge.io/mcp` |
| [PassportCraft](plugins/passportcraft) | Create EU product passports. | OAuth | `https://passportcraft.com/api/mcp` |
| [PastPaperPrep](plugins/pastpaperprep) | Past-paper practice by topic. | None | `https://mcp.pastpaperprep.com/mcp` |
| [Patch CV](plugins/patch-cv) | Job match and CV answers. | OAuth | `https://patchcv.dev/mcp` |
| [Patch MCP](plugins/patch) | AI answering & outbound calls. | OAuth | `https://patchmcp.com/mcp` |
| [PatchDesign.AI](plugins/patchdesign-ai) | Design custom patches. | None | `https://patchdesign.ai/api/mcp` |
| [PatchOps](plugins/patchops) | Oil and gas data, with sources. | OAuth | `https://patchops.ai/mcp` |
| [Patent Bear](plugins/patent-bear) | Patent research and analysis. | None | `https://patentbear.com/mcp` |
| [Patent Connector](plugins/patent-connector) | Search patents & trademarks. | OAuth | `https://mcp.patent.dev/mcp` |
| [Patenta](plugins/patenta) | Search patents, find prior art. | OAuth | `https://mcp.patenta.ai/mcp` |
| [Pathline Project Planner](plugins/critical-path) | Critical tasks, slack & CSV. | None | `https://critical-path.zovo.one/mcp` |
| [Pathrule](plugins/pathrule) | Project memory, rules, skills. | OAuth | `https://mcp.pathrule.io/mcp` |
| [Patlytics](plugins/patlytics) | Search patents and literature. | OAuth | `https://mcp.patlytics.ai/mcp` |
| [Paul](plugins/paul) | The AI Slide Editor. | OAuth | `https://askpaul.app/api/mcp` |
| [PawsRx](plugins/pawsrx) | Find, book and ask a vet. | None | `https://pawsrx.io/mcp` |
| [Paxton Legal Research](plugins/paxton-legal-research) | Cited U.S. legal research. | OAuth | `https://mcp.paxton.ai/mcp` |
| [PayBox](plugins/paybox-plugin) | Swap and transfer tokens across chains, pay x402 services, take positions on prediction markets, and issue merchant-scoped virtual cards with PayBox custodial wallets. | OAuth | `https://api.paybox.sh/mcp` |
| [PayFresco Payment Planner](plugins/payfresco-payment-planner) | Currency and readiness plans. | None | `https://chatgpt.payfresco.com/mcp` |
| [PayPal](plugins/paypal) | Manage PayPal commerce operations; handle disputes; issue and send invoices; create orders, captures, and refunds; list transactions; track shipments; and manage subscriptions. | OAuth | `https://mcp.paypal.com/mcp` |
| [PayPerFax](plugins/payperfax) | Track the delivery of a fax. | None | `https://fax.payperfax.com/mcp` |
| [Pazy](plugins/pazy) | Find your funeral plan. | None | `https://pazy-mcp-vercel.vercel.app/mcp` |
| [PBN.LTD](plugins/pbn-ltd) | Manage your PBN hosting. | OAuth | `https://app.pbn.ltd/mcp` |
| [PCBKit](plugins/pcbkit) | Design circuit boards. | None | `https://mcp.pcbkit.io/mcp` |
| [PDF4me](plugins/pdf4me) | PDF done simple and online! | OAuth | `https://mcp.pdf4me.com/mcp` |
| [PDFHost](plugins/pdfhost) | Host and analyze PDFs. | OAuth | `https://pdfhost.se/mcp` |
| [PE or Not?](plugins/peornot) | Who owns your dentist or vet. | None | `https://peornot.org/mcp` |
| [PearSign](plugins/pearsign) | Sign PDFs and get signatures. | OAuth | `https://pearsign.com/api/mcp` |
| [Pedagrade](plugins/pedagrade) | Catches what AI misses. | OAuth | `https://app.pedagrade.com/mcp` |
| [Pedra](plugins/pedra) | Real estate video & staging. | OAuth | `https://app.pedra.ai/mcp` |
| [Peec AI](plugins/peec-ai) | Peec AI integration to analyze your brand's visibility across LLMs | OAuth | `https://api.peec.ai/mcp` |
| [PeerPush](plugins/peerpush) | Find & compare software tools. | None | `https://peerpush.com/api/mcp` |
| [Pegasus Airlines](plugins/pegasus-airlines) | Pegasus: Cheap Flight Tickets. | OAuth | `https://mcp.flypgs.com/mcp` |
| [Pegel: Jobs from the source](plugins/pegel-jobs) | Berlin, Hamburg & Munich roles. | None | `https://pegel.berlin/api/mcp` |
| [Peloton](plugins/peloton) | Discover Peloton workouts. | None | `https://mcp.onepeloton.com/mcp` |
| [Pendar](plugins/pendar) | Map & measure research fields. | OAuth | `https://pendar.ai/mcp` |
| [Pendo](plugins/pendo) | Pendo integration for product and user insights | OAuth | `https://app.pendo.io/mcp/v0/shttp` |
| [Penline Handwriting Sheets](plugins/handwriting-sheets) | Tracing sheets & lined paper. | None | `https://handwriting-sheets.zovo.one/mcp` |
| [Penlog](plugins/penlog) | Search your handwritten notes. | OAuth | `https://mcp.penlog.app/` |
| [Peptide Critic](plugins/peptide-critic) | Peptide reviews & prices. | None | `https://mcp.peptidecritic.com/mcp` |
| [PeptidePrices COA Verifier](plugins/peptideprices-coa-verifier) | Verify peptide COA evidence. | None | `https://api.peptideprices.net/mcp` |
| [Per Diem](plugins/per-diem) | Understand your money and FIRE. | OAuth | `https://api.perdiem.app/mcp` |
| [PerceptionX](plugins/perceptionx) | AI Employer Brand Intelligence. | OAuth | `https://app.perceptionx.ai/mcp` |
| [Perchli Property Search](plugins/perchli-property-search) | Search NI Properties. | None | `https://mcp.perchli.com/mcp` |
| [PerfectPost](plugins/perfectpost) | LinkedIn stats and scheduling. | OAuth | `https://mcp.perfectpost.social/mcp` |
| [PerfectSens](plugins/perfectsens) | FPS sensitivity and aim tests. | None | `https://mcp.perfectsens.com/mcp` |
| [Perfex CRM](plugins/rest-api-for-perfex-crm) | Work with your Perfex CRM data. | OAuth | `https://perfex-mcp.themesic.com/mcp` |
| [Perfume Picks](plugins/perfume-picks) | Fragrance dupes and picks. | None | `https://mcp.perfumepicks.app/mcp` |
| [Perigee Fishing](plugins/perigee-fishing) | Plan better fishing sessions. | None | `https://perigeetides.com/mcp` |
| [Perigon](plugins/perigon) | News and social research. | OAuth | `https://mcp.perigon.io/v1/mcp` |
| [PerilScore](plugins/perilscore) | Score natural catastrophe risk. | OAuth | `https://app.perilscore.com/mcp` |
| [Perisclaw](plugins/perisclaw) | Your AI assistant on WhatsApp. | OAuth | `https://api.perisclaw.com/mcp` |
| [Peristyle Grocery Cart](plugins/peristyle-grocery-cart) | Recipes into a grocery cart. | OAuth | `https://mcp.peristyle.io/mcp` |
| [Permit Plotter](plugins/permit-plotter) | East End building permits. | OAuth | `https://mcp.permitplotter.com/mcp` |
| [PermitSnag](plugins/permitsnag-lookup) | US permit and campsite lookup. | None | `https://api.permitsnag.com/mcp` |
| [Personyze](plugins/personyze) | Manage web personalization. | OAuth | `https://personyze.com/mcp` |
| [Perspective AI](plugins/perspective-ai) | An AI Concierge replaces static forms with adaptive AI conversations that understand real situations, structure key information automatically, and trigger the right next step. | OAuth | `https://getperspective.ai/mcp` |
| [Peskio](plugins/peskio) | Tides and fishing conditions. | None | `https://peskio.com/mcp` |
| [Pestless](plugins/pestless) | Miami pest control quotes. | None | `https://pestless.us/mcp` |
| [Pet Insurance Comparison](plugins/pet-insurance-comparison) | Find insurance for pets. | None | `https://fletch-mcp-server.fletch.co/mcp/fletchpet` |
| [Pet Project Co-Founder AI](plugins/pet-project-co-founder-ai) | Validate Ideas with Real Data. | None | `https://petprojectcofounder.ai/mcp` |
| [Petalie](plugins/petalie) | Public TikTok account stats. | None | `https://petalie.ai/mcp` |
| [PetGPT - Dog & Cat Insurance](plugins/petgpt-dog-and-cat-insurance) | Compare dog & cat insurance. | None | `https://petgpt-backend.onrender.com/mcp` |
| [Pethost](plugins/pethost) | Deploy and host your projects. | OAuth | `https://mcp.pethost.dev/mcp` |
| [Petipa](plugins/petipa) | Your plan, one step at a time. | OAuth | `https://petipa.app/mcp` |
| [Petlume](plugins/petlume) | Pet toys & supplies store. | None | `https://petlume.zen7.com/mcp` |
| [PetPals](plugins/petpals) | Pet toys & supplies store. | None | `https://platform.zen7.com/mcp` |
| [Pexafy Stock Photos](plugins/pexafy-stock-photos) | Find free-to-use stock photos. | None | `https://pexafy.com/mcp/` |
| [PFT Edgebook - Trading Journal](plugins/pft-edgebook-trading-journal) | AI-ready trading journal. | OAuth | `https://pft-edgebook-mcp.insider-f82.workers.dev/mcp` |
| [pg-aiguide](plugins/pg-aiguide) | pg-aiguide integration to search Postgres and Tiger docs and learn database skills | None | `https://mcp.tigerdata.com/docs` |
| [PGA – Play Golf](plugins/pga-play-golf) | Find a golf coach. | None | `https://mcp.pga.com/mcp` |
| [PGicover](plugins/pgicover) | Personal guarantee insurance. | None | `https://chatgpt-mcp.pgicover.com/mcp` |
| [PGrid PC Parts & Laptop Prices](plugins/pgrid-pc-parts-and-laptop-prices) | Laptops, GPUs, CPUs, SSDs, RAM. | None | `https://www.pgrid.app/mcp` |
| [Phantom](plugins/phantom-connect) | Give your agent a wallet. | None | `https://docs.phantom.com/mcp` |
| [Phantra AI](plugins/phantra-ai) | AI images and video, in chat. | OAuth | `https://api.phantra.ai/mcp` |
| [Phish.in](plugins/phish-in) | Live Phish audio archive. | None | `https://phish.in/mcp` |
| [Phoenix by HG Insights](plugins/phoenix) | Phoenix by HG Insights integration for B2B data intelligence and analytics | OAuth | `https://phoenix.hginsights.com/api/ai/mcp` |
| [Phone.inc](plugins/phone-inc) | Your business calls in Reason. | OAuth | `https://app.phone.inc/mcp` |
| [Photo AI Studio](plugins/photo-ai-studio) | AI headshots from your photos. | None | `https://www.photoaistudio.com/api/mcp` |
| [Photo Wiki](plugins/photo-wiki) | Answers from your saved photos. | OAuth | `https://photowiki.app/mcp` |
| [Photo9](plugins/photo9) | Design and Print Photo books. | None | `https://photonine.ai/api/mcp` |
| [Photon Commerce](plugins/photon-commerce) | Document AI OCR HITL Labeling. | None | `https://mcp.photoncommerce.com/mcp` |
| [Physical AI Jobs](plugins/physical-ai-jobs) | Find Physical AI jobs. | None | `https://physicalai.jobs/mcp` |
| [Pi Security](plugins/pi-security) | Use Pi Security in Reason IDE to investigate findings, review security posture, plan remediation, and get guidance while you build. | OAuth | `https://mcp.pi.security/mcp` |
| [Piazza in Festa](plugins/piazza-in-festa) | Italian town events and fairs. | None | `https://piazzainfesta.it/mcp` |
| [Picardo Supplements](plugins/picardo-supplements) | Combine supplements into one. | None | `https://mcp.picardo.health/mcp` |
| [Pick My Costume](plugins/pick-my-costume) | Costumes from your closet. | None | `https://mcp.pickmycostume.com/mcp` |
| [Pick your match](plugins/pick-your-match) | Find your exact accommodation. | None | `https://mcp.pickyourmatch.com/mcp` |
| [Pickadate](plugins/pickadate) | Find a date with any group. | OAuth | `https://pickadate.net/mcp` |
| [pickaru](plugins/pickaru) | Swipe together, pick tonight. | None | `https://pickaru.com/mcp` |
| [Pickaxe](plugins/pickaxe) | Build and manage AI agents. | OAuth | `https://mcp.pickaxe.co/` |
| [PickedBy](plugins/pickedby) | What your friends recommend. | OAuth | `https://pickedby.app/mcp` |
| [PickFu](plugins/pickfu) | Test ideas with real people. | OAuth | `https://mcp.pickfu.com/mcp` |
| [Pickleheads](plugins/pickleheads) | Find and organize pickleball. | OAuth | `https://mcp.pickleheads.com/mcp` |
| [pickthehotel](plugins/pickthehotel) | Find Hotels. | None | `https://pickthehotel.com/mcp` |
| [PicsArt](plugins/picsart) | Picsart generative-AI skills for Reason. | None | `https://mcp.picsart.io/v1` |
| [Picsel](plugins/picsel) | Find your event photos/videos. | None | `https://mcp.picsel.app/mcp` |
| [PictureBooks](plugins/picturebooks) | Create illustrated storybooks. | OAuth | `https://picturebooks.io/mcp` |
| [Pierview](plugins/pierview) | AI search visibility metrics. | OAuth | `https://mcp.pierview.ai/` |
| [PieterPost](plugins/pieterpost) | Send letters, postcards, cards. | None | `https://pieterpost.com/mcp/public/` |
| [Piezas](plugins/piezas) | Build and host business apps. | OAuth | `https://mcp.piezas.ai/mcp` |
| [PiggyTask](plugins/piggytask) | Manage kids' family chores. | OAuth | `https://app.piggytask.de/api/integrations/llm/mcp` |
| [Pika](plugins/pika) | Make video, images and sound. | OAuth | `https://mcp.pika.art/mcp` |
| [Pikes](plugins/pikes) | Your brand creative suite. | OAuth | `https://pikes.ai/mcp` |
| [Pillr](plugins/pillr) | Get French real estate data. | None | `https://pillr.fr/api/mcp` |
| [Pilot](plugins/pilot) | Search hotels, book on Pilot. | None | `https://mcp.pilotplans.com/mcp` |
| [PilotControl](plugins/pilotcontrol) | Manage social media in Reason. | OAuth | `https://app.pilot0.app/api/mcp` |
| [Piloxa — Certified Mail](plugins/piloxa-certified-mail) | Send letters by Certified Mail. | None | `https://piloxa.com/mcp` |
| [Pinateca](plugins/pinateca) | Read and update task boards. | OAuth | `https://pinateca.com/mcp` |
| [Pinbridge](plugins/pinbridge) | Easily publish to Pinterest. | OAuth | `https://mcp.pinbridge.io/mcp` |
| [Pine Assistant](plugins/pine-assistant) | Delegate real-world tasks. | OAuth | `https://mcp.pine.im/mcp` |
| [Pine Labs Payment Assistant](plugins/pine-labs-payment-assistant) | Know your payments better. | OAuth | `https://mcp.pinelabs.com/mcp` |
| [Pineprompt](plugins/pineprompt) | AI search visibility tracking. | OAuth | `https://pineprompt.com/mcp` |
| [Pinflower](plugins/pinflower) | Flower delivery in Prague. | None | `https://pinflower.cz/api/mcp` |
| [PingRoom](plugins/pingroom) | Ask people via push. | OAuth | `https://api.pingroom.io/api/agent/mcp` |
| [PINOC](plugins/pinoc) | 3D characters and motion. | OAuth | `https://pinoc.mcp.viggle.ai/mcp` |
| [Pinpal Projects](plugins/pinpal-projects) | Simple projects for you and AI. | OAuth | `https://projects.mypinpal.com/mcp` |
| [Pinto Notes](plugins/pinto-notes) | Read and edit your notes. | OAuth | `https://mcp.pintonotes.com/` |
| [pipe0](plugins/pipe0) | Find, enrich & automate leads. | OAuth | `https://api.pipe0.com/v1/mcp` |
| [Pipecorn](plugins/pipecorn) | B2B sales intelligence. | OAuth | `https://mcp.pipecorn.com/mcp` |
| [Pitch 1024](plugins/pitch-1024) | Reference pitches, real voices. | None | `https://mcp.pitch1024.com/mcp` |
| [Pixara](plugins/pixara) | Create images, video and audio. | OAuth | `https://mcp.pixara.ai/mcp` |
| [Pixel Engine](plugins/pixel-engine) | Pixel art sprites & animations. | OAuth | `https://api.pixelengine.ai/functions/v1/mcp` |
| [Pixelesq](plugins/pixelesq) | Build and manage websites. | OAuth | `https://mcp.pixelesq.app/mcp` |
| [PixVerse](plugins/pixverse-ai) | Your AI video and image studio. | OAuth | `https://mcp.pixverse.ai/mcp` |
| [PlaceCall](plugins/placecall) | Calls US businesses for you. | OAuth | `https://api.voygr.tech/mcp` |
| [Plain](plugins/plain) | Manage support threads, customers, and help articles. | OAuth | `https://mcp.plain.com/mcp` |
| [Plain Freight](plugins/plain-freight) | China to USA shipping quotes. | None | `https://plainfreight.com/api/mcp` |
| [Planable](plugins/planable) | Manage all your social content. | OAuth | `https://mcp.planable.io/mcp` |
| [PlanetScale](plugins/planetscale) | Access PlanetScale databases, insights, and schema recommendations through PlanetScale's hosted MCP server. | OAuth | `https://mcp.pscale.dev/mcp/planetscale` |
| [PlaneWX](plugins/planewx) | Aviation weather for pilots. | OAuth | `https://app.planewx.ai/api/mcp` |
| [Planifly](plugins/planifly) | Plan social posts & analytics. | OAuth | `https://mcp.planifly.app/mcp` |
| [Planit Teachers](plugins/planit-teachers) | Create classroom resources. | None | `https://planitteachers.ai/mcp` |
| [Planned](plugins/planned) | Plan and manage events. | OAuth | `https://mcp.planned.com/mcp` |
| [Planning Center](plugins/planning-center) | Interact with your church data. | OAuth | `https://mcp.planningcenteronline.com/mcp` |
| [Planoora](plugins/planoora) | Book local appointments. | None | `https://planoora.com/mcp` |
| [Plate](plugins/plate) | Project management for teams. | OAuth | `https://plate.to/mcp` |
| [Plateful](plugins/plateful) | Search and save your recipes. | OAuth | `https://mcp.plateful.cloud/mcp` |
| [PlateLens](plugins/platelens) | PlateLens AI calorie insights. | OAuth | `https://mcp.platelens.app/mcp` |
| [PlatoForms](plugins/platoforms) | Find forms and submissions. | OAuth | `https://mcp.platoforms.com/` |
| [Plaud](plugins/plaud) | Work with your Plaud recordings: list and search meetings and voice notes, read full transcripts with speaker labels, and pull AI summaries, action items, and key topics into your workflow. | OAuth | `https://mcp.plaud.ai/mcp` |
| [Play Face to Face](plugins/play-face-to-face) | Play games with friends. | None | `https://mcp.playfacetoface.com/mcp` |
| [Playbook](plugins/playbook) | Find and organize your assets. | OAuth | `https://mcp.playbook.com/mcp` |
| [PlaybookUX](plugins/playbookux) | Launch and analyze UX research. | OAuth | `https://mcp.playbookux.com/mcp` |
| [PlayDrop](plugins/playdrop) | Build, test and share games. | OAuth | `https://mcp.playdrop.ai/mcp` |
| [Playlistable](plugins/playlistable) | AI playlists, Spotify/Apple. | OAuth | `https://mcp.playlistable.io/` |
| [playout.video](plugins/playout-video) | Run 24/7 live streams. | OAuth | `https://playout.video/api/mcp` |
| [Playyy](plugins/playyy) | Designs, slides and websites. | OAuth | `https://mcp.playyy.ai/mcp` |
| [PLAZA Hotels](plugins/plaza-hotels) | PLAZA hotel info and booking. | None | `https://mcp.plazahotels.de/mcp` |
| [Pleadwise](plugins/pleadwise) | Format legal filings. | None | `https://mcp.pleadwise.com/mcp` |
| [Pledr Legal](plugins/pledr-legal) | Cited Supreme Court judgments. | OAuth | `https://mcp.pledr.in/mcp` |
| [Plendio](plugins/plendio) | Compare prices across shops. | None | `https://plendio.com/mcp` |
| [Plixlab](plugins/plixlab) | Executable presentations. | OAuth | `https://mcp.plixlab.com/mcp` |
| [Plnty](plugins/plnty) | Make, edit, animate pictures. | OAuth | `https://mcp.plnty.app/mcp` |
| [Plota: Planning Applications](plugins/plota-planning-applications) | UK planning permission search. | OAuth | `https://api.plota.co.uk/v1/mcp` |
| [Plugins Radar](plugins/plugins-radar) | Insights for plugin makers. | None | `https://pluginsradar.com/mcp` |
| [PlumTally](plugins/plumtally) | Meal-based grocery shopping. | None | `https://api.plumtally.com/mcp` |
| [Plus AI](plugins/plus-ai) | PowerPoint presentation agent. | OAuth | `https://mcp.plusai.com/` |
| [Plushcap](plugins/plushcap) | Developer & AI trends. | OAuth | `https://mcp.plushcap.com/mcp` |
| [Plutus Funder Research](plugins/plutus-funder-research) | Explore alternative funders. | None | `https://plutusai.net/mcp/funders` |
| [PlyMove](plugins/plymove) | Elo-aware chess storyboards. | None | `https://mcp.plymove.com/mcp` |
| [Po Once](plugins/po-once) | Schedule and publish posts. | OAuth | `https://po-once.com/mcp` |
| [Pocket Bartender](plugins/pocket-bartender) | Cocktail Recipe & Mixology App. | None | `https://mcp.pocketbartender.app/mcp` |
| [Pocket Informant](plugins/pocket-informant) | Plan tasks, events, and notes. | OAuth | `https://mcp.pocketinformant.com/mcp` |
| [Pocket Ledger Expense Tracker](plugins/pocket-ledger-expense-tracker) | Expense & budget tracker chat. | OAuth | `https://pocketledger.baronsa.dev/mcp` |
| [Pocket Runway](plugins/pocket-runway) | Know What’s Safe Until Payday. | OAuth | `https://pocketrunway.com/mcp` |
| [PocketBuddy](plugins/pocketbuddy) | Spending, budgets & net worth. | None | `https://pocketbuddy.org/mcp` |
| [PocketSmith Complete Access](plugins/pocketsmith-complete-access) | Manage personal finances. | OAuth | `https://mcp.pocketsmith.com/mcp` |
| [Pod](plugins/pod) | Reviews from people and agents. | None | `https://api.askpod.ai/mcp/read` |
| [Podigee](plugins/podigee) | Manage your podcasts. | OAuth | `https://mcp.podigee.com/mcp` |
| [Podwise](plugins/podwise) | Search and summarize podcasts. | OAuth | `https://mcp.podwise.ai/mcp` |
| [Point Topic](plugins/point-topic) | UK broadband market reference. | OAuth | `https://mcp.point-topic.com/mcp` |
| [PointBagel](plugins/pointbagel) | Credit card rewards & points. | OAuth | `https://pointbagel.com/api/mcp` |
| [Pointer](plugins/pointer) | Build and run automations. | OAuth | `https://api.pointer.ai/mcp` |
| [PokeBot.ai Career Coach](plugins/pokebot-ai-career-coach) | Resume, interview, job prep. | None | `https://mcp.pokebot.ai/mcp` |
| [PokeFocus](plugins/pokefocus) | Pokémon card & sealed prices. | None | `https://pokefocus.com/api/mcp` |
| [Pokeka](plugins/pokeka) | Graded Pokemon card prices. | None | `https://pokeka.xyz/mcp` |
| [Polar](plugins/polar) | Payments and billing for apps. | OAuth | `https://mcp.polar.sh/mcp/polar-mcp` |
| [PolicyNote](plugins/policynote) | Search global policy data. | OAuth | `https://data.policynote.com/v0/mcp` |
| [Pollo AI](plugins/pollo-ai) | Create videos, images, designs. | OAuth | `https://mcp.pollo.ai/mcp` |
| [PollUnit](plugins/pollunit-mcp) | Create polls with AI. | OAuth | `https://pollunit.com/mcp` |
| [Polyarchy Company Filings](plugins/polyarchy-companies) | Japanese company filings data. | OAuth | `https://companies.polyarchy.net/mcp` |
| [Polylane](plugins/polylane) | Investigate production issues. | OAuth | `https://mcp.polylane.com/mcp` |
| [PomoDial](plugins/pomodial) | Focus timer with saved history. | OAuth | `https://pomodial.com/mcp` |
| [Ponito](plugins/ponito) | Compare products and prices. | None | `https://www.ponito.com/mcp` |
| [Pool Chemical Dose Calculator](plugins/pool-chemical-dose-calculator) | Exact pool chemical doses. | None | `https://mcp.cyanaqua.com/mcp` |
| [Poolday](plugins/poolday) | AI video editing and media. | OAuth | `https://mcp.poolday.ai/` |
| [Popl](plugins/popl) | Enrich and analyze event data. | OAuth | `https://mcp.popl.co/mcp` |
| [Poredi.ba](plugins/poredi-ba) | Uporedi cijene u BiH. | None | `https://poredi.ba/mcp` |
| [Port](plugins/port) | Connect to Port's agentic SDLC platform in natural language: query the Context Lake, orchestrate workflows, manage agents, and enforce governance. | OAuth | `https://mcp.port.io/v1` |
| [PortalBase](plugins/portalbase) | Your team's work and records. | OAuth | `https://portalbaseai.com/mcp` |
| [Porter Metrics](plugins/porter-metrics) | Analyze ad and sales data. | OAuth | `https://mcp.portermetrics.com/mcp` |
| [PortfolioFit](plugins/portfoliofit) | Agent-first portfolio analysis. | OAuth | `https://portfolio.fit/mcp` |
| [PortfolIQ](plugins/portfoliq) | Track portfolio performance. | OAuth | `https://portfoliq.app/mcp` |
| [Portravo](plugins/portravo) | Review plan takeoffs. | None | `https://portravo.com/mcp` |
| [PositionGuard](plugins/positionguard) | Presence with privacy controls. | OAuth | `https://mcp.positionguardai.com/mcp` |
| [Positive Signitic](plugins/signitic) | Manage Signitic workspaces. | OAuth | `https://mcp.signitic.com/mcp` |
| [POSKIA](plugins/poskia) | Consulta y pide domicilios. | None | `https://poskia.com/mcp` |
| [Post Metadata Extractor](plugins/post-metadata-extractor) | Extract social post fields. | None | `https://task-app-hub-content-chain.belong514829670.workers.dev/social-post-metadata-extractor/mcp` |
| [PostAxis](plugins/postaxis) | Schedule social media posts. | OAuth | `https://postaxis.io/api/mcp` |
| [Postbeam](plugins/postbeam) | Draft and review posts. | OAuth | `https://app.postbeam.ai/mcp` |
| [PostCo](plugins/postco) | Analyze your returns data. | OAuth | `https://mcp.postco.co/mcp` |
| [PostDashPro](plugins/postdashpro) | Social post scheduling. | OAuth | `https://postdashpro.com/api/mcp` |
| [poste — Slovenian post offices](plugins/poste) | Post office hours (unofficial). | None | `https://poste.cc/mcp` |
| [Postedly](plugins/postedly-correspondence) | Review mail, fax and cards. | OAuth | `https://postedly.com/mcp/send` |
| [Poster Maker](plugins/poster-maker) | Design posters and flyers. | None | `https://mcp.posterapplab.com/mcp` |
| [posterly](plugins/posterly-openai) | Schedule social posts. | OAuth | `https://www.poster.ly/api/mcp` |
| [PosterMyWall](plugins/postermywall) | Find design templates. | None | `https://mcp.postermywall.com/mcp` |
| [PostEverywhere](plugins/posteverywhere) | Schedule social media posts. | OAuth | `https://mcp.posteverywhere.ai/mcp` |
| [Postey](plugins/postey) | Draft & schedule social posts. | OAuth | `https://mcp.postey.ai/mcp` |
| [Posthive](plugins/posthive) | Post to multi social platforms. | API key | `https://api.posthive.co/mcp` |
| [PostHog](plugins/posthog) | Query PostHog product analytics: events, insights, and feature flags. | OAuth | `https://mcp.posthog.com/mcp` |
| [Postify](plugins/postify) | Draft and schedule posts. | OAuth | `https://app.usepostify.com/api/mcp` |
| [Postiv AI](plugins/postiv-ai) | Create & manage social content. | OAuth | `https://postiv.ai/mcp` |
| [Postlyra](plugins/postlyra) | Format & publish to Telegram. | OAuth | `https://postlyra.app/mcp` |
| [Postman](plugins/postman) | Postman integration to give API context to your coding agents | OAuth | `https://mcp.postman.com/minimal` |
| [PostNitro](plugins/postnitro) | Design. Schedule. Publish. | OAuth | `https://mcp.postnitro.ai/mcp` |
| [PostPlanify](plugins/postplanify) | Social media management. | OAuth | `https://api.postplanify.com/api/mcp` |
| [Postroom](plugins/yet-postroom) | Plan, schedule and track posts. | OAuth | `https://social.notacompanynameyet.com/mcp` |
| [PostSpread](plugins/postspread) | Schedule social media posts. | OAuth | `https://mcp.postspread.com/mcp` |
| [PostSyncer](plugins/postsyncer) | Schedule social media posts. | OAuth | `https://postsyncer.com/mcp` |
| [PostWire for Social Media](plugins/postwire-social) | Schedule social media posts. | None | `https://postwire.io/api/mcp` |
| [Posty: Social Media Scheduler](plugins/posty-social-media-scheduler) | Schedule social media posts. | OAuth | `https://api.posty.hu/mcp` |
| [PostYourStartup](plugins/postyourstartup) | Discover and launch startups. | None | `https://postyourstartup.co/mcp` |
| [PostZen](plugins/postzen) | Publish and analyze posts. | OAuth | `https://mcp.postzen.dev/mcp` |
| [Potion](plugins/potion) | A podcast just for you. | OAuth | `https://api.withpotion.io/mcp` |
| [Povver](plugins/povver) | Strength training with AI. | OAuth | `https://mcp.povver.ai/mcp` |
| [Powerly](plugins/powerly) | Build branded charging apps. | None | `https://mcp.powerly.app/mcp` |
| [Powly](plugins/powly) | Ski resorts & snow in the Alps. | None | `https://mcp.powly.de/mcp` |
| [PPC Ad Sweep](plugins/ppcadsweep) | Review Amazon PPC waste. | None | `https://ppcadsweep.com/mcp` |
| [PPCMax](plugins/ppcmax) | Manage Google Ads. | OAuth | `https://mcp.ppcmax.pro/mcp` |
| [PPL Free Ground School](plugins/ppl-free-ground-school) | Free FAA pilot ground school. | None | `https://pplfree.com/mcp` |
| [PR Readiness Check](plugins/pr-readiness-check) | Check PR review readiness. | None | `https://pr-readiness-check.sidcraigau.workers.dev/mcp` |
| [PracticPro](plugins/practicpro) | The CRM for service businesses. | OAuth | `https://mcp.practicpro.com/mcp` |
| [Praetor Health](plugins/praetor-health) | Find and compare blood tests. | None | `https://mcp.praetor.health/api/mcp` |
| [Praetorium](plugins/praetorium) | Warhammer 40K army builder. | OAuth | `https://praetorium.gg/mcp` |
| [Praxeum](plugins/praxeum) | Political ideas, sourced. | None | `https://praxeum.hu/mcp` |
| [Praxikon](plugins/praxikon) | EU AI Act and GDPR checks. | None | `https://www.praxikon.com/api/mcp` |
| [Praxis](plugins/praxis-veterinary-insights) | Practice checks and insights. | OAuth | `https://praxisvets.com/mcp` |
| [Pray Production Studio](plugins/pray-production-studio) | AI Generative Video Studio. | OAuth | `https://prayproductionstudio.com/api/mcp` |
| [PrecioReal](plugins/precioreal) | Compare prices in Spain. | None | `https://precioreal.com/mcp` |
| [Precise Special Functions](plugins/precise-special-functions) | High-precision math functions. | None | `https://bessel-eval-poc.fly.dev/mcp` |
| [PredictHQ](plugins/predicthq) | See what's driving your demand. | OAuth | `https://mcp.predicthq.com/v1/mcp` |
| [PredictionScan](plugins/predictionscan) | Prediction market data. | None | `https://mcp.predictionscan.org/mcp` |
| [PredictLeads](plugins/predictleads) | Structured company signals. | OAuth | `https://mcp.predictleads.com/` |
| [Predis.ai](plugins/predis-ai) | Make Ads Videos, UGC with AI. | OAuth | `https://mcp.predis.ai/mcp` |
| [Prehrana](plugins/prehrana) | Log meals by describing them. | OAuth | `https://prehrana.app/mcp` |
| [Premom Ovulation Calculator](plugins/premom-ovulation-calculator) | Find fertile days & ovulation. | OAuth | `https://mcp.premom.com/mcp` |
| [Preply Language Tutor Finder](plugins/preply-language-tutor-finder) | Find language tutors. | None | `https://preply.com/mcp` |
| [PrepSim Exam Practice](plugins/prepsim-exam-practice) | Exam practice and test review. | None | `https://aynadhillon.com/api/mcp` |
| [Prepublish](plugins/prepublish) | Audit YouTube scripts. | None | `https://mcp.prepublish.ai/mcp` |
| [Presentation Maker by Slaide](plugins/slaide) | PowerPoint AI slides generator. | OAuth | `https://app.slaide.de/api/mcp` |
| [PreShiftIQ](plugins/preshiftiq) | Supply chain vendor selection. | None | `https://mcp.preshiftiq.com/mcp` |
| [Pressure Atlas](plugins/pressure-atlas) | Macro pressure context for AI. | OAuth | `https://api.pressureatlas.com/mcp` |
| [Pretto](plugins/pretto) | Finance your home in France. | None | `https://mcp.production.pretto.fr/mcp` |
| [Pretty](plugins/pretty-presentations) | Design PowerPoint slides. | OAuth | `https://api.make-pretty.com/mcp` |
| [Preuve AI - Startup Validation](plugins/preuve-ai-startup-validation) | Validate & score startup ideas. | OAuth | `https://mcp.preuve.ai/mcp` |
| [PreVibe](plugins/previbe) | Validate your SaaS idea. | OAuth | `https://previbe.io/api/mcp` |
| [PreyReach](plugins/preyreach) | Find and save business leads. | OAuth | `https://mcp.preyreach.com/mcp` |
| [PriceBee](plugins/pricebee) | Baltic prices and mobile plans. | None | `https://pricebee.lt/mcp/pricebee` |
| [Priceluma: Compare Prices](plugins/priceluma) | New and secondhand prices. | None | `https://mcp.priceluma.com/mcp` |
| [Pricewatcha](plugins/pricewatcha) | Product price analytics. | None | `https://mcp.pricewatcha.com/mcp` |
| [Pricewin Hotels & Flights](plugins/pricewin-hotels-and-flights) | Compare live travel prices. | None | `https://mcp.price.win/mcp` |
| [Primary](plugins/primary) | Financial MCP integration. | OAuth | `https://papi.primary.tech/mcp` |
| [primaTime](plugins/primatime) | Track time and manage work. | OAuth | `https://mcp.primatime.com/mcp` |
| [Primitive](plugins/primitive) | Email for AI agents. | OAuth | `https://primitive.dev/mcp` |
| [Print Ready](plugins/print-ready) | Design useful printable parts. | None | `https://printreadyparts.com/mcp` |
| [Print Shop by BYB](plugins/print-shop-by-byb) | Turn images into stickers. | None | `https://mcp.bottleyourbrand.com/mcp` |
| [PrintA](plugins/printa) | Print your image on a shirt. | None | `https://printa.chat/mcp` |
| [Printable Calendar Maker](plugins/printable-calendar) | Print-ready calendar PDFs. | None | `https://printable-calendar.zovo.one/mcp` |
| [PrintFriendly](plugins/printfriendly) | Print and save clean web pages. | OAuth | `https://www.printfriendly.com/v2/mcp` |
| [PrintGen](plugins/printgen) | Create personalized apparel. | OAuth | `https://mcp.printgen.ai/mcp` |
| [PrintMap](plugins/printmap) | Map posters of any place. | None | `https://printm.app/mcp` |
| [PrintTiler](plugins/printtiler) | Create tiled poster layouts. | None | `https://printtiler.com/mcp` |
| [Prisma](plugins/prisma) | Manage Prisma Postgres databases; create, list, and restore backups; generate and revoke connection strings; execute SQL queries and introspect schemas. | OAuth | `https://mcp.prisma.io/mcp` |
| [Private PDF Tools](plugins/private-pdf-tools) | Edit PDF files privately. | None | `https://mcp.ailabtools.work/mcp` |
| [PrivateAuto](plugins/privateauto) | Shop used cars. | None | `https://mcp.privateauto.com/mcp` |
| [PrivateJet.com](plugins/privatejet-com) | Private jet charter quote. | OAuth | `https://mcp.privatejet.com/mcp` |
| [PrivJet](plugins/privjet) | Find empty leg flights. | None | `https://mcp.privjet.net/mcp` |
| [ProBeauty AI](plugins/probeauty-ai) | Your salon's front desk. | OAuth | `https://app.probeauty.ai/api/mcp` |
| [Process Documentation AI](plugins/process-documentation-ai) | By Tallyfy. Free. | OAuth | `https://mcp.tallyfy.com/mcp` |
| [Product Link Expander](plugins/product-link-expander) | Expand product links. | None | `https://amazon-expander.ccdesign.workers.dev/mcp` |
| [Product Listing Validator](plugins/product-listing-validator) | Check listing fields. | None | `https://product-listing-validator.sidcraigau.workers.dev/mcp` |
| [Product Photo Finder](plugins/product-photo-finder) | Photos for branded products. | OAuth | `https://app.productphotofinder.com/mcp` |
| [Production List](plugins/production-list) | Who's filming what, and where. | None | `https://api.productionlist.com/mcp` |
| [Productive](plugins/productive) | Run your work in one place. | OAuth | `https://mcp.productive.io/mcp` |
| [ProductNow](plugins/productnow) | Search your context engine. | OAuth | `https://api.productnow-prod.com/mcp` |
| [ProdVerity](plugins/prodverity) | Verify production releases. | OAuth | `https://greatskillsacademy.com/mcp` |
| [ProfitBooks](plugins/profitbooks) | Talk to your bookkeeper. | OAuth | `https://mcp.profitbooks.ai/mcp` |
| [ProfitPilot](plugins/dijitalpilot-profitpilot) | Campaign cost calculator. | None | `https://profitpilot-dijitalpilot.vercel.app/mcp` |
| [Profound](plugins/profound) | Track AI visibility, sentiment, and citations. | OAuth | `https://mcp.tryprofound.com/mcp` |
| [Prognyx oncology intelligence](plugins/prognyx-oncology-intelligence) | Compare oncology trials. | None | `https://prognyx.com/api/mcp` |
| [Project Desk](plugins/project-desk) | Track projects and issues. | OAuth | `https://atlier.ai/mcp` |
| [Project Kickoff Pack](plugins/project-kickoff-pack) | Create project kickoff packs. | None | `https://project-kickoff-pack.sidcraigau.workers.dev/mcp` |
| [Project Plan 365](plugins/project-plan-365) | Manage Microsoft Project MPP. | OAuth | `https://mcp.projectplan365.com/mcp` |
| [Prometheor](plugins/prometheor) | Hand work off to other AIs. | OAuth | `https://app.prometheor.com/mcp` |
| [Promotion Pros Catalog](plugins/promotion-pros-catalog) | Price merch, check delivery. | None | `https://mcp.promotionpros.com/mcp` |
| [Prompt Perfect](plugins/prompt-perfect) | Create and manage prompts. | OAuth | `https://chatgpt.promptperfect.xyz/mcp` |
| [Prompt Petal](plugins/prompt-petal) | AI prompt manager and improver. | None | `https://promptpetal.com/api/mcp` |
| [Promptbanken](plugins/promptbanken) | Find and use prompt templates. | None | `https://mcp.promptbanken.se/mcp` |
| [PromptBrake Free Tools](plugins/promptbrake-free-tools) | Build AI tests and plans. | None | `https://promptbrake.com/free-tools/mcp` |
| [PromptCrew](plugins/promptcrew) | Reuse team AI workflows. | OAuth | `https://mcp.promptcrew.io/mcp` |
| [PromptGPT](plugins/promptgpt) | Prompt Engineering Studio. | None | `https://promptgpt.io/mcp` |
| [PromptingCraft.com](plugins/promptingcraft) | Source-backed agent prompts. | None | `https://mcp.promptingcraft.com/mcp` |
| [PromptKosh](plugins/promptkosh) | Create images with styles. | None | `https://promptkosh.in/mcp` |
| [Promvia](plugins/promvia) | AI search visibility tracking. | OAuth | `https://promvia.app/api/mcp` |
| [Prontuno](plugins/prontuno) | Manage transactional email. | OAuth | `https://mcp.prontuno.net/mcp` |
| [ProofSnap](plugins/proofsnap) | Web pages as signed evidence. | OAuth | `https://mcp.getproofsnap.com/mcp` |
| [Proofsource](plugins/proofsource) | Brand visibility in AI answers. | OAuth | `https://mcp.proofsource.co/mcp` |
| [Prop Trading Intelligence](plugins/prop-trading-intelligence) | Prop firm rules, with sources. | None | `https://mcp.pipster.io/mcp` |
| [Proper Job](plugins/proper-job) | Building cost calculator. | None | `https://www.proper-job.uk/api/mcp` |
| [Property Hazard MCP](plugins/property-hazard) | Hazard Lookup & Risk Analysis. | None | `https://mcp.zipquote.ai/mcp` |
| [Property Index Dubai](plugins/property-index-dubai) | Dubai Real Estate Data. | OAuth | `https://www.propertyindex.ae/api/mcp` |
| [PropertyPrompt](plugins/propertyprompt) | Floor plans to furnished 3D. | OAuth | `https://propertyprom.pt/mcp` |
| [PropertyRadar](plugins/propertyradar) | Search U.S. property data. | OAuth | `https://mcp.propertyradar.com/mcp` |
| [PropFácil](plugins/propfacil) | Explora y contacta inmuebles. | None | `https://propfacil.com/api/mcp` |
| [Prophecy DataGPT](plugins/prophecy-datagpt) | Governed data work in Reason. | OAuth | `https://app.prophecy.ai/datagpt/mcp` |
| [PropHours](plugins/prophours) | Track rental work hours. | OAuth | `https://prophours.app/api/mcp` |
| [Proposal.Biz](plugins/proposal-biz) | Create sales documents. | OAuth | `https://app.proposal.biz/api/mcp` |
| [Propovo – AI Proposal Maker](plugins/propovo) | Sales copilot to win clients. | OAuth | `https://api.propovo.com/mcp` |
| [Proppi](plugins/proppi) | Property records and listings. | OAuth | `https://agents.proppi.ai/api/mcp` |
| [Proprietio](plugins/proprietio) | Property ops & accounting. | OAuth | `https://mcp.proprietio.com/mcp` |
| [Propush.me](plugins/propush) | Manage Propush monetization. | OAuth | `https://mcp.propush.me/mcp` |
| [Propusher](plugins/propusher) | Workout and program builder. | OAuth | `https://app.propusher.com/mcp` |
| [ProSocial](plugins/prosocial) | See how you come across. | OAuth | `https://app.tryprosocial.com/mcp` |
| [Prot0](plugins/prot0) | Build and manage web apps. | OAuth | `https://mcp.prot0.com/mcp` |
| [Proto](plugins/proto) | Biological AI models and tools. | OAuth | `https://mcp.evodesign.org/mcp` |
| [Protogrid](plugins/protogrid) | MCP server search for agents. | None | `https://protogrid.dev/mcp` |
| [Protplex](plugins/protplex) | Find protein structures. | OAuth | `https://search.protplex.com/mcp` |
| [Proud Indian](plugins/proud-indian) | Volunteer with Proud Indian. | None | `https://dash.proudindian.ngo/api/mcp` |
| [ProWebLook](plugins/proweblook) | Verify lists and research. | API key | `https://mcp.proweblook.com/mcp` |
| [Prox](plugins/prox) | Work with product knowledge. | OAuth | `https://mcp.useprox.com/mcp` |
| [Proxy Mail QA](plugins/proxymail-qa) | Test inboxes for app sign-ups. | OAuth | `https://api.proxymail.qa/mcp` |
| [ProxyAI](plugins/proxyai) | Support tickets and tasks. | None | `https://proxyai.app/mcp` |
| [Przetargowy Janusz](plugins/przetargowy-janusz) | Polish public tenders. | OAuth | `https://przetargowyjanusz.pl/mcp` |
| [PRZone](plugins/przone) | Your training data in chat. | OAuth | `https://www.przone.app/api/mcp` |
| [Publer](plugins/publer) | Schedule & manage social media. | OAuth | `https://mcp.publer.com/` |
| [Public Comment Deadlines](plugins/commentclock) | Find comment closing dates. | None | `https://commentclock-mcp.sunrysetech.com/mcp` |
| [Publica Now](plugins/publica-now) | Discover creators and works. | None | `https://publica.now/mcp` |
| [PublicAML](plugins/publicaml) | Free crypto AML/KYT screening. | None | `https://mcp.publicaml.org/mcp` |
| [publicdata.au](plugins/publicdata-au) | Australian government data. | None | `https://publicdata.au/mcp` |
| [PublisherChamp](plugins/publisherchamp) | Book sales analytics. | OAuth | `https://mcp.publisherchamp.com/mcp` |
| [Publora](plugins/publora) | Post to 10 social networks. | OAuth | `https://mcp.publora.com/mcp` |
| [Puley](plugins/puley) | Read, compare and watch pages. | OAuth | `https://app.puley.com/mcp` |
| [Pulore App Planner](plugins/pulore) | Scope apps, check site speed. | None | `https://pulore.com/mcp` |
| [Pulpo 3D](plugins/pulpo-3d) | 3D printing quotes. | None | `https://pulpo3d.es/mcp` |
| [PulseLake Simulations](plugins/pulselake-simulations) | Explore ideas and scenarios. | OAuth | `https://ai-consultants.pulselake.co/oauth/pulselake-mcp` |
| [Pump](plugins/pump) | Plan and analyze your workouts. | OAuth | `https://pumpfitness.app/mcp` |
| [PuntoSeguro](plugins/puntoseguro) | Seguros de vida y salud. | None | `https://app.puntoseguro.com/mcp` |
| [PurpleBee](plugins/purplebee) | Who brings what, who owes what. | OAuth | `https://purplebee.app/mcp` |
| [Pushary](plugins/pushary) | Answer agents from your phone. | OAuth | `https://pushary.com/api/mcp/mcp` |
| [Puthouse](plugins/puthouse) | Read your Puthouse account. | OAuth | `https://puthouse.com/mcp` |
| [Puzzel.org](plugins/puzzel-org) | Interactive puzzle maker. | OAuth | `https://puzzel.org/mcp` |
| [PuzzleMaker Pro](plugins/puzzlemaker-pro) | Create classroom puzzles. | None | `https://puzzlemakerpro.app/mcp` |
| [PyAI](plugins/pyai) | Create and transcribe audio. | OAuth | `https://api.pyai.com/mcp` |
| [Pydantic Logfire](plugins/pydantic-logfire) | Query and manage telemetry. | OAuth | `https://logfire-us.pydantic.dev/mcp` |
| [Pylon](plugins/pylon) | Access and manage Pylon customer accounts, issues, and support data through Pylon's hosted MCP server. | OAuth | `https://mcp.usepylon.com` |
| [QA Wolf](plugins/qa-wolf) | End-to-end test automation. | OAuth | `https://app.qawolf.com/api/mcp` |
| [Qarera](plugins/qarera) | Search jobs & tailor resumes. | OAuth | `https://mcp.qarera.com/mcp` |
| [qBraid](plugins/qbraid) | Quantum computing workspace. | OAuth | `https://mcp.qbraid.com/mcp` |
| [Qminder](plugins/qminder) | Manage queues and appointments. | OAuth | `https://mcp.qminder.com/mcp` |
| [Qontext](plugins/qontext) | Read & update your context. | OAuth | `https://api.qontext.ai/mcp` |
| [QR Tiger](plugins/qrtiger) | Create and manage QR codes. | OAuth | `https://qrtiger.com/mcp` |
| [QR Tracker](plugins/qr-tracker) | Create and Track QR codes. | OAuth | `https://auth.qrtracker.io/functions/v1/mcp` |
| [Qreate](plugins/qreate) | Discord that keeps working. | OAuth | `https://mcp.qreate.gg/mcp` |
| [QRMenü](plugins/qrmenu) | Manage your restaurant menus. | OAuth | `https://qrmenu.evdsoft.com/mcp` |
| [QRsome](plugins/qrsome) | Branded QR codes for agents. | OAuth | `https://qrsome.com/mcp` |
| [QRStuff](plugins/qrstuff) | Generate and manage QR codes. | OAuth | `https://mcp.qrstuff.ai/mcp` |
| [QRX](plugins/qrx) | Artistic, scannable QR codes. | OAuth | `https://qrx.codes/mcp` |
| [Qt Docs](plugins/qt-docs) | Qt Group's hosted documentation MCP server: search Qt C++ and QML documentation. | None | `https://qt-docs-mcp.qt.io/mcp` |
| [Qu Review](plugins/qu-review) | Get a second opinion. | OAuth | `https://app.qureview.ai/claude/mcp` |
| [QualifyBase](plugins/qualifybase) | Qualify leads with AI. | OAuth | `https://www.qualifybase.com/api/mcp` |
| [Qualisend](plugins/qualisend) | Verify and clean email lists. | OAuth | `https://app.qualisend.com/api/mcp` |
| [QualiTaTi](plugins/qualitati) | Run AI interviews and surveys. | OAuth | `https://api.qualitati.com/mcp` |
| [Quallie.Ai](plugins/quallie-ai) | Integration with Quallie.Ai. | OAuth | `https://quallie.ai/api/mcp` |
| [Quant Daily](plugins/quantdaily) | Verified GRE/GMAT quant daily. | None | `https://mcp.quantdaily.app/mcp` |
| [QuanterLab: Backtest Trading](plugins/quanterlab-backtest-trading) | Backtest stock strategies. | OAuth | `https://quanterlab.com/mcp` |
| [Quanti IA](plugins/quanti-ia) | Query your marketing warehouse. | OAuth | `https://ai.quanti.io/mcp` |
| [Quantral](plugins/quantral) | Stock conversation signals. | OAuth | `https://app.quantral.com/api/mcp` |
| [QuantumFira](plugins/quantumfira) | Quantum portfolio optimisation. | None | `https://quantumfira.com/mcp` |
| [QuarterWise 1099 Tax Planner](plugins/self-employment-tax) | 1099 tax + quarterly payments. | None | `https://self-employment-tax.zovo.one/mcp` |
| [Quelta Video Ad Analyzer](plugins/quelta) | Score video ads by link. | OAuth | `https://quelta.ai/mcp` |
| [QueryBear](plugins/querybear) | Query Postgres, MySQL & SQLite. | OAuth | `https://mcp.querybear.com/mcp` |
| [QueryCraft SQL Coach](plugins/querycraft-sql-coach) | Practice SQL interactively. | None | `https://querycraftsql.app/mcp` |
| [QueryHost](plugins/queryhost) | Check and compare game servers. | None | `https://query.host/mcp` |
| [Querypanel](plugins/querypanel) | Tenant-safe analytics tools. | OAuth | `https://mcp.querypanel.io/mcp` |
| [QUESTIONSTAR](plugins/questionstar) | Build and analyze surveys. | OAuth | `https://mcp.questionstar.com/mcp` |
| [Quibity](plugins/quibity) | Travel eSIMs, plans and usage. | OAuth | `https://mcp.quibity.com/mcp` |
| [Quickchat AI](plugins/quickchat-ai) | Build and manage AI Agents. | OAuth | `https://app.quickchat.ai/v1/api/mcp/rpc` |
| [QuickNode](plugins/quicknode) | QuickNode integration to manage your blockchain infrastructure | OAuth | `https://mcp.quicknode.com/mcp` |
| [Quicktion](plugins/quicktion) | Save emails to Notion & more. | OAuth | `https://quicktion.io/mcp` |
| [Quilia](plugins/quilia) | AI Case Manager. | OAuth | `https://mcp.quilia.dev/` |
| [Quillm](plugins/quillm) | Pages your agents keep current. | OAuth | `https://quillm.ai/mcp` |
| [QuiverAI](plugins/quiverai) | Generate, vectorize, animate, and edit SVG assets with Arrow 2. | OAuth | `https://app.quiver.ai/mcp` |
| [QuizOffice](plugins/quizoffice) | AI worksheets for teachers. | OAuth | `https://app.quizoffice.com/quizOffice/mcp` |
| [Quo](plugins/quo) | Give your agent a phone number. | OAuth | `https://mcp.quo.com/mcp` |
| [Quok](plugins/quok) | Shared family calendar & lists. | OAuth | `https://api.getquok.com/mcp` |
| [Quokit](plugins/quokit) | Gift lists without double-ups. | OAuth | `https://www.quokit.com.au/api/mcp` |
| [Quotaline Commissions](plugins/commission-calculator) | Commission payouts, statements. | None | `https://commission-calculator.zovo.one/mcp` |
| [Quote Before Pay](plugins/quote-before-pay) | Inspect the quote first. | None | `https://scriptmasterlabs.com/mcp` |
| [QuoteMoto RateFoundry](plugins/quotemoto-ratefoundry) | CA auto estimates & SR-22. | None | `https://mcp.quotemoto.com/api/mcp` |
| [QuoteScore](plugins/quotescore) | Check repair quote pricing. | None | `https://quotescore.ai/mcp` |
| [Quotient](plugins/quotient) | GTM & marketing automation. | OAuth | `https://getquotient.ai/mcp` |
| [quran.ai](plugins/quran-ai) | Interactive tools by quran.com. | None | `https://mcp.quran.ai/` |
| [Qwikyo](plugins/qwikyo) | Find local service providers. | None | `https://mcp.qwikyo.com/mcp` |
| [Qwilr](plugins/qwilr) | Create and track proposals. | OAuth | `https://mcp.qwilr.com/mcp` |
| [QynTro AI](plugins/qyntro-ai) | Create images, video and music. | OAuth | `https://qyntroai.com/mcp` |
| [R.Space](plugins/r-space) | PropTech Ecosystem. | None | `https://mcp.rspace.ae/mcp` |
| [RaamTrade](plugins/raamtrade) | Invent And Optimize Strategies. | OAuth | `https://mcp.raamtrade.com/mcp` |
| [Rabbu](plugins/rabbu) | Find Airbnbs for sale and more. | None | `https://rabbu.com/mcp` |
| [Radar Scout](plugins/radar-scout) | Manage your Amazon business. | OAuth | `https://mcp.radarscout.com.br/mcp` |
| [Radarkit](plugins/radarkit) | Grow your AI Search Visibility. | OAuth | `https://radarkit.ai/mcp` |
| [Radi8](plugins/radi8) | Draft and schedule your posts. | OAuth | `https://app.radi8.com/api/mcp` |
| [Rafmennt](plugins/rafmennt) | Courses and exams in Iceland. | None | `https://www.rafmennt.is/mcp` |
| [Ragic](plugins/ragic) | Talk to your no-code database. | OAuth | `https://www.ragic.com/api/mcp` |
| [RaidRunner](plugins/raidrunner) | Manage your raid-train slots. | OAuth | `https://raidrunner.net/mcp` |
| [Railagent](plugins/railagent) | Message other AI agents. | OAuth | `https://railagent.io/mcp` |
| [Railwatch](plugins/railwatch) | Check Amtrak trains. | None | `https://railwatch.app/api/mcp` |
| [Railway](plugins/railway) | Inspect Railway projects, services, deployments, and environment state through Railway's hosted MCP server. | OAuth | `https://mcp.railway.com` |
| [RainbowStats](plugins/rainbowstats) | Economic data and statistics. | None | `https://rainbowstats.com/mcp` |
| [Rainbrand](plugins/rainbrand) | The brand layer for agents. | OAuth | `https://mcp.rainbrand.com/mcp` |
| [RainVis Hourly Weather Charts](plugins/rainvis-hourly-weather-charts) | How much will it rain and when. | None | `https://rainvis.com/mcp` |
| [Raisely](plugins/raisely) | Connect Reason to Raisely. | OAuth | `https://mcp.raisely.com/mcp` |
| [Rallies](plugins/rallies) | Research stocks, track wealth. | OAuth | `https://rallies.ai/mcp` |
| [RallyIQ](plugins/rallyiq) | Tennis game plans and scouting. | None | `https://bigballi.com/RallyIQ/mcp` |
| [Ramp](plugins/ramp) | Ramp integration to access corporate cards, transactions, and spend data | OAuth | `https://mcp.ramp.com/mcp` |
| [Ramus](plugins/ramus) | Cloud Android emulators. | OAuth | `https://api.ramus.dev/api/mcp` |
| [Randevu Takvimim](plugins/randevu-takvimim) | Find & book beauty salons. | None | `https://randevutakvimim.com/mcp/` |
| [Ranked AI](plugins/ranked-ai) | Manage your SEO & PPC. | OAuth | `https://www.ranked.ai/api/mcp/sse` |
| [RankZero](plugins/rankzero) | AI search visibility insights. | OAuth | `https://rankzero.io/mcp` |
| [Rapidly](plugins/rapidly) | Test ideas before building. | OAuth | `https://rapidly.co/mcp` |
| [Rapier - Markdown Editor & Art](plugins/rapier) | Write and draw with Reason. | None | `https://mcp.rapier.website/mcp` |
| [Rate-My-Agent.com Matcher](plugins/rate-my-agent-com-matcher) | Match to the best Realtor. | None | `https://mcp.rate-my-agent.com/mcp` |
| [RateAPI](plugins/rateapi) | Find the best financing rates. | None | `https://mcp.rateapi.dev/mcp` |
| [RatedWithAI](plugins/ratedwithai) | Check websites for WCAG issues. | None | `https://ratedwithai.com/api/mcp` |
| [RateMyVSO](plugins/ratemyvso) | VA disability reference. | OAuth | `https://ratemyvso.net/api/mcp` |
| [RateZip Deposit/Mortgage Rates](plugins/ratezip-deposit-mortgage-rates) | Current US APYs & loan rates. | None | `https://mcp.ratezip.com/mcp` |
| [Ratio](plugins/ratioteams) | Projects and tasks with AI. | OAuth | `https://ratioteams.com/api/mcp` |
| [Ravenpost](plugins/ravenpost) | Schedule social media posts. | OAuth | `https://api.ravenpo.st/mcp` |
| [Rawnd](plugins/rawnd) | Open RAW photos in chat. | None | `https://rawnd.app/api/mcp` |
| [Raygun](plugins/raygun) | Debug apps with Raygun. | OAuth | `https://api.raygun.com/v3/mcp` |
| [Raylight](plugins/raylight) | Product videos, edited by AI. | OAuth | `https://api.raylight.app/mcp` |
| [Raylu](plugins/bold-forge-2qqwj) | Map markets and reach founders. | OAuth | `https://mcp.raylu.ai/mcp` |
| [Razorpay](plugins/razorpay) | Razorpay's official hosted MCP server. | OAuth | `https://mcp.razorpay.com/mcp` |
| [Razuna](plugins/razuna) | Search and manage DAM assets. | OAuth | `https://mcp.razuna.com/mcp` |
| [Re Culture™ Public Guidance](plugins/re-culture-public-guidance) | Read Public Guidance. | None | `https://re-culture-public-guidance-mcp.reculture-independent.workers.dev/mcp` |
| [Reachype](plugins/reachype) | Your marketing workspace. | OAuth | `https://mcp.reachype.com/mcp` |
| [Read AI](plugins/read-ai) | Connect Reason to Read AI meeting intelligence — list meetings, fetch transcripts and reports, create meeting agents, and share reports via the hosted MCP at api.read.ai. | OAuth | `https://api.read.ai/mcp` |
| [Read Frog](plugins/read-frog) | Manage notes and flashcards. | OAuth | `https://api.readfrog.app/api/mcp` |
| [Readdy](plugins/readdy) | Create and refine AI websites. | OAuth | `https://mcp.readdy.ai/mcp` |
| [Reading Your Love](plugins/reading-your-love) | See your love temperature. | None | `https://mcp.readingyourlove.com/mcp` |
| [ReadMe](plugins/readme) | Search, read, and update your ReadMe docs, API reference, and changelog. | None | `https://docs.readme.com/mcp` |
| [Readplace](plugins/readplace) | Save links to read later. | OAuth | `https://readplace.com/mcp` |
| [Readwise](plugins/readwise) | Search highlights and Reader documents, save articles. | OAuth | `https://mcp2.readwise.io/mcp` |
| [ReadyLience Outage Planner](plugins/readylience-outage-planner) | Plan water and battery needs. | None | `https://mcp.readylience.com/mcp` |
| [Real-Time LCA](plugins/real-time-lca) | Manage building LCAs. | OAuth | `https://mcp.realtimelca.com/mcp` |
| [RealAI](plugins/realai) | Residential real estate data. | OAuth | `https://mcp.realai.com/mcp` |
| [Realie](plugins/realie) | U.S. property records & comps. | OAuth | `https://app.realie.ai/api/mcp` |
| [RealOpen](plugins/realopen) | Buy a home with crypto. | OAuth | `https://mcp.realopen.app/mcp` |
| [Realtor Reply Email Drafts](plugins/realtor-reply-email-drafts) | Draft client emails & texts. | OAuth | `https://mcp.realtorreplyai.app/mcp` |
| [Realy Data Analytics](plugins/realy) | Read-only table analysis. | OAuth | `https://realy-mcp.vercel.app/mcp` |
| [Réassurez-Moi](plugins/reassurez-moi) | Loan & travel insurance quotes. | None | `https://mcp.reassurez-moi.fr/mcp` |
| [Recall](plugins/recall) | Create flashcards. | OAuth | `https://mcp.recall.cards/mcp` |
| [Recallr](plugins/recallr-memory) | Search and save your memories. | OAuth | `https://mcp.recallr-ai.org/mcp` |
| [Recalo](plugins/recalo) | Save anything, access it here. | OAuth | `https://my.recaloapp.com/api/mcp` |
| [Receivo AI](plugins/receivo-ai) | Invoices, clients and payments. | OAuth | `https://mcp.receivo.cloud/mcp` |
| [Recharm](plugins/recharm) | Footage briefs and clip picks. | OAuth | `https://mcp.recharm.com/mcp` |
| [Rechtsklar24](plugins/rechtsklar24) | Onlineshop-Recht mit Quellen. | None | `https://rechtsklar24.de/mcp` |
| [Recipe One](plugins/recipe-one) | Recipes & meal planning. | OAuth | `https://mcp.recipeone.app/mcp` |
| [Reckon](plugins/reckon) | Verify email addresses. | OAuth | `https://mcp.reckonapp.io/mcp` |
| [Record Meeting AI Notetaker](plugins/record-meeting) | Meeting notes & transcripts. | OAuth | `https://api.recordmeeting.com/mcp` |
| [Recordo](plugins/recordo) | Capture tasks and notes. | OAuth | `https://api.recordo.app/api/mcp/adhd/mcp` |
| [Recovr](plugins/recovr-retention) | Spot risk. Keep members. | OAuth | `https://retention-backend.recovr.com/mcp` |
| [Recruit CRM](plugins/recruit-crm) | ATS & CRM insights to action. | None | `https://mcp.recruitcrm.io/mcp` |
| [recruitlayer](plugins/recruitlayer) | Manage your recruitment ops. | OAuth | `https://mcp.recruitlayer.com/mcp` |
| [Recrutei](plugins/recrutei) | Your ATS jobs and candidates. | OAuth | `https://mcp.recrutei.com.br/mcp` |
| [ReddGrow](plugins/reddgrow) | Get found on Reddit and AI. | OAuth | `https://mcp.reddgrow.ai/mcp` |
| [Redii](plugins/redii) | Manage employee benefits. | OAuth | `https://mcp.redii.co/mcp` |
| [RedirHub](plugins/redirhub) | Domain redirects & short links. | OAuth | `https://mcp.redirhub.com/` |
| [RedMo](plugins/redmo) | Live quizzes for any room. | OAuth | `https://redmo.xyz/mcp` |
| [Redocly](plugins/redocly) | Write, lint and document APIs. | None | `https://redocly.com/mcp` |
| [Redpine](plugins/redpine) | Search research papers. | OAuth | `https://api.redpine.ai/mcp` |
| [RedReplier](plugins/redreplier) | Monitor your brand mentions. | OAuth | `https://mcp.redreplier.com/mcp` |
| [Redstone](plugins/redstone) | Stock & ETF risk and backtests. | None | `https://redstonemarkets.com/api/mcp` |
| [Reducto Office](plugins/reducto-office) | Full-fidelity document editor. | OAuth | `https://office.reducto.ai/api/mcp` |
| [Reecopedia](plugins/reecopedia) | Cited EU textile law search. | None | `https://reeco.eco/mcp` |
| [ReelScribe](plugins/dijitalpilot-reelscribe) | Search supplied subtitles. | None | `https://reelscribe-dijitalpilot.vercel.app/mcp` |
| [ReelsMeals](plugins/reelsmeals) | Find recipes. Cook your saves. | None | `https://reelsmeals.com/api/mcp` |
| [Reelyze](plugins/reelyze) | Find why reels lose viewers. | OAuth | `https://api.getreelyze.com/mcp` |
| [Reevl](plugins/reevl) | Korea real transaction prices. | None | `https://reevl.co.kr/api/mcp` |
| [refern Notan Generator](plugins/refern-notan) | Turn images into notan studies. | None | `https://refern.app/mcp` |
| [Refero](plugins/refero) | Research real product interfaces and design with evidence from Refero. | OAuth | `https://api.refero.design/mcp` |
| [Refiner](plugins/refiner) | Analyze survey responses. | OAuth | `https://app.refiner.io/v001/mcp` |
| [Refix](plugins/refix) | Answers from your company data. | OAuth | `https://mcp.refix.ai/mcp` |
| [Reflections Licensed Studio](plugins/reflections-licensed-studio) | Create licensed imagery. | OAuth | `https://app.reflections.ai/api/mcp` |
| [RefreshAgent](plugins/refreshagent-public) | SEO analytics and workflows. | OAuth | `https://refreshagent.com/mcp` |
| [RegEvidenceHub Waste](plugins/regevidencehub-waste) | England waste compliance. | None | `https://waste.regevidencehub.com/mcp` |
| [Registry Lookup](plugins/registry-lookup) | Explore company registry data. | OAuth | `https://registry-lookup.com/mcp/sse` |
| [RegSentry](plugins/regsentry) | Check website tracking. | None | `https://regsentry.com/mcp` |
| [ReInvestWealth](plugins/reinvestwealth) | Bookkeeping and reporting. | OAuth | `https://api.reinvestwealth.com/mcp` |
| [REIzer](plugins/reizer) | AI real estate deal analyzer. | None | `https://reizer.io/mcp` |
| [Relay](plugins/relay) | Plan and manage training. | OAuth | `https://www.relayathletic.com/api/mcp` |
| [RelayDesk](plugins/relaydesk) | Work on your paired computers. | OAuth | `https://getrelaydesk.space/mcp` |
| [Release Notes Coverage Checker](plugins/release-notes-coverage-checker) | Check release note coverage. | None | `https://release-notes-coverage-checker.sidcraigau.workers.dev/mcp` |
| [releaseMyAd Newspaper Ads](plugins/releasemyad-newspaper-ads) | Newspaper ad rates & booking. | None | `https://mcp.releasemyad.com/mcp` |
| [Relewise Developer](plugins/relewise-developer) | Build Relewise integrations. | None | `https://mcp.relewise.com/` |
| [ReloMaps](plugins/relomaps) | Find the best place to live. | None | `https://mcp.relomaps.com/mcp` |
| [Relvato](plugins/relvato) | Monitor and fix your websites. | OAuth | `https://app.relvato.com/api/mcp` |
| [Remap](plugins/remap) | Bike and run routes anywhere. | None | `https://go.remap.earth/mcp` |
| [ReMCP](plugins/remcp) | Operate your paired computers. | OAuth | `https://remcp.site/mcp` |
| [RemDo](plugins/remdo) | Read and write your notes. | OAuth | `https://remdo.com/mcp` |
| [Remindlo](plugins/remindlo) | Appointment reminders by SMS. | OAuth | `https://mcp.remindlo.co.uk/mcp` |
| [Remly](plugins/remly) | Give Reason your context. | OAuth | `https://mcp.remly.it/mcp` |
| [Remnant](plugins/remnant) | Learn from other agents. | None | `https://remnant.dedale-bi.com/mcp/chatgpt` |
| [Remode](plugins/remode) | Shop any outfit from a photo. | None | `https://mcp.remode.app/mcp` |
| [Remote Arc](plugins/remote-arc) | Access your computer remotely. | OAuth | `https://mcp.remotearc.app/mcp` |
| [Remotive - Remote Jobs Search](plugins/remotive) | Search vetted remote jobs. | None | `https://mcp.remotive.com/mcp` |
| [Rendemo](plugins/rendemo) | Interactive product demos. | OAuth | `https://www.rendemo.com/api/mcp/mcp` |
| [Render (API key)](plugins/render-api-key) | Deploy, debug, and monitor applications on Render. | API key | `https://mcp.render.com/mcp` |
| [Render (renderworks.jp)](plugins/renderworks) | Projects, schedules and tasks. | OAuth | `https://renderworks.jp/mcp` |
| [Renewal Deadline Planner](plugins/renewalclock) | Plan renewal notice dates. | None | `https://renewalclock-mcp.sunrysetech.com/mcp` |
| [Renoise](plugins/renoise) | Make AI videos and images. | OAuth | `https://renoise.ai/api/public/mcp` |
| [Renou](plugins/renou) | Your personal CRM in Reason. | OAuth | `https://renou.ai/mcp` |
| [RentADriver](plugins/rentadriver) | Quote, book and track parcels. | None | `https://mcp.rentadriver.ai/mcp` |
| [Rental Blacklist](plugins/rental-blacklist) | Check rentals for red flags. | None | `https://rentalredflags.com/api/mcp` |
| [RentalCal](plugins/rentalcal) | Book vacation rentals direct. | None | `https://api.rentalcal.com/mcp` |
| [RentalSource](plugins/rentalsource) | Find home & apartment rentals. | None | `https://www.rentalsource.com/mcp` |
| [Rentennials](plugins/rentennials) | Find and book rental cars. | None | `https://mcp.rentennials.app/mcp` |
| [Reos](plugins/reos) | Work with your user research. | OAuth | `https://www.reos.ai/api/mcp` |
| [RepeatPost](plugins/repeatpost) | Schedule social media posts. | OAuth | `https://api.repeatpost.com/mcp` |
| [Rephrase AI](plugins/rephrase-ai) | Rewrite and edit your drafts. | OAuth | `https://rephraseai.com/mcp` |
| [Rephrasy](plugins/rephrasy) | Make AI drafts sound human. | OAuth | `https://v2-humanizer.rephrasy.ai/mcp` |
| [Replier](plugins/replier) | Automate comments and DMs. | OAuth | `https://mcp.usereplier.com/mcp` |
| [Replio](plugins/replio) | Create AI voice training. | OAuth | `https://api.replio.eu/mcp` |
| [Replit](plugins/replit) | Build, update, and publish Replit apps. | OAuth | `https://mcp.replit.com/server/mcp` |
| [Replo](plugins/replo) | Manage Replo sites and data. | None | `https://api.replo.app/v1/mcp` |
| [RepoLore](plugins/repolore) | Explain public code history. | None | `https://repolore.devlab.group/mcp` |
| [Report Numbers Checker](plugins/reportcheck) | Check totals and growth claims. | None | `https://reportcheck-mcp.sunrysetech.com/mcp` |
| [ReportAste](plugins/reportaste) | Auction search and inventory. | OAuth | `https://mcp.reportaste.it/mcp` |
| [Reportei](plugins/reportei) | Reports from multiple channels. | OAuth | `https://app.reportei.com/mcp` |
| [ReportFlow](plugins/reportflow) | Generate professional PDFs. | OAuth | `https://mcp.re-port-flow.com/mcp` |
| [ReportGem Research](plugins/global-investment-bank-reports) | Equity research with sources. | OAuth | `https://reportgem.com/mcp` |
| [REPS Time](plugins/reps-time) | Log REPS hours from chat. | OAuth | `https://reps-app-323d0.web.app/mcp` |
| [REPSLog](plugins/repslog) | Log real estate work hours. | OAuth | `https://api.reps-log.com/api/mcp` |
| [Repuso Reviews](plugins/repuso-reviews) | Track reviews from 50+ sites. | OAuth | `https://api.repuso.com/public/v1/mcp` |
| [Res Ipsa](plugins/res-ipsa) | Research New Zealand law. | OAuth | `https://mcp.resipsa.ai/mcp` |
| [RescueTime](plugins/rescuetime) | Track time and control focus. | OAuth | `https://rescuetime.com/mcp` |
| [Resell Pro](plugins/resell-pro) | Explore Vinted market data. | OAuth | `https://resellpro.com/mcp` |
| [Resend](plugins/resend) | Manage email, contacts, templates, and delivery logs. | OAuth | `https://mcp.resend.com/mcp` |
| [Resolve AI](plugins/resolve-ai) | Use Resolve for investigations, incidents, and production context. | OAuth | `https://app0.resolve.ai/mcp/v2` |
| [Respond.io](plugins/respond-io) | Manage customer conversations. | OAuth | `https://mcp.respond.io/mcp` |
| [Responsive](plugins/responsive) | Responsive workflows. | OAuth | `https://app.rfpio.com/oa/v1/mcp` |
| [RESTL – Table Reservations](plugins/restl-table-reservations) | Book tables in Austria. | None | `https://mcp.restl.at/mcp` |
| [restplass.no](plugins/restplass-no) | Charter og pakkereiser. | None | `https://www.restplass.no/mcp` |
| [Restream](plugins/restream) | Live-code to an audience from Reason: stream to social, a webinar page, or Slack, record only, or let AI clip the highlights. | OAuth | `https://mcp.restream.io/mcp` |
| [Resume Builder](plugins/resume-builder) | Analyze, refine your resume. | None | `https://mcp.jobright.ai/mcp` |
| [Resume Builder & ATS Checker](plugins/resume-builder-and-ats-checker) | CV checker & job tailoring. | None | `https://resumenext.io/api/claude/resume/mcp` |
| [Resume.io](plugins/resume-io) | Resumes and cover letters. | None | `https://mcp.resume.io/` |
| [ResumeBoost](plugins/resumeboost) | Optimize resume, cover letter. | None | `https://mvp.mom/api/mcp` |
| [Resumondo](plugins/resumondo) | ATS-ready resumes & letters. | OAuth | `https://resumondo.com/api/mcp` |
| [Resvo Bookings](plugins/resvo) | Read appointment availability. | OAuth | `https://www.resvo.de/api/mcp` |
| [Retell AI](plugins/retell-ai) | Build and deploy voice agents. | None | `https://mcp.retellai.com/mcp` |
| [Retiplex](plugins/retiplex) | Create AI video ads. | OAuth | `https://app.retiplex.com/mcp` |
| [Retirement Lab](plugins/retirement-lab) | Retirement projections. | OAuth | `https://retirementlab.app/api/mcp` |
| [Retreats and Venues](plugins/retreats-and-venues) | Find the best venues. | None | `https://retreatsandvenues.com/mcp` |
| [Retro Game Gather](plugins/retro-game-gather) | Japanese retro game collection. | OAuth | `https://game.retrogather.com/mcp` |
| [RetryHub](plugins/retryhub) | Fit, shutdown, and disputes. | None | `https://retryhub-chatgpt-app.vercel.app/mcp` |
| [Rett fra Bonden](plugins/agentplatform-rettfrabonden) | Find Norwegian farm food. | None | `https://rettfrabonden.com/mcp` |
| [ReturnOS Hospitality Commerce](plugins/returnos-hospitality-commerce) | Find stays & live direct rates. | None | `https://mcp.my4u.travel/mcp` |
| [Reuily](plugins/reuily) | Forms, quizzes & lead capture. | OAuth | `https://reuily.com/api/mcp` |
| [Revelata deepKPI](plugins/revelata-deepkpi) | SEC KPIs and filings. | OAuth | `https://deepkpi-mcp.revelata.com/mcp` |
| [Revelica](plugins/revelica) | Your team's product context. | OAuth | `https://api.revelica.com/mcp` |
| [Revensi](plugins/revensi) | Build agents from blueprints. | None | `https://app.revensi.com/mcp/` |
| [Revenue Analytics](plugins/revenue-analytics) | Non-trivial RevOps reports. | OAuth | `https://mcp.datalabs.store/mcp` |
| [RevenueBase](plugins/revenuebase) | B2B contact search and data. | OAuth | `https://mcp.revenuebase.ai/mcp` |
| [RevenueDot](plugins/revenuedot) | Run mobile app subscriptions. | OAuth | `https://mcp.revenuedot.app/mcp` |
| [Reverie Movies](plugins/reverie-movies) | Make AI films and music videos. | OAuth | `https://api.reveriemovies.com/mcp` |
| [Reverse Contact](plugins/reverse-contact) | Look up people and companies. | OAuth | `https://api.reversecontact.com/mcp` |
| [ReverseGPT](plugins/reversegpt) | Humanizes AI writing. | OAuth | `https://www.reversegpt.ai/api/mcp` |
| [RevHost](plugins/revhost) | Manage your Turo fleet. | OAuth | `https://api.revhosthq.com/mcp` |
| [Revid](plugins/revid) | Create short-form videos. | OAuth | `https://www.revid.ai/api/mcp` |
| [Review Expert](plugins/review-expert) | App review insights & replies. | OAuth | `https://mcp.review.expert/` |
| [Review Times](plugins/review-times) | See app store review times. | None | `https://reviewtimes.fyi/mcp` |
| [Revise](plugins/revise) | Create and edit documents. | OAuth | `https://mcp.revise.io/mcp` |
| [Revnu](plugins/revnu) | GTM on autopilot. | OAuth | `https://revnu.com/api/mcp` |
| [Revup](plugins/revup) | Create giveaways & contests. | OAuth | `https://revup.com/mcp` |
| [RezervaOnline](plugins/rezervaonline) | Rezervă cazare în România. | None | `https://rezervaonline.ro/mcp` |
| [Rezi Resume Builder](plugins/rezi-resume-builder) | Build and Tailor Resumes. | OAuth | `https://api.rezi.ai/mcp` |
| [RFP Response Checker](plugins/rfp-response-checker) | Check RFP response coverage. | None | `https://rfp-response-checker.sidcraigau.workers.dev/mcp` |
| [RFQMind](plugins/rfqmind) | Find certified manufacturers. | OAuth | `https://mcp.rfqmind.com/mcp` |
| [Rhizome AI](plugins/rhizome-ai) | Know what the FDA thinks. | OAuth | `https://rhizomeai.com/api/mcp` |
| [RhoRent Car Rental Rhodes](plugins/rhorent-car-rental-rhodes) | Car rental in Rhodes, Greece. | None | `https://mcp.rhorent.com/mcp` |
| [Ria Money Transfer](plugins/ria-money-transfer) | Rates and transfer quotes. | None | `https://ria-chatgpt-app.vercel.app/mcp` |
| [Rial](plugins/rial-verify) | Photo fraud signals for claims. | OAuth | `https://mcp.rial.io/mcp` |
| [Ribbon Leads](plugins/ribbon-leads) | Who's about to open, by city. | None | `https://ribbonleads.com/mcp` |
| [Ribele](plugins/ribele) | Create, edit, track campaigns. | OAuth | `https://ribele.com/mcp` |
| [RideDesk](plugins/ridedesk) | Build transfer booking sites. | None | `https://ridedesk.app/api/mcp` |
| [Rift](plugins/rift) | Market insights and education. | OAuth | `https://mcp.rift.ai/mcp` |
| [RIGHTIS](plugins/rightis) | Check a person's AI rights. | None | `https://rightis.org/api/public-mcp/mcp` |
| [Rightway Parking](plugins/rightway-parking-reservations) | Airport, cruise, event parking. | None | `https://rightwayparking.com/mcp` |
| [Riido](plugins/riido) | Manage Riido work. | OAuth | `https://mcp.riido.io/mcp` |
| [Rill](plugins/rill-review) | Record and review browser runs. | OAuth | `https://mcp.userill.com/mcp` |
| [Rill](plugins/rill) | Explore metrics. | OAuth | `https://api.rilldata.com/v1/mcp` |
| [Rillet](plugins/rillet) | Manage financial operations. | OAuth | `https://api.rillet.com/mcp` |
| [Rindee](plugins/rindee) | AI calling for your business. | OAuth | `https://api.rindee.ai/mcp` |
| [RingCentral Chat](plugins/ringcentral-chat) | Team chat, tasks, and files. | OAuth | `https://mcp.labs.ringcentral.com/ringex/v1.1.0/team-chat` |
| [RingCentral Phone](plugins/ringcentral-phone) | Calls, texts, and voicemail. | OAuth | `https://mcp.labs.ringcentral.com/ringex/phone` |
| [Rinkta](plugins/rinkta) | Manage client work. | OAuth | `https://app.rinkta.com/mcp` |
| [Rio Las Vegas](plugins/rio-las-vegas) | Rooms and hotel help. | None | `https://mcp.riolasvegas.com/mcp` |
| [Rival Ads](plugins/rival-ads) | Research competitor ads. | OAuth | `https://rivalads.io/mcp` |
| [RiverScript](plugins/riverscript) | Bring transcripts to Reason. | None | `https://riverscript.com/mcp` |
| [Riveter](plugins/riveter) | Build structured web datasets. | OAuth | `https://mcp.riveterhq.com/mcp` |
| [Rivora](plugins/rivora) | Your team's approved plans. | OAuth | `https://api.rivoraconnect.com.au/mcp/` |
| [Rize](plugins/rize) | Track and analyze time. | OAuth | `https://mcp.rize.io/mcp` |
| [Rntor](plugins/rntor) | Manage flexible workspaces. | OAuth | `https://mcp.rntor.com/mcp` |
| [Road Trip Planner](plugins/road-trip-planner) | Find campground stays. | None | `https://mcp.parkwith.us/mcp` |
| [RoadOps](plugins/roadops) | Plan. Share. Execute. | OAuth | `https://api.roadops.app/mcp` |
| [Roadworthy HQ](plugins/roadworthy-hq) | New-entrant audit readiness. | None | `https://roadworthyhq.com/api/mcp` |
| [Roam Research](plugins/roam-research) | Read and update Roam graphs. | OAuth | `https://mcp.roamresearch.com/mcp` |
| [Roamdesk](plugins/roamdesk) | Plan remote work and travel. | None | `https://roamdesk.karsonbailey.com/mcp` |
| [Roar AI](plugins/roar-ai) | AI models + app hosting. | OAuth | `https://cloud.roar-ai.com/mcp` |
| [Robinhood](plugins/robinhood) | View portfolios, positions, orders, watchlists, and market data, and trade in a Robinhood Agentic account. | OAuth | `https://agent.robinhood.com/mcp/trading` |
| [Roboflow](plugins/roboflow) | Roboflow computer vision skills and MCP tools for datasets, annotation, training, workflows, inference, and deployment. | OAuth | `https://mcp.roboflow.com/mcp` |
| [RoboPilots](plugins/robopilots) | Remote operators for robots. | None | `https://robopilots.ai/mcp` |
| [RoboSystems](plugins/robosystems) | SEC filings knowledge graph. | OAuth | `https://api.robosystems.ai/v1/graphs/sec/mcp` |
| [Robotomail](plugins/robotomail) | Email for your AI agent. | OAuth | `https://robotomail.com/mcp` |
| [Rocketlane](plugins/rocketlane) | Manage projects, tasks & teams. | OAuth | `https://mcp.rocketlane.com/mcp` |
| [RocketReach](plugins/rocketreach) | Verified emails and phones. | OAuth | `https://mcp.rocketreach.co/mcp` |
| [Rocketship: Get Customers](plugins/rocketship) | Find buyers, get customers. | OAuth | `https://deployrocketship.com/mcp` |
| [Rockhopper](plugins/rockhopper) | File governance & audit trails. | OAuth | `https://mcp.rockhopper.co/mcp` |
| [RolePark](plugins/rolepark) | Your hiring pipeline in chat. | OAuth | `https://rolepark.com/api/mcp` |
| [RolePocket](plugins/rolepocket) | Your job search assistant. | OAuth | `https://rolepocket.com/mcp` |
| [Rollcage](plugins/rollcage) | Check agent commands first. | None | `https://rollcage.app/mcp` |
| [Roma](plugins/roma) | Your AI's favorite to-do list. | OAuth | `https://api.roma.app/mcp` |
| [Ronda](plugins/ronda) | Edit your web app from chat. | OAuth | `https://mcp.useronda.com/` |
| [RooferMatch](plugins/roofermatch) | Roof help, then roofer quotes. | None | `https://roofermatch.co/mcp` |
| [RoofReport Roofing Calculator](plugins/roofreport) | Roof estimator & visualizer. | None | `https://getroofreport.com/mcp` |
| [Room Renovation Visualizer](plugins/room-renovation-visualizer) | Visualize renovation ideas. | None | `https://room-renovation-visualizer.aigc-7629.chatgpt.site/api/mcp` |
| [RoomLab.app](plugins/roomlab) | Stage rooms and edit photos. | OAuth | `https://mcp.roomlab.app/mcp` |
| [Roomwise](plugins/roomwise) | Home redesign room planner. | None | `https://roomwise.funkylogic.workers.dev/mcp` |
| [RooQuiz](plugins/rooquiz) | Build and manage assessments. | OAuth | `https://payload.rooquiz.com/api/mcp` |
| [Rootly](plugins/rootly) | Rootly integration to investigate and manage incidents, alerts, on-call schedules, and retrospectives | OAuth | `https://mcp.rootly.com/mcp` |
| [Rosetta](plugins/rosetta) | Save notes, reminders, links. | OAuth | `https://mcp.getrosetta.app/mcp` |
| [Rotate Pilot](plugins/rotate-pilot) | FAA drone & pilot test prep. | None | `https://rotatepilot.com/api/mcp` |
| [Rotawise Shift Scheduler](plugins/shift-scheduler) | Weekly staff shift schedules. | None | `https://shift-scheduler.zovo.one/mcp` |
| [RoTV Guide](plugins/rotv-guide) | Live Romanian TV guide. | None | `https://tv.madeinro.eu/mcp` |
| [Rounds](plugins/rounds) | Client comments on PDF proofs. | OAuth | `https://rounds.page/api/mcp` |
| [RouteAll](plugins/routeall-knowledge) | Oversize Hauling Guides. | None | `https://routeall.app/mcp` |
| [RouteStack.ai](plugins/routestack-ai) | Find hotels, flights, cars. | None | `https://mcp.routestack.ai/mcp` |
| [Roux](plugins/roux) | Collect human context. | OAuth | `https://helloroux.com/mcp` |
| [Rovyn](plugins/rovyn) | Podcasts assistant curates. | OAuth | `https://api.rovyn.app/mcp` |
| [RTST AI](plugins/rtst) | Create AI images and videos. | OAuth | `https://mcp.rtst.ai/mcp` |
| [RubricMark Practice](plugins/rubricmark-practice) | Practice, schools, scores. | None | `https://rubricmark.com/mcp` |
| [Rumbo](plugins/rumbo) | Consultá tus datos de negocio. | OAuth | `https://proxy-api.boolean.com.ar/mcp/v1/rumbo/` |
| [Runa](plugins/runa) | Add your meeting context. | OAuth | `https://mcp.joinruna.com/mcp` |
| [Runchat](plugins/runchat) | Design workflows and CAD. | OAuth | `https://runchat.com/api/mcp` |
| [Runneth](plugins/runneth) | Creative strategy for your ads. | OAuth | `https://mcp.runneth.com/` |
| [Running Workout](plugins/running-workout) | Coach and schedule workouts. | OAuth | `https://www.runningworkout.fr/mcp` |
| [Runrun.it](plugins/runrun-it) | Find and create tasks. | OAuth | `https://mcp.runrun.it/mcp` |
| [Runway](plugins/runway) | Generate images, videos, music, speech, and sound effects with Runway — Gen-4.5, Aleph, Seedance, Kling, GPT Image and more — from Reason and Reason. | OAuth | `https://mcp.runwayml.com/mcp` |
| [Runway Dev](plugins/runway-api) | Get guidance for integrating video, image and audio generation with the Runway API and official SDKs. | OAuth | `https://dev.runwayml.com/mcp` |
| [Runway Dev](plugins/runway-api-runway) | Runway API integration help. | OAuth | `https://dev.runway.com/mcp` |
| [Runzumi](plugins/runzumi-openai) | GitHub Actions runner insights. | OAuth | `https://mcp.runzumi.com/mcp` |
| [RxIQ](plugins/rxiq) | NHS primary care prescribing. | None | `https://rxiq.co.uk/mcp` |
| [RxRooster](plugins/rxrooster) | Paste anesthesia requisitions. | None | `https://api.rxrooster.com/mcp` |
| [Ryanair](plugins/ryanair) | Book low fares direct. | None | `https://mcp.ryanair.com/mcp` |
| [Ryze AI](plugins/ryze-ai) | Connect Google Ads and Meta Ads, then pull GA4, Search Console, and SEO/GEO/AEO in the same workspace. | OAuth | `https://connector.get-ryze.ai/mcp` |
| [S&P Global](plugins/sp-global) | Query S&P Capital IQ financials, prices, and transcripts. | OAuth | `https://kfinance.kensho.com/integrations/mcp` |
| [SaaSFlow](plugins/saasflow) | The all-in-one finance cockpit. | OAuth | `https://mcp.saasflow.com/mcp` |
| [Sacra](plugins/sacra) | Research on pre-IPO startups. | OAuth | `https://mcp.sacra.com/mcp` |
| [Safeguard](plugins/safeguard) | Secure software supply chain. | OAuth | `https://mcp.safeguard.sh/mcp` |
| [SAHMK](plugins/sahmk) | Explore Saudi market data. | OAuth | `https://mcp.sahmk.sa/mcp` |
| [Sail](plugins/sail) | Compare ways to get around. | None | `https://sailrides.co/mcp` |
| [Saive](plugins/saive) | Your saved reading, in chat. | OAuth | `https://app.saive.my/api/mcp` |
| [SalesBlink](plugins/salesblink) | Manage sales outreach. | None | `https://mcp.salesblink.io/mcp` |
| [SalesEQ](plugins/saleseq) | Connect your meeting data. | OAuth | `https://mcp.saleseq.ai/mcp` |
| [Salesmsg](plugins/salesmsg) | Business texting in Reason. | OAuth | `https://mcp.salesmessage.com/` |
| [SalesNow](plugins/salesnow) | Search company information. | OAuth | `https://api-data.api.salesnow.jp/v1/mcp` |
| [Salespeak Company Context](plugins/salespeak-company-context) | Your company's own answers. | None | `https://salespeak.ai/mcp` |
| [SalesQL](plugins/salesql) | Find B2B leads and contacts. | OAuth | `https://mcp.salesql.com/mcp` |
| [SalesTouch](plugins/salestouch) | LinkedIn Outreach for agents. | OAuth | `https://www.salestouch.io/api/mcp` |
| [SaltyBytes](plugins/saltybytes) | Find and save real recipes. | OAuth | `https://saltybytes.ai/mcp` |
| [Samautomation Video](plugins/samautomation-video-render) | Assemble media into an MP4. | OAuth | `https://samautomation.work/mcp` |
| [SAMOS e-commerce](plugins/samos-ecommerce) | International parcel delivery. | None | `https://samos-e.com/api/mcp` |
| [SAMRUM](plugins/samrum) | Talk about your family reports. | OAuth | `https://mcp.samrum.io/mcp` |
| [Samvat](plugins/samvat) | Panchang, festivals & Kundli. | None | `https://mcp.samvat.in/mcp` |
| [Sancera](plugins/sancera) | Officiell statistik med källa. | OAuth | `https://mcp.sancera.ai/mcp` |
| [Sandcastles](plugins/sandcastles) | Your content strategist. | OAuth | `https://mcp.sandcastles.ai/` |
| [Sander Saar Videos](plugins/sandersaar-videos) | Search Sander Saar's videos. | None | `https://mcp.agentcdn.com/mcp` |
| [Sanity](plugins/sanity) | Sanity integration to create, query, and manage structured content | OAuth | `https://mcp.sanity.io` |
| [SARA by Aitomic](plugins/sara-by-aitomic) | Retail analytics and actions. | OAuth | `https://sara.aitomic.ai/mcp` |
| [SatisFIT](plugins/satisfit) | Track workouts and progress. | OAuth | `https://api.satis.fit/mcp` |
| [Sauna Guide Quotes](plugins/sauna-guide-quotes) | Compare saunas and real costs. | None | `https://sauna.guide/mcp` |
| [Sauna Monthly](plugins/sauna-monthly) | Sauna reviews and calculators. | None | `https://saunamonthly.com/api/mcp` |
| [Savantis Memory](plugins/savantis-memory) | Memory and AI professionals. | OAuth | `https://context.savantisai.com/mcp` |
| [Save This One](plugins/save-this-one) | Save, find, and read bookmarks. | OAuth | `https://mcp.savethisone.com/mcp` |
| [Savebase](plugins/savebase) | Search your saved content. | OAuth | `https://mcp.savebase.space/mcp` |
| [Savecraft](plugins/savecraft) | Analyze saves and coach builds. | OAuth | `https://mcp.savecraft.gg/mcp` |
| [SavedIt](plugins/savedit) | Find anything you saved. | OAuth | `https://mcp.saveditapp.com/mcp` |
| [SaveHealth](plugins/savehealth) | Up to 90% savings on meds. | OAuth | `https://mcp.savehealth.com/mcp` |
| [Savvly](plugins/savvly) | Model retirement scenarios. | None | `https://api.savvly.com/mcp` |
| [Savvy](plugins/savvy) | Savant for Finance AI. | OAuth | `https://savvy.savantlabs.io/mcp?surface=plugin` |
| [Sayli](plugins/sayli) | Walk into your next call ready. | OAuth | `https://api.sayli.ai/api/v1/mcp` |
| [Saypage](plugins/saypage) | Web pages and Instagram tools. | OAuth | `https://api.saypage.ai/mcp` |
| [Scaffolde Capability Builder](plugins/scaffolde-capability-builder) | Draft reusable capabilities. | OAuth | `https://mcp.scaffolde.ai/mcp` |
| [ScaleSKUs](plugins/scaleskus) | Analyse & manage Amazon Ads. | OAuth | `https://scaleskus.com/mcp` |
| [ScalperIntel AI](plugins/scalperintel-ai) | Product answers and support. | None | `https://mcp.scalperintel.com/mcp` |
| [Scamchecker.nl](plugins/scamchecker) | Check messages for scams. | None | `https://scamchecker.nl/mcp` |
| [ScanMalware](plugins/scanmalware) | Phishing URL scans and pivots. | None | `https://mcp.scanmalware.com/mcp` |
| [Scene Dept.](plugins/scene-dept) | Plan productions with AI. | OAuth | `https://scenedept.com/mcp` |
| [SceneF Showtimes](plugins/scenef-showtimes) | Movie showtimes in CA, HI & FL. | None | `https://scenef.com/mcp` |
| [Scenelith](plugins/scenelith) | Create images and videos. | OAuth | `https://scenelith.com/api/mcp` |
| [Scento Perfume Compendium](plugins/scento-perfume-compendium) | Perfume notes, houses & edits. | None | `https://scento.com/mcp` |
| [ScentVerdict](plugins/scentverdict) | Find and compare fragrances. | None | `https://scentverdict.com/mcp` |
| [Schedly](plugins/schedly) | Plan and manage schoolwork. | OAuth | `https://schedly.liamkellum.com/api/mcp` |
| [Schedulala for Social Media](plugins/schedulala-for-social-media) | Social media post scheduler. | OAuth | `https://schedulala.com/api/mcp` |
| [Schedule of Reductions (SOR)](plugins/project-sor) | Direct Loan SOR calculator. | None | `https://sor.myproduct.life/mcp` |
| [Schemon](plugins/schemon) | Appointments and workspaces. | OAuth | `https://api.schemon.com/mcp` |
| [Scholar Sidekick](plugins/scholar-sidekick) | Audit, verify, cite papers. | None | `https://scholar-sidekick.com/api/mcp` |
| [Scisso](plugins/scisso) | Know your shop with Scisso. | OAuth | `https://scisso.app/mcp` |
| [Scite](plugins/scite) | Search scientific literature. | OAuth | `https://api.scite.ai/mcp` |
| [Scope Change Checker](plugins/scopeguard) | Check agreed scope and costs. | None | `https://scopeguard-mcp.sunrysetech.com/mcp` |
| [ScopeLinq](plugins/scopelinq) | What did we actually agree to? | None | `https://mcp.scopelinq.com/mcp` |
| [Scopture](plugins/scopture) | Work on engineering projects. | OAuth | `https://api.scopture.com/mcp` |
| [ScoreStarling](plugins/scorestarling) | Convert music across formats. | OAuth | `https://mcp.scorestarling.com/mcp` |
| [SCOUT for Federal Contracting](plugins/scout-for-federal-contracting) | Federal contracting intel. | OAuth | `https://mcp.primerfp.com/mcp/` |
| [Scoutee](plugins/scoutee) | Find public tenders. | None | `https://scoutee.org/api/mcp/public` |
| [Scoutpost](plugins/scoutpost) | Monitor sources for news. | OAuth | `https://scoutpost.ai/mcp` |
| [Scovell by Rotunda](plugins/scovell) | Name screening and reviews. | OAuth | `https://scovell.rotundahq.com/mcp` |
| [Screenata](plugins/screenata) | SOC 2, HIPAA & ISO readiness. | OAuth | `https://api.screenata.com/mcp` |
| [Screeningpass](plugins/screeningpass) | Offres, contacts et e-mails. | OAuth | `https://screeningpass.fr/mcp` |
| [ScreenshotAgent](plugins/screenshotagent) | Keep screenshots current. | OAuth | `https://screenshotagent.com/mcp` |
| [ScreenVerb](plugins/screenverb) | Search your screenshot library. | OAuth | `https://mcp.screenverb.com/mcp` |
| [Scribble](plugins/scribble) | Handwritten cards in real ink. | OAuth | `https://scribblecards.com/api/mcp` |
| [Scribe](plugins/scribe) | Manage company email signature. | OAuth | `https://mcp.scribe-mail.com/mcp` |
| [ScribeToAny](plugins/scribetoany) | Transcribe audio and video. | OAuth | `https://scribetoany.com/api/mcp` |
| [Scribiz](plugins/scribiz) | Context for any video link. | None | `https://scribiz.com/mcp` |
| [ScriptNib](plugins/scriptnib) | Connect your screenplay work. | OAuth | `https://scriptnib.com/mcp` |
| [SCVD x402 Verifier](plugins/scvd-x402-verifier) | Check x402 doors and receipts. | None | `https://scvd.store/mcp` |
| [SE Ranking](plugins/se-ranking) | SEO data & rank tracking. | OAuth | `https://api.seranking.com/mcp` |
| [Seal Copilot](plugins/seal-copilot) | Analyze your marketing data. | OAuth | `https://mcp.sealmetrics.com/mcp` |
| [SealGate Beeper](plugins/sealgate-beeper) | Search and manage messages. | OAuth | `https://mcp.sealgate.ai/mcp` |
| [Seam](plugins/seam) | Automate Smart Devices. | None | `https://mcp.seam.co/mcp` |
| [Seamless](plugins/seamless) | Find leads & automate outreach. | OAuth | `https://mcp.seamless.ai/mcp` |
| [Search1API](plugins/search1api) | Live web access for AI agents. | OAuth | `https://mcp.search1api.com/mcp` |
| [SearchFit](plugins/searchfit) | AI visibility and content. | OAuth | `https://api.searchfit.ai/mcp` |
| [Searchland](plugins/searchland) | Find UK land and planning data. | OAuth | `https://mcp.searchland.co.uk/v1/all` |
| [SeatCommons](plugins/seatcommons) | Find events and tickets. | None | `https://mcp.seatcommons.com/mcp` |
| [seats.aero](plugins/seats-aero) | Find award flights with points. | None | `https://seats.aero/mcp` |
| [Seaworthy Insurance](plugins/seaworthy-insurance) | Disability insurance estimates. | None | `https://mcp.seaworthy.io/mcp` |
| [Seayora](plugins/seayora) | Rental property management. | OAuth | `https://seayora.com/mcp` |
| [Secondhand Marketplace](plugins/secondhand-marketplace) | Search used marketplaces. | OAuth | `https://secondhandmcp.com/mcp` |
| [Secret World — Hidden Gems](plugins/secret-world-hidden-gems) | Find hidden gems worldwide. | None | `https://sworld.co.uk/mcp` |
| [SecretBox](plugins/secretbox) | Dining, hotel & spa experience. | None | `https://mcp.api-and-you.com/mcp` |
| [SecureLend](plugins/securelend) | Compare loans and financing. | None | `https://mcp.securelend.ai/mcp` |
| [SecureSMTP](plugins/securessmtp) | Send and track app email. | OAuth | `https://securessmtp.com/api/mcp` |
| [seenpaid](plugins/seenpaid) | Schedule social media posts. | OAuth | `https://api.seenpaid.com/mcp` |
| [SeeyaTrip](plugins/seeyatrip) | Find hotels and flights. | None | `https://mcp.seeyatrip.com/mcp` |
| [Segue](plugins/segue) | Memory for ML development. | OAuth | `https://segue.ai/mcp` |
| [Seguro Match](plugins/seguro-match) | Compare insurance. | None | `https://seguromatch.com/api/agent/mcp` |
| [Seistream Blockchain Data](plugins/seistream-blockchain-data) | Explore Sei EVM & Cosmos data. | None | `https://api.seistream.app/mcp` |
| [Selah](plugins/selah) | Your Bible reading progress. | OAuth | `https://api.selah.to/mcp` |
| [SelectBNBs Verify](plugins/selectbnbs-verify) | Check Korean stay permits. | None | `https://selectbnbs.com/mcp` |
| [SelfPub Go](plugins/selfpubgo) | Amazon Ads for KDP authors. | OAuth | `https://mcp.selfpubgo.com/mcp` |
| [Selfstorming](plugins/selfstorming) | Marketing ideas and evidence. | OAuth | `https://www.selfstorming.com/api/mcp` |
| [Seline](plugins/seline) | Chat with your website stats. | OAuth | `https://api.seline.com/mcp` |
| [Seller Assistant](plugins/seller-assistant) | Run Amazon wholesale ops. | OAuth | `https://mcp.sellerassistant.app/mcp` |
| [Sellergoo](plugins/sellergoo) | Profit analytics for sellers. | OAuth | `https://sellergoo.com/api/mcp` |
| [Selltro](plugins/selltro) | Your Selltro store, in chat. | OAuth | `https://mcp.selltro.com/mcp` |
| [SellWinners](plugins/sellwinners) | Find winning products and ads. | OAuth | `https://mcp.sellwinners.com/mcp` |
| [Sememe by bld.ai](plugins/sememe) | Hire a vetted dev to finish. | OAuth | `https://mcp.sememe.ai/mcp` |
| [Semji](plugins/semji) | Plan and score SEO content. | OAuth | `https://mcp.semji.com/mcp` |
| [Semrush (API key)](plugins/semrush-api-key) | Research keywords, backlinks, traffic, and competitors. | API key | `https://mcp.semrush.com/v2/mcp` |
| [Send](plugins/send-co) | Share work as a tracked link. | OAuth | `https://send.co/mcp` |
| [Send & Retain Emails](plugins/sendandretain) | Email templates & automations. | OAuth | `https://sendandretain.com/api/mcp` |
| [Send 2290](plugins/send2290) | Form 2290 truck tax answers. | None | `https://mcp.send2290.com/mcp` |
| [SenderKit](plugins/senderkit) | Email, SMS & push for your app. | OAuth | `https://mcp.senderkit.com/` |
| [SendHQ](plugins/sendhq) | Email API and inbox. | OAuth | `https://mcp.sendhq.cc/mcp` |
| [Sendly](plugins/sendly) | Contacts, campaigns, delivery. | OAuth | `https://app.sendly.now/api/mcp` |
| [Sendpaper](plugins/sendpaper) | Mail real postcards & letters. | None | `https://sendmypaper.com/mcp` |
| [SendRaven](plugins/sendraven) | Send and answer email. | OAuth | `https://mcp.sendraven.ai/mcp` |
| [Senna 传统术数引擎](plugins/senna) | 八字与六爻传统推演. | None | `https://api.superyun.cn/mcp` |
| [Sense Family AI](plugins/sense-family-ai) | Family calendar, lists, chores. | OAuth | `https://api.getsense.ai/mcp` |
| [Sensei Knowledge Base](plugins/sensei-knowledge-base) | Search and manage knowledge. | OAuth | `https://sensei.red/mcp` |
| [SenseLab](plugins/senselab) | Continual learning for your agents. | OAuth | `https://mcp.sense-lab.ai/mcp` |
| [Sent](plugins/sent) | Send SMS, RCS, and WhatsApp. | OAuth | `https://mcp.sent.dm/mcp` |
| [Sentinel Ridge AI Visibility](plugins/sentinel-ridge-ai-visibility) | AI visibility website audits. | None | `https://mcp.sentinelridgesoftware.com/mcp` |
| [Sentio Connect](plugins/sentio-connect) | Wallet balances and DeFi. | OAuth | `https://connect.sentio.xyz/v1/mcp` |
| [Sentry](plugins/sentry) | Retrieve detailed Sentry issue data and full stack traces. Also search and filter issues, update issue status, assignments, tags, bookmarks, and alerts. | OAuth | `https://mcp.sentry.dev/mcp` |
| [SEO Cockpit](plugins/seo-cockpit) | Read-only Search Console data. | OAuth | `https://seocockpit.online/mcp` |
| [SEO Keywords by VibeSEO](plugins/seo-keywords-by-vibeseo) | Keyword research, AI blogging. | OAuth | `https://mcp.vibeseo.dev/mcp` |
| [SEO Operator](plugins/seo-operator) | Read-only on-page SEO audits. | None | `https://mcp.seooperator.io/mcp` |
| [SEO with Distribb](plugins/seo-with-distribb) | SEO articles & backlinks. | OAuth | `https://distribb.io/mcp` |
| [SEO&OH AI](plugins/seo-and-oh-ai) | 내 녹음의 전사·요약·마인드맵 찾기. | OAuth | `https://mcp.seoandoh.kr/mcp` |
| [SEOcrawl AI](plugins/seocrawl-ai) | SEO and AI visibility data. | OAuth | `https://mcp.seocrawl.ai/mcp` |
| [Sepja](plugins/sepja-studio) | Shape your space in 3D. | OAuth | `https://sepja.com/mcp` |
| [Sequence Training](plugins/sequence-training) | Explore your climbing training. | OAuth | `https://dashboard.sequence-app.com/mcp` |
| [Sequencer](plugins/sequencer) | Create and edit AI videos. | None | `https://mcp.sequencer.media/mcp` |
| [Sequenzy](plugins/sequenzy) | Run your email marketing. | OAuth | `https://api.sequenzy.com/v1/mcp` |
| [SerialHunt](plugins/serialhunt) | Check US bill serial numbers. | None | `https://bigballi.com/SerialHunt/mcp` |
| [SERPHub](plugins/serphub) | Analyze your SEO and site data. | OAuth | `https://serphub.io/mcp` |
| [Serpstat](plugins/serpstat) | SEO data and keyword research. | OAuth | `https://mcp.serpstat.com/mcp` |
| [ServeStack](plugins/servestack) | Tools for restaurant owners. | None | `https://mcp.servestack.ai/mcp` |
| [ServGround](plugins/servground) | Read your ServGround workspace. | OAuth | `https://servground.com/api/mcp` |
| [ServiceM8](plugins/servicem8) | Automate your trade business. | OAuth | `https://servicem8.com/mcp` |
| [SESAM](plugins/sesam) | Simulate and analyze traffic. | OAuth | `https://sesam.co4e.com/mcp` |
| [Sessionboard](plugins/sessionboard) | Query and manage event data. | OAuth | `https://mcp.sessionboard.com/mcp` |
| [SessionKeeper](plugins/sessionkeeper) | Explore your D&D campaigns. | OAuth | `https://api.sessionkeeper.ai/mcp` |
| [Sessionplan](plugins/sessionplan) | Create and revise agendas. | None | `https://sessionplan.de/mcp` |
| [SessionRun](plugins/sessionrun) | Create workshop agendas. | OAuth | `https://sessionrun.app/mcp` |
| [Setlane: Gym Workout Tracker](plugins/setlane) | Track and manage workouts. | OAuth | `https://app.setlane.app/mcp` |
| [Setline](plugins/setline) | Find festival lineups. | None | `https://setlineapp.com/mcp` |
| [Settle - Group Decisions](plugins/settle-group-decisions) | Quick group votes, settled. | None | `https://settle.ink/api/mcp` |
| [SFT Brain](plugins/sft-brain) | Create and review flashcards. | OAuth | `https://sftbrain.com/mcp` |
| [Shager](plugins/shager) | Plan and publish social posts. | OAuth | `https://app.shager.ai/api/mcp` |
| [Shamela Link](plugins/shamela-link) | Search the Shamela library. | OAuth | `https://shamela.link/mcp` |
| [Shape Calendar](plugins/shape-calendar) | Plan training, sync to watch. | OAuth | `https://shapecalendar.com/mcp` |
| [ShapelessAI](plugins/shapelessai) | Post to LinkedIn, X and more. | OAuth | `https://shapelessai.com/mcp` |
| [Shapesoda](plugins/shapesoda) | Turn images into clean SVG. | None | `https://shapesoda.com/mcp` |
| [Share Artifacts](plugins/share-artifacts) | Publish reports and slides. | OAuth | `https://shareartifacts.dev/api/mcp` |
| [Share-A-Cart](plugins/share-a-cart) | Share shopping carts. | OAuth | `https://share-a-cart.com/mcp` |
| [SharedAI](plugins/sharedai) | Let your AI talk to theirs. | OAuth | `https://195.201.222.81.sslip.io/mcp` |
| [SharedBrief](plugins/sharedbrief) | Proposals with read receipts. | OAuth | `https://sharedbrief.com/mcp` |
| [Shareout](plugins/shareout) | Share what your agent makes. | OAuth | `https://shareout.io/mcp` |
| [ShareSign](plugins/sharesign) | Signatures, rooms & cap tables. | OAuth | `https://mcp.sharesign.co/mcp` |
| [ShareWatch](plugins/sharewatch) | Secure Google Workspace. | OAuth | `https://sharewatch.ai/mcp` |
| [SharksAPI.AI](plugins/sharksapi) | Marketing data and actions. | OAuth | `https://sharksapi.ai/mcp` |
| [Shaupa](plugins/shaupa) | Discover and save products. | OAuth | `https://shaupa.com/mcp` |
| [Sheet Music Analysis](plugins/sheet-music-analysis) | Harmony analysis on the score. | None | `https://mcp.sheetmusicanalysis.com/mcp` |
| [Sheetwise Label Maker](plugins/avery-labels) | Address labels from any list. | None | `https://avery-labels.zovo.one/mcp` |
| [Shellway](plugins/shellway) | Your PC, controlled by Reason. | OAuth | `https://mcp.getshellway.com/mcp` |
| [ShiftSum Time Card](plugins/time-card) | Hours worked, breaks, overtime. | None | `https://time-card.zovo.one/mcp` |
| [SHIP](plugins/ship) | Agentic coding for your SDLC. | OAuth | `https://mcp.letsship.ai/mcp` |
| [Shipday](plugins/shipday) | Automated Local Delivery. | OAuth | `https://api.shipday.com/v2/mcp` |
| [Shipink](plugins/shipink) | Ship and track your parcels. | OAuth | `https://mcp.shipink.io/mcp` |
| [ShipPDF](plugins/shippdf) | Create templates and PDFs. | OAuth | `https://mcp.shippdf.com/mcp` |
| [ShipStatic](plugins/shipstatic) | Deploy static sites instantly. | OAuth | `https://mcp.shipstatic.com/` |
| [Shlau](plugins/shlau) | Work with your Shlau data. | OAuth | `https://mcp.shlau.com/mcp` |
| [ShootPro24AI](plugins/shootpro24ai) | Photo & video post-production. | None | `https://shootpro24ai.com/mcp` |
| [Shop](plugins/shop) | Shop across millions of stores: find and compare over a billion products, build carts, and check out. | OAuth | `https://mcp.shop.com` |
| [Shop Nobi](plugins/shop-nobi) | Find and compare products. | None | `https://api.nobi.ai/v1/shop/mcp` |
| [ShopBooster](plugins/shopbooster) | Your shop's CRM, in chat. | OAuth | `https://getshopbooster.com/api/mcp` |
| [Shopis](plugins/shopis) | Run your store from chat. | OAuth | `https://shopis.ai/api/mcp` |
| [ShopItUp](plugins/shopitup) | Shop secondhand clothing. | None | `https://shopitup.ca/mcp` |
| [Shoptegrity](plugins/shoptegrity) | Shop local and independent. | None | `https://mcp.shopteg.com/mcp` |
| [Shoptet MCP](plugins/shoptet) | Manage your Shoptet eshop. | OAuth | `https://mcp.shoptet.com/mcp` |
| [Shortlist Pass](plugins/shortlist-pass) | Order from local food trucks. | None | `https://app.shortlistpass.com/mcp` |
| [Shorts Generator](plugins/shorts-generator) | Create and finish short videos. | OAuth | `https://shortsgenerator.com/mcp` |
| [Shorty](plugins/shorty) | Summarize and transcribe media. | OAuth | `https://aishorty.com/api/mcp` |
| [Shorty Edit](plugins/shorty-edit) | AI edits your ads. | OAuth | `https://mcp.shortyedit.com/mcp` |
| [ShotClick](plugins/shotclick) | Write and edit screenplays. | OAuth | `https://shotclick.ai/api/mcp` |
| [ShotPulled](plugins/shotpulled) | Track and dial in espresso. | OAuth | `https://mcp.shotpulled.com/mcp` |
| [Should I Fish?](plugins/shouldifish) | Tides & fishing times. | None | `https://shouldifish.app/mcp` |
| [Show & Tell](plugins/show-and-tell) | You show. Reason tells. | OAuth | `https://playshowandtell.com/mcp` |
| [Shruwd](plugins/shruwd) | Track your brand in AI search. | OAuth | `https://shruwd.io/mcp` |
| [SHVL](plugins/shvl) | Overdue invoices and reminders. | OAuth | `https://shvl.app/mcp` |
| [SideQuests](plugins/sidequests) | Find Rhode Island Quests. | None | `https://mcp.trysidequests.com/mcp` |
| [SideShift](plugins/sideshift) | Operate your SideShift company from Reason—manage campaigns, creators, applications, content, contracts, recruiting, messages, payouts, and more through secure OAuth. | OAuth | `https://app.sideshift.app/api/mcp` |
| [Siesta AI](plugins/siesta-ai) | Agents, knowledge & workflows. | OAuth | `https://api.siesta.ai/mcp` |
| [Sift Clips](plugins/sift-clips) | Search footage shared with you. | OAuth | `https://share-api.siftclips.com/mcp` |
| [Siftivo](plugins/siftivo) | Book recommendations for you. | None | `https://api.siftivo.com/mcp` |
| [Sigil](plugins/sigil) | Honest brand critiques. | None | `https://sigilbrandstudio.com/mcp` |
| [Sigma Prep Worksheets](plugins/sigma-prep-worksheets) | Printable math worksheets. | None | `https://sigmaprep.io/api/mcp` |
| [Sign PDF](plugins/sign-pdf) | Get documents signed. | OAuth | `https://mcp.portant.co/mcp` |
| [Signal by StackEnhance](plugins/signal-by-stackenhance) | What brands email, and when. | None | `https://mcp.stackenhance.com/mcp` |
| [Signal Six](plugins/signal-six) | Competitive intelligence. | OAuth | `https://signalsix.ai/api/mcp` |
| [SignalGrade](plugins/signalgrade) | Analyze and improve your music. | None | `https://api.signalgrade.com/mcp` |
| [SignalHire](plugins/signalhire) | B2B Data, emails & phone. | OAuth | `https://mcp.signalhire.services/mcp` |
| [SignalRaven](plugins/signalraven) | LinkedIn buying-intent signals. | OAuth | `https://api.signalraven.ai/mcp` |
| [SignalSumo](plugins/signalsumo) | Your SEO Data in Reason. | OAuth | `https://signalsumo.com/mcp` |
| [Signatoro](plugins/signatoro) | Email signatures for your team. | None | `https://signatoro.com/mcp` |
| [SignatureAPI](plugins/signatureapi) | E-signatures for developers. | OAuth | `https://mcp.signatureapi.com/mcp` |
| [SignupKit](plugins/signupkit) | Signup sheets from a chat. | OAuth | `https://signupkit.co/mcp` |
| [Sikkeraftale](plugins/sikkeraftale) | Lav en slutseddel i samtalen. | None | `https://www.sikkeraftale.dk/api/mcp` |
| [Simbye](plugins/simbye) | Find travel eSIM plans. | None | `https://mcp.simbye.com/mcp` |
| [Simcardo Connectivity Planner](plugins/simcardo-connectivity-planner) | Plan travel mobile internet. | None | `https://simcardo.com/mcp` |
| [Similarweb](plugins/similarweb) | Analyze website traffic, audiences, and competitors. | OAuth | `https://mcp.similarweb.com` |
| [Simma](plugins/simma) | Triathlon & endurance coaching. | OAuth | `https://mcp.getsimma.com/mcp` |
| [Simmie](plugins/simmie) | Build sales roleplay simulations with scoring rubrics and shareable practice links. | OAuth | `https://mcp.simmie.ai/mcp` |
| [Simple Commenter](plugins/simple-commenter) | Manage website feedback. | OAuth | `https://www.simplecommenter.com/api/mcp` |
| [Simple Macros](plugins/simple-macros) | Track calories and macros. | OAuth | `https://mcp.simplemacros.com/mcp` |
| [Simple Mind Map](plugins/branchlight) | Understand ideas visually. | None | `https://simple-mind-map-mtahreemalam.vercel.app/api/mcp` |
| [Simple Muscle: Workout Planner](plugins/simple-muscle-workout-planner) | Workout planner & tracker. | OAuth | `https://api.simplemuscle.ai/mcp` |
| [SimpleFeed News Free MCP](plugins/simplefeed-news-free) | Rights Cleared Content. | OAuth | `https://d3b8d1lqb9mb0.cloudfront.net/mcp` |
| [SimplePost for Social Media](plugins/simplepost-for-social-media) | Schedule & publish your posts. | OAuth | `https://app.simplepost.social/mcp` |
| [SimpleTicket](plugins/simpleticket) | Your ticket sales backoffice. | OAuth | `https://api.ticketplatform.online/mcp` |
| [Simpliciter AI](plugins/simpliciter-ai) | Legal research with sources. | OAuth | `https://simpliciter.ai/mcp` |
| [Simply Asking](plugins/simply-asking) | Ask your company knowledge. | OAuth | `https://simplyasking.io/mcp` |
| [Simply Business](plugins/simply-business) | Find small business insurance. | None | `https://ts-mcp.simplybusiness.com/mcp` |
| [Simply-Useful](plugins/simply-useful) | Manage your tasks and your day. | OAuth | `https://mcp.simply-useful.com/mcp` |
| [SimplySIM eSIM Finder](plugins/simplysim-esim-finder) | Find travel eSIM data plans. | None | `https://simplysim.co.uk/mcp` |
| [SimsaSplit](plugins/simsasplit) | Split group expenses. | OAuth | `https://simsasplit.simsala.dev/mcp` |
| [Simulator.Company](plugins/simulator) | From API to KPI in your IDE. | OAuth | `https://mcp.simulator.company/mcp` |
| [SingStat](plugins/singstat) | Explore Singapore statistics. | None | `https://chatwithsandra.singstat.gov.sg/mcp` |
| [SisuLift](plugins/sisulift) | Gym programs that progress. | None | `https://sisulift.app/mcp` |
| [Site SEO & AI Crawler Audit](plugins/site-check) | SEO, AI citation, CRO, leaks. | None | `https://sitecheck.openkrill.app/mcp` |
| [SiteGPT](plugins/sitegpt) | Manage AI support chatbots. | OAuth | `https://sitegpt.ai/mcp` |
| [SiteGuru](plugins/siteguru) | Improve your site's SEO. | OAuth | `https://mcp.siteguru.co/mcp` |
| [Sitelas](plugins/sitelas) | Build and manage your websites. | OAuth | `https://sitelas.com/api/mcp` |
| [Sitelemetry](plugins/sitelemetry) | Audit and improve websites. | OAuth | `https://sitelemetry.com/mcp` |
| [SiteTrax.io](plugins/sitetrax-io) | Logistics operations analytics. | OAuth | `https://mcp.sitetrax.io/mcp` |
| [SiteTriage](plugins/sitetriage) | Find out why a site is broken. | None | `https://ai.seyithanalkan.com/sitetriage/mcp` |
| [Sitewalk: SEO Audit & Crawler](plugins/sitewalk) | Crawl a site, fix SEO issues. | None | `https://audit.adityaarsharma.com/mcp` |
| [SiteWarming](plugins/sitewarming) | Manage and warm your domains. | OAuth | `https://mcp.sitewarming.com/mcp` |
| [sito: Kids & Baby Food](plugins/sito-kids-baby-food) | First foods & food scores. | None | `https://sito.kids/mcp` |
| [SitterSorted](plugins/sittersorted) | Ask your own sitters. | OAuth | `https://app.sittersorted.com/mcp` |
| [Sixtyfour Intelligence](plugins/sixtyfour-intelligence) | AI agents for intelligence. | OAuth | `https://mcp.sixtyfour.ai/mcp` |
| [SketchMonkey Design Studio](plugins/sketchmonkey-design) | Explore products and designs. | None | `https://sketchmonkey-neuraldeepnet.on.adaptive.ai/api/mcp` |
| [SkeuDesign](plugins/skeudesign) | Find icons for your designs. | OAuth | `https://skeudesign.com/mcp` |
| [Skilcrew](plugins/skilcrew) | Jobs & services marketplace. | OAuth | `https://mcp.skilcrew.com/mcp` |
| [Skillmap Pro](plugins/skillmap-pro) | Servicios y trabajo en Chile. | None | `https://skillmap.cl/mcp` |
| [Skillsail](plugins/skillsail) | Create and preview training. | OAuth | `https://skillsail.com/mcp` |
| [Skinow](plugins/skinow) | Ski weather and trip planning. | None | `https://skinow.co/mcp` |
| [Skode CRM](plugins/skode-crm) | Query and manage your CRM. | OAuth | `https://mcp.skode.ai/` |
| [SkyAccess](plugins/skyaccess) | Find private jet empty legs. | None | `https://mcp.skyaccess.com/mcp` |
| [Skyalo Travel Guide](plugins/skyalo-travel-guide) | Plan travel connectivity. | None | `https://skyalo.com/chatgpt/mcp` |
| [Skyelight](plugins/skyelight) | Feedback pinned on your app. | OAuth | `https://app.skyelight.ai/mcp` |
| [Skylar](plugins/skylar) | Sales coaching insights. | OAuth | `https://app.getskylar.com/mcp` |
| [Skysay](plugins/skysay) | Voice agents, calls, and SMS. | OAuth | `https://api.skysay.ai/mcp` |
| [SkyWatch](plugins/skywatch) | Search satellite imagery data. | None | `https://mcp.skywatch.com/mcp` |
| [Slabline](plugins/slabline) | Card values & AI grading. | None | `https://slabline.ai/mcp` |
| [Slashtel](plugins/slashtel) | Travel eSIM, top-up, recharge. | None | `https://slashtel.com/api/mcp` |
| [Slashy](plugins/slashy) | Manage email and calendar. | OAuth | `https://slashy.ctrlcenter.ai/mcp` |
| [Sleek](plugins/sleek) | Generate mobile app designs. | OAuth | `https://sleek.design/api/mcp` |
| [Sleekplan](plugins/sleekplan) | Manage customer feedback. | OAuth | `https://mcp.sleekplan.com/mcp` |
| [SlickTrip](plugins/slicktrip) | Track flight and hotel prices. | OAuth | `https://mcp.slicktrip.com/mcp` |
| [SlideForge](plugins/slideforge) | Create editable PowerPoint. | OAuth | `https://api.slideforge.dev/mcp` |
| [Slidely](plugins/slidely) | Create and edit presentations. | OAuth | `https://prod.slidely.ai/mcp` |
| [Slides AI](plugins/slides-ai) | Create and edit presentations. | OAuth | `https://api.gpt.space/servers/google-slides/mcp` |
| [Slides.com](plugins/slides) | Create, edit, preview, and share Slides.com presentations. | OAuth | `https://mcp.slides.com/` |
| [SlidesAI](plugins/slidesai) | Create presentation slides. | OAuth | `https://mcp.slidesai.io/mcp` |
| [SlideSpeak](plugins/slidespeak) | AI presentations from a prompt. | OAuth | `https://mcp.slidespeak.co/mcp` |
| [Slothy by CRMaps](plugins/slothy-by-crmaps) | Explore Costa Rica. | None | `https://mcp.crmaps.com/mcp` |
| [Smart Calendars AI](plugins/smart-calendars-ai) | Create and edit calendar feeds. | OAuth | `https://api.smartcalendars.ai/mcp` |
| [SmartFlow](plugins/smartflow) | Client projects and invoices. | OAuth | `https://portal.smartflowsa.ch/mcp` |
| [Smartling](plugins/smartling) | Manage Smartling translations. | OAuth | `https://mcp.smartling.com/mcp` |
| [SmartMarketingSuites](plugins/smartmarketingsuites) | Diagnoses revenue leaks. | None | `https://mcp.smartmarketingsuites.com/mcp` |
| [smarts.bio: AI for biology](plugins/smarts-bio-ai-for-biology) | Bioinformatics tools pipelines. | OAuth | `https://mcp.smarts.bio/mcp` |
| [Smartsheet](plugins/smartsheet) | Query and update sheets, rows, and workspaces. | OAuth | `https://mcp.smartsheet.com` |
| [SmartSpectra](plugins/smartspectra) | Contactless vitals, any camera. | OAuth | `https://mcp.presagetech.com/mcp` |
| [SmartTalks.ai](plugins/smarttalks-ai) | SmartTalks workspace ops. | OAuth | `https://mcp.smarttalks.ai/mcp` |
| [Smartypant Social Autopilot](plugins/smartypant-social-autopilot) | Social media on autopilot. | OAuth | `https://mcp.smartypant.xyz/mcp` |
| [SMAT](plugins/smat) | Plan and manage social posts. | OAuth | `https://api.smat.chat/api/mcp` |
| [SMB Compare](plugins/smb-compare) | Price business tools by cost. | None | `https://smbcompare.com/api/mcp` |
| [SMI Aware](plugins/smi-aware) | Order social media discovery. | None | `https://mcp.smiaware.com/mcp` |
| [SML RWA Evidence](plugins/robinhood-prediction-rwa) | Tokenized stock reference data. | None | `https://sml-robinhood-rwa-intelligence.onrender.com/mcp` |
| [Smooth PDF Reader](plugins/smooth-pdf-reader) | Smooth PDFs. Ask for change. | None | `https://smooth-pdf-reader.smooth-pdf-reader-cloudflare.workers.dev/mcp` |
| [Smoothspeak](plugins/smoothspeak-replies) | Write your next reply. | OAuth | `https://smoothspeak.ai/mcp` |
| [smry](plugins/smry) | Read articles from any link. | OAuth | `https://api.smry.ai/mcp` |
| [SnapAccruals](plugins/snapaccruals) | Bonus accruals from Excel. | None | `https://snapaccruals-chatgpt-398991694381.us-central1.run.app/mcp` |
| [SnapDub](plugins/snapdub) | Turn long videos into clips. | OAuth | `https://snapdub.ai/mcp` |
| [SnapRooster](plugins/snaprooster) | Your food log, in Reason. | OAuth | `https://snaprooster.com/mcp` |
| [SnapVisor](plugins/snapvisor) | Review visual regression tests. | OAuth | `https://mcp.snapvisor.io/` |
| [SnowSure](plugins/snowsure) | Live snow reports & forecasts. | None | `https://snowsure.ai/mcp` |
| [Social Growth Engineers](plugins/social-growth-engineers) | Viral app marketing research. | OAuth | `https://socialgrowthengineers.com/mcp` |
| [Social Index](plugins/social-index) | Earned media value benchmarks. | OAuth | `https://mcp.earnedmediavalues.com/mcp` |
| [Social Magnum](plugins/social-magnum) | Plan and manage social posts. | OAuth | `https://socialmagnum.com/api/mcp` |
| [Social Post Previewer](plugins/social-post-previewer) | Preview social posts. | OAuth | `https://smepost.io/api/mcp` |
| [SocialAPI Post Scheduler Inbox](plugins/socialapi-post-scheduler-inbox) | Social media post & inbox. | OAuth | `https://api.social-api.ai/mcp` |
| [SocialBu](plugins/socialbu) | Manage your social media. | OAuth | `https://socialbu.com/mcp` |
| [SocialClaw](plugins/socialclaw) | Schedule social media posts. | OAuth | `https://getsocialclaw.com/mcp` |
| [SocialFaktory](plugins/socialfaktory) | Make and post social content. | OAuth | `https://socialfaktory.com/mcp` |
| [Socialinsider](plugins/socialinsider) | Social media analytics. | OAuth | `https://mcp.socialinsider.io/mcp` |
| [Sociality.io for social media](plugins/sociality-io-for-social-media) | Track analytics, compare data. | OAuth | `https://api.sociality.io/mcp` |
| [SocialNarratives](plugins/socialnarratives) | Social stories and schedules. | OAuth | `https://socialnarratives.ai/mcp` |
| [SocialSeal](plugins/socialseal) | Video research & creator stats. | OAuth | `https://mcp.socialseal.co/mcp` |
| [Socialstats](plugins/socialstats) | Social performance analytics. | OAuth | `https://api.socialstats.com/mcp` |
| [SofiaStage Events](plugins/sofiastage-events) | Find Bulgarian cultural events. | None | `https://api.sofiastage.com/mcp` |
| [Softhills](plugins/softhills) | Search Softhills SDK docs. | None | `https://ai.softhills.net/mcp` |
| [Softr](plugins/softr) | Build business apps and tools. | OAuth | `https://mcp.softr.io/mcp` |
| [Software Notion](plugins/software-notion) | Game facts and companion apps. | None | `https://software-notion.de/mcp` |
| [Solarium](plugins/solarium) | Bookkeeping your AI can run. | OAuth | `https://mcp.trysolarium.com/mcp` |
| [Sóley](plugins/soley) | Soley: book Iceland travel. | OAuth | `https://api.soley.travel/mcp` |
| [Solo](plugins/solo) | A SoloMail address in Reason. | None | `https://solomail.io/mcp` |
| [Solo 401k Calculator](plugins/solo-401k-calculator) | Calculate solo 401k limits. | None | `https://contribution-calculator.bestsolo401k.app/mcp` |
| [Solve CRM](plugins/solve-plugin) | Search and update your CRM. | OAuth | `https://mcp.solve360.com/mcp` |
| [Somantic](plugins/somantic) | German real estate search. | OAuth | `https://www.somantic.net/api/mcp/` |
| [Sommelier's Window](plugins/sommeliers-window) | Wine drinking windows. | None | `https://sommelierswindow.com/api/mcp` |
| [Sonar ASO](plugins/sonar-aso) | App store optimization. | OAuth | `https://trysonar.app/mcp` |
| [Sonar Connections](plugins/sonar-connections) | Event floors and open data. | OAuth | `https://mcp.sonarconnections.com/` |
| [Sonarlex Word Puzzle](plugins/sonarlex) | Daily game: guess the word. | None | `https://unsaid.ambientapp.ai/mcp/claude` |
| [Sonatype](plugins/sonatype) | AI-powered dependency intelligence. | API key | `https://mcp.guide.sonatype.com/mcp` |
| [Songs To Your Eyes](plugins/songs-to-your-eyes) | Find music for video and film. | None | `https://mcp.songstoyoureyes.com/mcp` |
| [Songstats](plugins/songstats) | Music performance analytics. | OAuth | `https://api.songstats.com/mcp` |
| [SongUp AI](plugins/songup-ai) | Hear and make AI songs. | None | `https://songupai.com/mcp` |
| [Sonilo](plugins/sonilo) | AI Music and Sound Effects. | OAuth | `https://api.sonilo.com/mcp` |
| [Sonix](plugins/sonix) | Use Sonix transcripts. | OAuth | `https://api.sonix.ai/mcp` |
| [Sonnenbad Kestrich](plugins/sonnenbad-kestrich) | Öffnungszeiten und Badinfos. | None | `https://sonnenbad-kestrich.de/mcp` |
| [Sonny](plugins/sonny) | Manage customer support. | OAuth | `https://usesonny.com/mcp` |
| [Sonos](plugins/sonos) | Play music and radio from your connected music services, or your Sonos favorites and Sonos playlists. | OAuth | `https://mcp.ws.sonos.com/mcp` |
| [Sorinai](plugins/sorinai) | AI notepad for your meetings. | OAuth | `https://mcp.sorinai.com/mcp` |
| [Sotrics](plugins/sotrics) | Amazon seller analytics. | OAuth | `https://app.sotrics.com/api/mcp` |
| [Soul Family AI](plugins/soul-family-ai) | Meditations and teachings. | None | `https://soulfamily.ai/mcp` |
| [SoundBreak](plugins/soundbreak) | Create AI Music with Artists. | None | `https://mcp.soundbreak.ai/mcp` |
| [Soundcharts](plugins/soundcharts) | Actionable Data for the Music. | OAuth | `https://mcp.soundcharts.com/mcp` |
| [SoundDeal](plugins/sounddeal-test) | Music deal benchmarks. | None | `https://www.sounddeal.com/api/mcp` |
| [SourcePRD](plugins/sourceprd) | The product, not the plan. | OAuth | `https://pm.sourceprd.com/mcp` |
| [Sovrnti](plugins/sovrnti) | Sovereign tech benchmarking. | OAuth | `https://graph.sovrnti.io/mcp` |
| [Soxoa](plugins/soxoa) | Choose an automation pilot. | None | `https://soxoa.com/mcp` |
| [SpaceCloud Global](plugins/spacecloud-global) | International rental spaces. | None | `https://mcp.spacecloud.city/mcp` |
| [Spacefast](plugins/spacefast) | Turn an idea into a website, dashboard, report, or small web tool you can share. | OAuth | `https://mcp.spacefast.com` |
| [Spaceship](plugins/spaceship) | Search domain availability. | OAuth | `https://mcp.spaceship.com/mcp` |
| [SPACEXPLORATION](plugins/spacexploration) | Commercial real estate search. | None | `https://spacexploration.com/mcp` |
| [SPACInsider](plugins/spacinsider) | SPAC and de-SPAC market data. | OAuth | `https://api.spacinsider.com/v2/mcp` |
| [SparkQuote NEC Calculators](plugins/sparkquote-nec-calculators) | NEC electrical calculators. | None | `https://sparkquote.ai/mcp` |
| [SparkToro](plugins/sparktoro) | Audience research and insights. | OAuth | `https://mcp.sparktoro.com/mcp` |
| [Speak AI](plugins/speak-ai) | Meeting and recording insights. | OAuth | `https://api.speakai.co/v1/mcp` |
| [Speak To Your Database](plugins/speak-to-your-database) | Ask your Odoo or SQL database. | OAuth | `https://speaktoyourdatabase.com/mcp` |
| [SpeakApp](plugins/speakapp) | Search meeting transcripts. | OAuth | `https://mcp.speakapp.com/mcp` |
| [Speaking Coach](plugins/speaking-coach) | Practice aloud. Improve. | None | `https://speaking-coach-plugin.vercel.app/mcp` |
| [Special Education Law](plugins/special-education-law) | Search special ed case law. | OAuth | `https://specialedlaw.com/api/mcp` |
| [Specialized Bicycle Components](plugins/specialized-bicycle-components) | Discover Specialized Bikes. | None | `https://mcp.specialized.com/mcp` |
| [Spectare](plugins/spectare) | A page built for each visitor. | None | `https://spectare.ai/api/mcp` |
| [Specter](plugins/specter) | B2B data for deal sourcing. | OAuth | `https://mcp.tryspecter.com/mcp` |
| [Specter Systems](plugins/specter-systems) | CRM, tasks & workflows. | None | `https://mcp.spectersystems.io/mcp` |
| [Spectr](plugins/spectr) | Specs, stories and budgets. | OAuth | `https://mcp.spectr.pm/mcp` |
| [Spekboom](plugins/spekboom) | Stays that fund conservation. | None | `https://mcp.spekboom.org/mcp` |
| [Speko](plugins/speko) | Transcribe audio, synthesize speech, and place real phone calls through one Speko account. | OAuth | `https://mcp.speko.ai/mcp` |
| [Spellbinder](plugins/spellbinder) | Find MTG cards and build decks. | OAuth | `https://spellbinder.gg/api/mcp` |
| [Spelt](plugins/spelt) | Turn your idea into a company. | OAuth | `https://joinspelt.com/mcp` |
| [Spensa](plugins/spensa) | Restaurant ordering & invoices. | OAuth | `https://www.spensa.ai/api/mcp` |
| [Spera](plugins/spera) | Build and test strategies. | OAuth | `https://api.spera.bot/mcp?mode=authoring&quot` |
| [Sphera Credit Data](plugins/sphera-credit-data) | Canadian interest rate data. | None | `https://data.spheracredit.com/mcp` |
| [Sphere Calorie Tracker](plugins/sphere-calorie-tracker) | Log meals and track calories. | OAuth | `https://api.getsphere.io/functions/v1/mcp` |
| [SpinFreeze Recipes for CREAMi](plugins/spinfreeze-creami-recipes) | Recipes for CREAMi, macros. | None | `https://spinfreeze.com/mcp` |
| [Spinify](plugins/spinify) | Sales leaderboards & coaching. | OAuth | `https://mcp.spinify.com/mcp` |
| [Spinn Radio](plugins/spinn-radio) | Radio, podcasts & audiobooks. | None | `https://spinnradio.com/mcp` |
| [Spkr - Chat to Podcast Episode](plugins/spkr-chat-to-podcast-episode) | AI Chat -> podcast episode. | None | `https://mcp.spkr-app.com/mcp` |
| [SplashScout](plugins/splashscout) | Find family friendly hotels. | None | `https://splashscout.co.uk/api/mcp` |
| [Spline](plugins/spline) | 3D scenes and web design. | OAuth | `https://mcp.spline.design/mcp` |
| [Splot](plugins/splot) | Log and plan meals. | OAuth | `https://app.splot.health/mcp` |
| [Spokenly](plugins/spokenly-transcription) | Transcribe and discuss audio. | None | `https://api.spokenly.app/mcp` |
| [Sponge](plugins/sponge) | Wallet for your agent. | OAuth | `https://api.wallet.paysponge.com/chatgpt/mcp` |
| [SportsAPIs.dev](plugins/sportsapis-dev) | Find sports data & odds APIs. | None | `https://sportsapis.dev/mcp` |
| [Spotahome](plugins/spotahome) | Find rental homes. | None | `https://mcp.spotahome.com/mcp` |
| [Spotify Confidence](plugins/confidence) | Spotify Confidence's hosted MCP server: manage feature flags, experiments and rollouts in your Confidence account. | OAuth | `https://mcp.confidence.dev/mcp/flags` |
| [Spotify Confidence Docs](plugins/confidence-docs) | Spotify Confidence's hosted documentation MCP server: search Confidence feature-flag, experimentation and SDK docs. | OAuth | `https://mcp.confidence.dev/mcp/docs` |
| [Spott](plugins/spott) | Run recruiting workflows. | OAuth | `https://mcp.spott.io/mcp` |
| [Spotted.gg](plugins/spotted-gg) | CS2 match times and alerts. | None | `https://spotted.gg/mcp` |
| [Spotts - Korea Festival](plugins/spotts-korea-festival) | 한국의 공개 행사와 축제 정보를 찾아봅니다. | None | `https://spotts.kr/mcp` |
| [Spreadsheets GPT Workspace](plugins/spreadsheets-gpt-workspace) | Automate spreadsheet work. | OAuth | `https://api.gpt.space/servers/google-sheets/mcp` |
| [Spredo](plugins/spredo) | Telegram B2B sales & leads. | OAuth | `https://mcp.spredo.io/mcp` |
| [SpriteCook](plugins/spritecook) | Create and animate game art. | OAuth | `https://mcp.spritecook.ai/mcp` |
| [Sprites](plugins/sprites) | Give Reason its own computer. | OAuth | `https://mcp.fly.io/` |
| [Sprizzy](plugins/sprizzy) | YouTube video promotion. | None | `https://mcp.sprizzy.com/mcp` |
| [Sprouts Data Intelligence](plugins/sprouts-data-intelligence) | Find. Enrich. Campaign. | OAuth | `https://claude.mcpsprouts.ai/mcp` |
| [Squads](plugins/squads) | Build football tactics. | None | `https://squads.xxox-xxox-xxox.jp/mcp` |
| [Square Deal](plugins/square-deal) | Check property overassessment. | None | `https://mcp.squaredeal.tax/chatgpt` |
| [Square Yards](plugins/square-yards) | Find properties in India. | None | `https://mcp.squareyards.com/mcp` |
| [Squarespace](plugins/squarespace) | Find domains, run your store. | None | `https://mcp.squarespace.com/mcp` |
| [Squatch Connect](plugins/squatch-connect) | Travel eSIM plans & prices. | None | `https://saasquatchlab.com/mcp` |
| [Squidlor](plugins/squidlor) | Oracle prices and transfers. | None | `https://api.squidlor.com/mcp` |
| [Squish](plugins/squish) | Navigate video by timecode. | None | `https://api.getsquish.app/mcp` |
| [SRS (Spaced Repitation System)](plugins/srs-spaced-repitation-system) | Learn • Review • Master. | OAuth | `https://srs.viewlyt.com/mcp` |
| [SSHOW](plugins/sshow) | Design and animate slides. | OAuth | `https://s.show/mcp` |
| [Stable](plugins/stable) | Find mail, read scanned documents, and call Stable API endpoints. | None | `https://mcp.usestable.com/mcp` |
| [Stable Baseline](plugins/stable-baseline) | Documentation, plans & boards. | OAuth | `https://api.stablebaseline.io/functions/v1/cloud-serve/mcp` |
| [Stable.com](plugins/stable-com) | Swap info and order tracking. | None | `https://api-defi.stable.com/v1/mcp` |
| [StableJack Research](plugins/stablejack-research) | Market research and insights. | OAuth | `https://ai.stable-jack.com/mcp` |
| [STACK](plugins/stack) | Work with your STACK projects. | OAuth | `https://mcp.stackct.com/mcp` |
| [StackerScan](plugins/stackerscan) | Live gold and silver premiums. | None | `https://stackerscan.com/mcp` |
| [Stacktree](plugins/stacktree) | Publish HTML to a private link. | OAuth | `https://stacktr.ee/mcp` |
| [StageReview](plugins/stagereview) | Program și recenzii de teatru. | None | `https://stagereview.ro/mcp` |
| [Standvirtual](plugins/standvirtual) | Your dream car in Standvirtual. | None | `https://mcp.standvirtual.com/mcp` |
| [Starcovery](plugins/starcovery) | Find and hire creators. | OAuth | `https://www.starcovery.com/api/mcp` |
| [StarryKit](plugins/starrykit) | Create and edit visual designs. | OAuth | `https://mcp.starrykit.com/mcp` |
| [Stashiro](plugins/stashiro) | Visual Spaces and native cards. | OAuth | `https://www.stashiro.com/api/mcp` |
| [Statable](plugins/statable) | Read and set up web analytics. | OAuth | `https://mcp.statable.com/mcp` |
| [StatsHawk](plugins/statshawk) | Scores, stats, and standings. | OAuth | `https://mcp.statshawk.ai/mcp` |
| [Statsig](plugins/statsig) | Inspect and manage feature gates, experiments, dynamic configs, and metrics. | OAuth | `https://api.statsig.com/v1/mcp` |
| [Statz Football](plugins/statz-football) | Football stats & projections. | None | `https://statz.ai/mcp` |
| [Stay Portland](plugins/stay-portland) | Explore Portland rental homes. | None | `https://stayportland.com/mcp` |
| [StayForWork: Housing & Hotels](plugins/stayforwork) | Extended stays for work travel. | None | `https://stayforwork.com/mcp` |
| [StayFritz](plugins/stayfritz) | Find and book stays. | None | `https://mcp.stayfritz.com/mcp` |
| [Stayonomy](plugins/stayonomy) | Real travel prices & booking. | None | `https://stayonomy.com/mcp` |
| [Stayspan Schengen Days](plugins/schengen-days) | Count and plan Schengen stays. | None | `https://schengen-days.zovo.one/mcp` |
| [StayThere](plugins/staythere) | Find direct vacation stays. | None | `https://staythere.ai/api/mcp` |
| [Steadily](plugins/steadily) | Get landlord insurance quotes. | None | `https://mcp.steadily.com/mcp` |
| [Steady](plugins/steady) | Stay in sync with your team. | OAuth | `https://app.steady.space/mcp` |
| [Steep](plugins/steep) | Query Steep workspace data. | OAuth | `https://mcp.steep.app/mcp` |
| [Stele](plugins/stele) | Share memory across AI agents. | OAuth | `https://app.stele-ai.dev/api/mcp` |
| [Stem](plugins/stem) | Connect your AIs to one brain. | OAuth | `https://awase.dev/stem` |
| [StemConsole](plugins/stemconsole) | Split, mix and practise music. | None | `https://stemconsole.ai/mcp` |
| [StepGenie](plugins/stepgenie) | USMLE questions and flashcards. | None | `https://mcp.stepgenie.app/mcp` |
| [StewAI](plugins/stewai) | Find, run, build workflows. | OAuth | `https://api.stewai.com/mcp` |
| [Stickers.com](plugins/stickers) | Custom stickers and labels. | None | `https://mcp.stickers.com/mcp` |
| [Sticklight](plugins/sticklight) | Create apps and websites. | OAuth | `https://mcp.sticklight.com/mcp` |
| [stierproducts](plugins/stierproducts) | Product tier lists, all cited. | None | `https://mcp.stierproducts.com/mcp` |
| [STILL Artwork Credits](plugins/still-artwork-credits) | Create artwork credits. | None | `https://still-mcp.still-limit-c6ac.workers.dev/mcp` |
| [Stilnote](plugins/stilnote) | Find products and plan rooms. | OAuth | `https://stilnote.com/api/mcp` |
| [StitchGrid](plugins/stitchgrid-workspace) | Your apparel production office. | None | `https://www.stitchgrid.com/api/mcp` |
| [Stoa](plugins/stoa-practice) | Stoic meditations and lessons. | OAuth | `https://mcp.stoameditation.com/mcp` |
| [StockFit](plugins/stockfit) | Financial API you can rely on. | OAuth | `https://api.stockfit.io/mcp` |
| [Stockholm Archipelago Trail](plugins/stockholm-archipelago-trail) | Plan hikes & ferry routes. | None | `https://map.stockholmarchipelagotrail.com/mcp` |
| [stockinsights.ai - India](plugins/stockinsights-india-plugin) | Public market research. | OAuth | `https://api-in.stockinsights.ai/mcp` |
| [StockLens](plugins/stocklens) | Stock picking intelligence. | OAuth | `https://mcp.stocklens.com/mcp` |
| [Stockly by Analytos Labs](plugins/stockly) | AI inventory control tower. | OAuth | `https://stockly.analytos.ai/mcp` |
| [StockPortfolio.pro](plugins/stockportfolio-pro) | SEC filings and financials. | OAuth | `https://stockportfolio.pro/mcp` |
| [Stocktwits](plugins/stocktwits) | Retail investor community. | OAuth | `https://mcp.stocktwits.com/mcp` |
| [StockViz Mutual Funds](plugins/stockviz-mutual-funds) | Mutual fund research. | OAuth | `https://mutual-fund-mcp.stockviz.workers.dev/mcp` |
| [Stoic](plugins/stoic) | Daily Stoic journal. | None | `https://stoic.host.safrow.com/mcp` |
| [Stora: ASO & Apple Ads](plugins/stora-app-growth) | Grow installs. Make ads count. | OAuth | `https://stora.rocks/mcp` |
| [StoreInspect](plugins/storeinspect) | Find Shopify store data. | OAuth | `https://mcp.storeinspect.com/mcp` |
| [Storied AI](plugins/storied-ai) | High-stakes narrative drafts. | OAuth | `https://mcp.storiedinc.com/mcp` |
| [Storieta](plugins/storieta) | Read the classics in pictures. | None | `https://storieta.com/mcp` |
| [STORM Brains4Ai](plugins/storm-brains4ai) | Automate AI workflows safely. | None | `https://getbrains4ai.com/api/mcp` |
| [Storra for Creators](plugins/storra-for-creators) | Charity stories to tell. | OAuth | `https://mcp.getstorra.com/mcp` |
| [Storyblocks](plugins/storyblocks) | Discover stock media. | OAuth | `https://mcp.storyblocks.com/mcp` |
| [Storydoc](plugins/storydoc) | Build and track presentations. | OAuth | `https://mcp.storydoc.com/mcp` |
| [Storyflow](plugins/storyflow) | Plan projects on visual boards. | OAuth | `https://mcp.storyflow.so/mcp` |
| [StrategyTune: Backtesting](plugins/strategytune-backtesting) | Research and backtest ideas. | OAuth | `https://strategytune.com/mcp` |
| [Stratify](plugins/stratify) | Describe a strategy. Test it. | OAuth | `https://stratify-mcp.aeon-labs.site/mcp` |
| [Streak](plugins/streak) | Search and manage Streak CRM pipelines, deals, contacts, organizations, tasks, and timeline activity. | OAuth | `https://api.streak.com/mcp` |
| [StreamExpose](plugins/streamexpose) | Prepare YouTube live radios. | None | `https://streamexpose.com/mcp` |
| [Streamline Icons](plugins/streamline-icons) | Insert PNG and SVG icons, illustrations, elements and emojis from Streamline, plus open-source sets like Lucide, Heroicons, Phosphor and Font Awesome. | None | `https://public-api.streamlinehq.com/mcp` |
| [STREEQ](plugins/streeq) | Your fitness record in Reason. | OAuth | `https://mcp.streeq.app/mcp` |
| [StrengthCode](plugins/strengthcode) | Program and lift tools. | None | `https://strengthcode.co/mcp` |
| [Stride AI](plugins/stride) | Work your Stride backlog. | OAuth | `https://www.stride.page/api/mcp/stride` |
| [StrikerAPI](plugins/strikerapi) | Soccer data and stats. | OAuth | `https://mcp.strikerapi.com/mcp` |
| [String](plugins/string) | LLM-ready web data for agents. | OAuth | `https://mcp.usestring.ai/v3/mcp` |
| [StringSpec](plugins/stringspec) | Lab-measured tennis strings. | None | `https://stringspec.com/mcp` |
| [Stripe](plugins/stripe) | Look up Stripe customers, subscriptions, invoices, charges, and products through Stripe's hosted MCP server. | OAuth | `https://mcp.stripe.com` |
| [Strix](plugins/strix) | Ship with confidence that what you deploy is secure. Strix runs AI penetration tests and PR security reviews against your web apps, APIs, and repositories, so Devin can find, fix, and verify vulnerabilities before they reach production. List scans and open vulnerabilities by severity, pull a finding's evidence and remediation steps into a code fix, update its status, retest it, or export it to Jira or Linear. Start scans and schedules against verified assets and check supply-chain findings and analytics. Read-only tools have no side effects. Scans spend credits and send traffic to your targets. | OAuth | `https://app.strix.ai/mcp` |
| [Structura JSON Diff](plugins/json-diff) | Compare JSON paths and types. | None | `https://json-diff.zovo.one/mcp` |
| [Structured](plugins/structured) | All in one daily planner. | OAuth | `https://mcp.structured.app/mcp` |
| [StudioFly](plugins/studiofly) | Studio classes, members, dues. | OAuth | `https://mcp.studiofly.fit/mcp` |
| [Study Hiragana](plugins/study-hiragana) | Learn to write kana & kanji. | None | `https://studyhiragana.com/mcp` |
| [StudyArena](plugins/studyarena) | Compare AI answers for study. | OAuth | `https://studyarena.com/api/mcp` |
| [StuMana](plugins/stumana) | Student management. | OAuth | `https://stumana.com/mcp` |
| [Stuon](plugins/stuon) | Study data, goals, and habits. | OAuth | `https://mcp.stuon.space/mcp` |
| [Stymie Golf](plugins/stymie-golf) | Find golf. Plan your rounds. | None | `https://mcp-production-680d.up.railway.app/mcp` |
| [Stytch](plugins/stytch) | Stytch integration to manage your Stytch project | OAuth | `https://mcp.stytch.dev/mcp` |
| [Subdivide](plugins/subdivide) | Metronome and click tracks. | None | `https://mcp.subdivide.app/mcp` |
| [Subframe](plugins/subframe) | Design UI for your codebase. | OAuth | `https://mcp.subframe.com/mcp` |
| [Subnano Browse](plugins/subnano-browse) | Browse published Posts. | None | `https://mcp.subnano.ai/mcp` |
| [SubscriptionFlow](plugins/subscriptionflow) | Manage Subscriptions With AI. | None | `https://mcp.subscriptionflow.com/mcp` |
| [Subtext](plugins/subtext) | Review Subtext session recordings and manage privacy rules | OAuth | `https://api.fullstory.com/mcp/subtext` |
| [Subvento](plugins/subvento) | French public aid by SIREN. | None | `https://subvento.finance/mcp` |
| [Success.co](plugins/success-co) | Next-gen software to run EOS®. | OAuth | `https://success.co/mcp` |
| [SueldoNeto](plugins/sueldoneto) | Calcula tu salario neto España. | None | `https://tusalario.app/mcp` |
| [Suger](plugins/suger) | Manage cloud GTM data. | None | `https://suger.io/mcp` |
| [Sugra API](plugins/sugra-api) | Data from primary sources. | OAuth | `https://mcp.sugra.ai/mcp` |
| [Sumble](plugins/sumble) | Account research for sales. | OAuth | `https://mcp.sumble.com/mcp` |
| [Sumline](plugins/sumline) | Real estate deal calculations. | OAuth | `https://usesumline.com/mcp` |
| [SummitPlate Cookbook](plugins/summitplate-cookbook) | Recipes, plans and groceries. | None | `https://www.summitplate.com/api/mcp` |
| [Sunate](plugins/sunate) | Manage your CRM from Reason. | OAuth | `https://crm.sunate.app/mcp` |
| [Sunlet: Tasks & Daily Planner](plugins/sunlet) | Save tasks and plan your day. | OAuth | `https://sunlet.app/mcp` |
| [Sunsama](plugins/sunsama) | Focus on what matters, today. | OAuth | `https://api.sunsama.com/mcp` |
| [SunSeekr](plugins/sunseekr) | Sunny terraces, hour by hour. | OAuth | `https://mcp.sunseekr.com/mcp` |
| [Sunvane Golden Hour](plugins/golden-hour) | Sun times & shoot planning. | None | `https://golden-hour.zovo.one/mcp` |
| [Supabase](plugins/supabase) | Connect a Supabase account: inspect projects, run SQL, read logs, and search docs through Supabase's hosted MCP server. | OAuth | `https://mcp.supabase.com/mcp` |
| [Supadata](plugins/supadata) | Video transcripts & web pages. | OAuth | `https://api.supadata.ai/mcp` |
| [Supademo](plugins/supademo) | Create and manage demos. | OAuth | `https://mcp.supademo.com/mcp` |
| [Supareels](plugins/supareels) | Free b-roll and video overlays. | None | `https://supareels.com/mcp` |
| [Suparelay](plugins/suparelay) | International calls from chat. | None | `https://suparelay.app/mcp` |
| [Suped](plugins/suped) | DMARC, SPF & DKIM Agent. | OAuth | `https://www.suped.com/api/mcp` |
| [Super Carl](plugins/super-carl) | AI relationship intelligence. | OAuth | `https://api.supercarl.ai/mcp` |
| [Super Map World](plugins/super-map-world) | Search country & world maps. | None | `https://supermap.world/mcp` |
| [Superagent](plugins/superagent) | Security findings, red-team reports, and guardrails from Superagent. | API key | `https://www.superagent.sh/mcp` |
| [SuperBooks](plugins/superbooks) | Bookkeeping and invoices. | OAuth | `https://app.superbooks.io/mcp` |
| [SuperBot](plugins/superbot) | Support insights & training. | OAuth | `https://superbotapp.ai/api/mcp` |
| [Superbrain Finanzas](plugins/superbrain-finanzas) | Registra y consulta finanzas. | OAuth | `https://mcp-finanzas-personales-345830648064.us-central1.run.app/mcp` |
| [Superbridger](plugins/superbridger) | Schedule social media posts. | OAuth | `https://superbridger.com/api/mcp` |
| [SUPERCASA](plugins/supercasa) | Find your new home in Portugal. | None | `https://mcp.supercasa.pt/mcp` |
| [SuperCool](plugins/supercool) | Videos, sites, decks and more. | OAuth | `https://mcp.supercool.com/mcp` |
| [Supercurve Marketing Teammate](plugins/supercurve) | Your AI marketing teammate. | OAuth | `https://mcp.supercurve.ai/mcp` |
| [SuperDB](plugins/superdb) | Your app database in Reason. | OAuth | `https://mcp.superdb.com.br/mcp` |
| [Superforms](plugins/superforms) | Make forms, pipe answers back. | OAuth | `https://superforms.co/mcp` |
| [Superfunds](plugins/superfunds) | Explore Israeli mutual funds. | OAuth | `https://api.superfunds.ai/mcp` |
| [Superhuman Mail](plugins/mcp-mail) | Use Superhuman Mail through its hosted MCP server. | OAuth | `https://mcp.mail.superhuman.com/mcp` |
| [Supericons](plugins/supericons) | Find the right icon faster. | None | `https://mcp.supericons.dev/mcp` |
| [SuperLinkin](plugins/superlinkin) | LinkedIn inbox & reply drafts. | OAuth | `https://superlinkin.com/api/mcp` |
| [Superlist](plugins/superlist) | Manage tasks and lists. | OAuth | `https://app.superlist.com/mcp` |
| [Superlog](plugins/superlog) | Triage errors in Slack. | OAuth | `https://superlog.sh/api/mcp` |
| [SuperMCP](plugins/supermcp) | Compare Israeli grocery prices. | None | `https://supermcp.co.il/mcp` |
| [SuperMe](plugins/superme) | Ask people who've been there, get multiple perspectives, and make better decisions about your work. | OAuth | `https://mcp.superme.ai` |
| [Supermemory](plugins/supermemory) | Store, search, and recall long-term memory and context through Supermemory's hosted MCP server. | OAuth | `https://mcp.supermemory.ai/mcp` |
| [Supermetrics](plugins/supermetrics) | Supermetrics integration to access 200+ marketing data sources | OAuth | `https://mcp.supermetrics.com/mcp` |
| [SuperPrompter](plugins/superprompter) | Guarda y organiza guiones. | OAuth | `https://app.nomad.ooo/api/mcp` |
| [SuperQDA](plugins/superqda) | Analyze qualitative research. | OAuth | `https://superqda.com/mcp` |
| [SuperSend](plugins/supersend) | B2B sales outreach. | OAuth | `https://mcp.supersend.io/mcp` |
| [Superset](plugins/superset-training) | Coach and log workouts. | None | `https://www.supersetapp.com/api/mcp/public` |
| [Supersimple](plugins/supersimple) | Ask questions, build data apps. | OAuth | `https://app.supersimple.io/mcp` |
| [Superwall](plugins/superwall) | Paywalls and revenue analytics. | OAuth | `https://mcp.superwall.com/mcp` |
| [Supplement Intelligence](plugins/supplement-intelligence) | Supplement evidence research. | None | `https://mcp.supplement-intelligence.com/mcp` |
| [Support Ticket Validator](plugins/support-ticket-validator) | Check support ticket fields. | None | `https://support-ticket-validator.sidcraigau.workers.dev/mcp` |
| [SupportFabric](plugins/supportfabric) | Run your customer support. | OAuth | `https://mcp.supportfabric.com/mcp` |
| [Surfer](plugins/surfer) | AI visibility and content. | OAuth | `https://mcp.surferseo.com/mcp` |
| [Survicate](plugins/survicate) | Customer Feedback Platform. | OAuth | `https://mcp.survicate.com/mcp` |
| [SVG Diagram](plugins/svgdiagram) | Ideas into editable diagrams. | None | `https://api.svgdiagram.ai/rest/v1/chatgpt/mcp` |
| [SVG Lab](plugins/svglab) | Design app UI, icons, logos. | OAuth | `https://svglab.app/mcp` |
| [SVG.new](plugins/svg-new) | Convert images to SVG. | OAuth | `https://svg.new/api/mcp` |
| [Swagger](plugins/swagger) | Swagger integration to build, govern, and document APIs | OAuth | `https://swagger.mcp.smartbear.com/mcp` |
| [SwedishExpat](plugins/swedish-expat) | Swedish relocation guides. | None | `https://swedish-expats.com/mcp` |
| [Sweescape](plugins/sweescape) | Manage your event operations. | OAuth | `https://mcp.sweescape.com/mcp` |
| [Sweet Analytics](plugins/sweet-analytics) | Ask your data anything. | OAuth | `https://mcp.sweetanalytics.com/mcp` |
| [SwiftProbate](plugins/swiftprobate) | Look up and manage probate. | OAuth | `https://www.swiftprobate.com/api/mcp/estate` |
| [Swiggy Food](plugins/swiggy-food) | Order food from your favorites. | OAuth | `https://mcp.swiggy.com/mcp` |
| [Swigs Cloud](plugins/swigs-cloud) | Deploy and host in Switzerland. | OAuth | `https://swigs.cloud/api/mcp` |
| [Swiss FTTH Coverage](plugins/swiss-ftth-coverage) | Check and track Swiss fibre. | None | `https://ftth.metavshn.com/mcp` |
| [Swiss Touristy](plugins/swiss-touristy) | Swiss private transfer quotes. | OAuth | `https://mcp.swisstouristy.com/mcp` |
| [Swiss Trademark Deposit](plugins/swiss-trademark-deposit-global) | Prepare Swiss trademark work. | None | `https://trademarks.ogram.swiss/mcp` |
| [Switchbooks](plugins/switchbooks) | Categorize and post transactions. | OAuth | `https://app.switchbooks.ai/api/mcp` |
| [SwitchNest](plugins/switchnest) | Control your smart home. | OAuth | `https://onlineswitch.bhartitechnical.com/mcp` |
| [SwitchWize](plugins/switchwize) | Compare verified rates. | None | `https://www.switchwize.com/api/mcp` |
| [Sybill](plugins/sybill) | Context layer for revenue orgs. | OAuth | `https://mcp.sybill.ai/mcp` |
| [Symbioza](plugins/symbioza) | Run GPU jobs under a spend cap. | OAuth | `https://symbioza.dev/mcp` |
| [Symbol](plugins/symbol) | Store and share knowledge. | OAuth | `https://mcp.symbol.chat/mcp` |
| [SynapticRelay](plugins/synapticrelay) | Find online freelancers. | OAuth | `https://synapticrelay.com/mcp` |
| [Sync Socials](plugins/sync-socials) | Create videos and posts. | OAuth | `https://app.sync-socials.com/api/mcp` |
| [sync. labs](plugins/sync-labs) | Lipsync, dub & talking photos. | OAuth | `https://mcp.sync.so/mcp` |
| [Syncee AI Dropship & Wholesale](plugins/syncee-ai-dropship-and-wholesale) | Explore dropshipping products. | None | `https://mcp.syncee.com/mcp` |
| [Synci](plugins/synci) | Ask about your banking data. | OAuth | `https://api.synci.io/mcp` |
| [Synergieloc CAO](plugins/synergieloc-cao-plugin) | From design to building permit. | None | `https://synergieloc.fr/mcp` |
| [SynPulse](plugins/synpulse) | B2B Email & LinkedIn outreach. | OAuth | `https://mcp.synpulse.app/mcp` |
| [Synthesia](plugins/synthesia) | Make AI videos in the chat. | OAuth | `https://mcp.synthesia.io/mcp` |
| [Synthesis Astrology](plugins/synthesis-astrology) | Your zodiac sign composition. | None | `https://synthesisastrology.com/mcp` |
| [Synthetic Users](plugins/synthetic-users) | Research with synthetic users. | OAuth | `https://api.syntheticusers.com/mcp` |
| [Synthflow Docs](plugins/synthflow-docs) | Synthflow's hosted documentation MCP server: search the Synthflow AI voice-agent platform docs. | None | `https://docs.synthflow.ai/_mcp/server` |
| [Syntropic](plugins/syntropic) | Write to your data warehouse. | OAuth | `https://mcp.getsyntropic.com/mcp` |
| [Sytex](plugins/sytex) | Automate Projects End-to-End. | OAuth | `https://mcp.sytex.io/mcp` |
| [tabiori](plugins/tabiori) | Create travel plans. | OAuth | `https://mcp.tabiori.com/editor` |
| [table](plugins/table) | Save and update your network. | OAuth | `https://mcp.usetable.ai/mcp` |
| [Table12](plugins/table12) | Find and book a table. | None | `https://table12.com/mcp` |
| [TABLEALL](plugins/tableall) | Reserve fine dining in Japan. | None | `https://mcp.tableall.com/sse` |
| [Tableau](plugins/tableau) | See and understand data. | OAuth | `https://mcp.tableau.com/` |
| [TableGo](plugins/tablego) | Find a table at TableGo venues. | None | `https://mcp.tablego.uk/mcp` |
| [TableLink](plugins/tablelink) | Book a TableLink restaurant. | None | `https://mcp.tablelink.app/mcp` |
| [TableThis](plugins/tablethis) | Shared databases for your AI. | OAuth | `https://tablethis.ai/mcp` |
| [Tableu](plugins/tableu) | Tarot readings and reflection. | OAuth | `https://lakefrontdev.com/mcp` |
| [Tabularia](plugins/tabularia) | Read and revise your book. | OAuth | `https://mcp.tabularia.app/mcp` |
| [Tabulous](plugins/tabulous) | Manage scientific lab data. | OAuth | `https://app.tabulous.ai/mcp` |
| [Tabzoola](plugins/tabzoola) | Price custom index tabs. | None | `https://tabzoola.com/api/mcp` |
| [Tactiq](plugins/tactiq) | Find answers in your meetings. | OAuth | `https://mcp.tactiq.io/` |
| [Tacty](plugins/tacty) | Loyalty cards via NFC and QR. | OAuth | `https://www.tacty.co/mcp` |
| [TagLogger](plugins/taglogger) | Find your tagged equipment. | OAuth | `https://api.taglogger.com/mcp` |
| [Tailor](plugins/tailor) | Ask the Tailor Platform docs. | None | `https://mcp.tailor.tech/` |
| [Tailor.ai](plugins/tailor-ai) | Find clothes from real shops. | None | `https://mcp.tailor.ai/mcp` |
| [Tailwind](plugins/tailwind) | Create & plan Pinterest Pins. | OAuth | `https://mcp.tailwind.ai/` |
| [Takealot Seller Connector](plugins/takealot-seller-connector) | Takealot seller data in chat. | OAuth | `https://takealot-mcp-production.up.railway.app/mcp` |
| [TakeHome Paycheck Calculator](plugins/takehome-paycheck-calculator) | Your paycheck after taxes. | None | `https://takehome-paycheck.vercel.app/mcp` |
| [Tako](plugins/tako) | Premium live data & web search. | OAuth | `https://mcp.tako.com/mcp` |
| [Talent Augmentation OS](plugins/taos) | Grow your skills with AI. | OAuth | `https://taoshq.com/mcp` |
| [Talentin AI](plugins/talentin-ai) | Source match & hire candidates. | OAuth | `https://mcp.talentin.ai/mcp` |
| [Taliara](plugins/taliara) | Run client work with AI. | OAuth | `https://app.taliara.co.uk/api/mcp` |
| [Tally](plugins/tally) | Create free forms and surveys. | OAuth | `https://mcp.tally.so/mcp` |
| [Tally Markets](plugins/tally-markets) | Your AI trading risk officer. | OAuth | `https://tally.markets/api/mcp` |
| [Tally Verify](plugins/tally-verify) | Prove your spreadsheet adds up. | None | `https://tally.jiegou.ai/mcp` |
| [Tallyproof Statement Converter](plugins/statement-converter) | Bank statement PDF to XLSX/CSV. | None | `https://statement-converter.zovo.one/mcp` |
| [TALON Knowledge](plugins/talon-knowledge) | Search TALON manuals, Q&A. | OAuth | `https://mcp.talon.jp/mcp` |
| [Talonic](plugins/talonic) | Extract data and talk to docs. | OAuth | `https://mcp.talonic.com/mcp` |
| [Tamarind Bio](plugins/tamarind-bio) | Protein and molecular design. | OAuth | `https://mcp.tamarind.bio/mcp` |
| [Tamloot](plugins/tamloot) | Search your sessions and notes. | OAuth | `https://mcp.tamloot.cc/mcp` |
| [Tana](plugins/tana) | Meetings, transcripts, tasks. | OAuth | `https://home.tana.inc/mcp` |
| [Tanod Documents](plugins/tanod-documents) | PDF and Office document tools. | None | `https://tanod.dev/mcp` |
| [TanStack](plugins/tanstack) | Build with the TanStack stack. | None | `https://mcp.tanstack.com/mcp` |
| [Tap](plugins/tap) | Compare and buy ad media. | OAuth | `https://mcp.tap.co/` |
| [Tap26](plugins/tap26) | Create and manage short links. | OAuth | `https://tap26.com/api/v1/mcp` |
| [TapNow](plugins/tapnow) | Your AI creative engine. | OAuth | `https://mcp.tapnow.ai/api/agent-gateway/mcp/general/mcp` |
| [TapWaterMap](plugins/tapwatermap) | US tap water quality by city. | None | `https://mcp.tapwatermap.com/mcp` |
| [TAQYID \| Halal Readiness Check](plugins/taqyid-halal-readiness-check) | For JAKIM halal certification. | None | `https://readiness.taqyid.cloud/mcp` |
| [Tarifaoteca da Otimiza.pro](plugins/tarifas-vale-transporte-otimiza) | Tarifas e VT do Brasil. | None | `https://otimizapro.com/tarifas-e-integracoes-transporte-publico-brasil/mcp` |
| [Tarot Card Picker](plugins/ai-tarot-reader) | Choose cards. Read the spread. | None | `https://mcp.aitarotreaders.com/mcp` |
| [Tarotap](plugins/tarotap) | Draw tarot cards for readings. | None | `https://tarotap.com/mcp` |
| [Tarsolution Tools](plugins/tarsolution-tools) | Format and inspect data. | None | `https://tools.tarsolution.com/mcp` |
| [Tarteel](plugins/tarteel) | Explore Quranic resources. | None | `https://mcp.tarteel.ai/mcp` |
| [tasarim.ai AI Catalog](plugins/tasarim-ai-catalog) | Find and compare AI tools. | None | `https://tasarim.ai/api/mcp` |
| [Task Mafia](plugins/task-mafia) | Tasks, lists and your crew. | OAuth | `https://taskmafia.com/mcp` |
| [Taskaid](plugins/taskaid) | Tasks for you and your agents. | OAuth | `https://taskaid.ai/mcp` |
| [TASKn](plugins/taskn) | Manage tasks and projects. | OAuth | `https://mcp.taskn.app/mcp` |
| [Taskpile](plugins/taskpile) | Capture, plan and finish tasks. | OAuth | `https://taskpile.app/api/mcp` |
| [TaskView](plugins/taskview) | Manage projects and tasks. | OAuth | `https://api.taskview.tech/mcp` |
| [Taste](plugins/taste) | Find your design references. | None | `https://mcp.buildwithtaste.com/mcp` |
| [Tattoos Wizard](plugins/tattoos-wizard) | Tattoo prices, artists, guides. | None | `https://mcp.tattooswizard.com/mcp` |
| [TATUAT.RO](plugins/tatuat) | Find tattoo supplies. | None | `https://api.tatuat.ro/mcp` |
| [Taverity](plugins/taverity) | Queue follow-up texts. | OAuth | `https://portal.taverity.com/mcp` |
| [Tavily](plugins/tavily) | Real-time web search, extract, map, and crawl tools powered by Tavily's hosted MCP server. | OAuth | `https://mcp.tavily.com/mcp` |
| [Tawteen 360](plugins/tawteen-360) | Business insights and audits. | OAuth | `https://mcp.tawteen360.com/mcp` |
| [Tax Filing Center](plugins/taxfilingcenter) | Business tax deadlines & rates. | None | `https://mcp.taxfilingcenter.com/mcp` |
| [Tax1099Payer](plugins/tax1099-payer) | Create and manage Payers. | OAuth | `https://mcp.tax1099.com/mcp` |
| [TaxDome](plugins/taxdome) | Tax firm and client portal. | OAuth | `https://mcp.taxdome.com/mcp` |
| [TaxHeaven](plugins/taxheaven) | Calculate UK tax & check MTD. | None | `https://taxheaven-chatgpt-app.vercel.app/mcp` |
| [Taxiger Doc](plugins/taxiger-doc) | Learn Belgian Taxi Rules. | None | `https://taxiger.com/mcp` |
| [TaxMadeEazy: Rideshare Ded](plugins/taxmadeeazy-rideshare-ded) | Rideshare Tax Deduction. | None | `https://mcp.taxmadeeazy.com/mcp` |
| [Taxorio](plugins/taxorio) | Czech invoices and taxes. | OAuth | `https://app.taxorio.cz/mcp` |
| [Tchin](plugins/tchin) | Mobile Money payments in FCFA. | OAuth | `https://tchin.tech/mcp` |
| [TeachMe.To](plugins/teachmeto) | Find your next local coach. | None | `https://api.teachme.to/agent/mcp` |
| [TEAM 30 — AI Company OS](plugins/team-30-ai-company-os) | Plan work with 31 AI roles. | None | `https://team30-ai-company-os.fly.dev/mcp` |
| [Team Event Planner](plugins/team-event-planner) | Plan team building events. | None | `https://bestcorporateevents.com/mcp` |
| [TeamReady](plugins/teamready) | Youth sports game scheduling. | None | `https://teamready-chatgpt-app.vercel.app/mcp` |
| [Teamtailor](plugins/teamtailor) | Manage recruiting data. | OAuth | `https://mcp.teamtailor.com/mcp` |
| [tebook](plugins/tebook) | Create picture books in chat. | OAuth | `https://tebook.net/mcp` |
| [TechDraw AI](plugins/techdrawai) | Photos to technical drawings. | OAuth | `https://techdrawai.com/mcp` |
| [TechJobs.vn](plugins/techjobs-vn) | Tech jobs hiring in Vietnam. | None | `https://techjobs.vn/mcp` |
| [Techy Surgeon Policy Radar](plugins/policy-radar) | Prices, ASC markets & policy. | None | `https://techysurgeon-mcp.netlify.app/policy/mcp` |
| [teem](plugins/teem) | Support, feedback, changelog. | OAuth | `https://teem.so/mcp` |
| [Teemeup](plugins/teemeup) | Search & book tee times. | None | `https://mcp.teemeup.ai/mcp` |
| [Tela](plugins/tela) | Team wiki with semantic search. | OAuth | `https://telawiki.com/api/mcp` |
| [Telepath](plugins/lemma-telepath) | Your Telegram, in Reason. | OAuth | `https://telepath.lemma.company/mcp` |
| [Teleprompter.com](plugins/teleprompter-com) | Draft Teleprompter.com scripts. | OAuth | `https://app.teleprompter.com/mcp` |
| [Telerivet](plugins/telerivet) | Send/automate SMS & WhatsApp. | OAuth | `https://api.telerivet.com/mcp` |
| [Telgani](plugins/telgani) | Rent a Car. | None | `https://mcp.telgani.com/mcp` |
| [Tella](plugins/tella) | Create and edit videos with AI. | OAuth | `https://api.tella.com/mcp` |
| [telli](plugins/telli) | Use telli through Charlie. | OAuth | `https://mcp.telli.com/mcp` |
| [TellTell](plugins/telltell) | Manage team email lists. | OAuth | `https://mcp.telltell.co/mcp` |
| [Telo](plugins/telo) | Explore your Apple Health. | OAuth | `https://telo.health/mcp` |
| [Templated](plugins/templated) | Generate images, videos & PDFs. | OAuth | `https://mcp.templated.io/mcp` |
| [Tempo Cron Explorer](plugins/cron-explorer) | Cron runs across timezones. | None | `https://cron-explorer.zovo.one/mcp` |
| [Temso](plugins/temso) | Track your brand in AI chats. | OAuth | `https://app.temso.ai/api/v1/mcp` |
| [Tender Town](plugins/tender-town) | Find public tenders to bid. | None | `https://tendertown.io/api/mcp` |
| [TendersAI](plugins/tendersai) | Public tenders and award data. | None | `https://tendersai.com/mcp` |
| [TENEKS](plugins/teneks) | Ask about calls and meetings. | OAuth | `https://api.teneks.ai/mcp` |
| [Tennis Life](plugins/tennis-life) | Your tennis season, organized. | None | `https://tennislife.life/mcp` |
| [Terac](plugins/terac) | Vetted human experts on demand. | OAuth | `https://terac.com/api/mcp` |
| [Termalin](plugins/termalin) | SSH to your servers from chat. | OAuth | `https://termal.in/mcp` |
| [Terminal Commands](plugins/terminal-commands-public) | Run commands on your machines. | OAuth | `https://mcp.terminalcommands.fr/mcp` |
| [Terminal49](plugins/terminal49) | Track containers and shipments. | OAuth | `https://mcp.terminal49.com/mcp` |
| [TerraLab](plugins/terralab) | GIS data for any place. | OAuth | `https://mcp.terra-lab.ai/mcp` |
| [Tessryx](plugins/tessryx) | Build and host live web apps. | OAuth | `https://mcp.tessryx.io/` |
| [Test Failure Triage](plugins/test-failure-triage) | Triage test failures. | None | `https://test-failure-triage.sidcraigau.workers.dev/mcp` |
| [Texas Electricity](plugins/texas-electricity) | Compare plans using real usage. | None | `https://mcp.meterplan.com/mcp` |
| [Texeno LaTeX and Typst Editor](plugins/texeno) | LaTeX and Typst papers to PDF. | OAuth | `https://mcp.texeno.com/mcp` |
| [TextExpander](plugins/textexpander) | Manage snippets. | OAuth | `https://mcp.textexpander.com/mcp` |
| [Textmagic](plugins/textmagic) | Send SMS and manage contacts. | OAuth | `https://mcp.textmagic.com/` |
| [TG Finder](plugins/tg-finder) | Find anyone on Telegram. | OAuth | `https://telegram-finder.io/mcp` |
| [Thailand Dive Map](plugins/thailand-dive-map) | Thai dive shops & liveaboards. | None | `https://api.thailanddivemap.com/mcp` |
| [The Ad Machine](plugins/the-ad-machine) | Answer questions. Get an ad. | None | `https://mcp.mikeauton.com/mcp` |
| [The Astro Diary](plugins/the-astro-diary) | Your day and week in astrology. | None | `https://theastrodiary.com/mcp` |
| [The Bidit Registry](plugins/bidit-registry) | Verified retailer price terms. | None | `https://registry.bidit.com.au/api/mcp` |
| [The Chute](plugins/the-chute) | Cattle and ranch records. | OAuth | `https://www.thechute.app/api/mcp` |
| [The Coin Daily](plugins/the-coin-daily) | Your crypto research desk. | OAuth | `https://mcp.thecoindaily.co/mcp` |
| [The Dinner Table Club](plugins/the-dinner-table-club) | Dinner parties with strangers. | None | `https://thedinnertable.club/mcp` |
| [The Expected Value](plugins/the-expected-value-full-diagnostic) | Card EV, prices and Manafolio. | None | `https://mcp.theexpectedvalue.com/mcp/claude` |
| [The Fly Market Intelligence](plugins/the-fly-market-intelligence) | Market research and news. | OAuth | `https://mcp.thefly.com/chatgpt/mcp` |
| [The Founding Reader](plugins/the-founding-reader) | Founding debates, verbatim. | None | `https://foundingreader.com/mcp` |
| [The Kingdom Bank](plugins/the-kingdom-bank) | Manage your invoices. | None | `https://mcp.thekingdombank.com/mcp` |
| [The Learning Mate](plugins/the-learning-mate) | Ask about your class results. | OAuth | `https://thelearningmate.com/api/mcp` |
| [The Living Bread](plugins/the-living-bread) | Scripture, prayer, a church. | None | `https://mcp.living-bread.org/mcp` |
| [The Machine](plugins/the-machine) | Your to-dos, people, promises. | OAuth | `https://mcp.themachine.computer/mcp` |
| [The Org](plugins/the-org) | Public org charts. | OAuth | `https://api.theorg.com/v1.1/mcp` |
| [The Prompting Company](plugins/prompting-company) | Brand visibility in AI answers. | OAuth | `https://mcp.promptingco.com/mcp` |
| [The Stoic Library](plugins/the-stoic-library) | Find and read Stoic sources. | None | `https://thestoiclibrary.com/mcp` |
| [The Vanya Adventure](plugins/the-vanya-adventure) | Tours and day trips in Vietnam. | None | `https://dv-tours.com/mcp` |
| [The Visa Services](plugins/the-visa-services) | Visa answers and applications. | None | `https://mcp.thevisa.com/mcp` |
| [The2410 Projects](plugins/the2410-projects) | Plan custom software projects. | None | `https://projects.the2410.com/mcp` |
| [TheBeanGeek](plugins/thebeangeek) | Specialty coffee directory. | OAuth | `https://thebeangeek.com/api/mcp` |
| [theCam](plugins/thecam) | Find pros. Plan your shoot. | OAuth | `https://api.thecam.app/user-mcp` |
| [TheDogs.app](plugins/thedogs-app) | Dog breed fit & real vet costs. | None | `https://mcp.thedogs.app/mcp` |
| [TheFoilBuddy](plugins/thefoilbuddy) | Foil spot wind & conditions. | None | `https://mcp.thefoilbuddy.com/mcp` |
| [Thegram](plugins/thegram-cloud) | One .gram for people and AI. | OAuth | `https://vault.thegram.one/mcp` |
| [Theia Insights](plugins/theia-insights) | Thematic investing data. | OAuth | `https://mcp.theiainsights.com/mcp` |
| [Theme Emporium](plugins/theme-emporium) | Generate UI theme previews. | None | `https://mcp.themeemporium.live/mcp` |
| [ThemeSniffer](plugins/themesniffer) | WP theme and plugin detector. | None | `https://themesniffer.com/api/mcp` |
| [ThePicks](plugins/thepicks) | K-beauty picked by real people. | None | `https://mcp.thepicks.io/mcp` |
| [There's An AI For That](plugins/there-s-an-ai-for-that) | Find AI tools for any task. | None | `https://theresanaiforthat.com/mcp` |
| [TheSignup](plugins/thesignup) | Organize volunteer signups. | OAuth | `https://thesignup.app/mcp` |
| [ThesisAI](plugins/thesisai) | Research drafts with citations. | OAuth | `https://thesisai.io/mcp` |
| [TheySaid](plugins/theysaid) | Research and usability tests. | OAuth | `https://ai.theysaid.io/api/mcp` |
| [Thicket - Project Management](plugins/thicket-project-management) | Manage projects and to-dos. | OAuth | `https://www.thickethq.com/api/mcp` |
| [ThinkMatch Introductions](plugins/thinkmatch-introductions-openai) | Find places to meet people. | None | `https://thinkmatch.app/mcp` |
| [thott.bot](plugins/thott-bot) | Reason knows WoW Forever. | OAuth | `https://mcp.thott.bot/mcp` |
| [ThoughtSpot](plugins/spottercode) | ThoughtSpot developer documentation — search Visual Embed SDK, REST API v2, and developer guides through MCP-compatible clients. | OAuth | `https://spottercode.thoughtspot.app/mcp` |
| [Three Peaks Challenge](plugins/three-peaks-challenge) | Event dates and booking help. | OAuth | `https://threepeakschallenge.uk/mcp` |
| [Threshold](plugins/threshold) | Book vacation rentals directly. | None | `https://threshold.rentals/api/mcp` |
| [Thrifle](plugins/thrifle) | Return policies, deals, prices. | None | `https://api.thrifle.com/api/mcp` |
| [ThriveStack Citedby](plugins/thrivestack) | AI search visibility insights. | OAuth | `https://api.app.thrivestack.ai/mcp` |
| [Thrixel](plugins/thrixel) | Your 3D creation engine. | OAuth | `https://api.thrixel.com/mcp` |
| [ThunderPhone](plugins/thunderphone) | Build and run AI phone agents. | OAuth | `https://api.thunderphone.com/v1/mcp` |
| [Tiana & Co. Seller Compliance](plugins/tiana-co-seller-compliance) | Free checks for US sellers. | None | `https://www.tiana-co.com/api/mcp` |
| [tickadoo](plugins/tickadoo) | Find & book live experiences. | None | `https://mcp.tickadoo.com/mcp` |
| [TickerLayer](plugins/tickerlayer) | Stocks, forex & crypto data. | OAuth | `https://mcp.tickerlayer.com/mcp` |
| [TickerTrac](plugins/tickertrac-assistant) | Saved theses, exact evidence. | OAuth | `https://api.tickertrac.com/mcp` |
| [Ticketbox.vn](plugins/ticketbox-vn) | Find events in Vietnam. | None | `https://mcp.ticketbox.vn/mcp` |
| [TickNow](plugins/ticknow) | Plan your day and track time. | OAuth | `https://mcp.ticknow.app/mcp` |
| [TickTick:To-Do List & Calendar](plugins/ticktick-to-do-list-and-calendar) | Reminder, Planner, Countdown. | OAuth | `https://mcp.ticktick.com/` |
| [TiGERit delivery](plugins/tigerit-delivery) | Products, orders, and sales. | OAuth | `https://mcp.tigerit.app/mcp` |
| [Tikita](plugins/tikita) | Create Tikita story drafts. | OAuth | `https://mcp.tikita.ai/mcp` |
| [TikTok for Business](plugins/tiktok-for-business) | Manage TikTok ad campaigns, ad groups, ads, audiences, creatives, and reports. | OAuth | `https://business-api.tiktok.com/open_mcp/tt-ads-mcp-layer` |
| [TillGraph](plugins/tillgraph) | Find local service businesses. | None | `https://tillgraph.com/mcp` |
| [Time Machine](plugins/time-machine) | AI-powered learning platform. | OAuth | `https://api.timeml.ai/api/v1/mcp` |
| [Timebook](plugins/timebook) | Track billable time. | OAuth | `https://usetimebook.com/mcp` |
| [TimeCamp](plugins/timecamp) | Track time and projects. | OAuth | `https://mcp.timecamp.com/mcp` |
| [TimeChimp](plugins/timechimp) | Hours, projects and planning. | OAuth | `https://mcp.timechimp.com/mcp` |
| [TimeLens](plugins/dev-6acedeae73b88191ab4ea35b0b0fe594) | Plan, track, and review time. | OAuth | `https://timelens.grow1000x.com/mcp` |
| [TimeLodge](plugins/timelodge) | Track time and manage work. | OAuth | `https://timelodge.com/mcp` |
| [TimePeace — Daily Log](plugins/timepeace-daily-log) | Plan and log your life. | OAuth | `https://mcp.timepeaceapp.com/mcp` |
| [Tineo](plugins/tineo) | Organize your travel plans. | OAuth | `https://api.tineo.ai` |
| [Tiniest Cloud](plugins/tiniest-cloud) | Deploy web apps with sign-in. | OAuth | `https://app.tiniest.cloud/mcp` |
| [TinyFish](plugins/tinyfish) | Run TinyFish web agents to navigate, click, and extract from any site. | OAuth | `https://agent.tinyfish.ai/mcp` |
| [TipRanks](plugins/tipranks) | Analyst-backed stock research. | OAuth | `https://mcp.tipranks.com/mcp/` |
| [TIRAVA - Taxi in Albania](plugins/tirava-taxi-in-albania) | Pre-book a taxi in Reason. | None | `https://mcp.tirava.app/mcp` |
| [Tiro](plugins/tiro) | Search and organize notes. | OAuth | `https://mcp.tiro.ooo/mcp` |
| [TIX](plugins/tix) | Live shows in Australia & NZ. | None | `https://tix.com.au/_hcms/api/mcp` |
| [tl;dv - AI Note Taker](plugins/tl-dv-ai-note-taker) | Fetch your meeting transcripts. | OAuth | `https://mcp.tldv.io/mcp` |
| [tldraw](plugins/tldraw) | Draw and visually collaborate with your agents inside Reason | None | `https://tldraw-mcp-app.tldraw.workers.dev/mcp` |
| [TLS Logistics Planner](plugins/texas-logistic-services) | Plan your logistics needs. | None | `https://chatgpt.texaslogisticservices.com/mcp` |
| [to3D](plugins/to3d) | Convert 2D images into 3D glTF. | None | `https://mcp.to3d.app/mcp` |
| [Tobie Benefits Compare](plugins/tobie-benefits-compare) | Compare health plan costs. | None | `https://plugins.tobie.team/mcp/benefits-compare` |
| [Tobie Total Rewards](plugins/tobie-total-rewards) | Compare job offers & benefits. | None | `https://plugins.tobie.team/mcp/total-rewards` |
| [TodayNYC](plugins/todaynyc) | NYC 3-hour plans & weekends. | None | `https://todaynyc.app/mcp` |
| [TodayTix](plugins/todaytix) | Discover theatre in your city. | None | `https://todaytix.com/mcp` |
| [Todoist](plugins/todoist) | Create, find, and complete tasks and projects. | OAuth | `https://ai.todoist.net/mcp` |
| [TodoWeekend](plugins/todoweekend) | Weekend events in nine cities. | None | `https://todoweekend.com/mcp` |
| [Toffu](plugins/toffu) | AI marketing agent. | OAuth | `https://mcp.toffu.ai/mcp` |
| [toflow.ai](plugins/toflow-ai) | Prospect, enrich, and outreach. | OAuth | `https://mcp.toflow.ai/mcp` |
| [TOISE](plugins/toise) | Land, owners & zoning, France. | None | `https://mcp.toiseai.com/mcp` |
| [Token Security](plugins/token-security) | Query identities, non-human identities, AI agents, secrets and security findings from Token Security. | OAuth | `https://mcp.app.token.security/mcp` |
| [TokenLab](plugins/tokenlab) | One design truth. For all. | OAuth | `https://tokenlab.design/mcp` |
| [TokenOS Contract Audit](plugins/tokenos-contract-audit) | Scan Solidity & Anchor code. | None | `https://tokenos.ai/api/mcp/apps/contract-audit` |
| [TokenOS dApp Builder](plugins/tokenos-dapp-builder) | Idea to buildable dApp spec. | None | `https://tokenos.ai/api/mcp/apps/dapp-builder` |
| [TokenOS Gas Tracker](plugins/tokenos-gas-tracker) | Live fees on five chains. | None | `https://tokenos.ai/api/mcp/apps/gas-tracker` |
| [TokenOS Token Launch Planner](plugins/tokenos-token-launch-planner) | Plan a Solana token launch. | None | `https://tokenos.ai/api/mcp/apps/token-launch-planner` |
| [TokenOS Tokenomics Designer](plugins/tokenos-tokenomics-designer) | Allocation & vesting design. | None | `https://tokenos.ai/api/mcp/apps/tokenomics-designer` |
| [TokenOS Wallet Inspector](plugins/tokenos-wallet-inspector) | Wallets, tokens, rug checks. | None | `https://tokenos.ai/api/mcp/apps/wallet-inspector` |
| [TokenTax](plugins/tokentax) | Review your crypto taxes. | OAuth | `https://api.app.tokentax.co/mcp` |
| [Toklytics](plugins/toklytics-tiktok-analytics) | Live TikTok analytics. | OAuth | `https://mcp.toklytics.app/mcp` |
| [Tokrate](plugins/tokrate) | Coding model speed, in context. | None | `https://tokrate.dev/api/public/v1/mcp` |
| [Tolstoy](plugins/tolstoy) | AI product videos & photos. | OAuth | `https://apilb.gotolstoy.com/mcp/v1/mcp` |
| [Tonebook Palette](plugins/tonebook-palette) | Compare colors, build boards. | None | `https://tonebook-muse-mcp-staging.vercel.app/api/openai-mcp-v1` |
| [Tonita](plugins/tonita) | Shopping Search and Discovery. | None | `https://mcp.tonita.co/mcp` |
| [tool4seller](plugins/tool4seller) | Amazon analytics & ad tools. | OAuth | `https://das-server.tool4seller.com/mcp` |
| [ToolMatch](plugins/toolmatch) | Find Reason apps. | None | `https://plugin.chat-prompt.com/mcp` |
| [Toopost](plugins/toopost) | Insights from trusted sources. | OAuth | `https://mcp.toopost.us/` |
| [TOP Tender Operating Platform](plugins/top-tender-operating-platform) | Croatian procurement data. | OAuth | `https://mcp.tender-op.com/mcp` |
| [TopAIMuza](plugins/topaimuza) | Ranking polskiej muzyki AI. | None | `https://topaimuza.pl/mcp` |
| [TopicLift Editorial Insights](plugins/topiclift-editorial-insights) | Editorial traffic insights. | OAuth | `https://topiclift.io/mcp` |
| [Topograph](plugins/topograph) | Official company evidence. | OAuth | `https://mcp.topograph.co/mcp` |
| [TÕPS](plugins/tops) | Lesson preparation in Estonian. | None | `https://mcp.tehisarud.ee/mcp` |
| [Total CMS](plugins/totalcms) | Total CMS docs and reference. | None | `https://mcp.totalcms.co/mcp` |
| [Total Parks](plugins/total-parks) | Find & book Holiday Parks. | None | `https://mcp.totalparks.com.au/mcp` |
| [Tote](plugins/tote) | Find and organize saved Totes. | OAuth | `https://mcp.tote.fyi/mcp` |
| [Totem](plugins/totem) | Coordinate AI agents. | OAuth | `https://totemlayer.com/mcp` |
| [Tough Tongue AI](plugins/tough-tongue-ai) | Automate and practice calls. | OAuth | `https://api.toughtongueai.com/api/public/mcp` |
| [Tour Buddy](plugins/tour-buddy) | Find venues and plan tours. | OAuth | `https://mcp.tourbuddy.co/mcp` |
| [Tourer Travel](plugins/tourer-travel) | Private transfers in Turkey. | None | `https://tourertravel.com/mcp` |
| [Tourision](plugins/tourision) | 360° virtual tours in chat. | None | `https://app.tourision.com/api/mcp` |
| [ToursByLocals](plugins/toursbylocals) | Book tours with local guides. | None | `https://mcp.toursbylocals.com/mcp` |
| [Towing Capacity Calculator](plugins/towing-capacity-calculator) | Check tow and payload limits. | None | `https://mcp.camptow.com/mcp` |
| [TPC Benchmarks](plugins/tpc-benchmarks) | Can an agent use this product? | None | `https://benchmarks.promptingcompany.com/mcp` |
| [Trabber](plugins/trabber) | Find flights, hotels and cars. | OAuth | `https://trabber.com/mcp` |
| [Trace](plugins/trace) | AI native technographics. | OAuth | `https://mcp.tracedata.ai/mcp` |
| [Traceable](plugins/traceable-docs) | Create and edit documents. | OAuth | `https://app.traceabledocs.com/api/mcp/mcp` |
| [Track Package.](plugins/track-package) | Track packages with Reason. | None | `https://everydaytrack.org/mcp` |
| [Trackberry](plugins/trackberry) | Track fresh produce shipments. | OAuth | `https://trackberry.com/mcp` |
| [TrackGleam](plugins/trackgleam) | Master and release your songs. | None | `https://trackgleam.com/mcp` |
| [Tracklified](plugins/tracklified-receipts) | Your receipts, easy to find. | OAuth | `https://app.tracklified.com/api/workspace/mcp` |
| [trackly](plugins/trackly-openai) | Find jobs and fill forms. | OAuth | `https://mcp.usetrackly.app/api/mcp` |
| [Trackr](plugins/trackr) | UGC campaign analytics. | OAuth | `https://app.ugctrackr.com/api/external/mcp` |
| [Trackside](plugins/trackside) | Analyze track sessions. | OAuth | `https://trackside.camotors.co/mcp` |
| [Trackstone](plugins/trackstone) | Rented homes: price and yield. | None | `https://www.trackstone.fr/mcp/public` |
| [Trade Chart](plugins/trade-chart) | Candlestick price chart. | None | `https://chart.openkrill.app/mcp` |
| [TradeCatalog](plugins/tradecatalog) | Supplier catalogues and orders. | OAuth | `https://tradecatalog.app/mcp` |
| [Tradehand](plugins/tradehand) | Book local UK tradespeople. | None | `https://tradehand.com/api/mcp` |
| [Trademark Dashboard](plugins/trademark-dashboard) | UK and US trademark research. | None | `https://www.trademarkdashboard.com/mcp` |
| [Trademarkmind](plugins/trademarkmind) | Check brand names and logos. | None | `https://mcp.trademarkmind.com/mcp` |
| [TradingNX Risk Manager](plugins/tradingnx-risk-manager) | Manage trade risk. | None | `https://api.tradingnx.com/mcp` |
| [Traffik Yacht Radar](plugins/traffik-yacht-radar) | Measured superyacht movement. | None | `https://traffik.ai/mcp` |
| [Trail Hits:Bicycle Maintenance](plugins/trail-hits-bicycle-maintenance) | Track your Bike's maintenance. | OAuth | `https://mcp.trailhits.com/mcp` |
| [Train Price Tracker](plugins/train-price-tracker) | Track Eurostar fares & dates. | OAuth | `https://mcp.trainpricetracker.com/mcp` |
| [TrainBrain](plugins/trainbrain) | Explore UK trains and routes. | None | `https://rail.mikegtn.net/mcp` |
| [TRAINEDBY](plugins/trainedby) | Coach from verified records. | OAuth | `https://mcp.trainedby.fit/mcp` |
| [Trainerrr](plugins/trainerrr) | Track fitness. | OAuth | `https://mcp.trainerrr.xyz/mcp` |
| [Trains on Map](plugins/trains-on-map) | Live train maps & delays. | None | `https://api.trainsonmap.com/mcp` |
| [Trainual](plugins/trainual) | Find how your company works. | OAuth | `https://mcp.trainual.com/mcp` |
| [Trakkr](plugins/trakkr) | Track AI search visibility. | OAuth | `https://api.trakkr.ai/mcp` |
| [Tralendr](plugins/tralendr) | Save and share trip plans. | OAuth | `https://mcp.tralendr.com/mcp` |
| [Tranmere-Web](plugins/tranmere-web) | Explore Rovers history. | OAuth | `https://mcp.tranmere-web.com/mcp` |
| [transcribe.so](plugins/transcribe-so) | Who said what, and when. | OAuth | `https://mcp.transcribe.so/mcp` |
| [Transcript LOL](plugins/transcript-lol) | Transcribe audio or video. | OAuth | `https://transcript.lol/api/mcp/mcp` |
| [TranscriptLab](plugins/transcriptlab) | YouTube + audio transcripts. | OAuth | `https://api.transcriptlab.dev/mcp` |
| [Transcriptor](plugins/transcriptor) | Video transcripts and metadata. | OAuth | `https://transcriptor.gateway.mcpal.io/mcp` |
| [TranscriptX](plugins/transcriptx) | Transcribe videos and audio. | OAuth | `https://transcriptx.ai/mcp` |
| [Transferhood](plugins/transferhood) | Private Airport Transfers. | None | `https://mcp.transferhood.com/mcp` |
| [TransGull](plugins/transgull) | Translate online meetings. | OAuth | `https://us2.transgull.com/mcp` |
| [Transition](plugins/transition-ai-coach) | Run, bike & triathlon coach. | OAuth | `https://mcp.transition.fun/mcp` |
| [Translations Universe](plugins/translations-universe) | Translation service quotes. | None | `https://mcp.translationsuniverse.com/mcp` |
| [Transloadit](plugins/transloadit) | Encode, resize and transcribe. | OAuth | `https://api2.transloadit.com/mcp` |
| [Trata](plugins/trata) | AI-powered research desk. | OAuth | `https://api.trata.com/mcp` |
| [TravCozy](plugins/travcozy) | All your trips in one place. | OAuth | `https://travcozy.com/v1/mcp-server` |
| [Travel Advisory](plugins/travel-advisory) | Travel Safety, Alerts & Tips. | None | `https://traveladvisory.io/mcp` |
| [Travelenie](plugins/travelenie) | Get help with travel logistic. | None | `https://mcp.travelenie.com/mcp` |
| [TravelSwitch](plugins/travelswitch) | Flights, Hotels & Packages. | None | `https://mcp.travelswitch.com/mcp` |
| [TravelYalla](plugins/travelyalla) | Find cheap flights & hotels. | None | `https://mcp.travelyalla.com/mcp` |
| [Traviz](plugins/traviz-planner) | Plan trips. See them clearly. | None | `https://traviz-plugin.ahi-lab.com/mcp` |
| [Travomint](plugins/travomint) | Cheap Flight Ticket. | None | `https://mcp.travomint.com/mcp` |
| [TravStar](plugins/travstar) | Australian tours & day trips. | None | `https://www.travstar.com/mcp` |
| [Treat Tracker](plugins/treat-tracker) | Find trick-or-treat houses. | None | `https://mcp.treattracker.org/mcp` |
| [Treater](plugins/treater) | Manage Treater from Reason. | OAuth | `https://mcp.trytreater.com/mcp` |
| [Treehorn](plugins/treehorn) | Daily audio: news & learning. | None | `https://mcp.treehorn.app/mcp` |
| [Treg](plugins/treg) | OpenRouter for tools - 4,000+ agent-callable endpoints across 113 providers: SEO and SERP data, backlinks, social and trends, people and company enrichment, ads, scraping. | OAuth | `https://treg.to/mcp/` |
| [TRELAB](plugins/trelab) | Public status and architecture. | None | `https://mcp.trematria.com/mcp` |
| [Trellis](plugins/trellis) | Trellis integration for trial court litigation research | OAuth | `https://mcp.trellis.law/anthropic` |
| [Trello](plugins/trello) | Manage your Trello workspace from chat: browse and create boards, view and move lists, create, update, move, archive, and complete cards with labels and due dates, manage checklists, capture Inbox… | OAuth | `https://mcp.trello.com/v1` |
| [Trendkia News](plugins/trendkia-news) | Find latest global news. | None | `https://mcp.trendkia.com/mcp` |
| [Treza](plugins/treza) | Create and edit AI videos. | OAuth | `https://trezalabs.com/api/mcp` |
| [Triathlon Pace](plugins/triathlon-pace) | Triathlon races and training. | OAuth | `https://mcp.triathlonpace.com/mcp` |
| [TribuJus](plugins/tribujus) | Verifiable Brazilian case law. | OAuth | `https://www.tribujus.com.br/api/mcp` |
| [Trifolia](plugins/trifolia) | Research Chilean law. | OAuth | `https://trifolia.cl/mcp` |
| [TRIGGERcmd](plugins/triggercmd) | Run commands on your computers. | OAuth | `https://triggercmd.com/mcp` |
| [TrimCarbon](plugins/trimcarbon) | Flight CO₂ estimates. | None | `https://mcp.trimcarbon.com/mcp` |
| [trip1](plugins/trip1) | Book hotels, pay with crypto. | None | `https://trip1.com/api/mcp` |
| [TripHelm](plugins/triphelm) | Plan trips on a calendar. | OAuth | `https://triphelm.com/mcp` |
| [Triple Whale](plugins/triple-whale) | Analyze e-commerce data. | OAuth | `https://mcp.triplewhale.com/` |
| [TripO by FreeTravel](plugins/tripo-by-freetravel) | Book global hotels with perks. | None | `https://mcp.freetravel.me/mcp` |
| [Trips, Made Yours.](plugins/trips-made-yours) | Plan and save shared trips. | None | `https://tripsmadeyours.com/mcp` |
| [Tripsy](plugins/tripsy) | Plan and organize your trips. | OAuth | `https://mcp.tripsy.app/mcp` |
| [Tripuck](plugins/tripuck) | Flights, hotels & eSIM plans. | None | `https://mcp.tripuck.com/mcp` |
| [TripWays](plugins/tripways) | Tours with live group prices. | None | `https://mcp.tripways.com/mcp` |
| [Trisport](plugins/trisport) | Shop sports gear in Romania. | None | `https://trisport.ro/mcp` |
| [trivago](plugins/trivago) | Find your ideal hotel, fast. | None | `https://mcp.trivago.com/mcp` |
| [TriviaQuiz](plugins/triviaquiz) | Run live quiz games. | None | `https://triviaquiz.pro/mcp` |
| [Trivis](plugins/trivis) | Bookkeeping for your company. | OAuth | `https://ai-api.trivis.ee/mcp` |
| [TroopRally](plugins/trooprally) | Polls, signups & appointments. | OAuth | `https://mcp.trooprally.com/mcp` |
| [Trooth Network](plugins/trooth-network) | Check a company's trust record. | OAuth | `https://api.trooth.co/public/mcp` |
| [Trove](plugins/trove-trove-technologies-inc) | Find and save your saves. | OAuth | `https://trove.life/mcp` |
| [Trovr](plugins/trovr) | NYC shows with music previews. | None | `https://trovr.ai/mcp` |
| [TruLata](plugins/trulata) | Your leads, in Reason. | OAuth | `https://api.trulata.com/mcp` |
| [TrulyAir](plugins/trulyair) | EPA AQI, measured or modeled. | None | `https://trulyair.com/mcp` |
| [TrulyCricket](plugins/trulycricket) | Live cricket scores and tables. | None | `https://trulycricket.com/mcp` |
| [Trupeo](plugins/trupeo) | Answer your team's email. | OAuth | `https://app.trupeo.com/mcp` |
| [TrusteeSaleData](plugins/trusteesaledata-sales) | Search US trustee sales. | None | `https://www.trusteesaledata.com/mcp` |
| [TrustMRR](plugins/trustmrr) | Discover verified startups. | None | `https://trustmrr.com/api/mcp` |
| [TruthScan](plugins/truthscan) | Identify AI-generated images. | OAuth | `https://truthscan.com/api/mcp` |
| [Trvlrr](plugins/trvlrr) | Every trip, past and planned. | OAuth | `https://trvlrr.app/mcp` |
| [Trykr](plugins/trykr) | Print your designs in Denmark. | None | `https://trykr.dk/mcp` |
| [TryPost](plugins/trypost) | Schedule social media posts. | OAuth | `https://app.trypost.it/mcp/trypost` |
| [TTS Studio: AI Text to Speech](plugins/tts-studio-ai-text-to-speech) | AI voice generator from text. | OAuth | `https://mcp.ttsstudio.ai/mcp` |
| [TubeAlfred](plugins/tubealfred-youtube) | TubeAlfred brings YouTube transcripts, comments and channel data into Reason. | OAuth | `https://mcp.tubealfred.com/` |
| [TubeGrade](plugins/tubegrade) | YouTube outliers & research. | OAuth | `https://api.tubegrade.com/mcp` |
| [Tucan](plugins/tucan) | Plan your content calendar. | OAuth | `https://api.usetucan.com/mcp` |
| [Tucktale Bedtime Stories](plugins/tucktale) | Bedtime stories, read aloud. | None | `https://alibihour.ambientapp.ai/mcp/claude` |
| [Tuio](plugins/tuio) | Home insurance quotes. | None | `https://tuio-mcp-demo.vercel.app/v2/mcp` |
| [Tuist](plugins/tuist) | Work with Tuist projects from Reason: migrate Xcode projects to generated workspaces, debug generation, and query builds, test runs, bundles, and cache runs from your Tuist dashboard. | OAuth | `https://tuist.dev/mcp` |
| [TuneWorks](plugins/tuneworks) | Performance car data & tools. | None | `https://tuneworks.ai/mcp` |
| [Tunio](plugins/tunio) | Run your radio stations. | OAuth | `https://mcp.tunio.ai/mcp` |
| [Tunmire](plugins/tunmire) | Format books and make covers. | OAuth | `https://mcp.tunmire.app/mcp` |
| [TuPartidoCorrupto](plugins/tupartidocorrupto) | Spanish politics, with sources. | None | `https://tupartidocorrupto.com/mcp` |
| [TurbineFi Prediction Bot Maker](plugins/build-and-backtest-a-prediction-market-bot) | powered by TurbineFi. | OAuth | `https://api.turbinefi.com/api/v1/mcp` |
| [TurboStack](plugins/turbostack) | Manage your TurboStack hosting. | OAuth | `https://mcp.hosted-power.com/mcp` |
| [Turso](plugins/turso) | Manage Turso Cloud (organizations, databases, groups) and run SQL from Reason via the hosted Turso MCP server — OAuth login, no API token to copy. | OAuth | `https://mcp.turso.ai/mcp` |
| [Tusella](plugins/tusella) | Etsy listing workspace. | OAuth | `https://mcp.tusella.com/mcp` |
| [TuSistema](plugins/tusistema) | Consultá tu sistema de gestión. | OAuth | `https://mcp.tusistema.ai/mcp` |
| [Tutors.kz](plugins/tutors-kz) | Find a tutor in Kazakhstan. | None | `https://tutors.kz/api/mcp` |
| [Tweek](plugins/tweek) | Minimal weekly planner. | OAuth | `https://tweek.so/mcp` |
| [Twelfth](plugins/twelfth) | Read your Twelfth workspace. | OAuth | `https://api.twelfth.ai/mcp` |
| [Twelve Data](plugins/twelve-data) | Financial market data. | OAuth | `https://mcp.twelvedata.com/mcp` |
| [Twenty](plugins/twenty) | CRM workspace tools. | OAuth | `https://mcp.twenty.com/mcp` |
| [Twilio Docs](plugins/twilio-docs) | Twilio's hosted documentation MCP server: search Twilio docs and API references for SMS, Voice, WhatsApp, Verify, SendGrid and other products. | None | `https://mcp.twilio.com/docs` |
| [TwinMind](plugins/twinmind) | AI Notes & Memory. | OAuth | `https://api.twinmind.com/mcp` |
| [Twistly AI Presentation Maker](plugins/twistly-ai-presentation-maker) | Create editable slide decks. | OAuth | `https://mcp.twistly.ai/mcp` |
| [Two Minute Reports](plugins/two-minute-reports) | Connect PPC & SEO Data Sources. | OAuth | `https://mcp.twominutereports.com/mcp` |
| [Typerelay](plugins/typerelay) | Find and save snippets. | OAuth | `https://mcp.typerelay.com/mcp` |
| [Tyra](plugins/tyra) | Discover events in NYC. | OAuth | `https://mcp.usetyra.com/mcp` |
| [UAE Gratuity Calculator](plugins/uae-gratuity-calculator) | UAE end-of-service gratuity. | None | `https://plugins.bratucapital.com/gratuity/mcp` |
| [ualet](plugins/ualet) | Understand your finances. | OAuth | `https://mcp.ualet.cl/` |
| [Ubersuggest](plugins/ubersuggest) | SEO research tools. | OAuth | `https://ubersuggest-mcp.neilpatelapi.com/mcp` |
| [Uçak Bileti - BiletimiAl](plugins/biletimial) | Search flights, book easily. | None | `https://biletimial.com/mcp` |
| [UCE Evidence Lens](plugins/uce-evidence-lens) | Inspect public UCE records. | None | `https://uce-evidence-lens-zptt2ggs7a-uc.a.run.app/mcp` |
| [udictio](plugins/udictio) | explore human perspectives. | None | `https://udictio.com/mcp` |
| [UDS Toolbox](plugins/uds-toolbox) | Find why a UDS flash failed. | None | `https://mcp.udslib.com/mcp` |
| [UGC Chart](plugins/ugc-chart) | Find the right Trybe creators. | OAuth | `https://ugcchart.com/mcp` |
| [UGC VZ](plugins/ugc-vz) | Find real UGC creators (DACH). | None | `https://ugc-vz.de/api/mcp` |
| [UGCBuilder](plugins/ugcbuilder) | Product images and UGC videos. | OAuth | `https://ugcbuilder.com/api/mcp` |
| [UiChemy AI Website Creator](plugins/uichemy-create-website-with-ai) | Create WordPress sites with AI. | None | `https://mcp.uichemy.com/mcp` |
| [Uizze](plugins/uizze) | UI design that stands out. | OAuth | `https://uizze.com/mcp` |
| [UK Data Removal Tool](plugins/free-uk-data-removal-tool) | Get off UK data broker lists. | None | `https://freeukdataremovaltool.co.uk/mcp` |
| [UK Home Education Reports](plugins/uk-home-education-reports) | Create clear home ed reports. | None | `https://mcp.strew.app/mcp` |
| [UK Property Valuation](plugins/uk-property-valuation) | UK House and Flat Valuation. | OAuth | `https://mcp.mcpbundles.com/bundle/uk-property-intelligence` |
| [UK Sponsor — RegEvidenceHub](plugins/uk-sponsor-regevidencehub) | Sponsor change checks. | None | `https://works.regevidencehub.com/ai/mcp` |
| [UK Taxi PHV — RegEvidenceHub](plugins/uk-taxi-phv-regevidencehub) | Taxi/PHV licensing preflight. | None | `https://taxi.regevidencehub.com/ai/mcp` |
| [UkraineBorder](plugins/ukraineborder) | Ukraine travel & insurance. | None | `https://ukraineborder.com/api/mcp` |
| [Ullbek](plugins/ullbek) | Build and publish websites. | OAuth | `https://api.ullbek.com/mcp` |
| [ULLIMO](plugins/ullimo) | Video and audio projects. | OAuth | `https://ullimo.com/mcp` |
| [Ultralayer](plugins/ultralayer) | Realtime market intelligence. | OAuth | `https://api.ultralayer.ai/v0/mcp` |
| [Umamy](plugins/umamy) | Track your hiring pipeline. | OAuth | `https://api.umamy.io/mcp` |
| [Umovi](plugins/umovi) | Book services and manage times. | None | `https://agent.umovi.app/mcp` |
| [UMT-CAR Assistent](plugins/umt-car-assistent) | Car Sales and Maintenance. | None | `https://umtcar.be/mcp` |
| [Unabyss](plugins/unabyss) | Your context layer for AI. | OAuth | `https://mcp.unabyss.com/mcp` |
| [Unbiased Headlines](plugins/unbiased-headlines) | Facts. Not Spin. No bias. | None | `https://unbiasedheadlines.com/mcp` |
| [Unblocked](plugins/unblocked) | Search engineering context. | OAuth | `https://getunblocked.com/api/mcpsse` |
| [Unbounce - Classic Builder](plugins/unbounce-classic-builder) | Create Unbounce Landing Pages. | OAuth | `https://mcp.unbounce.com/mcp` |
| [UnboundMark](plugins/unboundmark) | Manage notes, tasks and events. | OAuth | `https://app.unboundmark.com/mcp` |
| [UNCLE](plugins/uncle) | Run your UNCLE workspace. | OAuth | `https://mcp.uncleapp.co/mcp` |
| [Undercart](plugins/undercart) | Shopify store intelligence. | OAuth | `https://undercart.co/api/mcp` |
| [Undermind](plugins/undermind) | Find and read research papers. | OAuth | `https://mcp.undermind.ai/mcp` |
| [Underpriced AI](plugins/underpriced-ai) | Find what an item resells for. | None | `https://underpricedai.com/api/mcp` |
| [Underwrite](plugins/underwrite) | Dubai property facts, sourced. | None | `https://www.underwrite.ae/api/mcp/mcp` |
| [Unfenced](plugins/unfenced) | Browse and act on websites. | OAuth | `https://unfenced.ai/api/mcp` |
| [Unfetch](plugins/unfetch) | PPC & Marketing Reporting. | OAuth | `https://unfetch.com/api/mcp` |
| [UniAffitti Room Finder](plugins/uniaffitti-room-finder-lnx-v102) | Find and compare student rooms. | None | `https://www.uniaffitti.com/mcp` |
| [Unicorn AI Studio](plugins/unicorn-ai-studio) | Create narration and podcasts. | OAuth | `https://unicornstudio.ca/mcp` |
| [UniCourt](plugins/unicourt) | Search and view court cases. | OAuth | `https://mcp.unicourt.com/mcp` |
| [UnifyAI](plugins/unifyai) | Create Videos and Images. | None | `https://unifycore.ai/api/mcp` |
| [Uniquel UI Components](plugins/uniquel) | Find UI components. | OAuth | `https://uniquel.io/api/mcp` |
| [Unison Transfers](plugins/unison-transfers) | Gold Coast airport transfers. | None | `https://mcp.unisontransfers.com.au/mcp` |
| [Universal Docs](plugins/freeflow-docs) | Office files, edited by chat. | OAuth | `https://app.freeflow.im/mcp` |
| [University AI Policy Tracker](plugins/university-ai-policy-tracker) | Find your university AI rules. | None | `https://eduaipolicy.org/api/mcp` |
| [uniwire](plugins/uniwire) | Electrical diagrams, checked. | None | `https://mcp.uniwire.sh/mcp` |
| [uNotes](plugins/unotes) | Search your study library. | OAuth | `https://unotes.net/api/mcp` |
| [Unreasonable Eco](plugins/unreasonable-eco) | Your Unreasonable community. | OAuth | `https://unreasonable.eco/mcp` |
| [unsketch](plugins/unsketch) | 画像・動画を作成、修正、編集. | None | `https://unsketch.io/mcp` |
| [Unsora](plugins/unsora) | Clip videos & schedule posts. | OAuth | `https://mcp.tryunsora.com/mcp` |
| [Untap](plugins/untap) | UK refunds you are owed. | None | `https://untap.money/api/mcp` |
| [Unthread](plugins/unthread) | Manage your support tickets. | OAuth | `https://app.unthread.io/api/mcp` |
| [Unusual Whales](plugins/unusual-whales) | Options flow, GEX, screeners. | OAuth | `https://mcp.unusualwhales.com/mcp` |
| [upAPI](plugins/upapi) | Ready-to-use APIs in one place. | OAuth | `https://app.upapi.io/api/mcp` |
| [Upfirst](plugins/upfirst) | Manage AI receptionists. | OAuth | `https://mcp.upfirst.ai/` |
| [upGrowth Growth Toolkit](plugins/upgrowth-growth-toolkit) | Growth maths and SEO tools. | None | `https://mcp.upgrowth.in/mcp` |
| [Upload-Post](plugins/upload-post) | Social media posts scheduler. | OAuth | `https://mcp.upload-post.com/mcp` |
| [Upspring](plugins/upspring) | Live ads as AI context. | OAuth | `https://api.upspring.ai/mcp` |
| [Upstash Redis](plugins/upstash) | The Upstash MCP server plus agent skills for every Upstash SDK and CLI — Redis, QStash, Workflow, Box, Blob, Ratelimit, Vector, and Search. | OAuth | `https://mcp.upstash.com/mcp` |
| [Upsy](plugins/upsy) | Your assistants, connected. | OAuth | `https://upsy.ai/connect` |
| [Uptimely](plugins/uptimely) | Uptime monitors and incidents. | OAuth | `https://app.getuptimely.com/api/mcp` |
| [Uptown101](plugins/uptown101) | Texas apartments & guides. | None | `https://uptown101.com/mcp` |
| [upword](plugins/upword) | Track client AI citations. | OAuth | `https://goupword.com/mcp` |
| [Urantia Papers](plugins/urantia-papers) | Search, read, and cite. | None | `https://urantia.dev/mcp` |
| [UrbanPro Tutor Finder](plugins/urbanpro-tutor-finder) | Find tutors for 1000+ subjects. | None | `https://mcp.urbanpro.com/mcp` |
| [URL Shortener by A.af](plugins/url-shortener-by-a-af) | Create and manage short links. | OAuth | `https://a.af/mcp` |
| [URLgenius](plugins/urlgenius) | Create and manage links. | OAuth | `https://mcp.urlgeni.us/mcp` |
| [US Internet Serviceability](plugins/us-internet-serviceability) | Check internet availability. | None | `https://mcp.getconnectedfast.com/mcp` |
| [Usable](plugins/usable) | Shared organisational memory. | OAuth | `https://usable.dev/api/mcp` |
| [UsageTap](plugins/usagetap) | Analyze customer AI usage. | OAuth | `https://mcp.usagetap.com/mcp` |
| [USAspending by 1102tools](plugins/usaspending-by-1102tools) | Explore federal spending. | None | `https://usaspending.1102tools.com/mcp` |
| [USDT & USDC Blacklist Tracker](plugins/usdt-and-usdc-blacklist-tracker) | Check any wallet for freezes. | None | `https://mcp.eaglevirtual.com/mcp` |
| [UseMyContext.ai](plugins/usemycontext-ai) | Personal context for Reason. | OAuth | `https://mcp.usemycontext.ai/mcp` |
| [User Intuition](plugins/user-intuition-research) | Run qualitative research. | OAuth | `https://mcp.userintuition.ai/mcp` |
| [Userback](plugins/userback) | Act on customer feedback. | OAuth | `https://mcp.userback.io/mcp` |
| [Userbrain](plugins/userbrain) | Access you user test data. | OAuth | `https://mcp.userbrain.com/mcp` |
| [Userflow](plugins/userflow) | Ask about product adoption. | OAuth | `https://api.userflow.com/mcp` |
| [Userorbit](plugins/userorbit) | Feedback, support & insights. | OAuth | `https://api.userorbit.com/mcp` |
| [UserTesting](plugins/usertesting) | Bring real customer feedback into Reason — create, launch, and retrieve UserTesting results without leaving your editor. | OAuth | `https://ai.usertesting.com/mcp` |
| [UserTold: AI User Research](plugins/usertold-ai-user-research) | User interviews & UX testing. | OAuth | `https://mcp.usertold.ai/mcp` |
| [UVLens](plugins/uvlens) | UV forecasts and burn times. | None | `https://mcp.uvlens.com/mcp` |
| [Uwear](plugins/uwear) | Create AI fashion imagery. | OAuth | `https://api.uwear.ai/mcp` |
| [V-Kit](plugins/v-marketing-kit) | Your ad and app metrics. | OAuth | `https://marketing-kit.app/mcp` |
| [v2v](plugins/v2v) | Search Albania property. | None | `https://v2v.al/mcp` |
| [Vaatun](plugins/vaatun) | Find best InsurTech Solutions. | None | `https://www.vaatun.com/api/mcp` |
| [Vacanța România](plugins/vacanta-romania) | Find attractions in Romania. | None | `https://vacantaromania.ro/mcp` |
| [Väderarkivets väderassistent](plugins/vaderarkivets-vaderassistent) | Analysera historiskt väder. | None | `https://vaderarkiv.se/mcp` |
| [Vainqueur Cheval](plugins/vainqueur-cheval) | Configure equestrian jackets. | None | `https://vainqueurcheval.com/api/commerce/v1/mcp.php` |
| [Vaivox](plugins/vaivox) | Translate any video you watch. | OAuth | `https://vaivox.com/mcp` |
| [Vaiz](plugins/vaiz) | Manage your Vaiz workspace. | OAuth | `https://api.vaiz.com/mcp` |
| [Vaktim](plugins/vaktim) | Quran and prayer times. | None | `https://mcp.vaktim.app/mcp` |
| [Val Town](plugins/val-town) | Val Town's hosted MCP server: create, read, update and run vals (HTTP handlers, cron jobs, SQLite, email) on the Val Town platform. | OAuth | `https://api.val.town/v3/mcp` |
| [Validis (UK)](plugins/validis-uk) | Analyse financial data. | OAuth | `https://mcp.validis.com/mcp` |
| [Valpas Hotels](plugins/valpas-hotels) | Find bed bug free hotels. | None | `https://mcp.valpashotels.com/mcp` |
| [Valuecase](plugins/valuecase) | Manage Valuecase spaces. | OAuth | `https://mcp.valuecase.com/mcp` |
| [ValuEdge - Stock Valuation](plugins/valuedge-stock-valuation) | Valuation & Portfolio Research. | OAuth | `https://valuedge.app/mcp` |
| [ValveRide Flow](plugins/valveride-flow) | Diesel prices and fuel plans. | OAuth | `https://app.valverideflow.com/api/mcp` |
| [ValYou](plugins/valyou) | Ask about your own net worth. | OAuth | `https://mcp.getvalyou.co/mcp` |
| [Vanta](plugins/vanta) | Vanta's hosted MCP server: query compliance tests, controls, frameworks, vendors and evidence, and get test-specific remediation guidance for your security and compliance program. | OAuth | `https://mcp.vanta.com/mcp` |
| [Vanta (AUS)](plugins/vanta-aus) | Vanta's hosted MCP server for accounts in the Australia data region: query compliance tests, controls, frameworks, vendors and evidence, and get remediation guidance. | OAuth | `https://mcp.aus.vanta.com/mcp` |
| [Vanta (EU)](plugins/vanta-eu) | Vanta's hosted MCP server for accounts in the EU data region: query compliance tests, controls, frameworks, vendors and evidence, and get remediation guidance. | OAuth | `https://mcp.eu.vanta.com/mcp` |
| [Vantage](plugins/vantage) | Query cloud costs, manage cost reports, budgets, alerts, and recommendations across your Vantage workspace | OAuth | `https://mcp.vantage.sh/mcp` |
| [Vantara](plugins/vantara) | Governed sales operations. | OAuth | `https://mcp.ai-vantara.com/mcp` |
| [varg.ai](plugins/varg-ai) | AI ads, image, video & music. | OAuth | `https://mcp.varg.ai/mcp` |
| [VATES](plugins/vates) | Ask your knowledge base. | OAuth | `https://vates.standout.jp/mcp` |
| [Vaultivo](plugins/vaultivo) | Search your document archive. | OAuth | `https://app.vaultivo.at/mcp` |
| [VaultSage](plugins/vaultsage) | Search and store files. | OAuth | `https://mcp.vaultsage.ai/mcp` |
| [VauPrime](plugins/vauprime) | Manage accountings and stock. | None | `https://mcp.vauprime.com/mcp` |
| [VComply](plugins/vcomply) | Manage GRC work in VComply. | OAuth | `https://mcp.v-comply.com/mcp` |
| [VDClip](plugins/vdclip) | AI clips & video editing. | OAuth | `https://mcp.vdclip.com/mcp` |
| [Veabird Ski & Beach](plugins/veabird) | Ski & beach trip planner. | None | `https://veabird.com/mcp` |
| [Vectali](plugins/vectali) | Turn images into SVGs. | OAuth | `https://api.vectali.com/mcp` |
| [VectorGov](plugins/vectorgov) | Consulte licitações. | OAuth | `https://mcp.vectorgov.io/mcp` |
| [Vedara Vedic Birth Chart](plugins/vedara-vedic-birth-chart) | Natal charts, dashas & timing. | None | `https://mcp.vedara.me/mcp` |
| [VedPatrika](plugins/vedpatrika) | Vedic chart guidance. | None | `https://mcp.vedpatrika.in/mcp` |
| [VEED Video Generator](plugins/veed-video-generator) | Generate videos with AI. | OAuth | `https://www.veed.io/api/v1/mcp` |
| [Vegferd](plugins/vegferd) | Road trip planning for Norway. | OAuth | `https://api.vegferd.no/mcp` |
| [Velo Index](plugins/velo-index) | Compare e-bike specifications. | None | `https://theveloindex.com/api/mcp` |
| [Velocity](plugins/velocity) | Plan and publish social posts. | OAuth | `https://velocity.li/mcp` |
| [VeloImob CRM](plugins/veloimob-crm) | Gerencie sua imobiliária. | OAuth | `https://mcp.veloimob.com.br/mcp` |
| [Velora Shuttle](plugins/velora-shuttle) | Private transfer requests. | None | `https://velora-shuttle.cz/api/mcp` |
| [VéloRepère](plugins/velorepere) | Find and compare bikes. | None | `https://mcp.velorepere.fr/mcp` |
| [Ventor](plugins/ventor) | AI sales and support. | OAuth | `https://api.ventorchat.com/api/mcp` |
| [Venturu](plugins/venturu) | Find businesses to buy. | None | `https://venturu.com/mcp` |
| [VeraDial](plugins/veradial) | AI receptionist & voicemail. | OAuth | `https://api.veradial.com/mcp` |
| [Verbamor](plugins/verbamor) | Flashcards from your practice. | None | `https://mcp.verbamor.com/mcp` |
| [Verbex Lab Tools](plugins/verbex-lab-tools) | Bench math and lab templates. | None | `https://verbalexperiment.com/mcp` |
| [Vercel](plugins/vercel) | Inspect Vercel deployments, projects, domains, and logs through Vercel's hosted MCP server. | OAuth | `https://mcp.vercel.com` |
| [Verde](plugins/verde) | Manage shared team knowledge. | OAuth | `https://getverde.ai/mcp` |
| [Veridion Markets](plugins/veridion-markets) | Government trade disclosures. | None | `https://www.veridionmarkets.com/api/mcp` |
| [VeriMom](plugins/verimom) | Pregnancy-safe skincare. | None | `https://verimom.com/mcp` |
| [Verity](plugins/verity) | Forensic surface comparison. | None | `https://api.verity.codes/mcp` |
| [Verne](plugins/verne) | Save and refine travel plans. | OAuth | `https://api.verne.me/mcp` |
| [Version Story Redline Compare](plugins/version-story-redline-compare) | Legal documents in Word & PDF. | OAuth | `https://mcp-compare.versionstory.com/mcp` |
| [Versionly](plugins/versionly) | Self-maintaining APIs. | OAuth | `https://mcp.versionly.dev/mcp` |
| [Versive](plugins/versive) | Run surveys and AI interviews. | OAuth | `https://mcp.getversive.com/mcp` |
| [Verso](plugins/verso) | AI customer research insights. | OAuth | `https://api.askverso.ai/mcp` |
| [Vertical Bar Agent](plugins/vertical-bar-agent) | Analyze NetSuite operations. | OAuth | `https://mcp.vertical.bar/mcp` |
| [VerticalResponse](plugins/verticalresponse) | Contacts, lists & email. | OAuth | `https://mcp.verticalresponse.com/mcp` |
| [Vertiso Memory](plugins/vertiso-memory) | Portable, user-owned memory for AI agents through a remote OAuth MCP server. | OAuth | `https://memory.vertiso.ai/mcp` |
| [VesselTwin](plugins/vesseltwin) | Ask about your boat records. | OAuth | `https://api.vesseltwin.io/mcp` |
| [Vexo](plugins/vexo) | Turn spoken requests into coding tasks executed by Reason, with progress and results returned to Vexo. | OAuth | `https://vexo-backend-uj6z.onrender.com/mcp` |
| [Vezna](plugins/vezna) | Your company's books, in chat. | OAuth | `https://app.vezna.ai/mcp` |
| [Vianto - piața imobiliară](plugins/vianto-piata-imobiliara) | Piața imobiliară din România. | None | `https://mcp.viantoproperties.ro/piata-imobiliara` |
| [VIATRU](plugins/viatru) | Find and book local services. | None | `https://viatru.ai/api/mcp/chatgpt` |
| [Vibe Coding Control](plugins/vcc-remote) | Projects and AI work history. | OAuth | `https://vibecodingcontrol.com/mcp` |
| [Vibe Coding Library](plugins/vibe-coding-library) | Coding workflows on demand. | None | `https://vibe-coding-library.swift-seal-1081.chatgpt.site/library/mcp` |
| [vibeCoach](plugins/vibecoach) | Practice talking out loud. | None | `https://tryvibecoach.com/mcp` |
| [Vibecode](plugins/vibecode) | App builder for iPhone and web. | OAuth | `https://api.vibecodeapp.com/mcp` |
| [VibeCrawl](plugins/vibecrawl) | Let your vibes decide. | OAuth | `https://vibecrawl.app/mcp` |
| [VibeDay](plugins/vibeday) | Plan and publish social posts. | OAuth | `https://vibeday.com/api/mcp` |
| [Vibee](plugins/vibee) | Build apps for your team. | OAuth | `https://vibee.one/mcp` |
| [VibeRaven](plugins/viberaven) | Launch checklists and findings. | None | `https://viberaven.dev/mcp` |
| [Vibsync](plugins/vibsync) | Share context across AI agents. | OAuth | `https://mcp.vibsync.com/mcp` |
| [ViddyScribe](plugins/viddyscribe) | Audio descriptions for video. | OAuth | `https://mcp.viddyscribe.com/mcp` |
| [Video Grab](plugins/videograb) | Freely licensed video links. | None | `https://api.openkrill.app/mcp` |
| [Video Highlight](plugins/video-highlight) | Search your video library. | OAuth | `https://mcp.videohighlight.com/mcp` |
| [VideoGen](plugins/videogen) | Go from text to video, image to video, or script to video, then export an MP4. | OAuth | `https://mcp.videogen.io/mcp?vg_client=codex` |
| [VideoZero](plugins/videozero) | Visualize • Animate • Explain. | OAuth | `https://mcp.videozero.ai/mcp` |
| [Vidmoat](plugins/vidmoat) | The agent-first video editor. | OAuth | `https://api.vidmoat.com/api/mcp` |
| [ViewMax](plugins/viewmax) | Create video, images and audio. | None | `https://viewmax.studio/api/mcp` |
| [ViewPrinter](plugins/viewprinter) | Schedule social posts. | OAuth | `https://viewprinter.tech/api/mcp` |
| [ViewsMax](plugins/viewsmax) | Social media scheduling. | OAuth | `https://api.viewsmax.com/api/mcp` |
| [Viirtue](plugins/viirtue) | Ask your cloud phone system. | OAuth | `https://mcp.viirtue.com/mcp` |
| [VILAX](plugins/vilax) | Navigation system for business. | OAuth | `https://mcp.vilax.ai/mcp` |
| [Village](plugins/village) | Relationship intelligence. | OAuth | `https://mcp.village.ai/mcp` |
| [VIN Lookup](plugins/vin-lookup) | Decode VINs & understand specs. | None | `https://mcp.free-vin-lookup.com/mcp` |
| [Vinci](plugins/vinci) | Ask about videos you saved. | OAuth | `https://use-vinci.com/api/mcp` |
| [Vinellu](plugins/vinellu) | Encontre vinhos e sua adega. | OAuth | `https://vinellu.com/mcp` |
| [Vinktar](plugins/vinktar) | Error tracking and analytics. | OAuth | `https://mcp.vinktar.com/mcp` |
| [Vino Alert](plugins/vino-alert) | Compare wine prices at stores. | None | `https://api.vinoalert.com/mcp` |
| [Vinyl Record Scanner - VinylAI](plugins/vinyl-record-scanner) | Identify vinyl from a photo. | None | `https://vinylai.app/mcp` |
| [Viral Recreate Ai](plugins/viral-recreate-ai) | Turn media into AI prompts. | OAuth | `https://viralrecreate.com/mcp` |
| [viral.app](plugins/viral-app) | UGC analytics and creator ops. | OAuth | `https://viral.app/api/mcp` |
| [Virlow](plugins/virlow) | Private notes and AI memory. | OAuth | `https://api.virlow.com/api/connector/mcp` |
| [Visalaw AI](plugins/visalaw-ai-immigration-law) | Immigration research & skills. | OAuth | `https://mcp.visalaw.ai/mcp` |
| [Visily](plugins/visily) | Turn designs into code. | OAuth | `https://app.visily.ai/api/mcp` |
| [VisionBoard](plugins/visionboard) | Approved direction for AI. | OAuth | `https://visionboard.si/api/mcp` |
| [Visor](plugins/visor) | Search U.S. car inventory. | OAuth | `https://mcp.visor.vin/mcp` |
| [Vistear](plugins/vistear) | Argentine streaming audience. | OAuth | `https://www.vistear.com/mcp` |
| [Visualink](plugins/visualink) | View project analytics. | None | `https://visua.link/mcp` |
| [Visualping](plugins/visualping) | Monitor website changes. | OAuth | `https://visualping.io/mcp` |
| [VisualSong](plugins/visualsong) | Create music-reactive visuals. | None | `https://visualsong-chatgpt-app.kunyoungpark.workers.dev/mcp` |
| [Vita Health Coach](plugins/vita-health-coach) | Hospital portals and records. | None | `https://vitamedas.com/mcp` |
| [Vitae](plugins/vitae) | Recruit with Vitae. | OAuth | `https://mcp.vitae.ai/mcp` |
| [VITALS](plugins/vitals) | Use your VITALS profile. | OAuth | `https://mcp.vitals.me/mcp` |
| [Vitark](plugins/vitark) | Search Indian law with sources. | OAuth | `https://mcp.vitark.ai/mcp` |
| [Vivideo](plugins/vivideo) | Create and manage AI videos. | None | `https://api.vivideo.ai/mcp` |
| [Vivin](plugins/vivin) | Make Reason Visible & Alive. | None | `https://vivin.ai/mcp` |
| [Vivu](plugins/vivu) | Search and manage video. | OAuth | `https://mcp.vivu.ai/mcp` |
| [VIXNODE](plugins/vixnode) | Create and manage websites. | OAuth | `https://www.vixnode.com/mcp` |
| [Vize Rehberim](plugins/vize-rehberim) | Visa info for 172 countries. | None | `https://mcp.vizerehberim.net/mcp` |
| [Vlak](plugins/vlak) | Build accessible interfaces. | None | `https://vlak.dev/mcp` |
| [VLM Run Gateway](plugins/vlm-run-gateway) | Visual AI for your files. | OAuth | `https://gateway.vlm.run/mcp` |
| [VO](plugins/vo) | Your listening, in your AI. | OAuth | `https://mcp.vo.fm/mcp` |
| [Voarq](plugins/voarq) | Manage your architecture firm. | OAuth | `https://voarq.app/api/mcp` |
| [Vocabden](plugins/vocabden) | Remembers what you're learning. | OAuth | `https://mcp.vocabden.com/mcp` |
| [Vocaneo](plugins/vocaneo) | French careers and training. | None | `https://mcp.vocaneo.com/mcp` |
| [Vocapi](plugins/vocapi) | Save vocabulary as flashcards. | OAuth | `https://vocapi.xyz/mcp` |
| [Vocasa](plugins/vocasa) | Rental investment analysis. | None | `https://mcp.vocasa.ai/mcp` |
| [Vocci](plugins/vocci) | Access Vocci AI Ring. | OAuth | `https://mcp.vocci.ai/mcp` |
| [Vocuno](plugins/vocuno) | Create and edit AI music. | OAuth | `https://vocuno.com/mcp` |
| [VODER](plugins/voder) | Xero, FreshBooks, MYOB & QBO. | OAuth | `https://app.voder.ai/mcp` |
| [VODER Actions](plugins/voder-actions) | Create invoices and get paid. | OAuth | `https://app.voder.ai/mcp-write` |
| [Voibe Transcription](plugins/voibe-transcription) | Transcripts, speakers, summary. | OAuth | `https://api.getvoibe.com/mcp` |
| [Voice213](plugins/voice213) | Darija voice-overs and agents. | OAuth | `https://api.voice213.com/mcp` |
| [VoiceCap](plugins/voicecap) | Search meetings, notes & tasks. | OAuth | `https://voicecap.ai/api/mcp` |
| [VoiceCursor Dictionary](plugins/voicecursor-dictionary) | Manage personal dictionaries. | OAuth | `https://api.voicecursor.ai/mcp` |
| [VoiceLabs](plugins/voicelabs) | Text to speech and transcripts. | OAuth | `https://app.voicelabs.now/api/mcp` |
| [Voicenotes](plugins/voicenotes) | Interact with your Voicenotes. | OAuth | `https://api.voicenotes.com/mcp` |
| [Voidly Atlas](plugins/voidly-atlas-public-research) | Public censorship research. | None | `https://api.voidly.ai/mcp` |
| [Voidpay Compatibility](plugins/voidpay-connector-compatibility) | Check Voidpay MCP requirements. | None | `https://voidpay-compat.voidly.ai/mcp` |
| [Voithos AI](plugins/voithos-ai) | Search in your meetings. | OAuth | `https://mcp.voithos.ai/mcp` |
| [Volm](plugins/volm) | Plan workouts, review progress. | OAuth | `https://api.volm.app/mcp` |
| [Volrix](plugins/volrix) | Backtest trading strategies. | OAuth | `https://mcp.volrix.ai/mcp` |
| [Voltformer](plugins/voltformer) | Electrical design and RFQs. | None | `https://voltformer.com/mcp` |
| [VoltShare](plugins/voltshare) | Find EV chargers near you. | None | `https://mcp.voltshare.app/mcp` |
| [Voluum](plugins/voluum) | Manage ad tracking. | OAuth | `https://mcp.voluum.com/mcp` |
| [Voris - Human & AI Analytics](plugins/voris-human-and-ai-analytics) | Full Insights Your Dashboards. | OAuth | `https://mcp.voris.ai/mcp` |
| [VOVV](plugins/vovv-ai) | Product visuals & ad intel. | OAuth | `https://mcp.vovv.ai/mcp` |
| [VoxelDraft](plugins/voxeldraft) | Create and export voxel art. | OAuth | `https://voxeldraft.com/api/mcp` |
| [VoyageHacks](plugins/voyagehacks) | Travel guides and trip ideas. | None | `https://voyagehacks.com/mcp` |
| [Voyager Video & 3D](plugins/voyager-cloud) | Generate with 100+ AI models. | OAuth | `https://mcp.voyager.so/mcp` |
| [Voyscout.com](plugins/voyscout-com) | Flight & package prices. | None | `https://voyscout.com/mcp` |
| [Vraxeia](plugins/vraxeia) | Greek rental compliance. | None | `https://vraxeia.gr/mcp` |
| [Vruum](plugins/vruum) | Manage your revenue work. | OAuth | `https://api.vruum.ai/mcp` |
| [VTC AEROPORT PARIS](plugins/vtc-aeroport-paris-transferts) | Paris airport transfers. | None | `https://vtc-aeroport.fr/wp-json/sivtc/v1/mcp` |
| [Vubli](plugins/vubli) | Plan and publish social posts. | OAuth | `https://vubli-backend-api-s5x7myqvca-uc.a.run.app/mcp` |
| [VUHL VA Loan Calculator](plugins/vuhl-va-loan-calculator) | Estimate your VA loan payment. | None | `https://api.mortgageresearchcenter.com/mcp/mortgagecalc/mcp` |
| [VybeOS](plugins/vybeos) | AI marketing campaign studio. | OAuth | `https://mcp.vybeos.co/mcp` |
| [Vybit Push Notifications](plugins/vybit) | Custom sound notifications. | OAuth | `https://api.vybit.net/v1/mcp` |
| [Vyora](plugins/vyora) | AI calling agents for India. | OAuth | `https://mcp.vyora.ai/mcp` |
| [Vyrl](plugins/vyrl) | Canvases and callable Flows. | OAuth | `https://vyrl.pro/api/mcp` |
| [Wakeman](plugins/wakeman) | Your calls, at a glance. | None | `https://wakeman.ai/mcp` |
| [Waldo](plugins/waldo) | Your brand intelligence engine. | OAuth | `https://mcp.waldo.fyi/mcp` |
| [WalkMyPlan — Floor Plans in 3D](plugins/walkmyplan-floor-plans-in-3d) | Home design by chat, in 3D. | OAuth | `https://mcp.walkmyplan.com/mcp` |
| [WalleK](plugins/wallek) | Track money, bills, statements. | OAuth | `https://wallek.app/mcp` |
| [WalletGraph: Address Lookup](plugins/walletgraph-address-lookup) | Look up onchain addresses. | None | `https://walletgraph.801.world/mcp` |
| [WalletPassBuilder](plugins/walletpassbuilder) | Apple & Google Wallet passes. | OAuth | `https://walletpassbuilder.com/api/mcp` |
| [Wallform Wall Pilates](plugins/wallform) | Home workouts & 28-day program. | None | `https://wallform.ambientapp.ai/mcp/claude` |
| [Wandcase Creator](plugins/wandcase-creator) | Create & schedule social posts. | OAuth | `https://creator.wandcase.com/mcp` |
| [Wander](plugins/wander) | Your notes, in conversation. | OAuth | `https://mcp.wander.md/mcp` |
| [WantIt](plugins/wantit) | Post what you want to buy. | OAuth | `https://wantit.live/mcp` |
| [WareMatch](plugins/warematch) | 3PL Warehousing Marketplace. | None | `https://mcp.warematch.com/mcp` |
| [WarmHub](plugins/warmhub) | Work with knowledge graphs. | OAuth | `https://mcp.warmhub.ai/mcp` |
| [Warmly Written](plugins/warmly-written) | Your photo, mailed. No errand. | None | `https://warmlywritten.com/api/mcp` |
| [WARP DD — Tech Due Diligence](plugins/warp-dd-tech-due-diligence) | Find and score tech companies. | OAuth | `https://mcp.warpdd.com/mcp` |
| [WarrantyWarden](plugins/warrantywarden-5) | Track your product warranties. | None | `https://mcp.warrantywarden.com/mcp` |
| [Watchman Tower](plugins/watchman-tower) | Website and server monitoring. | OAuth | `https://mcp.watchmantower.com/mcp` |
| [Wave AI Note Taker](plugins/wave-ai-note-taker) | Search and synthesize meetings. | OAuth | `https://mcp.wave.co/` |
| [Wavebrook](plugins/wavebrook) | Apps, earnings and payouts. | OAuth | `https://mcp.wavebrook.com/mcp` |
| [Wavelength](plugins/wavelength) | Turn calls into process maps. | OAuth | `https://mcp.wavelengthflow.com/mcp` |
| [WaveMaster AI](plugins/wavemaster-ai) | Previsão de surf com IA. | None | `https://mcp.wavemasterai.com.br/mcp` |
| [Wayfront](plugins/wayfront) | Manage your Wayfront workspace. | OAuth | `https://mcp.wayfront.com/mcp` |
| [Waypoint](plugins/waypoint) | Do real work with live data. | None | `https://mcp.waypoint.ing/mcp` |
| [Waypoint Budget](plugins/waypoint-budget) | Your budget, ready to answer. | OAuth | `https://waypointbudget.com/api/mcp` |
| [Waypoint Log](plugins/waypoint-log) | Ask about your pilot logbook. | OAuth | `https://mcp.waypointlog.com/mcp` |
| [Wealth Tracker](plugins/wealth-tracker) | Net worth, history, spending. | OAuth | `https://getwealthtracker.com/api/mcp` |
| [WealthSim Calculators](plugins/wealthsim-calculators) | S&P 500 and money calculators. | None | `https://www.wealthsim.app/api/mcp` |
| [WealthStoryLine](plugins/wealthstoryline) | Retirement & wealth simulator. | None | `https://wealthstoryline.com/mcp` |
| [Weasel Den](plugins/weasel-den) | Track receipts for price drops. | OAuth | `https://mcp.weaselden.ai/mcp` |
| [Weather by WindBorne](plugins/weather-by-windborne) | Forecasts tailored to you. | None | `https://mcp.windbornesystems.com/mcp` |
| [Weave](plugins/weave) | Your life's context, in chat. | OAuth | `https://mcp.weave.cloud/mcp` |
| [Weavely Forms & Surveys](plugins/weavely-forms-and-surveys) | Free Forms and Surveys. | None | `https://mcp.weavely.ai/mcp` |
| [Weavify](plugins/weavify) | Bangkok dining & nightlife. | None | `https://weavify.io/mcp` |
| [WebAZ Shopping](plugins/webaz-shopping) | Find and compare products. | None | `https://webaz.xyz/mcp` |
| [WebCAD](plugins/webcad) | Design parts, get STEP files. | OAuth | `https://mcp.webcad.ca/mcp` |
| [Webflow](plugins/webflow) | Production-ready agent skills for Webflow - CMS management, site auditing, asset optimization, and safe publishing | OAuth | `https://mcp.webflow.com/mcp` |
| [WebinarIgnition](plugins/webinarignition) | Get leads & sales mid-webinar. | None | `https://mcp.webinarignition.com/mcp` |
| [Webmetic](plugins/webmetic) | Identify visiting companies. | OAuth | `https://mcp.webmetic.de/mcp` |
| [Website Auditor](plugins/website-auditor) | Audit sites and AI visibility. | None | `https://mcp.website-auditor.io/mcp` |
| [Website Launch Check](plugins/wolcost-launchcheck) | Check websites before launch. | None | `https://wolcost.online/mcp` |
| [Website Launches](plugins/website-launches) | Check launch dates & trust. | None | `https://websitelaunches.com/mcp` |
| [WebsitePublisher](plugins/websitepublisher) | Sites, apps, shops & bookings. | OAuth | `https://mcp.websitepublisher.ai/mcp` |
| [WebSpeed](plugins/webspeed) | Measure and compare page speed. | None | `https://api.webspeed.pro/mcp` |
| [Webull](plugins/webull) | View accounts, positions, orders, watchlists, and market data. | OAuth | `https://api.webull.com/mcp` |
| [WebZum](plugins/webzum) | Websites for small businesses. | None | `https://webzum.com/api/mcp` |
| [WedStay](plugins/wedstay) | Wedding venues you can stay at. | None | `https://mcp.wedstay.com/api/ai/mcp` |
| [Weeklane](plugins/weeklane) | Plan your week in Weeklane. | OAuth | `https://mcp.weeklane.app/mcp` |
| [Weft](plugins/weft) | Your AI runs your task board. | OAuth | `https://letsweft.com/api/mcp` |
| [Wefunder](plugins/wefunder) | Investor and startup tools. | None | `https://wefunder.com/mcp/server` |
| [WeJob](plugins/wejob) | Swiss jobs and companies. | None | `https://mcp.wejob.ch/mcp` |
| [Welder: Social Autoposting](plugins/welder-social-manager) | TikTok, Instagram & YouTube. | OAuth | `https://weldergtm.com/mcp` |
| [Welltory](plugins/welltory) | Your Welltory health data. | OAuth | `https://mcp.welltory.com/mcp` |
| [WEM Price Compare](plugins/wem-price-compare) | Compare prices before you buy. | None | `https://wem3.ai/mcp` |
| [WeProfit](plugins/weprofit) | Store profit and ad analytics. | OAuth | `https://api.weprofit.com/mcp` |
| [Werify](plugins/werify) | Your WhatsApp archive. | OAuth | `https://werify.app/mcp` |
| [WerkCV](plugins/werkcv) | CV feedback for Dutch jobs. | None | `https://werkcv.nl/api/mcp` |
| [WeRoad](plugins/weroad) | Find trips & explore the world. | None | `https://mcp.weroad.com/mcp` |
| [WeTrip](plugins/wetrip) | Plan China tours with WeTrip. | None | `https://mcp.wetrip.global/mcp` |
| [Wever Brief](plugins/wever-brief) | Daily briefs for operators. | None | `https://weverlabs.com/mcp` |
| [Wevi](plugins/wevi) | Product videos from templates. | OAuth | `https://mcp.wevi.ai/mcp` |
| [WeWeb](plugins/weweb) | Build full-stack apps & sites. | OAuth | `https://ai-api.weweb.io/v1/mcp` |
| [Whalesync](plugins/whalesync) | Two-way sync between your apps. | OAuth | `https://api.whalesync.com/mcp` |
| [WHAT Shipping](plugins/what-shipping) | Dropshipping store research. | None | `https://www.whatshipping.com/api/mcp` |
| [Whatjobs](plugins/whatjobs) | Search jobs near you. | None | `https://mcp.whatjobs.com/mcp` |
| [WhatsTheID](plugins/whatstheid) | DJ set tracklists from YouTube. | None | `https://whatstheid.com/mcp` |
| [WhatSync Search](plugins/whatsync-search) | Search WhatsApp chats & groups. | OAuth | `https://whatsync.app/api/mcp` |
| [Whenever](plugins/whenever) | Build and manage automations. | OAuth | `https://mcp.whenever.dev/` |
| [Where Grads Work](plugins/where-grads-work) | Graduate outcomes by school. | None | `https://mcp.wheregradswork.com/mcp` |
| [Whim](plugins/whim) | Turn any idea into a song. | None | `https://onwhim.app/mcp` |
| [Whimbrel: Medtech Research](plugins/whimbrel-medtech-analyst) | Find and rank device companies. | OAuth | `https://whimbrelresearch.com/mcp` |
| [Whimsical](plugins/whimsical) | Create diagrams and wireframes. | OAuth | `https://mcp.whimsical.com/mcp` |
| [Whisper Memos](plugins/whisper-memos) | Work with your voice memos. | OAuth | `https://whispermemos.com/mcp` |
| [Whisper Transcribe AI](plugins/whisper-transcribe-ai) | Whisper Transcription. | OAuth | `https://mcp.whispertranscribe.ai/mcp` |
| [WhisperAI](plugins/whisperai) | Transcribe and search audio. | OAuth | `https://whisperai.com/mcp` |
| [WhisperTranscript: Transcribe](plugins/whispertranscript-transcribe) | Transcribe audio and video. | OAuth | `https://mcp.whispertranscript.ai/mcp` |
| [Whiteboard by Lumin](plugins/whiteboard) | Your ideas. Your device. | None | `https://lumininnovates.com/mcp` |
| [Whizi Canadian Tax](plugins/whizi-canadian-tax) | CRA figures and deadlines. | None | `https://whizi.io/mcp` |
| [Whoovia](plugins/whoovia) | Manage homebuyer profiles. | OAuth | `https://mcp.whoovia.com/mcp` |
| [Whop](plugins/whop) | Build and run your business end-to-end with Whop. | OAuth | `https://mcp.whop.com/mcp` |
| [Widemile](plugins/widemile) | Create videos, images & music. | OAuth | `https://mcp.widemile.ai/mcp` |
| [WikiBrand](plugins/wikibrand) | Brand logos, colors and fonts. | None | `https://wikibrand.org/api/mcp` |
| [WikiFx](plugins/wikifx) | Check Brokers, View Reviews. | None | `https://amp.eeeoeee.com/mcp` |
| [Wikilayer](plugins/wikilayer) | Create and edit wiki pages. | OAuth | `https://wikilayer.org/mcp` |
| [Wikiloc](plugins/wikiloc) | Your perfect trail. Just ask. | None | `https://mcp.wikiloc.com/mcp` |
| [Wikitólica](plugins/wikitolica) | Busca artículos de Wikitólica. | None | `https://www.wikitolica.com/mcp` |
| [Wild Calf Coffee](plugins/wild-calf-coffee) | Find and brew better coffee. | None | `https://mcp.wildcalf.com/mcp` |
| [Windmill HR](plugins/windmill-hr) | Connect Reason to Windmill for performance reviews, feedback, 1:1s, pulse surveys, and more. | OAuth | `https://mcp.gowindmill.com/mcp` |
| [Windom Sports](plugins/windom-sports) | Your fantasy leagues, by chat. | OAuth | `https://windomsports.com/api/mcp/mcp` |
| [Windsock](plugins/windsock) | Value and research aircraft. | OAuth | `https://windsock.ai/mcp` |
| [Windsor.ai](plugins/windsor-ai) | Windsor.ai integration to connect 320+ marketing data sources | OAuth | `https://mcp.windsor.ai/` |
| [Wine Labs](plugins/winelabs-research) | Wine market research. | OAuth | `https://chat.wine-labs.com/mcp` |
| [Wingflow](plugins/wingflow) | LinkedIn outreach stats. | OAuth | `https://wingflow.ai/api/mcp` |
| [Winrate](plugins/winrate) | League of Legends stats. | None | `https://winrate.gg/mcp` |
| [WiredWhips](plugins/wiredwhips) | E-bike parts with fit checks. | None | `https://wiredwhips.com/mcp` |
| [WisdomAI](plugins/wisdomai) | Answers from data you govern. | OAuth | `https://mcp.wisdom.ai/mcp` |
| [wiserwork](plugins/wiserwork) | Meetings into finished work. | OAuth | `https://mcp.wiserwork.ai/mcp` |
| [Wisesheets](plugins/wisesheets) | Financial data. | OAuth | `https://mcp.wisesheets.io/mcp` |
| [WishKit](plugins/wishkit) | Feature requests and reviews. | OAuth | `https://www.wishkit.io/mcp` |
| [Wishlist Supply](plugins/wishlist-supply) | Thoughtful gifts, considered. | None | `https://wishlist.supply/mcp` |
| [Wispr Flow](plugins/wispr-flow) | Read-only access to Wispr Flow Notetaker meeting summaries, notes, transcripts, tasks, Scratchpad notes and calendar events | OAuth | `https://api.wisprflow.ai/connect/mcp` |
| [Wisprs](plugins/wisprs-ai-connectors) | Turn recordings into content. | OAuth | `https://wisprs.co/mcp` |
| [Wissen](plugins/wissen) | Equity research, kept current. | OAuth | `https://argus.wissen-ai.com/mcp` |
| [Wistia](plugins/wistia) | Manage your Wistia content. | OAuth | `https://api.wistia.com/mcp/api` |
| [WithNettle](plugins/withnettle) | Manage Withnettle Tickets. | OAuth | `https://withnettle.com/mcp` |
| [Wittle Rooms](plugins/wittle-rooms) | Where your agents meet others. | OAuth | `https://rooms.wittlelabs.ai/mcp` |
| [Wix](plugins/wix) | Wix's hosted MCP server: manage Wix sites and apps, including site content, business data and CLI-based app development. | OAuth | `https://mcp.wix.com/mcp` |
| [WodGuru](plugins/wodguru) | Your gym's data in Reason. | OAuth | `https://mcp.wod.guru/mcp` |
| [WOIII.me](plugins/woiii-me) | Find the best vinyl pressing. | OAuth | `https://mcp.woiii.me/mcp` |
| [Wolfram](plugins/wolfram) | Wolfram integration to inject precise, real-time computation and knowledge | None | `https://agenttools.wolfram.com/mcp` |
| [Wonder](plugins/wonder) | Create and edit designs with Reason on a canvas where every design is real code. | OAuth | `https://mcp.wonder.so/mcp` |
| [WonderKit](plugins/wonderkit) | Group trip ideas & itineraries. | None | `https://wonderkit.app/mcp` |
| [Wondershare Media.io](plugins/wondershare-media-io) | Create images and videos. | OAuth | `https://mcp.media.io/mcp` |
| [WonderWorks](plugins/wonderworks) | Generate AI Videos & Media. | OAuth | `https://mcp.wonderworksai.com/` |
| [Woosh](plugins/woosh) | Plan with your friends. | OAuth | `https://mcp.woosh.social/mcp` |
| [WordByWord – Learn Languages](plugins/wordbyword-learn-languages) | Build and practice vocabulary. | OAuth | `https://api.wordbyword.io/mcp` |
| [WordPress](plugins/wordpress) | Connect your WordPress site to Reason via the miniOrange MCP gateway. | OAuth | `https://gateway.miniorange.ai/v2/mcp` |
| [WordPress.com](plugins/wordpress-com) | Build, publish, and manage WordPress.com sites directly from Reason. | OAuth | `https://public-api.wordpress.com/wpcom/v2/mcp/v1` |
| [Workable](plugins/workable) | Search candidates, move pipelines, and manage HR records. | OAuth | `https://mcp.workable.com/mcp` |
| [Workbranch](plugins/workbranch) | Keep tasks from your chats. | OAuth | `https://mcp.workbranch.ai/mcp` |
| [Worke](plugins/worke) | Read and analyse company data. | OAuth | `https://mcp.worke.cz/mcp` |
| [Workflow Viewer](plugins/workflow-viewer) | Map workflows through chat. | None | `https://workflow-viewer.workflow-atlas.workers.dev/mcp` |
| [Workjournal](plugins/workjournal) | Shared memory for your project. | OAuth | `https://mcp.workjournal.pro/mcp` |
| [worklore](plugins/worklore) | Dev stories, capability x-ray. | None | `https://worklore.dev/mcp` |
| [WorkOS](plugins/workos) | Manage WorkOS organizations, AuthKit, SSO, Directory Sync, roles, audit logs, environments, and branding through WorkOS's Management MCP server. | OAuth | `https://mcp.workos.com/mcp` |
| [Workshop](plugins/workshop) | Pull analytics & draft emails. | OAuth | `https://mcp.useworkshop.com/mcp` |
| [Workspace369](plugins/workspace369) | Manage clients, jobs, invoices. | OAuth | `https://mcp.workspace369.com/mcp` |
| [Worktable](plugins/worktable) | Your shared agent workspace. | OAuth | `https://app.worktable.cloud/api/mcp` |
| [Worktivity](plugins/worktivity) | Ask AI about your team's work. | OAuth | `https://mcp.useworktivity.com/mcp` |
| [World Airfares](plugins/world-airfares) | Search flights, tap to book. | None | `https://mcp.worldairfares.com/` |
| [World News Sources](plugins/world-news-sources) | Find RSS feeds and sitemaps. | None | `https://news.bymyleslee.com/mcp` |
| [World War Watcher](plugins/world-war-watcher) | Cited Iran–US war briefings. | None | `https://api.worldwarwatcher.com/mcp` |
| [Worthbase](plugins/worthbase) | Track your household net worth. | OAuth | `https://worthbase.app/mcp` |
| [Wortschatz](plugins/wortschatz) | Create flashcard decks. | None | `https://getlingvo.com/mcp` |
| [WOTT](plugins/wott) | Search and manage notebooks. | OAuth | `https://mcp.wott.ai/mcp` |
| [Wounded Warriors](plugins/wounded-warriors) | Veteran help and giving info. | None | `https://warriorsfund.org/mcp` |
| [WoWSQL](plugins/wowsql) | Manage PostgreSQL databases. | OAuth | `https://mcp.wowsql.com/mcp` |
| [WP Agent](plugins/wp-agent) | Blog & run WordPress with AI. | OAuth | `https://mcp.getwpagent.com/mcp` |
| [WP Image Fixer](plugins/wp-image-fixer) | Optimize WordPress images. | OAuth | `https://mcp.wpimagefixer.com/mcp` |
| [WPVibe](plugins/wpvibe) | AI WordPress tools. | OAuth | `https://mcp.wpvibe.ai/mcp` |
| [WPWriter](plugins/wpwriter) | Manage WordPress from chat. | OAuth | `https://mcp.wpwriter.com/mcp` |
| [Wrap](plugins/wrap) | Images into mockup templates. | OAuth | `https://mcp.wrap.design/mcp` |
| [Wrike](plugins/wrike) | Search projects, create tasks, and post comments. | OAuth | `https://mcp.wrike.com/v2` |
| [Writer](plugins/writer) | Run Writer playbooks, check on runs, and pull deliverables into your current work. | OAuth | `https://api.writer.com/v1/mcp` |
| [WriteStack](plugins/writestack) | Manage Substack Notes. | OAuth | `https://www.writestack.io/api/mcp/mcp` |
| [Writrex SEO](plugins/writrex-seo) | SEO audits for websites. | None | `https://seo.writrex.com/mcp` |
| [WyvStudio](plugins/wyvstudio) | Branded video without a shoot. | OAuth | `https://app.wyvstudio.com/mcp` |
| [WZRD](plugins/wzrd-rooms) | Make proposals, portals & more. | OAuth | `https://wzrd.to/api/mcp` |
| [X](plugins/x) | Search posts, read timelines, look up users, and read bookmarks. | OAuth | `https://api.x.com/mcp` |
| [X Ads](plugins/x-ads) | Read ad campaigns and advertising performance. | OAuth | `https://ads-api.x.com/mcp` |
| [XE Currency Converter](plugins/xe-currency-converter) | Convert live currencies. | None | `https://chatgpt-api.xe.com/api/mcp` |
| [Xenition](plugins/xenition) | Create docs, decks, and apps. | None | `https://api.xenition.com/mcp` |
| [XFA](plugins/xfa) | Query your device-trust data. | OAuth | `https://mcp.xfa.tech/mcp` |
| [Xflow](plugins/xflow) | FX rates & insights. | None | `https://mcp.xflowpay.com/mcp/claude` |
| [XiaoHongShu RedNote China](plugins/xiaohongshu-local-guide-to-china) | Discover China like a local. | None | `https://chinalikealocal.com/mcp` |
| [xMatix](plugins/xmatix) | Business data and workflows. | OAuth | `https://mcp.xmatix.com/mcp` |
| [Xmind](plugins/xmind) | Mind mapping, organize ideas. | OAuth | `https://app.xmind.com/api/mcp` |
| [xpost](plugins/xpost) | Schedule social media posts. | OAuth | `https://xpost.to/api/mcp` |
| [xrio](plugins/xrio) | Check and create e-invoices. | OAuth | `https://api.xrio.de/mcp` |
| [xTiles](plugins/xtiles) | Life & Company OS for Reason. | OAuth | `https://mcp.xtiles.app/mcp` |
| [Yadulink](plugins/yadulink) | Manage LinkedIn outreach. | OAuth | `https://mcp.yadulink.com/mcp` |
| [Yamdu](plugins/yamdu) | Film Production, AI-Powered. | OAuth | `https://api.yamdu.com/ai/mcp` |
| [Yard](plugins/yard) | Manage software on Yard. | OAuth | `https://mcp.yard.sh/` |
| [yarnnn](plugins/yarnnn) | Save, find and share your work. | OAuth | `https://mcp.yarnnn.com/` |
| [Yearo](plugins/yearo-arshjul) | Årshjul med dina aktiviteter. | OAuth | `https://yearo.se/mcp` |
| [YedaBase](plugins/yedabase) | Family office & investor data. | OAuth | `https://yedabase.com/mcp` |
| [Yedno](plugins/yedno) | Plan tasks for now. | OAuth | `https://yedno.now/mcp` |
| [Yeleport](plugins/yeleport) | Book Local Services 24/7. | None | `https://mcp.yeleport.com/mcp` |
| [Yes2SDK](plugins/yes2sdk) | Integrate and verify web games. | None | `https://mcp.yes2games.com/mcp` |
| [YesIQ](plugins/yesiq) | Website opportunity preview. | None | `https://yes-iq.net/mcp` |
| [Yield Clarity](plugins/yield-clarity) | Your financial plan in chat. | OAuth | `https://app.yieldclarity.com/mcp` |
| [Yipai](plugins/yipai) | Wechat article formatter. | None | `https://wechat-official-publisher-449629554430.asia-southeast1.run.app/mcp` |
| [YNAB: Get Good At Money](plugins/ynab-get-good-at-money) | Get answers to money questions. | None | `https://chatgpt-app.ynab.com/mcp` |
| [Yoffre](plugins/yoffre) | Votre offre d'achat immobilier. | None | `https://yoffre.fr/mcp` |
| [Yokitup](plugins/yokitup) | Manage restaurant stock. | OAuth | `https://mcp.yokitup.com/mcp` |
| [Yoro Manufacturing Tracker](plugins/yoro-manufacturing) | Stock, recipes, and batches. | OAuth | `https://yoro.ai/mcp` |
| [Yoroll](plugins/yoroll) | Create your AI video game. | OAuth | `https://mcp.yoroll.ai/mcp` |
| [Yoshi](plugins/yoshi) | Your finances in Reason. | OAuth | `https://agents.yoshi.ai/mcp` |
| [Yoteiko](plugins/yoteiko) | Plan smarter trips with AI. | OAuth | `https://mcp.yoteiko.com/mcp` |
| [You.com](plugins/you-com) | You.com's hosted MCP server: web search, research with citations and content extraction via the You.com API. | OAuth | `https://api.you.com/mcp` |
| [You.com Finance](plugins/you-com-finance) | You.com's hosted finance MCP server: financial-market search and data via the You.com API. | OAuth | `https://api.you.com/mcp/finance` |
| [You.com Research](plugins/you-com-research) | You.com's hosted research MCP server: multi-step deep research reports with citations via the You.com API. | OAuth | `https://api.you.com/mcp/research` |
| [Youanai](plugins/youanai) | Social workspace. | OAuth | `https://youanai.com/api/mcp` |
| [YouArt](plugins/youart) | Create AI media workflows. | OAuth | `https://mcp.youart.ai/mcp` |
| [Youform](plugins/youform) | Forms, surveys & quizzes. | OAuth | `https://app.youform.com/mcp` |
| [Your Color Palette](plugins/your-color-palette) | Color season from a selfie. | None | `https://mcp.yourcolorpalette.com/mcp` |
| [Your Language Coach](plugins/your-language-coach) | Run your language centre. | OAuth | `https://mcp.yourlanguage.coach/mcp` |
| [Your VA Benefits](plugins/your-va-benefits) | VA benefits and VSO tools. | None | `https://mcp.yourvabenefits.com/mcp` |
| [Yournotify](plugins/yournotify) | Manage campaigns and contacts. | OAuth | `https://mcp.yournotify.com/mcp` |
| [YTPuller](plugins/ytpuller) | Read any public YouTube video. | OAuth | `https://ytpuller.com/api/v1/mcp` |
| [Yumo Eats](plugins/yumo-eats) | Find food and draft carts. | None | `https://yumoeats.com/mcp` |
| [Yuqi 视频看房 Video Home Tour](plugins/yuqi-video-home-tour) | Real video tours of CA homes. | None | `https://mcp.yunaione.com/mcp` |
| [Zacks Financial Data](plugins/zacks-financial-data) | Zacks Trusted Financial Data. | OAuth | `https://mcp.zacksdata.com/` |
| [Zaemit](plugins/zaemit) | Build and run your website. | OAuth | `https://zaemit.ai/mcp` |
| [ZaminAI](plugins/zaminai) | Real estate search and CMAs. | OAuth | `https://mcp.zaminai.com/mcp` |
| [Zapier](plugins/zapier) | Connect 9,000+ apps to your AI workflow. | OAuth | `https://mcp.zapier.com/api/v1/connect` |
| [Zeffy](plugins/zeffy) | Fundraising data analytics. | OAuth | `https://api.zeffy.com/mcp` |
| [Zeiko Agents](plugins/zeiko-agents) | Create and test support agents. | OAuth | `https://zeiko.io/mcp` |
| [Zelta BMI for Indians](plugins/zelta-bmi-india) | BMI for Indians. | None | `https://bmi-mcp.zelta.in/mcp` |
| [Zelta Daily Calorie Target](plugins/zelta-calorie-target) | Daily Calorie Target. | None | `https://calorie-mcp.zelta.in/mcp` |
| [Zelta Protein Per Day](plugins/zelta-protein-target) | Protein Per Day. | None | `https://protein-mcp.zelta.in/mcp` |
| [Zelta Steps to Calories](plugins/zelta-steps-calories) | Steps to Calories. | None | `https://steps-mcp.zelta.in/mcp` |
| [Zen](plugins/zen) | Study with your own courses. | OAuth | `https://mcp.learnzen.co/mcp` |
| [Zen Shopping](plugins/zen-shopping) | Smart shopping, all stores. | None | `https://seekist.ai/mcp` |
| [Zendesk (Beta)](plugins/zendesk) | Investigate support activity and manage Zendesk work. | OAuth | `https://mcp.zendesk.com/mcp` |
| [Zendrop](plugins/zendrop) | Manage dropshipping ops. | OAuth | `https://app.zendrop.com/mcp/v1` |
| [ZeniFlow](plugins/zeniflow) | Track spending and budgets. | OAuth | `https://mcp.zeniflow.app/mcp` |
| [Zeno Bookkeeper](plugins/zeno) | For QuickBooks Online. | OAuth | `https://api.zenofirm.com/mcp` |
| [Zeno Household](plugins/zeno-household) | Household money, guided. | OAuth | `https://api.zenonest.com/mcp` |
| [Zentrik](plugins/zentrik) | Evidence for product decisions. | OAuth | `https://zentrik.ai/mcp` |
| [Zernio](plugins/zernio) | Social media API for developers. | OAuth | `https://mcp.zernio.com/mcp` |
| [Zero Slop](plugins/zero-slop) | Edit and check your writing. | None | `https://mcp.zero-slop.ai/mcp` |
| [zeroheight](plugins/zeroheight) | Connect your design system. | OAuth | `https://mcp.zeroheight.com/mcp` |
| [Zim Studio](plugins/zim-studio) | Create images, video and audio. | OAuth | `https://mcp.zim.studio/mcp` |
| [Zite](plugins/zite) | Build apps and manage data. | OAuth | `https://mcp.zite.com/mcp` |
| [Zitierfest](plugins/zitierfest) | Deutsches Recht im Wortlaut. | OAuth | `https://mcp.zitierfest.de/mcp` |
| [Ziweave](plugins/ziweave) | Ziwei astrology, made clear. | OAuth | `https://mcp.ziweave.com/mcp` |
| [Zocks](plugins/zocks) | Analyze client insights. | OAuth | `https://mcp.zocks.io/v1/mcp` |
| [ZOLLO](plugins/zollo) | Email campaigns and contacts. | OAuth | `https://mcp.zollo.run/mcp` |
| [Zolt Health](plugins/zolt-health) | Nutrition and adaptive TDEE. | OAuth | `https://mcp.zolthealth.com/mcp` |
| [Zone2AI](plugins/zone2ai) | Your real Zone 2 heart rate. | None | `https://mcp.zone2ai.com/mcp` |
| [ZoneFoundry for Sonos](plugins/zonefoundry-for-sonos) | Control your Sonos speakers. | OAuth | `https://relay.zonefoundry.dev/mcp` |
| [Zonka Feedback](plugins/zonka-feedback) | Customer Feedback Intelligence. | OAuth | `https://mcp.zonkafeedback.com/` |
| [Zonori](plugins/zonori) | What's on in your city. | None | `https://api.zonori.app/mcp` |
| [ZoofiAI](plugins/zoofiai-wordpress) | Manage WordPress with AI. | OAuth | `https://mcp.zoofiai.com/mcp` |
| [Zoom](plugins/zoom) | Search meetings, pull transcripts, and work with Zoom Docs. | OAuth | `https://mcp.zoom.us/mcp/zoom/streamable` |
| [ZoomSphere](plugins/zoomsphere) | Plan and publish social posts. | OAuth | `https://mcp.zoomsphere.com/mcp` |
| [Zoowa](plugins/zoowa) | AI presence and agent commerce. | None | `https://mcp.zoowa.ai/mcp` |
| [Zorro AI](plugins/zorro-ai) | UK company intelligence. | OAuth | `https://mcp.getzorro.ai/mcp` |
| [ZOVA](plugins/zova) | Property data for brokers. | OAuth | `https://api.zovastudio.com/mcp` |
| [Zovo Address Geocoder](plugins/census-geocode) | US address lists to geography. | None | `https://census-geocode.zovo.one/mcp` |
| [Zovo Baby Names](plugins/baby-names) | US baby name trends & finder. | None | `https://baby-names.zovo.one/mcp` |
| [Zovo Barcode Maker](plugins/barcode-maker) | EAN, UPC & Code 128 barcodes. | None | `https://barcode-maker.zovo.one/mcp` |
| [Zovo Bingo Card Maker](plugins/bingo-cards) | Printable bingo cards & caller. | None | `https://bingo-cards.zovo.one/mcp` |
| [Zovo Currency Converter](plugins/currency-converter) | Currency rates & history. | None | `https://currency-converter.zovo.one/mcp` |
| [Zovo Date Calculator](plugins/date-calculator) | Days between dates & workdays. | None | `https://date-calculator.zovo.one/mcp` |
| [Zovo DNS Checker](plugins/dns-checker) | Live DNS & email auth checks. | None | `https://dns-checker.zovo.one/mcp` |
| [Zovo Domain Lookup](plugins/domain-lookup) | Whois and domain expiry data. | None | `https://domain-lookup.zovo.one/mcp` |
| [Zovo Federal Register Digest](plugins/fed-register) | Federal rules and deadlines. | None | `https://fed-register.zovo.one/mcp` |
| [Zovo Focus Timer](plugins/focus-timer) | Pomodoro & countdown timer. | None | `https://focus-timer.zovo.one/mcp` |
| [Zovo GPA Calc](plugins/gpa-calculator) | GPA from grades and credits. | None | `https://gpa-calculator.zovo.one/mcp` |
| [Zovo Grant Finder](plugins/grant-finder) | Federal grants and deadlines. | None | `https://grant-finder.zovo.one/mcp` |
| [Zovo Inflation Calculator](plugins/inflation-calculator) | US CPI inflation calculator. | None | `https://inflation-calculator.zovo.one/mcp` |
| [Zovo IP Lookup](plugins/ip-lookup) | Who owns an IP address? | None | `https://ip-lookup.zovo.one/mcp` |
| [Zovo LEI Lookup](plugins/lei-lookup) | LEI checks and renewal dates. | None | `https://lei-lookup.zovo.one/mcp` |
| [Zovo Meeting Planner](plugins/meeting-planner) | Find meeting times across TZs. | None | `https://meeting-planner.zovo.one/mcp` |
| [Zovo Name Wheel](plugins/name-wheel) | Spin a wheel, pick a name. | None | `https://name-wheel.zovo.one/mcp` |
| [Zovo NPI Lookup](plugins/npi-lookup) | Provider rosters & NPI checks. | None | `https://npi-lookup.zovo.one/mcp` |
| [Zovo Org Chart Maker](plugins/org-chart) | Org charts from a team list. | None | `https://org-chart.zovo.one/mcp` |
| [Zovo Palette Lab](plugins/contrast-checker) | WCAG contrast & palettes. | None | `https://contrast-checker.zovo.one/mcp` |
| [Zovo PDF to Spreadsheet](plugins/pdf-to-excel) | PDF tables into a spreadsheet. | None | `https://pdf-to-excel.zovo.one/mcp` |
| [Zovo Product Recall Check](plugins/product-recalls) | Inventory recall screening. | None | `https://product-recalls.zovo.one/mcp` |
| [Zovo Project Timeline](plugins/gantt-timeline) | Gantt charts & critical path. | None | `https://gantt-timeline.zovo.one/mcp` |
| [Zovo QR Code Maker](plugins/qr-code-studio) | QR codes for links & contacts. | None | `https://qr-code-studio.zovo.one/mcp` |
| [Zovo SEC Filings](plugins/sec-filings) | SEC filings and financials. | None | `https://sec-filings.zovo.one/mcp` |
| [Zovo Spreadsheet Compare](plugins/sheet-compare) | Compare two spreadsheets. | None | `https://sheet-compare.zovo.one/mcp` |
| [Zovo Spreadsheet Merge](plugins/sheet-join) | Merge sheets on messy IDs. | None | `https://sheet-join.zovo.one/mcp` |
| [Zovo Tournament Maker](plugins/bracket-maker) | Brackets, round robins, Swiss. | None | `https://bracket-maker.zovo.one/mcp` |
| [Zovo Typing Test](plugins/typing-test) | Live typing speed test and WPM. | None | `https://typing-test.zovo.one/mcp` |
| [Zovo VAT Number Check](plugins/vat-check) | EU VAT checks and dated logs. | None | `https://vat-check.zovo.one/mcp` |
| [Zovo VIN Recall Check](plugins/vehicle-recalls) | VIN decode and recall reports. | None | `https://vehicle-recalls.zovo.one/mcp` |
| [Zovo Weather History](plugins/weather-history) | Past weather & daily logs. | None | `https://weather-history.zovo.one/mcp` |
| [Zovo Website Status Checker](plugins/site-status) | Check if a website is up. | None | `https://site-status.zovo.one/mcp` |
| [Zovo Word Counter](plugins/word-counter) | Exact word & character counts. | None | `https://word-counter.zovo.one/mcp` |
| [ZRouter](plugins/zrouter) | Manage your AI gateway. | OAuth | `https://zrouter.si/mcp` |
| [Zumba](plugins/zumba) | Find Zumba classes. | None | `https://mcp.zumba.com/mcp` |
| [Zuzli](plugins/zuzli) | Plan and manage trips. | OAuth | `https://zuzli.app/mcp` |
| [zyberspace](plugins/zyberspace) | Create websites from Reason. | OAuth | `https://www.zyberspace.com/api/mcp` |
| [Zyft](plugins/zyft) | Australian price comparison. | None | `https://mcp.zyft.com/mcp` |
| [Zynta Flow](plugins/zynta-flow) | Create social media carousels. | OAuth | `https://mcp.zyntaflow.com/mcp` |
| [zzTakeoff](plugins/zztakeoff) | Construction takeoff tools. | OAuth | `https://www.zztakeoff.com/mcp` |
| [СтэшМи](plugins/stashme) | Your saved posts as lists. | OAuth | `https://stashme.ru/mcp` |
| [مساعدي — IB Law](plugins/ib-law) | Manage your legal practice. | OAuth | `https://lawyer.ib.com.sa/mcp` |
| [더블유쇼핑](plugins/dev-6acdafbf138c819188997fef8ae1a84b) | 더블유쇼핑 상품 검색 및 맞춤 추천. | None | `https://mcp.w-shopping.co.kr/mcp` |
| [유아이볼 (uibowl)](plugins/uibowl) | Find UI/UX design references. | OAuth | `https://uibowl.io/api/mcp` |
| [청연 (청소연구소)](plugins/chyeon-cleaninglab) | 일상에 도움이 필요한 순간, 청연. | None | `https://mcp.chyeon.com/mcp` |
| [学童さがし](plugins/gakudo-sagashi) | Find Tokyo childcare. | None | `https://gakudosagashi.jp/mcp` |
| [實價AI](plugins/ai) | 台灣房價行情. | OAuth | `https://api.shijia-ai.com/mcp` |
| [滴答清单: To-Do List & Calendar](plugins/to-do-list-and-calendar) | Reminder, Planner, Countdown. | OAuth | `https://mcp.dida365.com/` |

## License

[MIT](LICENSE)
