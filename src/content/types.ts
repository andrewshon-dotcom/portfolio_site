export type LinkItem = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type ExpertiseGroup = {
  title: string;
  skills: readonly string[];
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  location: string;
  description: readonly string[];
  highlights?: readonly string[];
};

export type ProjectCategory =
  | "Shopify"
  | "Headless Commerce"
  | "Checkout Extensibility"
  | "Global Commerce"
  | "WooCommerce"
  | "Full-Stack"
  | "APIs & Integrations";

export type ProjectArtwork =
  | "automotive"
  | "subscription"
  | "checkout"
  | "global"
  | "configurator"
  | "data";

export type Project = {
  slug: string;
  name: string;
  projectTitle: string;
  published: boolean;
  categories: readonly ProjectCategory[];
  tags: readonly string[];
  liveUrl: string;
  cardDescription: string;
  challenge?: string;
  technology: readonly string[];
  artwork: ProjectArtwork;
  artworkAlt: string;
  image?: string;
};

export type Service = {
  title: string;
  description: string;
  accent: "lavender" | "coral" | "mint" | "blue" | "amber";
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
};
