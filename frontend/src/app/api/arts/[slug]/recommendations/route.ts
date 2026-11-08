import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const currentArt = await artsCollection.findOne({ slug });
    const query: any = { slug: { $ne: slug }, status: 'approved' };
    if (currentArt?.category) {
      query.category = currentArt.category;
    }

    const items = await artsCollection.find(query).limit(3).toArray();
    if (items.length > 0) {
      return NextResponse.json(items);
    }
  } catch (err) {
    // fallback
  }

  return NextResponse.json(
    SAMPLE_ARTS.filter((a) => a.slug !== slug).slice(0, 3),
  );
}

