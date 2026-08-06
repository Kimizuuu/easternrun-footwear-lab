const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

const matches = [...content.matchAll(/["']?category["']?:\s*['"]([^'"]+)['"]/g)];
const categories = new Set();
matches.forEach(m => categories.add(m[1]));

console.log('Unique categories found in shoesData.ts:');
console.log([...categories]);
