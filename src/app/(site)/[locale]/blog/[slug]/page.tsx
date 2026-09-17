import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogSlugsQuery, blogRelatedPostsQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { SetAlternateUrls } from "@/components/providers/AlternateUrlsContext";
import { BlogPost } from "@/types";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await cachedFetch<Array<{ tr?: string; en?: string }>>(
    blogSlugsQuery,
    {},
    { next: { tags: ["blog:list"] } }
  );
  const params: { locale: string; slug: string }[] = [];
  posts?.forEach((post) => {
    if (post.tr) params.push({ locale: "tr", slug: post.tr });
    if (post.en) params.push({ locale: "en", slug: post.en });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const post = await cachedFetch<BlogPost | null>(
    blogPostBySlugQuery,
    { locale, slug },
    { next: { tags: [`blog:detail:${slug}`, "blog:categories"] } }
  );

  if (!post) return {};

  const trSlug = post.rawSlug?.tr?.current || slug;
  const enSlug = post.rawSlug?.en?.current || slug;

  const baseSeo = await buildMetadata(
    {
      title: post.title,
      description: post.excerpt,
      canonicalPath: `/blog/${trSlug}`,
      enCanonicalPath: `/en/blog/${enSlug}`,
      pageSeo: post.seo,
    },
    locale
  );

  if (post.seoTags?.length) {
    baseSeo.keywords = post.seoTags;
  }

  return baseSeo;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";

  const [post, layoutData] = await Promise.all([
    cachedFetch<BlogPost | null>(
      blogPostBySlugQuery,
      { locale, slug },
      { next: { tags: [`blog:detail:${slug}`, "blog:categories"] } }
    ),
    getLayoutData(locale),
  ]);

  if (!post) notFound();

  const trSlug = post.rawSlug?.tr?.current || slug;
  const enSlug = post.rawSlug?.en?.current || slug;
  const trPath = `/blog/${trSlug}`;
  const enPath = `/en/blog/${enSlug}`;

  let relatedPosts: BlogPost[] = [];
  if (post.category?._id) {
    relatedPosts = await cachedFetch<BlogPost[]>(
      blogRelatedPostsQuery,
      { locale, categoryId: post.category._id, currentPostId: post._id },
      { next: { tags: [`blog:related:${post.category._id}`] } }
    );
  }

  const blogIndexHref = locale === "en" ? "/en/blog" : "/blog";
  const authorText = post.author?.name
    ? `${post.author.title ? `${post.author.title} ` : ""}${post.author.name}`
    : null;

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} />
      <JsonLd data={articleJsonLd(post, layoutData?.settings)} />

      <article className="container mx-auto px-4 py-8 md:py-12 pb-20 break-words">
        <Breadcrumbs
          items={[
            { label: dict.nav.blog, href: blogIndexHref },
            { label: post.title, href: locale === "en" ? enPath : trPath, active: true },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {relatedPosts?.length > 0 && (
            <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start order-2 lg:order-1">
              <div className="border border-border rounded-md p-6 bg-card">
                <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                  {dict.common.relatedPosts}
                </h3>
                <nav className="divide-y divide-border">
                  {relatedPosts.map((rPost: BlogPost) => {
                    const rPostHref =
                      locale === "en" ? `/en/blog/${rPost.slug}` : `/blog/${rPost.slug}`;

                    return (
                      <Link
                        key={rPost.slug}
                        href={rPostHref}
                        prefetch={false}
                        className="py-2.5 flex items-center justify-between gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <span className="min-w-0">
                          <span className="block truncate group-hover:translate-x-0.5 transition-transform">
                            {rPost.title}
                          </span>
                          {rPost.publishedAt && (
                            <time dateTime={rPost.publishedAt} className="text-xs text-muted-foreground/70 tabular-nums">
                              {formatDate(rPost.publishedAt, dateLocale)}
                            </time>
                          )}
                        </span>
                        <span className="text-primary text-xs shrink-0">→</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}

          <main className={
            (relatedPosts?.length > 0 ? "lg:col-span-9 " : "lg:col-span-12 ") + "order-1 lg:order-2 min-w-0"
          }>

        <header className="max-w-4xl mb-8">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-3">
            {post.category && (
              <Link
                href={
                  post.category.slug
                    ? `${blogIndexHref}?category=${post.category.slug}`
                    : blogIndexHref
                }
                prefetch={false}
                className="font-medium text-primary hover:underline"
              >
                {post.category.title}
              </Link>
            )}
            {post.category && post.publishedAt && <span>•</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="tabular-nums">
                {formatDate(post.publishedAt, dateLocale)}
              </time>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.025em] text-foreground leading-[1.15]">
            {post.title}
          </h1>

          {(authorText || post._updatedAt) && (
            <div className="border-y border-border py-3 my-6 flex flex-wrap items-center justify-between text-xs sm:text-sm text-muted-foreground gap-3">
              {authorText ? (
                <span className="font-medium text-foreground/80">
                  {dict.blog.preparedBy.replace("{author}", authorText)}
                </span>
              ) : (
                <span />
              )}
              {post._updatedAt && (
                <span className="tabular-nums">
                  {dict.blog.lastUpdated} {formatDate(post._updatedAt, dateLocale)}
                </span>
              )}
            </div>
          )}
        </header>

        {post.mainImage && (
          <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden border border-border mb-12 bg-muted">
            <SanityImage
              image={post.mainImage}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

            <div className="prose prose-slate max-w-[68ch] leading-relaxed text-foreground/90 space-y-6 text-base sm:text-lg">
              <RichText value={post.body} />
            </div>
          </main>
        </div>
      </article>
    </>
  );
}
