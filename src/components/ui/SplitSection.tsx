import { cn } from "@/lib/utils";

interface SplitSectionProps {
  title: string;
  /** Rendered under the heading in the label column (links, short notes). */
  aside?: React.ReactNode;
  /** Inverted text colors for teal/ink surfaces. */
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Home page section grammar: heading in a sticky 4-col label column,
 * content in the remaining 8 cols. Gives every section the same spine
 * while letting the content column change shape per section.
 */
export function SplitSection({
  title,
  aside,
  tone = "light",
  id,
  className,
  children,
}: SplitSectionProps) {
  const dark = tone === "dark";

  return (
    <section
      id={id}
      className={cn(
        "py-[clamp(4rem,8vw,7rem)]",
        dark ? "text-white" : "text-foreground",
        className
      )}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-h2 font-semibold">{title}</h2>
          {aside && (
            <div className={cn("mt-4 text-sm", dark ? "text-white/75" : "text-muted-foreground")}>
              {aside}
            </div>
          )}
        </div>
        <div className="lg:col-span-8 min-w-0">{children}</div>
      </div>
    </section>
  );
}
