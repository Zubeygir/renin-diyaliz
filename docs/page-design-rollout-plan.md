# Renin Diyaliz — Sayfa Tasarım Uygulama Planı

> `docs/design-language.md`'de kararlaştırılan tasarım dilinin (renk, tipografi, radius, motion) site genelinde sırayla uygulanma planı. Süreç kuralı: **her adımdan önce tasarım chat üzerinden anlatılır, tartışılır, onay alınır — sonra kodlanır.** Otomatik/sormadan tasarım yapılmaz.

## Sıra

1. **Header / Footer** — site genelinde her sayfada görünen çerçeve, önce bu sabitlenir.
2. **Ana Sayfa** — gerçek section yapısına geçirilir (bkz. aşağıda), diğer sayfaların görsel dilini referanslar.
3. **İç sayfalar** (nav sırasına göre):
   1. Hakkımızda
   2. Misyon / Vizyon / Değerler / Kalite Politikası
   3. Organizasyon Şeması
   4. Kadromuz
   5. Hizmetler (hub + detay)
   6. Galeri
   7. Blog (hub + detay)
   8. İletişim

Her adım bitip onaylandıktan sonra bir sonrakine geçilir.

## Ana Sayfa — Gerçek Section Yapısı

Mevcut kod boilerplate'in jenerik 5 section'ını kullanıyor (Hero, Hakkımızda+stat, Hizmetler, **Projeler**, Blog). `site-map-and-content-plan.md`'de kararlaştırılan gerçek yapıya geçirilecek:

1. **Hero** — Sanity'den yüklenen video (dosya upload, bkz. aşağıda), autoplay/muted/loop, `prefers-reduced-motion` fallback, 2 CTA.
2. **Kurumsal** — Hakkımızda özeti + count-up istatistik + ekip mini-önizleme.
3. **Hizmetler** — kart önizlemesi (stagger motion, `docs/design-language.md`'ye göre).
4. **Servis Ağı / Kapsama Alanı** — **şimdilik placeholder** (kullanıcı ileride kendi animasyonunu ekleyecek).
5. **Anlaşmalı Kurumlar** — Sanity'den girilecek (yeni schema: partner/kurum adı + logo), swiper/carousel.
6. **Son Yazılar** — son 3 blog yazısı.
7. **İletişim CTA** — kapanış.

**Projeler section'ı ana sayfadan kaldırılacak** (route zaten navigasyonda pasif).

## Teknik notlar

- **Hero video**: Sanity `file` tipi ile doğrudan yüklenir (CDN'den servis edilir), dış URL kullanılmayacak.
- **Anlaşmalı Kurumlar**: yeni bir Sanity şeması gerekiyor (kurum adı + logo + opsiyonel link) — o adıma gelince tasarımla birlikte şema da eklenecek.
- **Servis Ağı**: şimdilik statik/placeholder bir blok, gerçek animasyon kullanıcı tarafından sonra eklenecek.

## Durum

- [x] Header / Footer
- [x] Ana Sayfa
- [x] Hakkımızda
- [x] Misyon / Vizyon / Değerler / Kalite Politikası
- [x] Organizasyon Şeması
- [x] Kadromuz
- [ ] Hizmetler
- [ ] Galeri
- [ ] Blog
- [ ] İletişim