const request = require('request');

//Environment Variable Setup
require('dotenv').config();
const weather = (lat, long, callback) => {
  const url =
    process.env.INPUT_DECODER +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(long) +
    '';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect', undefined);
    } else {
      callback(undefined, {
        longitude: body.longitude,
        latitude: body.latitude,
        icon: body.currently.icon,
        currentTemp: body.currently.temperature,
        currSummary: body.currently.summary,
        apparentTemp: body.currently.apparentTemperature,
        lowTemp: body.daily.data[0].temperatureLow,
        highTemp: body.daily.data[0].temperatureHigh,
        summary: body.daily.data[0].summary,
      });
    }
  });
};

module.exports = weather;
