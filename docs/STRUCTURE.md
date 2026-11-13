# Structure

[← Back to README](../README.md)

The site follows the **owners' site map**. Content and images come from **klh.edu.in**; nothing is invented. A section that needs data KLH has not supplied yet shows a short "will be published here soon" note with a link to admissions, never made-up text.

The whole structure (menu, page sections, programmes, footer, redirects) is defined once, in [src/site.js](../src/site.js).

## Navigation

- **Utility bar:** ERP (herp.klh.edu.in) · LMS · Examination · Academic Calendar. Student Login and Faculty/Staff Login are listed in `UTILITY` with no address yet, so they stay hidden until KLH gives their URLs.
- **Desktop (1280px and wider): main menu in the sticky header** ([src/components/MainNav.jsx](../src/components/MainNav.jsx), items in `DOCK` in `site.js`): Home · About KLH · Programmes · Why KLH · Learning Experience · Outcomes · Research & Innovation · Campus Life · Campuses · Admissions, then **Apply Now**.
  - Each item opens its page and the current page is underlined (campus pages count as Campuses, programme pages as Programmes). The header keeps the same height and underline while you scroll.
  - Arrow keys, Home and End move between items.
- **In-page navigation (768px and wider):** on pages with sections, a white bar floating at the bottom ([src/components/SectionBar.jsx](../src/components/SectionBar.jsx)) lists every section of the page in one row. The section in view is a filled navy block that glides between items as you scroll; clicking an item scrolls to it. The bar rises in once the first section is reached, and when the names don't fit it scrolls sideways with faded edges. Phones have the same as a picker under the header (`SectionPicker`).
- **Tablet (768–1279px):** the header's menu button opens a drawer with one accordion per `MENU` item, holding every link from the earlier klh.edu.in menu and utility bar under its new home (e.g. Board of Management under About › Governance, Code of Conduct under Admissions).
- **Phones:** the floating tab bar, menu sheet with search, and section picker in [src/components/phonenav.jsx](../src/components/phonenav.jsx).
- **Coming soon:** sections waiting for KLH data show a short note and stay in the menus.
- **Footer:** four columns (Explore KLH · Campuses · Admissions · Institution) below a newsletter strip.

## Routes

| URL | Renders |
| --- | --- |
| `/` | [src/pages/Home.jsx](../src/pages/Home.jsx), laid out like an admissions landing page (centred headings, one idea per band; sections in [src/components/landing.jsx](../src/components/landing.jsx)): video hero with industry-academy logos and four KLH fact tiles, then Highlights (banners + latest news, About KLH) · Campuses (`CampusMap`) · Programmes (school cards + "Choose your best fit" table) · Why KLH (8 pillar photo cards in a carousel + KLH's list) · Outcomes (placement card, recruiter logos, awards) · Learning Experience · Stories (student cards carousel, gallery) · Admissions (entrance tests + numbered steps) · FAQs (two columns), then the counsellor band |
| `/about`, `/why-klh`, `/learning`, `/outcomes`, `/research`, `/campus-life`, `/admissions` | [src/pages/sections.jsx](../src/pages/sections.jsx): section pages |
| `/programmes`, `/programmes/:slug` | [src/pages/programmes.jsx](../src/pages/programmes.jsx): programme index (a plain list by school, with level and campus filters kept in the address, e.g. `?level=PG&campus=Bachupally`) and detail |
| `/campuses` | [src/pages/programmes.jsx](../src/pages/programmes.jsx), in three sections (all in the bottom section bar): Places on each campus ([src/components/places.jsx](../src/components/places.jsx), `CAMPUS_PLACES` in data.js: six places per campus from its own klh.edu.in pages, side by side, each opening a photo viewer; under them each campus's Location block (the map klh.edu.in embeds for it, address, Google Maps directions) and a short Admissions block) · Programmes on each campus (`CampusMap`) · Admissions (`CampusAdmissions`: one separate panel per campus, side by side: its programmes, Apply, its fees & admissions page, an enquiry form with that campus preselected) |
| `/aziznagar`, `/bachupally` | [src/pages/Campus.jsx](../src/pages/Campus.jsx): campus detail |
| `/formerl`, `/students-placed`, `/transfer-of-admission`, `/maps-directions`, `/working-at-klh`, `/give-to-kl` | [src/pages/KlhPage.jsx](../src/pages/KlhPage.jsx): klh.edu.in pages kept on their own (`STANDALONE`) |
| Other klh.edu.in slugs and earlier URLs | Redirect to their new section, e.g. `/fee-structure` → `/admissions#fees` (`REDIRECTS`) |

## Templates

- **Section page:** built from `SectionPage`, `Section` and `LinkCard` in [src/components/sectionpage.jsx](../src/components/sectionpage.jsx).
  - Photo page header (`PAGE_PHOTO` in `data.js`).
  - Ends with the counsellor band (`CtaBand`).
  - Sticky section menu.
  - Numbered sections on alternating backgrounds.
  - A section's title comes from `SECTIONS` in `site.js`.
  - A section marked `'pending'` there shows the "coming soon" note (`ComingSoon`).
- **Imported content:** `ImportedBlocks` in [src/components/content.jsx](../src/components/content.jsx) renders a klh.edu.in page, or a slice of one (`from` / `until` heading).
  - Runs of profiles become people grids.
  - Runs of logos become logo walls.
  - Tables over 25 rows get search and paging.
- **Programme detail:** overview, campuses (linking to the department pages), eligibility (only where klh.edu.in publishes it), how to apply, related programmes, and an enquiry form prefilled with the programme.

## Pending owner data ("coming soon" sections)

| Page | Section |
| --- | --- |
| Home, Admissions | FAQs |
| Admissions | Important dates |
| Learning | Mentorship |
| Outcomes | Internships, Higher education, Alumni |

## Where content lives

| File | Contents |
| --- | --- |
| [src/site.js](../src/site.js) | Site map: utility links, menu, page sections, programmes, Why KLH pillars, footer, redirects |
| [src/data.js](../src/data.js) | Home and campus content: slides, counters, news, gallery, Center of Excellence, testimonials, partners, recruiters |
| [src/content/pages.json](../src/content/pages.json) | Every imported klh.edu.in page: title, banner and content blocks. Generated; see [ASSETS.md](ASSETS.md) |
| [src/content/campuses.json](../src/content/campuses.json) | Aziznagar and Bachupally "On Campus" text and programme cards |
| [src/formOptions.js](../src/formOptions.js) | Programmes, campuses and call times, shared by the forms and the server |
