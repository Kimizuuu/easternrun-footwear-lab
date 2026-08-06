const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
const content = fs.readFileSync(shoesDataPath, 'utf8');

const matches = [...content.matchAll(/["']?id["']?:\s*['"]([^'"]+)['"][\s\S]*?["']?finalConsensusVerdict["']?:\s*['"]([^'"]+)['"]/g)];

matches.slice(0, 15).forEach(m => {
  console.log(`[${m[1]}]: ${m[2]}`);
});
