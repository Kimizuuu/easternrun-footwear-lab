const fs = require('fs');
const path = require('path');

const shoesDataContent = fs.readFileSync('./src/data/shoesData.ts', 'utf8');
const qiaodanBlock = shoesDataContent.substring(shoesDataContent.indexOf('// --- QIAODAN MODELS'));

const regex = /['"](\/images\/qiaodan\/[^'"]+)['"]/g;
let match;
let missingCount = 0;
let totalCount = 0;

while ((match = regex.exec(qiaodanBlock)) !== null) {
  totalCount++;
  const relPath = match[1];
  const fullPath = path.join(__dirname, '..', 'public', relPath);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    missingCount++;
    console.log('❌ MISSING:', relPath);
  } else {
    console.log('✅ OK:', relPath);
  }
}

console.log(`\nSummary: ${totalCount - missingCount}/${totalCount} Qiaodan images found.`);
