const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '361');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'shoes');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const map = {};

const subdirs = fs.readdirSync(srcDir).filter(f => {
  return fs.statSync(path.join(srcDir, f)).isDirectory();
});

subdirs.forEach(folder => {
  const folderPath = path.join(srcDir, folder);
  const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));

  const copiedFiles = [];

  files.forEach((file, index) => {
    const sanitizedFolder = folder.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newFileName = `361_${sanitizedFolder}_${index + 1}${path.extname(file)}`;
    const srcFile = path.join(folderPath, file);
    const destFile = path.join(targetDir, newFileName);

    fs.copyFileSync(srcFile, destFile);
    copiedFiles.push(`/images/shoes/${newFileName}`);
  });

  map[folder] = copiedFiles;
});

console.log(JSON.stringify(map, null, 2));
