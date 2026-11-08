import React from 'react';
import Link from 'next/link';
import { LotusMotif, OrnamentalDivider } from './OrnamentalMotif';
import { Heart, Compass, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-earth-900 text-parchment-200 pt-16 pb-12 border-t-4 border-brass-DEFAULT relative overflow-hidden">
      {/* Decorative lattice background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C99E52_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-earth-700">
          {/* Column 1: Brand & Charter */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LotusMotif className="w-7 h-7 text-brass-DEFAULT" />
              <span className="font-serif font-bold text-2xl text-ivory tracking-wide">
                Living Heritage, Searchable
              </span>
            </div>
            <p className="text-sm font-serif text-parchment-300 leading-relaxed max-w-lg">
              A contemporary digital sanctuary and ethical archive dedicated to documenting,
              preserving, and celebrating traditional stories, folk songs, indigenous crafts, and
              oral histories across India and regional cultures.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-brass-light font-serif">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-turmeric-500" />
                Community Owned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-turmeric-500" />
                Ethical Consent Verified
              </span>
              <span>•</span>
              <span>Non-Commercial Archive</span>
            </div>
          </div>

          {/* Column 2: Traditions & Explore */}
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-brass-DEFAULT mb-4 font-semibold">
              Traditions
            </h4>
            <ul className="space-y-2.5 text-xs text-parchment-300">
              <li>
                <Link href="/explore?category=Ritual Arts & Performances" className="hover:text-brass-light transition-colors">
                  Ritual Arts & Performances
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Indigenous Crafts & Textiles" className="hover:text-brass-light transition-colors">
                  Indigenous Metallurgy & Crafts
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Folk Songs & Music" className="hover:text-brass-light transition-colors">
                  Oral Epics & Folk Ballads
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Martial & Movement Traditions" className="hover:text-brass-light transition-colors">
                  Martial Sciences & Movement
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Traditional Knowledge & Healing" className="hover:text-brass-light transition-colors">
                  Ethnobotany & Forest Lore
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Preservation */}
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-brass-DEFAULT mb-4 font-semibold">
              Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs text-parchment-300">
              <li>
                <Link href="/about" className="hover:text-brass-light transition-colors">
                  Our Mission & Approach
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-brass-light transition-colors">
                  Submit a Tradition
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-brass-light transition-colors">
                  Community Guardians
                </Link>
              </li>
              <li>
                <Link href="/about#consent" className="hover:text-brass-light transition-colors">
                  Consent & Cultural Ownership
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brass-light transition-colors">
                  Curator Verification Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical attribution & bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-400 gap-4">
          <p className="font-serif">
            Living Heritage Archive is governed by respectful attribution protocols. Cultural
            ownership remains perpetually with the respective communities and hereditary custodians.
          </p>
          <div className="flex items-center gap-1 font-serif text-parchment-400">
            <span>Preserved with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
            <span>for future generations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

