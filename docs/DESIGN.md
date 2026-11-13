# Design system

[← Back to README](../README.md)

**Goal:** klh.edu.in's structure and content, presented with the restraint of a premium technology brand. It should be official, light, clean and quietly interactive.

## Surfaces

- **White** is the base surface.
- **`surface-glow`** is a soft off-white gradient with a faint wash of the logo's blue and red. It's used for page headers, the counters, the enquiry band and the sidebar card.
- **The footer** is light grey (`#f5f6f8`).
- **Navy bands** (`surface-navy`) carry the big moments: the home hero, the outcome figures, the Center of Excellence and the counsellor call-to-action. Between them, white and `bg-surface` alternate. No grid patterns.

## Page-building kit ([src/components/kit.jsx](../src/components/kit.jsx))

| Block | What it is |
| --- | --- |
| `Heading` | The site's section head (mono eyebrow with a drawing rule, display title with an optional `hl` highlighted word, lead, actions), left or centred |
| `StatBand` | Navy band of large count-up figures in a bordered grid |
| `PhotoCards` | Thin-bordered cards led by a KLH photograph, with a small numbered eyebrow, title and text; a swipeable row on phones |
| `CampusMap` | Aziznagar and Bachupally drawn exactly alike (alphabetical): two photo panels of the same size, both toned navy (full colour on hover), either side of a KL University Hyderabad spine; below, a route map where each campus is a rail and each programme a stop on the rail of every campus that teaches it. No counts or rankings between the two. Used on Home, Programmes and Campuses |
| `SchoolColumns` | The three schools side by side under KLH photographs; each programme links its page and its department on each campus |
| `Steps` | Numbered steps in a bordered grid (as on the Admissions page) |
| `Faq` | Accordion; with no published answers it says so and offers the help desk |
| `CtaBand` | "Talk to an admissions counsellor": call back, Apply Now, phone |

**Page headers:** inner pages open on a KLH campus photo under a navy shade (`PageHeader` with `photo`, set per page in `PAGE_PHOTO` in `data.js`); the Campuses page shows both campuses' photos side by side. Posters and banners with text are never used there, since they would be cropped.

**Two campuses, as equals:** wherever both appear they use the same component and fields, in alphabetical order, with neither styled as the main one.

Cards use thin `line` borders, generous radius (10–20px) and long, soft shadows only where something should lift (forms, counters, floating labels).

## Colour (`src/index.css`)

| Token | Hex | Use |
| --- | --- | --- |
| `brand` | `#a8101a` | KLH red (sampled from the logo): primary buttons, active indicators, rule lines |
| `navy` | `#0a1a33` | Headings accents, counters, selected chips |
| `blue` | `#1a6aa8` | Logo blue: links, eyebrows, focus rings |
| `ink` / `ink-2` / `muted` | `#0e1726` / `#3a4556` / `#667085` | Text |
| `line`, `surface` | `#e3e8ef`, `#f5f7fa` | Borders, quiet backgrounds |

## Type

- **Poppins** (KLH's display font) is used for headings: `display-1` is 34/44/58px and `display-2` is 28/36/42px.
- **Inter** (KLH's body font) is used for text.
- **JetBrains Mono** is used for small uppercase metadata (`.meta`), which gives the modern, technical note.

## Motion (all CSS transform and opacity; off for `prefers-reduced-motion`)

| Effect | Where |
| --- | --- |
| Scroll reveal (fade and 18px lift) | Section headings and cards (`Reveal`) |
| Drawing rule line | Section-heading eyebrows |
| Count-up | Verified statistics only (`CountUp`) |
| Image zoom on hover | Photo cards (`Img zoom`) |
| Parallax | Inner-page header banners (`Parallax`) |
| Reading progress line | Inner pages (`ReadingProgress`) |
| Animated underline | Footer and utility links (`.u-link`) |
| Underline under the current page | Header menu (`MainNav`) |
| Bar rises in at the first section; navy block glides to the section in view | Floating section bar (`SectionBar`) |
| Campus film loops behind the headline (slow push-in, dip to dark at the loop, pause button, off when hidden or with reduced motion); words rise in | Home hero (`Hero`) |
| Drawer slide | Tablet menu |
| Slider | Home and campus banners: crossfade, dots, hover arrows, pause, swipe |
| Expand and compare | Programme explorer |

## Rules

- Lead with KLH's own photographs, not icon tiles or decorative numbers; keep to the site's labels, highlighter and thin-bordered cards.

- Logo: always render it with `<Logo />`, at its native ratio, never recoloured.
- Images that carry text (banners, posters, programme tables) are never cropped.
- Add motion only where it explains or guides. Avoid autoplay without a pause control, scroll-jacking and decorative floating shapes.
