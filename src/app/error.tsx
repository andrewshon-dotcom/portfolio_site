"use client";

import { RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="status-page section-shell">
      <div className="content-rail">
        <p className="hero-eyebrow">Something went wrong</p>
        <h1>The page couldn’t finish loading.</h1>
        <p>Try the page again. No form content has been stored or logged.</p>
        <button
          className="button button--primary"
          type="button"
          onClick={reset}
        >
          <RotateCcw aria-hidden="true" />
          Try again
        </button>
      </div>
    </main>
  );
}
