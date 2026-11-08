import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'living_heritage_sacred_secret_key_2026_ebin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName, role = 'contributor', affiliation, bio } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: 'Full name, email, and password are required' },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await usersCollection.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { message: 'A contributor with this email address is already registered' },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();

    const newUser = {
      email: normalizedEmail,
      passwordHash,
      fullName: fullName.trim(),
      role: role || 'contributor',
      affiliation: affiliation || '',
      bio: bio || '',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    const result = await usersCollection.insertOne(newUser);
    const userId = result.insertedId.toString();

    const token = jwt.sign(
      { sub: userId, email: normalizedEmail, role: newUser.role, fullName: newUser.fullName },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    const safeUser = {
      _id: userId,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      affiliation: newUser.affiliation,
      bio: newUser.bio,
      avatarUrl: newUser.avatarUrl,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json({
      access_token: token,
      token,
      user: safeUser,
    });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { message: error.message || 'Registration failed' },
      { status: 500 },
    );
  }
}

