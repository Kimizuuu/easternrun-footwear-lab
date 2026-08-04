# EasternRun Footwear Lab & Review Platform — Release Changelog

## 🚀 Version 2.0.0 (Current Major Release) — August 4, 2026

### 🌐 Universal SEO & Clean Routing Engine
- **Client Dynamic Routing (`react-router-dom`)**: Added clean shareable URLs for individual shoe reviews (`/shoe/:slug`) and head-to-head comparisons (`/compare/:shoe1-vs-:shoe2`).
- **Canonical Custom Domain Integration**: Configured `vercel.json` rewrite exclusions and header rules for 100% canonical domain serving on `https://easternrun.fit/`.
- **Pre-Generated Sitemaps & Schema.org JSON-LD**: Deployed 100 pre-rendered, indexable URLs with structured `Product`, `AggregateRating`, and `Review` metadata.

### 📊 Dynamic Sector Rating & RunRepeat CoScore Calibration
- **Dynamic Score Badge System**: Clicking category filters or sort modes automatically adapts score badges across card grids and leaderboards to display that specific sector's rating (Race Day, Speed, Daily, Cushioning).
- **RunRepeat CoScore Alignment**: Calibrated overall ratings across all 54 shoes strictly against price tiers, PEBA vs EVA foam chemistry, carbon plate geometry, and lab energy-return metrics.
- **Visual Denominator Standard**: Unified all score badges and leaderboard displays to the 100-point scale (`/ 100`).

### 🎛️ Integrated Control Bar & Interactive Features
- **Integrated 1-Selectable Option Control Bar**: Combined separate category pills and sort dropdowns into one tap control (`DATABASE VIEW & SORT:`).
- **Multi-Aspect Shoe Sector Advisor**: Added custom budget range slider ($70–$300), plate architecture selectors, foam chemistry options, and Top 3 matched recommendations.
- **Interactive Side-by-Side Compare Modal**: Added direct model dropdown selectors for Slot A, Slot B, and Slot C directly inside the comparison modal.
- **Smooth Scroll-to-Destination**: Tapping any category or brand button in the navigation sidebar smoothly scrolls down to `#database-catalog-section`.

### 🎨 UI & Layout Optimization
- **3-Column Grid Catalog**: Updated desktop grid min-width from 280px to 350px for 3 shoes per row with expanded 250px photo stages.
- **Slate Glassmorphism Aesthetic**: Stripped emoji clutter and ad-hoc colored badges in favor of a clean, tech-forward slate design theme (`#0F172A`, `#F8FAFC`, `#E2E8F0`, `#2563EB`).

---

## 📦 Version 1.0.0-stable (Legacy Base Checkpoint)
- Initial single-page spec database and baseline review cards.
