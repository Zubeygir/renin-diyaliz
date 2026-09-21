import type { Metadata } from "next";
import { Schibsted_Grotesk, Public_Sans, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { buildMetadata, getLayoutData } from "@/lib/seo";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import NextTopLoader from "nextjs-toploader";

const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getLayoutData();

  return (
    <html
      lang="tr"
      className={`${publicSans.variable} ${schibstedGrotesk.variable} ${notoSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body className={publicSans.className}>
        <noscript>
          <style>{`[data-fade-in]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Sayfa geçişlerinde üstte ince ilerleme çubuğu — marka rengi kullanır */}
        <NextTopLoader
          color="var(--primary)"
          height={3}
          showSpinner={false}
          shadow={false}
          speed={200}
          crawlSpeed={200}
        />
        {settings?.gtmId && <GoogleTagManager gtmId={settings.gtmId} />}
        {settings?.gaId && <GoogleAnalytics gaId={settings.gaId} />}
        <JsonLd data={organizationJsonLd(settings)} />
        <JsonLd data={websiteJsonLd(settings)} />
        {children}
      </body>
    </html>
  );
}
