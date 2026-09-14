# Renin Diyaliz — Site Haritası ve İçerik Planı

> Bu doküman, mevcut boilerplate üzerinden yeniden inşa edilecek renindiyaliz.com sitesi için karar aşamasında üzerinde anlaşılan site haritası ve sayfa bazlı içerik planını içerir. Tasarım dili ve teknik uygulama detayları sonraki aşamada ayrıca ele alınacaktır.

## Yasal Çerçeve (Bağlayıcı Kurallar)

- **Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik** (12 Kasım 2025, RG 33075) esas alınır.
- **Diyaliz Merkezleri Hakkında Yönetmelik** (1 Mart 2019, son değişiklik 10 Aralık 2022) merkez işleyişini düzenler.
- Yasak: reklam, "en iyi/farklı/üstün" tarzı üstünlük ifadeleri, öncesi-sonrası görsel, pazarlama amaçlı hasta yorumu/teşekkürü, fiyat/indirim/kampanya bilgisi, sahte/abartılı unvan iddiası, yorum-beğeni özellikleri.
- Zorunlu: sitede **son güncelleme tarihi** ve **site editörüne ulaşılabilecek iletişim bilgisi** açıkça belirtilmeli; içerik KVKK ve Kişisel Sağlık Verileri Hakkında Yönetmelik'e uygun olmalı; sadece resmi diploma/unvanlar kullanılabilir; içerik yalnızca doğrulanabilir gerçek verilerden oluşmalı.
- Proje sahibinin kendi kuralı: yorum yok, reklam yok, "şöyle iyiyiz böyle iyiyiz" güzellemesi yok — sadece gerçekler ve gerçek veriler.

## Referans Kaynaklar

- Eski site (renindializ.com → dializmerkezi.com), işleten: **Nefro-Med Sağlık Hizmetleri Sanayi ve Ticaret A.Ş.**
  - 2000 yılından beri hizmet, 50+1 diyaliz makinesi, 7/24 hizmet, Hepatit B/C için izole odalar, SGK + özel sigorta anlaşmaları, servis (hasta taşıma) hizmeti.
  - Adres (eski): Halil Rıfat Paşa Mah. Arel Sk. No:4, Şişli/İstanbul.
  - Kalite yönetimi: T.C. Sağlık Bakanlığı SKS Diyaliz Seti maddeleri (hasta kimliklendirme, ilaç güvenliği, enfeksiyon önleme, düşme riski azaltma, hasta mahremiyeti vb.) — doğrudan kullanılabilir, objektif ve doğrulanmış içerik.
- Rakip örnek: RFM Diyaliz Merkezi — "Kurumsal" bilgiyi ayrı alt sayfalara bölen mega menu yapısı emsal alındı.

---

## Site Haritası

```
Ana Sayfa
Kurumsal (mega menu)
  ├─ Hakkımızda
  ├─ Misyon / Vizyon / Temel Değerler / Kalite Politikası
  └─ Organizasyon Şeması
Kadromuz
Hizmetler (mega menu)
  └─ [hizmet detay sayfaları]
Galeri (yeni route, sabit sayfa)
Blog
  └─ [blog yazı detay sayfaları]
İletişim (SSS bölümü dahil)

Footer (statik):
  - KVKK Aydınlatma Metni
  - Çerez Politikası
  - Son güncelleme tarihi + editör iletişim bilgisi
  - Şirket unvanı: Nefro-Med Sağlık Hizmetleri San. ve Tic. A.Ş.
  - "Zübeyir Ali Demir & Yaytech Studio ortak çalışmasıdır." credit linki
  - Sosyal medya ikonları (siteSettings'te girilirse gösterilir)
```

**Not:** Galeri ve ileride eklenecek diğer sabit sayfalar için `/projeler` route'u kullanılmayacak; her biri için Sanity'de ayrı doküman/route açılacak.

---

## Ana Sayfa

1. **Hero** — Merkezin profesyonel drone çekimi videosu (iç + dış mekan), autoplay/muted/loop, `prefers-reduced-motion` fallback. 2 CTA butonu (Hizmetlerimiz, İletişim).
2. **Kurumsal** — Hakkımızda özeti + count-up istatistik animasyonu (gerçek veriler: kuruluş yılı, makine kapasitesi, 7/24 hizmet vb.) + ekip mini-önizlemesi (3-4 fotoğraf, Kadromuz'a link).
3. **Hizmetler** — Hizmet kartları önizlemesi.
4. **Servis Ağı / Kapsama Alanı** — Gerçek hizmet bölgelerini gösteren animasyonlu harita (dekoratif değil, işlevsel bilgi).
5. **Anlaşmalı Kurumlar** — SGK, özel sigorta, banka anlaşmaları; swiper/carousel. Not: üçüncü taraf logo kullanımı için ilgili kurumlardan görsel kullanım onayı/güncel logo istenmesi önerilir.
6. **Son Yazılar** — Son 3 blog yazısı önizlemesi.
7. **İletişim CTA** — Kapanış bölümü.

Section sırası ve ağırlığı tasarım aşamasında dengelenecek (Servis Ağı ve Anlaşmalı Kurumlar daha kompakt tutulmalı, scroll yorgunluğunu önlemek için).

---

## Kurumsal

### Hakkımızda
- Kuruluş yılı, işleten şirket, kapasite, 7/24 hizmet, izole hasta odaları, SGK/özel sigorta uyumu.
- Üstünlük/karşılaştırma dili (ör. "en yüksek kalite", "mükemmeliyet") kullanılmayacak — sadece olgusal ifadeler.

### Misyon / Vizyon / Temel Değerler / Kalite Politikası
- Tek sayfa, 4 blok.
- Misyon/Vizyon: kısa, abartısız.
- Temel Değerler: madde madde (hasta güvenliği, mahremiyet, hijyen, ekip çalışması).
- Kalite Politikası: SKS Diyaliz Seti maddeleri — doğrudan taşınabilir.

### Organizasyon Şeması
- Sanity'den yüklenen görsel şema (image upload).
- Unvan hiyerarşisi: Mesul Müdür → Sorumlu Hekim → Başhemşire → Sorumlu Hemşire → Diyaliz Teknikerleri/Hemşireler.

---

## Kadromuz

- Format: **fotoğraf + isim + rol**, gruplandırılmış (Hekimler / Hemşirelik / Teknik Personel) — gruplama tasarım aşamasında netleştirilecek.
- Her personelden fotoğraf kullanımı için yazılı onay alınmalı (KVKK).
- "Ekibimize Katılın" CTA korunacak — bir Google Form linkine yönlendirecek (link Sanity'den girilecek).

---

## Hizmetler

- Mevcut boilerplate hub + `[slug]` detay sayfası yapısı kullanılacak.
- İçerik adayları: Hemodiyaliz, İzole Hasta Tedavisi (Hepatit B/C), Hasta Servis Hizmeti, SGK/Özel Sigorta Süreçleri.
- Her detay sayfası: "ne, kimin için, nasıl işliyor" formatında, iddiasız/eğitici ton.

---

## Galeri

- Yeni route, sabit sayfalar altında Sanity dokümanı olarak açılacak.
- **Kritik kural:** sadece tesis/cihaz/mekan fotoğrafı. Hasta görseli (yazılı onaylı olsa dahi pazarlama amaçlı) kullanılmayacak.
- Öncesi/sonrası kavramı bu alanda geçerli değil.

---

## Blog

- Mevcut `blogCategory` / `blogPost` yapısı kullanılacak.
- Her yazıda **yazar alanı** (sağlık meslek mensubu imzası, ör. "Uzm. Dr. ... tarafından hazırlanmıştır") ve **son güncelleme tarihi** gösterilecek — Sanity şemasına yazar alanı yoksa eklenecek.
- İçerik örnekleri (eski siteden): böbrek hastalarında beslenme, böbrek hastalarında depresyon, böbrek yetmezliğiyle yaşamak, kronik böbrek hastalığında dikkat edilmesi gerekenler.

---

## İletişim

- **Form yok** (şimdilik) — adres, harita, yol tarifi butonu, iletişim bilgileri (`siteSettings`'ten).
- **Çalışma Saatleri** (Sanity'den düzenlenebilir alan olarak):

  | Gün | Saat |
  |---|---|
  | Pazartesi | 06:30–21:30 |
  | Salı | 06:30–17:30 |
  | Çarşamba | 06:30–21:30 |
  | Perşembe | 06:30–17:30 |
  | Cuma | 06:30–21:30 |
  | Cumartesi | 06:30–17:30 |
  | Pazar | Kapalı |

- **SSS (Sık Sorulan Sorular)** bu sayfaya bir bölüm olarak eklenecek (ayrı üst menü sayfası açılmayacak). Boilerplate'teki mevcut `<FAQ>` component ve otomatik `FAQPage` structured data kullanılacak.
  - Örnek konu başlıkları: SGK kapsamı, yeni hasta kabul süreci, servis hizmeti kapsama alanı, seans süresi, refakatçi durumu, ilk gelişte gerekli belgeler.
  - Cevaplar sadece prosedür/olgu bilgisi içerecek, öznel/karşılaştırmalı ifade yok.

---

## Genel/Footer Kararları

- **Çerez onayı:** Analytics kullanılacağı için çerez onay banner'ı eklenecek (KVKK/Çerez Politikası linkiyle birlikte).
- **Sosyal medya:** Sadece `siteSettings` dokümanında gerçek hesap linki girilirse gösterilecek (boş/placeholder link olmayacak).
- **Çoklu dil:** İngilizce versiyon **olacak** — basit rewrite kuralıyla (middleware değil), teknik detay ileride ele alınacak.
- **Mesul müdür / ruhsat bilgisi:** Şimdilik sitede yer almayacak, gerektiğinde proje sahibi tarafından eklenecek.
- **Geliştirici credit:** Footer'da "Developed by Yaytech Studio" linki yer alacak — yönetmelik kapsamı dışında (sağlık tanıtımı değil, standart web pratiği).

---

## Sonraki Adım

Tasarım dili (renk, tipografi, radius, genel estetik) ve teknik uygulama (Sanity şema değişiklikleri, yeni route'lar, i18n rewrite kuralı vb.) ayrı bir aşamada ele alınacak.
