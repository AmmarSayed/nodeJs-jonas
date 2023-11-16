const mongoose = require('mongoose');

// define a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `A tour must have a name`],
    unique: [true, `Tour name must be unique`],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, `A tour must have a price`],
  },
});

// Define a model
// the modal will create a collection/database with the plural name "Tours"
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
