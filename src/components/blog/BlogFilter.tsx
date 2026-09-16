"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { formatDate } from "@/lib/utils";
import { BlogPost, BlogCategory, Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";

interface BlogFilterProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  locale?: Locale;
}

export function BlogFilter({ posts, categories, locale = "tr" }: BlogFilterProps) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const dict = getDictionary(locale);
  const basePath = locale === "en" ? "/en/blog" : "/blog";
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryQuery = urlParams.get("category");
    if (categoryQuery) {
      setCurrentCategory(categoryQuery);
    }
  }, []);

  const setCategory = (slug: string | null) => {
    setCurrentCategory(slug);
    const newUrl = slug ? `${basePath}?category=${slug}` : basePath;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const filteredPosts = currentCategory
    ? posts.filter((post) => post.category?.slug === currentCategory)
    : posts;

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Sol Kolon: Sticky Kategori Navigasyonu */}
      <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
        <div className="border border-border rounded-md p-6 bg-card">
          <h2 className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {dict.blog.allCategories}
          </h2>
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => setCategory(null)}
              className={`flex items-center justify-between text-sm py-2 px-3 rounded text-left transition-colors cursor-pointer ${
                !currentCategory
                  ? "font-semibold text-foreground bg-primary/10 border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span>{dict.blog.allCategories}</span>
              <span className="text-xs tabular-nums opacity-70">({posts.length})</span>
            </button>

            {categories.map((cat: BlogCategory) => {
              const count = posts.filter((p) => p.category?.slug === cat.slug).length;
              const isSelected = currentCategory === cat.slug;

              return (
                <button
                  key={cat._id}
                  onClick={() => setCategory(cat.slug || null)}
                  className={`flex items-center justify-between text-sm py-2 px-3 rounded text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "font-semibold text-foreground bg-primary/10 border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="truncate pr-2">{cat.title}</span>
                  <span className="text-xs tabular-nums opacity-70">({count})</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Sağ Kolon: İlk Yazı Büyük + Satır Listesi */}
      <main className="lg:col-span-8 min-w-0">
        {featuredPost ? (
          <div className="space-y-12">
            {/* Büyük Öne Çıkan İlk Yazı */}
            <article className="group">
              <Link
                href={locale === "en" ? `/en/blog/${featuredPost.slug}` : `/blog/${featuredPost.slug}`}
                prefetch={false}
                className="block space-y-4"
              >
                {featuredPost.mainImage && (
                  <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-muted border border-border">
                    <SanityImage
                      image={featuredPost.mainImage}
                      fill
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                      priority
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {featuredPost.category && (
                    <span className="font-medium text-primary">{featuredPost.category.title}</span>
                  )}
                  {featuredPost.category && featuredPost.publishedAt && <span>•</span>}
                  {featuredPost.publishedAt && (
                    <time dateTime={featuredPost.publishedAt}>
                      {formatDate(featuredPost.publishedAt, dateLocale)}
                    </time>
                  )}
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt && (
                  <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                )}

                {featuredPost.author?.name && (
                  <p className="text-xs text-muted-foreground pt-1">
                    {featuredPost.author.title ? `${featuredPost.author.title} ` : ""}
                    {featuredPost.author.name}
                  </p>
                )}
              </Link>
            </article>

            {/* Sonraki Yazılar (Divide-y Satırlar) */}
            {remainingPosts.length > 0 && (
              <div className="divide-y divide-border border-t border-border pt-2">
                {remainingPosts.map((post: BlogPost) => {
                  const postHref =
                    locale === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;

                  return (
                    <article key={post.slug} className="py-8 first:pt-6 last:pb-0">
                      <Link
                        href={postHref}
                        prefetch={false}
                        className="group grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                      >
                        <div className="sm:col-span-4">
                          <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-muted border border-border">
                            {post.mainImage && (
                              <SanityImage
                                image={post.mainImage}
                                fill
                                sizes="(max-width: 640px) 100vw, 240px"
                                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                              />
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-8">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            {post.category && (
                              <span className="font-medium text-primary">{post.category.title}</span>
                            )}
                            {post.category && post.publishedAt && <span>•</span>}
                            {post.publishedAt && (
                              <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt, dateLocale)}
                              </time>
                            )}
                          </div>

                          <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}

                          <span className="text-primary text-xs font-medium inline-flex items-center gap-1 mt-3 group-hover:underline">
                            {dict.common.readMore}
                            <span className="transition-transform group-hover:translate-x-0.5">→</span>
                          </span>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-16">
            {dict.blog.noPostsFound}
          </p>
        )}
      </main>
    </div>
  );
}
