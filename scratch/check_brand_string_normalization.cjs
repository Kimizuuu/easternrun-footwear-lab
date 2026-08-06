const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

const shoeMatches = [...content.matchAll(/["']?id["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?brand["']?:\s*['"]([^'"]+)['"]/g)];

const brandsFound = new Set();
shoeMatches.forEach(m => brandsFound.add(m[3]));

console.log('Unique brand values found in shoesData.ts:');
console.log([...brandsFound]);
