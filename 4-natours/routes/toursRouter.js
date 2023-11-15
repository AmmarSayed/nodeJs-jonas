const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// Param middleware
// this is locally defined for the current "router" as we are inside "toursRouter"
// it runs when a specific parameter is being requested
router.param('id', tourController.checkId);

/////////
// Routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    tourController.checkBodyData,
    tourController.createTour
  );

router
  .route('/:id') // parameter with name "id" - it can be anything I want
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
