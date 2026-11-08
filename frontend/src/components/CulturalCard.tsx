'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArtRecord } from '../lib/types';
import { resolveImageUrl } from '../lib/image-resolver';
import { MapPin, Volume2, Video, Eye, Heart, ShieldCheck } from 'lucide-react';

interface CulturalCardProps {
  art: ArtRecord;
  priority?: boolean;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({ art, priority = false }) => {
  const hasAudio = art.media?.audioTracks && art.media.audioTracks.length > 0;
  const hasVideo = art.media?.videos && art.media.videos.length > 0;
  const displayImage = resolveImageUrl(art.media?.primaryImage, art.slug || art.title);

  return (
    <article className="group bg-parchment-50 border border-parchment-300 rounded-sm overflow-hidden shadow-heritage hover:shadow-heritage-lg hover:border-brass-DEFAULT transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cinematic Photograph Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-earth-900">
          <Image
            src={displayImage}
            alt={art.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
          />

          {/* Gradient shadow for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-black/20 pointer-events-none" />

          {/* Top Badges: Category & Region */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-serif">
            <span className="bg-earth-900/80 backdrop-blur-sm text-parchment-100 px-2.5 py-1 rounded border border-brass-DEFAULT/40 tracking-wider uppercase text-[10px]">
              {art.category}
            </span>
            <div className="flex items-center gap-1.5">
              {hasAudio && (
                <span className="bg-turmeric-700/90 text-white p-1 rounded-full shadow-sm" title="Audio recording available">
                  <Volume2 className="w-3 h-3" />
                </span>
              )}
              {hasVideo && (
                <span className="bg-terracotta-700/90 text-white p-1 rounded-full shadow-sm" title="Video documentation available">
                  <Video className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          {/* Bottom Native Title & Region Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-parchment-100 flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-xs text-brass-light">
              <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
              <span>{art.region}{art.district ? `, ${art.district}` : ''}</span>
            </div>
            {art.nativeTitle && (
              <span className="font-serif text-sm tracking-wide text-amber-200/90 bg-black/40 px-2 py-0.5 rounded">
                {art.nativeTitle}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-terracotta-700 font-semibold">
            {art.artForm}
          </div>

          <h3 className="font-serif text-xl text-earth-900 font-bold leading-snug group-hover:text-terracotta-600 transition-colors">
            <Link href={`/story/${art.slug}`}>
              {art.title}
            </Link>
          </h3>

          <p className="text-xs text-earth-700 leading-relaxed line-clamp-3 font-serif">
            {art.summary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 bg-parchment-100/70 border-t border-parchment-200 flex items-center justify-between text-xs text-earth-600">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-parchment-300 text-earth-800 text-[10px] flex items-center justify-center font-bold">
            {art.contributor?.name ? art.contributor.name.charAt(0) : 'K'}
          </span>
          <span className="text-[11px] truncate max-w-[120px] font-serif">
            {art.contributor?.name || 'Oral Lineage'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-earth-500">
            <Eye className="w-3 h-3" />
            {art.views || 0}
          </span>
          <Link
            href={`/story/${art.slug}`}
            className="text-terracotta-700 hover:text-terracotta-800 font-serif font-semibold tracking-wide flex items-center gap-0.5"
          >
            Explore →
          </Link>
        </div>
      </div>
    </article>
  );
};

