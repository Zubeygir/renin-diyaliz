import { defineField, defineType } from "sanity";

export const staffMemberType = defineType({
  name: "staffMember",
  title: "Personel",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ad Soyad", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Unvan / Görev", type: "string", validation: (Rule) => Rule.required(), description: "Örn: Sorumlu Hekim, Diyaliz Hemşiresi" }),
    defineField({
      name: "group",
      title: "Grup",
      type: "string",
      options: {
        list: [
          { title: "Hekimler", value: "hekimler" },
          { title: "Hemşirelik", value: "hemsirelik" },
          { title: "Teknik Personel", value: "teknik" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Fotoğraf",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
      description: "Fotoğraf kullanımı için ilgili personelden yazılı onay alınmış olmalıdır (KVKK).",
    }),
    defineField({ name: "order", title: "Sıralama", type: "number", description: "Grup içinde küçükten büyüğe sıralanır." }),
  ],
  orderings: [{ title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
