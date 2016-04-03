// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_travels = [
  {
  location_city: "Munich",
  location_country: "Germany",
  duration: "2 days",
  },
  {
  location_city: "Toronto",
  location_country: "Canada",
  duration: "4 days",
  },
  {
  location_city: "Syndey",
  location_country: "Australia",
  duration: "7 days",
  }
];


// var profile = [
//   {
//   first_name: "Christine",
//   last_name: "Lam",
//   github_link: "https://github.com/lamchristine",
//   github_profile_image: "https://avatars2.githubusercontent.com/u/17622935?v=3&s=460",
//   current_city: "San Franciso",
//   stuffed_animals: [
//                     { name: "Foo",
//                       type: "cat",
//                       color: "blue"
//                     },
//                     { name: "Bar",
//                       type: "Dog",
//                       color: "red"
//                     }
//                    ]
//   }
// ];

db.Travel.remove({}, function(err, travels){
  if (err) {
    console.log('Error occured in remove', err);
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
