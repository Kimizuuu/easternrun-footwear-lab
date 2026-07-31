const fs = require('fs');
const path = require('path');

const userUploadedDir = path.join('C:', 'Users', 'manib', '.gemini', 'antigravity', 'brain', '556e34b7-8a03-49dc-a2d0-fd20d7402963', '.user_uploaded');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'shoes');

const copies = [
  { src: 'media__1785471843081.png', dest: 'thumb_furious_future_2_0.png' },
  { src: 'media__1785471881655.png', dest: 'thumb_flame_5.png' },
  { src: 'media__1785471903805.png', dest: 'thumb_biospeed_3_5_pro.png' },
  { src: 'media__1785471942635.png', dest: 'thumb_fierce_6.png' },
];

copies.forEach(item => {
  const srcPath = path.join(userUploadedDir, item.src);
  const destPath = path.join(targetDir, item.dest);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${item.src} -> ${item.dest}`);
});
