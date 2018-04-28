const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: String,
  image: String,
  rating: String,
  establishment: String,
  costForTwo: Number,
  subzone: String,
  address: String,
  latitude: String,
  longitude: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
