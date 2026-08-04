const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const downloads = [
  // Prime X 2 Strung
  {
    url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/474c35b625574c76b9f2af9300e84c98_9366/Adizero_Prime_X_2_Strung_Black_IE5879_01_standard.jpg',
    dest: path.join(__dirname, '../public/images/western/adidas_primex2strung/1.webp')
  },
  // Takumi Sen 10
  {
    url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/d40d9b54c0e649069d65afc700947702_9366/IG8210_01_standard.jpg',
    dest: path.join(__dirname, '../public/images/western/adidas_takumisen10/1.webp')
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed with status code: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`✅ Downloaded: ${item.dest}`);
    } catch (err) {
      console.error(`❌ Failed ${item.url}:`, err.message);
    }
  }
}

run();
