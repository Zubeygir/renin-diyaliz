import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { PageHero } from "@/components/layout/PageHero";
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
  const contentTitle = data?.pageTitle || dict.nav.about;

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      {/* Page Hero */}
      <PageHero
        title={title}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Metin İçeriği */}
          <div className="lg:col-span-7">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                {contentTitle}
              </h2>
            </FadeIn>

            {data?.pageSubtitle && (
              <FadeIn delay={0.15}>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                  {data.pageSubtitle}
                </p>
              </FadeIn>
            )}

            <FadeIn delay={0.2}>
              <RichText value={data?.body} />
            </FadeIn>
          </div>

          {/* Sağ Kolon: Görsel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            {data?.mainImage && (
              <FadeIn direction="left" delay={0.3} className="relative max-w-sm mx-auto lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl z-0" />
                <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-10 border bg-card">
                  <SanityImage
                    image={data.mainImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
