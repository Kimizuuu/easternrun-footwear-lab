const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Target Ratings
const ratings = {
  'adidas_primex2strung': 93,
  'adidas_adiospro4': 92,
  'adidas_takumisen10': 90,
  'adidas_boston13': 89,
  'adidas_evosl': 88,
  'adidas_supernovarise': 86,
  'adidas_adizerosl2': 85
};

for (const [id, rating] of Object.entries(ratings)) {
  // Find index of id
  const idPos = content.indexOf(`"${id}"`) !== -1 ? content.indexOf(`"${id}"`) : content.indexOf(`'${id}'`);
  if (idPos !== -1) {
    // Find next overallRating after idPos
    const ratingPos = content.indexOf('overallRating', idPos);
    if (ratingPos !== -1 && ratingPos - idPos < 600) {
      const lineEnd = content.indexOf('\n', ratingPos);
      const oldLine = content.slice(ratingPos, lineEnd);
      const newLine = oldLine.replace(/\d+/, rating.toString());
      content = content.slice(0, ratingPos) + newLine + content.slice(lineEnd);
      console.log(`Updated ${id} -> ${rating}`);
    }
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Successfully updated all Adidas overall ratings via exact string offset!');
