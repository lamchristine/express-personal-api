// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Orgin, X-Requested-With, Content-Type, Accept");
  next();
});



/************
 * DATABASE *
 ************/

var db = require('./models');

// var profile = [
//   { first_name: "Christine",
//     last_name: "Lam",
//     github_link: "https://github.com/lamchristine",
//     github_profile_image: "https://avatars2.githubusercontent.com/u/17622935?v=3&s=460",
//     current_city: "San Franciso",
//     stuffed_animals: [
//       { name: "Foo",
//         type: "cat",
//         color: "blue"
//       },
//       { name: "Bar",
//         type: "Dog",
//         color: "red"
//       }
//     ]
//   }
// ];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile('views/index.html', {root: __dirname});
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    all_endpoints_documented: true,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "POST", path: "/api/travels", description: "Create a new travel adventure"},
      {method: "DELETE", path: "/api/travels", description: "Deletes a specific travel adventure"}
    ]
  });
});

app.get('/api/profile', function (req, res) {
  //reference profile in server.js file
  // res.json(profile);
  db.Profile.find(function(err, profile) {
    if (err) {
      return console.log("error profile", err);
    } res.json(profile);
  });
});

app.get('/api/travels', function (req, res) {
  db.Travel.find(function(err, travels) {
    if (err) {
      return console.log("error");
    } res.json(travels);
    console.log(travels);
  });
});


app.post('/api/travels', function (req, res) {

  var newTravel = new db.Travel({
    location_city: req.body.city,
    location_country: req.body.country,
    duration:req.body.duration,
    main_activities: req.body.main_activities

  }); console.log("new travel", newTravel);

    newTravel.save(function (err, travel){
      if (err) {
        return console.log("save err", err);
      }
      console.log("saved travel", travel);
      res.json(travel);
    });
  });


  app.delete('/api/travels/:id', function (req, res) {
    console.log('ad deleted', req.params);
    var adId = req.params.id;

    db.Travel.findOneAndRemove({ _id:adId }, function (err, deletedAd) {
      res.json(deletedAd);
    });
  });


  //get one travel
  app.get('/api/travels/:id', function (req, res) {
    db.Travel.findOne({_id: req.params._id}, function (err, data) {
      res.json(data);
    });
  });

// edit travels

// app.get ('/api/travels/:id', function (req, res) {
//   var editId = req.params._id;
//   console.log(editId);
// });

  app.put('/api/travels/:id', function (req, res) {
    // var editId = req.params._id;
    // console.log(editId);
    db.Travel.findOne({_id: req.params.id}, function (err, travel) {
      if (err) {
        console.log('edit failed horribly', err);
      }
      travel.location_city = req.body.city;
      travel.location_country = req.body.country;
      travel.duration = req.body.duration;
      travel.main_activities = req.body.main_activities;

      travel.save(function(err) {
        if (err) {
          console.log('saving failed');
        }
        res.json(travel);
        console.log(travel);
      });
    });
  });
    // var query = {"_id": req.params._id };
    // console.log(query);
    // var update = {location_city: req.body.city,
    //               location_country: req.body.country,
    //               duration: req.body.duration,
    //               main_activities: req.body.main_activities
    //               };
    // var options = {new: true};
    //
    // db.Travel.findOneAndUpdate(query, update, option, function (err, editTravel) {
    //   if (err) {
    //     console.log('edit fail');
    //   }
    //   res.json(editTravel);
    //   console.log('edited travel', editTravel)
    // });


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
