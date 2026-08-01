const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const westernBlockStart = content.indexOf('// --- WESTERN BENCHMARK REFERENCE MODELS ---');
if (westernBlockStart !== -1) {
  let mainPart = content.slice(0, westernBlockStart);
  let westernPart = content.slice(westernBlockStart);

  // Fix communityPros inside userReviews objects
  westernPart = westernPart.replaceAll('        communityPros: [', '        pros: [');
  westernPart = westernPart.replaceAll('        communityCons: [', '        cons: [');

  content = mainPart + westernPart;
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed userReviews pros/cons inside Western models!');
}
