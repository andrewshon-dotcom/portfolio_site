"use client";

export type AnalyticsEvent =
  | "resume_download"
  | "project_click"
  | "live_site_click"
  | "credential_click"
  | "email_cta"
  | "phone_cta"
  | "project_filter"
  | "contact_form_success";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  parameters?: Record<string, string>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", event, parameters);
}
