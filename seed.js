// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_travels = [
  {
  location_city: "Reykjavik",
  location_country: "Iceland",
  duration: "A week",
  main_activities: "Camping & hiking, seeing the Northern Lights"
  },
  {
  location_city: "Tanzania",
  location_country: "Africa",
  duration: "2 weeks",
  main_activities: "Climing Mt.Kili and exploring the Serengeti"
  },
  {
  location_city: "South Shetland Islands",
  location_country: "Antarctica",
  duration: "2 weeks",
  main_activities: "King pengiuns and hot springs, and taking the polar plunge!"
  }
];


var new_profile = [
  {
  first_name: "Christine",
  last_name: "Lam",
  github_link: "https://github.com/lamchristine",
  github_profile_image: "https://avatars2.githubusercontent.com/u/17622935?v=3&s=460",
  current_city: "San Franciso",
  stuffed_animals: [
                    { name: "Bear Bear",
                      type: "Bear",
                      color: "White"
                    },
                    { name: "George",
                      type: "Monkey",
                      color: "Brown"
                    }
                   ]
  }
];

db.Travel.remove({}, function(err, travels){
  if (err) {
    console.log('Error occured in removing travels', err);
  } else {
    console.log('removed all travels');

  db.Travel.create(new_travels, function (err, travels) {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log("Created new travel", travels);
    process.exit();
  });
  }
});


db.Profile.remove({}, function(err, profile){
  if (err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('removed all profile');

  db.Profile.create(new_profile, function (err, profile) {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log("Created new profile", profile);
    process.exit();
  });
}
});


// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}
//
// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }
//
//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
