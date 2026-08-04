const fs = require('fs');
const path = require('path');

// Sleek EasternRun Footwear Lab Brand Favicon (Dark Slate + Electric Blue Running Shoe Dynamic Emblem)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#0F172A"/>
  <defs>
    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
  </defs>
  <!-- Dynamic Footwear Sole / Speed Wing Icon -->
  <path d="M120 340 C 180 340, 240 280, 320 220 L 390 170 C 400 162, 395 145, 380 145 L 290 145 C 230 145, 170 200, 120 250 Z" fill="url(#blueGlow)" />
  <path d="M140 370 C 210 370, 280 310, 360 250 L 400 220 C 410 212, 405 195, 390 195 L 340 195 C 270 195, 200 260, 140 310 Z" fill="#38BDF8" opacity="0.8" />
  <circle cx="380" cy="145" r="16" fill="#38BDF8"/>
</svg>`;

const faviconPath = path.join(__dirname, '..', 'public', 'favicon.svg');
fs.writeFileSync(faviconPath, faviconSvg, 'utf8');

console.log(`✅ Generated premium EasternRun brand favicon at ${faviconPath}`);
