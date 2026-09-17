import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { galleryPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageTitle } from "@/components/layout/PageTitle";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryPage as GalleryPageType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const pageData = await cachedFetch<GalleryPageType>(
    galleryPageQuery,
    { locale },
    { next: { tags: ["galleryPage"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: pageData?.heroTitle || pageData?.pageTitle || dict.nav.gallery,
      canonicalPath: "/galeri",
      enCanonicalPath: "/en/gallery",
      pageSeo: pageData?.seo,
    },
    locale
  );
}

export default async function GalleryHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const pageData = await cachedFetch<GalleryPageType>(
    galleryPageQuery,
    { locale },
    { next: { tags: ["galleryPage"] } }
  );

  const items = pageData?.images || [];

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.gallery}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
      />

      <div className="container mx-auto px-4">
        {items.length > 0 ? (
          <GalleryGrid items={items} locale={locale} />
        ) : (
          <p className="text-muted-foreground text-center py-16">
            {dict.gallery.noImagesFound}
          </p>
        )}
      </div>
    </div>
  );
}
