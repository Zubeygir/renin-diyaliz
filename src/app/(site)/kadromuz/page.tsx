import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { staffPageQuery, staffListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StaffPage as StaffPageType, StaffMember, StaffGroup } from "@/types";

const GROUP_LABELS: Record<StaffGroup, string> = {
  hekimler: "Hekimler",
  hemsirelik: "Hemşirelik",
  teknik: "Teknik Personel",
};

const GROUP_ORDER: StaffGroup[] = ["hekimler", "hemsirelik", "teknik"];

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await cachedFetch<StaffPageType>(staffPageQuery, {}, { next: { tags: ["staffPage"] } });
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Kadromuz",
    canonicalPath: "/kadromuz",
    pageSeo: pageData?.seo,
  });
}

export default async function StaffHubPage() {
  const [staff, pageData] = await Promise.all([
    cachedFetch<StaffMember[]>(staffListQuery, {}, { next: { tags: ["staff:list"] } }),
    cachedFetch<StaffPageType>(staffPageQuery, {}, { next: { tags: ["staffPage"] } }),
  ]);

  const groups = GROUP_ORDER.map((group) => ({
    group,
    members: (staff || []).filter((member) => member.group === group),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Kadromuz"}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <div className="container mx-auto px-4 flex flex-col gap-16">
        {groups.length > 0 ? (
          groups.map(({ group, members }) => (
            <div key={group}>
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold tracking-tight mb-8">{GROUP_LABELS[group]}</h2>
              </FadeIn>
              <AnimateGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {members.map((member) => (
                  <StaggerItem key={member._id} className="text-center">
                    {member.photo?.asset && (
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                        <SanityImage
                          image={member.photo}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </StaggerItem>
                ))}
              </AnimateGroup>
            </div>
          ))
        ) : (
          <FadeIn>
            <p className="text-muted-foreground text-center py-16">Henüz eklenmiş bir personel bulunmuyor.</p>
          </FadeIn>
        )}

        {pageData?.ctaLabel && pageData?.ctaLink && (
          <FadeIn className="p-8 md:p-12 rounded-lg bg-muted border text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6">
              Ekibimize katılmak isterseniz başvurunuzu iletebilirsiniz.
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
