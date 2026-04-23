import type { LyraLocale } from "../../i18n/shell";
import type { Agent, Holding } from "../atlas";
import { buildGenericSubAgentCopy } from "./generic";
import { buildBaseSubAgentCopyEs } from "./genericEs";
import { getAgentCopyOverride } from "./agentOverrides";
import { holdingFlavorEs } from "./holdingFlavorEs";
import type { SubAgentCopy } from "./types";

export type { SubAgentCopy, StatItem, Step, PricingTier } from "./types";
export { flagshipPath, flagshipName } from "./types";

/** Rich Matter-pattern copy for live and roadmap (draft) sub-agents — flagships use their own files. */
export function getSubAgentCopy(
  holding: Holding,
  agent: Agent,
  locale: LyraLocale = "en",
): SubAgentCopy {
  if (locale === "es") {
    return { ...buildBaseSubAgentCopyEs(holding, agent), ...holdingFlavorEs(holding, agent) };
  }

  const base = buildGenericSubAgentCopy(holding, agent);
  const extra = getAgentCopyOverride(holding.slug, agent.slug);
  if (!extra || Object.keys(extra).length === 0) return base;
  return { ...base, ...extra };
}
