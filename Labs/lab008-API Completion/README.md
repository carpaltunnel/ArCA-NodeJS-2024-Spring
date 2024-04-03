# Lab #8 - API Continued
Continuing from lab #7, add everything to make it a "real" API with MongoDB integration, linting, validation, ~~and unit tests.~~

1. Create a database class as a global singleton to maintain a MongoDB connection pool.
2. Replace the memory mocks in the Model with a reference to the new database class.
3. Create a JSON schema to describe the input and output of the application.
4. Use the JSON schema to validate user input.  Return an appropriate HTTP status code and the validation failure message when user input is invalid.
5. Create an OpenAPI spec that documents your API and covers :
   1. All endpoints
   2. Request bodies
   3. Responses
   4. Parameters
8. Add linting using the airbnb-base configuration
9. ~~Add unit tests.  You have two options to deal with database integration : ~~
   1.  ~~Create setup/seed scripts with sample data that run before your tests to prepare the database for unit tests.  You can assume MongoDB will be running locally.~~
   2.  ~~Eliminate MongoDB from the unit tests by using Sinon to stub the calls to your Model and do assertions on the Sinon spies to ensure they are called correctly.~~

