import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'living_heritage_sacred_secret_key_2026_ebin';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    let user = null;
    try {
      user = await usersCollection.findOne({ _id: new ObjectId(decoded.sub) });
    } catch {
      user = await usersCollection.findOne({ email: decoded.email });
    }

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const safeUser = {
      _id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      affiliation: user.affiliation,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      isActive: user.isActive,
    };

    return NextResponse.json(safeUser);
  } catch (error: any) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}

