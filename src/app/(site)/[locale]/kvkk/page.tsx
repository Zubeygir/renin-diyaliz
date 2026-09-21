import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { kvkkPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageTitle } from "@/components/layout/PageTitle";
import { RichText } from "@/components/ui/RichText";
import { KvkkPage as KvkkPageType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const data = await cachedFetch<KvkkPageType>(kvkkPageQuery, { locale }, { next: { tags: ["kvkk"] } });

  return buildMetadata(
    {
      title: data?.pageTitle || dict.legal.kvkkDefaultTitle,
      canonicalPath: "/kvkk",
      enCanonicalPath: "/en/privacy",
      deCanonicalPath: "/de/datenschutz",
      arCanonicalPath: "/ar/privacy",
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
  const dict = getDictionary(locale);

  const data = await cachedFetch<KvkkPageType>(kvkkPageQuery, { locale }, { next: { tags: ["kvkk"] } });
  const title = data?.pageTitle || dict.legal.kvkkDefaultTitle;

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle title={title} />

      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs text-muted-foreground mb-8 pb-3 border-b border-border tabular-nums">
          {dict.common.lastUpdated} 14.09.2026
        </p>

        <div className="prose prose-slate max-w-[68ch] leading-relaxed text-foreground/90 space-y-6">
          <RichText value={data?.body} />
        </div>
      </div>
    </div>
  );
}
