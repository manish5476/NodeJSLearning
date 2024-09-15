const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    minLength: [10, 'a tour must have minimum length of 10'],
    maxLength: [40, 'a tour can have maximum length of 40'],
  },
  duration: {
    type: String,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
    min: 1, // minimum group size is 1 person
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be either easy, medium, or difficult',
    },
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
  secretTour: { type: Boolean, default: false },
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

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  next();
});

// tourSchema.post('find', function (docs, next) { // mistake in this line code
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
// tourSchema.post(/^find/, function (docs, next) {
//   docs = docs.filter((doc) => !doc.secretTour); // filter out secret tours
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
//the second parameter is the fdatavase schema name
module.exports = Tour;
