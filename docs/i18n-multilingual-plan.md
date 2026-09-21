# Renin Diyaliz — Çok Dilli Yapı Genişletme Planı (TR / EN / DE / AR)

> Mevcut TR + EN yapısına Almanca ve Arapça eklenmesi için karar kaydı ve uygulama planı. Bu doküman `docs/site-map-and-content-plan.md` ve `docs/design-language.md` sonrası üçüncü karar aşamasıdır. Kod yazılmadan önce hazırlandı; uygulama bu plan onaylandıktan sonra adım adım yapılacak.

## Kapsam Kararı

- **Tam kapsam.** DE ve AR için daraltılmış sayfa seti yok — tüm route'lar dört dilde açılacak.
- Hedef diller: `tr` (varsayılan, prefix'siz), `en`, `de`, `ar`.
- Yeni dil eklenmesi beklenmiyor. Bu nedenle merkezi route-map soyutlaması yapılmayacak; mevcut tablolar dört dile çoğaltılacak.

---

## Mevcut Mimari (tespit)

### Route katmanı
- `src/app/(site)/[locale]/...` — klasör isimleri Türkçe.
- TR prefix'siz, EN `/en/<semantik-path>`. İkisi de `next.config.ts` içindeki elle yazılmış rewrite tablosuyla (29 satır) çözülüyor. Middleware yok.
- `redirect` tanımı yok → `/tr/hakkimizda` ve `/en/hakkimizda` de yanıt veriyor (duplicate content).

### İçerik katmanı (Sanity)
- `localizedString` / `localizedText` / `localizedSlug` / `localizedPortableText` — her biri `tr` + `en` alt alanı taşıyor.
- GROQ'ta yaklaşık 200 satır `coalesce(field[$locale], field.tr, field)` kalıbı.

### UI string katmanı
- `src/lib/i18n/dictionaries.ts` — tek dosya, 305 satır, `Dictionary` tipiyle korunuyor.
- `src/lib/i18n/index.ts` — `LOCALES`, `DEFAULT_LOCALE`, `isValidLocale`, `getDictionary`.

### Tespit edilen borçlar
| # | Sorun | Etki |
|---|---|---|
| 1 | **92 adet inline ternary** (`locale === "en" ? ... : ...`) sayfa ve componentlerde | İkili mantık; `de`/`ar` else dalına düşüp Türkçe basar. Genişletmenin önündeki ana engel. |
| 2 | `LanguageSwitcher` TR↔EN if zinciri | 4 dilde 12 yönlü eşlemeye çıkar; sessiz yanlış yönlendirme riski. |
| 3 | `objects/seo.ts` içindeki `metaTitle` / `metaDescription` düz `string` | Almanca sayfanın Google başlığı Türkçe çıkar. |
| 4 | `turkishSlugify` yalnızca `[a-z0-9\s-]` bırakıyor | Arapça karakterlerin tamamı siliniyor → boş slug. Almancada `ä`, `ß` siliniyor ("Qualität" → "qualitt"). |
| 5 | `sitemap.ts` TR/EN blokları + `noIndex` filtresi elle iki kez yazılmış | 4 blok + 4 kollu filtre olacak. |
| 6 | `redirect` yok | Duplicate content; her dil eklendiğinde çoğalıyor. |

---

## Kararlar

### 1. Path stratejisi: çevrilmiş path, elle tablo

Her dil kendi semantik path'ini kullanır. Route'un var olmasını `next.config.ts` rewrite'ı belirler — Sanity değil. Sanity'deki `navigation.href` yalnızca menüdeki linkin hedefini tutar; rewrite eklenmezse 404 döner.

Bölünme:
- **Sayfa segmentleri** (`/hakkimizda`, `/en/about`, `/de/ueber-uns`, `/ar/...`) → `next.config.ts`, elle.
- **Detay slug'ları** (`/hizmetler/hemodiyaliz` vb.) → Sanity `localizedSlug`, dil başına alan.

Rewrite tablosu 29 satırdan ~58 satıra çıkacak (dahili klasör isimleri Türkçe kalır: `/de/ueber-uns` → `/de/hakkimizda`).

**Açık alt karar:** Arapça sayfa segmentleri de Latin transliterasyon mu olacak (`/ar/khadamat`), yoksa İngilizce kelimeler mi (`/ar/services`)? Slug kararıyla tutarlı olması için transliterasyon öneriliyor, henüz kesinleşmedi.

### 2. Arapça ve Almanca slug'lar: Latin

- Arapça slug'lar Latin harflerle yazılacak (`/ar/al-khadamat` gibi), Arapça karakterli URL kullanılmayacak.
- Mevcut `turkishSlugify` bu iş için yetersiz. Dil başına slugify davranışı gerekiyor:
  - `tr`: mevcut davranış (`ö` → `o`, `ü` → `u`).
  - `de`: Almanca konvansiyonu (`ä` → `ae`, `ö` → `oe`, `ü` → `ue`, `ß` → `ss`) — Türkçe eşlemeyle çakışıyor, ayrı ele alınmalı.
  - `ar`: Arapça → Latin transliterasyon tablosu, ya da editörün slug'ı elle girmesi.
- `localizedSlug` şemasındaki `source: "title.<locale>"` ayarları buna göre güncellenecek.

### 3. RTL (Arapça): `dir` client-side kalacak

- `HtmlLang` mevcut haliyle (client component, `useEffect`) kalacak. Middleware **kullanılmayacak**, klasör yapısı değişmeyecek.
- **Kabul edilen sonuç:** Arapçada sayfa ilk yüklemede LTR çizilir, hydration sonrası RTL'e döner — gözle görülür bir sıçrama olur. Yalnızca Arapçayı etkiler.
- `HtmlLang` ayrıca `dir` attribute'unu da yönetecek.

RTL için yapılacak diğer işler:
- **78 adet yön bağımlı Tailwind utility**, 17 dosyada (`ml-` / `mr-` / `pl-` / `pr-` / `left-` / `right-` / `text-left` / `text-right` / `border-l` / `border-r` / `rounded-l` / `rounded-r`). Logical property karşılıklarına çevrilecek (`ms-` / `me-` / `ps-` / `pe-` / `start-` / `end-` / `text-start` / `text-end` / `border-s` / `border-e`).
- Yön taşıyan ikonlar (ok, chevron), breadcrumb ayracı, carousel/marquee yönü elden geçecek.
- **Font:** Schibsted Grotesk ve Public Sans Arapça glif içermiyor. Arapça için ayrı font ailesi gerekiyor (aday: IBM Plex Sans Arabic / Noto Sans Arabic). Arapça ayrıca biraz daha büyük punto ve line-height ister.
- `formatDate` şu an `tr-TR` varsayılanlı. Arapça için locale kodu ve rakam sistemi (Latin vs. Hint-Arap rakamları) kararlaştırılacak.

### 4. Fallback zinciri

`de` veya `ar` alanı boşsa `en`'e, o da boşsa `tr`'ye düşecek. Mevcut `coalesce(field[$locale], field.tr, field)` kalıbına `$fallback` parametresi eklenecek. Yaklaşık 200 satırlık mekanik bir değişiklik.

Gerekçe: çevirisi girilmemiş bir alanda Alman ziyaretçiye İngilizce göstermek, Türkçe göstermekten iyidir.

### 5. Hukuki metinler seed kapsamı dışında

KVKK Aydınlatma Metni, Çerez Politikası ve Kalite Politikası makine çevirisiyle basılmayacak. Bu üç metin ayrıca, elle ele alınacak. Yanlış çevrilmiş bir aydınlatma metni ayrı bir hukuki risk oluşturur.

### 6. Çeviri motoru: sonraya bırakıldı

Seed script'inin çeviriyi nasıl üreteceği (API ile otomatik mi, hazır JSON'dan taşıma mı) bu aşamada kararlaştırılmadı. Script'in iskeleti motordan bağımsız tasarlanacak.

---

## Seed Script'i — Tasarım İlkeleri

Uygulama sırasının **en sonunda** çalıştırılacak tek seferlik bir araç.

- `scripts/` altında yaşar, uygulama bundle'ına dahil değildir.
- Sanity write token ile çalışır (`.env.local`'a yeni değişken eklenecek).
- **Yalnızca boş alanı doldurur. Dolu hiçbir alanı ezmez.** Katı kural.
- `--dry-run` modu: önce ne yazacağını raporlar, onaylandıktan sonra basar.
- Kaynak dil `tr`, hedefler `en` / `de` / `ar`.
- `localizedPortableText` alanlarında yalnızca span'lerin `text` değerleri değiştirilir; blok yapısı, `_key`'ler ve `markDefs` korunur. Portable Text düz metne çevrilip geri yazılmaz.
- KVKK / Çerez Politikası / Kalite Politikası dokümanları script tarafından atlanır (karar 5).

### Çeviri yükünün ölçeği
Lokalize alan yoğunluğu en yüksek şemalar: `homePage` (28), `missionVisionPage` (12), `contactPage` (9), `aboutPage` (8), `staffPage` / `servicesPage` / `projectsPage` / `blogPage` (6'şar).

---

## Kod İçi Çeviriler (seed kapsamı dışında)

Seed yalnızca Sanity içeriğini doldurur. Aşağıdakiler koddadır ve elle yazılacaktır:

1. **92 inline ternary** sözlüğe taşınacak — anahtarlar `dictionaries.ts` içine eklenecek, sayfalar `dict.*` kullanacak.
2. **Sözlük dört dile çıkarılacak.** `Dictionary` tipi eksik anahtarı derleme hatası olarak yakalar; yarım bırakmak mümkün değil.
3. Dosya 305 satırdan ~600+ satıra çıkacağı için `dictionaries/` klasörüne bölünmesi değerlendirilecek (`types.ts` + `tr.ts` / `en.ts` / `de.ts` / `ar.ts`). Yeni bağımlılık gerektirmez.

---

## Uygulama Sırası

Her adım bitip onaylandıktan sonra bir sonrakine geçilir.

1. **Sanity şema genişletmesi**
   - `localizedString` / `localizedText` / `localizedSlug` / `localizedPortableText` → `de` + `ar` alanları.
   - `objects/seo.ts` → `metaTitle` ve `metaDescription` lokalize edilecek (borç #3).
   - Dil başına slugify davranışı (borç #4).
2. **i18n çekirdeği**
   - `LOCALES` genişletilir, `Locale` tipi `"tr" | "en" | "de" | "ar"` olur.
   - `[locale]/layout.tsx` içindeki `generateStaticParams` dört dile çıkar.
   - Fallback zinciri (`$fallback` parametresi) GROQ'a eklenir.
3. **Route katmanı**
   - `next.config.ts` rewrite'ları dört dile çoğaltılır.
   - `redirect`'ler eklenir (borç #6): prefix'li Türkçe ve dahili Türkçe klasör adları kanonik path'e yönlendirilir.
4. **Kod içi çeviriler**
   - 92 ternary sözlüğe taşınır.
   - Sözlük dört dile çıkarılır, gerekirse dosya bölünür.
5. **LanguageSwitcher**
   - If zinciri, component içinde tutulan sabit bir eşleme tablosuyla değiştirilir (borç #2). Mimari refactor değil; tablo aynı dosyada kalır.
6. **SEO / sitemap**
   - `buildMetadata` içindeki `enCanonicalPath` yaklaşımı dört dile genişletilir; `alternates.languages` dört dil + `x-default` içerir.
   - `sitemap.ts` dört dile çoğaltılır.
7. **RTL uygulaması**
   - `HtmlLang` `dir` yönetir.
   - 78 yön bağımlı utility logical property'lere çevrilir.
   - Arapça font ailesi kurulur, tarih/rakam formatı ayarlanır.
8. **TR içeriğin Sanity'de tamamlanması** — proje sahibi tarafından. Seed'in ön koşulu.
9. **Seed script'i** — çeviri motoru kararı verildikten sonra yazılır, `--dry-run` ile doğrulanır, sonra çalıştırılır.
10. **Webhook / revalidate kontrolü** — `src/app/api/revalidate/route.ts` ve `README.md` webhook listesinin yeni dillerle tutarlılığı doğrulanır.

---

## Açık Kalan Sorular

1. Arapça sayfa segmentleri Latin transliterasyon mu, İngilizce kelime mi?
2. Çeviri motoru: API ile otomatik mi, hazır JSON'dan taşıma mı?
3. Arapça tarih/rakam formatı: Latin rakam mı, Hint-Arap rakamı mı?
4. Arapça font seçimi kesinleştirilmedi.

---

## Durum

- [ ] 1. Sanity şema genişletmesi
- [ ] 2. i18n çekirdeği
- [ ] 3. Route katmanı
- [ ] 4. Kod içi çeviriler
- [ ] 5. LanguageSwitcher
- [ ] 6. SEO / sitemap
- [ ] 7. RTL uygulaması
- [ ] 8. TR içeriğin tamamlanması
- [ ] 9. Seed script'i
- [ ] 10. Webhook / revalidate kontrolü
