import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import {
  homePageQuery,
  serviceFallbackQuery,
  blogFallbackQuery,
  staffPreviewQuery,
  partnerListQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ServiceAreaSection } from "@/components/home/ServiceAreaSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { HomePage as HomePageType, Service, BlogPost, StaffPreviewItem, Partner } from "@/types";

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
  const needsFallbackPosts = !data?.featuredPosts || data.featuredPosts.length === 0;

  // 3. Fetch fallbacks in parallel if necessary
  const [fallbackServices, fallbackPosts, teamPreview, partners] = await Promise.all([
    needsFallbackServices
      ? cachedFetch<Service[]>(serviceFallbackQuery, { locale }, { next: { tags: ["service:list"] } })
      : Promise.resolve([]),
    needsFallbackPosts
      ? cachedFetch<BlogPost[]>(blogFallbackQuery, { locale }, { next: { tags: ["blog:list", "blog:categories"] } })
      : Promise.resolve([]),
    cachedFetch<StaffPreviewItem[]>(staffPreviewQuery, { locale }, { next: { tags: ["staff:list"] } }),
    cachedFetch<Partner[]>(partnerListQuery, { locale }, { next: { tags: ["partner:list"] } }),
  ]);

  const servicesToDisplay = data?.featuredServices && data.featuredServices.length > 0
    ? data.featuredServices
    : fallbackServices;

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
        stats={data?.stats}
        teamPreview={teamPreview}
        locale={locale}
      />

      {/* 3. Öne Çıkan Hizmetler */}
      <ServicesSection
        title={data?.servicesTitle}
        subtitle={data?.servicesSubtitle}
        services={servicesToDisplay}
        locale={locale}
      />

      {/* 4. Servis Ağı / Kapsama Alanı */}
      <ServiceAreaSection
        title={data?.serviceAreaTitle}
        subtitle={data?.serviceAreaSubtitle}
        image={data?.serviceAreaImage}
      />

      {/* 5. Anlaşmalı Kurumlar */}
      <PartnersSection title={data?.partnersTitle} partners={partners} />

      {/* 6. Son Blog Yazıları */}
      <BlogSection
        title={data?.blogTitle}
        subtitle={data?.blogSubtitle}
        posts={postsToDisplay}
        locale={locale}
      />

      {/* 7. İletişim CTA */}
      <ContactCtaSection
        title={data?.ctaTitle}
        subtitle={data?.ctaSubtitle}
        buttonLabel={data?.ctaButtonLabel}
        locale={locale}
      />
    </div>
  );
}
