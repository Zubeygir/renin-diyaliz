import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({ name: "publishedAt", title: "Yayın Tarihi", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "author",
      title: "Yazar",
      type: "object",
      description: "Sağlık meslek mensubu imzası. Örn: 'Uzm. Dr. Ayşe Yılmaz'",
      fields: [
        defineField({ name: "name", title: "Ad Soyad", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "title", title: "Unvan", type: "localizedString", description: "Örn: Uzm. Dr., Diyaliz Hemşiresi" }),
      ],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "blogCategory" }],
      description: "Blog yazısının ait olduğu kategori",
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      type: "localizedText",
      description: "Liste sayfalarında gösterilir.",
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "localizedPortableText",
    }),
    defineField({
      name: "seoTags",
      title: "SEO Etiketleri",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "SEO ve sayfa altı etiketleri için etiketler ekleyin (Enter ile ayırın).",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title.tr",
      subtitle: "title.en",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Başlıksız Yazı",
        subtitle: subtitle || "EN çevirisi yok",
        media,
      };
    },
  },
  orderings: [{ title: "Yayın Tarihi (Yeni→Eski)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});
