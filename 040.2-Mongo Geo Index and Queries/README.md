# MongoDB Geospatial Indexes and Queries

## Evaluate Our Data Structures
MongoDB requires a specific data format in order to accurately create a Geo index.  Specifically, the data must be in GeoJSON format or as legacy latitude and longitude pairs as two separate items in an array.  It is **very important to note** that if you use the array approach, the data must be provided in `longitude`, `latitude` order.  This is the opposite of how we normally think of this type of data and is a common stumbling block for new users.

## Loading Data
There are three files provided for this lesson : 
1. [people-data-1.json](data/people-data-1.json)
2. [people-data-2.json](data/people-data-2.json)
3. [hobbies-data.json](data/hobbies-data.json)

`people-data-1.json` and `people-data-2.json` contain mocked data about non-existent people and includes their location in the `latitude` and `longitude` fields.  They also contain an array of "hobbies" with just the name of the hobby.  `hobbies-data.json` contains lookup data that provides the description of these hobbies.  Let's not concern ourselves with hobbies for now and focus on the location data.  `hobbies-data.json` is only provided for example queries that involve lookups if time permits.

First, we need to load our data so we can query it.  We've done this in the past and will follow the exact same process.  The only difference is that we have two JSON files that contain sets of data that need to be loaded into the same Mongo collection.  We can simply run our `mongo-import` once against each file, specifying the same collection parameter, to load both of them to the same collection.

**Take note that you must have MongoDB running before continuing**

`./mongoimport --file people-data-1.json --collection people --db arca --jsonArray`
`./mongoimport --file people-data-2.json --collection people --db arca --jsonArray`


## Reformatting Our Data
The "people" data contains two separate fields for latitude and longitude.  However, Mongo geo indexes require it to be either in GeoJSON format or in an array that contains both fields.  So, we need to reformat our data to adhere to one of these standards before we can index it.  I'm going to choose the array format for simplicity in this lesson.

We've already looked at Mongo aggregation pipelines.  What we haven't covered is that in newer versions (v4.2+) you can apply an aggregation pipeline in `$updateOne` and `$updateMany` operations.  We can make use of this to reformat every document to combine the `latitude` and `longitude` fields into a suitable array that contains both **IN LONGITUDE, LATITUDE** order.  This order is a bit odd but extremely important.

```javascript
`db.getCollection('people').updateMany({}, [{"$set": {"coords": ["$longitude", "$latitude"]}}])`
```

Now all of our documents should have a `coords` array that contains our longitude and latitude in that important order.

## Creating the Index
Once our data is in an acceptable format, we can create an index like we've already seen but specify the type as `2dsphere`.  In this example, I'm assuming that our documents have a property named `coords` that contains an array with our coordinates in `longitude`, `latitude` order.

`db.people.createIndex({coords: "2dsphere"})`

## Geospatial Operators
In order to query our geospatial index we need to learn a few new operators that are designed specifically to work with geo data.  All of these will work with `2dsphere` indexes but they may or may not work with a `2d` type index - review the [MongoDB Geospatial Documentation](https://www.mongodb.com/docs/manual/geospatial-queries/#geospatial-query-operators) for support if you choose to use a `2d` index.

1. `$geoIntersects` - Selects geometries that intersect with a GeoJSON geometry.
2. `$geoWithin` - Selects geometries within a bounding GeoJSON geometry. This is our most common operator for finding things within a certain geographical area.
3. `$near` - Returns geospatial objects in proximity to a point.  This is convenient for querying data where the document is "near" a provided point along with being able to specify how near we care about such as "all documents within X kilometers of a provided point".
4. `$nearSphere` - Returns geospatial objects in proximity to a point on a sphere.

## Geospatial Queries 
With our Geo index created, we can start executing Geo queries against it using our new geospatial operators.

### Searching Within an Area
We'll start by defining a geographical area and querying for documents that contain data that falls within that area.  Obviously, `$geoWithin` is the best operator for this type of query.  We can define a geo polygon that will form the "area" that we want to search within.  For this example, I've roughly chosen the latitude/longitude coordinates that bound the state of Arkansas by picking points on the northwest, northeast, southeast, and southwest corners of the state.  Take note that with only four points the polygon will not cover the state with much accuracy since straight lines will be drawn between each of the chosen points.  However, it's good enough for example purposes.  These coordinates are : 

1. 36.526802, -94.654032 (northwest)
2. 36.472899, -90.019774 (northeast)
3. 33.033187, -91.022933 (southeast)
4. 32.942091, -94.114652 (southwest)

With this information we can create our `$geoWithin` query using a polygon : 
```javascript
db.getCollection('people').find({
     coords: {
       $geoWithin: {
          $polygon: 
             [ [ -94.654032, 36.526802 ], [ -90.019774, 36.472899 ], 
              [ -91.022933, 33.033187 ], [ -94.114652, 32.942091 ] ] 
       }
     }
   });
```

If we don't need a specific shaped polygon, we can also search using a circle (sphere) by specifying the [`$center`](https://www.mongodb.com/docs/v5.0/reference/operator/query/center/) of the circle and the radius of the circle.  This has a similar outcome to using `$near` because it applies a circle to the earth of a certain diameter and returns documents that fall within it.  However, extra care must be taken because the "units" that define are distance are ambiguous.  The documentation linked above indicates that the distance is "as measured in the units used by the coordinate system" so you need to know the unit of your coordinate system.  With the basic latitude/longitude coordinates we're using for these examples, that unit should be radians.

```javascript
db.getCollection('people').find({
     coords: {
       $geoWithin: {
          $center: 
             [ [-92.329080, 34.747459], 2] 
       }
     }
   })
```

While `$center` is helpful for 2d planes, we can use [`$centerSphere`](https://www.mongodb.com/docs/v5.0/reference/operator/query/centerSphere/) to get a more accurate calculation on spherical coordinate systems like the earth.  Another helpful bit about `$centerSphere` is that it always uses radian units.  The example below will find all documents that have coordinates within 100 miles of the Little Rock Zoo, calculated into radian units.

```javascript
db.getCollection('people').find({
     coords: {
       $geoWithin: {
          $centerSphere: 
             [ [-92.329080, 34.747459], 100 / 3963.2] 
       }
     }
   })
```

That is a bit easier to read, but if we switch to [GeoJSON](https://geojson.org/) structures we can write it with even better units... metric!  Exploration of the [GeoJSON](https://geojson.org/) format is left as an exercise for the reader but we will make use of it by specifying the [`$geometry`](https://www.mongodb.com/docs/v5.0/reference/operator/query/geometry/) operator that accepts GeoJSON structures.  Below, we write a query to do effectively the same operations as above but using the GeoJSON structure to query documents within a 2Dsphere using meters as our units.

```javascript
db.getCollection('people').find({
     coords: {
       $nearSphere: {
          $geometry: {
              type: "Point",
              coordinates: [-92.329080, 34.747459]
          },
          $minDistance: 0,
          $maxDistance: 15000
       }
     }
   })
```

This query chooses a "Point" at [-92.329080, 34.747459] then queries documents that are a minimum of 0 meters and a maximum of 15,000 meters from that point.