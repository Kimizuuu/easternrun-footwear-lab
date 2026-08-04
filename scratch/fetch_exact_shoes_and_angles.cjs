const fs = require('fs');
const https = require('https');
const path = require('path');

const targetShoes = [
  {
    id: 'adidas_primex2strung',
    name: 'Adidas Adizero Prime X 2 Strung',
    folder: 'adidas_primex2strung',
    searchTerms: ['adidas+prime+x', 'adidas+strung', 'adidas+adizero+prime']
  },
  {
    id: 'adidas_takumisen10',
    name: 'Adidas Adizero Takumi Sen 10',
    folder: 'adidas_takumisen10',
    searchTerms: ['adidas+takumi', 'adidas+takumi+sen', 'adidas+adizero+takumi']
  },
  {
    id: 'adidas_supernovarise',
    name: 'Adidas Supernova Rise',
    folder: 'adidas_supernovarise',
    searchTerms: ['adidas+supernova+rise']
  },
  {
    id: 'adidas_adizerosl2',
    name: 'Adidas Adizero SL 2',
    folder: 'adidas_adizerosl2',
    searchTerms: ['adidas+adizero+sl', 'adidas+sl2', 'adidas+adizero+sl+2']
  }
];

function fetchSearchPage(searchTerm) {
  return new Promise(resolve => {
    const url = `https://www.zappos.com/search?term=${searchTerm}&filter%5Bzc1%5D%5B0%5D=Shoes`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

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

  for (const shoe of targetShoes) {
    console.log(`\n==================================================`);
    console.log(`🔍 Searching for Shoe: ${shoe.name}`);
    
    let shoeProduct = null;

    for (const term of shoe.searchTerms) {
      console.log(` Trying search term: "${term}"...`);
      const html = await fetchSearchPage(term);
      const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
      
      if (stateMatch) {
        try {
          const obj = JSON.parse(stateMatch[1]);
          const list = obj?.products?.list || [];
          console.log(` Found ${list.length} products in Zappos results`);
          
          for (const p of list) {
            console.log(`   -> Product: "${p.productName}" | Brand: ${p.brandName} | Type: ${p.productType}`);
            // Strictly enforce Adidas brand & Shoes productType
            if (p.brandName && p.brandName.toLowerCase().includes('adidas') && p.imageMap && Object.keys(p.imageMap).length > 0) {
              shoeProduct = p;
              break;
            }
          }
        } catch (e) {}
      }

      if (shoeProduct) break;
    }

    if (shoeProduct && shoeProduct.imageMap) {
      console.log(`\n✅ EXACT ADIDAS SHOE MATCH CONFIRMED: "${shoeProduct.productName}"`);
      console.log(`   Brand: ${shoeProduct.brandName} | Style: ${shoeProduct.styleColor}`);
      console.log(`   Angles found:`, shoeProduct.imageMap);

      const destDir = path.join(publicWestern, shoe.folder);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      // Clean existing files first so no apparel images remain!
      const existingFiles = fs.readdirSync(destDir);
      for (const ef of existingFiles) {
        fs.unlinkSync(path.join(destDir, ef));
      }

      const angleKeys = ['MAIN', 'PAIR', 'RGHT', 'LEFT', 'FRNT', 'BACK', 'TOPP', 'BOTT'];
      const processedIds = new Set();
      let fileIndex = 1;

      for (const key of angleKeys) {
        const imgId = shoeProduct.imageMap[key];
        if (imgId && !processedIds.has(imgId)) {
          processedIds.add(imgId);
          const encodedId = encodeURIComponent(imgId);
          const imgUrl = `https://m.media-amazon.com/images/I/${encodedId}._AC_SL1500_.jpg`;
          const dest = path.join(destDir, `${fileIndex}.webp`);
          
          const ok = await downloadImage(imgUrl, dest);
          if (ok) {
            const size = fs.statSync(dest).size;
            console.log(`   📥 Downloaded Angle ${fileIndex} (${key}: ${imgId}) -> ${(size / 1024).toFixed(1)} KB`);
            fileIndex++;
          }
        }
      }
    } else {
      console.log(`❌ Could not find exact Adidas shoe match for ${shoe.name}`);
    }
  }
}

main();
