//const request = require('request');
const geoCode = require('./utils/geocode');
const weather = require('./utils/darkskyutils');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 4000;

//Setup Express Paths And Directory
const pathDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup HandleBar and  View Engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup Static Directory to serve
app.use(express.static(pathDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Oke'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'oke'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Section',
    name: 'Oke',
    helpText: 'just a minute, we will be with you shortly'
  });
});

app.get('/help*', (req, res) => {
  res.render('404', {
    error: 'Article Page Not found'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      weather(latitude, longitude, (error, callback) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: callback.summary,
          address: req.query.address,
          location
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not Found'
  });
});

app.listen(port, () => {
  console.log('Server is up on' + port');
});
