import { dictionaries, Locale, Dictionary } from "./dictionaries";
export { ROUTE_MAP, resolveLocalizedUrl, getLocalizedPath } from "./routes";

export const LOCALES: Locale[] = ["tr", "en", "de", "ar"];
export const DEFAULT_LOCALE: Locale = "tr";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

export function getDateLocale(locale: Locale): string {
  switch (locale) {
    case "en": return "en-US";
    case "de": return "de-DE";
    case "ar": return "ar-SA";
    default: return "tr-TR";
  }
}

export type { Locale, Dictionary };
