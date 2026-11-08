import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const [total, pending, approved, rejected] = await Promise.all([
      artsCollection.countDocuments({}),
      artsCollection.countDocuments({ status: 'pending_review' }),
      artsCollection.countDocuments({ status: 'approved' }),
      artsCollection.countDocuments({ status: 'rejected' }),
    ]);

    const viewsAgg = await artsCollection
      .aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }])
      .toArray();
    const totalViews = viewsAgg[0]?.totalViews || 0;

    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      totalViews,
      categories: [],
      regions: [],
    });
  } catch (err) {
    // fallback
  }

  return NextResponse.json({
    total: SAMPLE_ARTS.length,
    pending: 0,
    approved: SAMPLE_ARTS.length,
    rejected: 0,
    totalViews: 14250,
    categories: [],
    regions: [],
  });
}
