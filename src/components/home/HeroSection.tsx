import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { getDictionary, getLocalizedPath } from "@/lib/i18n";
import {
  SanityImage as SanityImageType,
  SanityFile,
  CtaLink,
  Locale,
  ContactInfo,
  WorkingHourItem,
} from "@/types";

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
  contact?: ContactInfo;
  workingHours?: WorkingHourItem[];
  locale?: Locale;
}

export function resolveLink(linkData?: CtaLink, locale: Locale = "tr") {
  const homePath = getLocalizedPath("home", locale);
  if (!linkData) return homePath;
  if (linkData.linkType === "manual") return linkData.manual || homePath;

  const ref = linkData.internal;
  if (!ref || !ref._type) return homePath;

  switch (ref._type) {
    case "service": return `${getLocalizedPath("hizmetler", locale)}/${ref.slug}`;
    case "project": return `${getLocalizedPath("projeler", locale)}/${ref.slug}`;
    case "blogPost": return `${getLocalizedPath("blog", locale)}/${ref.slug}`;
    case "aboutPage": return getLocalizedPath("hakkimizda", locale);
    case "contactPage": return getLocalizedPath("iletisim", locale);
    default: return homePath;
  }
}

export function HeroSection({ data, contact, workingHours, locale = "tr" }: HeroSectionProps) {
  const dict = getDictionary(locale);
  const posterUrl = data?.heroImage ? urlForImage(data.heroImage)?.width(1920).quality(80).url() : undefined;
  const hasUtility = Boolean(contact?.phone || contact?.address || (workingHours && workingHours.length > 0));

  return (
    <section className="relative">
      <div className="relative min-h-[85svh] flex items-end bg-ink">
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
            {/* Ink-tinted scrim anchored bottom-left so the top of the footage stays clean */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 pt-40 pb-16 md:pb-24">
          <FadeIn direction="up" distance={12} duration={0.7}>
            {data?.heroTitle && (
              <h1 className="text-display font-semibold text-white max-w-[18ch]">
                {data.heroTitle}
              </h1>
            )}
            {data?.heroSubtitle && (
              <p className="text-lede text-white/85 mt-6 max-w-[52ch]">
                {data.heroSubtitle}
              </p>
            )}
            {(data?.heroCtaLabel || data?.heroCtaLabel2) && (
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
                {data?.heroCtaLabel && (
                  <Button
                    size="lg"
                    className="h-12 px-6 text-base"
                    render={<Link href={resolveLink(data?.heroCtaLink, locale)} prefetch={false} />}
                  >
                    {data.heroCtaLabel}
                  </Button>
                )}
                {data?.heroCtaLabel2 && (
                  <Link
                    href={resolveLink(data?.heroCtaLink2, locale)}
                    prefetch={false}
                    className="text-base font-medium text-white underline-offset-8 decoration-white/40 hover:underline"
                  >
                    {data.heroCtaLabel2} →
                  </Link>
                )}
              </div>
            )}
          </FadeIn>
        </div>
      </div>

      {/* Utility strip: what a patient or relative actually came for */}
      {hasUtility && (
        <div className="bg-teal-deep text-white">
          <dl className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {contact?.phone && (
              <div className="py-5 md:pr-8">
                <dt className="text-xs uppercase tracking-wide text-white/60">{dict.contact.phone}</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4 font-heading text-lg font-semibold">
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:underline underline-offset-4" dir="ltr">
                    {contact.phone}
                  </a>
                  {contact.phone2 && (
                    <a href={`tel:${contact.phone2.replace(/\s+/g, "")}`} className="hover:underline underline-offset-4" dir="ltr">
                      {contact.phone2}
                    </a>
                  )}
                </dd>
              </div>
            )}
            {workingHours && workingHours.length > 0 && (
              <div className="py-5 md:px-8">
                <dt className="text-xs uppercase tracking-wide text-white/60">{dict.common.workingHours}</dt>
                <dd className="mt-1 text-sm leading-relaxed">
                  {workingHours.map((row, i) => (
                    <span key={i} className="block">
                      <span className="text-white/75">{row.days}</span>{" "}
                      <span className="font-medium">{row.hours}</span>
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {contact?.address && (
              <div className="py-5 md:pl-8">
                <dt className="text-xs uppercase tracking-wide text-white/60">{dict.contact.address}</dt>
                <dd className="mt-1 text-sm leading-relaxed">
                  {contact.address}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 font-medium whitespace-nowrap underline underline-offset-4 decoration-white/40 hover:decoration-white"
                  >
                    {dict.common.getDirections} →
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </section>
  );
}
