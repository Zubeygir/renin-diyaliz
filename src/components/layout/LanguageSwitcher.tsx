"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, LOCALES, resolveLocalizedUrl } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useAlternateUrls } from "@/components/providers/AlternateUrlsContext";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  light?: boolean;
}

export function LanguageSwitcher({
  currentLocale,
  className,
  light = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { alternateUrls } = useAlternateUrls();

  return (
    <div
      className={cn("inline-flex items-center gap-1.5 text-xs select-none", className)}
      aria-label="Dil seçimi / Language selection"
    >
      {LOCALES.map((loc, idx) => {
        const targetUrl = resolveLocalizedUrl(pathname || "", currentLocale, loc, alternateUrls);
        return (
          <span key={loc} className="inline-flex items-center gap-1.5">
            {idx > 0 && <span className={light ? "text-white/40" : "text-border"}>/</span>}
            <LanguageLink locale={loc} active={currentLocale === loc} href={targetUrl} light={light}>
              {loc.toUpperCase()}
            </LanguageLink>
          </span>
        );
      })}
    </div>
  );
}

function LanguageLink({
  href,
  active,
  light,
  children,
}: {
  locale: Locale;
  href: string;
  active: boolean;
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-1 transition-colors leading-none",
        light
          ? active
            ? "font-semibold text-white"
            : "text-white/70 hover:text-white"
          : active
            ? "font-semibold text-foreground"
            : "text-foreground/55 hover:text-foreground"
      )}
    >
      {children}
      {active && (
        <span
          className={cn(
            "absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full",
            light ? "bg-white" : "bg-primary"
          )}
        />
      )}
    </Link>
  );
}
