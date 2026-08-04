const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const bumps = {
  'nike_vaporfly3': 91,       // 89 + 2 = 91
  'nike_alphafly3': 91,       // 90 + 1 = 91
  'adidas_evosl': 92,         // 89 + 3 = 92
  'adidas_adiospro4': 91      // 89 + 2 = 91
};

let count = 0;
for (const [id, newRating] of Object.entries(bumps)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?overallRating:\\s*)(\\d+)`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${newRating}`);
    count++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ Bumped ratings for ${count} shoes successfully!`);
