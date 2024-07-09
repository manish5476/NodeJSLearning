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
