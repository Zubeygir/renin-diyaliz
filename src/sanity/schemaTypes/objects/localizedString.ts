import { defineType, defineField } from "sanity";

export const localizedStringType = defineType({
  name: "localizedString",
  title: "Çok Dilli Metin",
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
      type: "string",
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "İngilizce (EN)",
      type: "string",
      fieldset: "translations",
    }),
  ],
});
