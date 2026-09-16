import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
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
              {services.slice(0, 3).map((service: Service, i) => {
                const serviceHref = locale === "en"
                  ? `/en/services/${service.slug}`
                  : `/hizmetler/${service.slug}`;

                return (
                  <StaggerItem key={service.slug ?? i}>
                    <Link href={serviceHref} prefetch={false} className="group block h-full">
                      <article className="h-full flex flex-col overflow-hidden rounded-xl border bg-card transition-colors duration-300 hover:border-primary/40">
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
                            <span className="text-primary font-semibold text-xs tracking-wider uppercase flex items-center">
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
