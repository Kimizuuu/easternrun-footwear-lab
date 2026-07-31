const fs = require('fs');
const path = require('path');

const srcDir361 = path.join(__dirname, '..', '361');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'shoes');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const map361 = {};

const subdirs = fs.readdirSync(srcDir361).filter(f => {
  return fs.statSync(path.join(srcDir361, f)).isDirectory();
});

subdirs.forEach(folder => {
  const folderPath = path.join(srcDir361, folder);
  // Natural directory order
  const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));

  const gallery = [];

  files.forEach((file, index) => {
    const sanitizedFolder = folder.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newFileName = `361_${sanitizedFolder}_${index + 1}${path.extname(file)}`;
    const srcFile = path.join(folderPath, file);
    const destFile = path.join(targetDir, newFileName);

    fs.copyFileSync(srcFile, destFile);
    gallery.push(`/images/shoes/${newFileName}`);
  });

  map361[folder] = {
    thumbnail: gallery[0], // EXACT FIRST FILE IN FOLDER
    gallery: gallery
  };
});

console.log(JSON.stringify(map361, null, 2));
