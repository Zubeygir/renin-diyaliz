import { defineField, defineType } from "sanity";

export const cookiePolicyPageType = defineType({
  name: "cookiePolicyPage",
  title: "Çerez Politikası",
  type: "document",
  groups: [
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "localizedString", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Metin", type: "localizedPortableText", group: "content" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
