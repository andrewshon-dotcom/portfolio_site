import { describe, expect, it } from "vitest";
import {
  buildMailtoUrl,
  contactSchema,
  escapeHtml,
  MAX_CONTACT_REQUEST_BYTES,
} from "./contact";

const validMessage = {
  name: "Taylor Recruiter",
  email: "taylor@example.com",
  company: "Example Co",
  projectRole: "Senior commerce engineering role",
  message:
    "I would like to discuss a senior commerce engineering opportunity with you.",
  website: "",
};

describe("contact validation", () => {
  it("accepts a complete inquiry", () => {
    expect(contactSchema.safeParse(validMessage).success).toBe(true);
  });

  it("rejects invalid email and short messages", () => {
    const result = contactSchema.safeParse({
      ...validMessage,
      email: "invalid",
      message: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("creates a transparent mailto fallback", () => {
    const url = buildMailtoUrl(validMessage);
    expect(url).toMatch(/^mailto:andrewyoungshon@gmail\.com\?/);
    expect(decodeURIComponent(url)).toContain(validMessage.projectRole);
    expect(decodeURIComponent(url)).toContain(validMessage.message);
  });

  it("escapes email HTML content", () => {
    expect(escapeHtml(`<script>"test" & 'value'</script>`)).toBe(
      "&lt;script&gt;&quot;test&quot; &amp; &#039;value&#039;&lt;/script&gt;",
    );
  });

  it("uses a bounded request size", () => {
    expect(MAX_CONTACT_REQUEST_BYTES).toBeLessThanOrEqual(20_000);
  });
});
