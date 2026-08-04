const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'nike_alphafly3': 93,
  'lining-feidian-6-ultra': 92
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
console.log(`✅ Updated Alphafly 3 to 93 and Li-Ning Feidian 6.0 Ultra to 92! (${count} shoes updated)`);
