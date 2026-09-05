# timmaundu.github.io — Tim Maundu

Personal brand website for **Tim Maundu** — AI & full-stack engineer in Nairobi, Kenya.

> Live at: **https://timmaundu.github.io/**

Built as a pure static site (HTML + CSS + vanilla JS — zero dependencies) so it runs
anywhere and on any static host. Dark, modern developer aesthetic.

## Contents

| Path | What it is |
|---|---|
| `index.html` | Landing page — hero, about, skills, projects, journey, contact |
| `projects.html` | AI projects, product directions and software case notes |
| `css/style.css` | Full design system (palette, components, responsive) |
| `js/main.js` | Scrollspy nav, typed-roles hero, reveals, progress bar |
| `assets/icons.svg` | Inline SVG icon sprite (no icon library needed) |
| `assets/og-image.png` | Social share card (1200×630) |
| `assets/favicon.png` / `apple-touch-icon.png` | Site icons |
| `404.html` | GitHub Pages friendly 404 |

## About the content

Tim is a Kenyan AI & full-stack engineer building practical AI systems: agents,
RAG workflows, SaaS products, cloud automation and model-evaluation loops. The
brand direction follows the public X positioning: useful AI, not noise; African
builders moving from AI consumption to AI deployment.

## Dev / local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Editing

- Colors & design tokens live at the top of `css/style.css`.
- Text content lives directly in the HTML files — searchable, no build step.
- Keep links **relative** (`css/style.css`, `assets/...`, `projects.html`) so the
  site works from the root of GitHub Pages.

## Deploy

Push to `main` of this repo — GitHub Pages serves it at the root profile URL.
