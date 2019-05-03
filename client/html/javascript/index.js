// function fetchCoord(){
//     $.ajax({
//         url:'/Coord',
//         method: 'GET'
//     })
// }
function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var latlongvalue = position.coords.latitude + ","
    + position.coords.longitude;
    let coordinate = [latitude,longitude]
    getCityCountry(coordinate)
    // let request = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyBvszf7pWDZ7MA-umkI-U7EEAj8jTYTLDQ`

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlongvalue+"&amp;zoom=14&amp;size=400x300&amp;key=AIzaSyAa8HeLH2lQMbPeOiMlM9D1VxZ7pbGQq8o";
    
 }
 function errorHandler(err) {
    if(err.code == 1) {
       alert("Error: Access is denied!");
    } else if( err.code == 2) {
       alert("Error: Position is unavailable!");
    }
 }
 function getLocation(){
    if(navigator.geolocation){
       // timeout at 60000 milliseconds (60 seconds)
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition
       (showLocation, errorHandler, options);
    } else{
       alert("Sorry, browser does not support geolocation!");
    }
 }

 function getCityCountry(arr){
    console.log(arr);
    
     
     $.ajax({
        url:`https://maps.googleapis.com/maps/api/geocode/json?latlng=${arr[0]},${arr[1]}&sensor=true&key=AIzaSyBvszf7pWDZ7MA-umkI-U7EEAj8jTYTLDQ`,
        method: 'GET'
       })
       .done(function(location){
           let city = (location.results[location.results.length-2].formatted_address).split(', ')
            $.ajax({
                url:`http://localhost:3000/api/weather?country=${city[1]}&city=${city[0]}`,
                method: 'GET',
            })
            .done(function(response){
                console.log(response);
                console.log(response.location);
                console.log(response.temperature)
                console.log(response.summary);
                console.log(response.icon);
                $('#weather').append(
                    `${response.summary}`
                )
                $('#location').append(
                    `${response.location}`
                )
                
                
                // location: `${city}, ${country}`,
                // timezone: `${data.timezone}`,
                // summary: `${data.hourly.summary}`,
                // temperature: `${Math.floor(data.currently.temperature) } °C`,
                // icon: `${data.hourly.icon}`
                
                
                
            })
            .fail(function(err){
                console.log(err);
                
            })
            
       })
       .fail(function(err){
            console.log(err);
            
       })
 }



        
//  console.log(coordinate);
     

$(document).ready(function(){
    console.log(`readyxxxx`)
    getLocation()

    
})