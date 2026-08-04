const fs = require('fs');
const path = require('path');

const additionalShoes = [
  // --- WALKING & ALL-DAY COMFORT SHOES ---
  {
    id: 'skechers_gowalk7',
    name: 'Skechers GO WALK 7',
    brand: 'Skechers',
    category: 'Daily Trainer',
    dominantSector: 'Casual Walking & All-Day Wear',
    image: '/images/western/gowalk_7/1.webp',
    galleryImages: [
      '/images/western/gowalk_7/1.webp'
    ],
    msrpUsd: 85,
    msrpRmb: 599,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'High-Rebound Hyper Pillars for Ultimate All-Day Standing & Walking',
    description: 'Designed specifically for walking and all-day standing comfort, the Skechers GO WALK 7 pairs lightweight ULTRA GO cushioning with high-rebound Hyper Pillar Technology and an Air-Cooled Goga Mat insole.',
    overallRating: 89,
    useCaseValues: {
      walkingScore: 98,
      dailyRunScore: 65,
      speedWorkoutScore: 50,
      marathonRaceScore: 40,
      longDistanceScore: 60,
      trailScore: 50,
      durabilityScore: 88
    },
    communityPros: [
      'Unrivaled 98/100 all-day walking and standing comfort',
      'Hyper Pillar Technology absorbs ground impact effortlessly',
      'Slip-on hands-free convenience with breathable stretch upper'
    ],
    communityCons: [
      'Not designed for fast running or marathon training',
      'Soft outsole pillars wear down faster on rough gravel'
    ],
    specs: {
      weightGrams: 235,
      weightOz: 8.29,
      heelStackMm: 32,
      forefootStackMm: 24,
      dropMm: 8,
      foamName: 'ULTRA GO + Hyper Pillars',
      foamType: 'High-Rebound Cushioning Foam',
      foamResiliencePercent: 82,
      carbonPlate: 'None (Flexible Walk Geometry)',
      carbonStiffnessIndex: 2.0,
      upperMaterial: 'Stretch Fit Engineered Knit',
      breathabilityScore: 9.0,
      outsoleRubber: 'Dual-Density Traction Outsole',
      wetTractionScore: 8.2,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'The Gold Standard sub-$90 all-day walking shoe. Essential for nurses, commuters, and long-standing shifts.',
    userReviews: []
  },
  {
    id: 'hoka_bondi8',
    name: 'HOKA Bondi 8',
    brand: 'HOKA',
    category: 'Max Cushion',
    dominantSector: 'Casual Walking & All-Day Wear',
    image: '/images/western/bondi_8/1.webp',
    galleryImages: [
      '/images/western/bondi_8/1.webp'
    ],
    msrpUsd: 165,
    msrpRmb: 1399,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Ultrasoft Extended Heel Rocker for Maximum Walking & Recovery Cushion',
    description: 'The HOKA Bondi 8 is the benchmark max-cushion walking and recovery shoe. Featuring a huge stack of lightweight EVA foam, plush memory foam collar, and smooth Meta-Rocker transition.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 97,
      dailyRunScore: 88,
      speedWorkoutScore: 62,
      marathonRaceScore: 75,
      longDistanceScore: 92,
      trailScore: 55,
      durabilityScore: 89
    },
    communityPros: [
      'Massive EVA stack eliminates foot fatigue during 12+ hour standing shifts',
      'Memory foam heel collar prevents heel slipping',
      'Early-stage Meta-Rocker creates effortless walking gait'
    ],
    communityCons: [
      'Wide footprint can feel bulky for driving or narrow spaces',
      'Heavy for speed workouts'
    ],
    specs: {
      weightGrams: 307,
      weightOz: 10.83,
      heelStackMm: 39,
      forefootStackMm: 35,
      dropMm: 4,
      outsoleDurabilityScore: 8.8,
      foamName: 'Lightweight Marshmallow EVA',
      foamType: 'Super-Plush Compression Molded EVA',
      foamResiliencePercent: 80,
      carbonPlate: 'None',
      carbonStiffnessIndex: 3.5,
      upperMaterial: 'Engineered Mesh & Memory Foam Collar',
      breathabilityScore: 8.2,
      outsoleRubber: 'Zonal Durabrasion Rubber',
      wetTractionScore: 8.5,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Pinnacle Max-Cushion Walking & Recovery Cruiser. Saves feet and joints on hard concrete floors.',
    userReviews: []
  },
  {
    id: 'brooks_ghost16',
    name: 'Brooks Ghost 16',
    brand: 'Brooks',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/ghost_16/1.webp',
    galleryImages: [
      '/images/western/ghost_16/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 1099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Nitrogen-Infused DNA LOFT v3 Workhorse for Walking & Running',
    description: 'Upgraded with nitrogen-infused DNA LOFT v3 foam, the Brooks Ghost 16 delivers a softer, lighter, and more durable ride for millions of daily runners and walkers worldwide.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 95,
      dailyRunScore: 94,
      speedWorkoutScore: 80,
      marathonRaceScore: 82,
      longDistanceScore: 89,
      trailScore: 65,
      durabilityScore: 94
    },
    communityPros: [
      'Nitrogen DNA LOFT v3 gives softer step-in step feeling',
      'Extremely durable RoadTack rubber lasts over 900+ km',
      'Versatile 95/100 walking and 94/100 daily running crossover'
    ],
    communityCons: [
      '12mm drop is traditional and high for forefoot strikers'
    ],
    specs: {
      weightGrams: 269,
      weightOz: 9.49,
      heelStackMm: 36,
      forefootStackMm: 24,
      dropMm: 12,
      foamName: 'DNA LOFT v3 Nitrogen-Infused',
      foamType: 'Supercritical Nitrogen-Infused Foam',
      foamResiliencePercent: 84,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.0,
      upperMaterial: 'Air Mesh Upper',
      breathabilityScore: 8.5,
      outsoleRubber: 'RoadTack Recycled Silica Rubber',
      wetTractionScore: 9.0,
      estimatedLifespanKm: 900,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'America’s Best-Selling Daily Workhorse. Flawless crossover between daily running and all-day walking.',
    userReviews: []
  },
  {
    id: 'nike_motiva',
    name: 'Nike Motiva',
    brand: 'Nike',
    category: 'Daily Trainer',
    dominantSector: 'Casual Walking & All-Day Wear',
    image: '/images/western/motiva/1.webp',
    galleryImages: [
      '/images/western/motiva/1.webp'
    ],
    msrpUsd: 110,
    msrpRmb: 799,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Comfortgroove Rocker Sole Designed Specifically for Walking & Pacing',
    description: 'Nike designed the Motiva from the ground up for walking, jog-walking, and active pacing. Featuring unique Comfortgroove bump outsole geometry that compresses to absorb every step.',
    overallRating: 88,
    useCaseValues: {
      walkingScore: 96,
      dailyRunScore: 78,
      speedWorkoutScore: 55,
      marathonRaceScore: 50,
      longDistanceScore: 75,
      trailScore: 52,
      durabilityScore: 87
    },
    communityPros: [
      'Comfortgroove outsole bumps compress underfoot for pillow landing',
      'Exaggerated forefoot rocker propels walking stride forward',
      'Wide forefoot fit avoids bunion pressure points'
    ],
    communityCons: [
      'Distinctive wavy look isn’t for everyone',
      'Heavier feel for fast running'
    ],
    specs: {
      weightGrams: 300,
      weightOz: 10.58,
      heelStackMm: 35,
      forefootStackMm: 27,
      dropMm: 8,
      foamName: 'Soft Cushion Foam + Comfortgroove Pods',
      foamType: 'High-Density Walking EVA',
      foamResiliencePercent: 78,
      carbonPlate: 'None',
      carbonStiffnessIndex: 3.0,
      upperMaterial: 'Soft Waterfall Collar Mesh',
      breathabilityScore: 8.0,
      outsoleRubber: 'Full Rubber Outsole with Bumps',
      wetTractionScore: 8.4,
      estimatedLifespanKm: 750,
      fitWidth: 'Wide Friendly',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Nike’s Purpose-Built Walking Innovation. Extremely smooth rocker for daily 10,000-step goals.',
    userReviews: []
  },

  // --- MORE TOP RUNNING SHOES ---
  {
    id: 'hoka_clifton9',
    name: 'HOKA Clifton 9',
    brand: 'HOKA',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/clifton_9/1.webp',
    galleryImages: [
      '/images/western/clifton_9/1.webp'
    ],
    msrpUsd: 145,
    msrpRmb: 1199,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Featherweight 248g Max-Cushion Daily Favorite',
    description: 'The Clifton 9 adds 3mm of stack height while shedding weight, delivering HOKA’s signature plush, effortless ride for daily training miles and long weekend runs.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 94,
      dailyRunScore: 93,
      speedWorkoutScore: 82,
      marathonRaceScore: 85,
      longDistanceScore: 92,
      trailScore: 60,
      durabilityScore: 86
    },
    communityPros: [
      'Lightweight 248g feel for a high-stack daily trainer',
      'Smooth Meta-Rocker transition keeps legs feeling fresh',
      'Plush step-in tongue and ankle collar'
    ],
    communityCons: [
      'Midfoot arch can feel narrow for flat-footed runners'
    ],
    specs: {
      weightGrams: 248,
      weightOz: 8.75,
      heelStackMm: 32,
      forefootStackMm: 27,
      dropMm: 5,
      foamName: 'Compression Molded EVA',
      foamType: 'Lightweight Resilient EVA',
      foamResiliencePercent: 82,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.0,
      upperMaterial: 'Engineered Knit Upper',
      breathabilityScore: 8.6,
      outsoleRubber: 'Durabrasion Rubber',
      wetTractionScore: 8.4,
      estimatedLifespanKm: 750,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Global Best-Seller Daily Cushion Trainer. The gold standard for soft, lightweight daily miles.',
    userReviews: []
  },
  {
    id: 'hoka_mach6',
    name: 'HOKA Mach 6',
    brand: 'HOKA',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/mach_6/1.webp',
    galleryImages: [
      '/images/western/mach_6/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 1099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Supercritical Foam Upgrade for Fast Non-Plated Speed Workouts',
    description: 'Upgraded with a single-density supercritical EVA midsole and full rubber outsole coverage, the Mach 6 delivers snappy, responsive speed without needing a stiff carbon plate.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 86,
      dailyRunScore: 91,
      speedWorkoutScore: 93,
      marathonRaceScore: 86,
      longDistanceScore: 88,
      trailScore: 58,
      durabilityScore: 87
    },
    communityPros: [
      'Supercritical EVA midsole is super snappy and energetic',
      'Added outsole rubber fixes durability complaints of past versions',
      'Light 232g build for tempo runs and track intervals'
    ],
    communityCons: [
      'Snug racing fit — wide feet should order wide option'
    ],
    specs: {
      weightGrams: 232,
      weightOz: 8.18,
      heelStackMm: 37,
      forefootStackMm: 32,
      dropMm: 5,
      foamName: 'Supercritical EVA Foam',
      foamType: 'Supercritical Gas-Injected EVA',
      foamResiliencePercent: 86,
      carbonPlate: 'None',
      carbonStiffnessIndex: 5.5,
      upperMaterial: 'Crepe Jacquard Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'Strategic Rubber Outsole',
      wetTractionScore: 8.6,
      estimatedLifespanKm: 750,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Top-Tier Non-Plated Speed Trainer. Extremely agile, snappy, and lightweight.',
    userReviews: []
  },
  {
    id: 'brooks_glycerin21',
    name: 'Brooks Glycerin 21',
    brand: 'Brooks',
    category: 'Max Cushion',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/glycerin_21/1.webp',
    galleryImages: [
      '/images/western/glycerin_21/1.webp'
    ],
    msrpUsd: 160,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'DNA LOFT v3 Nitrogen Max Cushion King',
    description: 'Brooks added 2mm of nitrogen-infused DNA LOFT v3 foam to the Glycerin 21, creating an ultra-soft, smooth-riding cushion flagship for long distance running and walking.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 96,
      dailyRunScore: 94,
      speedWorkoutScore: 78,
      marathonRaceScore: 85,
      longDistanceScore: 94,
      trailScore: 60,
      durabilityScore: 92
    },
    communityPros: [
      'Pillowy DNA LOFT v3 nitrogen foam offers luxurious impact absorption',
      'Broad base provides effortless inherent stability',
      'Plush warp knit upper hugs the foot'
    ],
    communityCons: [
      'A bit heavy for fast interval workouts'
    ],
    specs: {
      weightGrams: 278,
      weightOz: 9.81,
      heelStackMm: 38,
      forefootStackMm: 28,
      dropMm: 10,
      foamName: 'DNA LOFT v3 Nitrogen-Infused',
      foamType: 'Supercritical Nitrogen-Infused Foam',
      foamResiliencePercent: 86,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.5,
      upperMaterial: 'Engineered Warp Knit',
      breathabilityScore: 8.4,
      outsoleRubber: 'RoadTack Durable Rubber',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Brooks’ Ultimate Max-Cushion Flagship. Unbeatable plush comfort for long runs and walking.',
    userReviews: []
  },
  {
    id: 'asics_gt2000_12',
    name: 'ASICS GT-2000 12',
    brand: 'ASICS',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/gt2000_12/1.webp',
    galleryImages: [
      '/images/western/gt2000_12/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '3D Guidance System Modern Stability Trainer',
    description: 'Replacing harsh traditional medial posts, the GT-2000 12 uses a 3D Guidance System with wider basenet geometry, FlyteFoam Blast+ Eco foam, and PureGEL for smooth stability.',
    overallRating: 89,
    useCaseValues: {
      walkingScore: 93,
      dailyRunScore: 92,
      speedWorkoutScore: 80,
      marathonRaceScore: 83,
      longDistanceScore: 89,
      trailScore: 62,
      durabilityScore: 91
    },
    communityPros: [
      'Modern 3D Guidance System provides supportive stability without feeling stiff',
      'PureGEL heel insert absorbs heavy heel strikes',
      'Versatile for mild overpronators walking or running'
    ],
    communityCons: [
      'Slightly firmer ride than GEL-Kayano 31'
    ],
    specs: {
      weightGrams: 270,
      weightOz: 9.52,
      heelStackMm: 36,
      forefootStackMm: 28,
      dropMm: 8,
      foamName: 'FF BLAST+ ECO & PureGEL',
      foamType: 'Bio-Based Lightweight EVA + Gel',
      foamResiliencePercent: 83,
      carbonPlate: 'None (3D Guidance Stability)',
      carbonStiffnessIndex: 6.0,
      upperMaterial: 'Jacquard Mesh Upper',
      breathabilityScore: 8.5,
      outsoleRubber: 'AHAR+ High Abrasion Rubber',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Stability / Medium'
    },
    finalConsensusVerdict: 'Lightweight Modern Stability Benchamrk. Ideal support for runners and walkers needing guidance.',
    userReviews: []
  }
];

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const newItemsCode = additionalShoes.map(s => JSON.stringify(s, null, 2)).join(',\n  ');

const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx !== -1) {
  const updatedContent = content.substring(0, lastBracketIdx) + ',\n  ' + newItemsCode + '\n];\n';
  fs.writeFileSync(shoesDataPath, updatedContent, 'utf8');
  console.log(`✅ Successfully added ${additionalShoes.length} new walking & running shoes!`);
} else {
  console.log('❌ Could not find ending ]; in shoesData.ts');
}
