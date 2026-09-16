"use client";

import { useState } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxModal, LightboxImage } from "@/components/ui/Lightbox";
import { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
}

/**
 * 6-column rhythmic gallery grid:
 * - Landscape images span 3 columns
 * - Portrait images span 2 columns
 * - Natural aspect ratio without awkward forced cropping
 * - Clean hover with cursor-zoom-in and Lightbox modal
 */
export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const validItems = items.filter((item) => item.image?.asset);
  const lightboxItems: LightboxImage[] = validItems.map((item) => ({
    image: item.image!,
    caption: item.caption,
  }));

  if (validItems.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-start">
        {validItems.map((item, idx) => {
          const aspectRatio = item.image?.asset?.metadata?.dimensions?.aspectRatio ?? 1.33;
          const isLandscape = aspectRatio >= 1;
          const colSpan = isLandscape ? "col-span-2 md:col-span-3" : "col-span-2 md:col-span-2";

          return (
            <div key={item._id || idx} className={`${colSpan} flex flex-col group cursor-zoom-in`}>
              <div
                onClick={() => setSelectedImage(idx)}
                className="relative w-full overflow-hidden rounded-md border border-border bg-muted"
                style={{ aspectRatio: `${aspectRatio}` }}
              >
                <SanityImage
                  image={item.image!}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
              </div>
              {item.caption && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {item.caption}
                </p>
              )}
            </div>
          );
        })}
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
