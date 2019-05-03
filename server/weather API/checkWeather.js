require('dotenv').config({ path: '../.env' })
const Navigator = require('navigator')
var NodeGeocoder = require('node-geocoder');
const axios = require('axios')
let ax = axios.create({
  baseURL: `https://api.darksky.net/forecast/${process.env.DARKSKY_APIKEY}`
})
var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: process.env.OPENCAGE_APIKEY
});
let unit = '?units=si'

// geocoder.geocode('paris, france', function (err, res) {
//   console.log(res);
// });

// geocoder.reverse({lat:-6.2087634, lon:106.84559899999999}, function(err, res) {
//   console.log(res);
// });
// function showPosition(position){
//   console.log(position.coords.latitude,position.coords.longitude)
// }
// function getLocation(){
//   if(Navigator.geolocation){
//     Navigator.geolocation.getCurrentPosition(showPosition)
//     }else{
//       console.log('geolocation is not supported by this browser');
//     }
//   }



// getLocation()

function CheckWeather(city, country, cb) {
  geocoder.geocode(`${city}, ${country}`)
    .then(function (res) {
      // console.log(res)
      regexCountry = new RegExp(country, 'ig')
      regexCity = new RegExp(city, 'ig')
      let temp = res.filter(item => {
        let cekCity
        if (item.city) {
          cekCity = item.city.match(regexCity)
        } else {
          cekCity = item.state.match(regexCity)
        }
        return (cekCity) ? true : false
      })
      if (temp.length < 1) {
        temp = res.filter(item => {
          let cekCountry = item.country.match(regexCountry)
          return (cekCountry) ? true : false
        })
      }
      temp = temp[0]
      let latLong = `${temp.latitude},${temp.longitude}`
      ax.get(`/${latLong}${unit}`)
        .then(({ data }) => {
          console.log(data)
          let obj = {
            location: `${city}, ${country}`,
            timezone: `${data.timezone}`,
            summary: `${data.hourly.summary}`,
            temperature: `${Math.floor(data.currently.temperature) } °C`,
            icon: `${data.hourly.icon}`
          }
          cb(obj)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(function (err) {
      console.log(err);
    });
}

// CheckWeather('tokyo', 'japan')
// CheckWeather('jakarta', 'indonesia')
// CheckWeather('berlin', 'germany')

module.exports = CheckWeather