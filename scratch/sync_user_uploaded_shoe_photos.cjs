const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const missingShoersDir = path.join(rootDir, 'Missing shoers');
const publicDir = path.join(rootDir, 'public');
const shoesDataPath = path.join(rootDir, 'src', 'data', 'shoesData.ts');

let content = fs.readFileSync(shoesDataPath, 'utf8');

// Mapping from folder name in Missing shoers to shoe ID in shoesData.ts
const folderToIdMap = {
  "Adidas Adizero Boston 12'": "adidas_boston12",
  "Adidas Terrex Agravic Speed Ultra": "adidas_terrex_agravic_speed_ultra",
  "Adizero Prime X 2.0 Strung": "adidas_primex2strung",
  "adios pro 3": "adidas_adiospro3",
  "Sl 2": "adidas_adizerosl2",
  "Takumi sen 10": "adidas_takumisen10",
  "TAkumi sen 11": "adidas_takumisen10",
  "Air Zoom Alphafly Next% 2": "nike_alphafly2",
  "ZoomX Vaporfly Next% 2": "nike_vaporfly2",
  "Invincible 3": "nike_invincible3",
  "Pegasus plus": "nike_pegasusplus",
  "Pegasus Trail 5": "nike_pegasustrail5",
  "vomero 17": "nike_vomero17",
  "Ultrafly": "nike_ultrafly",
  "Sky Paris": "asics_metaspeedskyparis",
  "Gel nimbus 26": "asics_gelnimbus26",
  "Magic speed 4": "asics_magicspeed4",
  "Novablast 4": "asics_novablast4",
  "Novablast 5": "asics_novablast4",
  "Novablast 6": "asics_novablast4",
  "GT2000 14": "asics_gt2000_12",
  "Superblast 3": "asics_superblast2",
  "Bondi 8": "hoka_bondi8",
  "Ceilo x1": "hoka_cielox1",
  "Clifton 19": "hoka_clifton9",
  "Mach 5": "hoka_mach5",
  "Mach 6": "hoka_mach6",
  "Speedgoat 6": "hoka_speedgoat6",
  "FEi dian 4": "lining-feidian-4-ultra",
  "FuelCell SuperComp Elite v5": "nb_sc_elite_v4",
  "New Balance Fresh Foam X 1080 v14": "nb_1080_v13",
  "New Balance FuelCell Rebel v4": "nb_rebel_v4",
  "Ghost 16": "brooks_ghost16",
  "Glycerin 21": "brooks_glycerin21",
  "gts 22": "brooks_adrenaline_gts23",
  "gts 24": "brooks_adrenaline_gts23",
  "gts 25": "brooks_adrenaline_gts23",
  "Guide 15": "saucony_ride17",
  "ride 15": "saucony_kinvara15",
  "Ride 19": "saucony_ride17",
  "Triumph 23": "saucony_triumph22"
};

let syncCount = 0;

for (const [folderName, shoeId] of Object.entries(folderToIdMap)) {
  const sourceFolder = path.join(missingShoersDir, folderName);
  if (!fs.existsSync(sourceFolder)) continue;

  const files = fs.readdirSync(sourceFolder).filter(f => /\.(png|jpe?g|webp|avif)$/i.test(f));
  if (files.length === 0) continue;

  // Determine target directory inside public/images/western/ (or public/images/shoes/ for Li-Ning)
  const targetSubfolder = shoeId.startsWith('lining') ? `shoes/${shoeId}` : `western/${shoeId}`;
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
    const galleryStr = JSON.stringify(copiedFiles, null, 6).replace(/\n/g, '\n    ');

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

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log(`\n🎉 Successfully processed and synced photos for ${syncCount} shoe folders!`);
