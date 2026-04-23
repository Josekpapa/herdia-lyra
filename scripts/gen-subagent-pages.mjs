/**
 * One-off generator for static sub-agent product pages (Matter pattern).
 * Run: node scripts/gen-subagent-pages.mjs
 *
 * Emits live + roadmap (draft) agents; static routes take precedence over [holding]/[agent].astro.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Live agents with Matter-pattern pages (must match atlas live slugs). */
const LIVE_AGENT_PAGES = [
  ["tide", ["revenue", "ops", "housekeeping", "guestbook", "scout"]],
  ["lore", ["tutor", "path", "lab", "dossier", "desk"]],
  ["fidelis", ["filing", "counsel", "intake", "audit"]],
  ["helios", ["portfolio", "ledger-w", "estate", "family-office", "yield"]],
  ["alder", ["intake", "labs", "cadence", "concierge-m", "atria"]],
  ["mortar", ["blueprint", "permit", "crew", "site", "ledger-c", "punch"]],
  ["lex", ["brief", "clause", "discovery", "calendar-l", "billing"]],
  ["seal", ["stamp", "chain", "witness", "apostille", "registry", "mobile"]],
];

/** Roadmap (draft) agents — one page per draft row in atlas.ts. */
const DRAFT_AGENT_PAGES = [
  ["tide", ["front-desk", "laundry", "fnb"]],
  ["lore", ["admissions", "alumni", "chair"]],
  ["fidelis", ["treaty", "receipt", "risk"]],
  ["helios", ["succession", "philanthropy", "desk"]],
  ["alder", ["telemetry", "mind", "sleep"]],
  ["mortar", ["vendor", "safety", "close"]],
  ["lex", ["conflict", "ip", "court"]],
  ["seal", ["kyc", "archive", "crossborder"]],
];

const ALL_PAGES = [...LIVE_AGENT_PAGES, ...DRAFT_AGENT_PAGES];

const template = (holding, slug) => `---
import SubAgentProduct from "../../components/atlas/SubAgentProduct.astro";
import { getHolding } from "../../data/atlas";
import { getSubAgentCopy } from "../../data/subAgentCopy";
import { resolveLocale } from "../../i18n/locale";

const holding = getHolding("${holding}")!;
const agent = holding.agents.find((a) => a.slug === "${slug}")!;
const locale = resolveLocale(Astro);
const copy = getSubAgentCopy(holding, agent, locale);
---

<SubAgentProduct holding={holding} agent={agent} copy={copy} locale={locale} />
`;

for (const [h, slugs] of ALL_PAGES) {
  for (const s of slugs) {
    const dir = path.join(root, "src/pages", h);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${s}.astro`);
    fs.writeFileSync(file, template(h, s));
    console.log("wrote", path.relative(root, file));
  }
}
