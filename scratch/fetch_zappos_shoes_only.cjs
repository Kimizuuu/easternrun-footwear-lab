const fs = require('fs');
const https = require('https');
const path = require('path');

const targets = [
  {
    name: 'Adizero Prime X 2 Strung',
    folder: 'adidas_primex2strung',
    searchTerm: 'adidas+adizero+prime+x+2+strung'
  },
  {
    name: 'Adizero Takumi Sen 10',
    folder: 'adidas_takumisen10',
    searchTerm: 'adidas+adizero+takumi+sen+10'
  },
  {
    name: 'Supernova Rise',
    folder: 'adidas_supernovarise',
    searchTerm: 'adidas+supernova+rise'
  },
  {
    name: 'Adizero SL 2',
    folder: 'adidas_adizerosl2',
    searchTerm: 'adidas+adizero+sl+2'
  }
];

function fetchZapposSearch(term) {
  return new Promise((resolve) => {
    // Add zc1=Shoes filter to URL!
    const url = `https://www.zappos.com/search?term=${term}&filter%5Bzc1%5D%5B0%5D=Shoes`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function main() {
  const publicWestern = path.join(__dirname, '..', 'public', 'images', 'western');

  for (const t of targets) {
    console.log(`\n========================================`);
    console.log(`🔍 Searching Zappos (Shoes Filtered) for: ${t.name}`);
    const html = await fetchZapposSearch(t.searchTerm);
    console.log(`Downloaded search HTML, length: ${html.length}`);

    // Parse product results array from JSON state
    // Zappos stores products under results in window.__INITIAL_STATE__
    const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
    let productImgs = [];

    if (stateMatch) {
      try {
        const state = JSON.parse(stateMatch[1]);
        const results = state?.results?.products || state?.search?.results || [];
        console.log(`Found ${results.length} product entries in search state`);

        for (const p of results) {
          const name = (p.productName || p.brandName + ' ' + p.productTitle || '').toLowerCase();
          console.log(` - Product found: "${p.productName}" | ${p.thumbnailUrl}`);
          
          // Verify name matches target shoe
          if (p.thumbnailUrl) {
            // Convert thumbnail URL to high res SL1500 image URL
            let highRes = p.thumbnailUrl.replace(/\._AC_SR\d+,\d+_/, '._AC_SL1500_').replace(/\._AC_SX\d+_/, '._AC_SL1500_');
            productImgs.push(highRes);
          }
        }
      } catch (e) {
        console.log('JSON parse error, falling back to regex parsing');
      }
    }

    if (productImgs.length === 0) {
      // Regex fallback: find m.media-amazon.com image URLs where alt or title mentions shoe/sneaker or product matches
      console.log('Using regex match on search page HTML...');
      // Find JSON product blocks
      const matches = [...html.matchAll(/"productName"\s*:\s*"([^"]+)"[\s\S]*?"thumbnailUrl"\s*:\s*"([^"]+)"/g)];
      console.log(`Found ${matches.length} regex product matches`);
      for (const m of matches) {
        const pName = m[1];
        const pThumb = m[2];
        console.log(` Regex Product: "${pName}" -> ${pThumb}`);
        if (pName.toLowerCase().includes('shoe') || pName.toLowerCase().includes('running') || pName.toLowerCase().includes('adizero') || pName.toLowerCase().includes('supernova')) {
          let highRes = pThumb.replace(/\\u002F/g, '/').replace(/\._AC_SR\d+,\d+_/, '._AC_SL1500_').replace(/\._AC_SX\d+_/, '._AC_SL1500_');
          productImgs.push(highRes);
        }
      }
    }

    console.log(`Total shoe product images found for ${t.name}: ${productImgs.length}`);
    const destDir = path.join(publicWestern, t.folder);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    let count = 0;
    const uniqueImgs = [...new Set(productImgs)];
    for (let i = 0; i < uniqueImgs.length && count < 5; i++) {
      const dest = path.join(destDir, `${count + 1}.webp`);
      const ok = await downloadImage(uniqueImgs[i], dest);
      if (ok) {
        const size = fs.statSync(dest).size;
        console.log(`  ✅ Downloaded shoe image ${count + 1} (${(size / 1024).toFixed(1)} KB): ${uniqueImgs[i]}`);
        count++;
      }
    }
  }
}

main();
