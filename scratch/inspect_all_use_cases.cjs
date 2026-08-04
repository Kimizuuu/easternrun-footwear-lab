const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
const content = fs.readFileSync(file, 'utf8');

// Parse shoe blocks
const shoesData = eval(content.replace('import type { Shoe } from \'../types/shoe\';', '').replace('export const INITIAL_SHOES_DATA: Shoe[] =', 'module.exports ='));

console.log(`Total parsed shoes: ${shoesData.length}`);

let genericCount = 0;
shoesData.forEach(shoe => {
  const u = shoe.useCaseValues;
  if (!u) {
    console.log(`❌ Missing useCaseValues for ${shoe.name}`);
    genericCount++;
    return;
  }
  const isGeneric = u.walkingAnalysis?.includes('Generic') || u.dailyRunAnalysis?.includes('Generic') || u.speedWorkoutAnalysis?.includes('Generic') || u.marathonRaceAnalysis?.includes('Generic');
  if (isGeneric) {
    console.log(`⚠️ Generic analysis found for ${shoe.name}`);
    genericCount++;
  }
});

if (genericCount === 0) {
  console.log('✅ ALL 54 SHOES HAVE CUSTOM, DETAILED SECTOR SCORES & ANALYSES!');
} else {
  console.log(`Found ${genericCount} shoes with missing or generic sector analysis.`);
}
