const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;