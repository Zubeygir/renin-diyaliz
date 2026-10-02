import SiteLayout from "./(site)/[locale]/layout";
import HomePage, { generateMetadata as generateLocaleMetadata } from "./(site)/[locale]/page";
import { DEFAULT_LOCALE } from "@/lib/i18n";

// A real "/" route instead of a "/" -> "/tr" rewrite: on Vercel the rewrite answered
// client-side RSC requests with cached HTML, which broke navigation to the Turkish home.
const params = Promise.resolve({ locale: DEFAULT_LOCALE });

export function generateMetadata() {
  return generateLocaleMetadata({ params });
}

export default function RootPage() {
  return (
    <SiteLayout params={params}>
      <HomePage params={params} />
    </SiteLayout>
  );
}
