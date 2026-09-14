"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useAlternateUrls } from "@/components/providers/AlternateUrlsContext";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({
  currentLocale,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { alternateUrls } = useAlternateUrls();

  const getTargetUrl = (targetLocale: Locale): string => {
    if (targetLocale === currentLocale) return pathname || "/";

    // 1. Dinamik detay sayfalarında tam karşılık gelen slug varsa doğrudan onu kullan
    if (alternateUrls?.[targetLocale]) {
      return alternateUrls[targetLocale]!;
    }

    const cleanPath = pathname ? pathname.replace(/\/$/, "") : "";

    // 2. EN -> TR
    if (currentLocale === "en") {
      if (cleanPath === "/en" || cleanPath === "") return "/";
      if (cleanPath === "/en/about") return "/hakkimizda";
      if (cleanPath === "/en/contact") return "/iletisim";
      if (cleanPath === "/en/team") return "/kadromuz";
      if (cleanPath === "/en/gallery") return "/galeri";
      if (cleanPath === "/en/mission-vision-values") return "/misyon-vizyon-degerler";
      if (cleanPath === "/en/organization-chart") return "/organizasyon-semasi";
      if (cleanPath.startsWith("/en/services")) {
        return cleanPath.replace(/^\/en\/services/, "/hizmetler") || "/hizmetler";
      }
      if (cleanPath.startsWith("/en/projects")) {
        return cleanPath.replace(/^\/en\/projects/, "/projeler") || "/projeler";
      }
      if (cleanPath.startsWith("/en/blog")) {
        return cleanPath.replace(/^\/en\/blog/, "/blog") || "/blog";
      }
      return cleanPath.replace(/^\/en/, "") || "/";
    }

    // 3. TR -> EN
    if (cleanPath === "" || cleanPath === "/" || cleanPath === "/tr") return "/en";
    if (cleanPath === "/hakkimizda" || cleanPath === "/tr/hakkimizda") return "/en/about";
    if (cleanPath === "/iletisim" || cleanPath === "/tr/iletisim") return "/en/contact";
    if (cleanPath === "/kadromuz" || cleanPath === "/tr/kadromuz") return "/en/team";
    if (cleanPath === "/galeri" || cleanPath === "/tr/galeri") return "/en/gallery";
    if (cleanPath === "/misyon-vizyon-degerler" || cleanPath === "/tr/misyon-vizyon-degerler") return "/en/mission-vision-values";
    if (cleanPath === "/organizasyon-semasi" || cleanPath === "/tr/organizasyon-semasi") return "/en/organization-chart";
    if (cleanPath.startsWith("/hizmetler") || cleanPath.startsWith("/tr/hizmetler")) {
      return cleanPath.replace(/^\/(tr\/)?hizmetler/, "/en/services");
    }
    if (cleanPath.startsWith("/projeler") || cleanPath.startsWith("/tr/projeler")) {
      return cleanPath.replace(/^\/(tr\/)?projeler/, "/en/projects");
    }
    if (cleanPath.startsWith("/blog") || cleanPath.startsWith("/tr/blog")) {
      return cleanPath.replace(/^\/(tr\/)?blog/, "/en/blog");
    }

    return `/en${cleanPath}`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border/70 bg-muted/40 p-0.5 text-xs font-semibold select-none",
        className
      )}
      aria-label="Dil seçimi / Language selection"
    >
      <Link
        href={getTargetUrl("tr")}
        className={cn(
          "px-2 py-1 rounded transition-all leading-none",
          currentLocale === "tr"
            ? "bg-primary text-primary-foreground shadow-xs font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        TR
      </Link>
      <Link
        href={getTargetUrl("en")}
        className={cn(
          "px-2 py-1 rounded transition-all leading-none",
          currentLocale === "en"
            ? "bg-primary text-primary-foreground shadow-xs font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </Link>
    </div>
  );
}
