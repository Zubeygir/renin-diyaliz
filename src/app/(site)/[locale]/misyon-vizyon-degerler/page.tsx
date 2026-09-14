import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { missionVisionPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { RichText } from "@/components/ui/RichText";
import { MissionVisionPage as MissionVisionPageType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<MissionVisionPageType>(
    missionVisionPageQuery,
    { locale },
    { next: { tags: ["missionVision"] } }
  );

  return buildMetadata(
    {
      title: data?.heroTitle || data?.pageTitle || (locale === "en" ? "Mission, Vision & Values" : "Misyon, Vizyon, Değerler ve Kalite Politikası"),
      canonicalPath: "/misyon-vizyon-degerler",
      enCanonicalPath: "/en/mission-vision-values",
      pageSeo: data?.seo,
    },
    locale
  );
}

export default async function MissionVisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<MissionVisionPageType>(
    missionVisionPageQuery,
    { locale },
    { next: { tags: ["missionVision"] } }
  );

  const defaultTitle = locale === "en" ? "Mission, Vision & Values" : "Misyon, Vizyon, Değerler ve Kalite Politikası";

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={data?.heroTitle || data?.pageTitle || defaultTitle}
        subtitle={data?.heroSubtitle}
        backgroundImage={data?.heroImage}
      />

      <div className="container mx-auto px-4 max-w-3xl flex flex-col gap-12 md:gap-16">
        {(data?.missionText || data?.visionText) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {data?.missionText && (
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold tracking-tight mb-3">
                  {data.missionTitle || (locale === "en" ? "Our Mission" : "Misyonumuz")}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{data.missionText}</p>
              </FadeIn>
            )}
            {data?.visionText && (
              <FadeIn direction="up" delay={0.1}>
                <h2 className="text-2xl font-bold tracking-tight mb-3">
                  {data.visionTitle || (locale === "en" ? "Our Vision" : "Vizyonumuz")}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{data.visionText}</p>
              </FadeIn>
            )}
          </div>
        )}

        {data?.values && data.values.length > 0 && (
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              {data.valuesTitle || (locale === "en" ? "Core Values" : "Temel Değerlerimiz")}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.values.map((value, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {value}
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        {data?.qualityPolicyText && (
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              {data.qualityPolicyTitle || (locale === "en" ? "Quality Policy" : "Kalite Politikamız")}
            </h2>
            <RichText value={data.qualityPolicyText} />
          </FadeIn>
        )}
      </div>
    </div>
  );
}
