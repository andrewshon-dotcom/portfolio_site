"use client";

import Script from "next/script";
import { useEffect } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type AnalyticsProps = {
  measurementId?: string;
};

export function Analytics({ measurementId }: AnalyticsProps) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tracked = target.closest<HTMLElement>("[data-analytics]");
      const eventName = tracked?.dataset.analytics as
        AnalyticsEvent | undefined;
      if (!tracked || !eventName) return;
      const label = tracked.dataset.analyticsLabel;
      trackEvent(eventName, label ? { item_label: label } : undefined);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
