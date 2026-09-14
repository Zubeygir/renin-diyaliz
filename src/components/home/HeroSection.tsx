import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType, CtaLink, Locale } from "@/types";

interface HeroSectionProps {
  data: {
    heroImage?: SanityImageType;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroCtaLink?: CtaLink;
  };
  locale?: Locale;
}

export function resolveLink(linkData?: CtaLink, locale: Locale = "tr") {
  if (!linkData) return locale === "en" ? "/en" : "/";
  if (linkData.linkType === "manual") return linkData.manual || (locale === "en" ? "/en" : "/");

  const ref = linkData.internal;
  if (!ref || !ref._type) return locale === "en" ? "/en" : "/";

  const isEn = locale === "en";
  switch (ref._type) {
    case "service": return isEn ? `/en/services/${ref.slug}` : `/hizmetler/${ref.slug}`;
    case "project": return isEn ? `/en/projects/${ref.slug}` : `/projeler/${ref.slug}`;
    case "blogPost": return isEn ? `/en/blog/${ref.slug}` : `/blog/${ref.slug}`;
    case "aboutPage": return isEn ? `/en/about` : `/hakkimizda`;
    case "contactPage": return isEn ? `/en/contact` : `/iletisim`;
    default: return isEn ? "/en" : "/";
  }
}

export function HeroSection({ data, locale = "tr" }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {data?.heroImage && (
        <div className="absolute inset-0 z-0">
          <SanityImage
            image={data.heroImage}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-24">
        <FadeIn direction="up" duration={0.7}>
          {data?.heroTitle && (
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">
              {data.heroTitle}
            </h1>
          )}
          {data?.heroSubtitle && (
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              {data.heroSubtitle}
            </p>
          )}
          {data?.heroCtaLabel && (
            <div className="pt-2">
              <Button size="lg" render={<Link href={resolveLink(data?.heroCtaLink, locale)} prefetch={false} />}>
                {data.heroCtaLabel}
              </Button>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
