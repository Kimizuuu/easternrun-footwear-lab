const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'asics_gelkayano31': 87,
  'adidas_boston13': 89
};

let count = 0;
for (const [id, rating] of Object.entries(updates)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?overallRating:\\s*)(\\d+)`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${rating}`);
    count++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ Updated ASICS GEL-Kayano 31 to 87 and Adidas Boston 13 to 89! (${count} shoes updated)`);
