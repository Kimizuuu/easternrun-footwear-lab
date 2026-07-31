const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '361');

const subdirs = fs.readdirSync(srcDir).filter(f => {
  return fs.statSync(path.join(srcDir, f)).isDirectory();
});

subdirs.forEach(folder => {
  const folderPath = path.join(srcDir, folder);
  const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));
  console.log(`${folder}: ${files.join(', ')}`);
});
