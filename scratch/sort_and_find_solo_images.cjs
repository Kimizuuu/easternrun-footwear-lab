const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '361');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'shoes');

const subdirs = fs.readdirSync(srcDir).filter(f => {
  return fs.statSync(path.join(srcDir, f)).isDirectory();
});

const folderMap = {};

subdirs.forEach(folder => {
  const folderPath = path.join(srcDir, folder);
  let files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));

  // Sort files so that file containing '_1.' or ending in '1.webp' or '_1_' is placed FIRST!
  files.sort((a, b) => {
    const isA1 = a.includes('_1.') || a.includes('_1_') || a.endsWith('1.webp') || a.toLowerCase().includes('1');
    const isB1 = b.includes('_1.') || b.includes('_1_') || b.endsWith('1.webp') || b.toLowerCase().includes('1');
    if (isA1 && !isB1) return -1;
    if (!isA1 && isB1) return 1;
    return a.localeCompare(b);
  });

  const sanitizedFolder = folder.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const gallery = [];

  files.forEach((file, index) => {
    const newFileName = `361_${sanitizedFolder}_${index + 1}${path.extname(file)}`;
    const srcFile = path.join(folderPath, file);
    const destFile = path.join(targetDir, newFileName);

    fs.copyFileSync(srcFile, destFile);
    gallery.push(`/images/shoes/${newFileName}`);
  });

  folderMap[folder] = {
    thumbnail: gallery[0],
    gallery: gallery
  };
});

console.log(JSON.stringify(folderMap, null, 2));
