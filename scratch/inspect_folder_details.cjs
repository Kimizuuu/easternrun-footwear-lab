const fs = require('fs');
const path = require('path');

const foldersToInspect = [
  { name: '361/Furious Future 2.0', path: path.join(__dirname, '..', '361', 'Furious Future 2.0') },
  { name: '361/Flame 5', path: path.join(__dirname, '..', '361', 'Flame 5') },
  { name: '361/Fierce 6', path: path.join(__dirname, '..', '361', 'Fierce 6') },
  { name: 'Anta', path: path.join(__dirname, '..', 'Anta') },
];

foldersToInspect.forEach(item => {
  if (fs.existsSync(item.path)) {
    const files = fs.readdirSync(item.path).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/i));
    console.log(`--- ${item.name} ---`);
    files.forEach((f, idx) => console.log(`  [${idx + 1}] ${f}`));
  }
});
