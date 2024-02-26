const http = require('http')

const data = JSON.stringify({
  widget: 'a brand new widget'
});

const options = {
  hostname: 'httpbin.org',
  port: 80,
  path: '/post',
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
});

req.on('error', (error) => {
  console.error(error)
});

req.write(data);
req.end();