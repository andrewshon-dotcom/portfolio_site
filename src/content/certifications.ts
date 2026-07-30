export type CredentialCategory =
  | "software-engineering"
  | "frontend-engineering"
  | "data-engineering"
  | "commerce-analytics"
  | "measurement-engineering"
  | "commerce-platform";

export type CredentialIssuer =
  "HackerRank" | "Google Skillshop" | "Amazon Ads Academy";

export type CredentialIconKey =
  | "software-engineering"
  | "react"
  | "database"
  | "analytics"
  | "measurement"
  | "commerce-platform";

export type Certification = {
  slug: string;
  name: string;
  issuer: CredentialIssuer;
  category: CredentialCategory;
  credentialId: string;
  credentialUrl: string | null;
  issueDate: string;
  expirationDate: string | null;
  description: string;
  skills: readonly string[];
  iconKey: CredentialIconKey;
};

export type CertificationStatus = "Earned" | "Active" | "Expired";

export const certifications: readonly Certification[] = [
  {
    slug: "hackerrank-software-engineer",
    name: "Software Engineer",
    issuer: "HackerRank",
    category: "software-engineering",
    credentialId: "3EF4CEF0A56C",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/3ef4cef0a56c",
    issueDate: "2026-07-30",
    expirationDate: null,
    description:
      "Role-based technical credential demonstrating software-engineering proficiency across problem solving, relational data, REST API development, and practical application logic.",
    skills: [
      "Software Engineering",
      "Problem Solving",
      "REST APIs",
      "SQL",
      "Application Development",
    ],
    iconKey: "software-engineering",
  },
  {
    slug: "hackerrank-frontend-developer-react",
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    category: "frontend-engineering",
    credentialId: "4295EEBA4D23",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/4295eeba4d23",
    issueDate: "2026-07-30",
    expirationDate: null,
    description:
      "Role-based technical credential demonstrating practical proficiency in React, JavaScript, CSS, component-driven interfaces, and front-end application development.",
    skills: [
      "React",
      "JavaScript",
      "CSS",
      "Component Architecture",
      "Front-End Engineering",
    ],
    iconKey: "react",
  },
  {
    slug: "hackerrank-sql-advanced",
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    category: "data-engineering",
    credentialId: "8C268E1D800F",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/8c268e1d800f",
    issueDate: "2026-07-30",
    expirationDate: null,
    description:
      "Advanced SQL credential demonstrating proficiency in complex queries, relational data modeling, query optimization, analytical functions, advanced joins, and production-oriented database work.",
    skills: [
      "Advanced SQL",
      "Query Optimization",
      "Relational Databases",
      "Advanced Joins",
      "Window Functions",
    ],
    iconKey: "database",
  },
  {
    slug: "google-analytics-certification",
    name: "Google Analytics Certification",
    issuer: "Google Skillshop",
    category: "commerce-analytics",
    credentialId: "189927726",
    credentialUrl:
      "https://skillshop.credential.net/8f1fb4e7-1b89-429b-ae7d-337b586f36a5#acc.lbT2te0X",
    issueDate: "2026-07-28",
    expirationDate: "2027-07-28",
    description:
      "Validates proficiency in Google Analytics 4 implementation, event-based measurement, reporting, audience analysis, attribution, and the use of commerce data to support technical and conversion optimization.",
    skills: [
      "Google Analytics 4",
      "Event-Based Measurement",
      "Commerce Analytics",
      "Reporting",
      "Attribution",
    ],
    iconKey: "analytics",
  },
  {
    slug: "google-ads-measurement-certification",
    name: "Google Ads Measurement Certification",
    issuer: "Google Skillshop",
    category: "measurement-engineering",
    credentialId: "190038110",
    credentialUrl:
      "https://skillshop.credential.net/2acf3e88-32c8-4081-8354-3fa2f51bd08a#acc.GyXD1fCj",
    issueDate: "2026-07-29",
    expirationDate: "2027-07-29",
    description:
      "Validates knowledge of conversion instrumentation, Google Ads and Analytics measurement integration, reporting validation, attribution, and the technical use of commerce-event data to support optimization decisions.",
    skills: [
      "Conversion Instrumentation",
      "Measurement Architecture",
      "Google Analytics Integration",
      "Attribution",
      "Data Validation",
    ],
    iconKey: "measurement",
  },
  {
    slug: "amazon-ads-for-retail-advanced",
    name: "Amazon Ads for Retail Advanced Certification",
    issuer: "Amazon Ads Academy",
    category: "commerce-platform",
    credentialId: "376aa98a-ff4e-47ff-b55b-fdf32c3d2c74",
    credentialUrl: null,
    issueDate: "2026-07-30",
    expirationDate: "2028-07-30",
    description:
      "Validates advanced understanding of Amazon’s retail ecosystem, including product-detail readiness, marketplace operations, international commerce, brand discoverability, retail insights, customer experience, and the relationship between commerce infrastructure and product visibility.",
    skills: [
      "Amazon Retail Ecosystem",
      "Marketplace Operations",
      "Product Detail Architecture",
      "International Commerce",
      "Retail Data",
    ],
    iconKey: "commerce-platform",
  },
];

export function getCertifications(): readonly Certification[] {
  return certifications;
}

export function isCertificationExpired(
  certification: Certification,
  now = new Date(),
): boolean {
  if (!certification.expirationDate) {
    return false;
  }

  const expirationEndUtc = Date.parse(
    `${certification.expirationDate}T23:59:59.999Z`,
  );
  return now.getTime() > expirationEndUtc;
}

export function getCertificationStatus(
  certification: Certification,
  now = new Date(),
): CertificationStatus {
  if (!certification.expirationDate) {
    return "Earned";
  }

  return isCertificationExpired(certification, now) ? "Expired" : "Active";
}

export function formatCertificationDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
