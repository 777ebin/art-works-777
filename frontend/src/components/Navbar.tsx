'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { LotusMotif } from './OrnamentalMotif';
import { Volume2, VolumeX, Menu, X, Shield, PlusCircle, User as UserIcon, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAdmin, logout, openAuthModal } = useAuth();
  const { isAmbientActive, toggleAmbient } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Archive', href: '/explore' },
    { label: 'Arts & Traditions', href: '/explore?category=Ritual%20Arts%20%26%20Performances' },
    { label: 'Contribute', href: '/contribute' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-parchment-100/90 backdrop-blur-md border-b border-parchment-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-brass-DEFAULT/60 flex items-center justify-center bg-parchment-50 shadow-inner group-hover:scale-105 transition-transform">
              <LotusMotif className="w-6 h-6 text-terracotta-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl md:text-2xl tracking-wide text-earth-900">
                  Living Heritage
                </span>
                <span className="text-[10px] tracking-widest font-mono uppercase bg-terracotta-50 text-terracotta-700 px-1.5 py-0.5 rounded border border-terracotta-200">
                  Searchable
                </span>
              </div>
              <p className="text-[11px] font-serif italic text-earth-600 tracking-wider">
                Preserving Oral Traditions & Living Crafts
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors relative py-1 ${
                    active
                      ? 'text-terracotta-600 font-semibold'
                      : 'text-earth-700 hover:text-terracotta-500 font-medium'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  pathname === '/admin'
                    ? 'bg-terracotta-700 text-white shadow-sm'
                    : 'bg-amber-100/70 border border-amber-300 text-amber-900 hover:bg-amber-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Curator Portal</span>
              </Link>
            )}
          </nav>

          {/* Right Actions: Ambient Audio + Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleAmbient}
              title={isAmbientActive ? 'Mute ambient soundscape' : 'Play traditional temple ambiance'}
              className={`p-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-serif ${
                isAmbientActive
                  ? 'border-turmeric-500 bg-amber-50 text-turmeric-700 shadow-glow'
                  : 'border-parchment-300 bg-parchment-50 text-earth-600 hover:text-earth-900'
              }`}
            >
              {isAmbientActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-turmeric-600 animate-pulse" />
                  <span className="text-[11px] pr-1">Temple Soundscape</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-earth-500" />
                  <span className="text-[11px] pr-1 text-earth-500">Ambiance</span>
                </>
              )}
            </button>

            {/* Contribute Shortcut */}
            <Link
              href="/contribute"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded text-xs uppercase tracking-widest font-semibold shadow-heritage hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Contribute</span>
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-parchment-300">
                <div className="text-right">
                  <div className="text-xs font-semibold text-earth-900 leading-tight">
                    {user.fullName}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-terracotta-600">
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 text-earth-500 hover:text-terracotta-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-4 py-2 border border-earth-700 text-earth-800 hover:bg-earth-800 hover:text-white rounded text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleAmbient}
              className="p-2 rounded-full border border-parchment-300 text-earth-700"
            >
              {isAmbientActive ? <Volume2 className="w-4 h-4 text-turmeric-600" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-earth-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-parchment-100 border-b border-parchment-300 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-earth-900 hover:text-terracotta-600"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-terracotta-700 font-semibold"
            >
              Curator Portal (Admin)
            </Link>
          )}
          <div className="pt-4 border-t border-parchment-300 flex flex-col gap-2">
            <Link
              href="/contribute"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-terracotta-600 text-white rounded text-xs uppercase tracking-widest font-semibold"
            >
              Contribute a Tradition
            </Link>
            {user ? (
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-sm font-semibold">{user.fullName}</div>
                  <div className="text-xs text-terracotta-600 capitalize">{user.role}</div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-earth-600 hover:text-terracotta-600 underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 border border-earth-800 text-earth-900 rounded text-xs uppercase tracking-widest font-medium"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

