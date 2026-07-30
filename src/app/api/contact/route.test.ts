// @vitest-environment node

import { afterEach, describe, expect, it } from "vitest";

import { POST } from "./route";

const originalApiKey = process.env.RESEND_API_KEY;
const originalFromEmail = process.env.CONTACT_FROM_EMAIL;

afterEach(() => {
  if (originalApiKey) process.env.RESEND_API_KEY = originalApiKey;
  else delete process.env.RESEND_API_KEY;

  if (originalFromEmail) process.env.CONTACT_FROM_EMAIL = originalFromEmail;
  else delete process.env.CONTACT_FROM_EMAIL;
});

describe("contact route", () => {
  it("returns a safe mailto fallback when Resend is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;

    const response = await POST(
      new Request("http://localhost/api/contact", {
        body: JSON.stringify({
          company: "",
          email: "visitor@example.com",
          message: "I would like to discuss a commerce platform rebuild.",
          name: "Portfolio Visitor",
          projectRole: "Commerce platform",
          website: "",
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      delivery: "mailto",
      mailtoUrl: expect.stringContaining("mailto:andrewyoungshon@gmail.com"),
    });
  });

  it("rejects requests above the configured payload limit", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        body: "{}",
        headers: {
          "content-length": "20000",
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );

    expect(response.status).toBe(413);
  });
});
