import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const [total, pending, approved, rejected] = await Promise.all([
      artsCollection.countDocuments({}),
      artsCollection.countDocuments({ status: { $in: ['pending_review', 'pending'] } }),
      artsCollection.countDocuments({ status: 'approved' }),
      artsCollection.countDocuments({ status: 'rejected' }),
    ]);

    const viewsAgg = await artsCollection
      .aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }])
      .toArray();
    const totalViews = viewsAgg[0]?.totalViews || 0;

    return NextResponse.json(
      {
        total,
        pending,
        approved,
        rejected,
        totalViews,
        categories: [],
        regions: [],
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      },
    );
  } catch (err) {
    console.warn('MongoDB stats query failed, falling back:', err);
  }

  return NextResponse.json(
    {
      total: SAMPLE_ARTS.length,
      pending: 0,
      approved: SAMPLE_ARTS.length,
      rejected: 0,
      totalViews: 14250,
      categories: [],
      regions: [],
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    },
  );
}
