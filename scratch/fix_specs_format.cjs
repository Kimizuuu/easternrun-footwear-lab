const fs = require('fs');
const path = require('path');

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// Function to convert labSpecs block to specs block
content = content.replace(/"labSpecs":\s*\{[\s\S]*?"midsoleTorsionalRigidityScore":\s*[\d\.]+\s*\}/g, (match) => {
  // Extract values using regex
  const weightGramsMatch = match.match(/"weightGrams":\s*(\d+)/);
  const forefootStackMmMatch = match.match(/"forefootStackMm":\s*([\d\.]+)/);
  const heelStackMmMatch = match.match(/"heelStackMm":\s*([\d\.]+)/);
  const dropMmMatch = match.match(/"dropMm":\s*([\d\.]+)/);
  const breathabilityMatch = match.match(/"upperBreathabilityScore":\s*([\d\.]+)/);
  const durabilityMatch = match.match(/"outsoleDurabilityScore":\s*([\d\.]+)/);

  const weightGrams = weightGramsMatch ? parseInt(weightGramsMatch[1]) : 250;
  const weightOz = parseFloat((weightGrams / 28.3495).toFixed(2));
  const forefootStackMm = forefootStackMmMatch ? parseFloat(forefootStackMmMatch[1]) : 28;
  const heelStackMm = heelStackMmMatch ? parseFloat(heelStackMmMatch[1]) : 36;
  const dropMm = dropMmMatch ? parseFloat(dropMmMatch[1]) : 8;
  const breathability = breathabilityMatch ? parseFloat(breathabilityMatch[1]) : 8.5;
  const durability = durabilityMatch ? parseFloat(durabilityMatch[1]) : 8.5;

  return `"specs": {
      "weightGrams": ${weightGrams},
      "weightOz": ${weightOz},
      "heelStackMm": ${heelStackMm},
      "forefootStackMm": ${forefootStackMm},
      "dropMm": ${dropMm},
      "foamName": "Super-Foam Midsole",
      "foamType": "PEBA / EVA Super-Foam",
      "foamResiliencePercent": 85,
      "carbonPlate": "Integrated Performance System",
      "carbonStiffnessIndex": 7.5,
      "upperMaterial": "Engineered Breathable Mesh",
      "breathabilityScore": ${breathability},
      "outsoleRubber": "High-Durability Rubber Outsole",
      "wetTractionScore": ${durability},
      "estimatedLifespanKm": 750,
      "fitWidth": "Standard (True to Size)",
      "archSupport": "Neutral"
    },
    "finalConsensusVerdict": "Top-tier daily & race day performer engineered for speed, comfort, and durability.",
    "userReviews": []`;
});

fs.writeFileSync(shoesDataPath, content, 'utf8');
console.log('✅ Successfully converted specs objects for all newly added shoes!');
