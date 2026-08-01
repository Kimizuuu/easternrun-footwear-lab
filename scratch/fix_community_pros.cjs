const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// For Western reference models, convert pros -> communityPros, cons -> communityCons
// and add finalConsensusVerdict if missing
const westernBlockStart = content.indexOf('// --- WESTERN BENCHMARK REFERENCE MODELS ---');
if (westernBlockStart !== -1) {
  let mainPart = content.slice(0, westernBlockStart);
  let westernPart = content.slice(westernBlockStart);

  westernPart = westernPart.replaceAll('    pros: [', '    communityPros: [');
  westernPart = westernPart.replaceAll('    cons: [', '    communityCons: [');

  // Insert finalConsensusVerdict before userReviews
  westernPart = westernPart.replaceAll(
    '    userReviews: [',
    "    finalConsensusVerdict: 'Top-tier global reference benchmark with extensive race and workout data.',\n    userReviews: ["
  );

  content = mainPart + westernPart;
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully fixed communityPros, communityCons, and finalConsensusVerdict for Western models!');
}
