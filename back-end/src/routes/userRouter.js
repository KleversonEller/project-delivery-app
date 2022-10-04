const express = require('express');

const UserController = require('../controllers/userController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/user', (req, res) => UserController.create(req, res));
router.get('/user/:role', (req, res) => UserController.getAll(req, res));
router.get('/user', (req, res) => UserController.getAllUser(req, res));
router.post(
  '/user/admin', 
  authenticationMiddleware,
  (req, res) => UserController.registerAdmin(req, res),
);
router.delete(
  '/user/delete', 
  authenticationMiddleware,
  (req, res) => UserController.deleteUser(req, res),
);
module.exports = router;