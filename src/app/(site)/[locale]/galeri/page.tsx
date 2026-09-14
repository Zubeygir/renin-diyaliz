import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { galleryPageQuery, galleryListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { GalleryPage as GalleryPageType, GalleryItem } from "@/types";

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

  const [items, pageData] = await Promise.all([
    cachedFetch<GalleryItem[]>(galleryListQuery, { locale }, { next: { tags: ["gallery:list"] } }),
    cachedFetch<GalleryPageType>(galleryPageQuery, { locale }, { next: { tags: ["galleryPage"] } }),
  ]);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.gallery}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <div className="container mx-auto px-4">
        {items && items.length > 0 ? (
          <AnimateGroup className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <StaggerItem key={item._id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                {item.image?.asset && (
                  <SanityImage
                    image={item.image}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </StaggerItem>
            ))}
          </AnimateGroup>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground text-center py-16">
              {locale === "en" ? "No gallery images found." : "Henüz eklenmiş bir görsel bulunmuyor."}
            </p>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
