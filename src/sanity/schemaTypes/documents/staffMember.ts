import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const staffMemberType = defineType({
  name: "staffMember",
  title: "Personel",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ad Soyad", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "role",
      title: "Unvan / Görev",
      type: "localizedString",
      description: "Örn: Sorumlu Hekim, Diyaliz Hemşiresi",
    }),
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
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      description: "Opsiyoneldir. Fotoğraf kullanımı için ilgili personelden yazılı onay alınmış olmalıdır (KVKK).",
    }),
    defineField({
      name: "hasDetailPage",
      title: "Detay Sayfası Olsun mu?",
      type: "boolean",
      initialValue: false,
      description: "Açık olduğunda personel için detay sayfası oluşturulur ve kadromuz listesinde linki gösterilir.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "object",
      hidden: ({ document }) => !document?.hasDetailPage,
      fields: [
        defineField({
          name: "tr",
          title: "Türkçe Slug (TR)",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
            slugify: turkishSlugify,
          },
        }),
        defineField({
          name: "en",
          title: "İngilizce Slug (EN)",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
            slugify: turkishSlugify,
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { hasDetailPage?: boolean } | undefined;
          if (doc?.hasDetailPage) {
            const val = value as { tr?: { current?: string }; en?: { current?: string } } | undefined;
            if (!val?.tr?.current) {
              return "Detay sayfası aktifken Türkçe slug girilmelidir.";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "bio",
      title: "Özgeçmiş",
      type: "localizedPortableText",
      hidden: ({ document }) => !document?.hasDetailPage,
    }),
    defineField({
      name: "education",
      title: "Eğitim Durumu",
      type: "array",
      of: [{ type: "localizedString" }],
      hidden: ({ document }) => !document?.hasDetailPage,
    }),
    defineField({
      name: "skills",
      title: "Uzmanlık Alanları / Yetenekler",
      type: "array",
      of: [{ type: "localizedString" }],
      hidden: ({ document }) => !document?.hasDetailPage,
    }),
    defineField({
      name: "certificates",
      title: "Sertifikalar",
      type: "array",
      of: [{ type: "localizedString" }],
      hidden: ({ document }) => !document?.hasDetailPage,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      hidden: ({ document }) => !document?.hasDetailPage,
    }),
    defineField({ name: "order", title: "Sıralama", type: "number", description: "Grup içinde küçükten büyüğe sıralanır." }),
  ],
  orderings: [{ title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role.tr", media: "photo" },
  },
});
