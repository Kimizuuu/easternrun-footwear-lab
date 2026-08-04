const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// Replace "communityFeedback": { "pros": [...], "cons": [...] }
content = content.replace(/"communityFeedback"\s*:\s*\{\s*"pros"\s*:\s*(\[[^\]]+\])\s*,\s*"cons"\s*:\s*(\[[^\]]+\])\s*\}/g, (match, pros, cons) => {
  return `"communityPros": ${pros},\n    "communityCons": ${cons}`;
});

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('✅ Successfully mapped communityPros and communityCons in shoesData.ts!');
