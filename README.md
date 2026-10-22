# Reason Marketplace

The plugins you can connect to [Reason](https://reasonmachines.com), the autonomous
software engineer. Each plugin gives Reason's agents the tools of a hosted MCP
server, such as Linear, Sentry, Notion, Stripe, or Supabase, so a session can read
issues, check logs, query a database, or update a ticket while it works.

This repository lists 369 plugins. It is the public catalog of what Reason offers; it holds
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
| [1inch](plugins/1inch) | Quote and execute intent-based (Fusion) and cross-chain token swaps, build and manage limit orders, and call any 1inch product endpoint — portfolio, spot prices, gas, Web3 RPC, and more. | None | `https://api.1inch.com/mcp/protocol` |
| [1Password](plugins/1password) | Let agents read the secrets you share from 1Password: API keys, passwords, database URLs and one-time codes. | API key | `https://mcp.reasonmachines.com/1password/mcp` |
| [21st.dev](plugins/21st) | Find UI components and themes, retrieve their code, and use hosted 21st AI when enabled. | OAuth | `https://21st.dev/api/mcp` |
| [Aave](plugins/aave) | Connects Reason to Aave's official MCP server for live V3 and V4 markets, wallet positions, governance, and non-custodial transaction preparation. | None | `https://mcp.aave.com` |
| [ActiveCampaign](plugins/activecampaign) | Marketing automation and CRM: manage contacts, lists, tags, and custom fields, plan and report on email campaigns, build automations, and operate deal pipelines through natural language | OAuth | `https://mcp.app-us1.com/http` |
| [Adapter](plugins/adapter-mind) | Adapter Mind brings your world, and the tribal knowledge contained within it, to Reason in high resolution, before you even ask. | OAuth | `https://api.adapter.com/v1/mcp/mind/http` |
| [Adaption](plugins/adaption) | Datasets and fine-tuning workflows powered by Adaption. | OAuth | `https://api.prod.adaptionlabs.ai/api/v1/mcp` |
| [Adspirer](plugins/adspirer) | Create, analyze, and optimize campaigns across Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, Amazon Ads, and ChatGPT Ads. | OAuth | `https://mcp.adspirer.com/mcp` |
| [Adspirer Search Ads](plugins/adspirer-search-ads) | PPC advertising agent for Google and Bing. | OAuth | `https://mcp.adspirer.com/search-ads` |
| [AgentMail](plugins/agentmail) | Email inboxes for agents. | OAuth | `https://mcp.agentmail.to/mcp` |
| [Ahrefs](plugins/ahrefs) | Research keywords, backlinks, rankings, and site health. | OAuth | `https://api.ahrefs.com/mcp/mcp` |
| [AirOps](plugins/airops) | Access to AirOps Brand Kits, AEO analytics, content opportunities, reports, grids, and Knowledge Bases. | OAuth | `https://app.airops.com/mcp` |
| [Airtable](plugins/airtable) | Search and update bases, tables, records, and views. | OAuth | `https://mcp.airtable.com/mcp` |
| [Airwallex](plugins/airwallex-agentos) | Bring Airwallex's global financial infrastructure to Reason. | OAuth | `https://mcp.sandbox.airwallex.com/developer` |
| [Aleph](plugins/aleph) | Aleph MCP server. Your one source of truth for financial data. | OAuth | `https://mcp.getaleph.com/mcp` |
| [Algolia Productivity](plugins/algolia-productivity) | Connect LLM tools to your Algolia account with user-scoped access for internal workflows. | OAuth | `https://mcp.algolia.com/mcp` |
| [Allo](plugins/allo) | An AI receptionist that answers your calls, sends and reads texts, and manages contacts. | OAuth | `https://mcp.withallo.com/mcp` |
| [Alpaca Broker API](plugins/alpaca-broker) | Connect to Alpaca's Broker API. | OAuth | `https://broker-api.alpaca.markets/mcp` |
| [Alpaca Trading API](plugins/alpaca-trading) | Connect to Alpaca's Trading and Market Data APIs. | OAuth | `https://api.alpaca.markets/mcp` |
| [Amplemarket](plugins/amplemarket) | Search people and companies, enrich leads, run sequences. | OAuth | `https://mcp.amplemarket.com/mcp` |
| [Amplitude](plugins/amplitude) | Use Amplitude like an expert - instrument analytics, discover product opportunities, analyze charts, create dashboards, manage experiments, and understand users and accounts | OAuth | `https://mcp.amplitude.com/mcp` |
| [Ando](plugins/ando) | Connect an agent to Ando, the team messaging platform for humans and agents. | OAuth | `https://mcp.ando.so/mcp` |
| [AngelList](plugins/angellist) | Turn your fund into something you can talk to. Fund managers spend too much time on lookups that should be instant: capital call status, LP holdings, valuations, documents. AngelList MCP puts your entire fund at the other end of a prompt. Authenticate once to query capital accounts, distributions, and documents across every vehicle, backed by financials that refresh daily instead of once a quarter. It's the system of record your fund already runs on, now queryable from wherever you work. Every answer comes with a path back to its source — ask for the underlying document to verify on your terms. Investment decisions get made on current numbers, LP questions get answered on the spot, and the workflows that used to take an email chain are handled in a single prompt. AngelList runs more of a fund's operations than any other platform — formation, banking, capital calls, distributions, taxes, reporting. AngelList MCP makes all of it queryable from wherever you work. The connector is read-only: it retrieves and summarizes your data but never creates, modifies, or transacts anything, and each authenticated user sees only the funds and vehicles they're entitled to. | OAuth | `https://mcp.angellist.com/mcp` |
| [Antimetal](plugins/antimetal) | Bring Antimetal's software investigation intelligence into your editor. | OAuth | `https://mcp.antimetal.com` |
| [Antom](plugins/antom-integration) | Antom payment integration guidance for Reason: product selection, integration mode (Payment Element / Checkout / API-only), and security validation. | OAuth | `https://mcp.antom.com` |
| [Apify](plugins/apify) | Run Apify actors for web scraping, browser automation, and data extraction through Apify's hosted MCP server. | OAuth | `https://mcp.apify.com/` |
| [Apollo GraphOS](plugins/graphos-tools) | Apollo GraphOS integration to search Apollo docs, specs, and best practices | OAuth | `https://mcp.apollographql.com` |
| [Apollo.io](plugins/apollo-io) | Apollo.io integration to search prospects, enrich contacts, and manage sales sequences | OAuth | `https://mcp.apollo.io/mcp` |
| [Appwrite](plugins/appwrite) | Appwrite's hosted MCP server: manage your Appwrite Cloud projects, databases, auth, storage, functions and deployments. | OAuth | `https://mcp.appwrite.io` |
| [Artie](plugins/artie) | Artie real-time CDC pipelines via MCP | OAuth | `https://mcp.artie.com/mcp` |
| [Ashby](plugins/ashby) | Search candidates, prep interviews, and manage pipeline tasks. | OAuth | `https://mcp.ashbyhq.com/mcp/v1` |
| [athenahq](plugins/athenahq) | Analyze brand visibility, share of voice, citations, and rankings across AI search platforms with AthenaHQ. | None | `https://api.athenahq.ai/api/mcp` |
| [Atlan](plugins/atlan) | Atlan's hosted MCP server: search, explore and govern your data catalog with semantic search, lineage traversal, glossary management and data-quality context. | OAuth | `https://mcp.atlan.com/mcp` |
| [Atlassian](plugins/atlassian) | Atlassian plugin for Reason with MCP and skills for Jira, Confluence, triage, backlogs, status reports, and more. | OAuth | `https://mcp.atlassian.com/v2/mcp` |
| [Attio](plugins/attio) | Read and update Attio CRM records, lists, and workspace data through Attio's hosted MCP server. | OAuth | `https://mcp.attio.com/mcp` |
| [AWS Agents](plugins/aws-agents) | Build, deploy, and operate AI agents on AWS. | None | `https://knowledge-mcp.global.api.aws` |
| [Axiom](plugins/axiom) | Run APL queries, inspect datasets and schemas, and investigate logs through Axiom's hosted MCP server. | OAuth | `https://mcp.axiom.co/mcp` |
| [Basecamp](plugins/basecamp) | Find, read, and update projects, to-dos, cards, messages, docs, and schedules. | OAuth | `https://mcp.basecamp.com/mcp` |
| [Basedash](plugins/basedash) | One-click Basedash MCP for analyzing governed company data and managing dashboards and charts. | OAuth | `https://charts.basedash.com/api/public/mcp` |
| [beehiiv](plugins/beehiiv) | Run your beehiiv newsletter from chat: draft and edit posts, organize subscribers with tags, custom fields, and segments, build automations, and review publication, post, and website performance. | OAuth | `https://mcp.beehiiv.com/mcp` |
| [Bird](plugins/bird) | Drive Bird from your coding agent: operate the Bird API from the terminal with the `bird` CLI, send across email, SMS, and WhatsApp, and audit a domain's email authentication. | OAuth | `https://mcp.bird.com` |
| [Bitrise](plugins/bitrise) | Set up and manage mobile CI/CD on Bitrise: build, test, and distribute iOS, Android, Flutter, and React Native apps. | OAuth | `https://mcp.bitrise.io` |
| [Blackbird Concierge](plugins/blackbird-concierge) | Blackbird's MCP gets you access to book, reserve, and explore reservations via OpenTable, Resy, and SevenRooms. | OAuth | `https://concierge.api.blackbird.xyz/mcp` |
| [Braintrust](plugins/braintrust) | Connect Reason to Braintrust MCP and trace agent sessions. | OAuth | `https://api.braintrust.dev/mcp` |
| [Brex](plugins/brex) | Query expenses, receipts, bills, cards, and travel. | OAuth | `https://api.brex.com/mcp` |
| [Browserless](plugins/browserless) | Browser automation in the cloud: smart scraping, web search, crawling, Lighthouse audits, and custom Puppeteer code execution with no infrastructure required. | OAuth | `https://mcp.browserless.io/mcp` |
| [Buffer](plugins/buffer) | Manage social media with Buffer: draft, schedule, and publish posts across connected channels, manage the queue and ideas, and review post performance. | OAuth | `https://mcp.buffer.com/mcp` |
| [Buildkite](plugins/buildkite) | Buildkite's hosted MCP server: inspect pipelines, builds, jobs and logs, trigger and retry builds, and look up test analytics and cluster/agent status. | OAuth | `https://mcp.buildkite.com/mcp` |
| [Calendly](plugins/calendly) | Check availability and book, cancel, or reschedule. | OAuth | `https://mcp.calendly.com/` |
| [Canva](plugins/canva) | Official Canva integration for design creation, template management, and visual content generation | OAuth | `https://mcp.canva.com/mcp` |
| [Cartesia](plugins/cartesia) | Voice AI for agents: Sonic TTS, Ink STT, voice cloning, and Line voice agents. | OAuth | `https://mcp.cartesia.ai/mcp` |
| [CData Connect AI](plugins/cdata-connect-ai) | CData Connect AI integration for querying 350+ data sources through a managed MCP platform | OAuth | `https://mcp.cloud.cdata.com/mcp` |
| [Cello](plugins/cello) | Query your Cello referral program: check integration health, inspect events, find top referrers, and review program performance | OAuth | `https://mcp.cello.so/mcp` |
| [Chainguard](plugins/chainguard) | Secure container images and hardened library dependencies powered by Chainguard. | OAuth | `https://console-api.enforce.dev/mcp` |
| [ChatPRD](plugins/chatprd) | Product requirements in your editor. | None | `https://app.chatprd.ai/mcp` |
| [Circle](plugins/circle) | Circle's hosted developer MCP server: real-time guidance on Circle SDKs and documentation for USDC payments, cross-chain transfers, wallets and smart contracts. | None | `https://api.circle.com/v1/codegen/mcp` |
| [Circleback](plugins/circleback) | Search meetings, transcripts, action items, and emails. | OAuth | `https://circleback.ai/api/mcp` |
| [CircleCI](plugins/circleci) | Debug failing builds, inspect jobs and test results, monitor pipelines, and rerun or cancel workflows across your CircleCI organization | OAuth | `https://mcp.circleci.com/v1/mcp` |
| [Cisco ThousandEyes](plugins/thousandeyes) | Connect Reason to ThousandEyes MCP endpoints for network intelligence workflows. | OAuth | `https://api.thousandeyes.com/mcp` |
| [Clarify](plugins/clarify) | Search and update CRM records, lists, campaigns, and meetings in Clarify. | OAuth | `https://api.clarify.ai/mcp` |
| [Clay](plugins/clay) | Enrich people and companies, run AI research agents. | OAuth | `https://api.clay.com/v3/mcp` |
| [Clearskies](plugins/clearskies) | Research your connected CRM, meetings, call transcripts, and email, and safely build clearskies revenue workflows. | OAuth | `https://mcp.clearskies.cc/mcp` |
| [ClickFunnels](plugins/clickfunnels) | Build funnels, manage contacts, and run your store in ClickFunnels. | OAuth | `https://agents.myclickfunnels.com/mcp` |
| [ClickHouse](plugins/clickhouse) | ClickHouse Reason plugin: skills (ClickHouse best practices), rules and MCP. | OAuth | `https://mcp.clickhouse.cloud/mcp` |
| [ClickUp](plugins/clickup) | Manage tasks, track time, and collaborate from your ClickUp workspace without switching context. | OAuth | `https://mcp.clickup.com/mcp` |
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
| [Coda](plugins/coda) | Search docs, read pages, and update tables. | OAuth | `https://docs.superhuman.com/apis/mcp` |
| [CodSpeed](plugins/codspeed) | CodSpeed's hosted MCP server: dive into benchmark results, flamegraphs and performance comparisons to pinpoint bottlenecks and iterate on performance. | OAuth | `https://mcp.codspeed.io/mcp` |
| [Coinbase](plugins/coinbase) | Check balances, get quotes, and preview or place trades. | OAuth | `https://agents.coinbase.com/mcp` |
| [Composio](plugins/composio) | Connect and operate 1000+ external apps from Reason via the Composio MCP server. | OAuth | `https://connect.composio.dev/mcp` |
| [Contentsquare](plugins/contentsquare) | Contentsquare integration for digital experience analytics | OAuth | `https://api.contentsquare.com/mcp` |
| [Context.dev](plugins/context-dev) | Search, scrape, crawl, extract, parse, monitor, and process the live web with Context.dev. | OAuth | `https://mcp.context.dev/mcp` |
| [Context7](plugins/context7) | Up-to-date, version-specific library documentation and code examples, straight into the agent's context. | None | `https://mcp.context7.com/mcp` |
| [Contracko](plugins/contracko) | AI contract review and analysis, data extraction and parsing, and automated reminders, renewal. | OAuth | `https://app.contracko.com/mcp` |
| [Craft](plugins/craft) | Search, create, and update documents and daily notes. | OAuth | `https://mcp.craft.do/my/mcp` |
| [Crustdata](plugins/crustdata) | B2B data on people and companies: people search, company search and enrichment across 800M+ profiles and 200M+ companies. | OAuth | `https://install.crustdata.com/mcp` |
| [Customer.io](plugins/customer-io) | Build campaigns, manage segments, and query people. | OAuth | `https://mcp.customer.io/mcp` |
| [Daloopa](plugins/daloopa) | Pull source-linked fundamentals, KPIs, filings, and prices. | OAuth | `https://mcp.daloopa.com/server/mcp` |
| [Dash Security](plugins/dash) | Discover your AI estate, assess supply-chain and shadow AI risk, investigate agent sessions, and track AI spend through the Dash MCP. | OAuth | `https://mcp.dash.security/mcp` |
| [Datadog](plugins/datadog) | Query Datadog metrics, logs, traces, monitors, and incidents through Datadog's hosted MCP server. | OAuth | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| [DataGrout](plugins/datagrout) | Give Reason every tool you connect in DataGrout: discover, plan and run integrations through one MCP endpoint. | OAuth | `https://gateway.datagrout.ai/connect` |
| [DataHub](plugins/datahub) | DataHub integration to connect AI agents to enterprise data and context | OAuth | `https://mcp.datahub.com/mcp` |
| [DeepWiki](plugins/deepwiki) | Access comprehensive documentation for GitHub repositories with AI-powered insights | None | `https://mcp.deepwiki.com/mcp` |
| [Deriv](plugins/deriv) | Live Deriv API schemas, payload validation, and guides for authentication, subscriptions, trades, and errors. | None | `https://mcp-api-v2.deriv.com/mcp` |
| [Descript](plugins/descript) | Edit video and audio by editing text. | OAuth | `https://api.descript.com/v2/mcp` |
| [DocuSign](plugins/docusign) | Manage envelopes, templates, workflows, and agreements. | OAuth | `https://mcp.docusign.com/mcp` |
| [Dropbox](plugins/dropbox) | The Dropbox plugin for Reason connects your Dropbox files directly to Reason, so you can search, reference, and organize files, save generated content, and create sharing links - all without… | OAuth | `https://mcp.dropbox.com/cursor_app_mcp` |
| [Elastic](plugins/elastic) | Elastic skills and documentation — Elasticsearch, Kibana, Observability, Security, Cloud, ES\|QL, OpenTelemetry, and MCP docs access | None | `https://www.elastic.co/docs/_mcp/` |
| [ElevenLabs](plugins/elevenlabs) | ElevenLabs voice AI — text-to-speech, voice agents, and speech engine skills, agent management via the ElevenLabs hosted MCP server, plus Architect skills for building and iterating on ElevenLabs… | OAuth | `https://api.us.elevenlabs.io/v1/mcp` |
| [Enterpret](plugins/enterpret) | Enterpret integration to get answers from unified customer feedback | OAuth | `https://wisdom-api.enterpret.com/server/mcp` |
| [Envoy](plugins/envoy) | Connect to Envoy to work with workplace visitors, employees, desks, rooms, and other resources. | OAuth | `https://mcp.envoy.com/mcp` |
| [Eraser](plugins/eraser) | Eraser integration to generate, manage, and update diagrams and docs | OAuth | `https://app.eraser.io/api/mcp` |
| [eToro Trading](plugins/etoro-trading) | View your eToro portfolio, balances, positions, and watchlists, research instruments and traders, and prepare and place trades. | OAuth | `https://mcp.public-api.etoro.com` |
| [EULER for Partner Managers](plugins/euler-for-partner-managers) | Skills for partner-relationship managers (customer-admin scope) that orchestrate the EULER MCP: generate a Quarterly Business Review, pre-meeting partner briefings, a whole-portfolio pulse, and… | OAuth | `https://mcp.eulerapp.com/mcp` |
| [Exa](plugins/exa) | Give agents live web search and page-fetch tools through Exa's hosted MCP server. | OAuth | `https://mcp.exa.ai/mcp` |
| [Excalidraw](plugins/excalidraw) | Draw and export hand-drawn diagrams from chat. | None | `https://mcp.excalidraw.com/mcp` |
| [Executor](plugins/executor) | A universal tool gateway for AI agents. | OAuth | `https://executor.sh/mcp` |
| [Expo](plugins/expo) | Expo's hosted MCP server: query your Expo projects, EAS builds, updates and submissions, and get Expo/React Native guidance. | OAuth | `https://mcp.expo.dev/mcp` |
| [Extend](plugins/extend) | Document processing for agents: parse, extract, classify, and split PDFs, images, Office docs, spreadsheets, and emails, plus PDF form filling. | OAuth | `https://mcp.extend.ai/mcp` |
| [fal](plugins/fal-ai) | Create images, video, music, voice and 3D from a prompt. | OAuth | `https://mcp.fal.ai/mcp-relay` |
| [Falconer](plugins/falconer) | Read, search, and update Falconer documents from Reason through hosted HTTP MCP. | OAuth | `https://falconer.com/api/mcp` |
| [Fastio](plugins/fast-io) | Fastio workspaces for agents and the people they work with: files, shares, comments, metadata and AI search through the Fastio MCP server, plus the agent guide as a skill. | OAuth | `https://mcp.fast.io/mcp/tools` |
| [Fathom](plugins/fathom) | Search meetings and pull transcripts and summaries. | OAuth | `https://api.fathom.ai/mcp` |
| [Feishu](plugins/feishu) | Search, create, and update Feishu docs, and read Feishu messages and groups. | OAuth | `https://mcp.feishu.cn/mcp` |
| [Firecrawl](plugins/firecrawl) | Give agents crawling, scraping, search, and extraction tools through Firecrawl's hosted MCP server. | OAuth | `https://mcp.firecrawl.dev/v2/mcp-oauth` |
| [Fireflies](plugins/fireflies) | Search meeting transcripts, summaries, and action items. | OAuth | `https://api.fireflies.ai/mcp` |
| [Flexport](plugins/flexport) | Connect your Flexport account via the hosted MCP at mcp.flexport.com/mcp: look up shipments, check rates, search your network, and book freight using natural language. | OAuth | `https://mcp.flexport.com/mcp` |
| [Floot](plugins/floot) | Build and host full-stack apps. | None | `https://mcp.floot.com/mcp` |
| [Freight Right](plugins/freightright) | Freight rates, quote requests and shipment tracking from your Freight Right account, with skills that keep billing and bookings right. | OAuth | `https://mcp.freightright.com/mcp` |
| [Fullenrich](plugins/fullenrich) | Find prospects, enrich verified emails, and phone numbers via waterfall enrichment, and export results. | OAuth | `https://mcp.fullenrich.com/mcp` |
| [Fullstory](plugins/fullstory) | Fullstory's hosted MCP server: query behavioral analytics, session replays and customer experience insights. | OAuth | `https://api.fullstory.com/mcp/fullstory` |
| [GC AI](plugins/gc-ai) | GC AI's hosted MCP server: upload documents to your GC AI legal knowledge base, run review playbooks and ask questions grounded in your own files. | OAuth | `https://app.gc.ai/api/mcp` |
| [GitBook](plugins/gitbook) | Create, configure, and author GitBook documentation sites — site orchestration via the GitBook REST API, Git Sync setup, branding customization, and GitBook-flavored Markdown page authoring. | OAuth | `https://mcp.gitbook.com/mcp` |
| [GitHits](plugins/githits) | The code context layer for AI coding agents | OAuth | `https://mcp.githits.com` |
| [GitLab](plugins/gitlab) | Read GitLab projects, issues, merge requests, and pipelines through GitLab's hosted MCP server (gitlab.com). | OAuth | `https://gitlab.com/api/v4/mcp` |
| [GoDaddy](plugins/godaddy) | Brainstorm domain names and check availability. | None | `https://api.godaddy.com/v1/domains/mcp` |
| [Gojiberry AI](plugins/gojiberry) | Connect Reason to your Gojiberry workspace. | OAuth | `https://mcp.gojiberry.ai/mcp` |
| [Golf Intelligence by Stracka](plugins/golf) | Golf Intelligence, by Stracka. | OAuth | `https://mcp.golfintelligence.com/mcp` |
| [Gong](plugins/gong) | Pull account summaries, deal insights, and call briefs. | OAuth | `https://mcp.gong.io/mcp` |
| [Google Calendar](plugins/google-calendar) | Search events and check your schedule. | OAuth | `https://calendarmcp.googleapis.com/mcp/v1` |
| [Google Cloud BigQuery](plugins/google-cloud-bigquery) | Explore datasets and tables and run SQL queries. | OAuth | `https://bigquery.googleapis.com/mcp` |
| [Google Drive](plugins/google-drive) | Search and read files. | OAuth | `https://drivemcp.googleapis.com/mcp/v1` |
| [Google Workspace](plugins/google-workspace) | Search, read, draft and send Gmail; read and manage Calendar events and availability; search and read Drive files. | OAuth | `https://mcp.reasonmachines.com/google-workspace/mcp` |
| [Gopuff](plugins/gopuff) | Shop Gopuff from Reason through Gopuff's official MCP server. | OAuth | `https://mcp.gopuff.com/mcp` |
| [Grafana](plugins/grafana) | Inspect Grafana Cloud dashboards, data sources, alerts, and incidents through Grafana's hosted MCP server. Grafana Cloud only. | OAuth | `https://mcp.grafana.com/mcp` |
| [Granola](plugins/granola) | Use Granola meeting notes, summaries, and transcript context in agent runs. | OAuth | `https://mcp.granola.ai/mcp` |
| [Greenhouse](plugins/greenhouse) | Search candidates, jobs, and applications, and review scorecards in Greenhouse Recruiting. | OAuth | `https://mcp.us.greenhouse.io/mcp` |
| [Gumloop](plugins/gumloop) | Connect Reason to Gumloop's hosted MCP server. | OAuth | `https://mcp.gumloop.com/gumloop/mcp` |
| [Guru](plugins/guru) | Search company knowledge and draft verified answers. | OAuth | `https://mcp.api.getguru.com/mcp` |
| [Gusto](plugins/gusto) | Work with payroll, employees, contractors, time off, and reports. | OAuth | `https://mcp.api.gusto.com/` |
| [Harmonic](plugins/harmonic) | Discover, research, and enrich companies and people | OAuth | `https://mcp.api.harmonic.ai` |
| [Harness](plugins/harness) | Harness Skills + Harness MCP server packaged as a Reason plugin. | OAuth | `https://mcp.harness.io/mcp` |
| [Heptabase](plugins/heptabase) | Connect AI agents to Heptabase to search, read, create, and update knowledge through the hosted MCP server. | OAuth | `https://api.heptabase.com/mcp` |
| [Hex](plugins/hex) | Hex integration to answer questions about your data with the Hex agent | OAuth | `https://app.hex.tech/mcp` |
| [HeyGen](plugins/heygen) | Create HeyGen avatar videos, personalized video messages, and translated / dubbed videos. | OAuth | `https://mcp.heygen.com/mcp/v1/` |
| [Higgsfield](plugins/higgsfield) | Generate images, videos, and more using Higgsfield MCP from Reason. | OAuth | `https://mcp.higgsfield.ai/mcp` |
| [HighLevel](plugins/highlevel) | Work with contacts, conversations, opportunities, calendars, and payments. | OAuth | `https://services.leadconnectorhq.com/mcp/cursor/v2` |
| [Honeycomb](plugins/honeycomb) | Honeycomb integration to query and explore observability data and SLOs | OAuth | `https://mcp.honeycomb.io/mcp` |
| [HTML/CSS to Image](plugins/html-css-to-image) | Let AI agents capture live website screenshots, render HTML/CSS, and populate reusable templates as images or PDFs - without managing a browser. | OAuth | `https://mcp.hcti.io` |
| [HubSpot](plugins/hubspot) | Search and update contacts, companies, deals, and tickets. | OAuth | `https://mcp.hubspot.com` |
| [Hugging Face](plugins/hugging-face) | Hugging Face integration to access the Hub and thousands of Gradio apps | OAuth | `https://huggingface.co/mcp` |
| [Hunter](plugins/hunter) | Find and verify emails, discover companies, and save leads. | OAuth | `https://mcp.hunter.io/mcp` |
| [Hyperspell](plugins/hyperspell) | Search company knowledge, ask questions with citations, and save memories. | API key | `https://api.hyperspell.com/mcp` |
| [IcePanel](plugins/icepanel) | Design your software architecture with IcePanel's MCP in Reason. | OAuth | `https://mcp.icepanel.io/mcp` |
| [IFTTT](plugins/ifttt) | Bring IFTTT automation into the agent: search hundreds of services, build and manage Applets, and run actions and queries without leaving your editor. | OAuth | `https://ifttt.com/mcp` |
| [incident.io](plugins/incident-io) | incident.io integration to see and manage everything in incident.io | OAuth | `https://mcp.incident.io/mcp` |
| [Infobip](plugins/infobip) | Infobip MCP Servers let you build AI agents to interact with the Infobip platform through the Model Context Protocol (MCP). | OAuth | `https://mcp.infobip.com/sms` |
| [Inkbox](plugins/inkbox) | Give Reason an Inkbox identity for email, SMS, iMessage, voice calls, contacts, notes, and agent-to-agent tasks. | OAuth | `https://inkbox.ai/mcp/cursor` |
| [Interactive Brokers](plugins/interactive-brokers) | Review positions, balances, P&L, and draft trade instructions. | OAuth | `https://api.ibkr.com/v1/api/mcp-public` |
| [invideo](plugins/invideo) | Make videos with invideo: generate media, edit timelines, and export. | OAuth | `https://mcp.invideo.io/mcp` |
| [Jam](plugins/jam) | Access Jam bug reports, recordings, console/network context, and repro steps. | OAuth | `https://mcp.jam.dev/mcp` |
| [Jira](plugins/jira) | Read Jira issues, projects, statuses, users, and comments through Atlassian's hosted MCP server. | OAuth | `https://mcp.atlassian.com/v1/mcp` |
| [Jotform](plugins/jotform) | Create and edit forms, then read submissions. | OAuth | `https://mcp.jotform.com` |
| [Juicebox](plugins/juicebox) | Query recruiting analytics, shortlists, and sourcing agents. | OAuth | `https://mcp.juicebox.ai/v1` |
| [Kapa](plugins/kapa) | Connect your docs, tickets, wikis and 20+ other sources. | OAuth | `https://mcp.kapa.ai/mcp` |
| [Kernel](plugins/kernel) | Launch Chromium browsers, execute Playwright code, and automate web interactions through Kernel's hosted MCP server. | OAuth | `https://mcp.onkernel.com/mcp` |
| [Kit](plugins/kit) | Manage subscribers, draft broadcasts, and analyze your audience. | OAuth | `https://app.kit.com/mcp` |
| [Klaviyo](plugins/klaviyo) | Manage profiles, segments, campaigns, and flows. | OAuth | `https://mcp.klaviyo.com/mcp` |
| [Knock](plugins/knock) | Notify users across email, in-app, and more | OAuth | `https://mcp.knock.app/mcp` |
| [Kody](plugins/kody) | Personal assistant MCP server with search, execute, packages, jobs, secrets, and integrations. | OAuth | `https://kody.codes/mcp` |
| [Kong Konnect](plugins/kong-konnect) | Kong Konnect skills and the hosted Konnect MCP server for managing AI and API gateways from Reason. | OAuth | `https://global.mcp.konghq.com/` |
| [Kpler](plugins/kpler) | Kpler integration to explore maritime and commodities intelligence | OAuth | `https://claude.mcp.kpler.com/v1/mcp/` |
| [Krea](plugins/krea) | Generate, edit, enhance, and produce images and videos with Krea's creative AI suite. | OAuth | `https://api.krea.ai/mcp` |
| [Landbase](plugins/landbase-agent-plugins) | Build, enrich, and qualify B2B prospect lists of companies and people from natural-language searches. | OAuth | `https://mcp.landbase.com/mcp` |
| [Lark](plugins/lark) | Search, create, and update Lark Suite docs, and read Lark messages and groups. | OAuth | `https://mcp.larksuite.com/mcp` |
| [LaunchDarkly](plugins/launchdarkly) | Manage LaunchDarkly feature flags: list, create, update, and delete flags, check flag status across environments, manage AI Configs, and inspect code references and audit log entries | OAuth | `https://mcp.launchdarkly.com/mcp/launchdarkly` |
| [Lightrun](plugins/lightrun-ai) | Lightrun live-runtime debugging skills with deterministic preflight and evidence-first diagnosis. | OAuth | `https://app.lightrun.com/mcp` |
| [Linear](plugins/linear) | Read Linear issues, projects, cycles, comments, and team metadata from Linear's hosted MCP server. | OAuth | `https://mcp.linear.app/mcp` |
| [Liquid](plugins/co-invest) | Research markets, review your Liquid portfolio, and place trades you authorize without leaving Reason. | OAuth | `https://coinvest-computer.liquid.trade/mcp` |
| [Listen Labs](plugins/listen-labs) | Connect Reason to Listen Labs. | OAuth | `https://mcp.listenlabs.ai/mcp` |
| [LogRocket](plugins/logrocket) | LogRocket's hosted MCP server: query session replays, metrics, issues and user behavior in natural language. | OAuth | `https://mcp.logrocket.com/mcp?toolsets=all` |
| [Lovable](plugins/lovable) | Lovable's hosted MCP server: build, iterate on, deploy and manage Lovable apps and their databases. | OAuth | `https://mcp.lovable.dev` |
| [Lucid](plugins/lucid) | Ideate, diagram, and align teams by connecting Reason to Lucid. | OAuth | `https://mcp.lucid.app/mcp` |
| [LunarCrush](plugins/lunarcrush) | LunarCrush integration to add real-time social media data to your searches | OAuth | `https://lunarcrush.ai/mcp` |
| [Macaly Cloud](plugins/macaly-code) | Build and host real web apps on Macaly straight from your agent. | OAuth | `https://www.macaly.com/api/cloud/mcp` |
| [Magic Patterns](plugins/magic-patterns) | Use Magic Patterns (magicpatterns.com) from Reason: prototype ideas, generate UI inspiration, upload local UI, and integrate Magic Patterns designs into your codebase. | OAuth | `https://mcp.magicpatterns.com/mcp` |
| [MagicPath](plugins/magicpath) | Design and build interactive UI on a shared canvas. | OAuth | `https://api.magicpath.ai/mcp` |
| [MailerLite](plugins/mailerlite) | Manage subscribers, groups, campaigns, and automations. | OAuth | `https://mcp.mailerlite.com/mcp` |
| [Mainframe](plugins/mainframe) | Create and share short video updates from agent work. | OAuth | `https://mcp.mainframe.app/mcp` |
| [Make](plugins/make) | Turn recurring work you spot in Reason into Make automations and AI Agents that keep running in the cloud. | OAuth | `https://mcp.make.com/cursor` |
| [Manufact](plugins/manufact) | Build, test, and deploy MCP servers and apps with mcp-use and Manufact. | OAuth | `https://mcp.manufact.com/mcp` |
| [Mapbox](plugins/mapbox) | Mapbox's hosted MCP server: geocoding, directions, isochrones, POI search and other geospatial tools for building location-aware applications. | OAuth | `https://mcp.mapbox.com/mcp` |
| [Mapbox DevKit](plugins/mapbox-devkit) | Mapbox's hosted DevKit MCP server: manage styles, tilesets, fonts, datasets and tokens in your Mapbox account. | OAuth | `https://mcp-devkit.mapbox.com/mcp` |
| [Mapbox Docs](plugins/mapbox-docs) | Mapbox's hosted documentation MCP server: search Mapbox API, SDK and style documentation. | None | `https://mcp-docs.mapbox.com/mcp` |
| [Meltwater](plugins/meltwater) | Search media and social mentions and pull analytics. | OAuth | `https://api.meltwater.com/v2/mcp` |
| [Mem](plugins/mem) | Capture, search, and organize notes and collections. | OAuth | `https://mcp.mem.ai/mcp` |
| [Mem0](plugins/mem0) | Mem0 memory layer for AI applications. | OAuth | `https://mcp.mem0.ai/mcp/` |
| [Mercury](plugins/mercury) | Read balances, transactions, statements, and cards. | OAuth | `https://mcp.mercury.com/mcp` |
| [Meticulous](plugins/meticulous) | Meticulous integration to inspect test runs, replay diffs, and coverage for frontend changes | OAuth | `https://app.meticulous.ai/api/mcp` |
| [Microsoft Learn](plugins/microsoft-learn) | Microsoft Learn integration to search trusted Microsoft documentation | None | `https://learn.microsoft.com/api/mcp` |
| [Migma](plugins/migma) | Run your entire email marketing from Reason and Reason. | OAuth | `https://migma.ai/mcp` |
| [Mintlify](plugins/mintlify) | Mintlify integration to search, read, and edit your documentation | OAuth | `https://mcp.mintlify.com` |
| [Mintlify Index](plugins/mintlify-index) | Mintlify Index integration to search publisher-maintained docs across all Mintlify sites | None | `https://index.mintlify.com` |
| [Miro](plugins/miro) | Miro integration to build boards, visualize ideas, and act on feedback | OAuth | `https://mcp.miro.com/` |
| [Mixpanel](plugins/mixpanel) | Mixpanel integration to analyze, query, and manage your product analytics data | OAuth | `https://mcp.mixpanel.com/mcp` |
| [Mobbin](plugins/mobbin) | Reference real mobile and web app design patterns from Mobbin's screen library. Requires a paid Mobbin plan. | OAuth | `https://api.mobbin.com/mcp` |
| [Modem](plugins/modem) | The developer CRM, connected to Reason. | OAuth | `https://mcp.modem.dev/mcp` |
| [Monaco](plugins/agent-plugins) | Use Monaco through its hosted MCP server. | OAuth | `https://mcp.monaco.com/mcp` |
| [monday.com](plugins/monday) | monday.com integration to manage boards, items, and work-management workflows | OAuth | `https://mcp.monday.com/mcp` |
| [MongoDB Atlas](plugins/mongodb-atlas) | Connect to MongoDB Atlas clusters via the Atlas Managed MCP Server to explore data, manage resources, and generate best-practice code | OAuth | `https://mcp.mongodb.com` |
| [Monid](plugins/monid) | Discover and run hundreds of data endpoints — web scraping, people/company enrichment, social media, and search — through one interface. | OAuth | `https://mcp.monid.ai/v1` |
| [Monte Carlo](plugins/monte-carlo) | Monte Carlo integration for data and AI observability | OAuth | `https://integrations.getmontecarlo.com/mcp` |
| [MotherDuck](plugins/motherduck) | MotherDuck integration to get answers from your data with DuckDB | OAuth | `https://api.motherduck.com/mcp` |
| [Motion Creative Analytics](plugins/motion) | Motion integration to analyze ad creative and competitor ad libraries | OAuth | `https://projects.motionapp.com/mcp` |
| [Mural](plugins/mural) | Create, read, and edit Mural boards from your agent. | OAuth | `https://mcp-canvas.mural.co/mcp` |
| [Mux](plugins/mux) | Connect to Mux for video, livestreams, and Mux data. | OAuth | `https://mcp.mux.com` |
| [Natural](plugins/natural) | Send and request money, manage agents, and check balances on Natural. | OAuth | `https://mcp.natural.com` |
| [Navan](plugins/navan) | Query expenses, travel bookings, policies, and cards. | OAuth | `https://mcp.navan.com/mcp` |
| [Neon](plugins/neon) | Inspect Neon projects, branches, databases, and run SQL through Neon's hosted MCP server. | OAuth | `https://mcp.neon.tech/mcp` |
| [Netlify](plugins/netlify) | Inspect Netlify sites, deploys, forms, and environment state through Netlify's hosted MCP server. | OAuth | `https://netlify-mcp.netlify.app/mcp` |
| [Nitrosend](plugins/nitrosend) | AI-native email. Compose newsletters, build automation flows, manage contacts, run agent inboxes, and send campaigns — all from Reason. | OAuth | `https://api.nitrosend.com/mcp` |
| [Notion](plugins/notion) | Search, read, and update Notion pages and databases through Notion's hosted MCP server. | OAuth | `https://mcp.notion.com/mcp` |
| [Omneky](plugins/omneky) | Paid-media MCP for Meta/Facebook, Google PMax/Demand Gen, TikTok, LinkedIn & Reddit — launch campaigns, generate creatives, manage brand catalogue, report ROAS/CTR. | OAuth | `https://mcp.omneky.com/grok` |
| [Omni Analytics](plugins/omni-analytics) | Omni integration to query your data using natural language | OAuth | `https://callbacks.omniapp.co/callback/mcp` |
| [OneSignal](plugins/onesignal) | Connect Reason to OneSignal through the OneSignal MCP server. | OAuth | `https://api.onesignal.com/mcp/oauth` |
| [Opsera](plugins/opsera-devsecops) | Opsera DevSecOps Agent — AI-powered architecture analysis, security scanning, compliance auditing, and SQL security for your codebase. | OAuth | `https://agent.opsera.ai/mcp` |
| [OpusClip](plugins/opusclip) | Turn long videos into AI-curated short clips: caption, reframe, thumbnail, schedule, and publish. | OAuth | `https://mcp.opus.pro/mcp` |
| [Orion by Gravity](plugins/orion) | Orion by Gravity integration to get insights from an autonomous AI analyst | OAuth | `https://g.runorion.com/mcp` |
| [Orthogonal](plugins/orthogonal) | Connect agents to 800+ tool and data endpoints from 50+ verified providers through Orthogonal's hosted MCP server. | OAuth | `https://mcp.orthogonal.com` |
| [Otter.ai](plugins/otter) | Search meeting history and pull full transcripts. | OAuth | `https://mcp.otter.ai/mcp` |
| [Outreach](plugins/outreach) | Search sequences, prospects, and Kaia meetings. | OAuth | `https://api.outreach.io/mcp` |
| [ParadeDB](plugins/paradedb) | ParadeDB adds Elastic-quality full-text search, vector retrieval, and aggregations to Postgres, with no second system to deploy and nothing to sync. | None | `https://docs.paradedb.com/mcp` |
| [Pascal](plugins/pascal-agent-skills) | Create, inspect, validate, and assess furniture layouts with bounded next actions in Pascal through MCP. | OAuth | `https://editor.pascal.app/api/mcp` |
| [PayBox](plugins/paybox-plugin) | Swap and transfer tokens across chains, pay x402 services, take positions on prediction markets, and issue merchant-scoped virtual cards with PayBox custodial wallets. | OAuth | `https://api.paybox.sh/mcp` |
| [PayPal](plugins/paypal) | Manage PayPal commerce operations; handle disputes; issue and send invoices; create orders, captures, and refunds; list transactions; track shipments; and manage subscriptions. | OAuth | `https://mcp.paypal.com/mcp` |
| [Peec AI](plugins/peec-ai) | Peec AI integration to analyze your brand's visibility across LLMs | OAuth | `https://api.peec.ai/mcp` |
| [Pendo](plugins/pendo) | Pendo integration for product and user insights | OAuth | `https://app.pendo.io/mcp/v0/shttp` |
| [Perspective AI](plugins/perspective-ai) | An AI Concierge replaces static forms with adaptive AI conversations that understand real situations, structure key information automatically, and trigger the right next step. | OAuth | `https://getperspective.ai/mcp` |
| [pg-aiguide](plugins/pg-aiguide) | pg-aiguide integration to search Postgres and Tiger docs and learn database skills | None | `https://mcp.tigerdata.com/docs` |
| [Phantom](plugins/phantom-connect) | Give your agent a wallet. | None | `https://docs.phantom.com/mcp` |
| [Phoenix by HG Insights](plugins/phoenix) | Phoenix by HG Insights integration for B2B data intelligence and analytics | OAuth | `https://phoenix.hginsights.com/api/ai/mcp` |
| [Pi Security](plugins/pi-security) | Use Pi Security in Reason IDE to investigate findings, review security posture, plan remediation, and get guidance while you build. | OAuth | `https://mcp.pi.security/mcp` |
| [PicsArt](plugins/picsart) | Picsart generative-AI skills for Reason. | None | `https://mcp.picsart.io/v1` |
| [Plain](plugins/plain) | Manage support threads, customers, and help articles. | OAuth | `https://mcp.plain.com/mcp` |
| [PlanetScale](plugins/planetscale) | Access PlanetScale databases, insights, and schema recommendations through PlanetScale's hosted MCP server. | OAuth | `https://mcp.pscale.dev/mcp/planetscale` |
| [Plaud](plugins/plaud) | Work with your Plaud recordings: list and search meetings and voice notes, read full transcripts with speaker labels, and pull AI summaries, action items, and key topics into your workflow. | OAuth | `https://mcp.plaud.ai/mcp` |
| [Port](plugins/port) | Connect to Port's agentic SDLC platform in natural language: query the Context Lake, orchestrate workflows, manage agents, and enforce governance. | OAuth | `https://mcp.port.io/v1` |
| [PostHog](plugins/posthog) | Query PostHog product analytics: events, insights, and feature flags. | OAuth | `https://mcp.posthog.com/mcp` |
| [Postman](plugins/postman) | Postman integration to give API context to your coding agents | OAuth | `https://mcp.postman.com/minimal` |
| [Prisma](plugins/prisma) | Manage Prisma Postgres databases; create, list, and restore backups; generate and revoke connection strings; execute SQL queries and introspect schemas. | OAuth | `https://mcp.prisma.io/mcp` |
| [Profound](plugins/profound) | Track AI visibility, sentiment, and citations. | OAuth | `https://mcp.tryprofound.com/mcp` |
| [PubNub](plugins/pubnub-realtime-development) | Build production-ready realtime apps with PubNub. | OAuth | `https://mcp.pubnub.com` |
| [Pylon](plugins/pylon) | Access and manage Pylon customer accounts, issues, and support data through Pylon's hosted MCP server. | OAuth | `https://mcp.usepylon.com` |
| [QRStuff](plugins/qrstuff) | Generate and manage QR codes. | OAuth | `https://mcp.qrstuff.ai/mcp` |
| [Qt Docs](plugins/qt-docs) | Qt Group's hosted documentation MCP server: search Qt C++ and QML documentation. | None | `https://qt-docs-mcp.qt.io/mcp` |
| [QuickBooks Online](plugins/quickbooks-online) | Read invoices, bills, expenses, customers, accounts, and financial reports. | OAuth | `https://mcp-e2e.quickbooks.intuit.com/mcp` |
| [QuickNode](plugins/quicknode) | QuickNode integration to manage your blockchain infrastructure | OAuth | `https://mcp.quicknode.com/mcp` |
| [QuiverAI](plugins/quiverai) | Generate, vectorize, animate, and edit SVG assets with Arrow 2. | OAuth | `https://app.quiver.ai/mcp` |
| [Quo](plugins/quo) | Give your agent a phone number. | OAuth | `https://mcp.quo.com/mcp` |
| [Railway](plugins/railway) | Inspect Railway projects, services, deployments, and environment state through Railway's hosted MCP server. | OAuth | `https://mcp.railway.com` |
| [Raindrop](plugins/raindrop-ai) | Raindrop observability platform for AI agents — investigate issues, search events, inspect traces, and quantify signals through natural language | OAuth | `https://mcp.raindrop.ai/mcp` |
| [Raisely](plugins/raisely) | Connect Reason to Raisely. | OAuth | `https://mcp.raisely.com/mcp` |
| [Ramp](plugins/ramp) | Ramp integration to access corporate cards, transactions, and spend data | OAuth | `https://mcp.ramp.com/mcp` |
| [Razorpay](plugins/razorpay) | Razorpay's official hosted MCP server. | OAuth | `https://mcp.razorpay.com/mcp` |
| [Razorpay ACE Marketplace](plugins/razorpay-ace-marketplace) | Shop across Indian D2C brands. | None | `https://merchants.agent.razorpay.com/mcp` |
| [Read AI](plugins/read-ai) | Connect Reason to Read AI meeting intelligence — list meetings, fetch transcripts and reports, create meeting agents, and share reports via the hosted MCP at api.read.ai. | OAuth | `https://api.read.ai/mcp` |
| [ReadMe](plugins/readme) | Search, read, and update your ReadMe docs, API reference, and changelog. | None | `https://docs.readme.com/mcp` |
| [Readwise](plugins/readwise) | Search highlights and Reader documents, save articles. | OAuth | `https://mcp2.readwise.io/mcp` |
| [Refero](plugins/refero) | Research real product interfaces and design with evidence from Refero. | OAuth | `https://api.refero.design/mcp` |
| [Replit](plugins/replit) | Build, update, and publish Replit apps. | OAuth | `https://mcp.replit.com/server/mcp` |
| [Resend](plugins/resend) | Manage email, contacts, templates, and delivery logs. | OAuth | `https://mcp.resend.com/mcp` |
| [Resolve AI](plugins/resolve-ai) | Use Resolve for investigations, incidents, and production context. | OAuth | `https://app0.resolve.ai/mcp/v2` |
| [Restream](plugins/restream) | Live-code to an audience from Reason: stream to social, a webinar page, or Slack, record only, or let AI clip the highlights. | OAuth | `https://mcp.restream.io/mcp` |
| [RevenueCat](plugins/revenuecat) | Configure your RevenueCat integration and access data from your RevenueCat projects. | OAuth | `https://mcp.revenuecat.ai/mcp` |
| [Revyl](plugins/revyl) | Installs the Revyl CLI and signs you in so Reason can run and verify mobile apps on cloud devices. | OAuth | `https://backend.revyl.ai/api/v1/mcp` |
| [Riverside](plugins/riverside) | Connects Reason to Riverside — search recordings by what was said in them, edit video timelines, and publish clips to social platforms. | OAuth | `https://mcp.riverside.com/mcp` |
| [Robinhood](plugins/robinhood) | View portfolios, positions, orders, watchlists, and market data, and trade in a Robinhood Agentic account. | OAuth | `https://agent.robinhood.com/mcp/trading` |
| [Roboflow](plugins/roboflow) | Roboflow computer vision skills and MCP tools for datasets, annotation, training, workflows, inference, and deployment. | OAuth | `https://mcp.roboflow.com/mcp` |
| [Rootly](plugins/rootly) | Rootly integration to investigate and manage incidents, alerts, on-call schedules, and retrospectives | OAuth | `https://mcp.rootly.com/mcp` |
| [Runway](plugins/runway) | Generate images, videos, music, speech, and sound effects with Runway — Gen-4.5, Aleph, Seedance, Kling, GPT Image and more — from Reason and Reason. | OAuth | `https://mcp.runwayml.com/mcp` |
| [Runway Dev](plugins/runway-api) | Get guidance for integrating video, image and audio generation with the Runway API and official SDKs. | OAuth | `https://dev.runwayml.com/mcp` |
| [Ryze AI](plugins/ryze-ai) | Connect Google Ads and Meta Ads, then pull GA4, Search Console, and SEO/GEO/AEO in the same workspace. | OAuth | `https://connector.get-ryze.ai/mcp` |
| [S&P Global](plugins/sp-global) | Query S&P Capital IQ financials, prices, and transcripts. | OAuth | `https://kfinance.kensho.com/integrations/mcp` |
| [Sanity](plugins/sanity) | Sanity integration to create, query, and manage structured content | OAuth | `https://mcp.sanity.io` |
| [Scandit](plugins/scandit-sdk) | AI agent skills for integrating the Scandit Data Capture SDK — product selection, documentation, and implementation guides for barcode scanning, ID capture, and smart label capture. | OAuth | `https://ssl.scandit.com/mcp` |
| [SenseLab](plugins/senselab) | Continual learning for your agents. | OAuth | `https://mcp.sense-lab.ai/mcp` |
| [Sentry](plugins/sentry) | Retrieve detailed Sentry issue data and full stack traces. Also search and filter issues, update issue status, assignments, tags, bookmarks, and alerts. | OAuth | `https://mcp.sentry.dev/mcp` |
| [Shop](plugins/shop) | Shop across millions of stores: find and compare over a billion products, build carts, and check out. | OAuth | `https://mcp.shop.com` |
| [SideShift](plugins/sideshift) | Operate your SideShift company from Reason—manage campaigns, creators, applications, content, contracts, recruiting, messages, payouts, and more through secure OAuth. | OAuth | `https://app.sideshift.app/api/mcp` |
| [Similarweb](plugins/similarweb) | Analyze website traffic, audiences, and competitors. | OAuth | `https://mcp.similarweb.com` |
| [Simmie](plugins/simmie) | Build sales roleplay simulations with scoring rubrics and shareable practice links. | OAuth | `https://mcp.simmie.ai/mcp` |
| [Slides.com](plugins/slides) | Create, edit, preview, and share Slides.com presentations. | OAuth | `https://mcp.slides.com/` |
| [Smartsheet](plugins/smartsheet) | Query and update sheets, rows, and workspaces. | OAuth | `https://mcp.smartsheet.com` |
| [Sonos](plugins/sonos) | Play music and radio from your connected music services, or your Sonos favorites and Sonos playlists. | OAuth | `https://mcp.ws.sonos.com/mcp` |
| [Spacefast](plugins/spacefast) | Turn an idea into a website, dashboard, report, or small web tool you can share. | OAuth | `https://mcp.spacefast.com` |
| [Speko](plugins/speko) | Transcribe audio, synthesize speech, and place real phone calls through one Speko account. | OAuth | `https://mcp.speko.ai/mcp` |
| [Spotify Confidence Docs](plugins/confidence-docs) | Spotify Confidence's hosted documentation MCP server: search Confidence feature-flag, experimentation and SDK docs. | OAuth | `https://mcp.confidence.dev/mcp/docs` |
| [Statsig](plugins/statsig) | Inspect and manage feature gates, experiments, dynamic configs, and metrics. | OAuth | `https://api.statsig.com/v1/mcp` |
| [Streak](plugins/streak) | Search and manage Streak CRM pipelines, deals, contacts, organizations, tasks, and timeline activity. | OAuth | `https://api.streak.com/mcp` |
| [Streamline Icons](plugins/streamline-icons) | Insert PNG and SVG icons, illustrations, elements and emojis from Streamline, plus open-source sets like Lucide, Heroicons, Phosphor and Font Awesome. | OAuth | `https://public-api.streamlinehq.com/mcp` |
| [Stripe](plugins/stripe) | Look up Stripe customers, subscriptions, invoices, charges, and products through Stripe's hosted MCP server. | OAuth | `https://mcp.stripe.com` |
| [Strix](plugins/strix) | Ship with confidence that what you deploy is secure. Strix runs AI penetration tests and PR security reviews against your web apps, APIs, and repositories, so Devin can find, fix, and verify vulnerabilities before they reach production. List scans and open vulnerabilities by severity, pull a finding's evidence and remediation steps into a code fix, update its status, retest it, or export it to Jira or Linear. Start scans and schedules against verified assets and check supply-chain findings and analytics. Read-only tools have no side effects. Scans spend credits and send traffic to your targets. | OAuth | `https://app.strix.ai/mcp` |
| [Stytch](plugins/stytch) | Stytch integration to manage your Stytch project | OAuth | `https://mcp.stytch.dev/mcp` |
| [Subtext](plugins/subtext) | Review Subtext session recordings and manage privacy rules | OAuth | `https://api.fullstory.com/mcp/subtext` |
| [Supabase](plugins/supabase) | Connect a Supabase account: inspect projects, run SQL, read logs, and search docs through Supabase's hosted MCP server. | OAuth | `https://mcp.supabase.com/mcp` |
| [Superhuman Mail](plugins/mcp-mail) | Use Superhuman Mail through its hosted MCP server. | OAuth | `https://mcp.mail.superhuman.com/mcp` |
| [SuperMe](plugins/superme) | Ask people who've been there, get multiple perspectives, and make better decisions about your work. | OAuth | `https://mcp.superme.ai` |
| [Supermemory](plugins/supermemory) | Store, search, and recall long-term memory and context through Supermemory's hosted MCP server. | OAuth | `https://mcp.supermemory.ai/mcp` |
| [Supermetrics](plugins/supermetrics) | Supermetrics integration to access 200+ marketing data sources | OAuth | `https://mcp.supermetrics.com/mcp` |
| [Swagger](plugins/swagger) | Swagger integration to build, govern, and document APIs | OAuth | `https://swagger.mcp.smartbear.com/mcp` |
| [Switchbooks](plugins/switchbooks) | Categorize and post transactions. | OAuth | `https://app.switchbooks.ai/api/mcp` |
| [Synthflow Docs](plugins/synthflow-docs) | Synthflow's hosted documentation MCP server: search the Synthflow AI voice-agent platform docs. | None | `https://docs.synthflow.ai/_mcp/server` |
| [Tavily](plugins/tavily) | Real-time web search, extract, map, and crawl tools powered by Tavily's hosted MCP server. | OAuth | `https://mcp.tavily.com/mcp` |
| [ThoughtSpot](plugins/spottercode) | ThoughtSpot developer documentation — search Visual Embed SDK, REST API v2, and developer guides through MCP-compatible clients. | OAuth | `https://spottercode.thoughtspot.app/mcp` |
| [TierZero](plugins/tierzero) | Agentic production engineering for SWE, SRE and DevOps. | OAuth | `https://api.tierzero.ai/mcp/` |
| [TikTok for Business](plugins/tiktok-for-business) | Manage TikTok ad campaigns, ad groups, ads, audiences, creatives, and reports. | OAuth | `https://business-api.tiktok.com/open_mcp/tt-ads-mcp-layer` |
| [TinyFish](plugins/tinyfish) | Run TinyFish web agents to navigate, click, and extract from any site. | OAuth | `https://agent.tinyfish.ai/mcp` |
| [tldraw](plugins/tldraw) | Draw and visually collaborate with your agents inside Reason | None | `https://tldraw-mcp-app.tldraw.workers.dev/mcp` |
| [Todoist](plugins/todoist) | Create, find, and complete tasks and projects. | OAuth | `https://ai.todoist.net/mcp` |
| [Token Security](plugins/token-security) | Query identities, non-human identities, AI agents, secrets and security findings from Token Security. | OAuth | `https://mcp.app.token.security/mcp` |
| [Treg](plugins/treg) | OpenRouter for tools — 2,896 agent-callable endpoints across 60 providers: SEO and SERP data, backlinks, social and trends, people and company enrichment, ads, scraping. | OAuth | `https://treg.to/mcp/` |
| [Trellis](plugins/trellis) | Trellis integration for trial court litigation research | OAuth | `https://mcp.trellis.law/anthropic` |
| [Trello](plugins/trello) | Manage your Trello workspace from chat: browse and create boards, view and move lists, create, update, move, archive, and complete cards with labels and due dates, manage checklists, capture Inbox… | OAuth | `https://mcp.trello.com/v1` |
| [TubeAlfred](plugins/tubealfred-youtube) | TubeAlfred brings YouTube transcripts, comments and channel data into Reason. | OAuth | `https://mcp.tubealfred.com/` |
| [Tuist](plugins/tuist) | Work with Tuist projects from Reason: migrate Xcode projects to generated workspaces, debug generation, and query builds, test runs, bundles, and cache runs from your Tuist dashboard. | OAuth | `https://tuist.dev/mcp` |
| [Turso](plugins/turso) | Manage Turso Cloud (organizations, databases, groups) and run SQL from Reason via the hosted Turso MCP server — OAuth login, no API token to copy. | OAuth | `https://mcp.turso.ai/mcp` |
| [Twilio Docs](plugins/twilio-docs) | Twilio's hosted documentation MCP server: search Twilio docs and API references for SMS, Voice, WhatsApp, Verify, SendGrid and other products. | None | `https://mcp.twilio.com/docs` |
| [Upstash Redis](plugins/upstash) | The Upstash MCP server plus agent skills for every Upstash SDK and CLI — Redis, QStash, Workflow, Box, Blob, Ratelimit, Vector, and Search. | OAuth | `https://mcp.upstash.com/mcp` |
| [UserTesting](plugins/usertesting) | Bring real customer feedback into Reason — create, launch, and retrieve UserTesting results without leaving your editor. | OAuth | `https://ai.usertesting.com/mcp` |
| [Val Town](plugins/val-town) | Val Town's hosted MCP server: create, read, update and run vals (HTTP handlers, cron jobs, SQLite, email) on the Val Town platform. | OAuth | `https://api.val.town/v3/mcp` |
| [Vanta](plugins/vanta) | Vanta's hosted MCP server: query compliance tests, controls, frameworks, vendors and evidence, and get test-specific remediation guidance for your security and compliance program. | OAuth | `https://mcp.vanta.com/mcp` |
| [Vanta (AUS)](plugins/vanta-aus) | Vanta's hosted MCP server for accounts in the Australia data region: query compliance tests, controls, frameworks, vendors and evidence, and get remediation guidance. | OAuth | `https://mcp.aus.vanta.com/mcp` |
| [Vanta (EU)](plugins/vanta-eu) | Vanta's hosted MCP server for accounts in the EU data region: query compliance tests, controls, frameworks, vendors and evidence, and get remediation guidance. | OAuth | `https://mcp.eu.vanta.com/mcp` |
| [Vantage](plugins/vantage) | Query cloud costs, manage cost reports, budgets, alerts, and recommendations across your Vantage workspace | OAuth | `https://mcp.vantage.sh/mcp` |
| [Vercel](plugins/vercel) | Inspect Vercel deployments, projects, domains, and logs through Vercel's hosted MCP server. | OAuth | `https://mcp.vercel.com` |
| [Vertiso Memory](plugins/vertiso-memory) | Portable, user-owned memory for AI agents through a remote OAuth MCP server. | OAuth | `https://memory.vertiso.ai/mcp` |
| [Vexo](plugins/vexo) | Turn spoken requests into coding tasks executed by Reason, with progress and results returned to Vexo. | OAuth | `https://vexo-backend-uj6z.onrender.com/mcp` |
| [VideoGen](plugins/videogen) | Go from text to video, image to video, or script to video, then export an MP4. | OAuth | `https://mcp.videogen.io/mcp?vg_client=codex` |
| [Webflow](plugins/webflow) | Production-ready agent skills for Webflow - CMS management, site auditing, asset optimization, and safe publishing | OAuth | `https://mcp.webflow.com/mcp` |
| [Webull](plugins/webull) | View accounts, positions, orders, watchlists, and market data. | OAuth | `https://api.webull.com/mcp` |
| [Whop](plugins/whop) | Build and run your business end-to-end with Whop. | OAuth | `https://mcp.whop.com/mcp` |
| [Windmill HR](plugins/windmill-hr) | Connect Reason to Windmill for performance reviews, feedback, 1:1s, pulse surveys, and more. | OAuth | `https://mcp.gowindmill.com/mcp` |
| [Windsor.ai](plugins/windsor-ai) | Windsor.ai integration to connect 320+ marketing data sources | OAuth | `https://mcp.windsor.ai/` |
| [Wingspan](plugins/wingspan) | Wingspan's hosted MCP server: look up the contractors you pay through Wingspan, what you owe them and what is holding up a payment, and draft contractor onboarding and payments for review. | OAuth | `https://api.wingspan.app/v3/mcp` |
| [Wispr Flow](plugins/wispr-flow) | Read-only access to Wispr Flow Notetaker meeting summaries, notes, transcripts, tasks, Scratchpad notes and calendar events | OAuth | `https://api.wisprflow.ai/connect/mcp` |
| [Wix](plugins/wix) | Wix's hosted MCP server: manage Wix sites and apps, including site content, business data and CLI-based app development. | OAuth | `https://mcp.wix.com/mcp` |
| [Wolfram](plugins/wolfram) | Wolfram integration to inject precise, real-time computation and knowledge | None | `https://agenttools.wolfram.com/mcp` |
| [Wonder](plugins/wonder) | Create and edit designs with Reason on a canvas where every design is real code. | OAuth | `https://mcp.wonder.so/mcp` |
| [WordPress](plugins/wordpress) | Connect your WordPress site to Reason via the miniOrange MCP gateway. | OAuth | `https://gateway.miniorange.ai/v2/mcp` |
| [WordPress.com](plugins/wordpress-com) | Build, publish, and manage WordPress.com sites directly from Reason. | OAuth | `https://public-api.wordpress.com/wpcom/v2/mcp/v1` |
| [Workable](plugins/workable) | Search candidates, move pipelines, and manage HR records. | OAuth | `https://mcp.workable.com/mcp` |
| [WorkOS](plugins/workos) | Manage WorkOS organizations, AuthKit, SSO, Directory Sync, roles, audit logs, environments, and branding through WorkOS's Management MCP server. | OAuth | `https://mcp.workos.com/mcp` |
| [Wrike](plugins/wrike) | Search projects, create tasks, and post comments. | OAuth | `https://mcp.wrike.com/v2` |
| [Writer](plugins/writer) | Run Writer playbooks, check on runs, and pull deliverables into your current work. | OAuth | `https://api.writer.com/v1/mcp` |
| [X](plugins/x) | Search posts, read timelines, look up users, and read bookmarks. | OAuth | `https://api.x.com/mcp` |
| [X Ads](plugins/x-ads) | Read ad campaigns and advertising performance. | OAuth | `https://ads-api.x.com/mcp` |
| [You.com](plugins/you-com) | You.com's hosted MCP server: web search, research with citations and content extraction via the You.com API. | OAuth | `https://api.you.com/mcp` |
| [You.com Finance](plugins/you-com-finance) | You.com's hosted finance MCP server: financial-market search and data via the You.com API. | OAuth | `https://api.you.com/mcp/finance` |
| [You.com Research](plugins/you-com-research) | You.com's hosted research MCP server: multi-step deep research reports with citations via the You.com API. | OAuth | `https://api.you.com/mcp/research` |
| [Zapier](plugins/zapier) | Connect 9,000+ apps to your AI workflow. | OAuth | `https://mcp.zapier.com/api/v1/connect` |
| [Zernio](plugins/zernio) | Social media API for developers. | OAuth | `https://mcp.zernio.com/mcp` |
| [Zoom](plugins/zoom) | Search meetings, pull transcripts, and work with Zoom Docs. | OAuth | `https://mcp.zoom.us/mcp/zoom/streamable` |
| [ZoomInfo](plugins/zoominfo) | Connect AI agents to ZoomInfo's verified GTM context graph: 100M companies, 300M professional contacts, buyer intent signals, and real-time scoops. | OAuth | `https://mcp.zoominfo.com/mcp` |

## License

[MIT](LICENSE)
