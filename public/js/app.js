// let x = document.getElementById('demo');

// function getLocation() {
//   if (navigator.geolocation) {
//     let data = navigator.geolocation.getCurrentPosition(
//       showPosition,
//       showError
//     );
//   } else {
//     x.innerHTML = 'Geolocation is not supported by this browser.';
//   }
// }

// function showPosition(position) {
//   x.innerHTML =
//     'latitude: ' +
//     position.coords.latitude +
//     '<br>longitude: ' +
//     position.coords.longitude;
// }

// function showError(error) {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       x.innerHTML = 'User denied the request for Geolocation.';
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML = 'Location information is unavailable.';
//       break;
//     case error.TIMEOUT:
//       x.innerHTML = 'The request to get user location timed out.';
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML = 'An unknown error occurred.';
//       break;
//   }
// }

let dataInfo = document.querySelector('.data-rt');
let dataSum = document.querySelector('.weather-resp');

let cityInput = document.querySelector('#cityInput');
let address = cityInput.value;

cityInput.addEventListener('input', e => {
  address = e.target.value;
});

let dataError = document.querySelector('.error-msg');
let dataSummary = document.querySelector('.data-summary');
let loader = document.querySelector('.loading');
let resLocation = document.querySelector('.res-location');
let highTempe = document.querySelector('.temp-high');
let lowTempe = document.querySelector('.temp-low');
let ApparentTempe = document.querySelector('.apparent-temp');
let tempeSummary = document.querySelector('.temp-summary');
let headTempe = document.querySelector('.w-temp-sum');
let headSumma = document.querySelector('.w-head-sum');
let apparentTemperature = document.querySelector('.app-temp');

emptyDivs = () => {
  (dataSummary.innerHTML = ''),
    (resLocation.innerHTML = ''),
    (highTempe.innerHTML = ''),
    (lowTempe.innerHTML = ''),
    (headTempe.innerHTML = ''),
    (headSumma.innerHTML = ''),
    (apparentTemperature.innerHTML = '');
};

getWeather = () => {
  dataSummary.classList.remove('data-summary-dec');
  dataError.textContent = '';
  emptyDivs();
  loader.classList.add('show');
  dataSummary.innerHTML = '';
  let url = '/weather?address=' + encodeURIComponent(address);

  fetch(url).then(response => {
    response.json().then(data => {
      loader.classList.remove('show');
      if (data.error) {
        dataSum.classList.add('hide'),
          dataSummary.classList.remove('data-summary-dec'),
          (dataError.textContent = 'Location not found, try another Search!'),
          emptyDivs();
      } else {
        dataSum.classList.add('show'),
          dataInfo.classList.remove('hide'),
          (dataSummary.innerHTML = data.forecast),
          (resLocation.innerHTML = data.location),
          (highTempe.innerHTML = data.highTemperature),
          (lowTempe.innerHTML = data.lowTemperature),
          (headTempe.innerHTML = data.currentTempe),
          (headSumma.innerHTML = data.headSummary),
          (apparentTemperature.innerHTML = data.apparentTempe),
          dataSummary.classList.add('data-summary-dec');
      }

      dataInfo.classList.add('show');
    });

    address = '';
  });
};

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();

  getWeather();
});
