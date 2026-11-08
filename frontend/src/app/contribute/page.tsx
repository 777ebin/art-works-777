'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { createArt, uploadMediaFile } from '../../lib/api';
import { resolveImageUrl } from '../../lib/image-resolver';
import { OrnamentalDivider, SacredSeal, LotusMotif } from '../../components/OrnamentalMotif';
import {
  Upload,
  Music,
  Video,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function ContributePage() {
  const router = useRouter();
  const { user, token, openAuthModal } = useAuth();

  // Multi-step form step index (1: Identity, 2: Narrative, 3: Lineage & Media, 4: Consent & Submit)
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [title, setTitle] = useState('');
  const [nativeTitle, setNativeTitle] = useState('');
  const [category, setCategory] = useState('Ritual Arts & Performances');
  const [artForm, setArtForm] = useState('');
  const [region, setRegion] = useState('North Malabar');
  const [state, setState] = useState('Kerala');
  const [district, setDistrict] = useState('');
  const [language, setLanguage] = useState('Malayalam');

  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [historicalBackground, setHistoricalBackground] = useState('');
  const [culturalSignificance, setCulturalSignificance] = useState('');
  const [originalSource, setOriginalSource] = useState('');
  const [locationName, setLocationName] = useState('');

  // Custodians & Contributors
  const [communityOrigin, setCommunityOrigin] = useState('');
  const [holderName, setHolderName] = useState('');
  const [holderRole, setHolderRole] = useState('');
  const [holderLineage, setHolderLineage] = useState('');
  const [holderQuote, setHolderQuote] = useState('');

  const [contributorName, setContributorName] = useState(user?.fullName || '');
  const [contributorEmail, setContributorEmail] = useState(user?.email || '');
  const [contributorAffiliation, setContributorAffiliation] = useState(user?.affiliation || '');
  const [contributorBio, setContributorBio] = useState(user?.bio || '');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Media
  const [primaryImage, setPrimaryImage] = useState('');
  const [audioTitle, setAudioTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [audioPerformer, setAudioPerformer] = useState('');
  const [audioInstrument, setAudioInstrument] = useState('');

  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // Consent & Cultural Permissions
  const [consentGiven, setConsentGiven] = useState(false);
  const [communityConsent, setCommunityConsent] = useState(false);
  const [consentStatement, setConsentStatement] = useState(
    'I affirm that this tradition is documented with the informed consent and blessings of the hereditary knowledge holders, respecting indigenous ownership and cultural sanctity.',
  );
  const [sensitiveKnowledge, setSensitiveKnowledge] = useState(false);
  const [publicAccessAllowed, setPublicAccessAllowed] = useState(true);
  const [culturalPermissionProof, setCulturalPermissionProof] = useState('');

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedArt, setSubmittedArt] = useState<any>(null);

  // File Upload Helper
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadMediaFile(file);
      setPrimaryImage(res.url);
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven || !communityConsent) {
      setErrorMessage('Explicit informed consent and community permission are mandatory.');
      return;
    }
    if (!title || !summary || !description) {
      setErrorMessage('Please fill in all essential narrative fields.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload: any = {
        title,
        nativeTitle,
        category,
        artForm: artForm || 'Traditional Cultural Expression',
        region,
        state,
        district,
        language,
        summary,
        description,
        historicalBackground,
        culturalSignificance,
        originalSource,
        location: {
          name: locationName || region,
          description: `${district ? district + ', ' : ''}${region}, ${state}`,
        },
        communityOrigin,
        knowledgeHolders: holderName
          ? [
              {
                name: holderName,
                role: holderRole,
                lineage: holderLineage,
                quote: holderQuote,
              },
            ]
          : [],
        contributor: {
          name: contributorName || 'Anonymous Custodian',
          email: contributorEmail,
          affiliation: contributorAffiliation,
          bio: contributorBio,
          isAnonymous,
        },
        media: {
          primaryImage: primaryImage || '',
          gallery: primaryImage
            ? [
                {
                  url: primaryImage,
                  caption: title,
                  credit: contributorName || 'Community Contributor',
                  alt: title,
                },
              ]
            : [],
          audioTracks: audioTitle && audioUrl
            ? [
                {
                  title: audioTitle,
                  url: audioUrl,
                  performer: audioPerformer,
                  instrument: audioInstrument,
                  duration: 'Field Audio',
                },
              ]
            : [],
          videos: videoTitle && videoUrl
            ? [
                {
                  title: videoTitle,
                  url: videoUrl,
                  description: 'Living documentation',
                },
              ]
            : [],
        },
        consent: {
          given: consentGiven,
          communityConsent,
          consentStatement,
          sensitiveKnowledge,
          publicAccessAllowed: !sensitiveKnowledge || publicAccessAllowed,
          culturalPermissionProof,
        },
      };

      const result = await createArt(payload, token || undefined);
      setSubmittedArt(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please check fields.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedArt) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-heritage">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="font-serif text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Tradition Entrusted
          </span>
          <h2 className="font-display text-3xl font-bold text-earth-900">
            Thank You for Preserving Your Heritage
          </h2>
          <p className="font-serif text-sm text-earth-700 max-w-lg mx-auto">
            Your cultural chronicle <strong>"{submittedArt.title}"</strong> has been successfully
            recorded in the <code>arts</code> collection in MongoDB Atlas!
          </p>
        </div>

        <div className="bg-parchment-100 p-6 rounded border border-parchment-300 text-left space-y-3 text-xs font-serif shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-parchment-200">
            <span className="font-semibold text-earth-800">Archive Identifier:</span>
            <span className="font-mono text-terracotta-700">{submittedArt.slug}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-parchment-200">
            <span className="font-semibold text-earth-800">Curation Status:</span>
            <span className="capitalize px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
              {submittedArt.status || 'pending_review'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-earth-800">Community Consent:</span>
            <span className="text-emerald-700 font-semibold">Verified & Logged</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href={`/story/${submittedArt.slug}`}
            className="px-6 py-3 bg-terracotta-600 text-white rounded text-xs uppercase tracking-wider font-serif font-semibold shadow-heritage"
          >
            View Cultural Chronicle
          </Link>
          <button
            onClick={() => {
              setSubmittedArt(null);
              setCurrentStep(1);
              setTitle('');
              setSummary('');
              setDescription('');
            }}
            className="px-6 py-3 border border-earth-700 text-earth-900 rounded text-xs uppercase tracking-wider font-serif font-medium"
          >
            Submit Another Tradition
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Editorial Title */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <SacredSeal />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-earth-900 font-bold">
          Contribute to the Living Sanctuary
        </h1>
        <p className="font-serif text-sm sm:text-base text-earth-700 max-w-xl mx-auto">
          Document an oral narrative, folk song, metallurgical technique, sacred festival, or
          indigenous healing lore with full attribution and ethical community consent.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-serif">
        {[
          { num: 1, title: 'Identification' },
          { num: 2, title: 'Narrative' },
          { num: 3, title: 'Guardians & Media' },
          { num: 4, title: 'Consent & Covenant' },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setCurrentStep(s.num)}
            className={`p-3 rounded border transition-all ${
              currentStep === s.num
                ? 'bg-terracotta-600 text-white border-terracotta-700 font-semibold shadow-sm'
                : currentStep > s.num
                ? 'bg-amber-50 text-earth-900 border-brass-DEFAULT/60'
                : 'bg-parchment-100 text-earth-500 border-parchment-300'
            }`}
          >
            <span className="block text-[10px] uppercase font-mono tracking-wider opacity-80">
              Step 0{s.num}
            </span>
            <span className="truncate">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 bg-red-100 border border-red-300 rounded text-red-900 text-xs font-serif flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Multi-Step Form */}
      <form onSubmit={handleSubmit} className="bg-parchment-100 p-6 sm:p-10 rounded border border-parchment-300 shadow-heritage space-y-8">
        {/* STEP 1: CULTURAL IDENTIFICATION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-parchment-300 pb-3">
              <h3 className="font-serif text-xl font-bold text-earth-900">
                1. Cultural Tradition Identification
              </h3>
              <p className="font-serif text-xs text-earth-600">
                Provide the formal title, regional script representation, and domain classification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Tradition Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Theyyam: The Living Gods of Malabar"
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Native Title / Regional Script
                </label>
                <input
                  type="text"
                  value={nativeTitle}
                  onChange={(e) => setNativeTitle(e.target.value)}
                  placeholder="e.g. തെയ്യം (in Malayalam or regional script)"
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Cultural Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-xs text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                >
                  <option value="Ritual Arts & Performances">Ritual Arts & Performances</option>
                  <option value="Indigenous Crafts & Textiles">Indigenous Crafts & Textiles</option>
                  <option value="Folk Songs & Music">Folk Songs & Music</option>
                  <option value="Martial & Movement Traditions">Martial & Movement Traditions</option>
                  <option value="Traditional Knowledge & Healing">Traditional Knowledge & Healing</option>
                  <option value="Oral Traditions & Folklore">Oral Traditions & Folklore</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Specific Art Form / Practice
                </label>
                <input
                  type="text"
                  value={artForm}
                  onChange={(e) => setArtForm(e.target.value)}
                  placeholder="e.g. Sacred Metallurgy & Lost-Wax Casting"
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Region *
                </label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="e.g. North Malabar, Travancore"
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  District / Zone
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Kannur, Pathanamthitta"
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Primary Language / Dialect
                </label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g. Malayalam, Old Tulu"
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-terracotta-600 text-white rounded text-xs uppercase tracking-wider font-serif font-semibold flex items-center gap-1.5"
              >
                <span>Proceed to Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: NARRATIVE & CHRONICLES */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-parchment-300 pb-3">
              <h3 className="font-serif text-xl font-bold text-earth-900">
                2. The Living Narrative & Oral Chronicle
              </h3>
              <p className="font-serif text-xs text-earth-600">
                Record the full depth of the cultural expression, historical context, and sacred meaning.
              </p>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                Editorial Lead Summary *
              </label>
              <textarea
                required
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A compelling 2-3 sentence overview of this living heritage form..."
                className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                Comprehensive Description *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed narrative describing the ritual, craft process, choreography, or oral tale..."
                className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-sm text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Historical Background & Ancient Lineage
                </label>
                <textarea
                  rows={4}
                  value={historicalBackground}
                  onChange={(e) => setHistoricalBackground(e.target.value)}
                  placeholder="Origins, centuries-old chronicles, royal patronage, or Sangam references..."
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-xs text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-earth-800 font-semibold mb-1">
                  Cultural Significance & Social Meaning
                </label>
                <textarea
                  rows={4}
                  value={culturalSignificance}
                  onChange={(e) => setCulturalSignificance(e.target.value)}
                  placeholder="Sacred meaning, community role, festival context, or ecological harmony..."
                  className="w-full px-3.5 py-2.5 bg-parchment-50 border border-parchment-300 rounded text-xs text-earth-900 focus:outline-none focus:border-terracotta-500 font-serif"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2 border border-earth-700 text-earth-800 rounded text-xs uppercase tracking-wider font-serif font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-terracotta-600 text-white rounded text-xs uppercase tracking-wider font-serif font-semibold flex items-center gap-1.5"
              >
                <span>Proceed to Guardians & Media</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GUARDIANS, CONTRIBUTORS & MEDIA */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-parchment-300 pb-3">
              <h3 className="font-serif text-xl font-bold text-earth-900">
                3. Living Lineage, Guardians & Media Documentation
              </h3>
              <p className="font-serif text-xs text-earth-600">
                Acknowledge hereditary masters, clans, and add photographic, audio, or video files.
              </p>
            </div>

            {/* Living Masters / Knowledge Holders */}
            <div className="p-4 bg-parchment-50 rounded border border-parchment-300 space-y-4">
              <h4 className="font-serif text-sm font-bold text-earth-900 uppercase tracking-wider text-terracotta-700">
                Primary Living Knowledge Holder / Elder
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-serif text-earth-700 mb-1">
                    Master Artist Name
                  </label>
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    placeholder="e.g. Master Balakrishnan"
                    className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-serif text-earth-700 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={holderRole}
                    onChange={(e) => setHolderRole(e.target.value)}
                    placeholder="e.g. Thullal Guru, Melapramani"
                    className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-serif text-earth-700 mb-1">
                    Lineage / Parampara
                  </label>
                  <input
                    type="text"
                    value={holderLineage}
                    onChange={(e) => setHolderLineage(e.target.value)}
                    placeholder="e.g. 7th Generation Hereditary Clan"
                    className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-serif text-earth-700 mb-1">
                  Living Words / Quote from the Master
                </label>
                <input
                  type="text"
                  value={holderQuote}
                  onChange={(e) => setHolderQuote(e.target.value)}
                  placeholder="e.g. When the natural pigments touch the face, I become the ancestral flame."
                  className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif italic"
                />
              </div>
            </div>

            {/* Contributor Profile */}
            <div className="p-4 bg-parchment-50 rounded border border-parchment-300 space-y-4">
              <h4 className="font-serif text-sm font-bold text-earth-900 uppercase tracking-wider text-earth-800">
                Your Contributor Attribution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-serif text-earth-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-serif text-earth-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={contributorEmail}
                    onChange={(e) => setContributorEmail(e.target.value)}
                    placeholder="email@heritage.org"
                    className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-serif text-earth-700 mb-1">
                    Affiliation / Guild
                  </label>
                  <input
                    type="text"
                    value={contributorAffiliation}
                    onChange={(e) => setContributorAffiliation(e.target.value)}
                    placeholder="e.g. University / Folk Trust"
                    className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-serif"
                  />
                </div>
              </div>
            </div>

            {/* Media Uploads & Photographs */}
            <div className="p-4 bg-parchment-50 rounded border border-parchment-300 space-y-4">
              <h4 className="font-serif text-sm font-bold text-earth-900 uppercase tracking-wider text-turmeric-700">
                Archival Photographic Documentation
              </h4>

              {/* Primary Image */}
              <div>
                <label className="block text-[11px] font-serif text-earth-700 mb-1 font-semibold">
                  Primary Photograph URL or Direct File Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={primaryImage}
                    onChange={(e) => setPrimaryImage(e.target.value)}
                    placeholder="e.g. https://i.pinimg.com/... or paste image URL"
                    className="flex-1 px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-mono"
                  />
                  <label className="px-4 py-2 bg-parchment-200 hover:bg-parchment-300 text-earth-800 rounded text-xs font-serif cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[10px] text-earth-500 font-serif mt-1">
                  Upload an authentic, high-resolution photograph capturing the living tradition, artisan at work, or ceremonial regalia.
                </p>

                {primaryImage && (
                  <div className="mt-3 p-3 bg-white rounded border border-parchment-300 flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded overflow-hidden border border-parchment-200 bg-parchment-100 flex-shrink-0">
                      <img
                        src={resolveImageUrl(primaryImage)}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-xs font-serif">
                      <div className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Photographic Media Attached</span>
                      </div>
                      <p className="text-[11px] text-earth-600 truncate max-w-md font-mono">
                        {primaryImage}
                      </p>
                      <button
                        type="button"
                        onClick={() => setPrimaryImage('')}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        Remove & choose another file
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2 border border-earth-700 text-earth-800 rounded text-xs uppercase tracking-wider font-serif font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 bg-terracotta-600 text-white rounded text-xs uppercase tracking-wider font-serif font-semibold flex items-center gap-1.5"
              >
                <span>Proceed to Consent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CULTURAL OWNERSHIP, ETHICS & EXPLICIT CONSENT */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-parchment-300 pb-3">
              <h3 className="font-serif text-xl font-bold text-earth-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-terracotta-600" />
                <span>4. Cultural Ownership, Informed Consent & Privacy Covenant</span>
              </h3>
              <p className="font-serif text-xs text-earth-600">
                Ethical preservation requires explicit consent. Communities maintain perpetual ownership.
              </p>
            </div>

            <div className="bg-amber-50/80 p-5 rounded border border-amber-300 space-y-4">
              {/* Mandatory Consent Checkbox 1 */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 w-4 h-4 text-terracotta-600 rounded border-parchment-300 focus:ring-terracotta-500"
                />
                <span className="font-serif text-xs text-earth-900 leading-relaxed font-semibold">
                  I affirm that I have obtained free, prior, and informed consent from the traditional
                  knowledge holders, community elders, or hereditary performers before submitting this
                  documentation. (Mandatory)
                </span>
              </label>

              {/* Mandatory Consent Checkbox 2 */}
              <label className="flex items-start gap-3 cursor-pointer border-t border-amber-200/80 pt-3">
                <input
                  type="checkbox"
                  required
                  checked={communityConsent}
                  onChange={(e) => setCommunityConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-terracotta-600 rounded border-parchment-300 focus:ring-terracotta-500"
                />
                <span className="font-serif text-xs text-earth-900 leading-relaxed font-semibold">
                  I acknowledge that cultural ownership remains exclusively with the originating
                  community. This submission is made strictly for educational, archival preservation,
                  and non-commercial celebration. (Mandatory)
                </span>
              </label>

              {/* Sensitive Knowledge Toggle */}
              <div className="border-t border-amber-200/80 pt-3 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sensitiveKnowledge}
                    onChange={(e) => setSensitiveKnowledge(e.target.checked)}
                    className="mt-1 w-4 h-4 text-turmeric-600 rounded border-parchment-300 focus:ring-turmeric-500"
                  />
                  <div>
                    <span className="font-serif text-xs font-bold text-earth-900 block">
                      Guarded Sacred / Sensitive Community Knowledge Flag
                    </span>
                    <span className="text-[11px] text-earth-600 font-serif">
                      Check this box if this tradition involves sacred esoteric rites, sacred healing
                      recipes, or sensitive community traditions that must not be automatically
                      publicly accessible without chief curator review.
                    </span>
                  </div>
                </label>
              </div>

              {/* Optional Permission Proof */}
              <div className="pt-2">
                <label className="block text-[11px] font-serif text-earth-700 mb-1 font-semibold">
                  Archival Permission Reference / Resolution Number (Optional)
                </label>
                <input
                  type="text"
                  value={culturalPermissionProof}
                  onChange={(e) => setCulturalPermissionProof(e.target.value)}
                  placeholder="e.g. Village Temple Trust Resolution #VTT-2024-04"
                  className="w-full px-3 py-2 bg-white border border-parchment-300 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div className="p-4 bg-parchment-50 rounded border border-parchment-300 text-xs font-serif text-earth-700">
              <span className="font-bold text-earth-900 block mb-1">
                Database Destination Notice:
              </span>
              This submission will be immediately recorded into the <strong>arts</strong> collection
              in the <strong>art-works</strong> database on MongoDB Atlas (cluster <code>ebin007</code>).
              It enters the curation review queue where authorized curators verify authenticity.
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2 border border-earth-700 text-earth-800 rounded text-xs uppercase tracking-wider font-serif font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={submitting || !consentGiven || !communityConsent}
                className={`px-8 py-3 rounded text-xs uppercase tracking-widest font-serif font-bold shadow-heritage transition-all ${
                  submitting || !consentGiven || !communityConsent
                    ? 'bg-parchment-300 text-earth-500 cursor-not-allowed'
                    : 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
                }`}
              >
                {submitting ? 'Preserving Chronicle in Atlas...' : 'Entrust to Living Archive'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

