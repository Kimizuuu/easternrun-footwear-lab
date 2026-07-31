const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');

let content = fs.readFileSync(shoesDataPath, 'utf8');

content = content.replace(/'Marathon Race Day '/g, "'Marathon Race Day'");
content = content.replace(/'Tempo & Speed Workouts '/g, "'Tempo & Speed Workouts'");
content = content.replace(/'Daily Mileage & Training '/g, "'Daily Mileage & Training'");
content = content.replace(/'Casual Walking & All-Day Wear '/g, "'Casual Walking & All-Day Wear'");

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('Fixed trailing spaces in shoesData.ts');
