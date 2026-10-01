"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RiSearchLine } from "react-icons/ri";
import { getDictionary, getLocalizedPath, getPathLocale } from "@/lib/i18n";

// not-found.tsx receives no params, so the locale is read from the URL.
export function NotFoundContent() {
  const locale = getPathLocale(usePathname());
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5">
        <p className="text-[20rem] font-bold leading-none select-none">404</p>
      </div>

      <div className="space-y-4">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <RiSearchLine size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{dict.common.notFoundTitle}</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">{dict.common.notFoundDesc}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          size="lg"
          render={<Link href={getLocalizedPath("home", locale)} prefetch={false} />}
          className="px-8 transform transition hover:scale-105"
        >
          {dict.common.backToHome}
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<Link href={getLocalizedPath("iletisim", locale)} prefetch={false} />}
          className="px-8"
        >
          {dict.nav.contact}
        </Button>
      </div>
    </div>
  );
}
