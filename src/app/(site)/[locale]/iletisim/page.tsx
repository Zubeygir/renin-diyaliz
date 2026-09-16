import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageTitle } from "@/components/layout/PageTitle";
import { ContactPage as ContactPageType } from "@/types";
import { RiMailLine, RiMapPinLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FAQ } from "@/components/ui/FAQ";

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

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <PageTitle
        title={data?.heroTitle || data?.pageTitle || dict.nav.contact}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
      />

      <div className="container mx-auto px-4">
        {/* İletişim Ana Bölümü: Sol 5 Bilgi, Sağ 7 Harita & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Doğrudan İletişim Bilgileri */}
          <aside className="lg:col-span-5 space-y-8">
            {/* Telefonlar */}
            {contact?.phone && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {dict.contact.phoneLabel}
                </p>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="font-heading font-semibold text-2xl sm:text-3xl text-foreground hover:text-primary transition-colors tabular-nums block"
                >
                  {contact.phone}
                </a>
                {contact?.phone2 && (
                  <a
                    href={`tel:${contact.phone2.replace(/\s+/g, "")}`}
                    className="font-heading font-medium text-lg sm:text-xl text-muted-foreground hover:text-primary transition-colors tabular-nums block mt-1"
                  >
                    {contact.phone2}
                  </a>
                )}
              </div>
            )}

            {/* E-posta ve WhatsApp */}
            <div className="pt-6 border-t border-border flex flex-col gap-3 text-sm">
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <RiMailLine size={16} className="text-primary shrink-0" />
                  <span>{contact.email}</span>
                </a>
              )}

              {contact?.whatsappNumber && (
                <a
                  href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaWhatsapp size={16} className="text-primary shrink-0" />
                  <span>WhatsApp: {contact.whatsappNumber}</span>
                </a>
              )}
            </div>

            {/* Adres ve Yol Tarifi */}
            {contact?.address && (
              <div className="pt-6 border-t border-border space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {locale === "en" ? "Address" : "Merkez Adresi"}
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {contact.address}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <RiMapPinLine size={16} />
                  <span>{dict.common.getDirections}</span>
                  <span>→</span>
                </a>
              </div>
            )}

            {/* Çalışma Saatleri */}
            {data?.workingHours && data.workingHours.length > 0 && (
              <div className="pt-6 border-t border-border space-y-3">
                <div>
                  <h3 className="font-heading font-semibold text-base text-foreground">
                    {dict.contact.workingHoursTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {dict.contact.workingHoursSubtitle}
                  </p>
                </div>
                <dl className="divide-y divide-border border-y border-border text-sm">
                  {data.workingHours.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">{item.days}</dt>
                      <dd className="font-medium text-foreground tabular-nums">{item.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Yönetmelik & Kurumsal Bilgi */}
            <div className="pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
              <p>Nefro-Med Sağlık Hizmetleri San. ve Tic. A.Ş.</p>
              <p>Site Sorumlusu &amp; İletişim: iletisim@renindiyaliz.com</p>
            </div>
          </aside>

          {/* Sağ Kolon: Harita ve İletişim Formu */}
          <main className="lg:col-span-7 space-y-10">
            {contact?.mapIframe && (
              <div className="rounded-md border border-border overflow-hidden bg-muted">
                <div
                  className="w-full [&_iframe]:w-full [&_iframe]:h-[420px] [&_iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
                />
              </div>
            )}

            {data?.showForm && (
              <div className="border border-border rounded-md p-6 sm:p-8 bg-card">
                <ContactForm
                  formTitle={data?.formTitle}
                  successMessage={data?.successMessage}
                  locale={locale}
                />
              </div>
            )}
          </main>
        </div>

        {/* Sık Sorulan Sorular (SSS) Bölümü */}
        {data?.faqs && data.faqs.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground tracking-[-0.015em]">
                {dict.contact.faqTitle}
              </h2>
              {dict.contact.faqSubtitle && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {dict.contact.faqSubtitle}
                </p>
              )}
            </div>

            <div className="lg:col-span-8 min-w-0">
              <FAQ items={data.faqs} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
