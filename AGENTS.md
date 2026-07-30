# Andrew Young Shon Portfolio

## Purpose

This repository contains Andrew Young Shon's recruiter-focused professional
portfolio. It presents verified experience across e-commerce, full-stack
applications, APIs, integrations, performance, analytics, and production
delivery.

## Architecture

- Next.js App Router with strict TypeScript.
- Server Components are the default; Client Components are limited to
  navigation, filtering, analytics, and the contact form.
- Editable facts live in typed files under `src/content`.
- Reusable interface code lives under `src/components`.
- Contact input is validated by one shared Zod schema on the client and server.
- Project visuals are original, local CSS compositions. Approved replacement
  artwork belongs in `public/images/projects`.

## Coding conventions

- Keep components focused, semantic, and readable.
- Prefer native HTML behavior and small utilities over abstractions.
- Avoid `any`, deprecated APIs, unnecessary dependencies, and unbounded client
  state.
- Keep secrets server-only and never log contact-form bodies.
- Use safe attributes for external links.

## Content integrity

- Never invent personal information, social URLs, client relationships,
  employment periods, credentials, awards, education, or performance results.
- Only confirmed projects belong in public content. Do not add an incomplete
  project record or expose partially verified case-study claims.
- Publicly reported business results must not be presented as Andrew's personal
  results.
- Preserve the verified Absolute Web employment period as August 2024 through
  June 2026.
- Verified certification information, including the credential ID and URL,
  must not be modified.
- Preserve the exact verified data for the six approved public credentials.
- Do not add unapproved credentials or invent expiration dates or personal
  verification URLs.
- Never store credential-account passwords, login details, recovery
  information, or other account secrets.
- Keep credential copy focused on engineering, commerce systems, and technical
  measurement implementation.
- Do not publish a street address or other private information.

## Design requirements

- Retain the approved reference-driven page rhythm: persistent navigation,
  editorial hero, broad 1200–1320px content rail, generous sections, dense
  project cards, and a strong contact finish.
- Do not copy reference code, assets, branding, typography, or exact values.
- Preserve Andrew's navy, sand, lavender, coral, mint, and blue visual identity.
- Desktop uses a two-column hero and three-column work grid; tablet uses two
  project columns; mobile is one column with stacked actions.

## Accessibility

- Target WCAG 2.2 AA.
- Every interactive component requires keyboard, focus, touch-target, screen
  reader, reduced-motion, 200% zoom, and responsive review.
- Preserve semantic landmarks, heading order, visible focus, form labels,
  live-region feedback, and no-color-only states.
- No horizontal overflow is acceptable at supported viewports.

## Commands

- `npm run dev` — local development
- `npm run format` / `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test` / `npm run test:coverage`
- `npm run test:e2e`
- `npm run build`
- `npm run check` — formatting, lint, typecheck, unit tests, and build

## Completion checks

Before delivery, run `npm run format`, `npm run check`, and `npm run test:e2e`.
Review keyboard behavior, reduced motion, every internal action, and the 320,
375, 390, 768, 1024, 1280, and 1440px viewports. All six selected projects must
remain public, and all verified contact and certification values must remain
exact.
