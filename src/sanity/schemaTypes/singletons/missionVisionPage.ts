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
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", description: "Sayfa üst kısmında duracak ana başlık. Boş bırakılırsa Sayfa Başlığı kullanılır." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    // Content Group
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", initialValue: "Misyon, Vizyon, Değerler ve Kalite Politikası", validation: (Rule) => Rule.required() }),
    defineField({ name: "missionTitle", title: "Misyon Başlığı", type: "string", group: "content", initialValue: "Misyonumuz" }),
    defineField({ name: "missionText", title: "Misyon Metni", type: "text", rows: 4, group: "content" }),
    defineField({ name: "visionTitle", title: "Vizyon Başlığı", type: "string", group: "content", initialValue: "Vizyonumuz" }),
    defineField({ name: "visionText", title: "Vizyon Metni", type: "text", rows: 4, group: "content" }),
    defineField({ name: "valuesTitle", title: "Temel Değerler Başlığı", type: "string", group: "content", initialValue: "Temel Değerlerimiz" }),
    defineField({
      name: "values",
      title: "Temel Değerler",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      initialValue: ["Hasta güvenliği", "Hasta mahremiyeti", "Hijyen ve enfeksiyon kontrolü", "Ekip çalışması"],
    }),
    defineField({ name: "qualityPolicyTitle", title: "Kalite Politikası Başlığı", type: "string", group: "content", initialValue: "Kalite Politikamız" }),
    defineField({ name: "qualityPolicyText", title: "Kalite Politikası Metni", type: "array", of: [{ type: "block" }], group: "content" }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
