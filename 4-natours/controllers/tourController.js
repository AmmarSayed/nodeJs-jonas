const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours.json`
  )
);

////////////////
// 2) ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

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

  //   if (id > tours.length)

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      mesasge: 'Invalid Id',
    });
  }

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

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; //to convert incomming text to a number - just multiply * 1
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      mesasge: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: '<Updated Tour here...>',
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; //to convert incomming text to a number - just multiply * 1
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      mesasge: 'No Content',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
