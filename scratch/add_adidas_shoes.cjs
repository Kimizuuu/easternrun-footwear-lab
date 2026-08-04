const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(file, 'utf8');

const newAdidasShoes = [
  {
    id: 'adidas_primex2strung',
    name: 'Adidas Adizero Prime X 2 Strung',
    brand: 'Adidas',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/adidas_evosl/1.webp',
    galleryImages: [
      '/images/western/adidas_evosl/1.webp',
      '/images/western/adidas_evosl/2.webp'
    ],
    msrpUsd: 300,
    msrpRmb: 2299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '50mm Illegal Super-Stack Monster with Triple Lightstrike Pro',
    description: 'The Adidas Adizero Prime X 2 Strung features a massive 50mm stack height, triple-layer Lightstrike Pro foam, and dual carbon infused plates inside a precision 3D-coded Strung upper.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 50,
      walkingAnalysis: '50mm stack is unstable at walking speeds.',
      dailyRunScore: 78,
      dailyRunAnalysis: 'Bouncy long run cruiser for fast marathon pace efforts.',
      speedWorkoutScore: 94,
      speedWorkoutAnalysis: 'Immense energy return and leg-saving cushion on tempo runs.',
      marathonRaceScore: 98,
      marathonRaceAnalysis: 'Maximum propulsion and leg protection for non-World Athletics sanctioned races.'
    },
    specs: {
      weightGrams: 295,
      weightOz: 10.4,
      heelStackMm: 50.0,
      forefootStackMm: 43.5,
      dropMm: 6.5,
      foamName: 'Triple Lightstrike Pro',
      foamType: 'Triple-Layer Supercritical PEBA',
      foamResiliencePercent: 90,
      carbonPlate: 'Dual Carbon-Infused Plates',
      carbonStiffnessIndex: 9.8,
      upperMaterial: 'STRUNG 3D Textile Upper',
      breathabilityScore: 9.3,
      outsoleRubber: 'Continental™ Rubber Outsole',
      wetTractionScore: 9.5,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    communityPros: [
      'Triple-layer Lightstrike Pro delivers unreal bounce and leg preservation',
      'STRUNG upper provides precise foot containment without pressure points',
      'Continental outsole offers unrivaled wet weather grip'
    ],
    communityCons: [
      'Heavy 295g weight',
      'High $300 price tag & 50mm illegal stack for official elite marathons'
    ],
    finalConsensusVerdict: 'Ultimate high-stack energy rebound super-shoe for non-sanctioned marathon efforts.',
    userReviews: []
  },
  {
    id: 'adidas_takumisen10',
    name: 'Adidas Adizero Takumi Sen 10',
    brand: 'Adidas',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/adidas_evosl/1.webp',
    galleryImages: [
      '/images/western/adidas_evosl/1.webp',
      '/images/western/adidas_evosl/2.webp'
    ],
    msrpUsd: 180,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Lightweight 5K/10K Speed Demon with Glass-Fiber ENERGYRODS 2.0',
    description: 'Designed specifically for 5K to 10K racing and track interval workouts, the Takumi Sen 10 combines dual-layer Lightstrike Pro foam with glass-fiber ENERGYRODS 2.0 in an ultra-agile 200g package.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 55,
      walkingAnalysis: 'Firm and narrow base for casual walking.',
      dailyRunScore: 72,
      dailyRunAnalysis: 'Best saved for track sessions and fast tempo workouts.',
      speedWorkoutScore: 98,
      speedWorkoutAnalysis: 'DOMINANT SECTOR. Incredible cornering, agility, and explosive turnover for intervals.',
      marathonRaceScore: 82,
      marathonRaceAnalysis: 'Great 5k/10k racer; lacks stack height for full 42k marathons.'
    },
    specs: {
      weightGrams: 200,
      weightOz: 7.0,
      heelStackMm: 33.0,
      forefootStackMm: 27.0,
      dropMm: 6.0,
      foamName: 'Dual Lightstrike Pro',
      foamType: 'Dual-Layer Supercritical PEBA',
      foamResiliencePercent: 88,
      carbonPlate: 'Glass-Fiber ENERGYRODS 2.0',
      carbonStiffnessIndex: 8.2,
      upperMaterial: 'Celermesh Lightweight Mesh',
      breathabilityScore: 9.5,
      outsoleRubber: 'Continental™ Rubber Outsole',
      wetTractionScore: 9.6,
      estimatedLifespanKm: 500,
      fitWidth: 'Snug Performance Fit',
      archSupport: 'Neutral'
    },
    communityPros: [
      'Ultra-lightweight 200g build with nimble cornering',
      'Glass-fiber ENERGYRODS 2.0 provide natural, snappy toe-off',
      'Unmatched Continental rubber traction on track and wet roads'
    ],
    communityCons: [
      'Snug, narrow midfoot fit',
      'Too low stack for full 42k marathon protection'
    ],
    finalConsensusVerdict: 'Premier 5k/10k race day and interval speed weapon.',
    userReviews: []
  },
  {
    id: 'adidas_supernovarise',
    name: 'Adidas Supernova Rise',
    brand: 'Adidas',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage',
    image: '/images/western/adidas_evosl/1.webp',
    galleryImages: [
      '/images/western/adidas_evosl/1.webp',
      '/images/western/adidas_evosl/2.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Plush PEBA-Based Daily Trainer with Support Rod Geometry',
    description: 'The Adidas Supernova Rise introduces Dreamstrike+ PEBA-based midsole foam paired with dense bottom Support Rods for effortless daily mileage and plush impact absorption.',
    overallRating: 87,
    useCaseValues: {
      walkingScore: 92,
      walkingAnalysis: 'Exceptional walking and all-day standing comfort.',
      dailyRunScore: 95,
      dailyRunAnalysis: 'DOMINANT SECTOR. Smooth, comfortable, and durable daily workhorse.',
      speedWorkoutScore: 78,
      speedWorkoutAnalysis: 'Decent pop for moderate strides, but tuned for daily mileage.',
      marathonRaceScore: 72,
      marathonRaceAnalysis: 'Reliable finish-line comfort for relaxed marathon paces.'
    },
    specs: {
      weightGrams: 277,
      weightOz: 9.7,
      heelStackMm: 36.0,
      forefootStackMm: 26.0,
      dropMm: 10.0,
      foamName: 'Dreamstrike+',
      foamType: 'PEBA-Based Supercritical Foam',
      foamResiliencePercent: 83,
      carbonPlate: 'Bottom Support Rods',
      carbonStiffnessIndex: 4.0,
      upperMaterial: 'Engineered Sandwich Mesh',
      breathabilityScore: 8.8,
      outsoleRubber: 'Adiwear Durable Outsole',
      wetTractionScore: 8.9,
      estimatedLifespanKm: 850,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral Support'
    },
    communityPros: [
      'Dreamstrike+ PEBA foam delivers soft yet resilient daily cushioning',
      'Dense Support Rods guide smooth transitions without harsh stiffness',
      'Plush collar and tongue padding for all-day comfort'
    ],
    communityCons: [
      'Higher 10mm heel drop may not suit midfoot purists',
      'Not designed for high-speed track intervals'
    ],
    finalConsensusVerdict: 'Exceptional PEBA-infused daily workhorse trainer.',
    userReviews: []
  },
  {
    id: 'adidas_adizerosl2',
    name: 'Adidas Adizero SL 2',
    brand: 'Adidas',
    category: 'Daily Trainer',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/adidas_evosl/1.webp',
    galleryImages: [
      '/images/western/adidas_evosl/1.webp',
      '/images/western/adidas_evosl/2.webp'
    ],
    msrpUsd: 130,
    msrpRmb: 899,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Best Sub-$130 Super-Foam Daily Speed Trainer',
    description: 'The Adizero SL 2 upgrades the budget lineup with a full-length Lightstrike Pro core encased in Lightstrike 2.0, creating one of the best value daily tempo trainers under $130.',
    overallRating: 88,
    useCaseValues: {
      walkingScore: 82,
      walkingAnalysis: 'Comfortable, lightweight daily walker.',
      dailyRunScore: 92,
      dailyRunAnalysis: 'Versatile daily trainer that handles easy miles and tempo picking.',
      speedWorkoutScore: 90,
      speedWorkoutAnalysis: 'Lightstrike Pro core provides noticeable bounce for tempo runs.',
      marathonRaceScore: 78,
      marathonRaceAnalysis: 'Capable non-plated budget marathon option.'
    },
    specs: {
      weightGrams: 240,
      weightOz: 8.4,
      heelStackMm: 35.0,
      forefootStackMm: 25.0,
      dropMm: 10.0,
      foamName: 'Full Lightstrike Pro Core + Lightstrike 2.0',
      foamType: 'PEBA Core + EVA Carrier',
      foamResiliencePercent: 86,
      carbonPlate: 'None (Pure Foam)',
      carbonStiffnessIndex: 0,
      upperMaterial: 'Engineered Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'Lightweight Rubber Outsole',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 750,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    communityPros: [
      'Full-length Lightstrike Pro core at a sub-$130 price point',
      'Lightweight 240g build handles both easy and tempo paces',
      'Soft engineered mesh upper with secure lockdown'
    ],
    communityCons: [
      'No Continental rubber on outsole (uses standard rubber)',
      '10mm drop may feel steep for low-drop fans'
    ],
    finalConsensusVerdict: 'Outstanding value sub-$130 daily speed trainer with super-foam bounce.',
    userReviews: []
  }
];

// Append before export closing bracket
const lastIndex = content.lastIndexOf('];');
if (lastIndex !== -1) {
  const formattedShoes = newAdidasShoes.map(s => JSON.stringify(s, null, 2)).join(',\n  ');
  content = content.slice(0, lastIndex) + ',\n  ' + formattedShoes + '\n];\n';
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Successfully added ${newAdidasShoes.length} new top Adidas running shoes to shoesData.ts!`);
} else {
  console.error('Could not find closing bracket in shoesData.ts');
}
