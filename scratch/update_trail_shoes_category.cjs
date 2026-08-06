const fs = require('fs');
const path = require('path');

const trailShoeIds = [
  'salomon_speedcross6',
  'hoka_speedgoat6',
  'nike_pegasustrail5',
  'altra_lonepeak8'
];

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

trailShoeIds.forEach(id => {
  const reg = new RegExp(`(["']?id["']?:\\s*['"]${id}['"][\\s\\S]*?["']?category["']?:\\s*['"])[^'"]+(['"])`);
  if (content.match(reg)) {
    content = content.replace(reg, `$1Mountain & Trail$2`);
    console.log(`✅ Set category of ${id} to Mountain & Trail`);
  }

  const domReg = new RegExp(`(["']?id["']?:\\s*['"]${id}['"][\\s\\S]*?["']?dominantSector["']?:\\s*['"])[^'"]+(['"])`);
  if (content.match(domReg)) {
    content = content.replace(domReg, `$1Mountain & Trail Climbing$2`);
    console.log(`✅ Set dominantSector of ${id} to Mountain & Trail Climbing`);
  }
});

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('Updated trail shoes category!');
