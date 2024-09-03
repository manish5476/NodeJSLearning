// // const fs = require('fs');
// const express = require('express');
// const app = express();
// app.use(express.json());
// const router = express.Router();
// const userController = require('./../Controlers/userControler');

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);
// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);
// //

// module.exports = router;
// //controller userControler
// const fs = require('fs');
// // const express = require('express');
// // const app = express();
// // app.use(express.json());

// exports.getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// //tour Routes
// // const fs = require('fs');
// const express = require('express');
// const router = express.Router();
// const app = express();
// app.use(express.json());
// const tourController = require('./../Controlers/tourControler');

// router.param('id', tourController.checkId);
// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(tourController.checkBody, tourController.postTours);
// router
//   .route('/:id')
//   .get(tourController.getToursId)
//   .patch(tourController.UpdateTours)
//   .delete(tourController.deleteTours);

// // too heavy  watch  this route
// module.exports = router;

// //tour Routes controller
// const fs = require('fs');
// const express = require('express');
// const router = express.Router();

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// exports.checkId = (req, res, next, val) => {
//   console.log(`the Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       response: 'bad request',
//     });
//   }
//   next();
// };
// //
// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     Status: 'success',
//     result: tours.length,
//     requestedAt: req.getTime,
//     data: { tours },
//   });
// };
// //
// exports.getToursId = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);

//   res.status(200).json({
//     Status: 'success',
//     result: tours.length,
//     data: { tour },
//   });
// };
// //
// exports.UpdateTours = (req, res) => {
//   res.status(200).json({
//     Status: 'success',
//     message: 'Data updated successfully',
//   });
// };
// //
// exports.postTours = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTours = Object.assign({ id: newId }, req.body);
//   tours.push(newTours);

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       console.log(err);
//     }
//   );
//   res.send('Hello post is done!');
// };
// //
// exports.deleteTours = (req, res) => {
//   res.status(200).json({
//     Status: 'success',
//     message: 'Data deleted successfully',
//     data: null,
//   });
// };

// //app.json
// // const fs = require('fs');
// const express = require('express');
// const app = express();
// app.use(express.json());
// const morgan = require('morgan');

// const tourRoutes = require('./Router/tourRoutes');
// const usersRoutes = require('./Router/userRoutes');

// // ___________________________________________________________________________________________________________________________
// app.use(morgan('combined'));
// const customFormat =
//   ':method :url :status :res[content-length] - :response-time ms';
// app.use((req, res, next) => {
//   console.log('Manish');
//   next();
// });
// app.use((req, res, next) => {
//   req.getTime = new Date().toISOString();
//   next();
// });
// // ________________________________________________________________________________________________________________________

// app.use('/api/v1/users', usersRoutes);
// app.use('/api/v1/tours', tourRoutes);

// module.exports = app;
////////////////////////////////////////////////////////////////////////////////////////////////////

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
