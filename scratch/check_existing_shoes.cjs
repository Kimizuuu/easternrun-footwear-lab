const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

const shoeMatches = [...content.matchAll(/["']?id["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?brand["']?:\s*['"]([^'"]+)['"]/g)];
const byBrand = {};

for (const m of shoeMatches) {
  const [_, id, name, brand] = m;
  if (!byBrand[brand]) byBrand[brand] = [];
  byBrand[brand].push({ id, name });
}

console.log('Current Full Shoe Inventory by Brand:');
let total = 0;
for (const [brand, list] of Object.entries(byBrand)) {
  total += list.length;
  console.log(`\n📌 ${brand} (${list.length} shoes):`);
  list.forEach(s => console.log(`   - [${s.id}] ${s.name}`));
}
console.log(`\n🎉 Total Shoes in Database: ${total}`);
