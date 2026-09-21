import { MetadataRoute } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { allSlugsForSitemapQuery } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/utils";
import { ROUTE_MAP, Locale } from "@/lib/i18n";

export const revalidate = 86400;

type LocalizedItem = {
  tr?: string;
  en?: string;
  de?: string;
  ar?: string;
  _updatedAt?: string;
};

type SitemapPage = {
  _updatedAt?: string;
  noIndex?: boolean;
};

type SitemapData = {
  pages?: Record<
    "home" | "about" | "missionVision" | "orgChart" | "staff" | "gallery" | "contact" | "kvkk" | "cookiePolicy" | "blog" | "services" | "projects",
    SitemapPage | null
  >;
  blogPosts?: LocalizedItem[];
  services?: LocalizedItem[];
  projects?: LocalizedItem[];
  staffMembers?: LocalizedItem[];
};

function lastModified(updatedAt?: string) {
  return updatedAt ? new Date(updatedAt) : undefined;
}

const PAGE_KEY_MAP: Record<string, keyof NonNullable<SitemapData["pages"]>> = {
  home: "home",
  hakkimizda: "about",
  "misyon-vizyon-degerler": "missionVision",
  "organizasyon-semasi": "orgChart",
  kadromuz: "staff",
  galeri: "gallery",
  iletisim: "contact",
  kvkk: "kvkk",
  "cerez-politikasi": "cookiePolicy",
  blog: "blog",
  hizmetler: "services",
  projeler: "projects",
};

const PRIORITY_MAP: Record<string, number> = {
  home: 1.0,
  hizmetler: 0.9,
  blog: 0.9,
  hakkimizda: 0.8,
  projeler: 0.8,
  kadromuz: 0.7,
  iletisim: 0.7,
  "misyon-vizyon-degerler": 0.6,
  galeri: 0.6,
  "organizasyon-semasi": 0.5,
  kvkk: 0.3,
  "cerez-politikasi": 0.3,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const data = await cachedFetch<SitemapData>(
    allSlugsForSitemapQuery,
    {},
    { next: { tags: ["sitemap"] } }
  );
  const pages = data?.pages;
  const locales: Locale[] = ["tr", "en", "de", "ar"];

  const staticRoutes: MetadataRoute.Sitemap = [];

  for (const [routeKey, pageKey] of Object.entries(PAGE_KEY_MAP)) {
    const pageData = pages?.[pageKey];
    if (pageData?.noIndex) continue;

    const basePriority = PRIORITY_MAP[routeKey] ?? 0.5;
    const routeEntry = ROUTE_MAP[routeKey];
    if (!routeEntry) continue;

    for (const loc of locales) {
      const path = routeEntry[loc];
      const url = path === "/" ? base : `${base}${path}`;
      const priority = loc === "tr" ? basePriority : Math.max(0.1, Number((basePriority - 0.1).toFixed(1)));
      const changeFrequency =
        routeKey === "home" || routeKey === "blog"
          ? "weekly"
          : routeKey === "kvkk" || routeKey === "cerez-politikasi"
          ? "yearly"
          : "monthly";

      staticRoutes.push({
        url,
        lastModified: lastModified(pageData?._updatedAt),
        changeFrequency,
        priority,
      });
    }
  }

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  const addDynamic = (
    items: LocalizedItem[] | undefined,
    routeKey: "blog" | "hizmetler" | "projeler" | "kadromuz",
    basePriority: number
  ) => {
    if (!items) return;
    const routeEntry = ROUTE_MAP[routeKey];

    items.forEach((item) => {
      locales.forEach((loc) => {
        const slug = item[loc];
        if (!slug) return;
        const prefix = routeEntry[loc];
        const url = `${base}${prefix}/${slug}`;
        const priority = loc === "tr" ? basePriority : Math.max(0.1, Number((basePriority - 0.1).toFixed(1)));

        dynamicRoutes.push({
          url,
          lastModified: lastModified(item._updatedAt),
          changeFrequency: "monthly",
          priority,
        });
      });
    });
  };

  addDynamic(data?.services, "hizmetler", 0.8);
  addDynamic(data?.blogPosts, "blog", 0.7);
  addDynamic(data?.projects, "projeler", 0.7);
  addDynamic(data?.staffMembers, "kadromuz", 0.7);

  return [...staticRoutes, ...dynamicRoutes];
}
