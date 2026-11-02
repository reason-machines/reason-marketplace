// Rewrites the README's Reason count and its "All Reasons" and "Third-party plugins" tables from the marketplace
// index, so they never drift from what is listed. ("All plugins" is written by the product's catalog sync.)
// Usage: npm run readme (writes README.md); npm run readme -- --check (fails if README.md is out of date)

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { CATEGORY_LABELS, fetchPinned, listedName, type Pinned, type PluginManifest, readIndex, type ReasonManifest } from "./marketplace.ts";

const README = "README.md";
const REASONS_HEADER = "| Reason | What it does | Category | Plugins |";
const THIRD_PARTY_HEADER = "| Plugin | What it does | Auth | MCP server | Source |";

const cell = (value: string): string => value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const folder = (entry: string | Pinned): string => (typeof entry === "string" ? entry.slice(2) : fetchPinned(entry));
const link = (entry: string | Pinned): string =>
  typeof entry === "string" ? entry.slice(2) : `https://github.com/${entry.source.repo}/tree/${entry.source.commit}/${entry.source.path === "." ? "" : entry.source.path}`;
const source = (entry: string | Pinned): string =>
  typeof entry === "string" ? "This repository" : `[${entry.source.repo}@${entry.source.commit.slice(0, 7)}](${link(entry)})`;
const manifest = <T>(entry: string | Pinned, kind: "reason" | "plugin"): T =>
  JSON.parse(readFileSync(join(folder(entry), `.reason-plugin/${kind}.json`), "utf8")) as T;

function replaceTable(lines: string[], header: string, rows: string[]): void {
  const start = lines.indexOf(header);
  if (start < 0) throw new Error(`${README} has no "${header}" table`);
  let end = start + 2;
  while (end < lines.length && lines[end]!.startsWith("|")) end++;
  lines.splice(start + 2, end - start - 2, ...rows);
}

const index = readIndex();
const plugins = new Set(index.plugins.map(listedName));
const thirdParty = new Map(index.externalPlugins.map((entry) => [listedName(entry), entry]));
const pluginLink = (name: string): string => {
  if (plugins.has(name)) return `[${name}](plugins/${name})`;
  const entry = thirdParty.get(name);
  return entry ? `[${name}](${link(entry)})` : name;
};

const current = readFileSync(README, "utf8");
const lines = current.split("\n");
replaceTable(lines, REASONS_HEADER, index.reasons.map((entry) => {
  const reason = manifest<ReasonManifest>(entry, "reason");
  const featured = index.featured.includes(reason.name) ? " (featured)" : "";
  const category = CATEGORY_LABELS[reason.categories[0]!] ?? reason.categories[0]!;
  return `| [${cell(reason.displayName)}](${link(entry)})${featured} | ${cell(reason.description)} | ${category} | ${reason.plugins.map(pluginLink).join(", ") || "None"} |`;
}));
replaceTable(lines, THIRD_PARTY_HEADER, index.externalPlugins.map((entry) => {
  const plugin = manifest<PluginManifest>(entry, "plugin");
  const url = Object.values(plugin.mcpServers)[0]?.url ?? "";
  return `| [${cell(plugin.displayName)}](${link(entry)}) | ${cell(plugin.description)} | ${plugin.auth === "oauth" ? "OAuth" : "None"} | \`${url}\` | ${source(entry)} |`;
}));
const next = lines.join("\n").replace(/\d+ ready-made Reasons/, `${index.reasons.length} ready-made Reasons`);

if (process.argv.includes("--check")) {
  if (next !== current) {
    console.error(`${README} is out of date with .reason-plugin/marketplace.json; run npm run readme and commit it.`);
    process.exit(1);
  }
  console.log(`${README} is up to date.`);
} else {
  writeFileSync(README, next);
}
