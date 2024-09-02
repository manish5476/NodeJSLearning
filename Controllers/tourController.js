const { query } = require('express');
const Tour = require('./../Models/tourModels');
const ApiFeatures = require('./../Utils/apiFeature');
// alias
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,difficulty';
  next();
};

// class ApiFunctionality {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     const queryObj = { ...this.queryString };
//     const excludeFields = ['sort', 'limit', 'page', 'fields']; //removing this type of filtering methods which user is sending
//     excludeFields.forEach((field) => delete queryObj[field]); // we use this to make the object of request ignoring the excluded fields
//     let queryString = JSON.stringify(queryObj);
//     queryString = queryString.replace(
//       /\b(gte|gt|lte|lt)\b/g,
//       (match) => `$${match}`
//     );
//     this.query.find(JSON.parse(queryString));
//     return this;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort('-createdAt');
//     }
//     return this;
//   }
//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select('-__v');
//     }
//     return this;
//   }
//   pagination() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;
//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }
// }

// Get all tours)
// ALL DATA ///
exports.getAllTours = async (req, res) => {
  try {
    //filtering data
    console.log('----', req.query, '------');
    // queryObj = { ...req.query }; // query from the user is coming here

    const feature = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .limitFields()
      .pagination();
    const tours = await feature.query;
    res.status(200).json({
      Status: 'success is tested successfully',
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
      message: ' Invalid update data',
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

// // Importing the required modules
// const express = require('express');
// const router = express.Router();
// const Tour = require('./../Models/tourModels'); // Importing the Tour model

// // Middleware function to set predefined query parameters for top tours
// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = '5'; // Limit the number of tours to 5
//   req.query.sort = '-ratingsAverage,price'; // Sort tours by ratings (descending) and price (ascending)
//   req.query.fields = 'name,price,ratingsAverage,difficulty'; // Limit the fields returned in the response
//   next(); // Pass control to the next middleware or route handler
// };

// // Create a new tour
// exports.createTours = async (req, res) => {
//   try {
//     const newTour = await Tour.create(req.body); // Create a new tour using the data from the request body
//     res.status(201).json({
//       status: 'success', // Indicate that the request was successful
//       data: {
//         tour: newTour, // Return the newly created tour data
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail', // Indicate that the request failed
//       message: err.message || err, // Return the error message
//     });
//   }
// };

// // Update an existing tour by its ID
// exports.UpdateTours = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true, // Run schema validators during the update
//     });
//     res.status(200).json({
//       status: 'success', // Indicate that the update was successful
//       message: 'Data updated successfully',
//       data: {
//         tour: tour, // Return the updated tour data
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail', // Indicate that the update failed
//       message: 'Invalid update data', // Custom error message
//     });
//   }
// };

// // Get all tours with advanced filtering, sorting, and pagination
// exports.getAllTours = async (req, res) => {
//   try {
//     // Filtering: Extract query parameters for filtering
//     let queryObj = { ...req.query }; // Create a copy of the query object

//     // Advanced filtering: Convert comparison operators (gte, gt, lte, lt) to MongoDB format
//     let queryString = JSON.stringify(queryObj);
//     queryString = queryString.replace(
//       /\b(gte|gt|lte|lt)\b/g,
//       (match) => `$${match}`
//     );

//     // Build the query: Convert the string back to an object and find the matching documents
//     let query = Tour.find(JSON.parse(queryString));

//     // Sorting: If the 'sort' query parameter is present, sort the results
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(',').join(' '); // Convert commas to spaces for MongoDB sorting
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort('-createdAt'); // Default sorting by creation date (descending)
//     }

//     // Field limiting: Select specific fields to return in the response
//     if (req.query.fields) {
//       const fields = req.query.fields.split(',').join(' '); // Convert commas to spaces for MongoDB field selection
//       query = query.select(fields);
//     } else {
//       query = query.select('-__v'); // Exclude the __v field by default
//     }

//     // Pagination: Calculate the skip and limit values for pagination
//     const page = req.query.page * 1 || 1; // Convert page number to a number or set it to 1
//     const limit = req.query.limit * 1 || 100; // Convert limit to a number or set it to 100
//     const skip = (page - 1) * limit; // Calculate the number of documents to skip
//     query = query.skip(skip).limit(limit); // Apply skip and limit to the query

//     // If the requested page number exceeds the total number of documents, throw an error
//     if (req.query.page) {
//       const numTours = await Tour.countDocuments();
//       if (skip >= numTours) throw new Error('This page is not available');
//     }

//     // Execute the query and return the results
//     const tours = await query;
//     res.status(200).json({
//       status: 'success', // Indicate that the request was successful
//       result: tours.length, // Return the number of tours found
//       data: { tours }, // Return the tour data
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail', // Indicate that the request failed
//       message: 'Failed to get tours', // Custom error message
//     });
//   }
// };

// // Get a single tour by its ID
// exports.getTours = async (req, res) => {
//   try {
//     const tour = await Tour.findById(req.params.id); // Find the tour by its ID
//     res.status(200).json({
//       status: 'success', // Indicate that the request was successful
//       data: {
//         tour: tour, // Return the tour data
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail', // Indicate that the request failed
//       message: 'Tour not found', // Custom error message
//     });
//   }
// };

// // Delete a tour by its ID
// exports.deleteTours = async (req, res) => {
//   try {
//     await Tour.findByIdAndDelete(req.params.id); // Find the tour by its ID and delete it
//     res.status(200).json({
//       status: 'success', // Indicate that the deletion was successful
//       message: 'Data deleted successfully', // Custom success message
//       data: null, // No data to return after deletion
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail', // Indicate that the request failed
//       message: 'Tour not found', // Custom error message
//     });
//   }
// };

// const express = require('express');
// const router = express.Router();
