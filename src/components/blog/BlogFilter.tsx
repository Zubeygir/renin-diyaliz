"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
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

  return (
    <>
      <FadeIn direction="up">
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <Button
              variant={!currentCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(null)}
            >
              {dict.blog.allCategories}
            </Button>
            {categories.map((cat: BlogCategory) => (
              <Button
                key={cat._id}
                variant={currentCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.slug || null)}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        )}
      </FadeIn>

      {filteredPosts?.length > 0 ? (
        <AnimateGroup key={currentCategory || "all"} className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
          {filteredPosts.map((post: BlogPost) => {
            const postHref = locale === "en"
              ? `/en/blog/${post.slug}`
              : `/blog/${post.slug}`;

            return (
              <Link key={post.slug} href={postHref} prefetch={false} className="group block h-full">
                <article className="h-full flex flex-col overflow-hidden rounded-xl border bg-card transition-colors duration-300 hover:border-primary/40">
                  {post.mainImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <SanityImage
                        image={post.mainImage}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {post.category && (
                          <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                            {post.category.title}
                          </span>
                        )}
                        {post.publishedAt && (
                          <time className="text-xs text-muted-foreground block">
                            {formatDate(post.publishedAt, dateLocale)}
                          </time>
                        )}
                      </div>
                      <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      )}
                    </div>
                    <div className="mt-6">
                      <span className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center">
                        {dict.common.readMore}
                        <span className="ml-1">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </AnimateGroup>
      ) : (
        <FadeIn>
          <p className="text-muted-foreground text-center py-16">
            {dict.blog.noPostsFound}
          </p>
        </FadeIn>
      )}
    </>
  );
}
