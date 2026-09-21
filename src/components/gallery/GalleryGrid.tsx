"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxModal, LightboxImage } from "@/components/ui/Lightbox";
import { GalleryImage, Locale } from "@/types";

interface GalleryGridProps {
  items: GalleryImage[];
  locale?: Locale;
}

/**
 * Responsive 3-column gallery grid with zoom indicators and hover animations.
 */
export function GalleryGrid({ items, locale = "tr" }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const defaultAltMap: Record<Locale, string> = {
    tr: "Renin Diyaliz Galeri",
    en: "Renin Dialysis Gallery",
    de: "Renin Dialyse Galerie",
    ar: "معرض رينين للغسيل الكلوي",
  };
  const defaultAlt = defaultAltMap[locale] || defaultAltMap.tr;

  const validItems = items.filter((item) => item.asset);
  const lightboxItems: LightboxImage[] = validItems.map((item) => ({
    image: item,
    caption: item.caption,
  }));

  if (validItems.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {validItems.map((item, idx) => (
          <div
            key={item._key || idx}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedImage(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedImage(idx);
              }
            }}
            aria-label={item.caption || item.alt || defaultAlt}
            className="group flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted">
              <SanityImage
                image={item}
                alt={item.alt || defaultAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-xs opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                <Expand className="size-4" />
              </div>
            </div>
            {item.caption && (
              <p className="mt-2.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground line-clamp-2">
                {item.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <LightboxModal
        items={lightboxItems}
        activeIndex={selectedImage}
        onClose={() => setSelectedImage(null)}
        onSelectIndex={setSelectedImage}
      />
    </>
  );
}
