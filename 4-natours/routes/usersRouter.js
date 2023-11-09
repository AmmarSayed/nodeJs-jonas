const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/userController');

//////
// USERS ROUTES
router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;