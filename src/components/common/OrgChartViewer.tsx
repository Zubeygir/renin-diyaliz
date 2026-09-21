"use client";

import { useState } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxModal } from "@/components/ui/Lightbox";
import { SanityImage as SanityImageType } from "@/types";
import { RiZoomInLine } from "react-icons/ri";

const enlargeMap: Record<string, string> = {
  tr: "Büyütmek için tıklayın",
  en: "Click to enlarge",
  de: "Klicken zum Vergrößern",
  ar: "انقر للتكبير",
};

const chartTitleMap: Record<string, string> = {
  tr: "Organizasyon Şeması",
  en: "Organization Chart",
  de: "Organigramm",
  ar: "الهيكل التنظيمي",
};

export function OrgChartViewer({
  image,
  locale = "tr",
}: {
  image: SanityImageType;
  locale?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const enlargeText = enlargeMap[locale] || enlargeMap.tr;
  const captionText = chartTitleMap[locale] || chartTitleMap.tr;

  return (
    <div className="space-y-3">
      <div
        onClick={() => setIsOpen(true)}
        className="group relative cursor-zoom-in overflow-hidden rounded-md border border-border bg-white p-2 sm:p-4 transition-colors hover:border-primary/50"
        title={enlargeText}
      >
        <SanityImage
          image={image}
          width={image.asset?.metadata?.dimensions?.width || 1200}
          height={image.asset?.metadata?.dimensions?.height || 900}
          sizes="(max-width: 1280px) 100vw, 1100px"
          className="w-full h-auto rounded-sm object-contain"
          priority
        />
        <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded bg-foreground/80 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          <RiZoomInLine size={14} />
          <span>{enlargeText}</span>
        </div>
      </div>

      <LightboxModal
        items={[{ image, caption: captionText }]}
        activeIndex={isOpen ? 0 : null}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
