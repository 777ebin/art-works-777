'use client';

import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Volume2, X, Music } from 'lucide-react';

export const GlobalAudioBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, progress, seek, pauseTrack } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[480px] z-50 bg-earth-900 text-parchment-100 rounded-lg shadow-2xl border border-brass-DEFAULT/60 p-4 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-4">
        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-turmeric-500 hover:bg-turmeric-600 text-earth-900 flex items-center justify-center transition-transform hover:scale-105 shrink-0 shadow-md"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        {/* Track info & scrub slider */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Music className="w-3.5 h-3.5 text-turmeric-500 shrink-0" />
            <h4 className="font-serif text-xs font-semibold text-ivory truncate">
              {currentTrack.title}
            </h4>
          </div>
          <p className="text-[10px] text-parchment-400 truncate mt-0.5">
            {currentTrack.performer ? `${currentTrack.performer} • ` : ''}{currentTrack.instrument || 'Traditional Acoustic Recording'}
          </p>

          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full h-1 bg-earth-700 rounded-lg appearance-none cursor-pointer accent-turmeric-500"
            />
            <span className="text-[10px] text-brass-light font-mono shrink-0">
              {currentTrack.duration || '0:00'}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={pauseTrack}
          className="text-earth-400 hover:text-parchment-200 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

