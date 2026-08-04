const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
const content = fs.readFileSync(file, 'utf8');

const shoesData = eval(content.replace('import type { Shoe } from \'../types/shoe\';', '').replace('export const INITIAL_SHOES_DATA: Shoe[] =', 'module.exports ='));

console.log('NAME | BRAND | MSRP($) | OVERALL | RACE | SPEED | DAILY | FOAM | PLATE');
console.log('-----------------------------------------------------------------------------------------------');
shoesData.forEach(s => {
  const u = s.useCaseValues;
  const plate = s.specs?.carbonPlate || 'None';
  const foam = s.specs?.foamName || 'Standard';
  console.log(`${s.name.padEnd(28)} | ${s.brand.padEnd(8)} | $${String(s.msrpUsd).padStart(3)} | ${String(s.overallRating).padStart(3)} | ${String(u.marathonRaceScore).padStart(3)} | ${String(u.speedWorkoutScore).padStart(3)} | ${String(u.dailyRunScore).padStart(3)} | ${foam.substring(0, 15).padEnd(15)} | ${plate.substring(0, 15)}`);
});
