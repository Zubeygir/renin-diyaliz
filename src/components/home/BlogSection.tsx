import { SplitSection } from "@/components/ui/SplitSection";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { StaggerItem } from "@/components/ui/StaggerItem";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BlogPost, Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  locale?: Locale;
}

function postHref(post: BlogPost, locale: Locale) {
  return locale === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;
}

export function BlogSection({
  title,
  subtitle,
  posts = [],
  locale = "tr",
}: BlogSectionProps) {
  const dict = getDictionary(locale);
  const allBlogHref = locale === "en" ? "/en/blog" : "/blog";
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";

  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts.slice(0, 3);

  return (
    <SplitSection
      title={title || dict.nav.blog}
      className="bg-muted/40"
      aside={
        <>
          {subtitle && <p className="max-w-[40ch]">{subtitle}</p>}
          <Link
            href={allBlogHref}
            prefetch={false}
            className="mt-4 inline-block font-medium text-primary underline-offset-4 hover:underline"
          >
            {dict.common.allArticles} →
          </Link>
        </>
      }
    >
      {/* One featured post carries the image; the rest are text rows */}
      <AnimateGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <StaggerItem>
          <Link href={postHref(featured, locale)} prefetch={false} className="group block">
            {featured.mainImage && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted">
                <SanityImage
                  image={featured.mainImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
              {featured.category && <span className="font-medium text-primary">{featured.category.title}</span>}
              {featured.publishedAt && (
                <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt, dateLocale)}</time>
              )}
            </div>
            <h3 className="mt-2 font-heading text-2xl font-semibold group-hover:text-primary transition-colors">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="mt-3 text-muted-foreground line-clamp-3 max-w-[52ch]">{featured.excerpt}</p>
            )}
            {featured.author?.name && (
              <p className="mt-4 text-sm text-muted-foreground">
                {featured.author.name}
                {featured.author.title && <span className="text-muted-foreground/70"> · {featured.author.title}</span>}
              </p>
            )}
          </Link>
        </StaggerItem>

        {rest.length > 0 && (
          <div className="divide-y divide-border border-t border-border md:border-t-0 md:[&>*:first-child>a]:pt-0">
            {rest.map((post, i) => (
              <StaggerItem key={post.slug ?? i}>
                <Link
                  href={postHref(post, locale)}
                  prefetch={false}
                  className="group block py-6"
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {post.category && <span className="font-medium text-primary">{post.category.title}</span>}
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, dateLocale)}</time>
                    )}
                  </div>
                  <h3 className="mt-2 font-heading text-xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  )}
                </Link>
              </StaggerItem>
            ))}
          </div>
        )}
      </AnimateGroup>
    </SplitSection>
  );
}
