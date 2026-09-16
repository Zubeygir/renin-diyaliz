import { SplitSection } from "@/components/ui/SplitSection";
import { SanityImage } from "@/components/ui/SanityImage";
import { Partner } from "@/types";
import { cn } from "@/lib/utils";

interface PartnersSectionProps {
  title?: string;
  note?: string;
  partners?: Partner[];
}

// Above this count a static grid gets too tall; switch to a paused-on-hover marquee.
const MARQUEE_THRESHOLD = 12;

function PartnerLogo({ partner, className }: { partner: Partner; className?: string }) {
  if (!partner.logo) return null;

  // Logos stay in color: for SGK and insurers recognition is the point.
  const logo = (
    <SanityImage
      image={partner.logo}
      width={160}
      height={64}
      fit="max"
      className="h-9 md:h-11 w-auto max-w-[140px] object-contain"
    />
  );

  const cell = cn("flex items-center justify-center bg-background", className);

  return partner.link ? (
    <a
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className={cn(cell, "transition-colors hover:bg-muted/60")}
    >
      {logo}
    </a>
  ) : (
    <div aria-label={partner.name} className={cell}>
      {logo}
    </div>
  );
}

export function PartnersSection({ title, note, partners = [] }: PartnersSectionProps) {
  const withLogo = partners.filter((p) => p.logo);
  if (!title || withLogo.length === 0) return null;

  const useMarquee = withLogo.length > MARQUEE_THRESHOLD;

  return (
    <SplitSection
      title={title}
      className="bg-background border-t border-border"
      aside={note ? <p className="max-w-[40ch]">{note}</p> : undefined}
    >
      {useMarquee ? (
        <div className="overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-12 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-auto motion-reduce:flex-wrap">
            {[...withLogo, ...withLogo].map((partner, i) => (
              <PartnerLogo
                key={`${partner._id}-${i}`}
                partner={partner}
                className={i >= withLogo.length ? "motion-reduce:hidden" : undefined}
              />
            ))}
          </div>
        </div>
      ) : (
        // Hairline grid: 1px gaps over the border color read as rules, not cards
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
          {withLogo.map((partner) => (
            <PartnerLogo key={partner._id} partner={partner} className="aspect-[5/3] p-6" />
          ))}
        </div>
      )}
    </SplitSection>
  );
}
