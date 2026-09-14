import { MetadataRoute } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { allSlugsForSitemapQuery } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 86400;

type LocalizedItem = {
  tr?: string;
  en?: string;
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const data = await cachedFetch<SitemapData>(
    allSlugsForSitemapQuery,
    {},
    { next: { tags: ["sitemap"] } }
  );
  const pages = data?.pages;

  const staticRouteEntries: MetadataRoute.Sitemap = [
    // TR static routes
    { url: base, lastModified: lastModified(pages?.home?._updatedAt), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: lastModified(pages?.about?._updatedAt), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/misyon-vizyon-degerler`, lastModified: lastModified(pages?.missionVision?._updatedAt), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/organizasyon-semasi`, lastModified: lastModified(pages?.orgChart?._updatedAt), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/kadromuz`, lastModified: lastModified(pages?.staff?._updatedAt), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/galeri`, lastModified: lastModified(pages?.gallery?._updatedAt), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/iletisim`, lastModified: lastModified(pages?.contact?._updatedAt), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kvkk`, lastModified: lastModified(pages?.kvkk?._updatedAt), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cerez-politikasi`, lastModified: lastModified(pages?.cookiePolicy?._updatedAt), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/blog`, lastModified: lastModified(pages?.blog?._updatedAt), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hizmetler`, lastModified: lastModified(pages?.services?._updatedAt), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projeler`, lastModified: lastModified(pages?.projects?._updatedAt), changeFrequency: "monthly", priority: 0.8 },

    // EN static routes
    { url: `${base}/en`, lastModified: lastModified(pages?.home?._updatedAt), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/en/about`, lastModified: lastModified(pages?.about?._updatedAt), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/en/mission-vision-values`, lastModified: lastModified(pages?.missionVision?._updatedAt), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/en/organization-chart`, lastModified: lastModified(pages?.orgChart?._updatedAt), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/en/team`, lastModified: lastModified(pages?.staff?._updatedAt), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/en/gallery`, lastModified: lastModified(pages?.gallery?._updatedAt), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/en/contact`, lastModified: lastModified(pages?.contact?._updatedAt), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/en/privacy`, lastModified: lastModified(pages?.kvkk?._updatedAt), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/en/cookie-policy`, lastModified: lastModified(pages?.cookiePolicy?._updatedAt), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/en/blog`, lastModified: lastModified(pages?.blog?._updatedAt), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en/services`, lastModified: lastModified(pages?.services?._updatedAt), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/en/projects`, lastModified: lastModified(pages?.projects?._updatedAt), changeFrequency: "monthly", priority: 0.7 },
  ];

  const staticRoutes = staticRouteEntries.filter((route) => {
    const path = route.url.replace(base, "") || "/";
    if (path === "/" || path === "/en") return !pages?.home?.noIndex;
    if (path === "/hakkimizda" || path === "/en/about") return !pages?.about?.noIndex;
    if (path === "/misyon-vizyon-degerler" || path === "/en/mission-vision-values") return !pages?.missionVision?.noIndex;
    if (path === "/organizasyon-semasi" || path === "/en/organization-chart") return !pages?.orgChart?.noIndex;
    if (path === "/kadromuz" || path === "/en/team") return !pages?.staff?.noIndex;
    if (path === "/galeri" || path === "/en/gallery") return !pages?.gallery?.noIndex;
    if (path === "/iletisim" || path === "/en/contact") return !pages?.contact?.noIndex;
    if (path === "/kvkk" || path === "/en/privacy") return !pages?.kvkk?.noIndex;
    if (path === "/cerez-politikasi" || path === "/en/cookie-policy") return !pages?.cookiePolicy?.noIndex;
    if (path === "/blog" || path === "/en/blog") return !pages?.blog?.noIndex;
    if (path === "/hizmetler" || path === "/en/services") return !pages?.services?.noIndex;
    if (path === "/projeler" || path === "/en/projects") return !pages?.projects?.noIndex;
    return true;
  });

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  data?.blogPosts?.forEach((item) => {
    if (item.tr) {
      dynamicRoutes.push({
        url: `${base}/blog/${item.tr}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    if (item.en) {
      dynamicRoutes.push({
        url: `${base}/en/blog/${item.en}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  });

  data?.services?.forEach((item) => {
    if (item.tr) {
      dynamicRoutes.push({
        url: `${base}/hizmetler/${item.tr}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    if (item.en) {
      dynamicRoutes.push({
        url: `${base}/en/services/${item.en}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  });

  data?.projects?.forEach((item) => {
    if (item.tr) {
      dynamicRoutes.push({
        url: `${base}/projeler/${item.tr}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    if (item.en) {
      dynamicRoutes.push({
        url: `${base}/en/projects/${item.en}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  });

  data?.staffMembers?.forEach((item) => {
    if (item.tr) {
      dynamicRoutes.push({
        url: `${base}/kadromuz/${item.tr}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    if (item.en) {
      dynamicRoutes.push({
        url: `${base}/en/team/${item.en}`,
        lastModified: lastModified(item._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  });

  return [...staticRoutes, ...dynamicRoutes];
}
