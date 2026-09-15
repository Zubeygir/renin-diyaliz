import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { staffPageQuery, staffListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Button } from "@/components/ui/button";
import { RiUserLine } from "react-icons/ri";
import Link from "next/link";
import { StaffPage as StaffPageType, StaffMember, StaffGroup } from "@/types";

const GROUP_ORDER: StaffGroup[] = ["hekimler", "hemsirelik", "teknik"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const pageData = await cachedFetch<StaffPageType>(
    staffPageQuery,
    { locale },
    { next: { tags: ["staffPage"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: pageData?.heroTitle || pageData?.pageTitle || dict.nav.staff,
      canonicalPath: "/kadromuz",
      enCanonicalPath: "/en/team",
      pageSeo: pageData?.seo,
    },
    locale
  );
}

export default async function StaffHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const [staff, pageData] = await Promise.all([
    cachedFetch<StaffMember[]>(staffListQuery, { locale }, { next: { tags: ["staff:list"] } }),
    cachedFetch<StaffPageType>(staffPageQuery, { locale }, { next: { tags: ["staffPage"] } }),
  ]);

  const groups = GROUP_ORDER.map((group) => ({
    group,
    members: (staff || []).filter((member) => member.group === group),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.staff}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <div className="container mx-auto px-4 flex flex-col gap-16">
        {groups.length > 0 ? (
          groups.map(({ group, members }) => (
            <div key={group}>
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold tracking-tight mb-8">
                  {dict.staff.groups[group]}
                </h2>
              </FadeIn>
              <AnimateGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {members.map((member) => {
                  const staffHref =
                    member.hasDetailPage && member.slug
                      ? locale === "en"
                        ? `/en/team/${member.slug}`
                        : `/kadromuz/${member.slug}`
                      : undefined;

                  return (
                    <StaggerItem key={member._id} className="text-center flex flex-col items-center">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-muted/60 border flex items-center justify-center">
                        {member.photo?.asset ? (
                          <SanityImage
                            image={member.photo}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-muted-foreground/40 select-none">
                            <RiUserLine className="w-16 h-16" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-base">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                      {staffHref && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-auto text-xs"
                          render={<Link href={staffHref} prefetch={false} />}
                        >
                          {dict.staff.viewProfile}
                        </Button>
                      )}
                    </StaggerItem>
                  );
                })}
              </AnimateGroup>
            </div>
          ))
        ) : (
          <FadeIn>
            <p className="text-muted-foreground text-center py-16">
              {locale === "en" ? "No staff members listed yet." : "Henüz eklenmiş bir personel bulunmuyor."}
            </p>
          </FadeIn>
        )}

        {pageData?.ctaLabel && pageData?.ctaLink && (
          <FadeIn className="p-8 md:p-12 rounded-lg bg-primary/5 border border-primary/20 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6">
              {locale === "en" ? "If you would like to join our team, you can submit your application." : "Ekibimize katılmak isterseniz başvurunuzu iletebilirsiniz."}
            </p>
            <Button size="lg" render={<Link href={pageData.ctaLink} target="_blank" rel="noopener noreferrer" />}>
              {pageData.ctaLabel}
            </Button>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
