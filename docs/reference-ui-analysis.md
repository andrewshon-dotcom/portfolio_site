# Reference UI analysis

## Inspection method

The live reference was visually inspected in a browser at 1440, 1280, 1024,
768, 390, and 375px. The review used screenshots and visible layout geometry only; no
source code, assets, CSS class names, or copied implementation values were
used.

## Observed structure

- The desktop header reads as an approximately 80px persistent band. Branding
  sits left, a centered capsule holds the primary navigation, and a compact
  high-contrast contact action anchors the right.
- The main content rail occupies roughly 84–86% of a 1440px viewport (about
  1216px in the observed layout) and remains centered.
- The hero fills nearly one desktop viewport. Its centered headline creates a
  strong editorial silhouette, while ambient color and particles sit behind
  the text rather than competing with it. Supporting copy is substantially
  narrower than the headline.
- Major sections use generous vertical space and clear title/intro pauses.
  Dense content follows those pauses, creating an alternating quiet/detailed
  rhythm.
- The about area introduces a narrow biography card beside a much wider
  experience timeline. Experience entries use connected markers and stacked,
  softly rounded dark panels.
- Featured work is a three-column desktop grid. At 1440px, observed cards were
  approximately 384px wide with about 32px between columns. Artwork occupies
  roughly the upper third; tags, description, and a bottom-aligned action
  establish consistent card density and a clear scan path.
- The contact conclusion is a two-column composition: summary/contact details
  on the left and form on the right.

## Responsive observations

- 1280px and 1024px preserve the large hero and desktop-style navigation, with
  content becoming progressively more vertical.
- 768px still presents an editorial hero while the project grid shifts to two
  approximately equal columns with a compact gutter.
- 390px and 375px replace desktop navigation with a menu trigger, stack actions
  and project cards, and turn the experience timeline into a single narrow rail.
- The reference uses long vertical sections on smaller screens rather than
  compressing content into horizontally scrolling regions.

## Structural patterns retained

- Persistent header, centered editorial hero, and prominent primary action.
- Broad centered content rail and generous section cadence.
- Strong hierarchy between section title, short introduction, and dense body.
- Three/two/one project-grid progression and stable card anatomy.
- About-to-experience storytelling followed by work, services, credentials,
  contact, and a compact footer.
- Rounded surfaces, small technology tags, restrained hover lift, and gentle
  entrance motion.

## Original identity changes

- A deep navy and warm-sand palette replaces the reference's near-black neon
  treatment.
- Manrope and Inter provide a geometric, engineering-oriented voice.
- An original AS monogram, ruled section labels, pill-shaped controls, layered
  glass surfaces, and softly colored illustration fields form Andrew's system.
- Project imagery is built from original CSS diagrams for commerce catalogs,
  subscription flows, checkout logic, localization, configuration, and data
  integration.
- Lavender, coral, mint, blue, and amber accents are used sparingly; there is
  no galaxy imagery, neon glow, copied logo, or downloaded project screenshot.

## Accessibility improvements

- A visible skip link and semantically labelled sticky header are included.
- The mobile menu has an accessible name, focus movement, Escape handling,
  body-scroll management, and practical touch targets.
- Active navigation and project filters expose state textually and through
  ARIA, not color alone.
- Focus indicators are deliberately high contrast.
- Animations are disabled when reduced motion is requested.
- Form feedback uses an ARIA live region; errors are associated with fields.
- Heading order, landmark structure, zoom reflow, and contrast are treated as
  first-class constraints.

## Intentional deviations

- The required home-page sequence adds metrics, services, and credentials that
  are not prominent in the reference.
- The hero uses a two-column engineering-system composition on wide screens to
  satisfy the approved brief while preserving the reference's scale and
  near-viewport height.
- Project cards use warm light surfaces for clearer differentiation and stronger
  reading contrast.
- Andrew's selected six-project portfolio is shown in a complete three-by-two
  desktop grid, adding depth beyond the smaller reference selection.
- Contact delivery is production-safe, validated, and transparent about email
  fallback behavior.
