// const fs = require('fs');
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());//middleware

const tourController = require('./../Controlers/tourControler');

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
