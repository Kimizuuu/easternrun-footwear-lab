const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// Replace dailyTrainerScore -> dailyRunScore
content = content.replace(/["']?dailyTrainerScore["']?\s*:/g, '"dailyRunScore":');

// Replace tempoWorkoutScore -> speedWorkoutScore
content = content.replace(/["']?tempoWorkoutScore["']?\s*:/g, '"speedWorkoutScore":');

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('✅ Successfully fixed useCaseValues property names in shoesData.ts!');
