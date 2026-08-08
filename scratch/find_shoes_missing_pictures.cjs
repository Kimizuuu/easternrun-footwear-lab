const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

const publicDir = path.join(__dirname, '..', 'public');

// Parse shoe blocks
const shoeMatches = [...content.matchAll(/["']?id["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?brand["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?image["']?:\s*['"]([^'"]+)['"]/g)];

console.log(`Auditing ${shoeMatches.length} total shoes in database...\n`);

const missingPictures = [];
const placeholderPictures = [];
const validPictures = [];

shoeMatches.forEach(m => {
  const [_, id, name, brand, imagePath] = m;
  
  if (imagePath.includes('fallback-shoe.jpg')) {
    placeholderPictures.push({ id, name, brand, imagePath, reason: 'Using default fallback-shoe.jpg placeholder' });
  } else {
    // Check if physical file exists in public/
    const diskPath = path.join(publicDir, imagePath.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) {
      missingPictures.push({ id, name, brand, imagePath, reason: `File does not exist at public${imagePath}` });
    } else {
      validPictures.push({ id, name, brand, imagePath });
    }
  }
});

console.log('==================================================');
console.log(`SUMMARY AUDIT RESULT:`);
console.log(`- Total Shoes Audited: ${shoeMatches.length}`);
console.log(`- Shoes with Valid Real Pictures: ${validPictures.length}`);
console.log(`- Shoes using Fallback Placeholder: ${placeholderPictures.length}`);
console.log(`- Shoes with Missing Physical Image Files: ${missingPictures.length}`);
console.log('==================================================\n');

if (placeholderPictures.length > 0) {
  console.log(`📌 SHOES USING FALLBACK PLACEHOLDER (${placeholderPictures.length}):`);
  placeholderPictures.forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.brand}] ${s.name} (id: ${s.id})`);
  });
  console.log('\n');
}

if (missingPictures.length > 0) {
  console.log(`📌 SHOES WITH MISSING IMAGE FILES ON DISK (${missingPictures.length}):`);
  missingPictures.forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.brand}] ${s.name} (id: ${s.id}) -> ${s.imagePath}`);
  });
}
