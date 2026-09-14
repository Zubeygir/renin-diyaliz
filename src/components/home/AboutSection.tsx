import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType, Locale, StatItem } from "@/types";
import { getDictionary } from "@/lib/i18n";
import type { PortableTextBlock } from "@portabletext/react";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  text?: PortableTextBlock[];
  image?: SanityImageType;
  ctaLabel?: string;
  ctaLink?: string;
  stats?: StatItem[];
  locale?: Locale;
}

export function AboutSection({
  title,
  subtitle,
  text,
  image,
  ctaLabel,
  ctaLink,
  stats,
  locale = "tr",
}: AboutSectionProps) {
  const dict = getDictionary(locale);
  const displayTitle = title || dict.nav.about;
  const displayCtaLabel = ctaLabel || dict.common.readMore;
  const defaultHref = locale === "en" ? "/en/about" : "/hakkimizda";
  const displayCtaLink = ctaLink || defaultHref;

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sol Kolon: Metinler */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              title={displayTitle}
              subtitle={subtitle}
              align="left"
            />

            {text && text.length > 0 && (
              <FadeIn delay={0.15}>
                <RichText value={text} className="text-muted-foreground" />
              </FadeIn>
            )}

            {stats && stats.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                  {stats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.25} className="pt-4">
              <Button size="lg" render={<Link href={displayCtaLink} prefetch={false} />}>
                {displayCtaLabel}
              </Button>
            </FadeIn>
          </div>

          {/* Sağ Kolon: Görsel */}
          {image && (
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.3} className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl z-0" />
                <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-10 border bg-card">
                  <SanityImage
                    image={image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
