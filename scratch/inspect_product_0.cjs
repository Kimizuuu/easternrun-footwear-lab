const fs = require('fs');
const https = require('https');

const url = 'https://www.zappos.com/search?term=adidas+supernova+rise&filter%5Bzc1%5D%5B0%5D=Shoes';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const stateMatch = data.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
    if (stateMatch) {
      const obj = JSON.parse(stateMatch[1]);
      if (obj.products && obj.products.list && obj.products.list.length > 0) {
        console.log('Product 0 keys:', Object.keys(obj.products.list[0]));
        console.log('Product 0 full obj:\n', JSON.stringify(obj.products.list[0], null, 2));
      }
    }
  });
});
