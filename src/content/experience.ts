import type { Experience } from "./types";

export const experiences: readonly Experience[] = [
  {
    company: "Absolute Web",
    title: "Ecommerce Full Stack Developer — Shopify Plus & Hydrogen",
    period: "August 2024 – June 2026",
    location: "Miami, Florida · Remote",
    description: [
      "Architected and developed high-volume Shopify Plus and Hydrogen storefronts using React, TypeScript, React Router, GraphQL, Shopify Functions, Checkout UI Extensions, and enterprise integrations.",
      "Launched eight Hydrogen storefronts on Oxygen supporting 4.2 million monthly sessions and $85 million in annual GMV. Led storefront migrations, checkout customization, international commerce, large-catalog synchronization, automated testing, deployment, and production operations.",
    ],
    highlights: [
      "8 Hydrogen storefronts launched",
      "Mobile LCP improved from 3.8s to 1.7s",
      "18% conversion improvement",
      "120K+ SKUs synchronized",
      "Release cadence increased from twice weekly to daily",
    ],
  },
  {
    company: "RF-SMART",
    title: "Senior Full Stack Developer — Commerce & ERP Integrations",
    period: "July 2022 – July 2024",
    location: "Jacksonville, Florida",
    description: [
      "Developed React and TypeScript applications and Node.js integration services supporting inventory, fulfillment, warehouse, NetSuite, and Oracle workflows.",
      "Built resilient processing systems using idempotency, Redis-backed retry queues, validation, reconciliation, SQL optimization, caching, automated testing, and AWS infrastructure.",
    ],
    highlights: [
      "1.5M+ monthly inventory and order events",
      "58% reduction in integration incidents",
      "45% improvement in P95 response time",
      "300+ warehouse and operations users",
    ],
  },
  {
    company: "Split Reef",
    title: "Senior Ecommerce Expert — Shopify & WooCommerce",
    period: "March 2021 – June 2022",
    location: "Jacksonville, Florida",
    description: [
      "Led technical strategy and delivery for Shopify, WooCommerce, and WordPress storefronts, covering reusable content systems, custom commerce functionality, analytics, accessibility, technical SEO, performance, and conversion optimization.",
      "Modernized legacy Shopify themes to Online Store 2.0 and developed Liquid, JavaScript, PHP, WordPress, and WooCommerce enhancements across product discovery, subscriptions, checkout, payments, shipping, and customer accounts.",
    ],
    highlights: [
      "18 Shopify and WooCommerce storefronts",
      "$25M+ combined annual online revenue",
      "60% faster merchant content updates",
      "11% mobile conversion increase",
      "24% organic traffic increase",
    ],
  },
  {
    company: "DiscoverTec",
    title: "Lead Shopify & WooCommerce Developer",
    period: "January 2019 – February 2021",
    location: "Jacksonville, Florida",
    description: [
      "Led the development of Shopify, WooCommerce, and WordPress storefronts and built custom themes, applications, extensions, and PHP/MySQL integration services.",
      "Connected commerce platforms with CRM, ERP, tax, payment, email, inventory, and fulfillment systems while establishing code review, QA, deployment, and technical documentation standards.",
    ],
    highlights: [
      "20+ commerce storefronts launched and maintained",
      "Catalogs up to 50K SKUs",
      "99.8% successful synchronization rate",
      "30% faster new-store delivery",
      "Three developers mentored",
    ],
  },
  {
    company: "feature[23]",
    title: "Full Stack Developer",
    period: "May 2017 – December 2018",
    location: "Jacksonville, Florida",
    description: [
      "Built full-stack web applications using React, TypeScript, Node.js, Express, REST APIs, and PostgreSQL.",
      "Developed reusable component systems, role-based access controls, authenticated workflows, third-party integrations, automated testing, Docker-based environments, and continuous-integration pipelines.",
    ],
    highlights: [
      "Reduced release preparation time by 35% through modular architecture, Docker-based development, and automated CI workflows.",
    ],
  },
  {
    company: "Hashrocket",
    title: "Software Developer",
    period: "June 2015 – April 2017",
    location: "Jacksonville Beach, Florida",
    description: [
      "Developed Ruby on Rails and PostgreSQL applications using RESTful services, background jobs, authentication, responsive interfaces, and test-driven development.",
      "Worked directly with clients through pair programming, technical estimation, iterative planning, production troubleshooting, and architecture documentation.",
    ],
  },
];
