function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  $('#clock').empty()
  $('#clock').append(`
    <p>${h} : ${m}</p>
  `)
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
  }

function greeting(user) {
  let today = new Date();
  let h = today.getHours();
  let greeting = ''
  if (h >= 0 && h <= 10) greeting += `Good Morning, ${user}`
  else if (h >= 11 && h <= 13) greeting += `Good Day, ${user}`
  else if (h >= 14 && h <= 18) greeting += `Good Afternoon, ${user}`
  else if (h >= 16 && h <= 24) greeting += `Good Evening, ${user}`
  $('#greeting').append(`
    <h3>${greeting}</h3>
  `)
}

function randomQuotes() {
  $.ajax({
    url:'https://quota.glitch.me/random',
    method : 'GET'
  })
  .done(response => {
    console.log(response)
    $('#quote').append(`
    <br>
    <h7>"${response.quoteText}"</h7>
    `)
    $('#author').append(`
    <br>
      <h9>-${response.quoteAuthor}-</h9>
    `)
  })
}

function todo(input) {
  $('#submitted-todo').append(`
    <h4>${input}</h4>
  `)
}

// ALL EVENT
$(document).ready(() => {
  console.log('Ready!')
  // initial event
  $('#username-container').hide()
  $('#username-container').fadeIn(1000)
  $('#email-container').hide()
  $('#password-container').hide()
  $("#main").hide()
  $('#submitted-todo').hide()
  $('#todo-option').hide()
  $('#undone').hide()
  $('#gj').hide()
  $('#add').hide()
  $('#author').hide()

  // submit username
  $('#username-form').submit(hello => {
    event.preventDefault()
    $('#username-form').hide().animate({queue: false},'slow')
    let username = $('#username').val()
    console.log(username)
    $("#email-text").append(`
    <h3>What's your email, ${username}</h3>
    `)
    $("#email-container").fadeIn(1000).animate({queue: false},'slow')
  })

  // submit email  
  $('#email-form').submit(hello => {
    event.preventDefault()
    $('#email-form').hide().animate({queue: false},'slow')
    let email = $('#email').val()
    console.log(email)
    $("#password-text").append(`
    <h3>What's your password ?</h3>
    `)
    $("#password-container").fadeIn(1000).animate({queue: false},'slow')
  })

  // submit password
  $('#password-form').submit(hello => {
    event.preventDefault()
    let username = $('#username').val()
    let password = $('#password').val()
    console.log(password)
    console.log(username)
    $('#password-form').hide().animate({queue: false},'slow')
     // entering main event
    startTime()
    greeting(username)
    randomQuotes()
    $("#main").fadeIn(1000).animate({queue: false},'slow')
  })
 
  $('#quote').hover(
    function() {
      $('#quote').animate({marginTop:'-10px'}, {queue: false},'slow')
      $('#author').fadeIn('slow').animate({marginTop:'-10px'}, {queue: false},'slow')
    }, function() {
      $('#quote').animate({marginTop:'0px'}, {queue: false},'slow')
      $('#author').fadeOut('slow').animate({marginTop:'0px'}, {queue: false},'slow')
    }
  )

  $('#todo-form').submit(hello => {
    event.preventDefault()
    $('#todo-form').hide().animate({queue: false},'slow')
    let todo = $('#todo-name').val()
    $('#submitted-todo').append(`
      <h5>Today</h5>
      <h4 id="name">${todo}</h4>
      <h4 id="name-strike"><s>${todo}</s></h4>
    `)
    $('#name-strike').hide()
    $('#submitted-todo').fadeIn(1000).animate({queue: false},'slow')
    $('#todo-option').fadeIn(1000).animate({queue: false},'slow')
  })

  $('#done').click(function(){
    $('#name').hide()
    $('#name-strike').show()
    $('#done').hide()
    $('#undone').fadeIn()
    $('#delete').hide()
    $('#gj').fadeIn(2000)
    $('#add').fadeIn(2000)
  })

  $('#undone').click(function(){
    $('#name').show()
    $('#name-strike').hide()
    $('#done').fadeIn()
    $('#undone').hide()
    $('#delete').fadeIn()
    $('#gj').hide()
    $('#add').hide()
  })

  $('#delete').click(function(){
    $('#name').show().empty()
    $('#name-strike').hide().empty()
    $('#submitted-todo').hide().animate({queue: false},'slow').empty()
    $('#todo-option').hide().animate({queue: false},'slow')
    $('#todo-name').val('')
    $('#todo-form').fadeIn(1000).animate({queue: false},'slow')
  })

  $('#add').click(function(){
    $('#name').show().empty()
    $('#name-strike').hide().empty()
    $('#submitted-todo').hide().animate({queue: false},'slow').empty()
    $('#todo-option').hide().animate({queue: false},'slow')
    $('#todo-name').val('')
    $('#todo-form').fadeIn(1000).animate({queue: false},'slow')
    $('#done').show()
    $('#undone').hide()
    $('#delete').show()
    $('#gj').hide()
    $('#add').hide()
  })
})