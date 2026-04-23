# Runbook · Vercel · GA marketplace env (`LYRA_MP_*`)

**Automation:** Cursor sandbox agents cannot set Vercel secrets — assign to **Claude (authenticated)** or **human**; context: **`CLAUDE.md`**.

**Sigma mapping:** Step 8 (technical / env contract) + deploy discipline + verification.  
**Catalog source:** `src/data/serviceCatalog.ts` → `OFFER_OVERRIDES` (general availability keys).  
**Names:** `catalogListingEnvVarName()` — `holding/agent` → `LYRA_MP_<HOLDING>_<AGENT>`.

## Variables (Production)

| Catalog key | Environment variable |
|-------------|----------------------|
| `fidelis/ledger` | `LYRA_MP_FIDELIS_LEDGER` |
| `fidelis/vault` | `LYRA_MP_FIDELIS_VAULT` |
| `tide/ops` | `LYRA_MP_TIDE_OPS` |
| `tide/concierge` | `LYRA_MP_TIDE_CONCIERGE` |
| `tide/revenue` | `LYRA_MP_TIDE_REVENUE` |
| `tide/housekeeping` | `LYRA_MP_TIDE_HOUSEKEEPING` |
| `tide/guestbook` | `LYRA_MP_TIDE_GUESTBOOK` |
| `tide/scout` | `LYRA_MP_TIDE_SCOUT` |
| `lore/tutor` | `LYRA_MP_LORE_TUTOR` |
| `lore/path` | `LYRA_MP_LORE_PATH` |
| `lore/lab` | `LYRA_MP_LORE_LAB` |
| `seal/stamp` | `LYRA_MP_SEAL_STAMP` |
| `seal/chain` | `LYRA_MP_SEAL_CHAIN` |

Values = Vercel Marketplace listing ids (or your internal id registry). **Never commit** values; use Vercel env or `vercel env pull` → `.env.local`.

## Recommended path · CLI

1. `vercel login` → in repo: `vercel link`
2. For each row, **Production** (repeat for **Preview** if preview deploys should show listing ids):

   ```bash
   echo "YOUR_LISTING_ID" | vercel env add LYRA_MP_FIDELIS_LEDGER production
   # … repeat for every row in the table above (GA keys)
   ```

3. `vercel env ls`
4. Redeploy the project so runtime sees new vars.

**Local parity (optional):** `vercel env pull .env.local --environment=production --yes`

## Optional · deploy signal without manifest

If a build ever skips `write-deploy-manifest.mjs`, set on the project:

- `LYRA_LAST_DEPLOY_AT` — ISO-8601 timestamp  
- `LYRA_DEPLOY_REVISION` — short git SHA  

Normal **`npm run build`** already runs the manifest script first; this is a fallback.

## Verification (acceptance)

After deploy:

```bash
curl -sS "https://YOUR_ORIGIN/api/hub/surface?holding=tide&agent=revenue" | jq '.stub, .deploy, .offer.marketplaceListingId'
```

- Expect **`stub: false`** and non-null **`deploy`** when manifest baked or globals set.  
- **`offer.marketplaceListingId`** populates when the matching **`LYRA_MP_*`** is set (via `applyEnvMarketplaceIds`).

Spot-check catalog:

```bash
curl -sS "https://YOUR_ORIGIN/api/hub/service-catalog?format=stats" | jq .
```

## Dashboard alternative

Vercel → Project → **Settings** → **Environment Variables** → add each name for **Production**, save, redeploy.

## Related

- `docs/lyra/ECOSYSTEM-SERVICES-MODEL.md` — full GTM + manifest table  
- `.env.example` — commented `LYRA_MP_*` names  
