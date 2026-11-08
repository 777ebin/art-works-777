import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SAMPLE_ARTS } from '@/lib/fallback-data';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    let art = await artsCollection.findOne({ slug });
    if (!art && ObjectId.isValid(slug)) {
      art = await artsCollection.findOne({ _id: new ObjectId(slug) });
    }

    if (art) {
      // Increment views asynchronously
      artsCollection.updateOne({ _id: art._id }, { $inc: { views: 1 } }).catch(() => {});
      return NextResponse.json(art);
    }
  } catch (err) {
    // fallback
  }

  const found = SAMPLE_ARTS.find((a) => a.slug === slug);
  if (found) {
    return NextResponse.json(found);
  }

  return NextResponse.json({ message: 'Record not found' }, { status: 404 });
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    if (ObjectId.isValid(slug)) {
      await artsCollection.deleteOne({ _id: new ObjectId(slug) });
    } else {
      await artsCollection.deleteOne({ slug });
    }
    return NextResponse.json({ success: true, message: 'Record deleted' });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Failed to delete record' },
      { status: 500 },
    );
  }
}
