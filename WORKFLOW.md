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
- Page layout: `max-w-4xl mx-auto px-6 py-20`, sections separated by `space-y-32`
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
| Pull-quotes | Lora (Tailwind `font-quote`) | 400 italic |

DM Sans and Lora are both loaded via `next/font/google` and injected as `--font-sans` and `--font-quote` respectively. `font-serif` resolves to Georgia (browser default serif).

---

## Sections

### Hero (`components/Hero.jsx`)
Full name as a large serif heading, tagline pulled from `config.tagline` (supports inline HTML via `dangerouslySetInnerHTML`). Below the tagline: a row of `font-sans text-sm text-taupe` links — Email (`mailto:config.email`), GitHub (`config.links.github`), LinkedIn (`config.links.linkedin`), Resume (`config.resume`) — each hovering to `text-ink`, separated by `&middot;` dots. Includes a fixed corner widget (top-right, `w-64`) that shows: (1) Spotify now-playing track polled every `config.nowPlaying.refreshInterval` ms via `/api/nowplaying` with a green pulsing dot when live, (2) current San Diego weather via `/api/weather` showing temp in °F and condition, (3) a live clock ticking every second in Pacific Time (`America/Los_Angeles`). The widget only renders after the first Spotify fetch resolves to avoid layout shift.

### Projects (`components/Projects.jsx`)
Horizontal scrolling carousel of project cards. Desktop shows 2 cards simultaneously and advances by 1 card per click (`totalSlides = N - 1`); mobile shows 1 card at a time (`totalSlides = N`). Card width and container width measured via `useRef` + `ResizeObserver`-style `resize` listener; `currentIndex` resets to 0 on resize. Left/right arrow buttons (8×8 taupe circle, 1px border, bg-background) advance the slide; arrows are only rendered when `totalSlides > 1`. Dot indicators below the track (6px circles, taupe fill when active, secondary fill otherwise). Smooth 300ms ease-in-out CSS transform transition. Each card pulls from `config.projects` and shows: thumbnail image (if `project.thumbnail` exists, with `onError` hide), title, description, tech stack chips, and optional links — GitHub (`project.github`), Poster (`project.poster`), Live (`project.live`). Cards have a 1px taupe border, bg-background fill, and `h-full` so same-row cards match height. `'use client'` component.

### Philosophy interstitial (`components/Philosophy.jsx`)
A visual break between Projects and About, not linked in any nav. Outer `<div>` has `aria-hidden="true"` since it is decorative. Renders a "Philosophy" `<h2>` heading and `config.philosophy.quote` as a Lora italic pull-quote (`font-quote italic text-xl md:text-2xl text-ink`) inside a wrapper with a `2px solid #8B7355` left border, `pl-6` padding, and `py-2` vertical padding. No interactive elements.

### About (`components/About.jsx`)
Prose section pulling from `config.about.paragraph`. Below the paragraph, a "A few things about me" subsection heading (`font-sans text-sm font-medium text-ink`) followed by a stack of personal fact lines from `config.about.personalFacts`. Each fact is `font-sans text-sm text-taupe border-l border-taupe pl-4` with `space-y-3` between them. Static component, no client hooks.

### Skills Radial Chart (`components/SkillsRadial.jsx`)
Client component. Horizontal bar chart reading from `config.skills` (each entry has `axis`, a numeric `value` out of 10, and an optional `learning: true` flag). Each row: axis label left-aligned in a fixed `w-36` column (with a small "learning" pill badge if `skill.learning` is true — `text-[10px] text-taupe px-1.5 py-0.5 rounded-full bg-secondary border-taupe`), then a `flex-1 bg-secondary` track bar with a `bg-taupe` fill proportional to `value/10`. Plain HTML/CSS via Tailwind, no chart library. No `learningNote` field or text below the bars.

### Resume and Certs (`components/ResumeAndCerts.jsx`)
`'use client'` component. Section heading "Resume & Certs" with a "Download Resume" button (1px taupe border, hover `text-ink`) linking to `config.resume` in a new tab. Below: a horizontal carousel of cert cards identical in mechanics to the Projects carousel (same `useRef` container width measurement, `totalSlides = N - 1` on desktop, `N` on mobile, same arrow/dot controls). Each card (`config.certs`, each has `title`, `issuer`, `date`, `url`, `logo`) shows: issuer favicon logo (`h-10 w-10 rounded-sm`, with `onError` hide), cert title (`font-serif text-lg text-ink`), issuer and date (`font-sans text-[11px] text-taupe` separated by `&middot;`), and a "View Certificate" link opening in a new tab.

### GitHub Activity Heatmap (`components/GitHubHeatmap.jsx`)
Client component. Fetches from `/api/github-heatmap` (GitHub GraphQL API, requires `GITHUB_TOKEN` classic token with `read:user` scope in `.env.local`, 1 hour ISR cache). GraphQL returns `contributionCalendar` which matches the GitHub dashboard exactly, including private contributions. Renders 14×14 px cells with 2px gap, grouped into 7-day week columns, horizontally scrollable on overflow. Color scale has 5 levels: `#E8E0D0` (level 0, empty), `#D1C5B1`, `#BAA992`, `#A38E74`, `#8B7355` (level 4, most active). Empty padding cells (start of week alignment) render as `transparent`. Month abbreviations appear in taupe `fontSize: 12px` in a row above the grid, at the first column of each new month. Native `title` tooltip shows date and contribution count. Total contributions displayed above the grid in `font-sans text-sm` taupe. Shows a pulsing `bg-secondary` skeleton while loading; shows a short error message on fetch failure. Section heading "Activity" links to `config.links.github` in a new tab, hovering to `text-taupe`. A `font-sans text-sm text-taupe` subtitle "GitHub Commit Activity" appears below the heading. Placed between Skills and Resume.

### Contact (`components/Contact.jsx`)
`'use client'` component. Contact form POSTing JSON to `https://formspree.io/f/${config.contact.formspreeId}`. Fields: Name and Email side-by-side on desktop (`grid-cols-2`), then a Message textarea (5 rows, no resize). All inputs use `border: 1px solid #8B7355`, transparent background, `focus:border-ink` transition. Submit button labeled "Send" (or "Sending..." while submitting, disabled at 50% opacity). On success, the form is replaced by a `font-sans text-sm text-taupe` confirmation message. On error, an inline error note appears above the button. State machine: `idle | submitting | success | error`.

### Footer note (`app/page.js`)
A `<footer>` element below `<main>`, outside the `max-w-3xl` content constraint. Text: "Currently building · Last updated May 2026". Styles: `font-sans text-xs text-center pb-10`, color `#8B7355` via inline style. No component file; rendered inline in `page.js`.
