import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { AmbientField, ParticleWordmark } from "@/components/ambient-field";
import { ContactForm } from "@/components/contact-form";
import { CredentialCard } from "@/components/credential-card";
import { HeroArtwork } from "@/components/hero-artwork";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { getCertifications } from "@/content/certifications";
import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { expertiseGroups } from "@/content/expertise";
import { metrics } from "@/content/metrics";
import { getPublishedProjects } from "@/content/projects";
import { services } from "@/content/services";
import { getConfiguredSocialLinks, site } from "@/content/site";

const aboutHighlights = [
  "Architecture and hands-on development",
  "Commerce APIs and enterprise integrations",
  "Performance, accessibility, and technical SEO",
  "Automated testing, CI/CD, and production support",
  "Technical planning, code reviews, and mentoring",
];

const aboutImpact = [
  { value: "8", label: "Hydrogen storefronts launched" },
  { value: "4.2M", label: "Monthly sessions supported" },
  { value: "$85M", label: "Annual GMV supported" },
  { value: "3.8s → 1.7s", label: "Mobile LCP improvement" },
  { value: "18%", label: "Conversion increase contributed to" },
  { value: "1.5M+", label: "Monthly integration events" },
] as const;

const firstHeadlineWords = [
  { text: "Building", characterOffset: 0 },
  { text: "Scalable", characterOffset: 9 },
] as const;

export default function HomePage() {
  const publishedProjects = getPublishedProjects();
  const credentialList = getCertifications();
  const socials = getConfiguredSocialLinks();
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: site.seoTitle,
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle: site.title,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orange Park",
        addressRegion: "FL",
        addressCountry: "US",
      },
      knowsAbout: [
        "Shopify Plus",
        "Shopify Hydrogen",
        "WooCommerce",
        "WordPress",
        "React",
        "TypeScript",
        "Node.js",
        "GraphQL",
        "Enterprise integrations",
        "Web performance",
      ],
      ...(socials.length
        ? { sameAs: socials.map((social) => social.href) }
        : {}),
    },
  };

  return (
    <>
      <main id="main-content">
        <section
          id="home"
          className="hero section-shell"
          aria-labelledby="hero-title"
        >
          <AmbientField variant="hero" />
          <div className="hero-grid content-rail">
            <div className="hero-copy reveal">
              <p className="hero-eyebrow">{site.title}</p>
              <h1 id="hero-title" aria-label={site.headline}>
                <span
                  className="hero-title-line hero-title-line--characters"
                  aria-hidden="true"
                >
                  {firstHeadlineWords.map((word, wordIndex) => (
                    <span className="hero-title-word" key={word.text}>
                      {Array.from(word.text).map((character, index) => (
                        <i
                          className="hero-title-character"
                          key={`${character}-${index}`}
                          style={{
                            animationDelay: `${80 + (word.characterOffset + index) * 34}ms`,
                          }}
                        >
                          {character}
                        </i>
                      ))}
                      {wordIndex < firstHeadlineWords.length - 1 ? (
                        <i className="hero-title-word-gap">&nbsp;</i>
                      ) : null}
                    </span>
                  ))}
                </span>
                <span className="hero-title-line" aria-hidden="true">
                  Commerce Platforms,
                </span>
                <span className="hero-title-line" aria-hidden="true">
                  Web Applications,
                </span>
                <span
                  className="hero-title-line hero-title-final"
                  aria-hidden="true"
                >
                  and Integrations
                </span>
              </h1>
              <p className="hero-description">{site.description}</p>
              <div className="hero-notes">
                <p>
                  <BriefcaseBusiness aria-hidden="true" />
                  {site.availability}
                </p>
                <p>
                  <MapPin aria-hidden="true" />
                  {site.locationLong}
                </p>
              </div>
              <div className="hero-actions">
                <Link className="button button--primary" href="#work">
                  View My Work
                  <ArrowDown aria-hidden="true" />
                </Link>
                <Link
                  className="button button--outline"
                  href={site.resumeHref}
                  data-analytics="resume_download"
                  data-analytics-label="hero"
                >
                  View Résumé
                  <Download aria-hidden="true" />
                </Link>
                <Link className="text-link text-link--light" href="#contact">
                  Contact Me
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="hero-visual reveal reveal--delay">
              <HeroArtwork />
            </div>
          </div>
          <ParticleWordmark />
          <Link
            className="scroll-cue"
            href="#metrics"
            aria-label="Scroll to explore career metrics"
          >
            <span>Scroll to explore</span>
            <ArrowDown aria-hidden="true" />
          </Link>
        </section>

        <section
          id="metrics"
          className="metrics-band"
          aria-label="Career metrics"
        >
          <div className="content-rail metrics-grid">
            {metrics.map((metric, index) => (
              <div className="metric motion-reveal" key={metric.label}>
                <span className="metric-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{metric.value}</strong>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="expertise"
          className="section section--dark"
          aria-labelledby="expertise-title"
        >
          <AmbientField variant="expertise" />
          <div className="content-rail">
            <div id="expertise-title">
              <SectionHeading
                eyebrow="Capabilities"
                title="Technical Expertise"
                description="Commerce and software engineering capabilities spanning storefront architecture, checkout extensibility, backend services, enterprise data, performance, analytics, and production delivery."
              />
            </div>
            <div className="expertise-command motion-reveal">
              <aside
                className="expertise-console"
                aria-label="Expertise overview"
              >
                <p className="expertise-console-label">Engineering spectrum</p>
                <strong>
                  Commerce systems, from storefront to production operations.
                </strong>
                <p className="expertise-console-meta">
                  Architecture · Interfaces · Data · Delivery
                </p>
                <div className="expertise-orbit" aria-hidden="true">
                  <span>UI</span>
                  <span>API</span>
                  <span>OPS</span>
                  <i />
                </div>
              </aside>
              <div className="expertise-grid">
                {expertiseGroups.map((group, index) => (
                  <article className="expertise-card" key={group.title}>
                    <div className="card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3>{group.title}</h3>
                    <ul className="expertise-list">
                      {group.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                    <ArrowUpRight
                      className="expertise-card-icon"
                      aria-hidden="true"
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section section--sand section--about"
          aria-labelledby="about-title"
        >
          <div className="content-rail">
            <div id="about-title">
              <SectionHeading eyebrow="Profile" title="About Me" />
            </div>
            <div className="about-dashboard">
              <article className="about-signature motion-reveal">
                <span
                  className="about-signature__mark monogram"
                  aria-hidden="true"
                >
                  <span>A</span>
                  <span>S</span>
                </span>
                <div className="about-signature__copy">
                  <p className="about-kicker">Commerce systems · Full-stack</p>
                  <h3>
                    Senior commerce engineer working from architecture through
                    production.
                  </h3>
                </div>
                <dl className="about-signature__meta">
                  <div>
                    <dt>Experience</dt>
                    <dd>11+ years</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>End-to-end delivery</dd>
                  </div>
                  <div>
                    <dt>Working style</dt>
                    <dd>U.S. remote</dd>
                  </div>
                </dl>
              </article>

              <div className="about-bento">
                <article className="about-panel about-panel--scope motion-reveal">
                  <p className="about-panel__index">01 / Platform scope</p>
                  <h3>Commerce engineering across the complete lifecycle.</h3>
                  <div className="about-panel__copy">
                    <p>
                      I’m a senior e-commerce and full-stack developer building,
                      modernizing, and supporting digital commerce platforms,
                      CMS-driven websites, web applications, APIs, and
                      enterprise integrations.
                    </p>
                    <p>
                      My background spans Shopify Plus, Hydrogen and Oxygen,
                      WooCommerce, WordPress, custom storefronts, backend
                      services, relational databases, cloud infrastructure,
                      automated testing, deployment, monitoring, and production
                      support.
                    </p>
                  </div>
                </article>

                <article className="about-panel about-panel--impact motion-reveal">
                  <p className="about-panel__index">02 / Verified scale</p>
                  <h3>Systems designed for real traffic and operations.</h3>
                  <dl className="about-impact-grid">
                    {aboutImpact.map((impact) => (
                      <div key={impact.label}>
                        <dt>{impact.value}</dt>
                        <dd>{impact.label}</dd>
                      </div>
                    ))}
                  </dl>
                </article>

                <article className="about-panel about-panel--collaboration motion-reveal">
                  <p className="about-panel__index">03 / How I work</p>
                  <h3>Technical leadership without losing hands-on depth.</h3>
                  <p>
                    I collaborate with product, design, content, marketing,
                    operations, and engineering teams. I lead technical
                    planning, architecture discussions, code reviews,
                    development standards, production support, and developer
                    mentoring across distributed teams.
                  </p>
                </article>

                <article className="about-panel about-panel--capabilities motion-reveal">
                  <p className="about-panel__index">04 / Core capabilities</p>
                  <ul className="about-capability-list">
                    {aboutHighlights.map((highlight) => (
                      <li key={highlight}>
                        <Check aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="section section--dark"
          aria-labelledby="experience-title"
        >
          <div className="content-rail">
            <div id="experience-title">
              <SectionHeading
                eyebrow="Career"
                title="Professional Experience"
                description="More than a decade of experience delivering e-commerce platforms, business applications, APIs, integrations, and production systems."
              />
            </div>
            <div className="experience-layout">
              <aside className="experience-summary">
                <p>2015 — 2026</p>
                <strong>
                  Six roles across commerce and application engineering.
                </strong>
                <Link className="text-link text-link--light" href="/resume">
                  View Résumé
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </aside>
              <ol className="timeline">
                {experiences.map((experience, index) => (
                  <li key={`${experience.company}-${experience.period}`}>
                    <div className="timeline-marker" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <article className="experience-card motion-reveal">
                      <div className="experience-meta">
                        <span>{experience.period}</span>
                        <span>{experience.location}</span>
                      </div>
                      <p className="experience-company">{experience.company}</p>
                      <h3>{experience.title}</h3>
                      {experience.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {experience.highlights ? (
                        <ul className="highlight-list">
                          {experience.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="section section--work"
          aria-labelledby="work-title"
        >
          <AmbientField variant="work" />
          <div className="content-rail">
            <div id="work-title">
              <SectionHeading
                eyebrow="Selected projects"
                title="Featured Work"
                description="A selection of commerce platforms I contributed to—from Shopify Plus, headless storefronts, and checkout extensions to global localization, WooCommerce product configuration, subscription systems, and enterprise integrations. Each project combines scalable architecture, reliable APIs, performance, and customer-focused commerce experiences."
              />
            </div>
            <ProjectGrid projects={publishedProjects} />
          </div>
        </section>

        <section
          id="services"
          className="section section--dark"
          aria-labelledby="services-title"
        >
          <AmbientField variant="subtle" />
          <div className="content-rail">
            <div id="services-title">
              <SectionHeading eyebrow="Services" title="What I Do" />
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article
                  className={`service-card service-card--${service.accent} motion-reveal`}
                  key={service.title}
                >
                  <span className="service-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="credentials"
          className="section section--sand section--credentials"
          aria-labelledby="credentials-title"
        >
          <div className="content-rail">
            <div id="credentials-title">
              <SectionHeading
                eyebrow="Selected credentials"
                title="Engineering & Commerce Credentials"
                description="Selected credentials supporting my work across software engineering, React development, relational data, commerce analytics, measurement implementation, and modern e-commerce platforms."
              />
            </div>
            <div className="credential-row-guide" aria-hidden="true">
              <span>01 / Engineering</span>
              <span>02 / Commerce systems &amp; measurement</span>
            </div>
            <div className="certification-grid">
              {credentialList.map((credential, index) => (
                <CredentialCard
                  certification={credential}
                  isEngineering={index < 3}
                  key={credential.slug}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          className="section section--education"
          aria-labelledby="education-title"
        >
          <div className="content-rail">
            <article className="education-strip motion-reveal">
              <div className="education-strip__heading">
                <GraduationCap aria-hidden="true" />
                <div>
                  <p>Foundation</p>
                  <h2 id="education-title">Education</h2>
                </div>
              </div>
              <div className="education-strip__degree">
                <h3>{education.degree}</h3>
                <p>{education.institution}</p>
              </div>
              <dl>
                <div>
                  <dt>Period</dt>
                  <dd>{education.period}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{education.location}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section
          id="contact"
          className="section section--contact"
          aria-labelledby="contact-title"
        >
          <AmbientField variant="subtle" />
          <div className="content-rail">
            <div id="contact-title">
              <SectionHeading
                eyebrow="Contact"
                title="Let’s Build Something Better"
                description="I’m open to U.S.-based remote opportunities in e-commerce engineering, Shopify Plus, WooCommerce, WordPress, full-stack development, web applications, and systems integration."
              />
            </div>
            <div className="contact-grid">
              <div className="contact-copy">
                <p className="editorial-lead">
                  Reach out to discuss a full-time position, contract
                  engagement, platform modernization initiative, or commerce
                  integration project.
                </p>
                <p className="contact-authorization">
                  <Check aria-hidden="true" />
                  {site.authorization}
                </p>
                <div className="contact-details">
                  <a
                    href={site.emailHref}
                    data-analytics="email_cta"
                    data-analytics-label="contact_details"
                  >
                    <Mail aria-hidden="true" />
                    <span>
                      <small>Email</small>
                      {site.email}
                    </span>
                  </a>
                  <a
                    href={site.phoneHref}
                    data-analytics="phone_cta"
                    data-analytics-label="contact_details"
                  >
                    <Phone aria-hidden="true" />
                    <span>
                      <small>Phone</small>
                      {site.phone}
                    </span>
                  </a>
                  <div>
                    <MapPin aria-hidden="true" />
                    <span>
                      <small>Location</small>
                      {site.location} · {site.workPreference}
                    </span>
                  </div>
                </div>
                <div className="contact-actions">
                  <a
                    className="button button--primary"
                    href={site.emailHref}
                    data-analytics="email_cta"
                    data-analytics-label="contact_button"
                  >
                    Send Email
                    <Mail aria-hidden="true" />
                  </a>
                  <a
                    className="button button--outline"
                    href={site.phoneHref}
                    data-analytics="phone_cta"
                    data-analytics-label="contact_button"
                  >
                    Call Me
                    <Phone aria-hidden="true" />
                  </a>
                  <Link
                    className="text-link text-link--light"
                    href={site.resumeHref}
                    data-analytics="resume_download"
                    data-analytics-label="contact"
                  >
                    Résumé
                    <Download aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-rail footer-grid">
          <div>
            <span className="monogram" aria-hidden="true">
              <span>A</span>
              <span>S</span>
            </span>
            <p className="footer-name">{site.name}</p>
            <p>{site.title}</p>
          </div>
          <p className="footer-stack">
            Shopify Plus · WooCommerce · WordPress · React · TypeScript ·
            Node.js
          </p>
          <div className="footer-contact">
            <a href={site.emailHref}>{site.email}</a>
            <a href={site.phoneHref}>{site.phone}</a>
            <span>{site.location}</span>
            {socials.length ? (
              <div className="footer-socials">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="content-rail footer-bottom">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <Link href="#home">Back to top</Link>
        </div>
      </footer>
      <script type="application/ld+json">
        {JSON.stringify(profileJsonLd)}
      </script>
    </>
  );
}
