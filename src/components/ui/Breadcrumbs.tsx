"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowRightSLine, RiHome4Line } from "react-icons/ri";
import { JsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { isValidLocale, Locale, getDictionary } from "@/lib/i18n";
import { BreadcrumbItem } from "@/types";

const ROUTE_LABELS: Record<string, Partial<Record<Locale, string>>> = {
  hakkimizda: { tr: "Hakkımızda", en: "About Us", de: "Über uns", ar: "من نحن" },
  about: { tr: "Hakkımızda", en: "About Us", de: "Über uns", ar: "من نحن" },
  "ueber-uns": { tr: "Hakkımızda", en: "About Us", de: "Über uns", ar: "من نحن" },
  hizmetler: { tr: "Hizmetlerimiz", en: "Services", de: "Leistungen", ar: "خدماتنا" },
  services: { tr: "Hizmetlerimiz", en: "Services", de: "Leistungen", ar: "خدماتنا" },
  leistungen: { tr: "Hizmetlerimiz", en: "Services", de: "Leistungen", ar: "خدماتنا" },
  projeler: { tr: "Projelerimiz", en: "Projects", de: "Projekte", ar: "مشاريعنا" },
  projects: { tr: "Projelerimiz", en: "Projects", de: "Projekte", ar: "مشاريعنا" },
  projekte: { tr: "Projelerimiz", en: "Projects", de: "Projekte", ar: "مشاريعنا" },
  blog: { tr: "Blog", en: "Blog", de: "Blog", ar: "المدونة" },
  iletisim: { tr: "İletişim", en: "Contact", de: "Kontakt", ar: "اتصل بنا" },
  contact: { tr: "İletişim", en: "Contact", de: "Kontakt", ar: "اتصل بنا" },
  kontakt: { tr: "İletişim", en: "Contact", de: "Kontakt", ar: "اتصل بنا" },
  galeri: { tr: "Galeri", en: "Gallery", de: "Galerie", ar: "معرض الصور" },
  gallery: { tr: "Galeri", en: "Gallery", de: "Galerie", ar: "معرض الصور" },
  galerie: { tr: "Galeri", en: "Gallery", de: "Galerie", ar: "معرض الصور" },
  kadromuz: { tr: "Kadromuz", en: "Our Team", de: "Unser Team", ar: "فريقنا" },
  team: { tr: "Kadromuz", en: "Our Team", de: "Unser Team", ar: "فريقنا" },
  "misyon-vizyon-degerler": { tr: "Misyon, Vizyon & Değerler", en: "Mission, Vision & Values", de: "Mission, Vision & Werte", ar: "الرسالة والرؤية والقيم" },
  "mission-vision-values": { tr: "Misyon, Vizyon & Değerler", en: "Mission, Vision & Values", de: "Mission, Vision & Werte", ar: "الرسالة والرؤية والقيم" },
  "mission-vision-werte": { tr: "Misyon, Vizyon & Değerler", en: "Mission, Vision & Values", de: "Mission, Vision & Werte", ar: "الرسالة والرؤية والقيم" },
  "organizasyon-semasi": { tr: "Organizasyon Şeması", en: "Organization Chart", de: "Organigramm", ar: "الهيكل التنظيمي" },
  "organization-chart": { tr: "Organizasyon Şeması", en: "Organization Chart", de: "Organigramm", ar: "الهيكل التنظيمي" },
  organigramm: { tr: "Organizasyon Şeması", en: "Organization Chart", de: "Organigramm", ar: "الهيكل التنظيمي" },
};

function formatSlugToLabel(slug: string, locale: Locale): string {
  try {
    const decoded = decodeURIComponent(slug).trim().toLowerCase();
    if (ROUTE_LABELS[decoded]) {
      return ROUTE_LABELS[decoded][locale] || ROUTE_LABELS[decoded].tr || slug;
    }
    const dateLocale = locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : locale === "ar" ? "ar-SA" : "en-US";
    return decoded
      .replace(/[-_]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toLocaleUpperCase(dateLocale) + word.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

export function Breadcrumbs({ items, className = "" }: { items?: BreadcrumbItem[]; className?: string }) {
  const pathname = usePathname();
  const rawPaths = pathname ? pathname.split("/").filter(Boolean) : [];
  const firstSegment = rawPaths[0];
  const isLocalePrefix = isValidLocale(firstSegment) && firstSegment !== "tr";
  const locale: Locale = isValidLocale(firstSegment) ? firstSegment : "tr";
  const paths = isLocalePrefix ? rawPaths.slice(1) : rawPaths;
  const dict = getDictionary(locale);
  
  // Eğer dışarıdan liste gelmezse current path'ten üret
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segmentPrefix = locale === "tr" ? "/" : `/${locale}/`;
    return paths.map((path, index) => {
      const href = `${segmentPrefix}${paths.slice(0, index + 1).join("/")}`;
      const label = formatSlugToLabel(path, locale);
      return { label, href, active: index === paths.length - 1 };
    });
  };

  const breadcrumbs = items || generateBreadcrumbs();

  if (pathname === "/" || pathname === "/en" || pathname === "/de" || pathname === "/ar" || !paths.length) return null;

  const homeHref = locale === "tr" ? "/" : `/${locale}`;
  const homeLabel = dict.nav.home;
  const ariaLabel = locale === "tr" ? "Ekmek Kırıntısı" : locale === "de" ? "Brotkrümelnavigation" : locale === "ar" ? "فتات الخبز" : "Breadcrumb";

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />
      <nav aria-label={ariaLabel} className={`flex items-center text-sm text-muted-foreground ${className}`}>
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link 
            href={homeHref} 
            prefetch={false}
            className="flex items-center hover:text-primary transition-colors gap-1"
            title={homeLabel}
          >
            <RiHome4Line size={16} />
            <span className="sr-only">{homeLabel}</span>
          </Link>
        </li>
        
        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <RiArrowRightSLine size={14} className="text-muted-foreground/40 shrink-0" />
            {crumb.active ? (
              <span className="font-medium text-foreground truncate max-w-[200px]" title={crumb.label}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                prefetch={false}
                className="hover:text-primary transition-colors truncate max-w-[150px]"
                title={crumb.label}
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}
