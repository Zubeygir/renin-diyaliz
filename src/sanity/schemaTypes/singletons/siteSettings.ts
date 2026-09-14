import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Adı", type: "string", validation: (Rule) => Rule.required(), initialValue: "Özel Renin Diyaliz Merkezi" }),
    defineField({
      name: "siteTagline",
      title: "Slogan",
      type: "localizedString",
      initialValue: {
        tr: "Sağlığınız ve Yaşam Kaliteniz İçin",
        en: "For Your Health and Quality of Life",
      },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "Önerilen: 400x120px (Yatay) veya 200x200px (Kare). Şeffaf PNG veya SVG tercih edilmelidir.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternatif Metin",
          type: "string",
          description: "Görsel yüklenemediğinde görünecek olan yazı (Örn: Şirket Logo)",
        }),
      ],
    }),
    defineField({ name: "favicon", title: "Favicon", type: "image", description: "512x512px kare görsel önerilir." }),
    defineField({ name: "defaultOgImage", title: "Varsayılan OG Görseli", type: "image", description: "Sosyal medya paylaşımları için. 1200x630px." }),
    defineField({
      name: "defaultSeo",
      title: "Varsayılan SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Başlık", type: "string", validation: (Rule) => Rule.max(60), initialValue: "Özel Renin Diyaliz Merkezi | Şişli İstanbul" }),
        defineField({ name: "metaDescription", title: "Meta Açıklama", type: "text", rows: 3, validation: (Rule) => Rule.max(160), initialValue: "2000 yılından bu yana 50+1 yatak ve diyaliz kapasitemiz, uzman hekim ve sağlık ekibimizle hemodiyaliz ve böbrek sağlığı hizmeti sunuyoruz." }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "İletişim Bilgileri",
      type: "object",
      fields: [
        defineField({ name: "phone", title: "Telefon (Sabit Hat)", type: "string", initialValue: "0212 320 10 12" }),
        defineField({ name: "phone2", title: "İkinci Telefon / Mobil Hat", type: "string", description: "Örn: 0533 316 97 16", initialValue: "0533 316 97 16" }),
        defineField({ name: "email", title: "E-posta", type: "string", initialValue: "info@renindiyaliz.com" }),
        defineField({
          name: "address",
          title: "Adres",
          type: "localizedText",
          initialValue: {
            tr: "Halil Rıfat Paşa Mah. Arel Sk. No:4, Şişli / İstanbul",
            en: "Halil Rifat Pasa Mah. Arel Sk. No:4, Sisli / Istanbul",
          },
        }),
        defineField({
          name: "whatsappNumber",
          title: "WhatsApp Numarası",
          type: "string",
          description: "Başında + ile ülke kodu dahil. Örn: +905001234567",
          initialValue: "+905333169716",
        }),
        defineField({
          name: "mapIframe",
          title: "Harita iFrame Kodu",
          type: "text",
          rows: 4,
          description: "Google Maps > Paylaş > Haritayı göm > HTML kodunu buraya yapıştır.",
        }),
      ],
    }),
    defineField({ name: "socialLinks", title: "Sosyal Medya Hesapları", type: "array", of: [{ type: "socialLink" }] }),
    defineField({ name: "gaId", title: "Google Analytics ID", type: "string", description: "Örn: G-XXXXXXXXXX" }),
    defineField({ name: "gtmId", title: "Google Tag Manager ID", type: "string", description: "Örn: GTM-XXXXXXX" }),
    defineField({
      name: "googleSearchConsoleId",
      title: "Google Search Console Doğrulama Kodu",
      type: "string",
      description: "Search Console meta etiketi içerisindeki 'content' değerini buraya girin. Örn: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    }),
  ],
  preview: { select: { title: "siteName" } },
});
