import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "center" | "left";
  className?: string;
}

// Static by design: section headings don't get an entrance animation
// (uniform reveal on every section is the template tell, see docs/design-language.md).
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-wider text-primary uppercase inline-block mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2 font-semibold text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lede mt-3">{subtitle}</p>
      )}
    </div>
  );
}
