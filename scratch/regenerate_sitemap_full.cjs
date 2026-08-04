const fs = require('fs');
const path = require('path');

const baseUrl = 'https://easternrun.fit';
const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const shoesContent = fs.readFileSync(shoesDataPath, 'utf8');

function toCleanSlug(text) {
  return text
    .toLowerCase()
    .replace(/[°'"]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract shoe objects (id, brand, name)
const shoeRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*brand:\s*'([^']+)'/g;
let match;
const shoes = [];

while ((match = shoeRegex.exec(shoesContent)) !== null) {
  const id = match[1];
  const name = match[2];
  const brand = match[3];
  const slug = toCleanSlug(`${brand} ${name}`);
  shoes.push({ id, name, brand, slug });
}

console.log(`Found ${shoes.length} shoes for sitemap generation.`);

const currentDate = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

// 1. Individual Shoe Pages (All 54 Shoes)
shoes.forEach(shoe => {
  sitemap += `  <url>
    <loc>${baseUrl}/shoe/${shoe.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

// 2. Head-to-Head Comparison Pages (Flagship vs Flagship, Chinese vs Western)
const comparisonSet = new Set();
const comparisonPairs = [];

for (let i = 0; i < shoes.length; i++) {
  for (let j = i + 1; j < shoes.length; j++) {
    const s1 = shoes[i];
    const s2 = shoes[j];
    
    // Cross-brand comparisons or high-intent searches
    if (s1.brand !== s2.brand) {
      const compareSlug = `${s1.slug}-vs-${s2.slug}`;
      if (!comparisonSet.has(compareSlug)) {
        comparisonSet.add(compareSlug);
        comparisonPairs.push(compareSlug);
      }
    }
  }
}

// Include top 100 high-intent comparison URLs in sitemap
const selectedComparisons = comparisonPairs.slice(0, 100);

selectedComparisons.forEach(slug => {
  sitemap += `  <url>
    <loc>${baseUrl}/compare/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
});

sitemap += `</urlset>`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`✅ Successfully generated updated sitemap.xml with ${1 + shoes.length + selectedComparisons.length} clean URLs!`);
