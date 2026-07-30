import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Mail,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectArtwork } from "@/components/project-artwork";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from "@/content/projects";
import { getSiteUrl, site } from "@/content/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.name}: ${project.projectTitle}`;
  const path = `/work/${project.slug}`;
  return {
    title,
    description: project.cardDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: project.cardDescription,
      images: [
        { url: "/og.png", width: 1200, height: 630, alt: site.seoTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.cardDescription,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const relatedProjects = getRelatedProjects(project);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.projectTitle,
    creator: { "@type": "Person", name: site.name },
    url: new URL(`/work/${project.slug}`, getSiteUrl()).toString(),
    description: project.cardDescription,
    keywords: project.technology.join(", "),
  };

  return (
    <main id="main-content" className="interior-page">
      <article>
        <header className="case-hero section-shell">
          <div className="content-rail">
            <Link className="back-link" href="/#work">
              <ArrowLeft aria-hidden="true" />
              All work
            </Link>
            <div className="case-hero-grid">
              <div className="case-hero-copy">
                <div className="case-hero-kicker">
                  <p className="hero-eyebrow">
                    {project.categories.join(" · ")}
                  </p>
                  <span>Selected work</span>
                </div>
                <div className="case-title-panel">
                  <p className="case-client">{project.name}</p>
                  <h1>{project.projectTitle}</h1>
                </div>
                <p className="case-summary">{project.cardDescription}</p>
                <ul className="case-hero-tags" aria-label="Key technologies">
                  {project.tags.slice(0, 4).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="case-actions">
                  <a
                    className="button button--primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="live_site_click"
                    data-analytics-label={project.slug}
                  >
                    Visit Live Site
                    <ExternalLink aria-hidden="true" />
                  </a>
                </div>
              </div>
              <ProjectArtwork project={project} />
            </div>
          </div>
        </header>

        <section className="section section--sand case-overview">
          <div className="content-rail case-content-grid">
            <div>
              <p className="section-eyebrow">
                <span aria-hidden="true" />
                Contribution overview
              </p>
              <h2>
                Commerce architecture built for real operational complexity.
              </h2>
            </div>
            <div className="case-prose">
              <p className="case-step">01 · Challenge</p>
              <h3>
                Operational complexity, translated into a clear customer
                journey.
              </h3>
              <p>
                {project.challenge ||
                  "The project required a reliable commerce experience connecting customer-facing workflows with business-critical systems."}
              </p>
              <p className="case-step">02 · Contribution</p>
              <h3>Hands-on commerce and integration engineering.</h3>
              <p>{project.cardDescription}</p>
              <p className="case-step">03 · Technical solution</p>
              <h3>
                A focused stack selected for the platform’s real constraints.
              </h3>
              <ul className="technology-list">
                {project.technology.map((technology) => (
                  <li key={technology}>
                    <Check aria-hidden="true" />
                    {technology}
                  </li>
                ))}
              </ul>
              <p className="case-step">04 · Outcome</p>
              <h3>
                A maintainable foundation for connected commerce operations.
              </h3>
              <p>
                The resulting implementation supports the storefront,
                operational workflows, and system connections described above
                while keeping the experience clear for customers and internal
                teams.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--dark case-architecture">
          <div className="content-rail case-architecture-grid">
            <div className="case-architecture-copy motion-reveal">
              <p className="section-eyebrow">
                <span aria-hidden="true" />
                System architecture
              </p>
              <h2>Customer experience and operational systems, connected.</h2>
              <p>
                This conceptual view highlights the project’s key commerce,
                data, and integration surfaces without exposing proprietary
                implementation details.
              </p>
              <Link className="text-link text-link--light" href="#contact-cta">
                Discuss a similar system
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="motion-reveal">
              <ProjectArtwork project={project} />
            </div>
          </div>
        </section>

        {relatedProjects.length ? (
          <section className="section section--dark related-work">
            <div className="content-rail">
              <div className="related-heading">
                <div>
                  <p className="section-eyebrow">
                    <span aria-hidden="true" />
                    Continue exploring
                  </p>
                  <h2>Related Work</h2>
                </div>
                <Link className="text-link text-link--light" href="/#work">
                  View all work
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
              <div className="related-grid">
                {relatedProjects.map((related) => (
                  <Link
                    className="related-card"
                    key={related.slug}
                    href={`/work/${related.slug}`}
                  >
                    <ProjectArtwork project={related} />
                    <span>{related.name}</span>
                    <strong>{related.projectTitle}</strong>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="contact-cta" className="case-contact-cta">
          <div className="content-rail case-contact-cta-inner">
            <div>
              <p className="section-eyebrow">
                <span aria-hidden="true" />
                Start a conversation
              </p>
              <h2>Have a complex commerce system to connect?</h2>
            </div>
            <a
              className="button button--light"
              href={site.emailHref}
              data-analytics="email_cta"
              data-analytics-label={`case-study-${project.slug}`}
            >
              Contact Andrew
              <Mail aria-hidden="true" />
            </a>
          </div>
        </section>
      </article>
      <script type="application/ld+json">
        {JSON.stringify(projectJsonLd)}
      </script>
    </main>
  );
}
