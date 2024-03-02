const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello There!');
});

app.get('/widgets/:id', (req, res) => {
  console.log(`Requested ID : ${req.params.id}`);
  console.log(`Query params : ${JSON.stringify(req.query)}`);
  
  res.status(200).json({
    id: req.params.id,
    queryParams: req.query,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});