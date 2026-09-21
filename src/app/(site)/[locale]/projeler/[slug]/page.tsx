import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { isValidLocale, DEFAULT_LOCALE, Locale, getDictionary, getLocalizedPath } from "@/lib/i18n";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { SetAlternateUrls } from "@/components/providers/AlternateUrlsContext";
import Link from "next/link";
import { Project } from "@/types";
import { JsonLd, projectJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await cachedFetch<Array<{ tr?: string; en?: string; de?: string; ar?: string }>>(
    projectSlugsQuery,
    {},
    { next: { tags: ["project:list"] } }
  );
  const params: { locale: string; slug: string }[] = [];
  projects?.forEach((p) => {
    if (p.tr) params.push({ locale: "tr", slug: p.tr });
    if (p.en) params.push({ locale: "en", slug: p.en });
    if (p.de) params.push({ locale: "de", slug: p.de });
    if (p.ar) params.push({ locale: "ar", slug: p.ar });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const project = await cachedFetch<Project | null>(
    projectBySlugQuery,
    { locale, slug },
    { next: { tags: [`project:detail:${slug}`] } }
  );

  if (!project) return {};

  const trSlug = project.rawSlug?.tr?.current || slug;
  const enSlug = project.rawSlug?.en?.current || slug;
  const deSlug = project.rawSlug?.de?.current || enSlug;
  const arSlug = project.rawSlug?.ar?.current || enSlug;

  return buildMetadata(
    {
      title: project.title,
      description: portableTextToPlainText(project.body),
      canonicalPath: `/projeler/${trSlug}`,
      enCanonicalPath: `/en/projects/${enSlug}`,
      deCanonicalPath: `/de/projekte/${deSlug}`,
      arCanonicalPath: `/ar/projects/${arSlug}`,
      pageSeo: project.seo,
    },
    locale
  );
}

export default async function ProjectPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const project = await cachedFetch<Project | null>(
    projectBySlugQuery,
    { locale, slug },
    { next: { tags: [`project:detail:${slug}`] } }
  );

  if (!project) notFound();

  const trSlug = project.rawSlug?.tr?.current || slug;
  const enSlug = project.rawSlug?.en?.current || slug;
  const deSlug = project.rawSlug?.de?.current || enSlug;
  const arSlug = project.rawSlug?.ar?.current || enSlug;
  const trPath = `/projeler/${trSlug}`;
  const enPath = `/en/projects/${enSlug}`;
  const dePath = `/de/projekte/${deSlug}`;
  const arPath = `/ar/projects/${arSlug}`;

  const allProjectsHref = getLocalizedPath("projeler", locale);
  const backLabel = dict.projects.backToProjects;

  return (
    <>
      <SetAlternateUrls tr={trPath} en={enPath} de={dePath} ar={arPath} />
      <JsonLd data={projectJsonLd(project)} />
      <article className="container mx-auto px-4 py-16 max-w-3xl break-words overflow-x-hidden">
        <FadeIn direction="up">
          <Button variant="ghost" className="mb-8 -ml-2" render={<Link href={allProjectsHref} prefetch={false} />}>
            {backLabel}
          </Button>
          <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
        </FadeIn>

        {project.mainImage && (
          <FadeIn delay={0.15}>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-12">
              <SanityImage
                image={project.mainImage}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.25}>
          <RichText value={project.body} />
        </FadeIn>
      </article>
    </>
  );
}
