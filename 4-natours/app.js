const express = require('express');
const fs = require('fs');
const PORT = 8000;
const app = express();

// allows express to deal with data comming from the http request body
//
app.use(express.json());

//
//
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from Server!');
//   res.status(200).json({ message: 'Hello from Server!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: { tours },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
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
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...🏃‍♂️...`);
});
