# REST APIs
REpresentational State Transfer style Application Programming Interfaces.  Or, a standardized and easy way to understand and interact with a webservice.

## REST Principles
1.  Client-Server - We'll be interacting with REST APIs over HTTP so we stick to HTTP standards and adhere to its client-server nature.  The user interface should be separated from the data layer via the API.  The UI interacts with the API and the API interacts with the data.  This helps us scale by not binding them together.
2.  Stateless - Again, HTTP, therefore stateless.  Each request from client to server should standalone and contain everything needed to fulfill the request with no known history.  Any session state must be maintained by the client.
3.  Cacheable - A REST API should indicate whether the response (data) is cacheable.  If so, it is the responsibility of the client to cache it if desired.
4.  Uniform Interface - A REST API should present a uniform and intelligible contract that the client and server will abide by.  In most cases, you should be able to understand the general use and purpose of API endpoints without much documentation, though docs are certainly helpful.  Specifically, documentation is helpful to determine the request and response contents correctly.
5.  Layered System - Components should exist at a single layer and not reach outside of it.  This abstraction keeps our layers clean and avoids spaghetti code that attempts to do "all the things" just to end up making a mess of all them.


## Resources
It's safe to assume every "thing" is a resource.  If you have an API that manages widgets, widgets are your resource.  Each specific instance of a resource should have a unique identifier.  After all, to ask for Widget #3,401 the client needs to know that it is #3,401 to request it from the API.  But, how do find the ID if you don't already have it?  Read on into "Methods"...

## Methods
Since we'll be communicating with APIs over HTTP, we'll use HTTP methods to indicate what we want to do in a RESTful fashion.
1. GET - Request resource.  This could be an individual piece of data or a list of data (resources).  EG : Give me a list of widgets.
2. POST - Create resource.  A POST indicates that a request is asking to create a new resource.  EG : Create a widget for me, here are its properties.
3. PUT - Update an existing resource.  PUT indicates that a request wishes to update a resource with a full replace.  EG : I don't care what widget #27's old properties were, here is what they should be now.
4. DELETE - Delete an existing resource.  EG : I don't need widget #83 anymore, delete it.
5. PATCH - Update part of an existing resource.  EG : Change the description of widget #27 from X to Y, leave the rest of it as is.

## Routes
Routes are the standardized URLs in an API that clients will use to interact with it.  They should be named appropriately to describe the resource they support.  For example, the base route for widgets might be `https://.../widgets`

Since multiple other projects may come to depend on an API, it's always a good idea to version it.  Once an API is stable and ready for use it should be given a version that is easily discernible - `v1` for example.  So the widgets route above might become `https://.../api/v1/widgets`

We also need a way to identify a single resource in a route.  This would be for things like "get one specific widget", "delete one specific widget", or "update one specific widget".  We can do this with "inline parameters".  Continuing our URL example above, to retrieve widget #27 you would `GET https://.../api/v1/widgets/27`.  In this example you can clearly deduce from the URL that you're requesting (GET) a widget with ID 27 on v1 on the API.  This is how REST APIs can be pretty self explanatory once you know the names of resources and the generic URLs/routes that are available.

However, sometimes we need to specify something "extra" than what is provided in the base functionality on a route.  For this we have "query parameters".  Query parameters are part of the HTTP standard and are utilized by adding a `?` to the end of your URL then providing the parameter and value with an `=` in between them.  For example : `GET https://.../api/v1/widgets?active=true`.  You can provide multiple query parameters by separating them with an ampersand : `GET https://.../api/v1/widgets?active=true&color=blue&category=home`

Not all query parameters will require a value.  While the example above for `active` provides a boolean value of true, it's also common to exclude values for booleans and assume that if the query parameter is present then it indicates a value of `true` like `GET https://.../api/v1/widgets?active`.  That said, some older frameworks always expect query parameters in key/value pairs so it's safest to provide values.

### Standard Routes
1. Get a list of all widgets : `GET https://.../api/v1/widgets`
2. *Create a new widget (or list of widgets) : `POST https://.../api/v1/widgets`
3. Get a single widget with ID #27 : `GET https://.../api/v1/widgets/27`
4. *Update (replace) a single widget with ID #27 : `PUT https://.../api/v1/widgets/27`
5. *Update (partial) a single widget with ID #27 : `PATCH https://.../api/v1/widgets/27`
6. Delete a single widget with ID #27 : `DELETE https://.../api/v1/widgets/27`

Routes marked with a `*` indicate that a request body would be required.  Obviously you can't update a widget with new information if you don't provide it, right?

## JSON
We've talked about how JSON is structured and how to serialize/deserialize it in Javascript.  While it is not the only way to transfer data over the internet, it's probably the most common.  For all of the APIs we interact with and build, we'll use JSON as our transport language.


