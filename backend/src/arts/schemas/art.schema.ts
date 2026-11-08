import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtDocument = Art & Document;

@Schema({ _id: false })
export class LocationInfo {
  @Prop({ default: '' })
  name: string;

  @Prop({ type: Object, default: () => ({ lat: 0, lng: 0 }) })
  coordinates: { lat: number; lng: number };

  @Prop({ default: '' })
  description: string;
}

@Schema({ _id: false })
export class KnowledgeHolder {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  role: string;

  @Prop({ default: '' })
  lineage: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: '' })
  quote: string;
}

@Schema({ _id: false })
export class ContributorInfo {
  @Prop({ default: '' })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: '' })
  affiliation: string;

  @Prop({ default: 'Community Contributor' })
  role: string;

  @Prop({ default: false })
  isAnonymous: boolean;

  @Prop({ default: '' })
  bio: string;
}

@Schema({ _id: false })
export class GalleryItem {
  @Prop({ required: true })
  url: string;

  @Prop({ default: '' })
  caption: string;

  @Prop({ default: '' })
  credit: string;

  @Prop({ default: '' })
  alt: string;
}

@Schema({ _id: false })
export class AudioItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: '' })
  duration: string;

  @Prop({ default: '' })
  performer: string;

  @Prop({ default: '' })
  instrument: string;

  @Prop({ default: '' })
  lyricsSummary: string;
}

@Schema({ _id: false })
export class VideoItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: '' })
  thumbnail: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  duration: string;
}

@Schema({ _id: false })
export class MediaInfo {
  @Prop({ required: true })
  primaryImage: string;

  @Prop({ type: [GalleryItem], default: [] })
  gallery: GalleryItem[];

  @Prop({ type: [AudioItem], default: [] })
  audioTracks: AudioItem[];

  @Prop({ type: [VideoItem], default: [] })
  videos: VideoItem[];
}

@Schema({ _id: false })
export class ConsentSettings {
  @Prop({ default: true })
  given: boolean;

  @Prop({ default: true })
  communityConsent: boolean;

  @Prop({ default: 'Consent granted under cultural preservation and fair attribution principles.' })
  consentStatement: string;

  @Prop({ default: '' })
  culturalPermissionProof: string;

  @Prop({ default: false })
  sensitiveKnowledge: boolean;

  @Prop({ default: true })
  publicAccessAllowed: boolean;
}

@Schema({ collection: 'arts', timestamps: true })
export class Art {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ default: '' })
  nativeTitle: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ required: true, index: true })
  artForm: string;

  @Prop({ required: true, index: true })
  region: string;

  @Prop({ default: 'Kerala', index: true })
  state: string;

  @Prop({ default: '' })
  district: string;

  @Prop({ default: 'Malayalam', index: true })
  language: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  historicalBackground: string;

  @Prop({ default: '' })
  culturalSignificance: string;

  @Prop({ type: LocationInfo, default: () => ({}) })
  location: LocationInfo;

  @Prop({ default: '' })
  originalSource: string;

  @Prop({ default: '' })
  communityOrigin: string;

  @Prop({ type: [KnowledgeHolder], default: [] })
  knowledgeHolders: KnowledgeHolder[];

  @Prop({ type: ContributorInfo, required: true })
  contributor: ContributorInfo;

  @Prop({ type: MediaInfo, required: true })
  media: MediaInfo;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: ConsentSettings, default: () => ({}) })
  consent: ConsentSettings;

  @Prop({
    type: String,
    enum: ['pending_review', 'approved', 'rejected', 'archived'],
    default: 'approved',
    index: true,
  })
  status: string;

  @Prop({ default: '' })
  reviewNotes: string;

  @Prop({ default: false, index: true })
  featured: boolean;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: false })
  isSampleData: boolean;
}

export const ArtSchema = SchemaFactory.createForClass(Art);

ArtSchema.index({
  title: 'text',
  summary: 'text',
  description: 'text',
  region: 'text',
  category: 'text',
  artForm: 'text',
  tags: 'text',
});

