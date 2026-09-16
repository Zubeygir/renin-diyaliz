import { defineField, defineType } from "sanity";

export const missionVisionPageType = defineType({
  name: "missionVisionPage",
  title: "Misyon, Vizyon, Değerler ve Kalite Politikası",
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
        tr: "Misyon, Vizyon, Değerler ve Kalite Politikası",
        en: "Mission, Vision, Values & Quality Policy",
      },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık / Kısa Açıklama",
      type: "localizedText",
      group: "hero",
      initialValue: {
        tr: "T.C. Sağlık Bakanlığı Sağlıkta Kalite Standartları doğrultusunda kurumsal ilkelerimiz ve hedeflerimiz.",
        en: "Our corporate principles and objectives in accordance with Ministry of Health Healthcare Quality Standards.",
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
        tr: "Kurumsal İlkelerimiz ve Kalite Politikamız",
        en: "Our Corporate Principles & Quality Policy",
      },
    }),
    defineField({
      name: "missionTitle",
      title: "Misyon Başlığı",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Misyonumuz",
        en: "Our Mission",
      },
    }),
    defineField({
      name: "missionText",
      title: "Misyon Metni",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "Her yıl hizmet kalitesini daha ileriye taşımak; son dönem böbrek yetmezliği olan hastalarda tedavi kalitesini, yaşam süresini ve yaşam kalitesini yüksek tutmak amaçlanmaktadır. Hasta ve hasta yakını memnuniyeti, sürekli gelişim, yüksek performans ve ekip çalışması temel yaklaşım olarak sunulmaktadır.",
        en: "To advance service quality every year; to maintain high treatment quality, survival, and quality of life for end-stage renal disease patients. Patient and family satisfaction, continuous improvement, high performance, and teamwork are presented as our fundamental approach.",
      },
    }),
    defineField({
      name: "visionTitle",
      title: "Vizyon Başlığı",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Vizyonumuz",
        en: "Our Vision",
      },
    }),
    defineField({
      name: "visionText",
      title: "Vizyon Metni",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "Dünya standartlarında hizmet veren, alanında üst düzey ve tercih edilen bir sağlık kurumu olmayı hedeflemektedir.",
        en: "To be a world-class healthcare institution that is preferred and provides top-level services in its field.",
      },
    }),
    defineField({
      name: "valuesTitle",
      title: "Temel Değerler Başlığı",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Temel Değerlerimiz",
        en: "Our Core Values",
      },
    }),
    defineField({
      name: "values",
      title: "Temel Değerler",
      type: "array",
      group: "content",
      of: [{ type: "localizedString" }],
      initialValue: [
        { tr: "Güvenilirlik", en: "Reliability" },
        { tr: "Adil ve hakkaniyetli hizmet", en: "Fair and equitable service" },
        { tr: "Mahremiyet ve gizliliğin korunması", en: "Protection of privacy and confidentiality" },
        { tr: "İnsana ve emeğe saygı", en: "Respect for human life and labor" },
        { tr: "Bilimsel ve akılcı hizmet", en: "Scientific and rational service" },
        { tr: "Ekip çalışması bilinci", en: "Teamwork awareness" },
        { tr: "Yeniliklere açıklık", en: "Openness to innovation" },
      ],
    }),
    defineField({
      name: "qualityPolicyTitle",
      title: "Kalite Politikası Başlığı",
      type: "localizedString",
      group: "content",
      initialValue: {
        tr: "Kalite Yönetim Sistemi",
        en: "Quality Management System",
      },
    }),
    defineField({
      name: "qualityPolicyIntro",
      title: "Kalite Politikası Giriş Metni",
      type: "localizedText",
      group: "content",
      initialValue: {
        tr: "T.C Sağlık Bakanlığı Sağlıkta Kalite ve Akreditasyon Daire Başkanlığının yayınladığı Sağlıkta Kalite Standartları DİYALİZ setine göre çalışmaktadır.",
        en: "Our center operates in accordance with the Healthcare Quality Standards Dialysis Set published by the Republic of Turkey Ministry of Health Department of Healthcare Quality and Accreditation.",
      },
    }),
    defineField({
      name: "qualityPolicyItems",
      title: "Kalite Politikası Maddeleri",
      type: "array",
      group: "content",
      of: [{ type: "localizedString" }],
      initialValue: [
        { tr: "Hastaların doğru kimliklendirilmesi", en: "Accurate identification of patients" },
        { tr: "Çalışanlar arasında etkili iletişim ortamının sağlanması", en: "Ensuring effective communication among staff" },
        { tr: "İlaç güvenliğinin sağlanması", en: "Ensuring medication safety" },
        { tr: "Radyasyon güvenliğinin sağlanması", en: "Ensuring radiation safety" },
        { tr: "Düşmelerden kaynaklanan risklerin azaltılması", en: "Reducing risks arising from falls" },
        { tr: "Tıbbi cihaz güvenliğinin sağlanması", en: "Ensuring medical device safety" },
        { tr: "Hasta mahremiyetinin sağlanması", en: "Ensuring patient privacy" },
        { tr: "Hastaların güvenli transferi", en: "Safe transfer of patients" },
        { tr: "Hasta bilgileri ve kayıtlarının sağlık çalışanları arasında güvenli bir şekilde devredilmesi", en: "Secure handover of patient information and records among healthcare staff" },
        { tr: "Bilgi güvenliğinin sağlanması", en: "Ensuring information security" },
        { tr: "Enfeksiyonların önlenmesi", en: "Prevention of infections" },
        { tr: "Laboratuvarda hasta güvenliğinin sağlanması", en: "Ensuring patient safety in the laboratory" },
      ],
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
