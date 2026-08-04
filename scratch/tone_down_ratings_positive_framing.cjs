const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Toned down overall ratings (Peak at 91-92 for flagships, balanced down across tiers)
const tonedDownRatings = {
  // Western Reference Benchmarks
  'nike_alphafly3': 90,
  'nike_vaporfly3': 89,
  'adidas_adiospro4': 89,
  'saucony_endorphinelite2': 88,
  'saucony_endorphinpro4': 87,
  'saucony_endorphinspeed4': 86,
  'adidas_evosl': 89,
  'adidas_boston13': 84,
  'nike_zoomfly6': 83,
  'asics_gelkayano31': 83,
  'nike_pegasus41': 81,

  // Chinese Flagship Super-Shoes
  'lining-feidian-6-ultra': 91,
  'lining-feidian-6-elite': 89,
  'qiaodan-feiying-plaid-3': 91,
  'qiaodan-feiying-pb-6': 90,
  'three61-furious-future-2': 90,
  'three61-biospeed-5-pro': 89,
  'anta-c202-6-pro': 90,
  'anta-c202-5-gt': 88,
  'three61-flame-5-future': 88,
  'qiaodan-feiying-pb-5': 88,
  'three61-biospeed-future': 88,
  'qiaodan-feiying-plaid-2': 89,

  // Chinese Mid-Tier Plated Racers & Speed Trainers
  'lining-feidian-5-challenger': 86,
  'three61-flame-5-mix': 85,
  'anta-c202-6': 85,
  'three61-flame-5': 84,
  'three61-biospeed-3-5-pro': 84,
  'qiaodan-leli-2': 83,
  'three61-flame-4-5-mix': 83,
  'three61-flame-4-mix': 82,
  'three61-flame-4-et': 81,
  'three61-flame-4': 81,
  'three61-flame-3-et': 80,
  'three61-flame-3': 80,

  // Chinese Daily Trainers & Workhorses
  'lining-red-hare-9-ultra': 83,
  'anta-c202-g9-2': 81,
  'qiaodan-wind-4': 81,
  'qiaodan-rapid-4': 81,
  'three61-furious-2-0': 80,
  'qiaodan-thunder-1': 80,
  'qiaodan-lh600-2': 80,
  'lining-superlight-23': 81,

  // Chinese Budget / Walking Models
  'anta-pg7-travel-2': 76,
  'anta-pg7-3': 75,
  'anta-pg7-city': 72,
  'anta-pg7-classic': 71,
  'anta-bellero-4-plus': 76,
  'anta-zone-2-90': 75,
  'three61-furious-1-5': 77,
  'three61-fierce-6': 73,
  'three61-miro-nude-sl': 75,
  'three61-miro-nude': 72,
  'qiaodan-qinghong-free': 73
};

let count = 0;
for (const [id, rating] of Object.entries(tonedDownRatings)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?overallRating:\\s*)(\\d+)`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${rating}`);
    count++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ Successfully toned down overall ratings across ${count} shoes with positive balanced scaling!`);
