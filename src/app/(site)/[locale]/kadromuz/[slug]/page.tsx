import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { staffMemberBySlugQuery, staffSlugsQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { SetAlternateUrls } from "@/components/providers/AlternateUrlsContext";
import { RiUserLine, RiArrowLeftLine } from "react-icons/ri";
import Link from "next/link";
import { StaffMember } from "@/types";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const staff = await cachedFetch<Array<{ tr?: string; en?: string }>>(
    staffSlugsQuery,
    {},
    { next: { tags: ["staff:list"] } }
  );
  const params: { locale: string; slug: string }[] = [];
  staff?.forEach((s) => {
    if (s.tr) params.push({ locale: "tr", slug: s.tr });
    if (s.en) params.push({ locale: "en", slug: s.en });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const member = await cachedFetch<StaffMember | null>(
    staffMemberBySlugQuery,
    { locale, slug },
    { next: { tags: [`staff:detail:${slug}`] } }
  );

  if (!member || !member.hasDetailPage) return {};

  const trSlug = member.rawSlug?.tr?.current || member.slug || slug;
  const enSlug = member.rawSlug?.en?.current || member.slug || slug;

  return buildMetadata(
    {
      title: `${member.name} - ${member.role}`,
      description: portableTextToPlainText(member.bio),
      canonicalPath: `/kadromuz/${trSlug}`,
      enCanonicalPath: `/en/team/${enSlug}`,
      pageSeo: member.seo,
    },
    locale
  );
}

export default async function StaffDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const member = await cachedFetch<StaffMember | null>(
    staffMemberBySlugQuery,
    { locale, slug },
    { next: { tags: [`staff:detail:${slug}`] } }
  );

  if (!member || !member.hasDetailPage) notFound();

  const trSlug = member.rawSlug?.tr?.current || member.slug || slug;
  const enSlug = member.rawSlug?.en?.current || member.slug || slug;
  const trPath = `/kadromuz/${trSlug}`;
  const enPath = `/en/team/${enSlug}`;

  const allStaffHref = locale === "en" ? "/en/team" : "/kadromuz";

  const hasBio = Boolean(member.bio && member.bio.length > 0);
  const hasEducation = Boolean(member.education && member.education.length > 0);
  const hasSkills = Boolean(member.skills && member.skills.length > 0);
  const hasCertificates = Boolean(member.certificates && member.certificates.length > 0);

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} />
      <article className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <FadeIn direction="up">
          <Button
            variant="ghost"
            className="mb-8 -ml-2 gap-1.5"
            render={<Link href={allStaffHref} prefetch={false} />}
          >
            <RiArrowLeftLine size={16} />
            {dict.staff.backToStaff}
          </Button>
        </FadeIn>

        {/* Profile Header */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 p-6 md:p-8 rounded-2xl bg-muted/40 border mb-12">
            <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 rounded-xl overflow-hidden bg-muted border flex items-center justify-center">
              {member.photo?.asset ? (
                <SanityImage
                  image={member.photo}
                  fill
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground/40 select-none">
                  <RiUserLine className="w-20 h-20" />
                </div>
              )}
            </div>

            <div className="flex flex-col text-center sm:text-left justify-center flex-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                {member.name}
              </h1>
              <div className="flex flex-col items-center sm:items-start gap-2 sm:flex-row sm:gap-3">
                <p className="text-base text-muted-foreground font-medium">
                  {member.role}
                </p>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  {dict.staff.groups[member.group]}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Conditional Content Sections */}
        <div className="flex flex-col gap-10">
          {/* Bio / About */}
          {hasBio && (
            <FadeIn delay={0.15}>
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                  {dict.staff.bio}
                </h2>
                <div className="text-muted-foreground leading-relaxed">
                  <RichText value={member.bio} />
                </div>
              </section>
            </FadeIn>
          )}

          {/* Education */}
          {hasEducation && (
            <FadeIn delay={0.2}>
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                  {dict.staff.education}
                </h2>
                <ul className="space-y-2">
                  {member.education!.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {/* Skills / Specialties */}
          {hasSkills && (
            <FadeIn delay={0.25}>
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                  {dict.staff.skills}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.skills!.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-muted text-foreground border font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* Certificates */}
          {hasCertificates && (
            <FadeIn delay={0.3}>
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                  {dict.staff.certificates}
                </h2>
                <ul className="space-y-2">
                  {member.certificates!.map((cert, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}
        </div>
      </article>
    </>
  );
}
