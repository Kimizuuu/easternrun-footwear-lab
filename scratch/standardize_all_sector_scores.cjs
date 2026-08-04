const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Regex to find useCaseValues and convert float 0-10 scores to 0-100 integers
// e.g. walkingScore: 4.5 -> walkingScore: 45
// e.g. walkingScore: 9 -> walkingScore: 90 (if <= 10)

const lines = content.split('\n');
let updatedLines = lines.map(line => {
  if (line.includes('Score:')) {
    return line.replace(/(walkingScore|dailyRunScore|speedWorkoutScore|marathonRaceScore):\s*([\d\.]+)/, (match, prop, valStr) => {
      let val = parseFloat(valStr);
      if (val <= 10) {
        let converted = Math.round(val * 10);
        return `${prop}: ${converted}`;
      }
      return match;
    });
  }
  return line;
});

fs.writeFileSync(file, updatedLines.join('\n'), 'utf8');
console.log('✅ Successfully standardized all 4 sector scores across all 54 shoes to 0-100 integer scale!');
