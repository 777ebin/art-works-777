'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchArts, fetchFilters } from '../../lib/api';
import { ArtRecord } from '../../lib/types';
import { CulturalCard } from '../../components/CulturalCard';
import { OrnamentalDivider } from '../../components/OrnamentalMotif';
import { Search, Filter, RotateCcw, SlidersHorizontal, MapPin, Globe, Sparkles } from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [region, setRegion] = useState(searchParams.get('region') || 'All');
  const [language, setLanguage] = useState(searchParams.get('language') || 'All');
  const [artForm, setArtForm] = useState(searchParams.get('artForm') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');

  // Results state
  const [records, setRecords] = useState<ArtRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter options loaded from database
  const [filterOptions, setFilterOptions] = useState<{
    categories: string[];
    regions: string[];
    languages: string[];
    artForms: string[];
  }>({
    categories: [],
    regions: [],
    languages: [],
    artForms: [],
  });

  // Load filter metadata
  useEffect(() => {
    fetchFilters().then(setFilterOptions).catch(console.error);
  }, []);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  // Fetch results whenever filters change
  useEffect(() => {
    async function loadArts() {
      setLoading(true);
      try {
        const res = await fetchArts({
          search: search.trim() || undefined,
          category: category !== 'All' ? category : undefined,
          region: region !== 'All' ? region : undefined,
          language: language !== 'All' ? language : undefined,
          artForm: artForm !== 'All' ? artForm : undefined,
          sortBy: sortBy,
          limit: 30,
        });
        setRecords(res.items);
        setTotal(res.total);
      } catch (err) {
        console.error('Error fetching filtered arts:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadArts();
    }, 200);

    return () => clearTimeout(timer);
  }, [search, category, region, language, artForm, sortBy]);

  const handleReset = () => {
    setSearch('');
    setCategory('All');
    setRegion('All');
    setLanguage('All');
    setArtForm('All');
    setSortBy('createdAt');
    router.push('/explore');
  };

  const hasActiveFilters =
    search !== '' ||
    category !== 'All' ||
    region !== 'All' ||
    language !== 'All' ||
    artForm !== 'All';

  const defaultCategories = [
    'All',
    'Ritual Arts & Performances',
    'Indigenous Crafts & Textiles',
    'Folk Songs & Music',
    'Martial & Movement Traditions',
    'Traditional Knowledge & Healing',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
          Comprehensive Cultural Repository
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-earth-900 font-bold">
          The Living Heritage Archive
        </h1>
        <p className="font-serif text-sm sm:text-base text-earth-700">
          Search and discover oral narratives, metallurgical wonders, folk songs, and sacred
          practices documented from community custodians across India.
        </p>
      </div>

      <OrnamentalDivider />

      {/* Search Bar & Primary Category Tabs */}
      <div className="space-y-5 bg-parchment-100 p-6 rounded border border-parchment-300 shadow-heritage">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-earth-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tradition, deity, village, weapon, song, or artisan (e.g. Theyyam, Aranmula, Unniyarcha)..."
            className="w-full pl-12 pr-4 py-3 bg-parchment-50 border border-parchment-300 rounded text-sm sm:text-base text-earth-900 placeholder-earth-400 focus:outline-none focus:border-terracotta-500 font-serif"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-3.5 text-xs text-earth-500 hover:text-earth-900 uppercase tracking-wider font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-parchment-200">
          <span className="text-xs font-serif uppercase tracking-wider text-earth-600 font-semibold mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-terracotta-600" />
            Category:
          </span>
          {defaultCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
                category === cat
                  ? 'bg-terracotta-600 text-white font-semibold shadow-sm'
                  : 'bg-parchment-50 border border-parchment-300 text-earth-700 hover:border-terracotta-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Multi-Facet Dropdowns: Region, Language, Art-Form, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-parchment-200 text-xs">
          {/* Region Filter */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-earth-600 mb-1 font-semibold">
              Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-earth-900 font-serif focus:outline-none focus:border-terracotta-500"
            >
              <option value="All">All Regions</option>
              {filterOptions.regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Language / Dialect */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-earth-600 mb-1 font-semibold">
              Language / Script
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-earth-900 font-serif focus:outline-none focus:border-terracotta-500"
            >
              <option value="All">All Languages</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Tulu">Tulu & Old Dialects</option>
              <option value="Manipravalam">Manipravalam</option>
              <option value="Sanskrit">Sanskritized Slokas</option>
            </select>
          </div>

          {/* Art Form */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-earth-600 mb-1 font-semibold">
              Art Form / Practice
            </label>
            <select
              value={artForm}
              onChange={(e) => setArtForm(e.target.value)}
              className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-earth-900 font-serif focus:outline-none focus:border-terracotta-500"
            >
              <option value="All">All Practice Forms</option>
              {filterOptions.artForms.map((af) => (
                <option key={af} value={af}>
                  {af}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-earth-600 mb-1 font-semibold">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-earth-900 font-serif focus:outline-none focus:border-terracotta-500"
            >
              <option value="createdAt">Most Recently Documented</option>
              <option value="views">Most Explored (Views)</option>
              <option value="title">Alphabetical (A - Z)</option>
              <option value="oldest">Historical Lineage</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-3 border-t border-parchment-200 text-xs text-earth-600">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif font-semibold">Active:</span>
              {search && (
                <span className="bg-parchment-200 px-2 py-0.5 rounded text-[11px]">
                  Keyword: "{search}"
                </span>
              )}
              {category !== 'All' && (
                <span className="bg-parchment-200 px-2 py-0.5 rounded text-[11px]">
                  Category: {category}
                </span>
              )}
              {region !== 'All' && (
                <span className="bg-parchment-200 px-2 py-0.5 rounded text-[11px]">
                  Region: {region}
                </span>
              )}
              {language !== 'All' && (
                <span className="bg-parchment-200 px-2 py-0.5 rounded text-[11px]">
                  Language: {language}
                </span>
              )}
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-terracotta-700 hover:text-terracotta-800 font-serif font-medium underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-earth-600 font-serif px-1">
        <span>
          Showing <strong>{records.length}</strong> of <strong>{total}</strong> documented cultural
          traditions
        </span>
        <span className="text-[11px] italic text-brass-dark">
          All entries verified with cultural consent covenants
        </span>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 bg-parchment-200 rounded border border-parchment-300 animate-pulse"
            />
          ))}
        </div>
      ) : records.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {records.map((art) => (
            <CulturalCard key={art._id} art={art} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-20 bg-parchment-100 rounded border border-parchment-300 space-y-4 max-w-lg mx-auto p-8 shadow-heritage">
          <div className="w-12 h-12 rounded-full bg-parchment-200 text-terracotta-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-earth-900">
            No Cultural Records Matched Your Search
          </h3>
          <p className="font-serif text-xs text-earth-600 leading-relaxed">
            We could not find any traditions matching your current filter combination. Try adjusting
            the keywords or clearing your region and category filters.
          </p>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-terracotta-600 text-white rounded text-xs uppercase tracking-wider font-serif font-semibold"
            >
              Clear Filters & View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif text-sm text-earth-600">
          Loading Living Heritage archive...
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
