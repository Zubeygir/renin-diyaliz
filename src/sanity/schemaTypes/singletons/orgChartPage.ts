import { defineField, defineType } from "sanity";

export const orgChartPageType = defineType({
  name: "orgChartPage",
  title: "Organizasyon Şeması",
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
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", initialValue: "Organizasyon Şeması", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık / Kısa Yazı", type: "text", rows: 2, group: "content" }),
    defineField({
      name: "chartImage",
      title: "Organizasyon Şeması Görseli",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      description: "Unvan hiyerarşisini gösteren şema görseli (Mesul Müdür → Sorumlu Hekim → Başhemşire → Sorumlu Hemşire → Diyaliz Teknikerleri/Hemşireler).",
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
