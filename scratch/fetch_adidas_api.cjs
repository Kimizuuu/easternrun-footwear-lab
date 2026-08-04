const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

// Adidas CDN uses this pattern:
// https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/{hash}/{productCode}_{view}_standard.jpg
// But we need the hash. Let's try fetching from the API endpoint that returns product data with image URLs.

// Known product codes:
// Takumi Sen 10: ID2794 (black), IG8210 (white), IH5712
// Prime X 2 Strung: IH5682 (off white), IE5879 (black)
// Supernova Rise: IF3016 (black), IG7512 (white)
// Adizero SL 2: IF0414 (black), IG1179

const shoes = [
  {
    name: 'Adizero Takumi Sen 10',
    folder: 'adidas_takumisen10',
    codes: ['ID2794', 'IG8210', 'IH5712']
  },
  {
    name: 'Adizero Prime X 2 Strung',
    folder: 'adidas_primex2strung',
    codes: ['IH5682', 'IE5879']
  },
  {
    name: 'Supernova Rise',
    folder: 'adidas_supernovarise',
    codes: ['IF3016', 'IG7512', 'IF9837']
  },
  {
    name: 'Adizero SL 2',
    folder: 'adidas_adizerosl2',
    codes: ['IF0414', 'IG1179', 'IE7267']
  }
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const handler = (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location;
        const mod = redirectUrl.startsWith('https') ? https : http;
        mod.get(redirectUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, handler).on('error', reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    };
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, handler).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const handler = (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location;
        const mod = redirectUrl.startsWith('https') ? https : http;
        mod.get(redirectUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, handler).on('error', reject);
        return;
      }
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      } else {
        resolve(false);
      }
    };
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, handler).on('error', () => resolve(false));
  });
}

async function tryAdidasAPI(productCode) {
  // Try the adidas product API
  const apiUrl = `https://www.adidas.com/api/products/${productCode}`;
  try {
    const data = await fetchJSON(apiUrl);
    const json = JSON.parse(data);
    if (json.view_list) {
      return json.view_list.map(v => v.image_url).filter(Boolean);
    }
    if (json.product_description && json.product_description.image_url) {
      return [json.product_description.image_url];
    }
  } catch (e) {
    // API might not work directly
  }
  return [];
}

async function tryAdidasPHPage(productCode) {
  // Try scraping the adidas PH page for image URLs
  const url = `https://www.adidas.com.ph/api/plp/content-engine?query=${productCode}`;
  try {
    const data = await fetchJSON(url);
    const json = JSON.parse(data);
    const items = json.raw?.itemList?.items || json.itemList?.items || [];
    const images = [];
    for (const item of items) {
      if (item.image?.src) images.push(item.image.src);
    }
    return images;
  } catch (e) {
    // Try another pattern
  }
  return [];
}

async function tryGoogleSearch(shoeName) {
  // We already have search results, let's try direct CDN patterns
  return [];
}

async function main() {
  const publicWestern = path.join(__dirname, '..', 'public', 'images', 'western');

  for (const shoe of shoes) {
    console.log(`\n🔍 Searching for: ${shoe.name}`);
    const destDir = path.join(publicWestern, shoe.folder);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    let imageUrls = [];

    // Try each product code with the API
    for (const code of shoe.codes) {
      console.log(`  Trying API for ${code}...`);
      const urls = await tryAdidasAPI(code);
      if (urls.length > 0) {
        imageUrls = urls;
        console.log(`  ✅ Found ${urls.length} images from API for ${code}`);
        break;
      }

      const urls2 = await tryAdidasPHPage(code);
      if (urls2.length > 0) {
        imageUrls = urls2;
        console.log(`  ✅ Found ${urls2.length} images from PH API for ${code}`);
        break;
      }
    }

    if (imageUrls.length === 0) {
      console.log(`  ❌ No images found via API for ${shoe.name}`);
      continue;
    }

    // Download images
    for (let i = 0; i < Math.min(imageUrls.length, 5); i++) {
      const dest = path.join(destDir, `${i + 1}.webp`);
      const ok = await downloadFile(imageUrls[i], dest);
      if (ok) {
        const stats = fs.statSync(dest);
        console.log(`  📥 Downloaded image ${i + 1} (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        console.log(`  ❌ Failed to download image ${i + 1}: ${imageUrls[i]}`);
      }
    }
  }
}

main().catch(console.error);
