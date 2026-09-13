export type NepalRegion = 'Kathmandu Valley' | 'Annapurna' | 'Everest' | 'Chitwan' | 'Mustang' | 'Pokhara' | 'Lumbini' | 'Langtang' | 'Eastern Nepal' | 'Western Nepal';

export type TourCategory = 
  | 'Trekking' 
  | 'Cultural & Heritage' 
  | 'Wildlife & Safari' 
  | 'Honeymoon' 
  | 'Adventure' 
  | 'Helicopter & Flight' 
  | 'Pilgrimage & Sacred'
  | 'Family Tours';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Demanding' | 'Challenging' | 'Strenuous';

export type NepalSeason = 'Spring' | 'Autumn' | 'Winter' | 'Monsoon' | 'Year-round';

export interface ItineraryDay {
  day: number;
  title: string;
  route?: string;
  activities: string;
  transportation?: string;
  accommodation?: string;
  meals?: string;
  altitude?: string;
  highlights?: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  slug: string;
  category: TourCategory;
  destinations: string[];
  region: NepalRegion;
  durationDays: number;
  durationNights: number;
  priceNpr: number;
  discountPercent?: number;
  priceType: 'per person' | 'per group';
  groupSize: string;
  pickupLocation: string;
  dropoffLocation: string;
  transportation: string;
  accommodation: string;
  bestSeason: string;
  difficulty: DifficultyLevel;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  whatToPack: string[];
  foodInfo: string;
  accommodationInfo: string;
  electricityWifiInfo: string;
  guideInfo: string;
  safetyInfo: string;
  familySuitability: string;
  tippingInfo: string;
  heroImage: string;
  gallery: string[];
  startingPoint: string;
  endingPoint: string;
  suitableFor: string[];
  isSpecialDeal?: boolean;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  destinationType: 'City' | 'Mountain Region' | 'Trekking' | 'National Park' | 'Cultural' | 'Religious' | 'Heritage' | 'Lake & Adventure' | 'Viewpoint';
  district: string;
  province: string;
  region: NepalRegion;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  bestTime: string;
  recommendedDuration: string;
  estimatedCostNpr: number;
  attractions: string[];
  activities: string[];
  transportation: string;
  nearbyDestinations: string[];
  featured: boolean;
  tourCount: number;
  heroImage: string;
  gallery: string[];
  altitude?: string;
}

export interface Attraction {
  id: string;
  name: string;
  slug: string;
  location: string;
  district: string;
  province: string;
  attractionType: 'Temple / Stupa' | 'UNESCO Heritage' | 'Viewpoint' | 'Lake' | 'National Park' | 'Monastery' | 'Mountain Base' | 'Historic Square';
  shortIntro: string;
  description: string;
  recommendedDuration: string;
  bestTimeToVisit: string;
  estimatedCostNpr: string;
  highlights: string[];
  thingsToDo: string[];
  howToReach: string;
  transportation: string;
  travelTips: string[];
  image: string;
  gallery: string[];
  relatedTours: string[];
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp: string;
  travelersCount: number;
  travelDate: string;
  isFlexibleDate: boolean;
  tourId: string;
  tourName: string;
  pickupLocation: string;
  specialRequirements: string;
  status: 'New' | 'Contacted' | 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  adminNotes?: string;
  estimatedTotalNpr?: number;
  userId?: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  officeAddress: string;
  city: string;
  district: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  businessHours: string;
  timezone: string;
  defaultCurrency: string;
  currencySymbol: string;
  countryCode: string;
  aboutText: string;
  emergencyContact: string;
  tourismBoardLicense: string;
  taanMemberNo: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  isAdmin?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  tourName: string;
  date: string;
  comment: string;
  origin?: 'nepali' | 'international';
  verified?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
}
