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
