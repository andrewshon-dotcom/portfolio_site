import Image from "next/image";
import type { Project } from "@/content/types";

export function ProjectArtwork({ project }: { project: Project }) {
  if (project.image) {
    const hostname = new URL(project.liveUrl).hostname.replace(/^www\./, "");

    return (
      <div className="project-art project-art--image">
        <Image
          src={project.image}
          alt={project.artworkAlt}
          fill
          sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
        />
        <div className="project-site-chrome" aria-hidden="true">
          <span className="project-site-controls">
            <i />
            <i />
            <i />
          </span>
          <span className="project-site-domain">{hostname}</span>
          <span className="project-site-status">
            <i />
            Live
          </span>
        </div>
        <div className="project-image-caption" aria-hidden="true">
          <span>{project.categories[0]}</span>
          <strong>Live storefront</strong>
        </div>
      </div>
    );
  }

  const labels: Record<Project["artwork"], readonly string[]> = {
    automotive: ["VEHICLE", "FITMENT", "ERP", "PIM"],
    subscription: ["STOREFRONT", "SUBSCRIBE", "CMS", "CHECKOUT"],
    checkout: ["VALIDATE", "DISCOUNT", "GIFT", "FLOW"],
    global: ["EN · USD", "EU · EUR", "APAC", "INVENTORY"],
    configurator: ["STOVE", "PARTS", "GUIDE", "COMPATIBLE"],
    data: ["COMMERCE", "LARAVEL", "WAREHOUSE", "MARKETING"],
  };

  return (
    <div
      className={`project-art project-art--${project.artwork}`}
      role="img"
      aria-label={project.artworkAlt}
    >
      <div className="project-art-grid" aria-hidden="true" />
      <div className="project-art-halo" aria-hidden="true" />
      <div className="project-art-core" aria-hidden="true">
        <span>{project.name.slice(0, 2).toUpperCase()}</span>
      </div>
      {labels[project.artwork].map((label, index) => (
        <div
          key={label}
          className={`project-art-node project-art-node--${index + 1}`}
          aria-hidden="true"
        >
          <i />
          {label}
        </div>
      ))}
      <div
        className="project-art-line project-art-line--a"
        aria-hidden="true"
      />
      <div
        className="project-art-line project-art-line--b"
        aria-hidden="true"
      />
      <div
        className="project-art-line project-art-line--c"
        aria-hidden="true"
      />
      <span
        className="project-data-packet project-data-packet--one"
        aria-hidden="true"
      />
      <span
        className="project-data-packet project-data-packet--two"
        aria-hidden="true"
      />
      <div className="project-art-index" aria-hidden="true">
        {project.categories[0]}
      </div>
    </div>
  );
}
