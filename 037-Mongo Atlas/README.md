# MongoDB Atlas
Atlas is a fully managed cloud database provider for MongoDB.  You can create a free account (no credit card) at the [Atlas Cloud page](https://www.mongodb.com/cloud/atlas).

## General
When you first create an account you'll be prompted to create an Organization and a Project.  Both of these can be renamed at a later date if desired.

Atlas clusters can be created in Amazon Web Services, Google Cloud, or Microsoft Azure with many flexible options like region, availability zone, cluster size, etc.  If you're developing a project in AWS, you'd probably want to create your Atlas cluster in AWS but it is not a requirement.

## Configuration
After creating your cluster, you'll need do a bit of security configuration to be able to access it.  

### Network Access
By default, nothing can access your Atlas cluster and you need to add a list of IP addresses that are allowed.  Under the "Security" menu, choose "Network Access".  While generally a bad idea, security-wise, for a quick example we can allow access from anywhere by specifying `0.0.0.0/0` as the "Access List Entry".  It's always a good idea to include a comment on what the access is granted for and why.

A safer way to allow access when using DHCP, though a bit more cumbersome, is to find your current external IP address and add it as `current.IP.address/32`.  Keep in mind that your external IP address is likely to change so what works right now might not work in a few hours or days.

### User Accounts
You'll also need to create a user account that has access to the database so you and/or your application can work with it.  Under the "Security" menu, choose "Database Access".  Select "Add New Database User" and configure a "Password" type authentication for testing.  We're going to create a generic administrative account for the purposes of demonstration but you should always go the path of "least permission" and limit each account to *ONLY* the permissions it absolutely requires.

### Database and Collections
Now that we have network access and a user account to work with, access the "Clusters" page and choose "Collections" from the cluster you previously created.  Since your cluster is currently empty, you'll need to create both a database and a collection in it.  Choose "Add My Own Data" and enter a database name and collection name.  After a short wait, you should have a new database and a new (empty) collection.

Insert a single document into your new collection so we have something to query.  You can do this by clicking on your collection name, then on "INSERT DOCUMENT" at the top right.  At this point you can browser and query your collection through the web UI, but of course we want to access it with the CLI and programmatically.

### Connecting
Click on the "Clusters" menu item then choose the "CONNECT" button in your cluster details.  This will provide options for connecting via the Mongo shell, your application, or Compass.  The instructions in the UI are quite clear and easy to follow so I won't belabor them here - but try them out.

## Mongo Realm
[Mongo Realm](https://www.mongodb.com/realm) (formerly known as "Stitch") is a serverless type offering that allows users to create APIs that interact easily with Mongo databases hosted in Atlas.  If you have the need for a lightweight API or mobile application that is primarily centered around interacting with and managing data in Atlas, it might be a good option to explore.