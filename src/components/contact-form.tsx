"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const input: ContactInput = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      projectRole: String(formData.get("projectRole") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };
    const validation = contactSchema.safeParse(input);
    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as keyof ContactInput;
        nextErrors[field] ??= issue.message;
      }
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Please review the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus("loading");
    setMessage("Sending your message…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        delivery?: "email" | "mailto";
        mailtoUrl?: string;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "The message could not be prepared.");
      }

      trackEvent("contact_form_success", {
        delivery_method: result.delivery || "email",
      });

      if (result.delivery === "mailto" && result.mailtoUrl) {
        setStatus("success");
        setMessage(
          "Your email app is opening with the message ready to send. Please send it there to complete delivery.",
        );
        window.location.assign(result.mailtoUrl);
        return;
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks — your message was sent successfully.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email Andrew directly.",
      );
    }
  }

  const errorFor = (field: keyof ContactInput) => errors[field];

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="form-heading">
        <p className="section-eyebrow">
          <span aria-hidden="true" />
          Start a conversation
        </p>
        <h3>Tell me what you’re building.</h3>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={
              errorFor("name") ? "contact-name-error" : undefined
            }
            required
          />
          {errorFor("name") ? (
            <span id="contact-name-error" className="field-error">
              {errorFor("name")}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={
              errorFor("email") ? "contact-email-error" : undefined
            }
            required
          />
          {errorFor("email") ? (
            <span id="contact-email-error" className="field-error">
              {errorFor("email")}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            aria-invalid={Boolean(errorFor("company"))}
            aria-describedby={
              errorFor("company") ? "contact-company-error" : undefined
            }
          />
          {errorFor("company") ? (
            <span id="contact-company-error" className="field-error">
              {errorFor("company")}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-role">Project or Role</label>
          <input
            id="contact-role"
            name="projectRole"
            aria-invalid={Boolean(errorFor("projectRole"))}
            aria-describedby={
              errorFor("projectRole") ? "contact-role-error" : undefined
            }
            required
          />
          {errorFor("projectRole") ? (
            <span id="contact-role-error" className="field-error">
              {errorFor("projectRole")}
            </span>
          ) : null}
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={
            errorFor("message") ? "contact-message-error" : undefined
          }
          required
        />
        {errorFor("message") ? (
          <span id="contact-message-error" className="field-error">
            {errorFor("message")}
          </span>
        ) : null}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        className="button button--primary button--submit"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
        <ArrowRight aria-hidden="true" />
      </button>
      <p
        className={`form-status form-status--${status}`}
        aria-live="polite"
        role={status === "error" ? "alert" : "status"}
      >
        {message}
      </p>
    </form>
  );
}
