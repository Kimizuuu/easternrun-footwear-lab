const fs = require('fs');
const path = require('path');

const userUploadedDir = path.join('C:', 'Users', 'manib', '.gemini', 'antigravity', 'brain', '556e34b7-8a03-49dc-a2d0-fd20d7402963', '.user_uploaded');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'landing');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const copies = [
  { src: 'media__1785512107317.jpg', dest: 'landing_runner_sunset.jpg' },
  { src: 'media__1785512283012.jpg', dest: 'landing_shoe_stride.jpg' },
  { src: 'media__1785512440579.jpg', dest: 'landing_track_start.jpg' },
];

copies.forEach(item => {
  const srcPath = path.join(userUploadedDir, item.src);
  const destPath = path.join(targetDir, item.dest);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${item.src} -> ${item.dest}`);
});
