const Tour = require('../models/tourModel');

// const tourseDB = `${__dirname}/../dev-data/data/tours-simple.json`;
// we can use param middleware to validate if an id exists
// const tours = JSON.parse(fs.readFileSync(tourseDB));

////////////////
// 2) ROUTE HANDLERS
// param middleware

// check body data

//
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      requestedAt: req.requestTime,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // Tour.findOne({_id:req.params.id})
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      requestedAt: req.requestTime,
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  // create an instance of the model
  // const newTour = new Tour({})
  // save the date
  // newTour.save()
  // create record directly on the model
  // Tour.create({})

  try {
    const createdTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: createdTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid data sent!`,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: '<Updated Tour here...>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
