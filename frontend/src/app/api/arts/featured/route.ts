import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');
    const items = await artsCollection
      .find({ status: 'approved', featured: true })
      .limit(6)
      .toArray();

    if (items.length > 0) {
      return NextResponse.json(items);
    }
  } catch (err) {
    // fallback
  }

  return NextResponse.json(SAMPLE_ARTS.filter((a) => a.featured).slice(0, 6));
}
