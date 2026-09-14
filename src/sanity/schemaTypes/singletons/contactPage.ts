import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
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
    defineField({ name: "pageSubtitle", title: "Giriş Metni", type: "localizedText", group: "content" }),
    defineField({
      name: "showForm",
      title: "İletişim Formunu Göster",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Açılırsa sayfada e-posta formu gösterilir. Kapalıyken form gizlenir.",
    }),
    defineField({ name: "formTitle", title: "Form Başlığı", type: "localizedString", group: "content" }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "localizedText",
      group: "content",
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
