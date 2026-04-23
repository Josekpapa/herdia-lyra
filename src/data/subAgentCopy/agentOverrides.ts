import type { SubAgentCopy } from "./types";

/**
 * Per-agent copy layered after generic + holdingFlavor. Use for pilots and
 * high-value lanes where a paragraph or terminal line must diverge.
 */
const OVERRIDES: Record<string, Partial<SubAgentCopy>> = {
  "lex/brief": {
    whyP2:
      "Brief ships in Docket's voice — matter context, clause citations, and fee narrative stay attached so partners review once, not twice.",
  },
  "mortar/permit": {
    terminalSub: "Agency windows, conditions, and renewals tied to the project ID Raft already tracks.",
  },
  "helios/yield": {
    whyP2:
      "Yield surfaces where cash actually sits — against policy and distribution constraints — before a distribution becomes a regret.",
  },
};

export function getAgentCopyOverride(holdingSlug: string, agentSlug: string): Partial<SubAgentCopy> | undefined {
  return OVERRIDES[`${holdingSlug}/${agentSlug}`];
}
