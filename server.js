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

var profile = [
  { first_name: "Christine",
    last_name: "Lam",
    github_link: "https://github.com/lamchristine",
    github_profile_image: "https://avatars2.githubusercontent.com/u/17622935?v=3&s=460",
    current_city: "San Franciso",
    stuffed_animals: [
      { name: "Foo",
        type: "cat",
        color: "blue"
      },
      { name: "Bar",
        type: "Dog",
        color: "red"
      }
    ]
  }
];

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
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  });
});

app.get('/api/profile', function (req, res) {
  //reference profile in server.js file
  res.json(profile);
  // db.Profile.find(function(err, profile) {
  //   if (err) {
  //     return console.log("error profile", err);
  //   } res.json(profile);
  // });
});

app.get('/api/travels', function (req, res) {
  db.Travel.find(function(err, travels) {
    if (err) {
      return console.log("error");
    } res.json(travels);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
