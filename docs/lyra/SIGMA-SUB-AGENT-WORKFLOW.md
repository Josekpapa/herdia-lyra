# LYRA sub-agents × Sigma Protocol (brownfield)

Use this when **shipping or leveling up** a sub-service landing (Matter pattern: `SubAgentProduct` + interface shell). **Atlas precedence:** `src/data/atlas.ts`, `interfaceBatches.ts`, and Obsidian LYRA notes win on product truth; Sigma supplies **gates, rubrics, and artifact shape**.

## Interface batches (Batch 1 vs 2+)

Canonical table, PRD links, and acceptance rollup: **[INTERFACE-BATCHES.md](./INTERFACE-BATCHES.md)**. Batch membership is generated from **`interfaceBatches.ts`** + **`atlas.ts`** live order — do not rely on memory for Batch 2+ slugs.

## Active dev pointer (code)


| Constant                       | Role                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `ACTIVE_INTERFACE_DEV_BATCH`   | Which batch of 3 agents is “live” for hub work                                             |
| `INTERFACE_DEV_SEQUENCE_INDEX` | Which slot in that batch (0 → 1 → 2) is the **current build focus**                        |
| `getSequenceFocusKey()`        | e.g. `fidelis/intake` — **treat as the default PRD target** when index is 0 and batch is 1 |


After a sub-agent **ships**, bump sequence (or batch) per comments in `interfaceBatches.ts` and the banner in `SubAgentInterfacePanel.astro`.

## Sigma steps → what we actually run

For **existing codebase + new interface/copy depth**, skip blank-slate ideation unless the product story changed.


| Sigma phase              | Typical LYRA use                                         | Artifact (this repo)                                  |
| ------------------------ | -------------------------------------------------------- | ----------------------------------------------------- |
| **0** Environment        | Rarely; run if new machine or Cursor steps drift         | `.cursor/commands/steps/`                             |
| **2** Architecture       | When a sub-agent needs **new data flow** (API, Hub, CRM) | `docs/lyra/architecture/<slug>.md` (add when needed)  |
| **4** Flow tree          | New **screens / states** for the interface shell         | Section in PRD + optional `docs/lyra/flows/<slug>.md` |
| **7** Interface states   | Loading · empty · error · success for **dev shell**      | PRD § States                                          |
| **8** Technical spec     | Contract for `src/pages/api/hub/`*, Gateway, env         | PRD § API / data                                      |
| **10** Feature breakdown | **Whole wave** of sub-agents (optional rollup)           | `docs/lyra/FEATURE-BREAKDOWN-INTERFACE.md` (optional) |
| **11** PRD               | **Per sub-agent** implementation slice                   | `docs/lyra/prds/F*-*.md`                              |
| **Verify**               | Before merge: a11y pass, copy vs `holdingFlavor`, mobile | `step-verify` / checklist in PRD                      |


We do **not** block on upstream `sigma prd-json` unless you install the Sigma CLI; JSON backlogs are optional.

## One sub-agent delivery loop (practical)

1. **Pick target** — `getSequenceFocusKey()` (or explicit slug from `INTERFACE_DEV_BATCHES`).
2. **Open or create PRD** — Batch 1: `F1`–`F3` under `docs/lyra/prds/`; Batch 2: `F4-tide-concierge-interface.md`, `F5-tide-revenue-interface.md`, `F6-tide-housekeeping-interface.md`; later batches follow `F<n>-<holding>-<agent>-interface.md`.
3. **Align copy** — `subAgentCopy/generic.ts`, `holdingFlavor.ts`, `agentOverrides.ts`; keep terminal + steps consistent with the interface component.
4. **Implement** — page `src/pages/<holding>/<agent>.astro`, batch component under `src/components/atlas/interface/…`, preview rows in `interfaceBatches.ts` if Batch 1.
5. **Verify** — rubric at bottom of PRD; update Obsidian `Batch log` / `Build log` when you ship narratively.

## Sigma skills (suggested)

From your Sigma clone → `~/.cursor/skills-cursor/…` as needed:

- `architecture-patterns`, `api-design-principles` — Hub / API shape
- `frontend-design`, `ux-designer` — interface shell polish
- `verification`, `step-verify`, `accessibility-audit` — pre-ship
- `map-codebase` — new contributor orientation

## Related

- **Interface batches:** [INTERFACE-BATCHES.md](./INTERFACE-BATCHES.md)
- **Obsidian (LYRA System vault):** mirror note **`LYRA — system map.md`** (Mermaid stack map + batch routing) — keep in sync when architecture shifts.
- Repo playbook: `AGENTS.md`
- **Commercial + marketplace hooks (all live + draft agents):** `docs/lyra/ECOSYSTEM-SERVICES-MODEL.md` (**Vercel `LYRA_MP_*` table + deploy manifest**), `src/data/serviceCatalog.ts`, `/hub/services`
- Cursor steps: `.cursor/commands/steps/*.md`
- Obsidian: Sigma maps + LYRA System notes