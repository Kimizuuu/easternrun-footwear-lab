const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const xmlContent = fs.readFileSync(sitemapPath, 'utf8');

console.log('Validating sitemap.xml size:', xmlContent.length, 'bytes');

// Check opening and closing tags
if (!xmlContent.startsWith('<?xml')) {
  console.log('❌ ERROR: Missing <?xml header!');
}

if (!xmlContent.includes('<urlset') || !xmlContent.endsWith('</urlset>\n') && !xmlContent.endsWith('</urlset>')) {
  console.log('❌ ERROR: Missing or malformed <urlset> closing tag!');
}

// Check for unescaped & symbols
const lines = xmlContent.split('\n');
let errors = 0;

lines.forEach((line, i) => {
  // Check if & is present but not part of &amp;, &lt;, &gt;, &quot;, &apos;
  const match = line.match(/&(?!amp;|lt;|gt;|quot;|apos;)/g);
  if (match) {
    console.log(`❌ Line ${i + 1}: Unescaped '&' found: ${line.trim()}`);
    errors++;
  }

  // Check for unescaped < or > inside text
  if (line.includes('<loc>') && line.includes('</loc>')) {
    const locContent = line.match(/<loc>(.*?)<\/loc>/)[1];
    if (locContent.includes(' ') || locContent.includes('&') && !locContent.includes('&amp;')) {
      console.log(`❌ Line ${i + 1}: Malformed URL in <loc>: ${locContent}`);
      errors++;
    }
  }
});

if (errors === 0) {
  console.log('✅ No XML syntax or unescaped character errors found in sitemap.xml!');
} else {
  console.log(`❌ Found ${errors} XML syntax errors!`);
}
