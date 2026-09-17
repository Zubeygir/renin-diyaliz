import { Metadata } from "next";
import Link from "next/link";
import { cachedFetch } from "@/sanity/lib/client";
import { servicesPageQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageTitle } from "@/components/layout/PageTitle";
import { SanityImage } from "@/components/ui/SanityImage";
import { ServicesPage as ServicesPageType, Service } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const pageData = await cachedFetch<ServicesPageType>(
    servicesPageQuery,
    { locale },
    { next: { tags: ["servicesPage"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: pageData?.heroTitle || pageData?.pageTitle || dict.nav.services,
      canonicalPath: "/hizmetler",
      enCanonicalPath: "/en/services",
      pageSeo: pageData?.seo,
    },
    locale
  );
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const [services, pageData, layoutData] = await Promise.all([
    cachedFetch<Service[]>(serviceListQuery, { locale }, { next: { tags: ["service:list"] } }),
    cachedFetch<ServicesPageType>(servicesPageQuery, { locale }, { next: { tags: ["servicesPage"] } }),
    getLayoutData(locale),
  ]);

  const phone = layoutData?.settings?.contactInfo?.phone;

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.services}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
      />

      <div className="container mx-auto px-4">
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {services.map((service: Service, idx: number) => {
              const serviceHref = service.slug
                ? (locale === "en"
                    ? `/en/services/${service.slug}`
                    : `/hizmetler/${service.slug}`)
                : "#";

              return (
                <article key={service._id ?? service.slug ?? idx}>
                  <Link href={serviceHref} prefetch={false} className="group block">
                    <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-muted border border-border">
                      {service.mainImage && (
                        <SanityImage
                          image={service.mainImage}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                        />
                      )}
                    </div>

                    <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors mt-5">
                      {service.title}
                    </h2>
                    {service.excerpt && (
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-2 line-clamp-2">
                        {service.excerpt}
                      </p>
                    )}
                    <div className="mt-4">
                      <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:underline">
                        {dict.common.viewDetail}
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-16">
            {dict.services.noServicesFound}
          </p>
        )}

        {/* SGK, Servis ve İletişim Bilgi Bloğu (Jenerik CTA kutusu yerine) */}
        <div className="mt-16 pt-10 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-md border border-border bg-card">
            <h3 className="font-heading font-semibold text-base text-foreground mb-2">
              {locale === "en" ? "Social Security (SGK)" : "Sosyal Güvence (SGK)"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "en"
                ? "Hemodialysis treatments are provided in full compliance with SGK and contracted private health insurances."
                : "Merkezimizdeki tüm hemodiyaliz tedavileri SGK ve anlaşmalı özel sağlık sigortaları kapsamında yürütülmektedir."}
            </p>
          </div>

          <div className="p-6 rounded-md border border-border bg-card">
            <h3 className="font-heading font-semibold text-base text-foreground mb-2">
              {locale === "en" ? "Patient Transport" : "Hasta Nakil / Servis"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "en"
                ? "Scheduled door-to-door transportation for patients along defined district routes on treatment days."
                : "Tedavi günlerinde hastalarımızın ulaşımı, belirlenen ilçe güzergâhlarında ücretsiz servis araçlarımızla sağlanır."}
            </p>
          </div>

          <div className="p-6 rounded-md border border-border bg-card flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-semibold text-base text-foreground mb-2">
                {locale === "en" ? "Direct Consultation" : "Tedavi ve Başvuru"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {locale === "en"
                  ? "Contact our clinical coordinators directly for admission and session scheduling."
                  : "Tedavi kabul süreçleri ve seans planlaması için merkezimizle doğrudan irtibat kurabilirsiniz."}
              </p>
            </div>
            {phone && (
              <div className="pt-4 border-t border-border mt-4">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="font-heading font-semibold text-lg text-primary hover:underline tabular-nums"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
