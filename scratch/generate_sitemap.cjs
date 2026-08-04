const fs = require('fs');
const path = require('path');

const baseUrl = 'https://easternrun.fit';

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const shoesContent = fs.readFileSync(shoesDataPath, 'utf8');

// Extract shoe IDs
const idMatches = shoesContent.match(/id:\s*'([^']+)'/g) || [];
const shoeIds = idMatches.map(m => m.replace(/id:\s*'([^']+)'/, '$1'));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

shoeIds.forEach(id => {
  sitemap += `  <url>
    <loc>${baseUrl}/#shoe-${id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemap += `</urlset>`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${shoeIds.length + 1} URLs at ${sitemapPath}`);
