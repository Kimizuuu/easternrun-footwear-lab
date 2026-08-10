# EasternRun — Independent Global Running Shoe Database & Review Lab

[Live site →](https://easternrun.fit) | [Vercel deployment →](https://easternrun-footwear-lab.vercel.app)

---

## Overview

EasternRun is an independent footwear database and technical review lab. It provides transparent specs, lab energy return disclosures, plate stiffness ratings, and runner reviews for **105 global performance running shoes** across 18 brands — with a focus on Chinese performance footwear (Li-Ning, ANTA, Xtep, 361°, Qiaodan) alongside global reference models (Nike, Adidas, ASICS, HOKA, Saucony, Mizuno, New Balance, Brooks, Salomon, On Running, Skechers, Altra, La Sportiva).

All lab values (energy return %, plate stiffness index, wet traction scores) are **EasternRun estimates and editorial assessments**, not results from a standardized physical lab. They are clearly disclosed as estimates throughout the site.

---

## Architecture

This is a **static Single-Page Application (SPA)** built with:

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript 6 |
| Routing | React Router v7 |
| Build Tool | Vite 8 |
| Hosting | Vercel (static SPA deployment) |
| Analytics | Vercel Analytics |

There is **no backend server**. The site is fully client-side rendered with static pre-rendering for SEO.

---

## Data Pipeline

```
src/data/shoesData.ts          ← Single canonical data source (TypeScript)
        ↓ (build time)
scripts/build-shoes-json.js    ← Exports shoes to public/data/shoes.json via Vite SSR
        ↓
scripts/generate-seo.js        ← Reads shoes.json, generates:
        ├── dist/sitemap.xml
        ├── dist/robots.txt
        ├── dist/shoe/[slug]/index.html   (105 shoe detail static pages)
        ├── dist/brand/[slug]/index.html  (18 brand hub static pages)
        └── dist/best/[slug]/index.html   (5 category hub static pages)
```

Static pre-rendered pages include correct `<title>`, `<meta description>`, `<link rel="canonical">`, OpenGraph tags, Twitter Card tags, and JSON-LD Product schema — so crawlers that don't execute JavaScript still receive complete, page-specific metadata.

React mounts over the pre-rendered content seamlessly on JS execution (progressive enhancement / hydration pattern).

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server (hot reload, no pre-rendering)
npm run dev
```

## Building for Production

```bash
npm run build
```

This runs:
1. `node scripts/build-shoes-json.js` — exports `public/data/shoes.json` from TypeScript source
2. `tsc -b` — TypeScript type checking
3. `vite build` — production bundle into `dist/`
4. `node scripts/generate-seo.js` — reads `shoes.json`, generates sitemap, robots.txt, and all static pre-rendered route HTML into `dist/`

```bash
# Preview production build locally
npm run preview
```

---

## Deployment

Deployed to Vercel via GitHub integration. Every push to `main` triggers a new deployment. Configuration is in [`vercel.json`](vercel.json):

- `cleanUrls: true` — static files (`/shoe/slug/index.html`) are served without `.html` extension
- `trailingSlash: false` — canonical URLs have no trailing slash
- `www → apex` — `www.easternrun.fit` permanently redirects (301) to `easternrun.fit`
- SPA fallback — extensionless URLs not matched by static files fall through to `index.html`

---

## Key Source Files

| File | Purpose |
|---|---|
| `src/data/shoesData.ts` | All 105 footwear models — single source of truth |
| `src/App.tsx` | Root app, routing, state management |
| `src/components/ShoeDetailPage.tsx` | Individual shoe spec page |
| `src/components/BrandHubPage.tsx` | Brand hub page |
| `src/components/CategoryHubPage.tsx` | Category ranking hub page |
| `src/components/ShoeComparePage.tsx` | Head-to-head comparison page |
| `src/utils/slugUtils.ts` | Canonical slug generation (shared by runtime and build scripts) |
| `scripts/build-shoes-json.js` | Build-time data export via Vite SSR loader |
| `scripts/generate-seo.js` | Static pre-rendering and sitemap generation |
| `public/robots.txt` | Crawler directives |
| `public/sitemap.xml` | Generated sitemap (auto-updated on every build) |
| `vercel.json` | Vercel routing, redirect, and header configuration |

---

## Review System

User reviews are stored in `localStorage` (`easternrun_user_reviews`) and persist across sessions. Reviews are **client-side only** — there is no backend or database. Reviews submitted by one user are not visible to other users. This will be replaced by a real backend review system in a future version.

---

## Methodology Disclosure

All performance scores and lab estimates are produced by EasternRun editorial assessment, sourced from:
- Manufacturer technical specifications
- Published foam chemistry papers
- Community consensus (forums, wear-tester threads)
- Comparative analysis with independently verified reference models

Where values are estimates, they are labeled as such on the site. Where data is sourced from third parties, the source is noted.
