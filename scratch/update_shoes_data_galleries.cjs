const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '361');
const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');

const folderToGalleryMap = {};

const subdirs = fs.readdirSync(srcDir).filter(f => {
  return fs.statSync(path.join(srcDir, f)).isDirectory();
});

subdirs.forEach(folder => {
  const folderPath = path.join(srcDir, folder);
  const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));

  const gallery = [];

  files.forEach((file, index) => {
    const sanitizedFolder = folder.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newFileName = `/images/shoes/361_${sanitizedFolder}_${index + 1}${path.extname(file)}`;
    gallery.push(newFileName);
  });

  folderToGalleryMap[folder] = gallery;
});

console.log('361 Gallery Map Generated:');
console.log(folderToGalleryMap);
