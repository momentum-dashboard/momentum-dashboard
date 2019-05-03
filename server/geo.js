var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: ' ', // for Mapquest, OpenCage, Google Premier
  formatter: 'json' // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

geocoder.reverse({lat:-6.2087634, lon:106.84559899999999}, function(err, res) {
  console.log(res);
});

// Latitude: -6.2087634
// Longitude: 106.84559899999999