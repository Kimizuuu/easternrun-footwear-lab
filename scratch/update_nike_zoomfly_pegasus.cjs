const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'nike_zoomfly6': 89,
  'nike_pegasus41': 86
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
console.log(`✅ Updated Zoom Fly 6 to 89 and Pegasus 41 to 86! (${count} shoes updated)`);
