// const express = require('express');
// const router = express.Router();

const Tour = require('./../Models/tourModels');
//create
exports.createTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message || err,
    });
  }
};
// update
exports.UpdateTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      Status: 'success',
      message: 'Data updated successfully',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'manish Invalid update data',
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    //filterings
    const queryObj = { ...req.query };
    const excludeFields = ['sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]); // we use this to make the object of requrest ignoring the excluded fields

    // A => Advance filtering//
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryString));
    let query = Tour.find(JSON.parse(queryString));
    // way to filter by difficulty we done this because
    // if we try it with await directly we can t be able to filtr outmultiple time and it directly give answer

    // B=> Shorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const tours = await query;
    res.status(200).json({
      Status: 'success',
      result: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to get tours',
    });
  }
};
// find by  id
exports.getTours = async (req, res) => {
  try {
    // console.log(req.query);

    const tours = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
};

//

//
exports.deleteTours = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      Status: 'success',
      message: 'Data deleted successfully',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
};
