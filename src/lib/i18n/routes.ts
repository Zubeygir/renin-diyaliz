import { Locale } from "./dictionaries";

export interface RouteEntry {
  tr: string;
  en: string;
  de: string;
  ar: string;
}

export const ROUTE_MAP: Record<string, RouteEntry> = {
  home: {
    tr: "/",
    en: "/en",
    de: "/de",
    ar: "/ar",
  },
  hakkimizda: {
    tr: "/hakkimizda",
    en: "/en/about",
    de: "/de/ueber-uns",
    ar: "/ar/about",
  },
  "misyon-vizyon-degerler": {
    tr: "/misyon-vizyon-degerler",
    en: "/en/mission-vision-values",
    de: "/de/mission-vision-werte",
    ar: "/ar/mission-vision-values",
  },
  "organizasyon-semasi": {
    tr: "/organizasyon-semasi",
    en: "/en/organization-chart",
    de: "/de/organigramm",
    ar: "/ar/organization-chart",
  },
  kadromuz: {
    tr: "/kadromuz",
    en: "/en/team",
    de: "/de/team",
    ar: "/ar/team",
  },
  hizmetler: {
    tr: "/hizmetler",
    en: "/en/services",
    de: "/de/leistungen",
    ar: "/ar/services",
  },
  galeri: {
    tr: "/galeri",
    en: "/en/gallery",
    de: "/de/galerie",
    ar: "/ar/gallery",
  },
  blog: {
    tr: "/blog",
    en: "/en/blog",
    de: "/de/blog",
    ar: "/ar/blog",
  },
  projeler: {
    tr: "/projeler",
    en: "/en/projects",
    de: "/de/projekte",
    ar: "/ar/projects",
  },
  iletisim: {
    tr: "/iletisim",
    en: "/en/contact",
    de: "/de/kontakt",
    ar: "/ar/contact",
  },
  kvkk: {
    tr: "/kvkk",
    en: "/en/privacy",
    de: "/de/datenschutz",
    ar: "/ar/privacy",
  },
  "cerez-politikasi": {
    tr: "/cerez-politikasi",
    en: "/en/cookie-policy",
    de: "/de/cookie-richtlinie",
    ar: "/ar/cookie-policy",
  },
};

/**
 * Resolves a localized URL given the current pathname and target locale.
 * Supports exact static matches, dynamic prefix matches, and explicit alternates.
 */
export function resolveLocalizedUrl(
  pathname: string,
  currentLocale: Locale,
  targetLocale: Locale,
  alternateUrls?: Partial<Record<Locale, string | null>>
): string {
  if (targetLocale === currentLocale) return pathname || "/";

  // 1. Explicit dynamic page alternate if supplied (e.g. from Sanity localizedSlug)
  if (alternateUrls?.[targetLocale]) {
    return alternateUrls[targetLocale]!;
  }

  const clean = pathname ? pathname.replace(/\/$/, "") : "";
  const normalized = clean === "" ? "/" : clean;

  // 2. Exact match in ROUTE_MAP
  for (const key of Object.keys(ROUTE_MAP)) {
    const entry = ROUTE_MAP[key];
    if (entry[currentLocale] === normalized) {
      return entry[targetLocale];
    }
  }

  // 3. Dynamic sub-routes (e.g., /hizmetler/:slug, /en/services/:slug, etc.)
  const dynamicKeys = ["hizmetler", "projeler", "blog", "kadromuz"];
  for (const key of dynamicKeys) {
    const entry = ROUTE_MAP[key];
    const currPrefix = entry[currentLocale];
    if (normalized === currPrefix || normalized.startsWith(currPrefix + "/")) {
      const rest = normalized.slice(currPrefix.length);
      return `${entry[targetLocale]}${rest}`;
    }
  }

  // 4. Default fallback: replace current prefix with target prefix
  if (currentLocale === "tr") {
    return targetLocale === "tr"
      ? normalized
      : `/${targetLocale}${normalized === "/" ? "" : normalized}`;
  } else {
    const withoutLocale = normalized.replace(new RegExp(`^\\/${currentLocale}`), "") || "/";
    return targetLocale === "tr"
      ? withoutLocale
      : `/${targetLocale}${withoutLocale === "/" ? "" : withoutLocale}`;
  }
}

/**
 * Returns localized path for an internal route key.
 */
export function getLocalizedPath(key: keyof typeof ROUTE_MAP, locale: Locale): string {
  return ROUTE_MAP[key]?.[locale] || (locale === "tr" ? "/" : `/${locale}`);
}
