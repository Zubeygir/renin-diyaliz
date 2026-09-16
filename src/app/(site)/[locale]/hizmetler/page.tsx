import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { servicesPageQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

  const [services, pageData] = await Promise.all([
    cachedFetch<Service[]>(serviceListQuery, { locale }, { next: { tags: ["service:list"] } }),
    cachedFetch<ServicesPageType>(servicesPageQuery, { locale }, { next: { tags: ["servicesPage"] } }),
  ]);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      {/* Page Hero */}
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.services}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <div className="container mx-auto px-4">
        {services && services.length > 0 ? (
          <AnimateGroup className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
            {services.map((service: Service) => {
              const serviceHref = locale === "en"
                ? `/en/services/${service.slug}`
                : `/hizmetler/${service.slug}`;

              return (
                <StaggerItem key={service.slug}>
                  <Link href={serviceHref} prefetch={false} className="group block h-full">
                    <article className="h-full flex flex-col overflow-hidden rounded-xl border bg-card transition-colors duration-300 hover:border-primary/40">
                      {service.mainImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <SanityImage
                            image={service.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h2 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {service.title}
                          </h2>
                        </div>
                        <div className="mt-6">
                          <span className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center">
                            {dict.common.viewDetail}
                            <span className="ml-1">→</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              );
            })}
          </AnimateGroup>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground text-center py-16">
              {dict.services.noServicesFound}
            </p>
          </FadeIn>
        )}

        {/* CTA Section */}
        {pageData?.ctaLabel && pageData?.ctaLink && (
          <FadeIn className="mt-16 md:mt-24 p-8 md:p-12 rounded-lg bg-primary/5 border border-primary/20 text-center max-w-2xl mx-auto">
            {pageData?.pageSubtitle && (
              <p className="text-muted-foreground mb-8">{pageData.pageSubtitle}</p>
            )}
            <Button size="lg" render={<Link href={pageData.ctaLink} prefetch={false} />}>
              {pageData.ctaLabel}
            </Button>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
