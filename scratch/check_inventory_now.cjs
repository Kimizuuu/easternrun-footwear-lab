const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

// Match every id, name, brand in shoesData
const shoeMatches = [...content.matchAll(/["']?id["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?brand["']?:\s*['"]([^'"]+)['"]/g)];

const byBrand = {};
const allIds = new Set();
let duplicates = 0;

for (const m of shoeMatches) {
  const [_, id, name, brand] = m;
  if (allIds.has(id)) {
    console.log(`⚠️ DUPLICATE SHOE ID: ${id}`);
    duplicates++;
  }
  allIds.add(id);

  if (!byBrand[brand]) byBrand[brand] = [];
  byBrand[brand].push({ id, name });
}

console.log('========================================');
console.log(`Total Valid Shoe Objects Parsed: ${shoeMatches.length}`);
console.log(`Unique Shoe IDs: ${allIds.size}`);
console.log(`Duplicates: ${duplicates}`);
console.log('========================================');

for (const [brand, list] of Object.entries(byBrand)) {
  console.log(`\n📌 ${brand} (${list.length} shoes):`);
  list.forEach(s => console.log(`   - [${s.id}] ${s.name}`));
}
