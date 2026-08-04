const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\manib\\.gemini\\antigravity\\brain\\556e34b7-8a03-49dc-a2d0-fd20d7402963';
const publicWestern = path.join(__dirname, '..', 'public', 'images', 'western');

const mappings = {
  'adidas_primex2strung': path.join(brainDir, 'adidas_primex2strung_official_1785848645562.jpg'),
  'adidas_takumisen10': path.join(brainDir, 'adidas_takumisen10_official_1785848658942.jpg'),
  'adidas_supernovarise': path.join(brainDir, 'adidas_supernovarise_official_1785848671627.jpg'),
  'adidas_adizerosl2': path.join(brainDir, 'adidas_adizerosl2_official_1785848686940.jpg')
};

for (const [folder, srcPath] of Object.entries(mappings)) {
  const destFolder = path.join(publicWestern, folder);
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
  }
  const destFile = path.join(destFolder, '1.webp');
  fs.copyFileSync(srcPath, destFile);
  console.log(`Copied ${srcPath} -> ${destFile}`);
}

console.log('✅ Successfully copied generated images into web app public directories!');
