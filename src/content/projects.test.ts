import { describe, expect, it } from "vitest";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getPublishedProjects,
  getRelatedProjects,
  projectMatchesFilter,
  projects,
} from "./projects";

const expectedSlugs = [
  "kooks-headers",
  "butcherbox-headless",
  "pilgrim-checkout",
  "nudient-global-commerce",
  "tiny-wood-stove",
  "universal-yums",
];

describe("project publication helpers", () => {
  it("publishes all six selected projects in the approved order", () => {
    expect(getPublishedProjects().map((project) => project.slug)).toEqual(
      expectedSlugs,
    );
    expect(getPublishedProjects()).toHaveLength(6);
    expect(projects.every((project) => project.published)).toBe(true);
  });

  it("returns all six routes without an environment-dependent guard", () => {
    expect(getAllProjectSlugs()).toEqual(expectedSlugs);
    for (const slug of expectedSlugs) {
      expect(getProjectBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("uses a local live-site visual for every published project", () => {
    for (const project of getPublishedProjects()) {
      expect(project.image).toMatch(/^\/images\/projects\/.+\.(?:jpe?g|png)$/);
      expect(project.artworkAlt).toContain("website preview");
    }
  });

  it("returns every other project when related work requests five", () => {
    for (const project of projects) {
      const related = getRelatedProjects(project, 5);
      expect(related).toHaveLength(5);
      expect(related.some((item) => item.slug === project.slug)).toBe(false);
      expect(new Set(related.map((item) => item.slug)).size).toBe(5);
    }
  });

  it("matches every approved filter against the correct subset", () => {
    expect(
      projects.filter((project) => projectMatchesFilter(project, "Shopify")),
    ).toHaveLength(4);
    expect(
      projects.filter((project) =>
        projectMatchesFilter(project, "WooCommerce"),
      ),
    ).toHaveLength(2);
    expect(
      projects.filter((project) =>
        projectMatchesFilter(project, "APIs & Integrations"),
      ),
    ).toHaveLength(2);
    expect(
      projects.filter((project) =>
        projectMatchesFilter(project, "All Projects"),
      ),
    ).toHaveLength(6);
  });
});
