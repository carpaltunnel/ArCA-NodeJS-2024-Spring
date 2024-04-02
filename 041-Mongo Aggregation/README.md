# Mongo Aggregation
Aggregation in MongoDB is a way to perform complex operations in a staged, efficient manner.  In this lesson we'll look at the different aggregation operators and how to combine them into multiple steps to accomplish the logic we need.

## Aggregation Pipeline
The aggregation pipeline is the list of "steps" or stages that are applied incrementally to reach the desired conclusion.  Each stage receives input documents, transforms them, and outputs the result to the next stage (or as a result set).  The ability to execute multiple stages, in order, and transform the documents as they pass through the stages makes aggregation a very powerful tool

## Aggregation Operators / Stages
Each aggregation operator can be used multiple times in a pipeline with the exception of `$out`, `$merge`, and `$geoNear`.  For example, you might `$match` as the first step of a pipeline to filter the input documents, `$group` the documents to calculate a sum, then `$match` again to only return documents that exceed a certain sum value.  As usual, there are many stages but we'll only cover some of the most common here.  A list of all stages with descriptions can be found in the [MongoDB Aggregation Pipeline Stages documentation](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/_).


1. `$addFields` (or `$set`) - Add new fields to the documents
2. `$count` - Returns the number of documents at the current stage
3. `$geoNear` - Returns an ordered stream of documents based on the proximity to a geospatial point.
4. `$group` - Groups documents by the specified identifier expression and applies accumulator expressions if specified.
5. `$limit` - Limits the number of documents that pass through the stage
6. `$lookup` - Performs a left outer join to an unsharded collection in the same database to filter in documents from the "joined" collection 
7. `$match` - Filters documents by the match criteria (similar to `find()`, but in a pipeline)
8. `$project` - Modifies each document in the stream by adding or removing fields.  Same as the projection in a `find()`.
9. `$skip` - Similar to limit, but it skips the first X documents rather than limiting the result set to the first X documents.
10. `$sort` - Reorders documents by the specified key.
11. `$unwind` - Deconstructs an array to create one document per array item.  The created documents will contain the same field name as the original array but will be assigned a single value, taken from the array.  **Note** : If a document does not contain the specified field it will not be contained in the result set.

## [Accumulator Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#accumulator-operator)
Accumulator operators are used with `$group` to apply logic to documents that are being grouped.  These share the same general purpose as RDBMS operators used with a `group by` in SQL.  

1. `$addToSet` - Returns an array of *unique* expression values for each group.
2. `$avg` - Returns an average of numerical values. Ignores non-numeric values.
3. `$first` - Returns a value from the first document for each group.
4. `$last` - Returns a value from the last document for each group.
5. `$max` - Returns the maximum value for each group.
6. `$mergeObjects` - Returns a document created by combining the input documents for each group.
7. `$min` - Returns the minimum value for each group.
8. `$push` - Returns an array of expression values for each group (not unique).
9. `$sum` - Returns a sum of numerical values. Ignores non-numeric values.

It's important to note that to refer to the value of a field in an aggregation stage that you need to specify the field name, in quotes, prefixed by the `$` symbol.  For example, to calculate the maximum value of a field named "cost" in an accumulator you would use `maxCost: { $max: "$cost" }`

**NOTE** : The `$group` stage has a limit of 100MB of RAM.  By default, the stage will return an error is this limit is exceeded.  However, the `allowDiskUse` will allow aggregation stages to write to temporary files.

## Chaining Stages
The aggregate pipeline expects an array parameter that defines a list of stages and the order in which they will be executed.  Care should be taken to create stages in the most efficient order.  For example, if your query only needs a subset of the documents in the collection it would be most efficient to filter down to only that subset at the very beginning with a `$match` stage.  Then, you can execute your required logic on that smaller list of documents.

Below is an example of an aggregate query that will calculate the total weight of all red widgets : 
```javascript
db.widgets.aggregate([
    { $match: { color: "red" } },
    { 
        $group: {
            _id: "$color",
            totalWeight: { $sum: "$weight" }
       } 
     }
]);
```
I used the value of the "color" field as the *_id* to group by but it's not particularly important in this use case.  We could've easily just used a constant since we know that we want a single result and have already eliminated all documents that are not red.

## Examples
Calculate the minimum, maximum, and total weight for each color widget with a count of how many widgets were in the group :
```javascript
db.widgets.aggregate([
    { 
        $group: {
            _id: "$color",
            minWeight: { $min: "$weight" },
            maxWeight: { $max: "$weight" },
            totalWeight: { $sum: "$weight" },
            totalWidgets: { $sum: 1 }
       } 
     }
]);
```

Generate a unique list of all widget names :
```javascript
db.widgets.aggregate([
    { 
        $group: {
            _id: "1",
            widgetNames: { $addToSet: "$name" },
            totalWidgets: { $sum: 1 }
       } 
     }
]);
```

Unwind the "tags" array to generate one document per tag :
```javascript
db.widgets.aggregate([
    { $unwind: "$tags" }
]);
```

Assuming a field named "categoryId" in the widgets collection the correlates to a document.id in the "categories" collection, lookup the category details and add them to each document.  Note that the `$lookup` will generate an array so let's then unwind it to get a single category object **AND** preserve documents that do not have a category defined :
```javascript
db.widgets.aggregate([
    { 
        $lookup: {
           from: "categories",
           localField: "categoryId",
           foreignField: "id",
           as: "category"
        }
    },
    {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
    }
]);
```