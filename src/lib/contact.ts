import { z } from "zod";

export const MAX_CONTACT_REQUEST_BYTES = 18_000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(120, "Company must be 120 characters or fewer.")
    .optional()
    .default(""),
  projectRole: z
    .string()
    .trim()
    .min(2, "Please describe the project or role.")
    .max(160, "Project or role must be 160 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Please include at least 20 characters.")
    .max(4_000, "Message must be 4,000 characters or fewer."),
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactMessage = z.output<typeof contactSchema>;

export function buildMailtoUrl(
  message: Pick<
    ContactMessage,
    "name" | "email" | "company" | "projectRole" | "message"
  >,
  recipient = "andrewyoungshon@gmail.com",
): string {
  const subject = `Portfolio inquiry: ${message.projectRole}`;
  const body = [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Company: ${message.company || "Not provided"}`,
    "",
    message.message,
  ].join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
