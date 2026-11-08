'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { fetchArts, updateArtStatus, deleteArt, fetchStats } from '../../lib/api';
import { ArtRecord } from '../../lib/types';
import { resolveImageUrl } from '../../lib/image-resolver';
import { OrnamentalDivider } from '../../components/OrnamentalMotif';
import {
  Shield,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, token, isAdmin, openAuthModal, login } = useAuth();

  const [records, setRecords] = useState<ArtRecord[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filter tab: 'all' | 'pending_review' | 'approved' | 'rejected'
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Selected item review state
  const [selectedArt, setSelectedArt] = useState<ArtRecord | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  // Curator fast login state
  const [curatorLoggingIn, setCuratorLoggingIn] = useState(false);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [artsRes, statsRes] = await Promise.all([
        fetchArts({
          status: statusFilter,
          limit: 100,
          token: token || undefined,
        }),
        fetchStats().catch(() => null),
      ]);
      setRecords(artsRes.items);
      setStats(statsRes);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin, statusFilter, token]);

  const handleCuratorFastLogin = async () => {
    setCuratorLoggingIn(true);
    try {
      // First try Curator Ebin, fallback to Chief Admin
      try {
        await login('ebin@livingheritage.org', 'curator123');
      } catch (err) {
        await login('admin@livingheritage.org', 'curator123');
      }
    } catch (e: any) {
      alert('Login error: ' + (e.message || 'Failed'));
    } finally {
      setCuratorLoggingIn(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      await updateArtStatus(id, newStatus, reviewNote || undefined, token || undefined);
      setReviewNote('');
      setSelectedArt(null);
      await loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Status update failed');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you certain you want to permanently delete '${title}' from the archive?`)) {
      return;
    }
    try {
      await deleteArt(id, token || undefined);
      await loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Deletion failed');
    }
  };

  // If not logged in as Admin, show Chief Curator authorization screen
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-heritage">
          <Shield className="w-8 h-8 text-terracotta-600" />
        </div>
        <div className="space-y-2">
          <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Curator Access Required
          </span>
          <h2 className="font-display text-3xl font-bold text-earth-900">
            Protected Curator Interface
          </h2>
          <p className="font-serif text-sm text-earth-700 leading-relaxed">
            The Living Heritage Curator Dashboard is protected by role-based access controls to
            safeguard sensitive community traditions and manage verification workflows.
          </p>
        </div>

        <div className="bg-parchment-100 p-6 rounded border border-parchment-300 space-y-4">
          <p className="font-serif text-xs text-earth-800">
            Click below to sign in instantly with the seeded Chief Curator administrative credentials:
          </p>
          <button
            onClick={handleCuratorFastLogin}
            disabled={curatorLoggingIn}
            className="w-full py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded font-serif uppercase tracking-wider text-xs font-bold shadow-heritage transition-all flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>{curatorLoggingIn ? 'Authenticating Curator...' : 'Authorize as Curator Ebin'}</span>
          </button>
          <div className="text-[11px] font-mono text-earth-600">
            Curator Account: <span className="text-terracotta-700 font-semibold">ebin@livingheritage.org</span> (or <span className="font-semibold">ebin</span>) • curator123
          </div>
        </div>

        <div>
          <button
            onClick={openAuthModal}
            className="text-xs text-earth-600 hover:text-earth-900 underline font-serif"
          >
            Or sign in with custom credentials
          </button>
        </div>
      </div>
    );
  }

  const filteredRecords = records.filter((r) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(term) ||
      (r.contributor?.name && r.contributor.name.toLowerCase().includes(term)) ||
      r.region.toLowerCase().includes(term) ||
      r.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-terracotta-600 font-semibold">
            <Shield className="w-4 h-4" />
            <span>Chief Cultural Curator Dashboard</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-earth-900 font-bold mt-1">
            Archive Governance & Verification Queue
          </h1>
          <p className="font-serif text-xs sm:text-sm text-earth-600">
            Connected to live MongoDB Atlas cluster <code>ebin007</code> / database <code>art-works</code> / collection <code>arts</code>.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          className="self-start sm:self-auto px-4 py-2 bg-parchment-100 hover:bg-parchment-200 border border-parchment-300 rounded text-xs font-serif text-earth-800 flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Live Queue</span>
        </button>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-parchment-50 p-5 rounded border border-parchment-300 shadow-sm">
          <div className="text-[11px] font-serif uppercase tracking-wider text-earth-600">
            Total In Collection
          </div>
          <div className="font-display text-3xl font-bold text-earth-900 mt-1">
            {stats?.total ?? records.length}
          </div>
          <div className="text-[10px] text-earth-500 font-mono mt-0.5">arts collection</div>
        </div>

        <div className="bg-amber-50 p-5 rounded border border-amber-300 shadow-sm">
          <div className="text-[11px] font-serif uppercase tracking-wider text-turmeric-700 font-semibold">
            Pending Review
          </div>
          <div className="font-display text-3xl font-bold text-turmeric-700 mt-1">
            {stats?.pending ?? records.filter((r) => r.status === 'pending_review').length}
          </div>
          <div className="text-[10px] text-amber-700 font-serif mt-0.5">Needs Verification</div>
        </div>

        <div className="bg-emerald-50 p-5 rounded border border-emerald-300 shadow-sm">
          <div className="text-[11px] font-serif uppercase tracking-wider text-emerald-800 font-semibold">
            Approved & Public
          </div>
          <div className="font-display text-3xl font-bold text-emerald-800 mt-1">
            {stats?.approved ?? records.filter((r) => r.status === 'approved').length}
          </div>
          <div className="text-[10px] text-emerald-700 font-serif mt-0.5">Visible to Visitors</div>
        </div>

        <div className="bg-parchment-50 p-5 rounded border border-parchment-300 shadow-sm">
          <div className="text-[11px] font-serif uppercase tracking-wider text-earth-600">
            Total Views
          </div>
          <div className="font-display text-3xl font-bold text-terracotta-700 mt-1">
            {stats?.totalViews ?? 0}
          </div>
          <div className="text-[10px] text-earth-500 font-serif mt-0.5">Reader Explorations</div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-parchment-100 p-4 rounded border border-parchment-300 shadow-sm">
        {/* Status Pills */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          {[
            { label: 'All Records', value: 'all' },
            { label: 'Pending Review', value: 'pending_review' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded text-xs font-serif transition-all ${
                statusFilter === tab.value
                  ? 'bg-terracotta-600 text-white font-semibold shadow-sm'
                  : 'bg-parchment-50 border border-parchment-300 text-earth-700 hover:border-terracotta-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-earth-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records in queue..."
            className="w-full pl-9 pr-3 py-1.5 bg-parchment-50 border border-parchment-300 rounded text-xs font-serif text-earth-900 focus:outline-none focus:border-terracotta-500"
          />
        </div>
      </div>

      {/* Review & Edit Modal Drawer if an item is selected */}
      {selectedArt && (
        <div className="p-6 bg-parchment-50 border-2 border-terracotta-500/80 rounded shadow-heritage space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-terracotta-700">
                Evaluating Submission
              </span>
              <h3 className="font-serif text-xl font-bold text-earth-900">
                {selectedArt.title}
              </h3>
              <p className="text-xs font-serif text-earth-600">
                Submitted by {selectedArt.contributor?.name} ({selectedArt.contributor?.email || 'N/A'})
              </p>
            </div>
            <button
              onClick={() => setSelectedArt(null)}
              className="text-xs text-earth-500 hover:text-earth-900 font-mono"
            >
              ✕ Close
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start bg-parchment-100 p-4 rounded text-xs font-serif text-earth-800">
            {selectedArt.media?.primaryImage ? (
              <div className="w-full md:w-44 h-36 rounded overflow-hidden border border-parchment-300 bg-parchment-200 flex-shrink-0 relative group">
                <img
                  src={resolveImageUrl(selectedArt.media.primaryImage, selectedArt.slug || selectedArt.title)}
                  alt={selectedArt.title}
                  className="w-full h-full object-cover"
                />
                <a
                  href={resolveImageUrl(selectedArt.media.primaryImage, selectedArt.slug || selectedArt.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[9px] rounded font-mono opacity-80 group-hover:opacity-100"
                >
                  Full Size ↗
                </a>
              </div>
            ) : null}

            <div className="flex-1 space-y-2">
              <div>
                <strong>Summary:</strong> {selectedArt.summary}
              </div>
              {selectedArt.media?.primaryImage && (
                <div className="text-[10px] font-mono text-earth-600 break-all">
                  <strong>Attached Media:</strong> {selectedArt.media.primaryImage}
                </div>
              )}
              {selectedArt.historicalBackground && (
                <div>
                  <strong>Historical Context:</strong> {selectedArt.historicalBackground}
                </div>
              )}
              {selectedArt.consent && (
                <div>
                  <strong>Consent Statement:</strong> {selectedArt.consent.consentStatement}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
              Curator Review Feedback / Editorial Notes
            </label>
            <input
              type="text"
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="e.g. Verified with Folklore Academy; public access confirmed."
              className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleStatusChange(selectedArt._id, 'approved')}
              disabled={updating}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs uppercase tracking-wider font-serif font-bold shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approve & Publish to Archive</span>
            </button>

            <button
              onClick={() => handleStatusChange(selectedArt._id, 'rejected')}
              disabled={updating}
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded text-xs uppercase tracking-wider font-serif font-bold shadow-sm flex items-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Reject Submission</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Records Table */}
      <div className="bg-parchment-50 border border-parchment-300 rounded overflow-hidden shadow-heritage">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif">
            <thead className="bg-parchment-200 text-earth-900 uppercase tracking-wider text-[10px] border-b border-parchment-300">
              <tr>
                <th className="py-3.5 px-3 font-bold w-16">Photo</th>
                <th className="py-3.5 px-4 font-bold">Tradition Title</th>
                <th className="py-3.5 px-4 font-bold">Category & Region</th>
                <th className="py-3.5 px-4 font-bold">Contributor</th>
                <th className="py-3.5 px-4 font-bold">Consent Status</th>
                <th className="py-3.5 px-4 font-bold">Curation Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-200">
              {filteredRecords.map((art) => (
                <tr key={art._id} className="hover:bg-amber-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="w-12 h-12 rounded overflow-hidden border border-parchment-300 bg-parchment-100 flex-shrink-0">
                      <img
                        src={resolveImageUrl(art.media?.primaryImage, art.slug || art.title)}
                        alt={art.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-earth-900 text-sm">
                      {art.title}
                    </div>
                    {art.nativeTitle && (
                      <div className="text-[11px] text-terracotta-700 font-serif">
                        {art.nativeTitle}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-earth-800">{art.category}</div>
                    <div className="text-[11px] text-earth-500">{art.region}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-earth-800 font-medium">
                      {art.contributor?.name || 'Anonymous'}
                    </div>
                    <div className="text-[10px] text-earth-500 font-mono">
                      {art.contributor?.email || 'No email provided'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {art.consent?.communityConsent ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded text-[10px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-amber-700 text-[10px]">Pending Check</span>
                    )}
                    {art.consent?.sensitiveKnowledge && (
                      <div className="text-[10px] text-red-700 font-semibold mt-0.5 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        Sensitive Lore
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold ${
                        art.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : art.status === 'pending_review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {art.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedArt(art);
                          setReviewNote(art.reviewNotes || '');
                        }}
                        title="Review submission details"
                        className="p-1.5 bg-parchment-200 hover:bg-parchment-300 text-earth-800 rounded transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href={`/story/${art.slug}`}
                        target="_blank"
                        title="View story live"
                        className="p-1.5 bg-parchment-200 hover:bg-parchment-300 text-earth-800 rounded transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(art._id, art.title)}
                        title="Delete permanently"
                        className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

