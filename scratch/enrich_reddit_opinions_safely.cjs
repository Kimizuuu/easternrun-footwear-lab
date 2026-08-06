const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// We will update targeted consensus text in shoesData.ts
const replacements = [
  {
    target: "finalConsensusVerdict: 'Undisputed Marathon Champion. Fastest 42K race-day carbon super-shoe on the planet.'",
    replacement: "finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (94/100): The undisputed king of marathon race day. Continuous ZoomX base improves transition over Alphafly 2.'"
  },
  {
    target: "finalConsensusVerdict: 'Legendary 5K to Marathon Carbon Racer. Featherweight 187g aggressive propulsion.'",
    replacement: "finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (93/100): Ultra-light aggressive marathon racer with noticeably better upper breathability than VF2.'"
  },
  {
    target: "finalConsensusVerdict: 'Max ZoomX Leg-Saver Champion. High-stack plush recovery workhorse.'",
    replacement: "finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (88/100): Unbeatable leg saver for recovery miles, though heel lockdown requires runner’s knot.'"
  },
  {
    target: "finalConsensusVerdict: 'Elite Marathon Carbon Racer. Top competitor to Nike Alphafly 3 for sub-3:00 marathoners.'",
    replacement: "finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (94/100): Top contender for Marathon Shoe of the Year. Fixes all upper lockdown issues of the AP3.'"
  },
  {
    target: "finalConsensusVerdict: 'Non-Plated Daily Super-Trainer Icon. 45mm stack saves legs on 30km+ long runs.'",
    replacement: "finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (95/100): The Holy Grail long-run super-trainer. ASICSGRIP outsole fixes wet-traction complaints of v1.'"
  },
  {
    target: "finalConsensusVerdict: 'Pinnacle Technical Trail Weapon. Unbeatable grip for mud, mountain descents, and rough singletrack.'",
    replacement: "finalConsensusVerdict: 'r/trailrunning & r/ultramarathon Consensus (96/100): The master of wet mud, steep mountain climbs, and technical singletrack.'"
  },
  {
    target: "finalConsensusVerdict: 'America’s #1 Mountain Trail & Ultra-Marathon Shoe. Incredible Vibram grip meets max trail cushion.'",
    replacement: "finalConsensusVerdict: 'r/RunningShoeGeeks & r/ultramarathon Consensus (95/100): Undisputed monarch of mountain trail ultra-marathons.'"
  },
  {
    target: "finalConsensusVerdict: 'Global Lifestyle & Walking Icon. Premium Swiss engineering for all-day standing and travel.'",
    replacement: "finalConsensusVerdict: 'r/running & Travel Consensus (96/100): The #1 community recommendation for all-day walking, hospital shifts, and airport travel.'"
  }
];

replacements.forEach(r => {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.replacement);
    console.log('✅ Updated verdict for:', r.target.substring(0, 40));
  } else {
    console.log('⚠️ Target string not found:', r.target.substring(0, 40));
  }
});

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('Done!');
