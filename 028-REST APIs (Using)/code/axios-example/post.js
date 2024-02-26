const axios = require('axios');

const postToUrl = async (url, data) => {
  try {
    const result = await axios.post(url, data);
    console.log(`Status Code : ${result.status}\nData :\n ${JSON.stringify(result.data, 2, 2)}`);
  } catch (ex) {
    console.error(ex);
  }
}

postToUrl('http://httpbin.org/post', {
  test: true,
  name: 'Testing McTesterson',
  occupation: 'Developer',
});