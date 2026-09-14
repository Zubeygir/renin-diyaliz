import { defineField, defineType } from "sanity";

export const galleryPageType = defineType({
  name: "galleryPage",
  title: "Galeri Sayfası",
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
        tr: "Galeri",
        en: "Gallery",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "50+1 yatak ve diyaliz kapasitemiz, modern cihaz altyapımız ve tedavi alanlarımız.",
        en: "50+1 bed and dialysis capacity, modern device infrastructure, and treatment areas.",
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
        tr: "Tesisimiz ve Cihazlarımız",
        en: "Our Facilities & Equipment",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık / Kısa Yazı",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "Hijyenik koşullarda, hasta konforunu ve güvenliğini önceleyen modern tedavi salonlarımız.",
        en: "Our modern treatment halls prioritizing patient comfort and safety in hygienic conditions.",
      },
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
