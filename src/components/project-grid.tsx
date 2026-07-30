"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  projectFilters,
  projectMatchesFilter,
  type ProjectFilter,
} from "@/content/projects";
import type { Project } from "@/content/types";
import { trackEvent } from "@/lib/analytics";
import { ProjectArtwork } from "./project-artwork";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [filter, setFilter] = useState<ProjectFilter>("All Projects");
  const filteredProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilter(project, filter)),
    [filter, projects],
  );

  const selectFilter = (nextFilter: ProjectFilter) => {
    setFilter(nextFilter);
    trackEvent("project_filter", { filter_name: nextFilter });
  };

  return (
    <>
      <div className="project-filter-bar">
        <div className="project-filters" aria-label="Filter featured work">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => selectFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="project-count" aria-hidden="true">
          <strong>{String(filteredProjects.length).padStart(2, "0")}</strong>
          <span>selected systems</span>
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "project" : "projects"}.
      </p>

      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <article
            className="project-card motion-reveal"
            data-testid="project-card"
            key={project.slug}
          >
            <ProjectArtwork project={project} />
            <div className="project-card-body">
              <div className="project-card-kicker">
                <span>
                  <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
                  <b>{project.name}</b>
                </span>
                <span aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </div>
              <h3>{project.projectTitle}</h3>
              <ul className="tag-list" aria-label="Key technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p>{project.cardDescription}</p>
              <div className="project-card-actions">
                <Link
                  className="button button--dark"
                  href={`/work/${project.slug}`}
                  data-analytics="project_click"
                  data-analytics-label={project.slug}
                >
                  View Case Study
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <a
                  className="text-link"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics="live_site_click"
                  data-analytics-label={project.slug}
                >
                  Live Site
                  <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
