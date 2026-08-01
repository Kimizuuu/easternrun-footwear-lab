const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.replaceAll('prosList:', 'pros:');
content = content.replaceAll('consList:', 'cons:');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed pros/cons property names in shoesData.ts');
