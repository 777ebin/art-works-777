import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    const users = await usersCollection
      .find({ isActive: true })
      .project({ passwordHash: 0 })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Fetch contributors error:', error);
    return NextResponse.json([]);
  }
}

