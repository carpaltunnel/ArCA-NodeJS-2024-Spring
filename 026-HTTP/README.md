# HTTP
I'll cover the basics of HTTP here, but I would encourage to refer to the Mozilla Developer Network's [HTTP Protocol Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) and [HTTP Request Methods Doc](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

## The Basics
HTTP (Hyper Text Transfer Protocol) is a client-server protocol that is used to fetch resources over the internet.  Requests are made by a client, to a server, and the server responds accordingly.  The most ubiquitous example is a web page :
1. Client (browser) requests a web page from a server.
2. Server accepts the request and transfers the page data (the response) to the client
3. Client loads the page data and displays it to the user

Of course, things are never that simple in reality.  A web page will usually include other resources like scripts, images, and style sheets that are referenced in the page data which the browser will then use to make other requests to load them.

HTTP is inherently a stateless protocol in that the server simply responds to requests from the client without storing state information about the client.  Each request can be made in isolation and is not dependent on previous interactions.  That said, we've built a lot of stateful things on top of HTTP, like cookies and sessions, but it is truly stateless at the core.

## Under the Hood
HTTP is built on top of TCP.  We won't talk much about TCP since it lives at a different layer and is abstracted away for us, but you should know it's there.  The general flow of a HTTP request, with a nod to TCP, is as follows : 
1. Client opens a TCP connection to the server
2. Client sends an HTTP request over the TCP connection to the server
3. Server responds to the request with an HTTP response.
4. Client consumes the response
5. Client closes or reuses the TCP connection.

## Requests
HTTP requests have the following components : 
1. An HTTP Method (see below)
2. The URL for the requested resource
3. The HTTP protocol version
4. HTTP headers
5. Optional data body

## Responses
HTTP responses have the following components : 
1. The HTTP protocol version
2. A status code (see below)
3. A status message
4. HTTP Headers
5. Optional data body

## Ports
While the TCP ports used for HTTP connections can be arbitrary, the default for HTTP is 80 and the default for HTTPS is 443.  In your web service development you can choose pretty much any port (that isn't already in use) so long as you direct your requests to that port.  Oftentimes, a web service you develop will live behind a load balancer or other network device that is configured to forward traffic to the correct port on your application.  Since the network device is servicing the HTTP/S request, it should be listening on the standard ports, but it can forward traffic to any port for your application.  That said, in Linux systems ports under 1024 are protected and can only be utilized by super users.  Since you generally would not want to run your service as root, choosing a port number higher than 1024 is common and suggested.

## Methods
HTTP request methods indicate the action the request is expected to perform.  For this reason, they are often called "verbs" since they dictate an action to take.  Since we're primarily talking about HTTP in the context of REST APIs, we'll just discuss the methods used in a RESTful API and ignore the others.
1. GET - Retrieve data
2. POST - Submit data, usually to create a new entry
3. PUT - Update data, replace an existing entry with new data
4. DELETE - Delete data
5. PATCH - Update data, but only a partial modification rather than the full replace of a PUT

We'll talk about HTTP methods a lot more when we get into REST APIs but that intro is good enough for now.

## Status Codes
HTTP Response status codes are simple numbers that indicate the state of the response.  Once again, we'll limit our discussion to those used most often in a REST API.

### The Good (200s)
The 200 range indicates a successful status. These are the most common : 
1. `200` - OK.  Indicates a generic successful response
2. `201` - Created.  Indicates that an entity was created based on the request
3. `202` - Accepted.  Typically used to indicate a successful response when other work is required on the server side that the client shouldn't wait for.  Think of it as "Yeah, got it, I'll take care of it"
4. `204` - No Content.  Commonly used when a request was successful but there is nothing useful to return to the client.  This is often used with DELETE requests.

### The Moved (300s)
The 300 range mostly defines status codes for things that have moved
1. `301` - Moved Permanently
2. `302` - Found.  The resource has moved temporarily and here is how to find it.
3. `304` - Not Modified.  The resource hasn't changed so there is no need to resend it - check your cache.
4. `307` - Temporary Redirect
5. `308` - Permanent Redirect

### The Bad (400s)
The 400 range usually indicates a client side error
1. `400` - Bad Request.  The server can not fulfill the request due to an error in the request.
2. `401` - Unauthorized
3. `403` - Forbidden
4. `404` - Not Found
5. `405` - Method Not Allowed
6. `429` - Too Many Requests

### The Ugly (500s)
The 500 range indicates an error in our service.
1. `500` - Internal Server Error.  General "it's broken" status code
2. `501` - Not Implemented
3. `502` - Bad Gateway
4. `503` - Service Unavailable
5. `504` - Gateway Timeout

## Headers
Headers are extra informational fields that are added to HTTP communications - both from the client and server side.  Many are extremely common like `content-type`, `content-length`, `cache-control`, and `accept`.  For the most part we can ignore this basic headers and let the client/server handle them automatically.  However, we will commonly find use for headers like `user-agent` and `authorization`.  That said, headers are fully configurable so you can add any that you need so long as they don't conflict with standard header names.  It's common to see custom headers prefixed with `x-` but this convention was deprecated in 2012.  That said, it is still extremely common to see the `x-request-id` header which is usually used to add a unique identifier to requests to allow for research and tracing.

