export type Locale = "tr" | "en" | "de" | "ar";

export interface Dictionary {
  common: {
    readMore: string;
    viewAll: string;
    viewDetail: string;
    back: string;
    allServices: string;
    allProjects: string;
    allArticles: string;
    relatedPosts: string;
    share: string;
    category: string;
    date: string;
    backToHome: string;
    notFoundTitle: string;
    notFoundDesc: string;
    errorTitle: string;
    errorDesc: string;
    workingHours: string;
    workingHoursVal: string;
    getDirections: string;
    lastUpdated: string;
    pageContents: string;
    address: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    blog: string;
    contact: string;
    gallery: string;
    staff: string;
    cta: string;
    menu: string;
    close: string;
  };
  about: {
    institutionalFacts: string;
    missionVisionQuality: string;
  };
  missionVision: {
    defaultTitle: string;
    missionTitle: string;
    visionTitle: string;
    valuesTitle: string;
    qualityTitle: string;
  };
  orgChart: {
    defaultTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    phoneLabel: string;
    mobileLabel: string;
    email: string;
    address: string;
    workingHoursTitle: string;
    workingHoursSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
  };
  staff: {
    viewProfile: string;
    backToStaff: string;
    bio: string;
    education: string;
    skills: string;
    certificates: string;
    noStaffFound: string;
    membersUnit: string;
    joinTeamTitle: string;
    joinTeamDesc: string;
    groups: {
      hekimler: string;
      hemsirelik: string;
      teknik: string;
    };
  };
  services: {
    backToServices: string;
    noServicesFound: string;
    serviceInfo: string;
    otherServices: string;
    directConsultation: string;
    sgkTitle: string;
    sgkDesc: string;
    transportTitle: string;
    transportDesc: string;
    consultationTitle: string;
    consultationDesc: string;
  };
  projects: {
    allProjects: string;
    backToProjects: string;
    noProjectsFound: string;
    haveAProject: string;
    haveAProjectDesc: string;
  };
  gallery: {
    noImagesFound: string;
  };
  blog: {
    backToBlog: string;
    allCategories: string;
    noPostsFound: string;
    tags: string;
    preparedBy: string;
    lastUpdated: string;
  };
  legal: {
    kvkkDefaultTitle: string;
    cookieDefaultTitle: string;
  };
  footer: {
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
    kvkk: string;
    cookiePolicy: string;
    social: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  tr: {
    common: {
      readMore: "Devamını Oku",
      viewAll: "Tümünü Gör",
      viewDetail: "Detaylı Bilgi",
      back: "Geri Dön",
      allServices: "Tüm Hizmetlerimiz",
      allProjects: "Tüm Projelerimiz",
      allArticles: "Tüm Yazılarımız",
      relatedPosts: "İlgili Yazılar",
      share: "Paylaş",
      category: "Kategori",
      date: "Tarih",
      backToHome: "Ana Sayfaya Dön",
      notFoundTitle: "Sayfa Bulunamadı",
      notFoundDesc: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
      errorTitle: "Bir Hata Oluştu",
      errorDesc: "Beklenmedik bir sorun meydana geldi. Lütfen tekrar deneyin.",
      workingHours: "Çalışma Saatleri",
      workingHoursVal: "Pazartesi - Cumartesi: 07:00 - 19:00",
      getDirections: "Yol Tarifi",
      lastUpdated: "Son güncelleme:",
      pageContents: "Sayfa Başlıkları",
      address: "Merkez Adresi",
    },
    nav: {
      home: "Ana Sayfa",
      about: "Kurumsal",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
      gallery: "Galeri",
      staff: "Kadromuz",
      cta: "İletişime Geçin",
      menu: "Menü",
      close: "Kapat",
    },
    about: {
      institutionalFacts: "Kurumsal Künye",
      missionVisionQuality: "Misyon, Vizyon ve Kalite Politikası",
    },
    missionVision: {
      defaultTitle: "Misyon, Vizyon, Değerler ve Kalite Politikası",
      missionTitle: "Misyonumuz",
      visionTitle: "Vizyonumuz",
      valuesTitle: "Temel Değerlerimiz",
      qualityTitle: "Kalite Politikamız",
    },
    orgChart: {
      defaultTitle: "Organizasyon Şeması",
    },
    contact: {
      title: "İletişim",
      subtitle: "Sorularınız ve randevu talepleriniz için bize her zaman ulaşabilirsiniz.",
      phone: "Telefon",
      phoneLabel: "Telefon (Sabit Hat)",
      mobileLabel: "Mobil / Danışma",
      email: "E-posta",
      address: "Adres",
      workingHoursTitle: "Çalışma ve Seans Saatleri",
      workingHoursSubtitle: "Haftalık diyaliz seansları ve merkezin açık olduğu saatler.",
      faqTitle: "Sık Sorulan Sorular",
      faqSubtitle: "Diyaliz tedavisi, servis hizmeti ve SGK anlaşmaları hakkında merak edilenler.",
      form: {
        name: "Ad Soyad",
        namePlaceholder: "Adınız ve soyadınız",
        email: "E-posta",
        emailPlaceholder: "ornek@email.com",
        phone: "Telefon",
        phonePlaceholder: "+90 5XX XXX XX XX",
        subject: "Konu",
        subjectPlaceholder: "Mesajınızın konusu",
        message: "Mesajınız",
        messagePlaceholder: "Mesajınızı buraya yazabilirsiniz...",
        submit: "Mesaj Gönder",
        submitting: "Gönderiliyor...",
        success: "Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.",
        error: "Mesaj iletilirken bir hata oluştu. Lütfen tekrar deneyin.",
      },
    },
    staff: {
      viewProfile: "Özgeçmişi İncele",
      backToStaff: "Kadromuza Dön",
      bio: "Hakkında & Biyografi",
      education: "Eğitim Bilgileri",
      skills: "Uzmanlık Alanları & Yetenekler",
      certificates: "Sertifikalar",
      noStaffFound: "Henüz eklenmiş bir personel bulunmuyor.",
      membersUnit: "kişi",
      joinTeamTitle: "Ekibimize Katılın",
      joinTeamDesc: "Hasta odaklı bakım anlayışımıza değer katacak uzman sağlık profesyonellerini aramızda görmekten mutluluk duyarız.",
      groups: {
        hekimler: "Hekimlerimiz",
        hemsirelik: "Hemşirelik Kadrosu",
        teknik: "Teknik Personel",
      },
    },
    services: {
      backToServices: "Hizmetlere Dön",
      noServicesFound: "Henüz eklenmiş bir hizmet bulunmuyor.",
      serviceInfo: "Hizmet Bilgileri",
      otherServices: "Diğer Hizmetlerimiz",
      directConsultation: "Doğrudan Başvuru / Danışma",
      sgkTitle: "Sosyal Güvence (SGK)",
      sgkDesc: "Tüm diyaliz seansları, tetkik ve servis hizmetlerimiz SGK kapsamında ek ücret talep edilmeksizin sunulmaktadır.",
      transportTitle: "Hasta Nakil / Servis",
      transportDesc: "Hastalarımız evlerinden özel servis araçlarımızla alınarak seans sonrası güvenle adreslerine ulaştırılır.",
      consultationTitle: "Tedavi ve Başvuru",
      consultationDesc: "Diyaliz tedaviniz ve merkez transfer süreçleriniz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
    },
    projects: {
      allProjects: "Tüm Projelerimiz",
      backToProjects: "← Projelere Dön",
      noProjectsFound: "Henüz eklenmiş bir proje bulunmuyor.",
      haveAProject: "Bir Projeniz mi Var?",
      haveAProjectDesc: "Diyaliz ve sağlık hizmetleri alanındaki iş birliği ve projeleriniz için bizimle iletişime geçebilirsiniz.",
    },
    gallery: {
      noImagesFound: "Henüz eklenmiş bir görsel bulunmuyor.",
    },
    blog: {
      backToBlog: "Blog'a Dön",
      allCategories: "Tümü",
      noPostsFound: "Henüz eklenmiş bir yazı bulunmuyor.",
      tags: "Etiketler:",
      preparedBy: "{author} tarafından hazırlanmıştır",
      lastUpdated: "Son güncelleme:",
    },
    legal: {
      kvkkDefaultTitle: "KVKK Aydınlatma Metni",
      cookieDefaultTitle: "Çerez Politikası",
    },
    footer: {
      quickLinks: "Hızlı Bağlantılar",
      services: "Hizmetlerimiz",
      contact: "İletişim Bilgileri",
      rights: "Tüm hakları saklıdır.",
      kvkk: "KVKK Aydınlatma Metni",
      cookiePolicy: "Çerez Politikası",
      social: "Sosyal Medya",
    },
  },
  en: {
    common: {
      readMore: "Read More",
      viewAll: "View All",
      viewDetail: "Learn More",
      back: "Go Back",
      allServices: "All Services",
      allProjects: "All Projects",
      allArticles: "All Articles",
      relatedPosts: "Related Posts",
      share: "Share",
      category: "Category",
      date: "Date",
      backToHome: "Back to Home",
      notFoundTitle: "Page Not Found",
      notFoundDesc: "The page you are looking for might have been removed or is temporarily unavailable.",
      errorTitle: "Something Went Wrong",
      errorDesc: "An unexpected error occurred. Please try again.",
      workingHours: "Working Hours",
      workingHoursVal: "Monday - Saturday: 07:00 - 19:00",
      getDirections: "Get Directions",
      lastUpdated: "Last updated:",
      pageContents: "Page Contents",
      address: "Center Address",
    },
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      gallery: "Gallery",
      staff: "Our Team",
      cta: "Contact Us",
      menu: "Menu",
      close: "Close",
    },
    about: {
      institutionalFacts: "Institutional Facts",
      missionVisionQuality: "Mission, Vision & Quality Policy",
    },
    missionVision: {
      defaultTitle: "Mission, Vision, Values & Quality Policy",
      missionTitle: "Our Mission",
      visionTitle: "Our Vision",
      valuesTitle: "Core Values",
      qualityTitle: "Quality Policy",
    },
    orgChart: {
      defaultTitle: "Organization Chart",
    },
    contact: {
      title: "Contact",
      subtitle: "You can always reach out to us for your inquiries and appointment requests.",
      phone: "Phone",
      phoneLabel: "Phone (Landline)",
      mobileLabel: "Mobile / Helpline",
      email: "Email",
      address: "Address",
      workingHoursTitle: "Working & Treatment Hours",
      workingHoursSubtitle: "Our center operates on a regular schedule throughout the week.",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Answers to common questions about treatment, transport, and coverage.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        email: "Email Address",
        emailPlaceholder: "example@email.com",
        phone: "Phone Number",
        phonePlaceholder: "+90 5XX XXX XX XX",
        subject: "Subject",
        subjectPlaceholder: "Subject of your message",
        message: "Your Message",
        messagePlaceholder: "Write your message here...",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Your message has been sent successfully. We will get back to you shortly.",
        error: "An error occurred while sending your message. Please try again.",
      },
    },
    staff: {
      viewProfile: "View Profile",
      backToStaff: "← Back to Team",
      bio: "About & Biography",
      education: "Education",
      skills: "Specialties & Skills",
      certificates: "Certificates",
      noStaffFound: "No staff members listed yet.",
      membersUnit: "members",
      joinTeamTitle: "Join Our Team",
      joinTeamDesc: "We welcome dedicated healthcare professionals to contribute to our patient-first dialysis care.",
      groups: {
        hekimler: "Physicians",
        hemsirelik: "Nursing Staff",
        teknik: "Technical Staff",
      },
    },
    services: {
      backToServices: "Back to Services",
      noServicesFound: "No services listed yet.",
      serviceInfo: "Service Information",
      otherServices: "Other Services",
      directConsultation: "Direct Admission / Phone",
      sgkTitle: "Social Security (SGK)",
      sgkDesc: "All dialysis sessions, clinical tests, and patient transport services are provided under full insurance coverage without extra fees.",
      transportTitle: "Patient Transport",
      transportDesc: "Patients are safely transported from their homes by our dedicated vehicles and returned after treatment.",
      consultationTitle: "Treatment & Admission",
      consultationDesc: "Get in touch with our medical team to learn more about starting treatment or transferring your dialysis sessions.",
    },
    projects: {
      allProjects: "All Projects",
      backToProjects: "← Back to Projects",
      noProjectsFound: "No projects found.",
      haveAProject: "Have a Project in Mind?",
      haveAProjectDesc: "Contact us for collaborations and joint projects in dialysis and healthcare services.",
    },
    gallery: {
      noImagesFound: "No gallery images found yet.",
    },
    blog: {
      backToBlog: "Back to Blog",
      allCategories: "All",
      noPostsFound: "No articles published yet.",
      tags: "Tags:",
      preparedBy: "Prepared by {author}",
      lastUpdated: "Last updated:",
    },
    legal: {
      kvkkDefaultTitle: "Clarification Text on Personal Data (KVKK)",
      cookieDefaultTitle: "Cookie Policy",
    },
    footer: {
      quickLinks: "Quick Links",
      services: "Our Services",
      contact: "Contact Information",
      rights: "All rights reserved.",
      kvkk: "Privacy Notice",
      cookiePolicy: "Cookie Policy",
      social: "Social Media",
    },
  },
  de: {
    common: {
      readMore: "Weiterlesen",
      viewAll: "Alle anzeigen",
      viewDetail: "Details",
      back: "Zurück",
      allServices: "Alle Leistungen",
      allProjects: "Alle Projekte",
      allArticles: "Alle Artikel",
      relatedPosts: "Ähnliche Beiträge",
      share: "Teilen",
      category: "Kategorie",
      date: "Datum",
      backToHome: "Zur Startseite",
      notFoundTitle: "Seite nicht gefunden",
      notFoundDesc: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      errorTitle: "Ein Fehler ist aufgetreten",
      errorDesc: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      workingHours: "Öffnungszeiten",
      workingHoursVal: "Montag - Samstag: 07:00 - 19:00",
      getDirections: "Anfahrt",
      lastUpdated: "Zuletzt aktualisiert:",
      pageContents: "Inhaltsverzeichnis",
      address: "Zentrumsadresse",
    },
    nav: {
      home: "Startseite",
      about: "Über uns",
      services: "Leistungen",
      projects: "Projekte",
      blog: "Blog",
      contact: "Kontakt",
      gallery: "Galerie",
      staff: "Unser Team",
      cta: "Kontaktieren Sie uns",
      menu: "Menü",
      close: "Schließen",
    },
    about: {
      institutionalFacts: "Unternehmensprofil",
      missionVisionQuality: "Mission, Vision & Qualitätspolitik",
    },
    missionVision: {
      defaultTitle: "Mission, Vision, Werte & Qualitätspolitik",
      missionTitle: "Unsere Mission",
      visionTitle: "Unsere Vision",
      valuesTitle: "Grundwerte",
      qualityTitle: "Qualitätspolitik",
    },
    orgChart: {
      defaultTitle: "Organigramm",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Für Ihre Fragen und Terminvereinbarungen können Sie uns jederzeit kontaktieren.",
      phone: "Telefon",
      phoneLabel: "Telefon (Festnetz)",
      mobileLabel: "Mobil / Notfall",
      email: "E-Mail",
      address: "Adresse",
      workingHoursTitle: "Öffnungs- & Behandlungszeiten",
      workingHoursSubtitle: "Unser Zentrum ist die ganze Woche über regelmäßig für Sie da.",
      faqTitle: "Häufig gestellte Fragen",
      faqSubtitle: "Wissenswertes über Dialysebehandlung, Shuttleservice und Verträge.",
      form: {
        name: "Vor- und Nachname",
        namePlaceholder: "Ihr vollständiger Name",
        email: "E-Mail-Adresse",
        emailPlaceholder: "beispiel@email.com",
        phone: "Telefonnummer",
        phonePlaceholder: "+90 5XX XXX XX XX",
        subject: "Betreff",
        subjectPlaceholder: "Betreff Ihrer Nachricht",
        message: "Ihre Nachricht",
        messagePlaceholder: "Schreiben Sie Ihre Nachricht hier...",
        submit: "Nachricht senden",
        submitting: "Wird gesendet...",
        success: "Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.",
        error: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      },
    },
    staff: {
      viewProfile: "Profil ansehen",
      backToStaff: "Zurück zum Team",
      bio: "Über & Biografie",
      education: "Ausbildung",
      skills: "Fachgebiete & Qualifikationen",
      certificates: "Zertifikate",
      noStaffFound: "Derzeit sind keine Mitarbeiter aufgeführt.",
      membersUnit: "Personen",
      joinTeamTitle: "Werden Sie Teil unseres Teams",
      joinTeamDesc: "Wir freuen uns über engagierte medizinische Fachkräfte, die unsere patientenorientierte Versorgung verstärken möchten.",
      groups: {
        hekimler: "Ärzte",
        hemsirelik: "Pflegepersonal",
        teknik: "Technisches Personal",
      },
    },
    services: {
      backToServices: "Zurück zu den Leistungen",
      noServicesFound: "Derzeit sind keine Leistungen verfügbar.",
      serviceInfo: "Leistungsinformationen",
      otherServices: "Weitere Leistungen",
      directConsultation: "Direktanmeldung / Beratung",
      sgkTitle: "Sozialversicherung (SGK)",
      sgkDesc: "Alle Dialysesitzungen, klinischen Untersuchungen und Transportdienste werden im Rahmen der Krankenversicherung ohne Zuzahlung angeboten.",
      transportTitle: "Patientenfahrdienst",
      transportDesc: "Unsere Patienten werden mit Spezialfahrzeugen von zu Hause abgeholt und nach der Sitzung sicher zurückgebracht.",
      consultationTitle: "Behandlung & Anmeldung",
      consultationDesc: "Kontaktieren Sie uns, um Informationen über Dialysebehandlungen und Zentrumswechsel zu erhalten.",
    },
    projects: {
      allProjects: "Alle Projekte",
      backToProjects: "← Zurück zu den Projekten",
      noProjectsFound: "Keine Projekte gefunden.",
      haveAProject: "Haben Sie ein Projekt?",
      haveAProjectDesc: "Kontaktieren Sie uns für Kooperationen und gemeinsame Projekte im Gesundheits- und Dialysebereich.",
    },
    gallery: {
      noImagesFound: "Noch keine Galeriebilder vorhanden.",
    },
    blog: {
      backToBlog: "Zurück zum Blog",
      allCategories: "Alle",
      noPostsFound: "Noch keine Artikel veröffentlicht.",
      tags: "Schlagwörter:",
      preparedBy: "Erstellt von {author}",
      lastUpdated: "Zuletzt aktualisiert:",
    },
    legal: {
      kvkkDefaultTitle: "Datenschutzerklärung",
      cookieDefaultTitle: "Cookie-Richtlinie",
    },
    footer: {
      quickLinks: "Schnellzugriff",
      services: "Leistungen",
      contact: "Kontaktdaten",
      rights: "Alle Rechte vorbehalten.",
      kvkk: "Datenschutzerklärung",
      cookiePolicy: "Cookie-Richtlinie",
      social: "Soziale Medien",
    },
  },
  ar: {
    common: {
      readMore: "اقرأ المزيد",
      viewAll: "عرض الكل",
      viewDetail: "التفاصيل",
      back: "رجوع",
      allServices: "جميع الخدمات",
      allProjects: "جميع المشاريع",
      allArticles: "جميع المقالات",
      relatedPosts: "مقالات ذات صلة",
      share: "مشاركة",
      category: "الفئة",
      date: "التاريخ",
      backToHome: "العودة للرئيسية",
      notFoundTitle: "الصفحة غير موجودة",
      notFoundDesc: "الصفحة التي تبحث عنها قد تكون حذفت أو غير متوفرة حالياً.",
      errorTitle: "حدث خطأ ما",
      errorDesc: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
      workingHours: "ساعات العمل",
      workingHoursVal: "الإثنين - السبت: 07:00 - 19:00",
      getDirections: "الاتجاهات",
      lastUpdated: "آخر تحديث:",
      pageContents: "محتويات الصفحة",
      address: "عنوان المركز",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      projects: "مشاريعنا",
      blog: "المدونة",
      contact: "اتصل بنا",
      gallery: "معرض الصور",
      staff: "فريقنا",
      cta: "تواصل معنا",
      menu: "القائمة",
      close: "إغلاق",
    },
    about: {
      institutionalFacts: "ملف المركز",
      missionVisionQuality: "الرسالة، الرؤية وسياسة الجودة",
    },
    missionVision: {
      defaultTitle: "الرسالة والرؤية والقيم وسياسة الجودة",
      missionTitle: "رسالتنا",
      visionTitle: "رؤيتنا",
      valuesTitle: "قيمنا الجوهرية",
      qualityTitle: "سياسة الجودة",
    },
    orgChart: {
      defaultTitle: "الهيكل التنظيمي",
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "يسعدنا دائماً تواصلكم معنا للاستفسار وحجز المواعيد.",
      phone: "الهاتف",
      phoneLabel: "الهاتف (الأرضي)",
      mobileLabel: "الجوال / الاستعلامات",
      email: "البريد الإلكتروني",
      address: "العنوان",
      workingHoursTitle: "أوقات العمل وجلسات الغسيل",
      workingHoursSubtitle: "يعمل مركزنا وفق جدول منتظم طوال أيام الأسبوع.",
      faqTitle: "الأسئلة الشائعة",
      faqSubtitle: "إجابات عن أكثر الأسئلة شيوعاً حول جلسات الغسيل، خدمة التوصيل، والتأمينات.",
      form: {
        name: "الاسم الكامل",
        namePlaceholder: "اسمك الكامل",
        email: "البريد الإلكتروني",
        emailPlaceholder: "example@email.com",
        phone: "رقم الهاتف",
        phonePlaceholder: "+90 5XX XXX XX XX",
        subject: "الموضوع",
        subjectPlaceholder: "موضوع رسالتك",
        message: "رسالتك",
        messagePlaceholder: "اكتب رسالتك هنا...",
        submit: "إرسال الرسالة",
        submitting: "جارٍ الإرسال...",
        success: "تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت.",
        error: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      },
    },
    staff: {
      viewProfile: "عرض الملف الشخصي",
      backToStaff: "العودة للفريق",
      bio: "نبذة وسيرة ذاتية",
      education: "التعليم والشهادات",
      skills: "التخصصات والمهارات",
      certificates: "الشهادات",
      noStaffFound: "لم يتم إضافة موظفين بعد.",
      membersUnit: "عضو",
      joinTeamTitle: "انضم إلى فريقنا",
      joinTeamDesc: "نرحب بالكوادر الطبية المتميزة للانضمام إلى فريقنا وتقديم أفضل رعاية لمرضى الغسيل الكلوي.",
      groups: {
        hekimler: "أطباؤنا",
        hemsirelik: "كادر التمريض",
        teknik: "الكادر الفني",
      },
    },
    services: {
      backToServices: "العودة للخدمات",
      noServicesFound: "لم يتم إضافة خدمات بعد.",
      serviceInfo: "معلومات الخدمة",
      otherServices: "خدمات أخرى",
      directConsultation: "استشارة مباشرة / هاتف",
      sgkTitle: "التأمين الصحي (SGK)",
      sgkDesc: "تغطي التأمينات الصحية كافة جلسات الغسيل الكلوي والتحاليل وخدمة النقل دون رسوم إضافية.",
      transportTitle: "نقل المرضى والتوصيل",
      transportDesc: "يتم نقل المرضى بسيارات خاصة ومجهزة من منازلهم وإعادتهم بعد انتهاء الجلسة بأمان.",
      consultationTitle: "العلاج والتسجيل",
      consultationDesc: "تواصل مع فريقنا الطبي لمعرفة تفاصيل بدء العلاج أو الانتقال إلى مركزنا.",
    },
    projects: {
      allProjects: "جميع المشاريع",
      backToProjects: "← العودة للمشاريع",
      noProjectsFound: "لم يتم إضافة مشاريع بعد.",
      haveAProject: "هل لديك فكرة مشروع؟",
      haveAProjectDesc: "تواصل معنا لمناقشة التعاون والشراكات في مجال الرعاية الصحية والغسيل الكلوي.",
    },
    gallery: {
      noImagesFound: "لا توجد صور في المعرض حالياً.",
    },
    blog: {
      backToBlog: "العودة للمدونة",
      allCategories: "الكل",
      noPostsFound: "لم تنشر أي مقالات بعد.",
      tags: "الوسوم:",
      preparedBy: "إعداد: {author}",
      lastUpdated: "آخر تحديث:",
    },
    legal: {
      kvkkDefaultTitle: "نص الإفصاح عن البيانات الشخصية",
      cookieDefaultTitle: "سياسة ملفات تعريف الارتباط",
    },
    footer: {
      quickLinks: "روابط سريعة",
      services: "خدماتنا",
      contact: "معلومات الاتصال",
      rights: "جميع الحقوق محفوظة.",
      kvkk: "سياسة الخصوصية",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      social: "وسائل التواصل الاجتماعي",
    },
  },
};
