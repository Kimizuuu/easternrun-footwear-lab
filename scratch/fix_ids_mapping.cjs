const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
const content = fs.readFileSync(file, 'utf8');

const idMatches = content.match(/id:\s*'([^']+)'/g) || [];
console.log(idMatches.map(m => m.replace(/id:\s*'([^']+)'/, '$1')).join('\n'));
