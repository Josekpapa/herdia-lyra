import type { APIContext } from "astro";
import type { LyraLocale } from "./shell";

const VALID = new Set<LyraLocale>(["en", "es", "de"]);

/**
 * Cookie + query agree with LyraLanguageSwitcher (localStorage key `lyra.locale`).
 * Use on any Astro page/layout that should render server-side copy in the visitor's language.
 *
 * Skips reading cookies during prerender (static HTML build) — avoids touching request headers;
 * the client still applies `lyra.locale` from cookie/localStorage.
 */
export function resolveLocale(Astro: Pick<APIContext, "cookies" | "url" | "isPrerendered">): LyraLocale {
  const q = Astro.url.searchParams.get("lang");
  if (q && VALID.has(q as LyraLocale)) return q as LyraLocale;
  if (!Astro.isPrerendered) {
    const c = Astro.cookies.get("lyra.locale")?.value;
    if (c && VALID.has(c as LyraLocale)) return c as LyraLocale;
  }
  return "en";
}
