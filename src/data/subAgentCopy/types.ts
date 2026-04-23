import type { Holding } from "../atlas";

export type StatItem = { label: string; value: string };
export type Step = { label: string; text: string };
export type PricingTier = {
  name: string;
  price: string;
  note: string;
  recommended?: boolean;
};

/** Rich copy for generated sub-agent product pages (Matter pattern). */
export type SubAgentCopy = {
  heroItalic: string;
  heroLede: string;
  whyTitle: string;
  whyH2: string;
  whyP1: string;
  whyP2: string;
  replaceKicker: string;
  replaceH2: string;
  replaceSub: string;
  before: string[];
  after: string[];
  howH2: string;
  steps: Step[];
  terminalTitle: string;
  terminalSub: string;
  terminalBody: string;
  useH2: string;
  useSub: string;
  useBlocks: { label: string; text: string }[];
  pricingH2: string;
  pricingSub: string;
  tiers: PricingTier[];
  intH2: string;
  intSub: string;
  integrations: string[];
  ctaH2: string;
  ctaBody: string;
  designPartnerLine: string;
  stats: StatItem[];
};

export function flagshipPath(h: Holding): string {
  if (h.slug === "fidelis") return "/fidelis/ledger";
  return h.flagship ? `/${h.slug}/${h.flagship.slug}` : `/${h.slug}`;
}

export function flagshipName(h: Holding): string {
  if (h.slug === "fidelis") return "Ledger";
  return h.flagship?.name ?? h.name;
}

