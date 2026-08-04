const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const distinctMappings = {
  'adidas_primex2strung': {
    image: '/images/western/adios_pro4/7.webp',
    gallery: [
      '/images/western/adios_pro4/7.webp',
      '/images/western/adios_pro4/8.webp',
      '/images/western/adios_pro4/5.webp'
    ]
  },
  'adidas_takumisen10': {
    image: '/images/western/evo_sl/3.webp',
    gallery: [
      '/images/western/evo_sl/3.webp',
      '/images/western/evo_sl/4.webp',
      '/images/western/evo_sl/5.webp'
    ]
  },
  'adidas_supernovarise': {
    image: '/images/western/boston_13/3.webp',
    gallery: [
      '/images/western/boston_13/3.webp',
      '/images/western/boston_13/4.webp',
      '/images/western/boston_13/5.webp'
    ]
  },
  'adidas_adizerosl2': {
    image: '/images/western/evo_sl/7.webp',
    gallery: [
      '/images/western/evo_sl/7.webp',
      '/images/western/evo_sl/8.webp',
      '/images/western/evo_sl/2.webp'
    ]
  }
};

for (const [id, cfg] of Object.entries(distinctMappings)) {
  const pattern = new RegExp(`(\\{[\\s\\S]*?["']id["']:\\s*['"]${id}['"][\\s\\S]*?\\})`, 'g');
  content = content.replace(pattern, (block) => {
    let newBlock = block.replace(/(["']image["']:\s*['"])[^'"]+(['"])/, `$1${cfg.image}$2`);
    const galleryStr = cfg.gallery.map(g => `'${g}'`).join(',\n      ');
    newBlock = newBlock.replace(/(["']galleryImages["']:\s*\[)[^\]]+(\])/, `$1\n      ${galleryStr}\n    $2`);
    return newBlock;
  });
}

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('✅ Assigned distinct repository photos for all Adidas models!');
