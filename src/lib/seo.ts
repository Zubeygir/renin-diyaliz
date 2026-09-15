import { Metadata } from "next";
import { cache } from "react";
import { cachedFetch } from "@/sanity/lib/client";
import { layoutQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { getSiteUrl } from "./utils";
import { Locale } from "./i18n";
import { SanityImage, SiteSettings, Navigation, SeoSettings, WorkingHourItem } from "@/types";
import { toPlainText, type PortableTextBlock } from "@portabletext/react";

type BuildMetadataParams = {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
  canonicalPath?: string;
  enCanonicalPath?: string;
  noIndex?: boolean;
  pageSeo?: SeoSettings;
};

export function portableTextToPlainText(value?: PortableTextBlock[], maxLength = 160): string | undefined {
  if (!value?.length) return undefined;
  const text = toPlainText(value).replace(/\s+/g, " ").trim();
  if (!text) return undefined;
  return text.length > maxLength ? `${text.slice(0, maxLength - 3).trimEnd()}...` : text;
}

export interface LayoutData {
  settings: SiteSettings;
  navigation: Navigation;
  workingHours?: WorkingHourItem[];
}

export const getLayoutData = cache(
  (locale: Locale = "tr"): Promise<LayoutData> =>
    cachedFetch<LayoutData>(layoutQuery, { locale }, { next: { tags: ["layout", "contact"] } })
);

export async function buildMetadata(
  params: BuildMetadataParams = {},
  locale: Locale = "tr"
): Promise<Metadata> {
  const { settings } = await getLayoutData(locale);

  const siteName = settings?.siteName || "Renin Diyaliz";
  const siteTagline = settings?.siteTagline || "";
  const defaultMetaTitle = settings?.defaultSeo?.metaTitle || "";
  const isHomePage = params.canonicalPath === "/" || params.canonicalPath === "";

  let title = "";

  if (isHomePage) {
    const customTitle = params.pageSeo?.metaTitle || defaultMetaTitle;
    if (customTitle) {
      title = customTitle;
    } else {
      title = siteTagline ? `${siteName} | ${siteTagline}` : siteName;
    }
  } else {
    const pageTitle = params.pageSeo?.metaTitle || params.title || "";
    title = pageTitle ? `${pageTitle} | ${siteName}` : siteName;
  }

  const description = params.pageSeo?.metaDescription || params.description || settings?.defaultSeo?.metaDescription;
  const ogImageSource = params.pageSeo?.ogImage || params.ogImage || settings?.defaultOgImage;
  const siteUrl = getSiteUrl();

  const trPath = params.canonicalPath || "/";
  const enPath = params.enCanonicalPath || (trPath === "/" ? "/en" : `/en${trPath}`);
  const currentPublicPath = locale === "en" ? enPath : trPath;
  const canonicalUrl = params.pageSeo?.canonicalUrl || `${siteUrl}${currentPublicPath}`;
  const noIndex = params.pageSeo?.noIndex || params.noIndex || false;

  const faviconUrl = settings?.favicon?.asset?.url || "/favicon.ico";
  const ogImageUrl = ogImageSource
    ? urlForImage(ogImageSource)?.width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "tr-TR": `${siteUrl}${trPath}`,
        "en-US": `${siteUrl}${enPath}`,
        "x-default": `${siteUrl}${trPath}`,
      },
    },
    openGraph: {
      title: title || "",
      description: description || "",
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
      locale: locale === "en" ? "en_US" : "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "",
      description: description || "",
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    verification: {
      google: settings?.googleSearchConsoleId || undefined,
    },
  };
}
