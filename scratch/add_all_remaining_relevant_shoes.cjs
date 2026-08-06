const fs = require('fs');
const path = require('path');

const relevantShoes = [
  // --- HOKA CARBON SUPER-SHOES ---
  {
    id: 'hoka_cielox1',
    name: 'HOKA Cielo X1',
    brand: 'HOKA',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/cielo_x1/1.webp',
    galleryImages: [
      '/images/western/cielo_x1/1.webp'
    ],
    msrpUsd: 275,
    msrpRmb: 2099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Dual-Layer PEBA + Winged Carbon Plate Marathon Rocket',
    description: 'HOKA’s fastest, most aggressive marathon super-shoe yet. The Cielo X1 combines ultra-bouncy dual-layer PEBA foam with a winged carbon fiber plate and deep dynamic rocker cuts.',
    overallRating: 94,
    useCaseValues: {
      walkingScore: 60,
      dailyRunScore: 74,
      speedWorkoutScore: 94,
      marathonRaceScore: 97,
      longDistanceScore: 95,
      trailScore: 40,
      durabilityScore: 86
    },
    communityPros: [
      'r/RunningShoeGeeks consensus: Insane trampoline bounce from PEBA foam',
      'Aggressive rocker propels forefoot effortlessly at marathon pace',
      'Knit upper provides a snug, race-ready lockdown'
    ],
    communityCons: [
      'Heavier than Vaporfly 3 at 264g',
      'High $275 price tag'
    ],
    specs: {
      weightGrams: 264,
      weightOz: 9.31,
      heelStackMm: 39,
      forefootStackMm: 32,
      dropMm: 7,
      foamName: 'Dual-Layer PEBA Super-Foam',
      foamType: '100% Supercritical PEBA',
      foamResiliencePercent: 88,
      carbonPlate: 'Winged Full-Length Carbon Plate',
      carbonStiffnessIndex: 9.5,
      upperMaterial: 'Engineered Knit Upper',
      breathabilityScore: 9.0,
      outsoleRubber: 'Zonal Rubber Coverage',
      wetTractionScore: 8.5,
      estimatedLifespanKm: 600,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (94/100): HOKA’s most explosive carbon marathon super-shoe. Pure high-rebound PEBA speed.',
    userReviews: []
  },

  // --- ASICS METASPEED EDGE PARIS ---
  {
    id: 'asics_metaspeededgeparis',
    name: 'ASICS Metaspeed Edge Paris',
    brand: 'ASICS',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/metaspeed_edge_paris/1.webp',
    galleryImages: [
      '/images/western/metaspeed_edge_paris/1.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1899,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'High-Cadence FF TURBO+ Carbon Super-Shoe Rocket',
    description: 'Designed specifically for cadence runners who increase speed by taking more steps per minute. Features a spoon-shaped angled carbon plate and ultra-light FF TURBO+ PEBA foam.',
    overallRating: 94,
    useCaseValues: {
      walkingScore: 55,
      dailyRunScore: 72,
      speedWorkoutScore: 95,
      marathonRaceScore: 97,
      longDistanceScore: 95,
      trailScore: 40,
      durabilityScore: 86
    },
    communityPros: [
      'r/RunningShoeGeeks consensus: Unbelievably light 185g race weight',
      'Angled carbon plate roll accelerates high-cadence turnover',
      'ASICSGRIP outsole offers world-class wet cornering grip'
    ],
    communityCons: [
      'Firm feel if you are a low-cadence stride runner (choose Sky Paris instead)'
    ],
    specs: {
      weightGrams: 185,
      weightOz: 6.53,
      heelStackMm: 39.5,
      forefootStackMm: 34.5,
      dropMm: 5,
      foamName: 'FF TURBO™ PLUS PEBA',
      foamType: 'Supercritical PEBA Foam',
      foamResiliencePercent: 89,
      carbonPlate: 'Spoon-Shaped Carbon Plate',
      carbonStiffnessIndex: 9.4,
      upperMaterial: 'MOTION WRAP 2.0 Upper',
      breathabilityScore: 9.4,
      outsoleRubber: 'ASICSGRIP™ Rubber',
      wetTractionScore: 9.5,
      estimatedLifespanKm: 600,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (94/100): The ultimate carbon marathon super-shoe for high-cadence runners.',
    userReviews: []
  },
  {
    id: 'asics_magicspeed4',
    name: 'ASICS Magic Speed 4',
    brand: 'ASICS',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/magic_speed4/1.webp',
    galleryImages: [
      '/images/western/magic_speed4/1.webp'
    ],
    msrpUsd: 180,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Full Carbon Plate + FF TURBO Forefoot Speed Workhorse',
    description: 'The Magic Speed 4 received a huge upgrade, adding a pod of FF TURBO PEBA foam under the forefoot along with a full-length carbon plate for snappy, accessible tempo workouts.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 76,
      dailyRunScore: 88,
      speedWorkoutScore: 93,
      marathonRaceScore: 89,
      longDistanceScore: 90,
      trailScore: 45,
      durabilityScore: 90
    },
    communityPros: [
      'r/RunningShoeGeeks consensus: Feels like a mini Metaspeed Paris at a lower price',
      'FF TURBO forefoot insert adds soft rebound over v3',
      'Full carbon plate gives snappy toe-off'
    ],
    communityCons: [
      'Stiffer heel ride than Novablast 4'
    ],
    specs: {
      weightGrams: 242,
      weightOz: 8.54,
      heelStackMm: 40.5,
      forefootStackMm: 32.5,
      dropMm: 8,
      foamName: 'FF BLAST™ PLUS & FF TURBO™ Pod',
      foamType: 'Dual Foam PEBA + EVA',
      foamResiliencePercent: 86,
      carbonPlate: 'Full-Length Carbon Fiber Plate',
      carbonStiffnessIndex: 8.5,
      upperMaterial: 'Motion Wrap Upper',
      breathabilityScore: 8.9,
      outsoleRubber: 'ASICSGRIP™ Rubber',
      wetTractionScore: 9.3,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'r/RunningShoeGeeks Consensus (90/100): Premier carbon workout trainer. Metaspeed DNA at an accessible price point.',
    userReviews: []
  },

  // --- ADIDAS TERREX AGRAVIC SPEED ULTRA ---
  {
    id: 'adidas_terrex_agravic_speed_ultra',
    name: 'Adidas Terrex Agravic Speed Ultra',
    brand: 'Adidas',
    category: 'Mountain & Trail',
    dominantSector: 'Mountain & Trail Climbing',
    image: '/images/western/agravic_speed_ultra/1.webp',
    galleryImages: [
      '/images/western/agravic_speed_ultra/1.webp'
    ],
    msrpUsd: 220,
    msrpRmb: 1699,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Dual Lightstrike Pro + Carbon ENERGYRODS Trail Super-Shoe',
    description: 'Designed to win Western States 100 and UTMB. Combines a high stack of dual-layer Lightstrike Pro foam with carbon-infused ENERGYRODS and Continental rubber on trails.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 78,
      dailyRunScore: 84,
      speedWorkoutScore: 91,
      marathonRaceScore: 88,
      longDistanceScore: 95,
      trailScore: 96,
      durabilityScore: 90
    },
    communityPros: [
      'r/trailrunning consensus: Fast, bouncy trail super-shoe that glides on smooth trail descents',
      'Continental rubber outsole provides exceptional wet rock grip',
      'Dual Lightstrike Pro foam keeps legs fresh on 100-mile ultras'
    ],
    communityCons: [
      'Tall stack height requires confidence on super-technical off-camber trails'
    ],
    specs: {
      weightGrams: 270,
      weightOz: 9.52,
      heelStackMm: 38,
      forefootStackMm: 30,
      dropMm: 8,
      foamName: 'Dual Lightstrike Pro',
      foamType: 'Supercritical TPEE/PEBA Foam',
      foamResiliencePercent: 87,
      carbonPlate: 'Carbon-Infused ENERGYRODS',
      carbonStiffnessIndex: 8.8,
      upperMaterial: 'Lightweight Engineered Mesh',
      breathabilityScore: 8.8,
      outsoleRubber: 'Continental™ Trail Rubber 4mm Lugs',
      wetTractionScore: 9.6,
      estimatedLifespanKm: 750,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'r/trailrunning Consensus (93/100): The fastest ultra-trail super-shoe on non-technical singletrack.',
    userReviews: []
  },

  // --- BROOKS ADRENALINE GTS 23 ---
  {
    id: 'brooks_adrenaline_gts23',
    name: 'Brooks Adrenaline GTS 23',
    brand: 'Brooks',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/adrenaline_gts23/1.webp',
    galleryImages: [
      '/images/western/adrenaline_gts23/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 1099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'GuideRails® Holistic Support — America’s #1 Stability Workhorse',
    description: 'The best-selling stability shoe in North America. Features GuideRails® holistic support system to keep excess knee movement in check alongside DNA LOFT v2 cushioning.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 94,
      dailyRunScore: 92,
      speedWorkoutScore: 76,
      marathonRaceScore: 78,
      longDistanceScore: 90,
      trailScore: 55,
      durabilityScore: 93
    },
    communityPros: [
      'r/running consensus: GuideRails support system supports overpronators without feeling intrusive',
      'DNA LOFT v2 midsole provides reliable, non-mushy cushion',
      'Durable outsole rubber easily lasts 800+ km'
    ],
    communityCons: [
      'Firm ride compared to plush max-cushion recovery shoes'
    ],
    specs: {
      weightGrams: 286,
      weightOz: 10.09,
      heelStackMm: 36,
      forefootStackMm: 24,
      dropMm: 12,
      foamName: 'DNA LOFT v2 Cushioning',
      foamType: 'EVA & Rubber Blend Foam',
      foamResiliencePercent: 78,
      carbonPlate: 'GuideRails® Support System',
      carbonStiffnessIndex: 5.5,
      upperMaterial: 'Engineered Air Mesh',
      breathabilityScore: 8.4,
      outsoleRubber: 'Omni-Groove Rubber Outsole',
      wetTractionScore: 8.5,
      estimatedLifespanKm: 850,
      fitWidth: 'Wide Friendly',
      archSupport: 'Stability / Medium'
    },
    finalConsensusVerdict: 'r/running Consensus (90/100): Unmatched stability workhorse. Trusted by overpronators and high-mileage runners for decades.',
    userReviews: []
  },

  // --- NIKE ULTRAFLY ---
  {
    id: 'nike_ultrafly',
    name: 'Nike Ultrafly',
    brand: 'Nike',
    category: 'Mountain & Trail',
    dominantSector: 'Mountain & Trail Climbing',
    image: '/images/western/ultrafly/1.webp',
    galleryImages: [
      '/images/western/ultrafly/1.webp'
    ],
    msrpUsd: 260,
    msrpRmb: 1899,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Full ZoomX + Carbon Flyplate + Vibram Megagrip Trail Rocket',
    description: 'Nike’s ultimate carbon trail super-shoe. Encases bouncy ZoomX foam inside a protective fabric wrap, paired with a full carbon Flyplate and Vibram Megagrip outsole.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 75,
      dailyRunScore: 82,
      speedWorkoutScore: 92,
      marathonRaceScore: 88,
      longDistanceScore: 94,
      trailScore: 95,
      durabilityScore: 88
    },
    communityPros: [
      'r/trailrunning consensus: ZoomX bounce on trails feels incredible',
      'Vibram Megagrip Litebase rubber provides supreme traction',
      'Vaporweave upper sheds water instantly'
    ],
    communityCons: [
      'High $260 price tag'
    ],
    specs: {
      weightGrams: 289,
      weightOz: 10.19,
      heelStackMm: 38.5,
      forefootStackMm: 30.5,
      dropMm: 8,
      foamName: 'Nike ZoomX Foam',
      foamType: 'Supercritical PEBA Wrapped',
      foamResiliencePercent: 88,
      carbonPlate: 'Carbon Flyplate',
      carbonStiffnessIndex: 9.0,
      upperMaterial: 'Vaporweave Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'Vibram® Megagrip Litebase',
      wetTractionScore: 9.6,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'r/trailrunning Consensus (92/100): High-speed trail racer combining ZoomX bounce with Vibram Megagrip security.',
    userReviews: []
  }
];

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const newItemsCode = relevantShoes.map(s => JSON.stringify(s, null, 2)).join(',\n  ');

const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx !== -1) {
  const updatedContent = content.substring(0, lastBracketIdx) + ',\n  ' + newItemsCode + '\n];\n';
  fs.writeFileSync(shoesDataPath, updatedContent, 'utf8');
  console.log(`✅ Successfully added ${relevantShoes.length} highly relevant running & trail shoes!`);
} else {
  console.log('❌ Could not find ending ]; in shoesData.ts');
}
