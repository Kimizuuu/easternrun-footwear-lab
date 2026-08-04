const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const adidasAngleGalleries = {
  'adidas_primex2strung': [
    '/images/western/adidas_primex2strung/1.webp',
    '/images/western/adidas_evosl/1.webp',
    '/images/western/adidas_evosl/2.webp',
    '/images/western/boston_13/1.webp'
  ],
  'adidas_takumisen10': [
    '/images/western/adidas_takumisen10/1.webp',
    '/images/western/adidas_evosl/1.webp',
    '/images/western/adidas_evosl/2.webp',
    '/images/western/boston_13/2.webp'
  ],
  'adidas_supernovarise': [
    '/images/western/adidas_supernovarise/1.webp',
    '/images/western/adidas_evosl/1.webp',
    '/images/western/adidas_evosl/2.webp',
    '/images/western/boston_13/3.webp'
  ],
  'adidas_adizerosl2': [
    '/images/western/adidas_adizerosl2/1.webp',
    '/images/western/adidas_evosl/1.webp',
    '/images/western/adidas_evosl/2.webp',
    '/images/western/boston_13/4.webp'
  ],
  'adidas_evosl': [
    '/images/western/adidas_evosl/1.webp',
    '/images/western/adidas_evosl/2.webp',
    '/images/western/boston_13/1.webp',
    '/images/western/boston_13/2.webp'
  ],
  'adidas_boston13': [
    '/images/western/boston_13/1.webp',
    '/images/western/boston_13/2.webp',
    '/images/western/boston_13/3.webp',
    '/images/western/boston_13/4.webp',
    '/images/western/boston_13/5.webp'
  ]
};

for (const [id, gallery] of Object.entries(adidasAngleGalleries)) {
  const formattedGallery = gallery.map(img => `'${img}'`).join(',\n      ');
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?galleryImages:\\s*\\[)([^\\]]+)(\\])`, 'g');
  content = content.replace(regex, `$1\n      ${formattedGallery}\n    $3`);
}

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log(`✅ Successfully updated multi-angle gallery images for all Adidas shoes in shoesData.ts!`);
