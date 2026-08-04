const fs = require('fs');
const path = require('path');

// Let's inspect the test images downloaded from Zappos to find which ones are shoes!
const testDir = path.join(__dirname, 'test_takumi_imgs');
const files = fs.readdirSync(testDir);
console.log('Files in test_takumi_imgs:', files);

// Let's check size distribution
files.forEach(f => {
  const stat = fs.statSync(path.join(testDir, f));
  console.log(`${f}: ${(stat.size / 1024).toFixed(1)} KB`);
});
