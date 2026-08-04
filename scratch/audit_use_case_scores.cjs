const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
const content = fs.readFileSync(file, 'utf8');

const shoeRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*brand:\s*'([^']+)'/g;
let match;
const shoes = [];

while ((match = shoeRegex.exec(content)) !== null) {
  shoes.push({ id: match[1], name: match[2], brand: match[3] });
}

console.log(`Total shoes found in database: ${shoes.length}`);
console.log(shoes.map(s => `${s.brand} - ${s.name} (${s.id})`).join('\n'));
