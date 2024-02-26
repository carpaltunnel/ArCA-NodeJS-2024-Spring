const http = require('http');

http.get('http://httpbin.org/get', (res) => {
  if (res.statusCode !== 200) {
    console.log(`Error : Status code was ${res.statusCode}`);
    res.resume();
    return;
  }
  
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => console.log(rawData));
});