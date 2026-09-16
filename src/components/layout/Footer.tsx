import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";
import { SanityImage } from "@/components/ui/SanityImage";
import { SiteSettings, Navigation, NavItem, WorkingHourItem } from "@/types";
import { Locale, getDictionary } from "@/lib/i18n";

type SocialLink = {
  platform: string;
  url: string;
};

const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Footer({
  settings,
  navigation,
  workingHours,
  locale = "tr",
}: {
  settings?: SiteSettings;
  navigation?: Navigation;
  workingHours?: WorkingHourItem[];
  locale?: Locale;
}) {
  const dict = getDictionary(locale);
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();
  const kvkkHref = locale === "en" ? "/en/privacy" : "/kvkk";
  const cookiePolicyHref = locale === "en" ? "/en/cookie-policy" : "/cerez-politikasi";

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Marka */}
          <div className="md:col-span-4 md:ml-3 space-y-3">
            {settings?.logo ? (
              <SanityImage
                image={settings.logo}
                width={1194}
                height={434}
                fit="max"
                className="h-14 w-auto object-contain object-left"
              />
            ) : (
              <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-foreground">
                {settings?.siteName}
              </h3>
            )}
            {settings?.siteTagline && (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                {settings.siteTagline}
              </p>
            )}
          </div>

          {/* Sayfalar */}
          {footerLinks.length > 0 && (
            <div className="md:col-span-3 md:col-start-6">
              <p className="text-sm font-medium text-foreground mb-4">
                {dict.footer.quickLinks}
              </p>
              <nav className="space-y-3">
                {footerLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={resolveHref(item)}
                    prefetch={false}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* İletişim */}
          <div className="md:col-span-3 md:col-start-10 space-y-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-4">
                {dict.footer.contact}
              </p>
              <ul className="space-y-3">
                {contact?.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RiPhoneLine className="mt-0.5 shrink-0" />
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact?.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RiMailLine className="mt-0.5 shrink-0" />
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact?.address && (
                  <li>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RiMapPinLine className="mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{contact.address}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {workingHours && workingHours.length > 0 && (
              <ul className="space-y-1 border-t pt-4">
                {workingHours.map((row, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 text-xs text-muted-foreground">
                    <span>{row.days}</span>
                    <span className="font-medium text-foreground/80 tabular-nums">{row.hours}</span>
                  </li>
                ))}
              </ul>
            )}

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Alt Bar */}
        <div className="mt-14 border-t pt-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link href={kvkkHref} prefetch={false} className="hover:text-primary transition-colors">
              {dict.footer.kvkk}
            </Link>
            <Link href={cookiePolicyHref} prefetch={false} className="hover:text-primary transition-colors">
              {dict.footer.cookiePolicy}
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
              <span>© {currentYear} {settings?.siteName || "Özel Renin Diyaliz Merkezi"}. {dict.footer.rights}</span>
              <span className="hidden sm:inline">•</span>
              <span>Nefro-Med Sağlık Hizmetleri San. ve Tic. A.Ş.</span>
            </div>
            <span className="text-muted-foreground">
              Web Design by Zübeyir Ali Demir &amp; Yaytech Studio.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
