const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  address: String,
  locality: String,
  city: String,
  latitude: Number,
  longitude: Number,
}, { _id: false });

const restaurantSchema = mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
  establishments: String,
  cuisines: String,
  costForTwo: Number,
  openingHours: String,
  phone: String,
  location: locationSchema,
  createdAt: { type: Date, select: false },
  updatedAt: { type: Date, select: false },
  __v: { type: Number, select: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
