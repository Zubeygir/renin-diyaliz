"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowRightSLine, RiHome4Line } from "react-icons/ri";
import { JsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbItem } from "@/types";

const ROUTE_LABELS: Record<string, { tr: string; en: string }> = {
  hakkimizda: { tr: "Hakkımızda", en: "About Us" },
  about: { tr: "Hakkımızda", en: "About Us" },
  hizmetler: { tr: "Hizmetlerimiz", en: "Services" },
  services: { tr: "Hizmetlerimiz", en: "Services" },
  projeler: { tr: "Projelerimiz", en: "Projects" },
  projects: { tr: "Projelerimiz", en: "Projects" },
  blog: { tr: "Blog", en: "Blog" },
  iletisim: { tr: "İletişim", en: "Contact" },
  contact: { tr: "İletişim", en: "Contact" },
  galeri: { tr: "Galeri", en: "Gallery" },
  gallery: { tr: "Galeri", en: "Gallery" },
  kadromuz: { tr: "Kadromuz", en: "Our Team" },
  team: { tr: "Kadromuz", en: "Our Team" },
  "misyon-vizyon-degerler": { tr: "Misyon, Vizyon & Değerler", en: "Mission, Vision & Values" },
  "mission-vision-values": { tr: "Misyon, Vizyon & Değerler", en: "Mission, Vision & Values" },
  "organizasyon-semasi": { tr: "Organizasyon Şeması", en: "Organization Chart" },
  "organization-chart": { tr: "Organizasyon Şeması", en: "Organization Chart" },
};

function formatSlugToLabel(slug: string, isEn: boolean): string {
  try {
    const decoded = decodeURIComponent(slug).trim().toLowerCase();
    if (ROUTE_LABELS[decoded]) {
      return isEn ? ROUTE_LABELS[decoded].en : ROUTE_LABELS[decoded].tr;
    }
    return decoded
      .replace(/[-_]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toLocaleUpperCase(isEn ? "en-US" : "tr-TR") + word.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

export function Breadcrumbs({ items, className = "" }: { items?: BreadcrumbItem[]; className?: string }) {
  const pathname = usePathname();
  const rawPaths = pathname ? pathname.split("/").filter(Boolean) : [];
  const isEn = rawPaths[0] === "en";
  const paths = isEn ? rawPaths.slice(1) : rawPaths;
  
  // Eğer dışarıdan liste gelmezse current path'ten üret
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    return paths.map((path, index) => {
      const segmentPrefix = isEn ? "/en/" : "/";
      const href = `${segmentPrefix}${paths.slice(0, index + 1).join("/")}`;
      const label = formatSlugToLabel(path, isEn);
      return { label, href, active: index === paths.length - 1 };
    });
  };

  const breadcrumbs = items || generateBreadcrumbs();

  if (pathname === "/" || pathname === "/en" || !paths.length) return null;

  const homeHref = isEn ? "/en" : "/";
  const homeLabel = isEn ? "Home" : "Ana Sayfa";

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />
      <nav aria-label={isEn ? "Breadcrumb" : "Ekmek Kırıntısı"} className={`flex items-center text-sm text-muted-foreground ${className}`}>
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
