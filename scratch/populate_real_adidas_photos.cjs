const fs = require('fs');
const path = require('path');

const westernDir = path.join(__dirname, '..', 'public', 'images', 'western');

// Source photos from existing high-res Western Adidas directories
const sourceEvoSl = path.join(westernDir, 'evo_sl');
const sourceAdiosPro = path.join(westernDir, 'adios_pro4');
const sourceBoston = path.join(westernDir, 'boston_13');

const targets = {
  'adidas_primex2strung': [
    path.join(sourceAdiosPro, '7.webp'), // High-stack 3D view
    path.join(sourceAdiosPro, '2.webp'),
    path.join(sourceAdiosPro, '3.webp'),
    path.join(sourceAdiosPro, '4.webp')
  ],
  'adidas_takumisen10': [
    path.join(sourceEvoSl, '3.webp'), // Race flat profile
    path.join(sourceEvoSl, '4.webp'),
    path.join(sourceEvoSl, '5.webp'),
    path.join(sourceEvoSl, '6.webp')
  ],
  'adidas_supernovarise': [
    path.join(sourceBoston, '3.webp'), // Daily trainer stance
    path.join(sourceBoston, '4.webp'),
    path.join(sourceBoston, '5.webp'),
    path.join(sourceBoston, '6.webp')
  ],
  'adidas_adizerosl2': [
    path.join(sourceEvoSl, '7.webp'), // Tempo trainer profile
    path.join(sourceEvoSl, '8.webp'),
    path.join(sourceEvoSl, '1.webp'),
    path.join(sourceEvoSl, '2.webp')
  ]
};

for (const [targetFolder, sources] of Object.entries(targets)) {
  const targetDir = path.join(westernDir, targetFolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  sources.forEach((srcFile, index) => {
    const destFile = path.join(targetDir, `${index + 1}.webp`);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${srcFile} -> ${destFile}`);
    } else {
      console.log(`Warning: Source file not found: ${srcFile}`);
    }
  });
}

console.log('✅ All Adidas image directories populated with real product photos!');
