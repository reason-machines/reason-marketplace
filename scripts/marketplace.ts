// The marketplace index (.reason-plugin/marketplace.json) and the manifest fields the scripts read; the JSON Schemas
// in schema/ check the rest.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const INDEX_FILE = ".reason-plugin/marketplace.json";

/** A listing kept in another public GitHub repository, pinned to one commit. */
export interface Pinned { name: string; source: { repo: string; commit: string; path: string } }

export interface Marketplace {
  featured: string[];
  /** "./reasons/<name>", or pinned elsewhere. */
  reasons: Array<string | Pinned>;
  /** "./plugins/<name>": Reason's own, generated from the product's connector catalog. */
  plugins: string[];
  /** "./external_plugins/<name>", or pinned elsewhere. */
  externalPlugins: Array<string | Pinned>;
}

export interface ReasonManifest { name: string; displayName: string; description: string; categories: string[]; plugins: string[]; skills: string[] }

export interface PluginManifest {
  name: string;
  displayName: string;
  description: string;
  homepage: string;
  logo?: string;
  auth: "oauth" | "api_key" | "none";
  mcpServers: Record<string, { url: string; headers?: Record<string, string> }>;
}

export function readIndex(): Marketplace {
  return JSON.parse(readFileSync(INDEX_FILE, "utf8")) as Marketplace;
}

export const CATEGORY_LABELS: Record<string, string> = {
  engineering: "Engineering", sales: "Sales", marketing: "Marketing", design: "Design", personal: "Personal",
  "recruiting-people": "Recruiting & People", product: "Product", operations: "Operations",
};

/** The name a listing goes by: its folder name, or a pinned entry's name. */
export const listedName = (entry: string | Pinned): string => (typeof entry === "string" ? entry.slice(entry.lastIndexOf("/") + 1) : entry.name);

const checkouts = new Map<string, string>();
/** The folder of a listing pinned in another repository, fetched with git at exactly its commit. Throws when it can't be. */
export function fetchPinned(entry: Pinned): string {
  const key = `${entry.source.repo}@${entry.source.commit}`;
  let checkout = checkouts.get(key);
  if (!checkout) {
    const directory = mkdtempSync(join(tmpdir(), "reason-marketplace-"));
    const git = (...args: string[]) => execFileSync("git", args, { cwd: directory, stdio: ["ignore", "ignore", "pipe"] });
    try {
      git("init", "-q");
      git("fetch", "-q", "--depth", "1", `https://github.com/${entry.source.repo}.git`, entry.source.commit);
      git("checkout", "-q", "FETCH_HEAD");
    } catch (error) {
      throw new Error(`cannot fetch ${key}: ${String((error as { stderr?: Buffer }).stderr ?? error).trim()}`);
    }
    checkouts.set(key, (checkout = directory));
  }
  return join(checkout, entry.source.path);
}
