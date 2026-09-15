import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage as SanityImageType, SanityFile, CtaLink, Locale } from "@/types";

interface HeroSectionProps {
  data: {
    heroImage?: SanityImageType;
    heroVideo?: SanityFile;
    heroVideoWebm?: SanityFile;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroCtaLink?: CtaLink;
    heroCtaLabel2?: string;
    heroCtaLink2?: CtaLink;
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
  const posterUrl = data?.heroImage ? urlForImage(data.heroImage)?.width(1920).quality(80).url() : undefined;

  return (
    <section className="relative min-h-dvh flex items-center">
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
          {(data?.heroVideo?.asset?.url || data?.heroVideoWebm?.asset?.url) && (
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              poster={posterUrl}
              autoPlay
              muted
              loop
              playsInline
            >
              {data.heroVideoWebm?.asset?.url && (
                <source src={data.heroVideoWebm.asset.url} type="video/webm" />
              )}
              {data.heroVideo?.asset?.url && (
                <source src={data.heroVideo.asset.url} type="video/mp4" />
              )}
            </video>
          )}
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
          {(data?.heroCtaLabel || data?.heroCtaLabel2) && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {data?.heroCtaLabel && (
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/50 bg-white/0 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  render={<Link href={resolveLink(data?.heroCtaLink, locale)} prefetch={false} />}
                >
                  {data.heroCtaLabel}
                </Button>
              )}
              {data?.heroCtaLabel2 && (
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/50 bg-white/0 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  render={<Link href={resolveLink(data?.heroCtaLink2, locale)} prefetch={false} />}
                >
                  {data.heroCtaLabel2}
                </Button>
              )}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
