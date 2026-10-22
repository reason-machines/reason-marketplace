# Reason Marketplace

The plugins you can connect to [Reason](https://reasonmachines.com), the autonomous
software engineer. Each plugin gives Reason's agents the tools of a hosted MCP
server, such as Linear, Sentry, Notion, Stripe, or Supabase, so a session can read
issues, check logs, query a database, or update a ticket while it works.

This repository lists 180 plugins. It is the public catalog of what Reason offers; it holds
no credentials and no code that runs in your workspace.

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

## Layout

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
| [1Password](plugins/1password) | Let agents read the secrets you share from 1Password: API keys, passwords, database URLs and one-time codes. | API key | `https://mcp.reasonmachines.com/1password/mcp` |
| [ActiveCampaign](plugins/activecampaign) | Marketing automation and CRM: manage contacts, lists, tags, and custom fields, plan and report on email campaigns, build automations, and operate deal pipelines through natural language | OAuth | `https://mcp.app-us1.com/http` |
| [Ahrefs](plugins/ahrefs) | Research keywords, backlinks, rankings, and site health. | OAuth | `https://api.ahrefs.com/mcp/mcp` |
| [Airtable](plugins/airtable) | Search and update bases, tables, records, and views. | OAuth | `https://mcp.airtable.com/mcp` |
| [Amplemarket](plugins/amplemarket) | Search people and companies, enrich leads, run sequences. | OAuth | `https://mcp.amplemarket.com/mcp` |
| [AngelList](plugins/angellist) | Turn your fund into something you can talk to. Fund managers spend too much time on lookups that should be instant: capital call status, LP holdings, valuations, documents. AngelList MCP puts your entire fund at the other end of a prompt. Authenticate once to query capital accounts, distributions, and documents across every vehicle, backed by financials that refresh daily instead of once a quarter. It's the system of record your fund already runs on, now queryable from wherever you work. Every answer comes with a path back to its source — ask for the underlying document to verify on your terms. Investment decisions get made on current numbers, LP questions get answered on the spot, and the workflows that used to take an email chain are handled in a single prompt. AngelList runs more of a fund's operations than any other platform — formation, banking, capital calls, distributions, taxes, reporting. AngelList MCP makes all of it queryable from wherever you work. The connector is read-only: it retrieves and summarizes your data but never creates, modifies, or transacts anything, and each authenticated user sees only the funds and vehicles they're entitled to. | OAuth | `https://mcp.angellist.com/mcp` |
| [Apify](plugins/apify) | Run Apify actors for web scraping, browser automation, and data extraction through Apify's hosted MCP server. | OAuth | `https://mcp.apify.com/` |
| [Apollo GraphOS](plugins/graphos-tools) | Apollo GraphOS integration to search Apollo docs, specs, and best practices | OAuth | `https://mcp.apollographql.com` |
| [Apollo.io](plugins/apollo-io) | Apollo.io integration to search prospects, enrich contacts, and manage sales sequences | OAuth | `https://mcp.apollo.io/mcp` |
| [Appwrite](plugins/appwrite) | Appwrite's hosted MCP server: manage your Appwrite Cloud projects, databases, auth, storage, functions and deployments. | OAuth | `https://mcp.appwrite.io` |
| [Ashby](plugins/ashby) | Search candidates, prep interviews, and manage pipeline tasks. | OAuth | `https://mcp.ashbyhq.com/mcp/v1` |
| [Atlan](plugins/atlan) | Atlan's hosted MCP server: search, explore and govern your data catalog with semantic search, lineage traversal, glossary management and data-quality context. | OAuth | `https://mcp.atlan.com/mcp` |
| [Attio](plugins/attio) | Read and update Attio CRM records, lists, and workspace data through Attio's hosted MCP server. | OAuth | `https://mcp.attio.com/mcp` |
| [Axiom](plugins/axiom) | Run APL queries, inspect datasets and schemas, and investigate logs through Axiom's hosted MCP server. | OAuth | `https://mcp.axiom.co/mcp` |
| [Brex](plugins/brex) | Query expenses, receipts, bills, cards, and travel. | OAuth | `https://api.brex.com/mcp` |
| [Browserless](plugins/browserless) | Browser automation in the cloud: smart scraping, web search, crawling, Lighthouse audits, and custom Puppeteer code execution with no infrastructure required. | OAuth | `https://mcp.browserless.io/mcp` |
| [Buildkite](plugins/buildkite) | Buildkite's hosted MCP server: inspect pipelines, builds, jobs and logs, trigger and retry builds, and look up test analytics and cluster/agent status. | OAuth | `https://mcp.buildkite.com/mcp` |
| [Calendly](plugins/calendly) | Check availability and book, cancel, or reschedule. | OAuth | `https://mcp.calendly.com/` |
| [Canva](plugins/canva) | Official Canva integration for design creation, template management, and visual content generation | OAuth | `https://mcp.canva.com/mcp` |
| [CData Connect AI](plugins/cdata-connect-ai) | CData Connect AI integration for querying 350+ data sources through a managed MCP platform | OAuth | `https://mcp.cloud.cdata.com/mcp` |
| [Cello](plugins/cello) | Query your Cello referral program: check integration health, inspect events, find top referrers, and review program performance | OAuth | `https://mcp.cello.so/mcp` |
| [Circle](plugins/circle) | Circle's hosted developer MCP server: real-time guidance on Circle SDKs and documentation for USDC payments, cross-chain transfers, wallets and smart contracts. | None | `https://api.circle.com/v1/codegen/mcp` |
| [Circleback](plugins/circleback) | Search meetings, transcripts, action items, and emails. | OAuth | `https://circleback.ai/api/mcp` |
| [Clay](plugins/clay) | Enrich people and companies, run AI research agents. | OAuth | `https://api.clay.com/v3/mcp` |
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
| [Coda](plugins/coda) | Search docs, read pages, and update tables. | OAuth | `https://docs.superhuman.com/apis/mcp` |
| [CodSpeed](plugins/codspeed) | CodSpeed's hosted MCP server: dive into benchmark results, flamegraphs and performance comparisons to pinpoint bottlenecks and iterate on performance. | OAuth | `https://mcp.codspeed.io/mcp` |
| [Coinbase](plugins/coinbase) | Check balances, get quotes, and preview or place trades. | OAuth | `https://agents.coinbase.com/mcp` |
| [Contentsquare](plugins/contentsquare) | Contentsquare integration for digital experience analytics | OAuth | `https://api.contentsquare.com/mcp` |
| [Context7](plugins/context7) | Up-to-date, version-specific library documentation and code examples, straight into the agent's context. | None | `https://mcp.context7.com/mcp` |
| [Craft](plugins/craft) | Search, create, and update documents and daily notes. | OAuth | `https://mcp.craft.do/my/mcp` |
| [Customer.io](plugins/customer-io) | Build campaigns, manage segments, and query people. | OAuth | `https://mcp.customer.io/mcp` |
| [Daloopa](plugins/daloopa) | Pull source-linked fundamentals, KPIs, filings, and prices. | OAuth | `https://mcp.daloopa.com/server/mcp` |
| [Datadog](plugins/datadog) | Query Datadog metrics, logs, traces, monitors, and incidents through Datadog's hosted MCP server. | OAuth | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| [DataHub](plugins/datahub) | DataHub integration to connect AI agents to enterprise data and context | OAuth | `https://mcp.datahub.com/mcp` |
| [DeepWiki](plugins/deepwiki) | Access comprehensive documentation for GitHub repositories with AI-powered insights | None | `https://mcp.deepwiki.com/mcp` |
| [DocuSign](plugins/docusign) | Manage envelopes, templates, workflows, and agreements. | OAuth | `https://mcp.docusign.com/mcp` |
| [Enterpret](plugins/enterpret) | Enterpret integration to get answers from unified customer feedback | OAuth | `https://wisdom-api.enterpret.com/server/mcp` |
| [Eraser](plugins/eraser) | Eraser integration to generate, manage, and update diagrams and docs | OAuth | `https://app.eraser.io/api/mcp` |
| [eToro Trading](plugins/etoro-trading) | View your eToro portfolio, balances, positions, and watchlists, research instruments and traders, and prepare and place trades. | OAuth | `https://mcp.public-api.etoro.com` |
| [Exa](plugins/exa) | Give agents live web search and page-fetch tools through Exa's hosted MCP server. | OAuth | `https://mcp.exa.ai/mcp` |
| [Excalidraw](plugins/excalidraw) | Draw and export hand-drawn diagrams from chat. | None | `https://mcp.excalidraw.com/mcp` |
| [Expo](plugins/expo) | Expo's hosted MCP server: query your Expo projects, EAS builds, updates and submissions, and get Expo/React Native guidance. | OAuth | `https://mcp.expo.dev/mcp` |
| [Fathom](plugins/fathom) | Search meetings and pull transcripts and summaries. | OAuth | `https://api.fathom.ai/mcp` |
| [Firecrawl](plugins/firecrawl) | Give agents crawling, scraping, search, and extraction tools through Firecrawl's hosted MCP server. | OAuth | `https://mcp.firecrawl.dev/v2/mcp-oauth` |
| [Fireflies](plugins/fireflies) | Search meeting transcripts, summaries, and action items. | OAuth | `https://api.fireflies.ai/mcp` |
| [Fullstory](plugins/fullstory) | Fullstory's hosted MCP server: query behavioral analytics, session replays and customer experience insights. | OAuth | `https://api.fullstory.com/mcp/fullstory` |
| [GC AI](plugins/gc-ai) | GC AI's hosted MCP server: upload documents to your GC AI legal knowledge base, run review playbooks and ask questions grounded in your own files. | OAuth | `https://app.gc.ai/api/mcp` |
| [GitLab](plugins/gitlab) | Read GitLab projects, issues, merge requests, and pipelines through GitLab's hosted MCP server (gitlab.com). | OAuth | `https://gitlab.com/api/v4/mcp` |
| [GoDaddy](plugins/godaddy) | Brainstorm domain names and check availability. | None | `https://api.godaddy.com/v1/domains/mcp` |
| [Gong](plugins/gong) | Pull account summaries, deal insights, and call briefs. | OAuth | `https://mcp.gong.io/mcp` |
| [Google Calendar](plugins/google-calendar) | Search events and check your schedule. | OAuth | `https://calendarmcp.googleapis.com/mcp/v1` |
| [Google Cloud BigQuery](plugins/google-cloud-bigquery) | Explore datasets and tables and run SQL queries. | OAuth | `https://bigquery.googleapis.com/mcp` |
| [Google Drive](plugins/google-drive) | Search and read files. | OAuth | `https://drivemcp.googleapis.com/mcp/v1` |
| [Google Workspace](plugins/google-workspace) | Search, read, draft and send Gmail; read and manage Calendar events and availability; search and read Drive files. | OAuth | `https://mcp.reasonmachines.com/google-workspace/mcp` |
| [Grafana](plugins/grafana) | Inspect Grafana Cloud dashboards, data sources, alerts, and incidents through Grafana's hosted MCP server. Grafana Cloud only. | OAuth | `https://mcp.grafana.com/mcp` |
| [Granola](plugins/granola) | Use Granola meeting notes, summaries, and transcript context in agent runs. | OAuth | `https://mcp.granola.ai/mcp` |
| [Guru](plugins/guru) | Search company knowledge and draft verified answers. | OAuth | `https://mcp.api.getguru.com/mcp` |
| [Hex](plugins/hex) | Hex integration to answer questions about your data with the Hex agent | OAuth | `https://app.hex.tech/mcp` |
| [Honeycomb](plugins/honeycomb) | Honeycomb integration to query and explore observability data and SLOs | OAuth | `https://mcp.honeycomb.io/mcp` |
| [HubSpot](plugins/hubspot) | Search and update contacts, companies, deals, and tickets. | OAuth | `https://mcp.hubspot.com` |
| [Hugging Face](plugins/hugging-face) | Hugging Face integration to access the Hub and thousands of Gradio apps | OAuth | `https://huggingface.co/mcp` |
| [Hunter](plugins/hunter) | Find and verify emails, discover companies, and save leads. | OAuth | `https://mcp.hunter.io/mcp` |
| [Hyperspell](plugins/hyperspell) | Search company knowledge, ask questions with citations, and save memories. | API key | `https://api.hyperspell.com/mcp` |
| [incident.io](plugins/incident-io) | incident.io integration to see and manage everything in incident.io | OAuth | `https://mcp.incident.io/mcp` |
| [Interactive Brokers](plugins/interactive-brokers) | Review positions, balances, P&L, and draft trade instructions. | OAuth | `https://api.ibkr.com/v1/api/mcp-public` |
| [Jam](plugins/jam) | Access Jam bug reports, recordings, console/network context, and repro steps. | OAuth | `https://mcp.jam.dev/mcp` |
| [Jira](plugins/jira) | Read Jira issues, projects, statuses, users, and comments through Atlassian's hosted MCP server. | OAuth | `https://mcp.atlassian.com/v1/mcp` |
| [Jotform](plugins/jotform) | Create and edit forms, then read submissions. | OAuth | `https://mcp.jotform.com` |
| [Juicebox](plugins/juicebox) | Query recruiting analytics, shortlists, and sourcing agents. | OAuth | `https://mcp.juicebox.ai/v1` |
| [Kernel](plugins/kernel) | Launch Chromium browsers, execute Playwright code, and automate web interactions through Kernel's hosted MCP server. | OAuth | `https://mcp.onkernel.com/mcp` |
| [Klaviyo](plugins/klaviyo) | Manage profiles, segments, campaigns, and flows. | OAuth | `https://mcp.klaviyo.com/mcp` |
| [Kpler](plugins/kpler) | Kpler integration to explore maritime and commodities intelligence | OAuth | `https://claude.mcp.kpler.com/v1/mcp/` |
| [LaunchDarkly](plugins/launchdarkly) | Manage LaunchDarkly feature flags: list, create, update, and delete flags, check flag status across environments, manage AI Configs, and inspect code references and audit log entries | OAuth | `https://mcp.launchdarkly.com/mcp/launchdarkly` |
| [Linear](plugins/linear) | Read Linear issues, projects, cycles, comments, and team metadata from Linear's hosted MCP server. | OAuth | `https://mcp.linear.app/mcp` |
| [LogRocket](plugins/logrocket) | LogRocket's hosted MCP server: query session replays, metrics, issues and user behavior in natural language. | OAuth | `https://mcp.logrocket.com/mcp?toolsets=all` |
| [Lovable](plugins/lovable) | Lovable's hosted MCP server: build, iterate on, deploy and manage Lovable apps and their databases. | OAuth | `https://mcp.lovable.dev` |
| [LunarCrush](plugins/lunarcrush) | LunarCrush integration to add real-time social media data to your searches | OAuth | `https://lunarcrush.ai/mcp` |
| [MailerLite](plugins/mailerlite) | Manage subscribers, groups, campaigns, and automations. | OAuth | `https://mcp.mailerlite.com/mcp` |
| [Mapbox](plugins/mapbox) | Mapbox's hosted MCP server: geocoding, directions, isochrones, POI search and other geospatial tools for building location-aware applications. | OAuth | `https://mcp.mapbox.com/mcp` |
| [Mapbox DevKit](plugins/mapbox-devkit) | Mapbox's hosted DevKit MCP server: manage styles, tilesets, fonts, datasets and tokens in your Mapbox account. | OAuth | `https://mcp-devkit.mapbox.com/mcp` |
| [Mapbox Docs](plugins/mapbox-docs) | Mapbox's hosted documentation MCP server: search Mapbox API, SDK and style documentation. | None | `https://mcp-docs.mapbox.com/mcp` |
| [Meltwater](plugins/meltwater) | Search media and social mentions and pull analytics. | OAuth | `https://api.meltwater.com/v2/mcp` |
| [Mem](plugins/mem) | Capture, search, and organize notes and collections. | OAuth | `https://mcp.mem.ai/mcp` |
| [Mercury](plugins/mercury) | Read balances, transactions, statements, and cards. | OAuth | `https://mcp.mercury.com/mcp` |
| [Meticulous](plugins/meticulous) | Meticulous integration to inspect test runs, replay diffs, and coverage for frontend changes | OAuth | `https://app.meticulous.ai/api/mcp` |
| [Microsoft Learn](plugins/microsoft-learn) | Microsoft Learn integration to search trusted Microsoft documentation | None | `https://learn.microsoft.com/api/mcp` |
| [Mintlify](plugins/mintlify) | Mintlify integration to search, read, and edit your documentation | OAuth | `https://mcp.mintlify.com` |
| [Mintlify Index](plugins/mintlify-index) | Mintlify Index integration to search publisher-maintained docs across all Mintlify sites | None | `https://index.mintlify.com` |
| [Miro](plugins/miro) | Miro integration to build boards, visualize ideas, and act on feedback | OAuth | `https://mcp.miro.com/` |
| [Mixpanel](plugins/mixpanel) | Mixpanel integration to analyze, query, and manage your product analytics data | OAuth | `https://mcp.mixpanel.com/mcp` |
| [Mobbin](plugins/mobbin) | Reference real mobile and web app design patterns from Mobbin's screen library. Requires a paid Mobbin plan. | OAuth | `https://api.mobbin.com/mcp` |
| [monday.com](plugins/monday) | monday.com integration to manage boards, items, and work-management workflows | OAuth | `https://mcp.monday.com/mcp` |
| [MongoDB Atlas](plugins/mongodb-atlas) | Connect to MongoDB Atlas clusters via the Atlas Managed MCP Server to explore data, manage resources, and generate best-practice code | OAuth | `https://mcp.mongodb.com` |
| [Monte Carlo](plugins/monte-carlo) | Monte Carlo integration for data and AI observability | OAuth | `https://integrations.getmontecarlo.com/mcp` |
| [MotherDuck](plugins/motherduck) | MotherDuck integration to get answers from your data with DuckDB | OAuth | `https://api.motherduck.com/mcp` |
| [Motion Creative Analytics](plugins/motion) | Motion integration to analyze ad creative and competitor ad libraries | OAuth | `https://projects.motionapp.com/mcp` |
| [Navan](plugins/navan) | Query expenses, travel bookings, policies, and cards. | OAuth | `https://mcp.navan.com/mcp` |
| [Neon](plugins/neon) | Inspect Neon projects, branches, databases, and run SQL through Neon's hosted MCP server. | OAuth | `https://mcp.neon.tech/mcp` |
| [Netlify](plugins/netlify) | Inspect Netlify sites, deploys, forms, and environment state through Netlify's hosted MCP server. | OAuth | `https://netlify-mcp.netlify.app/mcp` |
| [Notion](plugins/notion) | Search, read, and update Notion pages and databases through Notion's hosted MCP server. | OAuth | `https://mcp.notion.com/mcp` |
| [Omni Analytics](plugins/omni-analytics) | Omni integration to query your data using natural language | OAuth | `https://callbacks.omniapp.co/callback/mcp` |
| [Orion by Gravity](plugins/orion) | Orion by Gravity integration to get insights from an autonomous AI analyst | OAuth | `https://g.runorion.com/mcp` |
| [Otter.ai](plugins/otter) | Search meeting history and pull full transcripts. | OAuth | `https://mcp.otter.ai/mcp` |
| [Outreach](plugins/outreach) | Search sequences, prospects, and Kaia meetings. | OAuth | `https://api.outreach.io/mcp` |
| [PayPal](plugins/paypal) | Manage PayPal commerce operations; handle disputes; issue and send invoices; create orders, captures, and refunds; list transactions; track shipments; and manage subscriptions. | OAuth | `https://mcp.paypal.com/mcp` |
| [Peec AI](plugins/peec-ai) | Peec AI integration to analyze your brand's visibility across LLMs | OAuth | `https://api.peec.ai/mcp` |
| [Pendo](plugins/pendo) | Pendo integration for product and user insights | OAuth | `https://app.pendo.io/mcp/v0/shttp` |
| [pg-aiguide](plugins/pg-aiguide) | pg-aiguide integration to search Postgres and Tiger docs and learn database skills | None | `https://mcp.tigerdata.com/docs` |
| [Phoenix by HG Insights](plugins/phoenix) | Phoenix by HG Insights integration for B2B data intelligence and analytics | OAuth | `https://phoenix.hginsights.com/api/ai/mcp` |
| [PlanetScale](plugins/planetscale) | Access PlanetScale databases, insights, and schema recommendations through PlanetScale's hosted MCP server. | OAuth | `https://mcp.pscale.dev/mcp/planetscale` |
| [PostHog](plugins/posthog) | Query PostHog product analytics: events, insights, and feature flags. | OAuth | `https://mcp.posthog.com/mcp` |
| [Postman](plugins/postman) | Postman integration to give API context to your coding agents | OAuth | `https://mcp.postman.com/minimal` |
| [Prisma](plugins/prisma) | Manage Prisma Postgres databases; create, list, and restore backups; generate and revoke connection strings; execute SQL queries and introspect schemas. | OAuth | `https://mcp.prisma.io/mcp` |
| [Profound](plugins/profound) | Track AI visibility, sentiment, and citations. | OAuth | `https://mcp.tryprofound.com/mcp` |
| [Pylon](plugins/pylon) | Access and manage Pylon customer accounts, issues, and support data through Pylon's hosted MCP server. | OAuth | `https://mcp.usepylon.com` |
| [Qt Docs](plugins/qt-docs) | Qt Group's hosted documentation MCP server: search Qt C++ and QML documentation. | None | `https://qt-docs-mcp.qt.io/mcp` |
| [QuickNode](plugins/quicknode) | QuickNode integration to manage your blockchain infrastructure | OAuth | `https://mcp.quicknode.com/mcp` |
| [Railway](plugins/railway) | Inspect Railway projects, services, deployments, and environment state through Railway's hosted MCP server. | OAuth | `https://mcp.railway.com` |
| [Raindrop](plugins/raindrop-ai) | Raindrop observability platform for AI agents — investigate issues, search events, inspect traces, and quantify signals through natural language | OAuth | `https://mcp.raindrop.ai/mcp` |
| [Ramp](plugins/ramp) | Ramp integration to access corporate cards, transactions, and spend data | OAuth | `https://mcp.ramp.com/mcp` |
| [Readwise](plugins/readwise) | Search highlights and Reader documents, save articles. | OAuth | `https://mcp2.readwise.io/mcp` |
| [Resend](plugins/resend) | Manage email, contacts, templates, and delivery logs. | OAuth | `https://mcp.resend.com/mcp` |
| [Robinhood](plugins/robinhood) | View portfolios, positions, orders, watchlists, and market data, and trade in a Robinhood Agentic account. | OAuth | `https://agent.robinhood.com/mcp/trading` |
| [Rootly](plugins/rootly) | Rootly integration to investigate and manage incidents, alerts, on-call schedules, and retrospectives | OAuth | `https://mcp.rootly.com/mcp` |
| [S&P Global](plugins/sp-global) | Query S&P Capital IQ financials, prices, and transcripts. | OAuth | `https://kfinance.kensho.com/integrations/mcp` |
| [Sanity](plugins/sanity) | Sanity integration to create, query, and manage structured content | OAuth | `https://mcp.sanity.io` |
| [Sentry](plugins/sentry) | Retrieve detailed Sentry issue data and full stack traces. Also search and filter issues, update issue status, assignments, tags, bookmarks, and alerts. | OAuth | `https://mcp.sentry.dev/mcp` |
| [Similarweb](plugins/similarweb) | Analyze website traffic, audiences, and competitors. | OAuth | `https://mcp.similarweb.com` |
| [Smartsheet](plugins/smartsheet) | Query and update sheets, rows, and workspaces. | OAuth | `https://mcp.smartsheet.com` |
| [Spotify Confidence Docs](plugins/confidence-docs) | Spotify Confidence's hosted documentation MCP server: search Confidence feature-flag, experimentation and SDK docs. | OAuth | `https://mcp.confidence.dev/mcp/docs` |
| [Statsig](plugins/statsig) | Inspect and manage feature gates, experiments, dynamic configs, and metrics. | OAuth | `https://api.statsig.com/v1/mcp` |
| [Stripe](plugins/stripe) | Look up Stripe customers, subscriptions, invoices, charges, and products through Stripe's hosted MCP server. | OAuth | `https://mcp.stripe.com` |
| [Strix](plugins/strix) | Ship with confidence that what you deploy is secure. Strix runs AI penetration tests and PR security reviews against your web apps, APIs, and repositories, so Devin can find, fix, and verify vulnerabilities before they reach production. List scans and open vulnerabilities by severity, pull a finding's evidence and remediation steps into a code fix, update its status, retest it, or export it to Jira or Linear. Start scans and schedules against verified assets and check supply-chain findings and analytics. Read-only tools have no side effects. Scans spend credits and send traffic to your targets. | OAuth | `https://app.strix.ai/mcp` |
| [Stytch](plugins/stytch) | Stytch integration to manage your Stytch project | OAuth | `https://mcp.stytch.dev/mcp` |
| [Supabase](plugins/supabase) | Connect a Supabase account: inspect projects, run SQL, read logs, and search docs through Supabase's hosted MCP server. | OAuth | `https://mcp.supabase.com/mcp` |
| [Supermemory](plugins/supermemory) | Store, search, and recall long-term memory and context through Supermemory's hosted MCP server. | OAuth | `https://mcp.supermemory.ai/mcp` |
| [Supermetrics](plugins/supermetrics) | Supermetrics integration to access 200+ marketing data sources | OAuth | `https://mcp.supermetrics.com/mcp` |
| [Swagger](plugins/swagger) | Swagger integration to build, govern, and document APIs | OAuth | `https://swagger.mcp.smartbear.com/mcp` |
| [Synthflow Docs](plugins/synthflow-docs) | Synthflow's hosted documentation MCP server: search the Synthflow AI voice-agent platform docs. | None | `https://docs.synthflow.ai/_mcp/server` |
| [Tavily](plugins/tavily) | Real-time web search, extract, map, and crawl tools powered by Tavily's hosted MCP server. | OAuth | `https://mcp.tavily.com/mcp` |
| [TinyFish](plugins/tinyfish) | Run TinyFish web agents to navigate, click, and extract from any site. | OAuth | `https://agent.tinyfish.ai/mcp` |
| [Todoist](plugins/todoist) | Create, find, and complete tasks and projects. | OAuth | `https://ai.todoist.net/mcp` |
| [Trellis](plugins/trellis) | Trellis integration for trial court litigation research | OAuth | `https://mcp.trellis.law/anthropic` |
| [Twilio Docs](plugins/twilio-docs) | Twilio's hosted documentation MCP server: search Twilio docs and API references for SMS, Voice, WhatsApp, Verify, SendGrid and other products. | None | `https://mcp.twilio.com/docs` |
| [Val Town](plugins/val-town) | Val Town's hosted MCP server: create, read, update and run vals (HTTP handlers, cron jobs, SQLite, email) on the Val Town platform. | OAuth | `https://api.val.town/v3/mcp` |
| [Vanta](plugins/vanta) | Vanta's hosted MCP server: query compliance tests, controls, frameworks, vendors and evidence, and get test-specific remediation guidance for your security and compliance program. | OAuth | `https://mcp.vanta.com/mcp` |
| [Vanta (AUS)](plugins/vanta-aus) | Vanta's hosted MCP server for accounts in the Australia data region: query compliance tests, controls, frameworks, vendors and evidence, and get remediation guidance. | OAuth | `https://mcp.aus.vanta.com/mcp` |
| [Vanta (EU)](plugins/vanta-eu) | Vanta's hosted MCP server for accounts in the EU data region: query compliance tests, controls, frameworks, vendors and evidence, and get remediation guidance. | OAuth | `https://mcp.eu.vanta.com/mcp` |
| [Vercel](plugins/vercel) | Inspect Vercel deployments, projects, domains, and logs through Vercel's hosted MCP server. | OAuth | `https://mcp.vercel.com` |
| [Webull](plugins/webull) | View accounts, positions, orders, watchlists, and market data. | OAuth | `https://api.webull.com/mcp` |
| [Windsor.ai](plugins/windsor-ai) | Windsor.ai integration to connect 320+ marketing data sources | OAuth | `https://mcp.windsor.ai/` |
| [Wingspan](plugins/wingspan) | Wingspan's hosted MCP server: look up the contractors you pay through Wingspan, what you owe them and what is holding up a payment, and draft contractor onboarding and payments for review. | OAuth | `https://api.wingspan.app/v3/mcp` |
| [Wispr Flow](plugins/wispr-flow) | Read-only access to Wispr Flow Notetaker meeting summaries, notes, transcripts, tasks, Scratchpad notes and calendar events | OAuth | `https://api.wisprflow.ai/connect/mcp` |
| [Wix](plugins/wix) | Wix's hosted MCP server: manage Wix sites and apps, including site content, business data and CLI-based app development. | OAuth | `https://mcp.wix.com/mcp` |
| [Wolfram](plugins/wolfram) | Wolfram integration to inject precise, real-time computation and knowledge | None | `https://agenttools.wolfram.com/mcp` |
| [Workable](plugins/workable) | Search candidates, move pipelines, and manage HR records. | OAuth | `https://mcp.workable.com/mcp` |
| [WorkOS](plugins/workos) | Manage WorkOS organizations, AuthKit, SSO, Directory Sync, roles, audit logs, environments, and branding through WorkOS's Management MCP server. | OAuth | `https://mcp.workos.com/mcp` |
| [Wrike](plugins/wrike) | Search projects, create tasks, and post comments. | OAuth | `https://mcp.wrike.com/v2` |
| [X](plugins/x) | Search posts, read timelines, look up users, and read bookmarks. | OAuth | `https://api.x.com/mcp` |
| [X Ads](plugins/x-ads) | Read ad campaigns and advertising performance. | OAuth | `https://ads-api.x.com/mcp` |
| [You.com](plugins/you-com) | You.com's hosted MCP server: web search, research with citations and content extraction via the You.com API. | OAuth | `https://api.you.com/mcp` |
| [You.com Finance](plugins/you-com-finance) | You.com's hosted finance MCP server: financial-market search and data via the You.com API. | OAuth | `https://api.you.com/mcp/finance` |
| [You.com Research](plugins/you-com-research) | You.com's hosted research MCP server: multi-step deep research reports with citations via the You.com API. | OAuth | `https://api.you.com/mcp/research` |
| [Zoom](plugins/zoom) | Search meetings, pull transcripts, and work with Zoom Docs. | OAuth | `https://mcp.zoom.us/mcp/zoom/streamable` |

## License

[MIT](LICENSE)
