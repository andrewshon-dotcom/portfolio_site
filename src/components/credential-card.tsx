import {
  Activity,
  BarChart3,
  Boxes,
  Code2,
  Database,
  LayoutTemplate,
  ArrowUpRight,
} from "lucide-react";
import type {
  Certification,
  CredentialCategory,
  CredentialIconKey,
} from "@/content/certifications";
import {
  formatCertificationDate,
  getCertificationStatus,
} from "@/content/certifications";

const categoryLabels: Readonly<Record<CredentialCategory, string>> = {
  "software-engineering": "Software Engineering",
  "frontend-engineering": "Frontend Engineering",
  "data-engineering": "Data Engineering",
  "commerce-analytics": "Commerce Analytics",
  "measurement-engineering": "Measurement Engineering",
  "commerce-platform": "Commerce Platform",
};

const iconMap = {
  "software-engineering": Code2,
  react: LayoutTemplate,
  database: Database,
  analytics: BarChart3,
  measurement: Activity,
  "commerce-platform": Boxes,
} satisfies Record<CredentialIconKey, typeof Code2>;

function getCredentialLinkLabel(certification: Certification): string {
  if (certification.issuer === "HackerRank") {
    return `View Andrew Young Shon’s ${certification.name} credential on HackerRank (opens in a new tab)`;
  }

  return `View Andrew Young Shon’s ${certification.name} (opens in a new tab)`;
}

export function CredentialCard({
  certification,
  isEngineering,
}: {
  certification: Certification;
  isEngineering: boolean;
}) {
  const Icon = iconMap[certification.iconKey];
  const status = getCertificationStatus(certification);

  return (
    <article
      className={`certification-card certification-card--${certification.category} ${
        isEngineering
          ? "certification-card--engineering"
          : "certification-card--commerce"
      } motion-reveal`}
      data-testid="credential-card"
    >
      <div className="certification-card__art" aria-hidden="true">
        <Icon />
        <i />
        <i />
        <i />
      </div>

      <div className="certification-card__topline">
        <div>
          <p className="certification-category">
            {categoryLabels[certification.category]}
          </p>
          <p className="certification-issuer">{certification.issuer}</p>
        </div>
        <span className={`status status--${status.toLowerCase()}`}>
          <span aria-hidden="true" />
          {status}
        </span>
      </div>

      <h3>{certification.name}</h3>
      <p className="certification-description">{certification.description}</p>

      <ul className="certification-skills" aria-label="Credential skills">
        {certification.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <dl className="certification-meta">
        <div>
          <dt>Issued</dt>
          <dd>
            <time dateTime={certification.issueDate}>
              {formatCertificationDate(certification.issueDate)}
            </time>
          </dd>
        </div>
        {certification.expirationDate ? (
          <div>
            <dt>Valid through</dt>
            <dd>
              <time dateTime={certification.expirationDate}>
                {formatCertificationDate(certification.expirationDate)}
              </time>
            </dd>
          </div>
        ) : null}
        <div className="certification-id">
          <dt>Credential ID</dt>
          <dd>
            <code>{certification.credentialId}</code>
          </dd>
        </div>
      </dl>

      {certification.credentialUrl ? (
        <a
          className="button button--dark certification-link"
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={getCredentialLinkLabel(certification)}
          data-analytics="credential_click"
          data-analytics-label={certification.slug}
        >
          View Credential
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
