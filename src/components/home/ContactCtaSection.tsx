import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Locale } from "@/types";

interface ContactCtaSectionProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  locale?: Locale;
}

export function ContactCtaSection({ title, subtitle, buttonLabel, locale = "tr" }: ContactCtaSectionProps) {
  if (!title && !buttonLabel) return null;

  const href = locale === "en" ? "/en/contact" : "/iletisim";

  return (
    <section className="bg-primary">
      <div className="container mx-auto px-4 py-16 md:py-20 text-center">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground max-w-2xl mx-auto">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-primary-foreground/80 text-base md:text-lg mt-3 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        {buttonLabel && (
          <div className="mt-8">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href={href} prefetch={false} />}
            >
              {buttonLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
