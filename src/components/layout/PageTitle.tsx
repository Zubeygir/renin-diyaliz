import { SanityImage } from "@/components/ui/SanityImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SanityImage as SanityImageType, BreadcrumbItem } from "@/types";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  image?: SanityImageType;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

/**
 * Clean inner page title block.
 * Replaces the heavy PageHero banner with an in-container 12-column layout:
 * - Breadcrumb on top
 * - Left 7 cols: h1 heading
 * - Right 5 cols: lede description (baseline-aligned)
 * - Optional 21:9 visual banner below title
 */
export function PageTitle({
  title,
  subtitle,
  image,
  breadcrumbs,
  className,
}: PageTitleProps) {
  return (
    <header className={cn("container mx-auto px-4 pt-8 md:pt-12", className)}>
      <Breadcrumbs items={breadcrumbs} className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-4 items-end border-b border-border pb-8 md:pb-10">
        <div className="lg:col-span-7">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.025em] text-foreground leading-[1.15]">
            {title}
          </h1>
        </div>

        {subtitle && (
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {image?.asset && (
        <div className="mt-8 md:mt-10 relative aspect-[21/9] w-full overflow-hidden rounded-md border border-border bg-muted">
          <SanityImage
            image={image}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
