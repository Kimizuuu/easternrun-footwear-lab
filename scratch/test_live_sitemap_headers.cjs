const https = require('https');

function testEndpoint(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' } }, (res) => {
      console.log(`\n========================================`);
      console.log(`URL: ${url}`);
      console.log(`HTTP Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`Headers:`, res.headers);
      
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`Body length: ${body.length} bytes`);
        console.log(`First 200 chars:\n${body.substring(0, 200)}`);
        resolve();
      });
    }).on('error', (err) => {
      console.log(`Error testing ${url}:`, err.message);
      resolve();
    });
  });
}

async function main() {
  await testEndpoint('https://easternrun.fit/sitemap.xml');
  await testEndpoint('https://easternrun.fit/robots.txt');
  await testEndpoint('http://easternrun.fit/sitemap.xml');
}

main();
