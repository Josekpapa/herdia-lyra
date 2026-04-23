#!/usr/bin/env node
/**
 * Writes src/data/deploy-manifest.json with per-key lastDeploy + revision for /api/hub/surface.
 * Run in CI before `astro build` (see .github/workflows/ci.yml).
 *
 * Keep `GA_KEYS` aligned with `OFFER_OVERRIDES` keys in src/data/serviceCatalog.ts (general_availability SKUs).
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outFile = resolve(root, "src/data/deploy-manifest.json");

const GA_KEYS = [
  "fidelis/ledger",
  "fidelis/vault",
  "tide/ops",
  "tide/concierge",
  "tide/revenue",
  "tide/housekeeping",
  "tide/guestbook",
  "tide/scout",
  "lore/tutor",
  "lore/path",
  "lore/lab",
  "seal/stamp",
  "seal/chain",
];

const revision = (process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "local").slice(0, 12);
const lastDeploy = new Date().toISOString();

const manifest = {};
for (const key of GA_KEYS) {
  manifest[key] = { lastDeploy, revision, url: null };
}

writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
console.log(`Wrote ${Object.keys(manifest).length} keys to ${outFile} (revision ${revision})`);
