# Integration specs (Sigma Step 8 / 11)

**Handoff:** GA env vars (`LYRA_MP_*`) and Vercel steps live in **`../runbooks/vercel-ga-env.md`** and repo **`CLAUDE.md`** — sandbox agents cannot set project secrets.

Short, buildable specs for **general-availability** SKUs. One file per **`holding/agent`** key (same as `serviceCatalog` and `/api/hub/surface`).

| Key | Spec |
|-----|------|
| `fidelis/ledger` | [fidelis-ledger.md](./fidelis-ledger.md) |
| `fidelis/vault` | [fidelis-vault.md](./fidelis-vault.md) |
| `tide/ops` | [tide-ops.md](./tide-ops.md) |
| `tide/concierge` | [tide-concierge.md](./tide-concierge.md) |
| `tide/revenue` | [tide-revenue.md](./tide-revenue.md) |
| `tide/housekeeping` | [tide-housekeeping.md](./tide-housekeeping.md) |
| `tide/guestbook` | [tide-guestbook.md](./tide-guestbook.md) |
| `tide/scout` | [tide-scout.md](./tide-scout.md) |
| `lore/tutor` | [lore-tutor.md](./lore-tutor.md) |
| `lore/path` | [lore-path.md](./lore-path.md) |
| `lore/lab` | [lore-lab.md](./lore-lab.md) |
| `seal/stamp` | [seal-stamp.md](./seal-stamp.md) |
| `seal/chain` | [seal-chain.md](./seal-chain.md) |
| `alder/atria` | [alder-atria.md](./alder-atria.md) · preview / foyer |
| `mortar/blueprint` | [mortar-blueprint.md](./mortar-blueprint.md) · preview / sets + RFI |
| `mortar/permit` | [mortar-permit.md](./mortar-permit.md) · preview / filings + agencies |
| `mortar/crew` | [mortar-crew.md](./mortar-crew.md) · preview / roster + gates |
| `mortar/site` | [mortar-site.md](./mortar-site.md) · preview / daily + day rail |
| `mortar/ledger-c` | [mortar-ledger-c.md](./mortar-ledger-c.md) · preview / draws + COs |
| `mortar/punch` | [mortar-punch.md](./mortar-punch.md) · preview / close-out + handoff |

When you promote another agent to GA, add **`OFFER_OVERRIDES`**, a row in this table, and a new spec file using the same section layout.
