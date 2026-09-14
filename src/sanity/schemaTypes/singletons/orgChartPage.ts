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
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "localizedString",
      group: "hero",
      initialValue: {
        tr: "Organizasyon Şeması",
        en: "Organization Chart",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "Özel Renin Diyaliz Merkezi kurumsal ve tıbbi yönetim yapılanması.",
        en: "Corporate and medical management structure of Private Renin Dialysis Center.",
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
        tr: "Yönetim ve Organizasyon Yapımız",
        en: "Our Management & Organization Structure",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık / Kısa Yazı",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "NEFRO-MED Sağlık Hizmetleri San. ve Tic. A.Ş. bünyesinde Mesul Müdürlük, Sorumlu Hekimlik, Başhemşirelik, Hemşirelik ve Teknik Personel koordineli işleyişi.",
        en: "Coordinated operation of Medical Direction, Supervising Physician, Head Nurse, Nursing and Technical Staff under NEFRO-MED Saglik Hizmetleri San. ve Tic. A.S.",
      },
    }),
    defineField({
      name: "chartImage",
      title: "Organizasyon Şeması Görseli",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
