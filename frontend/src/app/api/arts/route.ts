import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'living_heritage_sacred_secret_key_2026_ebin';

function extractUser(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const region = searchParams.get('region');
  const language = searchParams.get('language');
  const artForm = searchParams.get('artForm');
  const statusParam = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  const currentUser = extractUser(req);
  const isCurator = currentUser?.role === 'admin' || currentUser?.role === 'curator';

  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const filter: any = {};

    if (statusParam && statusParam !== 'all') {
      filter.status = statusParam;
    } else if (!isCurator && statusParam !== 'all') {
      filter.status = 'approved';
    }

    if (category && category !== 'All Categories') {
      filter.category = category;
    }
    if (region && region !== 'All Regions') {
      filter.region = region;
    }
    if (language && language !== 'All Languages') {
      filter.language = { $regex: new RegExp(language, 'i') };
    }
    if (artForm && artForm !== 'All Art Forms') {
      filter.artForm = artForm;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { nativeTitle: { $regex: new RegExp(search, 'i') } },
        { summary: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
        { region: { $regex: new RegExp(search, 'i') } },
      ];
    }

    const total = await artsCollection.countDocuments(filter);
    const skip = (page - 1) * limit;

    const items = await artsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    if (items.length > 0 || total > 0) {
      return NextResponse.json({
        items,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      });
    }
  } catch (error) {
    console.warn('MongoDB query failed, falling back to local cultural archive data:', error);
  }

  // Fallback to sample data
  let items = [...SAMPLE_ARTS] as any[];
  if (statusParam && statusParam !== 'all') {
    items = items.filter((a) => a.status === statusParam);
  }
  if (category && category !== 'All Categories') {
    items = items.filter((a) => a.category === category);
  }
  if (region && region !== 'All Regions') {
    items = items.filter((a) => a.region === region);
  }
  if (language && language !== 'All Languages') {
    items = items.filter((a) => a.language && a.language.includes(language));
  }
  if (artForm && artForm !== 'All Art Forms') {
    items = items.filter((a) => a.artForm === artForm);
  }
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        (a.nativeTitle && a.nativeTitle.toLowerCase().includes(s)) ||
        a.description.toLowerCase().includes(s) ||
        a.region.toLowerCase().includes(s),
    );
  }

  return NextResponse.json({
    items,
    total: items.length,
    page: 1,
    totalPages: 1,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const currentUser = extractUser(req);

    const baseSlug = (data.title || 'cultural-chronicle')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    const newRecord: any = {
      ...data,
      slug,
      status: 'pending_review',
      featured: false,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (currentUser) {
      newRecord.submittedBy = currentUser.sub;
      if (!newRecord.contributor?.email) {
        newRecord.contributor = {
          ...newRecord.contributor,
          name: currentUser.fullName || currentUser.email,
          email: currentUser.email,
        };
      }
    }

    try {
      const { db } = await connectToDatabase();
      const artsCollection = db.collection('arts');
      const result = await artsCollection.insertOne(newRecord);
      newRecord._id = result.insertedId.toString();
    } catch (dbErr) {
      console.warn('MongoDB insert failed, generated fallback record ID:', dbErr);
      newRecord._id = `local-${Date.now()}`;
    }

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error: any) {
    console.error('Create art error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to submit cultural record' },
      { status: 500 },
    );
  }
}
