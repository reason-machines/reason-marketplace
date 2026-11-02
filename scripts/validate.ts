// Validates everything the marketplace lists in .reason-plugin/marketplace.json:
// - every Reason (a folder under reasons/, or one pinned to a commit in another public repository): its manifest
//   against schema/reason.schema.json, every folder and file it names, each SKILL.md's frontmatter and the
//   instruction length limit;
// - every plugin (Reason's own under plugins/, third-party ones under external_plugins/ or pinned elsewhere)
//   against schema/plugin.schema.json, plus what Reason can connect for a third-party one;
// - and that no Reason or third-party plugin holds anything private.
// Runs on Node 22.18+ as plain TypeScript (no build step). Usage: npm test [-- --offline]; npm run typecheck
// Listings pinned in other repositories are fetched with git at their commit; --offline skips them.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import { parse as parseYaml } from "yaml";

import { fetchPinned, INDEX_FILE, listedName, type Pinned, type PluginManifest, readIndex, type ReasonManifest } from "./marketplace.ts";

const MAX_INSTRUCTIONS = 16_000;
const PRIVATE_CONTENT: ReadonlyArray<readonly [RegExp, string]> = [
  [/\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|xox[abpr]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,})/, "a credential-shaped value"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "a private key"],
  [/\b(?:localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|[a-z0-9.-]+\.(?:internal|local|corp|lan))\b/i, "a private network address"],
  [/\b(?!(?:www|docs)\.)[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:reasonmachines\.com|ara\.so)\b/i, "a Reason infrastructure host"],
];
const offline = process.argv.includes("--offline");

const problems: string[] = [];
const warnings: string[] = [];
const fail = (file: string, message: string): void => {
  problems.push(`${file}: ${message}`);
};

function read(file: string, checkPrivate = true): string {
  const text = readFileSync(file, "utf8");
  if (checkPrivate) {
    for (const [pattern, what] of PRIVATE_CONTENT) {
      const match = text.match(pattern);
      if (match) fail(file, `contains ${what} ("${match[0].slice(0, 12)}…"); definitions are public, so keep it out`);
    }
  }
  return text;
}

function json<T>(file: string, checkPrivate = true): T | undefined {
  try {
    return JSON.parse(read(file, checkPrivate)) as T;
  } catch (error) {
    fail(file, (error as Error).message);
    return undefined;
  }
}

const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
const compile = (name: string): ValidateFunction => ajv.compile(JSON.parse(readFileSync(join("schema", name), "utf8")));
const validateMarketplace = compile("marketplace.schema.json");
const validateReason = compile("reason.schema.json");
const validatePlugin = compile("plugin.schema.json");
const schemaErrors = (file: string, validate: ValidateFunction): void => (validate.errors ?? []).forEach((error) => fail(file, `${error.instancePath || "/"} ${error.message}`));

/** A listing's folder: here, or fetched at its pinned commit; null offline or when it can't be fetched. */
function folderOf(entry: string | Pinned): string | null {
  if (typeof entry === "string") return entry.slice(2);
  const key = `${entry.source.repo}@${entry.source.commit}`;
  if (offline) {
    warnings.push(`${key}: not fetched (--offline), so "${entry.name}" was not checked`);
    return null;
  }
  try {
    return fetchPinned(entry);
  } catch (error) {
    fail(INDEX_FILE, `"${entry.name}": ${(error as Error).message}`);
    return null;
  }
}

/** Checks one Reason's folder; returns the plugins it names. */
function validateReasonFolder(directory: string, name: string): string[] {
  const manifestFile = join(directory, ".reason-plugin/reason.json");
  if (!existsSync(manifestFile)) { fail(directory, "has no .reason-plugin/reason.json"); return []; }
  const manifest = json<ReasonManifest>(manifestFile);
  if (!manifest) return [];
  if (!validateReason(manifest)) { schemaErrors(manifestFile, validateReason); return []; }
  if (manifest.name !== name) fail(manifestFile, `name "${manifest.name}" must match its listing "${name}"`);
  const instructionsFile = join(directory, "INSTRUCTIONS.md");
  if (!existsSync(instructionsFile)) fail(directory, "has no INSTRUCTIONS.md");
  else {
    const instructions = read(instructionsFile);
    if (!instructions.trim()) fail(instructionsFile, "is empty");
    if (instructions.length > MAX_INSTRUCTIONS) fail(instructionsFile, `is ${instructions.length} characters; the limit is ${MAX_INSTRUCTIONS}`);
  }
  if (new Set(manifest.skills).size !== manifest.skills.length) fail(manifestFile, "skills lists a folder twice");
  const skillsDirectory = join(directory, "skills");
  const skillFolders = existsSync(skillsDirectory) ? readdirSync(skillsDirectory) : [];
  for (const skill of skillFolders) if (!manifest.skills.includes(skill)) fail(join(skillsDirectory, skill), "is not listed in reason.json skills");
  for (const skill of manifest.skills) {
    const skillFile = join(skillsDirectory, skill, "SKILL.md");
    if (!existsSync(skillFile)) { fail(manifestFile, `skill "${skill}" has no ${skillFile}`); continue; }
    const content = read(skillFile);
    const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
    let meta: { name?: unknown; description?: unknown } | undefined;
    try { meta = frontmatter ? parseYaml(frontmatter[1]!) : undefined; } catch (error) { fail(skillFile, `frontmatter is not YAML: ${(error as Error).message}`); continue; }
    if (typeof meta?.name !== "string" || !meta.name.trim()) fail(skillFile, "frontmatter needs a name");
    if (typeof meta?.description !== "string" || !meta.description.trim()) fail(skillFile, "frontmatter needs a description");
    if (frontmatter && !content.slice(frontmatter[0].length).trim()) fail(skillFile, "the playbook is empty");
  }
  return manifest.plugins;
}

function validatePluginFolder(directory: string, name: string, thirdParty: boolean): void {
  const manifestFile = join(directory, ".reason-plugin/plugin.json");
  if (!existsSync(manifestFile)) { fail(directory, "has no .reason-plugin/plugin.json"); return; }
  // Reason's own plugins are generated from the product's catalog; third-party ones get the private-content check.
  const manifest = json<PluginManifest>(manifestFile, thirdParty);
  if (!manifest) return;
  if (!validatePlugin(manifest)) { schemaErrors(manifestFile, validatePlugin); return; }
  if (manifest.name !== name) fail(manifestFile, `name "${manifest.name}" must match its listing "${name}"`);
  if (!thirdParty) return;
  // What Reason connects without a partner agreement: a hosted server you sign in to with OAuth, or a public one.
  if (manifest.auth === "api_key") fail(manifestFile, "third-party plugins use auth oauth or none; Reason has no setup copy for their API keys");
  for (const [server, config] of Object.entries(manifest.mcpServers)) {
    if (config.headers && Object.keys(config.headers).length) fail(manifestFile, `mcpServers.${server} sets headers; Reason adds the sign-in header itself`);
  }
  if (manifest.logo && !manifest.logo.startsWith("https://") && !existsSync(join(directory, manifest.logo))) fail(manifestFile, `logo "${manifest.logo}" is neither an https URL nor a file next to it`);
}

const subfolders = (directory: string): string[] =>
  existsSync(directory) ? readdirSync(directory).filter((name) => statSync(join(directory, name)).isDirectory()) : [];

const index = readIndex();
if (!validateMarketplace(index)) schemaErrors(INDEX_FILE, validateMarketplace);
const reasonNames = index.reasons.map(listedName);
for (const name of reasonNames) if (reasonNames.indexOf(name) !== reasonNames.lastIndexOf(name)) fail(INDEX_FILE, `lists the Reason "${name}" twice`);
for (const name of index.featured) if (!reasonNames.includes(name)) fail(INDEX_FILE, `featured "${name}" is not one of its reasons`);
for (const name of subfolders("reasons")) if (!index.reasons.includes(`./reasons/${name}`)) fail(join("reasons", name), `is not listed in ${INDEX_FILE}`);

const ownPlugins = index.plugins.map(listedName);
const thirdPartyPlugins = index.externalPlugins.map(listedName);
for (const name of thirdPartyPlugins) {
  if (ownPlugins.includes(name)) fail(INDEX_FILE, `third-party plugin "${name}" has the name of one of Reason's own plugins`);
  if (thirdPartyPlugins.indexOf(name) !== thirdPartyPlugins.lastIndexOf(name)) fail(INDEX_FILE, `lists the plugin "${name}" twice`);
}
for (const name of subfolders("external_plugins")) if (!index.externalPlugins.includes(`./external_plugins/${name}`)) fail(join("external_plugins", name), `is not listed in ${INDEX_FILE}`);

for (const name of ownPlugins) validatePluginFolder(join("plugins", name), name, false);
for (const entry of index.externalPlugins) {
  const directory = folderOf(entry);
  if (directory) validatePluginFolder(directory, listedName(entry), true);
}

const connectable = new Set([...ownPlugins, ...thirdPartyPlugins]);
for (const entry of index.reasons) {
  const directory = folderOf(entry);
  if (!directory) continue;
  for (const plugin of validateReasonFolder(directory, listedName(entry))) {
    // A plugin whose provider paused sign-ins drops out of plugins/ for a while; the Reason works without it meanwhile.
    if (!connectable.has(plugin)) warnings.push(`${directory}: plugin "${plugin}" is not listed (not connectable right now)`);
  }
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (problems.length) {
  console.error(`${problems.length} problem${problems.length === 1 ? "" : "s"}:\n${problems.map((line) => `  ${line}`).join("\n")}`);
  process.exit(1);
}
console.log(`${reasonNames.length} Reasons, ${ownPlugins.length} plugins and ${thirdPartyPlugins.length} third-party plugins valid.`);
