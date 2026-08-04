const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const shoesData = eval(content.replace('import type { Shoe } from \'../types/shoe\';', '').replace('export const INITIAL_SHOES_DATA: Shoe[] =', 'module.exports ='));

let bumped0to100Count = 0;
let bumped101to150Count = 0;

shoesData.forEach(shoe => {
  const price = shoe.msrpUsd;
  let bump = 0;
  if (price >= 0 && price <= 100) {
    bump = 3;
    bumped0to100Count++;
  } else if (price > 100 && price <= 150) {
    bump = 2;
    bumped101to150Count++;
  }

  if (bump > 0) {
    const newRating = shoe.overallRating + bump;
    const regex = new RegExp(`(id:\\s*'${shoe.id}',[\\s\\S]*?overallRating:\\s*)(\\d+)`, 'g');
    content = content.replace(regex, `$1${newRating}`);
  }
});

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ Applied +3 bump to ${bumped0to100Count} shoes in $0-$100 range!`);
console.log(`✅ Applied +2 bump to ${bumped101to150Count} shoes in $101-$150 range!`);
