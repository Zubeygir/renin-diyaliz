import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { orgChartPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { OrgChartPage as OrgChartPageType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<OrgChartPageType>(
    orgChartPageQuery,
    { locale },
    { next: { tags: ["orgChart"] } }
  );

  return buildMetadata(
    {
      title: data?.heroTitle || data?.pageTitle || (locale === "en" ? "Organization Chart" : "Organizasyon Şeması"),
      canonicalPath: "/organizasyon-semasi",
      enCanonicalPath: "/en/organization-chart",
      pageSeo: data?.seo,
    },
    locale
  );
}

export default async function OrgChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<OrgChartPageType>(
    orgChartPageQuery,
    { locale },
    { next: { tags: ["orgChart"] } }
  );

  const defaultTitle = locale === "en" ? "Organization Chart" : "Organizasyon Şeması";

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={data?.heroTitle || data?.pageTitle || defaultTitle}
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
