import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="status-page section-shell">
      <div className="content-rail">
        <p className="hero-eyebrow">404 · Page not found</p>
        <h1>This route isn’t part of the build.</h1>
        <p>
          The page may have moved, or this project may still be awaiting
          verification.
        </p>
        <Link className="button button--primary" href="/">
          <ArrowLeft aria-hidden="true" />
          Return home
        </Link>
      </div>
    </main>
  );
}
