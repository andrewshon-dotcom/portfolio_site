"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const scrollCorrectionRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete document.documentElement.dataset.hydrated;
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = navigation.map(({ href }) => href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      if (scrollCorrectionRef.current !== null) {
        window.clearInterval(scrollCorrectionRef.current);
      }
    },
    [],
  );

  const resolveHref = (href: string) => (pathname === "/" ? href : `/${href}`);
  const closeMenu = () => setIsOpen(false);
  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname !== "/") return;
    const section = document.getElementById(href.slice(1));
    if (!section) return;
    event.preventDefault();
    window.history.pushState(null, "", href);
    setActiveSection(href.slice(1));
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scrollToSection = (behavior: ScrollBehavior) => {
      section.scrollIntoView({
        behavior,
        block: "start",
      });
    };
    if (scrollCorrectionRef.current !== null) {
      window.clearInterval(scrollCorrectionRef.current);
    }
    window.requestAnimationFrame(() =>
      scrollToSection(prefersReducedMotion ? "auto" : "smooth"),
    );

    let attempts = 0;
    let stablePasses = 0;
    scrollCorrectionRef.current = window.setInterval(() => {
      scrollToSection("auto");
      attempts += 1;
      stablePasses =
        section.getBoundingClientRect().top < 140 ? stablePasses + 1 : 0;

      if ((attempts >= 6 && stablePasses >= 3) || attempts >= 12) {
        if (scrollCorrectionRef.current !== null) {
          window.clearInterval(scrollCorrectionRef.current);
          scrollCorrectionRef.current = null;
        }
      }
    }, 220);
  };

  return (
    <header
      className={[
        "site-header",
        isScrolled || isOpen ? "site-header--solid" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="header-inner">
        <Link className="brand" href="/">
          <span className="monogram">
            <span>A</span>
            <span>S</span>
          </span>
          <span className="brand-name">{site.shortName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <Link
                key={item.href}
                href={resolveHref(item.href)}
                onClick={(event) => navigateToSection(event, item.href)}
                aria-current={
                  pathname === "/" && activeSection === id
                    ? "location"
                    : undefined
                }
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link
          className="button button--light header-cta"
          href={site.resumePdfHref}
          download="Andrew_Young_Shon_Resume.pdf"
          data-analytics="resume_download"
          data-analytics-label="header"
        >
          Résumé
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={["mobile-nav", isOpen ? "mobile-nav--open" : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="mobile-nav-inner">
          {navigation.map((item, index) => (
            <Link
              ref={index === 0 ? firstMobileLinkRef : undefined}
              key={item.href}
              href={resolveHref(item.href)}
              onClick={(event) => {
                navigateToSection(event, item.href);
                closeMenu();
              }}
              tabIndex={isOpen ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link
            className="button button--primary"
            href={site.resumePdfHref}
            download="Andrew_Young_Shon_Resume.pdf"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
            data-analytics="resume_download"
            data-analytics-label="mobile_menu"
          >
            Download Résumé
          </Link>
        </div>
      </nav>
    </header>
  );
}
