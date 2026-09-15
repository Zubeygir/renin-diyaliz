import { defineField, defineType } from "sanity";

const navItemFields = [
  defineField({ name: "label", title: "Etiket", type: "localizedString" }),
  defineField({
    name: "href",
    title: "Link / Path",
    type: "localizedString",
    description: "İç sayfa için: /hakkimizda, /blog gibi. Dış link için: https://google.com. Diller farklı path kullanıyorsa (örn: /hakkimizda vs /en/about) her dil için ayrı girilmeli.",
  }),
  defineField({ name: "openInNewTab", title: "Yeni Sekmede Aç", type: "boolean", initialValue: false }),
  defineField({
    name: "subLinks",
    title: "Alt Linkler",
    type: "array",
    of: [{
      type: "object",
      fields: [
        defineField({ name: "label", title: "Etiket", type: "localizedString" }),
        defineField({ name: "href", title: "Link / Path", type: "localizedString", description: "Örn: /hakkimizda veya /en/about" }),
        defineField({
          name: "description",
          title: "Kısa Açıklama",
          type: "localizedString",
          description: "Mega menüde etiketin altında gösterilen tek satırlık özet (opsiyonel).",
        }),
        defineField({ name: "openInNewTab", title: "Yeni Sekmede Aç", type: "boolean", initialValue: false }),
      ],
      preview: {
        select: { title: "label.tr", subtitle: "href.tr" },
      },
    }],
  }),
];

export const navigationType = defineType({
  name: "navigation",
  title: "Navigasyon",
  type: "document",
  fields: [
    defineField({
      name: "headerLinks",
      title: "Header Menü Linkleri",
      type: "array",
      of: [{ type: "object", fields: navItemFields, preview: { select: { title: "label.tr", subtitle: "href.tr" } } }],
      initialValue: [
        {
          label: { tr: "Kurumsal", en: "Corporate" },
          href: { tr: "/hakkimizda", en: "/en/about" },
          subLinks: [
            { label: { tr: "Hakkımızda", en: "About Us" }, href: { tr: "/hakkimizda", en: "/en/about" }, description: { tr: "Merkezimiz, kapasitemiz ve hizmet anlayışımız.", en: "Our center, capacity and approach to care." } },
            { label: { tr: "Misyon / Vizyon / Değerler / Kalite Politikası", en: "Mission / Vision / Values" }, href: { tr: "/misyon-vizyon-degerler", en: "/en/mission-vision-values" }, description: { tr: "Kurumsal değerlerimiz ve kalite politikamız.", en: "Our values and quality policy." } },
            { label: { tr: "Organizasyon Şeması", en: "Organization Chart" }, href: { tr: "/organizasyon-semasi", en: "/en/organization-chart" }, description: { tr: "Unvan ve sorumluluk hiyerarşimiz.", en: "Our title and responsibility hierarchy." } },
          ],
        },
        { label: { tr: "Kadromuz", en: "Our Team" }, href: { tr: "/kadromuz", en: "/en/team" } },
        {
          label: { tr: "Hizmetler", en: "Services" },
          href: { tr: "/hizmetler", en: "/en/services" },
          subLinks: [
            { label: { tr: "Hemodiyaliz", en: "Hemodialysis" }, href: { tr: "/hizmetler/hemodiyaliz", en: "/en/services/hemodialysis" }, description: { tr: "Hemodiyaliz tedavi süreci hakkında bilgi.", en: "About the hemodialysis treatment process." } },
            { label: { tr: "Hasta Servis Hizmeti", en: "Patient Transport Service" }, href: { tr: "/hizmetler/hasta-servis-hizmeti", en: "/en/services/patient-transport" }, description: { tr: "Hasta taşıma hizmetinin kapsamı.", en: "Scope of our patient transport service." } },
            { label: { tr: "SGK ve Özel Sigorta Süreçleri", en: "Social Security & Insurance" }, href: { tr: "/hizmetler/sgk-ve-ozel-sigorta-surecleri", en: "/en/services/insurance-agreements" }, description: { tr: "SGK ve özel sigorta anlaşma süreçleri.", en: "SGK and private insurance procedures." } },
          ],
        },
        { label: { tr: "Galeri", en: "Gallery" }, href: { tr: "/galeri", en: "/en/gallery" } },
        { label: { tr: "Blog", en: "Blog" }, href: { tr: "/blog", en: "/en/blog" } },
        { label: { tr: "İletişim", en: "Contact" }, href: { tr: "/iletisim", en: "/en/contact" } },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Menü Linkleri",
      type: "array",
      of: [{ type: "object", fields: navItemFields, preview: { select: { title: "label.tr", subtitle: "href.tr" } } }],
      initialValue: [
        { label: { tr: "Hakkımızda", en: "About Us" }, href: { tr: "/hakkimizda", en: "/en/about" } },
        { label: { tr: "Kadromuz", en: "Our Team" }, href: { tr: "/kadromuz", en: "/en/team" } },
        { label: { tr: "Hizmetler", en: "Services" }, href: { tr: "/hizmetler", en: "/en/services" } },
        { label: { tr: "Galeri", en: "Gallery" }, href: { tr: "/galeri", en: "/en/gallery" } },
        { label: { tr: "Blog", en: "Blog" }, href: { tr: "/blog", en: "/en/blog" } },
        { label: { tr: "İletişim", en: "Contact" }, href: { tr: "/iletisim", en: "/en/contact" } },
      ],
    }),
  ],
});
