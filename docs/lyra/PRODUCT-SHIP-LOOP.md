# Product ship loop — landing, interface, services, and UX (Sigma)

**Use this** when you are planning and executing work **per agent** (or per batch of three): Matter landing, operator interface shell, commercial/service posture, and user-facing interaction quality. **Atlas + `interfaceBatches.ts` win on product truth**; Sigma supplies **gates and artifact shape**.

**Related:** [SIGMA-SUB-AGENT-WORKFLOW.md](./SIGMA-SUB-AGENT-WORKFLOW.md) (brownfield interface focus), [INTERFACE-BATCHES.md](./INTERFACE-BATCHES.md) (batch table + PRDs), [ECOSYSTEM-SERVICES-MODEL.md](./ECOSYSTEM-SERVICES-MODEL.md) (catalog, manifest, `LYRA_MP_*`).

---

## 1. Pick the target

| Source | Use when |
|--------|----------|
| `getSequenceFocusKey()` in `interfaceBatches.ts` | Default **live** build slot (sequential batch step) |
| `/hub/ecosystem` or `/hub/drafts` | See every agent, GTM, batch id, **NEXT** highlight |
| Explicit slug | Roadmap agent, out-of-order deep dive, or GA hardening |

**Live vs roadmap:** Live agents use full `SubAgentInterfacePanel` when in the active batch (rich `PREVIEWS`) or GA synthetic preview. **Draft** agents use roadmap copy + queued-shell section until they enter a batch or go GA.

---

## 2. Four delivery streams (do in parallel where possible)

| Stream | What “done” looks like | Primary paths |
|--------|------------------------|---------------|
| **Landing (Matter)** | Hero, why, replace, how, terminal, pricing, integrations, related, CTA align with holding voice | `SubAgentProduct.astro`, `subAgentCopy/*`, `src/pages/{holding}/{agent}.astro` |
| **Interface (shell)** | Custom or generic panel matches `PREVIEWS`; i18n; Remotion backdrop variant if needed | `SubAgentInterfacePanel.astro`, `interface/batch*/`, `interfaceBatches.ts` (`PREVIEWS`), `remotion/.../InterfaceBackdrop.tsx` |
| **Services (commercial)** | `gtmPhase`, `skuMode`, `integrationTargets`, optional `LYRA_MP_*` / overrides | `serviceCatalog.ts`, `OFFER_OVERRIDES`, `/hub/services`, `docs/lyra/integrations/` |
| **UX / interaction** | States, a11y, responsive, copy vs `data-shell-i18n`, plausible stub → real API later | PRD § states; `step-7-interface-states`; verify before merge |

---

## 3. Sigma steps → LYRA artifacts (planning → execution)

Map **slash commands** under `.cursor/commands/steps/` to concrete outputs. For brownfield, **skip** steps that do not change the story.

| Phase | Sigma step | When to run | Typical output for this repo |
|-------|------------|-------------|------------------------------|
| Planning | **1** Ideation | New vertical story or repositioning | Brief in PRD § context |
| Planning | **1.5** Offer | Price bands, packaging, tier grammar | Align with `atlas` pricing + `serviceCatalog` |
| Planning | **2** Architecture | New Hub/API/Gateway/data flow | `docs/lyra/architecture/<slug>.md` (add if needed) |
| Planning | **3** UX design | Narrative / IA for landing | Sections reflected in `subAgentCopy` |
| Planning | **4** Flow tree | Screen/state flow for shell | PRD + optional `docs/lyra/flows/<slug>.md` |
| Design | **5–6** Wireframe / design system | Layout and tokens | Match existing LYRA chrome; document in PRD |
| Design | **7** Interface states | Loading · empty · error · success | PRD § states; implement in shell when wired |
| Design | **8** Technical spec | API contracts, webhooks, auth | `docs/lyra/integrations/<sku>.md`, Hub routes |
| Build | **9** Landing | Optional formal landing step | Matter page already in Astro — refine copy |
| Build | **10** Feature breakdown | Multi-agent rollup | Optional `FEATURE-BREAKDOWN-*.md` |
| Build | **11** PRD | Per-agent implementation slice | `docs/lyra/prds/F*-*.md` |
| Ship | **12–14** Context / skills / runtime | Team handoff | `AGENTS.md`, `CLAUDE.md`, skills |

**Minimum bar before calling a **live** SKU “shipped” for a batch slot:** PRD updated, `PREVIEWS` + shell parity (or explicit generic + queue stub), catalog row coherent, integration stub or spec for GA.

---

## 4. One-agent checklist (copy-paste)

1. [ ] **Atlas** — name, blurb, tier, `live` vs `draft` accurate.
2. [ ] **Landing** — `getSubAgentCopy` + overrides; roadmap banner if draft.
3. [ ] **Interface** — `PREVIEWS[key]` if in active batch; custom component wired in `SubAgentInterfacePanel`; backdrop variant if applicable.
4. [ ] **i18n** — `shell.ts` keys for new `data-shell-i18n` strings (en/es/de).
5. [ ] **Services** — `OFFER_OVERRIDES` if GA/preview changes; `docs/lyra/integrations/` for Step 8 depth.
6. [ ] **Hub** — `/api/hub/surface` sensible for key; deploy manifest if GA (`write-deploy-manifest.mjs`).
7. [ ] **Verify** — `step-verify` / PRD rubric; bump `INTERFACE_DEV_SEQUENCE_INDEX` or `ACTIVE_INTERFACE_DEV_BATCH` when the slot is done.

---

## 5. Hub operator URLs

| URL | Role |
|-----|------|
| `/hub` | Overview, API stubs, GA list |
| `/hub/ecosystem` | Full matrix: Atlas × GTM × batch × links |
| `/hub/drafts` | Roadmap agents only |
| `/hub/services` | Service catalog table |
| `/hub/batches` | Waves + batch list + **NEXT** |

---

## 6. After you ship

- Update **`INTERFACE-BATCHES.md`** narrative if batch themes change.
- Mirror narrative in **Obsidian** `Batch log` if you use the vault.
- **`npm run build`** before merge (manifest + Astro).
