console.log("Sanity Check: JS is working!");

var template;
var template1;

var profile = [];
var $profile;

var allTravels = [];
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


  $travels = $('#test');
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


  $("#travelForm").on('submit', function(e) {

    e.preventDefault();
    // alert("sadfsadf");
    console.log( $("input[name = 'city']").val() );
    console.log( $(this).serializeArray() );
    $.ajax({
      method: 'POST',
      url: '/api/travels',
      data: $(this).serializeArray(),
      success: newTravelSuccess,
      error: newTravelError
    });
  });

  $travels.on('click', '.deleteAd', function () {
    console.log('clicked delete adventure button to', '/api/travels/'+ $(this).attr('data-id') );
    $.ajax({
      method: 'DELETE',
      url: '/api/travels/' + $(this).attr('data-id'),
      success: deleteAdSuccess,
      error: deleteAdError,
    });
  });

  $travels.on('click', '.editAd', function () {
    $('#editTravelForm').show();
    var id = $(this).attr('data-id');
    console.log("travel id", id);


    $("#editTravelForm").on('submit', function (e) {
      e.preventDefault();
      console.log( $("input[name = 'city']").val() );
      console.log('edit info', $(this).serializeArray() );
      console.log('edit info /api/travels/' + id );

        $.ajax({
          method: 'PUT',
          url: '/api/travels/' + id,
          data:  $(this).serializeArray(),
          success: editAdSuccess,
          error: editAdError
        });
    });
  });




});

function render() {
  $profile.empty();
  var profileHtml = template({ profile: profile });
  $profile.append(profileHtml);
}


function render1() {
  $("#test").empty();
  var travelHtml = template1({ travels: allTravels });
  $('#test').append(travelHtml);
  console.log(allTravels);
}

function onSuccess(json) {
  profile = json;
  render();
}

function onError(e) {
  console.log("Failed");
}

function handleSuccess(json) {
  allTravels = json;
  console.log(allTravels);
  render1();
}


function handleError(json) {
  console.log("Travels Failed");
}


function newTravelSuccess(json) {
  $('#travelForm input').val('');
  console.log("this is json", json);
  allTravels.push(json);
  render1();
}

function newTravelError(json) {
  console.log("Travels Failed");
}

function deleteAdSuccess(json) {
  var travel = json;
  var travelId = travel._id;
  console.log('deleted travel', travelId);
  for (var i=0; i <allTravels.length; i++){
    if (allTravels[i]._id === travelId) {
      allTravels.splice(i, 1);
      break;
    }
  }
  render1();
}

function deleteAdError(json){
  console.log("delete failed");
}

function editAdSuccess(json){
  var travel = json;
  var travelId = travel._id;
  console.log('edit travel', travelId);
  for (var i=0; i <allTravels.length; i++){
    if (allTravels[i]._id === travelId) {
      allTravels[i] = travel;
      break;
    }
  }
  render1();
  }

function editAdError(json) {
  console.log('edit form failed');
}
