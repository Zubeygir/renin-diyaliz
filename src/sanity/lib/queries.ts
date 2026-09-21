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

/**
 * Shared GROQ projection for SEO fields with multilingual fallback.
 */
export const seoFields = /* groq */ `{
  "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle.tr, metaTitle),
  "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription.tr, metaDescription),
  ogImage ${imageFields},
  noIndex,
  canonicalUrl
}`;

// ─── Layout ────────────────────────────────────────────────────────────────────
// Her sayfada bir kez çekilir — header, footer, global ayarlar
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName,
    "siteTagline": coalesce(siteTagline[$locale], siteTagline.en, siteTagline.tr, siteTagline),
    logo ${imageFields},
    logoHeight,
    favicon { asset->{ _id, url } },
    contactInfo {
      phone,
      phone2,
      email,
      "address": coalesce(address[$locale], address.en, address.tr, address),
      whatsappNumber,
      mapIframe
    },
    socialLinks[] { platform, url },
    gaId, gtmId, googleSearchConsoleId,
    defaultSeo {
      "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle.tr, metaTitle),
      "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription.tr, metaDescription)
    },
    defaultOgImage ${imageFields}
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] {
      "label": coalesce(label[$locale], label.en, label.tr, label),
      "href": coalesce(href[$locale], href.en, href.tr, href),
      openInNewTab,
      subLinks[] {
        "label": coalesce(label[$locale], label.en, label.tr, label),
        "href": coalesce(href[$locale], href.en, href.tr, href),
        "description": coalesce(description[$locale], description.en, description.tr, description),
        openInNewTab
      }
    },
    footerLinks[] {
      "label": coalesce(label[$locale], label.en, label.tr, label),
      "href": coalesce(href[$locale], href.en, href.tr, href),
      openInNewTab,
      subLinks[] {
        "label": coalesce(label[$locale], label.en, label.tr, label),
        "href": coalesce(href[$locale], href.en, href.tr, href),
        openInNewTab
      }
    }
  },
  "workingHours": *[_type == "contactPage"][0].workingHours[] {
    "days": coalesce(days[$locale], days.en, days.tr, days),
    hours
  }
}`;

// ─── Sayfalar ──────────────────────────────────────────────────────────────────

export const homePageQuery = groq`*[_type == "homePage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  "heroCtaLabel": coalesce(heroCtaLabel[$locale], heroCtaLabel.en, heroCtaLabel.tr, heroCtaLabel),
  heroCtaLink {
    linkType,
    "manual": coalesce(manual[$locale], manual.en, manual.tr, manual),
    internal->{
      _type,
      "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
    }
  },
  "heroCtaLabel2": coalesce(heroCtaLabel2[$locale], heroCtaLabel2.en, heroCtaLabel2.tr, heroCtaLabel2),
  heroCtaLink2 {
    linkType,
    "manual": coalesce(manual[$locale], manual.en, manual.tr, manual),
    internal->{
      _type,
      "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
    }
  },
  heroImage ${imageFields},
  heroVideo { asset->{ _id, url, mimeType } },
  heroVideoWebm { asset->{ _id, url, mimeType } },
  "aboutTitle": coalesce(aboutTitle[$locale], aboutTitle.en, aboutTitle.tr, aboutTitle),
  "aboutSubtitle": coalesce(aboutSubtitle[$locale], aboutSubtitle.en, aboutSubtitle.tr, aboutSubtitle),
  "aboutText": coalesce(aboutText[$locale], aboutText.en, aboutText.tr, aboutText),
  aboutImage ${imageFields},
  "aboutCtaLabel": coalesce(aboutCtaLabel[$locale], aboutCtaLabel.en, aboutCtaLabel.tr, aboutCtaLabel),
  "aboutCtaLink": coalesce(aboutCtaLink[$locale], aboutCtaLink.en, aboutCtaLink.tr, aboutCtaLink),
  stats[] {
    value,
    countUp,
    "label": coalesce(label[$locale], label.en, label.tr, label)
  },
  "servicesTitle": coalesce(servicesTitle[$locale], servicesTitle.en, servicesTitle.tr, servicesTitle),
  "servicesSubtitle": coalesce(servicesSubtitle[$locale], servicesSubtitle.en, servicesSubtitle.tr, servicesSubtitle),
  featuredServices[]-> {
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
    "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
    mainImage ${imageFields}
  },
  "serviceAreaTitle": coalesce(serviceAreaTitle[$locale], serviceAreaTitle.en, serviceAreaTitle.tr, serviceAreaTitle),
  "serviceAreaSubtitle": coalesce(serviceAreaSubtitle[$locale], serviceAreaSubtitle.en, serviceAreaSubtitle.tr, serviceAreaSubtitle),
  serviceAreaDistricts[] { "name": coalesce(@[$locale], @.en, @.tr) },
  "serviceAreaNote": coalesce(serviceAreaNote[$locale], serviceAreaNote.en, serviceAreaNote.tr, serviceAreaNote),
  serviceAreaImage { asset->{ _id, url, mimeType } },
  "partnersTitle": coalesce(partnersTitle[$locale], partnersTitle.en, partnersTitle.tr, partnersTitle),
  "partnersNote": coalesce(partnersNote[$locale], partnersNote.en, partnersNote.tr, partnersNote),
  "blogTitle": coalesce(blogTitle[$locale], blogTitle.en, blogTitle.tr, blogTitle),
  "blogSubtitle": coalesce(blogSubtitle[$locale], blogSubtitle.en, blogSubtitle.tr, blogSubtitle),
  featuredPosts[]-> {
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
    "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
    publishedAt,
    author {
      name,
      "title": coalesce(title[$locale], title.en, title.tr, title)
    },
    category->{
      "title": coalesce(title[$locale], title.en, title.tr, title),
      "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
    },
    mainImage ${imageFields}
  },
  seo ${seoFields}
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  "body": coalesce(body[$locale], body.en, body.tr, body),
  mainImage ${imageFields},
  facts[] {
    "label": coalesce(label[$locale], label.en, label.tr, label),
    "value": coalesce(value[$locale], value.en, value.tr, value)
  },
  stats[] {
    value,
    countUp,
    "label": coalesce(label[$locale], label.en, label.tr, label)
  },
  seo ${seoFields}
}`;

export const missionVisionPageQuery = groq`*[_type == "missionVisionPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "missionTitle": coalesce(missionTitle[$locale], missionTitle.en, missionTitle.tr, missionTitle),
  "missionText": coalesce(missionText[$locale], missionText.en, missionText.tr, missionText),
  "visionTitle": coalesce(visionTitle[$locale], visionTitle.en, visionTitle.tr, visionTitle),
  "visionText": coalesce(visionText[$locale], visionText.en, visionText.tr, visionText),
  "valuesTitle": coalesce(valuesTitle[$locale], valuesTitle.en, valuesTitle.tr, valuesTitle),
  "values": values[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  "qualityPolicyTitle": coalesce(qualityPolicyTitle[$locale], qualityPolicyTitle.en, qualityPolicyTitle.tr, qualityPolicyTitle),
  "qualityPolicyIntro": coalesce(qualityPolicyIntro[$locale], qualityPolicyIntro.en, qualityPolicyIntro.tr, qualityPolicyIntro),
  "qualityPolicyItems": qualityPolicyItems[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  seo ${seoFields}
}`;

export const orgChartPageQuery = groq`*[_type == "orgChartPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  chartImage ${imageFields},
  seo ${seoFields}
}`;

export const staffPageQuery = groq`*[_type == "staffPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.en, ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.en, ctaLink.tr, ctaLink),
  seo ${seoFields}
}`;

export const partnerListQuery = groq`*[_type == "partner"] | order(order asc) {
  _id,
  name,
  logo ${imageFields},
  link
}`;

export const staffPreviewQuery = groq`*[_type == "staffMember"] | order(order asc) [0...4] {
  _id,
  name,
  "role": coalesce(role[$locale], role.en, role.tr, role),
  photo ${imageFields}
}`;

export const staffListQuery = groq`*[_type == "staffMember"] | order(group asc, order asc) {
  _id,
  name,
  "role": coalesce(role[$locale], role.en, role.tr, role),
  group,
  photo ${imageFields},
  hasDetailPage,
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
}`;

export const staffMemberBySlugQuery = groq`*[_type == "staffMember" && hasDetailPage == true && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  _id,
  name,
  "role": coalesce(role[$locale], role.en, role.tr, role),
  group,
  photo ${imageFields},
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "rawSlug": slug,
  hasDetailPage,
  "bio": coalesce(bio[$locale], bio.en, bio.tr, bio)[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  "education": education[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  "skills": skills[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  "certificates": certificates[] { "value": coalesce(@[$locale], @.tr, @) }.value,
  seo ${seoFields}
}`;

export const staffSlugsQuery = groq`*[_type == "staffMember" && hasDetailPage == true] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current),
  "de": coalesce(slug.de.current, slug.en.current, slug.current),
  "ar": coalesce(slug.ar.current, slug.en.current, slug.current)
}`;

export const galleryPageQuery = groq`*[_type == "galleryPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  images[] {
    _key,
    "caption": coalesce(caption[$locale], caption.en, caption.tr, caption),
    alt,
    asset->{ _id, url, metadata { lqip, dimensions } },
    hotspot,
    crop
  },
  seo ${seoFields}
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  showForm,
  "formTitle": coalesce(formTitle[$locale], formTitle.en, formTitle.tr, formTitle),
  "successMessage": coalesce(successMessage[$locale], successMessage.en, successMessage.tr, successMessage),
  workingHours[] {
    "days": coalesce(days[$locale], days.en, days.tr, days),
    hours
  },
  faqs[] {
    "question": coalesce(question[$locale], question.en, question.tr, question),
    "answer": coalesce(answer[$locale], answer.en, answer.tr, answer)
  },
  "contactInfo": *[_type == "siteSettings"][0].contactInfo {
    phone,
    phone2,
    email,
    "address": coalesce(address[$locale], address.en, address.tr, address),
    whatsappNumber,
    mapIframe
  },
  seo ${seoFields}
}`;

export const kvkkPageQuery = groq`*[_type == "kvkkPage"][0] {
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "body": coalesce(body[$locale], body.en, body.tr, body),
  seo ${seoFields}
}`;

export const cookiePolicyPageQuery = groq`*[_type == "cookiePolicyPage"][0] {
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "body": coalesce(body[$locale], body.en, body.tr, body),
  seo ${seoFields}
}`;

export const blogPageQuery = groq`*[_type == "blogPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.en, ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.en, ctaLink.tr, ctaLink),
  seo ${seoFields}
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.en, ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.en, ctaLink.tr, ctaLink),
  seo ${seoFields}
}`;

export const projectsPageQuery = groq`*[_type == "projectsPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle.tr, heroTitle),
  "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle.tr, heroSubtitle),
  heroImage ${imageFields},
  "pageTitle": coalesce(pageTitle[$locale], pageTitle.en, pageTitle.tr, pageTitle),
  "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.en, pageSubtitle.tr, pageSubtitle),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.en, ctaLabel.tr, ctaLabel),
  "ctaLink": coalesce(ctaLink[$locale], ctaLink.en, ctaLink.tr, ctaLink),
  seo ${seoFields}
}`;

// ─── Blog ──────────────────────────────────────────────────────────────────────

export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.en, title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

export const blogFallbackQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...3] {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.en, title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  _id, _updatedAt,
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "rawSlug": slug,
  publishedAt,
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  author {
    name,
    "title": coalesce(title[$locale], title.en, title.tr, title)
  },
  category->{
    _id,
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
  },
  seoTags,
  mainImage ${imageFields},
  "body": coalesce(body[$locale], body.en, body.tr, body)[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  seo ${seoFields}
}`;

export const blogCategoriesQuery = groq`*[_type == "blogCategory"] | order(title asc) {
  _id,
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
}`;

export const blogListByCategorySlugQuery = groq`*[_type == "blogPost" && (category->slug[$locale].current == $slug || category->slug.tr.current == $slug || category->slug.current == $slug)] | order(publishedAt desc) {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.en, title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

export const blogRelatedPostsQuery = groq`*[_type == "blogPost" && category._ref == $categoryId && _id != $currentPostId] | order(publishedAt desc)[0...3] {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  publishedAt,
  author {
    name,
    "title": coalesce(title[$locale], title.en, title.tr, title)
  },
  category->{
    "title": coalesce(title[$locale], title.en, title.tr, title),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
  },
  mainImage ${imageFields}
}`;

// ─── Hizmetler ─────────────────────────────────────────────────────────────────

export const serviceListQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  _id,
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  mainImage ${imageFields}
}`;

export const siblingServicesQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  _id,
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current)
}`;

export const serviceFallbackQuery = groq`*[_type == "service"] | order(_createdAt asc)[0...3] {
  _id,
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.tr, excerpt),
  mainImage ${imageFields}
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "rawSlug": slug,
  mainImage ${imageFields},
  "body": coalesce(body[$locale], body.en, body.tr, body)[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo ${seoFields}
}`;

// ─── Projeler ──────────────────────────────────────────────────────────────────

export const projectListQuery = groq`*[_type == "project"] | order(_createdAt asc) {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  mainImage ${imageFields}
}`;

export const projectBySlugQuery = groq`*[_type == "project" && (slug[$locale].current == $slug || slug.tr.current == $slug || slug.current == $slug)][0] {
  "title": coalesce(title[$locale], title.en, title.tr, title),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.tr.current, slug.current),
  "rawSlug": slug,
  mainImage ${imageFields},
  "body": coalesce(body[$locale], body.en, body.tr, body)[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo ${seoFields}
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
    "kvkk": *[_type == "kvkkPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "cookiePolicy": *[_type == "cookiePolicyPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "blog": *[_type == "blogPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "services": *[_type == "servicesPage"][0] { _updatedAt, "noIndex": seo.noIndex },
    "projects": *[_type == "projectsPage"][0] { _updatedAt, "noIndex": seo.noIndex }
  },
  "blogPosts": *[_type == "blogPost" && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    "de": coalesce(slug.de.current, slug.en.current, slug.current),
    "ar": coalesce(slug.ar.current, slug.en.current, slug.current),
    _updatedAt
  },
  "services": *[_type == "service" && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    "de": coalesce(slug.de.current, slug.en.current, slug.current),
    "ar": coalesce(slug.ar.current, slug.en.current, slug.current),
    _updatedAt
  },
  "projects": *[_type == "project" && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    "de": coalesce(slug.de.current, slug.en.current, slug.current),
    "ar": coalesce(slug.ar.current, slug.en.current, slug.current),
    _updatedAt
  },
  "staffMembers": *[_type == "staffMember" && hasDetailPage == true && !(seo.noIndex == true)] {
    "tr": coalesce(slug.tr.current, slug.current),
    "en": coalesce(slug.en.current, slug.current),
    "de": coalesce(slug.de.current, slug.en.current, slug.current),
    "ar": coalesce(slug.ar.current, slug.en.current, slug.current),
    _updatedAt
  }
}`;

// ─── Varsayılan SEO ────────────────────────────────────────────────────────────

export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage,
  siteName,
  "siteTagline": coalesce(siteTagline[$locale], siteTagline.en, siteTagline.tr, siteTagline),
  favicon { asset->{ _id, url } },
  googleSearchConsoleId
}`;

export const blogSlugsQuery = groq`*[_type == "blogPost"] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current),
  "de": coalesce(slug.de.current, slug.en.current, slug.current),
  "ar": coalesce(slug.ar.current, slug.en.current, slug.current)
}`;

export const serviceSlugsQuery = groq`*[_type == "service"] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current),
  "de": coalesce(slug.de.current, slug.en.current, slug.current),
  "ar": coalesce(slug.ar.current, slug.en.current, slug.current)
}`;

export const projectSlugsQuery = groq`*[_type == "project"] {
  "tr": coalesce(slug.tr.current, slug.current),
  "en": coalesce(slug.en.current, slug.current),
  "de": coalesce(slug.de.current, slug.en.current, slug.current),
  "ar": coalesce(slug.ar.current, slug.en.current, slug.current)
}`;
