# Pre-launch audit — 2026-10-01

Branch: `feat/multilingual-de-ar`. Scope: review of a bug report plus a general pre-production scan.
Method: code reading, read-only GROQ queries against the public `production` dataset, `tsc --noEmit`, `eslint`, `npm audit`, inspection of the local `.next` build output. The Sanity dashboard (webhook, CORS) and the live site were **not** inspected.

## 1. Status

| # | Item | Status |
|---|------|--------|
| 1 | Language switcher links 404 on DE/AR detail pages | **Done** (committed) |
| 2 | `/iletisim` body stale after `siteSettings` change | **Done** (committed) |
| 3 | Webhook projection misses `author`, service `excerpt`, staff `order` | Open |
| 4 | Blog categories not sorted | Open |
| 5 | Staff record with `slug = "8"` | Open |
| L1 | Next.js 16.1.7 security advisories | Open — blocker |
| L2 | `NEXT_PUBLIC_SITE_URL` falls back to `localhost:3000` | Open — blocker |
| L3 | Webhook is the only content update path | Open — blocker |
| L4 | Cookie policy page is empty (document not published) | Open |
| L5 | No cookie consent mechanism | Open |
| L6 | SSR HTML always `lang="tr"`, no `dir` | Open |

Changes already made (not committed):
- `src/sanity/lib/queries.ts` — `staffMemberBySlugQuery`, `blogPostBySlugQuery`, `serviceBySlugQuery` now also match `slug.de.current` and `slug.ar.current`.
- `src/app/(site)/[locale]/iletisim/page.tsx` — both `cachedFetch` calls use tags `["contact", "layout"]`.

## 2. Launch blockers

### L1. Next.js 16.1.7 has known advisories
`npm audit --omit=dev` reports `next` as **critical** (range up to 16.3.2), fix available in `16.3.8` (not a semver major). Two critical advisories: unauthenticated RCE on Windows-hosted servers, and RCE in the Image Optimization API when AVIF files are used. About 15 more are high severity (DoS with Server Components/Actions, SSRF, middleware/proxy bypass).

Exposure in this repo is partly limited: no `middleware.ts`/`proxy.ts`, no Server Actions, and `next/image` is only used through `SanityImage`, which has a custom loader. But `/_next/image` still exists and `next.config.ts` allows the whole `cdn.sanity.io` hostname with no `pathname` restriction.

Fix: upgrade `next` (and `eslint-config-next`, which is pinned to the same version) to `16.3.8`. Optionally restrict `remotePatterns` to `pathname: "/images/<projectId>/**"`. Requires approval because it changes `package.json` and the lockfile.

The other ~46 audit findings come mostly from the `sanity` package's Studio/CLI tooling (vite, ws, `@sanity/cli`, ...) and do not run in the site's production runtime.

### L2. Site URL falls back to localhost
`getSiteUrl()` (`src/lib/utils.ts`) returns `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is unset, and the tracked `.env.local` contains exactly that value. The local build output confirms it: `.next/server/app/sitemap.xml.body` contains `<loc>http://localhost:3000...`. Canonical URLs, hreflang, JSON-LD and `robots.txt` use the same function.

`NEXT_PUBLIC_*` values are inlined at build time, so changing it later needs a rebuild.

Fix: set `NEXT_PUBLIC_SITE_URL` to the real domain in Vercel before the first production build, then open `/sitemap.xml`, `/robots.txt` and view-source on a page to confirm. Also set `SANITY_WEBHOOK_SECRET` to a real value in Vercel; the tracked `.env.local` only has a placeholder (whether that placeholder could be used at runtime was not verified).

### L3. Webhook is the only update path
`.next/prerender-manifest.json`: 115 routes have `initialRevalidateSeconds: false` (only the sitemap has `86400`). Without a working webhook the site never updates after a deploy. Failure modes: webhook not created, wrong secret (401), projection missing (400 "Invalid webhook payload").

Fix:
1. After deploy, edit a title in Sanity, publish, and confirm the site changes.
2. Optional safety net: `export const revalidate = 3600` on the content pages so a broken webhook degrades to hourly refresh instead of never.
3. The webhook filter and projection in the Sanity dashboard must match `README.md` lines 67-120.

## 3. Should fix before launch

### L4. Cookie policy page is empty
No published `cookiePolicyPage` document exists in the dataset (checked: 17 document types, none of that type). `/cerez-politikasi` renders the default title with an empty body. It is linked from the footer (`Footer.tsx:190`) and listed in the sitemap in all 4 locales. Fix: open "Çerez Politikası" in Studio and fill and publish it. No code change.

### L5. No cookie consent mechanism
There is no banner or consent logic anywhere in `src`. The Google Maps iframe on `/iletisim` loads immediately, and GA/GTM would too once IDs are set (`src/app/layout.tsx:51-52` renders them unconditionally; both IDs are currently `null`). A compliance risk for DE visitors, not a functional bug.

### L6. `lang` and `dir` only set by JS
`src/app/layout.tsx` hardcodes `<html lang="tr">`. `HtmlLang.tsx` sets `lang`/`dir` via an inline script and an effect. Crawlers that read raw HTML see `lang="tr"` on DE/EN/AR pages, and Arabic renders LTR until the script runs. Proper fix: move `<html>` into the `[locale]` layout (medium refactor, the root `not-found`/`error` and `/studio` need to keep working).

## 4. Open bugs from the original report

### #3 Webhook projection (`README.md:111-118` and the Sanity dashboard)
`affectsList` only lists some fields per type:
- `blogPost`: add `author`. (`excerpt` is already there.)
- `service`: add `excerpt` (`serviceListQuery` projects it).
- `staffMember`: add `order` (`staffListQuery` sorts by `group, order`).

Alternative (preferred): drop the field narrowing so any published update of a collection document revalidates its list tags. The narrowing has already drifted three times and the cost of extra regeneration is negligible at this size. Either way the dashboard projection must be updated manually.

### #4 Category order (`queries.ts:415`)
`order(title asc)` sorts an object. Replace with `order(coalesce(title[$locale], title.en, title.tr) asc)`. GROQ string comparison is not locale-aware, so categories starting with `Ö/Ş/Ü/İ` would sort after `Z`; fine for 3 categories, otherwise sort in JS with `localeCompare(locale)`. Current dataset order is `Hayat, Beslenme, Böbrek Sağlığı`; expected `Beslenme, Böbrek Sağlığı, Hayat`.

### #5 Staff record with `slug = "8"`
`Gülbahar Şimşek`: `slug.tr.current = "8"`, `order = 8`, `hasDetailPage = false`. The slug field is hidden in Studio when `hasDetailPage` is off (`staffMember.ts:48`), so it cannot be fixed from the UI without toggling it. Harmless today (detail query requires `hasDetailPage == true`, sitemap filters it). Fix by clearing the slug (toggle `hasDetailPage` temporarily, or a one-off patch).

## 5. Latent bugs (no impact with current data)

- **Crash on partially filled localized fields.** Most fields use `coalesce(x[$locale], x.en, x.tr, x)`. If only DE/AR is filled, the last `x` returns the object and React crashes. List fields (`values`, `qualityPolicyItems`, `queries.ts:183,186`) have no EN fallback at all. Current data: 185 localized objects, 0 partial. Zero-GROQ fix: schema validation on the `localized*` types ("if any locale is filled, `tr` is required"); currently none of them has validation.
- **Date can shift a day.** `formatDate` (`utils.ts:8`) passes no `timeZone`. `publishedAt` is a UTC datetime; on a UTC server a post published 00:00-03:00 Istanbul time shows the previous day, and `BlogFilter` (client) can hit a hydration mismatch. Current posts are 09:18-13:18 UTC, not affected. Fix: `timeZone: "Europe/Istanbul"`.
- **Hero video tied to hero image.** The `<video>` is nested inside `data?.heroImage &&` (`HeroSection.tsx:58-68`). No video in the data today.
- **Hero CTA "project" option.** `homePage.ts:102,153` allow `{ type: "project" }`, `resolveLink` falls through to the home page, and the projects route no longer exists. Remove both schema lines.
- **Blog filter and the back button.** `BlogFilter.tsx:22-34` writes the category with `pushState` but reads the URL only on mount. Add a `popstate` listener (or derive state from `useSearchParams` with a `<Suspense>`).
- **Unused queries.** `blogListByCategorySlugQuery` and `projectBySlugQuery` are not referenced anywhere; they were intentionally left untouched.

## 6. Content issues (fix in Sanity)

- Phones are stored as `0212 320 10 12` and `0533 316 97 16`, so `tel:` links are national-format only (used in `iletisim`, `Footer`, `Header`, `HeroSection`, `hizmetler`). Enter them as `+90 ...`. The WhatsApp number is already `+90`.
- `workingHours[].hours` is a plain string (`contactPage.ts:88`) and one entry is `Kapalı / Closed`, shown as-is in DE/AR. Make it `localizedString` and use `coalesce(hours[$locale], hours.en, hours.tr, hours)` in `layoutQuery` (`queries.ts:75-77`) and `contactPageQuery` (`queries.ts:287-290`). Existing plain strings keep working through the last fallback.
- GA and GTM IDs are empty (consent mechanism needed first, see L5).

## 7. Low risk

- `articleJsonLd` / `serviceJsonLd` (`JsonLd.tsx:39,111`) build URLs as `/blog/<slug>` and `/hizmetler/<slug>` with the current-locale slug, so EN/DE/AR pages emit a TR path with a foreign slug.
- Internal route names such as `/en/hakkimizda` or `/de/hizmetler` are directly reachable (duplicate pages). Canonicals are correct and they are not in the sitemap.
- `customHtml` blocks, the map iframe and JSON-LD use `dangerouslySetInnerHTML`. Content comes from Sanity editors only.
- 4 ESLint errors (`react-hooks/set-state-in-effect`): `BlogFilter.tsx:26`, `StatValue.tsx:26`, `Header.tsx:85`, `CountUp.tsx:30`; 1 warning: `Lightbox.tsx:6`. `next build` does not lint, so the build passes.

## 8. Verified OK / not verified

Verified:
- Slug fix: 192 slug-to-locale lookups run against the live dataset with the real query text, 0 not found (before the change: 81 broken links on 27 pages, all DE→* and AR→*).
- `tsc --noEmit` passes. Build output exists (116 prerendered routes, BUILD_ID from 2026-10-01).
- No sensitive document types in the public dataset (staffMember, service, partner, blogPost, blogCategory and the page singletons only).
- `robots.ts` disallows `/studio/` and `/api/`. Favicon, default OG image and logo are set in `siteSettings`.

Not verified:
- Sanity dashboard: webhook filter/projection/secret, CORS origin for the production domain (needed for `/studio`).
- The live site and anything that needs a browser (hydration mismatch, back-button behaviour, rendering).
- The "117 pages built / 112 sitemap URLs return 200" claim from the original report. Only the local `.next` output was inspected.
