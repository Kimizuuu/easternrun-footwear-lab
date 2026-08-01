const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Regex to replace all userReviews: [ ... ] blocks with userReviews: []
// We can use a parser or regex block replacement
const updatedContent = content.replace(/userReviews:\s*\[[\s\S]*?\](?=\s*[,}])/g, 'userReviews: []');

fs.writeFileSync(file, updatedContent, 'utf8');
console.log('✅ Successfully cleared all default user reviews across all shoes!');
