'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchArtBySlug, fetchRecommendations, likeArt } from '../../../lib/api';
import { ArtRecord } from '../../../lib/types';
import { CulturalCard } from '../../../components/CulturalCard';
import { OrnamentalDivider, SacredSeal, LotusMotif } from '../../../components/OrnamentalMotif';
import { resolveImageUrl, getDocxSourceUrl } from '../../../lib/image-resolver';
import { useAudio } from '../../../context/AudioContext';
import {
  MapPin,
  Calendar,
  Volume2,
  Video,
  Heart,
  Share2,
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  BookOpen,
  Info,
  Play,
  Pause,
  ExternalLink,
  Award,
  Sparkles,
} from 'lucide-react';

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [art, setArt] = useState<ArtRecord | null>(null);
  const [recommendations, setRecommendations] = useState<ArtRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Gallery modal
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchArtBySlug(slug)
      .then((data) => {
        setArt(data);
        setLikesCount(data.likes || 0);
        return fetchRecommendations(slug);
      })
      .then(setRecommendations)
      .catch((err) => {
        console.error('Failed to load story:', err);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleLike = async () => {
    if (!art || hasLiked) return;
    try {
      const res = await likeArt(art._id);
      setLikesCount(res.likes);
      setHasLiked(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-terracotta-600 border-t-transparent animate-spin mx-auto" />
        <p className="font-serif text-sm text-earth-700 italic">
          Unfolding sacred chronicle from the living archive...
        </p>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-earth-900">
          Cultural Record Not Found
        </h2>
        <p className="font-serif text-sm text-earth-600">
          The requested chronicle may have been moved or is currently undergoing curator review.
        </p>
        <Link
          href="/explore"
          className="inline-block px-5 py-2.5 bg-terracotta-600 text-white rounded text-xs uppercase tracking-wider font-serif font-semibold"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 space-y-16">
      {/* 1. EDITORIAL HERO & BREADCRUMB */}
      <section className="bg-parchment-100 border-b border-parchment-300 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between text-xs font-serif text-earth-600">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 hover:text-terracotta-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Archive</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${
                  hasLiked
                    ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700'
                    : 'border-parchment-300 hover:border-terracotta-500 text-earth-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-terracotta-600 text-terracotta-600' : ''}`} />
                <span>{likesCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-parchment-300 hover:border-earth-700 text-earth-700 transition-all text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Metadata Ribbon */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-serif">
            <span className="bg-terracotta-600 text-white px-3 py-1 rounded text-[11px] uppercase tracking-wider font-semibold">
              {art.category}
            </span>
            <span className="bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-1 rounded font-mono text-[11px]">
              {art.artForm}
            </span>
            <span className="text-earth-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
              {art.region}{art.district ? `, ${art.district}` : ''}
            </span>
            {art.language && (
              <span className="text-earth-600">
                • Language: <strong>{art.language}</strong>
              </span>
            )}
          </div>

          {/* Headings */}
          <div className="space-y-3">
            {art.nativeTitle && (
              <div className="font-serif text-2xl sm:text-3xl text-terracotta-700 font-semibold tracking-wide">
                {art.nativeTitle}
              </div>
            )}
            <h1 className="font-display text-3xl sm:text-5xl text-earth-900 font-bold leading-tight">
              {art.title}
            </h1>
          </div>

          {/* Lead Summary */}
          <p className="font-serif text-base sm:text-xl text-earth-800 leading-relaxed max-w-4xl italic">
            "{art.summary}"
          </p>

          {/* Lineage & Attribution Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-parchment-200 text-xs text-earth-600 font-serif">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-earth-800">Community Custodians:</span>
              <span>{art.communityOrigin || 'Hereditary Artisan Guild'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-brass-dark">
              <ShieldCheck className="w-4 h-4 text-turmeric-600" />
              <span>Explicit Cultural Consent Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CINEMATIC PHOTOGRAPHY & MEDIA PLAYERS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main High-Res Photograph */}
        <div className="relative aspect-[16/9] rounded overflow-hidden shadow-heritage-lg border border-parchment-300 bg-earth-900">
          <Image
            src={resolveImageUrl(art.media?.primaryImage, art.slug || art.title)}
            alt={art.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Archival Photography Caption Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-serif text-earth-600 bg-parchment-100 p-4 rounded border border-parchment-300 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-turmeric-600" />
            <span className="font-semibold text-earth-800">Archival Visual Documentation:</span>
            <span>{art.title}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-earth-500">
            <span>Source: {art.originalSource || 'Community Heritage Archives'}</span>
            {getDocxSourceUrl(art.slug || art.title) && (
              <a
                href={getDocxSourceUrl(art.slug || art.title)!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta-700 hover:underline flex items-center gap-1 font-serif font-semibold"
              >
                <span>Curator Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL STORY, HISTORY & CULTURAL MEANING */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Comprehensive Description with Dropcap */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl text-earth-900 font-bold border-b border-parchment-300 pb-2">
            The Living Narrative
          </h2>
          <div className="font-serif text-base sm:text-lg text-earth-800 leading-relaxed whitespace-pre-line dropcap">
            {art.description}
          </div>
        </div>

        {/* Historical Background */}
        {art.historicalBackground && (
          <div className="space-y-4 bg-parchment-50 p-6 sm:p-8 rounded border border-parchment-300 shadow-heritage">
            <div className="flex items-center gap-2 text-terracotta-600">
              <Calendar className="w-5 h-5" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-earth-900">
                Historical Chronicles & Origin
              </h3>
            </div>
            <p className="font-serif text-sm sm:text-base text-earth-700 leading-relaxed whitespace-pre-line">
              {art.historicalBackground}
            </p>
          </div>
        )}

        {/* Archival Photography Gallery */}
        {art.media?.gallery && art.media.gallery.length > 0 && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-parchment-300 pb-2">
              <h3 className="font-display text-2xl text-earth-900 font-bold">
                Archival Visual Documentation
              </h3>
              <span className="text-xs font-serif text-earth-500">
                {art.media.gallery.length} Archival Photographs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {art.media.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-parchment-50 rounded border border-parchment-300 overflow-hidden shadow-heritage group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-earth-900">
                    <Image
                      src={resolveImageUrl(item.url, art.slug || art.title)}
                      alt={item.alt || item.caption || art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {(item.caption || item.credit) && (
                    <div className="p-4 space-y-1 text-xs font-serif">
                      {item.caption && (
                        <p className="text-earth-800 leading-relaxed italic">
                          "{item.caption}"
                        </p>
                      )}
                      {item.credit && (
                        <p className="text-[10px] text-earth-500 font-mono pt-1">
                          Source Credit: {item.credit}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Significance & Social Meaning */}
        {art.culturalSignificance && (
          <div className="space-y-4 bg-parchment-50 p-6 sm:p-8 rounded border border-parchment-300 shadow-heritage">
            <div className="flex items-center gap-2 text-turmeric-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-earth-900">
                Sacred & Cultural Significance
              </h3>
            </div>
            <p className="font-serif text-sm sm:text-base text-earth-700 leading-relaxed whitespace-pre-line">
              {art.culturalSignificance}
            </p>
          </div>
        )}

        {/* Knowledge Holders & Living Gurus */}
        {art.knowledgeHolders && art.knowledgeHolders.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="font-display text-2xl text-earth-900 font-bold border-b border-parchment-300 pb-2">
              Living Knowledge Holders & Elders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {art.knowledgeHolders.map((holder, idx) => (
                <div
                  key={idx}
                  className="bg-parchment-100 p-6 rounded border border-parchment-300 space-y-3 relative"
                >
                  <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-terracotta-700 font-semibold">
                    <Award className="w-4 h-4" />
                    <span>{holder.role || 'Master Custodian'}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-earth-900">
                    {holder.name}
                  </h4>
                  {holder.lineage && (
                    <p className="text-xs font-serif text-earth-600">
                      Lineage: {holder.lineage}
                    </p>
                  )}
                  {holder.location && (
                    <p className="text-xs font-serif text-earth-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                      {holder.location}
                    </p>
                  )}
                  {holder.quote && (
                    <blockquote className="text-xs font-serif italic text-earth-800 border-l-2 border-brass-DEFAULT pl-3 pt-1">
                      "{holder.quote}"
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Geographic Sanctuary & Source Attribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {art.location && (
            <div className="bg-parchment-50 p-5 rounded border border-parchment-300 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-earth-700 font-semibold">
                <MapPin className="w-4 h-4 text-terracotta-600" />
                <span>Geographic Heritage</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-earth-900">
                {art.location.name || art.region}
              </h4>
              <p className="text-xs font-serif text-earth-600">
                {art.location.description || `${art.region}, ${art.state || 'India'}`}
              </p>
            </div>
          )}

          {art.originalSource && (
            <div className="bg-parchment-50 p-5 rounded border border-parchment-300 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-earth-700 font-semibold">
                <BookOpen className="w-4 h-4 text-turmeric-600" />
                <span>Original Archival Source</span>
              </div>
              <p className="text-xs font-serif text-earth-800 italic leading-relaxed">
                {art.originalSource}
              </p>
            </div>
          )}
        </div>

        {/* Contributor Attribution Card & Consent Badge */}
        <div className="bg-parchment-100 p-6 sm:p-8 rounded border-2 border-brass-DEFAULT/60 shadow-heritage space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-parchment-300 border border-brass-DEFAULT flex items-center justify-center font-bold text-earth-800 font-serif text-lg">
                {art.contributor?.name ? art.contributor.name.charAt(0) : 'A'}
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-terracotta-700 font-semibold">
                  Field Contributor & Ethnographer
                </span>
                <h4 className="font-serif text-lg font-bold text-earth-900">
                  {art.contributor?.name || 'Anonymous Custodian'}
                </h4>
                {art.contributor?.affiliation && (
                  <p className="text-xs font-serif text-earth-600">
                    {art.contributor.affiliation}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-xs font-serif text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consent Protocol Verified</span>
              </span>
            </div>
          </div>

          {art.contributor?.bio && (
            <p className="text-xs font-serif text-earth-700 border-t border-parchment-200 pt-3">
              {art.contributor.bio}
            </p>
          )}

          {art.consent && (
            <div className="bg-parchment-50 p-4 rounded border border-parchment-300 text-xs font-serif space-y-1.5 text-earth-700">
              <div className="font-semibold text-earth-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-terracotta-600" />
                Community Consent Declaration:
              </div>
              <p className="italic">
                "{art.consent.consentStatement || 'Authorized for cultural preservation, education, and research with community consent.'}"
              </p>
              {art.consent.culturalPermissionProof && (
                <div className="text-[11px] text-earth-500 font-mono pt-1">
                  Reference: {art.consent.culturalPermissionProof}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. RELATED CULTURAL RECORD RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-parchment-300 space-y-8">
          <div className="text-center space-y-2">
            <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
              Deepen Your Journey
            </span>
            <h2 className="font-display text-3xl text-earth-900 font-bold">
              Related Living Traditions
            </h2>
            <p className="font-serif text-xs sm:text-sm text-earth-600">
              Other documented traditions sharing similar regional roots, ritual forms, or artisanal mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((rec) => (
              <CulturalCard key={rec._id} art={rec} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

