const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
const content = fs.readFileSync(file, 'utf8');

const shoesData = eval(content.replace('import type { Shoe } from \'../types/shoe\';', '').replace('export const INITIAL_SHOES_DATA: Shoe[] =', 'module.exports ='));

console.log('SHOE NAME | OVERALL | WALKING | DAILY RUN | SPEED WORK | RACE DAY | CATEGORY');
console.log('----------------------------------------------------------------------------------');
shoesData.forEach(s => {
  const u = s.useCaseValues;
  console.log(`${s.name.padEnd(30)} | ${String(s.overallRating).padStart(3)} | ${String(u.walkingScore).padStart(3)} | ${String(u.dailyRunScore).padStart(3)} | ${String(u.speedWorkoutScore).padStart(3)} | ${String(u.marathonRaceScore).padStart(3)} | ${s.category}`);
});
