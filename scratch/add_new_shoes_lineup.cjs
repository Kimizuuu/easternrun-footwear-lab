const fs = require('fs');
const path = require('path');

const newShoes = [
  // --- NIKE ---
  {
    id: 'nike_invincible3',
    name: 'Nike Invincible 3',
    brand: 'Nike',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/invincible_3/1.webp',
    galleryImages: [
      '/images/western/invincible_3/1.webp',
      '/images/western/invincible_3/2.webp'
    ],
    msrpUsd: 180,
    msrpRmb: 1399,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Maximum Cushioning ZoomX Monster for Recovery & Long Runs',
    description: 'The Nike Invincible 3 pairs a massive stack of full-length ZoomX foam with a wider base and Flyknit upper, offering unmatched plushness and leg-saving impact protection.',
    overallRating: 88,
    useCaseValues: {
      walkingScore: 90,
      dailyTrainerScore: 92,
      tempoWorkoutScore: 72,
      longDistanceScore: 93,
      marathonRaceScore: 78,
      trailScore: 55,
      durabilityScore: 84
    },
    communityFeedback: {
      pros: ['Ultra-plush full-length ZoomX foam', 'Wider base than v2 provides improved stability', 'Excellent leg preservation on 20km+ recovery runs'],
      cons: ['Slight heel slip for runners with narrow ankles', 'Heavy upper feel compared to race shoes']
    },
    labSpecs: {
      weightGrams: 310,
      forefootStackMm: 31,
      heelStackMm: 40,
      dropMm: 9,
      outsoleDurabilityScore: 8.5,
      upperBreathabilityScore: 7.8,
      midsoleTorsionalRigidityScore: 6.5
    },
    techHighlights: [
      { title: 'Full ZoomX Midsole', description: 'Nike’s highest energy return PEBA-based foam for maximum shock absorption.' },
      { title: 'Wider Platform', description: 'Increased forefoot and heel footprint for enhanced inherent stability.' },
      { title: 'Flyknit Upper', description: 'Zonal breathability and secure midfoot lockdown.' }
    ]
  },
  {
    id: 'nike_pegasusplus',
    name: 'Nike Pegasus Plus',
    brand: 'Nike',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/pegasus_plus/1.webp',
    galleryImages: [
      '/images/western/pegasus_plus/1.webp',
      '/images/western/pegasus_plus/2.webp'
    ],
    msrpUsd: 180,
    msrpRmb: 1399,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Full-Length ZoomX Speed Trainer — The Spirit of Pegasus Turbo',
    description: 'Reviving the legendary Pegasus Turbo lineage, the Pegasus Plus features a full-length ZoomX midsole and iconic central racing stripe for energetic daily speed sessions.',
    overallRating: 87,
    useCaseValues: {
      walkingScore: 88,
      dailyTrainerScore: 89,
      tempoWorkoutScore: 91,
      longDistanceScore: 86,
      marathonRaceScore: 82,
      trailScore: 60,
      durabilityScore: 82
    },
    communityFeedback: {
      pros: ['Lightweight and energetic full-length ZoomX ride', 'Classic racing stripe aesthetic', 'Snappy toe-off without a carbon plate'],
      cons: ['Premium price point', 'Outsole rubber thin in high-wear zones']
    },
    labSpecs: {
      weightGrams: 245,
      forefootStackMm: 24,
      heelStackMm: 34,
      dropMm: 10,
      outsoleDurabilityScore: 7.9,
      upperBreathabilityScore: 8.4,
      midsoleTorsionalRigidityScore: 6.8
    },
    techHighlights: [
      { title: 'Full ZoomX Foam', description: 'Ultra-lightweight PEBA foam delivers propulsive energy return.' },
      { title: 'Flyknit Upper with Stripe', description: 'Adaptive fit with vintage Pegasus Turbo racing stripe DNA.' },
      { title: 'Waffle Outsole', description: 'Generous rubber coverage for multi-surface grip.' }
    ]
  },
  {
    id: 'nike_vomero17',
    name: 'Nike Vomero 17',
    brand: 'Nike',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/vomero_17/1.webp',
    galleryImages: [
      '/images/western/vomero_17/1.webp'
    ],
    msrpUsd: 160,
    msrpRmb: 1199,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Dual ZoomX + Cushlon 3.0 Plush Cushion Champion',
    description: 'The Nike Vomero 17 discards the air bag in favor of a dual-density midsole stacking top-tier ZoomX over durable Cushlon 3.0, delivering a silky smooth daily ride.',
    overallRating: 87,
    useCaseValues: {
      walkingScore: 92,
      dailyTrainerScore: 91,
      tempoWorkoutScore: 78,
      longDistanceScore: 90,
      marathonRaceScore: 80,
      trailScore: 62,
      durabilityScore: 88
    },
    communityFeedback: {
      pros: ['Dual-foam ZoomX over Cushlon 3.0 balances softness and bounce', 'Super comfortable engineered mesh upper', 'Durable high-mileage outsole'],
      cons: ['A bit heavy for fast tempo intervals']
    },
    labSpecs: {
      weightGrams: 280,
      forefootStackMm: 29,
      heelStackMm: 39,
      dropMm: 10,
      outsoleDurabilityScore: 8.8,
      upperBreathabilityScore: 8.2,
      midsoleTorsionalRigidityScore: 7.2
    },
    techHighlights: [
      { title: 'Dual Density Midsole', description: 'Top ZoomX layer for bounce + bottom Cushlon 3.0 for stability and life.' },
      { title: 'Plush Collar & Tongue', description: 'Luxurious heel counter prevents slipping and hotspots.' }
    ]
  },

  // --- SAUCONY ---
  {
    id: 'saucony_triumph22',
    name: 'Saucony Triumph 22',
    brand: 'Saucony',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/triumph_22/1.webp',
    galleryImages: [
      '/images/western/triumph_22/1.webp'
    ],
    msrpUsd: 160,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'PEBA-Powered Max Cushion Cruiser with PWRRUN PB',
    description: 'Saucony upgraded the Triumph 22 with full-length PWRRUN PB super-foam, bringing race-day PEBA cushioning and bounce to an ultra-plush daily trainer.',
    overallRating: 89,
    useCaseValues: {
      walkingScore: 93,
      dailyTrainerScore: 93,
      tempoWorkoutScore: 80,
      longDistanceScore: 92,
      marathonRaceScore: 82,
      trailScore: 60,
      durabilityScore: 89
    },
    communityFeedback: {
      pros: ['Full PWRRUN PB PEBA midsole gives awesome spring', 'Wider platform for inherent stability', 'Luxurious upper plushness'],
      cons: ['Slightly heavier than Triumph 21']
    },
    labSpecs: {
      weightGrams: 286,
      forefootStackMm: 27,
      heelStackMm: 37,
      dropMm: 10,
      outsoleDurabilityScore: 9.0,
      upperBreathabilityScore: 8.1,
      midsoleTorsionalRigidityScore: 7.5
    },
    techHighlights: [
      { title: 'PWRRUN PB Midsole', description: 'Full-length beaded PEBA foam for maximum rebound and longevity.' },
      { title: 'Adaptive Fit System', description: 'Soft engineered mesh with midfoot webbing lockdown.' }
    ]
  },
  {
    id: 'saucony_ride17',
    name: 'Saucony Ride 17',
    brand: 'Saucony',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/ride_17/1.webp',
    galleryImages: [
      '/images/western/ride_17/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'PWRRUN+ TPU Upgrade for Vibrant Daily Miles',
    description: 'The Ride 17 receives a major upgrade with full-length PWRRUN+ TPU foam, transforming Saucony’s staple workhorse into an energetic, responsive daily trainer.',
    overallRating: 86,
    useCaseValues: {
      walkingScore: 90,
      dailyTrainerScore: 90,
      tempoWorkoutScore: 82,
      longDistanceScore: 88,
      marathonRaceScore: 79,
      trailScore: 62,
      durabilityScore: 90
    },
    communityFeedback: {
      pros: ['PWRRUN+ TPU foam is vastly superior to older EVA', 'Excellent durability across 800+ km', 'Smooth heel-to-toe transition'],
      cons: ['Firm initial step-in compared to max-cushion models']
    },
    labSpecs: {
      weightGrams: 282,
      forefootStackMm: 27,
      heelStackMm: 35,
      dropMm: 8,
      outsoleDurabilityScore: 9.1,
      upperBreathabilityScore: 8.3,
      midsoleTorsionalRigidityScore: 7.0
    },
    techHighlights: [
      { title: 'PWRRUN+ Foam', description: 'Bouncy TPU-based foam that maintains properties in extreme weather.' },
      { title: 'Increased Outsole Coverage', description: 'XT-900 carbon rubber for high-mileage resistance.' }
    ]
  },
  {
    id: 'saucony_kinvara15',
    name: 'Saucony Kinvara 15',
    brand: 'Saucony',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/kinvara_15/1.webp',
    galleryImages: [
      '/images/western/kinvara_15/1.webp'
    ],
    msrpUsd: 130,
    msrpRmb: 899,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '198g Ultra-Lightweight 4mm Drop Natural Speed Trainer',
    description: 'Staying true to lightweight minimalist performance, the Kinvara 15 offers a featherweight 198g build, low 4mm drop, and direct ground feel for tempo workouts.',
    overallRating: 85,
    useCaseValues: {
      walkingScore: 84,
      dailyTrainerScore: 83,
      tempoWorkoutScore: 89,
      longDistanceScore: 80,
      marathonRaceScore: 78,
      trailScore: 58,
      durabilityScore: 80
    },
    communityFeedback: {
      pros: ['Incredible 198g weight feels weightless', 'Responsive ground connection for track & tempo', 'Nimble low-drop agility'],
      cons: ['Exposed foam outsole wears down faster on rough asphalt']
    },
    labSpecs: {
      weightGrams: 198,
      forefootStackMm: 25,
      heelStackMm: 29,
      dropMm: 4,
      outsoleDurabilityScore: 7.4,
      upperBreathabilityScore: 9.0,
      midsoleTorsionalRigidityScore: 5.5
    },
    techHighlights: [
      { title: 'PWRRUN Midsole + PWRRUN+ Sockliner', description: 'Crisp foam core with soft step-in comfort.' },
      { title: 'Minimalist 4mm Drop', description: 'Promotes natural forefoot striking and ankle mobility.' }
    ]
  },

  // --- ASICS ---
  {
    id: 'asics_metaspeedskyparis',
    name: 'ASICS Metaspeed Sky Paris',
    brand: 'ASICS',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/metaspeed_sky_paris/1.webp',
    galleryImages: [
      '/images/western/metaspeed_sky_paris/1.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1699,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '183g Featherweight Carbon Marathon King with FF TURBO+',
    description: 'Weighing an astonishing 183g, the Metaspeed Sky Paris features ASICS’ newest FlyteFoam Blast TURBO+ PEBA foam and a full-length carbon plate tuned for stride-style marathoners.',
    overallRating: 94,
    useCaseValues: {
      walkingScore: 68,
      dailyTrainerScore: 70,
      tempoWorkoutScore: 92,
      longDistanceScore: 95,
      marathonRaceScore: 97,
      trailScore: 40,
      durabilityScore: 82
    },
    communityFeedback: {
      pros: ['Insanely light 183g weight', 'FF TURBO+ PEBA foam is noticeably softer and bouncier', 'Subtle, highly efficient carbon propulsion'],
      cons: ['Aggressive rocker not suited for slow recovery jogs']
    },
    labSpecs: {
      weightGrams: 183,
      forefootStackMm: 34.5,
      heelStackMm: 39.5,
      dropMm: 5,
      outsoleDurabilityScore: 8.0,
      upperBreathabilityScore: 9.4,
      midsoleTorsionalRigidityScore: 9.5
    },
    techHighlights: [
      { title: 'FF TURBO+ Foam', description: 'PEBA-based super-foam provides 8%+ higher energy return than v1 TURBO.' },
      { title: 'Stride-Optimized Carbon Plate', description: 'Wide carbon plate positioned near top of midsole to extend stride length.' },
      { title: 'MOTION WRAP 2.0 Upper', description: 'Ultra-thin woven mesh with exceptional lockdown.' }
    ]
  },
  {
    id: 'asics_superblast2',
    name: 'ASICS Superblast 2',
    brand: 'ASICS',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/superblast_2/1.webp',
    galleryImages: [
      '/images/western/superblast_2/1.webp'
    ],
    msrpUsd: 220,
    msrpRmb: 1599,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'The Ultimate Non-Plated Super-Trainer with FF TURBO+',
    description: 'The ASICS Superblast 2 inherits the FF TURBO+ PEBA foam from Paris race shoes, layering it over FF BLAST+ ECO to create the ultimate high-stack, non-plated daily workhorse.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 88,
      dailyTrainerScore: 95,
      tempoWorkoutScore: 92,
      longDistanceScore: 96,
      marathonRaceScore: 90,
      trailScore: 58,
      durabilityScore: 91
    },
    communityFeedback: {
      pros: ['FF TURBO+ top layer gives race-day bounce without a plate', 'Massive 45mm stack saves legs on 30km+ long runs', 'Versatile from 4:00/km tempo to 5:30/km easy pace'],
      cons: ['High $220 price tag', 'Limited retail stock availability']
    },
    labSpecs: {
      weightGrams: 249,
      forefootStackMm: 37,
      heelStackMm: 45,
      dropMm: 8,
      outsoleDurabilityScore: 9.2,
      upperBreathabilityScore: 8.6,
      midsoleTorsionalRigidityScore: 8.0
    },
    techHighlights: [
      { title: 'FF TURBO+ PEBA Top Layer', description: 'Same race-foam as Metaspeed Paris for explosive trampoline pop.' },
      { title: 'FF BLAST+ ECO Base', description: 'Bio-based bottom foam adds structural durability and protection.' },
      { title: 'ASICSGRIP Outsole', description: 'Superior wet & dry traction rubber.' }
    ]
  },
  {
    id: 'asics_novablast4',
    name: 'ASICS Novablast 4',
    brand: 'ASICS',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/novablast_4/1.webp',
    galleryImages: [
      '/images/western/novablast_4/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Trampoline-Effect Daily Rebound King with FF BLAST+ ECO',
    description: 'Featuring geometric geometric trampoline outsole sculpting and eco-friendly FF BLAST+ ECO foam, the Novablast 4 remains the benchmark for fun, bouncy daily training.',
    overallRating: 89,
    useCaseValues: {
      walkingScore: 92,
      dailyTrainerScore: 94,
      tempoWorkoutScore: 86,
      longDistanceScore: 90,
      marathonRaceScore: 83,
      trailScore: 60,
      durabilityScore: 88
    },
    communityFeedback: {
      pros: ['Fun trampoline pop on forefoot strike', 'FF BLAST+ ECO is softer and more stable than v3', 'Unbeatable value at $140 MSRP'],
      cons: ['Can feel slightly tall for sharp cornering']
    },
    labSpecs: {
      weightGrams: 260,
      forefootStackMm: 33.5,
      heelStackMm: 41.5,
      dropMm: 8,
      outsoleDurabilityScore: 8.7,
      upperBreathabilityScore: 8.4,
      midsoleTorsionalRigidityScore: 7.2
    },
    techHighlights: [
      { title: 'Trampoline-Inspired Outsole Pod', description: 'Central cutout flexes to maximize energy return.' },
      { title: 'Woven Upper', description: 'Engineered stretch woven fabric replaces mesh for enhanced fit.' }
    ]
  },

  // --- XTEP ---
  {
    id: 'xtep-160x-6-pro',
    name: 'Xtep 160X 6.0 PRO',
    brand: 'Xtep',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/xtep_160x_6pro/1.webp',
    galleryImages: [
      '/images/western/xtep_160x_6pro/1.webp'
    ],
    msrpUsd: 260,
    msrpRmb: 1699,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'World Championship Certified X-TEP ACE PEBA Carbon Racer',
    description: 'The flagship Chinese super-shoe worn by elite marathon champions, featuring super-critical X-TEP ACE PEBA foam, a full-length spoon carbon plate, and CPU wear-resistant outsole.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 65,
      dailyTrainerScore: 68,
      tempoWorkoutScore: 93,
      longDistanceScore: 96,
      marathonRaceScore: 97,
      trailScore: 45,
      durabilityScore: 92
    },
    communityFeedback: {
      pros: ['Incredible 88%+ rebound rate from X-TEP ACE PEBA', 'Legendary CPU rubber outsole lasts 1000km+', 'Aggressive forward carbon propulsion'],
      cons: ['Stiff ride at paces slower than 4:30/km']
    },
    labSpecs: {
      weightGrams: 198,
      forefootStackMm: 33,
      heelStackMm: 39,
      dropMm: 6,
      outsoleDurabilityScore: 9.8,
      upperBreathabilityScore: 9.2,
      midsoleTorsionalRigidityScore: 9.6
    },
    techHighlights: [
      { title: 'X-TEP ACE Super-Critical PEBA', description: 'Super-critical gas-foamed PEBA for extreme energy return.' },
      { title: 'T700 Carbon Plate', description: 'Full-length spoon-shaped carbon structure for rigid lever propulsion.' },
      { title: 'CPU Outsole Rubber', description: 'Military-grade polyurethane grip that outlasts traditional blown rubber by 3x.' }
    ]
  },
  {
    id: 'xtep-260-3-0',
    name: 'Xtep 260 3.0',
    brand: 'Xtep',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/xtep_260_3/1.webp',
    galleryImages: [
      '/images/western/xtep_260_3/1.webp'
    ],
    msrpUsd: 130,
    msrpRmb: 799,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Nylon-Plated High-Mileage Speed Workout Specialist',
    description: 'Engineered as the ultimate workout partner for marathon training blocks, the Xtep 260 3.0 pairs a flexible Nylon plate with X-TEP ACE foam for responsive tempo runs.',
    overallRating: 88,
    useCaseValues: {
      walkingScore: 85,
      dailyTrainerScore: 90,
      tempoWorkoutScore: 92,
      longDistanceScore: 89,
      marathonRaceScore: 85,
      trailScore: 55,
      durabilityScore: 91
    },
    communityFeedback: {
      pros: ['Nylon plate provides snap without carbon harshness', 'CPU outsole delivers phenomenal wet grip', 'Outstanding price-to-performance ratio'],
      cons: ['Slightly firm heel landing']
    },
    labSpecs: {
      weightGrams: 235,
      forefootStackMm: 28,
      heelStackMm: 36,
      dropMm: 8,
      outsoleDurabilityScore: 9.5,
      upperBreathabilityScore: 8.5,
      midsoleTorsionalRigidityScore: 7.8
    },
    techHighlights: [
      { title: 'Flexible Nylon Plate', description: 'Forgiving propulsion plate designed for high training volume.' },
      { title: 'X-TEP ACE Foam Core', description: 'Lightweight PEBA foam cushion for crisp toe-off.' }
    ]
  },

  // --- MIZUNO ---
  {
    id: 'mizuno_waverebellionpro2',
    name: 'Mizuno Wave Rebellion Pro 2',
    brand: 'Mizuno',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/wave_rebellion_pro2/1.webp',
    galleryImages: [
      '/images/western/wave_rebellion_pro2/1.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1799,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '50mm Extreme Beveled Carbon Monster with Smooth Speed Assist',
    description: 'Featuring an aggressive 50mm heel stack with extreme heel cut-away, the Wave Rebellion Pro 2 forces an ultra-efficient forefoot strike backed by MIZUNO ENERZY LITE+ foam.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 50,
      dailyTrainerScore: 60,
      tempoWorkoutScore: 94,
      longDistanceScore: 94,
      marathonRaceScore: 96,
      trailScore: 35,
      durabilityScore: 85
    },
    communityFeedback: {
      pros: ['Unrivaled forward propulsion for forefoot runners', 'MIZUNO ENERZY LITE+ PEBA foam is explosive', 'G3 outsole delivers supreme grip'],
      cons: ['Impossible to walk or slow-jog in due to extreme heel bevel']
    },
    labSpecs: {
      weightGrams: 215,
      forefootStackMm: 38,
      heelStackMm: 50,
      dropMm: 12,
      outsoleDurabilityScore: 8.6,
      upperBreathabilityScore: 8.8,
      midsoleTorsionalRigidityScore: 9.5
    },
    techHighlights: [
      { title: 'Smooth Speed Assist', description: 'Biomechanically engineered bevel forces midfoot/forefoot land.' },
      { title: 'Carbon-Infused Wave Plate', description: 'Full-length rigid plate amplifies energy return.' },
      { title: 'G3 Outsole', description: 'Resin outsole pods provide aggressive traction.' }
    ]
  },
  {
    id: 'mizuno_waverider28',
    name: 'Mizuno Wave Rider 28',
    brand: 'Mizuno',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/wave_rider28/1.webp',
    galleryImages: [
      '/images/western/wave_rider28/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Enerzy NXT Upgrade for Legendary Japanese Workhorse',
    description: 'The 28th generation of Mizuno’s iconic Wave Rider introduces MIZUNO ENERZY NXT bio-based foam under the heel, giving the classic Wave Plate ride a softer, modern bounce.',
    overallRating: 87,
    useCaseValues: {
      walkingScore: 91,
      dailyTrainerScore: 92,
      tempoWorkoutScore: 82,
      longDistanceScore: 88,
      marathonRaceScore: 80,
      trailScore: 65,
      durabilityScore: 93
    },
    communityFeedback: {
      pros: ['ENERZY NXT foam gives noticeable softness update', 'Iconic Mizuno Wave Plate stability', 'Indestructible X10 rubber outsole'],
      cons: ['Traditional 12mm drop may feel steep for low-drop fans']
    },
    labSpecs: {
      weightGrams: 275,
      forefootStackMm: 26.5,
      heelStackMm: 38.5,
      dropMm: 12,
      outsoleDurabilityScore: 9.6,
      upperBreathabilityScore: 8.2,
      midsoleTorsionalRigidityScore: 7.8
    },
    techHighlights: [
      { title: 'MIZUNO ENERZY NXT', description: 'Next-gen plant-based foam for enhanced softness and eco footprint.' },
      { title: 'Pebax Wave Plate', description: 'Disperses impact shock evenly across midfoot.' }
    ]
  },

  // --- NEW BALANCE ---
  {
    id: 'nb_sc_elite_v4',
    name: 'New Balance FuelCell SuperComp Elite v4',
    brand: 'New Balance',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/sc_elite_v4/1.webp',
    galleryImages: [
      '/images/western/sc_elite_v4/1.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1799,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '100% PEBA FuelCell + Energy Arc Carbon Plate Super-Shoe',
    description: 'Overhauling New Balance’s race tech, the SC Elite v4 features 100% PEBA FuelCell foam paired with a redesigned angular carbon Energy Arc plate for smooth marathon speed.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 75,
      dailyTrainerScore: 78,
      tempoWorkoutScore: 93,
      longDistanceScore: 95,
      marathonRaceScore: 96,
      trailScore: 45,
      durabilityScore: 84
    },
    communityFeedback: {
      pros: ['100% PEBA FuelCell foam is significantly bouncier than v3', 'Energy Arc carbon plate delivers smooth, non-harsh propulsion', 'FantomFit upper lockdown'],
      cons: ['Upper feels a bit stiff around top eyelets']
    },
    labSpecs: {
      weightGrams: 237,
      forefootStackMm: 36,
      heelStackMm: 40,
      dropMm: 4,
      outsoleDurabilityScore: 8.2,
      upperBreathabilityScore: 8.7,
      midsoleTorsionalRigidityScore: 9.4
    },
    techHighlights: [
      { title: '100% PEBA FuelCell', description: 'Pure PEBA foam compound for explosive rebound.' },
      { title: 'Energy Arc System', description: 'Voided midsole channel allows carbon plate to flex and spring back.' },
      { title: 'FantomFit Upper', description: 'Ultra-light bonded mesh construction.' }
    ]
  },
  {
    id: 'nb_rebel_v4',
    name: 'New Balance FuelCell Rebel v4',
    brand: 'New Balance',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/rebel_v4/1.webp',
    galleryImages: [
      '/images/western/rebel_v4/1.webp'
    ],
    msrpUsd: 140,
    msrpRmb: 999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: '212g Non-Plated PEBA-Blend Lightweight Speed Demon',
    description: 'The Rebel v4 receives a geometric geometric makeover with a wider base, PEBA-blend FuelCell foam, and ultra-light 212g weight, making it a favorite non-plated speed trainer.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 88,
      dailyTrainerScore: 91,
      tempoWorkoutScore: 94,
      longDistanceScore: 87,
      marathonRaceScore: 84,
      trailScore: 58,
      durabilityScore: 83
    },
    communityFeedback: {
      pros: ['Super light 212g weight feels explosive underfoot', 'PEBA/EVA blend FuelCell is snappy and fun', 'Wider platform improves cornering stability'],
      cons: ['Foam compresses slightly on runs over 25km']
    },
    labSpecs: {
      weightGrams: 212,
      forefootStackMm: 24,
      heelStackMm: 30,
      dropMm: 6,
      outsoleDurabilityScore: 8.0,
      upperBreathabilityScore: 9.1,
      midsoleTorsionalRigidityScore: 6.2
    },
    techHighlights: [
      { title: 'PEBA-Blend FuelCell', description: 'Combines PEBA pop with EVA structural stability.' },
      { title: 'FantomFit Mesh', description: 'Breathable, race-inspired upper.' }
    ]
  },
  {
    id: 'nb_1080_v13',
    name: 'New Balance Fresh Foam X 1080 v13',
    brand: 'New Balance',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/1080_v13/1.webp',
    galleryImages: [
      '/images/western/1080_v13/1.webp'
    ],
    msrpUsd: 165,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Pillow-Soft Fresh Foam X Max Cushion King',
    description: 'The 1080 v13 redefines pillowy comfort with a reformulated Fresh Foam X midsole that delivers cloud-like shock absorption for recovery days and long daily miles.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 96,
      dailyTrainerScore: 95,
      tempoWorkoutScore: 75,
      longDistanceScore: 94,
      marathonRaceScore: 80,
      trailScore: 60,
      durabilityScore: 87
    },
    communityFeedback: {
      pros: ['Incredible marshmallow-soft step-in comfort', 'Best walking and recovery run shoe on the market', 'Smooth forefoot rocker'],
      cons: ['Too soft for fast tempo or interval work']
    },
    labSpecs: {
      weightGrams: 262,
      forefootStackMm: 32,
      heelStackMm: 38,
      dropMm: 6,
      outsoleDurabilityScore: 8.5,
      upperBreathabilityScore: 8.5,
      midsoleTorsionalRigidityScore: 6.5
    },
    techHighlights: [
      { title: 'Softest Fresh Foam X Formula', description: 'Engineered for maximum compression and pillow comfort.' },
      { title: 'Engineered Mesh Upper', description: 'Second-skin fit with padded collar.' }
    ]
  }
];

const shoesDataPath = path.join(__dirname, '..', 'src', 'data', 'shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

// Convert objects to TypeScript formatting
const newItemsCode = newShoes.map(s => JSON.stringify(s, null, 2)).join(',\n  ');

// Insert into shoesData before ending bracket ];
const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx !== -1) {
  const updatedContent = content.substring(0, lastBracketIdx) + ',\n  ' + newItemsCode + '\n];\n';
  fs.writeFileSync(shoesDataPath, updatedContent, 'utf8');
  console.log(`✅ Successfully added ${newShoes.length} new top running shoes from Nike, Saucony, ASICS, Xtep, Mizuno, and New Balance!`);
} else {
  console.log('❌ Could not find ending ]; in shoesData.ts');
}
