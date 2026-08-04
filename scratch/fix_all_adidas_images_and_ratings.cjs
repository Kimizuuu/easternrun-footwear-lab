const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const adidasConfig = {
  'adidas_primex2strung': {
    rating: 93,
    img: '/images/western/adidas_primex2strung/1.webp',
    gallery: [
      '/images/western/adidas_primex2strung/1.webp',
      '/images/western/adidas_primex2strung/2.webp',
      '/images/western/adidas_primex2strung/3.webp',
      '/images/western/adidas_primex2strung/4.webp'
    ]
  },
  'adidas_adiospro4': {
    rating: 92,
    img: '/images/western/adios_pro4/1.webp',
    gallery: [
      '/images/western/adios_pro4/1.webp',
      '/images/western/adios_pro4/2.webp',
      '/images/western/adios_pro4/3.webp',
      '/images/western/adios_pro4/4.webp'
    ]
  },
  'adidas_takumisen10': {
    rating: 90,
    img: '/images/western/adidas_takumisen10/1.webp',
    gallery: [
      '/images/western/adidas_takumisen10/1.webp',
      '/images/western/adidas_takumisen10/2.webp',
      '/images/western/adidas_takumisen10/3.webp',
      '/images/western/adidas_takumisen10/4.webp'
    ]
  },
  'adidas_boston13': {
    rating: 89,
    img: '/images/western/boston_13/1.webp',
    gallery: [
      '/images/western/boston_13/1.webp',
      '/images/western/boston_13/2.webp',
      '/images/western/boston_13/3.webp',
      '/images/western/boston_13/4.webp'
    ]
  },
  'adidas_evosl': {
    rating: 88,
    img: '/images/western/evo_sl/1.webp',
    gallery: [
      '/images/western/evo_sl/1.webp',
      '/images/western/evo_sl/2.webp',
      '/images/western/evo_sl/3.webp',
      '/images/western/evo_sl/4.webp'
    ]
  },
  'adidas_supernovarise': {
    rating: 86,
    img: '/images/western/adidas_supernovarise/1.webp',
    gallery: [
      '/images/western/adidas_supernovarise/1.webp',
      '/images/western/adidas_supernovarise/2.webp',
      '/images/western/adidas_supernovarise/3.webp',
      '/images/western/adidas_supernovarise/4.webp'
    ]
  },
  'adidas_adizerosl2': {
    rating: 85,
    img: '/images/western/adidas_adizerosl2/1.webp',
    gallery: [
      '/images/western/adidas_adizerosl2/1.webp',
      '/images/western/adidas_adizerosl2/2.webp',
      '/images/western/adidas_adizerosl2/3.webp',
      '/images/western/adidas_adizerosl2/4.webp'
    ]
  }
};

let count = 0;
for (const [id, cfg] of Object.entries(adidasConfig)) {
  const shoeBlockRegex = new RegExp(`(\\{[\\s\\S]*?["']id["']:\\s*['"]${id}['"][\\s\\S]*?\\})`, 'g');
  content = content.replace(shoeBlockRegex, (block) => {
    count++;
    let updatedBlock = block.replace(/(["']overallRating["']:\s*)\d+/, `$1${cfg.rating}`);
    updatedBlock = updatedBlock.replace(/(["']image["']:\s*['"])[^'"]+(['"])/, `$1${cfg.img}$2`);
    const galleryString = cfg.gallery.map(g => `'${g}'`).join(',\n      ');
    updatedBlock = updatedBlock.replace(/(["']galleryImages["']:\s*\[)[^\]]+(\])/, `$1\n      ${galleryString}\n    $2`);
    return updatedBlock;
  });
}

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log(`✅ Successfully updated ${count} Adidas shoes with exact ratings & images!`);
