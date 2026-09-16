import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { serviceBySlugQuery, serviceSlugsQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { SetAlternateUrls } from "@/components/providers/AlternateUrlsContext";
import { RiArrowLeftLine } from "react-icons/ri";
import Link from "next/link";
import { Service } from "@/types";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await cachedFetch<Array<{ tr?: string; en?: string }>>(
    serviceSlugsQuery,
    {},
    { next: { tags: ["service:list"] } }
  );
  const params: { locale: string; slug: string }[] = [];
  services?.forEach((s) => {
    if (s.tr) params.push({ locale: "tr", slug: s.tr });
    if (s.en) params.push({ locale: "en", slug: s.en });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const service = await cachedFetch<Service | null>(
    serviceBySlugQuery,
    { locale, slug },
    { next: { tags: [`service:detail:${slug}`] } }
  );

  if (!service) return {};

  const trSlug = service.rawSlug?.tr?.current || slug;
  const enSlug = service.rawSlug?.en?.current || slug;

  return buildMetadata(
    {
      title: service.title,
      description: portableTextToPlainText(service.body),
      canonicalPath: `/hizmetler/${trSlug}`,
      enCanonicalPath: `/en/services/${enSlug}`,
      pageSeo: service.seo,
    },
    locale
  );
}

export default async function ServicePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const service = await cachedFetch<Service | null>(
    serviceBySlugQuery,
    { locale, slug },
    { next: { tags: [`service:detail:${slug}`] } }
  );

  if (!service) notFound();

  const trSlug = service.rawSlug?.tr?.current || slug;
  const enSlug = service.rawSlug?.en?.current || slug;
  const trPath = `/hizmetler/${trSlug}`;
  const enPath = `/en/services/${enSlug}`;

  const allServicesHref = locale === "en" ? "/en/services" : "/hizmetler";

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} />
      <JsonLd data={serviceJsonLd(service)} />
      <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl break-words overflow-x-hidden">
        <FadeIn direction="up">
          <Button
            variant="ghost"
            className="mb-8 -ml-2 gap-1.5"
            render={<Link href={allServicesHref} prefetch={false} />}
          >
            <RiArrowLeftLine size={16} />
            {dict.services.backToServices}
          </Button>
          <h1 className="text-4xl font-bold tracking-tight mb-8">{service.title}</h1>
        </FadeIn>

        {service.mainImage && (
          <FadeIn delay={0.15}>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden border mb-12">
              <SanityImage
                image={service.mainImage}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.25}>
          <RichText value={service.body} />
        </FadeIn>
      </article>
    </>
  );
}
