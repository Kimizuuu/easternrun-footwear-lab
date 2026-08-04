const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Tech & Price Justified Adidas Ranking
const adidasUpdates = {
  'adidas_primex2strung': 93, // $300 - 50mm Triple Lightstrike Pro PEBA + Dual Carbon Plates
  'adidas_adiospro4': 92,     // $250 - Full Lightstrike Pro PEBA + Carbon ENERGYRODS 2.0
  'adidas_takumisen10': 90,   // $180 - Dual Lightstrike Pro PEBA + Glass-Fiber ENERGYRODS 2.0
  'adidas_boston13': 89,      // $160 - Lightstrike Pro + Lightstrike 2.0 + Glass-Fiber Rods
  'adidas_evosl': 88,         // $150 - Full Lightstrike Pro (No Plate)
  'adidas_supernovarise': 86, // $140 - Dreamstrike+ PEBA + Support Rods
  'adidas_adizerosl2': 85     // $130 - Lightstrike Pro Core + EVA Carrier
};

let count = 0;
for (const [id, rating] of Object.entries(adidasUpdates)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?overallRating:\\s*)(\\d+)`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${rating}`);
    count++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ Successfully re-arranged Adidas rankings by technology and price! (${count} models updated)`);
