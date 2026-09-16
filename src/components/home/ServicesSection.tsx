import { SplitSection } from "@/components/ui/SplitSection";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
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
  const allServicesHref = locale === "en" ? "/en/services" : "/hizmetler";

  if (!services || services.length === 0) return null;

  return (
    <SplitSection
      title={title || dict.nav.services}
      className="bg-background border-t border-border"
      aside={
        <>
          {subtitle && <p className="max-w-[40ch]">{subtitle}</p>}
          <Link
            href={allServicesHref}
            prefetch={false}
            className="mt-4 inline-block font-medium text-primary underline-offset-4 hover:underline"
          >
            {dict.common.allServices} →
          </Link>
        </>
      }
    >
      {/* Rows, not cards: three services of different nature don't belong in equal tiles */}
      <AnimateGroup stagger={0.1} className="border-t border-border">
        {services.slice(0, 4).map((service: Service, i) => {
          const serviceHref = locale === "en"
            ? `/en/services/${service.slug}`
            : `/hizmetler/${service.slug}`;

          return (
            <StaggerItem key={service.slug ?? i} className="border-b border-border">
              <Link
                href={serviceHref}
                prefetch={false}
                className="group grid grid-cols-[5.5rem_1fr] md:grid-cols-[9rem_1fr_auto] items-center gap-x-6 md:gap-x-8 py-6 md:py-7"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                  {service.mainImage && (
                    <SanityImage
                      image={service.mainImage}
                      fill
                      sizes="(max-width: 768px) 88px, 144px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  {service.excerpt && (
                    <p className="mt-2 text-muted-foreground max-w-[60ch]">{service.excerpt}</p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="hidden md:block text-2xl text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                >
                  →
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </AnimateGroup>
    </SplitSection>
  );
}
