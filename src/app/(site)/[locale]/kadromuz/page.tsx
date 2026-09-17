import { Metadata } from "next";
import Link from "next/link";
import { cachedFetch } from "@/sanity/lib/client";
import { staffPageQuery, staffListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageTitle } from "@/components/layout/PageTitle";
import { SanityImage } from "@/components/ui/SanityImage";
import { RiUserLine } from "react-icons/ri";
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
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.staff}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
      />

      <div className="container mx-auto px-4 flex flex-col gap-16 md:gap-20">
        {groups.length > 0 ? (
          groups.map(({ group, members }) => {
            return (
              <section
                key={group}
                className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 pt-10 border-t border-border first:pt-0 first:border-t-0"
              >
                {/* Sol Kolon: Grup Bilgisi (Sticky) */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                  <h2 className="font-heading text-2xl font-semibold text-foreground tracking-[-0.015em]">
                    {dict.staff.groups[group]}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1.5 tabular-nums">
                    {members.length} {locale === "en" ? "members" : "kişi"}
                  </p>
                </div>

                {/* Sağ Kolon: Kart Grid'i */}
                <div className="lg:col-span-8 min-w-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {members.map((member) => {
                      const staffHref =
                        member.hasDetailPage && member.slug
                          ? locale === "en"
                            ? `/en/team/${member.slug}`
                            : `/kadromuz/${member.slug}`
                          : undefined;

                      const cardContent = (
                        <div className="flex flex-col">
                          <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden mb-3 bg-muted border border-border flex items-center justify-center">
                            {member.photo?.asset ? (
                              <SanityImage
                                image={member.photo}
                                fill
                                sizes="(max-width: 640px) 50vw, 260px"
                                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-muted-foreground/30 select-none">
                                <RiUserLine className="w-12 h-12" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            <span>{member.name}</span>
                            {staffHref && (
                              <span className="text-primary text-xs transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-snug mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      );

                      if (staffHref) {
                        return (
                          <Link
                            key={member._id}
                            href={staffHref}
                            prefetch={false}
                            className="group block"
                          >
                            {cardContent}
                          </Link>
                        );
                      }

                      return (
                        <div key={member._id} className="group block">
                          {cardContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })
        ) : (
          <p className="text-muted-foreground text-center py-16">
            {locale === "en" ? "No staff members listed yet." : "Henüz eklenmiş bir personel bulunmuyor."}
          </p>
        )}

        {/* CTA: Ortalı kutu yerine sade alt satır */}
        {pageData?.ctaLabel && pageData?.ctaLink && (
          <div className="border-t border-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-muted-foreground text-center sm:text-left">
              {locale === "en"
                ? "If you would like to join our clinical and technical team, please send your application."
                : "Sağlık ve teknik ekibimize katılmak isterseniz başvurunuzu iletebilirsiniz."}
            </p>
            <Link
              href={pageData.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline shrink-0 gap-1"
            >
              <span>{pageData.ctaLabel}</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
