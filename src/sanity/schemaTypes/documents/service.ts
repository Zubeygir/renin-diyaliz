import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "localizedString" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localizedSlug",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const val = value as { tr?: { current?: string }; en?: { current?: string } } | undefined;
          if (!val?.tr?.current) {
            return "Hizmetin yayına alınabilmesi için Türkçe slug (TR) zorunludur. 'Generate' butonuna basarak oluşturabilirsiniz.";
          }
          return true;
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Açıklama",
      description: "Ana sayfa ve hizmet listesinde başlığın altında gösterilen 1-2 cümlelik olgusal özet.",
      type: "localizedText",
    }),
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
        title: title || "Başlıksız Hizmet",
        subtitle: subtitle || "EN çevirisi yok",
        media,
      };
    },
  },
});
