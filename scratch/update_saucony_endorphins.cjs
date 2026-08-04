const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'saucony_endorphinelite2': 91, // 88 + 3 = 91
  'saucony_endorphinpro4': 90,   // 87 + 3 = 90
  'saucony_endorphinspeed4': 89  // 86 + 3 = 89
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
console.log(`✅ Bumped ratings +3 across all Saucony Endorphin models! (${count} shoes updated)`);
