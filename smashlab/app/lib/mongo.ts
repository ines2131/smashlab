import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongo: { client: MongoClient; db: Db } | undefined;
}

export async function getDb() {
  if (global._mongo) return global._mongo.db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  global._mongo = { client, db };
  return db;
}
