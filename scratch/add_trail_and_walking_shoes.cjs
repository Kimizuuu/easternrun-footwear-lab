const fs = require('fs');
const path = require('path');

const trailAndWalkingShoes = [
  // --- TRAIL RUNNING CHAMPIONS ---
  {
    id: 'salomon_speedcross6',
    name: 'Salomon Speedcross 6',
    brand: 'Salomon',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/speedcross_6/1.webp',
    galleryImages: [
      '/images/western/speedcross_6/1.webp'
    ],
    msrpUsd: 150,
    msrpRmb: 1199,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '5.5mm Mud Contagrip Lugs — The Undisputed King of Technical Trails',
    description: 'The Salomon Speedcross 6 is the gold standard for technical trail running and mud. Featuring deep 5.5mm chevron Contagrip lugs, Quicklace system, and Sensifit foot wrap.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 80,
      dailyRunScore: 82,
      speedWorkoutScore: 75,
      marathonRaceScore: 60,
      longDistanceScore: 88,
      trailScore: 97,
      durabilityScore: 94
    },
    communityPros: [
      'Unrivaled 97/100 traction on deep mud, loose dirt, and wet terrain',
      'Quicklace system allows instant micro-adjustments',
      'Tough anti-debris mesh prevents rocks and sand from entering'
    ],
    communityCons: [
      'Deep lugs wear down faster if worn on hard flat asphalt'
    ],
    specs: {
      weightGrams: 298,
      weightOz: 10.51,
      heelStackMm: 32,
      forefootStackMm: 22,
      dropMm: 10,
      foamName: 'EnergyCell+ High-Rebound EVA',
      foamType: 'High-Density Trail EVA',
      foamResiliencePercent: 78,
      carbonPlate: 'None (Protective Trail Shank)',
      carbonStiffnessIndex: 5.0,
      upperMaterial: 'Anti-Debris Ripstop Mesh',
      breathabilityScore: 7.8,
      outsoleRubber: 'Mud Contagrip® 5.5mm Lugs',
      wetTractionScore: 9.8,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Pinnacle Technical Trail Weapon. Unbeatable grip for mud, mountain descents, and rough singletrack.',
    userReviews: []
  },
  {
    id: 'hoka_speedgoat6',
    name: 'HOKA Speedgoat 6',
    brand: 'HOKA',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/speedgoat_6/1.webp',
    galleryImages: [
      '/images/western/speedgoat_6/1.webp'
    ],
    msrpUsd: 155,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Vibram Megagrip Traction Lug Mountain Ultra Monster',
    description: 'Named after Karl "Speedgoat" Meltzer, the Speedgoat 6 combines a lighter CMEVA midsole stack with Vibram Megagrip Traction Lugs for supreme cushion and mountain trail stability.',
    overallRating: 94,
    useCaseValues: {
      walkingScore: 88,
      dailyRunScore: 90,
      speedWorkoutScore: 78,
      marathonRaceScore: 70,
      longDistanceScore: 96,
      trailScore: 96,
      durabilityScore: 92
    },
    communityPros: [
      'Vibram Megagrip with Traction Lugs grips wet rock and loose gravel',
      'Massive stack protects feet on 50km+ ultra-marathon trails',
      'Lighter 278g build over Speedgoat 5'
    ],
    communityCons: [
      'Toe box can feel snug for wide forefeet (order Wide version)'
    ],
    specs: {
      weightGrams: 278,
      weightOz: 9.81,
      heelStackMm: 38,
      forefootStackMm: 33,
      dropMm: 5,
      foamName: 'Compression Molded EVA',
      foamType: 'Lightweight Resilient Trail EVA',
      foamResiliencePercent: 82,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.5,
      upperMaterial: 'Woven Textile Upper',
      breathabilityScore: 8.3,
      outsoleRubber: 'Vibram® Megagrip with Traction Lug',
      wetTractionScore: 9.7,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'America’s #1 Mountain Trail & Ultra-Marathon Shoe. Incredible Vibram grip meets max trail cushion.',
    userReviews: []
  },
  {
    id: 'nike_pegasustrail5',
    name: 'Nike Pegasus Trail 5',
    brand: 'Nike',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/pegasus_trail5/1.webp',
    galleryImages: [
      '/images/western/pegasus_trail5/1.webp'
    ],
    msrpUsd: 150,
    msrpRmb: 1099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'ReactX Foam Door-to-Trail Hybrid Cruiser',
    description: 'Upgraded with high-energy ReactX foam and Nike’s new All-Terrain Compound (ATC) rubber, the Pegasus Trail 5 seamlessly transitions from city pavement to forest singletrack.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 92,
      dailyRunScore: 92,
      speedWorkoutScore: 80,
      marathonRaceScore: 72,
      longDistanceScore: 89,
      trailScore: 91,
      durabilityScore: 90
    },
    communityPros: [
      'ReactX foam gives 13% more energy return and smooth road feel',
      'All-Terrain Compound rubber greatly improves wet rock traction over v4',
      'Perfect 50/50 door-to-trail versatility'
    ],
    communityCons: [
      'Not designed for knee-deep thick mud'
    ],
    specs: {
      weightGrams: 286,
      weightOz: 10.09,
      heelStackMm: 37,
      forefootStackMm: 27,
      dropMm: 10,
      foamName: 'Nike ReactX Foam',
      foamType: 'High-Resilience Bio-React Foam',
      foamResiliencePercent: 84,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.0,
      upperMaterial: 'Engineered Mesh with Flywire',
      breathabilityScore: 8.5,
      outsoleRubber: 'Nike All-Terrain Compound (ATC)',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Best Road-to-Trail Hybrid. Silky ReactX foam transitions effortlessly from street to trail.',
    userReviews: []
  },
  {
    id: 'altra_lonepeak8',
    name: 'Altra Lone Peak 8',
    brand: 'Altra',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/lonepeak_8/1.webp',
    galleryImages: [
      '/images/western/lonepeak_8/1.webp'
    ],
    msrpUsd: 150,
    msrpRmb: 1199,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Zero Drop Original FootShape™ Legendary Trail Icon',
    description: 'The cult-classic trail shoe loved by thru-hikers and trail runners. Featuring Altra’s Zero Drop platform, roomy FootShape™ toe box, and MaxTrac sticky rubber lugs.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 94,
      dailyRunScore: 88,
      speedWorkoutScore: 74,
      marathonRaceScore: 65,
      longDistanceScore: 92,
      trailScore: 94,
      durabilityScore: 89
    },
    communityPros: [
      'Original FootShape toe box lets toes splay naturally',
      'Zero Drop (0mm) promotes natural healthy posture and gait',
      'MaxTrac rubber lugs grip dirt and rocks'
    ],
    communityCons: [
      'Zero Drop requires an adjustment period if transitioning from 10mm shoes'
    ],
    specs: {
      weightGrams: 303,
      weightOz: 10.69,
      heelStackMm: 25,
      forefootStackMm: 25,
      dropMm: 0,
      foamName: 'Altra EGO™ Midsole',
      foamType: 'Responsive Comfort EVA',
      foamResiliencePercent: 80,
      carbonPlate: 'None (StoneGuard™ Protection)',
      carbonStiffnessIndex: 3.5,
      upperMaterial: 'Refreshed Ripstop Mesh Upper',
      breathabilityScore: 8.2,
      outsoleRubber: 'MaxTrac™ Sticky Rubber',
      wetTractionScore: 9.0,
      estimatedLifespanKm: 800,
      fitWidth: 'Wide Friendly',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Thru-Hiker & Trail Runner Legend. Unrivaled natural toe splay and Zero Drop balance.',
    userReviews: []
  },

  // --- ON RUNNING WALKING & RUNNING ---
  {
    id: 'on_cloud5',
    name: 'On Cloud 5',
    brand: 'On Running',
    category: 'Daily Trainer',
    dominantSector: 'Casual Walking & All-Day Wear',
    image: '/images/western/cloud_5/1.webp',
    galleryImages: [
      '/images/western/cloud_5/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 1099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Speed-Lacing CloudTec Zero-Gravity All-Day Travel Icon',
    description: 'Swiss-engineered for daily wear, travel, and walking. The On Cloud 5 features signature CloudTec pods in Zero-Gravity foam, Speedboard transition plate, and hands-free speed lacing.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 96,
      dailyRunScore: 78,
      speedWorkoutScore: 65,
      marathonRaceScore: 55,
      longDistanceScore: 70,
      trailScore: 50,
      durabilityScore: 86
    },
    communityPros: [
      'Unbeatable 96/100 all-day walking, airport, and urban travel comfort',
      'Speed-lacing system lets you slip in and out instantly',
      'Ultra-light 250g weight with crisp Swiss design aesthetic'
    ],
    communityCons: [
      'CloudTec pods can pick up small gravel pebbles on loose dirt paths'
    ],
    specs: {
      weightGrams: 250,
      weightOz: 8.82,
      heelStackMm: 28,
      forefootStackMm: 20,
      dropMm: 8,
      foamName: 'CloudTec® Zero-Gravity Foam',
      foamType: 'Hollow Pod EVA Cushioning',
      foamResiliencePercent: 78,
      carbonPlate: 'Speedboard® Flex Plate',
      carbonStiffnessIndex: 4.0,
      upperMaterial: '44% Recycled Breathable Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'Abrasive Pad Rubber Grip',
      wetTractionScore: 8.0,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Global Lifestyle & Walking Icon. Premium Swiss engineering for all-day standing and travel.',
    userReviews: []
  },
  {
    id: 'on_cloudmonster2',
    name: 'On Cloudmonster 2',
    brand: 'On Running',
    category: 'Max Cushion',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/cloudmonster_2/1.webp',
    galleryImages: [
      '/images/western/cloudmonster_2/1.webp'
    ],
    msrpUsd: 180,
    msrpRmb: 1399,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Massive Dual-Density Helion CloudTec Max-Cushion Monster',
    description: 'On’s biggest CloudTec pods ever. The Cloudmonster 2 layers dual-density Helion super-foam around a reworked nylon Speedboard for maximum energy return and giant stack cushion.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 94,
      dailyRunScore: 94,
      speedWorkoutScore: 84,
      marathonRaceScore: 86,
      longDistanceScore: 94,
      trailScore: 55,
      durabilityScore: 88
    },
    communityPros: [
      'Huge Helion foam CloudTec pods give monster bounce',
      'Nylon Speedboard propels forward stride',
      'Super comfortable spacious forefoot upper fit'
    ],
    communityCons: [
      'Firm initial step-in compared to marshmallow foams'
    ],
    specs: {
      weightGrams: 295,
      weightOz: 10.40,
      heelStackMm: 35,
      forefootStackMm: 29,
      dropMm: 6,
      foamName: 'Dual-Density Helion™ Super-Foam',
      foamType: 'Super-Cushion Helion EVA/OBC',
      foamResiliencePercent: 85,
      carbonPlate: 'Nylon Blend Speedboard®',
      carbonStiffnessIndex: 6.5,
      upperMaterial: '100% Recycled Polyester Mesh',
      breathabilityScore: 8.6,
      outsoleRubber: 'Enhanced Rubber Grip Compound',
      wetTractionScore: 8.5,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Monster Bounce & Max Cushion. Outstanding energy return for long miles and recovery.',
    userReviews: []
  },

  // --- ASICS GEL-NIMBUS ---
  {
    id: 'asics_gelnimbus26',
    name: 'ASICS GEL-Nimbus 26',
    brand: 'ASICS',
    category: 'Max Cushion',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/nimbus_26/1.webp',
    galleryImages: [
      '/images/western/nimbus_26/1.webp'
    ],
    msrpUsd: 160,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'PureGEL + HYBRID ASICSGRIP Cloud-Soft Cushion Masterpiece',
    description: 'The GEL-Nimbus 26 upgrades ASICS’ flagship max-cushion trainer with HYBRID ASICSGRIP outsole rubber and FF BLAST+ ECO foam for cloud-like shock absorption on long runs and walks.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 96,
      dailyRunScore: 94,
      speedWorkoutScore: 78,
      marathonRaceScore: 84,
      longDistanceScore: 95,
      trailScore: 58,
      durabilityScore: 92
    },
    communityPros: [
      'Marshmallow-soft PureGEL heel insert completely absorbs heavy impacts',
      'HYBRID ASICSGRIP outsole greatly improves wet road traction over v25',
      'Knit collar wraps ankle like a soft sock'
    ],
    communityCons: [
      'Warm upper in hot 30°C+ summer weather'
    ],
    specs: {
      weightGrams: 304,
      weightOz: 10.72,
      heelStackMm: 41.5,
      forefootStackMm: 33.5,
      dropMm: 8,
      foamName: 'FF BLAST™ PLUS ECO & PureGEL',
      foamType: 'Bio-Based Max Cushion EVA + Gel',
      foamResiliencePercent: 84,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.0,
      upperMaterial: 'Engineered Stretch Knit',
      breathabilityScore: 8.0,
      outsoleRubber: 'HYBRID ASICSGRIP™ Rubber',
      wetTractionScore: 9.2,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Pinnacle Cloud-Cushion Luxury. Supreme shock dampening for recovery runs, long distance, and walking.',
    userReviews: []
  }
];

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const newItemsCode = trailAndWalkingShoes.map(s => JSON.stringify(s, null, 2)).join(',\n  ');

const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx !== -1) {
  const updatedContent = content.substring(0, lastBracketIdx) + ',\n  ' + newItemsCode + '\n];\n';
  fs.writeFileSync(shoesDataPath, updatedContent, 'utf8');
  console.log(`✅ Successfully added ${trailAndWalkingShoes.length} top trail, walking, and road shoes!`);
} else {
  console.log('❌ Could not find ending ]; in shoesData.ts');
}
