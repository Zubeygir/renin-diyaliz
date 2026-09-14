import { defineField, defineType } from "sanity";

export const blogPageType = defineType({
  name: "blogPage",
  title: "Blog Sayfası",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "localizedString",
      group: "hero",
      initialValue: {
        tr: "Blog ve Bilgilendirici İçerikler",
        en: "Blog & Health Information",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "Böbreğin görevleri, böbrek yetmezliği, beslenme ve diyaliz yaşamına dair sağlık rehberi.",
        en: "Health guide on kidney functions, kidney failure, nutrition, and dialysis life.",
      },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    // Content Group
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Sağlık Rehberi",
        en: "Health Guide",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık / Kısa Yazı",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "Hastalarımız ve hasta yakınlarımız için uzman hekimlerimiz tarafından hazırlanan bilgilendirici yayınlar.",
        en: "Informative publications prepared by our specialist physicians for patients and their families.",
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Buton Metni",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Tüm Yazılar",
        en: "All Articles",
      },
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Buton Linki",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "/blog",
        en: "/en/blog",
      },
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
