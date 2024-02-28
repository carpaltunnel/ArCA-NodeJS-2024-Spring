# HTTP Servers
Now that we know the high points of HTTP, let's build an HTTP server with Node.js.

## http.createServer()
Creating a new HTTP server is extremely simple.  All you need to do is `require()` the HTTP module and call the `createServer()` function to get a new instance of an HTTP server.  Then, we can add Event Listeners for the events we care about that are emitted by the server and instruct it to start listening.

```javascript
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
```

The `request` event is by far the most commonly used and it will have two parameters - a request object and a response object.  These are commonly referenced with the parameter name `req` and `res` for brevity.  The request object is the incoming HTTP request from the user and the response object is how we'll fulfill the request.

## HTTP Server Events
1. checkContinue - Emitted whenever an HTTP `Expect: 100-continue` is received.  By default the server will respond with a `100 Continue` if you do not listen for this event and you rarely would need to.
2. checkExpectation - Emitted whenever an HTTP `Expect` header is received and the value is not `100 Continue`
3. clientError - Emitted when a client connection experiences an error.  This occurs at the socket level so no HTTP request or response object is available.
4. close - Emitted when the server closes
5. connect - Emitted when a client issues an HTTP CONNECT method.
6. connection - Emitted when a new TCP stream is established
7. request - Emitted every time there is an HTTP request
8. upgrade - Emitted when an HTTP 1.1 `Upgrade` header is found

As you can see, the `request` event is likely what you'll use unless you have very specific design requirements.

## Useful Request Properties
1. headers - The HTTP headers on the request
2. httpVersion - The HTTP version specified on the request
3. method - The HTTP method of the request
4. statusCode - The numeric HTTP status code
5. statusMessage - The short HTTP status message 
6. url - The request URL
   
## Useful Response Properties
1. end() - Indicate that everything is done and the server can consider the request complete
2. getHeader(name) - Return the outgoing header with the specified name
3. getHeaders() - Return all outgoing headers
4. hasHeader(name) - Returns true if the header exists
5. removeHeader(name) - Remove a header
6. setHeader(name, value) - Set a header
7. statusCode - Set the status code for the response
8. statusMessage - Set the status message for the response
9. write(chunk) - Write a portion of the response
10. writeHead(statusCode, message, headers) - Send a response header