# MongoDB Indexes
> Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists for a query, MongoDB can use the index to limit the number of documents it must inspect.

If you're familiar with the concept of an index in a relational database, the same general concepts are true in MongoDB.

Indexes function like a lookup list.  They store a small portion of a document (the indexed field(s)) in an easy to traverse format and act as a pointer or lookup to the full document that is being requested.  The indexed fields are stored ordered which allows for efficient equality and ranged queries.  Additionally, this ordering can be used for Mongo to return sorted results based on the document position in the index.  Because of the inherent index ordering, the query results do not need to be sorted in memory which has the benefit of effectively skipping the sort cost.

We've talked about the `_id` field that Mongo automatically adds if you don't specify it.  Mongo creates a unique index on the `_id` field at collection creation time to ensure that no two documents will ever have the same `_id`.  **NOTE** : If you do not use `_id` as the shard key in a sharded environment, you must ensure the uniqueness of it to prevent errors.  Again, most commonly, this is done with an auto-generated ObjectID by Mongo.

## Query Planner / Explain Plan
If you're familiar with an "explain plan" in Oracle or other traditional RDBMS's, you'll find the same functionality in Mongo.  The query optimizer analyzes queries and chooses, then caches, the most efficient way to execute it.  Obviously there's a lot more to it, but we're going to stick with fairly simple queries (for now) and analyze them simply so that you know how to go about it when you need to research non-performant queries in the future.

To view the explain plan that the query planner decides on, execute your query as normal but append a `.explain()` call to the end.  This indicates that you're not intending to execute the query, but rather want to know what the query planner would choose to do if you were to execute it.  An explain plan for simple query on an `id` field with no index defined is shown below.  Take note of the "COLLSCAN" stage.
```json
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "widgets.widgets",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "id" : {
                "$eq" : "test"
            }
        },
        "queryHash" : "6DAB46EC",
        "planCacheKey" : "6DAB46EC",
        "winningPlan" : {
            "stage" : "COLLSCAN",
            "filter" : {
                "id" : {
                    "$eq" : "test"
                }
            },
            "direction" : "forward"
        },
        "rejectedPlans" : []
    },
    "ok" : 1.0
}
```

However, if we create an index on the `id` field then we'll see different results : 
```json
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "widgets.widgets",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "id" : {
                "$eq" : "test"
            }
        },
        "queryHash" : "6DAB46EC",
        "planCacheKey" : "801B9D84",
        "winningPlan" : {
            "stage" : "FETCH",
            "inputStage" : {
                "stage" : "IXSCAN",
                "keyPattern" : {
                    "id" : 1.0
                },
                "indexName" : "id_1",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "id" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : false,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "id" : [ 
                        "[\"test\", \"test\"]"
                    ]
                }
            }
        },
        "rejectedPlans" : []
    },
    "ok" : 1.0
}
```

You can see that the winning plan changes from a full collection scan to a "FETCH/IXSCAN".  Indexes will almost always result in a faster query execution time if you apply them correctly.

## Types
1. Single field - A single field, with sort order
2. Compound - Multiple fields, with sort order on each
3. Multikey (array) - See the "Multikey Indexes (Arrays) section below for more information and warnings.
4. Geospatial - 2d planar or 2dsphere indexes
5. Text - Designed to support string searching of documents.  You can only use the `$text` operator on Text indexes.  Note that common unimportant words like "the", "a", and "or" are **not** stored in the index since they rarely provide value.
6. Hashed - A hashed index stores the hash of the value of a field.  This provides a more random distribution of values but **only** supports equality matches.  EG : `hash(queryValue) === hash(indexValue)`
   
## Index Properties
There are multiple properties (options) that can be applied to an index to determine how it functions to match your requirements.
1. Unique - Defines a unique index.  Mongo will reject any inserts or updates that would cause a duplicate on the field(s) defined in a unique index.
2. Partial - Defines an index that will only include documents that meet specified filter expressions.  Similar to a Sparse index, this option can reduce index size by ignoring documents that do not contain the field/values that you want to index on.
3. Sparse - Similar to Partial indexes, Sparse will only index documents that have the specified field.  This is a simple `$exists` check rather than a value check that Partial indexes provide.  In Mongo v3.2 or later, partial indexes are preferred over sparse indexes.
4. TTL (Time To Live) - TTL indexes allow you to automatically delete documents after a specified amount of time.  These are extremely useful in situations where you only want to maintain data for X amount of time.  Of course, they can only be applied to Date type fields.  Expiration time is specified in seconds.
5. Hidden (as of v4.4) - Hidden indexes are not visible to the query planner and will not be used under any circumstance.  The point of a Hidden index is to evaluate the potential impact of removing an index without having to actually delete it.  The benefit here is that instead of dropping an index, seeing a negative impact, then recreating it - you can "hide" it and if the impact is negative you can "unhide" it without the cost of recreating it.

## Creating
The syntax to create an index is `db.collectionName.createIndex(<index-definition>, <options>)`.  The index definition sets the indexed field(s) as well as the order.  For example `createIndex({ name: 1 })` would create an ascending index on the `name` field.  The ordering is defined the same way as we saw on the `sort()` operation - `1` for ascending, `-1` for descending.  However, sort order doesn't really matter when indexing a single field because Mongo can traverse it in either direction as needed.

A "compound index" is an index that uses multiple fields.  One interesting thing to note is that each field can have a different sort order.  For example, you could create a compound index on the fields `name` and `weight` where `name` is sorted ascending and `weight` is sorted descending.  You would get an index of documents sorted ascending by `name` and for documents that share the same name, they would be sorted descending by `weight`.  That type of index would be created like : `createIndex({ name: 1, weight: -1 })`

### Examples
```javascript
// Unique index on "id" field
createIndex({ id: 1}, { unique: true });

// Partial index on "name" field where "weight" > 10
createIndex({ name: 1 }, { partialFilterExpression: { weight: { $gt: 10 } } });

// Partial index on "name" field where "name" field exists (equivalent to a "sparse" index)
createIndex({ name: 1 }, { partialFilterExpression: { name: { $exists: true } } });

// Sparse index on "name" field
createIndex({ name: 1 }, { sparse: true });

// TTL index on "createdDate" that will remove documents after 12 hours (12 * 60 * 60 seconds)
createIndex({ createdDate: 1 }, { expireAfterSeconds: 43200 })

// Hidden index on "name" field
createIndex({ name: 1 }, { hidden: true });
```

## Listing
The existing indexes on a collection can be retrieved with `db.collectionName.getIndexes()` on the the Mongo shell/CLI.  This will return an array that contains an object for each defined index and the field(s) that are indexed, along with the sort definition.  The `name` property of the indexes may be the autogenerated name or the explicitly defined name (see "Index Names").  

## Important Considerations
A very important thing to take note of is that, in order to use an index, the index sort fields and direction must match the fields and sort direction of the query **and** be in the same order.  If any of these are mismatched then a full collection scan will be performed.

However, an existing compound index can be used if your query uses a "prefix" of that query.  For example, if you create the aforementioned index on `{ name: 1, weight: -1 }`, a query on `name` sorted ascending **will** use this index since `name` is the first property of the index and the sort order matches.  But, if you were to query on `weight` alone, the index can not be used.

Another important thing to keep in mind is that, for maximum performance, your index should fit into memory (RAM).  Indexes derive their benefits from providing a quick lookup and you will seriously degrade that benefit if Mongo has to page to disk in order to work with the index.  Of course, you also are loading the documents in the working set so you should have enough memory to have both the index and working set in memory to avoid performance impacts from paging.

## Multikey Indexes (Arrays)
When an index is created on an array field, a separate index entry is created for each element of the array.  This allows for quick and easy querying on the array elements but comes at the cost of a larger index.  If you're creating an index on an array that can have a large number of items, performance should be evaluated to ensure that the index does not have a negative impact.  Note that Mongo automatically determines if the an indexed field is an array and chooses to create a multikey index - no need to explicitly define it as multikey.


## Index Names
The default name for an index is the name of each indexed key, an indication of the sort direction, concatenated with an underscore.  So, the index name of our example of an index on name, ascending, above would be `name_1`.  However, you can define a custom name for indexes and it can be very helpful for other developers if you do as it can indicate the purpose that it was added.  To do this, simply add a `name` property to the `options` object like so : 
`db.collectionName.createIndex({ name: 1 }, { name: "Index for ascending name queries" })`

It may be a bit confusing in the example above because we're indexing the `name` field, then specifying a custom name property for it, but you get the idea.  Note that you **can not** rename an index after it has been created.  If you really need to rename it, you must drop and recreate it with a new name.

## Covered Queries
A "covered" query is a query that only includes the fields of the index in the projection.  In the examples above of the index on `name` and `weight`, a covered query would be one that queries the collection and only requests `name` and `weight` to be returned in the projection.  In the case of a covered query, Mongo doesn't need to refer to the collection at all and only uses the index to return the result.  These are probably going to be the fastest queries you will get so it can be extremely beneficial to optimize for covered queries for your most heavily used requests.

## Index Restrictions
There are a few restictions to indexes that can be created in MongoDB : 
1. The maximum number of indexes for a collection is 64
2.  The index name is limited to 127 bytes in MongoDB 4.2 and earlier.  Newer compatibility modes can remove that limit.
3. A maximum of 32 fields are allowed in a compound index
4. Queries can not combine $text and geospatial indexes
5. All general operations will fail if a document contains a field that exceeds the index key limit

There are a few other limitations, but we're not likely to run into them so I'll leave it at that for now.  


## What to Index?
Now that we know what indexes are and how to create them, how do we decide what should be indexed?  Of course, this will vary by project and application, but one of the best ways to decide what fields to index is to review the queries your application is executing.  Are you constantly querying by an `id` field to find specific documents?  Create an index on `id`.  Do you often need to do text searches on fields that contain large strings?  A text index would probably be helpful.

While I can't prescribe the exact indexes any project will benefit from, reviewing all of your queries and running an explain plan on them should tell you almost everything you need to know.  Where possible, avoid full collection scans and ensure that your queries utilize an index.  For the absolute fastest queries, see if you can create an index that will allow you to make "covered queries".
