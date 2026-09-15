import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RiMapPin2Line } from "react-icons/ri";
import { SanityImage as SanityImageType } from "@/types";

interface ServiceAreaSectionProps {
  title?: string;
  subtitle?: string;
  image?: SanityImageType;
}

export function ServiceAreaSection({ title, subtitle, image }: ServiceAreaSectionProps) {
  if (!title && !subtitle) return null;

  return (
    <section className="py-16 md:py-20 bg-accent/40">
      <div className="container mx-auto px-4">
        <SectionHeading title={title || ""} subtitle={subtitle} className="mb-10" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4">
        <FadeIn delay={0.15}>
          <div className="relative w-full aspect-[4/1] rounded-2xl overflow-hidden border bg-card">
            {image ? (
              <SanityImage
                image={image}
                fill
                sizes="(max-width: 1600px) 100vw, 1600px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-border/70 rounded-2xl">
                <RiMapPin2Line size={40} className="text-primary/40" />
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
