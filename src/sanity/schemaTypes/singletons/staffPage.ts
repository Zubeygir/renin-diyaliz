import { defineField, defineType } from "sanity";

export const staffPageType = defineType({
  name: "staffPage",
  title: "Kadromuz Sayfası",
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
        tr: "Kadromuz",
        en: "Our Team",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "Deneyimli hekimlerimiz, hemşirelerimiz ve diyaliz teknikerlerimiz ile hastalarımızın yanındayız.",
        en: "By our patients' side with our experienced physicians, nurses, and dialysis technicians.",
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
        tr: "Uzman Sağlık Kadromuz",
        en: "Our Healthcare Staff",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık / Kısa Yazı",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "Böbrek hastalarımıza güler yüzlü, güvenilir ve yüksek kalite standartlarında tedavi sunan ekibimiz.",
        en: "Our team offering friendly, reliable, and high-standard treatment to renal patients.",
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "Ekibe Katılım CTA Buton Metni",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Ekibimize Katılın",
        en: "Join Our Team",
      },
    }),
    defineField({
      name: "ctaLink",
      title: "Ekibe Katılım CTA Buton Linki",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "https://forms.google.com",
        en: "https://forms.google.com",
      },
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
