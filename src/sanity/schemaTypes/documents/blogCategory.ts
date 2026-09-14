import { defineField, defineType } from "sanity";

export const blogCategoryType = defineType({
  name: "blogCategory",
  title: "Blog Kategorisi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kategori Adı",
      type: "localizedString",
      description: "Sitede görünecek kategori adını girin.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localizedSlug",
      description: "URL'de görünecek kategori ismi.",
    }),
  ],
  preview: {
    select: {
      title: "title.tr",
      subtitle: "title.en",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Başlıksız Kategori",
        subtitle: subtitle || "EN çevirisi yok",
      };
    },
  },
});
