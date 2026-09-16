import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { serviceBySlugQuery, serviceSlugsQuery, siblingServicesQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText, getLayoutData } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SetAlternateUrls } from "@/components/providers/AlternateUrlsContext";
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

  const [service, allServices, layoutData] = await Promise.all([
    cachedFetch<Service | null>(
      serviceBySlugQuery,
      { locale, slug },
      { next: { tags: [`service:detail:${slug}`] } }
    ),
    cachedFetch<Array<{ _id?: string; title: string; slug: string }>>(
      siblingServicesQuery,
      { locale },
      { next: { tags: ["service:list"] } }
    ),
    getLayoutData(locale),
  ]);

  if (!service) notFound();

  const trSlug = service.rawSlug?.tr?.current || slug;
  const enSlug = service.rawSlug?.en?.current || slug;
  const trPath = `/hizmetler/${trSlug}`;
  const enPath = `/en/services/${enSlug}`;

  const allServicesHref = locale === "en" ? "/en/services" : "/hizmetler";
  const phone = layoutData?.settings?.contactInfo?.phone;
  const otherServices = (allServices ?? []).filter((s) => s.slug !== slug);

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} />
      <JsonLd data={serviceJsonLd(service)} />

      <article className="container mx-auto px-4 py-8 md:py-12 pb-20">
        <Breadcrumbs
          items={[
            { label: dict.nav.services, href: allServicesHref },
            { label: service.title, href: locale === "en" ? enPath : trPath, active: true },
          ]}
          className="mb-8"
        />

        <header className="max-w-4xl mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.025em] text-foreground leading-[1.15]">
            {service.title}
          </h1>
        </header>

        {service.mainImage && (
          <div className="relative aspect-[21/9] w-full rounded-md overflow-hidden border border-border mb-12 bg-muted">
            <SanityImage
              image={service.mainImage}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Detay İskeleti: Sol 8 prose, Sağ 4 sticky yan panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <main className="lg:col-span-8 min-w-0">
            <div className="prose prose-slate max-w-[68ch] leading-relaxed text-foreground/90 space-y-6">
              <RichText value={service.body} />
            </div>
          </main>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
            {/* Sosyal Güvence & Başvuru Kutusu */}
            <div className="border border-border rounded-md p-6 bg-card space-y-4">
              <h3 className="font-heading font-semibold text-base text-foreground">
                {locale === "en" ? "Service Information" : "Hizmet Bilgileri"}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {locale === "en"
                      ? "Fully contracted under SGK and private insurances."
                      : "SGK ve anlaşmalı özel sağlık sigortaları kapsamındadır."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {locale === "en"
                      ? "Free scheduled door-to-door patient shuttle."
                      : "Tedavi günlerinde ücretsiz hasta servis imkânı sunulmaktadır."}
                  </span>
                </div>
              </div>

              {phone && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    {locale === "en" ? "Direct Admission / Phone" : "Doğrudan Başvuru / Danışma"}
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="font-heading font-semibold text-base text-primary hover:underline tabular-nums block"
                  >
                    {phone}
                  </a>
                </div>
              )}
            </div>

            {/* Diğer Hizmetler Linkleri */}
            {otherServices.length > 0 && (
              <div className="border border-border rounded-md p-6 bg-card">
                <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                  {locale === "en" ? "Other Services" : "Diğer Hizmetlerimiz"}
                </h3>
                <nav className="divide-y divide-border">
                  {otherServices.map((s, idx) => {
                    const siblingHref =
                      locale === "en" ? `/en/services/${s.slug}` : `/hizmetler/${s.slug}`;
                    return (
                      <Link
                        key={s._id ?? s.slug ?? idx}
                        href={siblingHref}
                        prefetch={false}
                        className="py-2.5 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {s.title}
                        </span>
                        <span className="text-primary text-xs">→</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
