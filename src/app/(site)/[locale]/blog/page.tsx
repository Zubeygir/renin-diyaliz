import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { blogListQuery, blogCategoriesQuery, blogPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { PageTitle } from "@/components/layout/PageTitle";
import { BlogPage as BlogPageType, BlogPost, BlogCategory } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const pageData = await cachedFetch<BlogPageType>(
    blogPageQuery,
    { locale },
    { next: { tags: ["blogPage"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: pageData?.heroTitle || pageData?.pageTitle || dict.nav.blog,
      canonicalPath: "/blog",
      enCanonicalPath: "/en/blog",
      pageSeo: pageData?.seo,
    },
    locale
  );
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const [posts, categories, pageData] = await Promise.all([
    cachedFetch<BlogPost[]>(blogListQuery, { locale }, { next: { tags: ["blog:list", "blog:categories"] } }),
    cachedFetch<BlogCategory[]>(blogCategoriesQuery, { locale }, { next: { tags: ["blog:categories"] } }),
    cachedFetch<BlogPageType>(blogPageQuery, { locale }, { next: { tags: ["blogPage"] } }),
  ]);

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.blog}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
      />

      <div className="container mx-auto px-4">
        <BlogFilter posts={posts} categories={categories} locale={locale} />
      </div>
    </div>
  );
}
