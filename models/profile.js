var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var stuffed_animalSchema = new Schema ({
  name: String,
  type: String,
  color: String
});

var ProfileSchema = new Schema({
  first_name: String,
  last_name: String,
  github_link: String,
  github_profile_image: String,
  current_city: String,
  stuffed_animals: [stuffed_animalSchema]
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
