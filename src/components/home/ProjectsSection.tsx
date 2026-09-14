import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project, Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  locale?: Locale;
}

export function ProjectsSection({
  title,
  subtitle,
  projects = [],
  locale = "tr",
}: ProjectsSectionProps) {
  const dict = getDictionary(locale);
  const displayTitle = title || dict.common.allProjects;
  const displaySubtitle = subtitle;
  const allProjectsHref = locale === "en" ? "/en/projects" : "/projeler";

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <SectionHeading
          title={displayTitle}
          subtitle={displaySubtitle}
          className="mb-16"
        />

        {/* Content */}
        {projects && projects.length > 0 ? (
          <div className="space-y-12">
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project: Project) => {
                const projectHref = locale === "en"
                  ? `/en/projects/${project.slug?.current}`
                  : `/projeler/${project.slug?.current}`;

                return (
                  <Link key={project.slug?.current} href={projectHref} prefetch={false} className="group block relative overflow-hidden rounded-xl border aspect-[4/3]">
                    {project.mainImage ? (
                      <div className="absolute inset-0">
                        <SanityImage
                          image={project.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/50 group-hover:from-black/90 transition-all duration-300" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background flex items-center justify-center p-6 text-center">
                        <h3 className="font-bold text-xl text-foreground line-clamp-2">{project.title}</h3>
                      </div>
                    )}

                    <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end h-full">
                      <h3 className="font-bold text-lg md:text-xl text-white line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="mt-2 overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-500 ease-in-out">
                        <span className="text-white/80 font-medium text-xs tracking-wider uppercase flex items-center">
                          {dict.common.viewDetail} <span className="ml-1">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </AnimateGroup>
            
            <FadeIn delay={0.2} className="text-center pt-4">
              <Button variant="outline" size="lg" render={<Link href={allProjectsHref} prefetch={false} />}>
                {dict.common.allProjects}
              </Button>
            </FadeIn>
          </div>
        ) : null}

      </div>
    </section>
  );
}
