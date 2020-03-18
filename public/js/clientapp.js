console.log('im working');
let object = document.querySelector('body');
object.addEventListener('load', extractLocation);
console.log('im working');
extractLocation = () => {
  let browswerLoc = document.getElementById('browser-loc');
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      browswerLoc.innerHTML = 'Geolocation is not supported by this browser.';
    }

    function showPosition(err, position) {
      if (err) {
        callback('Error Occured', undefined);
      } else {
        callback(undefined, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          browswerLoc.innerHTML = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          browswerLoc.innerHTML = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          browswerLoc.innerHTML = 'The request to get user location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          browswerLoc.innerHTML = 'An unknown error occurred.';
          break;
      }
    }
  }
};

module.exports = extractLocation;
