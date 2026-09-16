export type Locale = "tr" | "en";

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
    groups: {
      hekimler: string;
      hemsirelik: string;
      teknik: string;
    };
  };
  services: {
    backToServices: string;
    noServicesFound: string;
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
      groups: {
        hekimler: "Hekimlerimiz",
        hemsirelik: "Hemşirelik Kadrosu",
        teknik: "Teknik & İdari Personel",
      },
    },
    services: {
      backToServices: "Hizmetlere Dön",
      noServicesFound: "Henüz eklenmiş bir hizmet bulunmuyor.",
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
      groups: {
        hekimler: "Physicians",
        hemsirelik: "Nursing Staff",
        teknik: "Technical & Administrative Staff",
      },
    },
    services: {
      backToServices: "Back to Services",
      noServicesFound: "No services listed yet.",
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
};
