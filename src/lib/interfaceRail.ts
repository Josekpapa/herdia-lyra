import type { SubAgentCopy } from "../data/subAgentCopy/types";

export type RailStepState = "done" | "active" | "next";

/** Parse `01 · Label` steps from landing copy into rail states (Intake, Stamp, etc.). */
export function railStepsFromCopy(
  copy: SubAgentCopy,
  states: RailStepState[],
): { id: string; label: string; state: RailStepState }[] {
  return copy.steps.slice(0, states.length).map((s, i) => {
    const raw = s.label.trim();
    const sep = " · ";
    const idx = raw.indexOf(sep);
    const id = idx >= 0 ? raw.slice(0, idx).trim() : String(i + 1).padStart(2, "0");
    const label = idx >= 0 ? raw.slice(idx + sep.length).trim() : raw;
    return { id, label, state: states[i] ?? "next" };
  });
}
