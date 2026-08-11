import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to convert text to clean slug
function toCleanSlug(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .replace(/[°'"]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
    slug: toCleanSlug(`${s.brand} ${s.name}`)
  }));
}

function main() {
  console.log('🚀 Starting EasternRun Single-Source-of-Truth SEO Generator & Pre-renderer...');
  const shoes = loadShoesJson();
  console.log(`✅ Loaded ${shoes.length} footwear models from public/data/shoes.json.`);

  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://easternrun.fit';

  // 1. ALL 18 BRANDS (FULL COMPLETE DIRECTORY)
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

  // 2. CANONICAL CATEGORIES
  const categories = [
    { name: 'Marathon Super-Shoe', slug: 'marathon-super-shoe' },
    { name: 'Daily Trainer', slug: 'daily-trainer' },
    { name: 'Tempo & Race', slug: 'tempo-race' },
    { name: 'Max Cushion', slug: 'max-cushion' },
    { name: 'Mountain & Trail', slug: 'mountain-trail' }
  ];

  // 3. KEY HEAD-TO-HEAD COMPARISON ROUTES
  const topComparisons = [
    { slug: 'lining-feidian-6-ultra-vs-nike-alphafly-3', title: 'Li-Ning Feidian 6.0 Ultra vs Nike Alphafly 3' },
    { slug: 'anta-c202-6-pro-vs-nike-vaporfly-3', title: 'ANTA C202 6 Pro vs Nike Vaporfly 3' },
    { slug: 'xtep-160x-6-pro-vs-adidas-adizero-adios-pro-4', title: 'Xtep 160X 6 Pro vs Adidas Adizero Adios Pro 4' },
    { slug: 'saucony-endorphin-pro-4-vs-nike-vaporfly-3', title: 'Saucony Endorphin Pro 4 vs Nike Vaporfly 3' },
    { slug: 'asics-metaspeed-sky-paris-vs-nike-alphafly-3', title: 'ASICS Metaspeed Sky Paris vs Nike Alphafly 3' }
  ];

  // 4. BUILD SITEMAP.XML
  const sitemapUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    ...brands.map(b => ({ loc: `${baseUrl}/brand/${b.slug}`, priority: '0.9', changefreq: 'weekly' })),
    ...categories.map(c => ({ loc: `${baseUrl}/best/${c.slug}`, priority: '0.9', changefreq: 'weekly' })),
    ...topComparisons.map(cmp => ({ loc: `${baseUrl}/compare/${cmp.slug}`, priority: '0.8', changefreq: 'weekly' })),
    ...shoes.map(s => ({ loc: `${baseUrl}/shoe/${s.slug}`, priority: '0.8', changefreq: 'weekly' }))
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');

  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');

    const robotsTxt = `User-agent: *
Allow: /

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');

    const templatePath = path.join(distDir, 'index.html');
    if (fs.existsSync(templatePath)) {
      const templateHtml = fs.readFileSync(templatePath, 'utf8');

      // 4A. HOMEPAGE CONCISE HIGH-PERFORMANCE SSR FALLBACK
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

      const homepageHtml = templateHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${homepageFallbackHtml}</div>`
      );
      fs.writeFileSync(templatePath, homepageHtml, 'utf8');

      // 4B. PRE-RENDER INDIVIDUAL SHOE PAGES
      let shoeCount = 0;
      for (const shoe of shoes) {
        const shoeDir = path.join(distDir, 'shoe', shoe.slug);
        fs.mkdirSync(shoeDir, { recursive: true });

        const shoeTitle = `${shoe.brand} ${shoe.name} Specs & Performance Breakdown — EasternRun`;
        const shoeDesc = `${shoe.description} Features ${shoe.specs?.foamName || 'Superfoam'} (${shoe.specs?.foamResiliencePercent || 80}% energy return), ${shoe.specs?.weightGrams || 220}g weight, ${shoe.specs?.dropMm || 8}mm drop, and $${shoe.msrpUsd} MSRP.`;
        const shoeCanonical = `${baseUrl}/shoe/${shoe.slug}`;

        const shoeProductSchema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': `${shoe.brand} ${shoe.name}`,
          'image': `${baseUrl}${shoe.image}`,
          'description': shoe.description,
          'brand': { '@type': 'Brand', 'name': shoe.brand },
          'offers': {
            '@type': 'Offer',
            'url': shoeCanonical,
            'priceCurrency': 'USD',
            'price': shoe.msrpUsd.toString(),
            'availability': 'https://schema.org/InStock'
          }
        };

        if (shoe.userReviews && shoe.userReviews.length > 0) {
          const totalStars = shoe.userReviews.reduce((acc, r) => acc + r.rating, 0);
          shoeProductSchema.aggregateRating = {
            '@type': 'AggregateRating',
            'ratingValue': (totalStars / shoe.userReviews.length).toFixed(1),
            'reviewCount': shoe.userReviews.length
          };
        }

        const shoeContentHtml = `
          <div id="ssr-shoe-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
            <nav style="margin-bottom: 16px; font-size: 0.9rem; color: #64748B;">
              <a href="/" style="color: #2563EB;">Home</a> &gt; 
              <a href="/brand/${toCleanSlug(shoe.brand)}" style="color: #2563EB;">${shoe.brand}</a> &gt; 
              <span>${shoe.name}</span>
            </nav>
            <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 8px;">${shoe.name}</h1>
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

        let shoeHtml = templateHtml
          .replace(/<title>.*?<\/title>/, `<title>${shoeTitle}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${shoeDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${shoeCanonical}" />`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${shoeCanonical}" />`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${shoeTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${shoeDesc.slice(0, 200).replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="https://easternrun.fit${shoe.image}" />`)
          .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${shoeTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${shoeDesc.slice(0, 200).replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="https://easternrun.fit${shoe.image}" />`)
          .replace('<div id="root"></div>', `<div id="root">${shoeContentHtml}</div>`)
          + `<script type="application/ld+json">${JSON.stringify(shoeProductSchema)}</script>`;

        fs.writeFileSync(path.join(shoeDir, 'index.html'), shoeHtml, 'utf8');
        shoeCount++;
      }
      console.log(`✅ Pre-rendered ${shoeCount} static shoe detail pages into dist/shoe/[slug]/index.html`);

      // 4C. PRE-RENDER BRAND PAGES
      for (const brand of brands) {
        const brandDir = path.join(distDir, 'brand', brand.slug);
        fs.mkdirSync(brandDir, { recursive: true });

        const brandShoes = shoes.filter(s => toCleanSlug(s.brand) === brand.slug || s.brand.toLowerCase() === brand.name.toLowerCase());
        const brandTitle = `${brand.name} Running Shoes Specs, Ratings & Reviews — EasternRun`;
        const brandDesc = `Explore transparent specs, lab measurements, and reviews for ${brand.name} running shoes including ${brandShoes.slice(0, 3).map(s => s.name).join(', ')}.`;
        const brandCanonical = `${baseUrl}/brand/${brand.slug}`;

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

        let brandHtml = templateHtml
          .replace(/<title>.*?<\/title>/, `<title>${brandTitle}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${brandDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${brandCanonical}" />`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${brandCanonical}" />`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${brandTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${brandDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${brandTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${brandDesc.replace(/"/g, '&quot;')}" />`)
          .replace('<div id="root"></div>', `<div id="root">${brandContentHtml}</div>`);

        fs.writeFileSync(path.join(brandDir, 'index.html'), brandHtml, 'utf8');
      }
      console.log(`✅ Pre-rendered ${brands.length} static brand hub pages into dist/brand/[slug]/index.html`);

      // 4D. PRE-RENDER CATEGORY PAGES
      for (const category of categories) {
        const catDir = path.join(distDir, 'best', category.slug);
        fs.mkdirSync(catDir, { recursive: true });

        const catShoes = shoes.filter(s => s.category === category.name);
        const catTitle = `Best ${category.name} Running Shoes (2026) — EasternRun`;
        const catDesc = `Explore curated rankings, lab energy return data, and spec evaluations for top ${category.name} running shoes.`;
        const catCanonical = `${baseUrl}/best/${category.slug}`;

        const catContentHtml = `
          <div id="ssr-cat-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
            <nav style="margin-bottom: 16px; font-size: 0.9rem; color: #64748B;">
              <a href="/" style="color: #2563EB;">Home</a> &gt; <span>${category.name}</span>
            </nav>
            <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 8px;">Best ${category.name} Running Shoes (2026)</h1>
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

        let catHtml = templateHtml
          .replace(/<title>.*?<\/title>/, `<title>${catTitle}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${catDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${catCanonical}" />`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${catCanonical}" />`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${catTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${catDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${catTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${catDesc.replace(/"/g, '&quot;')}" />`)
          .replace('<div id="root"></div>', `<div id="root">${catContentHtml}</div>`);

        fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf8');
      }
      console.log(`✅ Pre-rendered ${categories.length} static category hub pages into dist/best/[slug]/index.html`);

      // 4E. PRE-RENDER TOP COMPARISON PAGES
      for (const cmp of topComparisons) {
        const cmpDir = path.join(distDir, 'compare', cmp.slug);
        fs.mkdirSync(cmpDir, { recursive: true });

        const cmpTitle = `${cmp.title}: Spec & Performance Comparison — EasternRun`;
        const cmpDesc = `Detailed head-to-head spec comparison between ${cmp.title}. Stack height, drop, weight, carbon plate technology, and performance verdict.`;
        const cmpCanonical = `${baseUrl}/compare/${cmp.slug}`;

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

        let cmpHtml = templateHtml
          .replace(/<title>.*?<\/title>/, `<title>${cmpTitle}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${cmpDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${cmpCanonical}" />`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${cmpCanonical}" />`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${cmpTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${cmpDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${cmpTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${cmpDesc.replace(/"/g, '&quot;')}" />`)
          .replace('<div id="root"></div>', `<div id="root">${cmpContentHtml}</div>`);

        fs.writeFileSync(path.join(cmpDir, 'index.html'), cmpHtml, 'utf8');
      }
      console.log(`✅ Pre-rendered ${topComparisons.length} static comparison pages into dist/compare/[slug]/index.html`);
    }
  }

  console.log('🎉 EasternRun SEO Generation & Pre-rendering Completed Successfully!');
}

main();
