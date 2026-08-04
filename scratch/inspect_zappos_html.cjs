const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://www.zappos.com/p/adidas-running-adizero-takumi-sen-10-core-black-zero-metallic-aurora-black/product/9910199/color/1094006';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'zappos_takumi.html'), data, 'utf8');
    console.log('Saved zappos_takumi.html, length:', data.length);
    
    // Find all img tags or media-amazon URLs
    const imgMatches = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Found img tags:', imgMatches.length);
    imgMatches.slice(0, 15).forEach((src, i) => console.log(` ${i}: ${src}`));

    // Search for media-amazon
    const mediaAmazon = [...data.matchAll(/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9%_\-\.]+/g)].map(m => m[0]);
    console.log('\nMedia amazon matches:', mediaAmazon.length);
    const unique = [...new Set(mediaAmazon)];
    unique.slice(0, 20).forEach((src, i) => console.log(` ${i}: ${src}`));
  });
});
