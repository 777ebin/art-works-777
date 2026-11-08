import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const filter: any = ObjectId.isValid(slug) ? { _id: new ObjectId(slug) } : { slug };
    const res = await artsCollection.findOneAndUpdate(
      filter,
      { $inc: { likes: 1 } },
      { returnDocument: 'after' },
    );

    return NextResponse.json({ likes: res?.likes || 1 });
  } catch (err: any) {
    return NextResponse.json({ likes: 1 });
  }
}
