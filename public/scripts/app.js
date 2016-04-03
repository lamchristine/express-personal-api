console.log("Sanity Check: JS is working!");

var template;
var template1;

var profile = [];
var $profile;

var travels = [];
var $travels;

$(document).ready(function(){

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
  render1();
}


function handleError(json) {
  console.log("Travels Failed");
}
