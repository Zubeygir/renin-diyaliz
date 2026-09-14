import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Galeri Görseli",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
      description: "Sadece tesis, cihaz veya mekan fotoğrafı. Hasta görseli kullanılmaz.",
    }),
    defineField({ name: "caption", title: "Açıklama", type: "string" }),
    defineField({ name: "order", title: "Sıralama", type: "number", description: "Küçükten büyüğe sıralanır." }),
  ],
  orderings: [{ title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "caption", media: "image" }, prepare: ({ title, media }) => ({ title: title || "Galeri Görseli", media }) },
});
