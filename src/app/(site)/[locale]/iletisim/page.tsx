import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { ContactPage as ContactPageType } from "@/types";
import { RiPhoneLine, RiMailLine, RiMapPinLine, RiTimeLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FAQ } from "@/components/ui/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const data = await cachedFetch<ContactPageType>(
    contactPageQuery,
    { locale },
    { next: { tags: ["contact"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: data?.heroTitle || data?.pageTitle || dict.nav.contact,
      canonicalPath: "/iletisim",
      enCanonicalPath: "/en/contact",
      pageSeo: data?.seo,
    },
    locale
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const data = await cachedFetch<ContactPageType>(
    contactPageQuery,
    { locale },
    { next: { tags: ["contact"] } }
  );

  const contact = data?.contactInfo;
  const hasContactInfo = Boolean(
    contact?.phone || contact?.phone2 || contact?.email || contact?.address || contact?.whatsappNumber
  );

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      {/* Page Hero */}
      <PageHero
        title={data?.heroTitle || data?.pageTitle || dict.nav.contact}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* İletişim Bilgileri */}
          {hasContactInfo && (
            <FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                      <RiPhoneLine className="size-6" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {dict.contact.phoneLabel}
                    </span>
                    <span className="text-sm font-medium text-foreground">{contact.phone}</span>
                  </a>
                )}

                {contact?.phone2 && (
                  <a
                    href={`tel:${contact.phone2.replace(/\s+/g, "")}`}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                      <RiPhoneLine className="size-6" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {dict.contact.mobileLabel}
                    </span>
                    <span className="text-sm font-medium text-foreground">{contact.phone2}</span>
                  </a>
                )}

                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                      <RiMailLine className="size-6" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {dict.contact.email}
                    </span>
                    <span className="text-sm font-medium text-foreground">{contact.email}</span>
                  </a>
                )}

                {contact?.whatsappNumber && (
                  <a
                    href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                      <FaWhatsapp className="size-6" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      WhatsApp
                    </span>
                    <span className="text-sm font-medium text-foreground">{contact.whatsappNumber}</span>
                  </a>
                )}
              </div>
            </FadeIn>
          )}

          {/* Harita İframe + Adres */}
          {contact?.mapIframe && (
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div
                  className="w-full [&_iframe]:w-full [&_iframe]:h-[380px] [&_iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
                />
                {contact?.address && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground hover:text-primary border-t border-border transition-colors"
                  >
                    <RiMapPinLine className="size-4 shrink-0" />
                    {contact.address}
                  </a>
                )}
              </div>
            </FadeIn>
          )}

          {/* Çalışma Saatleri */}
          {data?.workingHours && data.workingHours.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-3 rounded-full bg-primary/10 text-primary">
                    <RiTimeLine className="size-6" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {dict.contact.workingHoursTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {dict.contact.workingHoursSubtitle}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {data.workingHours.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/50 text-sm"
                    >
                      <span className="font-medium text-foreground">{item.days}</span>
                      <span className="text-muted-foreground">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* İletişim Formu */}
          {data?.showForm && (
            <div className="max-w-2xl mx-auto">
              <FadeIn delay={0.25}>
                <ContactForm
                  formTitle={data?.formTitle}
                  successMessage={data?.successMessage}
                  locale={locale}
                />
              </FadeIn>
            </div>
          )}

          {/* Sık Sorulan Sorular (SSS) */}
          {data?.faqs && data.faqs.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="space-y-6 pt-6">
                <SectionHeading
                  title={dict.contact.faqTitle}
                  subtitle={dict.contact.faqSubtitle}
                />
                <FAQ items={data.faqs} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
