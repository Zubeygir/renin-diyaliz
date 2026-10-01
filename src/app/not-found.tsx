import SiteLayout from "./(site)/[locale]/layout";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { DEFAULT_LOCALE } from "@/lib/i18n";

// Only reached for paths without a valid locale prefix, which are Turkish by definition.
// The locale layout is reused as a component to render the header and footer.
export default function NotFound() {
  return (
    <SiteLayout params={Promise.resolve({ locale: DEFAULT_LOCALE })}>
      <NotFoundContent />
    </SiteLayout>
  );
}
