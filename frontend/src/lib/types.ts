export interface LocationInfo {
  name?: string;
  coordinates?: { lat: number; lng: number };
  description?: string;
}

export interface KnowledgeHolder {
  name: string;
  role?: string;
  lineage?: string;
  location?: string;
  quote?: string;
}

export interface ContributorInfo {
  userId?: string;
  name: string;
  email?: string;
  affiliation?: string;
  role?: string;
  isAnonymous?: boolean;
  bio?: string;
}

export interface GalleryItem {
  url: string;
  caption?: string;
  credit?: string;
  alt?: string;
}

export interface AudioItem {
  title: string;
  url: string;
  duration?: string;
  performer?: string;
  instrument?: string;
  lyricsSummary?: string;
}

export interface VideoItem {
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
  duration?: string;
}

export interface MediaInfo {
  primaryImage: string;
  gallery?: GalleryItem[];
  audioTracks?: AudioItem[];
  videos?: VideoItem[];
}

export interface ConsentSettings {
  given: boolean;
  communityConsent: boolean;
  consentStatement?: string;
  culturalPermissionProof?: string;
  sensitiveKnowledge?: boolean;
  publicAccessAllowed?: boolean;
}

export interface ArtRecord {
  _id: string;
  title: string;
  nativeTitle?: string;
  slug: string;
  category: string;
  artForm: string;
  region: string;
  state?: string;
  district?: string;
  language?: string;
  summary: string;
  description: string;
  historicalBackground?: string;
  culturalSignificance?: string;
  location?: LocationInfo;
  originalSource?: string;
  communityOrigin?: string;
  knowledgeHolders?: KnowledgeHolder[];
  contributor: ContributorInfo;
  media: MediaInfo;
  tags?: string[];
  consent?: ConsentSettings;
  status: 'pending_review' | 'approved' | 'rejected' | 'archived';
  reviewNotes?: string;
  featured?: boolean;
  views: number;
  likes: number;
  isSampleData?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'curator' | 'contributor' | 'knowledge_holder' | 'visitor';
  affiliation?: string;
  communityOrLineage?: string;
  bio?: string;
  avatarUrl?: string;
}

