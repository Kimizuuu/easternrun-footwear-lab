const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

// Helper to convert to clean SEO slug
function toCleanSlug(text) {
  return text
    .toLowerCase()
    .replace(/[°'"]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract all shoes
const shoeMatches = [...content.matchAll(/["']?id["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?brand["']?:\s*['"]([^'"]+)['"]/g)];

const today = new Date().toISOString().split('T')[0];

const urls = [];

// 1. Homepage
urls.push({
  loc: 'https://easternrun.fit/',
  lastmod: today,
  changefreq: 'daily',
  priority: '1.0'
});

// 2. Brand Landing Hubs (18 Brands)
const brandSlugs = [
  'li-ning', 'anta', 'xtep', '361-degrees', 'qiaodan',
  'nike', 'adidas', 'saucony', 'asics', 'mizuno',
  'new-balance', 'hoka', 'brooks', 'skechers',
  'salomon', 'on-running', 'altra', 'la-sportiva'
];

brandSlugs.forEach(b => {
  urls.push({
    loc: `https://easternrun.fit/brand/${b}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9'
  });
});

// 3. Category Landing Hubs (4 Categories)
const categorySlugs = [
  'marathon-super-shoes',
  'daily-trainers',
  'tempo-and-race',
  'max-cushion',
  'mountain-and-trail',
  'walking',
  'running',
  'budget-running-shoes'
];

categorySlugs.forEach(c => {
  urls.push({
    loc: `https://easternrun.fit/best/${c}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9'
  });
});

// 4. Individual Shoe Detail Pages (92 Shoes)
const processedShoeSlugs = new Set();

shoeMatches.forEach(m => {
  const [_, id, name, brand] = m;
  const slug = toCleanSlug(`${brand} ${name}`);
  if (!processedShoeSlugs.has(slug)) {
    processedShoeSlugs.add(slug);
    urls.push({
      loc: `https://easternrun.fit/shoe/${slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

// Build XML string
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(u => {
  xml += `  <url>\n`;
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`✅ Successfully generated clean sitemap.xml with ${urls.length} URLs!`);
