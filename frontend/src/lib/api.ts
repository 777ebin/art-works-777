import { ArtRecord, UserProfile } from './types';
import { SAMPLE_ARTS } from './fallback-data';

export function getApiBase(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  // In any client browser (mobile, desktop, tablet, or deployed domain),
  // relative '/api' calls the current website without hardcoded localhost
  if (typeof window !== 'undefined') {
    return '/api';
  }
  // Server-side on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return 'http://127.0.0.1:3000/api';
}

const API_BASE = getApiBase();

export async function fetchArts(params?: {
  search?: string;
  category?: string;
  region?: string;
  language?: string;
  artForm?: string;
  status?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
  token?: string;
}): Promise<{ items: ArtRecord[]; total: number; page: number; totalPages: number }> {
  const query = new URLSearchParams();
  let authToken: string | undefined;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (key === 'token') {
        authToken = String(value);
        return;
      }
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });
  }
  const headers: Record<string, string> = {};
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE}/arts?${query.toString()}`, {
      headers,
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to local cultural archive data:', err);
  }

  // Graceful fallback for production deployments
  let items = [...SAMPLE_ARTS] as unknown as ArtRecord[];
  if (params?.search) {
    const term = params.search.toLowerCase();
    items = items.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        (a.nativeTitle && a.nativeTitle.toLowerCase().includes(term)) ||
        a.description.toLowerCase().includes(term) ||
        a.region.toLowerCase().includes(term),
    );
  }
  if (params?.category && params.category !== 'All Categories') {
    items = items.filter((a) => a.category === params.category);
  }
  if (params?.region && params.region !== 'All Regions') {
    items = items.filter((a) => a.region === params.region);
  }
  if (params?.language && params.language !== 'All Languages') {
    items = items.filter((a) => a.language && a.language.includes(params.language!));
  }
  if (params?.artForm && params.artForm !== 'All Art Forms') {
    items = items.filter((a) => a.artForm === params.artForm);
  }

  return {
    items,
    total: items.length,
    page: 1,
    totalPages: 1,
  };
}

export async function fetchFeatured(): Promise<ArtRecord[]> {
  try {
    const res = await fetch(`${API_BASE}/arts/featured`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    // fallback
  }
  return (SAMPLE_ARTS as unknown as ArtRecord[]).filter((a) => a.featured).slice(0, 6);
}

export async function fetchArtBySlug(slug: string): Promise<ArtRecord> {
  try {
    const res = await fetch(`${API_BASE}/arts/${slug}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    // fallback
  }
  const found = (SAMPLE_ARTS as unknown as ArtRecord[]).find((a) => a.slug === slug);
  if (found) return found;
  throw new Error(`Record '${slug}' not found`);
}

export async function fetchRecommendations(slug: string): Promise<ArtRecord[]> {
  try {
    const res = await fetch(`${API_BASE}/arts/${slug}/recommendations`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    // fallback
  }
  return (SAMPLE_ARTS as unknown as ArtRecord[]).filter((a) => a.slug !== slug).slice(0, 3);
}

export async function fetchFilters(): Promise<{
  categories: string[];
  regions: string[];
  languages: string[];
  artForms: string[];
}> {
  try {
    const res = await fetch(`${API_BASE}/arts/filters`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    // fallback
  }
  const categories = Array.from(new Set(SAMPLE_ARTS.map((a) => a.category)));
  const regions = Array.from(new Set(SAMPLE_ARTS.map((a) => a.region)));
  const languages = Array.from(new Set(SAMPLE_ARTS.map((a) => a.language)));
  const artForms = Array.from(new Set(SAMPLE_ARTS.map((a) => a.artForm)));
  return { categories, regions, languages, artForms };
}

export async function fetchStats(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalViews: number;
  categories: { _id: string; count: number }[];
  regions: { _id: string; count: number }[];
}> {
  try {
    const res = await fetch(`${API_BASE}/arts/stats`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    // fallback
  }
  return {
    total: SAMPLE_ARTS.length,
    pending: 0,
    approved: SAMPLE_ARTS.length,
    rejected: 0,
    totalViews: 14250,
    categories: [],
    regions: [],
  };
}

export async function createArt(data: Partial<ArtRecord>, token?: string): Promise<ArtRecord> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/arts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to submit cultural record');
  }
  return res.json();
}

export async function updateArtStatus(
  id: string,
  status: string,
  reviewNotes?: string,
  token?: string,
): Promise<ArtRecord> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/arts/${id}/status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status, reviewNotes }),
  });
  if (!res.ok) {
    throw new Error('Failed to update submission status');
  }
  return res.json();
}

export async function deleteArt(id: string, token?: string): Promise<void> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/arts/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) {
    throw new Error('Failed to delete cultural record');
  }
}

export async function likeArt(id: string): Promise<{ likes: number }> {
  const res = await fetch(`${API_BASE}/arts/${id}/like`, { method: 'POST' });
  return res.json();
}

export async function uploadMediaFile(file: File): Promise<{ url: string; originalName: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error('File upload failed. Ensure the format is supported.');
  }
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Login failed');
  }
  return res.json();
}

export async function registerUser(data: {
  email: string;
  password: string;
  fullName: string;
  role?: string;
  affiliation?: string;
  bio?: string;
}) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Registration failed');
  }
  return res.json();
}

export async function fetchMe(token: string): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
}

export async function fetchContributors(): Promise<UserProfile[]> {
  const res = await fetch(`${API_BASE}/auth/contributors`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

