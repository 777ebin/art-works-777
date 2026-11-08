'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchArts, fetchFeatured, fetchStats } from '../lib/api';
import { ArtRecord } from '../lib/types';
import { CulturalCard } from '../components/CulturalCard';
import { LotusMotif, OrnamentalDivider, SacredSeal } from '../components/OrnamentalMotif';
import { useAudio } from '../context/AudioContext';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Music,
  MapPin,
  Play,
  Pause,
  Layers,
  HeartHandshake,
} from 'lucide-react';

export default function HomePage() {
  const [featuredArts, setFeaturedArts] = useState<ArtRecord[]>([]);
  const [popularArts, setPopularArts] = useState<ArtRecord[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [featuredRes, popularRes, statsRes] = await Promise.all([
          fetchFeatured(),
          fetchArts({ sortBy: 'views', limit: 6 }),
          fetchStats().catch(() => null),
        ]);
        setFeaturedArts(featuredRes);
        setPopularArts(popularRes.items);
        setStats(statsRes);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-parchment-300">
        {/* Subtle decorative texture */}
        <div className="absolute inset-0 bg-jali opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2">
              <SacredSeal />
            </div>

            <div className="space-y-2">
              <p className="font-serif italic text-base md:text-lg text-terracotta-700 tracking-wide">
                The Living Sanctuary of South Asian Heritage
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-earth-900 font-bold tracking-tight leading-[1.12]">
                Every Tradition Has a Story.{' '}
                <span className="italic font-serif text-terracotta-600 block mt-2 font-normal">
                  Every Story Deserves to Live.
                </span>
              </h1>
            </div>

            <p className="font-serif text-base sm:text-lg text-earth-700 leading-relaxed max-w-2xl dropcap">
              From the sacred flame dances of Theyyam in North Malabar to the ancient metallurgical
              secrets of Aranmula mirrors, explore an authentic digital sanctuary preserving
              traditional lore, folk ballads, ritual theatre, and indigenous wisdom with explicit
              community consent and attribution.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded font-serif uppercase tracking-widest text-xs font-semibold shadow-heritage-lg hover:translate-y-[-1px] transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore the Archive</span>
              </Link>

              <Link
                href="/contribute"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-parchment-50 border border-earth-700 hover:bg-earth-900 hover:text-white text-earth-900 rounded font-serif uppercase tracking-widest text-xs font-medium transition-all"
              >
                <span>Submit Tradition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-parchment-300/80 max-w-lg">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-terracotta-700">
                  {stats?.total || 11}+
                </div>
                <div className="text-[11px] font-serif text-earth-600 uppercase tracking-wider mt-0.5">
                  Documented Traditions
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-turmeric-600">
                  100%
                </div>
                <div className="text-[11px] font-serif text-earth-600 uppercase tracking-wider mt-0.5">
                  Community Consent
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-earth-800">
                  4,500+
                </div>
                <div className="text-[11px] font-serif text-earth-600 uppercase tracking-wider mt-0.5">
                  Archive Explorations
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Cinematic Editorial Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Large Cinematic Frame */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-heritage-lg border-2 border-parchment-300 p-2 bg-parchment-100">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="https://i.pinimg.com/736x/a6/33/89/a6338943bca2273f9383316aa27bf90e.jpg"
                  alt="Theyyam Performer in Sacred Red Headdress"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-parchment-100">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-brass-light mb-1">
                    Featured Tradition • Kannur, Kerala
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ivory">
                    Theyyam: The Living Gods of Malabar
                  </h3>
                  <p className="text-xs text-parchment-300 font-serif line-clamp-2 mt-1">
                    An ancient ritualistic art form where mortal performers embody living ancestral
                    deities amidst sacred groves and midnight bonfires.
                  </p>
                  <Link
                    href="/story/theyyam-living-gods-malabar"
                    className="inline-flex items-center gap-1.5 text-xs text-turmeric-400 font-serif font-semibold mt-3 hover:underline"
                  >
                    Read Full Chronicle & Sacred History →
                  </Link>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Inset: Metallurgy Craft */}
            <div className="hidden sm:block absolute -bottom-8 -left-10 w-52 aspect-[4/3] rounded border-2 border-brass-DEFAULT bg-parchment-100 p-1.5 shadow-2xl">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="https://aranmulakannadi.net/cdn/shop/files/Aranmulakannadi-AM12614WR-02_1024x1024.png"
                  alt="Aranmula Metal Mirror"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-serif leading-tight">
                  <span className="font-bold block text-amber-200">Aranmula Mirror</span>
                  Front-surface metallurgy
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CULTURAL CATEGORIES MOSAIC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="font-serif italic text-xs tracking-widest uppercase text-terracotta-600 font-semibold">
            Preservation Domains
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-earth-900 font-bold">
            Explore Cultural Realms
          </h2>
          <p className="font-serif text-sm text-earth-700">
            Categorized by indigenous lineage, performative tradition, oral memory, and sacred craft.
          </p>
        </div>

        <OrnamentalDivider />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[
            {
              title: 'Ritual Arts & Performances',
              subtitle: 'Shamanic incarnate rites, sacred groves & temple dances',
              traditions: 'Theyyam, Ottanthullal, Kathakali, Pulikali',
              image: 'https://i.pinimg.com/736x/0c/bc/0b/0cbc0b44b21a41f4828e2d3c727011f6.jpg',
              query: 'Ritual Arts & Performances',
            },
            {
              title: 'Indigenous Crafts & Metallurgy',
              subtitle: 'Sacred bronze alloys, temple joinery & mineral frescoes',
              traditions: 'Aranmula Kannadi, Nettur Petti, Kerala Murals',
              image: 'https://aranmulakannadi.net/cdn/shop/files/Aranmulakannadi-AM12614WR-02_1024x1024.png',
              query: 'Indigenous Crafts & Textiles',
            },
            {
              title: 'Folk Songs & Oral Epics',
              subtitle: 'Ballads of medieval warriors, harvest songs & percussion',
              traditions: 'Vadakkan Pattukal, Chendamelam',
              image: 'https://i.pinimg.com/736x/1d/4b/37/1d4b37085da7386d19777292eee7e304.jpg',
              query: 'Folk Songs & Music',
            },
            {
              title: 'Martial & Movement Traditions',
              subtitle: 'Ancient combat science, vital marma points & animal forms',
              traditions: 'Kalaripayattu, Urumi, Kalari Chikitsa',
              image: 'https://i.pinimg.com/736x/ad/a8/87/ada887b1e8fe83be1ea6fa7dff8288d7.jpg',
              query: 'Martial & Movement Traditions',
            },
            {
              title: 'Traditional Knowledge & Healing',
              subtitle: 'Rainforest ethnobotany, sacred chants & tribal consent',
              traditions: 'Kani Ethnobotany, Maravuri, Arogyapacha',
              image: 'https://www.holidify.com/images/cmsuploads/compressed/AgasthamalaiBiosphereReserve_2_20171012215025.jpg',
              query: 'Traditional Knowledge & Healing',
            },
            {
              title: 'All Living Archives',
              subtitle: 'Filter across all regional traditions, languages and scripts',
              traditions: 'Search all 11+ documented cultural traditions',
              image: 'https://i.pinimg.com/736x/07/2a/2c/072a2c8ca136f3f9f91596a97610f2e1.jpg',
              query: 'All',
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={cat.query === 'All' ? '/explore' : `/explore?category=${encodeURIComponent(cat.query)}`}
              className="group relative aspect-[16/11] rounded overflow-hidden shadow-heritage border border-parchment-300 hover:border-brass-DEFAULT transition-all"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-900/40 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-parchment-100 space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-brass-light">
                  {cat.traditions}
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory group-hover:text-amber-200 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-parchment-300 font-serif line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CURATED MASTERWORKS (FEATURED TRADITIONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
              Curator’s Selection
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-earth-900 font-bold">
              Featured Living Traditions
            </h2>
            <p className="font-serif text-sm text-earth-700 max-w-xl">
              Authentic cultural forms verified with hereditary knowledge holders and elder councils.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 font-serif text-xs font-semibold uppercase tracking-wider text-terracotta-700 hover:text-terracotta-800"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-parchment-200 animate-pulse rounded border border-parchment-300" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArts.slice(0, 6).map((art) => (
              <CulturalCard key={art._id} art={art} />
            ))}
          </div>
        )}
      </section>

      {/* 4. EDITORIAL MANIFESTO: COMMUNITY-CENTRED ETHICS */}
      <section className="bg-earth-900 text-parchment-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y-2 border-brass-DEFAULT">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass-DEFAULT/50 bg-amber-950/40 text-brass-light text-xs font-serif">
            <ShieldCheck className="w-4 h-4 text-turmeric-400" />
            <span>The Preservation Covenant</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-ivory">
            “Heritage Is Not Extracted;{' '}
            <span className="italic font-serif text-turmeric-400">It Is Entrusted.”</span>
          </h2>

          <p className="font-serif text-base sm:text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Conventional archives historically extracted indigenous knowledge into distant museums
            without community agency. Living Heritage reverses this paradigm. Every tradition here
            is documented with explicit community consent, non-commercial attribution covenants, and
            strict safeguards against bioprospecting or cultural appropriation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 text-left border-t border-earth-700">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-turmeric-500/20 text-turmeric-400 flex items-center justify-center font-bold font-serif">
                1
              </div>
              <h4 className="font-serif text-base font-semibold text-ivory">
                Informed Cultural Consent
              </h4>
              <p className="font-serif text-xs text-parchment-400 leading-relaxed">
                Communities retain perpetual intellectual ownership. Sensitive rites are never made
                public without explicit elder permission.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-turmeric-500/20 text-turmeric-400 flex items-center justify-center font-bold font-serif">
                2
              </div>
              <h4 className="font-serif text-base font-semibold text-ivory">
                Rigorous Lineage Attribution
              </h4>
              <p className="font-serif text-xs text-parchment-400 leading-relaxed">
                Every story honors hereditary master artists, bards, and craft clans rather than
                attributing traditions to anonymous folklore.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-turmeric-500/20 text-turmeric-400 flex items-center justify-center font-bold font-serif">
                3
              </div>
              <h4 className="font-serif text-base font-semibold text-ivory">
                Living Continuity
              </h4>
              <p className="font-serif text-xs text-parchment-400 leading-relaxed">
                Beyond static preservation, the platform connects younger generations directly with
                practicing masters to sustain endangered crafts.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brass-DEFAULT text-brass-light hover:bg-brass-DEFAULT hover:text-earth-900 rounded font-serif uppercase tracking-widest text-xs font-semibold transition-all"
            >
              <span>Read Our Full Charter & Ethics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. POPULAR & ORAL EPICS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
              Most Explored
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-earth-900 font-bold">
              Living Chronicles & Oral Epics
            </h2>
            <p className="font-serif text-sm text-earth-700">
              The traditions most frequently explored and studied across the platform.
            </p>
          </div>

          <Link
            href="/explore?sortBy=views"
            className="inline-flex items-center gap-1.5 font-serif text-xs font-semibold uppercase tracking-wider text-terracotta-700 hover:text-terracotta-800"
          >
            <span>Explore All Popular</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularArts.slice(0, 6).map((art) => (
            <CulturalCard key={art._id} art={art} />
          ))}
        </div>
      </section>

      {/* 6. CALL TO CONTRIBUTE HERO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-parchment-100 to-amber-50 border-2 border-brass-DEFAULT/60 rounded p-8 sm:p-12 text-center space-y-6 shadow-heritage-lg relative overflow-hidden">
          <div className="flex justify-center">
            <LotusMotif className="w-8 h-8 text-terracotta-600" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-earth-900 font-bold">
            Are You a Custodian of an Unwritten Heritage?
          </h2>

          <p className="font-serif text-sm sm:text-base text-earth-700 max-w-2xl mx-auto leading-relaxed">
            Every folk song sung in the paddy fields, every sacred craft shaped by hand, and every
            family memory carries the soul of a community. Contribute your recordings, photos, and
            oral narratives to the permanent living archive.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contribute"
              className="px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded font-serif uppercase tracking-widest text-xs font-semibold shadow-heritage"
            >
              Begin Contribution Portal
            </Link>
            <Link
              href="/community"
              className="px-6 py-3.5 border border-earth-700 text-earth-900 hover:bg-earth-800 hover:text-white rounded font-serif uppercase tracking-widest text-xs font-medium"
            >
              Meet Knowledge Holders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

