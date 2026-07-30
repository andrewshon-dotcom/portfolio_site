import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CredentialCard } from "./credential-card";
import { Header } from "./header";
import { ProjectGrid } from "./project-grid";
import { getCertifications } from "@/content/certifications";
import { getPublishedProjects } from "@/content/projects";
import { site } from "@/content/site";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("primary navigation", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("exposes all navigation destinations and the downloadable resume", () => {
    render(<Header />);
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Expertise" })).toHaveAttribute(
      "href",
      "#expertise",
    );
    expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
      "href",
      "/Andrew_Young_Shon_Resume.pdf",
    );
    expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
      "download",
      "Andrew_Young_Shon_Resume.pdf",
    );
  });

  it("opens with explicit state and closes from the keyboard", () => {
    render(<Header />);
    const button = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: "Close navigation menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});

describe("project filters", () => {
  it("renders all six projects and restores them after filtering", () => {
    render(<ProjectGrid projects={getPublishedProjects()} />);
    const allButton = screen.getByRole("button", { name: "All Projects" });
    const shopifyButton = screen.getByRole("button", { name: "Shopify" });
    expect(allButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("project-card")).toHaveLength(6);
    for (const name of [
      "Kooks Headers & Exhaust",
      "ButcherBox",
      "Pilgrim",
      "NUDIENT",
      "Tiny Wood Stove",
      "Universal Yums",
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }

    fireEvent.click(shopifyButton);
    expect(shopifyButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("project-card")).toHaveLength(4);
    expect(screen.queryByText("Tiny Wood Stove")).not.toBeInTheDocument();

    fireEvent.click(allButton);
    expect(allButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("project-card")).toHaveLength(6);
  });

  it("publishes one case-study link for every project", () => {
    render(<ProjectGrid projects={getPublishedProjects()} />);
    expect(
      screen.getAllByRole("link", { name: "View Case Study" }),
    ).toHaveLength(6);
  });
});

describe("verified contact routes", () => {
  it("preserves email, phone, and resume links", () => {
    expect(site.emailHref).toBe("mailto:andrewyoungshon@gmail.com");
    expect(site.phoneHref).toBe("tel:+12394205034");
    expect(site.resumeHref).toBe("/resume");
    expect(site.resumePdfHref).toBe("/Andrew_Young_Shon_Resume.pdf");
  });
});

describe("credential cards", () => {
  it("renders exactly six approved credentials with five safe external links", () => {
    const credentials = getCertifications();
    render(
      <>
        {credentials.map((credential, index) => (
          <CredentialCard
            certification={credential}
            isEngineering={index < 3}
            key={credential.slug}
          />
        ))}
      </>,
    );

    expect(screen.getAllByTestId("credential-card")).toHaveLength(6);
    for (const credential of credentials) {
      expect(screen.getByText(credential.name)).toBeInTheDocument();
      expect(screen.getByText(credential.credentialId)).toBeInTheDocument();
    }

    const links = screen.getAllByRole("link", {
      name: /View Andrew Young Shon/,
    });
    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    const amazonCard = screen
      .getByText("Amazon Ads for Retail Advanced Certification")
      .closest("article");
    expect(amazonCard).not.toBeNull();
    expect(amazonCard?.querySelector("a")).toBeNull();
  });
});
