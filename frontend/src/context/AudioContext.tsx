'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { AudioItem } from '../lib/types';

interface AudioContextType {
  currentTrack: AudioItem | null;
  isPlaying: boolean;
  playTrack: (track: AudioItem) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  progress: number;
  duration: number;
  seek: (val: number) => void;
  isAmbientActive: boolean;
  toggleAmbient: () => void;
}

const AudioContext = createContext<AudioContextType>({} as any);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAmbientActive, setIsAmbientActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    ambientRef.current = new Audio('https://cdn.freesound.org/previews/456/456182_9273774-lq.mp3');
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.25;

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      if (ambientRef.current) ambientRef.current.pause();
    };
  }, []);

  const playTrack = (track: AudioItem) => {
    if (!audioRef.current) return;
    setCurrentTrack(track);
    audioRef.current.src = track.url;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
  };

  const pauseTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      pauseTrack();
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const seek = (pct: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    audioRef.current.currentTime = (pct / 100) * audioRef.current.duration;
    setProgress(pct);
  };

  const toggleAmbient = () => {
    if (!ambientRef.current) return;
    if (isAmbientActive) {
      ambientRef.current.pause();
      setIsAmbientActive(false);
    } else {
      ambientRef.current.play().then(() => setIsAmbientActive(true)).catch(console.error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        togglePlay,
        progress,
        duration,
        seek,
        isAmbientActive,
        toggleAmbient,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);

