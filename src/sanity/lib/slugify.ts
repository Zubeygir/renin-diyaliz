/**
 * Generates a clean, Turkish-friendly slug from a given string.
 * Prevents default Sanity transliteration issues (like "ö" -> "oe", "ü" -> "ue").
 */
export function turkishSlugify(input: string): string {
  if (!input) return "";

  let str = input
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .toLocaleLowerCase("tr-TR");

  const turkishChars: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
  };

  str = str.replace(/[çğıöşü]/g, (char) => turkishChars[char] || char);

  return str
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generates a clean German slug preserving standard German umlaut conventions.
 * ("ä" -> "ae", "ö" -> "oe", "ü" -> "ue", "ß" -> "ss").
 */
export function germanSlugify(input: string): string {
  if (!input) return "";

  let str = input.toLowerCase();

  const germanChars: Record<string, string> = {
    ä: "ae",
    ö: "oe",
    ü: "ue",
    ß: "ss",
  };

  str = str.replace(/[äöüß]/g, (char) => germanChars[char] || char);

  return str
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const ARABIC_TRANSLIT: Record<string, string> = {
  ا: "a", أ: "a", إ: "i", آ: "aa",
  ب: "b", ت: "t", ث: "th",
  ج: "j", ح: "h", خ: "kh",
  د: "d", ذ: "dh", ر: "r", ز: "z",
  س: "s", ش: "sh", ص: "s", ض: "d",
  ط: "t", ظ: "z", ع: "a", غ: "gh",
  ف: "f", ق: "q", ك: "k", ل: "l",
  م: "m", ن: "n", ه: "h", و: "w",
  ي: "y", ى: "a", ة: "a",
  ء: "", ئ: "y", ؤ: "w",
};

/**
 * Generates a clean Latin slug from Arabic text or Latin fallback.
 */
export function arabicSlugify(input: string): string {
  if (!input) return "";

  let str = input.trim();
  str = str.replace(/[\u0600-\u06FF]/g, (char) => ARABIC_TRANSLIT[char] ?? "");

  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
