export type ViewType =
  | 'discover'
  | 'map'
  | 'creators'
  | 'about'
  | 'artisan-profile'
  | 'buyer-profile'
  | 'artisan-register';

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  date: string;
  rating: number;
  text: string;
  verifiedGps: string;
  photoUrl?: string;
}

export interface Artisan {
  id: string;
  name: string;
  craftTitle: string;
  shortBio: string;
  fullBio: string;
  category: 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora';
  district: string;
  state: string;
  locationName: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  trustScore: number;
  trustRating: number;
  verifiedVisits: number;
  contributionsCount: number;
  avatarUrl: string;
  heroImageUrl: string;
  postcardImageUrl: string;
  artForm: string;
  artDescription: string;
  tags: string[];
  gallery: {
    id: string;
    url: string;
    caption: string;
    author: string;
    span?: string;
  }[];
  reviews: Review[];
  contactInfo?: {
    phone?: string;
    cooperative?: string;
    address?: string;
  };
  registrationType?: 'self' | 'contributor';
  contributorInfo?: {
    contributorName?: string;
    organization?: string;
    contact?: string;
    relationship?: string;
    scoutNotes?: string;
  };
}

export interface EncyclopediaEntry {
  id: string;
  title: string;
  category: string;
  region: string;
  description: string;
  historicalContext: string;
  materialsUsed: string[];
  culturalSignificance: string;
  imageUrl: string;
  botanicalClassification?: string;
  ecologicalHabitat?: string;
  traditionalUse?: string;
}

export interface DistrictKnowledge {
  districtKey: string;
  districtName: string;
  state: string;
  primaryArtForm: string;
  heroImage: string;
  heroCaption: string;
  history: string;
  culturalSignificance: string;
  indigenousMaterials: string[];
  subForms: {
    name: string;
    summary: string;
    imageUrl?: string;
  }[];
}

export interface LocalEvent {
  id: string;
  name: string;
  category: 'Tribal Craft Mela' | 'Agrarian Haat' | 'Botanical Fair' | 'Heritage Festival';
  district: string;
  state: string;
  venue: string;
  dates: string;
  time?: string;
  description: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  featuredCrafts: string[];
  organizer: string;
  expectedArtisans?: number;
  expectedVisitors?: string;
  status: 'Happening Now' | 'This Weekend' | 'Upcoming' | 'Live Haat';
  reportedBy?: string;
  pointsReward?: number;
  isVerified?: boolean;
  bannerImage?: string;
}


