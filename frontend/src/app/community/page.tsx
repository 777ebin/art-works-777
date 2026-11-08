'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchContributors, fetchArts } from '../../lib/api';
import { UserProfile, ArtRecord } from '../../lib/types';
import { OrnamentalDivider, SacredSeal, LotusMotif } from '../../components/OrnamentalMotif';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Award,
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function CommunityPage() {
  const { openAuthModal } = useAuth();
  const [contributors, setContributors] = useState<UserProfile[]>([]);
  const [arts, setArts] = useState<ArtRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunity() {
      try {
        const [contribRes, artsRes] = await Promise.all([
          fetchContributors().catch(() => []),
          fetchArts({ limit: 50 }).catch(() => ({ items: [] })),
        ]);
        setContributors(contribRes);
        setArts(artsRes.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCommunity();
  }, []);

  // Extract distinct knowledge holders mentioned across the cultural records
  const allKnowledgeHolders = arts.flatMap((a) =>
    (a.knowledgeHolders || []).map((kh) => ({
      ...kh,
      traditionTitle: a.title,
      traditionSlug: a.slug,
      region: a.region,
    })),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <SacredSeal />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-earth-900 font-bold">
          The Custodians & Knowledge Guardians
        </h1>
        <p className="font-serif text-sm sm:text-base text-earth-700 leading-relaxed">
          Living traditions survive not in stone, but in the living breath of master performers,
          artisan clans, ballad singers, and village elders. We honor their custodianship while
          safeguarding their cultural ownership and privacy.
        </p>
      </div>

      <OrnamentalDivider />

      {/* 1. LIVING MASTERS & ELDERS SHOWCASE */}
      <section className="space-y-8">
        <div className="space-y-1">
          <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Living Voices of the Heritage
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-earth-900 font-bold">
            Hereditary Knowledge Holders & Elders
          </h2>
          <p className="font-serif text-xs sm:text-sm text-earth-600">
            Masters whose hereditary lineages and lifelong dedication keep these ancient practices alive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allKnowledgeHolders.slice(0, 6).map((kh, idx) => (
            <div
              key={idx}
              className="bg-parchment-50 p-6 rounded border border-parchment-300 shadow-heritage hover:border-brass-DEFAULT transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-serif">
                  <span className="text-[10px] uppercase tracking-wider font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    {kh.role || 'Elder Custodian'}
                  </span>
                  <span className="text-earth-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-terracotta-600" />
                    {kh.location || kh.region}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-earth-900 leading-snug">
                  {kh.name}
                </h3>

                {kh.lineage && (
                  <p className="text-xs font-serif text-terracotta-700 font-medium">
                    Lineage: {kh.lineage}
                  </p>
                )}

                {kh.quote && (
                  <blockquote className="text-xs font-serif italic text-earth-700 bg-parchment-100/80 p-3 rounded border-l-2 border-brass-DEFAULT">
                    "{kh.quote}"
                  </blockquote>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-parchment-200 flex items-center justify-between text-xs font-serif">
                <span className="text-earth-600 truncate max-w-[180px]">
                  {kh.traditionTitle}
                </span>
                <Link
                  href={`/story/${kh.traditionSlug}`}
                  className="text-terracotta-700 hover:text-terracotta-800 font-semibold"
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CULTURAL ETHNOGRAPHERS & FIELD CONTRIBUTORS */}
      <section className="space-y-8 pt-4">
        <div className="space-y-1">
          <span className="font-serif text-xs uppercase tracking-widest text-turmeric-700 font-semibold">
            Community Collaborators
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-earth-900 font-bold">
            Field Researchers, Archivists & Contributors
          </h2>
          <p className="font-serif text-xs sm:text-sm text-earth-600">
            Documentarians working in partnership with local communities to record and preserve oral histories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((c) => (
            <div
              key={c._id}
              className="bg-parchment-100 p-5 rounded border border-parchment-300 shadow-sm text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full mx-auto overflow-hidden bg-parchment-300 border-2 border-brass-DEFAULT relative shadow-inner">
                {c.avatarUrl ? (
                  <Image src={c.avatarUrl} alt={c.fullName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold font-serif text-earth-800 text-xl">
                    {c.fullName.charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-earth-900">
                  {c.fullName}
                </h4>
                <div className="text-[11px] font-serif uppercase tracking-wider text-terracotta-700 font-semibold">
                  {c.role.replace('_', ' ')}
                </div>
              </div>

              {c.affiliation && (
                <p className="text-xs font-serif text-earth-600 line-clamp-2">
                  {c.affiliation}
                </p>
              )}

              {c.bio && (
                <p className="text-[11px] font-serif italic text-earth-500 line-clamp-2 border-t border-parchment-200 pt-2">
                  "{c.bio}"
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMMUNITY PRESERVATION CHARTER & PRIVACY SAFEGUARDS */}
      <section className="bg-earth-900 text-parchment-100 rounded-lg p-8 sm:p-12 border-2 border-brass-DEFAULT shadow-heritage-lg space-y-6">
        <div className="flex items-center gap-2 text-brass-light font-serif text-xs uppercase tracking-widest font-semibold">
          <ShieldCheck className="w-4 h-4 text-turmeric-400" />
          <span>Community Privacy & Sovereignty Charter</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
          How We Protect Knowledge Holders & Their Intellectual Ownership
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs font-serif text-parchment-300">
          <div className="space-y-2 bg-earth-800/80 p-5 rounded border border-earth-700">
            <h4 className="font-bold text-sm text-ivory flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-turmeric-400" />
              Perpetual Community Ownership
            </h4>
            <p className="leading-relaxed">
              Communities retain perpetual moral and intellectual rights. Living Heritage acts only as
              a custodian, not a proprietor. No commercial licensing is ever permitted.
            </p>
          </div>

          <div className="space-y-2 bg-earth-800/80 p-5 rounded border border-earth-700">
            <h4 className="font-bold text-sm text-ivory flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-turmeric-400" />
              Right to Withdraw & Redact
            </h4>
            <p className="leading-relaxed">
              Knowledge holders have the absolute right to correct, restrict access to, or withdraw
              any sensitive knowledge at any time upon communication with the curator board.
            </p>
          </div>

          <div className="space-y-2 bg-earth-800/80 p-5 rounded border border-earth-700">
            <h4 className="font-bold text-sm text-ivory flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-turmeric-400" />
              Anonymity & Sacred Protection
            </h4>
            <p className="leading-relaxed">
              Elders who wish to share oral genealogies without personal identification may do so
              under anonymous guild attribution to protect sacred communal privacy.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={openAuthModal}
            className="px-6 py-3 bg-turmeric-600 hover:bg-turmeric-700 text-earth-950 rounded font-serif uppercase tracking-widest text-xs font-bold transition-all shadow-heritage"
          >
            Join as a Community Knowledge Custodian
          </button>
        </div>
      </section>
    </div>
  );
}

