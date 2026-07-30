import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./site";

const originalEnvironment = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_URL: process.env.VERCEL_URL,
};

afterEach(() => {
  for (const [name, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
  }
});

describe("getSiteUrl", () => {
  it("prefers an explicitly configured public URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "production.vercel.app";

    expect(getSiteUrl().toString()).toBe("https://portfolio.example/");
  });

  it("uses the Vercel production domain without publishing localhost URLs", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "portfolio.vercel.app";

    expect(getSiteUrl().toString()).toBe("https://portfolio.vercel.app/");
  });

  it("falls back to the deployment URL when no production domain is exposed", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    process.env.VERCEL_URL = "portfolio-preview.vercel.app";

    expect(getSiteUrl().toString()).toBe(
      "https://portfolio-preview.vercel.app/",
    );
  });

  it("uses localhost only when no deployment configuration is available", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;

    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
  });
});
