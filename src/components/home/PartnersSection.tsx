"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Partner } from "@/types";

interface PartnersSectionProps {
  title?: string;
  partners?: Partner[];
}

export function PartnersSection({ title, partners = [] }: PartnersSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-5 md:py-6 bg-background border-y border-border/60">
      <div className="container mx-auto px-4">
        <FadeIn>
          {title && (
            <h2 className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
              {title}
            </h2>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Önceki"
              className="hidden sm:flex shrink-0 items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <RiArrowLeftSLine size={22} />
            </button>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing flex-1" ref={emblaRef}>
              <div className="flex gap-10 md:gap-14">
                {partners.map((partner) => {
                  const logoEl = partner.logo ? (
                    <SanityImage
                      image={partner.logo}
                      width={140}
                      height={56}
                      fit="max"
                      className="h-10 md:h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                    />
                  ) : null;

                  if (!logoEl) return null;

                  return (
                    <div key={partner._id} className="shrink-0 select-none">
                      {partner.link ? (
                        <a href={partner.link} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
                          {logoEl}
                        </a>
                      ) : (
                        <div aria-label={partner.name}>{logoEl}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Sonraki"
              className="hidden sm:flex shrink-0 items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <RiArrowRightSLine size={22} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
