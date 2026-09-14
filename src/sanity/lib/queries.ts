import { groq } from "next-sanity";

// ─── Shared Fragments ──────────────────────────────────────────────────────────

/**
 * Shared GROQ projection for SanityImage fields.
 * Includes LQIP blur preview, dimensions, alt text, hotspot, and crop.
 */
export const imageFields = /* groq */ `{
  asset->{ _id, url, metadata { lqip, dimensions } },
  alt,
  hotspot,
  crop
}`;

// ─── Layout ────────────────────────────────────────────────────────────────────
// Her sayfada bir kez çekilir — header, footer, global ayarlar
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName,
    "siteTagline": coalesce(siteTagline[$locale], siteTagline.tr, siteTagline),
    logo ${imageFields},
    logoHeight,
    favicon { asset->{ _id, url } },
    contactInfo {
      phone,
      phone2,
      email,
      "address": coalesce(address[$locale], address.tr, address),
      whatsappNumber,
      mapIframe
    },
    socialLinks[] { platform, url },
    gaId, gtmId, googleSearchConsoleId,
    defaultSeo { metaTitle, metaDescription },
    defaultOgImage ${imageFields}
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] {
      "label": coalesce(label[$locale], label.tr, label),
      "href": coalesce(href[$locale], href.tr, href),
      openInNewTab,
      subLinks[] {
        "label": coalesce(label[$locale], label.tr, label),
        "href": coalesce(href[$locale], href.tr, href),
        openInNewTab
      }
    },
    footerLinks[] {
      "label": coalesce(label[$locale], label.tr, label),
      "href": coalesce(href[$locale], href.tr, href),
      openInNewTab,
      subLinks[] {
        "label": coalesce(label[$locale], label.tr, label),
        "href": coalesce(href[$locale], href.tr, href),
        openInNewTab
      }
    }
  }
}`;

// ─── Sayfalar ──────────────────────────────────────────────────────────────────

export const homePageQuery = groq`*[_type == "homePage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  "heroCtaLabel": coalesce(heroCtaLabel[$locale], heroCtaLabel.tr, heroCtaLabel),
  heroCtaLink {
    linkType,
    "manual": coalesce(manual[$locale], manual.tr, manual),
    internal->{
      _type,
      "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
    }
  },
  heroImage ${imageFields},
  "aboutTitle": coalesce(aboutTitle[$locale], aboutTitle.tr, aboutTitle),
  "aboutSubtitle": coalesce(aboutSubtitle[$locale], aboutSubtitle.tr, aboutSubtitle),
  "aboutText": coalesce(aboutText[$locale], aboutText.tr, aboutText),
  aboutImage ${imageFields},
  "aboutCtaLabel": coalesce(aboutCtaLabel[$locale], aboutCtaLabel.tr, aboutCtaLabel),
  "aboutCtaLink": coalesce(aboutCtaLink[$locale], aboutCtaLink.tr, aboutCtaLink),
  stats[] {
    value,
    "label": coalesce(label[$locale], label.tr, label)
  },
  "servicesTitle": coalesce(servicesTitle[$locale], servicesTitle.tr, servicesTitle),
  "servicesSubtitle": coalesce(servicesSubtitle[$locale], servicesSubtitle.tr, servicesSubtitle),
  featuredServices[]-> {
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
    mainImage ${imageFields}
  },
  "projectsTitle": coalesce(projectsTitle[$locale], projectsTitle.tr, projectsTitle),
  "projectsSubtitle": coalesce(projectsSubtitle[$locale], projectsSubtitle.tr, projectsSubtitle),
  featuredProjects[]-> {
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
    mainImage ${imageFields}
  },
  "blogTitle": coalesce(blogTitle[$locale], blogTitle.tr, blogTitle),
  "blogSubtitle": coalesce(blogSubtitle[$locale], blogSubtitle.tr, blogSubtitle),
  featuredPosts[]-> {
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
    "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt),
    publishedAt,
    category->{
      "title": coalesce(title[$locale], title.tr, title),
      "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
    },
    mainImage ${imageFields}
  },
  seo
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  "body": coalesce(body[$locale], body.tr, body),
  mainImage ${imageFields},
  seo
}`;

export const missionVisionPageQuery = groq`*[_type == "missionVisionPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "missionTitle": coalesce(missionTitle[$locale], missionTitle.tr, missionTitle),
  "missionText": coalesce(missionText[$locale], missionText.tr, missionText),
  "visionTitle": coalesce(visionTitle[$locale], visionTitle.tr, visionTitle),
  "visionText": coalesce(visionText[$locale], visionText.tr, visionText),
  "valuesTitle": coalesce(valuesTitle[$locale], valuesTitle.tr, valuesTitle),
  "values": values[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  "qualityPolicyTitle": coalesce(qualityPolicyTitle[$locale], qualityPolicyTitle.tr, qualityPolicyTitle),
  "qualityPolicyText": coalesce(qualityPolicyText[$locale], qualityPolicyText.tr, qualityPolicyText),
  seo
}`;

export const orgChartPageQuery = groq`*[_type == "orgChartPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  chartImage ${imageFields},
  seo
}`;

export const staffPageQuery = groq`*[_type == "staffPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.tr, ctaLink),
  seo
}`;

export const staffListQuery = groq`*[_type == "staffMember"] | order(group asc, order asc) {
  _id,
  name,
  "role": coalesce(role[$locale], role.tr, role),
  group,
  photo ${imageFields},
  hasDetailPage,
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
}`;

export const staffMemberBySlugQuery = groq`*[_type == "staffMember" && hasDetailPage == true && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  _id,
  name,
  "role": coalesce(role[$locale], role.tr, role),
  group,
  photo ${imageFields},
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "rawSlug": slug,
  hasDetailPage,
  "bio": coalesce(bio[$locale], bio.tr, bio)[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  "education": education[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  "skills": skills[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  "certificates": certificates[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  seo
}`;

export const staffSlugsQuery = groq`*[_type == "staffMember" && hasDetailPage == true] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current)
}`;

export const galleryPageQuery = groq`*[_type == "galleryPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  seo
}`;

export const galleryListQuery = groq`*[_type == "galleryItem"] | order(order asc) {
  _id,
  "caption": coalesce(caption[$locale], caption.tr, caption),
  image ${imageFields}
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  showForm,
  "formTitle": coalesce(formTitle[$locale], formTitle.tr, formTitle),
  "successMessage": coalesce(successMessage[$locale], successMessage.tr, successMessage),
  workingHours[] {
    "days": coalesce(days[$locale], days.tr, days),
    hours
  },
  faqs[] {
    "question": coalesce(question[$locale], question.tr, question),
    "answer": coalesce(answer[$locale], answer.tr, answer)
  },
  "contactInfo": *[_type == "siteSettings"][0].contactInfo {
    phone,
    phone2,
    email,
    "address": coalesce(address[$locale], address.tr, address),
    whatsappNumber,
    mapIframe
  },
  seo
}`;

export const blogPageQuery = groq`*[_type == "blogPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.tr, ctaLink),
  seo
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.tr, ctaLink),
  seo
}`;

export const projectsPageQuery = groq`*[_type == "projectsPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.tr, ctaLink),
  seo
}`;

// ─── Blog ──────────────────────────────────────────────────────────────────────

export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

export const blogFallbackQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...3] {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  _id, _updatedAt,
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "rawSlug": slug,
  publishedAt,
  "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt),
  author {
    name,
    "title": coalesce(title[$locale], title.tr, title)
  },
  category->{
    _id,
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
  },
  seoTags,
  mainImage ${imageFields},
  "body": coalesce(body[$locale], body.tr, body)[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  seo
}`;

export const blogCategoriesQuery = groq`*[_type == "blogCategory"] | order(title asc) {
  _id,
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
}`;

export const blogListByCategorySlugQuery = groq`*[_type == "blogPost" && (category->slug[$locale].current == $slug || category->slug.tr.current == $slug || category->slug.current == $slug)] | order(publishedAt desc) {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

export const blogRelatedPostsQuery = groq`*[_type == "blogPost" && category._ref == $categoryId && _id != $currentPostId] | order(publishedAt desc)[0...3] {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

// ─── Hizmetler ─────────────────────────────────────────────────────────────────

export const serviceListQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  mainImage ${imageFields}
}`;

export const serviceFallbackQuery = groq`*[_type == "service"] | order(_createdAt asc)[0...3] {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  mainImage ${imageFields}
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "rawSlug": slug,
  mainImage ${imageFields},
  "body": coalesce(body[$locale], body.tr, body)[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── Projeler ──────────────────────────────────────────────────────────────────

export const projectListQuery = groq`*[_type == "project"] | order(_createdAt asc) {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  mainImage ${imageFields}
}`;

export const projectFallbackQuery = groq`*[_type == "project"] | order(_createdAt asc)[0...3] {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  mainImage ${imageFields}
}`;

export const projectBySlugQuery = groq`*[_type == "project" && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  "title": coalesce(title[$locale], title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.tr.current, slug.current),
  "rawSlug": slug,
  mainImage ${imageFields},
  "body": coalesce(body[$locale], body.tr, body)[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── Sitemap ───────────────────────────────────────────────────────────────────

export const allSlugsForSitemapQuery = groq`{
  "pages": {
    "home": *[_type == "homePage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "about": *[_type == "aboutPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "missionVision": *[_type == "missionVisionPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "orgChart": *[_type == "orgChartPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "staff": *[_type == "staffPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "gallery": *[_type == "galleryPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "contact": *[_type == "contactPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "blog": *[_type == "blogPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "services": *[_type == "servicesPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "projects": *[_type == "projectsPage"][0] { _updatedAt, "noIndex": seo.noIndex }
  },
  "blogPosts": *[_type == "blogPost" && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    _updatedAt
  },
  "services": *[_type == "service" && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    _updatedAt
  },
  "projects": *[_type == "project" && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    _updatedAt
  },
  "staffMembers": *[_type == "staffMember" && hasDetailPage == true && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    _updatedAt
  }
}`;

// ─── Varsayılan SEO ────────────────────────────────────────────────────────────

export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage,
  siteName,
  "siteTagline": coalesce(siteTagline[$locale], siteTagline.tr, siteTagline),
  favicon { asset->{ _id, url } },
  googleSearchConsoleId
}`;

export const blogSlugsQuery = groq`*[_type == "blogPost"] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current)
}`;

export const serviceSlugsQuery = groq`*[_type == "service"] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current)
}`;

export const projectSlugsQuery = groq`*[_type == "project"] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current)
}`;
