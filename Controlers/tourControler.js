const express = require('express');
const router = express.Router();
const Tour = require('./../Models/tourModels');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      Status: 'success',
      rsult: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to get tours',
    });
  }
};
//
exports.getTours = async (req, res) => {
  try {
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
      message: 'invalid tour data set',
    });
  }
};
exports.UpdateTours = (req, res) => {
  res.status(200).json({
    Status: 'success',
    message: 'Data updated successfully',
    data: {
      tour: 'update tour her',
    },
  });
};
//
exports.deleteTours = (req, res) => {
  res.status(200).json({
    Status: 'success',
    message: 'Data deleted successfully',
    data: null,
  });
};
