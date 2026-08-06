const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

// Match every shoe object block in shoesData
const shoeBlocks = content.split(/\n\s*\{\s*\n\s*["']?id["']?:/g);

console.log(`Total blocks split: ${shoeBlocks.length}`);

let missingImages = 0;
let fallbackImages = 0;
let missingCategory = 0;
let missingBrand = 0;

const auditedShoes = [];

shoeBlocks.forEach((block, idx) => {
  if (idx === 0) return; // Header before first shoe
  const fullBlock = '{\n    id:' + block;

  const idMatch = fullBlock.match(/["']?id["']?:\s*['"]([^'"]+)['"]/);
  const nameMatch = fullBlock.match(/["']?name["']?:\s*['"]([^'"]+)['"]/);
  const brandMatch = fullBlock.match(/["']?brand["']?:\s*['"]([^'"]+)['"]/);
  const categoryMatch = fullBlock.match(/["']?category["']?:\s*['"]([^'"]+)['"]/);
  const imageMatch = fullBlock.match(/["']?image["']?:\s*['"]([^'"]+)['"]/);

  const id = idMatch ? idMatch[1] : `UNKNOWN_${idx}`;
  const name = nameMatch ? nameMatch[1] : 'UNKNOWN_NAME';
  const brand = brandMatch ? brandMatch[1] : 'UNKNOWN_BRAND';
  const category = categoryMatch ? categoryMatch[1] : 'UNKNOWN_CATEGORY';
  const image = imageMatch ? imageMatch[1] : '';

  if (!image || image.trim() === '') {
    console.log(`❌ Missing image for [${id}] ${name}`);
    missingImages++;
  } else if (image.includes('fallback-shoe.jpg')) {
    console.log(`⚠️ Fallback placeholder image used for [${id}] ${name}`);
    fallbackImages++;
  }

  if (!category || category === 'UNKNOWN_CATEGORY') missingCategory++;
  if (!brand || brand === 'UNKNOWN_BRAND') missingBrand++;

  auditedShoes.push({ id, name, brand, category, image });
});

console.log('\n========================================');
console.log(`Audited Total Shoes: ${auditedShoes.length}`);
console.log(`Missing Image URLs: ${missingImages}`);
console.log(`Fallback Placeholder Images: ${fallbackImages}`);
console.log(`Missing Categories: ${missingCategory}`);
console.log(`Missing Brands: ${missingBrand}`);
console.log('========================================');
