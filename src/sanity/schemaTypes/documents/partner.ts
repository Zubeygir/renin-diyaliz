import { defineField, defineType } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Anlaşmalı Kurum",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Kurum Adı",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Bağlantı (Opsiyonel)",
      type: "url",
      description: "Kurumun resmi web sitesi. Boş bırakılırsa logo tıklanamaz.",
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      description: "Küçükten büyüğe sıralanır.",
    }),
  ],
  orderings: [{ title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
