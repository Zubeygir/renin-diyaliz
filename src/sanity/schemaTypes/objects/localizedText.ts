import { defineType, defineField } from "sanity";

export const localizedTextType = defineType({
  name: "localizedText",
  title: "Çok Dilli Uzun Metin",
  type: "object",
  fieldsets: [
    {
      name: "translations",
      title: "Dil Çevirileri (Translations)",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "tr",
      title: "Türkçe (TR)",
      type: "text",
      rows: 4,
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "İngilizce (EN)",
      type: "text",
      rows: 4,
      fieldset: "translations",
    }),
    defineField({
      name: "de",
      title: "Almanca (DE)",
      type: "text",
      rows: 4,
      fieldset: "translations",
    }),
    defineField({
      name: "ar",
      title: "Arapça (AR)",
      type: "text",
      rows: 4,
      fieldset: "translations",
    }),
  ],
});
