/**
 * LYRA service offers — commercial + integration shape for every Atlas agent.
 * Drives Hub console, future marketplace sync, and partner hook planning.
 *
 * Source of truth for *which agents exist* remains `atlas.ts`. This file adds
 * GTM phase, SKU posture, integration targets, and optional marketplace IDs.
 */
import { BUNDLES, HOLDINGS, type Agent, type Holding } from "./atlas";

/** Vectors we sell or certify for partners (expand as Gateway matures). */
export type IntegrationSurface =
  | "rest"
  | "webhook_inbound"
  | "webhook_outbound"
  | "oauth_sso"
  | "mcp_tool"
  | "embed_widget"
  | "event_stream";

/** Where the SKU is in go-to-market (draft agents stay roadmap until promoted). */
export type GtmPhase = "roadmap" | "preview" | "general_availability";

/** How the SKU can be sold relative to bundles. */
export type SkuMode = "none" | "bundle_only" | "standalone" | "both";

export type AgentServiceOffer = {
  /** Stable id: `holdingSlug/agentSlug` */
  key: string;
  holdingSlug: string;
  holdingCode: string;
  holdingName: string;
  vertical: string;
  agentSlug: string;
  agentName: string;
  agentBlurb: string;
  atlasStatus: Agent["status"];
  tier: Agent["tier"];
  /** Public product path */
  path: string;
  gtmPhase: GtmPhase;
  skuMode: SkuMode;
  /** Integration surfaces we target for hooks / marketplace certification */
  integrationTargets: IntegrationSurface[];
  /** Partner / stack taxonomy */
  partnerStackTags: string[];
  /** Bundle slugs from `BUNDLES.includes` that mention this agent or flagship */
  linkedBundleSlugs: string[];
  /**
   * Vercel Marketplace (or other) listing id when published.
   * Convention: set in OFFER_OVERRIDES when a listing exists; until then `null`.
   */
  marketplaceListingId: string | null;
  /**
   * Operator hint: primary region, edge cell, or “pending” — not infra truth yet.
   */
  deploymentHint: string | null;
};

export type OfferOverride = Partial<
  Pick<
    AgentServiceOffer,
    | "gtmPhase"
    | "skuMode"
    | "integrationTargets"
    | "partnerStackTags"
    | "marketplaceListingId"
    | "deploymentHint"
  >
>;

function uniqSort(strings: string[]): string[] {
  return [...new Set(strings.map((s) => s.trim()).filter(Boolean))].sort();
}

function mergeIntegration(a: IntegrationSurface[], b: IntegrationSurface[] | undefined): IntegrationSurface[] {
  if (!b?.length) return [...a];
  return [...new Set([...a, ...b])];
}

function bundlesTouchingAgent(holding: Holding, agent: Agent): string[] {
  const needleNames = new Set<string>([agent.name, holding.name]);
  if (holding.flagship) {
    needleNames.add(holding.flagship.name);
  }
  const slugs: string[] = [];
  for (const b of BUNDLES) {
    const hit = b.includes.some((line) => {
      for (const n of needleNames) {
        if (line.includes(n)) return true;
      }
      return false;
    });
    if (hit) slugs.push(b.slug);
  }
  return slugs;
}

/** Per-holding defaults for partner tags + integration (merged with vertical + blurb heuristics). */
const HOLDING_SERVICE_DEFAULTS: Partial<
  Record<string, { partnerStackTags: string[]; integrationTargets?: IntegrationSurface[] }>
> = {
  tide: {
    partnerStackTags: ["hospitality", "pms_adjacent", "guest_journey"],
    integrationTargets: ["webhook_inbound"],
  },
  lore: {
    partnerStackTags: ["education", "lms_adjacent", "learner_record"],
  },
  fidelis: {
    partnerStackTags: ["advisory", "erp_adjacent", "entity_graph"],
  },
  helios: {
    partnerStackTags: ["wealth", "custodian_adjacent", "family_office"],
  },
  alder: {
    partnerStackTags: ["longevity", "provider_scheduling", "labs_adjacent"],
  },
  mortar: {
    partnerStackTags: ["construction", "field_ops", "draw_schedule"],
  },
  lex: {
    partnerStackTags: ["legaltech", "dms_adjacent", "matter_lifecycle"],
  },
  seal: {
    partnerStackTags: ["notary", "identity", "chain_of_custody"],
    integrationTargets: ["embed_widget"],
  },
};

function defaultIntegrationTargets(status: Agent["status"], vertical: string): IntegrationSurface[] {
  const base: IntegrationSurface[] = ["rest", "webhook_outbound"];
  if (status === "draft") return ["rest"];
  if (/hospitality/i.test(vertical)) return [...base, "oauth_sso", "webhook_inbound"];
  if (/notary|attestation/i.test(vertical)) return [...base, "embed_widget"];
  if (/law|corporate/i.test(vertical)) return [...base, "oauth_sso"];
  return base;
}

function heuristicPartnerTags(agent: Agent): string[] {
  const tags = new Set<string>();
  const b = agent.blurb.toLowerCase();
  if (/guest|sms|whatsapp|email/i.test(b)) tags.add("guest_comms");
  if (/rate|revpar|revenue/i.test(b)) tags.add("revenue_systems");
  if (/ticket|incident|ops/i.test(b)) tags.add("operations");
  if (/vault|document|chain/i.test(b)) tags.add("document_graph");
  if (/stamp|witness|notary/i.test(b)) tags.add("attestation");
  if (/matter|court|billing/i.test(b)) tags.add("legal_ops");
  if (/draw|permit|site/i.test(b)) tags.add("construction");
  return [...tags];
}

function defaultPartnerTags(holding: Holding, agent: Agent): string[] {
  const verticalTag = holding.vertical.split(/·|,/)[0]?.trim() ?? "general";
  const hDef = HOLDING_SERVICE_DEFAULTS[holding.slug];
  return uniqSort([verticalTag, ...(hDef?.partnerStackTags ?? []), ...heuristicPartnerTags(agent)]);
}

function defaultGtmAndSku(status: Agent["status"]): { gtmPhase: GtmPhase; skuMode: SkuMode } {
  if (status === "draft") {
    return { gtmPhase: "roadmap", skuMode: "none" };
  }
  return { gtmPhase: "preview", skuMode: "both" };
}

/**
 * Optional overrides keyed by `holding/agent`.
 * **Marketplace ids:** keep `marketplaceListingId` null in repo; set per-environment via
 * `LYRA_MP_<HOLDING>_<AGENT>` (see `catalogListingEnvVarName`).
 */
export const OFFER_OVERRIDES: Partial<Record<string, OfferOverride>> = {
  "fidelis/ledger": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
  },
  "fidelis/vault": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "mcp_tool"],
  },
  "tide/ops": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
  },
  "tide/concierge": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso"],
  },
  "tide/revenue": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
  },
  "tide/housekeeping": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso"],
  },
  "tide/guestbook": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
  },
  "tide/scout": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
  },
  "lore/tutor": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "mcp_tool"],
  },
  "lore/path": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
  },
  "lore/lab": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "embed_widget"],
  },
  "seal/stamp": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_outbound", "embed_widget", "oauth_sso"],
  },
  "seal/chain": {
    gtmPhase: "general_availability",
    deploymentHint: "vercel:production:iad1",
    integrationTargets: ["rest", "webhook_outbound", "event_stream", "oauth_sso"],
  },
  /** Batch 9 step 1 — foyer funnel; explicit hooks for Hub + integration spec. */
  "alder/atria": {
    deploymentHint: "preview:kairos-foyer · interface-batch-9",
    integrationTargets: ["rest", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["longevity", "onboarding_funnel", "household_identity"],
  },
  /** Batch 9 step 2 — drawing set + RFI rail; explicit hooks for Hub + integration spec. */
  "mortar/blueprint": {
    deploymentHint: "preview:mortar-blueprint · interface-batch-9",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["construction", "drawing_management", "rfi_coordination"],
  },
  /** Batch 9 step 3 — filings + agency queue; explicit hooks for Hub + integration spec. */
  "mortar/permit": {
    deploymentHint: "preview:mortar-permit · interface-batch-9",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["construction", "permit_tracking", "regulatory_filings"],
  },
  /** Batch 10 step 1 — roster + trades/gates rail; explicit hooks for Hub + integration spec. */
  "mortar/crew": {
    deploymentHint: "preview:mortar-crew · interface-batch-10",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["construction", "workforce_roster", "site_safety_gates"],
  },
  /** Batch 10 step 2 — daily pulse + day rail; explicit hooks for Hub + integration spec. */
  "mortar/site": {
    deploymentHint: "preview:mortar-site · interface-batch-10",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["construction", "site_daily_log", "field_photos_delays"],
  },
  /** Batch 10 step 3 — draws + CO/lien rail; explicit hooks for Hub + integration spec. */
  "mortar/ledger-c": {
    deploymentHint: "preview:mortar-ledger-c · interface-batch-10",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["construction", "construction_draws", "lien_waiver_compliance"],
  },
  /** Batch 11 step 1 — close-out + handoff rail; explicit hooks for Hub + integration spec. */
  "mortar/punch": {
    deploymentHint: "preview:mortar-punch · interface-batch-11",
    integrationTargets: ["rest", "webhook_inbound", "webhook_outbound", "oauth_sso", "event_stream"],
    partnerStackTags: ["construction", "closeout_punch", "warranty_handoff"],
  },
};

/** Env var name for marketplace listing id, e.g. `fidelis/ledger` → `LYRA_MP_FIDELIS_LEDGER`. */
export function catalogListingEnvVarName(offerKey: string): string {
  const slug = offerKey
    .replace(/[^a-z0-9]+/gi, "_")
    .toUpperCase()
    .replace(/^_+|_+$/g, "");
  return `LYRA_MP_${slug}`;
}

function marketplaceListingIdFromEnv(offerKey: string): string | undefined {
  const name = catalogListingEnvVarName(offerKey);
  const v = typeof process !== "undefined" ? process.env[name] : undefined;
  if (v == null || !String(v).trim()) return undefined;
  return String(v).trim();
}

function applyEnvMarketplaceIds(offers: AgentServiceOffer[]): AgentServiceOffer[] {
  return offers.map((o) => {
    const fromEnv = marketplaceListingIdFromEnv(o.key);
    if (!fromEnv) return o;
    return { ...o, marketplaceListingId: fromEnv };
  });
}

function buildOffer(holding: Holding, agent: Agent): AgentServiceOffer {
  const key = `${holding.slug}/${agent.slug}`;
  const defaults = defaultGtmAndSku(agent.status);
  const hDef = HOLDING_SERVICE_DEFAULTS[holding.slug];

  let integrationTargets = defaultIntegrationTargets(agent.status, holding.vertical);
  if (agent.status === "live" && hDef?.integrationTargets?.length) {
    integrationTargets = mergeIntegration(integrationTargets, hDef.integrationTargets);
  }

  const partnerStackTags = defaultPartnerTags(holding, agent);

  const base: AgentServiceOffer = {
    key,
    holdingSlug: holding.slug,
    holdingCode: holding.code,
    holdingName: holding.name,
    vertical: holding.vertical,
    agentSlug: agent.slug,
    agentName: agent.name,
    agentBlurb: agent.blurb,
    atlasStatus: agent.status,
    tier: agent.tier,
    path: `/${holding.slug}/${agent.slug}`,
    gtmPhase: defaults.gtmPhase,
    skuMode: defaults.skuMode,
    integrationTargets,
    partnerStackTags,
    linkedBundleSlugs: bundlesTouchingAgent(holding, agent),
    marketplaceListingId: null,
    deploymentHint: null,
  };

  const ov = OFFER_OVERRIDES[key];
  if (!ov) return base;

  return {
    ...base,
    ...ov,
    integrationTargets: ov.integrationTargets ?? base.integrationTargets,
    partnerStackTags: ov.partnerStackTags ?? base.partnerStackTags,
    marketplaceListingId: ov.marketplaceListingId ?? base.marketplaceListingId,
    deploymentHint: ov.deploymentHint ?? base.deploymentHint,
  };
}

/** One commercial row per agent (live + draft). Listing ids may be supplied via `LYRA_MP_*` env vars. */
export function getAgentServiceOffers(): AgentServiceOffer[] {
  const out: AgentServiceOffer[] = [];
  for (const h of HOLDINGS) {
    for (const a of h.agents) {
      out.push(buildOffer(h, a));
    }
  }
  return applyEnvMarketplaceIds(out);
}

export function serviceCatalogStats(offers = getAgentServiceOffers()) {
  const live = offers.filter((o) => o.atlasStatus === "live");
  const draft = offers.filter((o) => o.atlasStatus === "draft");
  const preview = live.filter((o) => o.gtmPhase === "preview");
  const ga = live.filter((o) => o.gtmPhase === "general_availability");
  const sellable = offers.filter((o) => o.skuMode !== "none");
  const marketplaceListed = offers.filter((o) => o.marketplaceListingId != null && o.marketplaceListingId !== "");
  const withDeployHint = offers.filter((o) => o.deploymentHint != null && o.deploymentHint !== "");
  return {
    total: offers.length,
    live: live.length,
    draft: draft.length,
    livePreview: preview.length,
    liveGa: ga.length,
    sellableSkus: sellable.length,
    marketplaceListings: marketplaceListed.length,
    deploymentHints: withDeployHint.length,
  };
}

export function getOffer(key: string): AgentServiceOffer | undefined {
  const k = key.replace(/^\/+|\/+$/g, "").toLowerCase();
  return getAgentServiceOffers().find((o) => o.key === k);
}

/** Keys currently marked `general_availability` (deploy manifest + Hub surface links stay aligned). */
export function getGeneralAvailabilityKeys(): string[] {
  return getAgentServiceOffers()
    .filter((o) => o.gtmPhase === "general_availability")
    .map((o) => o.key)
    .sort();
}
