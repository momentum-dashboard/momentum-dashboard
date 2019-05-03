$(document).ready(function(){

});
    function register() {
      event.preventDefault()
      let email = $('#inputEmail').val()
      let name = $('#inputName').val()
      let password = $('#inputPassword').val()
    
      $.ajax({
        url: 'http://localhost:3000/register',
        type: 'post',
        data: {
          email,
          name,
          password
        }
      })
      .done(function(response){
        console.log(response)
      })
      .fail(function(err) {
        alert( err );
      })
      
    }
  
    function login (){
      event.preventDefault()
      let email = $('#inputEmail').val()
      let password = $('#inputPassword').val()
      $.ajax({
        url: 'http://localhost:3000/login',
        type: 'post',
        data: {
          email,
          password
        }
      })
      .done(function(response){
        localStorage.setItem('token',response.access_token)
      })
      .fail(function(err) {
        alert( err );
      })
    }
    function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      $.ajax({
        url: 'http://localhost:3000/login/google',
        type: 'post',
        headers: {
          id_token
        }
      })
      .done(function(response){
        localStorage.setItem('token',response.access_token)
      })
      .fail(function(err) {
        alert( err );
      })
    }
    function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        localStorage.removeItem('token')
      });
    }

    