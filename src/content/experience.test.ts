import { describe, expect, it } from "vitest";
import { experiences } from "./experience";

describe("verified employment history", () => {
  const absoluteWeb = experiences.find(
    (experience) => experience.company === "Absolute Web",
  );

  it("preserves the exact completed Absolute Web role", () => {
    expect(absoluteWeb).toBeDefined();
    expect(absoluteWeb).toMatchObject({
      company: "Absolute Web",
      title: "Ecommerce Full Stack Developer — Shopify Plus & Hydrogen",
      period: "August 2024 – June 2026",
      location: "Miami, Florida · Remote",
    });
    expect(absoluteWeb?.description[0]).toBe(
      "Architected and developed high-volume Shopify Plus and Hydrogen storefronts using React, TypeScript, React Router, GraphQL, Shopify Functions, Checkout UI Extensions, and enterprise integrations.",
    );
    expect(absoluteWeb?.period).not.toMatch(
      /July 2026|Present|Current|Ongoing/i,
    );
  });

  it("does not change the other verified employment periods", () => {
    expect(
      experiences.map(({ company, period }) => ({ company, period })),
    ).toEqual([
      { company: "Absolute Web", period: "August 2024 – June 2026" },
      { company: "RF-SMART", period: "July 2022 – July 2024" },
      { company: "Split Reef", period: "March 2021 – June 2022" },
      { company: "DiscoverTec", period: "January 2019 – February 2021" },
      { company: "feature[23]", period: "May 2017 – December 2018" },
      { company: "Hashrocket", period: "June 2015 – April 2017" },
    ]);
  });
});
