import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { RiMapPin2Line } from "react-icons/ri";
import { SanityFile } from "@/types";

interface ServiceAreaSectionProps {
  title?: string;
  subtitle?: string;
  media?: SanityFile;
}

export function ServiceAreaSection({ title, subtitle, media }: ServiceAreaSectionProps) {
  if (!title && !subtitle) return null;

  const url = media?.asset?.url;
  const isVideo = media?.asset?.mimeType?.startsWith("video/");
  const isImage = url && !isVideo;

  return (
    <section className="py-16 md:py-20 bg-accent/40">
      <div className="container mx-auto px-4">
        <SectionHeading title={title || ""} subtitle={subtitle} className="mb-10" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4">
        <FadeIn delay={0.15}>
          <div className="relative w-full aspect-[4/1] rounded-2xl overflow-hidden border bg-card">
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- generic Sanity file asset, not an image asset: SanityImage's CDN transform loader doesn't support file refs
              <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : !isVideo ? (
              <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-border/70 rounded-2xl">
                <RiMapPin2Line size={40} className="text-primary/40" />
              </div>
            ) : null}

            {isVideo && url && (
              <video
                className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={url} type={media?.asset?.mimeType} />
              </video>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
