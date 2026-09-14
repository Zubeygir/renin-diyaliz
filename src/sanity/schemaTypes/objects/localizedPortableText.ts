import { defineType, defineField } from "sanity";

const richTextOf = [
  { type: "block" },
  {
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", title: "Alt Metni", type: "string" }),
      defineField({
        name: "alignment",
        title: "Hizalama",
        type: "string",
        options: {
          list: [
            { title: "Sol", value: "left" },
            { title: "Orta", value: "center" },
            { title: "Sağ", value: "right" },
            { title: "Tam Genişlik", value: "full" },
          ],
        },
        initialValue: "center",
      }),
      defineField({
        name: "size",
        title: "Boyut",
        type: "string",
        options: {
          list: [
            { title: "Çok Küçük (%25)", value: "25" },
            { title: "Küçük (%33)", value: "33" },
            { title: "Orta (%50)", value: "50" },
            { title: "Geniş (%75)", value: "75" },
            { title: "Tam Genişlik (%100)", value: "100" },
          ],
        },
        initialValue: "100",
      }),
    ],
  },
  { type: "customHtml" },
];

export const localizedPortableTextType = defineType({
  name: "localizedPortableText",
  title: "Çok Dilli Zengin Metin",
  type: "object",
  fieldsets: [
    {
      name: "translations",
      title: "Zengin Metin Çevirileri (Rich Text Translations)",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "tr",
      title: "Türkçe İçerik (TR)",
      type: "array",
      of: richTextOf,
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "İngilizce İçerik (EN)",
      type: "array",
      of: richTextOf,
      fieldset: "translations",
    }),
  ],
});
