const fs = require('fs');
const path = require('path');

// Read the Zappos product detail page HTML and find all Amazon media image IDs
// that are specifically for the product (not navigation/ads)
const contentFile = path.join('C:\\Users\\manib\\.gemini\\antigravity\\brain\\556e34b7-8a03-49dc-a2d0-fd20d7402963\\.system_generated\\steps\\3231\\content.md');
const body = fs.readFileSync(contentFile, 'utf8');

// Look for the __INITIAL_STATE__ JSON and extract product image data
// The product detail page should have image URLs in the "product" section
const stateMatch = body.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*)/s);
if (stateMatch) {
  // Find the state JSON - it's huge, let's look for specific patterns
  const stateStr = stateMatch[1];
  
  // Look for "defaultImageUrl" pattern
  const defaultImgMatch = stateStr.match(/"defaultImageUrl"\s*:\s*"([^"]+)"/);
  if (defaultImgMatch) {
    console.log('defaultImageUrl:', defaultImgMatch[1]);
  }
  
  // Look for "images" array in product data
  const imagesMatch = stateStr.match(/"images"\s*:\s*\[((?:[^\]]*"[^"]*"[^\]]*)*)\]/);
  if (imagesMatch) {
    console.log('images array found, length:', imagesMatch[1].length);
    // Extract URLs from images array
    const urls = [...imagesMatch[1].matchAll(/"(https?:[^"]+)"/g)].map(m => m[1]);
    console.log('Image URLs found:', urls.length);
    urls.forEach((u, i) => console.log(`  ${i}: ${u}`));
  }
  
  // Look for product image IDs in the state  
  // Zappos typically stores images as "imageId" fields
  const imageIdMatches = [...stateStr.matchAll(/"imageId"\s*:\s*"([^"]+)"/g)];
  console.log('\nimageId fields found:', imageIdMatches.length);
  imageIdMatches.slice(0, 10).forEach((m, i) => console.log(`  ${i}: ${m[1]}`));
  
  // Also look for defaultProductUrl
  const defaultProdMatch = stateStr.match(/"defaultProductUrl"\s*:\s*"([^"]+)"/);
  if (defaultProdMatch) {
    console.log('\ndefaultProductUrl:', defaultProdMatch[1]);
  }
  
  // Look for the product detail section
  const detailMatch = stateStr.match(/"detail"\s*:\s*\{/);
  if (detailMatch) {
    // Get a chunk after "detail":
    const detailChunk = stateStr.substring(detailMatch.index, detailMatch.index + 5000);
    // Find image references in this chunk
    const imgRefs = [...detailChunk.matchAll(/https?:\\\/\\\/m\.media-amazon\.com[^"\\]*/g)];
    console.log('\nProduct detail image refs:', imgRefs.length);
    imgRefs.forEach((m, i) => console.log(`  ${i}: ${m[0].replace(/\\\//g, '/')}`));
    
    // Also find raw image IDs
    const rawIds = [...detailChunk.matchAll(/([A-Za-z0-9]{10,12}L)\._/g)];
    console.log('\nProduct detail image IDs:', rawIds.length);
    rawIds.forEach((m, i) => console.log(`  ${i}: ${m[1]}`));
  }
  
  // Search for "styles" which contains per-style image data
  const stylesMatch = stateStr.match(/"styles"\s*:\s*\[/);
  if (stylesMatch) {
    const stylesChunk = stateStr.substring(stylesMatch.index, stylesMatch.index + 10000);
    // Extract image URLs from styles
    const styleImgs = [...stylesChunk.matchAll(/https?:\\\/\\\/m\.media-amazon\.com\\\/images\\\/I\\\/([A-Za-z0-9_+%-]+)\./g)];
    console.log('\nStyles section image IDs:', styleImgs.length);
    const uniqueIds = [...new Set(styleImgs.map(m => m[1]))];
    uniqueIds.slice(0, 15).forEach((id, i) => console.log(`  ${i}: ${id}`));
  }
}
