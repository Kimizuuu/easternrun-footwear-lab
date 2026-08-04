const fs = require('fs');
const https = require('https');

const url = 'https://www.zappos.com/search?term=adidas+supernova+rise&filter%5Bzc1%5D%5B0%5D=Shoes';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    const idx = data.indexOf('window.__INITIAL_STATE__');
    if (idx !== -1) {
      console.log('Snippet of state:\n', data.substring(idx, idx + 2500));
    } else {
      console.log('window.__INITIAL_STATE__ not found');
    }
  });
});
