const { MongoClient } = require('mongodb');

const COLLECTION = 'testCollection';
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CRUD = async () => {
  await client.connect();
  const db = client.db('test');
  const insertResult = await db.collection(COLLECTION).insertOne({
    id: 0,
    name: 'widget1',
    color: 'blue',
    size: 15,
    inStock: true,
    tags: ['tag1', 'tag2', 'tag3']
  });
  console.log(`Inserted ${insertResult.insertedCount} record`);

  let queryResult = await db.collection(COLLECTION).findOne({ id: 0}, { projection: { _id: 0 } });
  console.log(queryResult);

  const updateResult = await db.collection(COLLECTION).updateOne({ id: 0 }, { $set: { color: 'red' } })
  console.log(`Updated ${updateResult.modifiedCount} record`);

  queryResult = await db.collection(COLLECTION).findOne({ id: 0}, { projection: { _id: 0 } });
  console.log(queryResult);

  const deleteResult = await db.collection(COLLECTION).deleteOne({ id: 0 });
  console.log(`Deleted ${deleteResult.deletedCount} record`);


  process.exit(0);
};

CRUD();