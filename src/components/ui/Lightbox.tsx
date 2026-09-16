"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage as SanityImageType } from "@/types";

/**
 * Thumbnail'e hover edildiğinde tam boyutlu lightbox görselini önceden yükler.
 * Tarayıcı cache'e aldığı için tıklandığında anında açılır.
 */
function prefetchLightboxImage(image: SanityImageType) {
  if (typeof window === "undefined" || !image?.asset) return;
  try {
    const url = urlForImage(image)
      ?.auto("format")
      .width(1920)
      .fit("max") // Upscale'i önle
      .quality(90)
      .url();
    if (!url) return;
    if (document.querySelector(`link[href="${url}"]`)) return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  } catch {
    // prefetch başarısız olursa sessizce geç
  }
}

export interface LightboxImage {
  image: SanityImageType;
  caption?: string;
}

interface LightboxGalleryProps {
  items: LightboxImage[];
}

export interface LightboxModalProps {
  items: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex?: (index: number) => void;
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      if (onSelectIndex && activeIndex !== null) {
        if (newDirection === 1) {
          onSelectIndex(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
        } else {
          onSelectIndex(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
        }
      }
    },
    [items.length, activeIndex, onSelectIndex]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, paginate, onClose]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (!items || items.length === 0) return null;

  return (
    <AnimatePresence initial={false} custom={direction}>
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 px-4 md:px-12 backdrop-blur-sm touch-none"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-10">
            <div className="text-white/80 font-mono text-sm tabular-nums">
              {activeIndex + 1} <span className="text-white/30">/</span> {items.length}
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Kapat"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                aria-label="Önceki görsel"
              >
                <ChevronLeft size={44} />
              </button>
              <button
                className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                aria-label="Sonraki görsel"
              >
                <ChevronRight size={44} />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x > 100 || (offset.x > 20 && velocity.x > 500)) {
                  paginate(-1);
                } else if (
                  offset.x < -100 ||
                  (offset.x < -20 && velocity.x < -500)
                ) {
                  paginate(1);
                }
              }}
              className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <SanityImage
                image={items[activeIndex].image}
                fill
                fit="max"
                quality={90}
                sizes="(max-width: 1920px) 100vw, 1920px"
                className="pointer-events-none select-none"
                objectFit="contain"
              />
            </motion.div>
          </div>

          {/* Caption */}
          {items[activeIndex].caption && (
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center px-6 z-10">
              <p className="text-white/80 text-sm text-center max-w-xl">
                {items[activeIndex].caption}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LightboxGallery({ items }: LightboxGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {items.map((item, i) => (
          <div
            key={i}
            className="group relative cursor-pointer overflow-hidden rounded-md aspect-[4/3] bg-muted border border-border"
            onClick={() => setSelectedImage(i)}
            onMouseEnter={() => prefetchLightboxImage(item.image)}
          >
            <SanityImage
              image={item.image}
              width={800}
              height={600}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90 cursor-zoom-in"
            />
          </div>
        ))}
      </div>

      <LightboxModal
        items={items}
        activeIndex={selectedImage}
        onClose={() => setSelectedImage(null)}
        onSelectIndex={setSelectedImage}
      />
    </>
  );
}
