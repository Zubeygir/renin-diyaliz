import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { galleryPageQuery, galleryListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { GalleryPage as GalleryPageType, GalleryItem } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await cachedFetch<GalleryPageType>(galleryPageQuery, {}, { next: { tags: ["galleryPage"] } });
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Galeri",
    canonicalPath: "/galeri",
    pageSeo: pageData?.seo,
  });
}

export default async function GalleryHubPage() {
  const [items, pageData] = await Promise.all([
    cachedFetch<GalleryItem[]>(galleryListQuery, {}, { next: { tags: ["gallery:list"] } }),
    cachedFetch<GalleryPageType>(galleryPageQuery, {}, { next: { tags: ["galleryPage"] } }),
  ]);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Galeri"}
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
            <p className="text-muted-foreground text-center py-16">Henüz eklenmiş bir görsel bulunmuyor.</p>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
