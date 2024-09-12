const mongoose = require('mongoose');
const slugify = require('slugify');
// manish
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
    // min: 1,  // minimum group size is 1 person
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    // enum: {
    //   values: ['easy', 'medium', 'difficult'],
    //   message: 'Difficulty must be either easy, medium, or difficult',
    // },
  },
  ratingAverage: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    trim: true,
  },
  slug: String,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
//the second parameter is the fdatavase schema name
module.exports = Tour;
