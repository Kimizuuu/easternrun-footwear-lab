const fs = require('fs');
const path = require('path');

const adidasDirs = [
  'adidas_primex2strung',
  'adidas_takumisen10',
  'adidas_supernovarise',
  'adidas_adizerosl2'
];

const westernDir = path.join(__dirname, '..', 'public', 'images', 'western');

// Ensure image directories exist
adidasDirs.forEach(dir => {
  const fullPath = path.join(westernDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

// Update shoesData.ts image paths
const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const imageUpdates = {
  'adidas_primex2strung': '/images/western/adidas_primex2strung/1.webp',
  'adidas_takumisen10': '/images/western/adidas_takumisen10/1.webp',
  'adidas_supernovarise': '/images/western/adidas_supernovarise/1.webp',
  'adidas_adizerosl2': '/images/western/adidas_adizerosl2/1.webp'
};

for (const [id, imgPath] of Object.entries(imageUpdates)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?image:\\s*')([^']+)(')`, 'g');
  content = content.replace(regex, `$1${imgPath}$3`);
  
  const galleryRegex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?galleryImages:\\s*\\[)([^\\]]+)(\\])`, 'g');
  const newGallery = `\n      '${imgPath}',\n      '${imgPath}'\n    `;
  content = content.replace(galleryRegex, `$1${newGallery}$3`);
}

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log(`✅ Successfully updated Adidas official image paths in shoesData.ts!`);
