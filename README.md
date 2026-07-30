# Andrew Young Shon — Professional Portfolio

A production-ready, recruiter-focused portfolio for Andrew Young Shon, Senior
E-Commerce & Full-Stack Developer. The site presents verified commerce,
application, API, integration, performance, analytics, and production-delivery
experience without reducing the profile to theme development.

## Design approach

The layout is informed by a live editorial portfolio reference: a persistent
header, near-viewport hero, generous section rhythm, dense project cards, and a
two-column contact finish. The implementation is original—new code, a deep
navy/warm-sand palette, Manrope and Inter typography, an AS monogram, CSS
commerce-system artwork, floating capsule navigation, layered rounded surfaces,
and original motion details.
The private analysis is recorded in `docs/reference-ui-analysis.md`; no source
code or assets were copied.

## Technology

- Next.js 16 App Router and React 19
- Strict TypeScript
- Tailwind CSS 4 plus CSS custom properties
- `next/font`, `next/image`, and Lucide React
- Zod validation
- Vitest and React Testing Library
- Playwright and axe
- ESLint and Prettier

`package.json` intentionally overrides Next.js's transitive PostCSS and Sharp
versions with patched compatible releases. Revalidate and remove those
overrides when a future Next.js release includes equivalent or newer versions.

## Local setup

1. Install Node.js 20.19 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set only the values you need.
4. Run `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable                        | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Production origin used for canonical URLs and the sitemap. |
| `NEXT_PUBLIC_LINKEDIN_URL`      | Optional verified LinkedIn URL. Omit to hide the link.     |
| `NEXT_PUBLIC_GITHUB_URL`        | Optional verified GitHub URL. Omit to hide the link.       |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 measurement ID. Omit to load no analytics.    |
| `RESEND_API_KEY`                | Optional server-only Resend key.                           |
| `CONTACT_TO_EMAIL`              | Contact recipient; defaults to Andrew's verified email.    |
| `CONTACT_FROM_EMAIL`            | Verified Resend sender address.                            |

Never commit `.env.local` or secrets. Public variables are included in browser
bundles and must not contain secrets.

## Commands

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
- `npm run typecheck` — strict TypeScript
- `npm run format` / `npm run format:check` — Prettier
- `npm run test` / `npm run test:coverage` — unit tests
- `npm run test:e2e` — Playwright
- `npm run check` — formatting, lint, types, unit tests, and build

## Production build

Run:

```bash
npm ci
npm run check
npm run test:e2e
npm run start
```

The standard build does not require secrets. Without Resend configuration, the
contact form transparently opens the visitor's email client with a prepared
message instead of discarding the inquiry.

## Vercel deployment

1. Push the repository to a Git provider.
2. Import it into Vercel as a Next.js project.
3. Keep the default build command (`npm run build`) and output settings.
4. Configure `NEXT_PUBLIC_SITE_URL` with the final HTTPS origin.
5. Add optional social, analytics, and Resend values from `.env.example`.
6. Deploy, then rerun the route, form-fallback, metadata, keyboard, and
   responsive checks against the production URL.

## Résumé PDF

The current résumé route is `/resume`. To add an approved PDF, place it at:

`public/Andrew_Young_Shon_Resume.pdf`

Then update `resumeHref` in `src/content/site.ts` from `/resume` to
`/Andrew_Young_Shon_Resume.pdf`. Keep `/resume` as the accessible HTML overview.

## LinkedIn and GitHub

Add only verified profile URLs to `NEXT_PUBLIC_LINKEDIN_URL` and
`NEXT_PUBLIC_GITHUB_URL`. The UI and Person JSON-LD omit unconfigured profiles,
so no placeholder or invented social links are published.

## Project artwork

Every project currently has an original CSS diagram in
`src/components/project-artwork.tsx`. An approved replacement can be exported
as a 1600×1000 WebP to `public/images/projects/[slug].webp`; set the project's
`image` field in `src/content/projects.ts`. `next/image` will then provide
responsive sizing and lazy loading.

## Published projects

The homepage and route generator publish these six verified selected projects:
Kooks Headers & Exhaust, ButcherBox, Pilgrim, NUDIENT, Tiny Wood Stove, and
Universal Yums. Their order is defined in `src/content/projects.ts`.

All six published case studies represent verified projects in which Andrew
Young Shon participated.

When adding future work, use a unique lowercase slug and add it only after the
name, relationship, description, technologies, URL, and metrics are confirmed.
Run unit tests, the production build, sitemap checks, and route smoke tests.

## Contact form

The client and route handler share the Zod schema in `src/lib/contact.ts`. The
route adds a honeypot, byte-size limit, HTML escaping, and no-content logging.
With `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, the handler sends through Resend.
If either is missing or delivery fails, the response provides an encoded
`mailto:` fallback and the visitor is told to complete sending in their email
app.

## Credential architecture and editing

The homepage and résumé share one typed credential source:
`src/content/certifications.ts`. Exactly six selected credentials are publicly
displayed: three engineering credentials followed by three commerce systems and
measurement credentials.

Status is calculated server-side in UTC. Credentials without a verified
expiration date display `Earned`; dated credentials remain `Active` through
23:59:59.999 UTC on their expiration date and display `Expired` beginning the
following UTC day. Credentials remain public after expiration.

To update a credential:

1. Edit only its canonical record in `src/content/certifications.ts`.
2. Preserve ISO `YYYY-MM-DD` dates, credential ID case, and leading zeroes.
3. Add a `credentialUrl` only when it is a personal, public HTTPS verification
   link. An issuer information page is not a personal verification link.
4. Use `null` when no personal public URL is available.
5. Update exact-value and status tests, then run the full validation suite.

Only the six approved credentials in the canonical file may be published.
Never add account passwords, login details, recovery information, private
account data, invented verification URLs, or invented expiration dates.

## Project verification checklist

- Confirm Andrew personally contributed to the project.
- Confirm the project name, URL, role, and description.
- Separate Andrew's results from publicly reported company results.
- Confirm every technology and metric.
- Add a project to public content only after every required fact is confirmed.
- Confirm direct and related project routes expose the intended selection.

## Accessibility checklist

- Navigate all controls using keyboard only.
- Confirm visible focus and Escape behavior in the mobile menu.
- Test form labels, errors, loading state, and live-region feedback.
- Review headings and landmarks.
- Test reduced motion and 200% zoom.
- Check 320, 375, 390, 768, 1024, 1280, and 1440px with no horizontal overflow.
- Run Playwright/axe and perform a manual screen-reader spot check.

## Content-integrity checklist

- Do not invent personal details, profiles, dates, clients, metrics, education,
  awards, or credentials.
- Preserve verified email, phone, employment periods, and certification values.
- Never add a street address or private account information.
- Never log or add analytics parameters containing contact-form content.
- Keep incomplete project records out of public content until verified.
