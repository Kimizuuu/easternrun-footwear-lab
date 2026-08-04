const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'three61-flame-5-future': 90, // 88 + 2 = 90
  'three61-flame-5-mix': 87,    // 85 + 2 = 87
  'three61-flame-5': 86         // 84 + 2 = 86
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
console.log(`✅ Bumped ratings +2 across 361° Flame 5 models! (${count} shoes updated)`);
