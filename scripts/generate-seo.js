import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ──────────────────────────────────────────────────────────────
// UTILITIES
// ──────────────────────────────────────────────────────────────

function toCleanSlug(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .replace(/[°'"]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getFullShoeName(shoe) {
  if (!shoe || !shoe.name) return '';
  const brand = shoe.brand || '';
  if (shoe.name.toLowerCase().startsWith(brand.toLowerCase())) {
    return shoe.name;
  }
  return `${brand} ${shoe.name}`;
}

function getBrandSlug(brand) {
  if (!brand) return '';
  const clean = toCleanSlug(brand);
  if (clean === '361' || clean === '361degrees') return '361-degrees';
  return clean;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function loadShoesJson() {
  const jsonPath = path.join(rootDir, 'public', 'data', 'shoes.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error('shoes.json not found! Run node scripts/build-shoes-json.js first.');
  }
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const shoes = JSON.parse(raw);
  return shoes.map(s => ({
    ...s,
    slug: toCleanSlug(getFullShoeName(s))
  }));
}

// ──────────────────────────────────────────────────────────────
// CHEERIO-BASED PAGE BUILDER (replaces all regex HTML injection)
// ──────────────────────────────────────────────────────────────

/**
 * Creates a page variant from the template HTML using Cheerio DOM manipulation.
 * This replaces the old regex-based .replace() approach which could silently fail
 * if the HTML tag formatting changed.
 */
function buildPage(templateHtml, {
  title,
  description,
  canonicalUrl,
  ogImage,
  twitterImage,
  jsonLd,
  ssrContent,
  extraHeadHtml,
  robotsMeta
}) {
  const $ = cheerio.load(templateHtml, { decodeEntities: false });

  // 1. Title
  if (title) $('title').text(title);

  // 2. Meta description
  if (description) $('meta[name="description"]').attr('content', description);

  // 3. Canonical
  if (canonicalUrl) $('link[rel="canonical"]').attr('href', canonicalUrl);

  // 4. OpenGraph tags
  if (canonicalUrl) $('meta[property="og:url"]').attr('content', canonicalUrl);
  if (title) $('meta[property="og:title"]').attr('content', title);
  if (description) $('meta[property="og:description"]').attr('content', description);
  if (ogImage) $('meta[property="og:image"]').attr('content', ogImage);

  // 5. Twitter Card tags
  if (title) $('meta[name="twitter:title"]').attr('content', title);
  if (description) $('meta[name="twitter:description"]').attr('content', description.slice(0, 200));
  if (twitterImage) $('meta[name="twitter:image"]').attr('content', twitterImage);

  // 6. JSON-LD structured data (assign id="schema-jsonld" so client hydration updates in-place)
  if (jsonLd) {
    $('head script#schema-jsonld').remove();
    $('head').append(`<script id="schema-jsonld" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }

  // 7. Extra head HTML (e.g., robots noindex)
  if (extraHeadHtml) {
    $('head').append(extraHeadHtml);
  }

  // 8. Robots meta override
  if (robotsMeta) {
    $('meta[name="robots"]').attr('content', robotsMeta);
    $('meta[name="googlebot"]').attr('content', robotsMeta);
  }

  // 9. SSR content injection
  if (ssrContent) {
    $('#root').html(ssrContent);
  }

  // ── BUILD-TIME VALIDATION ──
  // If any critical tag is missing or empty, FAIL the build instead of silently
  // emitting broken HTML. This is the core safety guarantee that regex can't provide.
  const finalTitle = $('title').text();
  if (!finalTitle) throw new Error(`BUILD FAILED: Missing <title> for ${canonicalUrl}`);
  if (!$('link[rel="canonical"]').attr('href')) throw new Error(`BUILD FAILED: Missing canonical for ${canonicalUrl}`);
  if (!$('meta[name="description"]').attr('content')) throw new Error(`BUILD FAILED: Missing meta description for ${canonicalUrl}`);

  return $.html();
}

// ──────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────

function main() {
  console.log('🚀 Starting EasternRun SEO Generator (Cheerio DOM-based) & Pre-renderer...');
  const shoes = loadShoesJson();
  console.log(`✅ Loaded ${shoes.length} footwear models from public/data/shoes.json.`);

  const currentYear = new Date().getFullYear();
  const baseUrl = 'https://easternrun.fit';

  // Compute the most recent dataLastUpdated across all shoes (for homepage/brand/category lastmod)
  const globalLastUpdated = shoes.reduce((latest, s) => {
    const d = s.dataLastUpdated || '2026-01-01';
    return d > latest ? d : latest;
  }, '2026-01-01');

  // ── 1. ALL 18 BRANDS ──
  const brands = [
    { name: 'Li-Ning', slug: 'li-ning' },
    { name: 'ANTA', slug: 'anta' },
    { name: 'Xtep', slug: 'xtep' },
    { name: '361°', slug: '361-degrees' },
    { name: 'Qiaodan', slug: 'qiaodan' },
    { name: 'Nike', slug: 'nike' },
    { name: 'Adidas', slug: 'adidas' },
    { name: 'Saucony', slug: 'saucony' },
    { name: 'ASICS', slug: 'asics' },
    { name: 'HOKA', slug: 'hoka' },
    { name: 'Mizuno', slug: 'mizuno' },
    { name: 'New Balance', slug: 'new-balance' },
    { name: 'Brooks', slug: 'brooks' },
    { name: 'Skechers', slug: 'skechers' },
    { name: 'Salomon', slug: 'salomon' },
    { name: 'On Running', slug: 'on-running' },
    { name: 'Altra', slug: 'altra' },
    { name: 'La Sportiva', slug: 'la-sportiva' }
  ];

  // ── 2. CANONICAL CATEGORIES (dynamic year) ──
  const categories = [
    { name: 'Marathon Super-Shoe', slug: 'marathon-super-shoe' },
    { name: 'Daily Trainer', slug: 'daily-trainer' },
    { name: 'Tempo & Race', slug: 'tempo-race' },
    { name: 'Max Cushion', slug: 'max-cushion' },
    { name: 'Mountain & Trail', slug: 'mountain-trail' }
  ];

  // ── 3. TOP 20 CURATED COMPARISONS ──
  const topComparisons = [
    { slug: 'lining-feidian-6-ultra-vs-nike-alphafly-3', title: 'Li-Ning Feidian 6.0 Ultra vs Nike Alphafly 3' },
    { slug: 'anta-c202-6-pro-vs-nike-vaporfly-3', title: 'ANTA C202 6 Pro vs Nike Vaporfly 3' },
    { slug: 'xtep-160x-6-pro-vs-adidas-adizero-adios-pro-4', title: 'Xtep 160X 6 Pro vs Adidas Adizero Adios Pro 4' },
    { slug: 'saucony-endorphin-pro-4-vs-nike-vaporfly-3', title: 'Saucony Endorphin Pro 4 vs Nike Vaporfly 3' },
    { slug: 'asics-metaspeed-sky-paris-vs-nike-alphafly-3', title: 'ASICS Metaspeed Sky Paris vs Nike Alphafly 3' },
    { slug: '361-biospeed-5-pro-vs-saucony-endorphin-pro-4', title: '361° Biospeed 5 Pro vs Saucony Endorphin Pro 4' },
    { slug: 'qiaodan-feiying-pb-4-0-vs-asics-metaspeed-sky-paris', title: 'Qiaodan Feiying PB 4.0 vs ASICS Metaspeed Sky Paris' },
    { slug: 'lining-chitu-9-ultra-vs-nike-air-zoom-pegasus-41', title: 'Li-Ning Red Hare 9 Ultra vs Nike Air Zoom Pegasus 41' },
    { slug: 'anta-mach-4-vs-adidas-adizero-boston-12', title: 'ANTA Mach 4 vs Adidas Adizero Boston 12' },
    { slug: 'xtep-2000km-3-0-vs-asics-novablast-4', title: 'Xtep 2000km 3.0 vs ASICS Novablast 4' },
    { slug: '361-flame-5-mix-vs-saucony-endorphin-speed-4', title: '361° Flame 5 MIX vs Saucony Endorphin Speed 4' },
    { slug: 'hoka-cielo-x1-vs-nike-alphafly-3', title: 'HOKA Cielo X1 vs Nike Alphafly 3' },
    { slug: 'nike-vaporfly-3-vs-nike-alphafly-3', title: 'Nike Vaporfly 3 vs Nike Alphafly 3' },
    { slug: 'asics-superblast-2-vs-lining-chitu-9-ultra', title: 'ASICS Superblast 2 vs Li-Ning Red Hare 9 Ultra' },
    { slug: 'hoka-mach-6-vs-asics-novablast-4', title: 'HOKA Mach 6 vs ASICS Novablast 4' },
    { slug: 'mizuno-wave-rebellion-pro-2-vs-lining-feidian-6-ultra', title: 'Mizuno Wave Rebellion Pro 2 vs Li-Ning Feidian 6.0 Ultra' },
    { slug: 'brooks-hyperion-elite-4-vs-saucony-endorphin-pro-4', title: 'Brooks Hyperion Elite 4 vs Saucony Endorphin Pro 4' },
    { slug: 'new-balance-fuelcell-supercomp-elite-v4-vs-nike-alphafly-3', title: 'New Balance SC Elite v4 vs Nike Alphafly 3' },
    { slug: 'anta-pg7-classic-vs-hoka-clifton-9', title: 'ANTA PG7 Travel & Classic vs HOKA Clifton 9' },
    { slug: 'salomon-s-lab-ultra-fdh-vs-hoka-speedgoat-6', title: 'Salomon S/LAB Ultra vs HOKA Speedgoat 6' }
  ];

  // ══════════════════════════════════════════════════════════════
  // 4. BUILD SITEMAP.XML WITH PER-SHOE LASTMOD + IMAGE EXTENSION
  // ══════════════════════════════════════════════════════════════

  function getShoeImages(shoe) {
    const images = [];
    if (shoe.image) {
      images.push({ loc: `${baseUrl}${shoe.image}`, title: `${shoe.brand} ${shoe.name}` });
    }
    if (shoe.galleryImages && shoe.galleryImages.length > 0) {
      for (const img of shoe.galleryImages) {
        if (img !== shoe.image) {
          images.push({ loc: `${baseUrl}${img}`, title: `${shoe.brand} ${shoe.name}` });
        }
      }
    }
    return images;
  }

  function getBrandLastmod(brandSlug) {
    const brandShoes = shoes.filter(s => getBrandSlug(s.brand) === brandSlug);
    if (brandShoes.length === 0) return globalLastUpdated;
    return brandShoes.reduce((latest, s) => {
      const d = s.dataLastUpdated || '2026-01-01';
      return d > latest ? d : latest;
    }, '2026-01-01');
  }

  function getCategoryLastmod(categoryName) {
    const catShoes = shoes.filter(s => s.category === categoryName);
    if (catShoes.length === 0) return globalLastUpdated;
    return catShoes.reduce((latest, s) => {
      const d = s.dataLastUpdated || '2026-01-01';
      return d > latest ? d : latest;
    }, '2026-01-01');
  }

  // Build sitemap entries
  const sitemapEntries = [];

  // Homepage
  sitemapEntries.push({ loc: `${baseUrl}/`, lastmod: globalLastUpdated, priority: '1.0', changefreq: 'daily', images: [] });

  // Brands
  for (const b of brands) {
    sitemapEntries.push({ loc: `${baseUrl}/brand/${b.slug}`, lastmod: getBrandLastmod(b.slug), priority: '0.9', changefreq: 'weekly', images: [] });
  }

  // Categories
  for (const c of categories) {
    sitemapEntries.push({ loc: `${baseUrl}/best/${c.slug}`, lastmod: getCategoryLastmod(c.name), priority: '0.9', changefreq: 'weekly', images: [] });
  }

  // Curated comparisons
  for (const cmp of topComparisons) {
    sitemapEntries.push({ loc: `${baseUrl}/compare/${cmp.slug}`, lastmod: globalLastUpdated, priority: '0.8', changefreq: 'weekly', images: [] });
  }

  // Individual shoes (with per-shoe lastmod + image entries)
  for (const s of shoes) {
    sitemapEntries.push({
      loc: `${baseUrl}/shoe/${s.slug}`,
      lastmod: s.dataLastUpdated || globalLastUpdated,
      priority: '0.8',
      changefreq: 'weekly',
      images: getShoeImages(s)
    });
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries.map(u => {
  let entry = `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>`;
  for (const img of u.images) {
    entry += `
    <image:image>
      <image:loc>${escapeAttr(img.loc)}</image:loc>
      <image:title>${escapeAttr(img.title)}</image:title>
    </image:image>`;
  }
  entry += `
  </url>`;
  return entry;
}).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`✅ Generated sitemap.xml with ${sitemapEntries.length} URLs and image entries`);

  // ══════════════════════════════════════════════════════════════
  // 5. BUILD RSS 2.0 FEED
  // ══════════════════════════════════════════════════════════════

  const rssItemsXml = shoes.map(s => `    <item>
      <title><![CDATA[${s.brand} ${s.name} Specs & Review]]></title>
      <link>${baseUrl}/shoe/${s.slug}</link>
      <guid isPermaLink="true">${baseUrl}/shoe/${s.slug}</guid>
      <description><![CDATA[${s.description} MSRP $${s.msrpUsd}, ${s.specs?.weightGrams || 220}g weight, ${s.specs?.foamName || 'Superfoam'}.]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EasternRun Footwear Lab — Performance Running Shoe Database</title>
    <link>${baseUrl}</link>
    <description>Transparent technical specs, lab energy return scores, and wear-tester reviews for ${shoes.length} global footwear models.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${rssItemsXml}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(rootDir, 'public', 'feed.xml'), rssXml, 'utf8');

  // ══════════════════════════════════════════════════════════════
  // 6. WRITE TO DIST DIRECTORY + PRE-RENDER ALL PAGES
  // ══════════════════════════════════════════════════════════════

  const distDir = path.join(rootDir, 'dist');
  if (!fs.existsSync(distDir)) {
    console.log('⚠️ dist/ directory not found — skipping pre-rendering. Run vite build first.');
    return;
  }

  // Copy sitemap, feed, robots to dist
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'feed.xml'), rssXml, 'utf8');

  // ── ROBOTS.TXT (with compare disallow rules) ──
  const robotsTxt = `User-agent: *
Allow: /

# Block non-curated comparison URLs from crawl budget
Disallow: /compare/

# Explicitly allow curated comparison pages
${topComparisons.map(c => `Allow: /compare/${c.slug}`).join('\n')}

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public', 'robots.txt'), robotsTxt, 'utf8');
  console.log('✅ Generated robots.txt with compare disallow rules');

  // Load the Vite-built index.html as our template
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found!');
    return;
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // ══════════════════════════════════════════════════════════════
  // 6A. HOMEPAGE SSR FALLBACK
  // ══════════════════════════════════════════════════════════════

  const homepageFallbackHtml = `
    <div id="ssr-crawler-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1280px; margin: 0 auto; padding: 24px;">
      <header style="margin-bottom: 32px; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #0F172A; margin-bottom: 8px;">
          EasternRun — Independent Global Running Shoe Database & Review Lab
        </h1>
        <p style="font-size: 1.1rem; color: #475569; max-width: 800px; line-height: 1.6;">
          Transparent technical specs, lab energy return disclosures, plate stiffness metrics, and wear-tester reviews for ${shoes.length} global performance running shoes.
        </p>
      </header>

      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #0F172A; margin-bottom: 16px;">
          Footwear Brand Directory (All ${brands.length} Brands)
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${brands.map(b => `<a href="/brand/${b.slug}" style="padding: 8px 16px; background: #F1F5F9; border-radius: 8px; color: #0F172A; text-decoration: none; font-weight: 600;">${b.name}</a>`).join('\n')}
        </div>
      </section>

      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #0F172A; margin-bottom: 16px;">
          Performance Categories
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${categories.map(c => `<a href="/best/${c.slug}" style="padding: 8px 16px; background: #EFF6FF; border-radius: 8px; color: #1D4ED8; text-decoration: none; font-weight: 600;">${c.name}</a>`).join('\n')}
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #0F172A; margin-bottom: 16px;">
          Complete Database Directory (${shoes.length} Models)
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; list-style: none; padding: 0;">
          ${shoes.map(s => `
            <li style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; background: #FFFFFF;">
              <a href="/shoe/${s.slug}" style="color: #0F172A; font-weight: 700; text-decoration: none;">${s.name}</a>
              <div style="font-size: 0.8rem; color: #64748B; margin-top: 4px;">${s.brand} • $${s.msrpUsd} • ${s.specs?.foamResiliencePercent || 80}% Energy Return</div>
            </li>
          `).join('\n')}
        </ul>
      </section>
    </div>
  `;

  const homepageHtml = buildPage(templateHtml, {
    title: 'EasternRun — Running Shoe Database & Review Lab',
    description: `EasternRun is an independent, transparent running shoe database and review lab. Compare technical specs, lab measurements, energy return, and runner reviews for ${shoes.length} global footwear models including Nike, Adidas, ASICS, HOKA, Li-Ning, ANTA, Xtep, and 361°.`,
    canonicalUrl: `${baseUrl}/`,
    ogImage: `${baseUrl}/images/og-preview.jpg`,
    twitterImage: `${baseUrl}/images/og-preview.jpg`,
    ssrContent: homepageFallbackHtml
  });
  fs.writeFileSync(templatePath, homepageHtml, 'utf8');
  console.log('✅ Homepage pre-rendered with SSR fallback');

  // ══════════════════════════════════════════════════════════════
  // 6B. PRE-RENDER INDIVIDUAL SHOE PAGES
  // ══════════════════════════════════════════════════════════════

  let shoeCount = 0;
  for (const shoe of shoes) {
    const shoeDir = path.join(distDir, 'shoe', shoe.slug);
    fs.mkdirSync(shoeDir, { recursive: true });

    const fullShoeName = getFullShoeName(shoe);
    const shoeTitle = `${fullShoeName} Specs & Performance Breakdown — EasternRun`;
    const shoeDesc = `${shoe.description} Features ${shoe.specs?.foamName || 'Superfoam'} (${shoe.specs?.foamResiliencePercent || 80}% energy return), ${shoe.specs?.weightGrams || 220}g weight, ${shoe.specs?.dropMm || 8}mm drop, and $${shoe.msrpUsd} MSRP.`;
    const shoeCanonical = `${baseUrl}/shoe/${shoe.slug}`;

    // Product schema — review nested inside Product to avoid duplicate Product items
    // Uses @id so client-side hydration can reference the same entity without duplication
    const shoeProductSchema = [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': shoeCanonical + '#product',
        'name': fullShoeName,
        'image': `${baseUrl}${shoe.image}`,
        'description': shoe.description,
        'brand': { '@type': 'Brand', 'name': shoe.brand },
        'offers': {
          '@type': 'Offer',
          'url': shoeCanonical,
          'priceCurrency': 'USD',
          'price': shoe.msrpUsd.toString(),
          'availability': 'https://schema.org/InStock'
        },
        'review': {
          '@type': 'Review',
          'author': { '@type': 'Organization', 'name': 'EasternRun Footwear Lab' },
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': (shoe.overallRating / 20).toFixed(1),
            'bestRating': '5'
          },
          'reviewBody': shoe.finalConsensusVerdict || shoe.description
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
          { '@type': 'ListItem', 'position': 2, 'name': shoe.brand, 'item': `${baseUrl}/brand/${getBrandSlug(shoe.brand)}` },
          { '@type': 'ListItem', 'position': 3, 'name': fullShoeName, 'item': shoeCanonical }
        ]
      }
    ];

    const shoeContentHtml = `
      <div id="ssr-shoe-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
        <nav style="margin-bottom: 16px; font-size: 0.9rem; color: #64748B;">
          <a href="/" style="color: #2563EB;">Home</a> &gt;
          <a href="/brand/${getBrandSlug(shoe.brand)}" style="color: #2563EB;">${shoe.brand}</a> &gt;
          <span>${fullShoeName}</span>
        </nav>
        <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 8px;">${fullShoeName}</h1>
        <p style="font-size: 1.1rem; color: #2563EB; font-weight: 700; margin-bottom: 16px;">${shoe.brand} • ${shoe.category} • MSRP $${shoe.msrpUsd}</p>
        <p style="font-size: 1rem; color: #334155; line-height: 1.7; margin-bottom: 24px;">${shoe.description}</p>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 12px;">Technical Specifications & Lab Disclosures</h2>
          <ul>
            <li><strong>Foam Technology:</strong> ${shoe.specs?.foamName || 'Superfoam'} (${shoe.specs?.foamResiliencePercent || 80}% Energy Return Estimate)</li>
            <li><strong>Weight:</strong> ${shoe.specs?.weightGrams || 220}g</li>
            <li><strong>Heel-to-Toe Drop:</strong> ${shoe.specs?.dropMm || 8}mm</li>
            <li><strong>Plate Stiffness Index:</strong> ${shoe.specs?.carbonStiffnessIndex || 0}/10</li>
            <li><strong>Overall Benchmark Rating:</strong> ${shoe.overallRating}/100</li>
          </ul>
        </div>
        <a href="/" style="display: inline-block; padding: 10px 20px; background: #0F172A; color: #FFF; text-decoration: none; border-radius: 8px; font-weight: 700;">Explore Full Interactive Database →</a>
      </div>
    `;

    const shoeHtml = buildPage(templateHtml, {
      title: shoeTitle,
      description: shoeDesc,
      canonicalUrl: shoeCanonical,
      ogImage: `${baseUrl}${shoe.image}`,
      twitterImage: `${baseUrl}${shoe.image}`,
      jsonLd: shoeProductSchema,
      ssrContent: shoeContentHtml
    });

    fs.writeFileSync(path.join(shoeDir, 'index.html'), shoeHtml, 'utf8');
    shoeCount++;
  }
  console.log(`✅ Pre-rendered ${shoeCount} static shoe detail pages`);

  // ══════════════════════════════════════════════════════════════
  // 6C. PRE-RENDER BRAND PAGES
  // ══════════════════════════════════════════════════════════════

  for (const brand of brands) {
    const brandDir = path.join(distDir, 'brand', brand.slug);
    fs.mkdirSync(brandDir, { recursive: true });

    const brandShoes = shoes.filter(s => getBrandSlug(s.brand) === brand.slug || s.brand.toLowerCase() === brand.name.toLowerCase());
    const brandTitle = `${brand.name} Running Shoes Specs, Ratings & Reviews — EasternRun`;
    const brandDesc = `Explore transparent specs, lab measurements, and reviews for ${brand.name} running shoes including ${brandShoes.slice(0, 3).map(s => s.name).join(', ')}.`;
    const brandCanonical = `${baseUrl}/brand/${brand.slug}`;

    const brandBreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
        { '@type': 'ListItem', 'position': 2, 'name': brand.name, 'item': brandCanonical }
      ]
    };

    const brandContentHtml = `
      <div id="ssr-brand-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
        <nav style="margin-bottom: 16px; font-size: 0.9rem; color: #64748B;">
          <a href="/" style="color: #2563EB;">Home</a> &gt; <span>${brand.name}</span>
        </nav>
        <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 8px;">${brand.name} Running Shoe Database</h1>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 24px;">${brandDesc}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${brandShoes.map(s => `
            <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; background: #FFF;">
              <h2 style="font-size: 1rem; font-weight: 800;"><a href="/shoe/${s.slug}" style="color: #0F172A; text-decoration: none;">${s.name}</a></h2>
              <p style="font-size: 0.8rem; color: #64748B;">$${s.msrpUsd} • ${s.category}</p>
            </div>
          `).join('\n')}
        </div>
      </div>
    `;

    const brandHtml = buildPage(templateHtml, {
      title: brandTitle,
      description: brandDesc,
      canonicalUrl: brandCanonical,
      ogImage: `${baseUrl}/images/og-preview.jpg`,
      twitterImage: `${baseUrl}/images/og-preview.jpg`,
      jsonLd: brandBreadcrumbSchema,
      ssrContent: brandContentHtml
    });

    fs.writeFileSync(path.join(brandDir, 'index.html'), brandHtml, 'utf8');
  }
  console.log(`✅ Pre-rendered ${brands.length} static brand hub pages`);

  // ══════════════════════════════════════════════════════════════
  // 6D. PRE-RENDER CATEGORY PAGES (DYNAMIC YEAR)
  // ══════════════════════════════════════════════════════════════

  for (const category of categories) {
    const catDir = path.join(distDir, 'best', category.slug);
    fs.mkdirSync(catDir, { recursive: true });

    const catShoes = shoes.filter(s => s.category === category.name);
    const catTitle = `Best ${category.name} Running Shoes (${currentYear}) — EasternRun`;
    const catDesc = `Explore curated rankings, lab energy return data, and spec evaluations for top ${category.name} running shoes.`;
    const catCanonical = `${baseUrl}/best/${category.slug}`;

    const catBreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
        { '@type': 'ListItem', 'position': 2, 'name': category.name, 'item': catCanonical }
      ]
    };

    const catContentHtml = `
      <div id="ssr-cat-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
        <nav style="margin-bottom: 16px; font-size: 0.9rem; color: #64748B;">
          <a href="/" style="color: #2563EB;">Home</a> &gt; <span>${category.name}</span>
        </nav>
        <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 8px;">Best ${category.name} Running Shoes (${currentYear})</h1>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 24px;">${catDesc}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${catShoes.map(s => `
            <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; background: #FFF;">
              <h2 style="font-size: 1rem; font-weight: 800;"><a href="/shoe/${s.slug}" style="color: #0F172A; text-decoration: none;">${s.name}</a></h2>
              <p style="font-size: 0.8rem; color: #64748B;">$${s.msrpUsd} • ${s.brand}</p>
            </div>
          `).join('\n')}
        </div>
      </div>
    `;

    const catHtml = buildPage(templateHtml, {
      title: catTitle,
      description: catDesc,
      canonicalUrl: catCanonical,
      ogImage: `${baseUrl}/images/og-preview.jpg`,
      twitterImage: `${baseUrl}/images/og-preview.jpg`,
      jsonLd: catBreadcrumbSchema,
      ssrContent: catContentHtml
    });

    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf8');
  }
  console.log(`✅ Pre-rendered ${categories.length} static category hub pages (year: ${currentYear})`);

  // ══════════════════════════════════════════════════════════════
  // 6E. PRE-RENDER TOP 20 CURATED COMPARISON PAGES
  // ══════════════════════════════════════════════════════════════

  for (const cmp of topComparisons) {
    const cmpDir = path.join(distDir, 'compare', cmp.slug);
    fs.mkdirSync(cmpDir, { recursive: true });

    const cmpTitle = `${cmp.title}: Spec & Performance Comparison — EasternRun`;
    const cmpDesc = `Detailed head-to-head spec comparison between ${cmp.title}. Stack height, drop, weight, carbon plate technology, and performance verdict.`;
    const cmpCanonical = `${baseUrl}/compare/${cmp.slug}`;

    const cmpBreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'Comparison', 'item': cmpCanonical }
      ]
    };

    const cmpContentHtml = `
      <div id="ssr-cmp-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
        <nav style="margin-bottom: 16px; font-size: 0.9rem; color: #64748B;">
          <a href="/" style="color: #2563EB;">Home</a> &gt; <span>Comparison</span>
        </nav>
        <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 8px;">${cmp.title}</h1>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 24px;">${cmpDesc}</p>
        <a href="/" style="display: inline-block; padding: 10px 20px; background: #0F172A; color: #FFF; text-decoration: none; border-radius: 8px; font-weight: 700;">Explore Interactive Head-to-Head Breakdown →</a>
      </div>
    `;

    const cmpHtml = buildPage(templateHtml, {
      title: cmpTitle,
      description: cmpDesc,
      canonicalUrl: cmpCanonical,
      ogImage: `${baseUrl}/images/og-preview.jpg`,
      twitterImage: `${baseUrl}/images/og-preview.jpg`,
      jsonLd: cmpBreadcrumbSchema,
      ssrContent: cmpContentHtml
    });

    fs.writeFileSync(path.join(cmpDir, 'index.html'), cmpHtml, 'utf8');
  }
  console.log(`✅ Pre-rendered ${topComparisons.length} static comparison pages`);

  // ══════════════════════════════════════════════════════════════
  // 6F. GENERATE COMPARE.HTML — NOINDEX SPA SHELL FOR DYNAMIC COMPARISONS
  // ══════════════════════════════════════════════════════════════

  const compareShellHtml = buildPage(templateHtml, {
    title: 'Shoe Comparison | EasternRun',
    description: 'Head-to-head running shoe specification comparison on EasternRun.',
    canonicalUrl: `${baseUrl}/compare`,
    ogImage: `${baseUrl}/images/og-preview.jpg`,
    twitterImage: `${baseUrl}/images/og-preview.jpg`,
    robotsMeta: 'noindex, follow',
    ssrContent: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 80px auto; padding: 32px; text-align: center;">
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #0F172A;">Shoe Comparison</h1>
        <p style="color: #64748B; margin: 16px 0 24px 0;">Loading comparison data...</p>
      </div>
    `
  });
  fs.writeFileSync(path.join(distDir, 'compare.html'), compareShellHtml, 'utf8');
  console.log('✅ Generated compare.html noindex SPA shell for dynamic comparisons');

  // ══════════════════════════════════════════════════════════════
  // 6G. PRE-RENDER STATIC 404 PAGE
  // ══════════════════════════════════════════════════════════════

  const page404Html = buildPage(templateHtml, {
    title: 'Page Not Found (404) | EasternRun',
    description: 'The requested page could not be found.',
    canonicalUrl: `${baseUrl}/404`,
    ogImage: `${baseUrl}/images/og-preview.jpg`,
    twitterImage: `${baseUrl}/images/og-preview.jpg`,
    robotsMeta: 'noindex, nofollow',
    ssrContent: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 80px auto; padding: 32px; text-align: center;">
        <div style="font-size: 4rem; font-weight: 900; color: #E2E8F0; margin-bottom: 16px; letter-spacing: -0.04em;">404</div>
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #0F172A;">Page Not Found</h1>
        <p style="color: #64748B; margin: 16px 0 24px 0;">The page you're looking for doesn't exist or has been moved. Explore our complete running shoe database below.</p>
        <a href="/" style="display: inline-block; padding: 12px 24px; background: #0F172A; color: #FFF; border-radius: 8px; font-weight: 700; text-decoration: none;">Return to Database Catalog →</a>
      </div>
    `
  });
  fs.writeFileSync(path.join(distDir, '404.html'), page404Html, 'utf8');
  console.log('✅ Generated pre-rendered static 404 page');

  // ══════════════════════════════════════════════════════════════
  // DONE
  // ══════════════════════════════════════════════════════════════

  console.log('');
  console.log('🎉 EasternRun SEO Generation & Pre-rendering Complete!');
  console.log(`   • ${shoes.length} shoe pages with per-shoe lastmod + image sitemap`);
  console.log(`   • ${brands.length} brand hub pages`);
  console.log(`   • ${categories.length} category pages (year: ${currentYear})`);
  console.log(`   • ${topComparisons.length} curated comparison pages (indexed)`);
  console.log(`   • compare.html noindex SPA shell (dynamic comparisons)`);
  console.log(`   • 404.html with noindex`);
  console.log(`   • robots.txt with compare disallow rules`);
  console.log(`   • All HTML generated via Cheerio DOM parser (zero regex injection)`);
}

main();
