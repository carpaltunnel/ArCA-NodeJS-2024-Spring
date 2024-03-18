const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const setupAndQuery = async () => {
  await client.connect();
  const db = client.db('test');
  const result = await db.collection('testCollection').findOne();
  console.log(result);
};

setupAndQuery();