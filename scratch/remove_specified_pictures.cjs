const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const targetIds = ['adidas_primex2strung', 'adidas_takumisen10', 'adidas_adizerosl2'];

for (const id of targetIds) {
  const pattern = new RegExp(`(\\{[\\s\\S]*?id:\\s*'${id}'[\\s\\S]*?image:\\s*')[^']+'([\\s\\S]*?galleryImages:\\s*\\[)[^\\]]+\\]`, 'g');
  content = content.replace(pattern, (match, p1, p2) => {
    return `${p1}/images/fallback-shoe.jpg'${p2}\n      '/images/fallback-shoe.jpg'\n    ]`;
  });
}

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('✅ Successfully removed picture paths for Prime X 2 Strung, Takumi Sen 10, and Adizero SL 2!');
