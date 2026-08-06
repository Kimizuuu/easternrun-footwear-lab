export type Brand = 'Li-Ning' | 'Anta' | 'Xtep' | '361°' | 'Qiaodan' | 'Nike' | 'Adidas' | 'Saucony' | 'ASICS' | 'Mizuno' | 'New Balance' | 'HOKA' | 'Brooks' | 'Skechers' | 'Salomon' | 'On Running' | 'Altra' | 'La Sportiva';

export type Category = 
  | 'Marathon Super-Shoe' 
  | 'Daily Trainer' 
  | 'Tempo & Race' 
  | 'Max Cushion';

export type DominantSector = 
  | 'Casual Walking & All-Day Wear'
  | 'Daily Mileage & Training'
  | 'Tempo & Speed Workouts'
  | 'Marathon Race Day';

export interface UseCaseValues {
  walkingScore: number;
  walkingAnalysis?: string;
  dailyRunScore: number;
  dailyRunAnalysis?: string;
  speedWorkoutScore: number;
  speedWorkoutAnalysis?: string;
  marathonRaceScore: number;
  marathonRaceAnalysis?: string;
  longDistanceScore?: number;
  trailScore?: number;
  durabilityScore?: number;
}

export interface ShoeSpecs {
  weightGrams: number;
  weightOz: number;
  heelStackMm: number;
  forefootStackMm: number;
  dropMm: number;
  foamName: string;
  foamType: string;
  foamResiliencePercent: number;
  carbonPlate: string;
  carbonStiffnessIndex: number; // 1 to 10
  upperMaterial: string;
  breathabilityScore: number;
  outsoleRubber: string;
  wetTractionScore: number;
  estimatedLifespanKm: number;
  fitWidth: 'Narrow' | 'Standard (True to Size)' | 'Wide Friendly';
  archSupport: 'Neutral' | 'Stability / Medium';
}

export interface UserReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5 stars
  date: string;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  verifiedDistanceKm: number;
  helpfulCount: number;
}

export interface Shoe {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  dominantSector: DominantSector;
  image: string;
  galleryImages: string[];
  msrpUsd: number;
  msrpRmb: number;
  releaseYear: number;
  availability: 'Global Shipping' | 'Wide Retail' | 'Asia Exclusive';
  tagline: string;
  description: string;
  overallRating: number; // Authentic 0-100 Rating Scale
  useCaseValues: UseCaseValues;
  communityPros?: string[];
  communityCons?: string[];
  specs: ShoeSpecs;
  finalConsensusVerdict: string;
  podiumHighlights?: string[];
  techHighlights?: { title: string; description: string }[];
  userReviews: UserReview[];
}
