import { defineField, defineType } from "sanity";

export const missionVisionPageType = defineType({
  name: "missionVisionPage",
  title: "Misyon, Vizyon, Değerler ve Kalite Politikası",
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
    defineField({ name: "missionTitle", title: "Misyon Başlığı", type: "localizedString", group: "content" }),
    defineField({ name: "missionText", title: "Misyon Metni", type: "localizedText", group: "content" }),
    defineField({ name: "visionTitle", title: "Vizyon Başlığı", type: "localizedString", group: "content" }),
    defineField({ name: "visionText", title: "Vizyon Metni", type: "localizedText", group: "content" }),
    defineField({ name: "valuesTitle", title: "Temel Değerler Başlığı", type: "localizedString", group: "content" }),
    defineField({
      name: "values",
      title: "Temel Değerler",
      type: "array",
      group: "content",
      of: [{ type: "localizedString" }],
    }),
    defineField({ name: "qualityPolicyTitle", title: "Kalite Politikası Başlığı", type: "localizedString", group: "content" }),
    defineField({ name: "qualityPolicyText", title: "Kalite Politikası Metni", type: "localizedPortableText", group: "content" }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
