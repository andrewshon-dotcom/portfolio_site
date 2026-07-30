import type { Project, ProjectCategory } from "./types";

export const projectFilters = [
  "All Projects",
  "Shopify",
  "Headless Commerce",
  "Checkout Extensibility",
  "Global Commerce",
  "WooCommerce",
  "Full-Stack",
  "APIs & Integrations",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projects: readonly Project[] = [
  {
    slug: "kooks-headers",
    name: "Kooks Headers & Exhaust",
    projectTitle: "Shopify B2B Automotive Commerce & ERP Integration Platform",
    published: true,
    categories: ["Shopify", "APIs & Integrations"],
    tags: ["Shopify Plus", "Shopify B2B", "ERP & PIM", "API Integration"],
    liveUrl: "https://kooksheaders.com/",
    cardDescription:
      "Contributed to a unified B2B and DTC commerce platform for an automotive performance brand, combining vehicle-fitment discovery, wholesale purchasing, real-time inventory visibility, and ERP/PIM synchronization. The solution simplified complex catalog workflows and enabled scalable self-service experiences for retail customers and dealers.",
    challenge:
      "The platform needed to support a large vehicle-specific catalog, wholesale self-service, customer-specific pricing, compatibility data, real-time inventory, and ERP/PIM connections.",
    technology: [
      "Shopify Plus",
      "Shopify B2B",
      "GraphQL",
      "REST APIs",
      "Webhooks",
      "ERP Integration",
      "PIM Integration",
      "Inventory Synchronization",
      "Product Fitment",
      "Large Catalog Commerce",
    ],
    image: "/images/projects/kooks-headers.png",
    artwork: "automotive",
    artworkAlt:
      "Kooks Headers & Exhaust website preview featuring the brand logo over performance exhaust headers",
  },
  {
    slug: "butcherbox-headless",
    name: "ButcherBox",
    projectTitle: "Headless Shopify Subscription Commerce Platform",
    published: true,
    categories: ["Shopify", "Headless Commerce"],
    tags: ["Shopify Hydrogen", "Shopify Oxygen", "React", "Subscriptions"],
    liveUrl: "https://www.butcherbox.com/",
    cardDescription:
      "Contributed to a headless Shopify storefront built with Hydrogen and Oxygen, integrating an established subscription platform, Shopify Checkout, headless CMS content, experimentation tools, and caching. The incremental migration improved storefront flexibility while preserving business-critical recurring commerce and customer account workflows.",
    technology: [
      "Shopify Hydrogen",
      "Shopify Oxygen",
      "React",
      "TypeScript",
      "Storefront API",
      "Webhooks",
      "Headless CMS",
      "Subscription Integration",
      "Server-Side Rendering",
      "Caching",
      "A/B Testing",
    ],
    image: "/images/projects/butcherbox-headless.jpg",
    artwork: "subscription",
    artworkAlt:
      "ButcherBox website preview featuring prepared steaks and fresh produce",
  },
  {
    slug: "pilgrim-checkout",
    name: "Pilgrim",
    projectTitle:
      "Shopify Functions & Checkout UI Extensions for High-Volume Commerce",
    published: true,
    categories: ["Shopify", "Checkout Extensibility"],
    tags: ["Shopify Plus", "Shopify Functions", "Checkout UI", "Shopify Flow"],
    liveUrl: "https://discoverpilgrim.com/",
    cardDescription:
      "Extended a high-volume Shopify checkout using Shopify Functions, Checkout UI Extensions, and private applications for payment fees, coupon visibility, delivery validation, promotional gifts, and cross-selling. Automated operational workflows with Shopify Flow while supporting flash-sale traffic and reliable one-page checkout experiences.",
    technology: [
      "Shopify Plus",
      "Shopify Functions",
      "Checkout UI Extensions",
      "Checkout Extensibility",
      "Shopify Flow",
      "Private App Development",
      "Cart Validation",
      "Delivery Customization",
      "Promotional Logic",
      "High-Traffic E-Commerce",
    ],
    image: "/images/projects/pilgrim-checkout.jpg",
    artwork: "checkout",
    artworkAlt:
      "Pilgrim website preview featuring a niacinamide serum campaign",
  },
  {
    slug: "nudient-global-commerce",
    name: "NUDIENT",
    projectTitle: "Global Shopify Markets & Localization Platform",
    published: true,
    categories: ["Shopify", "Global Commerce"],
    tags: [
      "Shopify Markets",
      "Localization",
      "Multi-Currency",
      "International SEO",
    ],
    liveUrl: "https://www.nudient.com/",
    cardDescription:
      "Contributed to a global Shopify Markets architecture supporting localized languages, currencies, content, inventory, and shopping experiences across international regions. The implementation consolidated regional storefront operations while preserving market-specific merchandising, payments, localization, and scalable expansion into new countries.",
    technology: [
      "Shopify Plus",
      "Shopify Markets",
      "Multi-Language Commerce",
      "Multi-Currency Commerce",
      "International SEO",
      "Localized Content",
      "Market-Specific Catalogs",
      "Inventory Localization",
      "Translate & Adapt",
      "Shop Pay",
    ],
    image: "/images/projects/nudient-global-commerce.jpg",
    artwork: "global",
    artworkAlt:
      "NUDIENT website preview featuring a close-up of a premium black travel case",
  },
  {
    slug: "tiny-wood-stove",
    name: "Tiny Wood Stove",
    projectTitle:
      "WooCommerce Product Configurator & Knowledge Commerce Platform",
    published: true,
    categories: ["WooCommerce"],
    tags: ["WordPress", "WooCommerce", "PHP", "Product Configurator"],
    liveUrl: "https://www.tinywoodstove.com/",
    cardDescription:
      "Developed and enhanced a content-driven WooCommerce experience combining technical education, guided stove selection, configurable installation kits, custom forms, inventory rules, and compatibility resources. The platform helps customers make complex product and installation decisions before completing a purchase.",
    technology: [
      "WordPress",
      "WooCommerce",
      "PHP",
      "MySQL",
      "JavaScript",
      "Custom Plugin Development",
      "Variable Products",
      "Product Configurator",
      "Inventory Management",
      "Technical SEO",
      "Content Management",
    ],
    image: "/images/projects/tiny-wood-stove.jpg",
    artwork: "configurator",
    artworkAlt:
      "Tiny Wood Stove website preview featuring a compact stove installation",
  },
  {
    slug: "universal-yums",
    name: "Universal Yums",
    projectTitle: "Subscription Commerce Data & Integration Platform",
    published: true,
    categories: ["WooCommerce", "Full-Stack", "APIs & Integrations"],
    tags: ["WooCommerce", "Laravel", "Subscriptions", "System Integration"],
    liveUrl: "https://www.universalyums.com/",
    cardDescription:
      "Developed full-stack subscription commerce workflows connecting custom WooCommerce product models and checkout logic with a Laravel data service, warehouse operations, marketing platforms, and recurring-order processing. The architecture supports complex subscription options and reliable, high-volume data exchange between commerce systems.",
    technology: [
      "WordPress",
      "WooCommerce",
      "WooCommerce Subscriptions",
      "PHP",
      "Laravel",
      "MySQL",
      "REST APIs",
      "Webhooks",
      "HPOS",
      "Background Jobs",
      "Warehouse Integration",
      "Data Synchronization",
      "Query Optimization",
      "Caching",
    ],
    image: "/images/projects/universal-yums.jpg",
    artwork: "data",
    artworkAlt:
      "Universal Yums website preview featuring its international snack subscription box",
  },
];

export function getPublishedProjects(): Project[] {
  return projects.filter((project) => project.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .sort((a, b) => {
      const aScore = a.categories.filter((category) =>
        project.categories.includes(category),
      ).length;
      const bScore = b.categories.filter((category) =>
        project.categories.includes(category),
      ).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function projectMatchesFilter(
  project: Project,
  filter: ProjectFilter,
): boolean {
  return (
    filter === "All Projects" ||
    project.categories.includes(filter as ProjectCategory)
  );
}
