const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: String,
  image: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
