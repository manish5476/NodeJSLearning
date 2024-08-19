// const express = require('express');
// const router = express.Router();

const Tour = require('./../Models/tourModels');
// alias
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
};

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

// /////////////////////////////////////////////////////////////////////////////////////
exports.getAllTours = async (req, res) => {
  try {
    //filterings
    console.log(
      '------------------------------',
      req.query,
      '------------------------------------'
    );

    //-------------------------------------------------------------------------------------------------------------------

    queryObj = { ...req.query }; // query from the user is comming here
    // const excludeFields = ['sort', 'limit', 'page', 'fields']; //removing this type of filtering methods which user is sending
    // excludeFields.forEach((field) => delete queryObj[field]); // we use this to make the object of requrest ignoring the excluded fields
    // // console.log(queryObj);
    // A => Advance filtering//
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // console.log(JSON.parse( queryString)); // way to filter by difficulty we done this because
    let query = Tour.find(JSON.parse(queryString)); // if we try it with await directly cant be able to filtr outmultiple time and it directly give answer\
    //-------------------------------------------------------------------------------------------------------------------

    // B=> Shorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log('======', sortBy, '======');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    //-------------------------------------------------------------------------------------------------------------------
    // FIELD LIMITING measn removing fieldss to be visualize we use it wehen we want to hide some sensitive data feommt ehe user
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    //-------------------------------------------------------------------------------------------------------------------
    //pagination and limit fild,,it work by ding like making the query and then we use it to get the data (using ==== > skip(val).limit(limiteddata))
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours)
        throw new Error('this page is not available currently');
    } else {
      query = query.skip(skip).limit(page);
    }
    //-------------------------------------------------------------------------------------------------------------------

    const tours = await query; //main query we reeturn to the app or mongodb
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
