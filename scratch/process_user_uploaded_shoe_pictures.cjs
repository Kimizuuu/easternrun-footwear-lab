const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicImagesDir = path.join(rootDir, 'public', 'images');

const folderToSearch = path.join(rootDir, 'Missing shoers');

console.log('Scanning Missing shoers folder...');

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      if (/\.(png|jpe?g|webp|avif|gif)$/i.test(file)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const allImageFiles = getFilesRecursively(folderToSearch);
console.log(`Found ${allImageFiles.length} image files inside Missing shoers:`);

allImageFiles.forEach(f => {
  const rel = path.relative(folderToSearch, f);
  console.log(` - ${rel}`);
});
