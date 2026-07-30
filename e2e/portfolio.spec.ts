import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const publishedProjects = [
  { name: "Kooks Headers & Exhaust", slug: "kooks-headers" },
  { name: "ButcherBox", slug: "butcherbox-headless" },
  { name: "Pilgrim", slug: "pilgrim-checkout" },
  { name: "NUDIENT", slug: "nudient-global-commerce" },
  { name: "Tiny Wood Stove", slug: "tiny-wood-stove" },
  { name: "Universal Yums", slug: "universal-yums" },
];

const publishedCredentials = [
  { name: "Software Engineer", credentialId: "3EF4CEF0A56C" },
  {
    name: "Frontend Developer (React)",
    credentialId: "4295EEBA4D23",
  },
  { name: "SQL (Advanced)", credentialId: "8C268E1D800F" },
  {
    name: "Google Analytics Certification",
    credentialId: "189927726",
  },
  {
    name: "Google Ads Measurement Certification",
    credentialId: "190038110",
  },
  {
    name: "Amazon Ads for Retail Advanced Certification",
    credentialId: "376aa98a-ff4e-47ff-b55b-fdf32c3d2c74",
  },
] as const;

async function waitForHydration(page: Page) {
  await page.locator('html[data-hydrated="true"]').waitFor();
}

test.describe("portfolio", () => {
  test("renders all six published projects and verified contact paths", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Building Scalable Commerce Platforms, Web Applications, and Integrations",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Portrait of Andrew Young Shon" }),
    ).toBeVisible();
    await expect(page.locator(".hero-title-character")).toHaveCount(16);
    await expect(page.locator(".ambient-wordmark__group")).toHaveCount(3);
    await expect(page.locator(".ambient-wordmark__label")).toHaveCount(0);
    expect(
      await page.locator(".ambient-wordmark__dot").count(),
    ).toBeGreaterThan(150);
    await expect(page.locator(".ambient-wordmark")).toHaveCSS(
      "position",
      "relative",
    );
    const wordmarkPlacement = await page
      .locator(".ambient-wordmark")
      .evaluate((element) => {
        const bounds = element.getBoundingClientRect();

        return {
          centerOffset: Math.abs(
            bounds.left + bounds.width / 2 - innerWidth / 2,
          ),
          followsHeroGrid:
            element.previousElementSibling?.classList.contains("hero-grid") ??
            false,
          widthRatio: bounds.width / innerWidth,
        };
      });
    expect(wordmarkPlacement.centerOffset).toBeLessThanOrEqual(2);
    expect(wordmarkPlacement.followsHeroGrid).toBe(true);
    expect(wordmarkPlacement.widthRatio).toBeLessThanOrEqual(0.75);
    const wordFootprint = await page
      .locator(".ambient-wordmark__group")
      .first()
      .locator(".ambient-wordmark__dot")
      .evaluateAll((dots) => {
        const positions = dots.map((dot) =>
          Number.parseFloat(
            (dot as HTMLElement).style.getPropertyValue("--word-x"),
          ),
        );

        return Math.max(...positions) - Math.min(...positions);
      });
    expect(wordFootprint).toBeCloseTo(85, 1);
    await expect(page.locator(".about-panel")).toHaveCount(4);
    await expect(page.locator(".about-impact-grid > div")).toHaveCount(6);
    await expect(page.getByTestId("credential-card")).toHaveCount(6);
    await expect(page.locator(".certification-card h3")).toHaveText(
      publishedCredentials.map(({ name }) => name),
    );
    for (const credential of publishedCredentials) {
      await expect(
        page.getByText(credential.credentialId, { exact: true }),
      ).toBeVisible();
    }

    const credentialLinks = page.locator("#credentials a", {
      hasText: "View Credential",
    });
    await expect(credentialLinks).toHaveCount(5);
    for (const link of await credentialLinks.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /^https:\/\//);
    }
    const amazonCard = page
      .getByTestId("credential-card")
      .filter({ hasText: "Amazon Ads for Retail Advanced Certification" });
    await expect(amazonCard).toHaveCount(1);
    await expect(amazonCard.getByRole("link")).toHaveCount(0);

    const firstCredentialLink = credentialLinks.first();
    await firstCredentialLink.focus();
    const credentialFocus = await firstCredentialLink.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
      };
    });
    expect(credentialFocus.outlineStyle).not.toBe("none");
    expect(credentialFocus.outlineWidth).not.toBe("0px");

    await expect(page.getByTestId("project-card")).toHaveCount(6);
    await expect(page.locator(".project-art--image img")).toHaveCount(6);
    for (const project of publishedProjects) {
      await expect(page.getByText(project.name, { exact: true })).toBeVisible();
      await expect(page.locator(`a[href="/work/${project.slug}"]`)).toHaveCount(
        1,
      );
    }
    await expect(
      page.getByRole("link", {
        name: "View Andrew Young Shon’s Google Analytics Certification",
      }),
    ).toHaveAttribute(
      "href",
      "https://skillshop.credential.net/8f1fb4e7-1b89-429b-ae7d-337b586f36a5#acc.lbT2te0X",
    );
    await expect(
      page.getByRole("link", { name: "andrewyoungshon@gmail.com" }).first(),
    ).toHaveAttribute("href", "mailto:andrewyoungshon@gmail.com");
    await expect(
      page.getByRole("link", { name: "+1 (239) 420-5034" }).first(),
    ).toHaveAttribute("href", "tel:+12394205034");

    const absoluteWeb = page
      .getByRole("article")
      .filter({ hasText: "Absolute Web" })
      .first();
    await expect(absoluteWeb).toContainText("August 2024 – June 2026");
    await expect(absoluteWeb).not.toContainText("July 2026");
    await expect(absoluteWeb).not.toContainText(/Present|Current|Ongoing/i);
    await expect(page.getByText(/Draft|Unverified/i)).toHaveCount(0);

    const lightSectionBackgrounds = await page.evaluate(() => ({
      about: getComputedStyle(document.querySelector("#about")!)
        .backgroundImage,
      credentials: getComputedStyle(document.querySelector("#credentials")!)
        .backgroundImage,
    }));
    expect(lightSectionBackgrounds.about).not.toBe(
      lightSectionBackgrounds.credentials,
    );
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test("mobile menu is keyboard accessible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await waitForHydration(page);
    const menuButton = page.getByRole("button", {
      name: "Open navigation menu",
    });
    await menuButton.click();
    await expect(
      page.getByRole("button", { name: "Close navigation menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  test("primary navigation scrolls to the selected section", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect
      .poll(() =>
        page
          .locator("#work")
          .evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeLessThan(140);
  });

  test("every filter has the correct subset and All Projects restores six", async ({
    page,
  }) => {
    await page.goto("/#work");
    await waitForHydration(page);
    const expectedCounts: Record<string, number> = {
      Shopify: 4,
      "Headless Commerce": 1,
      "Checkout Extensibility": 1,
      "Global Commerce": 1,
      WooCommerce: 2,
      "Full-Stack": 1,
      "APIs & Integrations": 2,
    };

    await expect(page.getByTestId("project-card")).toHaveCount(6);
    for (const [filter, count] of Object.entries(expectedCounts)) {
      const button = page.getByRole("button", { name: filter });
      await button.focus();
      await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByTestId("project-card")).toHaveCount(count);
    }

    const allProjects = page.getByRole("button", { name: "All Projects" });
    await allProjects.click();
    await expect(page.getByTestId("project-card")).toHaveCount(6);
    await expect(page.locator(".project-count")).toContainText(
      /06\s*selected systems/,
    );
  });

  test("contact form validates locally", async ({ page }) => {
    await page.goto("/#contact");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(
      page.getByText("Please review the highlighted fields."),
    ).toBeVisible();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
  });

  test("resume and all six case-study routes return successfully", async ({
    page,
    request,
  }) => {
    await page.goto("/resume");
    await expect(
      page.getByRole("heading", { level: 1, name: "Andrew Young Shon" }),
    ).toBeVisible();
    await expect(
      page.getByText(/Add public\/Andrew_Young_Shon_Resume\.pdf/i),
    ).toHaveCount(0);
    const resumePdf = await request.get("/Andrew_Young_Shon_Resume.pdf");
    expect(resumePdf.ok()).toBe(true);
    expect(resumePdf.headers()["content-type"]).toContain("application/pdf");
    const absoluteWeb = page
      .getByRole("article")
      .filter({ hasText: "Absolute Web" });
    await expect(absoluteWeb).toContainText("August 2024 – June 2026");
    await expect(absoluteWeb).not.toContainText("July 2026");
    await expect(absoluteWeb).not.toContainText(/Present|Current|Ongoing/i);

    await expect(
      page.getByRole("heading", { level: 2, name: "Certifications" }),
    ).toBeVisible();
    await expect(page.locator(".resume-certification-list > li")).toHaveCount(
      6,
    );
    await expect(page.locator(".resume-certification-list h3")).toHaveText(
      publishedCredentials.map(
        ({ name }) =>
          new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} —`),
      ),
    );
    for (const credential of publishedCredentials) {
      await expect(
        page.getByText(
          new RegExp(`Credential ID:\\s*${credential.credentialId}`),
        ),
      ).toBeVisible();
    }
    const resumeCredentialLinks = page.locator(".resume-certification-list a", {
      hasText: "View credential",
    });
    await expect(resumeCredentialLinks).toHaveCount(5);
    const resumeAmazon = page
      .locator(".resume-certification-list > li")
      .filter({ hasText: "Amazon Ads for Retail Advanced Certification" });
    await expect(resumeAmazon.getByRole("link")).toHaveCount(0);

    for (const project of publishedProjects) {
      const response = await page.goto(`/work/${project.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByText(project.name, { exact: true })).toBeVisible();
      await expect(
        page.getByText("System architecture", { exact: true }),
      ).toBeVisible();
    }
  });

  test("publishes no development-only or placeholder copy", async ({
    page,
  }) => {
    const routes = [
      "/",
      "/resume",
      ...publishedProjects.map(({ slug }) => `/work/${slug}`),
    ];
    const forbiddenCopy = [
      /Add public\/Andrew_Young_Shon_Resume\.pdf/i,
      /\b(?:TODO|FIXME|TBD|WIP)\b/,
      /Lorem ipsum/i,
      /\{\{[^}]+\}\}/,
      /\b(?:undefined|\[object Object\])\b/,
    ];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      const visibleCopy = await page.locator("body").innerText();

      for (const pattern of forbiddenCopy) {
        expect(visibleCopy, `${route} contains ${pattern}`).not.toMatch(
          pattern,
        );
      }
    }
  });

  test("sitemap contains every published case study", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    const sitemap = await response.text();
    for (const project of publishedProjects) {
      expect(sitemap).toContain(`/work/${project.slug}`);
    }
  });

  test("has no serious or critical accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter(({ impact }) =>
        ["serious", "critical"].includes(impact || ""),
      ),
    ).toEqual([]);
  });

  test("project-card keyboard focus is visually apparent", async ({ page }) => {
    await page.goto("/#work");
    const caseStudy = page
      .getByRole("link", { name: "View Case Study" })
      .first();
    await caseStudy.focus();
    const focusStyle = await caseStudy.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
      };
    });
    expect(focusStyle.outlineStyle).not.toBe("none");
    expect(focusStyle.outlineWidth).not.toBe("0px");
  });

  test("mobile project grid renders all six cards in one column", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#work");
    await expect(page.getByTestId("project-card")).toHaveCount(6);
    const columns = await page
      .locator(".project-grid")
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
    expect(columns.trim().split(/\s+/)).toHaveLength(1);
  });

  for (const { width, height } of [
    { width: 320, height: 700 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 900 },
    { width: 1280, height: 900 },
    { width: 1440, height: 1000 },
  ]) {
    test(`does not overflow horizontally at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      const sizes = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
    });
  }

  test("content typography keeps readable minimum sizes", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const homepageSizes = await page.evaluate(() => {
      const fontSize = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing typography target: ${selector}`);
        return Number.parseFloat(getComputedStyle(element).fontSize);
      };

      return {
        aboutCapability: fontSize(".about-capability-list li"),
        aboutCopy: fontSize(".about-panel__copy p"),
        certificationDescription: fontSize(".certification-description"),
        contactDetail: fontSize(".contact-details > a"),
        contactFormLabel: fontSize(".contact-form label"),
        experienceBody: fontSize(
          ".experience-card > p:not(.experience-company)",
        ),
        footerContact: fontSize(".footer-contact"),
        heroDescription: fontSize(".hero-description"),
        heroNote: fontSize(".hero-notes p"),
        projectSummary: fontSize(".project-card-body > p"),
        sectionIntro: fontSize(".section-intro"),
      };
    });

    expect(homepageSizes.heroDescription).toBeGreaterThanOrEqual(20);
    expect(homepageSizes.heroNote).toBeGreaterThanOrEqual(16);
    expect(homepageSizes.sectionIntro).toBeGreaterThanOrEqual(19);
    expect(homepageSizes.aboutCopy).toBeGreaterThanOrEqual(18);
    expect(homepageSizes.aboutCapability).toBeGreaterThanOrEqual(16);
    expect(homepageSizes.experienceBody).toBeGreaterThanOrEqual(18);
    expect(homepageSizes.projectSummary).toBeGreaterThanOrEqual(17);
    expect(homepageSizes.certificationDescription).toBeGreaterThanOrEqual(17);
    expect(homepageSizes.contactDetail).toBeGreaterThanOrEqual(18);
    expect(homepageSizes.contactFormLabel).toBeGreaterThanOrEqual(16);
    expect(homepageSizes.footerContact).toBeGreaterThanOrEqual(16);

    const portraitLayout = await page
      .locator(".hero-portrait-card")
      .evaluate((element) => {
        const cardStyle = getComputedStyle(element);
        const imageStyle = getComputedStyle(element.querySelector("img")!);
        const bounds = element.getBoundingClientRect();

        return {
          height: bounds.height,
          imageFit: imageStyle.objectFit,
          transform: cardStyle.transform,
          width: bounds.width,
        };
      });
    expect(portraitLayout.transform).toBe("none");
    expect(portraitLayout.imageFit).toBe("contain");
    expect(portraitLayout.width).toBeGreaterThanOrEqual(540);
    expect(portraitLayout.height).toBeGreaterThan(portraitLayout.width);

    await page.goto("/resume");
    const resumeSizes = await page.evaluate(() => {
      const fontSize = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing typography target: ${selector}`);
        return Number.parseFloat(getComputedStyle(element).fontSize);
      };

      return {
        detail: fontSize(".resume-layout aside p"),
        experienceBody: fontSize(".resume-experience article > p"),
        summary: fontSize(".resume-summary"),
      };
    });

    expect(resumeSizes.detail).toBeGreaterThanOrEqual(15);
    expect(resumeSizes.experienceBody).toBeGreaterThanOrEqual(16);
    expect(resumeSizes.summary).toBeGreaterThanOrEqual(20);

    await page.goto("/work/kooks-headers");
    const caseStudySizes = await page.evaluate(() => {
      const fontSize = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing typography target: ${selector}`);
        return Number.parseFloat(getComputedStyle(element).fontSize);
      };

      return {
        body: fontSize(".case-prose > p:not(.case-step)"),
        heroTitle: fontSize(".case-hero h1"),
        summary: fontSize(".case-summary"),
      };
    });

    expect(caseStudySizes.body).toBeGreaterThanOrEqual(19);
    expect(caseStudySizes.heroTitle).toBeLessThanOrEqual(72);
    expect(caseStudySizes.summary).toBeGreaterThanOrEqual(19);
  });

  test("motion never blocks content and respects reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#work");
    await expect(page.getByTestId("project-card")).toHaveCount(6);
    const motionStyle = await page
      .getByTestId("project-card")
      .first()
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          animationDuration: style.animationDuration,
          opacity: style.opacity,
          transform: style.transform,
          transitionDuration: style.transitionDuration,
        };
      });
    expect(motionStyle.opacity).toBe("1");
    expect(motionStyle.transform).toBe("none");
    expect(["0s", "0.00001s", "1e-05s"]).toContain(
      motionStyle.transitionDuration,
    );

    const ambientStyle = await page
      .locator(".ambient-field__particle")
      .first()
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          animationName: style.animationName,
          transform: style.transform,
        };
      });
    expect(ambientStyle.animationName).toBe("none");
    expect(ambientStyle.transform).toBe("none");

    const headlineStyle = await page
      .locator(".hero-title-character")
      .first()
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          animationName: style.animationName,
          opacity: style.opacity,
          transform: style.transform,
        };
      });
    expect(headlineStyle.animationName).toBe("none");
    expect(headlineStyle.opacity).toBe("1");
    expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(
      headlineStyle.transform,
    );

    const particleWordStyle = await page
      .locator(".ambient-wordmark__group")
      .first()
      .evaluate((element) => {
        const dot = element.querySelector(".ambient-wordmark__dot");
        const groupStyle = getComputedStyle(element);
        const dotStyle = getComputedStyle(dot!);

        return {
          dotAnimationName: dotStyle.animationName,
          dotTransform: dotStyle.transform,
          groupAnimationName: groupStyle.animationName,
          groupOpacity: groupStyle.opacity,
        };
      });
    expect(particleWordStyle.dotAnimationName).toBe("none");
    expect(particleWordStyle.dotTransform).toBe("none");
    expect(particleWordStyle.groupAnimationName).toBe("none");
    expect(particleWordStyle.groupOpacity).toBe("0.74");
  });
});
