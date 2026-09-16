# Renin Diyaliz — Tasarım Dili

> Bu doküman, `docs/site-map-and-content-plan.md` sonrası ikinci karar aşamasıdır: renk, tipografi, şekil dili ve motion kararları. Uygulama (theme.css, font kurulumu vb.) ayrı bir aşamada yapılacak — bu doküman karar kaydıdır.

## Bağlam ve Kısıt

Diyaliz merkezi, T.C. Sağlık Bakanlığı'nın sağlık hizmeti tanıtımını sıkı kurallara bağlayan yönetmeliğine tabi (reklam yok, üstünlük ifadesi yok, öncesi/sonrası yok). Bu, tasarım dilini doğrudan etkiliyor: "ajans/pazarlama" hissi veren agresif/parlak bir görsel dilden kaçınılıyor. Aranan ses: **sakin, güven veren, klinik-hassasiyette** — steril değil, ama iddiasız.

Mevcut logo (teal-yeşil + siyah wordmark) zaten bir marka kimliği dayatıyor; renk kararları buna çapalanıyor.

## Renk Stratejisi: Committed Teal

Referans: Ada Health / 1177 Vårdguiden tarzı "teal-on-cool-white clinical calm".

- Teal, yüzeyin ~%30-40'ını taşır: hero aksanları, CTA'lar, ikonlar, section ayraçları.
- Arka plan **cream/sand değil** — soğuk, düşük chroma'lı, logo'nun teal hue'suna hafif tint'lenmiş neredeyse-beyaz.
- Metin rengi saf siyah değil, logo'daki gibi yumuşak near-black charcoal.
- Kaçınılan alternatif: lacivert-beyaz "kurumsal sağlık" klişesi (Mayo Clinic / Cleveland Clinic tarzı) — logo zaten teal diyor, buna gerek yok.

Kesin OKLCH değerleri, logo renginden örnekleme yapılıp `theme.css`'e yazılırken netleştirilecek (uygulama aşaması).

## Tipografi

Kontrast ekseni: haber-otoritesi grotesk (başlık) + kamu-erişilebilirlik humanist (gövde).

- **Başlık — Schibsted Grotesk** (SemiBold/Bold, tracking -0.02 ~ -0.03em). Referans: İskandinav gazete başlığı — otoriter ama bağırmıyor, "doğrulanmış bilgi" hissi.
- **Gövde — Public Sans** (Regular/Medium). Referans: ABD federal erişilebilirlik standardı (USWDS) için tasarlanmış resmi bilgilendirme fontu — uzun paragrafta okunabilir, süslemesiz.
- İkisi de ücretsiz Google Fonts, Türkçe karakter seti (ığşçöüİĞŞÇÖÜ) doğrulandı.
- Eyebrow (küçük harf aralıklı üst etiket) kullanılmayacak — bilinçli tercih.

## Şekil Dili: Düşük Radius (4–8px)

Kart ve inputlarda 4-8px, butonlarda hafif yuvarlak. Klinik/hassas his — hastane ekipmanı, resmi form referansı. Aşırı yuvarlak (24px+) kartlar "ajans" hissi verdiği için bilinçli olarak dışlandı.

## Motion

Kural: her section'a aynı tekrarlanan giriş animasyonu (uniform reflex) verilmeyecek — bu şablon/AI hissi yaratır. Bunun yerine her section'ın motion'ı kendi içeriğinden gelir:

| Section | Motion |
|---|---|
| Hero (drone video) | Video zaten hareketli; başlık/CTA için tek blok sade fade + 8px translate |
| Kurumsal + istatistik | Hareketsiz. Count-up kaldırıldı (bir kuruluş yılına "saymak" anlamsız, SaaS tropu); rakamlar statik `dl` olarak büyük puntoda durur |
| Hizmetler satırları | **Stagger**: kartlar aynı anda değil ~80-120ms aralıklarla art arda belirir (liste olduğu için meşru — bkz. aşağıda) |
| Servis ağı | Hareketsiz. Teal-drenched yüzey; ilçe listesi içerik, harita görseli illüstrasyon (placeholder yok) |
| Anlaşmalı kurumlar | Renkli logolar (grayscale yok), hairline grid. 12+ logoda hover'da duran marquee |
| Son yazılar | 1 öne çıkan + 2 metin satırı; liste olduğu için stagger |
| İletişim kapanış | Hareketsiz. Buton değil, iletişim bilgisinin kendisi (telefon, adres, saatler) — ink yüzey |

**Stagger nedir:** Bir grup elemanın (kart, liste öğesi) aynı anda değil, aralarında küçük gecikmeyle art arda görünmesi. Aynı animasyon tanımı (`opacity 0→1`, `translateY(12px)→0`) her elemana artan `delay` ile uygulanır. Meşru kullanım yeri: gerçekten bir liste/dizi olan gruplar (kart grid'leri). Section'lara (Hero → Kurumsal → Hizmetler...) uygulanmaz çünkü onlar bir liste değil, birbirinden bağımsız bölümler.

Tüm animasyonlar `prefers-reduced-motion: reduce` için crossfade/instant alternatifine düşer.

## Sonraki Adım

Bu kararlar onaylandı. Uygulama aşamasında:
1. Logo'dan kesin teal OKLCH değeri örneklenip `theme.css`'e yazılacak.
2. Schibsted Grotesk + Public Sans `next/font/google` ile kurulacak.
3. Radius token'ları (`--radius`) 4-8px aralığına güncellenecek.

## Ana Sayfa Section Grameri (uygulama kararı)

- Ortalı "başlık + gri alt başlık" iskeleti ana sayfada kullanılmaz. Her section 12 kolonlu `SplitSection`: h2 sol 4 kolonda (desktop'ta sticky), içerik sağ 8 kolonda. Section'lar arası ritim yüzeyden gelir: video → beyaz → beyaz+ayraç → **teal** → beyaz → hafif tint → **ink**. Zebra (`bg-muted/40` dönüşümlü) yok.
- Section başlıkları giriş animasyonu almaz (`SectionHeading` içindeki FadeIn kaldırıldı; site geneli).
- Hero copy olgusal ("Şişli'de 2000'den bu yana hemodiyaliz merkezi"); tek dolu buton + tek metin link. Hero'nun altında teal **utility şeridi**: telefon · çalışma saatleri · adres/yol tarifi.
- Tipografi ölçeği token'ları: `text-display` (h1), `text-h2`, `text-lede`. Tracking: h1-h2 -0.025em, h3+ -0.01em.
- Yeni yüzey token'ları: `--teal-deep` (servis ağı), `--ink` (kapanış bloğu, hero scrim).
