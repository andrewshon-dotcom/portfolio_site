import type { LinkItem } from "./types";

export const site = {
  name: "Andrew Young Shon",
  shortName: "Andrew Shon",
  monogram: "AS",
  title: "Senior E-Commerce & Full-Stack Developer",
  headline:
    "Building Scalable Commerce Platforms, Web Applications, and Integrations",
  description:
    "I design and develop high-performance e-commerce platforms, CMS-driven websites, full-stack applications, APIs, and enterprise integrations across Shopify Plus, WooCommerce, WordPress, React, TypeScript, and Node.js.",
  email: "andrewyoungshon@gmail.com",
  emailHref: "mailto:andrewyoungshon@gmail.com",
  phone: "+1 (239) 420-5034",
  phoneHref: "tel:+12394205034",
  location: "Orange Park, Florida",
  locationLong: "Orange Park, Florida · U.S. Remote · Eastern Time",
  workPreference: "U.S. Remote · Eastern Time",
  availability:
    "Open to U.S.-based remote full-time and contract opportunities.",
  authorization: "Authorized to work in the United States without sponsorship.",
  resumeHref: "/resume",
  resumePdfHref: "/Andrew_Young_Shon_Resume.pdf",
  seoTitle: "Andrew Young Shon | Senior E-Commerce & Full-Stack Developer",
  seoDescription:
    "Portfolio of Andrew Young Shon, a senior e-commerce and full-stack developer specializing in Shopify Plus, Hydrogen, WooCommerce, WordPress, React, TypeScript, Node.js, APIs, analytics, performance, and enterprise integrations.",
} as const;

export const navigation: readonly LinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function getConfiguredSocialLinks(): LinkItem[] {
  const links: LinkItem[] = [];
  if (process.env.NEXT_PUBLIC_LINKEDIN_URL) {
    links.push({
      label: "LinkedIn",
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    });
  }
  if (process.env.NEXT_PUBLIC_GITHUB_URL) {
    links.push({
      label: "GitHub",
      href: process.env.NEXT_PUBLIC_GITHUB_URL,
    });
  }
  return links;
}

export function getSiteUrl(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    try {
      const normalized = /^https?:\/\//i.test(value)
        ? value
        : `https://${value}`;
      return new URL(normalized);
    } catch {
      // Ignore invalid optional configuration and try the next safe source.
    }
  }

  return new URL("http://localhost:3000");
}
