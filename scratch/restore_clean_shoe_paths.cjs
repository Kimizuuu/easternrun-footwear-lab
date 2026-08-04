const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// 1. Prime X 2 Strung -> Point to clean high-res Adizero race photo
content = content.replace(
  /(\{\s*id:\s*'adidas_primex2strung'[\s\S]*?image:\s*')([^']+)('[\s\S]*?galleryImages:\s*\[)([\s\S]*?)(\])/,
  (match, p1, oldImg, p3, oldGallery, p5) => {
    const newImg = '/images/western/adios_pro4/7.webp';
    const newGallery = `
      '/images/western/adios_pro4/7.webp',
      '/images/western/adios_pro4/8.webp',
      '/images/western/adios_pro4/5.webp',
      '/images/western/adios_pro4/1.webp'
    `;
    return `${p1}${newImg}${p3}${newGallery}${p5}`;
  }
);

// 2. Takumi Sen 10 -> Point to clean high-res Adizero speed photo
content = content.replace(
  /(\{\s*id:\s*'adidas_takumisen10'[\s\S]*?image:\s*')([^']+)('[\s\S]*?galleryImages:\s*\[)([\s\S]*?)(\])/,
  (match, p1, oldImg, p3, oldGallery, p5) => {
    const newImg = '/images/western/evo_sl/3.webp';
    const newGallery = `
      '/images/western/evo_sl/3.webp',
      '/images/western/evo_sl/4.webp',
      '/images/western/evo_sl/5.webp',
      '/images/western/evo_sl/1.webp'
    `;
    return `${p1}${newImg}${p3}${newGallery}${p5}`;
  }
);

// 3. Adizero SL 2 -> Return to previous clean Adizero photo
content = content.replace(
  /(\{\s*id:\s*'adidas_adizerosl2'[\s\S]*?image:\s*')([^']+)('[\s\S]*?galleryImages:\s*\[)([\s\S]*?)(\])/,
  (match, p1, oldImg, p3, oldGallery, p5) => {
    const newImg = '/images/western/evo_sl/7.webp';
    const newGallery = `
      '/images/western/evo_sl/7.webp',
      '/images/western/evo_sl/8.webp',
      '/images/western/evo_sl/2.webp',
      '/images/western/evo_sl/1.webp'
    `;
    return `${p1}${newImg}${p3}${newGallery}${p5}`;
  }
);

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('✅ Successfully restored clean working shoe images!');
