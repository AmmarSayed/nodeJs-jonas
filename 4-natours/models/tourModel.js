const mongoose = require('mongoose');

// define a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `A tour must have a name`],
    unique: [true, `Tour name must be unique`],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour should havea a difficulty'],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, `A tour must have a price`],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    require: [true, 'A tour must have a description'],
  },

  imageCover: {
    type: String,
    required: [true, 'A Tour must havea  cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //hide this field from the API
  },
  startDates: [Date],
});

// Define a model
// the modal will create a collection/database with the plural name "Tours"
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
