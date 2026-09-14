import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
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
        tr: "İletişim",
        en: "Contact",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "Sorularınız, tedavi planlaması ve hasta nakil servisimiz için merkezimize ulaşabilirsiniz.",
        en: "Contact our center for your questions, treatment planning, and patient transport services.",
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
        tr: "Bize Ulaşın",
        en: "Contact Us",
      },
    }),
    defineField({
      name: "pageSubtitle",
      title: "Giriş Metni",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "Merkezimiz haftanın 6 günü seans hizmeti vermektedir. Telefon, e-posta veya doğrudan adresimizden bize ulaşabilirsiniz.",
        en: "Our center provides session services 6 days a week. You can reach us via phone, email, or directly at our address.",
      },
    }),
    defineField({
      name: "showForm",
      title: "İletişim Formunu Göster",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Açılırsa sayfada e-posta formu gösterilir. Kapalıyken form gizlenir.",
    }),
    defineField({ name: "formTitle", title: "Form Başlığı", type: "localizedString", group: "content" }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      type: "array",
      group: "content",
      description: "Merkezin açık olduğu günler ve saatler.",
      initialValue: [
        {
          days: { tr: "Pazartesi, Çarşamba, Cuma", en: "Monday, Wednesday, Friday" },
          hours: "06:30 – 21:30",
        },
        {
          days: { tr: "Salı, Perşembe, Cumartesi", en: "Tuesday, Thursday, Saturday" },
          hours: "06:30 – 17:30",
        },
        {
          days: { tr: "Pazar", en: "Sunday" },
          hours: "Kapalı / Closed",
        },
      ],
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", title: "Gün(ler)", type: "localizedString" }),
            defineField({ name: "hours", title: "Saatler", type: "string" }),
          ],
          preview: {
            select: { title: "days.tr", subtitle: "hours" },
          },
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "Sık Sorulan Sorular (SSS)",
      type: "array",
      group: "content",
      description: "İletişim sayfasında gösterilecek soru ve cevaplar.",
      initialValue: [
        {
          question: {
            tr: "SGK veya özel sigorta anlaşmanız bulunuyor mu?",
            en: "Do you have agreements with SGK or private insurance?",
          },
          answer: {
            tr: "Evet, merkezimiz SGK ve anlaşmalı özel sağlık sigortaları protokolleri çerçevesinde hizmet vermektedir. Hemodiyaliz tedavisi ilgili mevzuata uygun şekilde karşılanmaktadır.",
            en: "Yes, our center operates under protocols with SGK and contracted private health insurance providers. Hemodialysis treatment is covered in compliance with regulations.",
          },
        },
        {
          question: {
            tr: "Hastalarınız için servis (hasta transferi) hizmeti var mı?",
            en: "Do you provide patient transport services?",
          },
          answer: {
            tr: "Evet, hastalarımızın evlerinden alınarak merkezimize getirilmesi ve seans tamamlandıktan sonra tekrar evlerine güvenle bırakılması için servis ağımız bulunmaktadır.",
            en: "Yes, we provide transport services ensuring safe transit for our patients from their homes to our center and back after treatment.",
          },
        },
        {
          question: {
            tr: "Merkezinizin yatak ve diyaliz cihazı kapasitesi nedir?",
            en: "What is your bed and dialysis equipment capacity?",
          },
          answer: {
            tr: "Merkezimiz 50+1 yatak ve diyaliz kapasitesine sahip olup deneyimli hekimler ve güncel teknolojiye sahip cihazlarla hizmet sunmaktadır.",
            en: "Our center has a capacity of 50+1 beds and dialysis units, operating with experienced physicians and state-of-the-art equipment.",
          },
        },
        {
          question: {
            tr: "Merkezinize ilk başvuru için hangi belgeler gerekmektedir?",
            en: "What documents are required for first-time admission?",
          },
          answer: {
            tr: "T.C. kimlik belgesi, mevcut diyaliz raporu ve epikriz belgeleriniz ile merkezimize başvurabilirsiniz. Detaylı bilgi ve randevu için danışma hattımızdan iletişime geçebilirsiniz.",
            en: "You can apply with your ID card, current dialysis report, and epicrisis documents. Please contact our helpline for detailed information.",
          },
        },
      ],
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Soru", type: "localizedString" }),
            defineField({ name: "answer", title: "Cevap", type: "localizedText" }),
          ],
          preview: {
            select: { title: "question.tr" },
          },
        },
      ],
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
