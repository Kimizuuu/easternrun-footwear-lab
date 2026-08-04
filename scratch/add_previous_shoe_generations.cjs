const fs = require('fs');
const path = require('path');

const previousGenerations = [
  // --- LI-NING PREVIOUS ---
  {
    id: 'lining-feidian-4-ultra',
    name: 'Li-Ning Feidian 4.0 Ultra',
    brand: 'Li-Ning',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/shoes/feidian4_ultra.jpg',
    galleryImages: [
      '/images/shoes/feidian4_ultra.jpg'
    ],
    msrpUsd: 280,
    msrpRmb: 2099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '4th-Gen PEBA BOOM Carbon Super-Shoe Champion',
    description: 'The Feidian 4.0 Ultra features Li-Ning’s 4th generation supercritical BOOM PEBA foam, a full-length 3D curved carbon plate, and GCU ground control rubber for dominant 42K marathon racing.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 48,
      dailyRunScore: 70,
      speedWorkoutScore: 93,
      marathonRaceScore: 97,
      longDistanceScore: 95,
      trailScore: 40,
      durabilityScore: 88
    },
    communityPros: [
      'Exceptional GCU wet road grip outperforming all Western brands',
      'Ultra-bouncy 88% energy return from BOOM PEBA foam',
      'Propulsive toe-off rocker for sub-3:00 marathoners'
    ],
    communityCons: [
      'Firm feel at slow recovery paces',
      'Premium pricing'
    ],
    specs: {
      weightGrams: 182,
      weightOz: 6.42,
      heelStackMm: 39,
      forefootStackMm: 33,
      dropMm: 6,
      foamName: 'Li-Ning BOOM PEBA 4.0',
      foamType: 'Supercritical PEBA Foam',
      foamResiliencePercent: 88,
      carbonPlate: 'Full-Length 3D Spoon Carbon',
      carbonStiffnessIndex: 9.2,
      upperMaterial: 'BOOM FIBER Breathable Mesh',
      breathabilityScore: 9.3,
      outsoleRubber: 'GCU Ground Control Rubber',
      wetTractionScore: 9.8,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Proven World Championship marathon super-shoe with industry-leading wet road traction.',
    userReviews: []
  },
  {
    id: 'lining-feidian-3-ultra',
    name: 'Li-Ning Feidian 3.0 Ultra',
    brand: 'Li-Ning',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/shoes/feidian3_ultra.jpg',
    galleryImages: [
      '/images/shoes/feidian3_ultra.jpg'
    ],
    msrpUsd: 260,
    msrpRmb: 1899,
    releaseYear: 2023,
    availability: 'Global Shipping',
    tagline: 'Legendary 3rd-Gen Carbon Marathon Record Breaker',
    description: 'The shoe that put Chinese super-shoes on the global map, the Feidian 3.0 Ultra combines high-rebound BOOM PEBA foam with a rigid carbon lever plate for marathon speed.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 50,
      dailyRunScore: 72,
      speedWorkoutScore: 92,
      marathonRaceScore: 95,
      longDistanceScore: 93,
      trailScore: 40,
      durabilityScore: 89
    },
    communityPros: [
      'Proven sub-2:08 marathon performance',
      'Phenomenal GCU rubber durability and grip',
      'Crisp, stable carbon propulsion'
    ],
    communityCons: [
      'Upper mesh slightly stiffer than v4'
    ],
    specs: {
      weightGrams: 190,
      weightOz: 6.70,
      heelStackMm: 38.5,
      forefootStackMm: 31.5,
      dropMm: 7,
      foamName: 'Li-Ning BOOM PEBA 3.0',
      foamType: 'Supercritical PEBA Foam',
      foamResiliencePercent: 87,
      carbonPlate: 'Full-Length Spoon Carbon',
      carbonStiffnessIndex: 9.0,
      upperMaterial: 'MONO Fly Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'GCU Ground Control Rubber',
      wetTractionScore: 9.7,
      estimatedLifespanKm: 750,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Iconic 3rd generation marathon racer that established Li-Ning’s super-shoe legacy.',
    userReviews: []
  },

  // --- NIKE PREVIOUS ---
  {
    id: 'nike_vaporfly2',
    name: 'Nike Vaporfly Next% 2',
    brand: 'Nike',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/vaporfly_2/1.webp',
    galleryImages: [
      '/images/western/vaporfly_2/1.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1599,
    releaseYear: 2022,
    availability: 'Global Shipping',
    tagline: 'The Benchmark Carbon Marathon Racer Loved Worldwide',
    description: 'The Vaporfly Next% 2 refined Nike’s legendary super-shoe formula with an engineered mesh upper while retaining the full-length ZoomX foam and full carbon Flyplate.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 55,
      dailyRunScore: 75,
      speedWorkoutScore: 95,
      marathonRaceScore: 98,
      longDistanceScore: 96,
      trailScore: 40,
      durabilityScore: 82
    },
    communityPros: [
      'Unrivaled 98/100 race-day efficiency and pop',
      'Engineered mesh upper fixes durability of v1 Vaporweave',
      'Effortless leg-saving shock absorption on 42K marathons'
    ],
    communityCons: [
      'Narrow heel landing zone requires good running form',
      'Outsole forefoot rubber wears after 400km'
    ],
    specs: {
      weightGrams: 196,
      weightOz: 6.91,
      heelStackMm: 40,
      forefootStackMm: 32,
      dropMm: 8,
      foamName: 'Nike ZoomX Foam',
      foamType: 'Supercritical PEBA Foam',
      foamResiliencePercent: 88,
      carbonPlate: 'Full-Length Carbon Flyplate',
      carbonStiffnessIndex: 9.4,
      upperMaterial: 'Engineered Mesh Upper',
      breathabilityScore: 9.1,
      outsoleRubber: 'High-Traction Forefoot Rubber',
      wetTractionScore: 8.0,
      estimatedLifespanKm: 500,
      fitWidth: 'Narrow',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Legendary Marathon Benchmark. Set the world standard for carbon super-shoes.',
    userReviews: []
  },
  {
    id: 'nike_alphafly2',
    name: 'Nike Air Zoom Alphafly Next% 2',
    brand: 'Nike',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/alphafly_2/1.webp',
    galleryImages: [
      '/images/western/alphafly_2/1.webp'
    ],
    msrpUsd: 275,
    msrpRmb: 2299,
    releaseYear: 2022,
    availability: 'Global Shipping',
    tagline: 'Dual Zoom Air Pods + ZoomX Cushion Powerhouse',
    description: 'The Alphafly Next% 2 added a thin layer of ZoomX under the dual Zoom Air pods and widened the heel, creating a more stable, highly cushioned marathon super-shoe.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 52,
      dailyRunScore: 72,
      speedWorkoutScore: 91,
      marathonRaceScore: 97,
      longDistanceScore: 96,
      trailScore: 35,
      durabilityScore: 84
    },
    communityPros: [
      'Dual Zoom Air pods provide unrivaled explosive forefoot spring',
      'Wider heel platform improves stability over v1',
      'Atomknit 2.0 upper provides unyielding lockdown'
    ],
    communityCons: [
      'Difficult step-in entry',
      'Heavier than Alphafly 3 at 240g'
    ],
    specs: {
      weightGrams: 240,
      weightOz: 8.46,
      heelStackMm: 40,
      forefootStackMm: 32,
      dropMm: 8,
      foamName: 'Nike ZoomX + Dual Air Zoom Pods',
      foamType: 'Supercritical PEBA + Pressurized Air',
      foamResiliencePercent: 90,
      carbonPlate: 'Full-Length Carbon Flyplate',
      carbonStiffnessIndex: 9.6,
      upperMaterial: 'Atomknit 2.0 Upper',
      breathabilityScore: 9.3,
      outsoleRubber: 'Thin-Web Rubber Outsole',
      wetTractionScore: 8.2,
      estimatedLifespanKm: 550,
      fitWidth: 'Narrow',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Pure Marathon Propulsion Tank. Explosive energy return for heavy forefoot strikers.',
    userReviews: []
  },

  // --- ADIDAS PREVIOUS ---
  {
    id: 'adidas_adiospro3',
    name: 'Adidas Adizero Adios Pro 3',
    brand: 'Adidas',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/adios_pro3/1.webp',
    galleryImages: [
      '/images/western/adios_pro3/1.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1899,
    releaseYear: 2022,
    availability: 'Global Shipping',
    tagline: 'Dual Lightstrike Pro + Carbon ENERGYRODS 2.0 Marathon Beast',
    description: 'The Adios Pro 3 features a massive dual-layer stack of Lightstrike Pro foam, Continental rubber outsole, and full-length carbon ENERGYRODS 2.0 for smooth, non-fatiguing marathon cruising.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 58,
      dailyRunScore: 76,
      speedWorkoutScore: 92,
      marathonRaceScore: 96,
      longDistanceScore: 95,
      trailScore: 45,
      durabilityScore: 89
    },
    communityPros: [
      'Continental rubber outsole provides superior wet cornering grip',
      'Dual Lightstrike Pro foam stays resilient for 600+ km',
      'Smooth, non-harsh ENERGYRODS 2.0 propulsion'
    ],
    communityCons: [
      'Lacing eyelet hardware can press on top of foot if overtightened'
    ],
    specs: {
      weightGrams: 218,
      weightOz: 7.69,
      heelStackMm: 39.5,
      forefootStackMm: 33,
      dropMm: 6.5,
      foamName: 'Dual Lightstrike Pro',
      foamType: 'Supercritical TPEE/PEBA Foam',
      foamResiliencePercent: 87,
      carbonPlate: 'Carbon ENERGYRODS 2.0',
      carbonStiffnessIndex: 9.0,
      upperMaterial: 'Celermesh 2.0 Upper',
      breathabilityScore: 9.0,
      outsoleRubber: 'Continental™ Synthetic Rubber',
      wetTractionScore: 9.5,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Workhorse Marathon Super-Shoe. Exceptional Continental wet grip and foam durability.',
    userReviews: []
  },
  {
    id: 'adidas_boston12',
    name: 'Adidas Adizero Boston 12',
    brand: 'Adidas',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/boston_12/1.webp',
    galleryImages: [
      '/images/western/boston_12/1.webp'
    ],
    msrpUsd: 160,
    msrpRmb: 1299,
    releaseYear: 2023,
    availability: 'Global Shipping',
    tagline: 'Lightstrike Pro + Glass-Fiber ENERGYRODS 2.0 Speed Workhorse',
    description: 'The Boston 12 restored the series to greatness, layering top Lightstrike Pro foam over durable Lightstrike 2.0 with glass-fiber ENERGYRODS 2.0 for fast tempo workouts and long runs.',
    overallRating: 88,
    useCaseValues: {
      walkingScore: 82,
      dailyRunScore: 90,
      speedWorkoutScore: 92,
      marathonRaceScore: 87,
      longDistanceScore: 91,
      trailScore: 55,
      durabilityScore: 92
    },
    communityPros: [
      'Lightstrike Pro top layer provides crisp super-foam bounce',
      'Glass-fiber ENERGYRODS 2.0 give snappy propulsive push',
      'Continental outsole lasts 800+ km'
    ],
    communityCons: [
      'Upper mesh feels thin and stiff initially'
    ],
    specs: {
      weightGrams: 267,
      weightOz: 9.42,
      heelStackMm: 37,
      forefootStackMm: 30.5,
      dropMm: 6.5,
      foamName: 'Lightstrike Pro + Lightstrike 2.0',
      foamType: 'Dual Foam Supercritical TPEE + EVA',
      foamResiliencePercent: 85,
      carbonPlate: 'Glass-Fiber ENERGYRODS 2.0',
      carbonStiffnessIndex: 7.8,
      upperMaterial: 'Engineered Lightweight Mesh',
      breathabilityScore: 8.8,
      outsoleRubber: 'Continental™ Rubber Outsole',
      wetTractionScore: 9.5,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Pinnacle Marathon Training Companion. Exceptional durability and snappy rod propulsion.',
    userReviews: []
  },

  // --- ASICS PREVIOUS ---
  {
    id: 'asics_superblast1',
    name: 'ASICS Superblast (v1)',
    brand: 'ASICS',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/superblast_1/1.webp',
    galleryImages: [
      '/images/western/superblast_1/1.webp'
    ],
    msrpUsd: 220,
    msrpRmb: 1599,
    releaseYear: 2023,
    availability: 'Global Shipping',
    tagline: 'The Original Non-Plated FF BLAST TURBO Super-Trainer Creation',
    description: 'The shoe that launched the non-plated super-trainer category, combining a massive 45.5mm stack of FF BLAST TURBO PEBA foam over FF BLAST+ for effortless daily long run miles.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 86,
      dailyRunScore: 95,
      speedWorkoutScore: 91,
      marathonRaceScore: 89,
      longDistanceScore: 96,
      trailScore: 55,
      durabilityScore: 92
    },
    communityPros: [
      'Huge 45.5mm stack saves legs on 30km+ long runs',
      'Ultra-versatile from easy recovery to marathon pace workouts',
      'Remarkably light 239g weight for its massive stack height'
    ],
    communityCons: [
      'Outsole wet grip is mediocre compared to ASICSGRIP'
    ],
    specs: {
      weightGrams: 239,
      weightOz: 8.43,
      heelStackMm: 45.5,
      forefootStackMm: 37.5,
      dropMm: 8,
      foamName: 'FF BLAST™ TURBO & FF BLAST™ PLUS',
      foamType: 'Supercritical PEBA + Bio-EVA Foam',
      foamResiliencePercent: 88,
      carbonPlate: 'None',
      carbonStiffnessIndex: 7.5,
      upperMaterial: 'Asymmetric Woven Mesh Upper',
      breathabilityScore: 8.5,
      outsoleRubber: 'AHAR+ Rubber Outsole',
      wetTractionScore: 7.8,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Groundbreaking Super-Trainer. Created the high-stack non-plated long-run category.',
    userReviews: []
  },
  {
    id: 'asics_novablast3',
    name: 'ASICS Novablast 3',
    brand: 'ASICS',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/novablast_3/1.webp',
    galleryImages: [
      '/images/western/novablast_3/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2022,
    availability: 'Global Shipping',
    tagline: 'Lightweight FF BLAST+ Trampoline Cushion Classic',
    description: 'Shedding 22g over v2, the Novablast 3 featured a full-length FF BLAST+ foam midsole with geometric origami sculpting for a fun, bouncy daily training experience.',
    overallRating: 88,
    useCaseValues: {
      walkingScore: 91,
      dailyRunScore: 93,
      speedWorkoutScore: 85,
      marathonRaceScore: 82,
      longDistanceScore: 89,
      trailScore: 58,
      durabilityScore: 87
    },
    communityPros: [
      'Incredibly fun trampoline spring under foot',
      'Light 252g build for a high-cushion daily trainer',
      'Soft mesh upper with comfortable tongue wing'
    ],
    communityCons: [
      'Outsole can slip on slick wet concrete'
    ],
    specs: {
      weightGrams: 252,
      weightOz: 8.89,
      heelStackMm: 31,
      forefootStackMm: 23,
      dropMm: 8,
      foamName: 'FF BLAST™ PLUS',
      foamType: 'Super-Bounce Lightweight EVA',
      foamResiliencePercent: 83,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.0,
      upperMaterial: 'Jacquard Mesh Upper',
      breathabilityScore: 8.6,
      outsoleRubber: 'AHARPLUS Rubber Outsole',
      wetTractionScore: 7.6,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Fan Favorite Bouncy Daily Trainer. Outstanding bounce-to-weight ratio.',
    userReviews: []
  },

  // --- SAUCONY PREVIOUS ---
  {
    id: 'saucony_endorphinspeed3',
    name: 'Saucony Endorphin Speed 3',
    brand: 'Saucony',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/endorphin_speed3/1.webp',
    galleryImages: [
      '/images/western/endorphin_speed3/1.webp'
    ],
    msrpUsd: 170,
    msrpRmb: 1199,
    releaseYear: 2022,
    availability: 'Global Shipping',
    tagline: 'Winged Nylon Plate + PWRRUN PB Universal Speed King',
    description: 'Widely regarded as one of the best running shoes ever made, the Speed 3 introduced a winged S-curve nylon plate inside full-length PWRRUN PB foam for versatile, smooth speed.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 84,
      dailyRunScore: 93,
      speedWorkoutScore: 95,
      marathonRaceScore: 90,
      longDistanceScore: 92,
      trailScore: 55,
      durabilityScore: 88
    },
    communityPros: [
      'S-curve winged nylon plate adds lateral stability over v2',
      'Bouncy, resilient PWRRUN PB PEBA foam',
      'Unrivaled versatility from easy daily runs to marathon racing'
    ],
    communityCons: [
      'Upper mesh can hold moisture on humid summer runs'
    ],
    specs: {
      weightGrams: 229,
      weightOz: 8.08,
      heelStackMm: 36,
      forefootStackMm: 28,
      dropMm: 8,
      foamName: 'PWRRUN PB Midsole',
      foamType: 'Beaded PEBA Super-Foam',
      foamResiliencePercent: 88,
      carbonPlate: 'Winged S-Curve Nylon Plate',
      carbonStiffnessIndex: 7.2,
      upperMaterial: 'Engineered Breathable Mesh',
      breathabilityScore: 8.8,
      outsoleRubber: 'XT-900 Carbon Rubber Pods',
      wetTractionScore: 8.4,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Hall of Fame Speed Trainer. Perfect balance of nylon plate flex and PEBA foam bounce.',
    userReviews: []
  },

  // --- HOKA PREVIOUS ---
  {
    id: 'hoka_mach5',
    name: 'HOKA Mach 5',
    brand: 'HOKA',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/mach_5/1.webp',
    galleryImages: [
      '/images/western/mach_5/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 1099,
    releaseYear: 2022,
    availability: 'Global Shipping',
    tagline: 'Featherweight 232g PROFLY+ Dual-Density Speed Trainer',
    description: 'Combining a soft top layer of PROFLY+ foam with a rubberized EVA bottom layer, the Mach 5 delivered a super-lightweight, snappy non-plated ride for workouts and daily miles.',
    overallRating: 89,
    useCaseValues: {
      walkingScore: 88,
      dailyRunScore: 92,
      speedWorkoutScore: 92,
      marathonRaceScore: 84,
      longDistanceScore: 86,
      trailScore: 55,
      durabilityScore: 78
    },
    communityPros: [
      'Incredibly agile, light 232g weight',
      'Dual-density PROFLY+ foam gives soft landing + snappy push',
      'Comfortable lay-flat mesh tongue'
    ],
    communityCons: [
      'Rubberized EVA outsole wears down quicker than traditional rubber'
    ],
    specs: {
      weightGrams: 232,
      weightOz: 8.18,
      heelStackMm: 29,
      forefootStackMm: 24,
      dropMm: 5,
      foamName: 'PROFLY+ Dual-Density Foam',
      foamType: 'Supercritical Top + Rubberized EVA Base',
      foamResiliencePercent: 83,
      carbonPlate: 'None',
      carbonStiffnessIndex: 4.8,
      upperMaterial: 'Crepe Mesh Upper',
      breathabilityScore: 8.9,
      outsoleRubber: 'Rubberized EVA Outsole',
      wetTractionScore: 7.8,
      estimatedLifespanKm: 600,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    finalConsensusVerdict: 'Lightweight Non-Plated Speed Classic. Agile, comfortable, and responsive.',
    userReviews: []
  }
];

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const newItemsCode = previousGenerations.map(s => JSON.stringify(s, null, 2)).join(',\n  ');

const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx !== -1) {
  const updatedContent = content.substring(0, lastBracketIdx) + ',\n  ' + newItemsCode + '\n];\n';
  fs.writeFileSync(shoesDataPath, updatedContent, 'utf8');
  console.log(`✅ Successfully added ${previousGenerations.length} legendary previous shoe models!`);
} else {
  console.log('❌ Could not find ending ]; in shoesData.ts');
}
