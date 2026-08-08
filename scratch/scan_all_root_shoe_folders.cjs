const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const otherFolders = [
  'Famous International References Shoes',
  '361',
  'Anta',
  'Li ning',
  'Qiaodan'
];

otherFolders.forEach(folderName => {
  const folderPath = path.join(rootDir, folderName);
  if (fs.existsSync(folderPath)) {
    console.log(`\n========================================`);
    console.log(`Folder: ${folderName}`);
    const items = fs.readdirSync(folderPath);
    console.log(`Subfolders/Files (${items.length}):`, items.slice(0, 20));
  }
});
