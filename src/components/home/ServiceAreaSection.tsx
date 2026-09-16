import { SanityFile } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceAreaSectionProps {
  title?: string;
  subtitle?: string;
  districts?: { name: string }[];
  note?: string;
  media?: SanityFile;
}

// The page's drenched-teal surface. Information first: the district list is the
// content, the map is illustration. No placeholder when the map is missing.
export function ServiceAreaSection({ title, subtitle, districts, note, media }: ServiceAreaSectionProps) {
  if (!title) return null;

  const url = media?.asset?.url;
  const isVideo = Boolean(url && media?.asset?.mimeType?.startsWith("video/"));
  const hasMedia = Boolean(url);
  // GROQ yields null, not undefined, for a missing array
  const list = districts ?? [];

  return (
    <section className="bg-teal-deep text-white py-[clamp(4rem,8vw,7rem)]">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className={cn("min-w-0", hasMedia ? "lg:col-span-5" : "lg:col-span-8")}>
          <h2 className="text-h2 font-semibold">{title}</h2>
          {subtitle && <p className="text-lede text-white/80 mt-4 max-w-[44ch]">{subtitle}</p>}

          {list.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {list.map((d, i) => (
                <li
                  key={i}
                  className="rounded-md border border-white/25 px-3.5 py-1.5 font-heading text-base font-medium"
                >
                  {d.name}
                </li>
              ))}
            </ul>
          )}

          {note && <p className="mt-8 text-sm text-white/70 max-w-[52ch]">{note}</p>}
        </div>

        {hasMedia && (
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-ink/40">
              {isVideo ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={url} type={media?.asset?.mimeType} />
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- generic Sanity file asset, not an image asset: SanityImage's CDN transform loader doesn't support file refs
                <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
