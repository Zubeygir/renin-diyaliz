import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Service, Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  locale?: Locale;
}

export function ServicesSection({
  title,
  subtitle,
  services = [],
  locale = "tr",
}: ServicesSectionProps) {
  const dict = getDictionary(locale);
  const displayTitle = title || dict.common.allServices;
  const displaySubtitle = subtitle;
  const allServicesHref = locale === "en" ? "/en/services" : "/hizmetler";

  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <SectionHeading
          title={displayTitle}
          subtitle={displaySubtitle}
          className="mb-16"
        />

        {/* Content */}
        {services && services.length > 0 ? (
          <div className="space-y-12">
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service: Service) => {
                const serviceHref = locale === "en"
                  ? `/en/services/${service.slug?.current}`
                  : `/hizmetler/${service.slug?.current}`;

                return (
                  <Link key={service.slug?.current} href={serviceHref} prefetch={false} className="group block">
                    <article className="border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                      {service.mainImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <SanityImage
                            image={service.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {service.title}
                          </h3>
                        </div>
                        <div className="mt-6">
                          <span className="text-primary font-semibold text-xs tracking-wider uppercase group-hover:underline underline-offset-4 flex items-center">
                            {dict.common.viewDetail}
                            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </AnimateGroup>
            
            <FadeIn delay={0.2} className="text-center pt-4">
              <Button variant="outline" size="lg" render={<Link href={allServicesHref} prefetch={false} />}>
                {dict.common.allServices}
              </Button>
            </FadeIn>
          </div>
        ) : null}

      </div>
    </section>
  );
}
