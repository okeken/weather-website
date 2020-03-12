const request = require('request');

const weather = (lat, long, callback) => {
  const url =
    'https://api.darksky.net/forecast/6ac586665c85c68622662e6d5bac50cf/' +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(long) +
    '';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect', undefined);
    } else if (body.error) {
      callback('Incorrect Inputs', undefined);
    } else {
      callback(undefined, {
        longitude: body.longitude,
        latitude: body.latitude,
        summary: body.daily.data[0].summary
      });
    }
  });
};

module.exports = weather;
