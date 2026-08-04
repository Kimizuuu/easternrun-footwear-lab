const fs = require('fs');
const https = require('https');
const path = require('path');

const shoes = [
  {
    name: 'Adizero Takumi Sen 10',
    folder: 'adidas_takumisen10',
    zapposUrl: 'https://www.zappos.com/p/adidas-running-adizero-takumi-sen-10-core-black-zero-metallic-aurora-black/product/9910199/color/1094006'
  },
  {
    name: 'Adizero Prime X 2 Strung',
    folder: 'adidas_primex2strung',
    zapposUrl: 'https://www.zappos.com/p/adidas-running-adizero-prime-x-2-strung-off-white-grey-strata-semi-impact-orange/product/10038455/color/1068361'
  },
  {
    name: 'Supernova Rise',
    folder: 'adidas_supernovarise',
    zapposUrl: 'https://www.zappos.com/p/adidas-running-supernova-rise-core-black-core-black-grey-six/product/10040889/color/1037620'
  },
  {
    name: 'Adizero SL 2',
    folder: 'adidas_adizerosl2',
    zapposUrl: 'https://www.zappos.com/p/adidas-running-adizero-sl2-core-black-ftwr-white-carbon/product/10160553/color/1062870'
  }
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const handler = (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : `https://www.zappos.com${res.headers.location}`;
        https.get(loc, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, handler).on('error', reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    };
    https.get(url, { headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html',
    } }, handler).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
          if (res2.statusCode === 200) {
            const file = fs.createWriteStream(dest);
            res2.pipe(file);
            file.on('finish', () => file.close(() => resolve(true)));
          } else resolve(false);
        }).on('error', () => resolve(false));
        return;
      }
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      } else resolve(false);
    }).on('error', () => resolve(false));
  });
}

async function main() {
  const publicWestern = path.join(__dirname, '..', 'public', 'images', 'western');
  
  for (const shoe of shoes) {
    console.log(`\n🔍 Fetching: ${shoe.name}`);
    const destDir = path.join(publicWestern, shoe.folder);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    
    try {
      const { status, body } = await fetchPage(shoe.zapposUrl);
      console.log(`  Status: ${status}`);
      
      if (status !== 200) continue;
      
      // Extract all m.media-amazon.com image URLs from the page  
      const allUrls = [...body.matchAll(/https?:\\?\/\\?\/?m\.media-amazon\.com\\?\/images\\?\/I\\?\/([A-Za-z0-9_+%-]+)\.[^"'\\\s}]*/g)];
      console.log(`  Found ${allUrls.length} total Amazon media references`);
      
      // Extract unique image IDs
      const imageIds = new Set();
      for (const match of allUrls) {
        imageIds.add(match[1]);
      }
      console.log(`  Unique image IDs: ${imageIds.size}`);
      
      // Download high-res versions
      const ids = [...imageIds];
      let downloaded = 0;
      for (let i = 0; i < ids.length && downloaded < 5; i++) {
        const imgUrl = `https://m.media-amazon.com/images/I/${ids[i]}._AC_SL1500_.jpg`;
        const dest = path.join(destDir, `${downloaded + 1}.webp`);
        const ok = await downloadFile(imgUrl, dest);
        if (ok) {
          const stats = fs.statSync(dest);
          if (stats.size > 5000) {  // Skip tiny placeholder images
            console.log(`  📥 Downloaded image ${downloaded + 1} (${(stats.size / 1024).toFixed(1)} KB) - ID: ${ids[i]}`);
            downloaded++;
          } else {
            fs.unlinkSync(dest);
          }
        }
      }
      
      if (downloaded === 0) {
        console.log(`  ❌ No valid images downloaded for ${shoe.name}`);
        // Dump first few URLs for debugging
        const first5 = allUrls.slice(0, 5).map(m => m[0].substring(0, 100));
        console.log(`  Sample URLs:`, first5);
      }
      
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
    }
  }
}

main().catch(console.error);
