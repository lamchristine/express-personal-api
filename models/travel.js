var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TravelSchema = new Schema({
  location_city: String,
  location_country: String,
  duration: String, 
});

var Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;
