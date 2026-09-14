import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .title("⚙️ Global Ayarlar")
        .child(
          S.list().title("Global Ayarlar").items([
            S.listItem().title("Site Ayarları").id("siteSettings").schemaType("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("Navigasyon").id("navigation").schemaType("navigation")
              .child(S.document().schemaType("navigation").documentId("navigation")),
          ])
        ),
      S.divider(),
      S.listItem()
        .title("📄 Sabit Sayfalar")
        .child(
          S.list().title("Sabit Sayfalar").items([
            S.listItem().title("🏠 Ana Sayfa").id("homePage").schemaType("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem().title("ℹ️ Hakkımızda").id("aboutPage").schemaType("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem().title("🎯 Misyon / Vizyon / Değerler / Kalite Politikası").id("missionVisionPage").schemaType("missionVisionPage")
              .child(S.document().schemaType("missionVisionPage").documentId("missionVisionPage")),
            S.listItem().title("🗂️ Organizasyon Şeması").id("orgChartPage").schemaType("orgChartPage")
              .child(S.document().schemaType("orgChartPage").documentId("orgChartPage")),
            S.listItem().title("👥 Kadromuz").id("staffPage").schemaType("staffPage")
              .child(S.document().schemaType("staffPage").documentId("staffPage")),
            S.listItem().title("🖼️ Galeri").id("galleryPage").schemaType("galleryPage")
              .child(S.document().schemaType("galleryPage").documentId("galleryPage")),
            S.listItem().title("📬 İletişim").id("contactPage").schemaType("contactPage")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.listItem().title("🔒 KVKK Aydınlatma Metni").id("kvkkPage").schemaType("kvkkPage")
              .child(S.document().schemaType("kvkkPage").documentId("kvkkPage")),
            S.listItem().title("🍪 Çerez Politikası").id("cookiePolicyPage").schemaType("cookiePolicyPage")
              .child(S.document().schemaType("cookiePolicyPage").documentId("cookiePolicyPage")),
            S.listItem().title("📝 Blog").id("blogPage").schemaType("blogPage")
              .child(S.document().schemaType("blogPage").documentId("blogPage")),
            S.listItem().title("🛠 Hizmetler").id("servicesPage").schemaType("servicesPage")
              .child(S.document().schemaType("servicesPage").documentId("servicesPage")),
            S.listItem().title("💼 Projeler").id("projectsPage").schemaType("projectsPage")
              .child(S.document().schemaType("projectsPage").documentId("projectsPage")),
          ])
        ),
      S.divider(),
      S.documentTypeListItem("blogCategory").title("📝 Blog Kategorileri"),
      S.documentTypeListItem("blogPost").title("📝 Blog Yazıları"),
      S.documentTypeListItem("service").title("🛠 Hizmetler"),
      S.documentTypeListItem("project").title("💼 Projeler"),
      S.documentTypeListItem("staffMember").title("👥 Personel"),
      S.documentTypeListItem("galleryItem").title("🖼️ Galeri Görselleri"),
    ]);
