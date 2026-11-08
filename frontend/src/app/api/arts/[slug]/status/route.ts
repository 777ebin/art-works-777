import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const body = await req.json();
    const { status, reviewNotes } = body;

    const { db } = await connectToDatabase();
    const artsCollection = db.collection('arts');

    const updateDoc: any = {
      status,
      updatedAt: new Date(),
    };
    if (reviewNotes !== undefined) {
      updateDoc.reviewNotes = reviewNotes;
    }

    const filter: any = ObjectId.isValid(slug) ? { _id: new ObjectId(slug) } : { slug };
    const res = await artsCollection.findOneAndUpdate(
      filter,
      { $set: updateDoc },
      { returnDocument: 'after' },
    );

    return NextResponse.json(res || { success: true, status });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Status update failed' },
      { status: 500 },
    );
  }
}

