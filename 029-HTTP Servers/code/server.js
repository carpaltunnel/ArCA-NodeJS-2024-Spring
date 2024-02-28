const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {
  console.log(`Got ${request.method} request for ${request.url}`);
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  response.end('Hello there');
});

server.listen(8080);
console.log('Server listening on port 8080...');