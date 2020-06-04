const request = require('request');

//Environment Variable Setup
require('dotenv').config();

const word = process.env.GEO_CODE;

const geoCode = (address, callback) => {
  console.log(word);
  const url =
    process.env.GEO_CODE_URL +
    encodeURIComponent(address) +
    process.env.GEO_CODE_API_KEY;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect at the moment', undefined);
    } else if (body.features.length === 0) {
      callback('try another search', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[1],
        latitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
