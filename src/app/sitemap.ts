import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/content/projects";
import { getSiteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl().toString().replace(/\/$/, "");
  const now = new Date();
  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getPublishedProjects().map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
