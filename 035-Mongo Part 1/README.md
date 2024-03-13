# MongoDB
[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers both on-prem and in the cloud.

Traditional Relational Database Management Systems (RDBMS) structure data in "tables" with well defined "columns" or fields.  Mongo is a document store that effectively stores JSON documents so we can treat our data like a Javascript object - adding or removing properties as needed without affect the entire collection.  Queries are also just JSON so they're easy to create programmatically.

In a production environment you would have a dedicated MongoDB cluster, or use a cloud provider like Mongo Atlas.  For development purposes we'll simply run the database locally

## Terminology
1. Collection - The equivalent of a "table" in a relational database
2. Documents - The equivalent of a "record" in a relational database
3. Query - The text we write to tell the database what to do


## Installation
You can download the free community version of MongoDB here : [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
I normally just download the zip package, extract it to a convenient location, and run it manually from there.

Before we start the server, create a location to store the database files.  Again, for simple local development I usually just create a "data" folder in the mongodb/bin folder to it's easy to access.

Now, start the server with `./mongod --dbpath /path/to/my/data`.  For me, that's `./mongod --dbpath ./data`

**WARNING** : The default configuration does not enforce any authentication or authorization restrictions.  Anyone that can connect to your machine can do anything to your database.  This is fine for local development on your private network but should never be done in a "real" environment or exposed to the internet.

Now, if you execute `mongo` it should automatically connect to your local server instance and give you a CLI to interact with the database.

You can also download the [Mongo Compass UI](https://www.mongodb.com/products/compass) to make building queries and reviewing data easier.

## Basic Setup
Mongo is very "helpful" when running in local development mode.  Rather than requiring you to explicitly create databases and collections, it will simply create the entities when you first use them.  See the example below which will create a new database named `myDBname` and then create a new collection named `testCollection` when we first try to insert a document into it.

1. `show databases;` or `show dbs;`
2. `use myDBname;`
3. `db.testCollection.insertOne({"test": true});`
4. `show collections;`

Easy, right?  But, keep in mind that a production database will require authentication and will limit what you are allowed to do for security.  Automatic collection creation is often disabled in production so they may need to be created by another process such as `db.createCollection()`.

## CRUD
### Insert
1. `insertOne({})`
2. `insertMany([])`

Every document requires a unique `_id` field.  If you don't specify one then it will be generated automatically.

### Query
1. `find(filter, projection)`
2. `findOne(filter, projection)`

`find()` and `findOne()` both accept a JSON object that defines the query logic.  We'll discuss operators below.
### Update
1. `updateOne(filter, update, options)`
2. `updateMany(filter, update, options)`
3. `replaceOne(filter, update, options)`

### Delete
1. `deleteOne(filter)`
2. `deleteMany(filter)`


## Query Structure
We saw above that the structure of the "find" command is `find(filter, projection)`.  In this case, `filter` is our search/match query and `projection` is an optional object that defines what fields to return in the documents that matched `filter`.  If `projection` is not specified, all fields are returned by default.

So, to return all documents in the widgets collection where "color = blue" we could execute : 
`db.widgets.find({ "color": { $eq: "blue"} });`
Though, there is a simpler way to do basic "equal" checks.  Just specify the field name and value : 
`db.widgets.find({ "color": "blue" });`

We can specify multiple equality checks at once by comma separating them.  These will be understood to be logically "AND"d so the query will match documents where each evaluates as true : 
`db.widgets.find({ "color": "blue", "name": "widget1", "size": 10 });`

In more complex queries you can use the `$and` operator to apply a logical "AND" to multiple query parameters.

The "filter" structure is the same for every command - find, update, delete, and replace.  So, once you master it you can use it the same everywhere.

### Nested Documents and Arrays
So far we've looked at querying based on properties at the top level of the document but that's not terribly realistic.  Since Mongo supports embedded objects, we need to be able to query on their properties as well.  Fortunately, Mongo uses dot notation, just like Javascript.

Given the document : 
```json
{
  "name": "widget",
  "physicalProperties": {
    "color": "green",
    "weight": 10
  },
  "tags": ["fun", "cheap", "widgety"]
}
```

We can query documents with a color of "green" with dot notation : 
`db.widgets.find({ "physicalProperties.color": "green" });`

Similarly, we can search for all documents where the "tags" array contains the value "fun" with a simple equality operation :
`db.widgets.find({ "tags": "fun" });`
When Mongo encounters an array while executing this query, it will inspect the array to check if any of the elements match.

## Operators
Comparison operators :
1. $eq
2. $gt
3. $gte
4. $in
5. $lt
6. $lte
7. $ne
8. $nin

You can see they align to our Javascript comparison operators.  And, we also have logic operators : 
1. $and
2. $not
3. $nor
4. $or

Element operators : 
1. $exists
2. $type

Evaluation operators : 
1. $mod
2. $regex
3. $text
4. $where (Javascript expression)

Array Operators : 
1. $all
2. $elemMatch
3. $size

Operators can be mixed and nested in many ways that are similar to Javascript logic.  Take the following Javascript statement : 
```javascript
if ((widget.color === 'blue' && widget.size > 10) || (widget.color === 'green' && widget.size <= 5))
```

This could be translated into a Mongo query like so : 
```json
{
  $or: [
    { $and: [{ "color": { $eq: "blue" } }, { "size": { $gt: 10 } }] },
    { $and: [{ "color": { $eq: "green" } }, { "size": { $lte: 5 } }] }
  ]
}
```
The braces can get out of hand pretty quickly so it's helpful to have a good JSON editor.

## IDEs
There are many IDEs for working with MongoDB.  Below are three that I've tried and my thoughts on them.

### Mongo Compass
[Compass](https://www.mongodb.com/products/compass) is the most user friendly and full featured IDE.  It was created by MongoDB so you can expect excellent feature support and integration.  

[Robo 3T](https://robomongo.org/) is a lightweight third party IDE that is much more basic than Compass, but it generally does everything I need it to do.

The [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode) allows you to setup a connection and do basic exploration/querying but it is very basic.  If you never want to leave VS Code and are okay with only reading JSON with no graphical enhancements... this might be for you.

## MongoDB Data Types (BSON)
We're already familiar with Javascript primitive types like string, number, and boolean but BSON (and therefore Mongo) supports [many more types](https://www.mongodb.com/docs/v4.4/reference/operator/query/type/#available-types).  The type for our document properties can be set when using an IDE like Compass but we can also specify the type in our queries.  To do this, we simply wrap the property with parentheses and the correct type name like so.

```json
db.collection.insertOne({
  "calculation": NumberLong("92873498723498723"),
  "orderNumber": NumberInt("3"),
  "weight": NumberDecimal("23.49"),
  "available": Boolean(true)
});
```

You *generally* do not need to do this since Mongo will choose the appropriate type based on the value, as we've seen with strings, numbers, booleans, and so on.  However, there may be times where you need to specify the type to ensure the data is stored correctly and accurately.  In my experience, this is most likely to be required when working with specific types of numbers like in the example above.

The full list of supported types can be found in the documentation but the list below covers the most common ones : 
1. String
2. Object
3. Array
4. Date
5. Timestamp
6. Boolean
7. Null
8. Number
   1. Double
   2. 32 Bit Integer
   3. 64 Bit Integer
   4. Long
   5. Decimal