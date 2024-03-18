# MongoDB Integration with NodeJS
MongoDB provides a NodeJS driver for working with it.  It's easy to install, use, and quite performant.  It does one thing and does it well - executes queries on MongoDB from NodeJS applications.

## ORM / ODM (Object Relational/Document Mapping) Tools
ORM (for relational) and ODM (for document) tools provide a way to automagically map data from a database into Objects in your language of choice.  They can also provide built in schemas, validation, and other niceties.  While these can provide an easy solution out of the box they can also impose limitations and performance bottlenecks that you need to be aware of.  For these reasons, I generally do not recommend them for "enterprise" applications.  However, much has changed since the last time I had to do in depth performance analysis (and remove an ODM to revert to native MongoDB for performance reasons) so you should review their pros, cons, and performance as they exist at the time of reading.  For that reason I won't make the blanket statement that "ODMs are bad!" - it all depends on which one you choose, what your use case is, the performance of the ODM in question, and whether your usage fits the ODMs approach.

Due to my personal experiences with ODMs, I'm going to avoid them in this lesson and we'll work with the MongoDB driver directly.

## Install
`npm install mongodb` - Simple enough.

## Configuration and Usage
[Full Documentation](https://docs.mongodb.com/drivers/node/current/)

```javascript
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
```


## CRUD
### Create
`insertOne()` and `insertMany()` function pretty much the same as the MongoDB CLI commands.  They return a promise and will resolve with a "result" object that provides information about the result of the query.  Of particular note is the `insertedCount` and maybe `insertedId` properties.
```javascript
const insertResult = await db.collection(COLLECTION).insertOne({
    id: 0,
    name: 'widget1',
    color: 'blue',
    size: 15,
    inStock: true,
    tags: ['tag1', 'tag2', 'tag3']
  });
console.log(`Inserted ${insertResult.insertedCount} record with ID ${insertResult.insertedId}`);

const multiInsertResult = await db.collection(COLLECTION).insertMany([ { a: true}, { b: false } ]);
console.log(`Inserted ${multiInsertResult.insertedCount} records`);
```

### Read
The `find()` and `findOne()` functions take two parameters.  The first is your filter and the second is "options".  The option parameter is an object that can contain your "sort" and "projection" decisions for the query.  The following will query all documents where "color = blue", sorted ascending by name, and remove the `_id` field from the response (via the projection).

```javascript
 db.collection('testCollection').find({ color: 'blue' }, {
   { sort: { name: 1 } },
   { projection: { _id: 0 } }
 });
```

While `findOne()` will natively return an object, `find()` can return multiple documents and therefore returns a cursor.  You can iterate through the results in the following ways : 
1. `next()`
2. `toArray()`
3. `forEach()`

Often when you find yourself querying multiple documents it's for a GET endpoint that is expected to return an array.  In these cases, simply returning `result.toArray()` is the fastest and easiest approach.

### Update / Replace
`updateOne()`, `updateMany()`, and `replaceOne()`, just like the CLI, govern our update logic.  There really isn't much difference from the CLI so I won't cover the same topics again.  One option parameter that we should cover is `upsert`.  If `upsert: true` is specified in the options parameter then an upsert operation will occur.  An "upsert" updates a document if it exists (based on the filter) or inserts a new document if it does not.  I don't find myself using upserts very often but they are convenient if you need "update if exists, otherwise insert" logic since you don't have to do a separate query to determine if the document needs to be updated or inserted.

```javascript
db.collection(COLLECTION).updateOne({ id: 0 }, { $set: { color: 'red' } })
```

The result of these functions will contain a `modifiedCount` property which can be helpful for determining if you updated the number of documents you expected to.  For example, if you attempt to update a document but your filter doesn't match an existing document, you haven't truly updated anything and therefore you might need to throw an error.

If you need to use the document that was updated/replaced you can use `findOneAndUpdate()` or `findOneAndReplace()`.  They function the same as their simpler counterparts but they can return the original or updated document.  In the options parameter, add the `returnDocument` property and set it to `before` or `after`.  The main time I find myself using this is if I'm updating a document but need to know what the previous value of the fields I'm overwriting are.  In this scenario, I do a `findOneAndUpdate(filter, update, { returnDocument: 'before' })` to have the original document, before the update occurred, returned to my code.

### Delete
`deleteOne()` and `deleteMany()` are also effectively the same as the CLI versions.  And, just like the update operations, there is a `findOneAndDelete()` function that you can use to delete a document but return what its value was.  Also like the update functions, the result will have a `deletedCount` property you can use to determine if you deleted the number you intended to.

```javascript
await db.collection(COLLECTION).deleteOne({ id: 0 });
```

## Read Preference and Write Concern
Read preference and write concern are two settings you can apply to your queries in a clustered environment to indicate how much you really care about them.  Read preference indicates which database cluster node is acceptable to read from.  Your options are Primary, Secondary, Primary Preferred, Secondary Preferred, and Nearest.  For the fastest response you can use Nearest.  Primary is the default but in demanding applications where "eventually consistent" data is acceptable you could get a performance boost by using one of the others... Nearest for example.

## Express
In the lesson on Express, we talked about how to create resources that will be initialized at startup.  Let's do that with our Mongo connection in an Express project.

## Pooling
Connection pooling is an approach where we create one or multiple database connections in a "pool" and keep them alive.  Then, whenever a part of our application needs a connection it simply requests one from the pool.  Since these connections are kept alive, we avoid the initial overhead of establishing a new connection every time we need one, plus destroying them when we're done with them.  This can also reduce load on the database itself since it isn't constantly having to create and destroy connections on the server side.  However, it does have the additional (small) load of having to maintain connections that may not actually be in use at any given time.

The Mongo driver supports connection pooling by default using the `poolSize` parameter : 
```javascript
MongoClient.connect('mongodb://localhost:27017/test', { poolSize: 10 });
```