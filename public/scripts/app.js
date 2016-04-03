console.log("Sanity Check: JS is working!");

var template;
var template1;

var profile = [];
var $profile;

var travels = [];
var $travels;

var map;

$(document).ready(function(){

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 4
    });
  }
  initMap();

  $profile = $('#profile');
  var source = $('#profile-template').html();
  template = Handlebars.compile(source);


  $travels = $('#travels');
  var sourceTravel = $('#travel-template').html();
  template1 = Handlebars.compile(sourceTravel);


  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: onSuccess,
    error: onError
  });

  $.ajax({
    method: 'GET',
    url: '/api/travels',
    success: handleSuccess,
    error: handleError,
  });


  $('#newTravelForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new travel serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/travels',
      data: $(this).serializeArray(),
      success: newTravelSuccess,
      error: newTravelError
    });
  });
});

function render() {
  $profile.empty();
  var profileHtml = template({ profile: profile });
  $profile.append(profileHtml);
}


function render1() {
  $travels.empty();
  var travelHtml = template1({ travels: travel });
  $travels.append(travelHtml);
}

function onSuccess(json) {
  profile = json;
  render();
}

function onError(e) {
  console.log("Failed");
}

function handleSuccess(json) {
  travel = json;
  console.log(travel)
  render1();
}


function handleError(json) {
  console.log("Travels Failed");
}


function newTravelSuccess(json) {
  $('#newTravelForm input').val('');
  travels.push(json);
  render1();
}

function newTravelError(json) {
  console.log("Travels Failed");
}
