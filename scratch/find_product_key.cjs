const fs = require('fs');
const https = require('https');

const url = 'https://www.zappos.com/search?term=adidas+supernova+rise&filter%5Bzc1%5D%5B0%5D=Shoes';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const stateMatch = data.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
    if (stateMatch) {
      try {
        const obj = JSON.parse(stateMatch[1]);
        console.log('Top keys:', Object.keys(obj));
        if (obj.list) console.log('List keys:', Object.keys(obj.list));
        if (obj.search) console.log('Search keys:', Object.keys(obj.search));
        
        // Search for arrays containing products
        for (const key of Object.keys(obj)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            const str = JSON.stringify(obj[key]);
            if (str.includes('productName') || str.includes('productTitle') || str.includes('thumbnailUrl') || str.includes('brandName')) {
              console.log(`Key "${key}" contains product info! Subkeys:`, Object.keys(obj[key]));
            }
          }
        }
      } catch (e) {
        console.log('Parse error:', e.message);
      }
    }
  });
});
