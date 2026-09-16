import { Metadata } from "next";
import Link from "next/link";
import { cachedFetch } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { PageTitle } from "@/components/layout/PageTitle";
import { AboutPage as AboutPageType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<AboutPageType>(
    aboutPageQuery,
    { locale },
    { next: { tags: ["about"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: data?.heroTitle || data?.pageTitle || dict.nav.about,
      canonicalPath: "/hakkimizda",
      enCanonicalPath: "/en/about",
      pageSeo: data?.seo,
    },
    locale
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const data = await cachedFetch<AboutPageType>(
    aboutPageQuery,
    { locale },
    { next: { tags: ["about"] } }
  );

  const title = data?.heroTitle || data?.pageTitle || dict.nav.about;
  const facts = data?.facts ?? [];

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={title}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        image={data?.mainImage || data?.heroImage}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Kurumsal Künye dl (Sticky) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
            {facts.length > 0 && (
              <div className="border border-border rounded-md p-6 bg-card">
                <h2 className="font-heading text-base font-semibold text-foreground mb-4">
                  {locale === "en" ? "Institutional Facts" : "Kurumsal Künye"}
                </h2>
                <dl className="divide-y divide-border text-sm">
                  {facts.map((fact, idx) => (
                    <div key={idx} className="py-2.5 flex flex-col gap-0.5">
                      <dt className="text-xs text-muted-foreground font-medium">{fact.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="pt-1">
              <Link
                href={locale === "en" ? "/en/mission-vision-values" : "/misyon-vizyon-degerler"}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
              >
                {locale === "en" ? "Mission, Vision & Quality Policy" : "Misyon, Vizyon ve Kalite Politikası"}
                <span>→</span>
              </Link>
            </div>
          </aside>

          {/* Sağ Kolon: Detaylı Metin İçeriği */}
          <main className="lg:col-span-8 min-w-0">
            <div className="max-w-[68ch] space-y-6 text-base leading-relaxed text-foreground/90">
              <RichText value={data?.body} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
