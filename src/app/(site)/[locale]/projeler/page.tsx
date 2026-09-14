import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { projectsPageQuery, projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary } from "@/lib/i18n";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProjectsPage as ProjectsPageType, Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const pageData = await cachedFetch<ProjectsPageType>(
    projectsPageQuery,
    { locale },
    { next: { tags: ["projectsPage"] } }
  );

  const dict = getDictionary(locale);

  return buildMetadata(
    {
      title: pageData?.heroTitle || pageData?.pageTitle || dict.nav.projects,
      canonicalPath: "/projeler",
      enCanonicalPath: "/en/projects",
      pageSeo: pageData?.seo,
    },
    locale
  );
}

export default async function ProjectsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const [projects, pageData] = await Promise.all([
    cachedFetch<Project[]>(projectListQuery, { locale }, { next: { tags: ["project:list"] } }),
    cachedFetch<ProjectsPageType>(projectsPageQuery, { locale }, { next: { tags: ["projectsPage"] } }),
  ]);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      {/* Page Hero */}
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || dict.nav.projects}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <div className="container mx-auto px-4">
        {projects && projects.length > 0 ? (
          <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => {
              const projectHref = locale === "en"
                ? `/en/projects/${project.slug?.current}`
                : `/projeler/${project.slug?.current}`;

              return (
                <Link key={project.slug?.current} href={projectHref} prefetch={false} className="group block">
                  <article className="border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    {project.mainImage && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <SanityImage
                          image={project.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h2>
                      </div>
                      <div className="mt-6">
                        <span className="text-primary font-semibold text-sm tracking-wider uppercase group-hover:underline underline-offset-4 flex items-center">
                          {dict.common.viewDetail}
                          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </AnimateGroup>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground text-center py-16">
              {locale === "en" ? "No projects found." : "Henüz eklenmiş bir proje bulunmuyor."}
            </p>
          </FadeIn>
        )}

        {/* CTA Section */}
        {pageData?.ctaLabel && pageData?.ctaLink && (
          <FadeIn className="mt-16 md:mt-24 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === "en" ? "Have a Project in Mind?" : "Bir Projeniz mi Var?"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {locale === "en"
                ? "Let's turn your vision into reality together. Contact us today to consult with our experts."
                : "Hayalinizdeki projeyi birlikte gerçeğe dönüştürelim. Uzman ekibimizle konuşmak için hemen iletişime geçin."}
            </p>
            <Button size="lg" render={<Link href={pageData.ctaLink} prefetch={false} />}>
              {pageData.ctaLabel}
            </Button>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
