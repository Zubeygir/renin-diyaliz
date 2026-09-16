import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { missionVisionPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { PageTitle } from "@/components/layout/PageTitle";
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
  const missionTitle = data?.missionTitle || (locale === "en" ? "Our Mission" : "Misyonumuz");
  const visionTitle = data?.visionTitle || (locale === "en" ? "Our Vision" : "Vizyonumuz");
  const valuesTitle = data?.valuesTitle || (locale === "en" ? "Core Values" : "Temel Değerlerimiz");
  const qualityTitle = data?.qualityPolicyTitle || (locale === "en" ? "Quality Policy" : "Kalite Politikamız");

  const navItems = [
    { id: "misyon", label: missionTitle, show: Boolean(data?.missionText) },
    { id: "vizyon", label: visionTitle, show: Boolean(data?.visionText) },
    { id: "degerler", label: valuesTitle, show: Boolean(data?.values && data.values.length > 0) },
    { id: "kalite-politikasi", label: qualityTitle, show: Boolean(data?.qualityPolicyIntro || (data?.qualityPolicyItems && data.qualityPolicyItems.length > 0)) },
  ].filter((item) => item.show);

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={data?.heroTitle || data?.pageTitle || defaultTitle}
        subtitle={data?.heroSubtitle}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Sayfa İçi Anchor Navigasyon (Sticky) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border rounded-md p-6 bg-card">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {locale === "en" ? "Page Contents" : "Sayfa Başlıkları"}
              </p>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all py-1 border-l-2 border-transparent hover:border-primary pl-2.5 -ml-2.5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sağ Kolon: İçerik Bölümleri */}
          <main className="lg:col-span-8 min-w-0 space-y-16">
            {/* Misyon */}
            {data?.missionText && (
              <section id="misyon" className="scroll-mt-28 space-y-4">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {missionTitle}
                </h2>
                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed whitespace-pre-line max-w-[68ch]">
                  {data.missionText}
                </p>
              </section>
            )}

            {/* Vizyon */}
            {data?.visionText && (
              <section id="vizyon" className="scroll-mt-28 space-y-4 pt-8 border-t border-border">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {visionTitle}
                </h2>
                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed whitespace-pre-line max-w-[68ch]">
                  {data.visionText}
                </p>
              </section>
            )}

            {/* Değerler: Büyük puntolu divide-y satırlar */}
            {data?.values && data.values.length > 0 && (
              <section id="degerler" className="scroll-mt-28 space-y-6 pt-8 border-t border-border">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {valuesTitle}
                </h2>
                <ul className="divide-y divide-border border-y border-border">
                  {data.values.map((value, i) => (
                    <li
                      key={i}
                      className="py-4 text-base sm:text-lg font-medium text-foreground leading-snug"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Kalite Politikası */}
            {(data?.qualityPolicyIntro || (data?.qualityPolicyItems && data.qualityPolicyItems.length > 0)) && (
              <section id="kalite-politikasi" className="scroll-mt-28 space-y-4 pt-8 border-t border-border">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {qualityTitle}
                </h2>
                {data?.qualityPolicyIntro && (
                  <p className="text-base sm:text-lg text-foreground/85 leading-relaxed whitespace-pre-line max-w-[68ch]">
                    {data.qualityPolicyIntro}
                  </p>
                )}
                {data?.qualityPolicyItems && data.qualityPolicyItems.length > 0 && (
                  <ul className="divide-y divide-border border-y border-border">
                    {data.qualityPolicyItems.map((item, i) => (
                      <li
                        key={i}
                        className="py-4 text-base sm:text-lg font-medium text-foreground leading-snug"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
