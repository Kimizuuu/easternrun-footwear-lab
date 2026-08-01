const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

// Update Nike Western shoe thumbnails to 8.avif (the official lateral side view)
content = content.replace(
  "id: 'nike_alphafly3',\n    name: 'Nike Alphafly 3',\n    brand: 'Nike',\n    category: 'Marathon Super-Shoe',\n    dominantSector: 'Marathon Race Day',\n    image: '/images/western/alphafly_3/1.avif'",
  "id: 'nike_alphafly3',\n    name: 'Nike Alphafly 3',\n    brand: 'Nike',\n    category: 'Marathon Super-Shoe',\n    dominantSector: 'Marathon Race Day',\n    image: '/images/western/alphafly_3/8.avif'"
);

content = content.replace(
  "id: 'nike_vaporfly3',\n    name: 'Nike Vaporfly 3',\n    brand: 'Nike',\n    category: 'Marathon Super-Shoe',\n    dominantSector: 'Marathon Race Day',\n    image: '/images/western/vaporfly_4/1.avif'",
  "id: 'nike_vaporfly3',\n    name: 'Nike Vaporfly 3',\n    brand: 'Nike',\n    category: 'Marathon Super-Shoe',\n    dominantSector: 'Marathon Race Day',\n    image: '/images/western/vaporfly_4/8.avif'"
);

content = content.replace(
  "id: 'nike_zoomfly6',\n    name: 'Nike Zoom Fly 6',\n    brand: 'Nike',\n    category: 'Tempo & Race',\n    dominantSector: 'Tempo & Speed Workouts',\n    image: '/images/western/zoomfly_6/1.avif'",
  "id: 'nike_zoomfly6',\n    name: 'Nike Zoom Fly 6',\n    brand: 'Nike',\n    category: 'Tempo & Race',\n    dominantSector: 'Tempo & Speed Workouts',\n    image: '/images/western/zoomfly_6/8.avif'"
);

content = content.replace(
  "id: 'nike_pegasus41',\n    name: 'Nike Pegasus 41',\n    brand: 'Nike',\n    category: 'Daily Trainer',\n    dominantSector: 'Daily Mileage & Training',\n    image: '/images/western/pegasus_42/1.avif'",
  "id: 'nike_pegasus41',\n    name: 'Nike Pegasus 41',\n    brand: 'Nike',\n    category: 'Daily Trainer',\n    dominantSector: 'Daily Mileage & Training',\n    image: '/images/western/pegasus_42/8.avif'"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated Nike thumbnails to official side-facing 8.avif images!');
