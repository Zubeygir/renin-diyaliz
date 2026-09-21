import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { orgChartPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageTitle } from "@/components/layout/PageTitle";
import { OrgChartViewer } from "@/components/common/OrgChartViewer";
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

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: data?.heroTitle || data?.pageTitle || dict.orgChart.defaultTitle,
      canonicalPath: "/organizasyon-semasi",
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

  const dict = getDictionary(locale);
  const defaultTitle = dict.orgChart.defaultTitle;

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={data?.heroTitle || data?.pageTitle || defaultTitle}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
      />

      {data?.chartImage?.asset && (
        <div className="container mx-auto px-4 max-w-5xl">
          <OrgChartViewer image={data.chartImage} locale={locale} />
        </div>
      )}
    </div>
  );
}
