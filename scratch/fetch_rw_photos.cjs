const fs = require('fs');
const https = require('https');
const path = require('path');

const candidates = {
  'adidas_primex2strung': [
    'https://img.runningwarehouse.com/watermark/rs/APX2M1-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/APX2M2-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/APX2M3-1.jpg'
  ],
  'adidas_takumisen10': [
    'https://img.runningwarehouse.com/watermark/rs/ATK10M-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/ATK10M1-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/AT10M1-1.jpg'
  ],
  'adidas_supernovarise': [
    'https://img.runningwarehouse.com/watermark/rs/ASNR1M-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/ASNRM1-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/ASNRM2-1.jpg'
  ],
  'adidas_adizerosl2': [
    'https://img.runningwarehouse.com/watermark/rs/ASL2M1-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/ASL2M2-1.jpg',
    'https://img.runningwarehouse.com/watermark/rs/ASL2M3-1.jpg'
  ]
};

function downloadUrl(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function main() {
  const publicWestern = path.join(__dirname, '..', 'public', 'images', 'western');

  for (const [folder, urls] of Object.entries(candidates)) {
    const destDir = path.join(publicWestern, folder);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    
    let downloaded = false;
    for (let i = 0; i < urls.length; i++) {
      const destFile = path.join(destDir, '1.webp');
      const ok = await downloadUrl(urls[i], destFile);
      if (ok) {
        console.log(`✅ Success for ${folder}: ${urls[i]}`);
        downloaded = true;
        break;
      }
    }
    if (!downloaded) {
      console.log(`❌ Could not fetch direct RW url for ${folder}`);
    }
  }
}

main();
