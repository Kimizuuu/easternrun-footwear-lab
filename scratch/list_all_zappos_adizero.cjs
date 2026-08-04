const fs = require('fs');
const https = require('https');

async function getZapposAdizeroPage(page) {
  return new Promise(resolve => {
    const url = `https://www.zappos.com/search?term=adizero&p=${page}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const stateMatch = data.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
        if (stateMatch) {
          try {
            const obj = JSON.parse(stateMatch[1]);
            const list = obj?.products?.list || [];
            list.forEach(p => {
              if (p.brandName && p.brandName.toLowerCase().includes('adidas')) {
                console.log(`[Page ${page}] ${p.productName} | Style: ${p.styleColor} | ${p.productUrl}`);
                if (p.imageMap) {
                  console.log(`   imageMap:`, p.imageMap);
                }
              }
            });
          } catch (e) {}
        }
        resolve();
      });
    }).on('error', () => resolve());
  });
}

async function main() {
  for (let page = 0; page < 4; page++) {
    await getZapposAdizeroPage(page);
  }
}

main();
