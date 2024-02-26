# Interacting with REST APIs
Now that we know generally how REST APIs are structured, let's start using them.  The majority of this lesson will be done in class instruction rather than writing out every step but the high points will be covered here.

## REST Client
I'll be using [Postman](https://www.postman.com/) for this lesson and highly recommend it.  There is a paid tier but all the functionality I've ever needed is included in the free version.  Choose any client you're comfortable with, the basics will be the same in all of them.

### Example APIs (and Documentation)
1. http://httpbin.org/#/HTTP_Methods 
2. https://musicbrainz.org/doc/MusicBrainz_API
3. https://petstore.swagger.io/
4. https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/
5. https://rapidapi.com/collection/list-of-free-apis


https://musicbrainz.org/doc/MusicBrainz_API/Examples

https://musicbrainz.org/ws/2/artist?inc=releases&fmt=json&query=jinjer

https://musicbrainz.org/ws/2/artist/51b37017-859c-465e-8810-2d2dd41a401e?inc=releases&fmt=json



## Programmatic API Usage
There are many modules available for interacting with APIs over HTTP.  We talked briefly about the Node.js core modules `http` and `https` earlier so let's use them now.

```javascript
const http = require('http');
http.get('http://nodejs.org/dist/index.json', (res) => {
  if (res.statusCode !== 200) {
    console.log(`Error : Status code ws ${res.statusCode}`);
    res.resume();
    return;
  }
  
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => console.log(rawData));
});
```

`get` is a convenience method that does some of the work for you.  For other methods, you have to do a bit more...
```javascript
const http = require('http')

const data = JSON.stringify({
  widget: 'a brand new widget'
})

const options = {
  hostname: 'myapidomain.com',
  port: 443,
  path: '/widgets',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => console.log(rawData));
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
```

The core modules are okay when you want to keep your application and dependencies small because they will always be available.  However, there are third party packages that can make things much easier... especially since the core modules don't support promises.  Lately I've been using [Axios](https://www.npmjs.com/package/axios) and it has become my go-to due to its ease of use and promise based approach.  It also has convenience methods for all standard HTTP methods.

Axios is promised based so you can use it with promise chains (`.then()`) or with `async/await`.  Since we're using newer versions of Node.js, we'll stick to `async/await`, but the approach is the same.

```javascript
npm install axios
```

### GET
Compare this to the `http` core module :
```javascript
try {
  const response = await axios.get('/widgets?ID=45');
  console.log(response);
} catch (ex) {
  console.error(ex);
}
```


### POST
Even better, compare this to the `http` core module for making a POST request :
```javascript
try {
  const response = await axios.post('/widgets', {
    name: 'A brand new widget',
    color: 'blue',
    weight: 250
  });
  console.log(response);
} catch (ex) {
  console.error(ex);
}

```


## Putting It Together
Now that we know how to make a request and receive a response we'll use that to do something actually useful with a remote API.

1. Make a request to MusicBrainz to search for an artist
2. Retrieve the ID from the response and fetch a list of releases of type "album"
3. Iterate through the list of releases to determine which years the artist released an album
4. Output name of the albums that were released each year a release was made (don't worry about possible duplicates)



