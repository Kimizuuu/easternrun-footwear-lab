const fs = require('fs');
const path = require('path');

const westernShoesTS = `
  // --- WESTERN BENCHMARK REFERENCE MODELS ---
  {
    id: 'nike_alphafly3',
    name: 'Nike Alphafly 3',
    brand: 'Nike',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/alphafly_3/1.avif',
    galleryImages: [
      '/images/western/alphafly_3/1.avif',
      '/images/western/alphafly_3/2.avif',
      '/images/western/alphafly_3/3.avif',
      '/images/western/alphafly_3/4.avif',
      '/images/western/alphafly_3/5.avif',
      '/images/western/alphafly_3/6.avif',
      '/images/western/alphafly_3/7.avif',
      '/images/western/alphafly_3/8.avif'
    ],
    msrpUsd: 285,
    msrpRmb: 2099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'The Gold Standard Marathon Super-Shoe with Dual Air Zoom Pods',
    description: 'The Nike Alphafly 3 is the pinnacle of marathon racing engineering. Featuring a continuous ZoomX foam midsole, dual forefoot Air Zoom pods, and a full-length Flyplate, it delivers unmatched propulsion and energy return for sub-3 marathoners.',
    overallRating: 96,
    useCaseValues: {
      walkingScore: 55,
      walkingAnalysis: 'High stack and aggressive toe spring make it unstable for slow walking.',
      dailyRunScore: 68,
      dailyRunAnalysis: 'Too stiff and expensive for daily mileage; built purely for race-day speed.',
      speedWorkoutScore: 94,
      speedWorkoutAnalysis: 'Incredible pop and energy return for 5k to half-marathon tempo efforts.',
      marathonRaceScore: 98,
      marathonRaceAnalysis: 'Top-ranked global marathon racer. Provides peak stride efficiency and leg preservation.'
    },
    specs: {
      weightGrams: 218,
      weightOz: 7.7,
      heelStackMm: 40,
      forefootStackMm: 32,
      dropMm: 8,
      foamName: 'ZoomX PEBA Foam',
      foamType: 'Supercritical PEBA + Dual Air Zoom Pods',
      foamResiliencePercent: 88,
      carbonPlate: 'Full-Length Carbon Flyplate',
      carbonStiffnessIndex: 10,
      upperMaterial: 'Atomknit 3.0 Ultra-Breathable Mesh',
      breathabilityScore: 9.5,
      outsoleRubber: 'Fast Shot Rubber + Pod Grip',
      wetTractionScore: 8.5,
      estimatedLifespanKm: 450,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Dual Air Zoom pods provide explosive forefoot energy return',
      'Continuous ZoomX midsole yields smoother heel-to-toe transitions than v2',
      'Ultra-light 218g weight for a 40mm stack marathon shoe'
    ],
    consList: [
      'High $285 price point',
      'Difficult to slip on due to integrated Atomknit bootie upper'
    ],
    userReviews: [
      {
        id: 'rev_nk_alpha1',
        userName: 'Marcus V.',
        rating: 5,
        date: '2024-05-12',
        title: "PR'd by 4 minutes at Chicago",
        comment: 'The transition from heel to toe is noticeably smoother than the Alphafly 2. The Air Zoom pods feel explosive when locked into marathon pace.',
        pros: ['Explosive propulsion', 'Lightweight upper', 'Leg preservation'],
        cons: ['Tight collar entry'],
        verifiedDistanceKm: 240,
        helpfulCount: 42
      }
    ]
  },
  {
    id: 'nike_vaporfly3',
    name: 'Nike Vaporfly 3',
    brand: 'Nike',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/vaporfly_4/1.avif',
    galleryImages: [
      '/images/western/vaporfly_4/1.avif',
      '/images/western/vaporfly_4/2.avif',
      '/images/western/vaporfly_4/3.avif',
      '/images/western/vaporfly_4/4.avif',
      '/images/western/vaporfly_4/5.avif',
      '/images/western/vaporfly_4/6.avif',
      '/images/western/vaporfly_4/7.avif',
      '/images/western/vaporfly_4/8.avif'
    ],
    msrpUsd: 260,
    msrpRmb: 1899,
    releaseYear: 2023,
    availability: 'Global Shipping',
    tagline: 'Ultra-Lightweight 198g Marathon Speed & 10k/Half Marathon Benchmark',
    description: 'The Nike Vaporfly 3 sets the global standard for lightweight racing performance. Weighing under 200g with 40mm of sculpted ZoomX foam and a full-length Flyplate, it offers snappy, featherweight speed from 5k to 42.2km.',
    overallRating: 95,
    useCaseValues: {
      walkingScore: 50,
      walkingAnalysis: 'Narrow heel base makes slow walking feel wobbly.',
      dailyRunScore: 65,
      dailyRunAnalysis: 'Reserved for key workouts and race days.',
      speedWorkoutScore: 96,
      speedWorkoutAnalysis: 'Razor-sharp response for track intervals and 5k/10k races.',
      marathonRaceScore: 97,
      marathonRaceAnalysis: 'Exceptionally fast and lightweight marathon racer for neutral runners.'
    },
    specs: {
      weightGrams: 198,
      weightOz: 7.0,
      heelStackMm: 40,
      forefootStackMm: 32,
      dropMm: 8,
      foamName: 'ZoomX Foam',
      foamType: 'Supercritical PEBA',
      foamResiliencePercent: 88,
      carbonPlate: 'Full-Length Flyplate',
      carbonStiffnessIndex: 9.5,
      upperMaterial: 'Flyknit Engineered Mesh',
      breathabilityScore: 9.2,
      outsoleRubber: 'Waffle-Textured Rubber',
      wetTractionScore: 8.2,
      estimatedLifespanKm: 400,
      fitWidth: 'Narrow',
      archSupport: 'Neutral'
    },
    prosList: [
      'Extremely lightweight at under 200g',
      'Snappy, aggressive toe-off responsiveness',
      'Improved upper breathability compared to Vaporfly 2'
    ],
    consList: [
      'Narrow heel platform requires good ankle stability',
      'Outsole rubber wears faster on coarse asphalt'
    ],
    userReviews: [
      {
        id: 'rev_nk_vap1',
        userName: 'David K.',
        rating: 5,
        date: '2024-03-20',
        title: 'Featherweight speed machine',
        comment: 'Still the benchmark for 10k and Half Marathon races. The weight reduction makes leg turnover feel effortless.',
        pros: ['Featherweight', 'Aggressive rocker', 'Breathable upper'],
        cons: ['Narrow heel stability'],
        verifiedDistanceKm: 180,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'nike_zoomfly6',
    name: 'Nike Zoom Fly 6',
    brand: 'Nike',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/zoomfly_6/1.avif',
    galleryImages: [
      '/images/western/zoomfly_6/1.avif',
      '/images/western/zoomfly_6/2.avif',
      '/images/western/zoomfly_6/3.avif',
      '/images/western/zoomfly_6/4.avif',
      '/images/western/zoomfly_6/5.avif',
      '/images/western/zoomfly_6/6.avif',
      '/images/western/zoomfly_6/7.avif',
      '/images/western/zoomfly_6/8.avif'
    ],
    msrpUsd: 170,
    msrpRmb: 1199,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Versatile Plated Tempo Trainer with High-Stack ZoomX Cushioning',
    description: 'The Nike Zoom Fly 6 is redesigned from the ground up to be significantly lighter than previous iterations. Featuring ZoomX foam encased in a durable carrier with a full-length Flyplate, it is the perfect training companion to the Vaporfly and Alphafly.',
    overallRating: 90,
    useCaseValues: {
      walkingScore: 70,
      walkingAnalysis: 'Comfortable cushion, though slightly stiff forefoot plate.',
      dailyRunScore: 84,
      dailyRunAnalysis: 'Great for steady-state uptempo daily miles.',
      speedWorkoutScore: 92,
      speedWorkoutAnalysis: 'Excels at marathon pace tempos and long workout intervals.',
      marathonRaceScore: 86,
      marathonRaceAnalysis: 'Solid budget-friendly marathon race option for runners wanting durable carbon plating.'
    },
    specs: {
      weightGrams: 252,
      weightOz: 8.9,
      heelStackMm: 42,
      forefootStackMm: 34,
      dropMm: 8,
      foamName: 'ZoomX + SR-02 Carrier',
      foamType: 'Supercritical PEBA Core with EVA Carrier',
      foamResiliencePercent: 84,
      carbonPlate: 'Full-Length Flyplate',
      carbonStiffnessIndex: 8.5,
      upperMaterial: 'Woven Mesh Upper',
      breathabilityScore: 8.8,
      outsoleRubber: 'High-Abrasion Rubber Outsole',
      wetTractionScore: 8.6,
      estimatedLifespanKm: 650,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Much lighter than Zoom Fly 5 (dropped over 30g)',
      'High-stack ZoomX provides excellent protection for long workout miles',
      'Durable outsole rubber for hundreds of training kilometers'
    ],
    consList: [
      'Firmer than pure Vaporfly due to protective foam carrier',
      'Higher stack height requires attention on sharp turns'
    ],
    userReviews: [
      {
        id: 'rev_nk_zf6_1',
        userName: 'Brian T.',
        rating: 5,
        date: '2024-11-04',
        title: 'Huge upgrade over Zoom Fly 5',
        comment: 'Finally Nike fixed the weight! The Zoom Fly 6 feels snappy, cushioned, and perfect for long tempo runs.',
        pros: ['Significantly lighter', 'ZoomX bounce', 'Durable outsole'],
        cons: ['Stiff carbon plate'],
        verifiedDistanceKm: 120,
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'nike_pegasus41',
    name: 'Nike Pegasus 41',
    brand: 'Nike',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/pegasus_42/1.avif',
    galleryImages: [
      '/images/western/pegasus_42/1.avif',
      '/images/western/pegasus_42/2.avif',
      '/images/western/pegasus_42/3.avif',
      '/images/western/pegasus_42/4.avif',
      '/images/western/pegasus_42/5.avif',
      '/images/western/pegasus_42/6.avif',
      '/images/western/pegasus_42/7.avif',
      '/images/western/pegasus_42/8.avif'
    ],
    msrpUsd: 140,
    msrpRmb: 899,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'The Ultimate Durable Daily Workhorse with Upgraded ReactX Foam',
    description: "The Nike Pegasus 41 introduces ReactX foam, offering 13% more energy return and a reduced carbon footprint. Paired with dual forefoot and heel Air Zoom units, it remains the world's most trusted daily running workhorse.",
    overallRating: 88,
    useCaseValues: {
      walkingScore: 92,
      walkingAnalysis: 'Exceptional all-day walking comfort and classic neutral support.',
      dailyRunScore: 94,
      dailyRunAnalysis: 'The benchmark daily trainer for easy runs, recovery miles, and gym work.',
      speedWorkoutScore: 72,
      speedWorkoutAnalysis: 'Decent versatility, though lacks the propulsive snap of carbon-plated shoes.',
      marathonRaceScore: 68,
      marathonRaceAnalysis: 'Reliable, but heavy for competitive marathon racing.'
    },
    specs: {
      weightGrams: 283,
      weightOz: 10.0,
      heelStackMm: 37,
      forefootStackMm: 27,
      dropMm: 10,
      foamName: 'ReactX Foam',
      foamType: 'High-Efficiency ReactX with Dual Air Zoom Units',
      foamResiliencePercent: 78,
      carbonPlate: 'None',
      carbonStiffnessIndex: 3,
      upperMaterial: 'Engineered Sandwich Mesh',
      breathabilityScore: 8.4,
      outsoleRubber: 'Waffle Rubber Outsole',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'ReactX foam provides noticeable upgrade in softness and rebound over React',
      'Legendary outsole durability lasting 800+ km',
      'Dual Air Zoom units absorb impact smoothly'
    ],
    consList: [
      'Higher 10mm drop may not suit midfoot/forefoot purists',
      'Weight is average at 283g'
    ],
    userReviews: [
      {
        id: 'rev_nk_peg41_1',
        userName: 'Jason R.',
        rating: 5,
        date: '2024-06-18',
        title: 'ReactX makes a huge difference',
        comment: 'I have owned Pegasus 38, 39, and 40. The Pegasus 41 is by far the softest and most bouncy version yet.',
        pros: ['Bouncier ReactX foam', 'Classic durability', 'Great fit'],
        cons: ['Traditional 10mm drop'],
        verifiedDistanceKm: 310,
        helpfulCount: 28
      }
    ]
  },
  {
    id: 'adidas_adiospro4',
    name: 'Adidas Adizero Adios Pro 4',
    brand: 'Adidas',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/adios_pro4/1.webp',
    galleryImages: [
      '/images/western/adios_pro4/1.webp',
      '/images/western/adios_pro4/2.webp',
      '/images/western/adios_pro4/3.webp',
      '/images/western/adios_pro4/4.webp',
      '/images/western/adios_pro4/5.webp',
      '/images/western/adios_pro4/6.webp',
      '/images/western/adios_pro4/7.webp',
      '/images/western/adios_pro4/8.webp'
    ],
    msrpUsd: 250,
    msrpRmb: 1899,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Elite Marathon Benchmark with Resilient Lightstrike Pro & ENERGYRODS',
    description: 'The Adidas Adizero Adios Pro 4 is built for podium performances. Redesigned with a lighter forefoot rocker point, dual-layer Lightstrike Pro foam, carbon ENERGYRODS 2.0, and Continental outsole rubber, it is trusted by major marathon winners worldwide.',
    overallRating: 96,
    useCaseValues: {
      walkingScore: 52,
      walkingAnalysis: 'Aggressive rocker point is engineered purely for running momentum.',
      dailyRunScore: 66,
      dailyRunAnalysis: 'High-end racing shoe reserved for key tempo sessions and races.',
      speedWorkoutScore: 95,
      speedWorkoutAnalysis: 'Phenomenal forefoot roll and energy return for fast intervals.',
      marathonRaceScore: 98,
      marathonRaceAnalysis: 'World-class marathon racer with exceptional outsole grip and foam resilience.'
    },
    specs: {
      weightGrams: 200,
      weightOz: 7.0,
      heelStackMm: 39,
      forefootStackMm: 33,
      dropMm: 6,
      foamName: 'Lightstrike Pro',
      foamType: 'Supercritical TPEE / PEBA Blend',
      foamResiliencePercent: 88.5,
      carbonPlate: 'Carbon ENERGYRODS 2.0',
      carbonStiffnessIndex: 9.5,
      upperMaterial: 'LIGHTLOCK Stretch Woven Mesh',
      breathabilityScore: 9.3,
      outsoleRubber: 'Continental™ Rubber + LIGHTTRAXION',
      wetTractionScore: 9.5,
      estimatedLifespanKm: 500,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Continental rubber provides best-in-class wet road traction among super-shoes',
      'Lightstrike Pro maintains energy return across full 42.2km marathons',
      'Sub-200g weight with high-stack protection'
    ],
    consList: [
      'Upper lock-down requires careful lacing adjustments',
      'Aggressive rocker takes a run or two to get used to'
    ],
    userReviews: [
      {
        id: 'rev_adi_ap4_1',
        userName: 'Stefan M.',
        rating: 5,
        date: '2024-10-15',
        title: 'Best marathon shoe grip in the rain',
        comment: 'Ran Berlin in wet conditions and the Continental rubber held like glue. The ENERGYRODS keep your feet feeling fresh at kilometer 35.',
        pros: ['Incredible wet grip', 'Lightstrike Pro bounce', 'Lightweight'],
        cons: ['Takes lacing adjustment'],
        verifiedDistanceKm: 190,
        helpfulCount: 37
      }
    ]
  },
  {
    id: 'adidas_evosl',
    name: 'Adidas Adizero EVO SL',
    brand: 'Adidas',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/evo_sl/1.webp',
    galleryImages: [
      '/images/western/evo_sl/1.webp',
      '/images/western/evo_sl/2.webp',
      '/images/western/evo_sl/3.webp',
      '/images/western/evo_sl/4.webp',
      '/images/western/evo_sl/5.webp',
      '/images/western/evo_sl/6.webp',
      '/images/western/evo_sl/7.webp',
      '/images/western/evo_sl/8.webp'
    ],
    msrpUsd: 150,
    msrpRmb: 1099,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Non-Plated Super-Trainer King with Pure Lightstrike Pro Bounce',
    description: 'The Adidas Adizero EVO SL brings the pure, uninhibited bounce of full Lightstrike Pro super-foam to an affordable $150 non-plated trainer. Inspired by the record-breaking EVO Pro 1, it delivers effortless bounce and natural foot movement for daily workouts.',
    overallRating: 94,
    useCaseValues: {
      walkingScore: 85,
      walkingAnalysis: 'Smooth non-plated feel makes it comfortable for casual wear and warmups.',
      dailyRunScore: 93,
      dailyRunAnalysis: 'Versatile super-foam daily trainer for easy, steady, and tempo runs.',
      speedWorkoutScore: 94,
      speedWorkoutAnalysis: 'Lightweight and bouncy for fast interval sessions without plate stiffness.',
      marathonRaceScore: 82,
      marathonRaceAnalysis: 'Great non-plated marathon racer for runners preferring natural foot flexion.'
    },
    specs: {
      weightGrams: 224,
      weightOz: 7.9,
      heelStackMm: 36,
      forefootStackMm: 29,
      dropMm: 7,
      foamName: 'Full Lightstrike Pro',
      foamType: 'Supercritical TPEE Foam',
      foamResiliencePercent: 88,
      carbonPlate: 'None (Pure Foam Flexibility)',
      carbonStiffnessIndex: 4,
      upperMaterial: 'Engineered Woven Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'Lightweight Rubber Outsole',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 650,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Full Lightstrike Pro super-foam for only $150',
      'No stiff plate allows natural foot muscle engagement and smooth ride',
      'Lightweight at 224g with premium racing aesthetic'
    ],
    consList: [
      'No carbon plate snap if looking for maximum race-day propulsion',
      'Soft foam may compress slightly faster for heavy runners (>90kg)'
    ],
    userReviews: [
      {
        id: 'rev_adi_evo_1',
        userName: 'Alex P.',
        rating: 5,
        date: '2024-11-20',
        title: 'Shoe of the year value!',
        comment: 'Full Lightstrike Pro without a plate is a dream. It feels bouncy, smooth, and handles everything from 5k pace to long 20km weekend runs.',
        pros: ['Unbeatable $150 value', 'Full Lightstrike Pro', 'Natural flex'],
        cons: ['Lacks carbon plate pop'],
        verifiedDistanceKm: 150,
        helpfulCount: 45
      }
    ]
  },
  {
    id: 'adidas_boston13',
    name: 'Adidas Adizero Boston 13',
    brand: 'Adidas',
    category: 'Daily Trainer',
    dominantSector: 'Daily Mileage & Training',
    image: '/images/western/boston_13/1.webp',
    galleryImages: [
      '/images/western/boston_13/1.webp',
      '/images/western/boston_13/2.webp',
      '/images/western/boston_13/3.webp',
      '/images/western/boston_13/4.webp',
      '/images/western/boston_13/5.webp',
      '/images/western/boston_13/6.webp',
      '/images/western/boston_13/7.webp'
    ],
    msrpUsd: 160,
    msrpRmb: 1199,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'The Benchmark Plated Workout Workhorse for Long Distance Training',
    description: 'The Adidas Adizero Boston 13 combines a top layer of Lightstrike Pro super-foam with a protective Lightstrike 2.0 base and glass-fiber ENERGYRODS. Built to handle 800+ km of grueling marathon training blocks.',
    overallRating: 91,
    useCaseValues: {
      walkingScore: 78,
      walkingAnalysis: 'Firm and stable underfoot, suitable for walking.',
      dailyRunScore: 92,
      dailyRunAnalysis: 'Exceptional workout daily trainer for medium and long distance runs.',
      speedWorkoutScore: 90,
      speedWorkoutAnalysis: 'Glass-fiber rods provide smooth propulsion for tempo runs.',
      marathonRaceScore: 84,
      marathonRaceAnalysis: 'Durable, supportive training option for marathon distance.'
    },
    specs: {
      weightGrams: 260,
      weightOz: 9.1,
      heelStackMm: 38,
      forefootStackMm: 30,
      dropMm: 8,
      foamName: 'Lightstrike Pro + Lightstrike 2.0',
      foamType: 'Dual-Density Supercritical + EVA Base',
      foamResiliencePercent: 82,
      carbonPlate: 'Glass-Fiber ENERGYRODS',
      carbonStiffnessIndex: 7.5,
      upperMaterial: 'Engineered Mesh',
      breathabilityScore: 8.6,
      outsoleRubber: 'Continental™ Rubber Outsole',
      wetTractionScore: 9.4,
      estimatedLifespanKm: 800,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Continental outsole provides outstanding grip and longevity',
      'Dual foam setup absorbs high training volume impact',
      'Glass-fiber rods offer snappy propulsion without harsh stiffness'
    ],
    consList: [
      'Firm initial break-in period for the first 20km',
      'Slightly heavier than pure race-day super-shoes'
    ],
    userReviews: [
      {
        id: 'rev_adi_bos13_1',
        userName: 'Daniel H.',
        rating: 5,
        date: '2024-09-08',
        title: 'The ultimate 20km long run trainer',
        comment: 'Boston 13 saves your race shoes for race day while giving you 90% of the speed and propulsion in training.',
        pros: ['Extreme durability', 'Continental rubber grip', 'Great long run shoe'],
        cons: ['Firm initial break-in'],
        verifiedDistanceKm: 410,
        helpfulCount: 26
      }
    ]
  },
  {
    id: 'saucony_endorphinelite2',
    name: 'Saucony Endorphin Elite 2',
    brand: 'Saucony',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/endorphin_elite2/1.webp',
    galleryImages: [
      '/images/western/endorphin_elite2/1.webp',
      '/images/western/endorphin_elite2/2.webp',
      '/images/western/endorphin_elite2/3.webp',
      '/images/western/endorphin_elite2/4.webp',
      '/images/western/endorphin_elite2/5.webp',
      '/images/western/endorphin_elite2/6.webp'
    ],
    msrpUsd: 275,
    msrpRmb: 1999,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Aggressive High-Toe-Spring Super-Shoe for Fast Forefoot Runners',
    description: "The Saucony Endorphin Elite 2 features Saucony's most responsive PWRRUN HG super-foam paired with a slotted full-length carbon plate. Designed for aggressive forefoot runners seeking maximum turnover and toe-off spring.",
    overallRating: 95,
    useCaseValues: {
      walkingScore: 48,
      walkingAnalysis: 'Aggressive forefoot cutout and rocker feel unnatural for walking.',
      dailyRunScore: 62,
      dailyRunAnalysis: 'Pure race-day weapon reserved for fast efforts.',
      speedWorkoutScore: 96,
      speedWorkoutAnalysis: 'Incredible pop when running fast on midfoot/forefoot.',
      marathonRaceScore: 97,
      marathonRaceAnalysis: 'Top-tier marathon racer with aggressive propulsion.'
    },
    specs: {
      weightGrams: 204,
      weightOz: 7.2,
      heelStackMm: 39.5,
      forefootStackMm: 31.5,
      dropMm: 8,
      foamName: 'PWRRUN HG',
      foamType: 'Supercritical PEBA Foam',
      foamResiliencePercent: 89,
      carbonPlate: 'Full-Length Slotted Carbon Plate',
      carbonStiffnessIndex: 9.5,
      upperMaterial: 'Flat Woven Ultra-Light Mesh',
      breathabilityScore: 9.4,
      outsoleRubber: 'PWRTRAC Rubber',
      wetTractionScore: 8.7,
      estimatedLifespanKm: 450,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'PWRRUN HG foam delivers top-tier 89% energy return',
      'Slotted carbon plate allows natural foot articulation while maintaining stiffness',
      'Lightweight 204g build'
    ],
    consList: [
      'High $275 price tag',
      'Firm ride for heel strikers; rewards forefoot runners'
    ],
    userReviews: [
      {
        id: 'rev_sauc_ee2_1',
        userName: 'Chris B.',
        rating: 5,
        date: '2024-10-02',
        title: 'Explosive forefoot bounce',
        comment: 'If you land midfoot or forefoot, the Endorphin Elite 2 is unbeatable. The PWRRUN HG foam has insane pop.',
        pros: ['Max energy return', 'Lightweight', 'Aggressive rocker'],
        cons: ['Pricey'],
        verifiedDistanceKm: 140,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'saucony_endorphinpro4',
    name: 'Saucony Endorphin Pro 4',
    brand: 'Saucony',
    category: 'Marathon Super-Shoe',
    dominantSector: 'Marathon Race Day',
    image: '/images/western/endorphin_pro4/1.webp',
    galleryImages: [
      '/images/western/endorphin_pro4/1.webp',
      '/images/western/endorphin_pro4/2.webp',
      '/images/western/endorphin_pro4/3.webp',
      '/images/western/endorphin_pro4/4.webp',
      '/images/western/endorphin_pro4/5.webp',
      '/images/western/endorphin_pro4/6.webp'
    ],
    msrpUsd: 225,
    msrpRmb: 1699,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'Smooth, Accessible Super-Shoe with SPEEDROLL Geometry',
    description: 'The Saucony Endorphin Pro 4 features a dual-foam setup combining bouncy PWRRUN HG top foam with durable PWRRUN PB base foam and a full carbon plate. It provides a smooth, accessible super-shoe experience suitable for all foot strike patterns.',
    overallRating: 93,
    useCaseValues: {
      walkingScore: 65,
      walkingAnalysis: 'Fairly comfortable, though carbon plate remains stiff.',
      dailyRunScore: 78,
      dailyRunAnalysis: 'Great for fast long runs and tempo workouts.',
      speedWorkoutScore: 93,
      speedWorkoutAnalysis: 'Smooth SPEEDROLL geometry rolls seamlessly through paces.',
      marathonRaceScore: 94,
      marathonRaceAnalysis: 'Highly reliable, comfortable marathon racer with versatile stability.'
    },
    specs: {
      weightGrams: 212,
      weightOz: 7.5,
      heelStackMm: 39.5,
      forefootStackMm: 31.5,
      dropMm: 8,
      foamName: 'PWRRUN HG + PWRRUN PB',
      foamType: 'Dual-Layer Supercritical PEBA Foam',
      foamResiliencePercent: 87,
      carbonPlate: 'Full Carbon Fiber Plate',
      carbonStiffnessIndex: 9.0,
      upperMaterial: 'Engineered Mesh with Integrated Tongue',
      breathabilityScore: 9.1,
      outsoleRubber: 'Lattice Design PWRTRAC Rubber',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 500,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Dual-foam combination balances explosive bounce with protective comfort',
      'SPEEDROLL geometry provides effortless forward momentum',
      'More accessible $225 price point than $285 competitors'
    ],
    consList: [
      'Slightly heavier than Vaporfly 3 (212g vs 198g)',
      'Outsole pattern holds tiny pebbles on gravel paths'
    ],
    userReviews: [
      {
        id: 'rev_sauc_ep4_1',
        userName: 'Tom S.',
        rating: 5,
        date: '2024-04-14',
        title: 'Smooth as butter at marathon pace',
        comment: 'The dual foam layer makes this shoe much more comfortable over 30km+ than harsh single-foam super shoes.',
        pros: ['Smooth SPEEDROLL ride', 'Dual foam comfort', 'Great price'],
        cons: ['Collects small stones'],
        verifiedDistanceKm: 220,
        helpfulCount: 24
      }
    ]
  },
  {
    id: 'saucony_endorphinspeed4',
    name: 'Saucony Endorphin Speed 4',
    brand: 'Saucony',
    category: 'Tempo & Race',
    dominantSector: 'Tempo & Speed Workouts',
    image: '/images/western/endorphin_speed4/1.webp',
    galleryImages: [
      '/images/western/endorphin_speed4/1.webp',
      '/images/western/endorphin_speed4/2.webp',
      '/images/western/endorphin_speed4/3.webp',
      '/images/western/endorphin_speed4/4.webp',
      '/images/western/endorphin_speed4/5.webp',
      '/images/western/endorphin_speed4/6.webp'
    ],
    msrpUsd: 170,
    msrpRmb: 1299,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'The Gold Standard Nylon-Plated Super-Trainer for Daily Speedwork',
    description: 'The Saucony Endorphin Speed 4 is widely regarded as one of the best running shoes ever made. Featuring full PWRRUN PB super-foam and a flexible re-engineered winged nylon plate, it seamlessly handles daily mileage, tempo workouts, and races.',
    overallRating: 94,
    useCaseValues: {
      walkingScore: 86,
      walkingAnalysis: 'Flexible nylon plate makes it surprisingly comfortable for casual wear.',
      dailyRunScore: 95,
      dailyRunAnalysis: 'Unmatched versatility for easy days, tempo runs, and long distance.',
      speedWorkoutScore: 94,
      speedWorkoutAnalysis: 'Snappy PWRRUN PB foam turns over effortlessly for speed intervals.',
      marathonRaceScore: 89,
      marathonRaceAnalysis: 'Fantastic race-day option for runners who find carbon plates too harsh.'
    },
    specs: {
      weightGrams: 233,
      weightOz: 8.2,
      heelStackMm: 36,
      forefootStackMm: 28,
      dropMm: 8,
      foamName: 'PWRRUN PB Foam',
      foamType: 'Supercritical PEBA Foam',
      foamResiliencePercent: 86,
      carbonPlate: 'Winged Nylon Plate (Flexible)',
      carbonStiffnessIndex: 6.5,
      upperMaterial: 'Zonal Engineered Mesh',
      breathabilityScore: 9.0,
      outsoleRubber: 'Lattice PWRTRAC Rubber',
      wetTractionScore: 8.8,
      estimatedLifespanKm: 700,
      fitWidth: 'Standard (True to Size)',
      archSupport: 'Neutral'
    },
    prosList: [
      'Flexible nylon plate provides snap without joint fatigue',
      'Bouncy PWRRUN PB super-foam is durable and responsive',
      'Incredible versatility—the ultimate one-shoe rotation candidate'
    ],
    consList: [
      'Upper volume is slightly snug around midfoot',
      'Outsole grip is good, though Continental is grippier on wet tile'
    ],
    userReviews: [
      {
        id: 'rev_sauc_es4_1',
        userName: 'Mark D.',
        rating: 5,
        date: '2024-05-30',
        title: 'If I could only own one shoe, this is it',
        comment: 'Endorphin Speed 4 does everything right. Warmups, 5k races, tempo runs, and marathon distance training.',
        pros: ['Ultimate versatility', 'Nylon plate snap', 'Bouncy PWRRUN PB'],
        cons: ['Snug midfoot fit'],
        verifiedDistanceKm: 380,
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'asics_gelkayano31',
    name: 'ASICS GEL-Kayano 31',
    brand: 'ASICS',
    category: 'Max Cushion',
    dominantSector: 'Casual Walking & All-Day Wear',
    image: '/images/western/gel_kayano33/1.webp',
    galleryImages: [
      '/images/western/gel_kayano33/1.webp',
      '/images/western/gel_kayano33/2.webp',
      '/images/western/gel_kayano33/3.webp',
      '/images/western/gel_kayano33/4.webp',
      '/images/western/gel_kayano33/5.webp',
      '/images/western/gel_kayano33/6.webp'
    ],
    msrpUsd: 165,
    msrpRmb: 1290,
    releaseYear: 2024,
    availability: 'Global Shipping',
    tagline: 'The Global Benchmark Max-Cushion Stability Daily Trainer',
    description: 'The ASICS GEL-Kayano 31 is the gold standard for adaptive stability and max cushioning. Featuring FF BLAST™ PLUS ECO foam, rearfoot PureGEL™, and the 4D Guidance System™, it gently guides overpronating runners without harsh medial posts.',
    overallRating: 92,
    useCaseValues: {
      walkingScore: 98,
      walkingAnalysis: 'Best-in-class walking and all-day standing comfort for severe overpronators or neutral runners.',
      dailyRunScore: 94,
      dailyRunAnalysis: 'Plush, stable daily mileage workhorse for recovery days and long slow distance.',
      speedWorkoutScore: 68,
      speedWorkoutAnalysis: 'Heavy stack and soft foam are built for protection rather than speed.',
      marathonRaceScore: 72,
      marathonRaceAnalysis: 'Plush marathon finisher shoe for runners prioritizing joint protection over pace.'
    },
    specs: {
      weightGrams: 303,
      weightOz: 10.7,
      heelStackMm: 40,
      forefootStackMm: 30,
      dropMm: 10,
      foamName: 'FF BLAST™ PLUS ECO + PureGEL™',
      foamType: 'Bio-Based Supercritical EVA + Silicon Gel Insert',
      foamResiliencePercent: 76,
      carbonPlate: '4D Guidance System (Medial Stability)',
      carbonStiffnessIndex: 3.0,
      upperMaterial: 'Engineered Stretch Knit Upper',
      breathabilityScore: 8.7,
      outsoleRubber: 'HYBRID ASICSGRIP™ Rubber',
      wetTractionScore: 9.1,
      estimatedLifespanKm: 900,
      fitWidth: 'Wide Friendly',
      archSupport: 'Stability / Medium'
    },
    prosList: [
      '4D Guidance System offers adaptive stability without stiff medial posts',
      'Plush PureGEL and FF BLAST PLUS ECO absorb impact seamlessly',
      'HYBRID ASICSGRIP outsole provides excellent traction and 900+ km lifespan'
    ],
    consList: [
      'Heavier at 303g',
      'Not designed for fast interval workouts'
    ],
    userReviews: [
      {
        id: 'rev_asics_kay31_1',
        userName: 'Elena G.',
        rating: 5,
        date: '2024-07-22',
        title: 'Saved my knees and feet',
        comment: 'As a flat-footed runner who overpronates, the Kayano 31 provides soft cushioning while keeping my knees aligned during 15km recovery runs.',
        pros: ['Adaptive stability', 'Plush PureGEL', 'Durable ASICSGRIP'],
        cons: ['Slightly heavy'],
        verifiedDistanceKm: 290,
        helpfulCount: 33
      }
    ]
  }
`;

const shoesDataPath = path.join(__dirname, '../src/data/shoesData.ts');
let content = fs.readFileSync(shoesDataPath, 'utf8');

const lastBracketIndex = content.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  content = content.slice(0, lastBracketIndex) + ',\n' + westernShoesTS + '\n];\n';
  fs.writeFileSync(shoesDataPath, content, 'utf8');
  console.log('✅ Successfully appended 11 Western benchmark reference shoes!');
} else {
  console.error('❌ Could not find ]; in shoesData.ts');
}
