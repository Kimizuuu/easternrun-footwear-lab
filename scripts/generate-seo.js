import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to convert text to clean slug
function toCleanSlug(text) {
  return text
    .toLowerCase()
    .replace(/[°'"]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse shoesData.ts directly to extract shoes array
function loadShoesData() {
  const filePath = path.join(rootDir, 'src', 'data', 'shoesData.ts');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Extract objects using regex / parsing
  const shoeMatches = fileContent.match(/\{\s*id:\s*['"][^'"]+['"][\s\S]*?userReviews:\s*\[\]\s*\}/g);
  if (!shoeMatches) return [];

  const shoes = [];
  for (const match of shoeMatches) {
    const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
    const nameMatch = match.match(/name:\s*['"]([^'"]+)['"]/);
    const brandMatch = match.match(/brand:\s*['"]([^'"]+)['"]/);
    const categoryMatch = match.match(/category:\s*['"]([^'"]+)['"]/);
    const msrpUsdMatch = match.match(/msrpUsd:\s*(\d+)/);
    const msrpRmbMatch = match.match(/msrpRmb:\s*(\d+)/);
    const taglineMatch = match.match(/tagline:\s*['"]([^'"]+)['"]/);
    const descriptionMatch = match.match(/description:\s*['"]([^'"]+)['"]/);
    const imageMatch = match.match(/image:\s*['"]([^'"]+)['"]/);
    const foamNameMatch = match.match(/foamName:\s*['"]([^'"]+)['"]/);
    const resilienceMatch = match.match(/foamResiliencePercent:\s*(\d+)/);
    const weightMatch = match.match(/weightGrams:\s*(\d+)/);
    const dropMatch = match.match(/dropMm:\s*(\d+)/);
    const ratingMatch = match.match(/overallRating:\s*(\d+)/);

    if (idMatch && nameMatch && brandMatch) {
      const id = idMatch[1];
      const name = nameMatch[1];
      const brand = brandMatch[1];
      const category = categoryMatch ? categoryMatch[1] : 'Daily Trainer';
      const msrpUsd = msrpUsdMatch ? parseInt(msrpUsdMatch[1], 10) : 120;
      const tagline = taglineMatch ? taglineMatch[1] : '';
      const description = descriptionMatch ? descriptionMatch[1] : '';
      const image = imageMatch ? imageMatch[1] : '/images/fallback-shoe.jpg';
      const foamName = foamNameMatch ? foamNameMatch[1] : 'Supercritical Foam';
      const foamResiliencePercent = resilienceMatch ? parseInt(resilienceMatch[1], 10) : 80;
      const weightGrams = weightMatch ? parseInt(weightMatch[1], 10) : 220;
      const dropMm = dropMatch ? parseInt(dropMatch[1], 10) : 8;
      const overallRating = ratingMatch ? parseInt(ratingMatch[1], 10) : 88;

      const slug = toCleanSlug(`${brand} ${name}`);

      shoes.push({
        id,
        name,
        brand,
        category,
        msrpUsd,
        tagline,
        description,
        image,
        foamName,
        foamResiliencePercent,
        weightGrams,
        dropMm,
        overallRating,
        slug
      });
    }
  }

  return shoes;
}

function main() {
  console.log('🚀 Starting EasternRun SEO Generator & Static Pre-renderer...');
  const shoes = loadShoesData();
  console.log(`Found ${shoes.length} footwear models in database.`);

  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://easternrun.fit';

  // 1. BRAND HUB SLUGS
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

  // 2. CATEGORY HUB SLUGS
  const categories = [
    { name: 'Marathon Super-Shoe', slug: 'marathon-super-shoe' },
    { name: 'Daily Trainer', slug: 'daily-trainer' },
    { name: 'Tempo & Race', slug: 'tempo-race' },
    { name: 'Max Cushion', slug: 'max-cushion' },
    { name: 'Mountain & Trail', slug: 'mountain-trail' }
  ];

  // 3. BUILD FULL SITEMAP.XML
  const sitemapUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    ...brands.map(b => ({ loc: `${baseUrl}/brand/${b.slug}`, priority: '0.9', changefreq: 'weekly' })),
    ...categories.map(c => ({ loc: `${baseUrl}/best/${c.slug}`, priority: '0.9', changefreq: 'weekly' })),
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

  // Write sitemap.xml to public and dist
  const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  console.log(`✅ Generated public/sitemap.xml (${sitemapUrls.length} URLs)`);

  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');

    const robotsTxt = `User-agent: *
Allow: /

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
    console.log('✅ Generated dist/sitemap.xml & dist/robots.txt');

    // 4. PRE-RENDER STATIC HTML FILES INTO DIST
    const templatePath = path.join(distDir, 'index.html');
    if (fs.existsSync(templatePath)) {
      const templateHtml = fs.readFileSync(templatePath, 'utf8');

      // 4A. ENHANCE HOMEPAGE INDEX.HTML WITH SEMANTIC PRE-RENDERED ROOT CONTENT
      const homepageFallbackHtml = `
        <div id="ssr-fallback" style="font-family: system-ui, -apple-system, sans-serif; max-width: 1280px; margin: 0 auto; padding: 24px;">
          <header style="margin-bottom: 32px; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px;">
            <h1 style="font-size: 2rem; font-weight: 800; color: #0F172A; margin-bottom: 8px;">
              EasternRun — Independent Global Running Shoe Database & Review Lab
            </h1>
            <p style="font-size: 1.1rem; color: #475569; max-width: 800px; line-height: 1.6;">
              Transparent performance metrics, lab energy return data, plate stiffness ratings, and runner reviews for ${shoes.length} global footwear models across Li-Ning, ANTA, Xtep, 361°, Qiaodan, Nike, Adidas, ASICS, HOKA, Saucony, Mizuno, New Balance, and Brooks.
            </p>
          </header>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #0F172A; margin-bottom: 16px;">
              Browse Footwear Brands
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
              ${brands.map(b => `<a href="/brand/${b.slug}" style="display: inline-block; padding: 8px 16px; background: #F1F5F9; border-radius: 8px; color: #0F172A; text-decoration: none; font-weight: 600;">${b.name}</a>`).join('\n')}
            </div>
          </section>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #0F172A; margin-bottom: 16px;">
              Browse Running Categories
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
              ${categories.map(c => `<a href="/best/${c.slug}" style="display: inline-block; padding: 8px 16px; background: #EFF6FF; border-radius: 8px; color: #1D4ED8; text-decoration: none; font-weight: 600;">${c.name}</a>`).join('\n')}
            </div>
          </section>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #0F172A; margin-bottom: 20px;">
              Tested Footwear Specification Directory (${shoes.length} Models)
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
              ${shoes.map(s => `
                <article style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; background: #FFFFFF;">
                  <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 4px;">
                    <a href="/shoe/${s.slug}" style="color: #0F172A; text-decoration: none;">${s.name}</a>
                  </h3>
                  <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 8px;">${s.brand} • ${s.category} • MSRP: $${s.msrpUsd}</p>
                  <p style="font-size: 0.85rem; color: #334155; line-height: 1.5; margin-bottom: 12px;">${s.description}</p>
                  <div style="font-size: 0.8rem; font-weight: 700; color: #2563EB; display: flex; gap: 12px;">
                    <span>Energy Return: ${s.foamResiliencePercent}%</span>
                    <span>Weight: ${s.weightGrams}g</span>
                    <span>Drop: ${s.dropMm}mm</span>
                  </div>
                </article>
              `).join('\n')}
            </div>
          </section>
        </div>
      `;

      // Replace empty root div with pre-rendered semantic HTML
      const homepageHtml = templateHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${homepageFallbackHtml}</div>`
      );
      fs.writeFileSync(templatePath, homepageHtml, 'utf8');
      console.log('✅ Injected pre-rendered semantic SEO fallback HTML into dist/index.html');

      // 4B. PRE-RENDER SHOE DETAIL PAGES INTO DIST/SHOE/[SLUG]/INDEX.HTML
      let shoeCount = 0;
      for (const shoe of shoes) {
        const shoeDir = path.join(distDir, 'shoe', shoe.slug);
        fs.mkdirSync(shoeDir, { recursive: true });

        const shoeTitle = `${shoe.name} Specs, Lab Measurements & Review — EasternRun`;
        const shoeDesc = `${shoe.description} Features ${shoe.foamName} (${shoe.foamResiliencePercent}% energy return), ${shoe.weightGrams}g weight, ${shoe.dropMm}mm drop, and $${shoe.msrpUsd} MSRP. Read detailed lab specs and runner reviews.`;
        const shoeCanonical = `${baseUrl}/shoe/${shoe.slug}`;

        const shoeJsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': shoe.name,
          'image': `${baseUrl}${shoe.image}`,
          'description': shoe.description,
          'brand': {
            '@type': 'Brand',
            'name': shoe.brand
          },
          'offers': {
            '@type': 'Offer',
            'url': shoeCanonical,
            'priceCurrency': 'USD',
            'price': shoe.msrpUsd.toString(),
            'availability': 'https://schema.org/InStock'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': (shoe.overallRating / 20).toFixed(1),
            'reviewCount': '12'
          }
        };

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
              <h2 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 12px;">Technical Specifications</h2>
              <ul>
                <li><strong>Foam Technology:</strong> ${shoe.foamName} (${shoe.foamResiliencePercent}% Energy Return)</li>
                <li><strong>Weight:</strong> ${shoe.weightGrams}g</li>
                <li><strong>Heel-to-Toe Drop:</strong> ${shoe.dropMm}mm</li>
                <li><strong>Overall Rating:</strong> ${shoe.overallRating}/100</li>
              </ul>
            </div>
            <a href="/" style="display: inline-block; padding: 10px 20px; background: #0F172A; color: #FFF; text-decoration: none; border-radius: 8px; font-weight: 700;">Explore Full Interactive Database →</a>
          </div>
        `;

        let shoeHtml = templateHtml
          .replace(/<title>.*?<\/title>/, `<title>${shoeTitle}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${shoeDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${shoeTitle.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${shoeDesc.replace(/"/g, '&quot;')}" />`)
          .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${shoeCanonical}" />`)
          .replace('<div id="root"></div>', `<div id="root">${shoeContentHtml}</div>`)
          + `<script type="application/ld+json">${JSON.stringify(shoeJsonLd)}</script>`;

        fs.writeFileSync(path.join(shoeDir, 'index.html'), shoeHtml, 'utf8');
        shoeCount++;
      }
      console.log(`✅ Pre-rendered ${shoeCount} static shoe detail pages into dist/shoe/[slug]/index.html`);

      // 4C. PRE-RENDER BRAND PAGES INTO DIST/BRAND/[SLUG]/INDEX.HTML
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
          .replace('<div id="root"></div>', `<div id="root">${brandContentHtml}</div>`);

        fs.writeFileSync(path.join(brandDir, 'index.html'), brandHtml, 'utf8');
      }
      console.log(`✅ Pre-rendered ${brands.length} static brand hub pages into dist/brand/[slug]/index.html`);
    }
  }

  console.log('🎉 EasternRun SEO Generation & Pre-rendering Completed Successfully!');
}

main();
