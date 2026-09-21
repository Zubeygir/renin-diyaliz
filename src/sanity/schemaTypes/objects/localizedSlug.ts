import { defineType, defineField } from "sanity";
import { turkishSlugify, germanSlugify, arabicSlugify } from "../../lib/slugify";

export const localizedSlugType = defineType({
  name: "localizedSlug",
  title: "Çok Dilli Slug",
  type: "object",
  fieldsets: [
    {
      name: "translations",
      title: "Dil Slug'ları (Slug Translations)",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "tr",
      title: "Türkçe Slug (TR)",
      type: "slug",
      options: {
        source: "title.tr",
        maxLength: 96,
        slugify: turkishSlugify,
      },
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "İngilizce Slug (EN)",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
        slugify: turkishSlugify,
      },
      fieldset: "translations",
    }),
    defineField({
      name: "de",
      title: "Almanca Slug (DE)",
      type: "slug",
      options: {
        source: "title.de",
        maxLength: 96,
        slugify: germanSlugify,
      },
      fieldset: "translations",
    }),
    defineField({
      name: "ar",
      title: "Arapça Slug (AR)",
      type: "slug",
      options: {
        source: "title.ar",
        maxLength: 96,
        slugify: arabicSlugify,
      },
      fieldset: "translations",
    }),
  ],
});
