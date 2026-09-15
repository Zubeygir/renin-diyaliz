import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "about", title: "Hakkımızda Önizleme" },
    { name: "services", title: "Hizmetler Önizleme" },
    { name: "serviceArea", title: "Servis Ağı / Kapsama Alanı" },
    { name: "partners", title: "Anlaşmalı Kurumlar" },
    { name: "blog", title: "Blog Önizleme" },
    { name: "contactCta", title: "İletişim Kapanış Bloğu" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Hero Group
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "localizedString",
      group: "hero",
      initialValue: {
        tr: "Deneyim ile Buluşan Tıbbi Hizmetler",
        en: "Medical Services Meeting Experience",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "Hastaların bakımına ve yaşam kalitesini artırmaya odaklanarak; 50+1 yatak ve diyaliz kapasitemiz, deneyimli doktorlarımız ve güncel teknolojiye sahip cihazlarımızla hizmet veriyoruz.",
        en: "Focusing on patient care and improving quality of life; serving with our 50+1 bed and dialysis capacity, experienced physicians, and modern technology devices.",
      },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Poster / Yedek Görseli",
      description:
        "Video yüklenene kadar veya video eklenmemişse gösterilir. Video kesintisiz oynamaya başlayana kadar boş ekran görünmemesi için zorunludur.",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video (MP4)",
      description:
        "Anasayfa hero bölümünde otomatik oynayan arka plan videosu. MP4 formatında, tercihen sıkıştırılmış (~15-20MB altı) yükleyin. Video eklenmezse poster görseli gösterilir.",
      type: "file",
      group: "hero",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "heroVideoWebm",
      title: "Hero Video (WebM - Opsiyonel)",
      description:
        "Aynı videonun WebM formatındaki sürümü. Genelde MP4'e göre daha küçük dosya boyutu sağlar. Eklenirse tarayıcı destekliyorsa öncelikli olarak bu oynatılır, desteklemiyorsa MP4'e geçilir.",
      type: "file",
      group: "hero",
      options: { accept: "video/webm" },
    }),
    defineField({
      name: "heroCtaLabel",
      title: "1. Buton Metni",
      type: "localizedString",
      group: "hero",
      initialValue: {
        tr: "Hizmetlerimiz",
        en: "Our Services",
      },
    }),
    defineField({
      name: "heroCtaLink",
      title: "1. Buton Linki",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "linkType",
          title: "Link Tipi",
          type: "string",
          options: {
            list: [
              { title: "İç Sayfa (Önerilen)", value: "internal" },
              { title: "Manuel Link", value: "manual" },
            ],
            layout: "radio",
          },
          initialValue: "internal",
        }),
        defineField({
          name: "internal",
          title: "İç Sayfa Seç",
          type: "reference",
          to: [
            { type: "service" },
            { type: "project" },
            { type: "blogPost" },
            { type: "aboutPage" },
            { type: "contactPage" },
          ],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        }),
        defineField({
          name: "manual",
          title: "Manuel Link",
          type: "localizedString",
          description: "Örn: /blog, /galeri veya https://google.com",
          hidden: ({ parent }) => parent?.linkType !== "manual",
        }),
      ],
    }),
    defineField({
      name: "heroCtaLabel2",
      title: "2. Buton Metni",
      type: "localizedString",
      group: "hero",
      initialValue: {
        tr: "İletişim",
        en: "Contact",
      },
    }),
    defineField({
      name: "heroCtaLink2",
      title: "2. Buton Linki",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "linkType",
          title: "Link Tipi",
          type: "string",
          options: {
            list: [
              { title: "İç Sayfa (Önerilen)", value: "internal" },
              { title: "Manuel Link", value: "manual" },
            ],
            layout: "radio",
          },
          initialValue: "internal",
        }),
        defineField({
          name: "internal",
          title: "İç Sayfa Seç",
          type: "reference",
          to: [
            { type: "service" },
            { type: "project" },
            { type: "blogPost" },
            { type: "aboutPage" },
            { type: "contactPage" },
          ],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        }),
        defineField({
          name: "manual",
          title: "Manuel Link",
          type: "localizedString",
          description: "Örn: /blog, /galeri veya https://google.com",
          hidden: ({ parent }) => parent?.linkType !== "manual",
        }),
      ],
    }),

    // About Preview Group
    defineField({
      name: "aboutTitle",
      title: "Hakkımızda Bölüm Başlığı",
      type: "localizedString",
      group: "about",
      initialValue: {
        tr: "Hakkımızda",
        en: "About Us",
      },
    }),
    defineField({
      name: "aboutSubtitle",
      title: "Hakkımızda Bölüm Alt Başlığı",
      type: "localizedText",
      group: "about",
      initialValue: {
        tr: "Özel Renin Diyaliz Merkezi",
        en: "Private Renin Dialysis Center",
      },
    }),
    defineField({
      name: "aboutText",
      title: "Hakkımızda Kısa Yazı",
      type: "localizedPortableText",
      group: "about",
      initialValue: {
        tr: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Renin Diyaliz Merkezi, hemodiyaliz alanında uzman hekimler tarafından kurulan bir sağlık kuruluşudur. Merkez, böbrek hastalarına deneyimli ve güler yüzlü bir sağlık ekibiyle, daha rahat koşullarda tedavi imkânı sağlamayı amaçlamaktadır. 2000 yılından bu yana hizmet veren merkez, hastaların yaşam kalitesini yükseltmeye ve hemodiyaliz tedavisini yüksek kalite standartlarında sunmaya odaklanmaktadır.",
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
                text: "Renin Dialysis Center is a healthcare institution founded by physicians specializing in hemodialysis. The center aims to provide kidney patients with treatment opportunities in more comfortable conditions with an experienced and friendly healthcare team. Serving since 2000, our center focuses on improving patients' quality of life and providing hemodialysis treatment at high quality standards.",
              },
            ],
          },
        ],
      },
    }),
    defineField({
      name: "aboutImage",
      title: "Hakkımızda Görseli",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({
      name: "aboutCtaLabel",
      title: "Daha Fazla Buton Metni",
      type: "localizedString",
      group: "about",
      initialValue: {
        tr: "Kurumsal Bilgi",
        en: "Corporate Details",
      },
    }),
    defineField({
      name: "aboutCtaLink",
      title: "Buton Linki",
      type: "localizedString",
      group: "about",
      initialValue: {
        tr: "/hakkimizda",
        en: "/en/about",
      },
    }),
    defineField({
      name: "stats",
      title: "Rakamlarla Biz / İstatistikler",
      type: "array",
      group: "about",
      description: "Hakkımızda bölümünde gösterilecek sayaç/istatistik kutuları (Örn: 50+1, 2000, 7/24).",
      initialValue: [
        {
          value: "50+1",
          label: { tr: "Yatak ve Diyaliz Kapasitesi", en: "Bed & Dialysis Capacity" },
        },
        {
          value: "2000",
          label: { tr: "Yılından Bu Yana Hizmet", en: "Serving Since 2000" },
        },
        {
          value: "SKS",
          label: { tr: "Sağlıkta Kalite Standartları", en: "Healthcare Quality Standards" },
        },
      ],
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Değer / Sayı", type: "string", description: "Örn: 50+1 veya 2000" }),
            defineField({ name: "label", title: "Etiket", type: "localizedString", description: "Örn: Cihaz Kapasitesi" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label.tr" },
          },
        },
      ],
    }),

    // Services Preview Group
    defineField({
      name: "servicesTitle",
      title: "Hizmetler Bölüm Başlığı",
      type: "localizedString",
      group: "services",
      initialValue: {
        tr: "Hizmetlerimiz",
        en: "Our Services",
      },
    }),
    defineField({
      name: "servicesSubtitle",
      title: "Hizmetler Bölüm Alt Başlığı",
      type: "localizedText",
      group: "services",
      initialValue: {
        tr: "Deneyimli hekimlerimiz ve güncel teknolojiye sahip cihazlarımızla sunduğumuz tıbbi hizmetler.",
        en: "Medical services provided by experienced physicians and state-of-the-art equipment.",
      },
    }),
    defineField({
      name: "featuredServices",
      title: "Öne Çıkan Hizmetler",
      description: "Ana sayfada gösterilecek hizmetleri seçin ve sıralayın.",
      type: "array",
      group: "services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),

    // Service Area / Coverage Preview Group
    defineField({
      name: "serviceAreaTitle",
      title: "Servis Ağı Bölüm Başlığı",
      type: "localizedString",
      group: "serviceArea",
      initialValue: {
        tr: "Servis Ağımız",
        en: "Our Service Network",
      },
    }),
    defineField({
      name: "serviceAreaSubtitle",
      title: "Servis Ağı Bölüm Alt Başlığı",
      type: "localizedText",
      group: "serviceArea",
      initialValue: {
        tr: "Hastalarımızın evlerinden merkezimize güvenli ulaşımı için hizmet bölgelerimiz.",
        en: "Our service regions for the safe transport of our patients to and from our center.",
      },
    }),
    defineField({
      name: "serviceAreaImage",
      title: "Servis Ağı Görseli / Videosu (Opsiyonel)",
      description:
        "Statik görsel veya harita animasyonu videosu (MP4/WebM). Boş bırakılırsa yerine nötr bir görsel alan gösterilir.",
      type: "file",
      group: "serviceArea",
      options: { accept: "image/*,video/mp4,video/webm" },
    }),

    // Partners Preview Group
    defineField({
      name: "partnersTitle",
      title: "Anlaşmalı Kurumlar Bölüm Başlığı",
      description: "İnce bir logo şeridinin üstünde gösterilen kısa etiket.",
      type: "localizedString",
      group: "partners",
      initialValue: {
        tr: "Anlaşmalı Kurumlarımız",
        en: "Our Partner Institutions",
      },
    }),

    // Blog Preview Group
    defineField({
      name: "blogTitle",
      title: "Blog Bölüm Başlığı",
      type: "localizedString",
      group: "blog",
      initialValue: {
        tr: "Bilgilendirici İçerikler ve Sağlık Rehberi",
        en: "Informative Articles & Health Guide",
      },
    }),
    defineField({
      name: "blogSubtitle",
      title: "Blog Bölüm Alt Başlığı",
      type: "localizedText",
      group: "blog",
      initialValue: {
        tr: "Böbreğin görevleri, böbrek yetmezliği, beslenme ve diyaliz yaşamına dair hekimlerimizden bilgilendirici içerikler.",
        en: "Informative content from our physicians on kidney functions, renal failure, nutrition, and dialysis life.",
      },
    }),
    defineField({
      name: "featuredPosts",
      title: "Öne Çıkan Blog Yazıları",
      description: "Ana sayfada gösterilecek blog yazılarını seçin ve sıralayın. Boş bırakılırsa en son eklenen blog yazıları otomatik gösterilir.",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
    }),

    // Contact CTA Group
    defineField({
      name: "ctaTitle",
      title: "Kapanış Başlığı",
      type: "localizedString",
      group: "contactCta",
      initialValue: {
        tr: "Sorularınız İçin Bize Ulaşın",
        en: "Get in Touch With Us",
      },
    }),
    defineField({
      name: "ctaSubtitle",
      title: "Kapanış Alt Metni",
      type: "localizedText",
      group: "contactCta",
      initialValue: {
        tr: "Randevu ve bilgi talepleriniz için merkezimizle iletişime geçebilirsiniz.",
        en: "You can contact our center for appointments and information requests.",
      },
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "Buton Metni",
      type: "localizedString",
      group: "contactCta",
      initialValue: {
        tr: "İletişime Geçin",
        en: "Contact Us",
      },
    }),

    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
