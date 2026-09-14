import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import {
  homePageQuery,
  serviceFallbackQuery,
  projectFallbackQuery,
  blogFallbackQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { HomePage as HomePageType, Service, Project, BlogPost } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<HomePageType>(
    homePageQuery,
    { locale },
    { next: { tags: ["home", "home:featured"] } }
  );

  return buildMetadata(
    {
      canonicalPath: "/",
      pageSeo: data?.seo,
    },
    locale
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  // 1. Fetch homepage configuration
  const data = await cachedFetch<HomePageType>(
    homePageQuery,
    { locale },
    { next: { tags: ["home", "home:featured"] } }
  );

  // 2. Determine if fallback queries are needed
  const needsFallbackServices = !data?.featuredServices || data.featuredServices.length === 0;
  const needsFallbackProjects = !data?.featuredProjects || data.featuredProjects.length === 0;
  const needsFallbackPosts = !data?.featuredPosts || data.featuredPosts.length === 0;

  // 3. Fetch fallbacks in parallel if necessary
  const [fallbackServices, fallbackProjects, fallbackPosts] = await Promise.all([
    needsFallbackServices
      ? cachedFetch<Service[]>(serviceFallbackQuery, { locale }, { next: { tags: ["service:list"] } })
      : Promise.resolve([]),
    needsFallbackProjects
      ? cachedFetch<Project[]>(projectFallbackQuery, { locale }, { next: { tags: ["project:list"] } })
      : Promise.resolve([]),
    needsFallbackPosts
      ? cachedFetch<BlogPost[]>(blogFallbackQuery, { locale }, { next: { tags: ["blog:list", "blog:categories"] } })
      : Promise.resolve([]),
  ]);

  const servicesToDisplay = data?.featuredServices && data.featuredServices.length > 0
    ? data.featuredServices
    : fallbackServices;

  const projectsToDisplay = data?.featuredProjects && data.featuredProjects.length > 0
    ? data.featuredProjects
    : fallbackProjects;

  const postsToDisplay = data?.featuredPosts && data.featuredPosts.length > 0
    ? data.featuredPosts
    : fallbackPosts;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection data={data} locale={locale} />

      {/* 2. Hakkımızda Bölümü */}
      <AboutSection
        title={data?.aboutTitle}
        subtitle={data?.aboutSubtitle}
        text={data?.aboutText}
        image={data?.aboutImage}
        ctaLabel={data?.aboutCtaLabel}
        ctaLink={data?.aboutCtaLink}
        locale={locale}
      />

      {/* 3. Öne Çıkan Hizmetler */}
      <ServicesSection
        title={data?.servicesTitle}
        subtitle={data?.servicesSubtitle}
        services={servicesToDisplay}
        locale={locale}
      />

      {/* 4. Öne Çıkan Projeler */}
      <ProjectsSection
        title={data?.projectsTitle}
        subtitle={data?.projectsSubtitle}
        projects={projectsToDisplay}
        locale={locale}
      />

      {/* 5. Son Blog Yazıları */}
      <BlogSection
        title={data?.blogTitle}
        subtitle={data?.blogSubtitle}
        posts={postsToDisplay}
        locale={locale}
      />
    </div>
  );
}
