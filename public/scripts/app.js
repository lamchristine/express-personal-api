console.log("Sanity Check: JS is working!");

var $profile;
var template;
var profile = [];


$(document).ready(function(){

  $profile = $('#profile');
  var source = $('#profile-template').html();
  template = Handlebars.compile(source);


  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: onSuccess,
    error: onError
  });
});

function render() {
  $profile.empty();
  var profileHtml = template({ profile: profile });
  $profile.append(profileHtml);
}

function onSuccess(json) {
  profile = json;
  render();
}

function onError(e) {
  console.log("Failed");
}
