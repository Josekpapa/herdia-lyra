import type { APIRoute } from "astro";
import { getAgentServiceOffers, serviceCatalogStats } from "../../../data/serviceCatalog";

export const prerender = false;

/**
 * JSON registry for operator + future marketplace sync.
 * Query: ?status=live|draft&holding=tide&format=stats
 */
export const GET: APIRoute = ({ url }) => {
  const format = url.searchParams.get("format");
  if (format === "stats") {
    return new Response(JSON.stringify(serviceCatalogStats(), null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const status = url.searchParams.get("status");
  const holding = url.searchParams.get("holding");

  let offers = getAgentServiceOffers();
  if (status === "live" || status === "draft") {
    offers = offers.filter((o) => o.atlasStatus === status);
  }
  if (holding) {
    offers = offers.filter((o) => o.holdingSlug === holding);
  }

  return new Response(
    JSON.stringify(
      {
        ok: true,
        catalogVersion: "lyra-service-catalog-v1",
        stats: serviceCatalogStats(),
        count: offers.length,
        offers,
      },
      null,
      2,
    ),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
