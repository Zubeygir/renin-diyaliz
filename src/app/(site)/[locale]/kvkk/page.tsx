import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { kvkkPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { RichText } from "@/components/ui/RichText";
import { KvkkPage as KvkkPageType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<KvkkPageType>(kvkkPageQuery, { locale }, { next: { tags: ["kvkk"] } });

  return buildMetadata(
    {
      title: data?.pageTitle || "KVKK Aydınlatma Metni",
      canonicalPath: "/kvkk",
      enCanonicalPath: "/en/privacy",
      pageSeo: data?.seo,
    },
    locale
  );
}

export default async function KvkkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<KvkkPageType>(kvkkPageQuery, { locale }, { next: { tags: ["kvkk"] } });

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <FadeIn direction="up">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          {data?.pageTitle || "KVKK Aydınlatma Metni"}
        </h1>
      </FadeIn>
      <FadeIn delay={0.15}>
        <RichText value={data?.body} />
      </FadeIn>
    </div>
  );
}
