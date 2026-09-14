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
    ? posts.filter((post) => post.category?.slug?.current === currentCategory)
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
              {locale === "en" ? "All" : "Tümü"}
            </Button>
            {categories.map((cat: BlogCategory) => (
              <Button
                key={cat._id}
                variant={currentCategory === cat.slug?.current ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.slug?.current || null)}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        )}
      </FadeIn>

      {filteredPosts?.length > 0 ? (
        <AnimateGroup key={currentCategory || "all"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: BlogPost) => {
            const postHref = locale === "en"
              ? `/en/blog/${post.slug?.current}`
              : `/blog/${post.slug?.current}`;

            return (
              <Link key={post.slug?.current} href={postHref} prefetch={false} className="group block">
                <article className="border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  {post.mainImage && (
                    <div className="relative h-48 overflow-hidden">
                      <SanityImage
                        image={post.mainImage}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-grow flex flex-col">
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
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    )}
                    <div className="mt-auto pt-4 border-t flex items-center justify-between">
                      <span className="text-primary font-medium text-xs tracking-wider uppercase group-hover:underline">
                        {dict.common.readMore} →
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
            {locale === "en" ? "No articles found in this category." : "Henüz bu kategoride yazı bulunmuyor."}
          </p>
        </FadeIn>
      )}
    </>
  );
}
