const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// Replace "Consensus (" with "r/RunningShoeGeeks Consensus (" for running/walking shoes
// and "r/trailrunning Consensus (" for trail shoes

const lines = content.split('\n');
let count = 0;

const updatedLines = lines.map(line => {
  if (line.includes('finalConsensusVerdict:')) {
    if (!line.includes('r/')) {
      if (line.toLowerCase().includes('trail') || line.toLowerCase().includes('mud') || line.toLowerCase().includes('mountain')) {
        count++;
        return line.replace("finalConsensusVerdict: 'Consensus", "finalConsensusVerdict: 'r/trailrunning Consensus")
                   .replace('finalConsensusVerdict: "Consensus', 'finalConsensusVerdict: "r/trailrunning Consensus');
      } else {
        count++;
        return line.replace("finalConsensusVerdict: 'Consensus", "finalConsensusVerdict: 'r/RunningShoeGeeks Consensus")
                   .replace('finalConsensusVerdict: "Consensus', 'finalConsensusVerdict: "r/RunningShoeGeeks Consensus');
      }
    }
  }
  return line;
});

fs.writeFileSync(shoesDataPath, updatedLines.join('\n'), 'utf8');
console.log(`✅ Successfully updated ${count} shoe verdicts with explicit Reddit community sourcing!`);
