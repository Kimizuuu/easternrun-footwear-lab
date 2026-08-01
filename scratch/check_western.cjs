const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/data/shoesData.ts'), 'utf8');
const regex = /['"](\/images\/western\/[^'"]+)['"]/g;
let match;
let missing = 0;
let total = 0;

while ((match = regex.exec(content)) !== null) {
  total++;
  const relPath = match[1];
  const fullPath = path.join(__dirname, '../public', relPath);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    missing++;
    console.log('❌ MISSING:', relPath);
  } else {
    console.log('✅ OK:', relPath);
  }
}

console.log(`\nSummary: ${total - missing}/${total} Western images verified.`);
