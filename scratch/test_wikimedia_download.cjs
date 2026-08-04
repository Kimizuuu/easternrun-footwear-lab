const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Adidas_Adizero_Boston_12_Taipei_Marathon_Collaboration_Edition.jpeg';
const dest = path.join(__dirname, '../public/images/western/adidas_primex2strung/1.webp');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  if (res.statusCode === 200) {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close(() => console.log('✅ Success downloading Wikimedia Adizero image!'));
    });
  } else {
    console.log('Failed status:', res.statusCode);
  }
});
