const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'shoes');

// Find files in 361 subdirectories
const findInFolder = (folderName) => {
  const p = path.join(__dirname, '..', '361', folderName);
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));
};

console.log('Furious Future 2.0:', findInFolder('Furious Future 2.0'));
console.log('Flame 5:', findInFolder('Flame 5'));
console.log('BIOSPEED 3.5 PRO:', findInFolder('BIOSPEED 3.5 PRO'));
console.log('Fierce 6:', findInFolder('Fierce 6'));
