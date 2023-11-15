const fs = require('fs');
const tourseDB = `${__dirname}/../dev-data/data/tours-simple.json`;
// we can use param middleware to validate if an id exists
const tours = JSON.parse(fs.readFileSync(tourseDB));

////////////////
// 2) ROUTE HANDLERS
// param middleware
exports.checkId = (req, res, next, val) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      mesasge: 'Invalid Id',
    });
  }

  if (!tour) {
    return res.status(404).json({
      status: 'Fail 💥',
      message: 'Invalid ID',
    });
  }

  next();
};

// check body data

exports.checkBodyData = (req, res, next) => {
  console.log(req.body.price);
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Missing name or price',
    });
  }

  next();
};

//
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: tour,
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(tourseDB, JSON.stringify(tours), (err) => {
    if (err) console.log(err);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
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
