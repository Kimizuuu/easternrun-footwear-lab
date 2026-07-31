const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const srcDir = path.join(__dirname, '..', 'src');

// Regex to match emojis
const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|★/gu;

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');

    let original = content;

    // Remove emojis
    content = content.replace(emojiRegex, '');

    // Replace emoji specific text in shoesData.ts
    content = content.replace(/Marathon Race Day 🏆/g, 'Marathon Race Day');
    content = content.replace(/Tempo & Speed Workouts ⚡/g, 'Tempo & Speed Workouts');
    content = content.replace(/Daily Mileage & Training 🏃/g, 'Daily Mileage & Training');
    content = content.replace(/Casual Walking & All-Day Wear 🚶/g, 'Casual Walking & All-Day Wear');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned emojis in: ${filePath}`);
    }
  }
});
