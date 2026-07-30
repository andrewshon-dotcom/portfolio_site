import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  formatCertificationDate,
  getCertifications,
  getCertificationStatus,
} from "@/content/certifications";
import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { expertiseGroups } from "@/content/expertise";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Professional résumé for ${site.name}, ${site.title}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const credentialList = getCertifications();

  return (
    <main id="main-content" className="resume-page interior-page">
      <header className="resume-hero section-shell">
        <div className="content-rail">
          <Link className="back-link" href="/">
            <ArrowLeft aria-hidden="true" />
            Portfolio
          </Link>
          <div className="resume-title-grid">
            <div>
              <p className="hero-eyebrow">Professional Résumé</p>
              <h1>{site.name}</h1>
              <p className="resume-role">{site.title}</p>
            </div>
            <div className="resume-contact">
              <a href={site.emailHref}>
                <Mail aria-hidden="true" />
                {site.email}
              </a>
              <a href={site.phoneHref}>
                <Phone aria-hidden="true" />
                {site.phone}
              </a>
              <span>
                <MapPin aria-hidden="true" />
                {site.locationLong}
              </span>
            </div>
          </div>
          <p className="resume-summary">
            Senior e-commerce and full-stack engineer specializing in Shopify
            Plus, Hydrogen, WooCommerce, WordPress, React, TypeScript, Node.js,
            APIs, performance engineering, and enterprise integrations.
          </p>
        </div>
      </header>

      <section className="section section--sand resume-content">
        <div className="content-rail resume-layout">
          <aside>
            <section aria-labelledby="resume-expertise">
              <h2 id="resume-expertise">Core Expertise</h2>
              {expertiseGroups.map((group) => (
                <div className="resume-skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.skills.join(" · ")}</p>
                </div>
              ))}
            </section>
            <section aria-labelledby="resume-education">
              <GraduationCap aria-hidden="true" />
              <h2 id="resume-education">Education</h2>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <p>{education.period}</p>
              <p>{education.location}</p>
            </section>
            <section aria-labelledby="resume-certifications">
              <Award aria-hidden="true" />
              <h2 id="resume-certifications">Certifications</h2>
              <ol className="resume-certification-list">
                {credentialList.map((certification) => {
                  const status = getCertificationStatus(certification);

                  return (
                    <li key={certification.slug}>
                      <h3>
                        {certification.name}
                        <span> — {certification.issuer}</span>
                      </h3>
                      <p>
                        Issued{" "}
                        <time dateTime={certification.issueDate}>
                          {formatCertificationDate(certification.issueDate)}
                        </time>
                        {certification.expirationDate ? (
                          <>
                            {" "}
                            · Valid through{" "}
                            <time dateTime={certification.expirationDate}>
                              {formatCertificationDate(
                                certification.expirationDate,
                              )}
                            </time>{" "}
                            · {status}
                          </>
                        ) : (
                          <> · {status}</>
                        )}
                      </p>
                      <p className="resume-credential-id">
                        Credential ID: <code>{certification.credentialId}</code>
                      </p>
                      {certification.credentialUrl ? (
                        <a
                          className="text-link"
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View Andrew Young Shon’s ${certification.name} credential (opens in a new tab)`}
                        >
                          View credential
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </section>
          </aside>
          <section
            className="resume-experience"
            aria-labelledby="resume-experience"
          >
            <div className="resume-section-title">
              <BriefcaseBusiness aria-hidden="true" />
              <h2 id="resume-experience">Professional Experience</h2>
            </div>
            {experiences.map((experience) => (
              <article key={`${experience.company}-${experience.period}`}>
                <div className="resume-job-meta">
                  <div>
                    <p>{experience.company}</p>
                    <h3>{experience.title}</h3>
                  </div>
                  <div>
                    <p>{experience.period}</p>
                    <p>{experience.location}</p>
                  </div>
                </div>
                {experience.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {experience.highlights ? (
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
