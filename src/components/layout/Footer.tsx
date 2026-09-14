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
import { SiteSettings, Navigation } from "@/types";
import { Locale, getDictionary } from "@/lib/i18n";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

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
  locale = "tr",
}: {
  settings?: SiteSettings;
  navigation?: Navigation;
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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Marka & İletişim */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{settings?.siteName}</h3>
            {settings?.siteTagline && (
              <p className="text-sm text-muted-foreground">{settings.siteTagline}</p>
            )}
            <div className="space-y-2">
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RiPhoneLine className="shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact?.phone2 && (
                <a
                  href={`tel:${contact.phone2.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RiPhoneLine className="shrink-0" />
                  {contact.phone2}
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RiMailLine className="shrink-0" />
                  {contact.email}
                </a>
              )}
              {contact?.address && (
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <RiMapPinLine className="shrink-0 mt-0.5" />
                  {contact.address}
                </p>
              )}
            </div>
          </div>

          {/* Footer Linkleri */}
          {footerLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">{dict.footer.quickLinks}</h3>
              <nav className="space-y-2">
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

          {/* Sosyal Medya */}
          {socialLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">{dict.footer.social}</h3>
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
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Alt Bar */}
        <div className="mt-12 border-t pt-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs">
            <Link href={kvkkHref} prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">
              {dict.footer.kvkk}
            </Link>
            <Link href={cookiePolicyHref} prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">
              {dict.footer.cookiePolicy}
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
              <span>© {currentYear} {settings?.siteName || "Özel Renin Diyaliz Merkezi"}. {dict.footer.rights}</span>
              <span className="hidden sm:inline">•</span>
              <span>Nefro-Med Sağlık Hizmetleri San. ve Tic. A.Ş.</span>
            </div>
            <div className="text-center sm:text-right">
              <span>Zübeyir Ali Demir &amp; Yaytech Studio ortak çalışmasıdır.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
