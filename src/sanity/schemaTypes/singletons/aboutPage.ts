import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "localizedString", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "localizedText", group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    // Content Group
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "localizedString", group: "content" }),
    defineField({ name: "pageSubtitle", title: "Giriş Alt Başlığı", type: "localizedText", group: "content" }),
    defineField({ name: "body", title: "Detaylı İçerik", type: "localizedPortableText", group: "content" }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel (Yandaki Resim)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
