import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import { Header } from "@/components/header";
import { getSiteUrl, site } from "@/content/site";
import "./globals.css";

const display = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

const body = localFont({
  src: "../assets/fonts/inter-latin.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  keywords: [
    "Senior E-Commerce Developer",
    "Shopify Plus Developer",
    "Shopify Hydrogen Developer",
    "WooCommerce Developer",
    "WordPress Developer",
    "Full-Stack Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Commerce Integrations",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.seoTitle,
    description: site.seoDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.seoTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#10131f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        {children}
        <Analytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
