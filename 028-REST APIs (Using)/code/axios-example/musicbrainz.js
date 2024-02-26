const axios = require('axios');
/*

https://musicbrainz.org/doc/MusicBrainz_API/Examples

https://musicbrainz.org/ws/2/artist?inc=releases&fmt=json&query=jinjer

https://musicbrainz.org/ws/2/artist/51b37017-859c-465e-8810-2d2dd41a401e?inc=releases&fmt=json



*/

const artist = 'Jinjer';

const getUrl = async (url) => {
  const result = await axios.get(url);
  //console.log(`Status Code : ${result.status}\nData :\n ${JSON.stringify(result.data, 2, 2)}`);
  return result.data;
}

const main = async () => {
  const artistResults = await getUrl(`https://musicbrainz.org/ws/2/artist?inc=releases&fmt=json&query=${artist}`);

  console.log(`The ID is : ${artistResults.artists[0].id}`);
  const artistId = artistResults.artists[0].id;

  const releaseResults = await getUrl(`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`);
  console.log(`There are ${releaseResults.releases.length} releases for the artist "${artist}" and they are :`);

  let counter = 1;
  releaseResults.releases.forEach((release) => {
    console.log(`${counter++}. ${release.title} (${release.date})`);
  });
};

main();