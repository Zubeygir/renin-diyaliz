import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Hizmetler Sayfası",
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
        tr: "Hizmetlerimiz",
        en: "Our Services",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "Böbrek yetmezliği tedavisinde güncel teknoloji, uzman hekim kadrosu ve hasta odaklı yaklaşım.",
        en: "Modern technology, specialist physician staff, and patient-oriented approach in kidney failure treatment.",
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
        tr: "Tıbbi Hizmetlerimiz",
        en: "Our Medical Services",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık / Kısa Yazı",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "50+1 yatak ve diyaliz kapasitemiz, hasta nakil servis ağımız ve SGK anlaşmalı süreçlerimizle hizmetinizdeyiz.",
        en: "At your service with our 50+1 bed and dialysis capacity, patient transport network, and contracted social security processes.",
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Buton Metni",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Bize Ulaşın",
        en: "Contact Us",
      },
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Buton Linki",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "/iletisim",
        en: "/en/contact",
      },
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
