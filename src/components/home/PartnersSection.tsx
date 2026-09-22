"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SplitSection } from "@/components/ui/SplitSection";
import { SanityImage } from "@/components/ui/SanityImage";
import { Partner } from "@/types";
import { cn } from "@/lib/utils";

interface PartnersSectionProps {
  title?: string;
  note?: string;
  partners?: Partner[];
}

function PartnerLogo({ partner, className }: { partner: Partner; className?: string }) {
  if (!partner.logo) return null;

  // Logos stay in color: for SGK and insurers recognition is the point.
  // fill + objectFit=contain: the only sizing mode that's provably guaranteed to never crop,
  // regardless of the source logo's own aspect ratio.
  const logo = (
    <SanityImage image={partner.logo} fill fit="max" objectFit="contain" />
  );

  const cell = cn("relative flex items-center justify-center overflow-hidden bg-background", className);

  return partner.link ? (
    <a
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className={cn(cell, "transition-colors hover:bg-muted/60")}
      draggable={false}
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
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ startX: 0, startScrollLeft: 0 });
  const isPausedRef = useRef(false);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = (track.firstElementChild as HTMLElement)?.offsetWidth || 240;

    if (direction === "right") {
      const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      if (isAtEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      const isAtStart = track.scrollLeft <= 10;
      if (isAtStart) {
        track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      } else {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (withLogo.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        scroll("right");
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [withLogo.length]);

  if (!title || withLogo.length === 0) return null;

  const pause = () => {
    isPausedRef.current = true;
  };
  const resume = () => {
    isPausedRef.current = false;
  };

  // Mouse drag only; touch keeps the browser's own native scrolling untouched.
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    dragStart.current = { startX: e.clientX, startScrollLeft: track.scrollLeft };
    isPausedRef.current = true;

    const onMouseMove = (moveEvent: MouseEvent) => {
      track.scrollLeft = dragStart.current.startScrollLeft - (moveEvent.clientX - dragStart.current.startX);
    };
    const onMouseUp = () => {
      track.classList.remove("snap-none");
      track.classList.add("snap-x", "snap-mandatory");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      isPausedRef.current = false;
    };

    // Snap fights JS-driven scrollLeft: the browser treats every assignment as a
    // settled scroll and jumps to the nearest card instead of following the cursor.
    // Disable it for the duration of the drag, restore it on release.
    track.classList.remove("snap-x", "snap-mandatory");
    track.classList.add("snap-none");
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const asideContent = (
    <div className="flex flex-col gap-4">
      {note && <p className="max-w-[40ch]">{note}</p>}
      <div className="flex items-center gap-2 pt-1" dir="ltr">
        <button
          type="button"
          onClick={() => scroll("left")}
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-label="Önceki"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-label="Sonraki"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );

  return (
    <SplitSection
      title={title}
      className="bg-background border-t border-border"
      aside={asideContent}
    >
      <div
        ref={trackRef}
        dir="ltr"
        onMouseDown={onMouseDown}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="flex gap-px overflow-x-auto snap-x snap-mandatory select-none bg-border border border-border cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        {withLogo.map((partner) => (
          <PartnerLogo
            key={partner._id}
            partner={partner}
            className="aspect-[5/3] w-1/2 sm:w-1/3 lg:w-1/4 shrink-0 snap-start px-4 py-1"
          />
        ))}
      </div>
    </SplitSection>
  );
}
