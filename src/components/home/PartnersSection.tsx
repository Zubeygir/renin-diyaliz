"use client";

import { useRef } from "react";
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

  if (!title || withLogo.length === 0) return null;

  // Mouse drag only; touch keeps the browser's own native scrolling untouched.
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    dragStart.current = { startX: e.clientX, startScrollLeft: track.scrollLeft };

    const onMouseMove = (moveEvent: MouseEvent) => {
      track.scrollLeft = dragStart.current.startScrollLeft - (moveEvent.clientX - dragStart.current.startX);
    };
    const onMouseUp = () => {
      track.classList.remove("snap-none");
      track.classList.add("snap-x", "snap-mandatory");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    // Snap fights JS-driven scrollLeft: the browser treats every assignment as a
    // settled scroll and jumps to the nearest card instead of following the cursor.
    // Disable it for the duration of the drag, restore it on release.
    track.classList.remove("snap-x", "snap-mandatory");
    track.classList.add("snap-none");
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <SplitSection
      title={title}
      className="bg-background border-t border-border"
      aside={note ? <p className="max-w-[40ch]">{note}</p> : undefined}
    >
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
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
