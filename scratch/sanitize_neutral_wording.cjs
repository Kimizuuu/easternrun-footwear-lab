const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const srcDir = path.join(__dirname, '..', 'src');

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');

    let original = content;

    // Replace origin references with neutral professional wording
    content = content.replace(/Eastern Footwear Revolution/g, 'Performance Footwear Intelligence');
    content = content.replace(/Eastern Footwear/g, 'Performance Footwear');
    content = content.replace(/The Eastern Footwear Revolution/g, 'Performance Footwear Benchmark Lab');
    content = content.replace(/Chinese running footwear/g, 'performance running footwear');
    content = content.replace(/Chinese marathon super-shoes/g, 'marathon super-shoes');
    content = content.replace(/Chinese brands/g, 'footwear manufacturers');
    content = content.replace(/Chinese models/g, 'performance footwear models');
    content = content.replace(/Chinese footwear/g, 'athletic footwear');
    content = content.replace(/Chinese running shoes/g, 'running shoes');
    content = content.replace(/leading Chinese/g, 'leading performance');
    content = content.replace(/many Chinese daily trainers/g, 'many performance daily trainers');
    content = content.replace(/many Chinese brands/g, 'many footwear brands');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Sanitized neutral wording in: ${filePath}`);
    }
  }
});
