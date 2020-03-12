//import { response } from 'express';

console.log('JS Client Script is loaded 2');

let cityInput = document.querySelector('#cityInput');
let address = cityInput.value;

cityInput.addEventListener('input', e => {
  address = e.target.value;
});

let dataError = document.querySelector('.error-msg');
let dataLocation = document.querySelector('.data-location');
let dataSummary = document.querySelector('.data-summary');

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  dataError.innerHTML = 'Loading....';
  dataLocation.innerHTML = '';
  dataSummary.innerHTML = '';

  let url =
    'http://localhost:4000/weather?address=' + encodeURIComponent(address);

  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        (dataError.innerHTML = 'Check Your Input And Try Again Later'),
          (dataLocation.innerHTML = ''),
          (dataSummary.innerHTML = '');
      } else {
        (dataError.innerHTML = ''),
          (dataLocation.innerHTML = data.location),
          (dataSummary.innerHTML = data.forecast);
      }
    });

    address = '';
  });
});
