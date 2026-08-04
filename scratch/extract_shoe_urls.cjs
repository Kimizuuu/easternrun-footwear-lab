const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('C:/Users/manib/.gemini/antigravity/brain/556e34b7-8a03-49dc-a2d0-fd20d7402963/.system_generated/steps/3231/content.md', 'utf8');

// Find all m.media-amazon.com URLs
const matches = content.match(/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9%_\-\.]+/g) || [];
console.log('Total matches:', matches.length);
const unique = [...new Set(matches)];
console.log('Unique matches:', unique.slice(0, 30));
