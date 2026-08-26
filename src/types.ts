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
