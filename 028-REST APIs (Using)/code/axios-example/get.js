const axios = require('axios');

const getUrl = async (url) => {
  const result = await axios.get(url);
  console.log(`Status Code : ${result.status}\nData :\n ${JSON.stringify(result.data, 2, 2)}`);
}

getUrl('http://httpbin.org/get');