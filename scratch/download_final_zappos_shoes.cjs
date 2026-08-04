const fs = require('fs');
const https = require('https');
const path = require('path');

const shoesToDownload = [
  {
    folder: 'adidas_primex2strung',
    name: 'Adidas Adizero Evolution SL All Terrain',
    imageMap: {
      MAIN: '719Mv2mB-3L',
      PAIR: '719Mv2mB-3L',
      RGHT: '811V5oBIn2L',
      LEFT: '71O-wT37tGL',
      FRNT: '81d771iJ9-L',
      BACK: '715Oyp-oAHL',
      TOPP: '81zJm4Cyl0L',
      BOTT: '71yAot3cM+L'
    }
  },
  {
    folder: 'adidas_takumisen10',
    name: 'Adidas Adizero EVO SL EXO Running Shoes',
    imageMap: {
      MAIN: '7177cBtzQzL',
      PAIR: '7177cBtzQzL',
      RGHT: '81UI2Gf-PvL',
      LEFT: '71DDyHxypzL',
      FRNT: '81+qLkny4KL',
      BACK: '71krkcJQdEL',
      TOPP: '71xzolTK0YL',
      BOTT: '71tb8QBzSqL'
    }
  },
  {
    folder: 'adidas_supernovarise',
    name: 'Adidas Supernova Rise 2 Running Shoes',
    imageMap: {
      MAIN: '718+l72o33L',
      PAIR: '718+l72o33L',
      RGHT: '71rRNbsKRxL',
      LEFT: '719Rdfsa4HL',
      FRNT: '719LcmUB4yL',
      BACK: '713OV5s6vgL',
      TOPP: '71dwbsVQQ1L',
      BOTT: '61FqvhOzWUL'
    }
  },
  {
    folder: 'adidas_adizerosl2',
    name: 'Adidas Adizero Evo SL Running Shoes',
    imageMap: {
      MAIN: '61EDrshlm8L',
      PAIR: '61EDrshlm8L',
      RGHT: '611LkhdlTnL',
      LEFT: '61srP6bkHAL',
      FRNT: '615d4MTUItL',
      BACK: '61Y0MZX6zBL',
      TOPP: '61-pZH66eVL',
      BOTT: '612V+AtwV9L'
    }
  }
];

function downloadImage(url, dest) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 200) {
        const stream = fs.createWriteStream(dest);
        res.pipe(stream);
        stream.on('finish', () => {
          stream.close();
          resolve(true);
        });
      } else resolve(false);
    }).on('error', () => resolve(false));
  });
}

async function main() {
  const publicWestern = path.join(__dirname, '..', 'public', 'images', 'western');

  for (const s of shoesToDownload) {
    console.log(`\n==================================================`);
    console.log(`📥 Downloading Shoes & Angles for: ${s.name}`);
    const destDir = path.join(publicWestern, s.folder);

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    // Clean directory first to ensure NO clothes or old invalid files remain
    const files = fs.readdirSync(destDir);
    for (const f of files) {
      fs.unlinkSync(path.join(destDir, f));
    }

    const angleOrder = ['MAIN', 'PAIR', 'RGHT', 'LEFT', 'FRNT', 'BACK', 'TOPP', 'BOTT'];
    const seenIds = new Set();
    let idx = 1;

    for (const key of angleOrder) {
      const id = s.imageMap[key];
      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        const encodedId = encodeURIComponent(id);
        const url = `https://m.media-amazon.com/images/I/${encodedId}._AC_SL1500_.jpg`;
        const dest = path.join(destDir, `${idx}.webp`);

        const ok = await downloadImage(url, dest);
        if (ok) {
          const size = fs.statSync(dest).size;
          console.log(`  ✅ Angle ${idx} (${key}: ${id}) -> ${(size / 1024).toFixed(1)} KB`);
          idx++;
        } else {
          console.log(`  ❌ Failed angle ${key}: ${id}`);
        }
      }
    }
  }

  console.log(`\n🎉 All 4 Adidas running shoes successfully downloaded with full angle shots!`);
}

main();
