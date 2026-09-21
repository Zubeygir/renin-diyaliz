import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO Ayarları",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Başlık",
      type: "localizedString",
      description: "Boş bırakılırsa sayfa başlığı kullanılır. Maksimum 60 karakter.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Açıklama",
      type: "localizedText",
      description: "Boş bırakılırsa varsayılan site açıklaması kullanılır. Maksimum 160 karakter.",
    }),
    defineField({
      name: "ogImage",
      title: "Sosyal Medya Görseli (OG Image)",
      type: "image",
      description: "Boş bırakılırsa varsayılan site OG görseli kullanılır. Önerilen: 1200x630px",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Yalnızca özel bir canonical URL gerekiyorsa doldur. Aksi halde otomatik belirlenir.",
    }),
    defineField({
      name: "noIndex",
      title: "Arama Motorlarından Gizle",
      type: "boolean",
      description: "Açılırsa bu sayfa Google tarafından indexlenmez.",
      initialValue: false,
    }),
  ],
});
