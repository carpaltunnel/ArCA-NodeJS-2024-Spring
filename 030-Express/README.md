# Express.js
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.  The best part about Express is that it is "unopinionated" so it basically stays out of your way and lets you build your application as you see fit rather than imposing arbitrary rules like many frameworks.

## Install
As usual, we simply install Express with NPM : `npm install express`

## Basic Usage
Basic usage of Express is simple and straightforward.  All you need to do is `require('express')`, create an instance of it (usually called "app"), set the port, and implement your routes.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello There!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

Routes (or paths) are created by calling `app.<method>(path, handler)`.  For example, to handle POSTs to "/posthere" you would do the following :
```javascript
app.post('/posthere', (req, res) => {
  // Handle POST to /posthere
  res.sendStatus(200);
});
```

## Path Parameters
Following our structure for implementing a REST API, we need to be able to specify inline path parameters.  For example, if we want to GET a specific widget, we need to specify its ID in the path like `/widgets/27` to fetch widget #27.  The way to accomplish this in Express is with path parameters.  Path parameters are specified in the route string with a colon like `/widgets/:id`.  Then, they can be accessed with `req.params`.  So, our widget example would work as follows :

```javascript
app.get('/widgets/:id', (req, res) => {
  res.send(`You asked for widget #${req.params.id}`);
});
```

## Query Parameters
We also need to be able to access and utilize HTTP query parameters.  Query parameters are available at `req.query.<param>`.  So, to use a query parameter for "color" we could make a request like `GET /widgets?color=blue` and access it like :
```javascript
app.get('/widgets', (req, res) => {
  res.send(`The "color" query param specified was : ${req.query.color}`);
});
```

Don't forget to check for query parameter existence before using them and assign a default if needed.

## Request Body
In addition to path and query parameters, we obviously need to be able to make use of the request body data for our API to be functional.  For example, to create a new widget we would POST to the `/widgets` endpoint.  We need one more module to make handling the request body easy and efficient - `body-parser`.  Simply `npm install body-parser` then we'll add it to our Express app like so : 

```javascript
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello There!');
});

app.post('/posthere', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

## Express Generator
Though I don't use it myself, I want to mention the [Express Generator](http://expressjs.com/en/starter/generator.html) which will let you quickly create a project skeleton.  For a simple API with no view engine you would execute `express --no-view myApplicationName` and it would generate the directory structure for you.
