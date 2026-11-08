import { IsString, IsNotEmpty, IsOptional, IsArray, IsObject, IsBoolean } from 'class-validator';

export class CreateArtDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  nativeTitle?: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  artForm: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  historicalBackground?: string;

  @IsString()
  @IsOptional()
  culturalSignificance?: string;

  @IsObject()
  @IsOptional()
  location?: {
    name?: string;
    coordinates?: { lat: number; lng: number };
    description?: string;
  };

  @IsString()
  @IsOptional()
  originalSource?: string;

  @IsString()
  @IsOptional()
  communityOrigin?: string;

  @IsArray()
  @IsOptional()
  knowledgeHolders?: Array<{
    name: string;
    role?: string;
    lineage?: string;
    location?: string;
    quote?: string;
  }>;

  @IsObject()
  @IsNotEmpty()
  contributor: {
    userId?: string;
    name: string;
    email?: string;
    affiliation?: string;
    role?: string;
    isAnonymous?: boolean;
    bio?: string;
  };

  @IsObject()
  @IsNotEmpty()
  media: {
    primaryImage: string;
    gallery?: Array<{ url: string; caption?: string; credit?: string; alt?: string }>;
    audioTracks?: Array<{
      title: string;
      url: string;
      duration?: string;
      performer?: string;
      instrument?: string;
      lyricsSummary?: string;
    }>;
    videos?: Array<{
      title: string;
      url: string;
      thumbnail?: string;
      description?: string;
      duration?: string;
    }>;
  };

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsObject()
  @IsOptional()
  consent?: {
    given: boolean;
    communityConsent: boolean;
    consentStatement?: string;
    culturalPermissionProof?: string;
    sensitiveKnowledge?: boolean;
    publicAccessAllowed?: boolean;
  };

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

