const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const adidasTargetRatings = {
  'adidas_primex2strung': 93,
  'adidas_adiospro4': 92,
  'adidas_takumisen10': 90,
  'adidas_boston13': 89,
  'adidas_evosl': 88,
  'adidas_supernovarise': 86,
  'adidas_adizerosl2': 85
};

const adidasTargetImages = {
  'adidas_primex2strung': '/images/western/adidas_primex2strung/1.webp',
  'adidas_adiospro4': '/images/western/adios_pro4/1.webp',
  'adidas_takumisen10': '/images/western/adidas_takumisen10/1.webp',
  'adidas_boston13': '/images/western/boston_13/1.webp',
  'adidas_evosl': '/images/western/evo_sl/1.webp',
  'adidas_supernovarise': '/images/western/adidas_supernovarise/1.webp',
  'adidas_adizerosl2': '/images/western/adidas_adizerosl2/1.webp'
};

for (const [id, rating] of Object.entries(adidasTargetRatings)) {
  const img = adidasTargetImages[id];
  // Match single or double quote id block
  const pattern = new RegExp(`(\\{[\\s\\S]*?["']id["']:\\s*['"]${id}['"][\\s\\S]*?\\})`, 'g');
  content = content.replace(pattern, (block) => {
    let newBlock = block.replace(/(["']overallRating["']:\s*)\d+/, `$1${rating}`);
    newBlock = newBlock.replace(/(["']image["']:\s*['"])[^'"]+(['"])/, `$1${img}$2`);
    return newBlock;
  });
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Cleanly updated all Adidas ratings and images in shoesData.ts!');
