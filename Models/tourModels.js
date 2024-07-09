const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: 0,
  },
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
