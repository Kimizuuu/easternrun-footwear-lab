const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// Replace Furious Future 2.0
content = content.replace(
  `id: 'three61-furious-future-2',
    name: '361° Furious Future 2.0',
    brand: '361°',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day 🏆',
    image: '/images/shoes/361_furious_future_2_0_1.webp',`,
  `id: 'three61-furious-future-2',
    name: '361° Furious Future 2.0',
    brand: '361°',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day 🏆',
    image: '/images/shoes/thumb_furious_future_2_0.png',`
);

// Replace Flame 5
content = content.replace(
  `id: 'three61-flame-5',
    name: '361° Flame 5',
    brand: '361°',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts ⚡',
    image: '/images/shoes/361_flame_5_1.webp',`,
  `id: 'three61-flame-5',
    name: '361° Flame 5',
    brand: '361°',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts ⚡',
    image: '/images/shoes/thumb_flame_5.png',`
);

// Replace Biospeed 3.5 Pro
content = content.replace(
  `id: 'three61-biospeed-3-5-pro',
    name: '361° Biospeed 3.5 Pro',
    brand: '361°',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts ⚡',
    image: '/images/shoes/361_biospeed_3_5_pro_1.webp',`,
  `id: 'three61-biospeed-3-5-pro',
    name: '361° Biospeed 3.5 Pro',
    brand: '361°',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts ⚡',
    image: '/images/shoes/thumb_biospeed_3_5_pro.png',`
);

// Replace Fierce 6
content = content.replace(
  `id: 'three61-fierce-6',
    name: '361° Fierce 6',
    brand: '361°',
    category: 'Max Cushion',
    dominantSector: 'Daily Mileage & Training 🏃',
    image: '/images/shoes/361_fierce_6_1.webp',`,
  `id: 'three61-fierce-6',
    name: '361° Fierce 6',
    brand: '361°',
    category: 'Max Cushion',
    dominantSector: 'Daily Mileage & Training 🏃',
    image: '/images/shoes/thumb_fierce_6.png',`
);

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('Successfully updated shoesData.ts with user thumbnails!');
