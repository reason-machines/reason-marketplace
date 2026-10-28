// Validates every Reason under reasons/: each manifest against its JSON Schema, every folder and file it names, each
// SKILL.md's frontmatter, the instruction length limit, and that no definition holds anything private.
// Runs on Node 22.18+ as plain TypeScript (no build step). Usage: npm test; npm run typecheck

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import { parse as parseYaml } from "yaml";

// The fields this script reads; the JSON Schemas in reasons/schema/ check the rest.
interface Marketplace { reasons?: string[]; featured?: string[] }
interface ReasonManifest { name: string; plugins: string[]; skills: string[] }

const ROOT = "reasons";
const MAX_INSTRUCTIONS = 16_000;
const PRIVATE_CONTENT: ReadonlyArray<readonly [RegExp, string]> = [
  [/\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|xox[abpr]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,})/, "a credential-shaped value"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "a private key"],
  [/\b(?:localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|[a-z0-9.-]+\.(?:internal|local|corp|lan))\b/i, "a private network address"],
  [/\b(?!(?:www|docs)\.)[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:reasonmachines\.com|ara\.so)\b/i, "a Reason infrastructure host"],
];

const problems: string[] = [];
const warnings: string[] = [];
const fail = (file: string, message: string): void => {
  problems.push(`${file}: ${message}`);
};

function read(file: string): string {
  const text = readFileSync(file, "utf8");
  for (const [pattern, what] of PRIVATE_CONTENT) {
    const match = text.match(pattern);
    if (match) fail(file, `contains ${what} ("${match[0].slice(0, 12)}…"); definitions are public, so keep it out`);
  }
  return text;
}

function json<T>(file: string): T | undefined {
  try {
    return JSON.parse(read(file)) as T;
  } catch (error) {
    fail(file, (error as Error).message);
    return undefined;
  }
}

const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
const validateReason = ajv.compile(JSON.parse(readFileSync(join(ROOT, "schema/reason.schema.json"), "utf8")));
const validateMarketplace = ajv.compile(JSON.parse(readFileSync(join(ROOT, "schema/marketplace.schema.json"), "utf8")));
const schemaErrors = (file: string, validate: ValidateFunction): void => (validate.errors ?? []).forEach((error) => fail(file, `${error.instancePath || "/"} ${error.message}`));

const marketplaceFile = join(ROOT, "marketplace.json");
const marketplace = json<Marketplace>(marketplaceFile);
if (marketplace && !validateMarketplace(marketplace)) schemaErrors(marketplaceFile, validateMarketplace);
const listed = (marketplace?.reasons ?? []).map((entry) => entry.replace(/^\.\//, ""));
const folders = readdirSync(ROOT).filter((name) => name !== "schema" && statSync(join(ROOT, name)).isDirectory());
for (const name of folders) if (!listed.includes(name)) fail(join(ROOT, name), "is not listed in marketplace.json");
for (const name of listed) if (listed.indexOf(name) !== listed.lastIndexOf(name)) fail(marketplaceFile, `lists "${name}" twice`);
for (const name of marketplace?.featured ?? []) if (!listed.includes(name)) fail(marketplaceFile, `featured "${name}" is not one of its reasons`);

for (const name of listed) {
  const directory = join(ROOT, name);
  const manifestFile = join(directory, "reason.json");
  if (!existsSync(manifestFile)) { fail(directory, "has no reason.json"); continue; }
  const manifest = json<ReasonManifest>(manifestFile);
  if (!manifest) continue;
  if (!validateReason(manifest)) { schemaErrors(manifestFile, validateReason); continue; }
  if (manifest.name !== name) fail(manifestFile, `name "${manifest.name}" must match its folder "${name}"`);
  for (const plugin of manifest.plugins) {
    // plugins/ lists what can be connected today; a plugin whose provider paused sign-ins drops out of it for a while.
    if (!existsSync(join("plugins", plugin))) warnings.push(`${manifestFile}: plugin "${plugin}" is not in plugins/ (not connectable right now)`);
  }
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
    try { meta = frontmatter ? parseYaml(frontmatter[1]) : undefined; } catch (error) { fail(skillFile, `frontmatter is not YAML: ${(error as Error).message}`); continue; }
    if (typeof meta?.name !== "string" || !meta.name.trim()) fail(skillFile, "frontmatter needs a name");
    if (typeof meta?.description !== "string" || !meta.description.trim()) fail(skillFile, "frontmatter needs a description");
    if (frontmatter && !content.slice(frontmatter[0].length).trim()) fail(skillFile, "the playbook is empty");
  }
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (problems.length) {
  console.error(`${problems.length} problem${problems.length === 1 ? "" : "s"}:\n${problems.map((line) => `  ${line}`).join("\n")}`);
  process.exit(1);
}
console.log(`${listed.length} Reasons valid.`);
