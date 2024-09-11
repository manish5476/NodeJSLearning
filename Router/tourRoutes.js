// const fs = require('fs');
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json()); //middleware

const tourController = require('./../Controllers/tourController');
// while using alisa routes how to configure where if we are making use of two condition for the sorting purposes
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tourStats').get(tourController.getTourStats);
router.route('/Monthlyreport/:year').get(tourController.getTourMonthlyReport);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTours);
router
  .route('/:id')
  .get(tourController.getTours)
  .patch(tourController.UpdateTours)
  .delete(tourController.deleteTours);

// too heavy  watch  this route
module.exports = router;
