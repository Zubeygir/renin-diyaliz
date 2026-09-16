import { defineField, defineType, defineArrayMember } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "localizedString",
      group: "hero",
      initialValue: {
        tr: "Hakkımızda",
        en: "About Us",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "2000 yılından bu yana hemodiyaliz alanında deneyimli hekim kadromuzla yüksek kalite standartlarında hizmet sunuyoruz.",
        en: "Providing high quality healthcare services in hemodialysis with our experienced physician staff since 2000.",
      },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    // Content Group
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Renin Diyaliz Merkezi",
        en: "Renin Dialysis Center",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Giriş Alt Başlığı",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "NEFRO-MED Sağlık Hizmetleri Sanayi ve Ticaret A.Ş. bünyesinde deneyimli ve güler yüzlü sağlık ekibi.",
        en: "Experienced and friendly healthcare team under NEFRO-MED Saglik Hizmetleri Sanayi ve Ticaret A.S.",
      },
    }),
    defineField({
      name: "body",
      title: "Detaylı İçerik",
      type: "localizedPortableText",
      group: "content",
      initialValue: {
        tr: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Renin Diyaliz Merkezi, hemodiyaliz alanında uzman hekimler tarafından kurulan bir sağlık kuruluşudur. Merkez, böbrek hastalarına deneyimli ve güler yüzlü bir sağlık ekibiyle, daha rahat koşullarda tedavi imkânı sağlamayı amaçlamaktadır.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "2000 yılından bu yana hizmet veren merkezimiz, hastaların yaşam kalitesini yükseltmeye ve hemodiyaliz tedavisini yüksek kalite standartlarında sunmaya odaklanmaktadır.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Merkezin uzun vadeli hedefleri arasında tıbbi hizmetlerde yüksek kaliteye ulaşmak, altyapıyı geliştirmek ve kurumsal gelişimi sürdürmek yer almaktadır. Merkez; hasta ve hasta yakını memnuniyeti, sürekli gelişim, yüksek performans ve ekip çalışmasını temel değerler arasında benimsemektedir.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Merkezimiz kurumsal olarak NEFRO-MED Sağlık Hizmetleri Sanayi ve Ticaret A.Ş. tüzel kişiliği bünyesinde faaliyetlerini sürdürmektedir.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Renin Dialysis Center is a healthcare institution founded by physicians specialized in hemodialysis. The center aims to provide kidney patients with treatment opportunities in more comfortable conditions with an experienced and friendly healthcare team.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Serving since 2000, our center focuses on improving patients' quality of life and providing hemodialysis treatment at high quality standards.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Among the long-term goals of the center are achieving high quality in medical services, improving infrastructure, and sustaining institutional development. Patient and family satisfaction, continuous improvement, high performance, and teamwork are core corporate values.",
              },
            ],
          },
        ],
      },
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel (Yandaki Resim)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({
      name: "facts",
      title: "Kurumsal Künye Bilgileri",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "factItem",
          title: "Künye Maddesi",
          fields: [
            defineField({ name: "label", title: "Etiket", type: "localizedString" }),
            defineField({ name: "value", title: "Değer", type: "localizedString" }),
          ],
          preview: {
            select: { title: "label.tr", subtitle: "value.tr" },
          },
        }),
      ],
      initialValue: [
        { label: { tr: "Kuruluş", en: "Established" }, value: { tr: "2000", en: "2000" } },
        { label: { tr: "İşleten Şirket", en: "Operating Entity" }, value: { tr: "Nefro-Med Sağlık Hizmetleri A.Ş.", en: "Nefro-Med Saglik Hizmetleri A.S." } },
        { label: { tr: "Cihaz Kapasitesi", en: "Device Capacity" }, value: { tr: "50+1 Hemodiyaliz Makinesi", en: "50+1 Hemodialysis Machines" } },
        { label: { tr: "Tedavi Odaları", en: "Treatment Rooms" }, value: { tr: "Genel ve İzole Odalar (Hepatit B / C)", en: "General & Isolated Rooms (Hepatitis B / C)" } },
        { label: { tr: "Sosyal Güvence", en: "Social Security" }, value: { tr: "SGK / Özel Sigorta Anlaşmalı", en: "Contracted with SGK & Private Insurances" } },
        { label: { tr: "Kalite Standartları", en: "Quality Standards" }, value: { tr: "SKS Diyaliz Seti Uyumu", en: "SKS Dialysis Standards Compliance" } },
      ],
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
