import { defineType, defineField } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

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
  ],
});
