# Portfolio Workflow

## Build Checklist

- [x] Hero
- [x] Projects
- [x] Philosophy interstitial
- [x] About
- [x] Skills Radial Chart
- [x] GitHub Activity Heatmap
- [x] Resume and Certs
- [x] Contact
- [x] Footer note

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | next/font/google |
| Deployment | Vercel |
| Data | config.js (single source of truth, no hardcoded content in components) |

---

## Maintenance Rule

Any time a component is added, removed, renamed, or repositioned, or any design/style/font/palette decision changes, update this file to match. WORKFLOW.md is the single source of truth for structure and conventions. Do not let it drift from the actual code.

---

## Design Rules

- Background dominant: beige (#F5F0E8) everywhere, no dark mode
- No gradients
- No em dashes anywhere in content or code comments
- Accent borders and UI details use taupe (#8B7355)
- All personal data lives in config.js; components read from it
- Page layout: `max-w-3xl mx-auto px-6 py-20`, sections separated by `space-y-32`
- Text selection: taupe background, background-color text (set globally in globals.css)

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#F5F0E8` | Page and card backgrounds |
| `secondary` | `#E8E0D0` | Chip fills, dividers |
| `ink` | `#1A1410` | Body text, headings |
| `taupe` | `#8B7355` | Muted text, borders, accents |

---

## Typography

| Role | Font | Weights loaded |
|---|---|---|
| Headings | Georgia (Tailwind `font-serif`) | system |
| Body / UI | DM Sans (Tailwind `font-sans`) | 300, 400, 500, 600 |

DM Sans is loaded via `next/font/google` and injected as `--font-sans`. `font-serif` resolves to Georgia (browser default serif). Only DM Sans is fetched at build time.

---

## Sections

### Hero (`components/Hero.jsx`)
Full name as a large DM Serif Display heading, tagline pulled from `config.tagline` (supports inline HTML via `dangerouslySetInnerHTML`). Below the tagline: a row of `font-sans text-sm text-taupe` links to `config.links.github` (GitHub), `config.links.linkedin` (LinkedIn), and `config.resume` (Resume), each opening in a new tab, hovering to `text-ink`, separated by `&middot;` dots. Includes a fixed corner widget (top-right) that shows the Spotify now-playing track (polled every `config.nowPlaying.refreshInterval` ms via `/api/nowplaying`) and the current San Diego weather (via `/api/weather`). The widget only renders after the first Spotify fetch resolves to avoid layout shift.

### Projects (`components/Projects.jsx`)
Horizontal scrolling carousel of project cards. Shows 2 cards per page on desktop (md+) and 1 per page on mobile. Left/right arrow buttons (taupe circle, 1px border, bg-background) advance by one page; arrows hidden when only one page exists. Dot indicators below the track (6px circles, taupe fill when active, secondary fill otherwise). Smooth 300ms ease-in-out CSS transform transition. `cardsPerView` detected via window resize listener (default 2 for SSR). Each card pulls from `config.projects` and shows: thumbnail image (if available), title, description, tech stack chips, GitHub link, and live site link (if available). Cards have a 1px taupe border, bg-background fill, and `h-full` so same-row cards match height. `'use client'` component.

### Philosophy interstitial (`components/Philosophy.jsx`)
A visual break between Projects and About, not linked in any nav. Renders `config.philosophy.quote` as a large DM Serif Display pull-quote with a 2px `#8B7355` left border and `pl-6` padding. No interactive elements. `aria-hidden="true"` since it is decorative.

### About (`components/About.jsx`)
Prose section pulling from `config.about.paragraph`. Below the paragraph, a "A few things about me" subsection heading (`font-sans text-sm font-medium text-ink`) followed by a stack of personal fact lines from `config.about.personalFacts`. Each fact is `font-sans text-sm text-taupe border-l border-taupe pl-4` with `space-y-3` between them. Static component, no client hooks.

### Skills Radial Chart (`components/SkillsRadial.jsx`)
Client component. Horizontal bar chart reading from `config.skills` (each entry has `axis` and a numeric `value` out of 10). Each row: axis label left-aligned in a fixed `w-36` column, a `bg-secondary` track bar with a `bg-taupe` fill proportional to `value/10`, and the numeric value right-aligned. Plain HTML/CSS via Tailwind, no Recharts. Below the bars: `learningNote` rendered in `font-sans text-xs italic text-taupe`.

### Resume and Certs (`components/ResumeAndCerts.jsx`)
Two-part section: a resume download link pointing to `config.resume`, and a list of certifications from `config.certs` (each has `title`, `issuer`, `date`, `url`). Stub not yet built.

### GitHub Activity Heatmap (`components/GitHubHeatmap.jsx`)
Client component. Fetches from `/api/github-heatmap` (GitHub GraphQL API, requires `GITHUB_TOKEN` classic token with `read:user` scope in `.env.local`, 1 hour ISR cache). GraphQL returns `contributionCalendar` which matches the GitHub dashboard exactly, including private contributions. Renders a 10x10 px cell grid grouped into 7-day week columns. Color scale: `#E8E0D0` (level 0, empty) through `#8B7355` (level 4, most active) in 4 even taupe steps. Month abbreviations appear in taupe at 9px above the first column of each new month. Native `title` tooltip shows date and count. Total count displayed below section heading in `font-sans text-sm` taupe. Section heading links to `config.links.github` in a new tab, hovering to `text-taupe`. Placed between Skills and Resume.

### Contact (`components/Contact.jsx`)
Contact form wired to Formspree using `config.contact.formspreeId`. Stub not yet built.

### Footer note (`app/page.js`)
A `<footer>` element below `<main>`, outside the `max-w-3xl` content constraint. Text: "Currently building · Last updated May 2026". Styles: `font-sans text-xs text-center pb-10`, color `#8B7355` via inline style. No component file; rendered inline in `page.js`.
