const fs = require('fs');
const https = require('https');
const path = require('path');

const ids = [
  '71LW2CPSoHL',
  '71US7q83SML',
  '71OLtEJD0pL',
  '61t1iC6S7JL',
  '713ZuxVVDDL',
  '71KhkfrdZvL',
  '611GbyneajL',
  '61-jQ-DfteL',
  '61bx-2K2k2L',
  '61LygNVjUrL',
  '71OJU8QIu1L',
  '71JpTFek-qL',
  '71zlK3uROXL',
  '81-HqktZkhL',
  '717uCLJmo1L',
  '81CcqjBxzkL'
];

async function main() {
  const scratchDir = path.join(__dirname, 'test_takumi_imgs');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const url = `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;
    const dest = path.join(scratchDir, `${i}_${id}.jpg`);
    
    await new Promise(resolve => {
      https.get(url, res => {
        if (res.statusCode === 200) {
          const stream = fs.createWriteStream(dest);
          res.pipe(stream);
          stream.on('finish', () => {
            stream.close();
            console.log(`Saved ${i}: ${id} (${fs.statSync(dest).size} bytes)`);
            resolve();
          });
        } else {
          console.log(`Failed ${id}: ${res.statusCode}`);
          resolve();
        }
      }).on('error', err => resolve());
    });
  }
}

main();
