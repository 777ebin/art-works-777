import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const [categories, regions, languages, artForms] = await Promise.all([
      artsCollection.distinct('category', { status: 'approved' }),
      artsCollection.distinct('region', { status: 'approved' }),
      artsCollection.distinct('language', { status: 'approved' }),
      artsCollection.distinct('artForm', { status: 'approved' }),
    ]);

    if (categories.length > 0) {
      return NextResponse.json({ categories, regions, languages, artForms });
    }
  } catch (err) {
    // fallback
  }

  const categories = Array.from(new Set(SAMPLE_ARTS.map((a) => a.category)));
  const regions = Array.from(new Set(SAMPLE_ARTS.map((a) => a.region)));
  const languages = Array.from(new Set(SAMPLE_ARTS.map((a) => a.language)));
  const artForms = Array.from(new Set(SAMPLE_ARTS.map((a) => a.artForm)));
  return NextResponse.json({ categories, regions, languages, artForms });
}

