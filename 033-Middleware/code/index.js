'use strict';

const bodyParser = require('body-parser')
const kraken = require('kraken-js');
const app = require('express')();
const options = {
  onconfig: (config, next) => {
      // Setup/Init code goes here
      console.log(JSON.stringify(config.get('database')));

      next(null, config);
  }
  /* more options are documented in the README */
};
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(kraken(options));

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});