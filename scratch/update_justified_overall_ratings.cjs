const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const justifiedRatings = {
  // Li-Ning
  'lining-feidian-6-ultra': 97,
  'lining-feidian-6-elite': 95,
  'lining-feidian-5-challenger': 91,
  'lining-red-hare-9-ultra': 86,
  'lining-superlight-23': 85,

  // Anta
  'anta-c202-6-pro': 96,
  'anta-c202-5-gt': 94,
  'anta-c202-6': 90,
  'anta-c202-g9-2': 86,
  'anta-pg7-travel-2': 80,
  'anta-pg7-3': 79,
  'anta-pg7-city': 76,
  'anta-pg7-classic': 75,
  'anta-bellero-4-plus': 80,
  'anta-zone-2-90': 79,

  // 361°
  'three61-furious-future-2': 96,
  'three61-biospeed-5-pro': 95,
  'three61-flame-5-future': 94,
  'three61-flame-5-mix': 90,
  'three61-flame-5': 89,
  'three61-flame-4-5-mix': 88,
  'three61-flame-4-mix': 87,
  'three61-flame-4-et': 86,
  'three61-flame-4': 86,
  'three61-flame-3-et': 85,
  'three61-flame-3': 85,
  'three61-biospeed-3-5-pro': 89,
  'three61-biospeed-future': 94,
  'three61-furious-2-0': 84,
  'three61-furious-1-5': 82,
  'three61-fierce-6': 78,
  'three61-miro-nude-sl': 80,
  'three61-miro-nude': 77,

  // Qiaodan
  'qiaodan-feiying-pb-6': 96,
  'qiaodan-feiying-pb-5': 94,
  'qiaodan-feiying-plaid-3': 97,
  'qiaodan-feiying-plaid-2': 95,
  'qiaodan-leli-2': 88,
  'qiaodan-lh600-2': 84,
  'qiaodan-qinghong-free': 78,
  'qiaodan-rapid-4': 85,
  'qiaodan-thunder-1': 84,
  'qiaodan-wind-4': 85
};

let count = 0;
for (const [id, newRating] of Object.entries(justifiedRatings)) {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?overallRating:\\s*)(\\d+)`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${newRating}`);
    count++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ Successfully updated overallRating for ${count} shoes in shoesData.ts!`);
