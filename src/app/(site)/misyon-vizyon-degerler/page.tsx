import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { missionVisionPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { RichText } from "@/components/ui/RichText";
import { MissionVisionPage as MissionVisionPageType } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<MissionVisionPageType>(missionVisionPageQuery, {}, { next: { tags: ["missionVision"] } });
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "Misyon, Vizyon, Değerler ve Kalite Politikası",
    canonicalPath: "/misyon-vizyon-degerler",
    pageSeo: data?.seo,
  });
}

export default async function MissionVisionPage() {
  const data = await cachedFetch<MissionVisionPageType>(missionVisionPageQuery, {}, { next: { tags: ["missionVision"] } });

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "Misyon, Vizyon, Değerler ve Kalite Politikası"}
        subtitle={data?.heroSubtitle}
        backgroundImage={data?.heroImage}
      />

      <div className="container mx-auto px-4 max-w-3xl flex flex-col gap-12 md:gap-16">
        {(data?.missionText || data?.visionText) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {data?.missionText && (
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold tracking-tight mb-3">{data.missionTitle || "Misyonumuz"}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{data.missionText}</p>
              </FadeIn>
            )}
            {data?.visionText && (
              <FadeIn direction="up" delay={0.1}>
                <h2 className="text-2xl font-bold tracking-tight mb-3">{data.visionTitle || "Vizyonumuz"}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{data.visionText}</p>
              </FadeIn>
            )}
          </div>
        )}

        {data?.values && data.values.length > 0 && (
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold tracking-tight mb-4">{data.valuesTitle || "Temel Değerlerimiz"}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.values.map((value, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {value}
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        {data?.qualityPolicyText && (
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold tracking-tight mb-4">{data.qualityPolicyTitle || "Kalite Politikamız"}</h2>
            <RichText value={data.qualityPolicyText} />
          </FadeIn>
        )}
      </div>
    </div>
  );
}
