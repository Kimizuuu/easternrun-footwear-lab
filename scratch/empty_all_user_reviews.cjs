const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Replace userReviews: [ ... ] safely
// Match userReviews: [ until the matching ]
const lines = content.split('\n');
let insideReviews = false;
let bracketDepth = 0;
let newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!insideReviews) {
    if (line.includes('userReviews: [')) {
      if (line.includes(']')) {
        // inline single line
        newLines.push(line.replace(/userReviews:\s*\[.*?\]/, 'userReviews: []'));
      } else {
        insideReviews = true;
        bracketDepth = 1;
        newLines.push(line.replace(/userReviews:\s*\[.*/, 'userReviews: []'));
      }
    } else {
      newLines.push(line);
    }
  } else {
    // inside multi-line userReviews block, skip lines until we close the bracket
    for (let char of line) {
      if (char === '[') bracketDepth++;
      if (char === ']') bracketDepth--;
    }
    if (bracketDepth <= 0) {
      insideReviews = false;
    }
  }
}

fs.writeFileSync(file, newLines.join('\n'), 'utf8');
console.log('✅ Safely cleared userReviews array across all shoes!');
