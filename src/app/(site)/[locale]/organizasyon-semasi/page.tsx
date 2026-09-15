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
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up" className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/25 via-primary/10 to-transparent blur-3xl" />
            <div className="rounded-2xl border bg-accent/40 p-6 sm:p-10">
              <SanityImage
                image={data.chartImage}
                width={data.chartImage.asset.metadata?.dimensions?.width || 1200}
                height={data.chartImage.asset.metadata?.dimensions?.height || 900}
                sizes="(max-width: 1280px) 100vw, 1100px"
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  );
}
