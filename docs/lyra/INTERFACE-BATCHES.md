# Interface development batches (Atlas × Hub)

**Source of truth in code:** `src/data/interfaceBatches.ts` — `INTERFACE_DEV_BATCHES`, `ACTIVE_INTERFACE_DEV_BATCH`, `INTERFACE_DEV_SEQUENCE_INDEX`, `getSequenceFocusKey()`.

**Current product default:** `ACTIVE_INTERFACE_DEV_BATCH === 9` and `INTERFACE_DEV_SEQUENCE_INDEX === 0` — focus **`alder/atria`** (Batch 9 step 1). Batch 9: **`alder/atria`**, **`mortar/blueprint`**, **`mortar/permit`**. Batches **7–8** ship custom shells in `interface/batch7/` (Yield, Kairos Intake, Protocol) and `interface/batch8/` (Labs, Cadence, Concierge-M). **`PREVIEWS`** for batches **10–11** are in `interfaceBatches.ts` (Raft crew/site/ledger-c; punch + Lex matter/brief). The **`lore`** holding stays **excluded** from batching (`INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS`). **`getDevStepsForBatch()`** drives Hub + panel step chips for any batch ≥ 3.

**GA interface panel:** any **general_availability** live SKU gets a product interface shell via `getInterfacePreviewForProduct()` — rich `PREVIEWS` when the agent is in the active dev batch, otherwise a **synthetic** preview from `serviceCatalog`. The batch rail (steps 1–3) only shows when the page’s agent is **in** the active batch.

Batch **1** is fixed (onboarding · ops floor · stamp queue). Later batches are **remaining live agents** in `atlas.ts` order (minus `INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS`), grouped in threes. If you add or reorder live agents, rerun mental model against that file.

## Batch 1 vs 2 vs 3 (product narrative)

| | **Batch 1** | **Batch 2** | **Batch 3** (computed) |
|---|-------------|-------------|-------------------------|
| **Theme** | Onboarding · ops · stamp | Tide guest + revenue + HK | Guest memory · channel lab · ledger read |
| **Agents** | `fidelis/intake`, `tide/ops`, `seal/stamp` | `tide/concierge`, `tide/revenue`, `tide/housekeeping` | `tide/guestbook`, `tide/scout`, `fidelis/ledger` |
| **PRDs** | [F1](./prds/F1-fidelis-intake-interface.md)–[F3](./prds/F3-seal-stamp-interface.md) | [F4](./prds/F4-tide-concierge-interface.md)–[F6](./prds/F6-tide-housekeeping-interface.md) | [F7](./prds/F7-tide-guestbook-interface.md) · [F8](./prds/F8-tide-scout-interface.md) · [F10](./prds/F10-fidelis-ledger-batch3-shell.md) · LORE: [F9](./prds/F9-lore-education-deferred.md) |
| **Preview data** | Rich `PREVIEWS` | Rich `PREVIEWS` | Rich `PREVIEWS` for batch-3 keys |
| **Copy rail** | Intake / Ops / Stamp i18n | Tide + batch2 shells | Tide + Fidelis start; Remotion GB / Scout / Ledger; custom Astro shells for GB + Scout + Ledger |

### Batch 4 (computed)

| | **Batch 4** |
|---|-------------|
| **Theme** | Vault chain · filing runway · counsel desk |
| **Agents** | `fidelis/vault`, `fidelis/filing`, `fidelis/counsel` |
| **Preview / Remotion / shells** | Rich `PREVIEWS`; `InterfaceBackdrop` variants; custom Astro **Vault**, **Filing**, **Counsel** |

### Batch 5 (computed)

| | **Batch 5** |
|---|-------------|
| **Theme** | Audit read · portfolio tower · wealth ledger |
| **Agents** | `fidelis/audit`, `helios/portfolio`, `helios/ledger-w` |
| **Preview / Remotion / shells** | Rich `PREVIEWS`; `InterfaceBackdrop` variants; custom **Audit**, **Portfolio**, **Ledger-W** |

### Batch 6 (computed)

| | **Batch 6** |
|---|-------------|
| **Theme** | Trust administration · estate map · family office |
| **Agents** | `helios/trust`, `helios/estate`, `helios/family-office` |
| **Preview / Remotion / shells** | Rich `PREVIEWS`; `InterfaceBackdrop` variants; custom **Trust**, **Estate**, **Family Office** |

### Batch 7 (computed)

| | **Batch 7** |
|---|-------------|
| **Theme** | Yield sweep · Kairos intake · protocol loop |
| **Agents** | `helios/yield`, `alder/intake`, `alder/protocol` |
| **Preview / Remotion / shells** | Rich `PREVIEWS`; `InterfaceBackdrop` variants; custom **Yield**, **Kairos Intake**, **Protocol** |

### Batch 8 (computed)

| | **Batch 8** |
|---|-------------|
| **Theme** | Labs rail · cadence streaks · concierge medicine |
| **Agents** | `alder/labs`, `alder/cadence`, `alder/concierge-m` |
| **Preview / Remotion / shells** | Rich `PREVIEWS`; custom **Labs**, **Cadence**, **Concierge-M** |

### Batch 9 (computed)

| | **Batch 9** |
|---|-------------|
| **Theme** | Kairos foyer · blueprint stack · permit filings |
| **Agents** | `alder/atria`, `mortar/blueprint`, `mortar/permit` |
| **Preview / Remotion** | Rich `PREVIEWS`; dedicated backdrops; generic panel until optional custom shells |

### Batch 10–11 (previews in code)

| **Batch** | **Theme** | **Agents** |
|-----------|-----------|------------|
| **10** | Crew roster · site daily · construction ledger | `mortar/crew`, `mortar/site`, `mortar/ledger-c` |
| **11** | Punch close-out · matter desk · brief studio | `mortar/punch`, `lex/matter`, `lex/brief` |

## Waves (optional rollup)

`getInterfaceDevWaves()` splits **all** batches into three waves (~thirds each). Use for roadmap slides; **shipping order** within a batch is still steps 1→2→3.

## Sigma workflow pointer

Step-by-step loop: [SIGMA-SUB-AGENT-WORKFLOW.md](./SIGMA-SUB-AGENT-WORKFLOW.md).

## Acceptance rollup (Batch 1)

| Criterion | F1 Intake | F2 Ops | F3 Stamp |
|-----------|-----------|--------|----------|
| Parity with `PREVIEWS` | Required | Required | Required |
| `data-shell-i18n` + `shell.ts` (en/es/de) | `iface.intake.*` | `iface.ops.*` | `iface.stamp.*` |
| `/api/hub/surface` footer line | Required | Required | Required |
| a11y + responsive | PRD checklist | PRD checklist | PRD checklist |

When Batch 1 is green, bump `INTERFACE_DEV_SEQUENCE_INDEX` / `ACTIVE_INTERFACE_DEV_BATCH` per comments in `interfaceBatches.ts` and F3 “When this ships”.
