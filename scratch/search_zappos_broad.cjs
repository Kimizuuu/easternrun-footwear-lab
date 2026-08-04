const fs = require('fs');
const https = require('https');

const queries = ['adidas+takumi', 'adidas+prime', 'adidas+adizero', 'adidas+supernova'];

async function searchZappos(q) {
  return new Promise(resolve => {
    const url = `https://www.zappos.com/search?term=${q}&filter%5Bzc1%5D%5B0%5D=Shoes`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const stateMatch = data.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
        if (stateMatch) {
          try {
            const obj = JSON.parse(stateMatch[1]);
            const list = obj?.products?.list || [];
            console.log(`\n========================================`);
            console.log(`Query "${q}" returned ${list.length} shoes:`);
            list.forEach((p, i) => {
              console.log(` [${i}] ${p.brandName} - ${p.productName} | ${p.styleColor}`);
              if (p.imageMap) {
                console.log(`      Angles:`, Object.keys(p.imageMap));
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
  for (const q of queries) {
    await searchZappos(q);
  }
}

main();
