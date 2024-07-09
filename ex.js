// const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const userController = require('./../Controlers/userControler');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
//

module.exports = router;
//controller userControler
const fs = require('fs');
// const express = require('express');
// const app = express();
// app.use(express.json());

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not createed',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not createed',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not createed',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not createed',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not createed',
  });
};
//tour Routes
// const fs = require('fs');
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const tourController = require('./../Controlers/tourControler');

router.param('id', tourController.checkId);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.postTours);
router
  .route('/:id')
  .get(tourController.getToursId)
  .patch(tourController.UpdateTours)
  .delete(tourController.deleteTours);

// too heavy  watch  this route
module.exports = router;

//tour Routes controller
const fs = require('fs');
const express = require('express');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.checkId = (req, res, next, val) => {
  console.log(`the Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      response: 'bad request',
    });
  }
  next(); 
};
//
exports.getAllTours = (req, res) => {
  res.status(200).json({
    Status: 'success',
    result: tours.length,
    requestedAt: req.getTime,
    data: { tours },
  });
};
//
exports.getToursId = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    Status: 'success',
    result: tours.length,
    data: { tour },
  });
};
//
exports.UpdateTours = (req, res) => {
  res.status(200).json({
    Status: 'success',
    message: 'Data updated successfully',
  });
};
//
exports.postTours = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
    }
  );
  res.send('Hello post is done!');
};
//
exports.deleteTours = (req, res) => {
  res.status(200).json({
    Status: 'success',
    message: 'Data deleted successfully',
    data: null,
  });
};

//app.json
// const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');

const tourRoutes = require('./Router/tourRoutes');
const usersRoutes = require('./Router/userRoutes');

// ___________________________________________________________________________________________________________________________
app.use(morgan('combined'));
const customFormat =
  ':method :url :status :res[content-length] - :response-time ms';
app.use((req, res, next) => {
  console.log('Manish');
  next();
});
app.use((req, res, next) => {
  req.getTime = new Date().toISOString();
  next();
});
// ________________________________________________________________________________________________________________________

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/tours', tourRoutes);

module.exports = app;
