const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.replace("title: 'Pr'd by 4 minutes at Chicago'", "title: \"PR'd by 4 minutes at Chicago\"");
content = content.replace("world’s most trusted", "world's most trusted");
content = content.replace("Saucony’s most responsive", "Saucony's most responsive");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed quotes in shoesData.ts');
