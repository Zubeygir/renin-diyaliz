import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "localizedPortableText",
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
        title: title || "Başlıksız Proje",
        subtitle: subtitle || "EN çevirisi yok",
        media,
      };
    },
  },
});
