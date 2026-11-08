'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Shield, KeyRound, Sparkles } from 'lucide-react';
import { LotusMotif } from './OrnamentalMotif';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('contributor');
  const [affiliation, setAffiliation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await register({
          email,
          password,
          fullName,
          role,
          affiliation,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCurator = () => {
    setEmail('admin@livingheritage.org');
    setPassword('curator123');
    setIsLoginView(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-parchment-100 border border-parchment-300 rounded-lg max-w-md w-full shadow-2xl overflow-hidden relative">
        {/* Header decoration */}
        <div className="bg-earth-900 text-parchment-100 p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-parchment-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <LotusMotif className="w-5 h-5 text-brass-DEFAULT" />
            <span className="font-serif text-xs uppercase tracking-widest text-brass-light font-semibold">
              Living Heritage Archive
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-ivory">
            {isLoginView ? 'Welcome Custodian' : 'Join the Community'}
          </h3>
          <p className="text-xs text-parchment-300 font-serif mt-1">
            {isLoginView
              ? 'Access cultural records, contributions, and curator privileges.'
              : 'Preserve, document, and share your community’s living traditions.'}
          </p>
        </div>

        {/* Content & Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100/90 border border-red-300 text-red-800 text-xs rounded font-serif">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <>
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                    Full Name / Custodian Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-earth-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Master Govindan Achary"
                      className="w-full pl-9 pr-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-xs text-earth-900 focus:outline-none focus:border-terracotta-500"
                    >
                      <option value="contributor">Community Contributor</option>
                      <option value="knowledge_holder">Knowledge Holder / Artisan</option>
                      <option value="visitor">Cultural Enthusiast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                      Affiliation / Guild
                    </label>
                    <input
                      type="text"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      placeholder="e.g. Folklore Guild"
                      className="w-full px-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-xs text-earth-900 focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-earth-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="custodian@heritage.org"
                  className="w-full pl-9 pr-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-earth-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded font-serif uppercase tracking-wider text-xs font-semibold shadow-heritage transition-all mt-2"
            >
              {loading ? 'Validating...' : isLoginView ? 'Sign In to Portal' : 'Register Custodian Account'}
            </button>
          </form>

          {/* Quick curator credentials demo pill */}
          <div className="mt-4 pt-4 border-t border-parchment-300">
            <button
              onClick={handleQuickCurator}
              className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded flex items-center justify-between text-xs text-amber-900 transition-colors"
            >
              <span className="flex items-center gap-1.5 font-serif font-semibold">
                <KeyRound className="w-3.5 h-3.5 text-turmeric-600" />
                Fill Chief Curator Admin Credentials
              </span>
              <span className="text-[10px] text-earth-600 font-mono">admin@livingheritage.org</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError('');
              }}
              className="text-xs text-terracotta-700 hover:text-terracotta-800 font-serif underline"
            >
              {isLoginView
                ? "Don't have an account? Register as Contributor"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

