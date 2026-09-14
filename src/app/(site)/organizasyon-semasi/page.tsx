import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { orgChartPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { OrgChartPage as OrgChartPageType } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<OrgChartPageType>(orgChartPageQuery, {}, { next: { tags: ["orgChart"] } });
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "Organizasyon Şeması",
    canonicalPath: "/organizasyon-semasi",
    pageSeo: data?.seo,
  });
}

export default async function OrgChartPage() {
  const data = await cachedFetch<OrgChartPageType>(orgChartPageQuery, {}, { next: { tags: ["orgChart"] } });

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "Organizasyon Şeması"}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
      />

      {data?.chartImage?.asset && (
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn direction="up">
            <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full rounded-lg overflow-hidden border bg-muted">
              <SanityImage
                image={data.chartImage}
                fill
                objectFit="contain"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  );
}
