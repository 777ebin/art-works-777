const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SAMPLE_ARTS } = require('../dist/seed/seed.data');

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority';

async function seed() {
  console.log('Connecting to MongoDB Atlas at ebin007 / art-works...');
  await mongoose.connect(uri, { dbName: 'art-works', serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db;

  // 1. Seed Arts Collection
  const artsCollection = db.collection('arts');
  console.log(`Updating ${SAMPLE_ARTS.length} cultural records into 'arts' collection...`);
  for (const art of SAMPLE_ARTS) {
    await artsCollection.updateOne(
      { slug: art.slug },
      { $set: { ...art, updatedAt: new Date() } },
      { upsert: true }
    );
  }
  const artCount = await artsCollection.countDocuments();
  console.log(`Success! Total documents in 'arts' collection: ${artCount}`);

  // 2. Seed Curator Ebin in Users Collection
  const usersCollection = db.collection('users');
  console.log("Upserting Curator 'Ebin' into 'users' collection...");
  const passwordHash = await bcrypt.hash('curator123', 10);
  await usersCollection.updateOne(
    { email: 'ebin@livingheritage.org' },
    {
      $set: {
        email: 'ebin@livingheritage.org',
        passwordHash,
        fullName: 'Ebin',
        role: 'admin',
        affiliation: 'Cultural Curator & Heritage Administrator',
        bio: 'Lead Curator of Kerala living traditions, ritual art forms, and indigenous crafts.',
        avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ebin',
        isActive: true,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );
  console.log("Curator 'Ebin' successfully initialized in 'users' collection!");

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
