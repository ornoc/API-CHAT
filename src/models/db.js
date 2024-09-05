const { MongoClient, ObjectId } = require('mongodb');
let db = null;

async function connect() {
  if (db) return db;
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  return db;
}

exports.findAll = async (collection) => {
  const db = await connect();
  return await db.collection(collection).find().toArray();
};

exports.findOne = async (collection, _id) => {
  const db = await connect();
  return await db.collection(collection).findOne({ _id: new ObjectId(_id) });
};
