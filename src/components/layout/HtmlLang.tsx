"use client";

import { useEffect } from "react";
import { Locale } from "@/lib/i18n";

export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
