# Vedant Harish Bhavsar — AI / ML Engineer Portfolio

A premium, monochrome (black canvas, white ink), multi-page portfolio positioning
Vedant as an **AI Engineer · Data Scientist · ML Engineer** who learns in public.
Vanilla HTML/CSS/JS — **no build step**, deploys as-is to GitHub Pages.

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, about, data-science journey, current learning, skills, GitHub analytics, featured projects, build-in-public, roadmap, contact |
| `projects.html` | All projects + expandable case studies + project filters + Kaggle achievements + live GitHub repos |
| `lab.html` | AI Lab — experiments, notebooks, failed attempts, mathematics for AI, research interests |
| `logs.html` | Learning logs (weekly), currently studying, certificates, technical notes |

## Architecture
```
css/style.css      Design system (tokens, light/dark, components, heatmap, palette, terminal)
js/data.js         ⭐ SINGLE SOURCE OF TRUTH — edit this to change all content
js/core.js         Theme, nav, scroll reveal, animated counters, and every renderer
js/github.js       Live GitHub stats, language bars, contribution heatmap, latest repos
js/palette.js      Command palette (⌘K / Ctrl+K) — fuzzy nav across all pages
js/terminal.js     Interactive on-site terminal (button, or press `~`) — type `help`
```

## ✏️ How to update content
**Edit `js/data.js` only.** Every page renders itself from that file. It's fully
commented. Entries marked `// EDIT: example` are realistic placeholders — replace
or delete them. Nothing is presented as a fake accomplishment.

- **Add a project** → append to `DATA.projects`
- **Weekly learning log** → add an entry to the TOP of `DATA.logs`
- **Update skill progress** → tweak `pct` in `DATA.learning`
- **Kaggle achievements** → set your real tiers/medals in `DATA.kaggle`
  (Kaggle profiles are JS-rendered and can't be auto-scraped, so keep this in sync by hand)

## Features
- Light/dark theme toggle (persists via `localStorage`; press `Shift+D`)
- Command palette `⌘K`, interactive terminal `~`
- Live GitHub analytics + contribution heatmap (public API, no token/backend)
- Animated counters, typing hero roles, scroll-reveal, project filters, case studies
- SEO: per-page meta, Open Graph, canonical URLs, JSON-LD Person schema
- Fully responsive, respects `prefers-reduced-motion`

## Assets to add (optional)
Place these in an `assets/` folder:
- `assets/resume.pdf` — linked from the hero and terminal
- `assets/og-image.png` — social-share preview (1200×630)

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Or use VS Code Live Server.

## Deployment (GitHub Pages)
Pushing to `main` triggers `.github/workflows/static.yml`, which:
1. Injects the Formspree endpoint from repo secret `FORMSPREE_URL` into `js/core.js`
   (replaces the `__FORMSPREE_URL__` placeholder).
2. Deploys the whole repo to GitHub Pages.

Set the secret at **Settings → Secrets and variables → Actions → `FORMSPREE_URL`**
(e.g. `https://formspree.io/f/xxxx`). Without it, the contact form falls back to a
"email me directly" message.
```
