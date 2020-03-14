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

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
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
          (dataSummary.innerHTML = ''),
          (resLocation.innerHTML = ''),
          (highTempe.innerHTML = ''),
          (lowTempe.innerHTML = ''),
          (headTempe.innerHTML = ''),
          (headSumma.innerHTML = ''),
          (apparentTemperature.innerHTML = '');
      } else {
        dataSum.classList.add('show'),
          (dataError.innerHTML = ''),
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
});
