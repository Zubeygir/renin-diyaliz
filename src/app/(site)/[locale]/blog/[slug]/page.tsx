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
import { RiArrowLeftLine } from "react-icons/ri";
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

      <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl break-words overflow-x-hidden">
        <FadeIn direction="up">
          <Button
            variant="ghost"
            className="mb-8 -ml-2 gap-1.5"
            render={<Link href={blogIndexHref} prefetch={false} />}
          >
            <RiArrowLeftLine size={16} />
            {dict.blog.backToBlog}
          </Button>

          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <Link
                href={
                  post.category.slug
                    ? `${blogIndexHref}?category=${post.category.slug}`
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

          <h1 className="text-4xl font-bold tracking-tight mb-4 pt-2">{post.title}</h1>

          {(authorText || post._updatedAt) && (
            <div className="text-sm text-muted-foreground mb-6 flex flex-wrap gap-x-4 gap-y-1">
              {authorText && (
                <span>{dict.blog.preparedBy.replace("{author}", authorText)}</span>
              )}
              {post._updatedAt && (
                <span>
                  {dict.blog.lastUpdated} {formatDate(post._updatedAt, dateLocale)}
                </span>
              )}
            </div>
          )}
        </FadeIn>

        {post.mainImage && (
          <FadeIn delay={0.15}>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden border mb-12">
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
                {dict.blog.tags}
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
              <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.common.relatedPosts}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost: BlogPost) => {
                  const rPostHref = locale === "en"
                    ? `/en/blog/${rPost.slug}`
                    : `/blog/${rPost.slug}`;

                  return (
                    <Link key={rPost.slug} href={rPostHref} prefetch={false} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
                      <article className="h-full flex flex-col overflow-hidden rounded-xl border bg-card transition-colors duration-300 hover:border-primary/40">
                        {rPost.mainImage && (
                          <div className="relative aspect-video overflow-hidden">
                            <SanityImage
                              image={rPost.mainImage}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            {rPost.publishedAt && (
                              <time className="text-xs text-muted-foreground mb-2 tracking-widest uppercase block">
                                {formatDate(rPost.publishedAt, dateLocale)}
                              </time>
                            )}
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                              {rPost.title}
                            </h3>
                          </div>
                          <div className="mt-6">
                            <span className="text-primary font-semibold text-xs tracking-wider uppercase flex items-center">
                              {dict.common.readMore}
                              <span className="ml-1">→</span>
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
