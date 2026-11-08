import React from 'react';

export const LotusMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-terracotta-500' }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 10 C45 35 30 50 15 55 C30 60 45 75 50 95 C55 75 70 60 85 55 C70 50 55 35 50 10 Z" opacity="0.85" />
    <circle cx="50" cy="55" r="8" fill="#C99E52" />
    <path d="M50 25 C48 40 40 50 28 55 C40 60 48 70 50 85 C52 70 60 60 72 55 C60 50 52 40 50 25 Z" opacity="0.4" />
  </svg>
);

export const OrnamentalDivider: React.FC<{ title?: string }> = ({ title }) => (
  <div className="flex items-center justify-center my-8 gap-4">
    <div className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent via-brass-DEFAULT to-brass-light" />
    <div className="flex items-center gap-2 text-terracotta-600">
      <span className="text-xs">✦</span>
      {title ? (
        <span className="font-serif tracking-widest uppercase text-xs text-earth-700 font-semibold px-2">
          {title}
        </span>
      ) : (
        <LotusMotif className="w-5 h-5 text-terracotta-600" />
      )}
      <span className="text-xs">✦</span>
    </div>
    <div className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent via-brass-DEFAULT to-brass-light" />
  </div>
);

export const SacredSeal: React.FC = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass-DEFAULT/40 bg-amber-50/60 text-xs font-serif text-earth-700 shadow-sm">
    <span className="w-2 h-2 rounded-full bg-turmeric-500 animate-pulse" />
    <span>Community Guarded • Verified Lineage</span>
  </div>
);

