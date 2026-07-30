import { describe, expect, it } from "vitest";
import {
  certifications,
  formatCertificationDate,
  getCertifications,
  getCertificationStatus,
  isCertificationExpired,
} from "./certifications";

const expectedCredentials = [
  {
    slug: "hackerrank-software-engineer",
    name: "Software Engineer",
    credentialId: "3EF4CEF0A56C",
    issueDate: "2026-07-30",
    expirationDate: null,
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/3ef4cef0a56c",
  },
  {
    slug: "hackerrank-frontend-developer-react",
    name: "Frontend Developer (React)",
    credentialId: "4295EEBA4D23",
    issueDate: "2026-07-30",
    expirationDate: null,
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/4295eeba4d23",
  },
  {
    slug: "hackerrank-sql-advanced",
    name: "SQL (Advanced)",
    credentialId: "8C268E1D800F",
    issueDate: "2026-07-30",
    expirationDate: null,
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/8c268e1d800f",
  },
  {
    slug: "google-analytics-certification",
    name: "Google Analytics Certification",
    credentialId: "189927726",
    issueDate: "2026-07-28",
    expirationDate: "2027-07-28",
    credentialUrl:
      "https://skillshop.credential.net/8f1fb4e7-1b89-429b-ae7d-337b586f36a5#acc.lbT2te0X",
  },
  {
    slug: "google-ads-measurement-certification",
    name: "Google Ads Measurement Certification",
    credentialId: "190038110",
    issueDate: "2026-07-29",
    expirationDate: "2027-07-29",
    credentialUrl:
      "https://skillshop.credential.net/2acf3e88-32c8-4081-8354-3fa2f51bd08a#acc.GyXD1fCj",
  },
  {
    slug: "amazon-ads-for-retail-advanced",
    name: "Amazon Ads for Retail Advanced Certification",
    credentialId: "376aa98a-ff4e-47ff-b55b-fdf32c3d2c74",
    issueDate: "2026-07-30",
    expirationDate: "2028-07-30",
    credentialUrl: null,
  },
] as const;

describe("certification content integrity", () => {
  it("publishes exactly the six approved credentials in the required order", () => {
    expect(getCertifications()).toHaveLength(6);
    expect(certifications.map(({ name }) => name)).toEqual(
      expectedCredentials.map(({ name }) => name),
    );
  });

  it("keeps slugs and credential IDs unique", () => {
    expect(new Set(certifications.map(({ slug }) => slug)).size).toBe(6);
    expect(
      new Set(certifications.map(({ credentialId }) => credentialId)).size,
    ).toBe(6);
  });

  it("keeps three engineering credentials before three commerce-system credentials", () => {
    expect(certifications.slice(0, 3).map(({ category }) => category)).toEqual([
      "software-engineering",
      "frontend-engineering",
      "data-engineering",
    ]);
    expect(certifications.slice(3).map(({ category }) => category)).toEqual([
      "commerce-analytics",
      "measurement-engineering",
      "commerce-platform",
    ]);
  });

  it("stores five HTTPS personal verification URLs and no Amazon URL", () => {
    const publicUrls = certifications.flatMap(({ credentialUrl }) =>
      credentialUrl ? [credentialUrl] : [],
    );
    expect(publicUrls).toHaveLength(5);
    expect(publicUrls.every((url) => url.startsWith("https://"))).toBe(true);
    expect(
      certifications.find(
        ({ slug }) => slug === "amazon-ads-for-retail-advanced",
      )?.credentialUrl,
    ).toBeNull();
  });

  it.each(expectedCredentials)(
    "preserves the exact values for $name",
    (expected) => {
      const certification = certifications.find(
        ({ slug }) => slug === expected.slug,
      );
      expect(certification).toMatchObject(expected);
    },
  );

  it("formats ISO dates without local timezone drift", () => {
    expect(formatCertificationDate("2026-07-28")).toBe("Jul 28, 2026");
  });
});

describe("certification UTC status logic", () => {
  const hackerRankCredentials = certifications.slice(0, 3);
  const googleCredentials = certifications.slice(3, 5);
  const amazonCredential = certifications[5];

  it.each(hackerRankCredentials)(
    "returns Earned without inventing expiration for $name",
    (certification) => {
      expect(certification.expirationDate).toBeNull();
      expect(getCertificationStatus(certification)).toBe("Earned");
      expect(isCertificationExpired(certification)).toBe(false);
      expect(getCertificationStatus(certification)).not.toBe("Expired");
    },
  );

  it.each(googleCredentials)(
    "keeps $name active through its expiration date and expires it the following UTC day",
    (certification) => {
      expect(
        getCertificationStatus(
          certification,
          new Date(`${certification.expirationDate}T00:00:00.000Z`),
        ),
      ).toBe("Active");
      expect(
        getCertificationStatus(
          certification,
          new Date(`${certification.expirationDate}T23:59:59.999Z`),
        ),
      ).toBe("Active");

      const followingDay = new Date(
        `${certification.expirationDate}T23:59:59.999Z`,
      );
      followingDay.setUTCMilliseconds(followingDay.getUTCMilliseconds() + 1);
      expect(getCertificationStatus(certification, followingDay)).toBe(
        "Expired",
      );
    },
  );

  it("keeps Amazon active through expiration, expires it after, and retains the record", () => {
    expect(
      getCertificationStatus(
        amazonCredential,
        new Date("2028-07-30T23:59:59.999Z"),
      ),
    ).toBe("Active");
    expect(
      getCertificationStatus(
        amazonCredential,
        new Date("2028-07-31T00:00:00.000Z"),
      ),
    ).toBe("Expired");
    expect(
      getCertifications().some(
        ({ slug }) => slug === "amazon-ads-for-retail-advanced",
      ),
    ).toBe(true);
  });
});
