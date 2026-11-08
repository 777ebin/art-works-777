import { MongoClient, Db } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority';
const dbName = process.env.DB_NAME || 'art-works';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}
