import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogSlugsQuery, blogRelatedPostsQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  const backLabel = locale === "en" ? "← Back to Blog" : "← Blog'a Dön";

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} />
      <JsonLd data={articleJsonLd(post, layoutData?.settings)} />

      <article className="container mx-auto px-4 py-16 max-w-3xl break-words overflow-x-hidden">
        <FadeIn direction="up">
          <Button variant="ghost" className="mb-8 -ml-2" render={<Link href={blogIndexHref} prefetch={false} />}>
            {backLabel}
          </Button>

          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <Link
                href={
                  post.category.slug?.current
                    ? `${blogIndexHref}?category=${post.category.slug.current}`
                    : blogIndexHref
                }
                prefetch={false}
                className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {post.category.title}
              </Link>
            )}
            {post.publishedAt && (
              <time className="text-sm text-muted-foreground block">
                {formatDate(post.publishedAt, dateLocale)}
              </time>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4 pt-2">{post.title}</h1>

          {(post.author?.name || post._updatedAt) && (
            <div className="text-sm text-muted-foreground mb-6 flex flex-wrap gap-x-4 gap-y-1">
              {post.author?.name && (
                <span>
                  {locale === "en"
                    ? `Prepared by ${post.author.title ? `${post.author.title} ` : ""}${post.author.name}`
                    : `${post.author.title ? `${post.author.title} ` : ""}${post.author.name} tarafından hazırlanmıştır`}
                </span>
              )}
              {post._updatedAt && (
                <span>
                  {locale === "en" ? "Last updated: " : "Son güncelleme: "}
                  {formatDate(post._updatedAt, dateLocale)}
                </span>
              )}
            </div>
          )}
        </FadeIn>

        {post.mainImage && (
          <FadeIn delay={0.15}>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-12">
              <SanityImage
                image={post.mainImage}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.25}>
          <RichText value={post.body} />
        </FadeIn>

        {post.seoTags && post.seoTags.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                {locale === "en" ? "Tags:" : "Etiketler:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.seoTags.map((tag: string) => (
                  <span key={tag} className="text-sm bg-secondary px-3 py-1 rounded-md text-secondary-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {relatedPosts?.length > 0 && (
          <FadeIn delay={0.4}>
            <div className="mt-20 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold mb-8 font-bankgothic">{dict.common.relatedPosts}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost: BlogPost) => {
                  const rPostHref = locale === "en"
                    ? `/en/blog/${rPost.slug?.current}`
                    : `/blog/${rPost.slug?.current}`;

                  return (
                    <Link key={rPost.slug?.current} href={rPostHref} prefetch={false} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
                      <article className="overflow-hidden h-full flex flex-col">
                        {rPost.mainImage && (
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-muted">
                            <SanityImage
                              image={rPost.mainImage}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="flex-grow flex flex-col">
                          {rPost.publishedAt && (
                            <time className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">
                              {formatDate(rPost.publishedAt, dateLocale)}
                            </time>
                          )}
                          <h3 className="text-lg font-bold mb-2 font-bankgothic group-hover:text-primary transition-colors line-clamp-2">
                            {rPost.title}
                          </h3>
                          <div className="mt-auto pt-2">
                            <span className="text-primary font-semibold text-xs tracking-wider uppercase group-hover:underline underline-offset-4 flex items-center">
                              {dict.common.readMore}
                              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}
      </article>
    </>
  );
}
