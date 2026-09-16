import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { Locale, ContactInfo, WorkingHourItem } from "@/types";

interface ContactCtaSectionProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  contact?: ContactInfo;
  workingHours?: WorkingHourItem[];
  locale?: Locale;
}

// Closing block carries the contact facts themselves (phone, address, hours)
// instead of a button to a page that only holds the same facts.
export function ContactCtaSection({
  title,
  subtitle,
  buttonLabel,
  contact,
  workingHours,
  locale = "tr",
}: ContactCtaSectionProps) {
  if (!title) return null;

  const dict = getDictionary(locale);
  const href = locale === "en" ? "/en/contact" : "/iletisim";
  const phones = [contact?.phone, contact?.phone2].filter((p): p is string => Boolean(p));

  return (
    <section className="bg-ink text-white py-[clamp(4rem,8vw,7rem)]">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
        <div className="lg:col-span-7">
          <h2 className="text-h2 font-semibold">{title}</h2>
          {subtitle && <p className="text-lede text-white/75 mt-4 max-w-[44ch]">{subtitle}</p>}

          {phones.length > 0 && (
            <div className="mt-10 flex flex-col gap-2">
              {phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="font-heading text-3xl md:text-4xl font-semibold tracking-[-0.02em] w-fit hover:text-white/80 transition-colors"
                >
                  {phone}
                </a>
              ))}
            </div>
          )}

          {contact?.address && (
            <p className="mt-8 text-white/80 max-w-[44ch] leading-relaxed">{contact.address}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {contact?.address && (
              <Button
                size="lg"
                className="h-11 px-5 bg-white text-ink hover:bg-white/90"
                render={
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {dict.common.getDirections}
              </Button>
            )}
            {buttonLabel && (
              <Link
                href={href}
                prefetch={false}
                className="font-medium underline-offset-8 decoration-white/40 hover:underline"
              >
                {buttonLabel} →
              </Link>
            )}
          </div>
        </div>

        {workingHours && workingHours.length > 0 && (
          <div className="lg:col-span-5 lg:pl-12 lg:border-l border-white/15">
            <h3 className="text-sm uppercase tracking-wide text-white/60 font-sans font-medium">
              {dict.common.workingHours}
            </h3>
            <dl className="mt-4 divide-y divide-white/15">
              {workingHours.map((row, i) => (
                <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-white/80">{row.days}</dt>
                  <dd className="font-heading font-semibold text-lg whitespace-nowrap">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
