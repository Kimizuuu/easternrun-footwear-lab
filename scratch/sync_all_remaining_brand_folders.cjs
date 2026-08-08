const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const shoesDataPath = path.join(rootDir, 'src', 'data', 'shoesData.ts');

let content = fs.readFileSync(shoesDataPath, 'utf8');

const brandFolders = [
  'Famous International References Shoes',
  '361',
  'Anta',
  'Li ning',
  'Qiaodan',
  'Missing shoers'
];

const folderToIdMap = {
  // Famous International
  'Adios pro 4': 'adidas_adiospro4',
  'Alphafly 3': 'nike_alphafly3',
  'Boston 13': 'adidas_boston13',
  'Endorphin Elite 2': 'saucony_endorphinelite2',
  'Endorphin Pro 4': 'saucony_endorphinpro4',
  'Endorphin Speed 4': 'saucony_endorphinspeed4',
  'Evo Sl': 'adidas_evosl',
  'Gel-Kayano 33': 'asics_gelkayano31',
  'Pegasus 42': 'nike_pegasus41',
  'Vaporfly 4': 'nike_vaporfly3',
  'Zoomfly 6': 'nike_zoomfly6',

  // 361
  'BIOSPEED 3.5 PRO': 'three61-biospeed-3-5-pro',
  'Biospeed 5 pro': 'three61-biospeed-5-pro',
  'Bisopeed Future': 'three61-biospeed-future',
  'Fierce 6': 'three61-fierce-6',
  'Flame 3': 'three61-flame-3',
  'Flame 3 ET': 'three61-flame-3-et',
  'Flame 4': 'three61-flame-4',
  'Flame 4 ET': 'three61-flame-4-et',
  'Flame 4 Mix': 'three61-flame-4-mix',
  'Flame 4.5 MIX': 'three61-flame-4-5-mix',
  'Flame 5': 'three61-flame-5',
  'Flame 5 Future': 'three61-flame-5-future',
  'Flame 5 MIX': 'three61-flame-5-mix',
  'Furious 1.5': 'three61-furious-1-5',
  'Furious 2.0': 'three61-furious-2-0',
  'Furious Future 2.0': 'three61-furious-future-2',
  'Miro Nude': 'three61-miro-nude',
  'MIRO NUDE SL': 'three61-miro-nude-sl',

  // Anta
  'ANTA Bellero 4 PLUS': 'anta-bellero-4-plus',
  'ANTA C202 5 GT': 'anta-c202-5-gt',
  'ANTA C202 6': 'anta-c202-6',
  'ANTA C202 G9 2': 'anta-c202-g9-2',
  'ANTA PG7': 'anta-pg7-classic',
  'ANTA PG7 3': 'anta-pg7-3',
  'ANTA PG7 City': 'anta-pg7-city',
  'ANTA PG7 Travel 2 Running Shoes': 'anta-pg7-travel-2',
  'ANTA ZONE 2 90': 'anta-zone-2-90',
  'C202 6 Pro': 'anta-c202-6-pro',

  // Li Ning
  'Li-ning Fei Dian 6.0 Ultra Pics': 'lining-feidian-6-ultra',
  "LI-NING MEN'S FEI DIAN 5.0 CHALLENGER": 'lining-feidian-5-challenger',
  "LI-NING MEN'S RED HARE 9 ULTRA": 'lining-red-hare-9-ultra',
  "LI-NING MEN'S SUPERLIGHT 23": 'lining-superlight-23',
  'LI-NING UNISEX FEI DIAN 6.0 ELITE': 'lining-feidian-6-elite',

  // Qiaodan
  'FEIYING PB5.0': 'qiaodan-feiying-pb-5',
  'FEIYING PB6.0': 'qiaodan-feiying-pb-6',
  'FEIYING PLAID 2.0': 'qiaodan-feiying-plaid-2',
  'FEIYING PLAID3.0': 'qiaodan-feiying-plaid-3',
  'LELI 2.0': 'qiaodan-leli-2',
  'LH600 2.0': 'qiaodan-lh600-2',
  'Qinghong FREE': 'qiaodan-qinghong-free',
  'Rapid 4.0': 'qiaodan-rapid-4',
  'THUNDER 1.0': 'qiaodan-thunder-1',
  'WIND 4.0': 'qiaodan-wind-4'
};

let syncCount = 0;

function processFolder(baseFolder, folderName) {
  const sourceFolder = path.join(rootDir, baseFolder, folderName);
  if (!fs.existsSync(sourceFolder)) return;

  const files = fs.readdirSync(sourceFolder).filter(f => /\.(png|jpe?g|webp|avif)$/i.test(f));
  if (files.length === 0) return;

  const shoeId = folderToIdMap[folderName];
  if (!shoeId) return;

  const targetSubfolder = shoeId.includes('lining') || shoeId.includes('anta') || shoeId.includes('three61') || shoeId.includes('qiaodan') || shoeId.includes('xtep')
    ? `shoes/${shoeId}`
    : `western/${shoeId}`;

  const targetDir = path.join(publicDir, 'images', targetSubfolder);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const copiedFiles = [];

  files.forEach((file, idx) => {
    const ext = path.extname(file);
    const newFileName = `${idx + 1}${ext}`;
    const destPath = path.join(targetDir, newFileName);
    fs.copyFileSync(path.join(sourceFolder, file), destPath);
    copiedFiles.push(`/images/${targetSubfolder}/${newFileName}`);
  });

  if (copiedFiles.length > 0) {
    const mainImg = copiedFiles[0];

    // Replace image property for this shoeId in shoesData.ts
    const imgReg = new RegExp(`(["']?id["']?:\\s*['"]${shoeId}['"][\\s\\S]*?["']?image["']?:\\s*['"])[^'"]+(['"])`);
    if (content.match(imgReg)) {
      content = content.replace(imgReg, `$1${mainImg}$2`);
    }

    // Replace galleryImages property
    const galReg = new RegExp(`(["']?id["']?:\\s*['"]${shoeId}['"][\\s\\S]*?["']?galleryImages["']?:\\s*\\[)[^\\]]+(\\])`);
    if (content.match(galReg)) {
      content = content.replace(galReg, `$1\n      ${copiedFiles.map(f => `'${f}'`).join(',\n      ')}\n    $2`);
    }

    console.log(`✅ Synced ${copiedFiles.length} photos for [${shoeId}] (${folderName}) -> ${mainImg}`);
    syncCount++;
  }
}

brandFolders.forEach(base => {
  const baseDir = path.join(rootDir, base);
  if (fs.existsSync(baseDir)) {
    const subitems = fs.readdirSync(baseDir);
    subitems.forEach(item => {
      const p = path.join(baseDir, item);
      if (fs.statSync(p).isDirectory()) {
        processFolder(base, item);
      }
    });
  }
});

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log(`\n🎉 Successfully processed and synced photos across all brand folders! Total synced: ${syncCount}`);
