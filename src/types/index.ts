import type { PortableTextBlock } from "@portabletext/react";

/**
 * Global TypeScript interfaces for Sanity documents and models.
 * Ensures strict typing, autocomplete, and zero warnings in IDE.
 */

export interface SanityImage {
  asset: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityFile {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    mimeType?: string;
  };
}

export type Locale = "tr" | "en";

export interface SanitySlug {
  current: string;
  _type?: "slug";
}

export interface RawSlug {
  tr?: SanitySlug;
  en?: SanitySlug;
  current?: string;
}

export interface BlogCategory {
  _id: string;
  title: string;
  slug?: string;
}

export interface BlogAuthor {
  name: string;
  title?: string;
}

export interface BlogPost {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug?: string;
  rawSlug?: RawSlug;
  excerpt?: string;
  publishedAt?: string;
  author?: BlogAuthor;
  category?: BlogCategory;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  seoTags?: string[];
  seo?: SeoSettings;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactInfo {
  phone?: string;
  phone2?: string;
  email?: string;
  address?: string;
  whatsappNumber?: string;
  mapIframe?: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline?: string;
  logo?: SanityImage;
  logoHeight?: number;
  favicon?: { asset: { url: string } };
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  gaId?: string;
  gtmId?: string;
  googleSearchConsoleId?: string;
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  defaultOgImage?: SanityImage;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  openInNewTab?: boolean;
  subLinks?: NavItem[];
}

export interface Navigation {
  headerLinks?: NavItem[];
  footerLinks?: NavItem[];
}

export interface Service {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug?: string;
  rawSlug?: RawSlug;
  excerpt?: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  seo?: SeoSettings;
}

export interface Project {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  rawSlug?: RawSlug;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  seo?: SeoSettings;
}

export interface CtaLink {
  linkType: "internal" | "manual";
  manual?: string;
  internal?: {
    _type: string;
    slug?: string;
  };
}

export interface SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface BasePage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  seo?: SeoSettings;
}

export interface AboutPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  body?: PortableTextBlock[];
  mainImage?: SanityImage;
  facts?: Array<{ label?: string; value?: string }>;
  stats?: StatItem[];
}

export interface MissionVisionPage extends BasePage {
  pageTitle: string;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  values?: string[];
  qualityPolicyTitle?: string;
  qualityPolicyIntro?: string;
  qualityPolicyItems?: string[];
}

export interface OrgChartPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  chartImage?: SanityImage;
}

export interface StaffPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export type StaffGroup = "hekimler" | "hemsirelik" | "teknik";

export interface StaffMember {
  _id?: string;
  name: string;
  role: string;
  group: StaffGroup;
  photo?: SanityImage;
  slug?: string;
  rawSlug?: RawSlug;
  hasDetailPage?: boolean;
  bio?: PortableTextBlock[];
  education?: string[];
  skills?: string[];
  certificates?: string[];
  seo?: SeoSettings;
}

export interface StaffPreviewItem {
  _id?: string;
  name: string;
  role?: string;
  photo?: SanityImage;
}

export interface Partner {
  _id?: string;
  name: string;
  logo?: SanityImage;
  link?: string;
}

export interface GalleryImage extends SanityImage {
  _key?: string;
  caption?: string;
}

export interface GalleryPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  images?: GalleryImage[];
}

export type GalleryItem = GalleryImage;

export interface WorkingHourItem {
  days: string;
  hours: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface KvkkPage {
  pageTitle: string;
  body?: PortableTextBlock[];
  seo?: SeoSettings;
}

export type CookiePolicyPage = KvkkPage;

export interface ContactPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  showForm?: boolean;
  formTitle?: string;
  successMessage?: string;
  contactInfo?: SiteSettings["contactInfo"];
  workingHours?: WorkingHourItem[];
  faqs?: FaqItem[];
}

export interface InnerPageWithCta extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export type BlogPage = InnerPageWithCta;
export type ServicesPage = InnerPageWithCta;
export type ProjectsPage = InnerPageWithCta;

export interface StatItem {
  value: string;
  label: string;
  countUp?: boolean;
}

export interface HomePage {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  heroVideo?: SanityFile;
  heroVideoWebm?: SanityFile;
  heroCtaLabel?: string;
  heroCtaLink?: CtaLink;
  heroCtaLabel2?: string;
  heroCtaLink2?: CtaLink;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutText?: PortableTextBlock[];
  aboutImage?: SanityImage;
  aboutCtaLabel?: string;
  aboutCtaLink?: string;
  stats?: StatItem[];
  servicesTitle?: string;
  servicesSubtitle?: string;
  featuredServices?: Service[];
  serviceAreaTitle?: string;
  serviceAreaSubtitle?: string;
  serviceAreaDistricts?: { name: string }[];
  serviceAreaNote?: string;
  serviceAreaImage?: SanityFile;
  partnersTitle?: string;
  partnersNote?: string;
  blogTitle?: string;
  blogSubtitle?: string;
  featuredPosts?: BlogPost[];
  seo?: SeoSettings;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}
