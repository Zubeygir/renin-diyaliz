import { notFound } from "next/navigation";
import { getLayoutData } from "@/lib/seo";
import { isValidLocale, Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { AlternateUrlsProvider } from "@/components/providers/AlternateUrlsContext";

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }, { locale: "de" }, { locale: "ar" }];
}

export const dynamicParams = false;

function assertLocale(raw: string): Locale {
  if (!isValidLocale(raw)) notFound();
  return raw;
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = assertLocale(resolvedParams.locale);
  const data = await getLayoutData(locale);
  const contact = data?.settings?.contactInfo;

  return (
    <AlternateUrlsProvider>
      <HtmlLang locale={locale} />
      <Header
        siteName={data?.settings?.siteName}
        logo={data?.settings?.logo}
        links={data?.navigation?.headerLinks}
        contactInfo={
          contact
            ? {
                phone: contact.phone,
                email: contact.email,
                whatsappNumber: contact.whatsappNumber,
                address: contact.address,
              }
            : undefined
        }
        socialLinks={data?.settings?.socialLinks}
        locale={locale}
      />
      <main id="main">{children}</main>
      <Footer
        settings={data?.settings}
        navigation={data?.navigation}
        workingHours={data?.workingHours}
        locale={locale}
      />
      {contact?.whatsappNumber && (
        <WhatsAppButton number={contact.whatsappNumber} />
      )}
    </AlternateUrlsProvider>
  );
}
