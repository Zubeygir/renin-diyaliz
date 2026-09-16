import { SplitSection } from "@/components/ui/SplitSection";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { StatValue } from "@/components/home/StatValue";
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
  const defaultHref = locale === "en" ? "/en/about" : "/hakkimizda";
  const staffHref = locale === "en" ? "/en/team" : "/kadromuz";

  return (
    <SplitSection
      title={title || dict.nav.about}
      className="bg-background"
      aside={
        <>
          {subtitle && <p className="max-w-[40ch]">{subtitle}</p>}
          <Link
            href={ctaLink || defaultHref}
            prefetch={false}
            className="mt-4 inline-block font-medium text-primary underline-offset-4 hover:underline"
          >
            {ctaLabel || dict.common.readMore} →
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-8 items-start">
        <div className="md:col-span-3">
          {text && text.length > 0 && (
            // First paragraph is the lede; the rest settle to body size
            <RichText
              value={text}
              className="text-foreground/90 [&>p:first-child]:text-lede [&>p:first-child]:text-foreground"
            />
          )}
        </div>
        {image && (
          <div className="md:col-span-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
              <SanityImage
                image={image}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Facts: a definition list. Static by default per design-language.md; countUp is an opt-in per-item Sanity toggle. */}
      {stats && stats.length > 0 && (
        <dl className="mt-12 flex flex-nowrap gap-x-4 sm:gap-x-8 gap-y-6 border-t border-border pt-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 min-w-0">
              <dd className="font-heading text-3xl md:text-4xl font-semibold text-primary tracking-[-0.02em]">
                <StatValue value={stat.value} countUp={stat.countUp} />
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      )}

      {teamPreview && teamPreview.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="font-heading text-lg font-semibold">{dict.nav.staff}</h3>
            <Link
              href={staffHref}
              prefetch={false}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline whitespace-nowrap"
            >
              {dict.common.viewAll} →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {teamPreview.slice(0, 4).map((member, i) => (
              <li key={member._id ?? i}>
                <Link href={staffHref} prefetch={false} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                    {member.photo ? (
                      <SanityImage
                        image={member.photo}
                        fill
                        sizes="(max-width: 640px) 45vw, 160px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-heading text-2xl font-semibold text-muted-foreground">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </div>
                  <p className="mt-3 font-medium leading-snug group-hover:text-primary transition-colors">
                    {member.name}
                  </p>
                  {member.role && <p className="text-sm text-muted-foreground">{member.role}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SplitSection>
  );
}
