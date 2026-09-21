import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { staffMemberBySlugQuery, staffSlugsQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary, getLocalizedPath } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SetAlternateUrls } from "@/components/providers/AlternateUrlsContext";
import { RiUserLine } from "react-icons/ri";
import { StaffMember } from "@/types";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const staff = await cachedFetch<Array<{ tr?: string; en?: string; de?: string; ar?: string }>>(
    staffSlugsQuery,
    {},
    { next: { tags: ["staff:list"] } }
  );
  const params: { locale: string; slug: string }[] = [];
  staff?.forEach((s) => {
    if (s.tr) params.push({ locale: "tr", slug: s.tr });
    if (s.en) params.push({ locale: "en", slug: s.en });
    if (s.de) params.push({ locale: "de", slug: s.de });
    if (s.ar) params.push({ locale: "ar", slug: s.ar });
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
  const deSlug = member.rawSlug?.de?.current || member.slug || slug;
  const arSlug = member.rawSlug?.ar?.current || member.slug || slug;

  const trPath = `${getLocalizedPath("kadromuz", "tr")}/${trSlug}`;
  const enPath = `${getLocalizedPath("kadromuz", "en")}/${enSlug}`;
  const dePath = `${getLocalizedPath("kadromuz", "de")}/${deSlug}`;
  const arPath = `${getLocalizedPath("kadromuz", "ar")}/${arSlug}`;

  return buildMetadata(
    {
      title: `${member.name} - ${member.role}`,
      description: portableTextToPlainText(member.bio),
      canonicalPath: trPath,
      enCanonicalPath: enPath,
      deCanonicalPath: dePath,
      arCanonicalPath: arPath,
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
  const deSlug = member.rawSlug?.de?.current || member.slug || slug;
  const arSlug = member.rawSlug?.ar?.current || member.slug || slug;

  const trPath = `${getLocalizedPath("kadromuz", "tr")}/${trSlug}`;
  const enPath = `${getLocalizedPath("kadromuz", "en")}/${enSlug}`;
  const dePath = `${getLocalizedPath("kadromuz", "de")}/${deSlug}`;
  const arPath = `${getLocalizedPath("kadromuz", "ar")}/${arSlug}`;

  const currentPath =
    locale === "en" ? enPath : locale === "de" ? dePath : locale === "ar" ? arPath : trPath;
  const allStaffHref = getLocalizedPath("kadromuz", locale);

  const hasBio = Boolean(member.bio && member.bio.length > 0);
  const hasEducation = Boolean(member.education && member.education.length > 0);
  const hasSkills = Boolean(member.skills && member.skills.length > 0);
  const hasCertificates = Boolean(member.certificates && member.certificates.length > 0);

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} de={dePath} ar={arPath} />
      <article className="container mx-auto px-4 py-8 md:py-12 pb-20">
        <Breadcrumbs
          items={[
            { label: dict.nav.staff, href: allStaffHref },
            { label: member.name, href: currentPath, active: true },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Portre + İsim + Unvan (Sticky) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
              {member.photo?.asset ? (
                <SanityImage
                  image={member.photo}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground/30 select-none">
                  <RiUserLine className="w-16 h-16" />
                </div>
              )}
            </div>

            <div className="mt-5">
              <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-foreground">
                {member.name}
              </h1>
              <p className="text-base text-muted-foreground font-medium mt-1">
                {member.role}
              </p>
              <p className="text-sm text-primary font-medium mt-1">
                {dict.staff.groups[member.group]}
              </p>
            </div>
          </aside>

          {/* Sağ Kolon: Biyografi, Eğitim, Sertifikalar, Diller */}
          <main className="lg:col-span-8 min-w-0 space-y-10">
            {/* Biyografi */}
            {hasBio && (
              <section className="space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-2.5">
                  {dict.staff.bio}
                </h2>
                <div className="text-foreground/85 leading-relaxed space-y-4 text-base max-w-[68ch]">
                  <RichText value={member.bio} />
                </div>
              </section>
            )}

            {/* Eğitim */}
            {hasEducation && (
              <section className="space-y-3 pt-6 border-t border-border">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {dict.staff.education}
                </h2>
                <ul className="divide-y divide-border border-y border-border text-sm sm:text-base text-foreground/85">
                  {member.education!.map((item, i) => (
                    <li key={i} className="py-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Sertifikalar */}
            {hasCertificates && (
              <section className="space-y-3 pt-6 border-t border-border">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {dict.staff.certificates}
                </h2>
                <ul className="divide-y divide-border border-y border-border text-sm sm:text-base text-foreground/85">
                  {member.certificates!.map((cert, i) => (
                    <li key={i} className="py-2.5">
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Yetenekler / Diller */}
            {hasSkills && (
              <section className="space-y-2 pt-6 border-t border-border">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {dict.staff.skills}
                </h2>
                <p className="text-sm sm:text-base text-foreground/85">
                  {member.skills!.join(", ")}
                </p>
              </section>
            )}
          </main>
        </div>
      </article>
    </>
  );
}
