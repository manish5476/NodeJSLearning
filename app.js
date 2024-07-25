// const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');

const tourRoutes = require('./Router/tourRoutes');
const usersRoutes = require('./Router/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ___________________________________________________________________________________________________________________________
app.use(morgan('combined'));
// const customFormat =
//   ':method :url :status :res[content-length] - :response-time ms';
app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.getTime = new Date().toISOString();
  next();
});
app.use(express.static(`${__dirname}/public/`));
// ________________________________________________________________________________________________________________________

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/tours', tourRoutes);

module.exports = app;
