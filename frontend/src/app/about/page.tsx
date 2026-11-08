'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OrnamentalDivider, SacredSeal, LotusMotif } from '../../components/OrnamentalMotif';
import { ShieldCheck, Sparkles, Heart, Compass, BookOpen, Layers, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Editorial Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <SacredSeal />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-earth-900 font-bold leading-tight">
          A Living Sanctuary for Memory & Craft
        </h1>
        <p className="font-serif text-base sm:text-lg text-earth-700 italic">
          "A culture does not die when its practitioners pass away; it dies when their stories cease
          to be spoken, sung, and remembered."
        </p>
      </div>

      <OrnamentalDivider />

      {/* 1. THE GENESIS & MANIFESTO */}
      <section className="space-y-6">
        <div className="relative aspect-[21/9] rounded overflow-hidden shadow-heritage-lg border border-parchment-300">
          <Image
            src="https://i.pinimg.com/736x/07/2a/2c/072a2c8ca136f3f9f91596a97610f2e1.jpg"
            alt="Kerala Living Heritage Archival Landscapes"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-900/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-parchment-100">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brass-light">
              Living Heritage Manifesto
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
              Reversing Extractive Archiving
            </h2>
          </div>
        </div>

        <div className="space-y-4 font-serif text-base text-earth-800 leading-relaxed dropcap">
          <p>
            For centuries, the colonial and academic archiving of indigenous traditions operated on
            an extractive model: researchers recorded folklore, songs, and metallurgical techniques,
            cataloged them in distant urban libraries or foreign institutions, and left the
            originating communities dispossessed of their own intellectual property.
          </p>
          <p>
            <strong>Living Heritage, Searchable</strong> was founded to fundamentally dismantle this
            extractive paradigm. We believe that cultural heritage belongs exclusively to the
            communities, hereditary guilds, bards, and knowledge holders who gave birth to it. Our
            platform serves not as a proprietor, but as a respectful digital sanctuary—a space where
            communities document, preserve, and explore their own oral epics, ritual performances,
            healing lore, and artisanal secrets with explicit consent and continuous agency.
          </p>
        </div>
      </section>

      {/* 2. THE FOUR PILLARS */}
      <section className="space-y-8 bg-parchment-100 p-8 sm:p-12 rounded border border-parchment-300 shadow-heritage">
        <div className="text-center space-y-2">
          <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Our Foundational Ethics
          </span>
          <h2 className="font-display text-3xl text-earth-900 font-bold">
            The Four Pillars of Community Preservation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3 bg-parchment-50 p-6 rounded border border-parchment-200">
            <div className="w-10 h-10 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold font-serif">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-900">
              Free, Prior & Informed Consent (FPIC)
            </h3>
            <p className="font-serif text-xs sm:text-sm text-earth-700 leading-relaxed">
              No cultural record is admitted to the archive without documented consent from hereditary
              masters or village custodians. Consent can be revoked or updated whenever the community
              deems necessary.
            </p>
          </div>

          <div className="space-y-3 bg-parchment-50 p-6 rounded border border-parchment-200">
            <div className="w-10 h-10 rounded-full bg-turmeric-100 text-turmeric-700 flex items-center justify-center font-bold font-serif">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-900">
              Sensitive Knowledge Safeguarding
            </h3>
            <p className="font-serif text-xs sm:text-sm text-earth-700 leading-relaxed">
              Certain traditions—such as lethal Marma points in Kalaripayattu or sacred tribal
              ethnobotanical plant locations in Agasthyamala—are deliberately guarded to prevent
              commercial bioprospecting or sacred desacralization.
            </p>
          </div>

          <div className="space-y-3 bg-parchment-50 p-6 rounded border border-parchment-200">
            <div className="w-10 h-10 rounded-full bg-brass-light/30 text-brass-dark flex items-center justify-center font-bold font-serif">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-900">
              Rigorous Lineage Attribution
            </h3>
            <p className="font-serif text-xs sm:text-sm text-earth-700 leading-relaxed">
              Every tradition identifies the hereditary lineages (Paramparas), master artists, and
              specific clans responsible for the craft, ensuring individual and community honor is
              never erased into vague generalizations.
            </p>
          </div>

          <div className="space-y-3 bg-parchment-50 p-6 rounded border border-parchment-200">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-serif">
              04
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-900">
              Living Continuity & Intergenerational Learning
            </h3>
            <p className="font-serif text-xs sm:text-sm text-earth-700 leading-relaxed">
              Preservation is not mere cataloging for academic display; it must ignite interest among
              youth and provide livelihood visibility for master craftspersons and performing artists.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGY & DATABASE TRANSPARENCY */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl text-earth-900 font-bold border-b border-parchment-300 pb-2">
          Architecture & Technology Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-serif text-xs">
          <div className="bg-parchment-50 p-5 rounded border border-parchment-300 space-y-2">
            <h4 className="font-bold text-sm text-earth-900 uppercase tracking-wider text-terracotta-700">
              Frontend & Presentation
            </h4>
            <p className="text-earth-700 leading-relaxed">
              Built on <strong>Next.js</strong> with <strong>Framer Motion</strong> animations and
              Tailwind CSS, tailored with warm parchment palettes, antique ivory, serif typography,
              and traditional Indian ornamental motifs.
            </p>
          </div>

          <div className="bg-parchment-50 p-5 rounded border border-parchment-300 space-y-2">
            <h4 className="font-bold text-sm text-earth-900 uppercase tracking-wider text-turmeric-700">
              Backend & Services
            </h4>
            <p className="text-earth-700 leading-relaxed">
              Engineered with <strong>NestJS</strong> clean architecture, providing JWT
              role-based access control, file and media streaming, validation pipes, and automated
              curator verification workflows.
            </p>
          </div>

          <div className="bg-parchment-50 p-5 rounded border border-parchment-300 space-y-2">
            <h4 className="font-bold text-sm text-earth-900 uppercase tracking-wider text-emerald-800">
              Database & Storage
            </h4>
            <p className="text-earth-700 leading-relaxed">
              Powered by <strong>MongoDB Atlas</strong> (cluster <code>ebin007</code>), persisting
              all living traditions and user contributions directly in the <strong>arts</strong> collection
              in the <strong>art-works</strong> database.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <div className="text-center pt-4">
        <Link
          href="/contribute"
          className="inline-block px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded font-serif uppercase tracking-widest text-xs font-semibold shadow-heritage transition-all"
        >
          Contribute Your Community Tradition
        </Link>
      </div>
    </div>
  );
}

