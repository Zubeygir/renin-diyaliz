import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/CountUp";
import Link from "next/link";
import { SanityImage as SanityImageType, Locale, StatItem, StaffPreviewItem } from "@/types";
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
  teamPreview?: StaffPreviewItem[];
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
  teamPreview,
  locale = "tr",
}: AboutSectionProps) {
  const dict = getDictionary(locale);
  const displayTitle = title || dict.nav.about;
  const displayCtaLabel = ctaLabel || dict.common.readMore;
  const defaultHref = locale === "en" ? "/en/about" : "/hakkimizda";
  const displayCtaLink = ctaLink || defaultHref;
  const staffHref = locale === "en" ? "/en/team" : "/kadromuz";

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Sol Kolon: Metinler */}
          <div className="lg:col-span-8 space-y-6">
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
                      <div className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                        <CountUp value={stat.value} />
                      </div>
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

            {teamPreview && teamPreview.length > 0 && (
              <FadeIn delay={0.3} className="flex flex-wrap items-center gap-4 pt-6 border-t border-border">
                <div className="flex items-center -space-x-3">
                  {teamPreview.map((member, i) => (
                    <Link
                      key={member._id ?? i}
                      href={staffHref}
                      prefetch={false}
                      title={member.name}
                      className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 border-background bg-muted ring-1 ring-border transition-transform hover:z-10 hover:scale-105"
                    >
                      {member.photo ? (
                        <SanityImage image={member.photo} fill sizes="48px" className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
                          {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
                <Link
                  href={staffHref}
                  prefetch={false}
                  className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                >
                  {dict.nav.staff} →
                </Link>
              </FadeIn>
            )}
          </div>

          {/* Sağ Kolon: Görsel */}
          {image && (
            <div className="lg:col-span-4 relative">
              <FadeIn direction="left" delay={0.3} className="relative max-w-xs mx-auto lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl z-0" />
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-10 border bg-card">
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
